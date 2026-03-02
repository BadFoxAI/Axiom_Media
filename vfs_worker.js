
let accessHandles = {};

onmessage = async (e) => {
    const { type, name, payload, offset } = e.data;
    const root = await navigator.storage.getDirectory();

    try {
        if (type === "WRITE") {
            const file = await root.getFileHandle(name, { create: true });
            const handle = await file.createSyncAccessHandle();
            handle.write(payload, { at: offset || 0 });
            handle.flush();
            handle.close();
            postMessage({ type: "SYNC_COMPLETE", name });
        }

        if (type === "LIST") {
            let files = [];
            for await (let [fileName, handle] of root.entries()) {
                const file = await handle.getFile();
                files.push({ name: fileName, size: file.size, type: file.type });
            }
            postMessage({ type: "LIBRARY_LIST", files });
        }

        if (type === "DELETE") {
            await root.removeEntry(name);
            postMessage({ type: "DELETE_COMPLETE", name });
        }
        
        if (type === "CLEAR_ALL") {
            for await (let [name] of root.entries()) {
                await root.removeEntry(name);
            }
            postMessage({ type: "LIBRARY_CLEARED" });
        }
    } catch (err) {
        postMessage({ type: "ERROR", msg: err.toString() });
    }
};
