import { createApp, type App } from 'vue';

import UiButton from '@/ui/button.vue';
import UiCollapse from '@/ui/collapse.vue';
import UiDialog from '@/ui/dialog.vue';
import UiIcon from '@/ui/icon.vue';
import UiItem from '@/ui/item.vue';
import UiMenu from '@/ui/menu.vue';
import UiMenuItem from '@/ui/menu-item.vue';
import UiPopup from '@/ui/popup.vue';
import UiRange from '@/ui/range.vue';
import UiRangeStyled from '@/ui/range-styled.vue';

import AppView from '@/views/app-view.vue';
import ControlsView from '@/views/controls-view.vue';
import EventsView from '@/views/events-view.vue';
import GearBoxView from '@/views/gear-box-view.vue';
import LogoView from '@/views/logo-view.vue';
import LoremView from '@/views/lorem-view.vue';
import SvgView from '@/views/svg-view.vue';
import ThreeView from '@/views/three-view.vue';

import { AppModel } from '@/modules/app-model';

export class Application {
  readonly #app: App;

  constructor() {
    this.#app = createApp(AppView, { model: new AppModel() });
    this.#app
      // ui
      .component('ui-button', UiButton)
      .component('ui-collapse', UiCollapse)
      .component('ui-dialog', UiDialog)
      .component('ui-icon', UiIcon)
      .component('ui-item', UiItem)
      .component('ui-menu', UiMenu)
      .component('ui-menu-item', UiMenuItem)
      .component('ui-popup', UiPopup)
      .component('ui-range', UiRange)
      .component('ui-range-styled', UiRangeStyled)
      // views
      .component('controls-view', ControlsView)
      .component('events-view', EventsView)
      .component('gear-box-view', GearBoxView)
      .component('logo-view', LogoView)
      .component('lorem-view', LoremView)
      .component('svg-view', SvgView)
      .component('three-view', ThreeView);
  }

  run() {
    this.#app.mount('body');
  }
}
