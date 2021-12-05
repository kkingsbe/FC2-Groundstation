<script>
	export let name;
	import StateDisp from "./Components/StateDisp.svelte"
	import BottomGraphs from "./Components/BottomGraphs.svelte"
	import MainChart from "./Components/MainChart.svelte"
	import Controls from "./components/Controls.svelte"

	let state = "Awaiting Launch"
</script>

<main>
	<StateDisp {state}></StateDisp>
	<div class="top">
		<div class="left">
			<Controls></Controls>
		</div>
		<div class="right">
			<MainChart title={"Roll Rate"} color={[182,40,240]}></MainChart>
		</div>
	</div>
	<BottomGraphs></BottomGraphs>
</main>

<style>
	main {
		text-align: center;
		padding: 0px;
		margin: 0px;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		background: white;
	}

	.top {
		width: 100%;
		display: flex;
		flex-direction: row;
	}

	.left {
		width: 50vw;
		border: 1px solid gray;
	}

	.right {
		width: 50vw;
		padding: 1vw;
	}
</style>