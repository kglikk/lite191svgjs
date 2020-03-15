export interface OverheadLines {
    id: number;
    name: string;
    lineType: string;
    startNodeNo: number;
    endNodeNo: number;
    length: number;
    unitaryResistance: number;
    unitaryReactance: number;
    unitaryCapacitance: number;
    projectId: number
    svgXML: string;
}