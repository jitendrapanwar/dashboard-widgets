import { DefaultValue, atom, selectorFamily } from "recoil";

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
  {
    widgetId: "w4",
    widgetTitle: "Widget 4",
    widgetInUse: true,
  },
  {
    widgetId: "w5",
    widgetTitle: "Widget 5",
    widgetInUse: true,
  },
];

let layoutConfig = [
  {
    i: "w1",
    x: 0,
    y: 0,
    w: 1,
    h: 1,
    isResizable: true,
    isDraggable: true,
    static: false,
    isBounded: true,
  },
  {
    i: "w2",
    x: 1,
    y: 0,
    w: 1,
    h: 2,
    isResizable: true,
    isDraggable: true,
    static: false,
    isBounded: true,
  },
  {
    i: "w3",
    x: 2,
    y: 0,
    w: 1,
    h: 1,
    isResizable: true,
    isDraggable: true,
    static: false,
    isBounded: true,
  },
  {
    i: "w4",
    x: 0,
    y: 1,
    w: 2,
    h: 1,
    isResizable: true,
    isDraggable: true,
    static: false,
    isBounded: true,
  },
  {
    i: "w5",
    x: 1,
    y: 1,
    w: 1,
    h: 1,
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
  default: layoutConfig.filter((layout) => {
    return widgets.some((widget) => {
      return widget.widgetId === layout.i && widget.widgetInUse === true;
    });
  }),
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

      // update layouts
      let layouts = get(layoutAtoms);
      if (!(newValue instanceof DefaultValue)) {
        const updatedLayout = layouts.filter(
          (layout) => layout.i !== newValue?.widgetId
        );
        set(layoutAtoms, updatedLayout);
      }
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
