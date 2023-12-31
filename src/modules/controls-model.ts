import { ref, shallowReactive, shallowRef } from 'vue';

import { LoremModel } from '@/modules/lorem-model';
import { ViewModel } from '@/modules/view-model';

export class ControlsModel extends ViewModel {
  readonly lorem = new LoremModel(2);
  readonly paragraphs = [1, 2, 3, 4];

  // buttons
  readonly #showButtons = ref(false);
  readonly #selectedIndex = ref(3);
  readonly radioItems = shallowReactive(
    [...Array(4)].map((item, i) => ({
      name: `item #${i}`,
      value: i,
    })),
  );
  readonly #selectedRadio = shallowRef(this.radioItems[2]);
  readonly checkboxes = shallowReactive([false, true, false, false]);
  readonly #message = ref('nothing');

  // popup
  readonly #popup = ref(false);
  readonly #text = ref('text');

  // accordions
  readonly #expanded = ref(false);
  readonly #expandedGroup = ref<number | undefined>();

  // range
  readonly #showRange = ref(true);
  readonly #rangeValue = ref(25); // doesn't fit the step, should be recalculated
  readonly rangeMin = 0;
  readonly rangeMax = 100;
  readonly rangeStep = 2;

  constructor() {
    super('controls-view');
  }

  get showButtons() {
    return this.#showButtons.value;
  }

  set showButtons(value) {
    this.#showButtons.value = value;
  }

  get selectedIndex() {
    return this.#selectedIndex.value;
  }

  set selectedIndex(value) {
    this.#selectedIndex.value = value;
  }

  get selectedRadio() {
    return this.#selectedRadio.value;
  }

  set selectedRadio(value) {
    this.#selectedRadio.value = value;
  }

  get message() {
    return this.#message.value;
  }

  set message(value) {
    this.#message.value = value;
  }

  get popup() {
    return this.#popup.value;
  }

  set popup(value) {
    this.#popup.value = value;
  }

  get text() {
    return this.#text.value;
  }

  set text(value) {
    this.#text.value = value;
  }

  click(message: string) {
    this.message = message;
  }

  get expanded() {
    return this.#expanded.value;
  }

  set expanded(value) {
    this.#expanded.value = value;
  }

  get expandedGroup() {
    return this.#expandedGroup.value;
  }

  set expandedGroup(value) {
    this.#expandedGroup.value = value;
  }

  get showRange() {
    return this.#showRange.value;
  }

  set showRange(value) {
    this.#showRange.value = value;
  }

  get rangeValue() {
    return this.#rangeValue.value;
  }

  set rangeValue(value) {
    this.#rangeValue.value = value;
  }
}
