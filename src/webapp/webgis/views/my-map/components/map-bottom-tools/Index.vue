<template>
  <div class="map-bottom-tools">
    <a-tooltip overlayClassName="button-tip" title="底图类型" color="#096dd9">
      <a-dropdown trigger="click" placement="topLeft" v-model:open="isOpenChangeBaseLayer">
        <template #overlay>
          <a-menu class="base-layer-menus" triggerSubMenuAction="click" @click="onChangeBaseLayer">
            <a-menu-item key="tdt-image" :class="{ 'active-menu-item': selectedMapKeys.indexOf('tdt-image') > -1 }">
              遥感地图
            </a-menu-item>
            <a-menu-item key="tdt-vector" :class="{ 'active-menu-item': selectedMapKeys.indexOf('tdt-vector') > -1 }">
              规划地图
            </a-menu-item>
          </a-menu>
        </template>
        <div class="button" :class="{ 'active-button': isOpenChangeBaseLayer }">
          <svg class="svg-icon" width="16" height="16" viewBox="0 0 16 16">
            <path
              d="M8 1C4.13438 1 1 4.13438 1 8C1 11.8656 4.13438 15 8 15C11.8656 15 15 11.8656 15 8C15 4.13438 11.8656 1 8 1ZM8 4.5C7.53906 4.5 7.08906 4.45937 6.65312 4.38281C7.0625 2.73906 7.67812 1.875 8 1.875C8.32187 1.875 8.9375 2.73906 9.34688 4.38281C8.91094 4.45781 8.46094 4.5 8 4.5ZM10.1984 4.18125C9.98594 3.31094 9.70156 2.57812 9.36875 2.03437C10.3625 2.2625 11.2641 2.73281 12.0094 3.37969C11.4578 3.72031 10.8484 3.99062 10.1984 4.18125ZM5.80156 4.18125C5.15156 3.99062 4.54375 3.71875 3.99219 3.37969C4.7375 2.73281 5.6375 2.26406 6.63125 2.03594C6.29844 2.57812 6.01562 3.31094 5.80156 4.18125ZM10.6172 7.5625C10.5969 6.66406 10.5125 5.81406 10.3766 5.04063C11.1969 4.80625 11.9594 4.45781 12.6391 4.0125C13.4734 4.98125 14.0063 6.21094 14.1031 7.5625L10.6172 7.5625ZM1.89688 7.5625C1.99375 6.2125 2.525 4.98281 3.35781 4.01406C4.0375 4.45937 4.80156 4.80469 5.62344 5.03906C5.4875 5.81406 5.40312 6.66406 5.38281 7.5625L1.89688 7.5625ZM6.25781 7.5625C6.27812 6.69219 6.35781 5.91563 6.475 5.23906C6.96875 5.32656 7.47656 5.375 8 5.375C8.52188 5.375 9.03125 5.32812 9.525 5.24062C9.64219 5.91719 9.72031 6.69375 9.74219 7.5625L6.25781 7.5625ZM12.6391 11.9875C11.9594 11.5422 11.1969 11.1938 10.3766 10.9594C10.5125 10.1844 10.5969 9.33438 10.6172 8.4375L14.1031 8.4375C14.0063 9.78906 13.4734 11.0188 12.6391 11.9875ZM6.475 10.7609C6.35781 10.0844 6.27969 9.30781 6.25781 8.4375L9.74063 8.4375C9.72031 9.30625 9.64219 10.0828 9.52344 10.7594C9.03125 10.6719 8.52188 10.625 8 10.625C7.47813 10.625 6.96875 10.6734 6.475 10.7609ZM3.35938 11.9859C2.52656 11.0172 1.99375 9.7875 1.89844 8.4375L5.38438 8.4375C5.40469 9.33594 5.48906 10.1859 5.625 10.9609C4.80312 11.1953 4.03906 11.5406 3.35938 11.9859ZM8 14.125C7.67812 14.125 7.0625 13.2609 6.65312 11.6172C7.08906 11.5422 7.53906 11.5 8 11.5C8.46094 11.5 8.91094 11.5422 9.34688 11.6172C8.9375 13.2609 8.32187 14.125 8 14.125ZM9.36875 13.9656C9.70156 13.4219 9.98594 12.6891 10.1984 11.8188C10.85 12.0094 11.4578 12.2797 12.0094 12.6187C11.2641 13.2672 10.3625 13.7375 9.36875 13.9656ZM6.63125 13.9656C5.6375 13.7375 4.7375 13.2688 3.99219 12.6219C4.54219 12.2812 5.15 12.0109 5.80156 11.8203C6.01562 12.6891 6.29844 13.4219 6.63125 13.9656Z" />
          </svg>
        </div>
      </a-dropdown>
    </a-tooltip>
    <a-tooltip overlayClassName="button-tip" title="地图模式" color="#096dd9">
      <div class="button" @click="onChangeMapMode">
        <span class="text">{{ currentMode }}</span>
      </div>
    </a-tooltip>
    <a-tooltip overlayClassName="button-tip" title="放大" color="#096dd9">
      <div class="button" @click="zoomIn">
        <svg class="svg-icon" width="16" height="16" viewBox="0 0 16 16">
          <path
            d="M13.1275 7.0275C13.1275 3.6675 10.3875 0.9375 7.0275 0.9375C3.6675 0.9375 0.9375 3.6675 0.9375 7.0275C0.9375 10.3875 3.6675 13.1275 7.0275 13.1275C8.4275 13.1275 9.7075 12.6475 10.7275 11.8575L12.8075 13.9375C12.8075 13.9375 12.8975 14.0075 12.9575 14.0375L13.1375 14.0675C13.1975 14.0675 13.2575 14.0575 13.3175 14.0375L13.4675 13.9375C13.5575 13.8475 13.6075 13.7275 13.6075 13.6075C13.6075 13.6075 13.5575 13.3575 13.4675 13.2675L11.4275 11.2375C12.4775 10.1375 13.1275 8.6575 13.1275 7.0275ZM7.0274 1.8774C9.8774 1.8774 12.1874 4.1874 12.1874 7.0274C12.1874 9.8774 9.8774 12.1874 7.0274 12.1874C4.1874 12.1874 1.8774 9.8774 1.8774 7.0274C1.8774 4.1874 4.1874 1.8774 7.0274 1.8774Z" />
          <path
            d="M7.50313 4.92312C7.50313 4.79313 7.45312 4.68313 7.36312 4.59312C7.27312 4.50313 7.15312 4.45312 7.03312 4.45312C6.90312 4.45312 6.78312 4.50313 6.70312 4.59312C6.61312 4.68313 6.56312 4.79313 6.56312 4.92312L6.56312 6.56312L4.92312 6.56312C4.79313 6.56312 4.68313 6.61312 4.59312 6.70312C4.50313 6.78312 4.45312 6.90312 4.45312 7.03312C4.45312 7.15312 4.50313 7.27312 4.59312 7.36312C4.68313 7.45312 4.79313 7.50313 4.92312 7.50313L6.56312 7.50313L6.56312 9.14313C6.56312 9.26312 6.61312 9.38313 6.70312 9.47313C6.78312 9.56313 6.90312 9.61312 7.03312 9.61312C7.15312 9.61312 7.27312 9.56313 7.36312 9.47313C7.45312 9.38313 7.50313 9.26312 7.50313 9.14313L7.50313 7.50313L9.16313 7.50313C9.29313 7.50313 9.41313 7.45312 9.50313 7.36312C9.58313 7.27312 9.63313 7.15312 9.63313 7.03312C9.63313 6.90312 9.58313 6.78312 9.50313 6.70312C9.41313 6.61312 9.29313 6.56312 9.16313 6.56312L7.50313 6.56312L7.50313 4.92312Z" />
        </svg>
      </div>
    </a-tooltip>
    <a-tooltip overlayClassName="button-tip" title="缩小" color="#096dd9">
      <div class="button" @click="zoomOut">
        <svg class="svg-icon" width="16" height="16" viewBox="0 0 16 16">
          <path
            d="M13.1275 7.0275C13.1275 3.6675 10.3875 0.9375 7.0275 0.9375C3.6675 0.9375 0.9375 3.6675 0.9375 7.0275C0.9375 10.3875 3.6675 13.1275 7.0275 13.1275C8.4275 13.1275 9.7075 12.6475 10.7275 11.8575L12.8075 13.9375C12.8075 13.9375 12.8975 14.0075 12.9575 14.0375L13.1375 14.0675C13.1975 14.0675 13.2575 14.0575 13.3175 14.0375L13.4675 13.9375C13.5575 13.8475 13.6075 13.7275 13.6075 13.6075C13.6075 13.6075 13.5575 13.3575 13.4675 13.2675L11.4275 11.2375C12.4775 10.1375 13.1275 8.6575 13.1275 7.0275ZM7.0274 1.8774C9.8774 1.8774 12.1874 4.1874 12.1874 7.0274C12.1874 9.8774 9.8774 12.1874 7.0274 12.1874C4.1874 12.1874 1.8774 9.8774 1.8774 7.0274C1.8774 4.1874 4.1874 1.8774 7.0274 1.8774Z" />
          <path
            d="M4.59013 6.6995C4.50212 6.7875 4.45312 6.9065 4.45312 7.0315C4.45312 7.1555 4.50212 7.2745 4.59013 7.3625C4.67812 7.4505 4.79712 7.5005 4.92212 7.5005L9.16713 7.5005C9.29112 7.5005 9.41012 7.4505 9.49813 7.3625C9.58612 7.2745 9.63513 7.1555 9.63513 7.0315C9.63513 6.9065 9.58612 6.7875 9.49813 6.6995C9.41012 6.6115 9.29112 6.5625 9.16713 6.5625L4.92212 6.5625C4.79712 6.5625 4.67812 6.6115 4.59013 6.6995Z" />
        </svg>
      </div>
    </a-tooltip>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { changeBaseLayer } from '../../hooks/useLayers'
