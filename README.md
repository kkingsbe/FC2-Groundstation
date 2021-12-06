# FC2-Groundstation:
This is a groundstation app that I have created for remotely recieving telemetry from, and sending commands to, my homemade rocket flight computer (FC2). FC2 is currently 
slated to fly on my "K-2" rocket, which will be a midpower rocket featuring 2 actively controlled canards near the nose, and an Aerotech F-44 motor.

The features within this application include:
- Opening LoRa communication with FC2
- Initiating gyro callibration
- Arming for launch
- Running test of actuated fin servos
- Recieving "live" telemetry from FC2

FC2 live telemetry channels include:
- Roll rate (deg/s)
- Roll angle (deg)
- Actuated fin setpoint (deg)
- Signal strength (Db)
