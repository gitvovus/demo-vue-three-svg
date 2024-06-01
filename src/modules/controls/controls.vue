<script setup lang="ts">
import { type Controls } from './controls';
defineProps<{ model: Controls }>();
</script>

<template>
  <div class="view controls-view">
    <!-- popup -->
    <div>
      <ui-button
        v-model="model.popup"
        class="btn m-btn"
        :disabled="model.popup"
        toggle
      >
        Popup
      </ui-button>
      <div class="popup-anchor">
        <ui-popup
          v-slot="{ close }"
          v-model="model.popup"
          class="popup-content"
        >
          <lorem-view :paragraphs="1" />
          <div class="flex gap-05">
            <ui-button
              class="btn round"
              @click="() => { close(); model.click('ok'); }"
            >
              Ok
            </ui-button>
            <ui-button
              class="btn round"
              @click="() => { close(); model.click('cancel'); }"
            >
              Cancel
            </ui-button>
          </div>
          <div class="h-separator" />
          <div class="expand-header">
            <input
              v-model="model.text"
              type="text"
            >
            <ui-button
              v-for="(item, i) in model.paragraphs"
              :key="i"
              v-model="model.lorem.paragraphs"
              class="btn round"
              :toggle="[item]"
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
          <ui-button
            v-model="model.showButtons"
            class="btn round iconic"
            toggle
          >
            <ui-icon :class="['icon-gt', model.showButtons ? 'r90' : '']" />
          </ui-button>
        </div>
      </div>
      <ui-collapse :expanded="model.showButtons">
        <div class="flex col gap-05 m-1">
          <div class="flex gap-05">
            <input
              type="text"
              value="text"
              style="width: 100px"
            >
            <ui-button
              class="btn"
              @click="model.click('focusable')"
            >
              focusable
            </ui-button>
            <ui-button
              class="btn"
              no-focus
              tabindex="-1"
              @click="model.click('non-focusable')"
            >
              non-focusable
            </ui-button>
            <ui-button
              class="btn"
              @click="model.click('focusable')"
            >
              focusable
            </ui-button>
          </div>
          <div>
            Radio (index): {{ model.selectedIndex }}
          </div>
          <div class="flex gap-05">
            <ui-button
              v-for="(item, i) in model.checkboxes"
              :key="`index[${i}]`"
              v-model="model.selectedIndex"
              class="btn round"
              :toggle="[i]"
            >
              {{ `#${i}` }}
            </ui-button>
          </div>
          <div>
            Radio (object): { name: {{ model.selectedRadio.name }}, value:
            {{ model.selectedRadio.value }} }
          </div>
          <div class="flex gap-05">
            <ui-button
              v-for="(item, i) in model.radioItems"
              :key="`object[${i}]`"
              v-model="model.selectedRadio"
              class="btn round"
              :toggle="[model.radioItems[i]]"
            >
              {{ `#${i}` }}
            </ui-button>
          </div>
          <div>
            Checkbox: [&nbsp;<span
              v-for="(item, i) in model.checkboxes"
              :key="i + 300"
            >{{ item }}&nbsp;</span>]
          </div>
          <div class="flex gap-05">
            <ui-button
              v-for="(item, i) in model.checkboxes"
              :key="`checkbox[${i}]`"
              v-model="model.checkboxes[i]"
              class="btn round"
              toggle
            >
              {{ `#${i}` }}
            </ui-button>
          </div>
          <div>Push: {{ model.message }}</div>
          <div class="flex gap-05">
            <ui-button @click="model.click('unstyled')">
              Unstyled
            </ui-button>
            <ui-button
              class="btn"
              @click="model.click('ok')"
            >
              Ok
            </ui-button>
            <ui-button
              class="btn"
              @click="model.click('cancel')"
            >
              Cancel
            </ui-button>
            <ui-button
              class="btn"
              disabled
              @click="model.click('disabled')"
            >
              Disabled
            </ui-button>
            <ui-button
              v-model="model.selectedRadio"
              class="btn"
              :toggle="[model.radioItems[0]]"
              disabled
            >
              Disabled
            </ui-button>
          </div>
        </div>
      </ui-collapse>
    </div>
    <!-- accordions -->
    <div>
      <div class="expand-header">
        <span>Expand, paragraphs:</span>
        <ui-button
          v-for="(item, i) in model.paragraphs"
          :key="i"
          v-model="model.lorem.paragraphs"
          class="btn round small"
          :toggle="[item]"
        >
          {{ item }}
        </ui-button>
        <div class="flex-right">
          <ui-button
            v-model="model.expanded"
            class="btn round iconic"
            toggle
          >
            <ui-icon :class="['icon-gt', model.expanded ? 'r90' : '']" />
          </ui-button>
        </div>
      </div>
      <ui-collapse :expanded="model.expanded">
        <lorem-view
          :model="model.lorem"
          class="content"
        />
      </ui-collapse>
      <template
        v-for="(item, i) in 3"
        :key="`lorem[${i}]`"
      >
        <div class="expand-header">
          <div>Expand (radio #{{ i }}):</div>
          <div class="flex-right">
            <ui-button
              v-model="model.expandedGroup"
              class="btn round iconic"
              :toggle="[i, undefined]"
            >
              <ui-icon :class="['icon-gt', model.expandedGroup === i ? 'r90' : '']" />
            </ui-button>
          </div>
        </div>
        <ui-collapse :expanded="model.expandedGroup === i">
          <lorem-view
            :paragraphs="1"
            class="content"
          />
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
          <ui-button
            v-model="model.showRange"
            class="btn round iconic"
            toggle
          >
            <ui-icon :class="['icon-gt', model.showRange ? 'r90' : '']" />
          </ui-button>
        </div>
      </div>
      <ui-collapse :expanded="model.showRange">
        <div class="ranges">
          <span style="width: 2em">
            {{ model.rangeValue }}
          </span>
          <ui-range
            v-model="model.rangeValue"
            class="inline-range"
            :min="model.rangeMin"
            :max="model.rangeMax"
            :step="model.rangeStep"
          />
          <input
            v-model.number="model.rangeValue"
            type="range"
            :min="model.rangeMin"
            :max="model.rangeMax"
            :step="model.rangeStep"
          >
        </div>
      </ui-collapse>
    </div>
  </div>
</template>

<style lang="scss">
.ranges {
  display: flex;
  margin: 1em;
  gap: 1em;
  height: 2em;
}
.inline-range {
  width: 12em;
  height: 2em;
}

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
}

.expand-header {
  display: flex;
  gap: 0.5em;
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

.btn.small {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>