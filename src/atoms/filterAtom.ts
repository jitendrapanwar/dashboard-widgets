import { atom, selector } from "recoil";
import { widgetAtoms } from "./index";

export const widgetsFilterState = atom({
  key: "WidgetListFilter",
  default: "Unused",
});

export const filteredWidgetsState = selector({
  key: "FilteredTodoList",
  get: ({ get }) => {
    const filter = get(widgetsFilterState);
    const list = get(widgetAtoms);

    switch (filter) {
      case "Used":
        return list.filter((item) => item.widgetInUse);
      case "Unused":
        return list.filter((item) => !item.widgetInUse);
      default:
        return list;
    }
  },
});
