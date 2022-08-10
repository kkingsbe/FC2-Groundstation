<script>
    export let connectedToRadio
    let ports = []
    var connectBtnText = "Connect"
    var connectBtnClass = "btn connect"
    $:if(connectedToRadio) {
        connectBtnText = "Disconnect"
        connectBtnClass = "btn disconnect"
    } else {
        connectBtnText = "Connect"
        connectBtnClass = "btn connect"
    }

    window.api.send("toMain", {command: "getPorts"})

    window.api.receive("fromMain", (msg) => {
		if(msg.command == "getPorts") {
			ports = msg.data;
            setPort(ports[0])
		}
	});

    function updatePort(e) {
        //console.log(e.path[0].innerText)
        setPort(e.path[0].innerText)
    }

    function setPort(port) {
        window.api.send("toMain", {command: "setPort", data: port})
    }

    function toggleRadio() {
        if(!connectedToRadio) {
            connectedToRadio = true
            window.api.send("toMain", {command: "startRadio"});
        } else {
            connectedToRadio = false
            window.api.send("toMain", {command: "endRadio"});
        }
    }
</script>

<comportselect>
    <div class={connectBtnClass} on:click={toggleRadio}>
        <p>{connectBtnText}</p>
    </div>
    <select on:change={updatePort} on:click={updatePort}>
        {#each ports as port}
        <option value="port">{port}</option>
        {/each}
    </select>
</comportselect>

<style>
    comportselect {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        font-size: 1.5vw;
    }

    .btn {
        width: 10vw;
        height: 3vw;
        margin-right: 20px;
        border-radius: 0.4vw;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        color: white;
        cursor: pointer;
        background: #2bcc61;
    }

    .disconnect {
        background: #e24949;
    }
</style>