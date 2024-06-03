import { type PropertyBase } from '@/modules/theme/properties/base';
import { ref } from 'vue';

export class Text implements PropertyBase {
  readonly key = Symbol();
  readonly component = 'text-editor';
  readonly name: string;

  readonly #text = ref('');

  constructor(name: string, text: string = '') {
    this.name = name;
    this.text = text;
  }

  get text() {
    return this.#text.value;
  }

  set text(value) {
    this.#text.value = value;
  }

  toCss() {
    return this.text;
  }

  save() {
    localStorage.setItem(this.name, this.text);
  }

  load() {
    this.text = localStorage.getItem(this.name) ?? '';
  }
}
