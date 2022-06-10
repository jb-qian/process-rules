import { useEffect, useRef } from 'react';

function useCanvasOffsetMultiple() {
    const refCanvas = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        function setCanvasOffset(canvas: HTMLCanvasElement) {
            const { offsetWidth = 0, offsetHeight = 0 } = canvas?.parentElement || {};
            canvas.width = offsetWidth * 2;
            canvas.height = offsetHeight * 2;
        }
        function onResize() {
            refCanvas.current && setCanvasOffset(refCanvas.current);
        }
        document.addEventListener('resize', onResize);
        onResize();
        return () => {
            document.removeEventListener('resize', onResize);
        }
    }, []);

    return refCanvas;
}

export default useCanvasOffsetMultiple;
