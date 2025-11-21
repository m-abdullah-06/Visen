export function formatSize(bytes: number) {
    if (bytes === 0) return "0 Bytes";

    const units = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));

    const size = (bytes / Math.pow(1024, i)).toFixed(2);

    return `${size} ${units[i]}`;
}
export const generateUUID = () => crypto.randomUUID();