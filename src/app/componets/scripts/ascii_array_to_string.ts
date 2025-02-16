export default function asciiArrayToString(asciiArray: number[]): string {
    const bytes = new Uint8Array(asciiArray); // Create a Uint8Array from the hex values
    const decoder = new TextDecoder('utf-8'); // Create a UTF-8 decoder
    return decoder.decode(bytes); // Decode the bytes into a string
}