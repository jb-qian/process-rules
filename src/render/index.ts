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
} from "./utils/node";

class Render {
    private $ = Gojs.GraphObject.make;
    private _diagram: Gojs.Diagram | null = null;
    private diagramElement = createRenderElement();
    private paletteElement = createRenderElement();

    private nodes = [
        createStart(),
        createConditional(),
        createStep(),
        createEnd(),
    ];

    private palette: Gojs.Palette | null = null;

    private get diagram() {
        if (this._diagram === null) {
            this._diagram = this.$(Gojs.Diagram, this.diagramElement, {
                grid: this.$(
                    Gojs.Panel,
                    "Grid",
                    { gridCellSize: new Gojs.Size(15, 15) },
                    this.$(Gojs.Shape, "LineH", {
                        stroke: "lightgray",
                        strokeWidth: 0.5,
                    }),
                    this.$(Gojs.Shape, "LineV", { stroke: "lightgray", strokeWidth: 0.5 })
                ),
                "animationManager.initialAnimationStyle": Gojs.AnimationManager.None,
                "draggingTool.isGridSnapEnabled": true,
                handlesDragDropForTopLevelParts: true,
                // 定位旋转按钮
                "rotatingTool.handleAngle": 270,
                "rotatingTool.handleDistance": 30,
                // 设置旋转角度
                "rotatingTool.snapAngleMultiple": 15,
                "rotatingTool.snapAngleEpsilon": 15,
                LinkDrawn: this.showLinkLabel, // this DiagramEvent listener is defined below
                LinkRelinked: this.showLinkLabel,
                // 支持快捷键 撤回/前进等
                "undoManager.isEnabled": true,
            });
        }
        return this._diagram;
    }

    constructor(options: { palette: HTMLElement; diagram: HTMLElement }) {
        initRenderElement(options.diagram, this.diagramElement);
        initRenderElement(options.palette, this.paletteElement);
    }

    private addNodeTemplateMap(key: string, val: Gojs.Part) {
        return this.diagram.nodeTemplateMap.add(key, val);
    }

    private showLinkLabel(event: Gojs.DiagramEvent) {
        const label = event.subject.findObject("LABEL");
        if (label !== null) {
            label.visible = event.subject.fromNode.data.category === "Conditional";
        }
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

        this.nodes.forEach((node) => {
            this.addNodeTemplateMap(node.key, node.val);
        });

        this.palette = this.$(
            Gojs.Palette,
            this.paletteElement,
            {
                padding: 20,
                "animationManager.initialAnimationStyle": Gojs.AnimationManager.None,
                nodeTemplateMap: this.diagram.nodeTemplateMap, // share the templates used by diagram
                model: new Gojs.GraphLinksModel(
                    this.nodes.map((node) => {
                        return {
                            category: node.key,
                            text: node.text,
                        };
                    })
                ),
            },
        );

        this.diagram.model = Gojs.Model.fromJson({
            class: "Gojs.GraphLinksModel",
            linkFromPortIdProperty: "fromPort",
            linkToPortIdProperty: "toPort",
            nodeDataArray: [],
            linkDataArray: [],
        });
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
