export interface ViewItem<H extends HTMLElement = HTMLElement> {
  render(target: Element): void;
  getElement(): H;
  appendChild(...viewItems: ViewItem[]): ViewItem<H>;
}
