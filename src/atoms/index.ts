import { atom } from "jotai";
import { atomFamily } from "jotai/utils";
import { LayoutPropsType, WidgetType } from "../types";
import { filteredWidgets } from "./filterAtom";

let widgets = [
  {
    widgetId: "w1",
    widgetTitle: "Widget 1",
    widgetInUse: true,
    layout: {
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
  },
  {
    widgetId: "w2",
    widgetTitle: "Widget 2",
    widgetInUse: false,
    layout: {
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
  },
  {
    widgetId: "w3",
    widgetTitle: "Widget 3",
    widgetInUse: true,
    layout: {
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
  },
  {
    widgetId: "w4",
    widgetTitle: "Widget 4",
    widgetInUse: true,
    layout: {
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
  },
  {
    widgetId: "w5",
    widgetTitle: "Widget 5",
    widgetInUse: true,
    layout: {
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

export const widgetAtoms = atom<WidgetType[]>(widgets);
export const layoutAtoms = atom<LayoutPropsType[]>(layoutConfig);

export const layoutSelectorFamily = atom(
  (get) => {
    const widgets = get(filteredWidgets);
    return widgets.map((widget) => widget.layout);
  },
  (_get, set, updatedLayout: LayoutPropsType[]) => {
    console.log(updatedLayout);
    set(layoutAtoms, updatedLayout);
  }
);

export const widgetSelectorFamily = atomFamily((widgetId) =>
  atom(
    (get) => {
      const widgets = get(widgetAtoms);
      const widget = widgets.find((widget) => widget.widgetId === widgetId);
      return widget;
    },
    (get, set, newValue: any) => {
      const widgets = get(widgetAtoms);
      const updatedWidgets = widgets.map((widget) => {
        if (widget.widgetId === newValue.widgetId) {
          return { ...widget, ...newValue }; // Replace edition with a new value
        }
        return widget;
      });
      set(widgetAtoms, updatedWidgets);
    }
  )
);

// export const widgetSelectorFamily = selectorFamily({
//   key: "widgetSelectorFamily",
//   get:
//     (widgetId) =>
//     ({ get }) => {
//       const widgets = get(widgetAtoms);
//       const widget = widgets.find((widget) => widget.widgetId === widgetId);
//       return widget;
//     },
//   set:
//     (widgetId) =>
//     ({ set, get }, newValue) => {
//       console.log(newValue);
//       const widgets = get(widgetAtoms);

//       const updatedWidgets = widgets.map((widget) => {
//         if (widget.widgetId === widgetId) {
//           return { ...widget, ...newValue }; // Replace edition with a new value
//         }
//         return widget;
//       });
//       set(widgetAtoms, updatedWidgets);

//       // update layouts
//       let layouts = get(layoutAtoms);
//       if (!(newValue instanceof DefaultValue)) {
//         const updatedLayout = layouts.filter((layout) => {
//           return widgets?.some((widget: any) => {
//             return widget.widgetId === layout.i;
//           });
//         });
//         set(layoutAtoms, updatedLayout);
//       }
//     },
// });

// //widgetCardOptions:  update resize, draggable and static props
// export const widgetLayoutSelectorFamily = selectorFamily({
//   key: "widgetLayoutSelectorFamily",
//   get:
//     (widgetId) =>
//     ({ get }) => {
//       const layouts = get(layoutAtoms);
//       const layout = layouts.find((layout) => layout.i === widgetId);
//       return layout;
//     },
//   set:
//     (widgetId) =>
//     ({ set, get }, newValue) => {
//       let layouts = get(layoutAtoms);
//       const updatedLayout = layouts.map((layout) => {
//         if (layout.i === widgetId) {
//           return { ...layout, ...newValue }; // Replace edition with a new value
//         }
//         return layout;
//       });
//       console.log("4: ", newValue);
//       set(layoutAtoms, updatedLayout);
//     },
// });
