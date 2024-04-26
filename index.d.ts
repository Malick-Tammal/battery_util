export namespace battery_js {
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

export function batteryData(cb?: (data: battery_js.BatteryData) => any): Promise<battery_js.BatteryData>;