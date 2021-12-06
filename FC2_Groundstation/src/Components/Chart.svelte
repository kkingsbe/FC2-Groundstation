<script>
    import Line from "svelte-chartjs/src/Line.svelte"
    export let title
    export let color
    export let rocketData
    export let dataWindow
    export let target

    var numDP = 0
    var labels = []
    var datapoints = []
    var data

    for(let i = 0; i < 100; i++) {
        labels.push(i)
        datapoints.push(Math.random() * 20 + 50)
    }

    //$: console.log(rocketData)
    $: updateGraph(rocketData)

    function updateGraph(rd) {
        if(rd.length == 0) return
        labels.push(rd[numDP].time)
        datapoints.push(rd[numDP][target])
        numDP ++
        
        console.log(labels.length)
        while(labels.length > dataWindow) {
            console.log("Shrinkin")
            labels.shift()
            datapoints.shift()
            labels = labels
            datapoints = datapoints
        }
    }

    data = {
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
        width: 33vw;
        margin-top: 2vw;
        padding: 0.5vw;
        background: white;
        border-radius: 0.5vw;
    }
</style>