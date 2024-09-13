import { atom, selectorFamily } from "recoil";

let widgets = [
  {
    widgetId: "w1",
    widgetTitle: "Widget 1",
    widgetInUse: true,
  },
  {
    widgetId: "w2",
    widgetTitle: "Widget 2",
    widgetInUse: true,
  },
  {
    widgetId: "w3",
    widgetTitle: "Widget 3",
    widgetInUse: true,
  },
];

let layoutConfig = [
  {
    i: "w1",
    x: 0,
    y: 0,
    w: 2,
    h: 10,
    isResizable: true,
    isDraggable: true,
    static: false,
    isBounded: true,
  },
  {
    i: "w2",
    x: 2,
    y: 0,
    w: 4,
    h: 10,
    isResizable: true,
    isDraggable: true,
    static: false,
    isBounded: true,
  },
  {
    i: "w3",
    x: 6,
    y: 0,
    w: 2,
    h: 10,
    isResizable: true,
    isDraggable: true,
    static: false,
    isBounded: true,
  },
];

export const widgetAtoms = atom({
  key: "widgets", // unique ID (with respect to other atoms/selectors)
  default: widgets,
});

export const layoutAtoms = atom({
  key: "layoutAtoms", // unique ID (with respect to other atoms/selectors)
  default: layoutConfig,
});

export const widgetSelectorFamily = selectorFamily({
  key: "widgetSelectorFamily",
  get:
    (widgetId) =>
    ({ get }) => {
      const widgets = get(widgetAtoms);
      const widget = widgets.find((widget) => widget.widgetId === widgetId);
      return widget;
    },
  set:
    (widgetId) =>
    ({ set, get }, newValue) => {
      console.log(newValue);
      const widgets = get(widgetAtoms);

      const updatedWidgets = widgets.map((widget) => {
        if (widget.widgetId === widgetId) {
          return { ...widget, ...newValue }; // Replace edition with a new value
        }
        return widget;
      });
      set(widgetAtoms, updatedWidgets);
    },
});

export const widgetLayoutSelectorFamily = selectorFamily({
  key: "widgetLayoutSelectorFamily",
  get:
    (widgetId) =>
    ({ get }) => {
      const layouts = get(layoutAtoms);
      const layout = layouts.find((layout) => layout.i === widgetId);
      return layout;
    },
  set:
    (widgetId) =>
    ({ set, get }, newValue) => {
      let layouts = get(layoutAtoms);
      const updatedLayout = layouts.map((layout) => {
        if (layout.i === widgetId) {
          return { ...layout, ...newValue }; // Replace edition with a new value
        }
        return layout;
      });
      set(layoutAtoms, updatedLayout);
    },
});
