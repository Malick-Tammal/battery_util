// Code snippet for battery_util

export namespace battery_util {
    // 1. Battery Data
    interface BatteryData {
        fileSavedPath: string,
        measureUnit: string
        designCapacity: number,
        fullChargeCapacity: number,
        health: number,
        cycleCount: number,
        id: string,
        serialNumber: string,
    }
}

export function batteryData(cb?: (data: battery_util.BatteryData) => any): Promise<battery_util.BatteryData>;