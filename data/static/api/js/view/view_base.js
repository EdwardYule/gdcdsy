window._bd_share_main.F.module("view/view_base", function(e, t, n) {
    var r = e("base/tangram").T,
        i = e("conf/const"),
        s = e("base/class").Class;
    t.ViewBase = s.create(function(e) {
        function s(e) {
            r(e).click(function(i) {
                if (r(e).attr("data-bd-bind") == n) {
                    var s = o(i.target);
                    s && (i.preventDefault(), t.fire("clickact", {
                        cmd: r(s).attr(t._actBtnSet.cmdAttr),
                        element: s,
                        event: i,
                        buttonType: t._poptype
                    }))
                }
            }).mouseenter(function(i) {
                if (r(e).attr("data-bd-bind") == n) {
                    var s = o(i.target);
                    t.fire("mouseenter", {
                        element: s,
                        event: i
                    })
                }
            }).mousemove(function(i) {
                if (r(e).attr("data-bd-bind") == n) {
                    var s = o(i.target);
                    r(s).hasClass("bds_more") && t.fire("moreover", {
                        element: s
                    })
                }
            }), r(e).attr("data-bd-bind", n)
        }

        function o(e) {
            if (u(e)) return e;
            if (t._actBtnSet.maxDomDepth > 0) {
                var n = t._actBtnSet.maxDomDepth,
                    i = 0,
                    s = r(e).parent().get(0),
                    o = t.entities;
                while (i < n) {
                    if (u(s)) return s;
                    s = r(s).parent().get(0);
                    if (r.array(o).contains(s) || s == document.body) break;
                    i++
                }
            }
            return null
        }

        function u(e) {
            var n = t._actBtnSet;
            return e && e.tagName && (n.className || n.tagName) ? (!n.className || r(e).hasClass(n.className)) && (!n.tagName || n.tagName.toLowerCase().indexOf("|" + e.tagName.toLowerCase() + "|") > -1) && r(e).attr(n.cmdAttr) : !1
        }
        var t = this,
            n = +(new Date);
        t._entities = [], t._buttonType = -1, t._actBtnSet = {
            className: "",
            tagName: "|a|img|span",
            maxDomDepth: 0,
            cmdAttr: i.CMD_ATTR
        }, t.render = function(e) {}, t.init = function() {
            r(t._entities).each(function(e, t) {
                s(t)
            }), t._init(), t._entities.length > 0 && (_bd_share_main._LogPoolV2 == _bd_share_main._LogPoolV2 || [], _bd_share_main._LogPoolV2.push(e.type))
        }, t._init = function() {}, t.distory = function() {
            r(t._entities).removeAttr("data-bd-bind"), t._distory()
        }, t._distory = function() {}
    })
});