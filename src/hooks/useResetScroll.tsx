import { useLayoutEffect } from 'react';

export default function useResetScroll() {
    useLayoutEffect(() => {
        // Disable automatic scroll restoration
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }

        // Function to reset scroll to the top
        const reset = () => window.scrollTo(0, 0);

        // On initial mount
        reset();

        // When the page is restored from the back/forward cache
        window.addEventListener('pageshow', reset);

        // Before unload (prepare for a future reload)
        window.addEventListener('beforeunload', reset);

        return () => {
            window.removeEventListener('pageshow', reset);
            window.removeEventListener('beforeunload', reset);
        };
    }, []);
}
