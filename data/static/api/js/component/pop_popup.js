window._bd_share_main.F.module("component/pop_popup", function(e, t) {
    var n = e("base/tangram").T,
        r = e("base/class").Class,
        i = e("conf/const"),
        s = e("component/pop_base"),
        o = {
            btn: ""
        },
        u, a, f, l, c = r.create(function() {
            function t(t, r) {
                var i = r.bdMini || 2,
                    s = r.bdMiniList || e._partnerSort.slice(0, 8 * i),
                    o = [];
                n.each(s, function(t, n) {
                    o[t] = '<li><a href="#" onclick="return false;" class="popup_' + n + '" data-cmd="' + n + '">' + e._partners[n].name + "</a></li>"
                }), l.html(o.join("")), a.width(i * 110 + 6), f.height(a.outerHeight()), f.width(a.outerWidth())
            }
            var e = this;
            e._poptype = 1, e._hide = function() {
                f && f.hide(), a && a.hide()
            }, e._show = function(r, i) {
                t(e._container, i);
                var s = e._getPosition(r.element, i);
                n.each([a, f], function(e, t) {
                    t.css({
                        top: s.top,
                        left: s.left
                    }).show()
                }), n(r.element).one("mouseout", function() {
                    var t = !1;
                    a.one("mouseover", function() {
                        t = !0
                    }), setTimeout(function() {
                        !t && e.hide()
                    }, 300)
                })
            }, e._getPosition = function(e, t) {
                var r = n(e).offset(),
                    i = r.top + n(e).height() + 5,
                    s = r.left,
                    o = a.outerHeight(),
                    u = n(window).scrollTop();
                if (i + o > n("body").height() && i + o > n(window).height() || i + o > u + n(window).height()) i = r.top - o - 5, i = i < u ? u : i;
                var f = t.bdPopupOffsetLeft,
                    l = t.bdPopupOffsetTop;
                if (f || l) i += l | 0, s += f | 0;
                return {
                    top: i,
                    left: s
                }
            }, e._init = function() {
                var t = "bdSharePopup_" + +(new Date),
                    r = ['<iframe frameborder="0" id="' + t + 'bg" class="bdshare_popup_bg" style="display:none;"></iframe>'].join(""),
                    i = ['<div class="bdshare_popup_box" id="' + t + 'box" style="display:none;">', '<div class="bdshare_popup_top">', "\u5206\u4eab\u5230", "</div>", '<ul class="bdshare_popup_list"></ul>', '<div class="bdshare_popup_bottom">', '<a href="#" onclick="return false;" class="popup_more"  data-cmd="more" target="_blank;">\u66f4\u591a...</a>', "</div>", "</div>"].join("");
                n("body").insertHTML("beforeEnd", r + i), e._container = a = n("#" + t + "box"), l = a.find(".bdshare_popup_list"), f = n("#" + t + "bg"), a.mouseleave(e.hide)
            }
        }, s.PopBase);
    t.Popup = function() {
        return u || (u = new c, u.init()), u
    }()
});