<script>
    export let data
</script>

<datarow>
    <div class="row">
        <div class="item">
            <p class="title">Roll Rate</p>
            <p class="value">{data.rollRate}</p>
        </div>
        <div class="item">
            <p class="title">Signal Strength</p>
            <p class="value">{data.signalStrength}</p>
        </div>
        <div class="item">
            <p class="title">Fin Setpoint</p>
            <p class="value">{data.finSetpoint}</p>
        </div>
        <div class="item">
            <p class="title">Angle</p>
            <p class="value">{data.angle}</p>
        </div>
    </div>
</datarow>

<style>
    .row {
        display: flex;
        flex-direction: row;
        width: 100%;
    }

    .item {
        display: flex;
        flex-direction: column;
        margin-left: 2vw;
        margin-right: 2vw;
        padding: 1vw;
        padding-bottom: 0.75vw;
        background: linear-gradient(45deg, #0cebeb, #29ffc6);
        border-radius: 0.5vw;
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        width: 10vw;
        border: 1px solid #8b8b8b;
    }

    .item p {
        margin: 0px;
        padding: 0px;
    }

    .title {
        font-size: 1.25vw;
        width: 100%;
        text-align: left;
    }

    .value {
        font-size: 2vw;
        width: 100%;
        text-align: left;
    }
</style>