import { useEffect, useRef } from 'react';
import './App.css';

import Render from './render';

function App() {

    const renderRef = useRef<Render>();

    useEffect(() => {
        const render = new Render({
            palette: document.querySelector<HTMLDivElement>('.palette')!,
            diagram: document.querySelector<HTMLDivElement>('.diagram')!,
            overview: document.querySelector<HTMLDivElement>('.overview'),
        });
        render.init();
        renderRef.current = render;
        return () => {
            render.destroy();
            renderRef.current = undefined;
        }
    }, []);

    const onLoadJson = () => {
        renderRef.current?.fromJson(JSON.stringify(require('./data.json')));
    };

    const onExportJson = () => {
        renderRef.current?.zoomToFit();
        console.log(renderRef.current?.toJSON());
    };

    return (
        <div className={ 'container' }>
            <div className={ 'palette' }></div>
            <div className='flex'>
                <div className={ 'diagram' }></div>
                {/* <div className={ 'overview' }></div> */}
            </div>
            <div className={ 'handle' }>
                <div className={ 'button' } onClick={ onLoadJson }>加载</div>
                <div className={ 'button' } onClick={ onExportJson }>导出</div>
            </div>
        </div>
    );
}

export default App;
