<script>
	export let name;
	import StateDisp from "./Components/StateDisp.svelte"
	import Graphs from "./Components/Graphs.svelte"
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

	var offsetL = 0
	var offsetR = 0

	window.api.receive("fromMain", (msg) => {
		if(msg.command == "data") {
			//console.log(msg)
			if(typeof(msg.data) !== "undefined" && msg.data.split("=")[0].includes("Offsets")) {
				offsetL = (msg.data.split("=")[1]).split(",")[0]
				offsetR = (msg.data.split("=")[1]).split(",")[1]
				//console.log(offsetL)
				//console.log(offsetR)
			}
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
	<div class="cont">
		<div class="left">
			<Controls bind:connectedToRadio={connectedToRadio} bind:offsetL={offsetL} bind:offsetR={offsetR}></Controls>
		</div>
		<div class="right">
			<Data bind:data = {data}></Data>
			<Graphs bind:rocketData={dataOverTime} bind:dataWindow={maxDataPoints}></Graphs>
		</div>
	</div>
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
		background: rgb(35, 30, 56);
		overflow-y: hidden;
	}

	.cont {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
	}

	.left {
		width: 20vw;
		height: 100%;
		display: flex;
		flex-direction: column;
		background: rgb(36, 31, 54);
        box-shadow: 4px 0px 8px rgba(0, 0, 0, 0.3);
		padding-top: 1vw;
	}

	.right {
		width: 100%;
		padding: 1vw;
		display: flex;
		flex-direction: column;
	}
</style>