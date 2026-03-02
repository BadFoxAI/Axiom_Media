
let accessHandle = null;
onmessage = async (e) => {
    const { type, payload, name } = e.data;
    if (type === "INIT") {
        const root = await navigator.storage.getDirectory();
        const file = await root.getFileHandle(name, { create: true });
        accessHandle = await file.createSyncAccessHandle();
        postMessage({ status: "READY" });
    }
    if (type === "WRITE") {
        accessHandle.write(payload, { at: e.data.offset || 0 });
        accessHandle.flush();
        postMessage({ status: "WRITTEN", size: payload.byteLength });
    }
};
