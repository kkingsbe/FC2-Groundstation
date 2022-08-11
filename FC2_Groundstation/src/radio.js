const SerialPort = require("serialport")

const startupCode = "AT+ADDRESS=2\r\nAT+PARAMETER=12,7,1,4\r\n"
var dataToParse = []
var lastLine = ""
var serialport
var portOpen = false
var radioErr = false
var port

const start = () => {
    console.log("Connecting to port: " + port)
    serialport = new SerialPort(port, {
        baudRate: 115200
    })
    
    serialport.write(startupCode, err => {
        if(err) {
            console.log(err.message)
        }
    })
    
    //Configure event listener for when serial data is written from radio
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
        if(dat.includes("+ERR=")) radioErr = true
        if(dat.includes("#") && (dat.split(",")[2]).startsWith("#")) {
            //Command given
            let temp = ((dat.split("#")[1]).split(",").slice(0,dat.split(",").length-4)).join(",").trim()
            console.log(temp)
            return temp
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

const handshake = () => {
    writeData("#ping")
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

const radioStatus = () => {
    return !radioErr
}

exports.start = start
exports.readData = readData
exports.writeData = writeData
exports.getPorts = getPorts
exports.setPort = setPort
exports.handshake = handshake
exports.end = end
exports.status = radioStatus