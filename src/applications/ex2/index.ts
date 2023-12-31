import { Box } from "~/components/Box";
import SLabel from "@/ex2/SLabel";
import STextField from "@/ex2/STextField";

import { Cell } from "sodiumjs";

class FRP {
  public static main() {
    const textA: STextField = new STextField("0");
    const textB: STextField = new STextField("0");

    const a: Cell<number> = textA.text.map((s) => parseInt(s));
    const b: Cell<number> = textB.text.map((s) => parseInt(s));

    const sum: Cell<number> = a.lift(b, (a_, b_) => a_ + b_);

    const lblSum: SLabel = new SLabel(sum.map((i) => i.toString()));

    new Box().appendChild(textA, textB, lblSum).render(document.body);
  }
}

FRP.main();
