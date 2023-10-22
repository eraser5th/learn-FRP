import { Cell } from "sodiumjs";
import { ViewItem } from "../util/ViewItem";
import { SSelect } from "./SSelect";
import { range } from "lodash";

const createOption = <S>(s: S) => ({ label: s, value: s });

const months = (
  [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ] as const
).map(createOption);

const monthIndex = (month: string) => {
  switch (month) {
    case "Jan":
      return 0;
    case "Feb":
      return 1;
    case "Mar":
      return 2;
    case "Apr":
      return 3;
    case "May":
      return 4;
    case "Jun":
      return 5;
    case "Jul":
      return 6;
    case "Aug":
      return 7;
    case "Sep":
      return 8;
    case "Oct":
      return 9;
    case "Nov":
      return 10;
    case "Dec":
      return 11;
    default:
      return 0;
  }
};

const years = range(2023, 2040)
  .map((n) => n.toString())
  .map(createOption);

const dates = range(1, 31)
  .map((n) => n.toString())
  .map(createOption);

export class SDateField implements ViewItem<HTMLDivElement> {
  private element: HTMLDivElement;

  public value: Cell<Date>;

  constructor() {
    this.element = document.createElement("div");

    const year = new SSelect([...years], "2023");
    const month = new SSelect([...months], "Jan");
    const date = new SSelect([...dates], "1");

    this.value = year.value.lift3(month.value, date.value, (oy, om, od) => {
      const date = new Date();
      date.setTime(0);
      date.setFullYear(parseInt(oy));
      date.setMonth(monthIndex(om));
      date.setDate(parseInt(od));
      return date;
    });

    this.appendChild(year, month, date);
  }

  getElement() {
    return this.element;
  }

  appendChild(...cs: ViewItem[]) {
    this.element.append(...cs.map((c) => c.getElement()));
    return this;
  }

  render(t: Element) {
    t.append(this.element);
  }
}
