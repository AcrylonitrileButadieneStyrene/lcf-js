import { readFileSync } from "fs";
import { parse } from "../dist/index.js";

let bytes = readFileSync("tests/data/empty.lmu");
let out = parse(bytes);

if ("MapUnit" in out) {
    let map = out.MapUnit;
    if (map.lower != 20 || map.height != 15) throw "wrong data";
} else throw "not a map unit";
