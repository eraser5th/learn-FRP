import { Rule } from "~/util/Rule";
import { Box } from "~/components/Box";
import { Label } from "~/components/Label";
import { SDateField } from "@/airline/SDateField";
import { SButton } from "@/airline/SButton";

const unlucky = (date: Date) => {
  const day = date.getDate();
  return day === 4 || day === 14 || day === 24;
};

class Airline {
  public static main() {
    const dep = new SDateField();
    const ret = new SDateField();

    const r1 = new Rule<Date, Date>(
      (dep, ret) => ret.getTime() - dep.getTime() > 0
    );
    const r2 = new Rule<Date, Date>(
      (dep, ret) => !unlucky(dep) && !unlucky(ret)
    );
    const valid = r1.and(r2).reify(dep.value, ret.value);

    const ok = new SButton("OK", valid);

    ok.sClicked.listen((_) => console.log("HI"));
    new Box()
      .appendChild(
        new Box().appendChild(new Label("Departure"), dep),
        new Box().appendChild(new Label("Return"), ret),
        ok
      )
      .render(document.body);
  }
}

Airline.main();
