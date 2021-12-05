<script>
    import Chart from "./Chart.svelte"
</script>

<bottomgraphs>
    <Chart title="Signal Strength" color={[182,40,240]}></Chart>
	<Chart title="Fin Setpoint" color={[244,40,247]}></Chart>
	<Chart title="Estimated Angle" color={[247,40,154]}></Chart>
</bottomgraphs>

<style>
    bottomgraphs {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }
</style>