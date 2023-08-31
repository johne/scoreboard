#!/bin/sh

npm run build

rsync -r /Users/john/Documents/devel/home/scoreboard/* john@ellis-scoreboard.local:/home/john/Documents/devel/scoreboard --exclude='node_modules/*'

#ssh john@ellis-scoreboard.local "sudo reboot" &

