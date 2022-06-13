import Gojs from "gojs";

const $ = Gojs.GraphObject.make;

export const textStyle = () => {
    return {
        font: "bold 11pt Lato, Helvetica, Arial, sans-serif",
        stroke: "#333",
    } as const;
}

export const thumbnailTextStyle = () => {
    return {
        font: "bold 8pt Lato, Helvetica, Arial, sans-serif",
        stroke: "#333",
    } as const;
}

export const elementStyle = () => {
    return {
        fill: "#fff",
        stroke: "#000",
        strokeWidth: 1,
    } as const;
}

export const nodeSelectionAdornmentTemplate =
    $(Gojs.Adornment, "Auto",
        $(Gojs.Shape, { fill: null, stroke: "deepskyblue", strokeWidth: 1.5, }),
        $(Gojs.Placeholder)
    );

export const nodeResizeAdornmentTemplate =
    $(Gojs.Adornment, "Spot",
        { locationSpot: Gojs.Spot.Right },
        $(Gojs.Placeholder),
        $(Gojs.Shape, { alignment: Gojs.Spot.TopLeft, cursor: "nw-resize", desiredSize: new Gojs.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),
        $(Gojs.Shape, { alignment: Gojs.Spot.Top, cursor: "n-resize", desiredSize: new Gojs.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),
        $(Gojs.Shape, { alignment: Gojs.Spot.TopRight, cursor: "ne-resize", desiredSize: new Gojs.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),

        $(Gojs.Shape, { alignment: Gojs.Spot.Left, cursor: "w-resize", desiredSize: new Gojs.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),
        $(Gojs.Shape, { alignment: Gojs.Spot.Right, cursor: "e-resize", desiredSize: new Gojs.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),

        $(Gojs.Shape, { alignment: Gojs.Spot.BottomLeft, cursor: "se-resize", desiredSize: new Gojs.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),
        $(Gojs.Shape, { alignment: Gojs.Spot.Bottom, cursor: "s-resize", desiredSize: new Gojs.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),
        $(Gojs.Shape, { alignment: Gojs.Spot.BottomRight, cursor: "sw-resize", desiredSize: new Gojs.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" })
    );

export const nodeRotateAdornmentTemplate =
    $(Gojs.Adornment,
        { locationSpot: Gojs.Spot.Center, locationObjectName: "ELLIPSE" },
        $(
            Gojs.Shape,
            "Ellipse",
            { name: "ELLIPSE", cursor: "pointer", desiredSize: new Gojs.Size(8, 8), fill: "lightblue", stroke: "deepskyblue" },
        ),
        $(Gojs.Shape, { geometryString: "M4.5 8 L4.5 30", isGeometryPositioned: true, stroke: "deepskyblue", strokeWidth: 1.5, })
    );

export const nodeStyle = () => {
    return [
        {
            locationSpot: Gojs.Spot.Center,
        },
        new Gojs.Binding("location", "loc", Gojs.Point.parse).makeTwoWay(Gojs.Point.stringify),
    ] as const;
}

export const rotateStyle = () => {
    return [
        {
            rotatable: true,
            rotateAdornmentTemplate: nodeRotateAdornmentTemplate,
        },
        new Gojs.Binding("angle").makeTwoWay(),
    ] as const;
}

export const resizeStyle = () => {
    return [
        {
            resizable: true,
            resizeObjectName: "PANEL",
            resizeAdornmentTemplate: nodeResizeAdornmentTemplate,
        },
    ] as const;
}

export const selectStyle = () => {
    return [
        {
            selectable: true,
            selectionAdornmentTemplate: nodeSelectionAdornmentTemplate,
        },
    ] as const;
}

export const resizeNodeConfig = () => {
    return [
        { name: "PANEL" },
        new Gojs.Binding("desiredSize", "size", Gojs.Size.parse).makeTwoWay(Gojs.Size.stringify),
    ] as const;
}
