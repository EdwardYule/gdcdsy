define("common:widget/ui/userCenter/parabola.js", function(t, r, e) {
    var i = {
        init: function(t) {
            t = T.extend({
                curvature: .003,
                duration: 2e3,
                frameDuration: 10
            }, t), t = this.calParam(t), this.start(t)
        },
        calParam: function(t) {
            t = t || {}, t.driftX = t.endPos.left - t.startPos.left, t.driftY = t.endPos.top - t.startPos.top;
            var r = -1 * t.startPos.top,
                e = this.power(t.driftX, 4),
                i = (4 * r - 2 * t.driftY) * this.power(t.driftX, 2),
                n = this.power(t.driftY, 2),
                a = (-1 * i + Math.sqrt(this.power(i, 2) - 4 * e * n)) / (2 * e);
            return t.curvature = a, t.b = (t.driftY - t.curvature * t.driftX * t.driftX) / t.driftX, t.beginTime = +new Date, t.endTime = t.duration + +new Date, t
        },
        power: function(t, r) {
            return 1 === r ? t : t * arguments.callee(t, r - 1)
        },
        start: function(t) {
            var t = t || {},
                r = function(r) {
                    r.left += t.startPos.left, r.top += t.startPos.top, r.left = Math.round(r.left), r.top = Math.round(r.top), t.ele.css(r)
                },
                e = function() {
                    var e, i, n = +new Date,
                        a = !0;
                    return n >= t.endTime ? (e = t.driftX, i = t.driftY, a = !1) : (e = t.driftX * ((n - t.beginTime) / t.duration), i = t.curvature * e * e + t.b * e), r({
                        left: e,
                        top: i
                    }), a
                },
                i = function() {
                    e() ? n(i, t.frameDuration) : "function" == typeof t.callback && t.callback()
                },
                n = window.requestAnimationFrame || setTimeout;
            n(i)
        }
    };
    e.exports = i
});