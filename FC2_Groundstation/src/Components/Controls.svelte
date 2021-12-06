<script>
    export let connectedToRadio
    var connectBtnText = "Connect"
    var connectBtnClass = "btn connect"

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
    <div class="btn arm">
        <p>Arm</p>
    </div>
</controls>

<style>
    controls {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        height: 50%;
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
        border: 1px solid #8b8b8b;
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        color: white;
        cursor: pointer;
        margin-bottom: 1vw;
    }

    .connect {
        background: #49E27C;
    }

    .disconnect {
        background: #e24949;
    }

    .callib-gyro {
        background: #49b7e2;
    }

    .fintest {
        background: #49b7e2;
    }

    .arm {
        background: #e28149;
    }
</style>