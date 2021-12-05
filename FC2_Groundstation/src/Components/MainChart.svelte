<script>
    import Line from "svelte-chartjs/src/Line.svelte"
    export let title
    export let color

    var labels = []
    var datapoints = []
    for(let i = 0; i < 100; i++) {
        labels.push(i.toString())
        datapoints.push(Math.abs(Math.random() * 100))
    }


    var data = {
        labels: labels,
        datasets: [
            {
                label: title,
                data: datapoints,
                fill: true,
                backgroundColor: `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.2)`,
                borderColor: `rgba(${color[0]}, ${color[1]}, ${color[2]}, 1)`,
                cubicInterpolationMode: 'monotone',
                tension: 0.4
            }
        ]
    }
</script>

<chart>
    <div class="container">
        <Line data={data}></Line>
    </div>
</chart>

<style>
    .container {
        width: 50vw;
        background: white;
        margin-top: 2vw;
        padding: 0.5vw;
    }
</style>