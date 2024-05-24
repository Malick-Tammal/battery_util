// Code snippet for battery_util

export namespace battery_util {
    // 1. Battery Data
    interface BatteryInfo {
        fileSavedPath: string,
        measureUnit: string
        designCapacity: number,
        fullChargeCapacity: number,
        health: number,
        cycleCount: number,
        id: string,
        serialNumber: string,
    }
    interface BatteryState {
        level : number,
        isCharging : boolean
    }
}

export function batteryInfo(cb?: (data: battery_util.BatteryInfo) => any): Promise<battery_util.BatteryInfo>;
export function batteryState(cb?: (data: battery_util.BatteryState) => any): Promise<battery_util.BatteryState>;