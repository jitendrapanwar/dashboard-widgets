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
    widgetInUse: false,
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
  key: "widgets",
  default: widgets,
});

export const layoutAtoms = atom({
  key: "layoutAtoms",
  default: layoutConfig,
});

export const layoutSelectorFamily = selectorFamily({
  key: "layoutSelectorFamily",
  get:
    (widgets: any) =>
    ({ get }) => {
      console.log(widgets);
      const layouts = get(layoutAtoms);
      return layouts.filter((layout) => {
        return widgets?.some((widget: any) => {
          return widget.widgetId === layout.i;
        });
      });
    },
  set:
    (widgets) =>
    ({ set, get }, newValue) => {
      console.log(newValue);
      const layouts = get(layoutAtoms);
      const updatedLayout = layouts.filter((layout) => {
        return widgets?.some((widget: any) => {
          return widget.widgetId === layout.i;
        });
      });
      console.log(updatedLayout);
      //set(layoutAtoms, updatedLayout);
    },
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
        const updatedLayout = layouts.filter((layout) => {
          return widgets?.some((widget: any) => {
            return widget.widgetId === layout.i;
          });
        });
        set(layoutAtoms, updatedLayout);
      }
    },
});

//widgetCardOptions:  update resize, draggable and static props
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
      console.log("4: ", newValue);
      set(layoutAtoms, updatedLayout);
    },
});
