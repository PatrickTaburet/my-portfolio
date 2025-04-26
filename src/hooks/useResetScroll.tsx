import { useEffect } from 'react';

export default function useResetScroll() {
    useEffect(() => {
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);

    }, []);
}
