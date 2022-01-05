<script>
    let ports = []

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
</script>

<comportselect>
    <select on:change={updatePort} on:click={updatePort}>
        {#each ports as port}
        <option value="port">{port}</option>
        {/each}
    </select>
</comportselect>

<style>
    .btn {
        width: 10vw;
        height: 3vw;
        font-size: 1.5vw;
        border-radius: 0.4vw;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        color: white;
        cursor: pointer;
        margin-bottom: 1vw;
        background: #2bcc61;
    }
</style>