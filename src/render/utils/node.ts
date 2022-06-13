import Gojs from "gojs";
import { elementStyle, textStyle, thumbnailTextStyle, nodeStyle, rotateStyle, resizeStyle, selectStyle, resizeNodeConfig } from "./config";

type NodeType = {
    key: string;
    text: string;
    node: Gojs.Part;
    thumbnail: Gojs.Part;
};

const $ = Gojs.GraphObject.make;

const getTextBlockConfig = (defatultText: string) => {
    return {
        wrap: Gojs.TextBlock.WrapFit,
        textAlign: "center",
        editable: true,
        textEdited: (thisTextBlock: Gojs.TextBlock, _oldString: string, newString: string) => {
            if (newString === "") {
                thisTextBlock.text = defatultText;
            }
        },
    } as const;
};

export const createStart = (): NodeType => {
    const key = "Start";
    const defatultText = "开始";
    const layout = "Auto";
    const styles = [
        ...nodeStyle(),
        ...selectStyle(),
        ...rotateStyle(),
        ...resizeStyle(),
    ];
    const desiredSize = new Gojs.Size(60, 60);
    return {
        key,
        text: defatultText,
        thumbnail: $(
            Gojs.Node,
            layout,
            styles,
            {
                desiredSize: new Gojs.Size(40, 40),
            },
            $(
                Gojs.Panel,
                layout,
                $(Gojs.Shape, "Ellipse", {
                    ...elementStyle(),
                }),
                $(Gojs.TextBlock, key, thumbnailTextStyle(), new Gojs.Binding("text"))
            ),
        ),
        node: $(
            Gojs.Node,
            layout,
            styles,
            $(
                Gojs.Panel,
                layout,
                ...resizeNodeConfig(),
                {
                    desiredSize: desiredSize,
                },
                $(Gojs.Shape, "Ellipse", elementStyle()),
                $(
                    Gojs.TextBlock,
                    textStyle(),
                    getTextBlockConfig(defatultText),
                    new Gojs.Binding("text").makeTwoWay(),
                )
            ),
            makePort("B", Gojs.Spot.Bottom, Gojs.Spot.Bottom, true, false)
        ),
    };
};

export const createEnd = (): NodeType => {
    const key = "End";
    const defatultText = "结束";
    const layout = "Auto";
    const styles = [
        ...nodeStyle(),
        ...selectStyle(),
        ...rotateStyle(),
        ...resizeStyle(),
    ];
    return {
        key,
        text: defatultText,
        thumbnail: $(
            Gojs.Node,
            layout,
            styles,
            {
                desiredSize: new Gojs.Size(40, 40),
            },
            $(
                Gojs.Panel,
                layout,
                $(Gojs.Shape, "Ellipse", elementStyle()),
                $(Gojs.TextBlock, key, thumbnailTextStyle(), new Gojs.Binding("text"))
            ),
        ),
        node: $(
            Gojs.Node,
            layout,
            styles,
            $(
                Gojs.Panel,
                layout,
                ...resizeNodeConfig(),
                {
                    desiredSize: new Gojs.Size(60, 60),
                },
                $(Gojs.Shape, "Ellipse", elementStyle()),
                $(
                    Gojs.TextBlock,
                    textStyle(),
                    getTextBlockConfig(defatultText),
                    new Gojs.Binding("text").makeTwoWay(),
                )
            ),
            makePort("T", Gojs.Spot.Top, Gojs.Spot.Top, false, true),
            makePort("L", Gojs.Spot.Left, Gojs.Spot.Left, false, true),
            makePort("R", Gojs.Spot.Right, Gojs.Spot.Right, false, true)
        ),
    };
};

