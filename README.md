# lcf-js
JavaScript bindings to [lcf-rs](https://github.com/AcrylonitrileButadieneStyrene/lcf-rs).

# Installation
```sh
npm i AcrylonitrileButadieneStyrene/lcf-js#builds
```

# Usage
```js
import { readFileSync } from "fs";
import { parse } from "acrylonitrilebutadienestyrene/lcf-js";

const bytes = readFileSync(...);

// `serde-reflect` does not yet support externally typed enums.
// When it does this will be [TYPE, VALUE] instead of { [TYPE]: VALUE }.
const lcf = parse(bytes);
if ("MapUnit" in lcf) {
    const map = lcf.MapUnit;
} else if ("MapTree" in lcf) {
    const tree = lcf.MapTree;
} else if ("SaveData" in lcf) {
    const save = lcf.SaveData;
} else if ("DataBase" in lcf) {
    const data = lcf.DataBase;
}

// You could do this instead:
const key = Object.keys(lcf)[0];
({
    "MapUnit": map => {},
    "MapTree": tree => {},
    "SaveData": save => {},
    "DataBase": data => {},
})[key](lcf[key]);
```