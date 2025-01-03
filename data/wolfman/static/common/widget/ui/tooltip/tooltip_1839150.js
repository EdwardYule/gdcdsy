define("common:widget/ui/tooltip/tooltip.js", function(t, o, i) {
    function e(t, o, i) {
        var e = t.offset(),
            n = t.outerHeight(),
            a = t.outerWidth(),
            p = o.outerWidth(),
            d = i && i.direction || "top",
            r = 0,
            s = 0;
        switch (d) {
            case "top":
                r = Math.round(e.left + a / 2 - p / 2) + "px", s = e.top + n - 1 + "px";
                break;
            case "right":
                var l = i && i.rightFixed;
                r = Math.round(e.left - p - l) + "px", s = e.top - 1 + "px";
                break;
            default:
                r = Math.round(e.left + a / 2 - p / 2) + "px", s = e.top + n - 1 + "px"
        }
        o.css({
            left: r,
            top: s
        })
    }

    function n(t) {
        var o = t.attr("data-tooltip");
        o && T("#tooltip-" + o).hide()
    }

    function a(t, o) {
        var i, n = t.attr("data-title"),
            a = t.attr("data-tooltip"),
            d = "tooltip";
        o && "string" == typeof o.direction && (d = "tooltip-" + o.direction), a ? (i = T("#tooltip-" + a), i.text(n).show()) : n && (p++, t.attr("data-tooltip", p), i = T('<div class="' + d + '" id="tooltip-' + p + '">' + n + "</div>"), T("body").append(i), t.data("tooltipId", "tooltip-" + p)), i && e(t, i, o)
    }
    var p = 0,
        d = {
            show: !1,
            showEvents: "mouseenter",
            hideEvents: "mouseleave,click"
        },
        r = {
            initialize: function(t, o) {
                try {
                    var i = T.object.clone(d);
                    o = T.extend(i, o), o.show && a(t, o), t.on(o.showEvents, function() {
                        a(t, o)
                    }), t.on(o.hideEvents, function() {
                        n(t, o)
                    })
                } catch (e) {
                    "undefined" != typeof alog && alog("exception.fire", "catch", {
                        msg: e.message || e.description,
                        path: "common:widget/ui/tooltip/tooltip.js",
                        ln: 123
                    })
                }
            },
            adjustPosition: e
        };
    i.exports = r
});