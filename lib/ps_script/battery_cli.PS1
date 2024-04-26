# Creating windows battery report then getting data from it
powercfg /batteryreport /XML /OUTPUT "./lib/ps_script/batteryreport.xml"
Start-Sleep 1
[xml]$b = Get-Content "./lib/ps_script/batteryreport.xml"

$b.BatteryReport.Batteries | ForEach-Object {
    [PSCustomObject]@{
        DesignCapacity     = $_.Battery.DesignCapacity
        FullChargeCapacity = $_.Battery.FullChargeCapacity
        CycleCount         = $_.Battery.CycleCount
        Id                 = $_.Battery.id
        SerialNumber       = $_.Battery.SerialNumber
    }
}