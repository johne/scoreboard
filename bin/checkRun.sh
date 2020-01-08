#!/bin/bash

# Check if controller is running
# -x flag only match processes whose name (or command line if -f is
# specified) exactly match the pattern. 

if pgrep -x "score-controller.js" > /dev/null
then
    echo "Running"
else
    /home/pi/scoreboard/score-controller.js >/tmp/controller.log 2>&1 &
fi
