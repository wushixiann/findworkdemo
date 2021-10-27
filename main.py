import requests
import urllib.parse
import time
import json
import re
header={
    "Cookie"         : "",
    "Accept-Encoding": "gzip",
    "User-Agent"     : "com.ss.android.ugc.aweme/150301 (Linux; U; Android 10; zh_CN; PH-1; Build/QQ3A.200805.001; Cronet/58.0.2991.0)",
    "X-SS-REQ-TICKET": int(time.time()*1000)
}

# url="https://aweme.snssdk.com/aweme/v1/comment/list/"
url="https://api.amemv.com/aweme/v1/comment/list/"
url2="https://api.amemv.com/aweme/v1/commit/follow/user/"
ts =int(time.time())
par={
    # "aweme_id"             : "6969875632155135270",

    # "user_id"   : "95300163394",
    # "type"      : "1",
    # "retry_type": "no_retry",


    "aweme_id"             : "7022089219908717855",
    "cursor"               : "0",
    "count"                : "20",
    "comment_style"        : "2",
    "ts"                   : ts,
    "app_type"             : "lite",
    "manifest_version_code": "180",
    "_rticket"             : int(time.time()*1000),
    "ac"                   : "wifi",
    "device_id"            : "",
    "iid"                  : "",
    "os_version"           : "10",
    "channel"              : "juyouliang_dy_and17",
    "version_code"         : "180",
    "device_type"          : "PH-1",
    "language"             : "zh",
    "resolution"           : "1316*2280",
    "openudid"             : "",
    "update_version_code"  : "1800",
    "app_name"             : "aweme",
    "version_name"         : "1.8.0",
    "os_api"               : "29",
    "device_brand"         : "essential",
    "ssmix"                : "a",
    "device_platform"      : "android",
    "dpi"                  : "480",
    "aid"                  : "1128",
}
parstr=urllib.parse.urlencode(par)

myserver={
   "url":url+"?"+parstr,
   "headers":header,
   "ts":ts,
}


r = requests.post("http://127.0.0.1:81/sign",json=myserver,verify=False)
print(r.text)

rr        = re.match("{X-Khronos=(.*), X-Gorgon=(.*)}",r.json()["sign"])
X_Khronos = rr.group(1)
X_Gorgon  = rr.group(2)


header["X-Khronos"]=X_Khronos
header["X-Gorgon"]=X_Gorgon
r=requests.get(url=r.json()["url"],headers=header,verify=False)
print(r.text)

f = open("./res.json","w",encoding="utf-8")
f.write(r.text)

for x in r.json()["comments"]:
    print(x["text"])