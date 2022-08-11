<script>
	export let name;
	import StateDisp from "./Components/StateDisp.svelte"
	import Graphs from "./Components/Graphs.svelte"
	import MainChart from "./Components/MainChart.svelte"
	import Controls from "./components/Controls.svelte"
	import Data from "./components/Data.svelte"

	var connectedToRadio = false
	var connectedToRocket = false
	var previousState = ""

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
			console.log(msg)
			
			//Display radio status
			if(msg.status == true && state == "Not Connected") state = "Radio Initialized"
			if(msg.status == false) state = "Radio Error"
			console.log(state)

			if(typeof(msg.data) !== "undefined") {
				console.log(msg.data)

				let command = msg.data.split("=")[0]
				console.log("Command: " + command)
				let value = msg.data.split("=")[1]
				console.log("Value: " + value)
				//Recieve offsets
				if(command == "Offsets(L,R)") {
					offsetL = (msg.data.split("=")[1]).split(",")[0]
					offsetR = (msg.data.split("=")[1]).split(",")[1]
					//console.log(offsetL)
					//console.log(offsetR)
				}
				if(command == "ping" && value == "pong") {
					connectedToRocket = true
					if(state == "Radio Initialized" || state == "Radio Disconnected") state = "Connected to Rocket"
				}
				if(command == "calibrate" && value == "calibrating") {
					previousState = state
					state = "Calibrating Gyro"
				}
				if(command == "calibrate" && value == "complete") {
					state = previousState
				}
				if(command == "finTest" && value == "testing") {
					previousState = state
					state = "Testing Fins"
				}
				if(command == "finTest" && value == "complete") {
					state = previousState
				}
			}
		}
	});

	const radioDisconnected = () => {
		state = "Not Connected"
	}
	
	//Read data from radio every second
	setInterval(function() {
		if(connectedToRadio) {
			console.log("Gettin data")
			window.api.send("toMain", {command: "readData"});
		}
	}, 1000)

	//Preform a handshake with the rocket to make sure comms are established
	var handshakeInterval
	handshakeInterval = setInterval(() => {
		console.log("Handshakin")
		window.api.send("toMain", {command: "handshake"})
	}, 3000)

	$:if(connectedToRocket) {
		clearInterval(handshakeInterval)
	}

	let state = "Not Connected"
</script>

<main>
	<StateDisp bind:connectedToRadio={connectedToRadio} state={state} radioDisconnected={radioDisconnected}></StateDisp>
	<div class="cont">
		<Controls bind:offsetL={offsetL} bind:offsetR={offsetR}></Controls>
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
		background: #2A303C;
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