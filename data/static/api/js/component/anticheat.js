window._bd_share_main.F.module("component/anticheat", function(e, t, n) {
    var r = e("base/tangram").T,
        i, s, o = function(e, t) {
            var n = r(t).offset(),
                i = {
                    left: e.pageX,
                    top: e.pageY
                };
            return {
                left: Math.floor(i.left - n.left),
                top: Math.floor(i.top - n.top)
            }
        },
        u = function(e, t) {
            typeof i == "undefined" && (i = Math.floor(e.pageX), s = Math.floor(e.pageY));
            if (t) {
                var n = o(e, t);
                r(t).data("over_x", n.left).data("over_y", n.top).data("over_time", +(new Date))
            }
        },
        a = function(e, t) {
            var n = o(e, t);
            r(t).data("click_x", n.left).data("click_y", n.top)
        },
        f = function(e, t, n) {
            e == "mouseenter" ? u(t, n) : e == "mouseclick" && a(t, n)
        },
        l = function(e) {
            var t = r(e.__element),
                n = e.__buttonType,
                o = t.data("over_x") || 0,
                u = t.data("over_y") || 0,
                a = t.data("click_x"),
                f = t.data("click_y"),
                l = t.innerWidth(),
                c = t.innerHeight(),
                h = new Date - t.data("over_time"),
                p = document.body.offsetWidth,
                d = document.body.offsetHeight,
                v = window.screen.availWidth,
                m = window.screen.availHeight;
            return [i, s, n > 0 ? 1 : 0, o, u, a, f, l, c, n, h, p, d, v, m].join(".")
        };
    t.process = f, t.getSloc = l
});