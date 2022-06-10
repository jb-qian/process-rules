import Gojs from "gojs";
import { elementStyle, textStyle, nodeStyle, rotateStyle, resizeStyle, selectStyle, resizeNodeConfig } from "./config";

type NodeType = {
    key: string;
    text: string;
    val: Gojs.Part;
};

const $ = Gojs.GraphObject.make;

export const createStart = (): NodeType => {
    const key = "Start";
    return {
        key,
        text: "开始",
        val: $(
            Gojs.Node,
            "Table",
            nodeStyle(),
            selectStyle(),
            $(
                Gojs.Panel,
                "Spot",
                $(Gojs.Shape, "Circle", {
                    desiredSize: new Gojs.Size(60, 60),
                    ...elementStyle(),
                }),
                $(Gojs.TextBlock, key, textStyle(), new Gojs.Binding("text"))
            ),
            makePort("B", Gojs.Spot.Bottom, Gojs.Spot.Bottom, true, false)
        ),
    };
};

export const createEnd = (): NodeType => {
    const key = "End";
    return {
        key,
        text: "结束",
        val: $(
            Gojs.Node,
            "Table",
            nodeStyle(),
            selectStyle(),
            $(
                Gojs.Panel,
                "Spot",
                $(Gojs.Shape, "Circle", {
                    desiredSize: new Gojs.Size(60, 60),
                    ...elementStyle(),
                }),
                $(Gojs.TextBlock, key, textStyle(), new Gojs.Binding("text"))
            ),
            makePort("T", Gojs.Spot.Top, Gojs.Spot.Top, false, true),
            makePort("L", Gojs.Spot.Left, Gojs.Spot.Left, false, true),
            makePort("R", Gojs.Spot.Right, Gojs.Spot.Right, false, true)
        ),
    };
};

export const createConditional = (): NodeType => {
    const key = "Conditional";
    const defatult_text = "请输入";
    return {
        key,
        text: defatult_text,
        val: $(
            Gojs.Node,
            "Table",
            nodeStyle(),
            rotateStyle(),
            resizeStyle(),
            $(
                Gojs.Panel,
                "Auto",
                ...resizeNodeConfig(),
                $(
                    Gojs.Shape,
                    "Diamond",
                    {
                        ...elementStyle(),
                    },
                    new Gojs.Binding("figure", "figure")
                ),
                $(
                    Gojs.TextBlock,
                    textStyle(),
                    {
                        margin: new Gojs.Margin(5, 10, 5, 10),
                        wrap: Gojs.TextBlock.WrapFit,
                        editable: true,
                        textEdited: (thisTextBlock: Gojs.TextBlock, _oldString: string, newString: string) => {
                            if (newString === "") {
                                thisTextBlock.text = defatult_text;
                            }
                        }
                    },
                    new Gojs.Binding("text").makeTwoWay(),
                )
            ),
            // four named ports, one on each side:
            makePort("T", Gojs.Spot.Top, Gojs.Spot.Top, false, true),
            makePort("L", Gojs.Spot.Left, Gojs.Spot.Left, true, true),
            makePort("R", Gojs.Spot.Right, Gojs.Spot.Right, true, true),
            makePort("B", Gojs.Spot.Bottom, Gojs.Spot.Bottom, true, false)
        )
    };
}

export const createStep = () => {
    const key = "Step";
    const defatult_text = "步骤";
    return {
        key,
        text: defatult_text,
        val: $(
            Gojs.Node,
            "Table",
            nodeStyle(),
            rotateStyle(),
            resizeStyle(),
            $(
                Gojs.Panel,
                "Auto",
                ...resizeNodeConfig(),
                $(
                    Gojs.Shape,
                    "Rectangle",
                    {
                        minSize: new Gojs.Size(70, 40),
                        ...elementStyle(),
                    },
                    new Gojs.Binding("figure", "figure")
                ),
                $(
                    Gojs.TextBlock,
                    textStyle(),
                    {
                        wrap: Gojs.TextBlock.WrapFit,
                        editable: true,
                        textEdited: (thisTextBlock: Gojs.TextBlock, _oldString: string, newString: string) => {
                            if (newString === "") {
                                thisTextBlock.text = defatult_text;
                            }
                        }
                    },
                    new Gojs.Binding("text").makeTwoWay()
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
        Gojs.Link, // the whole link panel
        {
            routing: Gojs.Link.AvoidsNodes,
            curve: Gojs.Link.JumpOver,
            corner: 5,
            toShortLength: 4,
            relinkableFrom: true,
            relinkableTo: true,
            reshapable: true,
            resegmentable: true,
            // mouse-overs subtly highlight links:
            mouseEnter: (e, link: any) =>
                (link.findObject("HIGHLIGHT").stroke = "rgba(30,144,255,0.3)"),
            mouseLeave: (e, link: any) =>
                (link.findObject("HIGHLIGHT").stroke = "transparent"),
            selectionAdorned: false,
        },
        new Gojs.Binding("points").makeTwoWay(),
        $(
            Gojs.Shape, // the highlight shape, normally transparent
            {
                isPanelMain: true,
                strokeWidth: 8,
                stroke: "transparent",
                name: "HIGHLIGHT",
            }
        ),
        $(
            Gojs.Shape, // the link path shape
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
            Gojs.Shape, // the arrowhead
            {
                toArrow: "standard",
                strokeWidth: 0,
                fill: "gray",
            }
        ),
        $(
            Gojs.Panel,
            "Auto", // the link label, normally not visible
            {
                visible: false,
                name: "LABEL",
                segmentIndex: 2,
                segmentFraction: 0.5,
            },
            new Gojs.Binding("visible", "visible").makeTwoWay(),
            $(
                Gojs.Shape,
                "RoundedRectangle", // the label shape
                {
                    fill: "#F8F8F8",
                    strokeWidth: 0,
                }
            ),
            $(
                Gojs.TextBlock,
                "Yes", // the label
                {
                    textAlign: "center",
                    font: "10pt helvetica, arial, sans-serif",
                    stroke: "#333333",
                    editable: true,
                },
                new Gojs.Binding("text").makeTwoWay()
            )
        )
    );
}

export const makePort = (
    name: string,
    align: Gojs.Spot,
    spot: Gojs.Spot,
    output: boolean,
    input: boolean
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
        cursor: "pointer", // show a different cursor to indicate potential link point
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
