import { Box } from "~/components/Box";
import { Rule } from "~/util/Rule";
import { SDateField } from "@/airline/SDateField";
import { Label } from "@/airline/Label";
import { SButton } from "@/airline/SButton";

class Airline {
  public static main() {
    const dep = new SDateField();
    const ret = new SDateField();

    dep.value.listen(console.log);

    const r1 = new Rule<Date, Date>(
      (dep, ret) => ret.getTime() - dep.getTime() > 0
    );
    const valid = r1.reify(dep.value, ret.value);
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