<script>
    import DataTable from "./DataTable.svelte"
    export let data
</script>

<data>
    <p class="title">Data:</p>
    <DataTable bind:data={data}></DataTable>
</data>

<style>
    data {
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
</style>