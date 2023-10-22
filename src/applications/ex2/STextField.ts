import { Cell, Stream, StreamSink } from "sodiumjs";
import { HTMLElementEvent } from "~/util/HTMLElementEvent";
import { ViewItem } from "~/util/ViewItem";

class TextField implements ViewItem<HTMLInputElement> {
  public text: Cell<string>;
  public sUserChanges: Stream<string>;

  private input: HTMLInputElement;

  constructor(initText: string) {
    const sUserChangesSnk: StreamSink<string> = new StreamSink<string>();
    this.sUserChanges = sUserChangesSnk;

    this.text = sUserChangesSnk
      .filter((s) => parseInt(s) === parseInt(s))
      .hold(initText);
    this.input = document.createElement("input");
    this.input.value = this.text.sample();
    this.input.addEventListener("input", {
      handleEvent: (event: HTMLElementEvent<HTMLInputElement>) => {
        this.text = this.text.map(() => event.target?.value);
        sUserChangesSnk.send(event.target.value);
      },
    });
  }

  getElement() {
    return this.input;
  }

  appendChild(...cs: ViewItem[]) {
    this.input.append(...cs.map((c) => c.getElement()));
    return this;
  }

  render(t: Element): void {
    t.appendChild(this.input);
  }
}

export default TextField;
