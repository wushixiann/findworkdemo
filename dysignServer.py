import frida, sys
import time
import codecs
import json
from flask import Flask,request,jsonify

def on_message(message, data):
    if message['type'] == 'send':
        print("[*] {0}".format(message['payload']))
    elif message['type'] == 'error':
        print(message['stack'])
    else:
        print(message)

jscode=codecs.open("./dysign.js","r","utf-8").read()


def spawn(dev,bid):
    if dev=="usb":
        device = frida.get_usb_device(3)
    else:
        device = frida.get_device_manager().add_remote_device(dev)

    pid  = device.spawn([bid])
    process = device.attach(pid)
    script = process.create_script(jscode)
    script.on('message', on_message)
    print('[*] Running CTF')
    script.load()
    device.resume(pid)
    sys.stdin.read()
    return script

def attach(dev,bid):
    if dev=="usb":
        device = frida.get_usb_device(3)
    else:
        device = frida.get_device_manager().add_remote_device(dev)

    process = device.attach(bid)
    script = process.create_script(jscode)
    script.on('message', on_message)
    print('[*] Running CTF')
    script.load()
    # sys.stdin.read()
    return script

bid = 'com.ss.android.ugc.aweme'
# dev = "192.168.2.189:13355"
dev = "usb"



# spawn(dev,bid)
script = attach(dev,bid)


app= Flask(__name__)
@app.route("/",methods=["GET","POST"])
def home():
    return "服务正常"

@app.route("/sign",methods=["GET","POST"])
def sign():
    res        = request.get_json()
    url        = res["url"]
    reqHeaders = res["headers"]
    ts         = res["ts"]

    sign       = script.exports.getsign(url,reqHeaders,ts)
    return sign

app.debug = True
app.run(port=81,host="0.0.0.0")