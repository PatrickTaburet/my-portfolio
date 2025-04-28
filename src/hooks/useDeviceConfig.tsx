import { useState, useEffect } from 'react';

type DeviceConfig = {
    rectHeights: number[];
    rectWidth: number;
}

const CONFIGS: Record<'mobile' | 'tablet' | 'desktop', DeviceConfig> = {
    mobile: {
        rectHeights: [160, 100, 120, 80, 40, 60, 20],
        rectWidth: 20
    },
    tablet: {
        rectHeights: [360, 280, 320, 200, 240, 160, 80, 120, 40],
        rectWidth: 30
    },
    desktop: {
        rectHeights: [360, 280, 320, 200, 240, 160, 80, 120, 40],
        rectWidth: 40
    }
}

function getDevice(width: number): 'mobile' | 'tablet' | 'desktop' {
    if (width < 560) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
}

export default function useDeviceConfig(): DeviceConfig {
    const [config, setConfig] = useState<DeviceConfig>(
        CONFIGS[getDevice(window.innerWidth)]
    );

    useEffect(() => {
        const onResize = () => {
            const device = getDevice(window.innerWidth);
            setConfig(CONFIGS[device]);
        }
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, [])

    return config;
}