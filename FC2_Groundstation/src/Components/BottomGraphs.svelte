<script>
    import Chart from "./Chart.svelte"
    export let rocketData
    export let dataWindow
</script>

<bottomgraphs>
    <Chart title="Signal Strength" color={[182,40,240]} bind:rocketData={rocketData} bind:dataWindow={dataWindow} target={"signalStrength"}></Chart>
	<Chart title="Fin Setpoint" color={[244,40,247]} bind:rocketData={rocketData} bind:dataWindow={dataWindow} target={"finSetpoint"}></Chart>
	<Chart title="Estimated Angle" color={[247,40,154]} bind:rocketData={rocketData} bind:dataWindow={dataWindow} target={"angle"}></Chart>
</bottomgraphs>

<style>
    bottomgraphs {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }
</style>