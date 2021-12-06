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

    .arm {
        background: linear-gradient(45deg, #7F00FF, #E100FF);
    }
</style>