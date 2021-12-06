const SerialPort = require("serialport")

const startupCode = "AT+ADDRESS=1\r\nAT+PARAMETER=12,7,2,4"
var dataToParse = []
var lastLine = ""
var serialport
var portOpen = false

const start = (port) => {
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
        
        let rollRate = dat.split(",")[2]
        let angle = dat.split(",")[3]
        let finSetpoint = dat.split(",")[4]
        let time = dat.split(",")[5]
        let signalStrength = dat.split(",")[6]

        //console.log(`Roll Rate: ${rollRate} | Angle: ${angle} | Fin Setpoint: ${finSetpoint} | Time: ${time} | Signal Strength: ${signalStrength}`)
        if(typeof(rollRate) !== "undefined" && rollRate.includes(".") && angle.includes(".") && finSetpoint.includes(".") && time.includes(".")) {
            return dat
        } else {
            return readData() //Read another line if current isnt valid
        } 
    }
}

const end = () => {
    if(portOpen) {
        serialport.close()
        portOpen = false
    }
}

exports.start = start
exports.readData = readData
exports.end = end