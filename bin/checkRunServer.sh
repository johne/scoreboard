#!/bin/bash

# Check if controller is running
# -x flag only match processes whose name (or command line if -f is
# specified) exactly match the pattern. 

cmd='/usr/local/bin/node /home/pi/scoreboard/controller & >/tmp/controller.log 2>&1'

if pgrep -x "server" > /dev/null
then
    echo "Running"
else
    /usr/local/bin/node /home/pi/scoreboard/controller & >/tmp/controller.log 2>&1
fi
