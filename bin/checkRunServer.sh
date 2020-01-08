#!/bin/bash

# Check if controller is running
# -x flag only match processes whose name (or command line if -f is
# specified) exactly match the pattern. 

if pgrep -x "score-server.js" > /dev/null
then
    echo "Running"
else
    /home/pi/scoreboard/score-server.js >/tmp/server.log 2>&1 &
fi
