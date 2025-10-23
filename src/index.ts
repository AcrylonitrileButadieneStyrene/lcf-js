export type * from "./generated.d.ts";
import type { Lcf } from "./generated.d.ts";

import { parse as _parse } from "../pkg/lcf_js.js";

export function parse(bytes: Uint8Array<ArrayBufferLike>): Lcf {
    return _parse(bytes)
}
