//import { atom, selector } from "recoil";
import { atom } from "jotai";
import { widgetAtoms } from "./index";

export const widgetsFilter = atom<"All" | "Used" | "Unused">("Used");

export const filteredWidgets = atom((get) => {
  const filter = get(widgetsFilter);
  const list = get(widgetAtoms);
  switch (filter) {
    case "Used":
      return list.filter((item) => item.widgetInUse);
    case "Unused":
      return list.filter((item) => !item.widgetInUse);
    default:
      return list;
  }
});
