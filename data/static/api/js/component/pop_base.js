window._bd_share_main.F.module("component/pop_base", function(e, t, n) {
    var r = e("base/tangram").T,
        i = e("conf/const"),
        s = e("base/class").Class;
    t.PopBase = s.create(function(t) {
        function s(e) {
            r(e).click(function(e) {
                e = r.event(e || window.event);
                var t = o(e.target);
                t && (e.preventDefault(), n.fire("clickact", {
                    cmd: r(t).attr(n._actBtnSet.cmdAttr),
                    element: t,
                    event: e,
                    buttonType: n._poptype
                }))
            }).mouseover(function(e) {
                var t = o(e.target);
                n.fire("mouseenter", {
                    element: t,
                    event: e
                }), r(t).attr("data-cmd") == "more" && n.fire("moreover", {
                    element: t,
                    event: e
                })
            })
        }

        function o(e) {
            if (u(e)) return e;
            if (n._actBtnSet.maxDomDepth > 0) {
                var t = n._actBtnSet.maxDomDepth,
                    i = 0,
                    s = r(e).parent().get(0),
                    o = n.entities;
                while (i < t) {
                    if (u(s)) return s;
                    s = r(s).parent().get(0);
                    if (r.array(o).contains(s) || s == document.body) break;
                    i++
                }
            }
            return null
        }

        function u(e) {
            var t = n._actBtnSet;
            return e && e.tagName && (t.className || t.tagName) ? (!t.className || r(e).hasClass(t.className)) && (!t.tagName || e.tagName.toLowerCase() == t.tagName.toLowerCase()) && r(e).attr(t.cmdAttr) : !1
        }
        var n = this;
        n._container = null, n._actBtnSet = {
            className: "",
            tagName: "a",
            maxDomDepth: 0,
            cmdAttr: i.CMD_ATTR
        }, n._partners = e("component/partners").partners, n._partnerSort = e("component/partners").partnerSort, n._poptype = -1, n.show = function(e, t) {
            window._bd_share_main.F.use("share_popup.css", function() {
                n._show(e, t)
            })
        }, n.hide = function() {
            n._hide(), n.un()
        }, n.init = function() {
            n._init(), s(n._container)
        }, n._init = function() {}, n._show = function() {}, n._hide = function() {}
    })
});