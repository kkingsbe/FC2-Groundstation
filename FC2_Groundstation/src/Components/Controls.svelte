<script>
    export let offsetL
    export let offsetR

    var awaitingOffsets = false

    import FinOffsetModal from "./FinOffsetModal.svelte";
    import ComportSelect from "./ComPortSelect.svelte"

    var connectBtnText = "Connect"
    var connectBtnClass = "btn connect"
    var modFinOffset = false

    async function getOffsets() {
        window.api.send("toMain", {command: "getOffsets"})
        awaitingOffsets = true
    }

    function calibrate() {
        window.api.send("toMain", {command: "calibrate"})
    }

    function finTest() {
        window.api.send("toMain", {command: "finTest"})
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
    <!--div class={connectBtnClass} on:click={toggleRadio}>
        <p>{connectBtnText}</p>
    </div-->
    <div class="row">
        <div class="btn callib-gyro" on:click={calibrate}>
            <p>Calibrate</p>
        </div>
        <div class="btn fintest" on:click={finTest}>
            <p>Fin Test</p>
        </div>
        <div class="btn finoffset" on:click={() => {modFinOffset = true}} on:click={getOffsets}>
            <p>Fin Offset</p>
        </div>
    </div>
    <div class="row">
        <div class="btn begintest" on:click={beginTest}>
            <p>Begin Test</p>
        </div>
        <div class="btn reset" on:click={reset}>
            <p>Reset</p>
        </div>
        <div class="btn arm">
            <p>Arm</p>
        </div>
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
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .row {
        display: flex;
        flex-direction: row;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 20px;
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
        margin: 0px 10px 0px 10px;
        font-size: 1.5vw;
        border-radius: 0.4vw;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        color: white;
        cursor: pointer;
        background: #6419E6;
    }

    .connect {
        background: #2bcc61;
    }

    .disconnect {
        background: #e24949;
    }
</style>