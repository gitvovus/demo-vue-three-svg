import * as img from '@/lib/images';
import * as std from '@/lib/std';
import * as msg from './messages';

function saw(x: number) {
  const t = 0.5 * x;
  return Math.abs(t - Math.floor(t) - 0.5) * 2;
}

async function flower(
  radius: number, petals: number, t: number,
  bottom: { r: number; g: number; b: number },
  middle: { r: number; g: number; b: number },
  top: { r: number; g: number; b: number },
) {
  return createImageBitmap(
    img.generate(2 * radius, 2 * radius, (ix, iy) => {
      const x = ix + 0.5 - radius;
      const y = iy + 0.5 - radius;
      const r = Math.hypot(x, y);
      const phi = Math.atan2(y, x);

      const a = (petals * phi) / Math.PI + 0.2;
      const b = (petals * phi) / Math.PI + 1.2;
      const c = (petals * phi) / Math.PI + 1.2;
      const f = [
        (saw(a) ** 0.3 + 0.5) * radius * 0.65,
        (saw(b) ** (0.2 + 0.5 * t) + 0.5) * radius * (4 + t) * 0.13,
        (2 - saw(c) ** (1 + 3 * t)) * radius * (3 + t) * 0.08,
      ];

      const rgba: img.RGBA[] = [
        [bottom.r / 255, bottom.g / 255, bottom.b / 255, 0],
        [middle.r / 255, middle.g / 255, middle.b / 255, 0],
        [top.r / 255, top.g / 255, top.b / 255, 0],
      ];

      for (let i = 0; i < f.length; ++i) {
        if (r > f[i]) {
          rgba[i][3] = std.smoothStep(f[i] + 3, f[i], r);
        }
        else {
          rgba[i][3] = r / f[i];
        }
      }

      for (let i = 1; i < f.length; ++i) {
        for (let j = 0; j < 3; ++j) {
          rgba[0][j] = rgba[0][j] * (1 - rgba[i][3]) + rgba[i][j] * rgba[i][3];
        }
        rgba[0][3] = 1 - (1 - rgba[0][3]) * (1 - rgba[i][3]);
      }

      for (let i = 0; i < 4; ++i) {
        rgba[0][i] *= 255;
      }
      return rgba[0];
    }),
  );
}

const requests: (msg.FlowerRequest | msg.StopRequest)[] = [];

const context = self as unknown as Worker;
context.onmessage = async (e: MessageEvent) => {
  const r = e.data;
  switch (r.type) {
    case 'flower':
      requests.push(r);
      break;

    case 'stop':
      requests.length = 0;
      requests.push({ type: 'stop' });
      break;

    default:
      console.log('[worker] unknown request:', r);
  }

  if (requests.length === 1) {
    setTimeout(processMessages);
  }
};

async function processMessages() {
  if (requests.length === 0) {
    return;
  }
  const r = requests.shift()!;
  switch (r.type) {
    case 'stop':
      requests.length = 0;
      context.postMessage({ type: 'stop' });
      break;

    case 'flower':
      {
        const image = await flower(r.radius, r.petals, r.t, r.bottom, r.middle, r.top);
        context.postMessage({ ...r, image }, [image]);
      }
      break;
  }

  if (requests.length > 0) {
    setTimeout(processMessages);
  }
}
