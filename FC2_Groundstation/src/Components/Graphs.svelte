<script>
    import Chart from "./Chart.svelte"
    export let rocketData
    export let dataWindow
</script>

<graphs>
    <div class="row">
        <Chart title="Roll Rate" color={[182,40,240]} bind:rocketData={rocketData} bind:dataWindow={dataWindow} target={"rollRate"}></Chart>
        <Chart title="Signal Strength" color={[182,40,240]} bind:rocketData={rocketData} bind:dataWindow={dataWindow} target={"signalStrength"}></Chart>
    </div>
    <div class="row">
        <Chart title="Fin Setpoint" color={[244,40,247]} bind:rocketData={rocketData} bind:dataWindow={dataWindow} target={"finSetpoint"}></Chart>
        <Chart title="Estimated Angle" color={[247,40,154]} bind:rocketData={rocketData} bind:dataWindow={dataWindow} target={"angle"}></Chart>
    </div>
</graphs>
<style>
    graphs {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 100%;
        height: 100%;
    }
    .row {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }
</style>