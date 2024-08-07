import {
  computed,
  defineComponent,
  h,
  inject,
  onBeforeUnmount,
  onMounted,
  provide,
  ref,
  shallowRef,
  watchEffect,
  type InjectionKey,
  type PropType,
  type Ref,
  type SlotsType,
} from 'vue';

import { Disposable } from '@/lib/std';
import { ViewModel } from '@/modules/view-model';
import { SingleSelection } from '@/lib/ui-models';

export class TestData {
  readonly key = Symbol();
  #name: Ref<string>;
  #value: Ref<number>;

  constructor(name: string, value: number) {
    this.#name = ref(name);
    this.#value = ref(value);
  }

  get name() {
    return this.#name.value;
  }

  set name(value) {
    this.#name.value = value;
  }

  get value() {
    return this.#value.value;
  }

  set value(value) {
    this.#value.value = value;
  }
}

export class Sandbox extends ViewModel {
  readonly #data = [new TestData('one', 1), new TestData('two', 2), new TestData('three', 3)];
  readonly single = new SingleSelection(this.#data);

  readonly #hidden = ref(false);

  readonly #text = ref('text');

  constructor() {
    super('sandbox-view');
  }

  get hidden() {
    return this.#hidden.value;
  }

  set hidden(value) {
    this.#hidden.value = value;
  }

  get text() {
    return this.#text.value;
  }

  set text(value) {
    this.#text.value = value;
  }

  get parsed() {
    const lines = this.text.split(/(\n)/g);
    return lines;
  }

  test() {
    this.single.selectedItem = undefined;
  }
}

type ContainerContext = {
  modelValue: Ref<any>;
  select: (item: any) => void;
};
const key = Symbol() as InjectionKey<ContainerContext>;

export const TestContainer = defineComponent(
  (props, { emit, slots }) => {
    const context: ContainerContext = {
      modelValue: shallowRef(props.modelValue),
      select(item: any) {
        emit('update:modelValue', item);
      },
    };
    provide(key, context);
    const mounted = new Disposable();

    onMounted(() => {
      mounted.add(watchEffect(() => (context.modelValue.value = props.modelValue)));
    });

    onBeforeUnmount(() => mounted.dispose());

    return () => h(props.as, undefined, slots.default());
  },
  {
    inheritAttrs: false,
    props: {
      as: { type: [Object, String] as PropType<object | string>, default: 'div' },
      modelValue: {
        type: [Object, String, Number, Boolean] as PropType<object | string | number | boolean | undefined>,
        default: undefined,
      },
    },
    emits: {
      'update:modelValue': (value: any) => true,
    },
    slots: Object as SlotsType<{
      default(): any;
    }>,
  },
);

export const TestHeader = defineComponent(
  (props, { slots }) => {
    const context = inject(key);
    const selected = computed(() => context?.modelValue.value);
    return () => h('div', props, slots.default({ selected: selected.value }));
  },
  {
    slots: Object as SlotsType<{
      default({ selected }: { selected: any }): any;
    }>,
  },
);

export const TestItem = defineComponent(
  (props, { slots }) => {
    const context = inject(key);
    const selected = computed(() => context?.modelValue.value === props.value);
    return () =>
      h(
        'div',
        { onClick: () => context?.select(props.value) },
        slots.default({ selected: selected.value }),
      );
  },
  {
    props: {
      value: {
        type: [Object, String, Number] as PropType<object | string | number>,
        required: true,
      },
    },
    slots: Object as SlotsType<{
      default({ selected }: { selected: boolean }): any;
    }>,
  },
);