export const createConditional = (): NodeType => {
    const key = "Conditional";
    const defatultText = "Y/N";
    const layout = "Auto";
    const Diamond = "Diamond";
    const styles = [
        ...nodeStyle(),
        ...selectStyle(),
        ...rotateStyle(),
        ...resizeStyle(),
    ];
    return {
        key,
        text: defatultText,
        thumbnail: $(
            Gojs.Node,
            layout,
            styles,
            $(
                Gojs.Panel,
                layout,
                {
                    desiredSize: new Gojs.Size(60, 40),
                },
                $(Gojs.Shape, Diamond, elementStyle()),
                $(
                    Gojs.TextBlock,
                    thumbnailTextStyle(),
                    new Gojs.Binding("text").makeTwoWay(),
                )
            ),
        ),
        node: $(
            Gojs.Node,
            layout,
            styles,
            $(
                Gojs.Panel,
                layout,
                ...resizeNodeConfig(),
                {
                    desiredSize: new Gojs.Size(90, 60),
                },
                $(Gojs.Shape, Diamond, elementStyle()),
                $(
                    Gojs.TextBlock,
                    textStyle(),
                    getTextBlockConfig(defatultText),
                    new Gojs.Binding("text").makeTwoWay(),
                )
            ),
            makePort("T", Gojs.Spot.Top, Gojs.Spot.Top, false, true),
            makePort("L", Gojs.Spot.Left, Gojs.Spot.Left, true, true),
            makePort("R", Gojs.Spot.Right, Gojs.Spot.Right, true, true),
            makePort("B", Gojs.Spot.Bottom, Gojs.Spot.Bottom, true, false)
        )
    };
}

export const createStep = (): NodeType => {
    const key = "Step";
    const defatultText = "步骤";
    const layout = "Auto";
    const Rectangle = "Rectangle";
    const styles = [
        ...nodeStyle(),
        ...selectStyle(),
        ...rotateStyle(),
        ...resizeStyle(),
    ];
    return {
        key,
        text: defatultText,
        thumbnail: $(
            Gojs.Node,
            layout,
            styles,
            {
                desiredSize: new Gojs.Size(50, 30),
            },
            $(
                Gojs.Panel,
                layout,
                $(Gojs.Shape, Rectangle, elementStyle()),
                $(
                    Gojs.TextBlock,
                    thumbnailTextStyle(),
                    new Gojs.Binding("text").makeTwoWay()
                )
            ),
        ),
        node: $(
            Gojs.Node,
            layout,
            styles,
            $(
                Gojs.Panel,
                layout,
                ...resizeNodeConfig(),
                {
                    desiredSize: new Gojs.Size(90, 54),
                },
                $(Gojs.Shape, Rectangle, elementStyle()),
                $(
                    Gojs.TextBlock,
                    textStyle(),
                    getTextBlockConfig(defatultText),
                    new Gojs.Binding("text").makeTwoWay(),
                )
            ),
            makePort("T", Gojs.Spot.Top, Gojs.Spot.TopSide, false, true),
            makePort("L", Gojs.Spot.Left, Gojs.Spot.LeftSide, true, true),
            makePort("R", Gojs.Spot.Right, Gojs.Spot.RightSide, true, true),
            makePort("B", Gojs.Spot.Bottom, Gojs.Spot.BottomSide, true, false)
        )
    };
}

export const createLinkTemplate = () => {
    return $(
        Gojs.Link,
        {
            routing: Gojs.Link.AvoidsNodes,
            curve: Gojs.Link.JumpOver,
            corner: 5,
            toShortLength: 4,
            relinkableFrom: true,
            relinkableTo: true,
            reshapable: true,
            resegmentable: true,
            mouseEnter: (e, link: any) =>
                (link.findObject("HIGHLIGHT").stroke = "rgba(30, 144, 255, 0.3)"),
            mouseLeave: (e, link: any) =>
                (link.findObject("HIGHLIGHT").stroke = "transparent"),
            selectionAdorned: false,
        },
        new Gojs.Binding("points").makeTwoWay(),
        $(
            // 路径高亮
            Gojs.Shape,
            {
                isPanelMain: true,
                strokeWidth: 8,
                stroke: "transparent",
                name: "HIGHLIGHT",
            }
        ),
        $(
            // 路径
            Gojs.Shape,
            {
                isPanelMain: true,
                stroke: "gray",
                strokeWidth: 2,
            },
            new Gojs.Binding("stroke", "isSelected", (sel) =>
                sel ? "dodgerblue" : "gray"
            ).ofObject()
        ),
        $(
            // 箭头
            Gojs.Shape,
            {
                toArrow: "standard",
                strokeWidth: 0,
                fill: "gray",
            }
        ),
        $(
            Gojs.TextBlock,
            "条件", // the label
            {
                alignmentFocus: new Gojs.Spot(0, 1, -4, 4),
                textAlign: "center",
                font: "10pt helvetica, arial, sans-serif",
                stroke: "#333333",
                editable: true,
                fromSpot: Gojs.Spot.Right,
            },
            new Gojs.Binding("text").makeTwoWay()
        )
    );
}

