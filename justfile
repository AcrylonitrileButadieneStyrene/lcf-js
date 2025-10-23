build-rust:
    wasm-pack build rust -d ../pkg --release
    cargo run
build-js:
    npx vite build
build: build-rust && build-js
