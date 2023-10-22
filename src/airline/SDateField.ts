import { Cell } from 'sodiumjs';
import { ViewItem } from '../util/ViewItem';
import { SSelect } from './SSelect';

const months = [
  { label: 'Jan', value: 'Jan' },
  { label: 'Feb', value: 'Feb' },
  { label: 'Mar', value: 'Mar' },
  { label: 'Apr', value: 'Apr' },
  { label: 'May', value: 'May' },
  { label: 'Jun', value: 'Jun' },
  { label: 'Jul', value: 'Jul' },
  { label: 'Aug', value: 'Aug' },
  { label: 'Sep', value: 'Sep' },
  { label: 'Oct', value: 'Oct' },
  { label: 'Nov', value: 'Nov' },
  { label: 'Dec', value: 'Dec' },
] as const;

const monthIndex = (month: string) => {
  switch (month) {
    case 'Jan':
      return 0;
    case 'Feb':
      return 1;
    case 'Mar':
      return 2;
    case 'Apr':
      return 3;
    case 'May':
      return 4;
    case 'Jun':
      return 5;
    case 'Jul':
      return 6;
    case 'Aug':
      return 7;
    case 'Sep':
      return 8;
    case 'Oct':
      return 9;
    case 'Nov':
      return 10;
    case 'Dec':
      return 11;
    default:
      return 0;
  }
};

const years = [
  { label: '2023', value: '2023' },
  { label: '2024', value: '2024' },
  { label: '2025', value: '2025' },
  { label: '2026', value: '2026' },
  { label: '2027', value: '2027' },
  { label: '2028', value: '2028' },
] as const;

export class SDateField implements ViewItem<HTMLDivElement> {
  private element: HTMLDivElement;

  public value: Cell<Date>;

  constructor() {
    this.element = document.createElement('div');

    const year = new SSelect([...years], '2023');
    const month = new SSelect([...months], 'Jan');

    this.value = year.value.lift(month.value, (oy, om) => {
      const date = new Date();
      date.setFullYear(parseInt(oy));
      date.setMonth(monthIndex(om));
      return date;
    });

    this.appendChild(year, month);
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
