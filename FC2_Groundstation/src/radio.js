const SerialPort = require("serialport")

const startupCode = "AT+ADDRESS=1\r\nAT+PARAMETER=12,2,2,4"
var dataToParse = []
var lastLine = ""
var serialport
var portOpen = false
var port

const start = () => {
    serialport = new SerialPort(port, {
        baudRate: 115200
    })
    
    serialport.write(startupCode, err => {
        if(err) {
            console.log(err.message)
        }
    })
    
    serialport.on("data", data => {
        let rawData = data.toString()
        let lines = rawData.split("\n")
        if(lastLine.length > 0) {
            lines[0] = lastLine + lines[0]
            lastLine = ""
        }
        if(rawData.substr(rawData.length-3, rawData.length-1) != "\n") {
            lastLine = lines[lines.length-1]
            lines.pop()
        }
        lines.forEach(line => {
            if(line !== "") dataToParse.push(line)
        })
    })

    portOpen = true
}

const readData = () => {
    if(dataToParse.length > 0) { 
        let dat = dataToParse.shift()
        console.log(dat)
        if(dat.includes("#") && (dat.split(",")[2]).startsWith("#")) {
            //Command given
            let temp = ((dat.split("#")[1]).split(",").slice(0,dat.split(",").length-4)).join(",").trim()
            console.log(temp)
            return temp
        } else {
            //Rocket state data given
            let rollRate = dat.split(",")[2]
            let angle = dat.split(",")[3]
            let finSetpoint = dat.split(",")[4]
            let time = dat.split(",")[5]
            let signalStrength = dat.split(",")[6]
    
            //console.log(`Roll Rate: ${rollRate} | Angle: ${angle} | Fin Setpoint: ${finSetpoint} | Time: ${time} | Signal Strength: ${signalStrength}`)
            try {
                if(typeof(rollRate) !== "undefined" && rollRate.includes(".") && angle.includes(".") && finSetpoint.includes(".") && time.includes(".")) {
                    return dat
                } else {
                    return readData() //Read another line if current isnt valid
                } 
            } catch(e) {
                console.log(e)
            }
        }
    }
}

const writeData = (data) => {
    if(portOpen) {
        var msg = `AT+SEND=1,${data.length},${data}\r\n`
        console.log(`Sending Message: ${msg}`)
        serialport.write(msg, function(err) {
            if(typeof(err) !== "undefined") {
                console.log("Error: " + err)
            }
        })
    }
}

const getPorts = async() => {
    var portsList = []
    return new Promise(async (resolve, reject) => {
        await SerialPort.list().then(ports => {
            ports.forEach(port => {
                console.log(port.path)
                portsList.push(String(port.path))
            })
            resolve(portsList)
        })
    })
}

const setPort = (_port) => {
    port = _port
}

const end = () => {
    if(portOpen) {
        serialport.close()
        portOpen = false
    }
}

exports.start = start
exports.readData = readData
exports.writeData = writeData
exports.getPorts = getPorts
exports.setPort = setPort
exports.end = end