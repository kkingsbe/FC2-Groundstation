<script>
    export let connectedToRadio
export let offsetL
    export let offsetR

    var awaitingOffsets = false

    import FinOffsetModal from "./FinOffsetModal.svelte";
    import ComportSelect from "./ComPortSelect.svelte"

    var connectBtnText = "Connect"
    var connectBtnClass = "btn connect"
    var modFinOffset = false

    $:if(connectedToRadio) {
        connectBtnText = "Disconnect"
        connectBtnClass = "btn disconnect"
    } else {
        connectBtnText = "Connect"
        connectBtnClass = "btn connect"
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

    async function getOffsets() {
        window.api.send("toMain", {command: "getOffsets"})
        awaitingOffsets = true
    }

    function updateOffsets() {
        awaitingOffsets = false
        console.log("New Offsets:")
        console.log(`L: ${offsetL}, R: ${offsetR}`)
    }

    function beginTest() {
        window.api.send("toMain", {command: "beginTest"})
    }

    function reset() {
        window.api.send("toMain", {command: "reset"})
    }

    $:offsetL,updateOffsets()
</script>

<controls>
    <div class={connectBtnClass} on:click={toggleRadio}>
        <p>{connectBtnText}</p>
    </div>
    <div class="btn callib-gyro">
        <p>Callibrate Gyro</p>
    </div>
    <div class="btn fintest">
        <p>Fin Test</p>
    </div>
    <div class="btn finoffset" on:click={() => {modFinOffset = true}} on:click={getOffsets}>
        <p>Fin Offset</p>
    </div>
    <div class="btn begintest" on:click={beginTest}>
        <p>Begin Test</p>
    </div>
    <div class="btn reset" on:click={reset}>
        <p>Reset</p>
    </div>
    <div class="btn arm">
        <p>Arm</p>
    </div>
    {#if modFinOffset}
    <div class="modal">
        <FinOffsetModal bind:modFinOffset={modFinOffset} bind:offsetL={offsetL} bind:offsetR={offsetR}></FinOffsetModal>
    </div>
    {/if}
</controls>

<style>
    controls {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        height: 60%;
    }

    .modal {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
    }

    .title {
        font-size: 2vw;
        color: black;
        margin: 0px;
        margin-bottom: 1vw;
        padding: 0px;
    }

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
    }

    .connect {
        background: #2bcc61;
    }

    .disconnect {
        background: #e24949;
    }

    .callib-gyro {
        background: linear-gradient(45deg, #7F00FF, #E100FF);
    }

    .fintest {
        background: linear-gradient(45deg, #7F00FF, #E100FF);
    }    
    
    .finoffset {
        background: linear-gradient(45deg, #7F00FF, #E100FF);
    }

    .arm {
        background: linear-gradient(45deg, #7F00FF, #E100FF);
    }

    .begintest {
        background: linear-gradient(45deg, #7F00FF, #E100FF);
    }

    .reset {
        background: linear-gradient(45deg, #7F00FF, #E100FF);
    }
</style>