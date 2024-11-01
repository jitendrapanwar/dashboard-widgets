export interface LayoutPropsType {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  isBounded?: boolean;
  isDraggable: boolean;
  isResizable: boolean;
  static: boolean;
}

export interface WidgetType {
  widgetId: string;
  widgetTitle: string;
  widgetInUse: boolean;
  layout: LayoutPropsType
}
