
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct MediaSubstrate {
    data: Vec<u8>,
}

#[wasm_bindgen]
impl MediaSubstrate {
    #[wasm_bindgen(constructor)]
    pub fn new() -> MediaSubstrate {
        MediaSubstrate { data: Vec::new() }
    }

    pub fn commit_to_buffer(&mut self, chunk: &[u8]) {
        self.data.extend_from_slice(chunk);
    }

    pub fn get_size(&self) -> usize {
        self.data.len()
    }
}
