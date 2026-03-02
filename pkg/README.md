# Axiom_Media
High-performance Media VFS Substrate built with Rust, Wasm (SIMD), and OPFS.

### Deployment
Live Site: [axiom-media.netlify.app](https://axiom-media.netlify.app)

### Architecture
- **Rust/Wasm**: Handles raw memory buffers for media stream processing.
- **OPFS (VFS)**: Persistent browser-based file system via WebWorkers for "in-house" storage.
- **SIMD**: Targeted for high-speed data transformations during streaming.
