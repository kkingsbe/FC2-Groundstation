<script>
    export let modFinOffset
    export let offsetL
    export let offsetR

    function updateOffsets() {
        modFinOffset = false
        window.api.send("toMain", {command: "setOffset", data:`#setOffsetL(${offsetL})`});
        setTimeout(()=>{window.api.send("toMain", {command: "setOffset", data:`#setOffsetR(${offsetR})`})},5000);
    }
</script>

<finoffset>
    <div class="modal">
        <div class="title">
            <p>Fin Offset</p>
        </div>
        <div class="content">
            <div class="settinggroup">
                <p>Left Fin</p>
                <input bind:value={offsetL}>
            </div>
            <div class="settinggroup">
                <p>Right Fin</p>
                <input bind:value={offsetR}>
            </div>
        </div>
        <div class="btn" on:click={updateOffsets}>
            <p>Apply</p>
        </div>
    </div>
</finoffset>

<style>
    finoffset {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.7);
    }
    .modal {
        width: 50vw;
        height: 50vh;
        background: white;
        border-radius: 2vw;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .title {
        font-size: 2vw;
        padding-left: 3vw;
        padding-top: 1vw;
        width: 100%;
        display: flex;
        flex-direction: row;
    }
    .title p {
        margin-top: 0px;
        padding-top: 0px;
        margin-left: 0px;
    }
    .content { 
        width: fit-content;
    }
    .settinggroup {
        text-align: left;
    }
    .settinggroup p {
        margin-bottom: 0px;
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
        margin-top: 3vw;
        background: #2bcc61;
    }
</style>