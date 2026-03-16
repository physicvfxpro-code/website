export default function Loader({ fading }) {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center" style={{ pointerEvents: fading ? 'none' : 'all' }}>
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: '#07070e',
                    opacity: fading ? 0 : 1,
                    transition: 'opacity 0.8s ease',
                }}
            />
            <span
                className="text-accent text-3xl font-black tracking-widest select-none relative z-10"
                style={{
                    opacity: fading ? 0 : 1,
                    transition: 'opacity 0.5s ease',
                }}
            >




                <div className="flex flex-row justify-center">
                    <h1 className="text-6xl font-bold text-primary mb-4 animate-waviy delay-0">p</h1>
                    <h1 className="text-6xl font-bold text-primary mb-4 animate-waviy delay-1">h</h1>
                    <h1 className="text-6xl font-bold text-primary mb-4 animate-waviy delay-2">y</h1>
                    <h1 className="text-6xl font-bold text-primary mb-4 animate-waviy delay-3">s</h1>
                    <h1 className="text-6xl font-bold text-primary mb-4 animate-waviy delay-4">i</h1>
                    <h1 className="text-6xl font-bold text-primary mb-4 animate-waviy delay-5">c</h1>
                </div>
            </span>
        </div>
    )
}