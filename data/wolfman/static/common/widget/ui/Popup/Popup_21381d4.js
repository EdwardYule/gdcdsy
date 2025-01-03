define("common:widget/ui/Popup/Popup.js", function(i, t, e) {
    function o() {
        var t = ".map_popup{position:absolute;z-index:50000}.map_popup .popup_main{z-index:2;position:absolute;width:100%;height:100%;background:#fff;overflow:hidden;box-shadow:1px 2px 1px rgba(0,0,0,.15)}.map_popup .poput_shadow{width:100%;height:100%;position:absolute;left:4px;top:4px;z-index:1;_left:1px;_top:1px;_background:#505050;_border:1px solid #505050;_filter:alpha(opacity=20)}.map_popup .title{border-bottom:1px solid #dadada;height:25px;line-height:25px;font-size:12px;color:#4c4c4c;padding-left:7px}.map_popup button{position:absolute;z-index:50;top:7px;right:6px;width:12px;height:12px;background:url(//webmap1.bdimg.com/wolfman/static/common/images/popup_close_15d2283.gif) no-repeat;border:0;cursor:pointer;padding:0}.map_popup .shade{width:100%;height:100%;position:absolute;z-index:50;background:#FFF;filter:alpha(opacity=70);opacity:.7;left:0;top:0;display:none}.map_popup .msgContent{overflow-y:auto;height:150px;_height:130px;word-wrap:break-word;word-break:break-all}.map_popup .tip{background:#fdfddd;color:#9c4200;position:absolute;text-align:center;border:1px solid #eabb00;z-index:1000}.map_popup .tip.warn{z-index:50;width:200px;height:20px;line-height:20px;padding:10px;left:213px;top:180px;display:none}.map_popup .tip.fail{padding:3px 5px;top:15px;left:180px;display:none}.map_popup .tip.fail span{vertical-align:middle;_vertical-align:baseline}.map_popup .tip.fail a{background:url(//webmap1.bdimg.com/wolfman/static/common/images/bgs_6dbfd12.gif) -271px -48px no-repeat;width:11px;height:11px;display:inline-block;zoom:1;vertical-align:middle;margin-left:4px;overflow:hidden;display:-moz-inline-stack;*display:inline;_vertical-align:baseline}.map_popup button.mo-close{position:absolute;top:0;right:0;width:35px;height:36px;line-height:36px;font-size:28px;text-align:center;color:#ccc;cursor:pointer;background-image:none}.map_popup button.mo-close:hover{color:#6DA1EA}";
        i.loadCss({
            content: t,
            name: "Popup"
        })
    }

    function n(i) {
        T.lang.Class.call(this), o(), this.visible = !1, this.config = i, this.config && (this.config.addDom = this.config.addDom ? T.g(this.config.addDom) : document.body, this.config.clickClose = null != i.clickClose && 0 == i.clickClose ? !1 : !0, this.connectDom = new Array)
    }
    var s = 1,
        p = 2,
        h = i("common:widget/ui/util/util.js");
    T.extend(n.prototype, {
        render: function() {
            try {
                var i = this.config,
                    t = this.config.extClass || "";
                this.main = h.beforeEndHTML(i.addDom, '<div class="map_popup ' + t + '" style="width:390px;display:none"></div>');
                var e = this.popBox = h.beforeEndHTML(this.main, '<div class="popup_main"></div>');
                0 != i.isTitle && (this.title = h.beforeEndHTML(e, '<div class="title">系统信息</div>')), this.content = h.beforeEndHTML(e, '<div class="content"></div>'), this.button = this.config.closeButton ? h.beforeEndHTML(e, this.config.closeButton) : h.beforeEndHTML(e, '<button id="popup_close" title="关闭"></button>'), this.shadow = h.beforeEndHTML(this.main, '<div class="poput_shadow"></div>'), this.addConnectDom(this.main), this.initialize()
            } catch (o) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: o.message || o.description,
                    path: "common:widget/ui/Popup/Popup.js",
                    ln: 82
                })
            }
        },
        initialize: function() {
            try {
                var i = this.config;
                this.setTitle(i.title), this.setContent(i.content), this.setWidth(i.width), this.setHeight(i.height), this.show();
                var t = this,
                    e = function(i) {
                        for (var e = i.srcElement || i.target; e;) {
                            for (var o = t.connectDom, n = 0; n < o.length; n++)
                                if (e == o[n]) return;
                            if (e == document.body) return void t.close();
                            e = e.parentNode
                        }
                    };
                this.config.clickClose && T.on(document.body, "mousedown", e), T.on(this.button, "click", function() {
                    t.config.noCloseFun || (t.config.clickClose && T.un(document.body, "mousedown", e), t.config.closeEffect && "function" == typeof t.config.closeEffect ? t.config.closeEffect() : t.main.parentNode && t.main.parentNode.removeChild(t.main), t.visible = !1, t.config.close && "function" == typeof t.config.close && t.config.close(), this.resizeTimer && (window.clearInterval(this.resizeTimer), this.resizeTimer = null), T.g("imgLogo") && (T.g("imgLogo").style.display = "", T.g("imgLogo").style.display = "inline"))
                }), i.open && "function" == typeof i.open && i.open(), this.setPosition()
            } catch (o) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: o.message || o.description,
                    path: "common:widget/ui/Popup/Popup.js",
                    ln: 155
                })
            }
        },
        dialog: function(i) {
            var t = function() {
                    T(i.getDom()).css({
                        left: (h.getClientSize().width - i.config.width) / 2 + "px",
                        top: (h.getClientSize().height - i.config.height) / 2 + "px"
                    })
                },
                e = function() {
                    setTimeout(function() {
                        t(), T.g("mapmask") && (T.g("mapmask").style.width = h.getClientSize().width + "px", T.g("mapmask").style.height = h.getClientSize().height + "px")
                    }, 20)
                };
            t(), T.g("mapmask") ? T.g("mapmask").style.display = "" : T(document.body).append('<div id="mapmask" style="position:absolute;z-index:49999;background:#000;width:' + h.getClientSize().width + "px;height:" + h.getClientSize().height + 'px;left:0;top:0;opacity:0.7;filter:alpha(opacity=70);display:none"></div>'), setTimeout(function() {
                T("#mapmask").show()
            }), T.on(window, "resize", e), T.on(this.button, "click", function() {
                T.un(window, "resize", e)
            })
        },
        setPosition: function() {
            this.config.defaultAnchor && this.updatePos(this.config.defaultAnchor)
        },
        setTitle: function(i) {
            i && this.title && (this.title.innerHTML = i, this.config.title = i)
        },
        setContent: function(i) {
            i && ("string" == typeof i ? this.content.innerHTML = i : (this.content.innerHTML = "", this.content.appendChild(i)), this.config.content = i)
        },
        setWidth: function(i) {
            i && (this.main.style.width = i - 8 + "px", this.config.width = i)
        },
        setHeight: function(i) {
            this.resizeTimer && (window.clearInterval(this.resizeTimer), this.resizeTimer = null), i ? (this.main.style.height = this.shadow.style.height = i - 9 + "px", this.config.height = i, this.content.style.height = 0 == this.config.isTitle ? i - 2 + "px" : i - 24 - 9 + "px", this.content.style.overflowY = this.config.contentOverFlow ? "hidden" : "auto") : (this.content.style.height = "auto", this.resize())
        },
        hide: function() {
            this.main.style.display = "none", this.visible = !1
        },
        show: function() {
            this.main.style.display = "block", this.popBox.scrollTop = 0, this.visible = !0
        },
        getDom: function() {
            return this.main
        },
        resize: function() {
            var i = this,
                t = function() {
                    if (0 == i.config.isAddBottomHeight) var t = i.content.offsetHeight;
                    else var t = i.content.offsetHeight + 24;
                    i.mainHeight && i.mainHeight != t && (i.mainHeight = t), i.popBox.style.height = i.shadow.style.height = i.main.style.height = t + "px", i.popBox.scrollTop = 0
                };
            this.resizeTimer && (window.clearInterval(this.resizeTimer), this.resizeTimer = null), this.resizeTimer = window.setInterval(t, 50)
        },
        updatePos: function(i) {
            var t = this.main,
                e = this.config,
                o = map.getSize(),
                n = h.getClientSize(),
                a = e.offset || [],
                l = a[0] || 0,
                c = a[1] || 0,
                d = n.width <= e.width ? 0 : n.width / 2 - e.width / 2,
                g = n.height <= e.height ? 0 : n.height / 2 - e.height / 2;
            switch (i = i || p) {
                case s:
                    d = o.width <= e.width ? 0 : o.width / 2 - e.width / 2, g = o.height <= e.height ? 0 : o.height / 2 - e.height / 2
            }
            e && "undefined" != typeof e.right ? t.style.right = e.right + l + "px" : t.style.left = e && "undefined" != typeof e.left ? e.left + l + "px" : d + l + "px", t.style.top = e && "undefined" != typeof e.top ? e.top + c + "px" : e && "undefined" != typeof e.bottom ? e.bottom + c + "px" : g + c + "px"
        },
        close: function() {
            this.button.click()
        },
        addConnectDom: function(i) {
            this.connectDom.push(i)
        }
    }), e.exports = n
});