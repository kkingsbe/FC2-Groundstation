<script>
    export let data
</script>

<datatable>
    <div class="table">
        <div class="headers">
            <div class="headercont">
                <p>Roll Rate:</p>
            </div>
            <div class="headercont">
                <p>Fin Setpoint:</p>
            </div>
            <div class="headercont">
                <p>Estimated Angle:</p>
            </div>
            <div class="headercont">
                <p>Signal Strength:</p>
            </div>
        </div>
        <div class="values">
            <div class="valuecont">
                <p>{data.rollRate} Deg/Sec</p>
            </div>
            <div class="valuecont">
                <p>{data.finSetpoint} Deg</p>
            </div>
            <div class="valuecont">
                <p>{data.angle} Deg</p>
            </div>
            <div class="valuecont">
                <p>{data.signalStrength} Db</p>
            </div>
        </div>
    </div>
</datatable>

<style>
    datatable {
        display: flex;
        flex-direction: column;
    }

    .table {
        display: flex;
        flex-direction: row;
        font-size: 1.25vw;
        border-radius: 1vw;
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    }

    .headercont {
        padding: 1vw;
        text-align: center;
        background: #4954b9;
        color: white;
    }
    .headercont:nth-child(odd) {
        background: #3542b1 !important;
    }

    .headercont:first-child {
        border-top-left-radius: 1vw;
    }
    .headercont:last-child {
        border-bottom-left-radius: 1vw;
    }

    .headers p {
        margin: 0px;
    }

    .valuecont {
        padding: 1vw;
        text-align: left;
        background: #f8f8f8;
    }

    .valuecont:nth-child(odd) {
        background: #ebebeb;
    }

    .valuecont:first-child {
        border-top-right-radius: 1vw;
    }
    .valuecont:last-child {
        border-bottom-right-radius: 1vw;
    }

    .values p {
        margin: 0px;
    }
</style>