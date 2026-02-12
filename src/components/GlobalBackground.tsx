import Spline from '@splinetool/react-spline';

export default function GlobalBackground() {
    return (
        <div className="fixed inset-0 z-[-1] w-full h-full pointer-events-none">
            <Spline
                scene="https://prod.spline.design/kc-ue-UW4L6njbbS/scene.splinecode"
            />
        </div>
    );
}
