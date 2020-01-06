#!/usr/bin/python 
# Simple script for shutting down the raspberry Pi at the press of a button.  
# by Inderpreet Singh  
  
import RPi.GPIO as GPIO  
import time  
import os 
import threading 
 
# Use the Broadcom SOC Pin numbers  
# Setup the Pin with Internal pullups enabled and PIN in reading mode.  
GPIO.setmode(GPIO.BCM)  
GPIO.setup(3, GPIO.IN, pull_up_down = GPIO.PUD_DOWN)  
GPIO.setup(25, GPIO.OUT, initial=GPIO.LOW)

t = 0

def shutdown():
	print("shutting down")
	os.system("sudo shutdown -h now")

def button_event(channel):
	global t
	if GPIO.input(3) == 1:
		print("released")
		t.cancel()
	else:
		print("pressed")
		if t != 0:
			t.cancel()
		t = threading.Timer(3.0, shutdown)
		t.start()

# Add our function to execute when the button pressed event happens  
GPIO.add_event_detect(3, GPIO.BOTH, callback = button_event, bouncetime = 50)  
 
# Now wait!  
while 1:  
    time.sleep(0.1)     
	GPIO.output(25, GPIO.HIGH) # Turn on
    time.sleep(1)              # Sleep for 1 second
    GPIO.output(25, GPIO.LOW)  # Turn off
    time.sleep(4)              # Sleep for 4 second