import { zoomIn, zoomOut } from '../../hooks/mapEvents'

const router = useRouter()
const selectedMapKeys = ref<string[]>(['tdt-image'])
const isOpenChangeBaseLayer = ref<boolean>(false)
const currentMode = ref<string>('3D')

function onChangeBaseLayer(e: any) {
  selectedMapKeys.value = [e.key]
  changeBaseLayer(e.key)
}

function onChangeMapMode() {
  router.push('/my-2d-map')
}
</script>

<style lang="less" scoped>
.map-bottom-tools {
  display: flex;
  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 8px;
    padding: 6px;
    border-radius: 5px;
    background: #fff;
    border: 1px solid #fff;
    box-shadow: 0px 2px 11px rgba(55, 99, 170, 0.25);
    cursor: pointer;
    .text {
      font-size: 14px;
    }
    &:hover {
      background: #e6f4ff;
      border-color: #096dd9;
      .text {
        color: #096dd9;
      }
      .svg-icon {
        fill: #096DD9;
      }
    }
    &:active {
      background: #096dd9;
      border: 1px solid #096dd9;
      .svg-icon {
        fill: #fff;
      }
      .text {
        color: #fff;
      }
    }
  }
  .active-button {
    background: #096DD9 !important;
    border: 1px solid #096dd9 !important;
    .text {
      color: #fff !important;
    }
    .svg-icon {
      fill: #fff !important;
    }
  }
}
</style>
<style lang="less">
.ant-dropdown {
  .base-layer-menus {
    .ant-dropdown-menu-item {
      margin: 2px 0;
      .ant-dropdown-menu-title-content {
        display: flex;
        align-items: center;

        img {
          margin-right: 6px;
        }
      }
      &:hover {
        background: #e6f4ff;
      }
    }
    .ant-dropdown-menu-item-active {
      background: none;
    }
    .active-menu-item {
      background: #e6f4ff !important;
      color: #000 !important;
    }
  }
}
.button-tip {
  margin-top: -6px;
  padding-bottom: 4px !important;
  .ant-tooltip-content {
    .ant-tooltip-arrow {
      display: none;
    }
  }
}
</style>