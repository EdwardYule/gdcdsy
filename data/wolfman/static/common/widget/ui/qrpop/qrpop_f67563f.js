define("common:widget/ui/qrpop/qrpop.js", function(o, n, t) {
    function e(n, t, e) {
        return e = e || {}, s.spop ? (s.spop.render(), p(n, t, e)) : o.async("common:widget/ui/Popup/Popup.js", function(o) {
            s.spop = new o(i), s.spop.addConnectDom(n), s.spop.render(), p(n, t, e)
        }), !1
    }

    function p(n, t, e) {
        e = e || {}, o.async("common:widget/ui/qrpop/qrpops.js", function(o) {
            new o({
                dom: s.spop.content,
                cinfo: {
                    infoWin: s.spop,
                    target: n,
                    info: t
                },
                config: e
            })
        })
    }
    var s = {
            spop: null
        },
        i = {
            isTitle: !1,
            content: "",
            extClass: "loginStyle",
            closeButton: '<button class="mo-close" title="关闭">&times;</button>',
            width: 508,
            height: 349,
            clickClose: !1,
            close: function() {
                T("#mapmask").remove();
                try {
                    var o = window.currentComponent;
                    o && o.cinfo.sms && (o.cinfo.sms = null)
                } catch (n) {}
            },
            free: function() {
                delete s.spop
            }
        };
    s.ready = e, t.exports = s
});