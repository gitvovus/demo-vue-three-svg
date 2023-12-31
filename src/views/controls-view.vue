<script setup lang="ts">
import { type ControlsModel } from '@/modules/controls-model';
defineProps<{ model: ControlsModel }>();
</script>

<template>
  <div class="view controls-view">
    <!-- popup -->
    <div>
      <ui-button class="button" :disabled="model.popup" toggle v-model="model.popup"
        >Popup</ui-button
      >
      <div class="popup-anchor">
        <ui-popup class="popup-content" v-model="model.popup">
          <p>
            Popup is persistent until it loses focus. If you want popup to be closed when some
            element inside is clicked, add 'action' class to this element, like it is done for these
            buttons:
          </p>
          <div>
            <ui-button class="button action round" @click="model.click('ok')">Ok</ui-button>
            <ui-button class="button action round" @click="model.click('cancel')">Cancel</ui-button>
          </div>
          <div class="h-separator"></div>
          <div class="expand-header">
            <input type="text" v-model="model.text" />
            <ui-button
              v-for="(item, i) in model.paragraphs"
              :key="i"
              class="button round"
              :toggle="[item]"
              v-model="model.lorem.paragraphs"
            >
              {{ item }}
            </ui-button>
          </div>
          <lorem-view :model="model.lorem" />
        </ui-popup>
      </div>
    </div>
    <!-- buttons -->
    <div>
      <div class="expand-header">
        Buttons:
        <div class="flex-right">
          <ui-button class="button round iconic" toggle v-model="model.showButtons">
            <ui-icon :class="['icon-gt', model.showButtons ? 'r90' : '']" />
          </ui-button>
        </div>
      </div>
      <ui-collapse :expanded="model.showButtons">
        <div class="m-1">
          <input type="text" value="text" style="width: 100px" />
          <ui-button class="button" @click="model.click('focusable')">focusable</ui-button>
          <ui-button class="button" @click="model.click('non-focusable')" no-focus tabindex="-1"
            >non-focusable</ui-button
          >
          <ui-button class="button" @click="model.click('focusable')">focusable</ui-button>
        </div>
        <div class="m-1">
          <div>Radio (index): {{ model.selectedIndex }}</div>
          <ui-button
            v-for="(item, i) in model.checkboxes"
            :key="`index[${i}]`"
            class="button round"
            :toggle="[i]"
            v-model="model.selectedIndex"
          >
            {{ `#${i}` }}
          </ui-button>
        </div>
        <div class="m-1">
          <div>
            Radio (object): { name: {{ model.selectedRadio.name }}, value:
            {{ model.selectedRadio.value }} }
          </div>
          <ui-button
            v-for="(item, i) in model.radioItems"
            :key="`object[${i}]`"
            class="button round"
            :toggle="[model.radioItems[i]]"
            v-model="model.selectedRadio"
          >
            {{ `#${i}` }}
          </ui-button>
        </div>
        <div class="m-1">
          <div>
            Checkbox: [&nbsp;<span v-for="(item, i) in model.checkboxes" :key="i + 300"
              >{{ item }}&nbsp;</span
            >]
          </div>
          <ui-button
            v-for="(item, i) in model.checkboxes"
            :key="`checkbox[${i}]`"
            class="button round"
            toggle
            v-model="model.checkboxes[i]"
          >
            {{ `#${i}` }}
          </ui-button>
        </div>
        <div class="m-1">
          <div>Push: {{ model.message }}</div>
          <ui-button @click="model.click('unstyled')">Unstyled</ui-button>
          <ui-button class="button" @click="model.click('ok')">Ok</ui-button>
          <ui-button class="button" @click="model.click('cancel')">Cancel</ui-button>
          <ui-button class="button" @click="model.click('disabled')" disabled>Disabled</ui-button>
          <ui-button
            class="button"
            :toggle="[model.radioItems[0]]"
            v-model="model.selectedRadio"
            disabled
          >
            Disabled
          </ui-button>
        </div>
      </ui-collapse>
    </div>
    <!-- accordions -->
    <div>
      <div class="expand-header">
        <div>
          Expand, paragraphs:
          <ui-button
            v-for="(item, i) in model.paragraphs"
            :key="i"
            class="button round"
            :toggle="[item]"
            v-model="model.lorem.paragraphs"
          >
            {{ item }}
          </ui-button>
        </div>
        <div class="flex-right">
          <ui-button class="button round iconic" toggle v-model="model.expanded">
            <ui-icon :class="['icon-gt', model.expanded ? 'r90' : '']" />
          </ui-button>
        </div>
      </div>
      <ui-collapse :expanded="model.expanded">
        <lorem-view :model="model.lorem" class="content" />
      </ui-collapse>
      <template v-for="(item, i) in 3" :key="`lorem[${i}]`">
        <div class="expand-header">
          <div>Expand (radio #{{ i }}):</div>
          <div class="flex-right">
            <ui-button
              class="button round iconic"
              :toggle="[i, undefined]"
              v-model="model.expandedGroup"
            >
              <ui-icon :class="['icon-gt', model.expandedGroup === i ? 'r90' : '']" />
            </ui-button>
          </div>
        </div>
        <ui-collapse :expanded="model.expandedGroup === i">
          <lorem-view :paragraphs="1" class="content" />
        </ui-collapse>
      </template>
    </div>
    <!-- icons -->
    <!-- <div class="icons">
      <div v-for="item in ['down', 'gt', 'lt', 'up']" :key="item" class="icon-content">
        <ui-icon :class="`icon-${item}`" />
      </div>
    </div>
    <p class="inline-icons">
      Inline
      <ui-icon class="inline icon-down" />
      <ui-icon class="inline icon-gt" />
      <ui-icon class="inline icon-quad" />
      <ui-icon class="inline icon-lt" />
      <ui-icon class="inline icon-up" />
      icons
    </p> -->
    <!-- range -->
    <div>
      <div class="expand-header">
        Range:
        <div class="flex-right">
          <ui-button class="button round iconic" toggle v-model="model.showRange">
            <ui-icon :class="['icon-gt', model.showRange ? 'r90' : '']" />
          </ui-button>
        </div>
      </div>
      <ui-collapse :expanded="model.showRange">
        <div class="m-1">
          {{ model.rangeValue }}
          <br />
          <ui-range-styled
            :min="model.rangeMin"
            :max="model.rangeMax"
            :step="model.rangeStep"
            v-model="model.rangeValue"
          ></ui-range-styled>
          <br />
          <input
            type="range"
            :min="model.rangeMin"
            :max="model.rangeMax"
            :step="model.rangeStep"
            v-model.number="model.rangeValue"
          />
        </div>
      </ui-collapse>
    </div>
  </div>
</template>

<style>
.inline-icons {
  font-size: 4em;
  background-color: darkslategrey;
}

.inline.icon {
  display: inline flow-root;
  margin-bottom: -0.2em;
}

.view.controls-view {
  overflow: auto;
  border-radius: 0;
}

.expand-header {
  display: flex;
  align-items: center;
  padding: 2px 2px 2px 0.5em;
  background-color: var(--bg);
}

.popup-anchor {
  display: inline-block;
  position: relative;
  width: 0;
  height: 0;
}

.popup-content {
  max-width: 25em;
  max-height: 30em;
  padding: 0 0.5em;
}

.content {
  padding: 0 0.5em;
}

.icons {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgb(255 255 255 / 0.0625);
  border-radius: 0.25rem;
  margin: 1em;
  padding: 1em;
  gap: 0.5em;
}

.icon-content {
  width: 64px;
  height: 64px;
  color: green;
  font-size: 64px;
  background-color: rgb(0 0 0 / 0.25);
  border-radius: 0.25rem;
}

.icon-content:hover {
  color: red;
}
</style>
