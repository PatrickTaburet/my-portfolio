import { useState } from 'react';

export function useClipboardCopy(timeout = 2000) {
    const [copied, setCopied] = useState(false);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), timeout);
    };

    return { copied, handleCopy };
}
