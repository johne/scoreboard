#!/bin/bash

# Check if controller is running
# -x flag only match processes whose name (or command line if -f is
# specified) exactly match the pattern. 

if pgrep -x "controller" > /dev/null
then
    echo "Running"
else
    node /home/pi/scoreboard/controller &
fi