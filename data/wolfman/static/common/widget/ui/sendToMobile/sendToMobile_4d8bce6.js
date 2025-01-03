define("common:widget/ui/sendToMobile/sendToMobile.js", function(i, e, n) {
    var o = {
        deviceMap: {
            "iPhone1,1": "iPhone",
            "iPhone1,2": "iPhone 3G",
            "iPhone2,1": "iPhone 3GS",
            "iPhone3,1": "iPhone 4",
            "iPhone3,2": "iPhone 4",
            "iPhone3,3": "iPhone 4",
            "iPhone4,1": "iPhone 4S",
            "iPhone5,1": "iPhone 5",
            "iPhone5,2": "iPhone 5",
            "iPhone5,3": "iPhone 5c",
            "iPhone5,4": "iPhone 5c",
            "iPhone6,1": "iPhone 5s",
            "iPhone6,2": "iPhone 5s",
            "iPhone7,2": "iPhone 6",
            "iPhone7,1": "iPhone 6 Plus",
            "iPhone8,1": "iPhone 6s",
            "iPhone8,2": "iPhone 6s Plus",
            "iPhone8,4": "iPhone SE",
            "iPhone8,3": "iPhone SE",
            "iPhone9,1": "iPhone 7",
            "iPhone9,3": "iPhone 7",
            "iPhone9,2": "iPhone 7 Plus",
            "iPhone9,4": "iPhone 7 Plus",
            "iPhone10,1": "iPhone 8",
            "iPhone10,4": "iPhone 8",
            "iPhone10,2": "iPhone 8 Plus",
            "iPhone10,5": "iPhone 8 Plus",
            "iPhone10,3": "iPhone X",
            "iPhone10,6": "iPhone X",
            "iPhone11,8": "iPhone XR",
            "iPhone11,2": "iPhone XS",
            "iPhone11,6": "iPhone XS Max",
            "iPhone12,1": "iPhone 11",
            "iPhone12,3": "iPhone 11 Pro",
            "iPhone12,5": "iPhone 11 Pro Max",
            "iPhone12,8": "iPhone SE 2",
            "iPhone13,1": "iPhone 12 mini",
            "iPhone13,2": "iPhone 12",
            "iPhone13,3": "iPhone 12 Pro",
            "iPhone13,4": "iPhone 12 Pro Max",
            "iPad1,1": "iPad",
            "iPad2,1": "iPad 2",
            "iPad2,2": "iPad 2",
            "iPad2,3": "iPad 2",
            "iPad2,4": "iPad 2",
            "iPad3,1": "iPad 3",
            "iPad3,2": "iPad 3",
            "iPad3,3": "iPad 3",
            "iPad3,4": "iPad 4",
            "iPad3,5": "iPad 4",
            "iPad3,6": "iPad 4",
            "iPad4,1": "iPad Air",
            "iPad4,2": "iPad Air",
            "iPad4,3": "iPad Air",
            "iPad5,3": "iPad Air 2",
            "iPad5,4": "iPad Air 2"
        },
        warnMap: {
            1: "发生错误",
            "-9": "单个地点每个设备每小时发送5条",
            "-14": "发送失败,每个用户每天可以推送30条消息",
            "-5": "请在手机系统中设置打开百度地图推送"
        },
        getMobile: function(i) {
            var e = this,
                n = {
                    qt: "deviceInfoNew",
                    type: i.type,
                    uid: i.uid || "",
                    routeInfo: i.routeInfo || "",
                    t: +new Date
                },
                o = new Promise(function(i, o) {
                    var P, a = T.ajax("/?" + T.ajax.param(n), {
                        dataType: "json",
                        success: function(n) {
                            if (clearTimeout(P), 0 === n.status) {
                                var o = n.data.devices,
                                    a = o[0],
                                    h = T.cookie.get("deviceSend");
                                h && T.each(o, function(i, e) {
                                    return e.id === h ? (a = e, !1) : void 0
                                });
                                var d = n.data.upass;
                                i(a ? {
                                    pass: d && a.pass,
                                    id: a.id,
                                    name: e.deviceMap[a.mb] || a.mb || "未识别手机"
                                } : !1)
                            }
                        },
                        error: function() {
                            o()
                        }
                    });
                    P = setTimeout(function() {
                        a.abort()
                    }, 5e3)
                });
            return o
        },
        send: function(i) {
            var e = this,
                n = i.device,
                o = {
                    devices: [{
                        id: n.id
                    }],
                    uid: i.uid || "",
                    type: i.type,
                    channel: i.channel || "poi",
                    routeInfo: i.routeInfo || ""
                };
            o = T.ajax.param(o);
            var P = new Promise(function(i, P) {
                var a, h = T.ajax("/?qt=messageCenterNew", {
                    method: "POST",
                    data: o,
                    dataType: "json",
                    success: function(o) {
                        clearTimeout(a), o && 0 === o.status ? T.each(o.data, function(o, a) {
                            0 === a ? (i(), T.cookie.set("deviceSend", n.id, {
                                expires: 6048e5
                            })) : P(e.warnMap[a])
                        }) : P(e.warnMap[1])
                    },
                    error: function() {
                        clearTimeout(a), P(e.warnMap[1])
                    }
                });
                a = setTimeout(function() {
                    h.abort()
                }, 5e3)
            });
            return P
        }
    };
    n.exports = o
});