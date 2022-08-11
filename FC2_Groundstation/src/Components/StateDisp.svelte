<script>
    export let state;
    export let connectedToRadio
    export let radioDisconnected
    
    import ComPortSelect from "./ComPortSelect.svelte";
</script>

<statedisp>
    <p>State: {state}</p>

    <ComPortSelect bind:connectedToRadio={connectedToRadio} radioDisconnected={radioDisconnected}></ComPortSelect>
</statedisp>

<style>
    statedisp {
        width: 100vw;
        height: 7vh;
        background: #2A303C;
        border-bottom: 1px solid #1F242D;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: white;
        font-size: 2vw;
        font-weight: 400;
    }

    p {
        margin-left: 10px;
    }
</style>