window._bd_share_main.F.module("share/api_base", function(e, t, n) {
    var r = e("base/tangram").T,
        i = e("base/class").Class;
    t.ApiBase = i.create(function(e) {
        function s(e) {
            window._bd_share_main.F.use("component/anticheat", function(t) {
                t.process("mouseenter", e.event, e.element)
            }), t._processEvent(e)
        }

        function o(n) {
            window._bd_share_main.F.use("component/anticheat", function(e) {
                e.process("mouseclick", n.event, n.element)
            });
            var i = t._processAction(n);
            if (i && i.data)
                if (n.cmd == "more" || n.cmd == "count") window._bd_share_main.F.use("component/pop_dialog", function(t) {
                    var r = t.Dialog;
                    r.un(), r.on("clickact", o), r.on("mouseenter", s), r.show(n, e)
                });
                else if (n.cmd == "popup") u(n);
            else {
                var a;
                r.type(e.onBeforeClick) == "function" && (a = r.extend({}, e), a = e.onBeforeClick(n.cmd, a));
                var f = r.extend({}, e, a, {
                    __type: i.data.type,
                    __buttonType: n.buttonType,
                    __cmd: n.cmd,
                    __element: n.element
                });
                window._bd_share_main.F.use("trans/trans", function(e) {
                    e.run(f)
                }), r.type(e.onAfterClick) == "function" && e.onAfterClick(n.cmd)
            }
        }

        function u(t) {
            window._bd_share_main.F.use("component/pop_popup", function(n) {
                var r = n.Popup;
                r.un(), r.on("clickact", o), r.on("mouseenter", s), r.show(t, e)
            })
        }
        var t = this,
            n = null,
            i = null;
        t.getView = function() {
            return n
        }, t.setView = function(e) {
            n = e
        }, t.init = function() {
            t._init(), n && (n.on("clickact", o), n.on("mouseenter", s), n.on("moreover", u))
        }, t.distory = function() {
            t._distory(), n && (n.un(), n.distory()), delete t
        }, t._init = function() {}, t._distory = function() {}, t._processEvent = function(e) {}, t._processAction = function(e) {}
    })
});