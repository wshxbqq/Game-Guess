/// <reference path="../../cocos2d-js-v3.6.js" />

var $ = {};
$.ajax = function(method, url, data, cb) {
    var _url = url;

    function obj2arg(d) {
        var result = [];
        for (var i in d) {
            result.push("&");
            result.push(encodeURIComponent(i));
            result.push("=");
            result.push(encodeURIComponent(d[i]));
        }
        return result.join('').substring(1);

    }

    var xhr = cc.loader.getXMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
            var httpStatus = xhr.statusText;
            var response = xhr.responseText;
            if (cb) {
                cb(response);
            }

        }
    }


    if (method == "POST") {
        xhr.open(method, _url);
        //mulipart/form-data for upload
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(obj2arg(data));
    } else {
        if (_url.indexOf('?') > -1) {
            xhr.open(method, _url + "&" + obj2arg(data));
        } else {
            if (obj2arg(data) == "") {
                xhr.open(method, _url);
            } else {

                xhr.open(method, _url + "?" + obj2arg(data));
            }
        }

        xhr.send();
    }

}

$.get = function(url, data, cb) {
    var _date;
    var _cb;
    if (typeof(data) == "object") {
        _date = data;
        _cb = cb;
    }
    if (typeof(data) == "function") {
        _date = {}
        _cb = data;
    }
    $.ajax("GET", url, _date, _cb)
}

$.post = function(url, data, cb) {
    var _date;
    var _cb;
    if (typeof(data) == "object") {
        _date = data;
        _cb = cb;
    }
    if (typeof(data) == "function") {
        _date = {}
        _cb = data;
    }
    $.ajax("POST", url, _date, _cb)
}


$.formatNum = function(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;

}

$.columnToRow = function(tdArray) {
    var c = tdArray[0].length;
    var result = [];
    for (var i = 0; i < c; i++) {
        var row = [];
        for (var j = 0; j < tdArray.length; j++) {
            row.push(tdArray[j][i]);
        }
        result.push(row);
    }
    return result;

}

$.splitArray = function(arr, selector, spliter) {
    var result = [];
    var _block = [];
    for (var i = 0; i < arr.length; i++) {
        if (selector(arr[i]) !== spliter) {
            _block.push(arr[i]);
        } else {
            if (_block.length > 0) {
                result.push(_block);
            }
            _block = [];
        }
    }
    if (_block.length > 0) {
        result.push(_block);
    }
    return result;
};

$.GetQueryString = function(name) {
    if (cc.sys.isNative) {
        return "";
    }

    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");

    var r = window.location.search.substr(1).match(reg);

    if (r != null) return unescape(r[2]);
    return null;

}

$.createUUID = function() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}


$.percent = function (pct) {
    var seed = Math.random() * 100;
    return seed < pct;
}




$.DC_SERVER = "http://dcrecord.sinaapp.com/dc/";
$.DC_SERVER_TEST = "http://dcrecord.sinaapp.com/dctest/";

$.dcRaw = function(deviceInfo, UUID, status, lang, region, autoStr, recordId, recordValue, misc, cb) {
    var dc_server = cc.game.config.debugMode == 0 ? $.DC_SERVER : $.DC_SERVER_TEST;
    $.get(dc_server, {
        di: deviceInfo ? deviceInfo : "unknow",
        uuid: UUID ? UUID : "unknow",
        status: status ? status : "unknow",
        lang: lang ? lang : "unknow",
        region: region ? region : "unknow",
        auto: autoStr ? autoStr : "unknow",
        rid: recordId ? recordId : "unknow",
        rv: recordValue ? recordValue : "unknow",
        misc: misc ? misc : "unknow",

    }, function(data) {
        cb(data);


    });
}

$.dcUserDefault = function(recordId, recordValue, misc, cb) {
    var deviceInfo = $.device.getDeviceTypeInfo();
    var uuid = cc.sys.localStorage.getItem("uuid");
    var userStatus = "";
    if (!cc.sys.isNative) {
        deviceInfo = "browser_" + cc.sys.browserType.toLowerCase();
        if (!uuid) {
            uuid = $.createUUID();
            cc.sys.localStorage.setItem("uuid", uuid);
        }
        userStatus = window.PF || $.GetQueryString("pf") + "";
    }


    $.dcRaw(deviceInfo, uuid, userStatus, cc.sys.language, "", cc.sys.os, recordId, recordValue, misc, function() {

    });
}



