// export function obfuscText(text: string): string{
//     let obfusc = "";
//     for (let i = 0; i < text.length; i++) {
//         obfusc += String.fromCharCode(text.charCodeAt(i) + 2);
//     }
//     return obfusc;
// }

export function deobfuscText(obfusc: string): string {
    let text = "";
    for (let i = 0; i < obfusc.length; i++) {
        text += String.fromCharCode(obfusc.charCodeAt(i) - 2);
    }
    return text;
}
