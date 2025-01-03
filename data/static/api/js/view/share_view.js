window._bd_share_main.F.module("view/share_view", function(e, t, n) {
    var r = e("base/tangram").T,
        i = e("base/class").Class,
        s = e("conf/const"),
        o = e("view/view_base"),
        u = {
            btn: "bdsharebuttonbox",
            count: "bds_count"
        };
    t.View = i.create(function(e) {
        function o() {
            var o = e.tag || "";
            return r("." + u.btn).each(function(e, u) {
                if (!o || r(u).attr(s.CONFIG_TAG_ATTR) == o) t._entities.push(u), r(u).removeClass(function(e, t) {
                    var n = t.match(/bdshare-button-style\d*-\d*/g);
                    if (n) return n.join(" ")
                }), r(u).addClass("bdshare-button-style" + n + "-" + i)
            }), t._entities
        }

        function a() {
            if (e.bdCustomStyle) {
                var t = document.createElement("link");
                t.href = e.bdCustomStyle, t.rel = "styleSheet", t.type = "text/css", document.getElementsByTagName("head")[0].appendChild(t)
            } else window._bd_share_main.F.use("share_style" + n + "_" + i + ".css")
        }

        function f() {
            r("." + u.btn).each(function(e, t) {
                r(t).children("a,span").each(function(e, t) {
                    var n = r(t).attr(s.CMD_ATTR);
                    n && window._bd_share_main.F.use("component/partners", function(e) {
                        var i = e.partners,
                            s = i[n] ? "\u5206\u4eab\u5230" + i[n].name : "";
                        !r(t).attr("title") && s && r(t).attr("title", s)
                    })
                })
            })
        }
        var t = this,
            n = e.bdStyle || 0,
            i = "|16|24|32|".indexOf("|" + e.bdSize + "|") > -1 ? e.bdSize : 16;
        t._buttonType = 0, t.render = function(e) {
            o(), f()
        }, t._init = function() {
            a(), r(t._entities).find("." + u.count).length > 0 && t.fire("getsharecount")
        }, t.setNumber = function(e, n) {
            r(t._entities).find("." + u.count).html(n).attr("title", "\u7d2f\u8ba1\u5206\u4eab" + e + "\u6b21")
        }
    }, o.ViewBase)
});