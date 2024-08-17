export interface LayoutPropsType {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  isBounded?: boolean;
  isDraggable: boolean;
  isResizable: boolean;
  maxH?: number;
  maxW?: number;
  minH?: number;
  minW?: number;
  moved?: boolean;
  resizeHandles?: undefined;
  static: boolean;
}

export interface WidgetType {
  widgetId: string;
  widgetTitle: string;
  widgetInUse: boolean;
  layout: LayoutPropsType
}
