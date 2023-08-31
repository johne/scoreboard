#!/bin/bash

xset dpms 600 600 600

unclutter -idle 0.5 -root &

sed -i 's/"exited_cleanly":false/"exited_cleanly":true/' /home/pi/.config/chromium/Default/Preferences
sed -i 's/"exit_type":"Crashed"/"exit_type":"Normal"/' /home/pi/.config/chromium/Default/Preferences

/home/john/scoreboard/bin/checkRunServer.sh;

sleep 10

/usr/bin/chromium-browser --start-fullscreen --noerrdialogs --disable-infobars --kiosk http://ellis-scoreboard.local:3000/scoreboard &

while true; do
   /home/john/scoreboard/bin/checkRunServer.sh;
   sleep 120
done

