#!/bin/sh

npm run build

rsync -r /Users/john/Documents/devel/home/scoreboard/* john@ellis-scoreboard.local:/home/john/Documents/devel/scoreboard --exclude='node_modules/*' --exclude='ui/scoreboard/public/media' --exclude='ui/scoreboard/build/media'

#ssh john@ellis-scoreboard.local "sudo reboot" &

