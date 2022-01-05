<script>
    export let state;
    
    import ComPortSelect from "./ComPortSelect.svelte";
</script>

<statedisp>
    <div class="comportcont">
        <ComPortSelect></ComPortSelect>
    </div>
    
    <p>State: {state}</p>
</statedisp>

<style>
    statedisp {
        width: 100vw;
        height: 7vh;
        background: linear-gradient(90deg, #7F00FF, #E100FF);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 2vw;
        font-weight: 400;
    }

    .comportcont {
        position: absolute;
        font-size: 1.25vw;
        right: 0px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>