<script>
	export let name;
	import StateDisp from "./Components/StateDisp.svelte"
	import BottomGraphs from "./Components/BottomGraphs.svelte"
	import MainChart from "./Components/MainChart.svelte"
	import Controls from "./components/Controls.svelte"
	import Data from "./components/Data.svelte"

	var connectedToRadio = false
	var data = {
		rollRate: 0,
		finSetpoint: 0,
		angle: 0,
		signalStrength: 0,
		time: 0
	}
	var maxDataPoints = 50
	var dataOverTime = []

	window.api.receive("fromMain", (msg) => {
		//console.log(dataOverTime)
		if(msg.command == "data" && typeof(msg.data) !== "undefined") {
			data.rollRate = msg.data.split(",")[2]
			data.angle = msg.data.split(",")[3]
			data.finSetpoint = msg.data.split(",")[4]
			data.time = msg.data.split(",")[5]
			data.signalStrength = msg.data.split(",")[6]
			dataOverTime.push({...data})
			dataOverTime = dataOverTime
			//if(dataOverTime.length > maxDataPoints) dataOverTime.shift()

			//console.log(dataOverTime)
		}
	});
	
	setInterval(function() {
		if(connectedToRadio) {
			window.api.send("toMain", {command: "readData"});
		}
	}, 1000)

	let state = "Awaiting Launch"
</script>

<main>
	<StateDisp {state}></StateDisp>
	<div class="top">
		<div class="left">
			<Controls bind:connectedToRadio={connectedToRadio}></Controls>
			<Data bind:data = {data}></Data>
		</div>
		<div class="right">
			<MainChart title={"Roll Rate"} color={[182,40,240]} bind:rocketData={dataOverTime} bind:dataWindow={maxDataPoints}></MainChart>
		</div>
	</div>
	<BottomGraphs bind:rocketData={dataOverTime} bind:dataWindow={maxDataPoints}></BottomGraphs>
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
		border-right: 3px solid gray;
		border-bottom: 3px solid gray;
		border-bottom-right-radius: 1vw;
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
	}

	.right {
		width: 50vw;
		padding: 1vw;
	}
</style>