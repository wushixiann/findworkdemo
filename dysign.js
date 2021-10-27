// bin array 转字符串
function bin2String(array) {
    if (null == array) {
        return "null";
    }
    var result = "";
    try {
        var String_java = Java.use('java.lang.String');
        result = String_java.$new(array);
    }
    catch (e) {
        dmLogout("== use bin2String_2 ==");
        result = bin2String_2(array);
    }

    return result;
}

function bin2String_2(array) {
    var result = "";
    try {
        var tmp = 0;
        for (var i = 0; i < array.length; i++) {
            tmp = parseInt(array[i]);
            if ( tmp == 0xc0
                || (tmp < 32 && tmp != 10)
                || tmp > 126 )  {
                return result;
            }  // 不是可见字符就返回了, 换行符除外
            result += String.fromCharCode(parseInt(array[i].toString(2), 2));
        }
    }
    catch (e) {
        console.log(e);
    }
    return result;
}
// 自己封装输出函数加入线程ID 和时间

function getFormatDate() {
    var date = new Date();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentDate = date.getFullYear() + "-" + month + "-" + strDate
            + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    return currentDate;
}

function dmLogout(str) {
    var threadid = Process.getCurrentThreadId();
    console.log("["+threadid+"][" + getFormatDate() + "]" + str);
}

// 打印 Android Java 层堆栈
function showStacks () {
    Java.perform(function (){
        dmLogout(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()));  // 打印堆栈
    });
}

function stringToBytes(str) {
    var javaString = Java.use('java.lang.String');
    var bytes = [];
    bytes = javaString.$new(str).getBytes();
    return bytes;
}

function log(...arg){
    send(...arg)
}

function byteToString(arr) {
    if(typeof arr === 'string') {
        return arr;
    }
    var str = '',
        _arr = arr;
    for(var i = 0; i < _arr.length; i++) {
        var one = _arr[i].toString(2),
            v = one.match(/^1+?(?=0)/);
        if(v && one.length == 8) {
            var bytesLength = v[0].length;
            var store = _arr[i].toString(2).slice(7 - bytesLength);
            for(var st = 1; st < bytesLength; st++) {
                store += _arr[st + i].toString(2).slice(2);
            }
            str += String.fromCharCode(parseInt(store, 2));
            i += bytesLength - 1;
        } else {
            str += String.fromCharCode(_arr[i]);
        }
    }
    return str;
}
// 枚举类的所有方法
function enumMethods(targetClass)
{
  var hook = Java.use(targetClass);
  var ownMethods = hook.class.getDeclaredMethods();
  hook.$dispose;

  return ownMethods;
}
// 枚举所有类
function enumAllClasses()
{
  var allClasses = [];
  var classes = Java.enumerateLoadedClassesSync();

  classes.forEach(function(aClass) {
    try {
      var className = aClass.match(/[L](.*);/)[1].replace(/\//g, ".");
    }
    catch(err) {} // avoid TypeError: cannot read property 1 of null
    allClasses.push(className);
  });

  return allClasses;
}
function outDescJavaClass(className) {
    var jClass = Java.use(className);
       console.log(JSON.stringify({
         _name: className,
         _methods: Object.getOwnPropertyNames(jClass.__proto__).filter(function(m) {
           return !m.startsWith('$') // filter out Frida related special properties
             || m == 'class' || m == 'constructor' // optional
         }),
         _fields: jClass.class.getFields().map(function(f) {
           return f.toString()
         })
     }, null, 2));
}


//------------------------------


rpc.exports = {
    getsign:function(url,reqHeaders,ts){
        var x_sign=""
        var urlAddMas
        Java.perform(
            function(){
                var okurl     = Java.use("d.t")["z"](url)
                var nuList    = Java.cast(Java.use("java.util.ArrayList").$new(),Java.use("java.util.List"))
                urlAddMas = Java.use('com.ss.android.ugc.aweme.app.a.b').b(okurl,nuList,parseInt(ts))

                var headersMap = Java.use("java.util.TreeMap").$new()
                for (var key in reqHeaders) {
                    if (reqHeaders.hasOwnProperty(key)) {
                        var header = Java.use("java.util.ArrayList").$new()
                        header.add(String(reqHeaders[key]))
                        headersMap.put(key, header)
                    }
                }
                console.log(headersMap)

                var AnonymousClass1 = Java.use("com.ss.sys.ces.gg.tt$1").$new()
                var x_signMap       = AnonymousClass1["a"](urlAddMas.toString(), headersMap)
                x_sign          = Java.cast(x_signMap, Java.use("java.util.HashMap")).toString()
                console.log(x_sign)
        })
        return {"sign":x_sign,"url":urlAddMas.toString()}
    }
}

function main(){

    var b=Java.use("com.ss.android.ugc.aweme.app.a.b")
    send(11)


    var okurl=Java.use("d.t")["z"]("https://api.amemv.com/aweme/v1/comment/list/?aweme_id=7016387498204990735&cursor=0&count=20&comment_style=2&ts=1634748203&app_type=lite&manifest_version_code=180&_rticket=1634748203094&ac=wifi&device_id=3510079125205277&iid=3351749528134350&os_version=10&channel=juyouliang_dy_and17&version_code=180&device_type=PH-1&language=zh&resolution=1316*2280&openudid=3ceaa77bc1f365b7&update_version_code=1800&app_name=aweme&version_name=1.8.0&os_api=29&device_brand=essential&ssmix=a&device_platform=android&dpi=480&aid=1128")
    var nuList    = Java.cast(Java.use("java.util.ArrayList").$new(),Java.use("java.util.List"))
    var urlAddMas = Java.use('com.ss.android.ugc.aweme.app.a.b').b(okurl,nuList,parseInt(1634748203))
    console.log(urlAddMas)

    var reqHeaders={
        "Cookie"         : "",
        "Accept-Encoding": "gzip",
        "User-Agent"     : "com.ss.android.ugc.aweme/150301 (Linux; U; Android 10; zh_CN; PH-1; Build/QQ3A.200805.001; Cronet/58.0.2991.0)",
        "X-SS-REQ-TICKET": "1634748203093"
    }


    var headersMap = Java.use("java.util.TreeMap").$new()
    for (var key in reqHeaders) {
        if (reqHeaders.hasOwnProperty(key)) {
            var header = Java.use("java.util.ArrayList").$new()
            header.add(String(reqHeaders[key]))
            headersMap.put(key, header)
        }
    }
    console.log(headersMap)

    var AnonymousClass1 = Java.use("com.ss.sys.ces.gg.tt$1").$new()
    var x_signMap       = AnonymousClass1["a"](urlAddMas.toString(), headersMap)
    var x_sign          = Java.cast(x_signMap, Java.use("java.util.HashMap")).toString()
    console.log(x_sign)


    // console.log(a.a)
    // log(a.a)
    // send(a.a.value)
    // send(typeof(a.a))
    // send("--")
    // for (var x in a.a){
    //     send(x)
    // }

}
// Java.perform(main)

// Java.enumerateLoadedClasses({
//     onMatch: function(_className){
//       console.log("[*] found instance of '"+_className+"'");
//     },
//     onComplete: function(){
//       console.log("[*] class enuemration complete");
//     }
// })

