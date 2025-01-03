define("common:widget/ui/prompt/prompt.js", function(require, exports, module) {
    require.loadCss({
        content: ".tip-warper .my-tip{height:20px;position:absolute;padding-top:8px}.tip-warper .my-tip .title{height:20px;width:27px;background:#000;padding:3px 9px;color:#fff;opacity:.7;line-height:20px;text-align:center}.tip-warper .arrow{position:absolute;width:0;height:0;border-style:solid;border-width:0 5px 6px;opacity:.7;border-color:transparent transparent #000}.tip-warper .top{left:50%;margin-left:-5px;top:2px}",
        name: "prompt"
    });
    var Prompt = {
        isResident: !1,
        holdTime: 0,
        timeoutId: "",
        render: function() {
            try {
                if (this.tipTpl && void 0 !== this.tipTpl) return void(this.tip && this.tip.find(".title").text(this.content));
                this.tipTpl = [function(_template_object) {
                    var _template_fun_array = [],
                        fn = function(__data__) {
                            var _template_varName = "";
                            for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                            eval(_template_varName), _template_fun_array.push('<div class="tip-warper"><div class="my-tip"  style=\'display:none;\'><span class="title">', "undefined" == typeof title ? "" : baidu.template._encodeHTML(title), "</span><span class='arrow'></span></div></div>"), _template_varName = null
                        }(_template_object);
                    return fn = null, _template_fun_array.join("")
                }][0];
                var tipHTML = this.tipTpl({
                    title: this.content
                });
                T(tipHTML).appendTo(document.body), this.tip = T(".my-tip"), this.arrow = this.tip.find(".arrow")
            } catch (e) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: e.message || e.description,
                    path: "common:widget/ui/prompt/prompt.js",
                    ln: 31
                })
            }
        },
        setClass: function(t) {
            this.tip && this.tip.addClass(t)
        },
        setMaster: function(t, i) {
            var e = this;
            if (t && i && (this.content = i.content || "", this.master = t || {}, this.isResident = i.isResident, this.appearTime = i.appearTime, !this.isResident || !this.tip)) {
                this.timeoutId && clearTimeout(this.timeoutId), this.render();
                var s = i.offset,
                    p = i.holdTime,
                    a = i.arrowDirection,
                    o = this.getAbsPosition(t);
                this.timeoutId = setTimeout(function() {
                    e.tip.css("left", o.x + s.xOffset + "px"), e.tip.css("top", o.y + s.yOffset + "px"), e.arrow.addClass(a), e.tip.css("display", "block")
                }, p), e.isResident || (baidu.dom.setAttr(this.tip, "isshow", !0), this.master.on("mouseleave,click", function() {
                    e.checkSiblingTip()
                }))
            }
        },
        setOffset: function(t, i) {
            var e = this.tip.css("left").split("px")[0],
                s = this.tip.css("top").split("px")[0];
            this.tip.css("left", e + t + "px"), this.tip.css("top", s + i + "px")
        },
        show: function() {},
        hide: function() {},
        checkSiblingTip: function() {
            for (var t = T(".tip-warper").children(), i = 0; i < t.length; i++) {
                var e = T(t[i]);
                e.attr("isshow") && (e.css("display", "none"), baidu.dom.setAttr(e, "isshow", !1))
            }
        },
        getAbsPosition: function(t) {
            var i = {
                    x: 0,
                    y: 0
                },
                e = t.offset();
            return i.x += e.left, i.y += e.top, i
        }
    };
    module.exports = Prompt
});