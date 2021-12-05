<script>
    async function startRadio() {

    }
</script>

<controls>
    <p class="title">Controls:</p>
    <div class="connect" on:click={startRadio}>
        <p>Connect</p>
    </div>
</controls>

<style>
    controls {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .title {
        font-size: 2vw;
        color: black;
        margin: 0px;
        margin-bottom: 1vw;
        padding: 0px;
    }

    .connect {
        background: #49E27C;
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
    }
</style>