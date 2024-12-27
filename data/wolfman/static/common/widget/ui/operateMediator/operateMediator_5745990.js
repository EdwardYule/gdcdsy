define("common:widget/ui/operateMediator/operateMediator.js", function(o, a, n) {
    var t = 0,
        i = 1,
        e = o("common:widget/ui/ui3MobileDownload/ui3MobileDownload.js"),
        p = {
            init: function() {
                {
                    var o = this;
                    window._OLR.uid
                }
                T.ajax("/", {
                    data: {
                        qt: "operateData",
                        getOpModules: ["op1", "op2", "op3", "op4", "op5", "op6", "op7"]
                    },
                    dataType: "json",
                    traditional: !0,
                    success: function(a) {
                        if (a && 0 === a.status) {
                            var n = a.data;
                            n && (T.each(n, function(o, a) {
                                listener.trigger("operateMediator." + o, "init", a)
                            }), listener.on("operateMediator", function(a, t) {
                                o.pipe(t, n, a)
                            }))
                        }
                    },
                    error: function() {
                        o.retry()
                    }
                })
            },
            retry: function() {
                t >= i || (t++, this.init())
            },
            pipe: function(o, a, n) {
                var t = a[o.opid],
                    i = a.op7;
                if (t) {
                    var e = t.bannerImg,
                        p = t.backgroundImg;
                    if (e) {
                        T.extend(t, o, i), p || (t.backgroundImg = "//webmap0.bdimg.com/wolfman/static/common/images/ui3/luhan_bab2361.png");
                        var r = t.contentList;
                        r && r.length > 4 && (r = r.slice(0, 4)), "function" == typeof this[n] && this[n].call(this, t), "display" === n ? addStat("op-banner-" + t.opid, "show", {}) : "openPop" === n && addStat("op-banner-" + t.opid, "click", {})
                    }
                }
            },
            initOpBanner: function(o) {
                T.each(o, function(o, a) {
                    listener.trigger("operateMediator", "display", {
                        opid: a.opid,
                        opTarget: a.bannerWrap
                    }), a.bannerWrap.delegate("img", "click", function() {
                        listener.trigger("operateMediator", "openPop", {
                            opid: a.opid
                        })
                    }), a.bannerWrap.delegate("a", "click", function() {
                        var o = T(this);
                        listener.trigger("operateMediator", "download", {
                            opTarget: o,
                            opid: a.opid
                        })
                    })
                })
            },
            display: function(o) {
                o.opTarget.addClass("op-banner").attr("opid", o.opid).show().append('<img src="' + o.bannerImg + '" />')
            },
            openPop: function() {},
            download: function(o) {
                var a = o.opTarget;
                "pc2MoAndriod" === a.attr("class") ? (T("[name=andriodApk]").attr("src", "https://newclient.map.baidu.com/client/mapappdownload?app=map&qudao=" + o.qudao), e.openDownloadPop(o), addStat("op-banner-" + o.opid + "-bannerAndriod", "click", {})) : "pc2MoIphone" === a.attr("class") && (window.open("http://itunes.apple.com/cn/app/id452186370?ls=1&mt=8"), e.openDownloadPop(o), addStat("op-banner-" + o.opid + "-bannerIos", "click", {}))
            }
        };
    n.exports = p
});