$.device = {};

$.device.getDeviceTypeInfo = function() {
     if (cc.sys.isNative && jsb && cc.sys.os==cc.sys.OS_IOS) {
        var result = jsb.reflection.callStaticMethod("JSDeviceInfo", "platformString");
        return result;
    }
    if (cc.sys.isNative && jsb && cc.sys.os==cc.sys.OS_ANDROID) {
        var result = jsb.reflection.callStaticMethod("com/originalfun/android/DeviceHelper", "getAndroidInfo","()Ljava/lang/String;");
        return result;
    }

    return "unknow"
}

$.device.gameCenter_AuthenticateLocalUser = function() {
    if (cc.sys.isNative && jsb && cc.sys.os==cc.sys.OS_IOS) {
        var result = jsb.reflection.callStaticMethod("GameCenterJsInterface", "authenticateLocalUser");
        return result;
    }
}

$.device.gameCenter_ShowLeaderboard = function() {
    if (cc.sys.isNative && jsb && cc.sys.os==cc.sys.OS_IOS) {
        var result = jsb.reflection.callStaticMethod("GameCenterJsInterface", "showLeaderboard");
        return result;
    }
}

$.device.gameCenter_ReportScore = function(score, category) {
    if (cc.sys.isNative && jsb && cc.sys.os==cc.sys.OS_IOS) {
        var result = jsb.reflection.callStaticMethod("GameCenterJsInterface", "reportScore:forCategory:", score, category);
        return result;
    }
}


$.device.openShare = function(textToShare, imgToShare, urlToShare) {
    if (cc.sys.isNative && jsb && cc.sys.os==cc.sys.OS_IOS) {
        jsb.reflection.callStaticMethod("ShareJsInterface", "openShare:imageToShare:urlToShare:", textToShare, imgToShare, urlToShare);
    }


}



$.sql = {};
$.sql.initDB = function() {
    if (cc.sys.isNative && jsb) {
        var result = jsb.reflection.callStaticMethod("JsSqlUtil", "initDB");
    }
}

$.sql.closeDB = function() {
    if (cc.sys.isNative && jsb) {
        var result = jsb.reflection.callStaticMethod("JsSqlUtil", "closeDB");
    }
}

$.sql.exec = function(sqlStr) {
    if (cc.sys.isNative && jsb) {
        var result = jsb.reflection.callStaticMethod("JsSqlUtil", "exec:", sqlStr);
    }
}

$.sql.queryData = function(sqlStr) {
    if (cc.sys.isNative && jsb) {
        var result = jsb.reflection.callStaticMethod("JsSqlUtil", "queryData:", sqlStr);
        return JSON.parse(result.toString());
    }
}

$.sql.tableIsExist = function(tableName) {
    if (cc.sys.isNative && jsb) {
        var result = $.sql.queryData("select count(type) from sqlite_master where type='table' and name ='" + tableName + "'");
        var c = parseInt(result[0]["count(type)"]);
        if (c > 0) {
            return true;
        }
    }
    return false;
}




$.weixin = {};

if (!cc.sys.isNative) {
    var img = document.createElement("img");
    img.src = "http://wshxbqq.sinaapp.com/static/share_img.png";
    img.style.display = "none";
    document.body.appendChild(img);
    img.parentNode.removeChild(img);
}
$.weixin.showMask = function () {
    if(!cc.sys.isNative){
        var css = [
           '     .share_wx {                          ',
           '         width: 100%;                     ',
           '         height: 100%;                    ',
           '         background:rgba(0, 0, 0, 0.7) ;  ',
           '         position: absolute;              ',
           '         z-index: 150;                    ',
           '     }                                    ',
           '                                          ',
           ' .share_wx img {                          ',
           '         position: absolute;              ',
           '         right: 0;                        ',
           '         width: 240px;                    ',
           '     }                                    '
        ].join('');
        var cssDom = document.createElement("style");
        cssDom.innerHTML = css;

        document.body.appendChild(cssDom);

        var html = [
            '<div id="weixin_share_content" class="share_wx" style="display: block;">',
            '    <img src="http://wshxbqq.sinaapp.com/static/share_img.png">  ',
            '</div>                                        '
        ].join('');
        document.body.insertAdjacentHTML("afterbegin", html);


    }


}

$.weixin.hideMask = function () {
    if (!cc.sys.isNative) {
        var d = document.getElementById("weixin_share_content");
        d.parentNode.removeChild(d);

    }

}