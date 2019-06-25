export interface TwoPhaseTransformers {
    id: number;
    name: string;
    hvNodeNo: number;
    lvNodeNo: number;
    hvVoltageRated: number;
    lvVoltageRated: number;
    apparentPowerRated: number;
    loadLossesRated: number;
    shortCircuitVoltage: number;
    projectId: number
}