export const initRenderElement = (parendNode: HTMLElement, element: HTMLElement) => {
    parendNode.innerHTML = '';
    parendNode.appendChild(element);
}

export const setCanvasOffset = (canvas: HTMLCanvasElement) => {
    const { offsetWidth = 0, offsetHeight = 0 } = canvas?.parentElement || {};
    canvas.width = offsetWidth * 2;
    canvas.height = offsetHeight * 2;
    return canvas;
}

export const createRenderElement = () => {
    const div = document.createElement("div");
    div.style.width = "100%";
    div.style.height = "100%";
    const canvas = document.createElement("canvas");
    div.appendChild(setCanvasOffset(canvas));
    return div;
}

export const removeRenderElement = (element: HTMLElement) => {
    element.parentElement?.removeChild(element);
}
