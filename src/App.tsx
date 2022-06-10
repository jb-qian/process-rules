import { useEffect } from 'react';
import './App.css';

// import useCanvasOffsetMultiple from './hooks/useCanvasOffsetMultiple';

import Render from './render';

function App() {
    useEffect(() => {
        const render = new Render({
            palette: document.querySelector('.palette')!,
            diagram: document.querySelector('.diagram')!,
        });
        render.init();
        return () => {
            render.destroy();
        }
    }, []);

    return (
        <div className={ 'container' }>
            <div className={ 'palette' }></div>
            <div className={ 'diagram' }></div>
        </div>
    );
}

export default App;