export const creareDiagram = (element: HTMLDivElement) => {

    function showLinkLabel(event: Gojs.DiagramEvent) {
        const label = event.subject.findObject("LABEL");
        if (label !== null) {
            label.visible = event.subject.fromNode.data.category === "Conditional";
        }
    }

    const GridConfig ={ stroke: "lightgray", strokeWidth: 0.5 };
    return $(Gojs.Diagram, element, {
        grid: $(Gojs.Panel, "Grid",
            {
                gridCellSize: new Gojs.Size(15, 15)
            },
            $(Gojs.Shape, "LineH", GridConfig),
            $(Gojs.Shape, "LineV", GridConfig)
        ),
        "linkingTool.portGravity": 20,
        "relinkingTool.portGravity": 20,
        // 取消动画
        "animationManager.initialAnimationStyle": Gojs.AnimationManager.None,
        "draggingTool.isGridSnapEnabled": true,
        "handlesDragDropForTopLevelParts": true,
        // 定位旋转按钮
        "rotatingTool.handleAngle": 270,
        "rotatingTool.handleDistance": 30,
        // 设置旋转角度
        "rotatingTool.snapAngleMultiple": 15,
        "rotatingTool.snapAngleEpsilon": 15,
        LinkDrawn: showLinkLabel, // this DiagramEvent listener is defined below
        LinkRelinked: showLinkLabel,
        // 支持快捷键 撤回/前进等
        "undoManager.isEnabled": true,
    });
}

export const createPalette = (element: HTMLDivElement) => {
    return $(Gojs.Palette, element, {
        padding: new Gojs.Margin(20, 10, 20, 10),
        "animationManager.initialAnimationStyle": Gojs.AnimationManager.None,
    });
};

export const createOverview = (element: HTMLDivElement, observed: Gojs.Diagram) => {
    return $(Gojs.Overview, element, { observed, contentAlignment: Gojs.Spot.Center });
};

export const makePort = (
    name: string,
    align: Gojs.Spot,
    spot: Gojs.Spot,
    output: boolean,
    input: boolean,
) => {
    const horizontal =
        align.equals(Gojs.Spot.Top) || align.equals(Gojs.Spot.Bottom);
    // the port is basically just a transparent rectangle that stretches along the side of the node,
    // and becomes colored when the mouse passes over it
    return $(Gojs.Shape, {
        fill: "transparent", // changed to a color in the mouseEnter event handler
        strokeWidth: 0, // no stroke
        width: horizontal ? NaN : 8, // if not stretching horizontally, just 8 wide
        height: !horizontal ? NaN : 8, // if not stretching vertically, just 8 tall
        alignment: align, // align the port on the main Shape
        stretch: horizontal
            ? Gojs.GraphObject.Horizontal
            : Gojs.GraphObject.Vertical,
        portId: name, // declare this object to be a "port"
        fromSpot: spot, // declare where links may connect at this port
        fromLinkable: output, // declare whether the user may draw links from here
        toSpot: spot, // declare where links may connect at this port
        toLinkable: input, // declare whether the user may draw links to here
        cursor: "pointer", // show a different cursor to indicadte potential link point
        mouseEnter: (event: Gojs.InputEvent, port: any) => {
            // the PORT argument will be this Shape
            if (!event.diagram.isReadOnly) {
                port.fill = "rgba(255,0,255,0.5)";
            }
        },
        mouseLeave: (event: Gojs.InputEvent, port: any) => {
            port.fill = "transparent";
        },
    });
};
