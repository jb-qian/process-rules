import Gojs from "gojs";
import {
    createRenderElement,
    initRenderElement,
    removeRenderElement,
} from "./utils/element";
import {
    createStart,
    createEnd,
    createConditional,
    createStep,
    createLinkTemplate,
    creareDiagram,
    createPalette,
    createOverview,
} from "./utils/node";

type Gonfig = {
    palette: HTMLDivElement;
    diagram: HTMLDivElement;
    overview: HTMLDivElement | undefined | null;
};

class Render {
    private _diagram: Gojs.Diagram | null = null;
    private _palette: Gojs.Palette | null = null;
    private diagramElement = createRenderElement();
    private paletteElement = createRenderElement();

    private nodes = [
        createStart(),
        createConditional(),
        createStep(),
        createEnd(),
    ];

    private get diagram() {
        if (this._diagram === null) {
            this._diagram = creareDiagram(this.diagramElement);
        }
        return this._diagram;
    }

    private get palette() {
        if (this._palette === null) {
            this._palette = createPalette(this.paletteElement);
        }
        return this._palette;
    }

    private config: Partial<Gonfig> = {};
    constructor(config: Gonfig) {
        this.config = config;
        initRenderElement(config.diagram, this.diagramElement);
        initRenderElement(config.palette, this.paletteElement);
    }

    /**
     * init
     */
    public init() {
        this.diagram.linkTemplate = createLinkTemplate();

        // temporary links used by LinkingTool and RelinkingTool are also orthogonal:
        this.diagram.toolManager.linkingTool.temporaryLink.routing =
            Gojs.Link.Orthogonal;
        this.diagram.toolManager.relinkingTool.temporaryLink.routing =
            Gojs.Link.Orthogonal;

        const diagramNodeTemplateMap = new Gojs.Map<string, Gojs.Part>();
        const paletteNodeTemplateMap = new Gojs.Map<string, Gojs.Part>();
        this.nodes.forEach((node) => {
            diagramNodeTemplateMap.set(node.key, node.node);
            paletteNodeTemplateMap.set(node.key, node.thumbnail);
        });
        this.diagram.nodeTemplateMap = diagramNodeTemplateMap;
        this.palette.nodeTemplateMap = paletteNodeTemplateMap;

        this.palette.model = Gojs.Model.fromJson({
            nodeDataArray: this.nodes.map(node => {
                return {
                    category: node.key,
                    text: node.text,
                }
            }),
        });

        this.diagram.model = Gojs.Model.fromJson({
            class: "Gojs.GraphLinksModel",
            linkFromPortIdProperty: "fromPort",
            linkToPortIdProperty: "toPort",
            nodeDataArray: [],
            linkDataArray: [],
        });

        this.config.overview && createOverview(this.config.overview, this.diagram);
    }

    /**
     * fromJson
     * 第一个参数建议用 jsonstring，因为 object 会被引用
     */
    public fromJson(...args: Parameters<typeof Gojs.Model.fromJson>) {
        this.diagram.clear();
        this.diagram.model = Gojs.Model.fromJson(...args);
    }

    /**
     * toJSON
     */
    public toJSON() {
        return JSON.parse(this.diagram.model.toJson());
    }

    /**
     * zoomToFit
     */
    public zoomToFit() {
        this.diagram.commandHandler.zoomToFit();
    }

    /**
     * 销毁
     */
    public destroy() {
        this.diagram?.clear();
        this.palette?.clear();
        removeRenderElement(this.diagramElement);
        removeRenderElement(this.paletteElement);
    }
}

export default Render;
