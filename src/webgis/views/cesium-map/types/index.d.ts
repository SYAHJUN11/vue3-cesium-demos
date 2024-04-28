export interface IMap {
  animation?: boolean // 动画组件的显示
  baseLayerPicker?: boolean // 图层选择组件的显示
  fullscreenButton?: boolean // 全屏按钮的显示
  vrButton?: boolean // vr部件
  geocoder?: boolean // 位置搜索部件
  homeButton?: boolean // Home按钮
  infoBox?: boolean // 点击要素之后显示的信息
  sceneModePicker?: boolean // 二三维切换部件
  timeline?: boolean // 时间线控件
  navigationHelpButton?: boolean // 帮助信息控件
}