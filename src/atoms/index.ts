import { atom, atomFamily } from "recoil";

let widgets = [
  {
    widgetId: "w1",
    widgetTitle: "Widget 1",
    widgetInUse: true,
    layout: {
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
  },
  {
    widgetId: "w2",
    widgetTitle: "Widget 2",
    widgetInUse: true,
    layout: {
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
  },
  {
    widgetId: "w3",
    widgetTitle: "Widget 2",
    widgetInUse: true,
    layout: {
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

export const widgetAtomFamily = atomFamily({
  key: "widgetAtomFamily",
  default: (id: string) => ({
    i: id,
    x: 0,
    y: 0,
    w: 2,
    h: 10,
    isResizable: true,
    isDraggable: true,
    static: false,
    isBounded: true,
  }),
});
