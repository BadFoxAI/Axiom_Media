
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct MediaKernel {
    buffer: Vec<u8>,
}

#[wasm_bindgen]
impl MediaKernel {
    #[wasm_bindgen(constructor)]
    pub fn new(size: usize) -> MediaKernel {
        MediaKernel { buffer: vec![0u8; size] }
    }

    pub fn get_ptr(&self) -> *const u8 { self.buffer.as_ptr() }
    
    // SIMD Optimized "Scrub" - can be used for simple bitwise transformations
    pub fn apply_mask(&mut self, mask: u8) {
        for b in self.buffer.iter_mut() { *b ^= mask; }
    }
}
