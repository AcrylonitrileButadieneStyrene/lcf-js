use wasm_bindgen::prelude::*;

#[wasm_bindgen(start)]
fn start() {
    console_error_panic_hook::set_once();
}

#[wasm_bindgen]
pub fn parse(bytes: &[u8]) -> wasm_bindgen::JsValue {
    dbg!(serde_wasm_bindgen::to_value(
        &lcf::Lcf::read(&mut std::io::Cursor::new(bytes)).unwrap()
    ))
    .unwrap()
}
