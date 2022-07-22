# simple-socket-io-chat

## Installation

```bash
    git clone https://github.com/zachlankton/simple-socket-io-chat.git
    npm install
```

## Start App

```bash
    ./index.js
```

## Run as a service on linux

Update the websocket.service file with the appropriate user and group and point it to where index.js is installed.

Copy websocket.service to a systemd service location such as `/etc/systemd/system/websockets.service`

And then run...

```bash
    systemctl enable websocket.service
    systemctl start websocket.service
```