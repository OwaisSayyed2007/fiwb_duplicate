import { useState, useEffect, Suspense, lazy } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

export default function GlobalBackground() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div className="fixed inset-0 z-[-1] w-full h-full pointer-events-none overflow-hidden">
            <Suspense fallback={<div className="absolute inset-0 bg-black" />}>
                <Spline
                    scene="https://prod.spline.design/kc-ue-UW4L6njbbS/scene.splinecode"
                />
            </Suspense>
        </div>
    );
}
