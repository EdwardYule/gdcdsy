define("pano:widget/base/PanoContext.js", function(o, n, e) {
    function r(o) {
        this._moduleHash = o
    }
    var t = o("common:widget/ui/config/config.js");
    T.object.extend(r.prototype, {
        getPanoUrlConfig: function() {
            var o = t.urlConfig,
                n = t.mapVersion,
                e = "",
                r = "",
                i = "";
            return roadLayer = "", indoorClickVersion = "", imageUrl = "", e = o.PANO_TILE_URL instanceof Array ? o.PANO_TILE_URL.join("|") : o.PANO_TILE_URL, r = o.PANO_URL, i = n.UDT_VERSION, indoorClickVersion = n.INDOOR_CLICK_VER, roadLayer = o.PANO_ROAD_LAYER, imageUrl = o.PANO_3DIMAGE_URL, {
                PANO_TILE_URL: e,
                PANO_SERVICE_URL: r,
                PANO_UDT_VERSION: i,
                PANO_ROAD_LAYER_URL: roadLayer,
                PANO_INDOOR_CLICK_VERSION: indoorClickVersion,
                PANO_3DIMAGE_URL: imageUrl
            }
        },
        getConfig: function() {
            return t
        },
        getPanoServiceUrl: function() {
            return CONST.PANO_URL
        },
        getPanoOptions: function() {
            return this._moduleHash.PanoModule ? this._moduleHash.PanoModule.getPanoOptions() : null
        },
        getInnerId: function() {
            return this._moduleHash.PanoOverviewModule ? this._moduleHash.PanoOverviewModule.getInnerId() : null
        },
        getCurrentRoad: function() {
            return this._moduleHash.PanoCopyrightModule ? this._moduleHash.PanoCopyrightModule.getCurrentRoad() : null
        },
        getMarkerUidInBestPano: function() {
            return this._moduleHash.PanoModule ? this._moduleHash.PanoModule.getMarkerUidInBestPano() : ""
        }
    }), e.exports = r
});;
define("pano:widget/base/MapContext.js", function(e, t, i) {
    function o(e) {
        this._moduleHash = e
    }
    var n = e("common:widget/ui/config/config.js"),
        r = n.modelConfig;
    T.object.extend(o.prototype, {
        getLevel: function() {
            return map.getZoom()
        },
        getOverviewLevel: function() {
            var e = this._moduleHash.PanoOverviewModule;
            return e ? e.getLevel() : void 0
        },
        getPCMapCity: function() {
            return {
                cityId: r.cityCode,
                cityName: r.cityName
            }
        },
        getCurrentCity: function(e) {
            var t = this._moduleHash.PanoOverviewModule;
            t ? t.getCurrentCity(e) : e({
                cityId: r.cityCode,
                cityName: r.cityName
            })
        },
        getPoint: function() {
            var e = this._moduleHash.PanoOverviewModule;
            return e ? e.getPoint() : null
        }
    }), i.exports = o
});;
define("pano:widget/base/ModuleClass.js", function(t, n, s) {
    var e = function() {},
        i = T.lang.Class.prototype.dispose,
        o = function() {
            this.dispose = e, this.$dispose && this.$dispose(), i.call(this)
        },
        r = function() {
            T.lang.Class.call(this)
        };
    T.lang.inherits(r, T.lang.Class), T.object.extend(r.prototype, {
        ready: function() {
            this.fire("ready")
        },
        getName: function() {
            return this._className
        },
        constructor: function() {},
        initialize: function() {},
        isAsync: function() {
            return !1
        },
        getSupportEvents: function() {
            return []
        },
        getShareParam: function() {
            return null
        }
    });
    var a = function(t, n) {
        1 === arguments.length && (n = t, t = null);
        var s = e;
        n.constructor && (s = n.constructor, delete n.constructor);
        var i = function() {
            T.lang.Class.call(this), s.apply(this)
        };
        return n.dispose && (n.$dispose = n.dispose), n.dispose = o, t ? T.lang.inherits(i, r, t) : T.lang.inherits(i, r), T.object.extend(i.prototype, n), i
    };
    s.exports = {
        extend: function(t, n) {
            return a(t, n || {})
        }
    }
});;
define("pano:widget/base/md5.js", function(n, r, t) {
    function e(n) {
        return m(f(v(n), n.length * p))
    }

    function u(n) {
        return s(f(v(n), n.length * p))
    }

    function o(n) {
        return A(f(v(n), n.length * p))
    }

    function f(n, r) {
        n[r >> 5] |= 128 << r % 32, n[(r + 64 >>> 9 << 4) + 14] = r;
        for (var t = 1732584193, e = -271733879, u = -1732584194, o = 271733878, f = 0; f < n.length; f += 16) {
            var c = t,
                l = e,
                v = u,
                A = o;
            t = a(t, e, u, o, n[f + 0], 7, -680876936), o = a(o, t, e, u, n[f + 1], 12, -389564586), u = a(u, o, t, e, n[f + 2], 17, 606105819), e = a(e, u, o, t, n[f + 3], 22, -1044525330), t = a(t, e, u, o, n[f + 4], 7, -176418897), o = a(o, t, e, u, n[f + 5], 12, 1200080426), u = a(u, o, t, e, n[f + 6], 17, -1473231341), e = a(e, u, o, t, n[f + 7], 22, -45705983), t = a(t, e, u, o, n[f + 8], 7, 1770035416), o = a(o, t, e, u, n[f + 9], 12, -1958414417), u = a(u, o, t, e, n[f + 10], 17, -42063), e = a(e, u, o, t, n[f + 11], 22, -1990404162), t = a(t, e, u, o, n[f + 12], 7, 1804603682), o = a(o, t, e, u, n[f + 13], 12, -40341101), u = a(u, o, t, e, n[f + 14], 17, -1502002290), e = a(e, u, o, t, n[f + 15], 22, 1236535329), t = i(t, e, u, o, n[f + 1], 5, -165796510), o = i(o, t, e, u, n[f + 6], 9, -1069501632), u = i(u, o, t, e, n[f + 11], 14, 643717713), e = i(e, u, o, t, n[f + 0], 20, -373897302), t = i(t, e, u, o, n[f + 5], 5, -701558691), o = i(o, t, e, u, n[f + 10], 9, 38016083), u = i(u, o, t, e, n[f + 15], 14, -660478335), e = i(e, u, o, t, n[f + 4], 20, -405537848), t = i(t, e, u, o, n[f + 9], 5, 568446438), o = i(o, t, e, u, n[f + 14], 9, -1019803690), u = i(u, o, t, e, n[f + 3], 14, -187363961), e = i(e, u, o, t, n[f + 8], 20, 1163531501), t = i(t, e, u, o, n[f + 13], 5, -1444681467), o = i(o, t, e, u, n[f + 2], 9, -51403784), u = i(u, o, t, e, n[f + 7], 14, 1735328473), e = i(e, u, o, t, n[f + 12], 20, -1926607734), t = h(t, e, u, o, n[f + 5], 4, -378558), o = h(o, t, e, u, n[f + 8], 11, -2022574463), u = h(u, o, t, e, n[f + 11], 16, 1839030562), e = h(e, u, o, t, n[f + 14], 23, -35309556), t = h(t, e, u, o, n[f + 1], 4, -1530992060), o = h(o, t, e, u, n[f + 4], 11, 1272893353), u = h(u, o, t, e, n[f + 7], 16, -155497632), e = h(e, u, o, t, n[f + 10], 23, -1094730640), t = h(t, e, u, o, n[f + 13], 4, 681279174), o = h(o, t, e, u, n[f + 0], 11, -358537222), u = h(u, o, t, e, n[f + 3], 16, -722521979), e = h(e, u, o, t, n[f + 6], 23, 76029189), t = h(t, e, u, o, n[f + 9], 4, -640364487), o = h(o, t, e, u, n[f + 12], 11, -421815835), u = h(u, o, t, e, n[f + 15], 16, 530742520), e = h(e, u, o, t, n[f + 2], 23, -995338651), t = g(t, e, u, o, n[f + 0], 6, -198630844), o = g(o, t, e, u, n[f + 7], 10, 1126891415), u = g(u, o, t, e, n[f + 14], 15, -1416354905), e = g(e, u, o, t, n[f + 5], 21, -57434055), t = g(t, e, u, o, n[f + 12], 6, 1700485571), o = g(o, t, e, u, n[f + 3], 10, -1894986606), u = g(u, o, t, e, n[f + 10], 15, -1051523), e = g(e, u, o, t, n[f + 1], 21, -2054922799), t = g(t, e, u, o, n[f + 8], 6, 1873313359), o = g(o, t, e, u, n[f + 15], 10, -30611744), u = g(u, o, t, e, n[f + 6], 15, -1560198380), e = g(e, u, o, t, n[f + 13], 21, 1309151649), t = g(t, e, u, o, n[f + 4], 6, -145523070), o = g(o, t, e, u, n[f + 11], 10, -1120210379), u = g(u, o, t, e, n[f + 2], 15, 718787259), e = g(e, u, o, t, n[f + 9], 21, -343485551), t = d(t, c), e = d(e, l), u = d(u, v), o = d(o, A)
        }
        return Array(t, e, u, o)
    }

    function c(n, r, t, e, u, o) {
        return d(l(d(d(r, n), d(e, o)), u), t)
    }

    function a(n, r, t, e, u, o, f) {
        return c(r & t | ~r & e, n, r, u, o, f)
    }

    function i(n, r, t, e, u, o, f) {
        return c(r & e | t & ~e, n, r, u, o, f)
    }

    function h(n, r, t, e, u, o, f) {
        return c(r ^ t ^ e, n, r, u, o, f)
    }

    function g(n, r, t, e, u, o, f) {
        return c(t ^ (r | ~e), n, r, u, o, f)
    }

    function d(n, r) {
        var t = (65535 & n) + (65535 & r),
            e = (n >> 16) + (r >> 16) + (t >> 16);
        return e << 16 | 65535 & t
    }

    function l(n, r) {
        return n << r | n >>> 32 - r
    }

    function v(n) {
        for (var r = Array(), t = (1 << p) - 1, e = 0; e < n.length * p; e += p) r[e >> 5] |= (n.charCodeAt(e / p) & t) << e % 32;
        return r
    }

    function A(n) {
        for (var r = "", t = (1 << p) - 1, e = 0; e < 32 * n.length; e += p) r += String.fromCharCode(n[e >> 5] >>> e % 32 & t);
        return r
    }

    function m(n) {
        for (var r = C ? "0123456789ABCDEF" : "0123456789abcdef", t = "", e = 0; e < 4 * n.length; e++) t += r.charAt(n[e >> 2] >> e % 4 * 8 + 4 & 15) + r.charAt(n[e >> 2] >> e % 4 * 8 & 15);
        return t
    }

    function s(n) {
        for (var r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", t = "", e = 0; e < 4 * n.length; e += 3)
            for (var u = (n[e >> 2] >> 8 * (e % 4) & 255) << 16 | (n[e + 1 >> 2] >> 8 * ((e + 1) % 4) & 255) << 8 | n[e + 2 >> 2] >> 8 * ((e + 2) % 4) & 255, o = 0; 4 > o; o++) t += 8 * e + 6 * o > 32 * n.length ? b : r.charAt(u >> 6 * (3 - o) & 63);
        return t
    }
    var C = 0,
        b = "",
        p = 8;
    t.exports = {
        hex_md5: e,
        b64_md5: u,
        str_md5: o
    }
});;
define("pano:widget/component/ScrollView/ScrollView.js", function(l, t, n) {
    var o = function(l, t) {
        t.container = l, this.container = l, this._scrollPanel = new baidu.ui.ScrollPanel(t), this._scrollPanel.render(l)
    };
    o.prototype = {
        fit: function(l, t) {
            var n = this.container.clientHeight,
                o = t * l,
                e = o + t,
                i = this.getScrollValue();
            if (!(o >= i && i + t >= e)) {
                if (i > o) this.scrollTo(o);
                else if (e > i + t) {
                    var r = o - (n - t);
                    this.scrollTo(r)
                }
                return;
                var r
            }
        },
        scrollTo: function(l) {
            this.container.scrollTop = l, this._scrollPanel.update()
        },
        getScrollValue: function() {
            return this.container.scrollTop
        },
        getScrollBarWidth: function() {
            return this._scrollPanel._scrollBarSize
        },
        update: function() {
            this._scrollPanel.update()
        }
    }, n.exports = o
});;
define("pano:widget/component/TableView/TableView.js", function(e, i, t) {
    var l = e("common:widget/ui/Animation/Animation.js"),
        s = e("pano:widget/base/util.js");
    e.loadCss({
        content: ".tableview-container{float:left;position:relative}.tableview-wapper{position:absolute;left:10px;overflow:hidden}.tableview-ul{list-style:none;padding:0;margin:0;position:relative}.tableview-li{cursor:pointer;position:relative}.tableview-li-hover{}.tableview-selected-border{background:0 0;position:absolute;width:100%;height:100%;top:0;left:0;filter:alpha(opacity=100)}.tableview-li-selected .tableview-selected-border{display:block}.tableview-horizontal-ul .tableview-li{float:left}.tableview-bg{background-repeat:no-repeat;background-image:url(//webmap0.bdimg.com/wolfman/static/pano/images/pano_whole/pano-icons_d3a4042.png);_background-image:url(//webmap0.bdimg.com/wolfman/static/pano/images/pano_whole/pano-icons-8_37d67ca.png)}.tableview-la,.tableview-ra{position:absolute;width:22px;height:108px;text-align:center}.tableview-la{left:0}.tableview-ra{right:0}.tableview-la .tableview-bg,.tableview-ra .tableview-bg{width:18px;height:18px;margin:45px auto 0;display:block}.tableview-la .tableview-bg{background-position:0 -36px}.tableview-ra .tableview-bg{background-position:-54px -36px}.tableview-la:hover{_zoom:1}.tableview-la:hover .tableview-bg{background-position:-18px -36px}.tableview-ra:hover{_zoom:1}.tableview-ra:hover .tableview-bg{background-position:-72px -36px}.tableview-container .tableview-la-disabled .tableview-bg{background-position:-36px -36px}.tableview-container .tableview-la-disabled:hover{_zoom:1}.tableview-container .tableview-la-disabled:hover .tableview-bg{background-position:-36px -36px}.tableview-container .tableview-ra-disabled .tableview-bg{background-position:-90px -36px}.tableview-container .tableview-ra-disabled:hover{_zoom:1}.tableview-container .tableview-ra-disabled:hover .tableview-bg{background-position:-90px -36px}"
    });
    var a, o = function() {},
        n = function(e, i, t, s, n, r) {
            var h = t - i;
            0 != h && (a = new l.Animation, a.build({
                fps: 60,
                transition: l.Transitions.linear,
                duration: n || 300,
                render: function(t) {
                    r ? e.style.left = i + h * t + "px" : e.style.top = i + h * t + "px"
                },
                finish: s || o
            }))
        },
        r = function(e, i, t, l, s) {
            if (i >= 0) return baidu.dom.addClass(l, "tableview-la-disabled"), void baidu.dom.addClass(s, "tableview-ra-disabled");
            this.scrollLeft;
            t > e ? baidu.dom.removeClass(l, "tableview-la-disabled") : baidu.dom.addClass(l, "tableview-la-disabled"), e > i ? baidu.dom.removeClass(s, "tableview-ra-disabled") : baidu.dom.addClass(s, "tableview-ra-disabled")
        },
        h = {
            viewWidth: 200,
            viewHeight: 300,
            margin: 2,
            isHorizontal: !1,
            isFullSize: !1
        },
        d = function(e, i) {
            this.options = s.merge(h, i), this.velocity = 300, this.itemLength = 0, this.contentSize = {
                width: 0,
                height: 0
            }, this.scrollAttr = this.options.isHorizontal ? "left" : "top", this.scrollValue = 0, this.minScrollValue = 0, this.maxScrollValue = 0, this.options.isHorizontal ? (this.viewWidth = this.options.viewWidth - 60, this.viewHeight = this.options.viewHeight) : (this.viewWidth = this.options.viewWidth, this.viewHeight = this.options.viewHeight - 24), this.scrollDistance = 0, this.maxAnimationDistance = 0, this.selectedIndex = void 0;
            var t = this.tableContainer = document.createElement("div");
            t.className = "tableview-container", t.style.width = this.options.viewWidth + "px", t.style.height = this.options.viewHeight + "px";
            var l;
            l = this.options.isHorizontal ? this.viewHeight / 2 - 9 : 0;
            var a = this.leftArrow = document.createElement("a");
            a.href = "javascript:void(0)", a.className = "tableview-la", a.innerHTML = '<span style="margin-top:' + l + 'px;" class="tableview-bg"></span>';
            var o = this.rightArrow = document.createElement("a");
            o.href = "javascript:void(0)", o.className = "tableview-ra", o.innerHTML = '<span style="margin-top:' + l + 'px;" class="tableview-bg"></span>', this.options.isHorizontal ? (a.style.height = this.viewHeight + "px", o.style.height = this.viewHeight + "px") : (a.style.height = "12px", o.style.height = "12px");
            var n = this.tableWapper = document.createElement("div");
            n.className = "tableview-wapper", n.style.width = this.viewWidth + "px", n.style.height = this.viewHeight + "px";
            var r = this.ul = document.createElement("ul");
            r.className = "tableview-ul" + (this.options.isHorizontal ? " tableview-horizontal-ul" : "");
            var d = this.selectBorder = document.createElement("div");
            d.className = "tableview-selected-border", n.appendChild(r), t.appendChild(a), t.appendChild(n), t.appendChild(o), e.appendChild(t);
            var c = this,
                v = baidu(t);
            v.delegate("li", "click", function(e) {
                if (!c.ignoreUserEvent) {
                    var i = this.getAttribute("index");
                    void 0 !== i && c.dispatchEvent("click", {
                        index: 1 * i,
                        elem: this,
                        event: e
                    })
                }
            }), v.delegate("li", "mouseenter", function(e) {
                if (!c.ignoreUserEvent) {
                    var i = this.getAttribute("index");
                    T.dom.addClass(this, "tableview-li-hover"), void 0 !== i && c.dispatchEvent("mouseenter", {
                        index: 1 * i,
                        elem: this,
                        event: e
                    })
                }
            }), v.delegate("li", "mouseleave", function(e) {
                if (!c.ignoreUserEvent) {
                    var i = this.getAttribute("index");
                    T.dom.removeClass(this, "tableview-li-hover"), void 0 !== i && c.dispatchEvent("mouseleave", {
                        index: 1 * i,
                        elem: this,
                        event: e
                    })
                }
            }), baidu(a).on("click", function() {
                if (!c.ignoreUserEvent) {
                    c.stopScroll();
                    var e = 1e3 * Math.abs(c.maxScrollValue - c.minScrollValue) / (30 * c.velocity);
                    c.options.isHorizontal ? c.scrollTo(c.scrollValue + c.viewWidth, !1, !0, e, function() {
                        c.scroll(-1)
                    }) : c.scrollTo(c.scrollValue + c.viewHeight, !1, !0, e, function() {
                        c.scroll(-1)
                    })
                }
            }), baidu(o).on("click", function() {
                if (!c.ignoreUserEvent) {
                    c.stopScroll();
                    var e = 1e3 * Math.abs(c.maxScrollValue - c.minScrollValue) / (30 * c.velocity);
                    c.options.isHorizontal ? c.scrollTo(c.scrollValue + -c.viewWidth, !1, !0, e, function() {
                        c.scroll(1)
                    }) : c.scrollTo(c.scrollValue + -c.viewHeight, !1, !0, e, function() {
                        c.scroll(1)
                    })
                }
            }), baidu(a).on("mouseenter", function(e) {
                c.ignoreUserEvent || (c.scroll(-1), baidu.event.preventDefault(e))
            }), baidu(a).on("mouseleave", function() {
                c.stopScroll()
            }), baidu(o).on("mouseenter", function(e) {
                c.ignoreUserEvent || (c.scroll(1), baidu.event.preventDefault(e))
            }), baidu(o).on("mouseleave", function() {
                c.stopScroll()
            })
        };
    baidu.lang.inherits(d, baidu.lang.Class), T.object.extend(d.prototype, {
        addItemContent: function(e, i) {
            var t = document.createElement("li");
            t.className = "tableview-li", "string" == typeof e ? t.innerHTML = e : t.appendChild(e), t.setAttribute("index", this.itemLength), this.itemLength++, void 0 !== i ? this.ul.insertBefore(t, i) : this.ul.appendChild(t);
            var l;
            if (this.options.isHorizontal === !0) {
                l = this.options.margin, t.style.margin = "0 " + l + "px";
                var a = s.getDomSize(t.firstChild);
                this.contentSize.width += a.width + 2 * l
            } else {
                l = this.options.margin;
                var a = s.getDomSize(t.firstChild);
                this.contentSize.height += a.height + 2 * l
            }
            return t
        },
        insertItemBefore: function(e, i) {
            return this.addItemContent(i, e)
        },
        addComponent: function(e) {
            this.tableWapper.appendChild(e)
        },
        resize: function() {
            if (this.options.isFullSize === !0 && this.options.isHorizontal) return this.viewWidth = this.contentSize.width, this.ul.style.width = this.contentSize.width + "px", this.tableWapper.style.width = this.viewWidth + "px", this.tableWapper.style.left = "18px", this.tableContainer.style.width = this.viewWidth + 36 + "px", this.leftArrow.style.display = "none", void(this.rightArrow.style.display = "none");
            if (this.options.isFullSize === !0 && this.options.isHorizontal === !1 && (this.leftArrow.style.display = "none", this.rightArrow.style.display = "none"), this.options.isHorizontal === !0) {
                this.ul.style.width = this.contentSize.width + "px", this.minScrollValue = this.viewWidth - this.contentSize.width;
                var e = this.itemWidth = this.contentSize.width / this.itemLength;
                this.scrollDistance = Math.floor(this.viewWidth / e) * e, this.maxAnimationDistance = this.scrollDistance + 30, r(this.scrollValue, this.minScrollValue, this.maxScrollValue, this.leftArrow, this.rightArrow), this.scrollValue < this.minScrollValue ? this.scrollTo(this.minScrollValue) : this.scrollValue > this.maxScrollValue && this.scrollTo(this.maxScrollValue)
            } else {
                this.ul.style.height = this.contentSize.height + "px", this.minScrollValue = this.viewHeight - this.contentSize.height;
                var i = this.itemHeight = this.contentSize.height / this.itemLength;
                this.scrollDistance = Math.floor(this.viewHeight / i) * i, this.maxAnimationDistance = this.scrollDistance + 12, r(this.scrollValue, this.minScrollValue, this.maxScrollValue, this.leftArrow, this.rightArrow), this.scrollValue < this.minScrollValue ? this.scrollTo(this.minScrollValue) : this.scrollValue > this.maxScrollValue && this.scrollTo(this.maxScrollValue)
            }
        },
        setViewSize: function(e) {
            this.viewWidth = e - 60, this.tableContainer.style.width = e + "px", this.tableWapper.style.width = this.viewWidth + "px", this.resize()
        },
        clear: function() {
            for (var e = this.ul; e.lastChild;) e.removeChild(e.lastChild);
            this.contentSize = {
                width: 0,
                height: 0
            }
        },
        scrollTo: function(e, i, t, l, s) {
            var a = this.ul,
                o = this.scrollValue;
            e = Math.min(this.maxScrollValue, Math.max(this.minScrollValue, e)), !t && (i || Math.abs(o - e) > this.maxAnimationDistance) ? a.style.left = e + "px" : n(a, o, e, s, l, this.options.isHorizontal), this.scrollValue = e
        },
        scrollBy: function(e, i) {
            var t = this.scrollValue + e;
            this.scrollTo(t, i)
        },
        scroll: function(e) {
            if (e > 0) {
                var i = 1e3 * Math.abs(this.scrollValue - this.minScrollValue) / this.velocity;
                this.scrollTo(this.minScrollValue, !1, !0, i)
            } else {
                var i = 1e3 * Math.abs(this.scrollValue) / this.velocity;
                this.scrollTo(this.maxScrollValue, !1, !0, i)
            }
        },
        stopScroll: function() {
            if (a) {
                a.stop(), a = null;
                var e, i = baidu.g(this.ul);
                e = i.style[this.scrollAttr] || "0px", this.scrollValue = parseInt(e.replace("px", "")), r(this.scrollValue, this.minScrollValue, this.maxScrollValue, this.leftArrow, this.rightArrow)
            }
        },
        setSelectIndex: function(e, i) {
            var t = baidu(this.tableWapper).find("li");
            if (null === e && this.selectBorder.parentNode) return T(t[this.selectedIndex]).removeClass("selected-item"), this.selectedIndex = null, void this.selectBorder.parentNode.removeChild(this.selectBorder);
            var l = t[e];
            l && (T(t[this.selectedIndex]).removeClass("selected-item"), T(l).addClass("selected-item"), this.selectedIndex = e, l.appendChild(this.selectBorder), i || this.fitImage(e))
        },
        getSelectIndex: function() {
            return this.selectedIndex
        },
        getSelectItem: function() {
            var e = baidu(this.tableWapper).find("li"),
                i = e[this.selectedIndex];
            return i
        },
        fitImage: function(e, i) {
            if (!(this.minScrollValue >= 0)) {
                var t = this,
                    l = baidu(this.tableWapper).find("li"),
                    s = l[e];
                if (s) {
                    var a = this.itemWidth * e,
                        o = a + this.itemWidth,
                        n = -this.scrollValue;
                    if (!(a >= n && o <= n + this.viewWidth))
                        if (n > a) {
                            var r = 1e3 * Math.abs(a + t.scrollValue) / t.velocity;
                            this.scrollTo(-a, i, !1, r)
                        } else if (o > n + this.viewWidth) {
                        var h = a - (this.viewWidth - this.itemWidth),
                            r = 1e3 * Math.abs(h + t.scrollValue) / t.velocity;
                        this.scrollTo(-h, i, !1, r)
                    }
                }
            }
        },
        destroy: function() {
            T(this.tableContainer).off().remove()
        }
    }), t.exports = d
});;
define("pano:widget/component/PanoAlbumComponent/AlbumComponent.js", function(require, exports, module) {
    var Animation = require("common:widget/ui/Animation/Animation.js"),
        util = require("pano:widget/base/util.js"),
        DO_NOTHING = function() {},
        IMG_ERROR_URL = "//webmap0.bdimg.com/wolfman/static/pano/images/pano_whole/img_error_be87014.png",
        ALBUM_ITEM_TEMPLATE = [function(_template_object) {
            var _template_fun_array = [],
                fn = function(__data__) {
                    var _template_varName = "";
                    for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                    eval(_template_varName), _template_fun_array.push('        <div class="panoAlbum-item-wraper">            '), src && (_template_fun_array.push("                "), name ? _template_fun_array.push('                    <img src="', "undefined" == typeof src ? "" : src, '" onerror="this.src=&#39;', "undefined" == typeof errorUrl ? "" : errorUrl, '&#39;" style="width:', "undefined" == typeof width ? "" : width, "px;height:", "undefined" == typeof height ? "" : height, 'px;" />                    <div class="photo-desc">                                                    <i class="icon ', "undefined" == typeof icon ? "" : icon, '"></i>                            <span title="', "undefined" == typeof name ? "" : name, '">', "undefined" == typeof name ? "" : name, "</span>                    </div>                ") : _template_fun_array.push('                    <a id="ugc-upload-item" target="_blank" href="//pai.baidu.com/?qt=viewapp"><img src="', "undefined" == typeof src ? "" : src, '" onerror="this.src=&#39;', "undefined" == typeof errorUrl ? "" : errorUrl, '&#39;" style="width:', "undefined" == typeof width ? "" : width, "px;height:", "undefined" == typeof height ? "" : height, 'px;" /></a>                '), _template_fun_array.push("            ")), _template_fun_array.push("        </div>"), _template_varName = null
                }(_template_object);
            return fn = null, _template_fun_array.join("")
        }][0],
        ALBUM_SIZES = {
            ARROW_WIDTH: 30
        },
        EXIT_WIDTH = 215,
        FLOOR_WIDTH = 58,
        animation, createAlbumItem = function(e, t, i, o, n) {
            var r = document.createElement("li");
            return r.style.width = e + "px", r.style.height = t + "px", r.className = "panoAlbum-item", r.innerHTML = ALBUM_ITEM_TEMPLATE({
                src: i,
                icon: o,
                name: n,
                errorUrl: IMG_ERROR_URL,
                width: e,
                height: t
            }), r
        },
        createAlbumExit = function(e, t, i, o, n) {
            var r = document.createElement("div");
            return r.style.width = e + "px", r.style.height = t + "px", r.className = "panoAlbum-exit panoAlbum-item", r.innerHTML = ALBUM_ITEM_TEMPLATE({
                src: i,
                icon: o,
                name: n,
                errorUrl: IMG_ERROR_URL,
                width: e,
                height: t
            }), r
        },
        fadeInOutEffect = function(e, t, i, o) {
            var n = 0,
                r = e.length,
                a = 0,
                l = t.length,
                s = new Animation.Animation;
            return s.build({
                fps: 40,
                transition: Animation.Transitions.easeOutQuad,
                duration: i,
                render: function(i) {
                    for (n = 0; r > n; n++) util.setOpacity(e[n], i);
                    for (a = 0; l > a; a++) util.setOpacity(t[a], 1 - i)
                },
                finish: o || DO_NOTHING
            }), s
        },
        move = function(e, t, i, o, n) {
            var r = i - t;
            0 != r && (animation = new Animation.Animation, animation.build({
                fps: 60,
                transition: Animation.Transitions.linear,
                duration: n || 300,
                render: function(i) {
                    e.style.left = t + r * i + "px"
                },
                finish: function() {
                    o && o(e, i)
                }
            }))
        },
        checkArrowStatus = function(e, t, i, o, n) {
            if (t >= 0) return disableArrow(o), void disableArrow(n);
            this.scrollLeft;
            i > e ? enableArrow(o) : disableArrow(o), e > t ? enableArrow(n) : disableArrow(n)
        },
        disableArrow = function(e) {
            baidu.dom.addClass(e, "arrow-disabled")
        },
        enableArrow = function(e) {
            baidu.dom.removeClass(e, "arrow-disabled")
        };
    require.loadCss({
        content: '#panoGuideAlbum{height:108px;-moz-user-select:none;-webkit-user-select:none;position:relative}.panoAlbum-exit{display:inline-block;float:left;margin-left:10px;position:relative!important}#panoGuideAlbum .left-arrow,#panoGuideAlbum .right-arrow{background:url(//webmap0.bdimg.com/wolfman/static/pano/images/pano_whole/album_678b671.png) no-repeat}#panoGuideAlbum #l_arrow,#panoGuideAlbum #r_arrow{float:left;width:30px;height:108px;text-align:center}#panoGuideAlbum #l_arrow:hover,#panoGuideAlbum #r_arrow:hover{cursor:pointer}#panoGuideAlbum .l_arrow .left-arrow{display:inline-block;width:18px;height:18px;background-position:-95px -79px;margin-top:45px}#panoGuideAlbum .r_arrow .right-arrow{display:inline-block;width:18px;height:18px;background-position:-117px -79px;margin-top:45px}#panoGuideAlbum .l_arrow:hover{_zoom:1}#panoGuideAlbum .r_arrow:hover{_zoom:1}#panoGuideAlbum .l_arrow:hover .left-arrow{background-position:-77px -79px}#panoGuideAlbum .r_arrow:hover .right-arrow{background-position:-131px -79px}#panoGuideAlbum .arrow-disabled .left-arrow,#panoGuideAlbum .arrow-disabled:hover .left-arrow{background-position:-95px -99px}#panoGuideAlbum .arrow-disabled .right-arrow,#panoGuideAlbum .arrow-disabled:hover .right-arrow{background-position:-117px -99px}.panoAlbum-container{float:left;overflow:hidden;height:108px;position:relative}.panoAlbum-wraper{position:absolute}#panoGuideAlbum .panoAlbum-item,.panoAlbum-exit .panoAlbum-item{position:relative;float:left;border:1px #252525 solid;margin-right:5px;font-size:0;position:absolute}#panoGuideAlbum .panoAlbum-item-wraper,.panoAlbum-exit .panoAlbum-item-wraper{left:0;top:0;z-index:4;zoom:1;cursor:pointer;height:108px}#panoGuideAlbum .panoAlbum-item img,.panoAlbum-exit .panoAlbum-item img{cursor:pointer;border:0;width:100%;height:100%}.pc #panoGuideAlbum .panoAlbum-item .photo-desc{font-family:Arial,"Microsoft Yahei","微软雅黑",sans-serif}#panoGuideAlbum .panoAlbum-item .photo-desc{position:absolute;bottom:0;left:0;width:198px;height:24px;padding-top:25px;font-size:12px;color:#abb0b2;z-index:3;background:url(//webmap1.bdimg.com/wolfman/static/pano/images/pano_whole/album-title-bg_e85b917.png) left bottom repeat-x;_background:0 0}.panoAlbum-exit .photo-desc{position:absolute;bottom:0;left:0;width:198px;height:24px;padding-top:25px;font-size:12px;color:#abb0b2;z-index:3;background:url(//webmap1.bdimg.com/wolfman/static/pano/images/pano_whole/album-title-bg_e85b917.png) left bottom repeat-x;_background:0 0}#panoGuideAlbum .panoAlbum-item .photo-desc span,.panoAlbum-exit .panoAlbum-item .photo-desc span{display:inline-block;text-indent:4px;vertical-align:middle;width:165px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#panoGuideAlbum .panoAlbum-item .selected-item{position:absolute;top:0;left:0;border:3px solid #3af;z-index:5}#panoGuideAlbum .panoAlbum-item-on,.panoAlbum-exit.panoAlbum-item-on{border:1px #3af solid}.panoAlbum-container{height:110px}#panoAlbum-scrollWraper{height:108px;overflow:hidden;position:relative}#panoGuideAlbum .icon,.panoAlbum-exit .icon{display:inline-block;width:18px;height:18px;vertical-align:middle;background:url(//webmap1.bdimg.com/wolfman/static/pano/images/pano_whole/guide_icons2_f6fe25f.png) no-repeat;_background:url(//webmap1.bdimg.com/wolfman/static/pano/images/pano_whole/guide_icons2_8_da776ab.png) no-repeat}#panoGuideAlbum .photo-desc .icon,.panoAlbum-exit .photo-desc .icon{margin-left:8px}#panoGuideAlbum .i-poi-1,#panoGuideAlbum .i-poi-2,#panoGuideAlbum .i-poi-4{background-position:-30px 3px}#panoGuideAlbum .i-poi-21{background-position:-39px 3px}#panoGuideAlbum .panoAlbum-item-wraper:hover .i-poi-1,#panoGuideAlbum .panoAlbum-item-wraper:hover .i-poi-2,#panoGuideAlbum .panoAlbum-item-wraper:hover .i-poi-4{background-position:-30px -42px}#panoGuideAlbum .i-poi-3,.panoAlbum-exit .i-poi-3{background-position:2px 2px;margin-left:8px}#panoGuideAlbum .panoAlbum-item-wraper:hover .i-poi-3,.panoAlbum-exit .panoAlbum-item-wraper:hover .i-poi-3{background-position:1px -43px}#panoGuideAlbum .i-poi-6{background-position:-122px 1px;margin-left:8px}#panoGuideAlbum .panoAlbum-item-wraper:hover .i-poi-6{background-position:-122px -43px}#panoGuideAlbum .i-poi-5{background-position:-93px 0;margin-left:8px}#panoGuideAlbum .panoAlbum-item-wraper:hover .i-poi-5{background-position:-93px -44px}#panoGuideAlbum .i-poi-10,#panoGuideAlbum .i-poi-9,#panoGuideAlbum .i-poi-7{background-position:-64px 0;margin-left:8px}#panoGuideAlbum .panoAlbum-item-wraper:hover .i-poi-10,#panoGuideAlbum .panoAlbum-item-wraper:hover .i-poi-9,#panoGuideAlbum .panoAlbum-item-wraper:hover .i-poi-7{background-position:-66px -43px}#panoGuideAlbum .panoAlbum-item-wraper:hover .i-poi-21{background-position:-39px -43px}.panoAlbum-item-wraper:hover .photo-desc span{color:#d3d8db}#panoGuideAlbum .i-poi-11{background-position:-154px 1px}#panoGuideAlbum .panoAlbum-item-wraper:hover .i-poi-11{background-position:-154px -42px}'
    });
    var doingWheelScroll = !1,
        AlbumComponent = function(e, t, i, o) {
            this.itemWidth = t, this.itemHeight = i, this.itemMargin = 6, this.ignoreUserEvent = !1, this.options = util.merge({}, o), this.parentElem = e;
            var n = this;
            this.velocity = 300, this.scrollLeft = 0, this.minScrollLeft = 0, this.maxScrollLeft = 0;
            var r = 0;
            this.viewWidth = 0, this.itemOuterWidth = 0, this.scrollDistance = 0, this.maxAnimationDistance = 0, this.selectedIndex = void 0;
            var a = this.container = document.createElement("div"),
                l = "width:" + r + "px; height:" + this.itemHeight + "px; z-index:" + o.zIndex;
            a.setAttribute("id", "panoGuideAlbum"), a.setAttribute("style", l);
            var s = util.each(["l", "r"], function(e) {
                var t = document.createElement("a");
                return t.id = e + "_arrow", t.href = "javascript:void(0)", t.className = e + "_arrow", t.title = "", t.innerHTML = '<span class="' + ("l" == e ? "left-arrow" : "right-arrow") + '"></span>', t
            }, !0);
            if (this.leftArrow = s[0], this.rightArrow = s[1], this.albumContainer = document.createElement("div"), this.albumContainer.className = "panoAlbum-container", this.albumContainer.id = "panoAlbum-container", this.albumWraper = document.createElement("div"), this.albumWraper.className = "panoAlbum-wraper", this.albumContainer.appendChild(this.albumWraper), a.appendChild(s[0]), a.appendChild(this.albumContainer), a.appendChild(s[1]), e.appendChild(a), n.bindDomEvent(), a.onselectstart = function() {
                    return !1
                }, n._currentIndex >= 0) {
                var u = 1,
                    p = albumData.content[n._currentIndex],
                    m = n.getFloorInfo(n._currentPanoId);
                m.floor && u != m.floor && (p.data.source = "PanoFloor", p.data.floor = m.floor, p.data.floorsData = m.floorsData, setTimeout(function() {
                    n.dispatchEvent("floor_changed", {
                        data: p.data
                    })
                }, 100), u = m.floor)
            }
        };
    baidu.lang.inherits(AlbumComponent, baidu.lang.Class, "AlbumComponent"), baidu.object.extend(AlbumComponent.prototype, {
        ignoreMouseEvent: function(e) {
            this.ignoreUserEvent = !!e
        },
        bindDomEvent: function() {
            function e(e) {
                if (!t.ignoreUserEvent && !doingWheelScroll) {
                    t.stopScroll();
                    var i = 1;
                    i = e.detail ? e.detail < 0 ? 1 : -1 : e.wheelDelta > 0 ? 1 : -1;
                    var o = t.scrollLeft + i * t.viewWidth,
                        n = Math.min(t.maxScrollLeft, Math.max(t.minScrollLeft, o)) - t.scrollLeft;
                    if (0 !== n) {
                        var r = 1e3 * Math.abs(n) / (30 * t.velocity);
                        doingWheelScroll = !0, t.scrollTo(o, !1, !0, r, function() {
                            t.stopScroll(), doingWheelScroll = !1
                        })
                    }
                }
            }
            var t = this,
                i = baidu(this.albumWraper),
                o = baidu(this.albumContainer).parents("#pano-func-item");
            i.delegate("li", "click", function() {
                if (!t.ignoreUserEvent) {
                    var e = this.getAttribute("index");
                    void 0 !== e && t.dispatchEvent("click", {
                        index: e
                    })
                }
            }), i.delegate("li", "mouseenter", function() {
                if (!t.ignoreUserEvent) {
                    var e = this.getAttribute("index");
                    T.dom.addClass(this, "panoAlbum-item-on"), void 0 !== e && t.dispatchEvent("mouseenter", {
                        index: e
                    })
                }
            }), i.delegate("li", "mouseleave", function() {
                if (!t.ignoreUserEvent) {
                    var e = this.getAttribute("index");
                    T.dom.removeClass(this, "panoAlbum-item-on"), void 0 !== e && t.dispatchEvent("mouseleave", {
                        index: e
                    })
                }
            }), o.delegate(".panoAlbum-exit", "click", function() {
                t.ignoreUserEvent || t.dispatchEvent("click", {
                    index: "exit"
                })
            }), o.delegate(".panoAlbum-exit", "mouseenter", function() {
                t.ignoreUserEvent || (T.dom.addClass(this, "panoAlbum-item-on"), t.dispatchEvent("mouseenter", {
                    index: "exit"
                }))
            }), o.delegate(".panoAlbum-exit", "mouseleave", function() {
                t.ignoreUserEvent || (T.dom.removeClass(this, "panoAlbum-item-on"), t.dispatchEvent("mouseleave", {
                    index: "exit"
                }))
            }), baidu(this.albumContainer).on("mousewheel", function(t) {
                e(t)
            }), baidu(this.albumContainer).on("DOMMouseScroll", function(t) {
                e(t)
            }), baidu(this.leftArrow).on("click", function() {
                if (!t.ignoreUserEvent) {
                    t.stopScroll();
                    var e = 1e3 * Math.abs(t.maxScrollLeft - t.minScrollLeft) / (30 * t.velocity);
                    t.scrollTo(t.scrollLeft + t.viewWidth, !1, !0, e, function() {
                        t.scroll(-1)
                    })
                }
            }), baidu(this.rightArrow).on("click", function() {
                if (!t.ignoreUserEvent) {
                    t.stopScroll();
                    var e = 1e3 * Math.abs(t.maxScrollLeft - t.minScrollLeft) / (30 * t.velocity);
                    t.scrollTo(t.scrollLeft + -t.viewWidth, !1, !0, e, function() {
                        t.scroll(1)
                    })
                }
            }), baidu(this.leftArrow).on("mouseenter", function(e) {
                t.ignoreUserEvent || (t.scroll(-1), baidu.event.preventDefault(e))
            }), baidu(this.leftArrow).on("mouseleave", function() {
                t.stopScroll()
            }), baidu(this.rightArrow).on("mouseenter", function(e) {
                t.ignoreUserEvent || (t.scroll(1), baidu.event.preventDefault(e))
            }), baidu(this.rightArrow).on("mouseleave", function() {
                t.stopScroll()
            }), this._window_Resize_handler = function() {
                t._timer && clearTimeout(t._timer), t._timer = setTimeout(function() {
                    t.resize()
                }, 100)
            }, T.on(window, "resize", this._window_Resize_handler)
        },
        getCurrentLiPosition: function(e) {
            var t = e * this.itemOuterWidth + this.scrollLeft + this.itemWidth / 2 + 30,
                i = document.body.clientHeight - this.container.offsetHeight - 10;
            return {
                x: t,
                y: i
            }
        },
        resize: function(e, t) {
            {
                var i = this.data || [],
                    o = e || document.body.clientWidth - this.parentElem.offsetLeft;
                this.viewWidth + 2 * ALBUM_SIZES.ARROW_WIDTH
            }
            if (void 0 === t) {
                var n = T(this.container).find(".floor-container"),
                    r = T(this.container).find(".catalog-container");
                (n.length > 0 || r.length > 0) && (t = !0)
            }
            this.viewWidth = this.exitDom && t ? o - EXIT_WIDTH - FLOOR_WIDTH - 2 * ALBUM_SIZES.ARROW_WIDTH - 2 : this.exitDom ? o - EXIT_WIDTH - 2 * ALBUM_SIZES.ARROW_WIDTH - 2 : t ? o - FLOOR_WIDTH - 2 * ALBUM_SIZES.ARROW_WIDTH - 2 : o - 2 * ALBUM_SIZES.ARROW_WIDTH - 2, this.itemOuterWidth = this.itemWidth + this.itemMargin + 2;
            var a = i.length * this.itemOuterWidth;
            this.minScrollLeft = this.viewWidth - i.length * this.itemOuterWidth, this.scrollDistance = Math.floor(this.viewWidth / this.itemOuterWidth) * this.itemOuterWidth, this.maxAnimationDistance = this.scrollDistance + ALBUM_SIZES.ARROW_WIDTH, this.container.style.width = o + "px", this.albumContainer.style.width = this.viewWidth + "px", this.albumWraper.style.width = a + "px", checkArrowStatus(this.scrollLeft || 0, this.minScrollLeft, this.maxScrollLeft, this.leftArrow, this.rightArrow)
        },
        unselect: function() {
            this.selectedIndex = void 0, baidu.dom.remove("selected-border")
        },
        setSelectIndex: function(e) {
            baidu.dom.remove("selected-border");
            var t = baidu(this.albumWraper).find("li"),
                i = t[e];
            if (i) {
                this.selectedIndex = e;
                var o = baidu.dom.create("div", {
                    id: "selected-border",
                    "class": "selected-item"
                });
                o.style.height = this.itemHeight - 6 + "px", o.style.width = this.itemWidth - 6 + "px", o.style.zoom = 1, i.appendChild(o), this.fitImage(e)
            }
        },
        getSelectIndex: function() {
            return this.selectedIndex
        },
        fitImage: function(e) {
            if (this.canScroll && !doingWheelScroll) {
                var t = this,
                    i = baidu(this.albumWraper).find("li"),
                    o = i[e];
                if (o) {
                    var n = this.itemOuterWidth * e,
                        r = n + this.itemOuterWidth,
                        a = -this.scrollLeft;
                    if (!(n >= a && r <= a + this.viewWidth))
                        if (a > n) {
                            var l = 1e3 * Math.abs(n + t.scrollLeft) / t.velocity;
                            this.scrollTo(-n, !1, !1, l)
                        } else if (r > a + this.viewWidth) {
                        var s = n - (this.viewWidth - this.itemOuterWidth),
                            l = 1e3 * Math.abs(s + t.scrollLeft) / t.velocity;
                        this.scrollTo(-s, !1, !1, l)
                    }
                }
            }
        },
        update: function(e) {
            var t = this,
                i = this.data;
            this.data = e;
            var o = e ? e.length : 0,
                n = o * this.itemOuterWidth;
            this.minScrollLeft = this.viewWidth - o * this.itemOuterWidth, this.scrollDistance = Math.floor(this.viewWidth / this.itemOuterWidth) * this.itemOuterWidth, this.canScroll = n <= this.viewWidth ? !1 : !0, checkArrowStatus(this.scrollLeft || 0, this.minScrollLeft, this.maxScrollLeft, this.leftArrow, this.rightArrow), t._currentIndex = -1;
            var r = e,
                a = baidu.g(this.albumWraper);
            a.style.zIndex = 1;
            var l = this.itemWidth,
                s = this.itemHeight,
                u = this.itemOuterWidth,
                p = [];
            if (this.fadeInOutEffectAnim && this.fadeInOutEffectAnim.stop(!0), i) {
                var m = a.getElementsByTagName("li");
                if (m = util.converToArray(m), util.each(r, function(e, t) {
                        var o = i[t];
                        if (o)
                            if (o.src == e.src && o.name == e.name);
                            else {
                                var n = m[t],
                                    r = createAlbumItem(l, s, e.src, e.icon, e.name);
                                r.setAttribute("index", t), r.style.left = u * t + "px", a.insertBefore(r, n), p.push(n), n.parentNode.removeChild(n)
                            }
                        else {
                            var r = createAlbumItem(l, s, e.src, e.icon, e.name);
                            r.setAttribute("index", t), r.style.left = u * t + "px", a.appendChild(r)
                        }
                    }), r.length < i.length)
                    for (var o = i.length, d = r.length; o > d;) a.removeChild(m.pop()), o--;
                if (util.each(p, function(e) {
                        a.appendChild(e)
                    }), p.length > 0) {
                    var h = function() {
                        for (var e; p.length > 0;) e = p.pop(), e.parentNode.removeChild(e);
                        t.fadeInOutEffectAnim = null
                    };
                    this.fadeInOutEffectAnim = fadeInOutEffect([], p, 800, h)
                }
            } else util.each(r, function(e, t) {
                var i = createAlbumItem(l, s, e.src, e.icon, e.name);
                i.setAttribute("index", t), i.style.left = u * t + "px", a.appendChild(i)
            });
            (this.scrollLeft > this.maxScrollLeft || this.scrollLeft < this.minScrollLeft) && this.scrollTo(0, !0)
        },
        showExit: function(e) {
            var t, i = this.itemWidth,
                o = this.itemHeight,
                n = T(this.container);
            "出口" === e.name && (e.name = "街道全景"), this.exitDom && this.exitDom.getElementsByTagName("img")[0].src !== e.src ? (n.children(".panoAlbum-exit").remove(), t = this.exitDom = createAlbumExit(i, o, e.src, e.icon, e.name), T(t).prependTo(n)) : this.exitDom || (t = this.exitDom = createAlbumExit(i, o, e.src, e.icon, e.name), T(t).prependTo(n))
        },
        destroyExit: function() {
            this.exitDom && this.container.removeChild(this.exitDom), this.exitDom = null
        },
        scrollTo: function(e, t, i, o, n) {
            var r = baidu.g(this.albumWraper),
                a = this.scrollLeft;
            e = Math.min(this.maxScrollLeft, Math.max(this.minScrollLeft, e)), !i && (t || Math.abs(a - e) > this.maxAnimationDistance) ? r.style.left = e + "px" : move(r, a, e, n, o), this.scrollLeft = e
        },
        scrollBy: function(e, t) {
            var i = this.scrollLeft + e;
            this.scrollTo(i, t)
        },
        scroll: function(e) {
            var t = this;
            if (e > 0) {
                var i = 1e3 * Math.abs(this.scrollLeft - this.minScrollLeft) / this.velocity;
                this.scrollTo(this.minScrollLeft, !1, !0, i, function() {
                    checkArrowStatus(t.scrollLeft, t.minScrollLeft, t.maxScrollLeft, t.leftArrow, t.rightArrow)
                })
            } else {
                var i = 1e3 * Math.abs(this.scrollLeft) / this.velocity;
                this.scrollTo(this.maxScrollLeft, !1, !0, i, function() {
                    checkArrowStatus(t.scrollLeft, t.minScrollLeft, t.maxScrollLeft, t.leftArrow, t.rightArrow)
                })
            }
        },
        stopScroll: function() {
            if (doingWheelScroll = !1, animation) {
                animation.stop(), animation = null;
                var e = baidu.g(this.albumWraper);
                this.scrollLeft = parseInt(e.style.left.replace("px", "")), checkArrowStatus(this.scrollLeft, this.minScrollLeft, this.maxScrollLeft, this.leftArrow, this.rightArrow)
            }
        },
        getFloorInfo: function(e) {
            var t = this;
            if (t._opts.floorData)
                for (var i = t._opts.floorData.floors, o = 0, n = i.length; n > o; o++)
                    for (var r = i[o], a = r.Points, l = 0, s = a.length; s > l; l++) {
                        var u = a[l];
                        if (e == u.PID) return {
                            floor: r.Floor + "",
                            floorsData: r
                        }
                    }
            return {
                floor: null,
                floorsData: null
            }
        },
        dispose: function() {
            baidu.dom.remove("panoGuideAlbum"), baidu.un(window, "resize", this._window_Resize_handler)
        }
    }), module.exports = AlbumComponent
});;
define("pano:widget/component/FoldPanelComponent/FoldPanelComponent.js", function(t, e, n) {
    function i(t, e, n) {
        T.lang.Class.call(this);
        var i = this._opts = s.merge(u, n);
        this._parentNode = e, this._titleNode = t, this._anim = null, this.status = p.folded;
        var o = this._panelContainer = document.createElement("div");
        o.className = "fold-panel-container";
        var a = this._contentContainer = document.createElement("div");
        a.setAttribute("role", "contentContainer"), a.className = "fold-panel-content", a.style.cssText = ["position:absolute", "padding:" + c].join(";");
        var l = this._contentHeader = document.createElement("div");
        l.style.cssText = ["position: relative", "z-index: 2"].join(";"), a.appendChild(l);
        var r = this._contentWapper = document.createElement("div");
        r.className = "content-wapper", a.appendChild(r);
        var h = this._bgDom = document.createElement("div");
        h.className = "fold-panel-bg";
        var f = [("left" == i.align ? "left" : "right") + ":0"];
        s.isIE() ? (f.push("filter:alpha(opacity=90)"), f.push("_filter:alpha(opacity=90)"), f.push("background-color:rgb(" + i.backgroundColor + ")")) : f.push("background-color:rgba(" + i.backgroundColor + ", " + i.backgroundOpacity + ")"), h.style.cssText = f.join(";"), a.appendChild(h);
        var y = this;
        s.each(d, function(t) {
            T.on(o, t, function(e) {
                y.dispatchEvent(t, e)
            })
        }), this._autoFoldTimer = null;
        var m = !1,
            g = !0,
            b = function() {
                g = !1, y.cancelDelayAction(), m || setTimeout(function() {
                    g || y.expand()
                }, 300)
            },
            _ = function() {
                g = !0, y.cancelDelayAction(), m || (y._autoFoldTimer = setTimeout(function() {
                    y.fold()
                }, y._opts.foldDelay))
            };
        this.ignoreMouseEvent = function(t) {
            m = !!t
        }, y.addEventListener("mouseenter", b), y.addEventListener("mouseleave", _), T.on(t, "mouseenter", b), T.on(t, "mouseleave", _), o.appendChild(a), e.appendChild(o), this._titleNode.style.display = "none"
    } {
        var o = t("common:widget/ui/Animation/Animation.js"),
            s = t("pano:widget/base/util.js");
        t("pano:widget/component/ScrollView/ScrollView.js")
    }
    t.loadCss({
        content: ".fold-panel-container{overflow:hidden;height:0;position:absolute;border-top:1px solid #53565d}.fold-panel-bg{z-index:0;position:absolute;width:100%;top:0;border-bottom-right-radius:2px;border-bottom-left-radius:2px}.content-wapper{z-index:10;position:relative;overflow-y:scroll}.content-wapper::-webkit-scrollbar{width:10px;height:10px}.content-wapper::-webkit-scrollbar-thumb{background:rgba(37,37,37,.901961)}.content-wapper::-webkit-scrollbar-track{display:none}.content-wapper::-webkit-scrollbar-button{display:none}.fold-panel-content .scrollbar-y,.fold-panel-content .scrollbar-y-thumb-prev,.fold-panel-content .scrollbar-y-thumb-next,.fold-panel-content .scrollbar-y-prev,.fold-panel-content .scrollbar-y-next{background-image:none}.fold-panel-content .scrollbar-y-prev,.fold-panel-content .scrollbar-y-next{width:14px}.fold-panel-content .tangram-scrollbar-slider{margin:0 auto;border-radius:20px;background-color:#292c2f;opacity:.95;width:6px}.fold-panel-content .scrollbar-y-thumb-btn{margin:0 auto;width:4px;background:#B3B9C3;opacity:.3;border-radius:10px}",
        name: "FoldPanelComponent"
    });
    var a = 150,
        l = 100,
        r = 300,
        h = 40,
        d = ["mouseenter", "mouseleave", "mouseover", "mouseout", "click"],
        c = "6px 0",
        p = {
            expanded: 2,
            folded: -2,
            playing: 1
        },
        u = {
            backgroundColor: "37,37,37",
            backgroundOpacity: "0.9",
            foldDelay: 1500,
            panelWidth: "auto",
            maxHeight: 400,
            align: "right"
        },
        f = function() {},
        y = function(t, e, n, i, s) {
            var d, c, p, u = t._titleNode,
                y = 20,
                m = u.clientWidth,
                g = t._bgDom,
                b = g.clientHeight,
                _ = g.clientWidth,
                v = i > n,
                C = !v,
                x = function() {
                    v ? (g.style.width = _ + "px", g.style.height = b + "px", g.style.top = "") : (g.style.width = _ + "px", g.style.height = "0", g.style.top = "", g.parentNode.firstChild.style.visibility = ""), s && s()
                },
                w = function() {
                    var e = new o.Animation,
                        n = (t._bgDom.clientWidth, -y);
                    return v && (g.style.width = m + "px", g.style.height = y + "px", n = parseInt(b) + n, g.style.top = n + "px"), e.build({
                        onStop: v ? x : f,
                        fps: h,
                        delay: o.Animation.INFINITE,
                        duration: a,
                        render: function(t) {
                            C && (t = 1 - t), g.style.top = n + y * t + "px"
                        },
                        finish: function() {
                            C && (g.style.width = _ + "px", g.style.height = b + "px", g.style.top = "", g.parentNode.firstChild.style.visibility = "")
                        }
                    }), e
                },
                D = function() {
                    var t = new o.Animation,
                        e = _ - m;
                    return t.build({
                        delay: o.Animation.INFINITE,
                        fps: h,
                        duration: l,
                        render: function(t) {
                            C && (t = 1 - t), g.style.width = m + e * t + "px"
                        },
                        finish: function() {
                            v ? (g.style.width = _ + "px", g.style.height = b + "px", g.style.top = "") : g.parentNode.firstChild.style.visibility = "hidden"
                        }
                    }), t
                },
                N = function() {
                    var s = new o.Animation,
                        a = t._contentContainer,
                        l = i - n;
                    return s.build({
                        onStop: C ? x : f,
                        delay: o.Animation.INFINITE,
                        fps: h,
                        transition: o.Transitions["ease-out"],
                        duration: r,
                        render: function(t) {
                            C || (T(a).find(".tangram-scrollpanel").css("visibility", "visible"), T(a).find(".pano_poi_content").css("visibility", "visible")), a.style[e] = n + l * t + "px"
                        },
                        finish: function() {
                            T(a).find(".tangram-scrollpanel").css("visibility", "hidden"), T(a).find(".pano_poi_content").css("visibility", "hidden")
                        }
                    }), s
                };
            return g.parentNode.firstChild.style.visibility = "", "top" === t._opts.align ? (p = N(), p.setFinishCallback(s), p.start(), p) : v ? (n += y, d = w(), c = D(), p = N(), d.add(c), d.add(p), d.setFinishCallback(s), d.start(), d) : (i += y, d = w(), c = D(), p = N(), p.add(c), p.add(d), p.setFinishCallback(s), p.start(), p)
        };
    baidu.lang.inherits(i, baidu.lang.Class), T.object.extend(i.prototype, {
        setTitle: function(t) {
            var e = this._titleNode;
            if (!t) return void(e.style.display = "none");
            for (; e.lastChild;) e.removeChild(e.lastChild);
            if ("string" == typeof t) {
                var n = t;
                t = document.createElement("div"), t.innerHTML = n
            }
            e.style.display = "", this._testTitle = t, e.appendChild(t)
        },
        setContentHeader: function(t) {
            "string" == typeof t && (t = s.trim(t), t = T(t)[0]);
            for (var e = this._contentHeader; e.lastChild;) e.removeChild(e.lastChild);
            e.appendChild(t)
        },
        setContent: function(t, e) {
            for (var n = (this._contentWapper, this._contentWapper); n.lastChild;) n.removeChild(n.lastChild);
            "string" == typeof t && (t = s.trim(t), t = T(t)[0]), t && n.appendChild(t), n.style.height = "auto", this._contentContainer.style.height = "auto";
            var n = this._contentWapper,
                i = n.offsetHeight;
            if (0 === i) {
                var o = s.getDomSize(n);
                i = o.height
            }
            var a = e >= 0 ? e : this._opts.maxHeight,
                l = s.getDomSize(this._contentHeader);
            a -= l.height, n.style.height = i > a ? a + "px" : i, this._panelContainer.style.height = this._bgDom.style.height = this._contentContainer.offsetHeight + "px", this.resize(), this._testContent = n.children[0]
        },
        setPosition: function(t, e) {
            this._panelContainer.style.left = t + "px", this._panelContainer.style.top = e + "px"
        },
        toggle: function() {
            return this.status > 0 ? this.fold() : this.expand()
        },
        expand: function(t) {
            this.cancelDelayAction();
            var e = this,
                n = this._contentContainer,
                i = this._ch,
                o = -i;
            t && (e._autoFoldTimer = setTimeout(function() {
                e.fold()
            }, t)), this.status > 0 || -1 !== this.status && (this.status = p.playing, this._panelContainer.style.height = this._bgDom.style.height = i + "px", this._panelContainer.style.width = this._bgDom.style.width = n.clientWidth + "px", this._panelContainer.style.borderTop = "1px solid #53565d", this.dispatchEvent("before_expand"), this._contentContainer.style.top = -i + "px", this._anim = y(this, "top", o, 0, function() {
                e.status = p.expanded, e.dispatchEvent("after_expand")
            }))
        },
        fold: function(t) {
            this.cancelDelayAction();
            var e = 0;
            if (t) return this._anim && this._anim.stop(!0), this.status = p.folded, this._panelContainer.style.height = this._bgDom.style.height = "0", this._panelContainer.style.border = "0", this.dispatchEvent("before_fold"), void this.dispatchEvent("after_fold");
            if (!(this.status < 0) && 1 !== this.status) {
                var n = this;
                this.status = -p.playing, this.dispatchEvent("before_fold"), this._anim = y(this, "top", e, -this._panelContainer.clientHeight, function() {
                    n.status = p.folded, n._panelContainer.style.height = n._bgDom.style.height = "0", n._panelContainer.style.border = "0", n.dispatchEvent("after_fold")
                })
            }
        },
        setAlign: function(t) {
            var e = this._bgDom;
            e.style.left = "", e.style.right = "", "left" === t || "top" === t ? this._bgDom.style.left = "0" : this._bgDom.style.right = "0", this._opts.align = t
        },
        resize: function() {
            var t = s.getDomSize(this._contentContainer);
            this._cw = t.width, this._ch = t.height
        },
        cancelDelayAction: function() {
            this._autoFoldTimer && clearTimeout(this._autoFoldTimer)
        },
        scrollTo: function() {},
        getScrollValue: function() {},
        getViewSize: function() {
            return {
                width: this._contentWapper.clientWidth,
                height: this._contentWapper.clientHeight
            }
        },
        $: function(t) {
            return T(t, this._contentWapper)
        },
        dispose: function() {
            this.cancelDelayAction(), this._anim && this._anim.stop(!0), T.dom(this._panelContainer).off(), m = null, T.lang.Class.prototype.dispose.call(this)
        },
        save: function() {
            m = {
                contentDom: this._testContent.cloneNode(!0),
                titleDom: this._testTitle.cloneNode(!0)
            }
        },
        restore: function() {
            this.cancelDelayAction(), this._anim && this._anim.stop(!0), m ? (this.setTitle(m.titleDom), this.setContent(m.contentDom)) : (this.setTitle(""), this.setContent("")), this.fold(!0)
        },
        getAnimationDuration: function() {
            return a + l + r
        }
    });
    var m = null;
    n.exports = i
});;
define("pano:widget/component/PanoModalDialogComponent/ModalDialogComponent.js", function(require, exports, module) {
    var Animation = require("common:widget/ui/Animation/Animation.js"),
        util = require("pano:widget/base/util.js"),
        template = [function(_template_object) {
            var _template_fun_array = [],
                fn = function(__data__) {
                    var _template_varName = "";
                    for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                    eval(_template_varName), _template_fun_array.push('<div class="close-btn"></div>'), _template_varName = null
                }(_template_object);
            return fn = null, _template_fun_array.join("")
        }][0];
    require.loadCss({
        content: "@-webkit-keyframes fadeIn{0%{opacity:0}100%{opacity:1}}@-moz-keyframes fadeIn{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes fadeOut{0%{opacity:1}100%{opacity:0}}@-ms-keyframes fadeOut{0%{opacity:1}100%{opacity:0}}.modal-dialog-container{position:absolute;z-index:9999999;left:0;top:0;background-color:rgba(0,0,0,.5);width:100%;height:100%;-webkit-animation:fadeIn 1s forwards;-moz-animation:fadeIn 1s forwards;animation:fadeIn 1s forwards;opacity:0;transition:opacity 200ms;-moz-transition:opacity 200ms;-webkit-transition:opacity 200ms}.modal-dialog-container.popped{opacity:1}.modal-dialog{position:relative;margin:0 auto;background-color:rgba(0,0,0,.5);-webkit-animation:fadeIn 1s forwards;-moz-animation:fadeIn 1s forwards;animation:fadeIn 1s forwards;top:50%}.close-btn{position:absolute;right:0;top:0;width:40px;height:40px;background-color:rgba(14,14,14,.7);z-index:99;cursor:pointer;-webkit-transition:top 600ms ease-out,background-color 400ms;-moz-transition:top 600ms ease-out,background-color 400ms}.modal-dialog.ie .close-btn{background-image:url(//webmap0.bdimg.com/wolfman/static/pano/images/pano_whole/dlg_close_8bf166a.png);background-repeat:no-repeat}.modal-dialog.ie .close-btn:before,.modal-dialog.ie .close-btn:after{content:\" \";display:none}.ie_dlg_mask{width:100%;height:100%;background:#000;filter:alpha(opacity=50);z-index:-1;position:absolute;top:0;left:0}.modal-dialog.ie.dialog-album{background:#000}.close-btn:before,.close-btn:after{position:absolute;top:20px;left:5px;content:'';width:30px;height:1px;background-color:#ccc;-webkit-transform:rotate(45deg);-webkit-transition:background-color 400ms;-ms-transform:rotate(45deg);-ms-transition:background-color 400ms}.close-btn:after{-webkit-transform:rotate(-45deg);-ms-transform:rotate(-45deg)}.close-btn:hover:before,.close-btn:hover:after{background-color:#1991f0}.loading-mask{position:absolute;z-index:1;width:101%;height:101%;left:-3px;top:-3px;background-color:rgba(0,0,0,.8);color:#fff;text-align:center;font-size:80px;line-height:512px;-webkit-transition:opacity 200ms;-ms-transition:opacity 200ms;opacity:1}.loading-mask>div{top:50%;-webkit-transform:translate(0,-50%);-ms-transform:translate(0,-50%);margin:0 auto}.loading-mask.hide{visibility:hidden}.dialog-iframe{border:0}.dialog-static .dialog-title{text-align:center;color:#fff;font-size:30px}.dialog-static .dialog-content{text-indent:30px;margin:20px 0 0;color:#fff;line-height:22px;font-size:14px;overflow-y:scroll;scrollbar-arrow-color:#FFF;scrollbar-face-color:#000;scrollbar-darkshadow-color:#000;scrollbar-highlight-color:#000;scrollbar-3dlight-color:#000;scrollbar-shadow-color:#000;scrollbar-track-color:#CCC}.dialog-static .dialog-content-container{padding:40px}.dialog-static,.dialog-album{background:rgba(0,0,0,.8)}.dialog-album{overflow:hidden;position:relative}.dialog-album .close-btn{background-color:#fff}.dialog-album .dialog-content-container{overflow:hidden;width:360px;float:right;height:100%;background-color:#fff}.dialog-album .dialog-title{text-align:left;font-size:26px;margin:40px 0 0 12px}.dialog-album .dialog-content{text-indent:30px;margin:10px 12px;font-size:14px}.dialog-album-container{float:left;overflow:hidden;margin:50px}.dialog-album-item{float:left}.dialog-album-larrow,.dialog-album-rarrow{background:url(//webmap1.bdimg.com/wolfman/static/pano/images/pano_whole/dialog_album_arrow_c3c9031.png) no-repeat;height:40px;width:24px;position:absolute;cursor:pointer;top:50%;margin-top:-10px}.dialog-album-larrow{background-position:3px 0}.dialog-album-larrow.arrow-disabled,.dialog-album-larrow.arrow-disabled:hover{background-position:-83px 0}.dialog-album-larrow:hover{background-position:-40px 0}.dialog-album-rarrow{background-position:2px -50px}.dialog-album-rarrow.arrow-disabled,.dialog-album-rarrow.arrow-disabled:hover{background-position:-84px -50px}.dialog-album-rarrow:hover{background-position:-41px -50px}.dialog-album-pager{position:absolute;bottom:40px;right:400px;font-size:18px;color:#999}"
    });
    var DEFAULT_OPTIONS = {
            width: document.body.clientWidth - 240,
            height: document.body.clientHeight - 120,
            isIframe: !1,
            iframeUrl: "",
            content: "",
            hasAlbum: !1,
            albumData: []
        },
        move = function(a, t, o, e, i) {
            var l = o - t;
            if (0 !== l) {
                var r = new Animation.Animation;
                r.build({
                    fps: 60,
                    transition: Animation.Transitions.easeInCubic,
                    duration: i || 300,
                    render: function(o) {
                        a.style.marginLeft = t + l * o + "px"
                    },
                    finish: function() {
                        e && e(a, o)
                    }
                })
            }
        },
        checkArrowStatus = function(a, t, o, e, i) {
            t >= o && (disableAlbumArrow(e), disableAlbumArrow(i)), a >= 0 && disableAlbumArrow(e), window.Math.abs(a) >= o && disableAlbumArrow(i), 0 > a && enableAlbumArrow(e), window.Math.abs(a) < o && enableAlbumArrow(i)
        },
        disableAlbumArrow = function(a) {
            a.className.indexOf("arrow-disabled") >= 0 || baidu.dom.addClass(a, "arrow-disabled")
        },
        enableAlbumArrow = function(a) {
            a.className.indexOf("arrow-disabled") < 0 || baidu.dom.removeClass(a, "arrow-disabled")
        },
        ModalDialog = function(a) {
            this.opts = util.merge(DEFAULT_OPTIONS, a);
            var t = this,
                o = this.container = document.createElement("div");
            o.className = "modal-dialog-container";
            var e = this.dialog = document.createElement("div");
            e.className = "modal-dialog", e.innerHTML = template();
            var i = T(e);
            if (baidu.ie < 10) {
                e.className += " ie";
                var l = document.createElement("div");
                l.className = "ie_dlg_mask", o.appendChild(l)
            }
            if (a.isIframe) {
                var r = document.createElement("iframe");
                r.className = "dialog-iframe", r.src = this.opts.iframeUrl, r.style.height = this.opts.height + "px", r.style.width = this.opts.width + "px", e.appendChild(r)
            } else {
                var n = document.createElement("div"),
                    s = document.createElement("div"),
                    d = document.createElement("div");
                if (s.innerHTML = this.opts.content, d.innerHTML = this.opts.title, this.opts.hasAlbum) {
                    var m = this.albumContainer = document.createElement("div");
                    m.className = "dialog-album-container";
                    var c = this.albumCarousel = document.createElement("div");
                    c.className = "dialog-album-carousel";
                    for (var p, b = this.opts.width - 360 - 100, u = 0, g = this.opts.albums.split(","), h = 0; h < g.length; h++) p = document.createElement("img"), p.src = this.opts.albumData[g[h] - 1], p.className = "dialog-album-item", p.style.width = b + "px", c.appendChild(p), u += b;
                    c.style.width = u + "px", c.style.marginLeft = "0px", m.style.width = this.opts.width - 360 - 100 + "px", m.style.height = "400px", n.appendChild(d);
                    var f = this.arrowLeft = document.createElement("div");
                    f.className = "dialog-album-larrow", f.style.left = "10px";
                    var w = this.arrowRight = document.createElement("div");
                    w.style.left = 50 + parseInt(m.style.width, 10) + 10 + "px", w.className = "dialog-album-rarrow", n.appendChild(s), m.appendChild(c), e.className += " dialog-album", e.appendChild(f), e.appendChild(m), e.appendChild(w);
                    var x = ['<div class="dialog-album-pager">', '<span class="cur-page">1</span>/', '<span class="total-page"></span></div>'].join(""),
                        v = T(x);
                    this.curPage = v.find(".cur-page"), v.find(".total-page").html(g.length), i.append(v), e.appendChild(n), this.album = {}, this.album.scrollLeft = 0, this.album.itemWidth = parseInt(m.style.width, 10), this.album.maxScroll = (g.length - 1) * this.album.itemWidth, this.bindEvent(), checkArrowStatus(0, this.album.itemWidth, this.album.maxScroll, this.arrowLeft, this.arrowRight)
                } else n.appendChild(d), n.appendChild(s), s.style.height = this.opts.height - 80 - 30 + "px", e.className += " dialog-static", e.appendChild(n);
                n.className = "dialog-content-container", s.className = "dialog-content", d.className = "dialog-title"
            }
            e.style.width = this.opts.width + "px", e.style.height = this.opts.height + "px", e.style.marginTop = (this.opts.height > 400 ? -this.opts.height / 1.8 : -window.Math.floor(this.opts.height / 1.6)) + "px", o.appendChild(e);
            var k = T(o).find(".close-btn");
            k.on("click", function() {
                t.dispose()
            });
            var y = function(a) {
                var o = 27;
                a.keyCode === o && (a.stopPropagation(), t.dispose(), a = null)
            };
            this.dispose = function() {
                baidu(this.container).remove(), baidu.un(document, "keydown", y)
            }, T.on(document, "keydown", y), document.body.appendChild(o), baidu.ie < 11 && setTimeout(function() {
                o.className = o.className += " popped"
            }, 0)
        };
    baidu.lang.inherits(ModalDialog, baidu.lang.Class, "ModalDialog"), baidu.object.extend(ModalDialog.prototype, {
        bindEvent: function() {
            function a(a) {
                var o, e = a.target || a.srcElement;
                o = a.target.className.indexOf("dialog-album-larrow") >= 0 || a.srcElement.className.indexOf("dialog-album-larrow") >= 0 ? 1 : -1;
                var i = parseInt(t.albumCarousel.style.marginLeft, 10),
                    l = i + o * t.album.itemWidth;
                e.className.indexOf("disable") < 0 && t.album.scrollable && (t.album.scrollable = !1, t.curPage.html(parseInt(t.curPage.html(), 10) - o), move(t.albumCarousel, i, l, function() {
                    t.album.scrollable = !0
                }, 500), checkArrowStatus(l, t.album.itemWidth, t.album.maxScroll, t.arrowLeft, t.arrowRight))
            }
            var t = this;
            this.arrowLeft && this.arrowRight && (T(this.arrowLeft).on("click", a), T(this.arrowRight).on("click", a)), this.album.scrollable = !0
        }
    }), module.exports = ModalDialog
});;
define("pano:widget/model/PanoPoi.js", function(e, n, o) {
    var i = e("pano:widget/base/util.js"),
        t = e("pano:widget/base/service.js"),
        r = {},
        a = function(e) {
            var n = {};
            for (var o in e) n[o.toLowerCase()] = e[o];
            return n
        },
        u = function(e, n, o, i) {
            if (o = o || 10, i = i || 4, o >= n) return null;
            e++;
            var t = Math.ceil(n / o);
            if (e > t) throw new Error("erro page num");
            var r, a = [],
                u = 0;
            if (t - e >= i / 2)
                for (r = e - Math.floor(i / 2); a.length < i && t >= r && (r > 0 && a.push(r), r++, u++, !(u > 1e3)););
            else
                for (r = t; a.length < i && r > 0 && (a.unshift(r), r--, u++, !(u > 1e3)););
            var c = !1;
            return {
                text: a,
                max: t,
                index: e,
                pageSize: o,
                hasHome: c,
                hasPrev: e > 1 ? !0 : !1,
                hasNext: t > e ? !0 : !1
            }
        },
        c = {
            poi: function(e) {
                var n = 0;
                e.ext && e.ext.other_info && e.ext.other_info.base && (n = e.ext.other_info.base.length);
                var o = {
                    name: e.name,
                    poi_type: e.poiType,
                    addr: e.addr,
                    tel: e.tel,
                    uid: e.uid,
                    sid: e.pano && e.street_id ? e.street_id : void 0,
                    src: e.ext ? e.ext.src_name : void 0,
                    movie_count: n,
                    city: e.city_id,
                    hasIndoor: !!e.indoor_pano
                };
                if ("life" === o.src && e.ext.movie_forsearch && (o.src = "movie"), e.geo) {
                    var i = e.geo.split("|").pop().replace(";", "").split(",");
                    o.x = parseInt(i[0]), o.y = parseInt(i[1])
                }
                return o
            },
            hotel: function(e) {
                var n = [],
                    o = e.room_info;
                try {
                    var t = window.place.hotel ? window.place.hotel : window.place;
                    t.otaDataDecode(o || [])
                } catch (r) {
                    i.log("ota decode failed"), o = []
                }
                var a = function(e) {
                    var n = {};
                    return n.roomTypeName = e.basic_info.room_type_name, n.roomId = e.basic_info.room_id, i.each(e.ota_list, function(e) {
                        i.each(e.price_info, function(e) {
                            var e = parseInt(e.room_price.price) - parseInt(e.minus && e.minus.price || 0) - parseInt(e.coupons && e.coupons.price || 0) + parseInt(e.tax_info && e.tax_info.price || 0);
                            n.price = n.price ? n.price > e ? e : n.price : e
                        })
                    }), n
                };
                return i.each(o, function(e) {
                    var o;
                    return 2 == n.length ? !0 : void((1 == e.basic_info.book_state || 2 == e.basic_info.book_state) && (o = a(e), o.roomTypeName && o.price && n.push(o)))
                }), n.length < 2 && i.each(o, function(e) {
                    var o;
                    return 2 == n.length ? !0 : void(1 != e.basic_info.book_state && 2 != e.basic_info.book_state && (o = a(e), o.roomTypeName && o.price && n.push(o)))
                }), 0 == n.length && n.push({
                    roomTypeName: "标准间",
                    priceInfo: "暂无报价"
                }), n
            },
            movie: function(e) {
                var n = i.each(e, function(e) {
                    return {
                        id: e.movie_id,
                        name: e.movie_name,
                        type: e.movie_type,
                        price: e.price || e.origin_price
                    }
                }, !0);
                return n
            },
            pano: a,
            guide: a,
            busline: function(e) {
                function n(e) {
                    return e = e.match(/[\u4e00-\u9fa5\d]*/)[0]
                }

                function o(e, n) {
                    var o = 90 - 180 * Math.atan2(e.y - n.y, e.x - n.x) / Math.PI;
                    return 0 > o && (o += 360), o
                }
                var t = {};
                return e && (t.buslineName = n(e.buslineName), t.buslineFullName = e.buslineName, t.stations = i.each(e.stations, function(n, i) {
                    n.stationName = i + 1 + "&nbsp;&nbsp;" + n.name;
                    var t = n.pano;
                    if (!t) return n;
                    var r = o({
                        x: n.point.x,
                        y: n.point.y
                    }, {
                        x: t.PanoX,
                        y: t.PanoY
                    });
                    return n.pano = {
                        poiuid: n.uid,
                        pid: t.PID,
                        name: n.name,
                        index: -1,
                        dir: r,
                        pitch: 0,
                        x: n.point.x,
                        y: n.point.y,
                        panox: t.PanoX,
                        panoy: t.PanoY,
                        rank: 100,
                        catalog: e.catalog
                    }, n
                }, !0)), t
            },
            indoorPoi: function(e) {
                if (e.content.isBaike = e.isBaike, e.isBaike) return e.content;
                if (e.content.base && (e.content.base.address || e.content.base.phone)) {
                    var n = e.content.lvyou;
                    return n && (n.entrance_price && n.shop_hours || n.sug_time || n.best_time) || delete e.content.lvyou, e.content
                }
                return {
                    businessData: e.content.businessData
                }
            }
        },
        s = function(e, n) {
            return r[e] ? r[e] : (e || (this.poi = null, this.hotel = null, this.pano = null, this.movie = null), r[e] = this, this._uid = e, void(this._cityCode = n))
        };
    s.prototype = {
        getUid: function() {
            return this._uid
        },
        extend: function() {
            var e = Array.prototype.slice.call(arguments, 0),
                n = this._uid,
                o = this,
                r = i.each(e, function(e) {
                    switch (e) {
                        case p.poi:
                            return void 0 !== o.poi ? void 0 : t.getPanoPoiInfoByUid(n).then(function(n) {
                                o.poi = c[e](n.content)
                            });
                        case p.pano:
                            return void 0 !== o.pano ? void 0 : t.getPanoInfoByUid(n).then(function(n) {
                                n = n.content[0].poiinfo, o.pano = c[e](n)
                            });
                        case p.hotel:
                            return void 0 !== o.hotel ? void 0 : t.getHotelInfoByUid(n).then(function(n) {
                                return 0 != n.errorNo ? void(o.hotel = null) : void(o.hotel = c[e](n))
                            });
                        case p.movie:
                            return void 0 !== o.movie ? void 0 : t.getMovieInfoByUid(n).then(function(n) {
                                return 0 == n.length ? void(o.movie = null) : void(o.movie = c[e](n))
                            });
                        case p.indoorPoi:
                            var i = t.getIndoorPoiInfoByUid(n).then(function(n) {
                                return n ? void(o.indoorPoi = c[e](n)) : void(o.indoorPoi = null)
                            });
                            return i;
                        case p.busline:
                            return t.getBuslineByUid(n, o._cityCode).then(function(n) {
                                return n ? void(o.busline = c[e](n)) : void(o.busline = null)
                            })
                    }
                }, !0);
            return T.when.apply(T, r)
        }
    };
    var p = {
        poi: "poi",
        hotel: "hotel",
        movie: "movie",
        pano: "pano",
        busline: "busline",
        indoorPoi: "indoorPoi"
    };
    s.TYPE = p, s.getInstaceByPanoId = function(e) {
        for (var n in r) {
            var o = r[n];
            if (o.pano && o.pano.pid === e) return o
        }
        return null
    }, s.initWithPoiSearchResult = function(e) {
        var n = {},
            o = i.each(e.content, function(n, o) {
                var i = new s(n.uid, e.current_city.code);
                return i.poi = c.poi(n), i.index = o, i
            }, !0);
        n.content = o, n.wd = e.result.wd;
        var t = e.result;
        return n.pageInfo = u(t.page_num, t.total), n
    }, s.initWithBuslineResult = function(e, n) {
        var o = {},
            t = i.each(e.stations, function(e, o) {
                var i = new s(e.uid, n);
                return i.pano = e.pano, i.stationName = e.stationName, i.index = o, i
            }, !0);
        return o.content = t, o.buslineName = e.buslineName, o
    }, o.exports = s
});;
define("pano:widget/model/NavRoute.js", function(t) {
    var n = t("pano:widget/base/service.js"),
        e = t("pano:widget/base/util.js"),
        r = function(t) {
            var n = {
                version: 3,
                sn: t.start,
                strategy: t.strategy,
                en: t.end,
                b: t.bound,
                newmap: 1,
                qt: "nav",
                strategy: t.strategy,
                sc: t.sc,
                c: t.currentCity,
                et: 0,
                ie: "utf-8"
            };
            return n
        },
        o = function(t, n) {
            this.fetch(t, n)
        };
    return baidu.lang.inherits(o, baidu.lang.Class), T.object.extend(o.prototype, {
        fetch: function(t, o) {
            {
                var i = this,
                    s = n.getNavSteps(t).then(function(t) {
                        return e.each(t.content.steps, function(t) {
                            t.src = t.pid ? e.getImage3DUrl(o, t.pid, t.dir, 10, 196, 100) : ""
                        }), t
                    });
                r(t)
            }
            s.then(function(t) {
                var n = currentComponent.activeIndex || 0,
                    r = currentComponent.json;
                i._startInfo = r.result.start, i._endInfo = r.result.end, i._routeData = t.content, i._routeInfo = r.content.routes[n];
                var o = [];
                e.each(i._routeInfo.sections, function(t) {
                    e.each(t, function(t) {
                        e.each(t.points.split(";"), function(t) {
                            var n = t.split(","),
                                e = new BMap.Point(n[0], n[1]);
                            o.push(e)
                        })
                    })
                }), i._points = o, i.fire("ready")
            })
        },
        getSteps: function() {
            return this._routeData ? this._routeData.steps : void 0
        },
        getPoints: function() {
            return this._points ? this._points : void 0
        },
        getStart: function() {
            return T.isArray(this._startInfo) ? this._startInfo[0] : this._startInfo
        },
        getEnd: function() {
            return T.isArray(this._endInfo) ? this._endInfo[0] : this._endInfo
        },
        getRouteData: function() {
            return this._routeData
        }
    }), o
});;
define("pano:widget/model/IndoorData.js", function(t, i, o) {
    var n = t("pano:widget/base/CatalogMap.js"),
        a = t("pano:widget/base/util.js"),
        r = t("pano:widget/base/service.js"),
        e = {
            unfetch: 1,
            fetching: 2,
            fetched: 3
        },
        s = {},
        h = function(t, i) {
            var o = Math.cos(i * Math.PI / 180),
                n = Math.sin(i * Math.PI / 180),
                a = t.x * o - t.y * n,
                r = t.x * n + t.y * o;
            return {
                x: a,
                y: r
            }
        },
        u = function(t, i) {
            var o = t.imgwidth,
                n = t.imgheight,
                r = t.scale,
                e = 360 - t.northdir,
                s = t.ltpoint,
                u = Math.ceil(Math.log(o / 256) / Math.log(2)) + 1,
                c = Math.ceil(Math.log(n / 256) / Math.log(2)) + 1,
                d = Math.min(u, c),
                f = Math.ceil((d + 1) / 2),
                l = 256 * Math.pow(2, u - 1),
                g = 256 * Math.pow(2, c - 1),
                p = Math.floor(l - o) / 2,
                _ = Math.floor(g - n) / 2,
                v = [],
                v = a.each(t.points, function(t) {
                    var i = (t.x - s.x) / 100 / r,
                        o = (t.y - s.y) / 100 / r,
                        n = h({
                            x: i,
                            y: o
                        }, e);
                    return n.x = n.x + p, n.y = -n.y + _, {
                        id: t.pid,
                        pin: t.pin,
                        name: t.name,
                        catlog: t.catalog,
                        panox: t.x / 100,
                        panoy: t.y / 100,
                        x: n.x,
                        y: n.y,
                        defaultAngle: 0
                    }
                }, !0);
            return {
                realFloor: t.floor,
                floor: i,
                width: l,
                height: g,
                points: v,
                zoomLevel: d,
                defZoom: f,
                startid: t.startid,
                uid: t.startid
            }
        },
        c = function(t) {
            var i = t.entrances && t.entrances[0] && t.entrances[0].uid ? t.entrances[0] : t;
            return {
                x: i.breakx / 100,
                y: i.breaky / 100,
                pid: i.breakid
            }
        },
        d = function(t) {
            var i = {},
                o = [];
            a.each(t, function(t) {
                a.each(t.points, function(t) {
                    if (t.catalog) {
                        var o = n.getCatalogInfo(t.catalog);
                        i[o.label] || (i[o.label] = []), i[o.label].push(t)
                    }
                })
            });
            for (var r in i) o.push({
                id: 1 * i[r][0].catalog,
                label: r,
                points: i[r]
            });
            return o.sort(function(t, i) {
                return t.id > i.id ? 1 : -1
            }), o
        },
        f = function(t) {
            return "f53e5bf37bf62ebfb34c4992" === t.iid, {
                pid: t.pid,
                imagetype: void 0 === t.imagetype ? t.hasimg : t.imagetype,
                poiuid: t.uid,
                exitInfo: c(t),
                floors: a.each(t.floors, u, !0),
                catalogInfo: d(t.floors)
            }
        },
        l = function(t, i) {
            return s[t] ? s[t] : (s[t] = this, this._iid = t, this._data = {}, this._status = e.unfetch, this._fetchPromise = null, this._currentFloor = void 0, void(i || this.fetch()))
        };
    l.prototype = {
        fetch: function(t) {
            if (this._status == e.unfetch) {
                this._status = e.fetching;
                var i = this;
                this._fetchPromise = r.getIndoorData(this._iid).then(function(t) {
                    return void 0 === t ? void(i._basicData = void 0) : (i._basicData = t, i._currentFloor = Math.max(t.defaultfloor - 1, 0), i._data = f(t), i._status = e.fetched, i._data)
                })
            }
            return t && this.onLoad(t), this
        },
        isLoaded: function() {
            return this._status === e.fetched
        },
        getIID: function() {
            return this._iid
        },
        onLoad: function(t) {
            return this.isLoaded() ? t() : this._fetchPromise.then(t), this
        },
        setCurrentPid: function(t) {
            var i = this.getFloorInfo(),
                o = void 0,
                n = void 0;
            return a.each(i, function(i, r) {
                return a.each(i.points, function(i, a) {
                    return i.id == t ? (o = r, n = a, !0) : void 0
                }), void 0 === o && i.startid === t ? (o = r, !0) : void 0 !== o ? !0 : void 0
            }), this._currentPoint = n, this._currentFloor = void 0 === o ? this._basicData.defaultfloor - 1 : o, this._currentFloor < 0 && (this._currentFloor = 0), o
        },
        getExitInfo: function() {
            return this._data.exitInfo
        },
        getFloorInfo: function(t) {
            return 0 === arguments.length ? this._data.floors : this._data.floors[t]
        },
        getPointInfo: function(t, i) {
            return this._data.floors[t].points[i]
        },
        getBasicData: function() {
            return this._basicData
        },
        getCurrentFloor: function() {
            return this._currentFloor
        },
        getCurrentPoint: function() {
            return this._currentPoint
        },
        hasIndoorData: function() {
            return void 0 !== this._basicData
        },
        hasPlanMap: function() {
            return 1 == this._data.imagetype
        },
        has2DMap: function() {
            return 2 == this._data.imagetype
        },
        getCatalogList: function() {
            return this._data.catalogInfo
        },
        getCurrentPointData: function() {
            var t = this.getPointInfo(this._currentFloor, this._currentPoint),
                i = {
                    pid: t.id,
                    x: t.panox,
                    y: t.panoy
                };
            return i
        },
        getCurrentFloorData: function() {
            var t = this.getFloorInfo(this._currentFloor),
                i = this.getExitInfo(),
                o = a.copy(t);
            if (o.innerId = this._iid, o.poiuid = this._data.poiuid, o.hasImage = this.hasPlanMap() ? 1 : 0, o.floor = this._currentFloor + 1, o.x = i.x, o.y = i.y, o.pid = i.pid, void 0 !== this.getCurrentPoint()) {
                var n = this.getPointInfo(this.getCurrentFloor(), this.getCurrentPoint());
                o.currentPid = n.id
            }
            return o
        },
        get2DMapData: function() {
            return {
                mode: "day",
                panoHeading: 0,
                panoId: this._basicData.breakid,
                panoMCPoint: {
                    x: this._basicData.breakx / 100,
                    y: this._basicData.breaky / 100
                },
                panoPitch: 0,
                panoType: "inter",
                panoZoom: 1
            }
        },
        getTopologyPoints: function() {
            var t = this.getFloorInfo(this._currentFloor),
                i = a.each(t.points, function(t) {
                    return t.pin ? t : void 0
                }, !0);
            return i
        },
        equal: function(t) {
            return t instanceof l && this.getIID() === t.getIID() ? !0 : !1
        }
    }, o.exports = l
});;
define("pano:widget/module/PanoShareModule/PanoShareModule.js", function(require, exports, module) {
    var Service = require("pano:widget/base/service.js"),
        ModuleClass = require("pano:widget/base/ModuleClass.js"),
        PanoShareUtil = require("pano:widget/module/PanoShareModule/PanoShareUtil.js"),
        style = '.pano-share-panel{position:absolute;top:0;right:45px;width:396px;height:97px;z-index:100010;color:#fff;font-size:12px;background-color:#252525;opacity:.9;filter:alpha(opacity=90);_filter:alpha(opacity=90);border-radius:2px;font-size:12px}#pano-share-panel-extra{right:0}.pano-share-panel .left-area{float:left;width:160px;height:160px}.pano-share-panel .right-area{float:left}.pano-share-panel .bottom-area{float:left;width:300px;margin-left:8px}#pano-marker-show{margin-top:20px;margin-left:25px;background-image:url(//webmap0.bdimg.com/wolfman/static/pano/images/pano_whole/lookAt_991c0e1.png)}.pano-bin-code{visibility:hidden;margin-top:13px;margin-left:13px}.pano-share-panel .foot{height:20px;line-height:20px;margin-top:10px;margin-left:20px;width:100%;color:#d3d8db}.pano-share-panel .head{height:20px;line-height:20px;margin-top:10px;margin-bottom:6px;width:100%;color:#d3d8db}.pano-share-panel .close{float:right;width:18px;height:18px;margin-right:10px;background:url(//webmap0.bdimg.com/wolfman/static/pano/images/pano_whole/pano-icons_d3a4042.png) no-repeat -108px -16px;_background:url(//webmap0.bdimg.com/wolfman/static/pano/images/pano_whole/pano-icons-8_37d67ca.png) no-repeat -108px -16px}.pano-share-panel .close:hover{background:url(//webmap0.bdimg.com/wolfman/static/pano/images/pano_whole/pano-icons_d3a4042.png) no-repeat -126px -18px;cursor:pointer;_background:url(//webmap0.bdimg.com/wolfman/static/pano/images/pano_whole/pano-icons-8_37d67ca.png) no-repeat -126px -18px;cursor:pointer}.pano-share-panel .inputContainer{position:relative;float:left;vertical-align:middle}.pano-share-panel .inputContainer .input{width:240px;height:22px;line-height:22px;text-indent:5px;background-color:#252525;border:1px #53565c solid;vertical-align:middle;color:#fff}#pano-shareLink-extra{position:absolute;top:-9999px}#tag-marker-input{background-color:#fff;color:#555;width:230px}.pano-share-panel .pano-share-msg{position:absolute;right:0;top:0;width:60px;height:22px;line-height:22px;text-align:center;color:#3af;font-size:12px;border:1px solid #3af;display:none}#pano-share-msg-extra{margin-right:6px}.pano-share-panel .copyContainer{position:relative;float:left;vertical-align:middle;width:45px;height:23px;margin-left:2px}.pano-share-panel .copyContainer .copyBack{position:absolute;left:0;top:0;width:48px;height:22px;line-height:22px;border:1px #53565c solid;color:#d3d8db;text-align:center;text-decoration:none;z-index:1;padding:0 3px}.pano-share-panel .btn{position:absolute;left:0;top:0;z-index:2;width:45px;height:22px}.pano-share-panel .btn:hover{cursor:pointer}.pano-baiduShare{margin-top:2px}#pano_bdshare{width:140px;height:30px;overflow:hidden;float:left}.pc span.bds_more,.bds_tools a{font-family:Arial,Helvetica,"Microsoft YaHei",sans-serif}span.bds_more,.bds_tools a{height:16px;float:left;display:block;padding-top:6px;padding-bottom:3px;padding-left:22px}#pano_bdshare .bds_more{float:left;padding-top:6px;padding-left:0;color:#9da1a3;line-height:16px}span.bds_btn_arr{float:left;height:10px;width:10px;margin-top:10px;padding-bottom:3px;margin-left:4px;cursor:pointer;background:url(//webmap0.bdimg.com/wolfman/static/pano/images/pano_whole/pano-icons_d3a4042.png) 0 -54px no-repeat;_background:url(//webmap0.bdimg.com/wolfman/static/pano/images/pano_whole/pano-icons-8_37d67ca.png) 0 -54px no-repeat}.bds_tools a{background-image:url(//webmap1.bdimg.com/wolfman/static/pano/images/bg_bdshare_5f08026.png);background-repeat:no-repeat;cursor:pointer}.bds_qzone{background-position:0 -85px!important}.bds_tsina{background-position:0 -125px!important}.bds_baidu{background-position:0 -165px!important}.bds_renren{background-position:0 -205px!important}.bds_tqq{background-position:0 -245px!important}.bds_kaixin001{background-position:0 -285px!important}.bds_hi{background-position:0 -365px!important}.bds_douban{background-position:0 -405px!important}.bds_tsohu{background-position:0 -445px!important}.bds_msn{background-position:0 -485px!important}.bds_fx{background-position:0 -525px!important}#bdshare_iwshare{margin-left:3px}#bdshare_iwshare.bds_tools{height:24px}#bdshare_iwshare.bds_tools a{padding-bottom:2px;+padding-bottom:4px}';
    require.loadCss({
        content: style
    });
    var template = [function(_template_object) {
            var _template_fun_array = [],
                fn = function(__data__) {
                    var _template_varName = "";
                    for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                    eval(_template_varName), _template_fun_array.push('<div id="pano-share-panel" class="pano-share-panel">    <!-- <div class="left-area">        <img id="pano-marker-show" src="" width="110" height="110"/>        <div class="foot">            分享前可以在图中添加标记        </div>    </div> -->    <div class="right-area">        <img id="pano-bin-code" class="pano-bin-code" src="" width="72" height="72"/>        <!-- <div class="foot">            扫描二维码用手机浏览        </div> -->    </div>    <div class="bottom-area">        <div class="head">            <a id="pano-share-close" href="javascript:void(0)" title="关闭" class="close"></a>            <p class="head-title">您可将当前地图上的内容分享给好友</p>        </div>        <ul>            <li class="inputContainer">                <input id="pano-shareLink" class="input" type="text"/><span id="pano-share-msg" class="pano-share-msg"></span>            </li>            <li class="copyContainer">                <span class="copyBack">复制</span>                            </li>        </ul>        <div id="pano-baiduShare" class="pano-baiduShare">        </div>    </div></div>'), _template_varName = null
                }(_template_object);
            return fn = null, _template_fun_array.join("")
        }][0],
        PanoShareModule = ModuleClass.extend("PanoShareModule", {
            constructor: function() {
                this._opts = null
            },
            initialize: function(a) {
                this._opts = a;
                var e = template(),
                    t = this.defaultSharePanel = T(e)[0];
                this.defaultSharePanelHide = !1;
                T.g("pano-share-btn");
                a.sharePanelClassName && (t.className = a.sharePanelClassName), a.parent.appendChild(t), this.bindCloseEvent(), this.bindCopyEvent();
                var n = baidu.g("pano-baiduShare"),
                    i = baidu.g("pano-shareLink");
                this.addBaiduShare(n, i), this.getShortLink()
            },
            getSupportEvents: function() {
                return ["dispose", "delete_marker_panel", "tag_marker_value_changed"]
            },
            showMessage: function(a, e) {
                var t = e || baidu.g("pano-share-msg");
                t.style.display = "block", t.innerHTML = a, setTimeout(function() {
                    t.style.display = "none"
                }, 1300)
            },
            bindCopyEvent: function() {
                var a = this,
                    e = T.G("pano-shareLink");
                window.pano_share_copy_getPasteData = function() {
                    addStat(STAT_CODE.STAT_PANORAMA, {
                        item: "share.link.copy"
                    });
                    var e = T.G("pano-shareLink");
                    return e ? (a.showMessage("复制成功"), e.value) : void 0
                }, this.copyFn(document.querySelector("#pano-share-panel .copyBack"), e, pano_share_copy_getPasteData)
            },
            bindExtraCopyEvent: function() {
                var a = this,
                    e = baidu.g("pano-shareLink-extra");
                window.panoShareCopyGetPasteDataExtra = function() {
                    addStat(STAT_CODE.STAT_PANORAMA, {
                        item: "share.link.copy"
                    });
                    var e = baidu.g("pano-shareLink-extra");
                    return e ? (a.showMessage("复制成功", baidu.g("pano-share-msg-extra")), e.value) : void 0
                }, this.copyFn(document.querySelector("#pano-share-panel-extra .copyBack"), e, panoShareCopyGetPasteDataExtra)
            },
            copyFn: function(a, e, t) {
                a && e && baidu.event.on(a, "click", function() {
                    e.select();
                    try {
                        var a = document.activeElement;
                        e.focus(), e.setSelectionRange(0, e.value.length);
                        var n = document.execCommand("copy");
                        a.focus(), n && t && t()
                    } catch (i) {
                        alert("请按ctrl/cmd + C复制")
                    }
                })
            },
            bindCloseEvent: function() {
                var a = this;
                baidu.event.on("pano-share-close", "click", function() {
                    a.dispose()
                })
            },
            getShortLink: function(a, e) {
                var t = this._opts,
                    n = {
                        data: t.context.panoContext.getPanoOptions(),
                        iid: t.context.panoContext.getInnerId(),
                        level: t.context.mapContext.getLevel(),
                        shareParam: t.shareParam
                    },
                    i = PanoShareUtil.prepareShareParam(n);
                PanoShareUtil.getLink(i, function(e) {
                    a = a || baidu.g("pano-shareLink"), a && (a.value = e)
                }), i.from = "2dc", PanoShareUtil.getLink(i, function(a) {
                    var t = e || document.getElementById("pano-bin-code");
                    t && t.className.indexOf("hide-default") < 0 && (t.src = PanoShareUtil.get2DCode(a), t.style.visibility = "visible")
                })
            },
            addBaiduShare: function(a, e) {
                var t = this,
                    n = a,
                    e = e,
                    i = t._opts.context.panoContext.getPanoOptions();
                PanoShareUtil.createShare(n, function() {
                    return {
                        data: i,
                        roadName: t._opts.context.panoContext.getCurrentRoad(),
                        link: e.value
                    }
                })
            },
            event_panoChanged: function(a) {
                var e = this,
                    t = e._map,
                    n = e._opts,
                    i = a.data.panoType || "inter";
                e._currentPanoType != i ? (t.destroyAll(), e._reset(), n.data = a.data, e.create(i, n)) : t.event_panoChanged && t.event_panoChanged(a)
            },
            hideDefaultPanel: function() {
                this.defaultSharePanel.style.visibility = "hidden", this.defaultSharePanelHide = !0;
                var a = T("#pano-bin-code");
                a.addClass("hide-default"), a.css("visibility", "hidden")
            },
            showDefaultPanel: function() {
                this.defaultSharePanel.style.visibility = "", this.defaultSharePanelHide = !1;
                var a = T("#pano-bin-code");
                a.removeClass("hide-default")
            },
            addExtraPanel: function(a) {
                var e = this;
                this.marker = a;
                var t = "看这里";
                this.extraPanel && document.body.removeChild(this.extraPanel);
                var n = template(),
                    i = T(n);
                i.find("#pano-bin-code").attr("id", "pano-bin-code-extra"), i.find("#pano-shareLink").attr("id", "pano-shareLink-extra"), i.find("#pano-share-msg").attr("id", "pano-share-msg-extra"), i.find("#pano-baiduShare").attr("id", "pano-baiduShare-extra"), i.find("#pano-share-close").attr("id", "pano-share-close-extra").on("click", function() {
                    baidu.dom.remove("pano-share-panel-extra"), e.dispatchEvent("delete_marker_panel", [a.markerId]), e.extraPanel = null, e.extraPanelHide = void 0, e.dispatchEvent("tag_marker_value_changed", {
                        value: ""
                    }), e.defaultSharePanelHide = !1
                }), i.attr("id", "pano-share-panel-extra"), i.find("#copeLinkBtn").attr("id", "copeLinkBtnExtra"), i.find(".head-title").html("添加标注后分享给好友"), i.find(".copyBack").html("复制链接");
                var o = document.createElement("a");
                o.className = "btn", o.id = "tag-marker-confirm", o.setAttribute("title", "确定"), o.style.display = "none", o.onclick = function() {}, i.find(".copyContainer").append(o);
                var r = document.createElement("input");
                r.type = "text", r.setAttribute("maxlength", "10"), !baidu.ie || baidu.ie > 9 ? r.setAttribute("placeholder", t) : r.value = t, "" !== r.value && (r.value = a.name), r.className = "input", r.id = "tag-marker-input", r.onfocus = function() {
                    i.find(".copyBack").html("确定"), i.find("#tag-marker-confirm").show(), baidu.ie <= 9 && t === r.value && (r.value = "")
                }, r.onblur = function() {
                    var a = this;
                    i.find(".copyBack").html("复制链接"), o.style.display = "none", baidu.ie && "" === r.value && (r.value = t), Service.mandelaFilter(a.value || t, function(n) {
                        n && (a.value = n), e.dispatchEvent("tag_marker_value_changed", {
                            value: a.value || t
                        })
                    })
                }, i.find(".inputContainer").prepend(r);
                var p = this.extraPanel = i[0];
                p.style.position = "absolute", p.style.top = a.screenY - 140 + "px", p.style.left = a.screenX - 198 + "px", document.body.appendChild(p), this.addBaiduShare(i.find("#pano-baiduShare-extra")[0], i.find("#pano-shareLink-extra")[0]), this.defaultSharePanelHide = !0, this.extraPanelHide = !1, e.dispatchEvent("tag_marker_value_changed", {
                    value: this.value || t
                }), this.bindExtraCopyEvent()
            },
            showExtraPanel: function(a) {
                this.extraPanel && this.extraPanelHide && (this.extraPanel.style.top = a.screenY - 123 + "px", this.extraPanel.style.left = a.screenX - 198 + "px", this.extraPanel.style.visibility = "", baidu("#pano-bin-code-extra").css("visibility", "visible").removeClass("hide-default"), this.extraPanelHide = !1)
            },
            hideExtraPanel: function() {
                this.extraPanel && !this.extraPanelHide && (this.extraPanel.style.visibility = "hidden", baidu("#pano-bin-code-extra").css("visibility", "hidden").addClass("hide-default"), this.extraPanelHide = !0)
            },
            syncShareStatus: function(a) {
                if (this._opts.shareParam = a, this.defaultSharePanelHide) {
                    var e = baidu.g("pano-shareLink-extra"),
                        t = baidu.g("pano-bin-code-extra");
                    this.getShortLink(e, t)
                } else this.getShortLink()
            },
            dispose: function() {
                T.g("pano-share-panel") && baidu.dom.remove("pano-share-panel"), this.extraPanel && baidu.dom.remove("pano-share-panel-extra"), this.dispatchEvent("dispose")
            }
        });
    module.exports = PanoShareModule
});;
define("pano:widget/module/PanoShareModule/PanoShareUtil.js", function(e, n, o) {
    var t = e("common:widget/ui/config/config.js"),
        a = t.urlConfig,
        r = {
            SHARE_PROC_URL: "//j.map.baidu.com/",
            getShareKeyList: function() {
                return {
                    tsina: {
                        title: "分享到新浪微博",
                        code: 1307,
                        cbkcode: 1317
                    },
                    tqq: {
                        title: "分享到腾讯微博",
                        code: 1308,
                        cbkcode: 1318
                    },
                    qzone: {
                        title: "分享到QQ空间",
                        code: 1306,
                        cbkcode: 1316
                    },
                    renren: {
                        title: "分享到人人网",
                        code: 1309,
                        cbkcode: 1319
                    },
                    baidu: {
                        title: "分享到百度搜藏",
                        code: 1310,
                        cbkcode: 1320
                    },
                    kaixin001: {
                        title: "分享到开心网",
                        code: 1311,
                        cbkcode: 1321
                    },
                    hi: {
                        title: "分享到百度空间",
                        code: 1312,
                        cbkcode: 1322
                    },
                    douban: {
                        title: "分享到豆瓣网",
                        code: 1313,
                        cbkcode: 1323
                    },
                    tsohu: {
                        title: "分享到搜狐微博",
                        code: 1314,
                        cbkcode: 1324
                    },
                    msn: {
                        title: "分享到Myspace",
                        code: 1315,
                        cbkcode: 1325
                    },
                    fx: {
                        title: "分享到飞信",
                        code: 1326,
                        cbkcode: 1327
                    }
                }
            },
            getLink: function(e, n) {
                var o = [];
                for (var t in e) null != e[t] && o.push(t + "=" + e[t]);
                var a = "https:" === location.protocol ? "https" : "http",
                    r = a + "://map.baidu.com/?newmap=1&shareurl=1&" + o.join("&"),
                    i = this.SHARE_PROC_URL + "?url=" + encodeURIComponent(r) + "&web=true",
                    c = !1;
                T.jsonp(i, function(e) {
                    c = !0, e && e.url && "https" === a && 0 !== e.url.indexOf("https") && (e.url = e.url.replace("http", "https")), n(e && e.url || r)
                }), setTimeout(function() {
                    0 == c && n(r)
                }, 3e3)
            },
            get2DCode: function(e) {
                var n = a.PANO_URL + "?qt=qrcode&width=66&url=";
                return n + encodeURIComponent(e)
            },
            createShare: function(e, n) {
                var o = this,
                    t = this.getShareKeyList(),
                    a = ['<div id="pano_bdshare" class="bds_tools"><span class="bds_more">分享到：</span>'];
                for (var r in t) {
                    var i = t[r].title;
                    a.push('<a _key="' + r + '" class="bds_' + r + '" title="' + i + '"></a>')
                }
                a.push('</div><span class="bds_btn_arr" id="pano_bds_btn_arr" title="更多网站"></span>'), e.innerHTML = a.join(""); {
                    var c = T(e),
                        d = c.find(".bds_tools")[0],
                        s = c.find(".bds_btn_arr")[0];
                    d.getElementsByTagName("a")
                }
                s.onclick = function() {
                    var e = 178,
                        n = 120,
                        t = 15,
                        a = 0;
                    ! function r() {
                        t > a && (a++, d.style.width = Math.ceil(o._tween(a, e, n, t)) + "px", setTimeout(r, 10))
                    }(), s.style.display = "none"
                }, T.on(d, "click", function(e) {
                    var t = e.target || e.srcElement,
                        a = t.getAttribute("_key");
                    t && a && o._openLink(window.open("about:blank"), a, n)
                })
            },
            _tween: function(e, n, o, t) {
                return o * ((e = e / t - 1) * e * e + 1) + n
            },
            _openLink: function(e, n, o) {
                if (e) {
                    var t = o(),
                        a = this._getShareInfo(t.roadName, t.link),
                        r = a.text,
                        i = (a.point, t.link + "#bshare-" + n);
                    "fx" == n && (i = i);
                    var c, d = "";
                    ("qzone" == n || "tsohu" == n) && (c = location.protocol + "//map.baidu.com/image/logo-map.png"), c = this.getPanoShare3DImageUrl(t.data), d = r;
                    var s = {
                        to: n,
                        url: i,
                        pic: c,
                        title: r,
                        type: "text",
                        desc: d,
                        comment: " ",
                        key: ""
                    };
                    "tsina" == n && (s.key = "3694297746"), "tqq" == n && (s.key = "801199301");
                    var p = location.protocol + "//share.baidu.com/s?" + this._jsonToQuery(s, encodeURIComponent);
                    "renren" == n && (s = {
                        resourceUrl: i,
                        pic: c,
                        title: r,
                        description: d,
                        charset: "UTF-8",
                        srcUrl: i
                    }, p = location.protocol + "//widget.renren.com/dialog/share?" + this._jsonToQuery(s, encodeURIComponent));
                    try {
                        e.location.href = p, e.focus()
                    } catch (l) {}
                }
            },
            _getShareInfo: function(e, n) {
                {
                    var o = e || "",
                        t = "【百度全景】";
                    this.cinfo
                }
                return {
                    text: o + " " + n + " " + t
                }
            },
            _jsonToQuery: function(e, n) {
                var o = [];
                n = n || function(e) {
                    return e
                };
                for (var t in e) {
                    var a = e[t];
                    "" != a && null != a && "undefined" != typeof a && o.push(t + "=" + n(a))
                }
                return o.join("&")
            },
            getPanoShare3DImageUrl: function(e) {
                var n = encodeURIComponent(window.AUTH) || "",
                    o = encodeURIComponent(window.SECKEY) || "",
                    t = a.PANO_URL + "?qt=share",
                    r = {
                        panoid: e.panoId,
                        heading: e.panoHeading,
                        pitch: e.panoPitch,
                        fovy: 75,
                        width: 460,
                        height: 250,
                        watermark: "baidumap",
                        quality: 80,
                        from: "PC",
                        auth: n,
                        seckey: o
                    };
                for (var i in r) t = t + "&" + i + "=" + r[i];
                return t
            },
            prepareShareParam: function(e) {
                var n = e.data,
                    o = n.panoMCPoint,
                    t = (100 * o.x + "," + 100 * o.y, e.iid),
                    a = "";
                a = "inter" === n.panoType ? t : n.panoId;
                var r = {
                    panoid: a,
                    panotype: n.panoType,
                    heading: n.panoHeading,
                    pitch: n.panoPitch,
                    l: e.level,
                    tn: "B_NORMAL_MAP",
                    sc: 0,
                    newmap: 1,
                    shareurl: 1
                };
                if ("inter" == n.panoType ? (r.pid = n.panoId, r.iid = t) : r.pid = n.panoId, e.shareParam.ShareMarkerModule) {
                    var i = T.json.stringify([e.shareParam.ShareMarkerModule]),
                        c = encodeURIComponent(i);
                    r.cpinfo = c, delete e.shareParam.ShareMarkerModule
                }
                var d = {},
                    s = !1;
                if (e.shareParam) {
                    for (var p in e.shareParam)(void 0 !== e.shareParam[p] || null !== e.shareParam[p]) && (s = !0, d[p] = e.shareParam[p]);
                    s && (r.psp = encodeURIComponent(T.json.stringify(d)))
                }
                if (d.TrafficModule && window.currentComponent && ("NavTrans" == currentComponent.name || "BusTrans" == currentComponent.name || "NavWalk" == currentComponent.name)) {
                    var l = window.currentComponent,
                        u = l.modelQuery.replace(/&b=\((-?\d+)(\.\d+),(-?\d+)(\.\d+);(-?\d+)(\.\d+),(-?\d+)(\.\d+)\)/gi, "");
                    r.s = encodeURIComponent(decodeURIComponent(u))
                }
                return r
            }
        };
    o.exports = r
});;
define("pano:widget/module/PanoModule/FlashRender/FlashUtil.js", function(e, t, r) {
    var n = function() {
        function e() {
            this._ie = (window.ActiveXObject || "ActiveXObject" in window) && !window.opera, this._objDefAttrs = this._ie ? ' classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0"' : ' type="application/x-shockwave-flash"', this._objAttrKeys = ["id", "width", "height", "align", "data"], this._objParamKeys = ["wmode", "movie", "flashvars", "scale", "quality", "play", "loop", "menu", "salign", "bgcolor", "base", "allowscriptaccess", "allownetworking", "allowfullscreen", "seamlesstabbing", "devicefont", "swliveconnect"]
        }
        return baidu.extend(e.prototype, {
            create: function(e, t) {
                var r = this._genHtml(e);
                t && "string" == typeof t && (t = document.getElementById(t)), t ? t.innerHTML = r : document.write(r)
            },
            remove: function(e) {
                var t = this.getSwf(e);
                if (t && this._ie) {
                    t.style.display = "none";
                    for (var r in t) "function" == typeof t[r] && (t[r] = null);
                    window.CollectGarbage && setTimeout(window.CollectGarbage, 0)
                }
                t.parentNode.removeChild(t)
            },
            getFlashPlayerVersion: function() {
                var e = this,
                    t = function() {
                        var r = function() {
                            var t = navigator;
                            if (t.plugins && t.mimeTypes.length) {
                                var r = t.plugins["Shockwave Flash"];
                                if (r && r.description) return r.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s)+r/, ".") + ".0"
                            } else if (e._ie) try {
                                var n = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                                if (n) {
                                    var a = n.GetVariable("$version");
                                    return a.replace(/WIN/g, "").replace(/,/g, ".")
                                }
                            } catch (i) {}
                        }();
                        return t = function() {
                            return r
                        }, r
                    };
                return t()
            },
            getSwf: function(e) {
                return document.getElementById(e)
            },
            _compareVersion: function(e, t) {
                e = e.split("."), t = t.split(".");
                for (var r = Math.max(e.length, t.length), n = 0; r > n; n++) {
                    var a = e[n],
                        i = t[n];
                    if (!a || !i) return a || i ? a ? 1 : -1 : 0;
                    if (a = Number(a), i = Number(i), i > a) return -1;
                    if (a > i) return 1
                }
                return 0
            },
            _genHtml: function(e) {
                if (e = e || {}, e.movie = e.url || "", e.altHtml = e.errorMessage || "", e.vars) {
                    var t = e.vars,
                        r = [],
                        n = null,
                        a = null;
                    for (n in t) a = t[n], r.push(n + "=" + encodeURIComponent(a));
                    e.flashvars = r.join("&")
                }
                e.minVer = e.ver;
                var i, o, s = e.minVer,
                    l = e.maxVer;
                if (s || l) {
                    var c = this.getFlashPlayerVersion();
                    if (!c || s && this._compareVersion(c, s) < 0 || l && this._compareVersion(c, l) > 0) return e.altHtml || ""
                }
                var h = ["<object", this._objDefAttrs];
                for (e.data = e.movie, i = 0; i < this._objAttrKeys.length; i++) o = this._objAttrKeys[i], e.hasOwnProperty(o) && h.push(" ", o, '="', e[o], '"');
                for (h.push(">"), i = 0; i < this._objParamKeys.length; i++) o = this._objParamKeys[i], e.hasOwnProperty(o) && h.push('<param name="', o, '" value="', e[o], '"/>');
                return h.push("</object>"), h.join("")
            }
        }), new e
    }();
    r.exports = n
});;
define("pano:widget/module/PanoModule/WebglRender/Render.js", function(t, e, n) {
    var a = t("pano:widget/module/PanoModule/FlashRender/FlashUtil.js"),
        i = (t("pano:widget/module/PanoModule/WebglRender/FlashPlayer.js"), function(e, n, a) {
            T.lang.Class.call(this), this.container = n, this.panoMarkers = {}, this.panoOptions = {}, this.EventType = void 0, this.initialize(e, n, a);
            var i = this,
                o = !1,
                d = !1,
                r = !1,
                s = !1,
                p = !1,
                c = !1;
            "contextMenu" === e.from ? i.addPanoLoadingMask("panoPreviewMask") : i.addPanoLoadingMask(), t.async(["pano:widget/module/PanoModule/WebglRender/lib/Four.js", "pano:widget/module/PanoModule/WebglRender/event/EventType.js", "pano:widget/module/PanoModule/WebglRender/StreetscapePanorama.js"], function(t, n, h) {
                function u() {
                    !1 === r && (r = !0, i.dispatchEvent("first_thumb_complete"))
                }

                function l() {
                    var t = document.getElementById("panoLoadingMask");
                    if (document.getElementById("panoPreviewMask")) {
                        var e = document.getElementById("pano-preview-container");
                        e.removeChild(document.getElementById("panoPreviewMask"))
                    } else t && document.body.removeChild(t);
                    !0 !== d && (d = !0, setTimeout(u, 2e3))
                }

                function v() {
                    g.removeEventListener(n.OUT_OF_NAVIGATION_RANGE, v), i.dispatchEvent("out_of_navigation_range")
                }

                function m() {
                    i.dispatchEvent("pano_error", {
                        data: "IO_ERROR"
                    })
                }
                i.EventType = n;
                var g = new h(i.container, {
                    panoId: e.panoId || "",
                    iid: e.panoIId || "",
                    poiuid: e.panoPoiUid || "",
                    panoType: e.panoType || "",
                    heading: e.panoHeading,
                    pitch: e.panoPitch,
                    width: i.container.clientWidth,
                    height: i.container.clientHeight,
                    domain: a.PANO_SERVICE_URL,
                    panoTileUrl: a.PANO_TILE_URL,
                    udtVersion: a.PANO_UDT_VERSION
                });
                g.addEventListener(n.INTERFACE_READY, function() {
                    !1 === o && (o = !0, i.dispatchEvent("interface_ready"))
                }), g.addEventListener(n.LOAD_PANORAMA_DATA_COMPLETED, function() {
                    s = !0;
                    var t = i.panorama.getPanoramaData(),
                        n = i.panorama.getPov(),
                        a = i.panorama.getInnerData(),
                        d = {
                            panoId: t.panoId,
                            panoid: t.panoId,
                            heading: n.heading,
                            pitch: n.pitch,
                            panoHeading: n.heading,
                            panoPitch: n.pitch,
                            panoType: t.panoType,
                            rname: t.roadName,
                            mode: t.mode,
                            copyright: {
                                dataProviderIndex: t.provider,
                                admission: t.admission,
                                photoDate: t.date,
                                roadName: t.roadName,
                                username: t.username || ""
                            },
                            maxImgLevel: t.maxImgLevel
                        };
                    i.panorama.isStreet() ? (d.x = t.rx || t.panoX, d.y = t.ry || t.panoY) : (d.x = a.vpPoint.x, d.y = a.vpPoint.y), d.panoMCPoint = {
                        x: d.x,
                        y: d.y
                    }, i.panoOptions = d, !1 === o && (o = !0, i.dispatchEvent("interface_ready")), i.dispatchEvent("sdata_loaded", {
                        data: i.panoOptions
                    }), !0 === p && (p = !1, l()), !0 === c && (c = !1, u());
                    var r = i.panorama.getMercatorPosition(),
                        h = {
                            mercatorX: r.x,
                            mercatorY: r.y
                        };
                    i.dispatchEvent("position_changed", {
                        data: h
                    });
                    var v = "hideDebug";
                    "contextMenu" !== e.from && "showDebug" === v && (g.showDebugContainer(), g.updateDebugPanoId(d.panoId))
                }), g.addEventListener(n.LOAD_PANORAMA_DATA_FAILED, m), g.addEventListener(n.PARSE_PANORAMA_DATA_FAILED, m), g.addEventListener(n.LOAD_THUMBNAIL_COMPLETED, function() {
                    return !1 === s ? void(p = !0) : void l()
                }), g.addEventListener(n.LOAD_THUMBNAIL_FAILED, m), g.addEventListener(n.LOAD_TILE_QUEUE_COMPLETED, function() {
                    return !1 === s ? void(c = !0) : void u()
                }), g.addEventListener(n.ID_CHANGED, function(t) {
                    i.dispatchEvent("id_change", {
                        data: t.data
                    })
                }), g.addEventListener(n.POV_CHANGED, function(t) {
                    var e = t.data;
                    i.dispatchEvent("pov_changed", {
                        data: {
                            heading: e.heading,
                            pitch: e.pitch
                        }
                    })
                }), g.addEventListener(n.ZOOM_CHANGED, function(t) {
                    i.dispatchEvent("zoom_changed", {
                        data: t.data
                    })
                }), g.addEventListener(n.GO_TO_POI_COMPLETE, function(t) {
                    i.dispatchEvent("go_to_poi_complete", {
                        data: t.data
                    })
                }), g.addEventListener(n.OUT_OF_NAVIGATION_RANGE, v), g.addEventListener(n.CLICKED_POSITION, function(t) {
                    i.dispatchEvent("clicked_position", {
                        data: t.data
                    })
                }), g.addEventListener(n.OVERLAY_MOUSECLICK, function(t) {
                    i.dispatchEvent("overlay_mouseclick", {
                        data: t.data
                    })
                }), g.addEventListener(n.OVERLAY_MOUSEOVER, function(t) {
                    i.dispatchEvent("overlay_mouseover", {
                        data: t.data
                    })
                }), g.addEventListener(n.OVERLAY_MOUSEOUT, function(t) {
                    i.dispatchEvent("overlay_mouseout", {
                        data: t.data
                    })
                }), g.addEventListener(n.TAG_MARKER_SUBMIT, function(t) {
                    i.dispatchEvent("overlay_edit", {
                        data: t.data
                    })
                }), g.addEventListener(n.TAG_MARKER_CLOSE, function(t) {
                    i.dispatchEvent("overlay_delete_icon_click", {
                        data: t.data
                    })
                }), g.addEventListener(n.NO_PANORAMA_ERROR, function() {
                    i.dispatchEvent("pano_error", {
                        data: "NO_PANO"
                    })
                }), g.addEventListener(n.DESELECT_POI, function() {
                    i.dispatchEvent("deselect_poi")
                }), g.addEventListener("indoor_exit", function(t) {
                    i.dispatchEvent("indoor_exit", t)
                }), g.addEventListener("street_drag", function() {
                    i.dispatchEvent("street_drag")
                }), g.addEventListener("service_monitor", function(t) {
                    i.dispatchEvent("service_monitor", t)
                }), g.addEventListener(n.SHOW_BILLION_PIXELS_DIALOG, function() {
                    i.dispatchEvent("show_billion_pixels_dialog")
                }), i.panorama = g
            })
        });
    T.lang.inherits(i, T.lang.Class), T.object.extend(i.prototype, {
        initialize: function(t, e, n) {
            this.panoDatas = t, this.containerDom = e, this.panoConfigUrl = n
        },
        createFlash: function(t, e, n, i) {
            i = i || this.guid;
            var o = this.getFlashVars(t, e, n, i);
            a.create({
                id: "PanoramaFlash" + i,
                width: "100%",
                height: "100%",
                allowscriptaccess: "always",
                scale: "showall",
                wmode: "opaque",
                quality: "high",
                url: "/wolfman/static/pano/swf/pano_whole/FullscreenPanoLoader_a7d9c14.swf",
                ver: "10",
                errorMessage: "您未安装Flash Player播放器或者版本过低",
                vars: o
            }, e)
        },
        getContainerSize: function(t) {
            return {
                width: t.clientWidth,
                height: t.clientHeight
            }
        },
        getFlashVars: function(t, e, n, a) {
            var i = this.getContainerSize(e),
                o = "",
                d = "";
            "undefined" != typeof t.panoHeading && (o = t.panoHeading), "undefined" != typeof t.panoPitch && (d = t.panoPitch);
            var r = {
                pid: t.panoId || "",
                iid: t.panoIId || "",
                poiuid: t.panoPoiUid || "",
                panoType: t.panoType || "",
                heading: o,
                pitch: d,
                width: i.width,
                height: i.height,
                panoUrl: "/wolfman/static/pano/swf/pano_whole/BDStreetScape_5bf5ec0.swf",
                domain: n.PANO_SERVICE_URL,
                panoTileUrl: n.PANO_TILE_URL,
                udtVersion: n.PANO_UDT_VERSION,
                jsInterfaceNamespace: "Pano.FlashPlayer",
                swfIndex: a
            };
            return r
        },
        addMarkers: function(t) {
            this.panorama.addMarkers(t instanceof Array ? t : [t])
        },
        removeMarkers: function(t) {
            this.panorama.removeMarkers(t instanceof Array ? t : [t])
        },
        gotoPOI: function(t) {
            var e = {
                id: t.uid,
                panoId: t.panoId,
                x: t.x,
                y: t.y,
                rank: t.rank,
                panoX: t.panoX,
                panoY: t.panoY,
                heading: t.panoHeading,
                pitch: -t.panoPitch,
                poiLinex: t.poiLinex,
                poiLiney: t.poiLiney,
                isFromRecommend: !0
            };
            this.panorama.gotoPOI(e)
        },
        drawLineToPoint: function(t, e, n, a, i, o, d) {
            var r = this,
                s = this.EventType.DRAW_LINE_COMPLETED,
                p = function(t) {
                    r.panorama.removeEventListener(s, p), d(t.data)
                };
            if (this.panorama.addEventListener(s, p), void 0 !== t && "" !== t || !(isNaN(e) || isNaN(n) || isNaN(a) || isNaN(i) || isNaN(o))) {
                var c = {
                    pointX: a,
                    pointY: i,
                    pointRank: o,
                    startX: e,
                    startY: n,
                    id: t || "",
                    uid: t || ""
                };
                this.panorama.drawPOILine(c)
            } else this.dispatchEvent("draw_line_complete", {
                errorCode: 1
            })
        },
        closePano: function() {
            this.panorama.dispose(), delete this.panorama
        },
        setRoutParam: function(t) {
            this.panorama.setRouteParam(window.JSON.parse(t))
        },
        hideRegion: function() {
            this.panorama.hideRegion()
        },
        playRouteVideo: function(t) {
            var e, n = this;
            this.video ? e = this.videoWrappper : (e = this.videoWrappper = new T.lang.Class, this.flashDom = baidu('<div style="position:absolute;width:100%;height:100%;top:0px;z-index: 99999"></div>'), baidu(this.containerDom).append(this.flashDom), this.createFlash(this.panoDatas, this.flashDom.get(0), this.panoConfigUrl, e.guid), this.video = a.getSwf("PanoramaFlash" + e.guid)), this.flashDom.css("display", "block"), e.addEventListener("interface_ready", function() {}), e.addEventListener("id_changed", function(t) {
                n.dispatchEvent("id_changed", t)
            }), e.addEventListener("service_monitor", function(t) {
                n.dispatchEvent("service_monitor", t)
            }), e.addEventListener("sdata_loaded", function(t) {
                n.dispatchEvent("sdata_loaded", t)
            }), e.addEventListener("position_changed", function(t) {
                n.dispatchEvent("position_changed", t)
            }), e.addEventListener("deselect_poi", function(t) {
                n.dispatchEvent("deselect_poi", t)
            }), e.addEventListener("links_changed", function(t) {
                n.dispatchEvent("links_changed", t)
            }), e.addEventListener("first_thumb_complete", function() {
                n.video.doAction("playPanoVideo", t)
            }), e.addEventListener("update_pano_position", function(t) {
                n.dispatchEvent("update_pano_position", t)
            }), e.addEventListener("pano_player_error", function(t) {
                n.dispatchEvent("pano_player_error", t)
            }), e.addEventListener("add_statistic", function(t) {
                n.dispatchEvent("add_statistic", t)
            })
        },
        closeRouteVideo: function() {
            this.flashDom.css("display", "none")
        },
        toShareStatus: function() {
            this.panorama.toggleUI({
                marker: !1,
                topo: !1,
                wellLid: !1,
                pointCloud: !1,
                region: !1
            }), this.setInteractiveState("clickable"), this.setFlashCursorStyle(0)
        },
        revertStatus: function() {
            this.panorama.toggleUI({
                marker: !0,
                topo: !0,
                wellLid: !0,
                pointCloud: !0,
                region: !0
            }), this.setFlashCursorStyle(2), this.setInteractiveState("normal")
        },
        get: function(t) {
            var e = "get" + t.substr(0, 1).toUpperCase() + t.substr(1);
            return this[e] ? this[e]() : void 0
        },
        getZoom: function() {
            return this.panorama.getZoom()
        },
        getPanoOptions: function() {
            return this.panorama.getPanoOptions()
        },
        getMercatorPosition: function() {
            var t = this.panorama.getMercatorPosition();
            return {
                mercatorX: t.x,
                mercatorY: t.y
            }
        },
        getCopyrightData: function() {
            return this.panoOptions.copyright
        },
        getPov: function() {
            return this.panorama.getPov()
        },
        getSData: function() {
            return this.panorama.getPanoramaJSONData()
        },
        getMarkerUidInBestPano: function() {
            return this.panorama.getMarkerUidInBestPano()
        },
        set: function(t, e) {
            var n = "set" + t.substr(0, 1).toUpperCase() + t.substr(1);
            return this[n] ? this[n](e) : void 0
        },
        setPanoOptions: function(t) {
            if (t.keepPov === !0) {
                var e = this.panorama.getPov();
                t.panoHeading = e.heading, t.panoPitch = e.pitch
            }
            t = {
                panoType: t.panoType,
                id: t.panoId || t.panoIId,
                panoId: t.panoId,
                iid: t.panoIId,
                poiuid: t.panoUId,
                heading: t.panoHeading,
                pitch: t.panoPitch,
                zoom: t.panoZoom,
                width: this.container.clientWidth,
                height: this.container.clientHeight
            }, this.panorama.setPanoOptions(t)
        },
        setPov: function(t) {
            this.panorama.setPov(t.heading, t.pitch)
        },
        setZoom: function(t) {
            return this.panorama.setZoom(t)
        },
        setFlashCursorStyle: function(t) {
            "mark" === t ? t = 0 : void 0 === t && (t = 1), this.panorama.setCursorStyle(t)
        },
        setMarkerStatus: function(t) {
            this.panorama.setMarkerStatus(t)
        },
        setInteractiveState: function(t) {
            this.panorama.setInteractiveState(t)
        },
        addPanoLoadingMask: function(t) {
            var e, n = "",
                a = 0,
                i = 0,
                o = "//webmap1.bdimg.com/wolfman/static/pano/images/pano_whole/pano_loading_24c94ab.gif",
                d = document.getElementById("pano-preview-container"),
                r = '<img src="' + o + '" width="84px" height="55px" id="test" style="position:absolute; top:50%; left:50%;margin-left:-42px; margin-top:-27px;" />';
            "panoPreviewMask" === t ? (n = "panoPreviewMask", a = d.clientWidth, i = d.clientHeight) : (n = "panoLoadingMask", a = document.body.clientWidth, i = document.body.clientHeight);
            var s = document.getElementById(n);
            if (s) e = s, e.innerHTML = "";
            else {
                e = document.createElement("div"), e.id = n;
                var p = {
                    position: "absolute",
                    left: "0px",
                    top: "0px",
                    zIndex: 100002,
                    width: a + "px",
                    height: i + "px",
                    background: "#fff"
                };
                for (var c in p) e.style[c] = p[c]
            }
            "panoPreviewMask" === t ? (e.style.borderRadius = parseInt(d.clientWidth, 10) / 2 + "px", !s && d.appendChild(e), setTimeout(function() {
                var t = document.getElementById("panoPreviewMask");
                t && (t.innerHTML = r)
            }, 500)) : (e.innerHTML = r, document.body.appendChild(e))
        },
        stopAnimationFrame: function() {
            this.panorama.stopAnimationFrame()
        },
        startAnimationFrame: function() {
            this.panorama.startAnimationFrame()
        },
        setIsRotatePano: function(t) {
            this.panorama.setIsRotatePano(t)
        }
    }), n.exports = i
});;
define("pano:widget/module/PanoModule/WebglRender/FlashPlayer.js", function() {
    function n() {}
    var a = window.Pano = window.Pano || {};
    baidu.extend(n, {
        dispatchFlashEvent: function(n, a, o) {
            try {
                var e = window.baiduInstance(o);
                e.dispatchEvent(n, {
                    data: a
                })
            } catch (d) {
                throw window.console && console.error(d, n, a, o), d
            }
        }
    }), a.FlashPlayer = n
});;
define("pano:widget/module/PanoModule/FlashRender/FlashWraper.js", function(e, t, o) {
    function n(e, t, o) {
        T.lang.Class.call(this), this._flashDom = null, this._flashContainer = t, this._jsForFlashEventHandlers = null, this.initialize(e, o)
    } {
        var i = e("pano:widget/module/PanoModule/FlashRender/FlashUtil.js");
        e("pano:widget/module/PanoModule/FlashRender/FlashInterface.js")
    }
    n.FLASH_LOAD_FILE = "/wolfman/static/pano/swf/pano_whole/FullscreenPanoLoader_a7d9c14.swf", n.FLASH_SCAPE_FILE = "/wolfman/static/pano/swf/pano_whole/BDStreetScape_5bf5ec0.swf", T.lang.inherits(n, T.lang.Class, "PanoFlashWraper"), T.object.extend(n.prototype, {
        initialize: function(e, t) {
            this._createFlash(e, this._flashContainer, t), this._decorateFlash(), this._flashDom = i.getSwf("PanoramaFlash" + this.guid)
        },
        doAction: function(e, t) {
            "closePano" == e && this._dispose(), this._flashDom.doAction && this._flashDom.doAction(e, t)
        },
        gotoPOI: function(e) {
            var e = {
                id: e.uid,
                pid: e.panoId,
                x: 100 * e.x,
                y: 100 * e.y,
                rank: e.rank,
                panox: 100 * e.panoX,
                panoy: 100 * e.panoY,
                dir: e.panoHeading,
                pitch: e.panoPitch,
                poiLinex: e.poiLinex,
                poiLiney: e.poiLiney,
                tourId: e.tourId
            };
            this._flashDom.doAction("gotoPOI", e)
        },
        drawLineToPoint: function(e, t, o, n, i, a, s) {
            var r = function(e, t) {
                this.removeEventListener("draw_line_complete", r), s(t.data)
            };
            this.addEventListener("draw_line_complete", r), this._flashDom.doAction("drawPOILine", {
                pointX: 100 * n,
                pointY: 100 * i,
                pointRank: a,
                startX: t,
                startY: o,
                id: e || ""
            })
        },
        setRoutParam: function(e) {
            this.set("routParams", e)
        },
        closePano: function() {
            this._dispose()
        },
        addMarkers: function(e) {
            this._flashDom.doAction("addMarkers", e)
        },
        hideRegion: function() {
            this._flashDom.doAction("hideRegion")
        },
        removeMarkers: function(e) {
            this._flashDom.doAction("removeMarkers", e)
        },
        getMarkerUidInBestPano: function() {
            return this._flashDom.get("markerUidInBestPano")
        },
        playRouteVideo: function(e) {
            return this._flashDom.doAction("playPanoVideo", e)
        },
        closeRouteVideo: function() {
            return this._flashDom.doAction("closePanoVideo")
        },
        get: function(e) {
            return this._flashDom.get(e)
        },
        set: function(e, t) {
            if ("panoOptions" == e) {
                var o = this._getContainerSize(this._flashDom);
                if (t.keepPov === !0) {
                    var n = this._flashDom.get("panoOptions");
                    t.panoHeading = n.panoHeading, t.panoPitch = n.panoPitch
                }
                t = {
                    panoType: t.panoType,
                    id: t.panoId || t.panoIId,
                    pid: t.panoId,
                    iid: t.panoIId,
                    poiuid: t.panoUId,
                    heading: t.panoHeading,
                    pitch: t.panoPitch,
                    zoom: t.panoZoom,
                    width: o.width,
                    height: o.height
                }
            }
            this._flashDom && this._flashDom.set && this._flashDom.set(e, t)
        },
        _decorateFlash: function() {
            this._bindJSEvent()
        },
        _dispose: function() {
            this._takeOffDecorateFlash(), this._flashContainer = null
        },
        _takeOffDecorateFlash: function() {
            this._removeJSEvent()
        },
        _removeJSEvent: function() {
            baidu.un(this._flashContainer, T.browser.firefox ? "DOMMouseScroll" : "onmousewheel", this._jsForFlashEventHandlers.mouseWheelHandler), baidu.un(window, "onresize", this._jsForFlashEventHandlers.resizeHandler)
        },
        _bindJSEvent: function() {
            var e = this;
            e._jsForFlashEventHandlers = {}, e._jsForFlashEventHandlers.mouseWheelHandler = function(t) {
                var o = -t.detail / 3 || t.wheelDelta / 120,
                    n = e.get("zoom") + o;
                e.set("zoom", n), t.preventDefault()
            }, e._jsForFlashEventHandlers.resizeHandler = function() {
                var t = e._getContainerSize(e._flashContainer);
                e.set("size", {
                    width: t.width,
                    height: t.height
                })
            }, baidu.on(e._flashContainer, T.browser.firefox ? "DOMMouseScroll" : "onmousewheel", e._jsForFlashEventHandlers.mouseWheelHandler), baidu.on(window, "onresize", e._jsForFlashEventHandlers.resizeHandler)
        },
        _createFlash: function(e, t, o) {
            var a = this._getFlashVars(e, t, o);
            i.create({
                id: "PanoramaFlash" + this.guid,
                width: "100%",
                height: "100%",
                allowscriptaccess: "always",
                scale: "showall",
                wmode: "opaque",
                quality: "high",
                url: n.FLASH_LOAD_FILE,
                ver: "10",
                errorMessage: "您未安装Flash Player播放器或者版本过低",
                vars: a
            }, t)
        },
        _getFlashVars: function(e, t, o) {
            var i = this._getContainerSize(t),
                a = "",
                s = "";
            "undefined" != typeof e.panoHeading && (a = e.panoHeading), "undefined" != typeof e.panoPitch && (s = e.panoPitch);
            var r = {
                pid: e.panoId || "",
                iid: e.panoIId || "",
                poiuid: e.panoPoiUid || "",
                panoType: e.panoType || "",
                heading: a,
                pitch: s,
                width: i.width,
                height: i.height,
                panoUrl: n.FLASH_SCAPE_FILE,
                domain: o.PANO_SERVICE_URL,
                panoTileUrl: o.PANO_TILE_URL,
                udtVersion: o.PANO_UDT_VERSION,
                jsInterfaceNamespace: "Pano.PanoFlashInterface",
                swfIndex: this.guid
            };
            return r
        },
        _getContainerSize: function(e) {
            return {
                width: e.clientWidth,
                height: e.clientHeight
            }
        },
        setFlashCursorStyle: function(e) {
            this.set("cursorStyle", e ? "mark" : void 0)
        },
        setMarkerStatus: function(e) {
            this.set("markerStatus", e)
        },
        toShareStatus: function() {
            this.doAction("toggleUI", {
                marker: !1,
                topo: !1,
                wellLid: !1,
                pointCloud: !1,
                region: !1
            }), this.setFlashCursorStyle(!0), this.set("interactiveState", "clickable")
        },
        revertStatus: function() {
            this.doAction("toggleUI", {
                marker: !0,
                topo: !0,
                wellLid: !0,
                pointCloud: !0,
                region: !0
            }), this.setFlashCursorStyle(), this.set("interactiveState", "normal")
        }
    }), o.exports = n
});;
define("pano:widget/module/PanoModule/FlashRender/FlashInterface.js", function() {
    function n() {}
    var o = window.Pano = window.Pano || {};
    baidu.extend(n, {
        dispatchFlashEvent: function(n, o, a) {
            try {
                var e = baiduInstance(a);
                e.dispatchEvent(n, {
                    data: o
                })
            } catch (t) {
                throw window.console && console.error(t, n, o, a), t
            }
        },
        get: function() {
            return null
        },
        doAction: function() {}
    }), o.PanoFlashInterface = n
});;
define("pano:widget/module/PanoModule/FlashRender/Render.js", function(e, d, n) {
    n.exports = e("pano:widget/module/PanoModule/FlashRender/FlashWraper.js")
});;
define("pano:widget/module/PanoModule/CvsRender/base/Const.js", function(_, e, o) {
    var O = {};
    O.MIN_ZINDEX = 1200, O.MAX_ZOOM = 4, O.MIN_ZOOM = 1, O.TILE_MAX_ZOOM = 4, O.TILE_MIN_ZOOM = 1, O.BASE_URL = location.protocol + "//mapsv0.bdimg.com/", O.TYPE_INNER = "inter", O.TYPE_STREET = "street", O.enableScrollWheelZoom = !0, O.MAX_TILE_LOADING_TOGETHOR = 16, O.ROAD_WIDTH = 15, O.ROAD_MIN_LENGTH = 8, O.ROAD_MAX_LENGTH = 180, o.exports = O
});;
define("pano:widget/module/PanoModule/CvsRender/base/Util.js", function(e, t, n) {
    var r = e("pano:widget/module/PanoModule/CvsRender/base/Const.js"),
        a = {
            create: function(e, t, n) {
                var r = document.createElement(e);
                return n && (r = document.createElementNS(n, e)), baidu.dom.setAttrs(r, t || {})
            },
            calcDisplayZoom: function(e, t) {
                var n, a = e.width,
                    o = e.height,
                    i = 180 / Math.pow(2, t),
                    u = 1,
                    d = a / o > 1 ? !0 : !1;
                n = d ? o : a;
                for (var l = i / n, p = Math.floor(t) + u, s = 360 / (2 * Math.pow(2, p - 2) * l); s > 512;) p++, s = 360 / (2 * Math.pow(2, p - 2) * l);
                if (p > r.TILE_MAX_ZOOM) {
                    var c = p - r.TILE_MAX_ZOOM;
                    s *= Math.pow(2, c), p = r.TILE_MAX_ZOOM
                }
                return p < r.TILE_MIN_ZOOM && (p = r.TILE_MIN_ZOOM), s = Math.round(s), {
                    imgZoom: p,
                    displayTileSize: s
                }
            },
            getFixedDecimal: function(e, t) {
                return void 0 === t || 0 >= t ? e : parseInt(e * Math.pow(10, t), 10) / Math.pow(10, t)
            },
            preventDefault: function(e) {
                var e = window.event || e;
                return e.preventDefault ? e.preventDefault() : e.returnValue = !1, !1
            },
            stopAndPrevent: function(e) {
                return this.stopBubble(e), this.preventDefault(e)
            },
            stopBubble: function(e) {
                var e = window.event || e;
                e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
            },
            getCurrentTime: function() {
                return (new Date).getTime()
            },
            isVml: function() {
                var e = document.body.appendChild(create("div"));
                e.innerHTML = '<v:shape id="vml_tester1" adj="1" />';
                var t = e.firstChild;
                if (!t.style) return !1;
                t.style.behavior = "url(#default#VML)";
                var n = t ? "object" == typeof t.adj : !0;
                return e.parentNode.removeChild(e), n
            },
            isSvg: function() {
                return !!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Shape", "1.1")
            },
            isCanvas: function() {
                return !!create("canvas").getContext
            },
            toRadian: function(e) {
                return e * Math.PI / 180
            }
        };
    n.exports = a
});;
define("pano:widget/module/PanoModule/CvsRender/base/Size.js", function(t, e, i) {
    function h(t, e) {
        this.width = t || 0, this.height = e || 0
    }
    h.prototype.equals = function(t) {
        return t && this.width == t.width && this.height == t.height
    }, i.exports = h
});;
define("pano:widget/module/PanoModule/CvsRender/base/Point.js", function(n, t, e) {
    function a(n) {
        return "string" == typeof n
    }

    function i(n, t) {
        isNaN(n) && (n = decode64(n), n = isNaN(n) ? 0 : n), a(n) && (n = parseFloat(n)), isNaN(t) && (t = decode64(t), t = isNaN(t) ? 0 : t), a(t) && (t = parseFloat(t)), this.lng = n, this.lat = t
    }
    i.isInRange = function(n) {
        return n && n.lng <= 180 && n.lng >= -180 && n.lat <= 74 && n.lat >= -74
    }, i.prototype.equals = function(n) {
        return n && this.lat == n.lat && this.lng == n.lng
    }, e.exports = i
});;
define("pano:widget/module/PanoModule/CvsRender/base/EventType.js", function() {
    var a = function() {};
    return a.LOAD_PANORAMA_DATA_COMPLETED = "loadPanoramaDataCompleted", a.LOAD_PANORAMA_DATA_FAILED = "loadPanoramaDataFailed", a.PARSE_PANORAMA_DATA_FAILED = "parsePanoramaDataFailed", a.LOAD_INNER_PANORAMA_DATA_COMPLETED = "loadInnerPanoramaDataCompleted", a.LOAD_INNER_PANORAMA_DATA_FAILED = "loadInnerPanoramaDataFailed", a.PARSE_INNER_PANORAMA_DATA_FAILED = "parseInnerPanoramaDataFailed", a.LOAD_THUMBNAIL_COMPLETED = "loadThumbnailCompleted", a.LOAD_THUMBNAIL_FAILED = "loadThumbnailFailed", a.LOAD_TILE_COMPLETED = "loadTileCompleted", a.LOAD_TILE_QUEUE_COMPLETED = "loadTileQueueCompleted", a.LOAD_TOPO_TEXTURE_COMPLETED = "loadTopoTextureCompleted", a.LOAD_TOPO_TEXTURE_FAILED = "loadTopoTextureFailed", a.ID_CHANGED = "idChanged", a.POV_CHANGED = "povChanged", a.ZOOM_CHANGED = "zoomChanged", a.INTERFACE_READY = "interfaceReady", a.GO_TO_POI_COMPLETE = "gotoPOICompleted", a.DRAW_LINE_COMPLETED = "drawLineComplete", a.OUT_OF_NAVIGATION_RANGE = "outOfNavigationRange", a.MARKER_CLICKED = "markerClicked", a.ENTRANCE_MARKER_CLICKED = "entranceMarkerClicked", a.CLICKED_POSITION = "clickedPosition", a.TAG_MARKER_CLOSE = "tagMarkerCloseBtnClicked", a.TAG_MARKER_SUBMIT = "tagMarkerConfirmBtnClicked", a.OVERLAY_MOUSEOVER = "overlayMouseover", a.OVERLAY_MOUSEOUT = "overlayMouseout", a.OVERLAY_MOUSECLICK = "overlayMouseclick", a.TAG_MARKER_FOCUS = "tagMarkerFocus", a.TAG_MARKER_BLUR = "tagMarkerBlur", a.TAG_MARKER_CANCEL = "tagMarkerCancelBtnClicked", a.NO_PANORAMA_ERROR = "noPanoramaError", a.DESELECT_POI = "delselectPOI", a.SHOW_BILLION_PIXELS_DIALOG = "showBillionPixelsDialog", a.CHANGE_PANO_CLICKED = "changePano", a.ROTATE_PANO_CLICKED = "rotatePano", a
});;
define("pano:widget/module/PanoModule/CvsRender/base/DataParser.js", function(e) {
    var o = e("pano:widget/module/PanoModule/WebglRender/model/RegionVO.js"),
        r = e("pano:widget/module/PanoModule/WebglRender/model/PanoramaData.js"),
        a = e("pano:widget/module/PanoModule/WebglRender/model/RoadData.js"),
        n = (e("pano:widget/module/PanoModule/WebglRender/model/PointCloudData.js"), e("pano:widget/module/PanoModule/WebglRender/config/ConstantConfig.js")),
        t = {
            parseSData: function(e) {
                if (void 0 === e) throw "Get none from server";
                var a = e.result;
                if (void 0 !== a && 0 !== a.error) throw "Get error from server";
                var t = e.content;
                if (void 0 === t || 0 === t.length || void 0 === t[0]) throw "Get empty data from server";
                var i, d, s = 0,
                    v = t[0],
                    m = new r;
                if (m.panoId = v.ID, v.Inters instanceof Array) {
                    var p = v.Inters[0];
                    void 0 !== p && (m.iid = p.IID)
                }
                m.panoType = v.Type, m.panoX = v.X / 100, m.panoY = v.Y / 100, m.panoZ = v.Z / 100, m.rx = v.RX / 100, m.ry = v.RY / 100, m.rz = v.RZ / 100, m.lx = v.LX / 100, m.ly = v.LY / 100, m.moveDir = void 0 !== v.MoveDir ? v.MoveDir : -30, m.heading = void 0 !== v.Heading ? v.Heading : 270 - v.NorthDir, m.pitch = v.Pitch;
                var l = v.Roll;
                void 0 !== l && (m.roll = l > 90 || -90 > l ? 0 : l), m.deviceHeight = v.DeviceHeight, m.date = v.Date || m.date, m.time = v.Time, m.provider = void 0 !== v.Provider ? v.Provider : m.provider, m.admission = v.Admission || m.admission, m.roadName = v.Rname;
                var f = [];
                if (v.Roads) {
                    var g = v.Roads;
                    for (s = 0, i = g.length; i > s; s++) {
                        d = g[s];
                        var u = this.parseRoadData(d);
                        m.roads.push(u), f[d.ID] = d.Name
                    }
                }
                if (v.Links) {
                    var h = v.Links;
                    for (s = 0, i = h.length; i > s; s++) d = h[s], d.RoadName = f[d.RID], m.vpoints.push(this.parsePointData(d))
                }
                m.mode = v.Mode;
                var I = v.SwitchID;
                if (void 0 !== I && 0 < I.length && n.TYPE_STREET === m.panoType) {
                    var P;
                    for (s = 0, i = I.length; i > s; s++) P = I[s], m.dayNightPanos.push({
                        panoId: P.ID,
                        type: P.Time
                    })
                }
                if (m.username = void 0 !== v.Username ? v.Username : "", void 0 !== v.ImgVmax && (m.imgVmax = v.ImgVmax), void 0 !== v.ImgVmin && (m.imgVmin = v.ImgVmin), v.Region && v.Region.REG_VEC) {
                    var D = v.Region.REG_VEC;
                    m.regions = [];
                    for (var s = 0, c = D.length; c > s; s++) {
                        var R = D[s];
                        if (R.SKETCH_VEC) {
                            var y = new o;
                            y.type = R.TYPE, y.panoId = R.PANO_ID, y.panoX = R.PANO_X || R.Pano_X || m.panoX || 0, y.panoY = R.PANO_Y || R.Pano_Y || m.panoY || 0, y.info = R.INFO, y.id = R.IMAGE_ID, y.desc = R.DESC, y.image = R.IMAGE, y.sound = R.SOUND, y.setPoints(R.SKETCH_VEC), y.regionid = R.REG_ID, y.url = R.URL, R.POI_INFO && y.setpoivo(R.POI_INFO), m.regions.push(y)
                        }
                    }
                }
                if (v.VPoint)
                    for (var Y = v.VPoint, s = 0, c = Y.length; c > s; s++) m.nearPoints.push(this.parsePointData(Y[s]));
                if (m.photos = v.Photos, m.imgLayers = [], m.maxImgLevel = null, v.ImgLayer && v.ImgLayer.length > 0) {
                    for (var w = v.ImgLayer, X = 0, s = 0, x = w.length; x > s; s++) {
                        var N = {};
                        N.blockX = w[s].BlockX, N.blockY = w[s].BlockY, N.imgLevel = w[s].ImgLevel + 1, m.imgLayers[N.imgLevel] = N, N.imgLevel > X && (X = N.imgLevel)
                    }
                    m.maxImgLevel = X
                }
                return m
            },
            parseRoadData: function(e) {
                var o = new a;
                if (o.rid = e.ID, o.roadName = e.Name, o.roadWidth = void 0 !== e.Width ? e.Width / 100 : 0, o.isCurrentRoad = e.IsCurrent || 0, e.Panos)
                    for (var r = e.Panos, n = 0, t = r.length; t > n; n++) o.pointList.push(this.parsePointData(r[n]));
                return o
            },
            parsePointData: function(e) {
                var o = {};
                return o.panoId = e.PID, o.panoType = e.Type, o.rid = e.RID, o.dir = e.DIR, o.roadName = e.RoadName, o.order = e.Order, o.panoX = e.X / 100, o.panoY = e.Y / 100, void 0 !== e.CPointX && !1 !== e.CPointY && (o.cPoint = {
                    x: e.CPointX / 100,
                    y: e.CPointY / 100
                }), o
            },
            parseIData: function(e, o, r) {
                if (0 !== e.result.error || void 0 === e.content || 0 === e.content.length) throw "request error";
                var a = e.content[0].interinfo,
                    n = {};
                n.iid = a.IID, n.uid = a.UID, n.name = a.Name, n.vpRank = a.VPrank, n.vpPoint = a.VPpoint, n.startPanoId = o, n.enterUid = r, n.entrances = a.Entrances, n.exitPanoId = a.BreakID, n.exitX = a.BreakX / 100, n.exitY = a.BreakY / 100, n.defaultFloorId = a.Defaultfloor, n.floors = [];
                var t = void 0 !== a.HasImg ? a.HasImg : 1;
                if (a.Floors) {
                    var i = a.Floors;
                    i.sort(function(e, o) {
                        return e.Floor > o.Floor
                    });
                    for (var d, s = 0, v = i.length; v > s; s++) d = this.parseFloorData(n.iid, n.uid, n.exitPid, n.exitX, n.exitY, t, i[s]), n.floors.push(d);
                    n.rawFloorData = i
                }
                return n
            },
            parseFloorData: function(e, o, r, a, n, t, i) {
                var d = {};
                d.id = i.Floor, d.iid = e, d.uid = o, d.name = i.Name, d.defaultPanoId = i.StartID, d.dir = 360 - i.NorthDir, d.exitPanoId = r || "", d.exitX = a || 0, d.exitY = n || 0, d.hasImage = t || 1, d.scale = i.Scale, d.imgWidth = i.ImgWidth, d.imgHeight = i.ImgHeight, d.tlPoint = {
                    x: i.LTpoint.X,
                    y: i.LTpoint.Y
                }, d.innerPanos = [];
                for (var s, v = i.Points, m = 0, p = v.length; p > m; m++) s = this.parseFloorInnerPanoData(v[m]), d.innerPanos.push(s);
                return d
            },
            parseFloorInnerPanoData: function(e) {
                var o = {};
                return o.panoId = e.PID, o.panoX = e.X / 100, o.panoY = e.Y / 100, o.panoZ = e.rank / 100, o.roadName = e.name, o
            },
            parseQSData: function(e) {
                if (void 0 === e) throw "Get none from server";
                var o = e.result;
                if (void 0 !== o && 0 !== o.error) throw "Get error from server";
                var r = e.content;
                if (void 0 === r) throw "Get empty data from server";
                return {
                    panoId: r.id,
                    panoX: r.x / 100,
                    panoY: r.y / 100
                }
            },
            parsePlaneData: function(e) {
                if (void 0 === e) throw "Get none from server";
                var o = e.result;
                if (void 0 !== o && 0 !== o.error) throw "Get error from server";
                var r = e.content;
                if (void 0 === r) throw "Get empty data from server";
                return {
                    panoId: r.pid,
                    panoX: r.x / 100,
                    panoY: r.y / 100
                }
            },
            parseNavigationRouteData: function(e) {
                if (void 0 === e) throw "Get none from server";
                var o = e.result;
                if (void 0 !== o && 0 !== o.error) {
                    if (-3 === o.error) return -3;
                    throw "Get error from server"
                }
                var r = e.content;
                if (void 0 === r) throw "Get empty data from server";
                for (var a, n = r.points || [], t = [], i = 0, d = n.length; d > i; i++) a = n[i], a && t.push([a.panox / 100, a.panoy / 100]);
                return t
            }
        };
    return t
});;
define("pano:widget/module/PanoModule/CvsRender/base/Url.js", function(a, o, m) {
    BMap.httpsUrl = {
        TILE_BASE_URLS: ["gss0.bdstatic.com/5bwHcj7lABFU8t_jkk_Z1zRvfdw6buu", "gss0.bdstatic.com/5bwHcj7lABFV8t_jkk_Z1zRvfdw6buu", "gss0.bdstatic.com/5bwHcj7lABFS8t_jkk_Z1zRvfdw6buu", "gss0.bdstatic.com/5bwHcj7lABFT8t_jkk_Z1zRvfdw6buu", "gss0.bdstatic.com/5bwHcj7lABFY8t_jkk_Z1zRvfdw6buu"],
        TILE_ONLINE_URLS: ["gss0.bdstatic.com/8bo_dTSlR1gBo1vgoIiO_jowehsv", "gss0.bdstatic.com/8bo_dTSlRMgBo1vgoIiO_jowehsv", "gss0.bdstatic.com/8bo_dTSlRcgBo1vgoIiO_jowehsv", "gss0.bdstatic.com/8bo_dTSlRsgBo1vgoIiO_jowehsv", "gss0.bdstatic.com/8bo_dTSlQ1gBo1vgoIiO_jowehsv"],
        TIlE_PERSPECT_URLS: ["gss0.bdstatic.com/-OR1cTe9KgQFm2e88IuM_a", "gss0.bdstatic.com/-ON1cTe9KgQFm2e88IuM_a", "gss0.bdstatic.com/-OZ1cTe9KgQFm2e88IuM_a", "gss0.bdstatic.com/-OV1cTe9KgQFm2e88IuM_a"],
        geolocControl: "gsp0.baidu.com/8LkJsjOpB1gCo2Kml5_Y_D3",
        TILES_YUN_HOST: ["gsp0.baidu.com/-eR1bSahKgkFkRGko9WTAnF6hhy", "gsp0.baidu.com/-eN1bSahKgkFkRGko9WTAnF6hhy", "gsp0.baidu.com/-eZ1bSahKgkFkRGko9WTAnF6hhy", "gsp0.baidu.com/-eV1bSahKgkFkRGko9WTAnF6hhy"],
        traffic: "gsp0.baidu.com/7_AZsjOpB1gCo2Kml5_Y_DAcsMJiwa",
        iw_pano: "gss0.bdstatic.com/5LUZemba_QUU8t7mm9GUKT-xh_",
        message: "gsp0.baidu.com/7vo0bSba2gU2pMbgoY3K",
        baidumap: "gsp0.baidu.com/80MWsjip0QIZ8tyhnq",
        wuxian: "gsp0.baidu.com/6a1OdTeaKgQFm2e88IuM_a",
        pano: ["gss0.bdstatic.com/5LUZemba_QUU8t7mm9GUKT-xh_", "gss0.bdstatic.com/5LUZemfa_QUU8t7mm9GUKT-xh_", "gss0.bdstatic.com/5LUZemja_QUU8t7mm9GUKT-xh_"],
        main_domain_nocdn: {
            baidu: "gsp0.baidu.com/9_Q4sjOpB1gCo2Kml5_Y_D3",
            other: "api.map.baidu.com"
        },
        main_domain_cdn: {
            baidu: ["gss0.bdstatic.com/9_Q4vHSd2RZ3otebn9fN2DJv", "gss0.baidu.com/9_Q4vXSd2RZ3otebn9fN2DJv", "gss0.bdstatic.com/9_Q4vnSd2RZ3otebn9fN2DJv"],
            other: ["api.map.baidu.com"],
            webmap: ["gss0.baidu.com/6b1IcTe9R1gBo1vgoIiO_jowehsv"]
        },
        map_click: "gsp0.baidu.com/80MWbzKh2wt3n2qy8IqW0jdnxx1xbK",
        vector_traffic: "gss0.bdstatic.com/8aZ1cTe9KgQIm2_p8IuM_a"
    }, BMap.httpUrl = {
        TILE_BASE_URLS: ["shangetu0.map.bdimg.com", "shangetu1.map.bdimg.com", "shangetu2.map.bdimg.com", "shangetu3.map.bdimg.com", "shangetu4.map.bdimg.com"],
        TILE_ONLINE_URLS: ["online0.map.bdimg.com", "online1.map.bdimg.com", "online2.map.bdimg.com", "online3.map.bdimg.com", "online4.map.bdimg.com"],
        TIlE_PERSPECT_URLS: ["d0.map.baidu.com", "d1.map.baidu.com", "d2.map.baidu.com", "d3.map.baidu.com"],
        geolocControl: "loc.map.baidu.com",
        TILES_YUN_HOST: ["g0.api.map.baidu.com", "g1.api.map.baidu.com", "g2.api.map.baidu.com", "g3.api.map.baidu.com"],
        traffic: "its.map.baidu.com:8002",
        iw_pano: "mapsv0.bdimg.com",
        message: "j.map.baidu.com",
        baidumap: "map.baidu.com",
        wuxian: "wuxian.baidu.com",
        pano: ["mapsv0.bdimg.com", "mapsv1.bdimg.com", "mapsv1.bdimg.com"],
        main_domain_nocdn: {
            baidu: "api.map.baidu.com"
        },
        main_domain_cdn: {
            baidu: ["api0.map.bdimg.com", "api1.map.bdimg.com", "api2.map.bdimg.com"],
            webmap: ["webmap0.map.bdimg.com"]
        },
        map_click: "mapclick.map.baidu.com",
        vector_traffic: "or.map.bdimg.com"
    }, BMap.urlType = {
        0: {
            proto: "http://",
            domain: BMap.httpUrl
        },
        1: {
            proto: "https://",
            domain: BMap.httpsUrl
        },
        2: {
            proto: "https://",
            domain: BMap.httpsUrl
        }
    }, BMap.urlStr = window.HOST_TYPE || "0", BMap.url = BMap.urlType[BMap.urlStr], BMap.url.proto = location.protocol + "//", BMap.mapUrl = BMap.url.proto + BMap.url.domain.baidumap + "/", BMap.apiUrl = BMap.url.proto + ("2" == BMap.urlStr ? BMap.url.domain.main_domain_nocdn.other : BMap.url.domain.main_domain_nocdn.baidu) + "/", BMap.apiUrlCdn = BMap.url.proto + ("2" == BMap.urlStr ? BMap.url.domain.main_domain_cdn.other[0] : BMap.url.domain.main_domain_cdn.baidu[0]) + "/", BMap.apiIconUrl = BMap.url.proto + ("2" == BMap.urlStr ? BMap.url.domain.main_domain_cdn.webmap[0] : BMap.url.domain.main_domain_cdn.webmap[0]) + "/", BMap.getServerUrl = function(a, o) {
        var m, i;
        switch (o = o || "", a) {
            case "main_domain_nocdn":
                m = BMap.apiUrl + o;
                break;
            case "main_domain_cdn":
                m = BMap.apiUrlCdn + o;
                break;
            default:
                i = BMap.url.domain[a], "[object Array]" == Object.prototype.toString.call(i) ? (m = [], baidu.array.each(i, function(a, i) {
                    m[i] = BMap.url.proto + a + "/" + o
                })) : m = BMap.url.proto + BMap.url.domain[a] + "/" + o
        }
        return m
    }, m.exports = BMap
});;
define("pano:widget/module/PanoModule/CvsRender/base/Pixel.js", function(t, i, e) {
    function s(t, i) {
        this.x = t || 0, this.y = i || 0, this.x = this.x, this.y = this.y
    }
    s.prototype.equals = function(t) {
        return t && t.x == this.x && t.y == this.y
    }, e.exports = s
});;
define("pano:widget/module/PanoModule/CvsRender/base/Animation.js", function(t, n, i) {
    function e(t) {
        var n = {
            duration: 1e3,
            fps: 30,
            delay: 0,
            transition: r.linear,
            onStop: function() {}
        };
        if (this._anis = [], t)
            for (var i in t) n[i] = t[i];
        if (this._opts = n, o(n.delay)) {
            var s = this;
            setTimeout(function() {
                s.start()
            }, n.delay)
        } else n.delay != e.INFINITE && this.start()
    }

    function s(t) {
        return "function" == typeof t
    }

    function o(t) {
        return "number" == typeof t
    }

    function a() {
        return (new Date).getTime()
    }
    e.INFINITE = "INFINITE", e.prototype.start = function() {
        this._beginTime = a(), this._endTime = this._beginTime + this._opts.duration, this._launch()
    }, e.prototype.add = function(t) {
        this._anis.push(t)
    }, e.prototype._launch = function() {
        var t = this,
            n = a();
        if (n >= t._endTime) {
            if (s(t._opts.render) && t._opts.render(t._opts.transition(1)), s(t._opts.finish) && t._opts.finish(), t._anis.length > 0) {
                var i = t._anis[0];
                i._anis = [].concat(t._anis.slice(1)), i.start()
            }
        } else t.schedule = t._opts.transition((n - t._beginTime) / t._opts.duration), s(t._opts.render) && t._opts.render(t.schedule), t.terminative || (t._timer = setTimeout(function() {
            t._launch()
        }, 1e3 / t._opts.fps))
    }, e.prototype.stop = function(t) {
        this.terminative = !0;
        for (var n = 0; n < this._anis.length; n++) this._anis[n].stop(), this._anis[n] = null;
        this._anis.length = 0, this._timer && (clearTimeout(this._timer), this._timer = null), this._opts.onStop(this.schedule), t && (this._endTime = this._beginTime, this._launch())
    }, e.prototype.cancel = function() {
        this._timer && clearTimeout(this._timer), this._endTime = this._beginTime, this.schedule = 0
    }, e.prototype.setFinishCallback = function(t) {
        this._anis.length > 0 ? this._anis[this._anis.length - 1]._opts.finish = t : this._opts.finish = t
    };
    var r = {
        linear: function(t) {
            return t
        },
        reverse: function(t) {
            return 1 - t
        },
        easeInQuad: function(t) {
            return t * t
        },
        easeInCubic: function(t) {
            return Math.pow(t, 3)
        },
        easeOutQuad: function(t) {
            return -(t * (t - 2))
        },
        easeOutCubic: function(t) {
            return Math.pow(t - 1, 3) + 1
        },
        easeInOutQuad: function(t) {
            return .5 > t ? t * t * 2 : -2 * (t - 2) * t - 1
        },
        easeInOutCubic: function(t) {
            return .5 > t ? 4 * Math.pow(t, 3) : 4 * Math.pow(t - 1, 3) + 1
        },
        easeInOutSine: function(t) {
            return (1 - Math.cos(Math.PI * t)) / 2
        }
    };
    r["ease-in"] = r.easeInQuad, r["ease-out"] = r.easeOutQuad, i.exports = e
});;
define("pano:widget/module/PanoModule/CvsRender/PanoramaLinksRenderer.js", function(t, i, e) {
    function s(t) {
        this._pano = t, t._linksRenderer = this, this._arrowDoms = [], this._arrowSkewDoms = [], this._arrowShadowDoms = [], this._arrowShadowSkewDoms = [], this._hitDoms = [], this._hitSkewDoms = [], this._textDoms = [], this._textSkewDoms = [], this._textPathDoms = [], this._containerX = 0, this._containerY = 0, this._offsetLeft = 0, this._offsetTop = 0, this.mouseDownTime = 0, this.coord = {}, this.longJumpflag = !1, this.mouseonme = !1, o.isSvg() ? this._svg = this._createSvg() : o.isCanvas() ? (this._canvas = this._createCanvas(), this._ctx = this._canvas.getContext("2d"), this._bindCanvasClickEvent(), this._hitPoints = []) : o.isVml() && (this._vmlGroup = this._createVml()), this._id = null, this.ARROW_HIGHLIGHT_COLOR = "#549eef", this._cachedData = {}, this._linkVisible = !0, this._enableClickOnRoad = !0, this._bind()
    }
    var o = t("pano:widget/module/PanoModule/CvsRender/base/Util.js"),
        a = t("pano:widget/module/PanoModule/CvsRender/base/Point.js");
    s.ARROW_PATH = [
        [0, -11],
        [4, -6.5],
        [2, -6.5],
        [2, -3],
        [-2, -3],
        [-2, -6.5],
        [-4, -6.5]
    ], s.HIT_PATH = [
        [5, -2],
        [5, -12],
        [-5, -12],
        [-5, -2]
    ], s.ARROW_PATH_VML = [
        [0, -110],
        [40, -65],
        [20, -65],
        [20, -30],
        [-20, -30],
        [-20, -65],
        [-40, -65]
    ], s.HIT_PATH_VML = [
        [45, -20],
        [45, -120],
        [-45, -120],
        [-45, -20]
    ], s.DIR_TEXT = ["北", "东北", "东", "东南", "南", "西南", "西", "西北", "北"], baidu.extend(s.prototype, {
        _createSvg: function() {
            var t = o.create("svg", {
                    version: "1.1",
                    overflow: "hidden"
                }, "http://www.w3.org/2000/svg"),
                i = this._pano,
                e = i.getContainer().clientWidth,
                s = i.getContainer().clientHeight;
            return this._svg = t, this._containerX = e, this._containerY = s, this._offsetLeft = i.getContainer().offsetLeft || 0, this._offsetTop = i.getContainer().offsetTop || 0, this._setSvgSize(e, s), t.style.position = "absolute", t.style.left = "0", t.style.top = "0", t.style.WebkitUserSelect = t.style.MsUserSelect = t.style.MozUserSelect = "none", i._linksContainer.appendChild(t), o.isSvg() && this.setLongJump(t), t
        },
        setLongJump: function(t) {
            var i = this,
                e = o.create("ellipse", {
                    fill: "white",
                    "fill-rule": "evenodd",
                    "fill-opacity": "0.4",
                    cx: "100",
                    cy: "100",
                    rx: "20",
                    ry: "20"
                }, "http://www.w3.org/2000/svg");
            e.setAttribute("visibility", "hidden"), this.ellipse = e, t.appendChild(e);
            var s = this._pano.getContainer();
            baidu.on(s, "mousedown", function(t) {
                i.mouseDownTime = (new Date).valueOf(), i.saveDown(t.offsetX || t.layerX || 0, t.offsetY || t.layerY || 0), o.stopBubble(t)
            }), baidu.on(s, "mouseup", function() {
                var t = (new Date).valueOf(),
                    e = t - i.mouseDownTime;
                200 > e && i.longJumpflag && i.click(), i.mouseDownTime = 0
            }), baidu.on(s, "mousemove", function(t) {
                i.saveMove(t.offsetX || t.layerX || 0, t.offsetY || t.layerY || 0), i.setEllipse(t.offsetX || t.layerX || 0, t.offsetY || t.layerY || 0)
            }), baidu.browser.firefox ? baidu.on(s, "mouseout", function(t) {
                var e = t.clientX || t.pageX || 0,
                    s = t.clientY || t.pageY || 0;
                e -= i._offsetLeft, s -= i._offsetTop;
                var o = Math.abs(Math.abs(e - i._containerX / 2) - i._containerX / 2);
                (40 > o || Math.abs(Math.abs(s - i._containerY / 2) - i._containerY / 2) < 40) && i.ellipse.setAttribute("visibility", "hidden")
            }) : baidu.on(s, "mouseout", function() {
                i.ellipse.setAttribute("visibility", "hidden")
            }), i._pano.addEventListener("hide_ellipse", function() {
                i.mouseonme = !0
            }), i._pano.addEventListener("show_ellipse", function() {
                i.mouseonme = !1
            })
        },
        _createCanvas: function() {
            var t = o.create("canvas"),
                i = this._pano,
                e = i.getContainer().clientWidth,
                s = i.getContainer().clientHeight;
            this._canvas = t, t.width = e, t.height = s;
            var a = t.style;
            return a.position = "absolute", a.top = a.left = "0", a.width = e + "px", a.height = s + "px", a.WebkitTapHighlightColor = "rgba(0, 0, 0, 0)", i._linksContainer.appendChild(t), t
        },
        _createVml: function() {
            var t = this._pano.getContainer(),
                i = t.clientWidth,
                e = t.clientHeight,
                s = ['<v:group style="behavior:url(#default#VML);z-index:1;width:', i + "px;height:" + e + 'px;position:absolute;left:0;top:0;"', 'coordsize="' + i + "," + e + '" ', 'coordorigin="-' + i / 2 + ",-" + .75 * e + '">', "</v:group>"].join("");
            return beforeEndHTML(this._pano._linksContainer, s)
        },
        _bind: function() {
            var t = this,
                i = t._pano;
            i.addEventListener("size_changed", function(i) {
                var e = i.size;
                t.setSize(e.width, e.height), t._cachedData = {}
            }), i.addEventListener("zoom_changed_inner", function() {
                t._cachedData = {}
            })
        },
        setSize: function(t, i) {
            if (o.isSvg()) this._setSvgSize(t, i);
            else if (isCanvas()) {
                var e = this._canvas;
                e.width = t, e.height = i, e.style.width = t + "px", e.style.height = i + "px"
            }
        },
        _setSvgSize: function(t, i) {
            this._svg && (this._svg.setAttribute("width", t + "px"), this._svg.setAttribute("height", i + "px"), this._svg.setAttribute("viewBox", "0 0 " + t + " " + i), this._containerX = t, this._containerY = i)
        },
        setData: function(t) {
            this._data = t
        },
        render: function(t, i, e, s) {
            if (!this._data) return void(o.isSvg() ? this._prepareDoms(null, []) : (this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height), this._hitPoints.length = 0));
            this._pov = t, this._zoom = i, this._tileSize = e;
            var a, n, r, h, l, d, _, u = (t.heading + 360) % 360,
                c = t.pitch,
                v = this._pano,
                r = this._data.tiles;
            if (this._cachedData[this._data.id]) {
                var p = this._cachedData[this._data.id];
                a = p.containerWidth, n = p.containerHeight, h = p.totalCols, l = p.totalRows, d = p.dirSingle, _ = p.anglePerPixel
            } else a = v.getContainer().clientWidth, n = v.getContainer().clientHeight, h = r.getTotalCols(i), l = r.getTotalRows(i), d = 360 / h, _ = 360 / (h * e), this._cachedData[this._data.id] = {
                containerWidth: a,
                containerHeight: n,
                totalCols: h,
                totalRows: l,
                dirSingle: d,
                anglePerPixel: _
            };
            var f = v.getZoom() + 1,
                g = .75 * n + c / _ * 1 / f;
            n / 2 > g && (g = n / 2);
            var m = 90 - c,
                w = m / 200,
                b = 10;
            o.isSvg() ? this._prepareDoms(this._data.id, this._data.links) : isCanvas() ? (this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height), this._data.id != this._id && (this._hitPoints.length = 0)) : isVml() && (b = 36, this._prepareVmlDoms(this._data.id, this._data.links));
            for (var k = 0; k < this._data.links.length; k++) {
                var y = this._data.links[k].dir - u;
                y = (360 + y) % 360;
                var D = a / 2 + 50 * Math.sin(o.toRadian(y)),
                    x = g - 60 * Math.cos(o.toRadian(y)) * w;
                if (o.isSvg()) this._drawArrow(k, [a / 2, g], [b, b * w], y), this._drawText(k, [D, x]);
                else if (isCanvas()) {
                    var C = "#444";
                    s == k && (C = this.ARROW_HIGHLIGHT_COLOR), this._drawArrowCanvas([a / 2, g + 3], [b, b * w], y, "#000", .4), this._drawArrowCanvas([a / 2, g], [b, b * w], y, "#fff", .95, C), this._drawTextCanvas(k, [D, x], C);
                    var M = [a / 2 + 60 * Math.sin(o.toRadian(y)), g - 50 * Math.cos(o.toRadian(y)) * w];
                    this._hitPoints[k] = [Math.round(M[0]), Math.round(M[1])]
                } else if (isVml()) {
                    var S = 1;
                    c > -30 && (S = 80 > c - -30 ? S + Math.tan(o.toRadian(c - -30)) : S + 6);
                    var T = -Math.sin(o.toRadian(Math.min(c, -30))) / S;
                    this._vmlGroup.coordorigin = Math.round(-a / 2) + "," + Math.round(-g + 40), this._drawArrowVml(k, y, T)
                }
            }
        },
        _prepareDoms: function(t, i) {
            if (t != this._id) {
                if (this._id = t, linksCount = i.length, linksCount > this._arrowDoms.length) {
                    for (var e = linksCount - this._arrowDoms.length, a = this._svg, n = 0; e > n; n++) {
                        var r = o.create("path", {
                                fill: "black",
                                "fill-rule": "evenodd",
                                "fill-opacity": "0.4",
                                stroke: "none"
                            }, "http://www.w3.org/2000/svg"),
                            h = o.create("path", {
                                fill: "white",
                                "fill-rule": "evenodd",
                                "fill-opacity": "0.9",
                                stroke: "#444",
                                "stroke-width": "0.2",
                                "stroke-linecap": "round"
                            }, "http://www.w3.org/2000/svg"),
                            l = ["M"],
                            d = s.ARROW_PATH;
                        l.push(d[0][0]), l.push(d[0][1]);
                        for (var _ = 1; _ < d.length; _++) l.push("L"), l.push(d[_][0]), l.push(d[_][1]);
                        l.push(d[0][0]), l.push(d[0][1]), r.setAttribute("d", l.join(" ")), this._arrowShadowDoms.push(r), a.appendChild(r), h.setAttribute("d", l.join(" ")), this._arrowDoms.push(h), a.appendChild(h);
                        var u = o.create("text", {
                            fill: "#444",
                            "fill-rule": "evenodd",
                            stroke: "none",
                            "font-size": "16px",
                            "font-family": "arial",
                            "text-anchor": "middle",
                            "alignment-baseline": "middle"
                        }, "http://www.w3.org/2000/svg");
                        u.style.WebkitUserSelect = u.style.MsUserSelect = u.style.MozUserSelect = "none", this._textDoms.push(u), a.appendChild(u);
                        var c = o.create("path", {
                                fill: "white",
                                "fill-rule": "evenodd",
                                "fill-opacity": "0",
                                stroke: "none",
                                cursor: "pointer"
                            }, "http://www.w3.org/2000/svg"),
                            v = this;
                        c._arrowDom = h, c._textDom = u, c.style.MozUserSelect = "none";
                        var p = ["M"],
                            f = s.HIT_PATH;
                        for (p.push(f[0][0]), p.push(f[0][1]), _ = 1; _ < f.length; _++) p.push("L"), p.push(f[_][0]), p.push(f[_][1]);
                        c.setAttribute("d", p.join(" "));
                        var g = "mousedown";
                        baidu.on(c, g, function(t) {
                            v._touchStartPov = {
                                heading: v._pov.heading,
                                pitch: v._pov.pitch
                            }, v._curHit = this, this._arrowDom.setAttribute("stroke", v.ARROW_HIGHLIGHT_COLOR), this._textDom.setAttribute("fill", v.ARROW_HIGHLIGHT_COLOR), o.preventDefault(t)
                        }), this._hitDoms.push(c), a.appendChild(c), baidu.on(c, "mousemove", function() {
                            v.mouseonme = !0
                        }), baidu.on(c, "mouseout", function() {
                            v.mouseonme = !1
                        })
                    }
                    var m = "mouseup";
                    baidu.on(this._pano.getContainer(), m, function(t) {
                        if (v._curHit) {
                            if (v._pov.heading == v._touchStartPov.heading && v._pov.pitch == v._touchStartPov.pitch) {
                                var i = v._curHit.getAttribute("sid");
                                i && v._pano.dispatchEvent({
                                    type: "linkclick",
                                    data: i
                                }), v._touchStartX = v._touchStartY = null
                            }
                            v._curHit._arrowDom.setAttribute("stroke", "#444"), v._curHit._textDom.setAttribute("fill", "#444"), v._touchStartPov = null, v._curHit = null, t.stopPropagation()
                        }
                    })
                }
                for (var n = 0; n < this._arrowDoms.length; n++) {
                    var w = "";
                    if (linksCount > n) {
                        var b = this._textDoms[n];
                        b.childNodes.length > 0 && b.removeChild(b.childNodes[0]);
                        var u = this._getDirText(i[n].dir);
                        b.appendChild(document.createTextNode(u)), this._hitDoms[n].setAttribute("sid", i[n].id)
                    } else w = "none";
                    this._arrowDoms[n].style.display = w, this._arrowShadowDoms[n].style.display = w, this._textDoms[n].style.display = w, this._hitDoms[n].style.display = w
                }
            }
        },
        _bindCanvasClickEvent: function() {
            var t = this,
                i = t._pano;
            baidu.on(this._canvas, "touchstart", function(i) {
                t._touchStartPov = {
                    heading: t._pov.heading,
                    pitch: t._pov.pitch
                };
                var e = getPosition(t._canvas),
                    s = i.touches[0].clientX - e.left,
                    o = i.touches[0].clientY - e.top;
                t._hitLinkIndex = t.getHitLinkIndex(s, o), t.render(t._pov, t._zoom, t._tileSize, t._hitLinkIndex)
            }), baidu.on(this._canvas, "touchend", function() {
                t._pov.heading == t._touchStartPov.heading && t._pov.pitch == t._touchStartPov.pitch && t._data.links[t._hitLinkIndex] && (i.dispatchEvent(new BaseEvent("onlinkclick")), i.setId(t._data.links[t._hitLinkIndex].id)), t._hitLinkIndex = null
            })
        },
        getHitLinkIndex: function(t, i) {
            for (var e = 0; e < this._hitPoints.length; e++)
                if (Math.abs(t - this._hitPoints[e][0]) < 30 && Math.abs(i - this._hitPoints[e][1]) < 30) return e;
            return -1
        },
        _prepareVmlDoms: function(t, i) {
            if (t != this._id) {
                if (this._id = t, linksCount = i.length, linksCount > this._arrowDoms.length)
                    for (var e = linksCount - this._arrowDoms.length, o = (this._svg, 0); e > o; o++) {
                        for (var a = [], n = s.ARROW_PATH_VML, r = 0; r < n.length; r++) a.push(n[r][0]), a.push(n[r][1]);
                        a.push(n[0][0]), a.push(n[0][1]);
                        var h = ["<v:polyline ", 'points="' + a.join(" ") + '"', ' style="behavior:url(#default#VML);z-index:1;left:0;top:0;" stroked="false">', '<v:fill style="behavior:url(#default#VML)" color="black" opacity="0.5"></v:fill>', '<v:skew style="behavior:url(#default#VML)" on="true" origin="0,1.5" matrix="1,0,0,1,0,0" offset="0,0.05"></v:skew>', "</v:polyline>"].join(""),
                            l = beforeEndHTML(this._vmlGroup, h);
                        this._arrowShadowDoms.push(l), this._arrowShadowSkewDoms.push(l.getElementsByTagName("skew")[0]);
                        var d = ["<v:polyline ", 'points="' + a.join(" ") + '"', 'fillcolor="white" stroked="true" strokecolor="#444" strokeweight="1" ', ' style="behavior:url(#default#VML);z-index:2;left:0;top:0;">', '<v:fill style="behavior:url(#default#VML)" color="white" opacity="1"></v:fill>', '<v:skew style="behavior:url(#default#VML)" on="true" origin="0,1.5" matrix="1,0,0,1,0,0" offset="0,0"></v:skew>', "</v:polyline>"].join(""),
                            _ = beforeEndHTML(this._vmlGroup, d);
                        this._arrowDoms.push(_), this._arrowSkewDoms.push(_.getElementsByTagName("skew")[0]);
                        var u = [],
                            c = s.HIT_PATH_VML;
                        for (r = 0; r < c.length; r++) u.push(c[r][0]), u.push(c[r][1]);
                        var v = ['<v:polyline style="cursor:pointer;z-index:3;behavior:url(#default#VML);"', ' points="' + u.join(" ") + '" stroked="false">', '<v:fill style="behavior:url(#default#VML);" color="white" opacity="0"></v:fill>', '<v:skew style="behavior:url(#default#VML);" on="true" origin="0,1.2" ', 'matrix="1,0,0,1,0,0"></v:skew>', "</v:polyline>"].join(""),
                            p = beforeEndHTML(this._vmlGroup, v),
                            f = this;
                        baidu.on(p, "click", function(t) {
                            var i = t.srcElement.sid;
                            i && f._pano.setId(i)
                        }), this._hitDoms.push(p), this._hitSkewDoms.push(p.getElementsByTagName("skew")[0])
                    }
                for (var o = 0; o < this._arrowDoms.length; o++) {
                    var g = "";
                    linksCount > o ? this._hitDoms[o].sid = i[o].id : g = "none", this._arrowDoms[o].style.display = g, this._arrowShadowDoms[o].style.display = g, this._hitDoms[o].style.display = g
                }
            }
        },
        _drawArrow: function(t, i, e, s) {
            this._arrowDoms[t] && (this._arrowDoms[t].setAttribute("transform", "translate(" + i[0] + " " + i[1] + ")scale(" + e[0] + " " + e[1] + ")rotate(" + s + ")"), this._arrowShadowDoms[t].setAttribute("transform", "translate(" + i[0] + " " + (i[1] + 4) + ")scale(" + e[0] + " " + e[1] + ")rotate(" + s + ")"), this._hitDoms[t].setAttribute("transform", "translate(" + i[0] + " " + i[1] + ")scale(" + e[0] + " " + e[1] + ")rotate(" + s + ")"))
        },
        _drawText: function(t, i) {
            var e = this._textDoms[t];
            e.setAttribute("transform", "translate(" + i[0] + " " + i[1] + ")")
        },
        _drawArrowVml: function(t, i, e) {
            this._applyToDom(this._arrowSkewDoms[t], i, 0, e), this._applyToDom(this._arrowShadowSkewDoms[t], i, .6, e), this._applyToDom(this._hitSkewDoms[t], i, 0, e)
        },
        _applyToDom: function(t, i, e, s) {
            var a = o.toRadian(i);
            i = Math.cos(a), a = Math.sin(a), t.matrix = [Number(i).toFixed(4), Number(-a).toFixed(4), Number(a * s).toFixed(4), Number(i * s).toFixed(4), 0, 0].join(), t.offset = "0," + Math.round(50 * e) / 1e3
        },
        _drawArrowCanvas: function(t, i, e, a, n, r) {
            var h = this._ctx;
            h.save(), h.fillStyle = a, h.globalAlpha = n, h.translate(t[0], t[1]), h.scale(i[0], i[1]), h.rotate(o.toRadian(e)), h.beginPath();
            var l = s.ARROW_PATH;
            h.moveTo(l[0][0], l[0][1]);
            for (var d = 1; d < l.length; d++) h.lineTo(l[d][0], l[d][1]);
            h.closePath(), h.fill(), r && (h.lineWidth = "0.2", h.lineCap = "round", h.lineJoin = "round", h.strokeStyle = r, h.stroke()), h.restore()
        },
        _drawTextCanvas: function(t, i, e) {
            var s = this._ctx;
            s.save();
            var o = this._getDirText(this._data.links[t].dir);
            s.font = "16px sans-serif", s.textAlign = "center", s.textBaseline = "middle", s.fillStyle = e, s.fillText(o, i[0], i[1]), s.restore()
        },
        _getDirText: function(t) {
            t = (t + 360) % 360;
            var i = Math.ceil(Math.floor(t / 22.5) / 2);
            return s.DIR_TEXT[i]
        },
        goByTouchingOnRoad: function() {
            return 0
        },
        click: function() {
            var t = this;
            if (!(Math.abs(t.downX - t.moveX) > 2 || Math.abs(t.downY - t.downY) > 2)) {
                var i = this.coord;
                if (i) {
                    for (var e = this._data, s = e.links, o = this.getHeading(i.X, i.Z), n = -1, r = 30, h = 0, l = 0; l < s.length; l++) {
                        var d = s[l].dir - o;
                        h = Math.abs(d) > 180 ? s[l].dir > o ? 360 + o - s[l].dir : 360 - o + s[l].dir : Math.abs(d), r > h && (n = l, r = h)
                    }
                    if (29 > r) {
                        var _ = this._pano.getPosition(),
                            u = _.lat - 180 * i.X / Math.PI / 6378137,
                            c = _.lng + 180 * i.Z / Math.PI / 6378137;
                        this._pano.setPosition(new a(c, u))
                    }
                }
            }
        },
        saveDown: function(t, i) {
            this.downX = t, this.downY = i
        },
        saveMove: function(t, i) {
            this.moveX = t, this.moveY = i
        },
        setEllipse: function(t, i) {
            coord = this._pano.scene.getCoordbyPix(t, i), this.coord = coord;
            var e = this.ellipse;
            if (coord && !this.mouseonme) {
                e.setAttribute("cx", t), e.setAttribute("cy", i);
                var s = 2,
                    o = Math.abs(2 * coord.scenedist / (coord.dist - s) - 2 * coord.scenedist / (coord.dist + s)) / 2,
                    a = s * coord.scenedist / coord.dist;
                if (coord.dist > 4) {
                    if (a > 100) {
                        var n = a / 100;
                        a = 100, o /= n, o > a && (o = a)
                    }
                    e.setAttribute("rx", a), e.setAttribute("ry", o), e.setAttribute("visibility", "visible"), this.longJumpflag = !0
                } else this.longJumpflag = !1, e.setAttribute("visibility", "hidden")
            } else this.longJumpflag = !1, e.setAttribute("visibility", "hidden")
        },
        getHeading: function(t, i) {
            var e = 0;
            return t > 0 ? e = Math.atan(i / t) / Math.PI * 180 : 0 > t ? e = Math.atan(i / t) / Math.PI * 180 + 180 : 0 == t && (e = i > 0 ? 90 : -90), heading = 180 - e, heading > 360 ? heading -= 360 : 0 > heading && (heading += 360), heading
        },
        hide: function() {
            this._linkVisible = !1, this._pano._linksContainer && (this._pano._linksContainer.style.visibility = "hidden")
        },
        show: function() {
            this._linkVisible = !0, this._pano._linksContainer && (this._pano._linksContainer.style.visibility = "visible")
        },
        enableClickOnRoad: function() {
            this._enableClickOnRoad = !0
        },
        disableClickOnRoad: function() {
            this._enableClickOnRoad = !1
        }
    }), e.exports = s
});;
define("pano:widget/module/PanoModule/CvsRender/PanoramaOperation.js", function(e, t, n) {
    function i(e) {
        this._pano = e
    }
    var o = e("pano:widget/module/PanoModule/CvsRender/base/Util.js"),
        r = e("pano:widget/module/PanoModule/CvsRender/base/Const.js"),
        a = e("pano:widget/module/PanoModule/CvsRender/base/Pixel.js"),
        s = e("pano:widget/module/PanoModule/CvsRender/base/Animation.js");
    i.prototype._initialize = function() {
        function e(e, t) {
            A._panoTileRenderer._moving || (w = !0, E.dragAni && E.dragAni.stop(), v = e, h = t, m = A.getPov().heading, p = A.getPov().pitch, A.dispatchEvent(new g("ontouchstart")))
        }

        function t(e, t) {
            w && (A._showCover || (T = !0, E._isMoved || (E._isMoved = !0, E._dragStartTime = o.getCurrentTime()), d(e, t), _ = C - e, f = M - t, C = e, M = t, E._lastMoveTime = o.getCurrentTime()))
        }

        function n(e) {
            w && (w = !1, T || y || !Z || E._clickInRange && (E._clickInRange = !1, E._firstTouch ? (E._clickTimer && (clearTimeout(E._clickTimer), E._clickTimer = null), v - E._firstTouch.x < 10 && h - E._firstTouch.y < 10 && A.dispatchEvent(new g("ondblclick")), E._firstTouch = null) : (E._firstTouch = {
                x: v,
                y: h
            }, E._clickTimer = setTimeout(function() {
                var e = A._linksRenderer,
                    t = v,
                    n = h,
                    i = l(t, n);
                useWebGL() && (i.x *= 2, i.y *= 2), 0 === e.goByTouchingOnRoad(i.x, i.y) && A.dispatchEvent(new g("onclick")), E._firstTouch = null
            }, 400))), E._isMoved = !1, u(e), T = !1, y = !1)
        }

        function i(t) {
            e(t.clientX || t.pageX || 0, t.clientY || t.pageY || 0), P = t.target || t.srcElement, baidu.browser.ie && P.setCapture && P.setCapture(), E._prevCursor = A._tileContainer.style.cursor, A._tileContainer.style.cursor = "-webkit-grabbing", baidu.browser.ie || o.preventDefault(t)
        }

        function l(e, t) {
            for (var n = A._tileContainer, i = 0, o = 0; n.offsetParent;) i += n.offsetLeft, o += n.offsetTop, n = n.offsetParent;
            return {
                x: e - i,
                y: t - o
            }
        }

        function u(e) {
            if (e) {
                var t = o.getCurrentTime(),
                    n = t - E._lastMoveTime;
                if (!(n > 100 || n > 10 && Math.abs(_) < 10 && Math.abs(f) < 10)) {
                    var i, r;
                    i = e.clientX, r = e.clientY;
                    var l = new a(v, h),
                        u = new a(i, r),
                        c = [u.x - l.x > 0 ? 1 : -1, u.y - l.y > 0 ? 1 : -1],
                        g = 625,
                        P = 156,
                        w = Math.abs(l.x - u.x),
                        C = Math.abs(l.y - u.y),
                        M = 0,
                        b = 0;
                    if (0 == C) M = w;
                    else {
                        var x = Math.abs(l.x - u.x) / Math.abs(l.y - u.y);
                        b = Math.round(Math.sqrt(P * P / (1 + x * x))), M = Math.round(x * b)
                    } - 1 == c[0] && (M = -M), -1 == c[1] && (b = -b), E.dragAni && E.dragAni.stop(), m = A.getPov().heading, p = A.getPov().pitch, E.dragAni = new s({
                        duration: g,
                        fps: 60,
                        transition: function(e) {
                            return .3125 * e - .15625 * e * e
                        },
                        render: function(e) {
                            e = 6.4 * e;
                            var t = e * M,
                                n = e * b;
                            d(t, n)
                        },
                        finish: function() {
                            E.dragAni = null
                        },
                        onStop: function() {
                            E.dragAni = null
                        }
                    })
                }
            }
        }

        function d(e, t) {
            b = -e * E._anglePerPixel, x = t * E._anglePerPixel;
            var n = m + b,
                i = p + x;
            i > A._maxPitch && (i = A._maxPitch), i < A._minPitch && (i = A._minPitch), A.setPov({
                heading: n,
                pitch: i
            })
        }

        function c(e) {
            if (r.enableScrollWheelZoom) {
                var e = window.event || e,
                    t = new g("onmousewheel");
                t.trend = e.wheelDelta >= 0 || e.detail < 0;
                var n = new Date;
                if (220 > n - D) return void o.preventDefault(e);
                D = n;
                var i = e.srcElement || e.target;
                if ("path" == i.tagName) return void o.preventDefault(e); {
                    var a, s = A.getContainerSize(),
                        l = 180 / Math.pow(2, A.getZoom()),
                        u = l / s.width,
                        d = s.width / 2,
                        c = s.height / 2,
                        v = t.x - d,
                        h = c - t.y;
                    A.getPov().heading + v * u, A.getPov().pitch + h * u
                }
                if (1 == t.trend) {
                    if (A.getZoom() == r.MAX_ZOOM) return void o.preventDefault(e);
                    a = A.getZoom() + 2 / 3
                } else if (0 == t.trend) {
                    if (A.getZoom() == r.MIN_ZOOM) return void o.preventDefault(e);
                    a = A.getZoom() - 2 / 3
                }
                A.setZoom(a), o.preventDefault(e)
            }
        }
        if (!this._initialized) {
            var g = baidu.lang.Event;
            this._initialized = !0;
            var v, h, _, f, m, p, P, w = !1,
                C = 0,
                M = 0,
                b = 0,
                x = 0,
                T = !1,
                y = !1,
                A = this._pano;
            this._anglePerPixel = this._calcAnglePerPixel(), this._lastMoveTime = 0, this._dragStartTime = 0, this._isMoved = !1, this._firstTouch = null, this._scale = 1;
            var E = this,
                Z = !1;
            A._tileContainer.addEventListener("mousedown", i), baidu.on(A._tileContainer, "mousemove", function(e) {
                t((e.clientX || e.pageX || 0) - v, (e.clientY || e.pageY || 0) - h), o.stopAndPrevent(e)
            }), baidu.on(A._tileContainer, "mouseup", function(e) {
                o.stopBubble(e), n(e), baidu.browser.ie && P && P.releaseCapture && P.releaseCapture(), A._tileContainer.style.cursor = E._prevCursor || "-webkit-grab"
            }), A.addEventListener("zoom_changed_inner", function() {
                E._anglePerPixel = E._calcAnglePerPixel()
            }), A.addEventListener("size_changed", function() {
                E._anglePerPixel = E._calcAnglePerPixel()
            });
            var D = new Date;
            baidu.on(A.getContainer(), "mousewheel", c), window.addEventListener && A.getContainer().addEventListener("DOMMouseScroll", c, !1), this.distory = function() {
                A.getContainer().removeEventListener("mousedown", i), A.getContainer().removeEventListener("mousewheel", c, !1), A.getContainer().removeEventListener("DOMMouseScroll", c, !1)
            }
        }
    }, i.prototype._calcAnglePerPixel = function() {
        if (!this._data) return null;
        var e = this._pano,
            t = o.calcDisplayZoom(e.getContainerSize(), e.getZoom()),
            n = (t.imgZoom, t.displayTileSize, this._pano.getZoom()),
            i = this._pano.getContainerSize().height;
        return 180 / Math.pow(2, n) / i
    }, n.exports = i
});;
define("pano:widget/module/PanoModule/CvsRender/PanoramaTileData.js", function(e, o, t) {
    function n(e) {
        this.tileSize = new s(512, 512), this.worldSize = new s(512 * this.getTotalCols(i.TILE_MAX_ZOOM), 512 * this.getTotalRows(i.TILE_MAX_ZOOM)), this.centerHeading = 180, e = e || {};
        for (var o in e) this[o] = e[o]
    }
    var a = e("pano:widget/module/PanoModule/CvsRender/base/Url.js"),
        s = e("pano:widget/module/PanoModule/CvsRender/base/Size.js"),
        i = e("pano:widget/module/PanoModule/CvsRender/base/Const.js");
    n.TILE_BASE_URLS = a.getServerUrl("pano", "scape/");
    var r = encodeURIComponent(window.AUTH) || "",
        d = encodeURIComponent(window.SECKEY) || "";
    n.TILE_URL_TEMPLATE = "?qt=pdata&sid={sid}&pos={y}_{x}&z={zoom}&from=PC&auth=" + r + "&seckey=" + d, baidu.extend(n.prototype, {
        getTilesUrl: function(e, o, t) {
            var a = (o.x + o.y) % n.TILE_BASE_URLS.length;
            return n.TILE_BASE_URLS[a] + n.TILE_URL_TEMPLATE.replace("{sid}", e).replace("{x}", o.x).replace("{y}", o.y).replace("{zoom}", t)
        },
        getTotalRows: function(e) {
            return Math.pow(2, e - 2)
        },
        getTotalCols: function(e) {
            return 2 * this.getTotalRows(e)
        }
    }), t.exports = n
});;
define("pano:widget/module/PanoModule/CvsRender/Service.js", function() {});;
define("pano:widget/module/PanoModule/CvsRender/PanoramaTileCanvasRenderer.js", function(t, i, e) {
    function a(t) {
        this._pano = t, this._tileContainer = t._tileContainer, this._createContainer(), this._pano.scene = this, this._bind()
    }

    function s(t) {
        this.image = new Image, this.src = "", this.canvas = null, this.datastate = 0, this.localx = 0, this.localy = 0, this._pano = t;
        var i = this;
        this.imageonload = function() {
            -1 != i.src.indexOf("pos=0_0&z=1") && i._pano.dispatchEvent({
                type: "onthumbnail_complete"
            }), i.datastate = 2, i.canvas.drawComeingImage(i.localx, i.localy)
        }, this.image.onload = this.imageonload, this.setsrc = function(t) {
            if (this.src == t) {
                if (0 != this.datastate) return;
                i.imageonload()
            } else this.image.src = t, this.src = t, this.datastate = 1
        }, this.resetsrc = function() {
            this.image.src = "", this.src = "", this.datastate = 0
        }
    }

    function h(t, i, e, a, s, h) {
        this.pitch = 0, this.heading = 0, this.zoom = 2, this.picArray = i, this.aniPic = e, this.presentPic = [], this.cxt = t, this.aniflag = !1, this.scene = {
            w: a,
            h: s,
            dirNorth: 0,
            camPitch: 0,
            dist: 0,
            R: 512,
            heading: 0,
            pitch: 0,
            unit: 32,
            zoom: 0,
            scenezoom: 0,
            basicxyoffset: 0,
            xyoffset: 0,
            basiceover: 0,
            over: 0,
            basictemoffset: 0,
            temoffset: 0,
            poleroffset: 0
        }, this._pano = h, this.ifDataArrive = !1, this._adaptScene()
    }
    var n = t("pano:widget/module/PanoModule/CvsRender/base/Util.js");
    baidu.extend(a.prototype, {
        _bind: function() {
            var t = this,
                i = t._pano;
            i.addEventListener("size_changed", function(e) {
                t.setSize(i.getImageZoom(), i.getZoom(), e.size)
            })
        },
        setData: function(t, i, e) {
            t && (this._data = t, this._loadData(i, e))
        },
        _createContainer: function() {
            var t = this._tileContainer,
                i = n.create("canvas");
            i.width = t.clientWidth, i.height = t.clientHeight;
            var e = i.style;
            e.position = "absolute", e.left = e.top = "0", t.appendChild(i), this.canvascxt = i.getContext("2d"), this.picArray = [], this.aniPictures = [], this.canvasRender = new h(this.canvascxt, this.picArray, this.aniPictures, i.width, i.height, this._pano);
            var a = 0,
                o = 0;
            for (a = 0; 16 > a; a++)
                for (this.picArray[a] = [], o = 0; 8 > o; o++) {
                    var r = new s(this._pano);
                    r.localx = a, r.localy = o, r.canvas = this.canvasRender, this.picArray[a][o] = r
                }
            this.lastid = [], this._pano.canvasScene = this.canvasRender
        },
        render: function(t, i) {
            if (t && i) {
                var e = t.heading % 360,
                    a = t.pitch;
                this._getRenderPic({
                    heading: e,
                    pitch: a
                }, i), this.canvasRender.draw({
                    heading: e,
                    pitch: a
                }, i)
            }
        },
        _loadData: function(t, i) {
            this.canvasRender.dataLoad(), this._getAniPicture(this._data), this.canvasRender.getdirNorth(this._data), this._reshapeScene(t, i), this._getPictures(i, !0)
        },
        setZoom: function(t, i) {
            var e = this,
                a = !0;
            i == this.canvasRender.scene.zoom && (a = !1);
            this._reshapeScene(t, i);
            a && this._getPictures(i, !0), setTimeout(function() {
                e._getRenderPic()
            }, 1e3)
        },
        _getAniPicture: function(t) {
            var i = this,
                e = t.tiles,
                a = {};
            a.image = [], a.image[0] = new Image, a.image[0].src = e.getTilesUrl(t.id, {
                x: 0,
                y: 0
            }, 2), a.image[1] = new Image, a.image[1].src = e.getTilesUrl(t.id, {
                x: 1,
                y: 0
            }, 2), i.waitImage = 0, a.image[0].onload = function() {
                i.lowImageCome()
            }, a.image[1].onload = function() {
                i.lowImageCome()
            }, this.aniPictures[0] = a
        },
        lowImageCome: function() {
            this.waitImage++, 2 == this.waitImage && (this.canvasRender.setPresentPic(this.aniPictures[0].image), this.canvasRender.lowImageCome())
        },
        _getRenderPic: function(t, i) {
            if (this._data && this._data.tiles)
                for (var e = this._data.tiles, a = [], i = i || this.canvasRender.scene.zoom, a = (Math.pow(2, i - 1), Math.pow(2, i - 2), this.picArray), s = this.canvasRender.getBound(t), h = s.uplimit, n = s.downlimit, o = s.leftlimit, r = s.rightlimit, c = r > o ? r - o : 64 + r - o, p = 0, d = 0, f = 0; f < c + Math.pow(2, 7 - i);) {
                    for (var v = h; v < n + Math.pow(2, 7 - i);) {
                        var l = f + o;
                        if (l > 63 ? l %= 64 : 0 > l && (l += 64), p = Math.floor(l * Math.pow(2, i - 7)), d = Math.floor(v * Math.pow(2, i - 7)), p < Math.pow(2, i - 1) && d < Math.pow(2, i - 2) && 0 == a[p][d].datastate) {
                            var M = e.getTilesUrl(this._data.id, {
                                x: p,
                                y: d
                            }, i);
                            a[p][d].setsrc(M)
                        }
                        v += Math.pow(2, 7 - i)
                    }
                    f += Math.pow(2, 7 - i)
                }
        },
        _getPictures: function(t, i) {
            var e = !1;
            if (i && (e = !0), !e) {
                if (!this.zoom_changedflag) return;
                this.zoom_changedflag = !1
            }
            if (this._data && this._data.tiles) {
                for (var a = this._data.tiles, s = [], h = Math.pow(2, t - 1), n = Math.pow(2, t - 2), s = this.picArray, o = 0; h > o; o++)
                    for (var r = 0; n > r; r++) s[o][r].resetsrc();
                for (var c = this.canvasRender.getBound(), p = c.uplimit, d = c.downlimit, f = c.leftlimit, v = c.rightlimit, l = v > f ? v - f : 64 + v - f, M = 0, g = 0, o = 0; o < l + Math.pow(2, 7 - t);) {
                    for (var r = p; r < d + Math.pow(2, 7 - t);) {
                        var m = o + f;
                        if (m > 63 ? m %= 64 : 0 > m && (m += 64), M = Math.floor(m * Math.pow(2, t - 7)), g = Math.floor(r * Math.pow(2, t - 7)), M < Math.pow(2, t - 1) && g < Math.pow(2, t - 2)) {
                            var w = a.getTilesUrl(this._data.id, {
                                x: M,
                                y: g
                            }, t);
                            s[M][g].setsrc(w)
                        }
                        r += Math.pow(2, 7 - t)
                    }
                    o += Math.pow(2, 7 - t)
                }
            }
        },
        setSize: function(t, i, e) {
            t != this.canvasRender.scene.zoom && (this.zoom_changedflag = !0), this.canvasRender.resize(t, i, e), this._getPictures(t), this._getRenderPic(), this.canvasRender.refresh()
        },
        _reshapeScene: function(t, i) {
            var e = !1;
            return i == this.canvasRender.scene.zoom ? this.zoom_changedflag = !1 : (this.zoom_changedflag = !0, i < this.canvasRender.scene.zoom && (e = !0)), this.canvasRender.reshapeScene(t, i), e
        },
        getOverlayProject: function(t) {
            return this.canvasRender.getPovbyPoint(t)
        },
        getCoordbyPix: function(t, i) {
            return this.canvasRender.getCoordbyPix(t, i)
        },
        getSceneDist: function() {
            return this.canvasRender.scene.dist
        }
    }), baidu.extend(h.prototype, {
        _adaptScene: function() {
            if (baidu.browser.chrome) {
                var t = navigator.userAgent.substr(navigator.userAgent.indexOf("Chrome"), 12);
                t += "1";
                var i = /[1-9][0-9]*/,
                    e = Number(i.exec(t)[0]);
                e > 27 ? (this.scene.basicxyoffset = 1 / 128, this.scene.poleroffset = 2) : (this.scene.basicxyoffset = 1 / 64, this.scene.poleroffset = 4), this.scene.over = 0, this.scene.temoffset = 2
            } else baidu.browser.ie ? (this.scene.basicxyoffset = 1 / 128, this.scene.over = 0, this.scene.temoffset = 6, this.scene.poleroffset = 2) : baidu.browser.firefox ? (this.scene.basicxyoffset = 1 / 128, this.scene.over = 0, this.scene.temoffset = 4, this.scene.poleroffset = 2) : baidu.browser.safari ? (this.scene.basicxyoffset = 1 / 128, this.scene.over = 0, this.scene.temoffset = 4, this.scene.poleroffset = 2) : (this.scene.basicxyoffset = 1 / 128, this.scene.over = 0, this.scene.temoffset = 4, this.scene.poleroffset = 2)
        },
        setPresentPic: function(t) {
            this.presentPic = t
        },
        getDist: function() {
            var t = this.scene,
                i = Math.PI / Math.pow(2, this.scene.scenezoom);
            i > Math.PI / 2 + .1 && (i = 2 * Math.PI / 3);
            var e = i / 2,
                a = t.w / 2 / Math.tan(e);
            return a
        },
        resize: function(t, i, e) {
            var a = this.scene;
            a.w = e.width, a.h = e.height, this.cxt.canvas.width = e.width, this.cxt.canvas.height = e.height, a.zoom = t, a.scenezoom = i, a.dist = this.getDist(), a.unit = 16 * Math.pow(2, t - 2), a.pow_1 = Math.pow(2, t - 1), a.pow_2 = Math.pow(2, t - 2), a.pow_clearlevel_zoom = Math.pow(2, 7 - t)
        },
        reshapeScene: function(t, i) {
            var e = this.scene;
            if (0 == this.scene.dist) e.zoom = i, e.scenezoom = t, e.dist = this.getDist(), e.unit = 16 * Math.pow(2, i - 2), e.pow_1 = Math.pow(2, i - 1), e.pow_2 = Math.pow(2, i - 2), e.pow_clearlevel_zoom = Math.pow(2, 7 - i), e.xyoffset = e.basicxyoffset * Math.pow(2, -t);
            else {
                if (t == e.scenezoom && i == e.zoom) return;
                this.aniflag = !0;
                var a = this.scene.dist;
                e.unit = 16 * Math.pow(2, i - 2), e.zoom = i, e.scenezoom = t, e.pow_1 = Math.pow(2, i - 1), e.pow_2 = Math.pow(2, i - 2), e.pow_clearlevel_zoom = Math.pow(2, 7 - i);
                var s = (this.getDist() - a) / 32;
                this._pano.hideOverlays(), this._zoomChangeAni(0, s), e.xyoffset = e.basicxyoffset * Math.pow(2, -t)
            }
        },
        getdirNorth: function(t) {
            this.scene.heading -= this.scene.dirNorth / 180 * Math.PI, this.scene.dirNorth = t.tiles.dirNorth, this.scene.heading += t.tiles.dirNorth / 180 * Math.PI, this.scene.camPitch = t.tiles.pitch || 0
        },
        _zoomChangeAni: function(t, i) {
            var e = this;
            if (5 > t) this.scene.dist += i * Math.pow(2, t), this._drawZoomChange(), setTimeout(function() {
                e._zoomChangeAni(t + 1, i)
            }, 0);
            else if (5 == t) {
                this.aniflag = !1;
                var a = this.scene.zoom;
                this.scene.dist = this.getDist(), this.scene.unit = 16 * Math.pow(2, a - 2), this.scene.pow_1 = Math.pow(2, a - 1), this.scene.pow_2 = Math.pow(2, a - 2), this.scene.pow_clearlevel_zoom = Math.pow(2, 7 - a), this._pano.showOverlays(), this.refresh()
            }
        },
        povChangeAni: function(t, i) {
            this.aniflag = !0;
            var e = this.scene;
            this.nextdata = {
                data: t,
                assist: i
            };
            var a = this,
                s = (i.lastMC, i.nextMC, 0);
            a.nextdata.distance = s;
            var h = Math.cos((t.dir + e.dirNorth) / 180 * Math.PI),
                n = -Math.sin((t.dir + e.dirNorth) / 180 * Math.PI);
            h = 0, n = 0, this._pano.hideOverlays(), a._drawPovChange({
                index: 1,
                deltax: h,
                deltaz: n
            })
        },
        drawComeingImage: function(t, i) {
            if (!this.aniflag && this.ifDataArrive)
                if (this.scene.scenezoom > 1) this.refresh();
                else {
                    var e = this.scene,
                        a = e.unit,
                        s = 512 / a,
                        h = 1,
                        n = e.pow_clearlevel_zoom,
                        o = Math.cos(e.pitch),
                        r = Math.cos(e.heading),
                        c = Math.sin(e.heading),
                        p = -e.dist * o * r,
                        d = e.dist * Math.sin(e.pitch),
                        f = e.dist * o * c;
                    e.Xsm = p, e.Ysm = d, e.Zsm = f, e.cosheading = r, e.sinheading = c;
                    for (var v = 0; s > v; v++)
                        for (var l = 0; s > l; l++) {
                            var M = {
                                    x: v * a,
                                    y: l * a - h
                                },
                                g = {
                                    x: v * a - h,
                                    y: l * a
                                },
                                m = {
                                    x: v * a - h,
                                    y: l * a + a + h
                                },
                                w = {
                                    x: v * a + a + h,
                                    y: l * a - h
                                },
                                x = {
                                    x: v * a + a + h,
                                    y: l * a + a
                                },
                                u = {
                                    x: v * a + a,
                                    y: l * a + a + h
                                },
                                P = {
                                    point1: M,
                                    point2: m,
                                    point3: x
                                },
                                y = {
                                    point1: g,
                                    point2: w,
                                    point3: u
                                };
                            if (0 == v) var _ = -1;
                            else if (v == n - 1) var _ = 1;
                            if (0 == l) var I = -1;
                            else if (l == n - 1) var I = 1;
                            this.drawTriLeftDown(P, t, i, e.zoom, _, I), this.drawTriRightUp(y, t, i, e.zoom, _, I)
                        }
                }
        },
        _drawPovChange: function() {
            var t = this.scene;
            this.cxt.clearRect(0, 0, t.w, t.h);
            t.heading -= t.dirNorth / 180 * Math.PI, t.dirNorth = this.nextdata.assist.prenorth, t.heading += t.dirNorth / 180 * Math.PI, this.presentPic = this.nextdata.data.image, this.aniflag = !1, this._pano.showOverlays(), this.refresh()
        },
        _aniPoint2DtoSphereto2D: function(t, i, e, a, s) {
            var h = t.x,
                n = t.y,
                o = {
                    w: 512,
                    h: 512
                },
                r = this.scene,
                c = (.5 * t.x / o.w + i / 2) * Math.PI * 2,
                p = (.5 - t.y / o.h) * Math.PI,
                d = (r.heading, r.dist),
                f = (r.pitch, Math.cos(p)),
                v = Math.sin(Math.abs(p));
            .4 > v ? v = .4 : v > .98 && (v = r.poleroffset), c += a * v, p += s * v;
            var l = -f * Math.cos(c),
                M = Math.sin(p),
                g = f * Math.sin(c),
                m = r.cosheading,
                w = r.sinheading,
                x = r.Xsm,
                u = r.Ysm,
                P = r.Zsm,
                y = x * l + M * u + g * P;
            0 > y && (y = !1);
            var _ = d * d / y,
                h = _ * l,
                n = _ * M,
                I = _ * g,
                D = h - x,
                z = n - u,
                T = I - P,
                b = Math.pow(D, 2) + Math.pow(z, 2) + Math.pow(T, 2),
                R = Math.sqrt(b);
            if (0 == b) var A = 0,
                C = 0;
            else {
                var S = (D * w + T * m) / R;
                S > 1 ? S = 1 : -1 > S && (S = -1);
                var N = Math.acos(S),
                    U = D * m * u + z * w * P - z * m * x - T * u * w;
                0 > U && (N = 2 * Math.PI - N);
                var A = R * Math.cos(N),
                    C = R * Math.sin(N)
            }
            return {
                x: r.w / 2 + A,
                y: r.h / 2 - C
            }
        },
        drawAniTriRightUp: function(t, i, e, a, s, h) {
            var n = this.cxt,
                o = 0,
                r = 0,
                c = 0,
                p = 0,
                d = this.scene.xyoffset;
            a && (1 == a ? r = d : -1 == a && (o = d)), s && (-1 == s ? c = d : 1 == s && (p = d));
            var f = this.scene.over,
                v = this._aniPoint2DtoSphereto2D(t.point1, i, e, -f - o, c, h);
            if (!v) return !1;
            var l = this._aniPoint2DtoSphereto2D(t.point2, i, e, f + r, f + c, h);
            if (!l) return !1;
            var M = this._aniPoint2DtoSphereto2D(t.point3, i, e, r, -f - p, h);
            if (!M) return !1;
            var g = {
                point1: v,
                point2: l,
                point3: M
            };
            if (g) {
                var m = g.point1,
                    w = g.point2,
                    x = g.point3;
                n.save(), n.beginPath(), n.moveTo(m.x, m.y), n.lineTo(w.x, w.y), n.lineTo(x.x, x.y), n.closePath(), n.clip();
                var u = this.getTransMatrix(t, g);
                n.transform(u[0], u[1], u[2], u[3], u[4], u[5]), n.drawImage(this.presentPic[i], 0, 0), n.restore()
            }
        },
        drawAniTriLeftDown: function(t, i, e, a, s, h) {
            var n = this.cxt,
                o = 0,
                r = 0,
                c = 0,
                p = 0,
                d = this.scene.xyoffset;
            a && (1 == a ? r = d : -1 == a && (o = d)), s && (-1 == s ? c = d : 1 == s && (p = d));
            var f = this.scene.over,
                v = this._aniPoint2DtoSphereto2D(t.point1, i, e, -o, f + c, h);
            if (!v) return !1;
            var l = this._aniPoint2DtoSphereto2D(t.point2, i, e, -f - o, -f - p, h);
            if (!l) return !1;
            var M = this._aniPoint2DtoSphereto2D(t.point3, i, e, f + r, -p, h);
            if (!M) return !1;
            var g = {
                point1: v,
                point2: l,
                point3: M
            };
            if (g) {
                var m = g.point1,
                    w = g.point2,
                    x = g.point3;
                n.save(), n.beginPath(), n.moveTo(m.x, m.y), n.lineTo(w.x, w.y), n.lineTo(x.x, x.y), n.closePath(), n.clip();
                var u = this.getTransMatrix(t, g);
                n.transform(u[0], u[1], u[2], u[3], u[4], u[5]), n.drawImage(this.presentPic[i], 0, 0), n.restore()
            }
        },
        dataLoad: function() {
            this.ifDataArrive = !1, this._pano.hideOverlays()
        },
        lowImageCome: function() {
            this.ifDataArrive = !0, this.refresh(), this._pano.showOverlays()
        },
        draw: function(t) {
            if (this.ifDataArrive && !this.aniflag) {
                var i = this.scene;
                i.pitch = t.pitch / 180 * Math.PI - i.camPitch / 180 * Math.PI, i.heading = (t.heading + i.dirNorth) / 180 * Math.PI, i.heading > 2 * Math.PI ? i.heading = i.heading - 2 * Math.PI : i.heading < 0 && (i.heading = i.heading + 2 * Math.PI);
                var e = i.unit;
                this.cxt.clearRect(0, 0, i.w, i.h);
                var a = (i.pow_1, i.pow_2, i.bound),
                    s = a.uplimit,
                    h = a.downlimit,
                    n = a.leftlimit,
                    o = a.rightlimit,
                    r = o > n ? o - n : 64 + o - n,
                    c = i.pow_clearlevel_zoom,
                    p = i.temoffset,
                    d = Math.cos(i.pitch),
                    f = Math.cos(i.heading),
                    v = Math.sin(i.heading),
                    l = -i.dist * d * f,
                    M = i.dist * Math.sin(i.pitch),
                    g = i.dist * d * v;
                i.Xsm = l, i.Ysm = M, i.Zsm = g, i.cosheading = f, i.sinheading = v;
                for (var m = 0; r > m; m++)
                    for (var w = s; h > w; w++) {
                        var x = m + n;
                        x > 63 ? x %= 64 : 0 > x && (x += 64);
                        var u = Math.floor(x / c),
                            P = Math.floor(w / c),
                            y = x % c,
                            _ = w % c,
                            I = {
                                x: y * e,
                                y: _ * e - p
                            },
                            D = {
                                x: y * e - p,
                                y: _ * e
                            },
                            z = {
                                x: y * e - p,
                                y: _ * e + e + p
                            },
                            T = {
                                x: y * e + e + p,
                                y: _ * e - p
                            },
                            b = {
                                x: y * e + e + p,
                                y: _ * e + e
                            },
                            R = {
                                x: y * e + e,
                                y: _ * e + e + p
                            },
                            A = {
                                point1: I,
                                point2: z,
                                point3: b
                            },
                            C = {
                                point1: D,
                                point2: T,
                                point3: R
                            };
                        if (0 == y) var S = -1;
                        else if (y == c - 1) var S = 1;
                        if (0 == _) var N = -1;
                        else if (_ == c - 1) var N = 1;
                        this.drawTriLeftDown(A, u, P, i.zoom, S, N), this.drawTriRightUp(C, u, P, i.zoom, S, N)
                    }
            }
        },
        refresh: function() {
            if (this.ifDataArrive && !this.aniflag) {
                var t = this.scene,
                    i = t.unit;
                this.cxt.clearRect(0, 0, t.w, t.h);
                var e = (t.pow_1, t.pow_2, this.getBound()),
                    a = e.uplimit,
                    s = e.downlimit,
                    h = e.leftlimit,
                    n = e.rightlimit,
                    o = n > h ? n - h : 64 + n - h,
                    r = t.pow_clearlevel_zoom,
                    c = Math.cos(t.pitch),
                    p = Math.cos(t.heading),
                    d = Math.sin(t.heading),
                    f = -t.dist * c * p,
                    v = t.dist * Math.sin(t.pitch),
                    l = t.dist * c * d;
                t.Xsm = f, t.Ysm = v, t.Zsm = l, t.cosheading = p, t.sinheading = d;
                for (var M = t.temoffset, g = 0; o > g; g++)
                    for (var m = a; s > m; m++) {
                        var w = g + h;
                        w > 63 ? w %= 64 : 0 > w && (w += 64);
                        var x = Math.floor(w / r),
                            u = Math.floor(m / r),
                            P = w % r,
                            y = m % r,
                            _ = {
                                x: P * i,
                                y: y * i - M
                            },
                            I = {
                                x: P * i - M,
                                y: y * i
                            },
                            D = {
                                x: P * i - M,
                                y: y * i + i + M
                            },
                            z = {
                                x: P * i + i + M,
                                y: y * i - M
                            },
                            T = {
                                x: P * i + i + M,
                                y: y * i + i
                            },
                            b = {
                                x: P * i + i,
                                y: y * i + i + M
                            },
                            R = {
                                point1: _,
                                point2: D,
                                point3: T
                            },
                            A = {
                                point1: I,
                                point2: z,
                                point3: b
                            };
                        if (0 == P) var C = -1;
                        else if (P == r - 1) var C = 1;
                        if (0 == y) var S = -1;
                        else if (y == r - 1) var S = 1;
                        this.drawTriLeftDown(R, x, u, t.zoom, C, S), this.drawTriRightUp(A, x, u, t.zoom, C, S)
                    }
            }
        },
        _drawZoomChange: function() {
            var t = this.scene,
                i = 32;
            this.cxt.clearRect(0, 0, t.w, t.h);
            var e = 512 / i,
                a = t.temoffset,
                s = Math.cos(t.pitch),
                h = Math.cos(t.heading),
                n = Math.sin(t.heading),
                o = -t.dist * s * h,
                r = t.dist * Math.sin(t.pitch),
                c = t.dist * s * n;
            t.Xsm = o, t.Ysm = r, t.Zsm = c, t.cosheading = h, t.sinheading = n;
            for (var p = 0; e > p; p++)
                for (var d = 0; e > d; d++) {
                    var f = {
                            x: p * i,
                            y: d * i - a
                        },
                        v = {
                            x: p * i - a,
                            y: d * i
                        },
                        l = {
                            x: p * i - a,
                            y: d * i + i + a
                        },
                        M = {
                            x: p * i + i + a,
                            y: d * i - a
                        },
                        g = {
                            x: p * i + i + a,
                            y: d * i + i
                        },
                        m = {
                            x: p * i + i,
                            y: d * i + i + a
                        },
                        w = {
                            point1: f,
                            point2: l,
                            point3: g
                        },
                        x = {
                            point1: v,
                            point2: M,
                            point3: m
                        };
                    if (0 == p) var u = -1;
                    else if (p == e - 1) var u = 1;
                    if (0 == d) var P = -1;
                    else if (d == e - 1) var P = 1;
                    this.drawAniTriLeftDown(w, 0, 2, u, P), this.drawAniTriRightUp(x, 0, 2, u, P), this.drawAniTriLeftDown(w, 1, 2, u, P), this.drawAniTriRightUp(x, 1, 2, u, P)
                }
        },
        getCoordbyPix: function(t, i) {
            var e = this.scene,
                a = t - e.w / 2,
                s = e.h / 2 - i,
                h = e.pitch + e.camPitch / 180 * Math.PI,
                n = e.heading - e.dirNorth / 180 * Math.PI,
                o = -e.dist * Math.cos(h) * Math.cos(n),
                r = e.dist * Math.sin(h),
                c = e.dist * Math.cos(h) * Math.sin(n),
                p = a * Math.sin(n),
                d = a * Math.cos(n),
                f = s * Math.sin(h) * Math.cos(n),
                s = s * Math.cos(h),
                v = -s * Math.sin(h) * Math.sin(n),
                l = o + p + f,
                M = r + s,
                g = c + d + v,
                m = this.getPov(l, M, g),
                w = 2.08;
            if (M > 2) return !1;
            var x = w / (w - M);
            l *= x, g *= x;
            var u = Math.sqrt(Math.pow(l, 2) + Math.pow(g, 2));
            return {
                X: l,
                Z: g,
                dist: u,
                scenedist: e.dist,
                heading: m.heading
            }
        },
        getBound: function(t) {
            var i = this.scene;
            t && (i.heading = (t.heading + i.dirNorth) / 180 * Math.PI, i.heading > 2 * Math.PI ? i.heading = i.heading - 2 * Math.PI : i.heading < 0 && (i.heading = i.heading + 2 * Math.PI), i.pitch = t.pitch / 180 * Math.PI - i.camPitch / 180 * Math.PI);
            var e = Math.cos(i.pitch),
                a = Math.sin(i.pitch),
                s = Math.cos(i.heading),
                h = Math.sin(i.heading),
                n = -i.dist * e * s,
                o = i.dist * a,
                r = i.dist * e * h,
                c = i.h / 2 * a * s,
                p = i.h / 2 * e,
                d = -i.h / 2 * a * h,
                f = -i.h / 2 * a * s,
                v = -i.h / 2 * e,
                l = i.h / 2 * a * h,
                M = -i.w / 2 * h,
                g = 0,
                m = -i.w / 2 * s,
                w = i.w / 2 * h,
                x = 0,
                u = i.w / 2 * s;
            if (i.pitch > 0) var P = n + c + M,
                y = o + p + g,
                _ = r + d + m,
                I = this.getPov(P, y, _),
                D = n + f,
                z = o + v,
                T = r + l,
                b = this.getPov(D, z, T),
                R = n + f + w,
                A = o + v + x,
                C = r + l + u,
                S = this.getPov(R, A, C);
            else var N = n + c,
                U = o + p,
                Z = r + d,
                L = this.getPov(N, U, Z),
                q = N + M,
                O = U + g,
                X = Z + m,
                Y = this.getPov(q, O, X),
                B = n + f + w,
                j = o + v + x,
                E = r + l + u,
                H = this.getPov(B, j, E);
            var W = Math.atan(i.h / 2 / i.dist);
            if (i.pitch + W > Math.PI / 2) var k = 0,
                F = b.pitch < S.pitch ? b.pitch : S.pitch,
                G = Math.ceil(32 * (Math.PI / 2 - F) / Math.PI);
            else if (i.pitch - W < -Math.PI / 2) var J = L.pitch > Y.pitch ? L.pitch : Y.pitch,
                k = Math.floor(32 * (Math.PI / 2 - J) / Math.PI),
                G = 32;
            else if (i.pitch > 0) var k = Math.floor(32 * (Math.PI / 2 - i.pitch - W) / Math.PI),
                F = b.pitch > S.pitch ? S.pitch : b.pitch,
                G = Math.ceil(32 * (Math.PI / 2 - F) / Math.PI);
            else var J = L.pitch > Y.pitch ? L.pitch : Y.pitch,
                k = Math.floor(32 * (Math.PI / 2 - J) / Math.PI),
                G = Math.ceil(32 * (Math.PI / 2 - i.pitch + W) / Math.PI);
            if (Math.abs(i.pitch) >= Math.PI / 2 - W) var K = 0,
                Q = 64;
            else if (i.pitch > 0) {
                var K = Math.floor(32 * I.heading / Math.PI);
                if (i.heading > I.heading) var Q = Math.ceil(32 * (2 * i.heading - I.heading) / Math.PI);
                else var Q = Math.ceil(32 * (2 * i.heading + 2 * Math.PI - I.heading) / Math.PI)
            } else {
                var Q = Math.ceil(32 * H.heading / Math.PI);
                if (i.heading > H.heading) var K = Math.floor(32 * (2 * i.heading - 2 * Math.PI - H.heading) / Math.PI);
                else var K = Math.floor(32 * (2 * i.heading - H.heading) / Math.PI)
            }
            return 0 > K && (K += 64), Q > 64 && (Q -= 64), G > 32 && (G = 32), 0 > k && (k = 0), i.bound = {
                uplimit: k,
                downlimit: G,
                leftlimit: K,
                rightlimit: Q
            }, {
                uplimit: k,
                downlimit: G,
                leftlimit: K,
                rightlimit: Q
            }
        },
        drawTriLeftDown: function(t, i, e, a, s, h) {
            if (2 == this.picArray[i][e].datastate) {
                var n = this.cxt,
                    o = 0,
                    r = 0,
                    c = 0,
                    p = 0,
                    d = this.scene.xyoffset;
                s && (1 == s ? r = d : -1 == s && (o = d)), h && (-1 == h ? c = d : 1 == h && (p = d));
                var f = this.scene.over,
                    v = this._point2DtoSphereto2D(t.point1, i, e, a, 0, -o, f, c);
                if (!v) return !1;
                var l = this._point2DtoSphereto2D(t.point2, i, e, a, -f, -o, -f, -p);
                if (!l) return !1;
                var M = this._point2DtoSphereto2D(t.point3, i, e, a, f, r, 0, -p);
                if (!M) return !1;
                var g = {
                    point1: v,
                    point2: l,
                    point3: M
                };
                if (g) {
                    var m = g.point1,
                        w = g.point2,
                        x = g.point3;
                    n.save(), n.beginPath(), n.moveTo(m.x, m.y), n.lineTo(w.x, w.y), n.lineTo(x.x, x.y), n.closePath(), n.clip();
                    var u = this.getTransMatrix(t, g);
                    n.transform(u[0], u[1], u[2], u[3], u[4], u[5]), n.drawImage(this.picArray[i][e].image, 0, 0)
                }
            } else {
                var n = this.cxt,
                    o = 0,
                    r = 0,
                    c = 0,
                    p = 0,
                    d = 1 / 128;
                s && (1 == s ? r = d : -1 == s && (o = d)), h && (-1 == h ? c = d : 1 == h && (p = d));
                var f = 1 / 128,
                    v = this._point2DtoSphereto2D(t.point1, i, e, a, 0, -o, f, c);
                if (!v) return !1;
                var l = this._point2DtoSphereto2D(t.point2, i, e, a, -f, -o, -f, -p);
                if (!l) return !1;
                var M = this._point2DtoSphereto2D(t.point3, i, e, a, f, r, 0, -p);
                if (!M) return !1;
                var g = {
                        point1: v,
                        point2: l,
                        point3: M
                    },
                    m = g.point1,
                    w = g.point2,
                    x = g.point3;
                n.save(), n.beginPath(), n.moveTo(m.x, m.y), n.lineTo(w.x, w.y), n.lineTo(x.x, x.y), n.closePath(), n.clip();
                var P = t.point1,
                    y = t.point2,
                    _ = t.point3,
                    I = (this.scene.pow_1, this.scene.pow_2),
                    D = 512 * i,
                    z = 512 * e;
                if (i >= I) {
                    t.point1 = {
                        x: (D + P.x) / I - 512,
                        y: (z + P.y) / I
                    }, t.point2 = {
                        x: (D + y.x) / I - 512,
                        y: (z + y.y) / I
                    }, t.point3 = {
                        x: (D + _.x) / I - 512,
                        y: (z + _.y) / I
                    };
                    var u = this.getTransMatrix(t, g);
                    n.transform(u[0], u[1], u[2], u[3], u[4], u[5]), n.drawImage(this.presentPic[1], 0, 0)
                } else {
                    t.point1 = {
                        x: (D + P.x) / I,
                        y: (z + P.y) / I
                    }, t.point2 = {
                        x: (D + y.x) / I,
                        y: (z + y.y) / I
                    }, t.point3 = {
                        x: (D + _.x) / I,
                        y: (z + _.y) / I
                    };
                    var u = this.getTransMatrix(t, g);
                    n.transform(u[0], u[1], u[2], u[3], u[4], u[5]), n.drawImage(this.presentPic[0], 0, 0)
                }
            }
            n.restore()
        },
        drawTriRightUp: function(t, i, e, a, s, h) {
            if (2 == this.picArray[i][e].datastate) {
                var n = this.cxt,
                    o = 0,
                    r = 0,
                    c = 0,
                    p = 0,
                    d = this.scene.xyoffset;
                s && (1 == s ? r = d : -1 == s && (o = d)), h && (-1 == h ? c = d : 1 == h && (p = d));
                var f = this.scene.over,
                    v = this._point2DtoSphereto2D(t.point1, i, e, a, -f, -o, 0, c);
                if (!v) return !1;
                var l = this._point2DtoSphereto2D(t.point2, i, e, a, f, r, f, c);
                if (!l) return !1;
                var M = this._point2DtoSphereto2D(t.point3, i, e, a, 0, r, -f, -p);
                if (!M) return !1;
                var g = {
                        point1: v,
                        point2: l,
                        point3: M
                    },
                    m = g.point1,
                    w = g.point2,
                    x = g.point3;
                n.save(), n.beginPath(), n.moveTo(m.x, m.y), n.lineTo(w.x, w.y), n.lineTo(x.x, x.y), n.closePath(), n.clip();
                var u = this.getTransMatrix(t, g);
                n.transform(u[0], u[1], u[2], u[3], u[4], u[5]), n.drawImage(this.picArray[i][e].image, 0, 0)
            } else {
                var n = this.cxt,
                    o = 0,
                    r = 0,
                    c = 0,
                    p = 0,
                    d = 1 / 128;
                s && (1 == s ? r = d : -1 == s && (o = d)), h && (-1 == h ? c = d : 1 == h && (p = d));
                var f = 1 / 128,
                    v = this._point2DtoSphereto2D(t.point1, i, e, a, -f, -o, 0, c);
                if (!v) return !1;
                var l = this._point2DtoSphereto2D(t.point2, i, e, a, f, r, f, c);
                if (!l) return !1;
                var M = this._point2DtoSphereto2D(t.point3, i, e, a, 0, r, -f, -p);
                if (!M) return !1;
                var g = {
                        point1: v,
                        point2: l,
                        point3: M
                    },
                    m = g.point1,
                    w = g.point2,
                    x = g.point3;
                n.save(), n.beginPath(), n.moveTo(m.x, m.y), n.lineTo(w.x, w.y), n.lineTo(x.x, x.y), n.closePath(), n.clip();
                var P = t.point1,
                    y = t.point2,
                    _ = t.point3,
                    I = (this.scene.pow_1, this.scene.pow_2),
                    D = 512 * i,
                    z = 512 * e;
                if (i >= I) {
                    t.point1 = {
                        x: (D + P.x) / I - 512,
                        y: (z + P.y) / I
                    }, t.point2 = {
                        x: (D + y.x) / I - 512,
                        y: (z + y.y) / I
                    }, t.point3 = {
                        x: (D + _.x) / I - 512,
                        y: (z + _.y) / I
                    };
                    var u = this.getTransMatrix(t, g);
                    n.transform(u[0], u[1], u[2], u[3], u[4], u[5]), n.drawImage(this.presentPic[1], 0, 0)
                } else {
                    t.point1 = {
                        x: (D + P.x) / I,
                        y: (z + P.y) / I
                    }, t.point2 = {
                        x: (D + y.x) / I,
                        y: (z + y.y) / I
                    }, t.point3 = {
                        x: (D + _.x) / I,
                        y: (z + _.y) / I
                    };
                    var u = this.getTransMatrix(t, g);
                    n.transform(u[0], u[1], u[2], u[3], u[4], u[5]), n.drawImage(this.presentPic[0], 0, 0)
                }
            }
            n.restore()
        },
        _point2DtoSphereto2D: function(t, i, e, a, s, h, n, o) {
            var r = t.x,
                c = t.y,
                p = {
                    w: 512,
                    h: 512
                },
                d = this.scene,
                f = (1 / d.pow_1 * t.x / p.w + i / d.pow_1) * Math.PI * 2,
                v = (.5 - 1 / d.pow_2 * t.y / p.h - e / d.pow_2) * Math.PI,
                l = Math.sin(Math.abs(v));
            .4 > l ? l = .4 : l > .98 && (l = d.poleroffset), f += (s + h) * l, v += (n + o) * l;
            var M = (d.heading, d.dist),
                g = (d.pitch, Math.cos(v)),
                m = -g * Math.cos(f),
                w = Math.sin(v),
                x = g * Math.sin(f),
                u = d.cosheading,
                P = d.sinheading,
                y = d.Xsm,
                _ = d.Ysm,
                I = d.Zsm,
                D = y * m + w * _ + x * I;
            if (0 > D) return !1;
            var z = M * M / D,
                r = z * m,
                c = z * w,
                T = z * x,
                b = r - y,
                R = c - _,
                A = T - I,
                C = Math.pow(b, 2) + Math.pow(R, 2) + Math.pow(A, 2),
                S = Math.sqrt(C);
            if (0 == C) var N = 0,
                U = 0;
            else {
                var Z = (b * P + A * u) / S;
                Z > 1 ? Z = 1 : -1 > Z && (Z = -1);
                var L = Math.acos(Z),
                    q = b * u * _ + R * P * I - R * u * y - A * _ * P;
                0 > q && (L = 2 * Math.PI - L);
                var N = S * Math.cos(L),
                    U = S * Math.sin(L)
            }
            return {
                x: d.w / 2 + N,
                y: d.h / 2 - U
            }
        },
        getPovbyPoint: function(t) {
            var i = this._pano.getPosition();
            if (i) {
                var e = this.scene,
                    a = e.heading,
                    s = e.dist,
                    h = e.pitch + e.camPitch / 180 * Math.PI;
                a -= e.dirNorth / 180 * Math.PI;
                var n = -(t.lat - i.lat) / 180 * Math.PI * 6378137,
                    o = (t.lng - i.lng) / 180 * Math.PI * 6378137,
                    r = Math.sqrt(Math.pow(n, 2) + Math.pow(o, 2)),
                    c = -2.08,
                    p = Math.cos(h),
                    d = Math.cos(a),
                    f = Math.sin(a),
                    v = -s * p * d,
                    l = s * Math.sin(h),
                    M = s * p * f,
                    g = v * n + c * l + o * M;
                if (0 > g) return !1;
                var m = s * s / g,
                    w = m * n,
                    x = m * c,
                    u = m * o,
                    P = w - v,
                    y = x - l,
                    _ = u - M,
                    I = Math.pow(P, 2) + Math.pow(y, 2) + Math.pow(_, 2),
                    D = Math.sqrt(I);
                if (0 == I) var z = 0,
                    T = 0;
                else {
                    var b = (P * f + _ * d) / D;
                    b > 1 ? b = 1 : -1 > b && (b = -1);
                    var R = Math.acos(b),
                        A = P * d * l + y * f * M - y * d * v - _ * l * f;
                    0 > A && (R = 2 * Math.PI - R);
                    var z = D * Math.cos(R),
                        T = D * Math.sin(R)
                }
                return {
                    x: e.w / 2 + z,
                    y: e.h / 2 - T,
                    dist: r
                }
            }
            return !1
        },
        getPov: function(t, i, e) {
            var a = Math.pow(t, 2),
                s = Math.pow(i, 2),
                h = Math.pow(e, 2),
                n = Math.asin(i / Math.sqrt(a + s + h)),
                o = Math.sqrt(a + h);
            if (o < Math.abs(t) && (o = Math.abs(t)), e > 0) var r = Math.PI - Math.acos(t / Math.sqrt(a + h));
            else var r = Math.PI + Math.acos(t / Math.sqrt(a + h));
            return {
                heading: r,
                pitch: n
            }
        },
        getTransMatrix: function(t, i) {
            var e = t.point1.x,
                a = t.point1.y,
                s = t.point2.x,
                h = t.point2.y,
                n = t.point3.x,
                o = t.point3.y,
                r = i.point1.x,
                c = i.point1.y,
                p = i.point2.x,
                d = i.point2.y,
                f = i.point3.x,
                v = i.point3.y,
                l = h - a,
                M = o - a,
                g = s - e,
                m = n - e,
                l = h - a,
                M = o - a,
                w = f - r,
                x = d - c,
                u = p - r,
                P = v - c,
                y = w * l - u * M,
                _ = m * l - g * M,
                I = w * g - u * m,
                D = -_,
                z = P * l - x * M,
                T = _,
                b = x * m - P * g,
                R = _,
                A = [y / _, z / T, I / D, b / R];
            return A[4] = r - A[0] * e - A[2] * a, A[5] = c - A[3] * a - A[1] * e, A
        }
    }), e.exports = a
});;
define("pano:widget/module/PanoModule/CvsRender/Render.js", function(t, n, a) {
    var e = t("pano:widget/module/PanoModule/CvsRender/base/Util.js"),
        i = (t("pano:widget/module/PanoLoading/PanoLoading.js"), t("pano:widget/module/PanoModule/CvsRender/base/Size.js")),
        o = t("pano:widget/module/PanoModule/CvsRender/base/Point.js"),
        r = t("pano:widget/module/PanoModule/CvsRender/base/Const.js"),
        s = t("pano:widget/module/PanoModule/CvsRender/base/EventType.js"),
        d = t("pano:widget/module/PanoModule/WebglRender/service/Service.js"),
        h = t("pano:widget/module/PanoModule/CvsRender/base/DataParser.js"),
        p = t("pano:widget/module/PanoModule/CvsRender/PanoramaTileCanvasRenderer.js"),
        c = t("pano:widget/module/PanoModule/CvsRender/PanoramaTileData.js"),
        l = t("pano:widget/module/PanoModule/CvsRender/PanoramaOperation.js"),
        u = t("pano:widget/module/PanoModule/CvsRender/PanoramaLinksRenderer.js"),
        g = function(t, n) {
            T.lang.Class.call(this), this._panoDatas = t, this.innerData = {}, this.panoJSONData = void 0, this.curPanoId = void 0, this.panoData = {}, this.curIid = void 0, this._tileContainer = n, this._linksContainer = this._createContainer("4"), this._tileContainer.appendChild(this._linksContainer), this._panoTileRenderer = new p(this), this._panoLinksRenderer = new u(this), this._panoLinksRenderer.show(), this._initialize(), this._bind()
        };
    T.lang.inherits(g, T.lang.Class), T.object.extend(g.prototype, {
        _bind: function() {
            function t() {
                !1 === d && (d = !0, a.dispatchEvent("first_thumb_complete"))
            }

            function n() {
                var n = document.getElementById("panoLoadingMask");
                if (document.getElementById("panoPreviewMask")) {
                    var e = document.getElementById("pano-preview-container");
                    e.removeChild(document.getElementById("panoPreviewMask"))
                } else n && document.body.removeChild(n);
                !0 !== r && (r = !0, a.dispatchEvent("first_thumb_complete"), setTimeout(t, 2e3))
            }
            var a = this,
                e = T.lang.Event,
                i = new l(a);
            a.addEventListener("dataload", function(t) {
                i._data = t.data, i._initialize(), a._calcDisplayZoom(), a._setData(t.data), a._panoTileRenderer.render(a.getPov(), a.getImageZoom(), a.getDisplayTileSize()), a._panoLinksRenderer.render(a.getPov(), a.getImageZoom(), a.getDisplayTileSize())
            }), a.addEventListener("pov_changed", function() {
                a.panoData && a.render(a.getPov(), a.getImageZoom(), a.getDisplayTileSize())
            }), a.addEventListener("clear", function() {
                a.panoData = null, a._setData(null), a._panoTileRenderer.render(), a._panoLinksRenderer && a._panoLinksRenderer.render()
            }), a.addEventListener("zoom_changed_inner", function(t) {
                if (i.dragAni && (i.dragAni.stop(), i.dragAni = null), a.panoData) {
                    {
                        a._imgZoom
                    }
                    a._calcDisplayZoom(), a._setZoomAction(a.getPov(), a.getImageZoom(), a.getDisplayTileSize(), t.noAnimation)
                }
            });
            var o = !1,
                r = !1,
                d = !1,
                h = !1,
                p = !0,
                c = !1;
            a._containerSize = a.getContainerSize(), a.addEventListener(s.LOAD_PANORAMA_DATA_COMPLETED, function() {
                h = !0;
                var e = this.panoDataPc,
                    i = a.getPov(),
                    r = a.getInnerData(),
                    s = {
                        panoId: e.panoId,
                        panoid: e.panoId,
                        heading: i.heading,
                        pitch: i.pitch,
                        panoHeading: i.heading,
                        panoPitch: i.pitch,
                        panoType: e.panoType,
                        rname: e.roadName,
                        mode: e.mode,
                        copyright: {
                            dataProviderIndex: e.provider,
                            admission: e.admission,
                            photoDate: e.date,
                            roadName: e.roadName,
                            username: e.username || ""
                        },
                        maxImgLevel: e.maxImgLevel
                    };
                a.isStreet() ? (s.x = e.rx || e.panoX, s.y = e.ry || e.panoY) : (s.x = r.vpPoint.X || r.vpPoint.x || 0, s.y = r.vpPoint.Y || r.vpPoint.y || 0), s.panoMCPoint = {
                    x: s.x,
                    y: s.y
                }, a.panoOptions = s, !1 === o && (o = !0, a.dispatchEvent("interface_ready")), a.dispatchEvent("sdata_loaded", {
                    data: a.panoOptions
                }), !0 === p && (p = !1, n()), !0 === c && (c = !1, t());
                var d = a.getMercatorPosition(),
                    l = {
                        mercatorX: d.x,
                        mercatorY: d.y
                    };
                a.dispatchEvent("position_changed", {
                    data: l
                })
            }), a.addEventListener("linkclick", function(t) {
                if (t.data) {
                    var n = a.getPov();
                    a.startToRender(t.data, n.heading, n.pitch)
                }
            }), a.addEventListener("position_changed_inner", function() {
                var t = a.getPosition();
                a.loadPanoramaDataByMercator(t.lng, t.lat)
            }), a.addEventListener(s.NO_PANORAMA_ERROR, function() {
                a.dispatchEvent("pano_error", {
                    data: "NO_PANO"
                })
            }), setInterval(function() {
                if (a.getPanoId()) {
                    var t = a.getContainerSize();
                    if (!t.equals(a._containerSize)) {
                        var n = new e("size_changed");
                        n.preSize = a._containerSize, n.size = t, a.dispatchEvent(n), a._containerSize = t; {
                            a.getImageZoom()
                        }
                        a._calcDisplayZoom(), a._resize(n), a.render(a.getPov(), a.getImageZoom(), a.getDisplayTileSize())
                    }
                }
            }, 20), setTimeout(function() {
                !1 === o && (o = !0, a.dispatchEvent("interface_ready"))
            }, 0), this.closePano = function() {
                try {
                    i.distory()
                } catch (t) {
                    console.log(t)
                }
            }
        },
        _initialize: function() {
            var t = this._panoDatas;
            this.panoType = t.panoType || "", this.panoZoom = t.panoZoom || "", this.panoPitch = t.panoPitch || "", this.panoHeading = t.panoHeading || "", this.innerData = {}, this._povChangedByUser = !1, this._pov = {
                heading: 0,
                pitch: 0
            }, this.defaultHeading = void 0 === t.panoHeading ? 0 : ~~t.panoHeading, this.defaultPitch = void 0 === t.panoPitch ? 0 : ~~t.panoPitch, this._zoom = 1, this._links = [], this._id = null, this._position = null, this.TILE_MAX_ZOOM = 4, this.TILE_MIN_ZOOM = 1, this._maxPitch = 90, this._minPitch = 0, this.addMarkers = function() {}, this.removeMarkers = function() {}, this.toShareStatus = function() {}, this.revertStatus = function() {}, d.url = r.BASE_URL, this.initPanorama(t)
        },
        initPanorama: function(t) {
            if (void 0 === this.curPanoId || t.panoId !== this.curPanoId) {
                var n = t.panoId;
                this.curIid = t.iid || t.panoIId || "";
                var a = void 0 !== t.from && "share" === t.from,
                    e = void 0 === t.panoHeading ? void 0 === t.heading ? this.defaultHeading : t.heading : t.panoHeading,
                    i = void 0 === t.panoPitch ? void 0 === t.pitch ? this.defaultPitch : t.pitch : t.panoPitch,
                    o = ~~e,
                    r = a ? ~~i : this.convertCameraPitch(~~i);
                n ? this.startToRender(n, o, r) : this.loadInnerPanoramaData(this.curIid)
            }
        },
        startToRender: function(t, n, a) {
            t !== this.curPanoId && (isThumbnailLoaded = !1, this.defaultHeading = ~~n, this.defaultPitch = ~~a, this.curPanoId = t, this.loadPanoramaData(t))
        },
        handleResult: function(t) {
            var n = this;
            n.panoData = n._makeData(t), n.dispatchEvent({
                type: "dataload",
                data: n.panoData
            })
        },
        loadPanoramaData: function(t) {
            var n = this;
            d.loadPanoramaData(t).then(function(t) {
                try {
                    n.panoJSONData = t, n.panoDataPc = h.parseSData(t)
                } catch (a) {
                    return void n.dispatchEvent({
                        type: "parsePanoramaDataFailed"
                    })
                }
                n.panoType = n.panoDataPc.panoType, n.curIid = n.panoDataPc.iid, r.TYPE_INNER !== n.panoType || void 0 !== n.innerData && n.curIid === n.innerData.iid ? (n.dispatchEvent({
                    type: s.LOAD_PANORAMA_DATA_COMPLETED,
                    data: t
                }), n.handleResult(t), n.setPov({
                    heading: n.defaultHeading,
                    pitch: n.defaultPitch
                })) : n.loadInnerPanoramaData(n.curIid)
            })
        },
        loadInnerPanoramaData: function(t) {
            var n = this;
            return t ? void d.loadInnerPanoramaData(t).then(function(t) {
                try {
                    var a = h.parseIData(t)
                } catch (e) {
                    return void n.dispatchEvent({
                        type: s.PARSE_INNER_PANORAMA_DATA_FAILED
                    })
                }
                if (a.iid === n.curIid)
                    if (console.log("[StreetscapePanorama] Load inner panorama data successfully."), n.innerData = a, void 0 !== n.panoDataPc && n.curPanoId !== n.panoDataPc.panoId);
                    else if (void 0 !== n.panoDataPc && n.curPanoId === n.panoDataPc.panoId && n.panoDataPc.iid === n.curIid) n.dispatchEvent({
                    type: s.LOAD_PANORAMA_DATA_COMPLETED,
                    data: t
                }), n.handleResult(n.panoJSONData);
                else {
                    var i = n.getDefaultPanoOfInner(a);
                    n.startToRender(i.panoId)
                }
            }, function() {
                n.dispatchEvent({
                    type: s.LOAD_INNER_PANORAMA_DATA_FAILED
                })
            }) : (console.info("iid数据异常", t), !1)
        },
        loadPanoramaDataByMercator: function(t, n) {
            var a = this,
                e = this.getMercatorPosition();
            t += e.mercatorX, n = e.mercatorY - n, d.loadPanoramaDataByMercator(t, n, a.panoDataPc).then(function(t) {
                try {
                    var n = h.parseQSData(t),
                        e = n.panoId;
                    if (void 0 !== e && e !== a.curPanoId) {
                        {
                            [n.panoX, n.panoY]
                        }
                        a.loadPanoramaData(e)
                    }
                } catch (i) {}
            }, function() {})
        },
        getDefaultPanoOfInner: function(t) {
            for (var n, a = t.defaultFloorId, e = t.floors, i = e.length - 1; i >= 0 && (n = e[i], n.id !== a); i--);
            var o, r = n.innerPanos;
            for (i = r.length - 1; i >= 0 && (o = r[i], n.defaultPanoId !== o.panoId); i--);
            return o
        },
        _makeData: function(t, n) {
            var a = {},
                e = t.content[0];
            a.description = e.Rname || e.Info || "", a.id = e.ID, a.pointX = e.X / 100, a.pointY = e.Y / 100;
            var i = this._makeLinksData(e, a.id, a.pointX, a.pointY, e.NorthDir);
            if (a.links = i[0], a.roads = i[1], a.links.sort(function(t, n) {
                    return t.refinedDir - n.refinedDir
                }), a.mode = e.Mode, a.relevants = [], e.SwitchID)
                for (var o = 0; o < e.SwitchID.length; o++) a.relevants[o] = {
                    id: e.SwitchID[o].ID,
                    mode: e.SwitchID[o].Time.toLowerCase()
                };
            var r = (180 + e.NorthDir) % 360;
            if (a.tiles = new c({
                    dirNorth: e.NorthDir,
                    centerHeading: r,
                    pitch: e.Pitch
                }), e.Enters && e.Enters.length > 0) {
                a.indoorPois = [];
                for (var o = 0, s = e.Enters.length; s > o; o++) a.indoorPois.push({
                    panoIId: e.Enters[o].IID,
                    panoId: e.Enters[o].BreakID,
                    title: e.Enters[o].Name,
                    pointX: e.Enters[o].X / 100,
                    pointY: e.Enters[o].Y / 100
                })
            }
            var d = [],
                h = e.VPoint;
            if (h)
                for (var p = h.length, o = 0; p > o; o++) {
                    var l = {};
                    l.PID = h[o].PID;
                    var u = PanoramaService._mercatorProjection.pointToLngLat(new Pixel(h[o].X / 100, h[o].Y / 100));
                    l.X = -(u.lat - a.position.lat) / 180 * Math.PI * 6378137, l.Z = (u.lng - a.position.lng) / 180 * Math.PI * 6378137, d.push(l)
                }
            return a.VPoint = d, e.Inters && e.Inters.length > 0 && (a.breakId = e.Inters[0].BreakID, a.breakIId = e.Inters[0].IID, a.heading = e.MoveDir, a.pitch = e.Pitch), n && (a.breakId = n.breakId), a.copyright = {}, a.copyright.admission = e.Admission, a.copyright.dataProviderIndex = e.Provider, a.copyright.photoDate = e.Date, a.copyright.roadName = e.Rname, a.copyright.username = e.Username || "", a
        },
        _setData: function(t) {
            t && "number" == typeof t.heading && this._povChangedByUser === !1 && (this._pov.heading = t.heading, this._pov.pitch = t.pitch), this._panoTileRenderer.setData(t, this.getZoom(), this.getImageZoom()), this._panoLinksRenderer.setData(t), this._position = new o(t.pointX, t.pointY)
        },
        _calcDisplayZoom: function() {
            var t = this.calcDisplayZoom({
                width: this._tileContainer.clientWidth,
                height: this._tileContainer.clientHeight
            }, this.getZoom());
            this._tileSize = t.displayTileSize, this._imgZoom = t.imgZoom
        },
        calcDisplayZoom: function(t, n) {
            var a, e = t.width,
                i = t.height,
                o = 180 / Math.pow(2, n),
                r = 1,
                s = e / i > 1 ? !0 : !1;
            a = s ? i : e;
            for (var d = o / a, h = Math.floor(n) + r, p = 360 / (2 * Math.pow(2, h - 2) * d); p > 512;) h++, p = 360 / (2 * Math.pow(2, h - 2) * d);
            if (h > this.TILE_MAX_ZOOM) {
                var c = h - this.TILE_MAX_ZOOM;
                p *= Math.pow(2, c), h = this.TILE_MAX_ZOOM
            }
            return h < this.TILE_MIN_ZOOM && (h = this.TILE_MIN_ZOOM), p = Math.round(p), {
                imgZoom: h,
                displayTileSize: p
            }
        },
        getPanoId: function() {
            return this.curPanoId || ""
        },
        getZoom: function() {
            return this._zoom
        },
        getImageZoom: function() {
            return this._imgZoom
        },
        getDisplayTileSize: function() {
            return this._tileSize
        },
        getContainerSize: function() {
            return new i(this._tileContainer.clientWidth, this._tileContainer.clientHeight)
        },
        getPov: function() {
            return this._pov
        },
        getSData: function() {
            return this.panoJSONData
        },
        getPanoOptions: function() {
            if (void 0 === this.panoDataPc) return {};
            var t = {};
            r.TYPE_STREET === this.panoDataPc.panoType ? (t.x = this.panoDataPc.panoX, t.y = this.panoDataPc.panoY) : (t.x = this.innerData.exitX, t.y = this.innerData.exitY);
            var n = this.getPov();
            return {
                panoType: this.panoDataPc.panoType,
                panoId: this.panoDataPc.panoId,
                panoHeading: e.getFixedDecimal(n.heading, 2),
                panoPitch: e.getFixedDecimal(n.pitch, 2),
                panoMCPoint: t,
                panoZoom: self.curZoom,
                mode: "day",
                maxImgLevel: this.panoDataPc.maxImgLevel
            }
        },
        getMercatorPosition: function() {
            return {
                mercatorX: this.panoDataPc.panoX,
                mercatorY: this.panoDataPc.panoY
            }
        },
        getInnerData: function() {
            return this.innerData
        },
        getContainer: function() {
            return this._tileContainer
        },
        get: function(t) {
            var n = "get" + t.substr(0, 1).toUpperCase() + t.substr(1);
            return this[n] ? this[n]() : void 0
        },
        set: function(t, n) {
            var a = "set" + t.substr(0, 1).toUpperCase() + t.substr(1);
            return this[a] ? this[a](n) : void 0
        },
        _resize: function() {
            var t = this,
                n = t.getImageZoom();
            t._calcDisplayZoom(), n != t.getImageZoom() && t._panoTileRenderer.keepOldTiles && t._panoTileRenderer.keepOldTiles(), t._panoTileRenderer.resize && t._panoTileRenderer.resize(), t.render(t.getPov(), t.getImageZoom(), t.getDisplayTileSize())
        },
        render: function(t, n, a) {
            var e = this;
            this._panoTileRenderer.render(t, n, a), setTimeout(function() {
                e._panoLinksRenderer.render(t, n, a)
            }, 200)
        },
        isStreet: function() {
            return r.TYPE_STREET === this._panoDatas.panoType
        },
        isInner: function() {
            return r.TYPE_INNER === this._panoDatas.panoType
        },
        setPov: function(t) {
            if (t) {
                var n = {
                        heading: ~~this._pov.heading,
                        pitch: ~~this._pov.pitch
                    },
                    a = this,
                    e = t.pitch;
                e > this._maxPitch ? e = this._maxPitch : e < this._minPitch && (e = this._minPitch), this._pov.heading = ~~(t.heading % 360), this._pov.pitch = ~~e, (n.heading != this._pov.heading || n.pitch != this._pov.pitch) && (this._povChangedByUser = !0, this.dispatchEvent({
                    type: "onpov_changed",
                    data: a._pov
                }))
            }
        },
        setZoom: function(t, n) {
            var a = baidu.lang.Event;
            if (t != this._zoom && (t > r.MAX_ZOOM && (t = r.MAX_ZOOM), t < r.MIN_ZOOM && (t = r.MIN_ZOOM), t != this._zoom)) {
                this._zoom = t;
                var e = new a("onzoom_changed_inner");
                n = n || {}, e.noAnimation = n.noAnimation || !1, this.dispatchEvent(e), this.dispatchEvent({
                    type: "onzoom_changed",
                    data: t
                })
            }
        },
        _setZoomAction: function(t, n, a, e) {
            var i = this;
            this._panoTileRenderer.setZoom(i.getZoom(), i.getImageZoom(), {
                noAnimation: e,
                renderCallback: function() {}
            })
        },
        hideOverlays: function() {},
        showOverlays: function() {},
        gotoPOI: function(t) {
            return t && t.panoId ? (t.panoId === this.curPanoId ? this.setPov({
                heading: ~~t.panoHeading,
                pitch: ~~t.panoPitc
            }) : this.initPanorama(t), void this.gotoPOICompleted(t)) : void this.dispatchEvent({
                type: s.NO_PANORAMA_ERROR
            })
        },
        gotoPOICompleted: function() {
            this.dispatchEvent("go_to_poi_complete", {
                data: {}
            })
        },
        getMarkerUidInBestPano: function() {},
        convertCameraHeading: function(t) {
            return 360 - t
        },
        convertCameraPitch: function(t) {
            return -t
        },
        setPanoOptions: function(t) {
            this.initPanorama(t)
        },
        _createContainer: function(t) {
            var n = e.create("div"),
                a = n.style;
            return a.position = "absolute", a.top = a.left = "0", a.zIndex = t || "0", a.WebkitUserSelect = "none", n
        },
        _makeLinksData: function(t, n, a, e, i) {
            var o = [],
                r = {};
            if (t.Links)
                for (var s = 0; s < t.Links.length; s++) o.push({
                    id: t.Links[s].PID,
                    dir: t.Links[s].DIR,
                    x: t.Links[s].X / 100,
                    y: t.Links[s].Y / 100,
                    heading: t.Links[s].DIR,
                    refinedDir: this._getRefinedDir(t.Links[s].DIR, i)
                });
            if (!t.Roads) return [o, r];
            var d = 1;
            for (s = 0; s < t.Roads.length; s++)
                if (t.Roads[s].Panos)
                    for (var h = 0; h < t.Roads[s].Panos.length; h++) {
                        if (t.Roads[s].Panos[h].PID == n) {
                            var p = t.Roads[s].Name;
                            "" == p && (p = t.Rname || "未知");
                            for (var c, l, u = null, g = null, v = h - d; v >= 0; v--) {
                                t.Roads[s].Panos[v] && null === u && (u = t.Roads[s].Panos[v], c = (u.DIR + 180) % 360, r[c] = []);
                                var m = t.Roads[s].Panos[v];
                                r[c] && r[c].push({
                                    id: m.PID,
                                    x: m.X / 100,
                                    y: m.Y / 100,
                                    distanceToCurrent: this._getDistance(m.X / 100, m.Y / 100, a, e)
                                })
                            }
                            for (u && o.push({
                                    id: u.PID,
                                    dir: c,
                                    heading: c,
                                    description: p,
                                    x: u.X / 100,
                                    y: u.Y / 100,
                                    refinedDir: this._getRefinedDir(c, i)
                                }), v = h + d; v < t.Roads[s].Panos.length; v++) {
                                t.Roads[s].Panos[v] && null === g && (g = t.Roads[s].Panos[v], l = g.DIR, 0 == l && (l = t.Roads[s].Panos[h].DIR), r[l] = []);
                                var m = t.Roads[s].Panos[v];
                                r[l] && r[l].push({
                                    id: m.PID,
                                    x: m.X / 100,
                                    y: m.Y / 100,
                                    distanceToCurrent: this._getDistance(m.X / 100, m.Y / 100, a, e)
                                })
                            }
                            null != g && o.push({
                                id: g.PID,
                                dir: l,
                                heading: l,
                                description: p,
                                x: g.X / 100,
                                y: g.Y / 100,
                                refinedDir: this._getRefinedDir(l, i)
                            })
                        }
                        for (var v = 0; v < o.length; v++) t.Roads[s].Panos[h].PID == o[v].id && (o[v].description = t.Roads[s].Name, "" == o[v].description && (o[v].description = t.Rname || "未知"))
                    }
            for (var s = 0; s < o.length; s++) {
                var P = o[s].dir,
                    _ = !1;
                for (var f in r)
                    if (f == P) {
                        _ = !0;
                        break
                    }
                if (_) break;
                r[P] = [{
                    id: o[s].id,
                    x: o[s].x,
                    y: o[s].y,
                    distanceToCurrent: this._getDistance(o[s].x, o[s].y, a, e)
                }]
            }
            return [o, r]
        },
        _getDistance: function(t, n, a, e) {
            return Math.round(Math.sqrt(Math.pow(t - a, 2) + Math.pow(n - e, 2)))
        },
        _getRefinedDir: function(t, n) {
            var a = t + n;
            return a > 360 && (a %= 360), a = Math.round(100 * a) / 100
        },
        setPosition: function(t) {
            if (!t.equals(this._position)) {
                var n = T.lang.Event;
                this._lastId = this.panoId, this._lastPosition = this._position, this._position = t, this.dispatchEvent(new n("onposition_changed_inner"))
            }
        },
        getPosition: function() {
            return this._position
        }
    }), a.exports = g
});;
define("pano:widget/module/PanoModule/PanoModule.js", function(e, a, t) {
    var n, i = e("pano:widget/base/ModuleClass.js"),
        n = e("pano:widget/module/PanoModule/FlashRender/Render.js"),
        o = e("pano:widget/module/PanoModule/WebglRender/Render.js"),
        r = e("pano:widget/module/PanoModule/CvsRender/Render.js"),
        d = e("pano:widget/base/service.js"),
        s = e("pano:widget/model/IndoorData.js"),
        p = (e("pano:widget/model/PanoPoi.js"), e("pano:widget/base/util.js")),
        h = e("common:widget/com/componentManager.js"),
        l = e("pano:widget/Transition/Transition.js"),
        c = T.browser.ie && T.browser.ie <= 7 ? "keypress" : "keydown",
        _ = {},
        u = "",
        v = null,
        f = void 0,
        g = 0,
        m = ["click", "edit", "deleteIconClick"],
        M = {},
        y = function(e) {
            p.each(m, function(a) {
                var t = a + "Handler";
                if ("function" == typeof e[t]) {
                    var n = M[e.markerId];
                    n || (n = M[e.markerId] = {}), n[a] = e[t], delete M[t]
                }
            })
        },
        k = function(e) {
            M[e] && delete M[e]
        },
        E = function(e, a, t) {
            var n = M[e] && M[e][a];
            n && n.apply(null, t)
        },
        I = !1,
        P = document.createElement("canvas");
    try {
        var C = P.getContext("webgl") || P.getContext("experimental-webgl") || P.getContext("moz-webgl") || P.getContext("webkit-3d");
        C && (I = !0)
    } catch (L) {}
    n = !0 === I ? o : r;
    var S = i.extend("PanoModule", {
        dispose: function() {
            _ = {}, u = "", v = null, f = void 0, g = 0
        },
        constructor: function() {
            this._panoModuleContainer = null, this._panoConfigUrl = null, this._panoFlashWraper = null, this._asynCacheMethodDataMap = {}, this._flashInterfaceReady = !1, this._panoModuleMarkerIds = null, this._enableShareMarker = !0, this._returnMarkVars = {
                panoUid: "",
                poiDetailUid: "",
                panoType: "",
                panoLastStreetPanoOptions: null
            }, this._isVisiable = !0, this.shareMarkerIdArr = [], this.shareMarkerUid = ""
        },
        initialize: function(e, a, t) {
            if (this._panoModuleContainer = e, this._panoConfigUrl = a, this._mapContext = t, this.$shareParam) {
                var n = this.$shareParam.markerUid;
                this._addMarkerByUid(n)
            }
        },
        showPano: function(e, a, t) {
            if (f = t, this._panoFlashWraper) this._flashInterfaceReady && (a && (e.uid || e.tourId) ? this._panoFlashWraper.gotoPOI(e) : this._panoFlashWraper.set("panoOptions", e));
            else {
                {
                    e.uid
                }
                this._initPanoFlash(e), this.dispatchEvent("visible_changed", {
                    data: {
                        visible: !0,
                        panoOptions: e
                    }
                })
            }
            if (e.panoMarkers) {
                var n = this;
                this._panoModuleMarkerIds = [], p.each(e.panoMarkers, function(e) {
                    e.markerId = p.getUniqueId("MARKER_"), n._panoModuleMarkerIds.push(e.markerId)
                }), this.addMarkers(e.panoMarkers), this.panoMarkers = e.panoMarkers
            }("inter" === e.panoType || e.panoIId) && (this._returnMarkVars.panoUid = this._returnMarkVars.poiDetailUid)
        },
        setPov: function(e) {
            this._flashInterfaceReady ? this._panoFlashWraper.set("pov", {
                heading: e.panoHeading,
                pitch: e.panoPitch
            }) : this._asynCacheMethodDataMap.setPov = e
        },
        setZoom: function(e) {
            if (this._flashInterfaceReady) {
                var a = this._panoFlashWraper.get("zoom");
                this._panoFlashWraper.set("zoom", a + e)
            } else this._asynCacheMethodDataMap.setZoom = e
        },
        setLimitZoom: function(e) {
            this._flashInterfaceReady ? this._panoFlashWraper.set("zoom", e) : this._asynCacheMethodDataMap.setLimitZoom = e
        },
        addMarkers: function(e) {
            return e && e.length && 0 !== e.length ? (this._panoFlashWraper && this._flashInterfaceReady ? (p.each(e, function(e) {
                y(e)
            }), this._panoFlashWraper.addMarkers(e), 1 == e.length && e[0].notSearchMarker !== !0 && this.dispatchEvent("add_search_marker", {
                markers: e
            })) : this._asynCacheMethodDataMap.addMarkers = e, this) : this
        },
        _addMarkerByUid: function(e) {
            var a = this;
            d.getPanoInfoByUid(e, function(t) {
                if (t && t.content && t.content[0] && t.content[0].poiinfo) {
                    var n = t.content[0].poiinfo,
                        i = {
                            markerId: p.getUniqueId("MARKER_"),
                            poiuid: n.UID,
                            pid: n.PID,
                            panoIId: n.IID,
                            poiType: n.belonging ? "interPoi" : "poi",
                            catalog: n.Catalog,
                            name: n.name,
                            heading: n.Dir,
                            pitch: n.Pitch,
                            x: n.X,
                            y: n.Y,
                            px: n.PanoX,
                            py: n.PanoY,
                            rank: n.Rank,
                            index: -1
                        };
                    a.shareMarkerUid = e, a.addMarkers([i]), a.shareMarkerIdArr = [i.markerId]
                }
            })
        },
        removeMarkers: function(e) {
            return this._panoFlashWraper && this._flashInterfaceReady ? (p.each(e, function(e) {
                k(e)
            }), this._panoFlashWraper.removeMarkers(e)) : this._asynCacheMethodDataMap.removeMarkers = e, this
        },
        removePanoModuleMarker: function(e) {
            return this._panoModuleMarkerIds && this._panoModuleMarkerIds.length && (this.removeMarkers(this._panoModuleMarkerIds), this._panoModuleMarkerIds = null), this._panoFlashWraper && this._flashInterfaceReady ? this._panoFlashWraper.removeMarkers(this.shareMarkerIdArr) : this._asynCacheMethodDataMap.removeMarkers = this.shareMarkerIdArr, e && (this.panoMarkers = []), this
        },
        showPanoModuleMarker: function() {
            if (this.panoMarkers) {
                var e = this;
                this._panoModuleMarkerIds = [], p.each(this.panoMarkers, function(a) {
                    a.markerId = p.getUniqueId("MARKER_"), e._panoModuleMarkerIds.push(a.markerId)
                }), this.addMarkers(this.panoMarkers)
            }
            var a = this.shareMarkerUid;
            a && this._addMarkerByUid(a)
        },
        drawLineToPoint: function(e, a, t, n, i, o, r) {
            this._panoFlashWraper.drawLineToPoint(e, a, t, n, i, o, r)
        },
        closePano: function(e, a) {
            T.un(document, c, this.backEventHandler);
            var t = this.getPanoOptions(),
                n = this,
                i = function() {
                    n._panoFlashWraper && (n._panoFlashWraper.closePano(), n._removePanoFlashEvents(), n._panoFlashWraper = null, n._flashInterfaceReady = !1, u = ""), v && v.has2DMap() || t && (t.currentPoint = null), e || n.dispatchEvent("visible_changed", {
                        data: {
                            visible: !1,
                            panoOptions: t,
                            cityName: a
                        }
                    })
                };
            if (!t) return void i();
            var o = this._mapContext.getOverviewLevel() || window.map.getZoom(),
                r = new BMap.Point(t.panoMCPoint.x, t.panoMCPoint.y),
                d = t.panoHeading || 0;
            0 === r.lat && 0 === r.lng && (r = window.map.getCenter(), t.panoMCPoint.x = r.lng, t.panoMCPoint.y = r.lat), l.exit(r, o, r, d, function() {
                i()
            }, function() {
                a && h.go("cur&wd=" + encodeURIComponent(a), {
                    cinfo: {
                        isFromPano: !0
                    }
                })
            })
        },
        setRoutParam: function(e) {
            this._flashInterfaceReady ? this._panoFlashWraper.setRoutParam(e) : this._asynCacheMethodDataMap.setRoutParam = e
        },
        hideRegion: function() {
            this._flashInterfaceReady ? this._panoFlashWraper.hideRegion() : this._asynCacheMethodDataMap.hideRegion = []
        },
        playRouteVideo: function(e, a) {
            this._flashInterfaceReady && (g = e, this._panoFlashWraper.playRouteVideo(a), addStat(STAT_CODE.STAT_PANORAMA, {
                item: "pano-route-video"
            }), p.startClock("panoVideoPlayTime", function(e) {
                addStat(STAT_CODE.STAT_PANORAMA, {
                    item: "pano-route-video-play-time",
                    time: e
                })
            }))
        },
        closeRouteVideo: function() {
            this._flashInterfaceReady && (g = 0, this._panoFlashWraper.closeRouteVideo(), p.stopClock("panoVideoPlayTime"))
        },
        getPanoOptions: function() {
            if (this._panoFlashWraper && this._flashInterfaceReady) {
                var e = this._panoFlashWraper.get("panoOptions"),
                    a = this._panoFlashWraper.get("mercatorPosition");
                return e.currentPoint = {
                    x: a.mercatorX,
                    y: a.mercatorY
                }, e
            }
            return null
        },
        getPanoTimeThrough: function() {
            if (!this._panoFlashWraper) return null;
            var e = this._panoFlashWraper.get("sData");
            try {
                var a = e.content[0].TimeLine.length > 0 ? e.content[0].TimeLine : null,
                    t = e.content[0].MoveDir;
                if ("inter" === e.content[0].Type) return null;
                if (a) {
                    for (var n = 0, i = a.length; i > n; n++) a[n].dir = t;
                    return a
                }
            } catch (o) {
                return null
            }
            return null
        },
        getPanoTimeline: function() {
            var e = this._getSdata();
            try {
                var a = e.switchid || e.SwitchID;
                if (!a) return [];
                if (a.length > 0) {
                    for (var t = 0; t < a.length; t++) a[t].heading = e.heading, a[t].pitch = e.pitch;
                    return a
                }
            } catch (n) {
                return null
            }
        },
        _getSdata: function() {
            if (!this._panoFlashWraper) return null;
            var e = this._panoFlashWraper.get("sData"),
                a = e.content[0] || e.content,
                t = p.copy(a, !0);
            return t
        },
        getPanoCopyright: function() {
            if (this._panoFlashWraper && this._flashInterfaceReady) {
                var e = this._getSdata(),
                    a = {
                        dataProviderIndex: e.provider,
                        admission: e.admission,
                        photoDate: e.date,
                        roadName: e.rname || "",
                        username: e.username || "",
                        userid: e.userid
                    };
                return a
            }
            return null
        },
        getPanoIndoorData: function() {
            if (this._panoFlashWraper && this._flashInterfaceReady && v) {
                var e = v.getCurrentFloorData(),
                    a = this._getSdata(),
                    t = this._panoFlashWraper.get("pov"),
                    n = (a.rx || a.x) / 100,
                    i = (a.ry || a.y) / 100;
                return e.currentPoint = {
                    x: n,
                    y: i,
                    heading: t.heading
                }, e
            }
            return null
        },
        getIndoorModel: function() {
            return v
        },
        _bindPanoFlashEvents: function() {
            var e = this,
                a = e._panoFlashWraper;
            a.addEventListener("indoor_exit", function(e) {
                e && e.data && "topo" === e.data.changeWay && addStat(STAT_CODE.STAT_PANORAMA, {
                    item: "indoorview-exit-topo"
                })
            }, "indoor_exit" + this.guid), a.addEventListener("zoom_changed", function(a) {
                addStat(STAT_CODE.STAT_PANORAMA, {
                    item: "pano-zoom"
                }), MapLogReport.send({
                    da_src: "pcmapPanoPG.zoomChanged.click",
                    zoom: a.data
                }), e.dispatchEvent("zoom_changed", {
                    data: a.data
                })
            }), a.addEventListener("street_drag", function() {
                addStat(STAT_CODE.STAT_PANORAMA, {
                    item: "pano-drag"
                })
            }), a.addEventListener("pov_changed", function(a) {
                "street" == e._returnMarkVars.panoType && (e._returnMarkVars.panoLastStreetPanoOptions.panoHeading = a.data.heading, e._returnMarkVars.panoLastStreetPanoOptions.panoPitch = a.data.pitch), e.dispatchEvent("pov_changed", {
                    data: {
                        panoHeading: a.data.heading,
                        panoPitch: a.data.pitch
                    }
                })
            }, "pov_changed" + this.guid), a.addEventListener("first_thumb_complete", function() {
                v ? v.onLoad(function() {
                    e.dispatchEvent("once_tiles_complete", {
                        data: null
                    })
                }) : e.dispatchEvent("once_tiles_complete", {
                    data: null
                }), a.removeEventListener("once_tiles_complete", "once_tiles_complete" + e.guid)
            }), a.addEventListener("go_to_poi_complete", function(a) {
                e._returnMarkVars.poiDetailUid = a.data.id, e.dispatchEvent("after_go_to_poi", a.data)
            }), a.addEventListener("go_to_poi_timeout", function(a) {
                e.dispatchEvent("go_to_poi_timeout", a.data)
            }), a.addEventListener("overlay_mouseover", function(a) {
                a.type = "show_position", e.dispatchEvent("show_position", a)
            }), a.addEventListener("out_of_navigation_range", function() {
                e.dispatchEvent("pano_error", {
                    data: "OUTOF_RANGE"
                })
            }), a.addEventListener("overlay_mouseout", function() {
                e.dispatchEvent("hide_position")
            }), a.addEventListener("clicked_position", function(a) {
                e.dispatchEvent("clicked_position", a.data)
            }), a.addEventListener("overlay_mouseclick", function(a) {
                if ("share_marker_id" === a.data.markerId) return void e.dispatchEvent("tag_marker_clicked", {
                    data: a.data
                });
                var t = a.data.markerId,
                    n = a.data;
                E(t, "click", [parseInt(n.x, 10), parseInt(n.y, 10), parseInt(n.z, 10), n.screenX, n.screenY])
            }), a.addEventListener("overlay_edit", function(e) {
                var a = e.data.markerId,
                    t = e.data;
                E(a, "edit", [t.content])
            }), a.addEventListener("overlay_delete_icon_click", function(e) {
                var a = e.data.markerId,
                    t = e.data;
                E(a, "deleteIconClick", [t.markerID])
            }), a.addEventListener("sdata_loaded", function(a) {
                var t = a.data,
                    n = t.panoid || t.panoId;
                if ("" == u)
                    if ("street" === t.panoType) e._fireSdataLoaded(a);
                    else {
                        var i = e._getSdata();
                        v = new s(i.inters[0].iid), v.maxImgLevel = t.maxImgLevel;
                        var o = i.id,
                            r = i.inters && i.inters[0] && i.inters[0].floor || 0;
                        v.fetch(function() {
                            var n = v.setCurrentPid(o);
                            void 0 == n && (v._currentFloor = r), e.dispatchEvent("indoor_enter", {
                                data: v.getCurrentFloorData(),
                                indoorModel: v
                            }), a.data.floor = r, a.data.indoorModel = t.indoorModel = v, a.data.iid = t.iid = i.inters[0].iid, e._fireSdataLoaded(a)
                        })
                    }
                else if ("street" == u)
                    if ("street" === t.panoType) a.data.indoorModel = t.indoorModel, e._fireSdataLoaded(a);
                    else {
                        var i = e._getSdata();
                        v = new s(i.inters[0].iid);
                        var r = i.inters && i.inters[0] && i.inters[0].floor || 0;
                        v.fetch(function() {
                            v.maxImgLevel = t.maxImgLevel, v.setCurrentPid(i.id);
                            var n = v.getCurrentFloorData();
                            n.x = (i.rx || i.x) / 100, n.y = (i.ry || i.y) / 100, e.dispatchEvent("indoor_enter", {
                                data: n,
                                indoorModel: v
                            }), a.data.floor = r, a.data.indoorModel = t.indoorModel = v, a.data.iid = t.iid = i.inters[0].iid, e._fireSdataLoaded(a)
                        })
                    }
                else if ("street" === t.panoType) {
                    var d = v.getBasicData();
                    v = null;
                    var p = {
                        uid: d.uid,
                        panoId: d.breakid,
                        panoX: d.breakx / 100,
                        panoY: d.breaky / 100
                    };
                    e.dispatchEvent("indoor_exit", {
                        data: p,
                        pano_change_dispatcher: f
                    }), f = null, a.data.uid = d.uid, e._fireSdataLoaded(a)
                } else {
                    v.maxImgLevel = t.maxImgLevel;
                    var h = v.getCurrentFloor(),
                        l = v.setCurrentPid(n);
                    if (void 0 === l) {
                        var i = e._getSdata(),
                            c = i.inters[0].iid;
                        c == v.getIID() ? (v._currentFloor = h, e.dispatchEvent("indoor_plan_id_changed", {
                            data: {
                                x: i.rx / 100,
                                y: i.ry / 100,
                                heading: t.heading
                            }
                        }), a.data.floor = h, a.data.indoorModel = t.indoorModel = v, a.data.iid = t.iid = c, e._fireSdataLoaded(a)) : (v = new s(c), v.fetch(function() {
                            e.dispatchEvent("indoor_enter", {
                                data: v.getCurrentFloorData(),
                                indoorModel: v
                            }), a.data.indoorModel = t.indoorModel = v, a.data.iid = t.iid = c, e._fireSdataLoaded(a)
                        }))
                    } else if (h === l) {
                        var _ = v.getCurrentPointData();
                        e.dispatchEvent("indoor_plan_id_changed", {
                            data: _
                        }), e.dispatchEvent("pov_changed", {
                            data: {
                                panoHeading: t.heading,
                                panoPitch: t.pitch
                            }
                        }), a.data.indoorModel = t.indoorModel = v, a.data.iid = t.iid = c, e._fireSdataLoaded(a)
                    } else e.dispatchEvent("indoor_floor_changed", {
                        data: v.getCurrentFloorData()
                    }), e.dispatchEvent("pov_changed", {
                        data: {
                            panoHeading: t.heading,
                            panoPitch: t.pitch
                        }
                    }), a.data.indoorModel = t.indoorModel = v, a.data.iid = t.iid = c, e._fireSdataLoaded(a)
                }
                u = t.panoType
            }, "sdata_loaded" + this.guid), a.addEventListener("interface_ready", function(a) {
                if (e._flashInterfaceReady !== !0) {
                    e._flashInterfaceReady = !0;
                    for (var t in e._asynCacheMethodDataMap) e[t](e._asynCacheMethodDataMap[t]);
                    e._asynCacheMethodDataMap = {}, e.dispatchEvent("interface_ready", a)
                }
            }, "interface_ready" + this.guid), a.addEventListener("pano_error", function(a) {
                e.dispatchEvent("pano_error", {
                    data: a.data
                })
            }, "pano_error" + this.guid), a.addEventListener("pano_player_error", function(a) {
                e.dispatchEvent("pano_player_error", {
                    data: a.data
                })
            }, "pano_player_error" + this.guid), a.addEventListener("deselect_poi", function() {
                e._returnMarkVars.poiDetailUid = "", e.dispatchEvent("deselect_poi")
            }, "deselect_poi" + this.guid), a.addEventListener("service_monitor", function(e) {
                var a = e.data,
                    t = a.type,
                    n = a.param.timeLength,
                    i = 1 != a.errorCode,
                    o = a.param.url,
                    r = 0;
                switch (t) {
                    case "pdata":
                        r = .05;
                        break;
                    case "qsdata":
                        r = 1;
                        break;
                    case "routePoints":
                        r = 5;
                        break;
                    case "idata":
                    case "plane":
                        r = 10;
                        break;
                    default:
                        r = .4
                }
                p.monitorReport(t, i, n, o, r)
            }, "service_monitor" + this.guid), a.addEventListener("add_statistic", function(e) {
                var a = e.data;
                addStat(STAT_CODE.STAT_PANORAMA, a)
            }, "add_statistic" + this.guid), a.addEventListener("update_pano_position", function(a) {
                e.dispatchEvent("routeVideo_pano_changed", {
                    data: {
                        panoType: "street",
                        panoHeading: a.data.heading,
                        panoMCPoint: {
                            x: a.data.x / 100,
                            y: a.data.y / 100
                        }
                    }
                })
            }, "update_pano_position" + this.guid), a.addEventListener("show_billion_pixels_dialog", function() {
                e.dispatchEvent("show_billion_pixels_dialog")
            })
        },
        _fireSdataLoaded: function(e) {
            var a = this,
                t = e.data;
            a._mapContext.getCurrentCity(function(e) {
                addStat(STAT_CODE.STAT_PANORAMA, {
                    item: "pano-whole",
                    cityCode: e.cityId
                })
            }), t = {
                panoMode: t.mode,
                panoId: t.panoid,
                panoPitch: t.pitch,
                panoHeading: t.heading,
                panoType: t.panoType,
                panoMCPoint: {
                    x: t.x,
                    y: t.y
                },
                panoCopyright: t.copyright,
                floor: t.floor,
                indoorModel: t.indoorModel,
                iid: t.iid,
                maxImgLevel: t.maxImgLevel
            };
            var n = _.panoData;
            _.panoData = t, a.dispatchEvent("after_pano_changed", {
                data: t,
                last_data: n,
                pano_change_dispatcher: f,
                isSupportWebGL: I
            }), f = void 0, "street" == t.panoType && (a._returnMarkVars.panoLastStreetPanoOptions = t), a._returnMarkVars.panoType = t.panoType
        },
        _removePanoFlashEvents: function() {
            var e = this._panoFlashWraper;
            e.removeEventListener("pov_changed", "pov_changed" + this.guid), e.removeEventListener("sdata_loaded", "sdata_loaded" + this.guid), e.removeEventListener("indoor_enter", "indoor_enter" + this.guid), e.removeEventListener("indoor_exit", "indoor_exit" + this.guid), e.removeEventListener("indoor_id_changed", "indoor_id_changed" + this.guid), e.removeEventListener("floor_changed", "floor_changed" + this.guid), e.removeEventListener("interface_ready", "interface_ready" + this.guid), e.removeEventListener("pano_error", "pano_error" + this.guid), e.removeEventListener("pano_player_error", "pano_player_error" + this.guid), e.removeEventListener("deselect_poi", "deselect_poi" + this.guid), e.removeEventListener("service_monitor", "service_monitor" + this.guid), e.removeEventListener("add_statistic", "add_statistic" + this.guid), e.removeEventListener("update_pano_position", "update_pano_position" + this.guid)
        },
        _initPanoFlash: function(e) {
            this._panoFlashWraper = new n(e, this._panoModuleContainer, this._panoConfigUrl), this._bindPanoFlashEvents(), this._addPanoReturn()
        },
        _addPanoReturn: function() {
            var e = T('<div id="pano-return-btn"><a class="pano_button" href="javascript:void(0);"><span></span><em>返回</em></a></div>')[0],
                a = this,
                t = document.getElementById("pano-container");
            t.appendChild(e);
            var n = this.backEventHandler = function(e) {
                (e.type !== c || 27 === e.keyCode) && (T(".video-player-container").length > 0 || (e.preventDefault(), addStat(STAT_CODE.STAT_PANORAMA, {
                    item: "return-click"
                }), 2 == g && p.stopClock("panoVideoPlayTime"), a.dispatchEvent("return_clicked", {
                    routeVideoEntrance: g,
                    returnVars: a._returnMarkVars
                }), g = 0))
            };
            T.on(e, "click", n), T.on(document, c, n)
        },
        getPanoStatus: function() {
            return this._returnMarkVars.panoLastStreetPanoOptions
        },
        enableShareMarker: function(e) {
            this._enableShareMarker = e
        },
        getShareParam: function() {
            if (!this._enableShareMarker) return null;
            var e = this.getMarkerUidInBestPano();
            return e ? {
                markerUid: e
            } : null
        },
        getMarkerUidInBestPano: function() {
            var e = "";
            return this._panoFlashWraper && this._flashInterfaceReady && (e = this._panoFlashWraper.getMarkerUidInBestPano()), e
        },
        toShareStatus: function() {
            this._panoFlashWraper.toShareStatus()
        },
        revertShareStatus: function() {
            this._panoFlashWraper.revertStatus()
        },
        setFlashCursorStyle: function(e) {
            this._panoFlashWraper.setFlashCursorStyle(e)
        },
        deleteTagMarker: function(e) {
            var a = e.id;
            E(a, "deleteIconClick", [a])
        },
        setMarkerStatus: function(e) {
            this._panoFlashWraper.setMarkerStatus(e)
        },
        setVisibility: function(e) {
            var a = document.getElementById("pano-return-btn");
            e ? (this._panoModuleContainer.style.visibility = "", this._isVisiable = !0, a.style.display = "block") : (this._panoModuleContainer.style.visibility = "hidden", this._isVisiable = !1, a.style.display = "none")
        },
        getSupportEvents: function() {
            return ["pov_changed", "zoom_changed", "indoor_enter", "indoor_exit", "indoor_plan_id_changed", "indoor_floor_changed", "visible_changed", "after_pano_changed", "after_go_to_poi", "once_tiles_complete", "pano_error", "pano_player_error", "show_position", "hide_position", "deselect_poi", "interface_ready", "routeVideo_pano_changed", "add_search_marker", "clicked_position", "return_clicked", "show_billion_pixels_dialog", "tag_marker_clicked"]
        }
    });
    t.exports = S
});;
define("pano:widget/module/PanoToolModule/PanoToolModule.js", function(o, n, a) {
    var i = o("pano:widget/base/ModuleClass.js"),
        t = o("pano:widget/base/ConstantConfig.js"),
        p = t.urlConfig,
        e = o("pano:widget/base/md5.js"),
        s = '.pano_button{background-color:#252525;_background-color:#252525;*background-color:#252525;background-color:rgba(37,37,37,.9);display:inline-block;cursor:pointer;overflow:hidden;width:40px;height:40px}.pano_button span{display:inline-block;margin:9px;height:22px;width:22px;background-image:url(//webmap1.bdimg.com/wolfman/static/pano/images/pano_whole/classification_search_icons2_a150f2f.png);background-repeat:no-repeat}#pano-return-btn{position:absolute;top:20px;left:18px;z-index:200002}#pano-return-btn .pano_button{height:40px;width:auto;text-decoration:none;border-radius:2px}#pano-return-btn .pano_button em{line-height:40px;height:40px;vertical-align:top;color:gray;font-style:normal;display:inline-block;text-decoration:none;margin-right:12px;font-size:12px}#pano-return-btn .pano_button span{background-image:url(//webmap0.bdimg.com/wolfman/static/pano/images/pano_whole/album_678b671.png);width:11px;height:18px;background-position:-98px -80px;margin:11px 8px 11px 19px}#pano-return-btn .pano_button:hover span{background-position:-79px -80px}#pano-return-btn .pano_button:hover em{color:#3af}#pano-share-btn{margin-bottom:5px}#pano-share-btn .pano_button{border-radius:0 0 2px 2px}#pano-share-btn .pano_button span{background-position:-66px -77px}#pano-share-btn .pano_button:hover span,#pano-share-btn.active .pano_button span{background-position:-95px -77px}#pano-upload-btn .pano_button span{background-position:-5px -77px}#pano-upload-btn .pano_button:hover span{background-position:-34px -77px}#pano-upload-btn .pano_button{border-radius:0}#pano-fold-btn{height:20px}#pano-fold-btn .pano_button{height:20px;border-radius:2px 2px 0 0}#pano-fold-btn .pano_button span{width:18px;height:16px;margin:4px 11px;background:url(//webmap0.bdimg.com/wolfman/static/pano/images/pano_whole/album_678b671.png)}#pano-fold-btn .pano_button span{background-position:-79px -61px}#pano-fold-btn .pano_button:hover span{background-position:-100px -61px}.pano_unfold_sidebar #pano-fold-btn .pano_button span{background-position:-79px -41px}.pano_unfold_sidebar #pano-fold-btn .pano_button:hover span{background-position:-100px -41px}.pano_fold_forbid{display:none}#pano-sidebar.pano_unfold_sidebar{}#pano-ugc-panel{position:absolute;bottom:4px;right:44px;display:none}#pano-ugc-panel a{font-size:12px;color:#abb0b2}#pano-ugc-panel a:hover{font-size:12px;color:#3cacfc}#pano-ugc-wrap{width:196px;height:40px;display:inline-block;background-color:rgba(37,37,37,.9);border-radius:2px;cursor:pointer;overflow:hidden}#pano-ugc-wrap .avatar-img-wrap{position:relative;left:16px;top:5px;display:inline-block;width:28px;height:28px;border-radius:14px;border:solid 1px #abb0b2;-webkit-mask-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC");overflow:hidden}#pano-ugc-wrap .avatar-img{position:relative;display:inline-block;width:28px;height:28px}#pano-ugc-wrap #user-info-wrap{position:absolute;left:58px;right:18px;height:26px;padding-top:14px;line-height:12px;display:inline-block;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}#pano-fishbone-btn{margin-bottom:5px;position:relative}#pano-fishbone-btn .pano_button{background-image:none}#pano-zoomout-btn{border-radius:2px 2px 0 0}#pano-zoomout-btn.pano_button span{background-position:-1px -54px}#pano-zoomout-btn.pano_button:hover span{background-position:-28px -54px}#pano-zoomout-btn.pano_button.pano_zoom_out_disabled span,#pano-zoomout-btn.pano_button.pano_zoom_out_disabled:hover span{background-position:-110px -101px;margin:9px}.pano-zoom-line{background-color:#3c3e42;_background-color:#3c3e42;opacity:.8;filter:alpha(opacity=90);_filter:alpha(opacity=90)}.pano-zoom-line div{height:1px;font-size:1px;line-height:1px;left:11px;width:18px;background:#3c3e42;_background-color:#3c3e42;position:absolute;top:39px;z-index:1000}#pano-upload-btn .pano-zoom-line div{top:79px;z-index:1000}#pano-zoomin-btn{border-radius:0 0 2px 2px}#pano-zoomin-btn.pano_button span{background-position:-55px -54px}#pano-zoomin-btn.pano_button:hover span{background-position:-80px -54px}#pano-zoomin-btn.pano_button.pano_zoom_in_disabled span,#pano-zoomin-btn.pano_button.pano_zoom_in_disabled:hover span{background-position:-137px -101px}#pano-classify-search-btn{display:none}#pano-classify-search-btn .pano_button{height:40px;width:40px}#pano-classify-search-btn .pano_button span{background-image:url(//webmap1.bdimg.com/wolfman/static/pano/images/pano_whole/classification_search_icons2_a150f2f.png);background-position:-107px -28px}#pano-classify-search-btn .pano_button:hover span{background-position:-135px -28px}#pano-classify-search-btn.classify_icon_1 .pano_button span{background-position:-2px -2px}#pano-classify-search-btn.classify_icon_2 .pano_button span{background-position:-54px -5px}#pano-classify-search-btn.classify_icon_3 .pano_button span{background-position:-161px -53px}#pano-classify-search-btn.classify_icon_4 .pano_button span{background-position:-29px -3px}#pano-classify-search-btn.classify_icon_5 .pano_button span{background-position:-80px -4px}#pano-classify-search-btn.classify_icon_1 .pano_button:hover span{background-position:-2px -27px}#pano-classify-search-btn.classify_icon_2 .pano_button:hover span{background-position:-54px -30px}#pano-classify-search-btn.classify_icon_3 .pano_button:hover span{background-position:-161px -26px}#pano-classify-search-btn.classify_icon_4 .pano_button:hover span{background-position:-29px -28px}#pano-classify-search-btn.classify_icon_5 .pano_button:hover span{background-position:-80px -29px}.billion-pixel-tip{display:none;width:100%;height:100%;position:relative}.modal_mask{position:absolute;width:100%;height:100%;background-color:#000;opacity:.7;filter:alpha(opacity=70);z-index:1000000}.prompt_dialog{width:614px;height:320px;position:absolute;top:50%;left:50%;margin-left:-307px;margin-top:-160px;background:rgba(0,0,0,.5);z-index:1000005}.ie8 .prompt_dialog{background:url(//webmap1.bdimg.com/wolfman/static/pano/images/pano_whole/billion_pixel_222b498.png) -5px -5px no-repeat;border:0}.close_dialog{float:right;display:inline-block;position:relative;top:12px;right:12px;width:24px;height:24px;cursor:pointer}.close_dialog span{display:inline-block;height:24px;width:24px;background-image:url(//webmap1.bdimg.com/wolfman/static/pano/images/pano_whole/billion_pixel_222b498.png);background-repeat:no-repeat;background-position:-529px -335px}.close_dialog:hover span{background-position:-563px -335px}.dialog_content_container{margin:33px 40px 10px}.dialog_title{color:#fff;font-size:35px;font-weight:700;font-family:"Microsoft YaHei";margin-bottom:8px}.dialog_content{color:#fff;margin:0 0 10px;font-size:16px;font-family:"Microsoft YaHei";line-height:2}.prompt_zoom_icon,.prompt_drag_icon{display:inline-block;height:30px;width:30px;background-image:url(//webmap1.bdimg.com/wolfman/static/pano/images/pano_whole/billion_pixel_222b498.png);background-repeat:no-repeat;vertical-align:middle}.prompt_zoom_icon{background-position:-5px -335px;margin-right:15px}.prompt_drag_icon{background-position:-95px -335px;margin-right:15px;margin-left:32px}.dialog_icon_label{font-size:16px;color:#fff;font-family:"Microsoft YaHei";vertical-align:middle}.never_prompt_div{width:100px;margin:20px 0 13px;font-size:13px;color:#fff;font-family:"Microsoft YaHei"}.never_prompt_label{cursor:pointer;color:#ddd;vertical-align:middle}.never_prompt_label:hover{color:#fff}.never_prompt{background:url(//webmap1.bdimg.com/wolfman/static/pano/images/pano_whole/billion_pixel_222b498.png) no-repeat -45px -335px;width:14px;height:14px;display:inline-block;margin-right:8px;*zoom:1;*display:inline;vertical-align:middle;cursor:pointer}.never_prompt_selected{background:url(//webmap1.bdimg.com/wolfman/static/pano/images/pano_whole/billion_pixel_222b498.png) no-repeat -69px -335px;width:14px;height:14px;display:none;*zoom:1;*display:inline}.enter_billion_pixels_btn{display:block;width:187px;height:44px;background:url(//webmap1.bdimg.com/wolfman/static/pano/images/pano_whole/billion_pixel_222b498.png) no-repeat -135px -335px;cursor:pointer}.enter_billion_pixels_btn:hover{background:url(//webmap1.bdimg.com/wolfman/static/pano/images/pano_whole/billion_pixel_222b498.png) no-repeat -332px -335px}#pano-max-min-btn{margin-bottom:5px;position:relative;display:none}#pano-max-min-btn .pano_button{background-image:none}#pano-max-zoom-btn{border-radius:2px 2px 0 0}#pano-max-zoom-btn.pano_button span{background-image:url(//webmap1.bdimg.com/wolfman/static/pano/images/pano_whole/billion_pixel_222b498.png);background-position:-597px -335px;background-repeat:no-repeat}#pano-max-zoom-btn.pano_button:hover span{background-position:-45px -367px}#pano-max-zoom-btn.pano_button.pano_max_zoom_disabled span,#pano-max-zoom-btn.pano_button.pano_max_zoom_disabled:hover span{background-position:-597px -367px}#pano-min-zoom-btn{border-radius:0 0 2px 2px}#pano-min-zoom-btn.pano_button span{background-image:url(//webmap1.bdimg.com/wolfman/static/pano/images/pano_whole/billion_pixel_222b498.png);background-position:-5px -399px;background-repeat:no-repeat}#pano-min-zoom-btn.pano_button:hover span{background-position:-37px -399px}#pano-min-zoom-btn.pano_button.pano_min_zoom_disabled span,#pano-min-zoom-btn.pano_button.pano_min_zoom_disabled:hover span{background-position:-69px -399px}';
    o.loadCss({
        content: s
    });
    var l = 4,
        r = 1,
        d = null,
        c = "",
        b = function() {
            var o, n = document.createElement("canvas"),
                a = !0;
            try {
                o = n.getContext("experimental-webgl") || n.getContext("webgl") || n.getContext("moz-webgl") || n.getContext("webkit-3d")
            } catch (i) {}
            return o || (a = !1), n = null, o = null, a
        },
        _ = i.extend("PanoToolModule", {
            constructor: function() {},
            initialize: function(o) {
                this._container = o, this._events = {}, this._addUGCPanel(), this._addFishboneTool(), this._addMaxMinZoomTool(), this._addShareTool(), this._addUploadPano(), this._addClassifySearchTool(), this._addInfoDialog()
            },
            getSupportEvents: function() {
                return ["zoom_changed", "tool_share_pano", "classify_search_panel_visible", "set_limit_zoom"]
            },
            setItemsEnable: function(o) {
                for (var n = this._container.getElementsByTagName("li"), a = 0, i = o.length; i > a; a++) {
                    var t = o[a];
                    n[a] && (t === !0 ? (b || "pano-classify-search-btn" !== n[a].id) && (n[a].style.display = "block") : t === !1 && (n[a].style.display = "none"))
                }
            },
            updateUGCPanel: function(o, n) {
                if (c = n, T.g("pano-ugc-panel").style.display = "none", o) {
                    var a = p.PANO_PAI_URL + "?qt=getuserpanoid&from=quanjing&panoid=";
                    a += n;
                    var i = "0c2c34aa18f4b1ef0e77941ce611351c",
                        t = e.hex_md5("from=quanjingpanoid=" + n + "qt=getuserpanoid" + i);
                    a += "&sign=" + t, baidu.jsonp(a, function(o) {
                        if (c === n && o && 0 === o.errno && o.data) {
                            var a = o.data;
                            T.g("pano-ugc-wrap").href = a.url, "https:" === location.protocol && a.headimg && (a.headimg = a.headimg.replace("http:", "https:")), T.g("avatar-img").src = a.headimg, T.g("user-info-wrap").innerHTML = "上传者：" + a.name, T.g("pano-ugc-panel").style.display = "block"
                        }
                    }, {
                        cbtype: "callback"
                    })
                }
            },
            setTilesLevelLimitValue: function(o, n) {
                l = o, r = n
            },
            setInfoDialogVisible: function(o) {
                var n = this;
                o ? document.cookie.indexOf("neverPrompt=true") < 0 ? this.modalDialogT.css("display", "block") : n.dispatchEvent("set_limit_zoom", {
                    data: r
                }) : this.modalDialogT.css("display", "none")
            },
            _addInfoDialog: function() {
                function o(o, n, a) {
                    var i = new Date;
                    i.setTime(i.getTime() + 24 * a * 60 * 60 * 1e3);
                    var t = "expires=" + i.toUTCString();
                    document.cookie = o + "=" + n + "; " + t
                }
                var n = this.modalDialogT = T('<div class="billion-pixel-tip"><div class="modal_mask" id="modal-mask"></div><div class="prompt_dialog" id="prompt-dialog"><a class="close_dialog" id="close-dialog"><span></span></a><div class="dialog_content_container"><h2 class="dialog_title">亿万像素全景图</h2><p class="dialog_content">像素过亿级的全景图片！不仅可进行360&deg;的全景浏览，滚动鼠标还可多级缩放！每一级都是清晰极致体验，纵览恢弘全局的同时，不放过任何细节。</p><span class="prompt_zoom_icon"></span><label class="dialog_icon_label">滚动鼠标缩放</label><span class="prompt_drag_icon"></span><label class="dialog_icon_label">左键拖动浏览</label><div class="never_prompt_div"><div id="never-prompt-checkbox" class="never_prompt"><span class="never_prompt_selected" id="selected"></span></div><label class="never_prompt_label" id="never-prompt-label">不再显示</label></div><div><span class="enter_billion_pixels_btn" id="enter-billion-pixels-btn"></span></div></div></div></div>');
                T.browser.ie <= 8 && n.addClass("ie8"), T.dom(T.g("pano-container")).prepend(n);
                var a = n.find("#close-dialog"),
                    i = n.find("#prompt-dialog"),
                    t = n.find("#never-prompt-checkbox"),
                    p = n.find("#selected"),
                    e = n.find("#enter-billion-pixels-btn"),
                    s = n.find("#never-prompt-label"),
                    l = this;
                l._events.toolCloseDialog = function(o) {
                    o.stopPropagation(), n.css("display", "none"), l.dispatchEvent("set_limit_zoom", {
                        data: r
                    })
                }, l._events.toolStopBubble = function(o) {
                    o.stopPropagation()
                };
                T("");
                l._events.setNeverPrompt = function() {
                    "inline-block" === p.css("display") ? (p.css("display", "none"), document.cookie.indexOf("neverPrompt=true") >= 0 && o("neverPrompt", "", -1)) : (p.css("display", "inline-block"), document.cookie.indexOf("neverPrompt=true") < 0 && o("neverPrompt", "true", 30))
                }, T.on(i, "click", l._events.toolStopBubble), T.on(a, "click", l._events.toolCloseDialog), T.on(t, "click", l._events.setNeverPrompt), T.on(s, "click", l._events.setNeverPrompt), T.on(e, "click", l._events.toolCloseDialog)
            },
            _addMaxMinZoomTool: function() {
                var o = T('<li id="pano-max-min-btn"><a id="pano-max-zoom-btn" title="最大图" href="javascript:void(0)" class="pano_button"><span></span></a><div class="pano-zoom-line"><div></div></div><a id="pano-min-zoom-btn" href="javascript:void(0)" title="最小图" class="pano_button pano_zoom_in_disabled"><span></span></a></li>');
                T.dom(this._container).prepend(o);
                var n = this,
                    a = T.g("pano-max-zoom-btn"),
                    i = T.g("pano-min-zoom-btn");
                n._events.toolMaxZoom = function() {
                    T("#pano-max-zoom-btn").hasClass("pano_max_zoom_disabled") || (addStat(STAT_CODE.STAT_PANORAMA, {
                        item: "billion-pixels-max-zoom-click"
                    }), n.dispatchEvent("set_limit_zoom", {
                        data: l
                    }))
                }, n._events.toolMinZoom = function() {
                    T("#pano-min-zoom-btn").hasClass("pano_min_zoom_disabled") || (addStat(STAT_CODE.STAT_PANORAMA, {
                        item: "billion-pixels-min-zoom-click"
                    }), n.dispatchEvent("set_limit_zoom", {
                        data: r
                    }))
                }, T.on(a, "click", n._events.toolMaxZoom), T.on(i, "click", n._events.toolMinZoom)
            },
            updateMaxMinZoomTool: function(o) {
                T("#pano-max-zoom-btn").removeClass("pano_max_zoom_disabled"), T("#pano-min-zoom-btn").removeClass("pano_min_zoom_disabled"), o === l ? T("#pano-max-zoom-btn").addClass("pano_max_zoom_disabled") : o === r && T("#pano-min-zoom-btn").addClass("pano_min_zoom_disabled")
            },
            _addUGCPanel: function() {
                var o = T('<li id="pano-ugc-panel"><a id="pano-ugc-wrap" title="上传者信息" href="javascript:void(0)" target="_blank"><div class="avatar-img-wrap"><img id="avatar-img" class="avatar-img" src="" /></div><span id="user-info-wrap">上传者：蓝盈盈1988测试长度的字符串</span></a></li>');
                T.dom(this._container).prepend(o)
            },
            _addFishboneTool: function() {
                var o = T('<li id="pano-fishbone-btn"><a id="pano-zoomout-btn" title="放大一级" href="javascript:void(0)" class="pano_button"><span></span></a><div class="pano-zoom-line"><div></div></div><a id="pano-zoomin-btn" href="javascript:void(0)" title="缩小一级" class="pano_button"><span></span></a></li>');
                T.dom(this._container).prepend(o);
                var n = this,
                    a = T.g("pano-zoomin-btn"),
                    i = T.g("pano-zoomout-btn");
                n._events.tool_zoom_out = function() {
                    T("#pano-zoomout-btn").hasClass("pano_zoom_out_disabled") || n.dispatchEvent("zoom_changed", {
                        data: 1
                    })
                }, n._events.tool_zoom_in = function() {
                    T("#pano-zoomin-btn").hasClass("pano_zoom_in_disabled") || n.dispatchEvent("zoom_changed", {
                        data: -1
                    })
                }, T.on(i, "click", n._events.tool_zoom_out), T.on(a, "click", n._events.tool_zoom_in)
            },
            _addClassifySearchTool: function() {
                d = T('<li id="pano-classify-search-btn"><a class="pano_button" title="分类周边检索" href="javascript:void(0);"><span></span></a><div class="pano-zoom-line"><div></div></div></li>')[0], T.dom(this._container).prepend(d);
                var o = this;
                this._events.tool_classify_search = function() {
                    o.dispatchEvent("classify_search_panel_visible", {
                        data: d
                    }), T.un(d, "mouseenter", o._events.tool_classify_search)
                }, T.on(d, "mouseenter", this._events.tool_classify_search)
            },
            updateFishBone: function(o) {
                T("#pano-zoomout-btn").removeClass("pano_zoom_out_disabled"), T("#pano-zoomin-btn").removeClass("pano_zoom_in_disabled"), o === l ? T("#pano-zoomout-btn").addClass("pano_zoom_out_disabled") : o === r && T("#pano-zoomin-btn").addClass("pano_zoom_in_disabled")
            },
            _addShareTool: function() {
                var o = T('<li id="pano-share-btn"><a class="pano_button" title="点击分享全景" href="javascript:void(0);"><span></span></a></li>');
                T.dom(this._container).prepend(o);
                var n = this;
                n._events.tool_share_pano = function(o) {
                    o.preventDefault(), T("html").css("overflow", "hidden"), n.dispatchEvent("tool_share_pano", {
                        data: ""
                    }), MapLogReport.send({
                        da_src: "pcmapPanoPG.barShare.click"
                    })
                }, T.on(o, "click", n._events.tool_share_pano), MapLogReport.send({
                    da_src: "pcmapPanoPG.barShare.show"
                })
            },
            _addUploadPano: function() {
                var o = this,
                    n = T('<li id="pano-upload-btn"><a id="tool-ugc-upload" class="pano_button" title="上传全景照片" href="//pai.baidu.com/?qt=viewapp" target="_blank"><span></span></a><div class="pano-zoom-line"><div></div></div></li>');
                o._events.tool_upload_redirect = function() {
                    addStat(STAT_CODE.STAT_PANORAMA, {
                        item: "pano-ugc-entrance-click-tool"
                    }), MapLogReport.send({
                        da_src: "pcmapPanoPG.barUpload.click"
                    })
                }, T.on(n, "click", o._events.tool_upload_redirect), T.dom(this._container).prepend(n), MapLogReport.send({
                    da_src: "pcmapPanoPG.barUpload.show"
                })
            },
            dispose: function() {
                T.un(T.g("pano-zoomout-btn"), "click", this._events.tool_zoom_out), T.un(T.g("pano-zoomin-btn"), "click", this._events.tool_zoom_in), T.un(T.g("pano-upload-btn"), "click", this._events.tool_upload_redirect), T.un(T.g("pano-share-btn"), "click", this._events.tool_share_pano), T.un(T.g("close-dialog"), "click", this._events.toolCloseDialog), T.un(T.g("prompt-dialog"), "click", this._events.toolStopBubble), T.un(T.g("never-prompt"), "click", this._events.setNeverPrompt), T.un(T.g("never-prompt-label"), "click", this._events.setNeverPrompt), T.un(T.g("enter-billion-pixels-btn"), "click", this._events.toolCloseDialog), T.un(T.g("pano-max-zoom-btn"), "click", this._events.toolMaxZoom), T.un(T.g("pano-min-zoom-btn"), "click", this._events.toolMinZoom), T.g("pano-fishbone-btn") && this._container.removeChild(T.g("pano-fishbone-btn")), T.g("pano-share-btn") && this._container.removeChild(T.g("pano-share-btn")), T.g("pano-max-min-btn") && this._container.removeChild(T.g("pano-max-min-btn")), T.g("pano-container").removeChild(this.modalDialogT[0])
            }
        });
    a.exports = _
});;
define("pano:widget/module/PanoMessageBox/PanoMessageBox.js", function(t, s, n) {
    var o = t("pano:widget/base/ModuleClass.js"),
        e = o.extend("PanoMessageBox", {
            loaded: !1,
            msgBox: null,
            closeBtn: null,
            closeBtn_img: null,
            msgIcon: null,
            msgTxt: null,
            msgBtn: [],
            _data: null,
            _container: null,
            constructor: function() {},
            initialize: function(t) {
                this.cinfo = t || {}, this._data = this.cinfo.data || {}, this._container = this.cinfo.container, this._container.style.display = "block", this.initMsgBox(this._data)
            },
            getSupportEvents: function() {
                return ["close_pano", "dispose"]
            },
            initMsgBox: function(t) {
                this._container.innerHTML = "", this.loaded && "" != this._container.innerHTML ? this.resetMsgBox(t) : (this.loaded = !0, this.createMsgBox(t)), this._container.style.display = "block"
            },
            show: function() {
                this.msgBox.style.display = "block"
            },
            hide: function() {
                this.msgBox.style.display = "none"
            },
            resetMsgBox: function(t) {
                var i = this.getMapPos();
                baidu.setStyles(this.msgBox, {
                    top: i.top + (i.height - 144) / 2 + "px",
                    left: i.left + (i.width - 322) / 2 + "px"
                }), this.msgTxt.innerHTML = t.info, this.setBtns(t), this.msgBox.style.display = "block"
            },
            createMsgBox: function(t) {
                var i = (this.getMapPos(), "url(//webmap0.bdimg.com/wolfman/static/pano/images/msg_icons_e3e0bc8.png)");
                this.msgBox = T.dom.create("div"), baidu.setStyles(this.msgBox, {
                    width: "322px",
                    height: "144px",
                    border: "1px solid #A8A8A8",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    backgroundColor: "#ffffff",
                    marginLeft: "-161px",
                    marginTop: "-77px"
                }), this.msgIcon = T.dom.create("div"), baidu.setStyles(this.msgIcon, {
                    backgroundPosition: "0px 0px",
                    backgroundImage: i,
                    width: "75px",
                    height: "87px",
                    position: "absolute",
                    left: "20px",
                    top: "30px"
                }), this.msgTxt = T.dom.create("div"), baidu.setStyles(this.msgTxt, {
                    width: "180px",
                    height: "20px",
                    fontSize: "14px",
                    fontWeight: "bold",
                    position: "absolute",
                    left: "115px",
                    top: "40px",
                    textAlign: "center"
                }), this.msgTxt.innerHTML = t.info, this.msgBox.appendChild(this.msgIcon), this.msgBox.appendChild(this.msgTxt), this.setBtns(t), this._container.appendChild(this.msgBox)
            },
            createBtns: function(t) {
                var s = "url(//webmap0.bdimg.com/wolfman/static/pano/images/msg_icons_e3e0bc8.png)";
                for (i = 0; t > i; i++) this.msgBtn[i] = T.dom.create("div"), baidu.setStyles(this.msgBtn[i], {
                    backgroundPosition: "0px -102px",
                    backgroundImage: s,
                    width: "84px",
                    height: "29px",
                    position: "absolute",
                    left: (1 == t ? 160 : 115 + 95 * i) + "px",
                    top: "89px",
                    lineHeight: "30px",
                    textAlign: "center",
                    fontSize: "12px",
                    cursor: "pointer"
                }), baidu.on(this.msgBtn[i], "mouseover", function() {
                    this.style.fontWeight = "bold", this.style.backgroundPosition = "0px -133px"
                }), baidu.on(this.msgBtn[i], "mousedown", function() {
                    this.style.fontWeight = "bold", this.style.backgroundPosition = "0px -133px"
                }), baidu.on(this.msgBtn[i], "mouseup", function() {
                    this.style.fontWeight = "normal", this.style.backgroundPosition = "0px -102px"
                }), baidu.on(this.msgBtn[i], "mouseout", function() {
                    this.style.fontWeight = "normal", this.style.backgroundPosition = "0px -102px"
                }), this.msgBox.appendChild(this.msgBtn[i])
            },
            setBtns: function(t) {
                var s = t.type,
                    n = t.returnUid,
                    o = this;
                for (i = 0; i < this.msgBtn.length; i++) this.msgBox.removeChild(this.msgBtn[i]);
                switch (this.msgBtn = [], s) {
                    case "alert":
                        this.createBtns(1), this.msgBtn[0].innerHTML = "确定", baidu.on(this.msgBtn[0], "click", function(t) {
                            baidu.event.stopPropagation(t), o.dispose()
                        });
                        break;
                    case "error":
                        this.createBtns(1), this.msgBtn[0].innerHTML = "确定", baidu.on(this.msgBtn[0], "click", function() {
                            o.dispatchEvent("close_pano"), o.dispose()
                        });
                        break;
                    default:
                        this.createBtns(2), this.msgBtn[0].innerHTML = "退出全景", this.msgBtn[1].innerHTML = "留在全景", baidu.on(this.msgBtn[0], "click", function() {
                            o.dispatchEvent("close_pano", {
                                data: t
                            }), o.dispose()
                        }), baidu.on(this.msgBtn[1], "click", function(t) {
                            var i = window.addStat,
                                s = window.STAT_CODE;
                            n && i(s.STAT_PANORAMA, {
                                item: "pano_search_stay_pano"
                            }), baidu.event.stopPropagation(t), o.dispose()
                        })
                }
            },
            closeMsg: function() {
                this.msgBox.style.display = "none"
            },
            getMapPos: function() {
                var t = baidu.g("MapHolder"),
                    i = T.dom.getPosition(t),
                    s = t.clientWidth,
                    n = t.clientHeight;
                return {
                    left: i.left,
                    top: i.top,
                    width: s,
                    height: n
                }
            },
            dispose: function() {
                this.msgBox && (this._container.removeChild(this.msgBox), this._container.style.display = "none", this.msgBox = null, this.dispatchEvent("dispose"))
            }
        });
    n.exports = e
});;
define("pano:widget/module/PanoOverviewModule/PanoMapComponent/PanoLocatorComponent/PanoLocatorComponent.js", function(e, t, i) {
    function n(e) {
        this._opts = e, this.MAP_PAN_DIRECTION = [
            [0, 0],
            [-1, -1],
            [-1, 0],
            [-1, 1],
            [0, 1],
            [1, 1],
            [1, 0],
            [1, -1],
            [0, -1]
        ], this.DIV_ROTATE_DIRECTION = [
            [0, -19, -64],
            [22.5, -203, -59],
            [45, -391, -59],
            [67.5, -581, -58],
            [90, -778, -55],
            [112.5, -979, -50],
            [135, -1178, -55],
            [157.5, -1387, -51],
            [180, -1611, -60],
            [202.5, -1821, -61],
            [225, -2030, -65],
            [247.5, -2243, -73],
            [270, -2457, -62],
            [292.5, -2685, -65],
            [315, -2901, -70],
            [337.5, -3120, -70]
        ];
        var t = e.position;
        t && t instanceof BMap.Point && (this._map = null, this._mapc = null, this._container = null, this._position = t, this._size = null, this._viewsetting = 0, this._moving = !1, this._nowviewtype = 0, this._viewtypetimer = null, this._dragMovePixel = null, this._arrowDirection = "-168px -72px", this._direction = null, e = e || {}, this._opts = baidu.extend(this._opts || {}, {
            enableDragging: !0,
            anchor: new BMap.Size(-55, -55)
        }))
    }
    var o = e("common:widget/ui/util/util.js");
    baidu.lang.inherits(n, BMap.Overlay, "PanoLocatorComponent"), baidu.object.extend(n.prototype, {
        initialize: function(e) {
            this._opts;
            return this.initMapLocator(e)
        },
        initMapLocator: function(e) {
            var t = this,
                i = t._container = document.createElement("div"),
                n = document.createElement("div"),
                o = "url(//webmap0.bdimg.com/wolfman/static/pano/images/panorama/pano_markers_1959b18.png)!important";
            t._map = e, t._div = i, t._arrow = n, t._mapc = e.getContainer(), t._bgu = o;
            var a = baidu.dom.getPosition(this._mapc);
            return this._mapcTop = a.top, this._mapcLeft = a.left, t._rotating = !1, t._setDefCursor(), baidu.extend(i.style, {
                position: "absolute",
                zIndex: BMap.Overlay.getZIndex(t._position.lat),
                backgroundRepeat: "no-repeat",
                backgroundPosition: "-560px 0",
                cursor: "pointer",
                height: "110px",
                width: "110px"
            }), baidu(i).addClass("pano-fan"), baidu.extend(n.style, {
                position: "absolute",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "0 0",
                left: "40px",
                height: "24px",
                width: "24px",
                marginTop: "40px"
            }), baidu(n).addClass("pano-overlay-ie"), i.appendChild(n), t._map.getPanes().labelPane.appendChild(i), i
        },
        draw: function() {
            var e, t = this,
                i = t._opts.anchor;
            e = t._map.pointToOverlayPixel(this._position), t._container.style.left = e.x + i.width + "px", t._container.style.top = e.y + i.height + "px"
        },
        enableDragging: function() {
            this._opts.enableDragging = !0
        },
        disableDragging: function() {
            this._opts.enableDragging = !1
        },
        getPosition: function() {
            return this._position
        },
        setPosition: function(e) {
            this._position = e, this.draw()
        },
        getDirection: function() {
            return this._direction
        },
        setDirection: function(e) {
            if (!isNaN(e)) {
                var t = this._direction = e;
                this._getRotateDirection(t)
            }
        },
        setOffset: function() {
            var e = baidu.dom.getPosition(this._mapc);
            this._mapcTop = e.top, this._mapcLeft = e.left
        },
        remove: function() {
            this._dispatchEvent(this, "onremove"), this._container && o.purgeEvents(this._container), this._container && this._container.parentNode && this._container.parentNode.removeChild(this._container)
        },
        _setDefCursor: function() {
            T.browser.firefox ? (this.defaultCursor = "-moz-grab", this.draggingCursor = "-moz-grabbing") : T.browser.chrome || T.browser.safari ? (this.defaultCursor = "url(//webmap1.bdimg.com/wolfman/static/pano/images/api/openhand_feff915.cur) 8 8, default", this.draggingCursor = "url(//webmap0.bdimg.com/wolfman/static/pano/images/api/closedhand_5e32821.cur) 8 8, default") : (this.defaultCursor = "url(//webmap1.bdimg.com/wolfman/static/pano/images/api/openhand_feff915.cur)", this.draggingCursor = "url(//webmap0.bdimg.com/wolfman/static/pano/images/api/closedhand_5e32821.cur)")
        },
        _getRotateDirection: function(e) {
            if (!isNaN(e)) {
                {
                    var t = this.DIV_ROTATE_DIRECTION,
                        i = 0,
                        n = e - 31.75;
                    t.length
                }
                if (n > t[15][0]) this._div.style.backgroundPosition = t[15][1] + "px " + t[15][2] + "px";
                else
                    for (var i = 0; 16 > i; i++)
                        if (n < t[i][0]) {
                            this._div.style.backgroundPosition = t[i][1] + "px " + t[i][2] + "px";
                            break
                        }
            }
        },
        _getMoveDirection: function(e, t) {
            if (!isNaN(e) && !isNaN(t)) {
                var i = -1,
                    n = e - this.preX;
                return this.preX > 5 && 0 > n ? i = 0 : this.preX > 5 && n > 0 && (i = 1), this.preX = e, this.preY = t, i
            }
        },
        _setEventDispath: function() {
            function e(e) {
                var e = window.event || e,
                    i = e.pageX || e.clientX || 0,
                    n = e.pageY || e.clientY || 0,
                    o = new BMap.Pixel(i, n),
                    a = t._map.pixelToPoint(o);
                return {
                    pixel: o,
                    point: a
                }
            }
            var t = this,
                i = t._container,
                n = t._arrow,
                o = t._mapc,
                a = (t._dom, t._angle, !1),
                p = !1,
                s = null;
            n.onclick = function(e) {
                t._dispatchEvent(t, "onarrclick"), t.stopAndPrevent(e)
            }, i.onclick = function(i) {
                var n = e(i),
                    o = n.pixel.x - t._mapcLeft,
                    a = n.pixel.y - t._mapcTop,
                    p = t._map.pointToPixel(t._position).x,
                    s = t._map.pointToPixel(t._position).y,
                    r = 180 - Math.atan2(o - p, a - s) / 3.1415926 / 2 * 360;
                t._getRotateDirection(r), t._dispatchEvent(t, "oncircleclick", {
                    point: n.point,
                    pixel: n.pixel,
                    angle: r
                }), t.stopAndPrevent(i)
            }, i.onmousedown = function(n) {
                var p = e(n),
                    r = p.pixel.x - t._mapcLeft,
                    l = p.pixel.y - t._mapcTop,
                    c = t._map.pointToPixel(t._position).x,
                    d = t._map.pointToPixel(t._position).y,
                    m = 180 - Math.atan2(r - c, l - d) / 3.1415926 / 2 * 360;
                s = p.pixel, a = !0, t._rotating || (t._rotating = !0, i.setCapture ? (baidu.on(i, "onmousemove", u), baidu.on(i, "onmouseup", _)) : (baidu.on(window, "onmousemove", u), baidu.on(window, "onmouseup", _))), t._dispatchEvent(t, "onrotatestart", {
                    point: p.point,
                    pixel: p.pixel,
                    angle: m
                }), i.setCapture && i.setCapture(), o.style.MozUserSelect = "none", o.style.KhtmlUserSelect = "none", o.style.WebkitUserSelect = "none", o.unselectable = "on", o.onselectstart = function() {
                    return !1
                }, t.stopAndPrevent(n)
            }, n.onmousedown = function(a) {
                var u = e(a);
                return n.setCapture ? (baidu.on(n, "onmousemove", l), baidu.on(n, "onmouseup", r)) : (baidu.on(window, "onmousemove", l), baidu.on(window, "onmouseup", r)), t._opts.enableDragging ? (s = u.pixel, t._dispatchEvent(t, "ondragstart", {
                    point: t._position
                }), p = !0, n.style.cursor = t.draggingCursor, baidu(i).removeClass("pano-fan"), n.setCapture && n.setCapture(), o.style.MozUserSelect = "none", o.style.KhtmlUserSelect = "none", o.style.WebkitUserSelect = "none", o.unselectable = "on", o.onselectstart = function() {
                    return !1
                }, void t.stopAndPrevent(a)) : void t.stopAndPrevent(a)
            };
            var r = function(u) {
                    e(u);
                    return t._dispatchEvent(t, "onmouseup", {
                        point: t._position
                    }), n.releaseCapture ? (baidu.un(n, "onmousemove", l), baidu.un(n, "onmouseup", r)) : (baidu.un(window, "onmousemove", l), baidu.un(window, "onmouseup", r)), t._opts.enableDragging ? (n.releaseCapture && n.releaseCapture(), baidu(i).addClass("pano-fan"), clearInterval(t._viewtypetimer), t._dispatchEvent(t, "ondragend", {
                        point: t._position
                    }), p = !1, a = !1, s = null, o.style.MozUserSelect = "", o.style.KhtmlUserSelect = "", o.style.WebkitUserSelect = "", o.unselectable = "off", o.onselectstart = function() {}, void t.stopAndPrevent(u)) : void t.stopAndPrevent(u)
                },
                l = function(i) {
                    if (t._opts.enableDragging && p) {
                        var n, o, a, r = e(i);
                        n = t._map.pointToPixel(t._position), o = r.pixel.x - s.x + n.x, a = r.pixel.y - s.y + n.y, s = r.pixel, c(i), t._dispatchEvent(t, "ondragging", {
                            point: t._position
                        }), t.stopAndPrevent(i)
                    }
                },
                u = function(i) {
                    if (a) {
                        var n = e(i),
                            o = n.pixel.x - t._mapcLeft,
                            p = n.pixel.y - t._mapcTop,
                            s = t._map.pointToPixel(t._position).x,
                            r = t._map.pointToPixel(t._position).y,
                            l = t._direction = 180 - Math.atan2(o - s, p - r) / 3.1415926 / 2 * 360;
                        t._getRotateDirection(l), t._dispatchEvent(t, "onrotating", {
                            point: n.point,
                            pixel: n.pixel,
                            angle: l
                        }), t.stopAndPrevent(i)
                    }
                },
                _ = function(n) {
                    if (t._rotating) {
                        t._rotating = !1, i.releaseCapture ? (baidu.un(i, "onmousemove", u), baidu.un(i, "onmouseup", _)) : (baidu.un(window, "onmousemove", u), baidu.un(window, "onmouseup", _)), i.releaseCapture && i.releaseCapture();
                        var a = e(n);
                        t._dispatchEvent(t, "onrotateend", {
                            point: a.point,
                            pixel: a.pixel,
                            angle: t._direction
                        }), o.style.MozUserSelect = "", o.style.KhtmlUserSelect = "", o.style.WebkitUserSelect = "", o.unselectable = "off", o.onselectstart = function() {}, t.stopAndPrevent(n)
                    }
                },
                c = function(i) {
                    if (t._opts.enableDragging && p) {
                        var n = e(i),
                            a = (t._map.pointToPixel(t._position), baidu.g("pano-overview-wrapper")),
                            r = n.pixel.x - t._mapcLeft,
                            l = a.style.height;
                        if ("300px" !== l) var u = n.pixel.y - t._mapcTop + a.offsetHeight - 300;
                        else var u = n.pixel.y - t._mapcTop;
                        s = n.pixel, t._position = t._map.pixelToPoint(new BMap.Pixel(r, u));
                        var _ = null,
                            c = r / o.offsetWidth,
                            m = u / o.offsetHeight,
                            _ = d(c, m);
                        if (t._nowviewport && _ === t._nowviewport) t.draw();
                        else if (0 == _) t._position = t._map.pixelToPoint(new BMap.Pixel(r, u)), t.draw(), t._nowviewport = 0, clearInterval(t._viewtypetimer);
                        else {
                            clearInterval(t._viewtypetimer), t._nowviewport = _, t.draw(); {
                                var g = t._map.pointToPixel(t._map.getCenter()).x,
                                    v = t._map.pointToPixel(t._map.getCenter()).y;
                                t._map.pixelToPoint(new BMap.Pixel(g, v))
                            }
                            t._viewtypetimer = setInterval(function() {
                                t._map.panBy(-8 * t.MAP_PAN_DIRECTION[_][0], -8 * t.MAP_PAN_DIRECTION[_][1], null, !0), __x = t._map.pointToPixel(t._position).x + 8 * t.MAP_PAN_DIRECTION[_][0], __y = t._map.pointToPixel(t._position).y + 8 * t.MAP_PAN_DIRECTION[_][1], t._position = t._map.pixelToPoint(new BMap.Pixel(__x, __y)), t.draw()
                            }, 30)
                        }
                    }
                },
                d = function(e, t) {
                    if (!isNaN(e) && !isNaN(t)) {
                        var i, n = .2,
                            o = .2;
                        return n > e ? i = o > t ? 1 : t > 1 - o ? 3 : 2 : e > 1 - n ? i = o > t ? 7 : t > 1 - o ? 5 : 6 : o > t ? i = 8 : t > 1 - o ? i = 4 : (i = 0, i = 0), i
                    }
                }
        },
        _dispatchEvent: function(e, t, i) {
            0 != t.indexOf("on") && (t = "on" + t);
            var n = new baidu.lang.Event(t);
            if (i)
                for (var o in i) n[o] = i[o];
            e.dispatchEvent(n)
        },
        stopAndPrevent: function(e) {
            var e = window.event || e;
            baidu.event.preventDefault(e), baidu.event.stopPropagation(e)
        }
    }), i.exports = n
});;
define("pano:widget/module/PanoOverviewModule/PanoMapComponent/PanoPoiClickComponent/PanoPoiClickComponent.js", function(e, t, o) {
    function n(e) {
        this._opts = e, this.overlay = e.overlay, this._map = e.map, this.cbfunction = e.callback, this.cacheData = {}, this.maxCache = 8, this.cacheIds = [], this.poiSpotId = null, this.spotOnId = "", this.spotOnUid = null, this.mkr = [], this.label = null, this.squareSide = 4, this.tMkr = null, this.tempMarker = null, this.tempLabel = null, this.overSpotPoint = null, this.isMoving = !1, this.fetchId = "", this.curTileId = "", this.labelName = "", this.ic = new BMap.Icon("//webmap1.bdimg.com/wolfman/static/pano/images/pano_whole/indoor_icon_61ea549.png", new BMap.Size(24, 28), {
            offset: new BMap.Size(10, 12),
            infoWindowOffset: new BMap.Size(5, 0)
        }), this.clickVersion = i.INDOOR_CLICK_VER || "1003", this.initialize()
    }
    var a = e("common:widget/ui/config/config.js"),
        i = a.mapVersion,
        l = a.urlConfig;
    baidu.lang.inherits(n, baidu.lang.Class, "PanoPoiClickComponent"), baidu.object.extend(n.prototype, {
        initialize: function() {
            this.bind()
        },
        refresh: function(e) {
            var t = this;
            t.clearPoiCache(), t.hideOverlays(), t.tMkr = null, t.tempMarker = null, t.tempLabel = null, t.spotOnId = null, t._map = e, t.initialize()
        },
        bind: function() {
            this.bindMapRequest(), this.bindMouseMove(), this.bindSpotEvent()
        },
        bindMapRequest: function() {
            var e = this,
                t = e._map;
            t.addEventListener("tilesloaded", function() {
                t.getZoom() < 10 && e.clearPoiCache()
            }), t.addEventListener("zoomend", function() {
                e.clearPoiCache(), e.hideOverlays()
            })
        },
        bindMouseMove: function() {
            var e = this,
                t = e._map;
            e._panomouseMoveEvent || (e._panomouseMoveEvent = function(t) {
                e._mouseMoveEvent(t)
            }), t.addEventListener("mousemove", e._panomouseMoveEvent)
        },
        _mouseMoveEvent: function(e) {
            var t = this,
                o = t._map;
            if (o.getZoom() < 10) t.clearPoiCache();
            else {
                if (!e || !e.point) return;
                t.overSpotPoint = e.point, t.isMoving = !0;
                var n = o.getTileId(e.point, o.getZoom());
                if (!n.row || !n.column || !n.level) return;
                t.curTileId = n.level + "_" + n.row + "_" + n.column;
                var a = n.level + "_" + t.m1(n.row) + "_" + t.m1(n.column);
                t.cacheData[a] ? t.spotOnId != t.curTileId && t._addSpot(t.curTileId) : t.sendRequest({
                    l: n.level,
                    x: t.m1(n.row),
                    y: t.m1(n.column)
                })
            }
        },
        _addSpot: function(e) {
            var t = this,
                o = t._map,
                n = e.split("_"),
                a = n[0] + "_" + t.m1(n[1]) + "_" + t.m1(n[2]);
            if (t.cacheData[a]) {
                var i = t.cacheData[a][e] ? t.cacheData[a][e] : !1;
                if (i) {
                    for (var l, r = 0; r < i.length; r++) l = new BMap.Marker(i[r].pt, {
                        icon: new BMap.Icon("//webmap1.bdimg.com/wolfman/static/pano/images/pano_whole/indoor_icon_61ea549.png", new BMap.Size(24, 28))
                    }), l.userdata = i[r].userdata, t.mkr.push(l), l.addEventListener("click", function(e) {
                        t.clickMkr(e), t.stopAndPrevent(e)
                    }), o.addOverlay(l);
                    t.spotOnId = e;
                    for (var s = -1, r = 0, p = t.cacheIds.length; p > r; r++)
                        if (a == t.cacheIds[r]) {
                            s = r;
                            break
                        }
                    s >= 0 && (t.cacheIds.splice(s, 1), t.cacheIds.push(a))
                }
            }
        },
        sendRequest: function(e) {
            var t = this;
            if (e && t.fetchId != e.l + "_" + e.x + "_" + e.y) {
                t.fetchId = e.l + "_" + e.x + "_" + e.y;
                var o = e.x + "_" + e.y + "_" + e.l + "_" + this.clickVersion;
                baidu.jsonp(l.PANO_INDOOR_ICON_URL + "/?qt=ck&tid=" + o, {
                    cbtype: "fn",
                    success: function(e) {
                        e = e && e.content || {}, e && e.length > 0 && t.getPoiData(e)
                    },
                    error: function() {}
                })
            }
        },
        getPoiData: function(e) {
            for (var t = {}, o = !1, n = this, a = n._map, i = 0, l = e.length; l > i; i++) {
                for (var r = [], s = e[i], p = 0, c = s.uids.length; c > p; p++) {
                    var d = s.uids[p],
                        m = (d.bound.xmax + d.bound.xmin) / 2,
                        u = (d.bound.ymax + d.bound.ymin) / 2,
                        v = a.pointToPixel(new BMap.Point(d.bound.xmin, d.bound.ymin)),
                        h = a.pointToPixel(new BMap.Point(d.bound.xmax, d.bound.ymax)),
                        f = [(v.x - h.x) / 2, (h.y - v.y) / 2, (h.x - v.x) / 2, (v.y - h.y) / 2];
                    "street_1" != d.catalog && r.push({
                        pt: new BMap.Point(m, u),
                        bd: f,
                        userdata: {
                            name: d.name ? d.name : "",
                            uid: d.uid,
                            type: d.type,
                            iconpoint: d.icon ? new BMap.Point(d.icon.x, d.icon.y) : ""
                        },
                        tag: "MAP_SPOT_INFO"
                    })
                }
                n.curTileId && n.curTileId == s.tileid && (o = !0), t[s.tileid] = r
            }
            var _ = e[0].tileid.split("_"),
                b = _[0] + "_" + n.m1(_[1]) + "_" + n.m1(_[2]);
            if (n.cacheData[b] = t, n.cacheIds.push(b), n.cacheIds.length > n.maxCache) {
                var M = n.cacheIds.shift();
                delete n.cacheData[M], delete M
            }
            o && n._addSpot(n.curTileId)
        },
        bindSpotEvent: function() {
            var e = this;
            e.addSpotEvent()
        },
        addSpotEvent: function() {
            var e = this,
                t = e._map;
            e._panomoveOverSpot || (e._panomoveOverSpot = function(t) {
                e.stopAndPrevent(t), e._moveOverSpot(t)
            }), e._panomoveOutSpot || (e._panomoveOutSpot = function(t) {
                e._moveOutSpot(t)
            }), t.addEventListener("spotmouseover", e._panomoveOverSpot), t.addEventListener("spotmouseout", e._panomoveOutSpot)
        },
        removeSpotEvent: function() {
            var e = this,
                t = e._map;
            t.removeEventListener("mousemove", e._panomouseMoveEvent), t.removeEventListener("spotmouseover", e._panomoveOverSpot), t.removeEventListener("spotmouseout", e._panomoveOutSpot)
        },
        _moveOverSpot: function(e) {
            var t = this,
                o = t._map;
            if (!(o.getZoom() < 10)) {
                var n = e.spots;
                if (n && !(n.length < 1) && n[0].tag && "MAP_SPOT_INFO" == n[0].tag) {
                    var a = n[0].userdata.iconpoint ? n[0].userdata.iconpoint : n[0].pt;
                    if (t.tempMarker.setTop(!0), t.tMkr = t.tempMarker, this.overlay) {
                        this.overlay.disable();
                        var i = n[0].userdata;
                        this.overlay.enableIndoorOverlay(a, i.uid, i.name)
                    }
                    var l = {
                        backgroundColor: "#FFFFE1",
                        borderColor: "#8C8C8C",
                        color: "#4D4D4D"
                    };
                    t.labelName = n[0].userdata.name, t.tempLabel && t.tempLabel.map ? (t.tempLabel.setPoint(a), t.tempLabel.setOffset(new BMap.Size(-6 * t.labelName.length, 16)), t.tempLabel.setContent(t.labelName), t.label = t.tempLabel, t.label.show()) : (t.tempLabel = new BMap.Label(t.labelName, {
                        point: a
                    }), t.tempLabel.setOffset(new BMap.Size(-6 * t.labelName.length, 16)), t.tempLabel.setStyle(l), t.label = t.tempLabel, o.addOverlay(t.label))
                }
            }
        },
        _moveOutSpot: function() {
            var e = this,
                t = e._map;
            t.getZoom() < 10 || (this.overlay && (this.overlay.enable(), this.overlay.disableIndoorOverlay()), e.tMkr = null, e.hideOverlays())
        },
        moveSpot: function(e) {
            me.stopAndPrevent(e)
        },
        clickMkr: function(e) {
            {
                var t = this;
                t._map
            }
            t.tMkr = null, t.tempLabel = null, t.spotOnId = null, t.dispatchEvent("click", {
                panoUid: e.target.userdata.uid,
                panoType: "inter"
            }), t.stopAndPrevent(e), addStat(STAT_CODE.STAT_PANORAMA, {
                item: "inter",
                catalog: "map",
                func: "click",
                from: "overview-map"
            })
        },
        clearPoiCache: function() {
            var e = this,
                t = e._map;
            if (e.mkr)
                for (var o = 0; o < e.mkr.length; o++) t.removeOverlay(e.mkr[o])
        },
        hideOverlays: function() {
            var e = this;
            e.label && e.label.hide()
        },
        m1: function(e) {
            return Math.floor(parseInt(e, 10) / this.squareSide)
        },
        stopAndPrevent: function(e) {
            var e = window.event || e;
            baidu.event.stopPropagation(e), baidu.event.preventDefault(e)
        }
    }), o.exports = n
});;
define("pano:widget/module/PanoOverviewModule/PanoMapComponent/PanoRoadNetComponent/PanoRoadNetComponent.js", function(e, i, t) {
    function a(e) {
        baidu.lang.Class.call(this), this.map = e.map;
        var i = e.context.panoContext,
            t = i.getPanoUrlConfig();
        this.PANO_URL = t.PANO_ROAD_LAYER_URL, this.udtVersion = t.PANO_UDT_VERSION || "20130929", this.visible = !1, this.layerId = ""
    }
    baidu.lang.inherits(a, baidu.lang.Class, "PanoRoadNetComponent"), baidu.object.extend(a.prototype, {
        show: function() {
            this.addLayer(), this.dispatchEvent("onshow", {
                visible: !0
            })
        },
        hide: function() {
            this.removeLayer(), this.dispatchEvent("onhide", {
                visible: !1
            })
        },
        isVisible: function() {
            return this.visible
        },
        addLayer: function() {
            var e = this,
                i = e.map;
            if (i && !i.getTileLayer(e.layerId)) {
                var t = !0,
                    a = i.getMapType() == BMAP_NORMAL_MAP ? "il" : "sl";
                a = "pl";
                var n = e.tilelayer = new BMap.TileLayer({
                    transparentPng: t
                });
                n.zIndex = 1, n.getTilesUrl = function(i, t) {
                    t = Math.floor(t);
                    var n = e.PANO_URL + "/tile/?udt=" + e.udtVersion + "&qt=tile&styles=" + a + "&x=" + i.x + "&y=" + i.y + "&z=" + t;
                    return T.browser.ie && T.browser.ie <= 6 && (n += "&color_dep=32"), n
                }, i.addTileLayer(n), e.layerId = n.getMapType(), e.visible = !0
            }
        },
        removeLayer: function() {
            var e = this,
                i = e.map,
                t = i.getTileLayer(e.layerId);
            t && (i.removeTileLayer(t), e.layerId = ""), e.visible = !1
        },
        getLayerId: function() {
            return this.layerId
        },
        update: function() {
            this.removeLayer(), this.addLayer()
        }
    }), t.exports = a
});;
define("pano:widget/module/PanoOverviewModule/PanoMapComponent/PanoMapComponent.js", function(e, t, o) {
    function n(e, t, o) {
        baidu.lang.Class.call(this), this.mapContainer = e, t.level = Math.floor(t.level), this._opts = t;
        var n = t.data.currentPoint || t.data.panoMCPoint;
        this.point = new BMap.Point(n.x, n.y), this.level = t.level || 16, this._map = null, this._fishboneCtrl = null, this._roadnet = null, this._poiClickLayer = null, this._overlay = null, this._indoorModel = o, this._topologyMarkers = [], this.tipLabel = null, this.arrowMarkers = []
    }
    var a = e("pano:widget/module/PanoOverviewModule/PanoMapComponent/PanoRoadNetComponent/PanoRoadNetComponent.js"),
        i = e("pano:widget/module/PanoOverviewModule/PanoMapComponent/PanoPoiClickComponent/PanoPoiClickComponent.js"),
        r = e("pano:widget/module/PanoOverviewModule/PanoMapComponent/PanoLocatorComponent/PanoLocatorComponent.js"),
        s = e("pano:widget/base/service.js"),
        d = e("pano:widget/base/util.js"),
        p = e("common:widget/ui/mapUtil/mapUtil.js"),
        l = e("pano:widget/model/NavRoute.js"),
        v = (e("common:widget/ui/Animation/Animation.js"), [{
            stroke: 6,
            color: "#3a6bdb",
            opacity: .65
        }, {
            stroke: 6,
            color: "#3a6bdb",
            opacity: .95
        }, {
            stroke: 6,
            color: "#78bc5f",
            opacity: .95
        }, {
            stroke: 5,
            color: "#3a6bdb",
            opacity: .65
        }, {
            stroke: 6,
            color: "#3a6bdb",
            opacity: .5
        }, {
            stroke: 4,
            color: "#78bc5f",
            opacity: .5
        }, {
            stroke: 6,
            color: "#688DE1",
            opacity: .95,
            strokeStyle: "dashed"
        }, {
            stroke: 6,
            COLOR: "#575757",
            OPACITY: .95,
            STROKESTYLE: "DOTTED"
        }]);
    baidu.lang.inherits(n, baidu.lang.Class, "PanoMapComponent"), baidu.object.extend(n.prototype, {
        initialize: function() {
            this.eventHandlers = {}, this.initMapLayer(), this.initRoadNetLayer(), this.initPoiClickLayer(), this.initOverlay(), this.updateTopologyMarkers(), this.initScaleControl()
        },
        updateTopologyMarkers: function(e) {
            for (var t, o = this._map, n = this; this._topologyMarkers.length;) t = this._topologyMarkers.pop(), o.removeOverlay(t);
            if (!e) {
                var a = this._indoorModel;
                if (a && a.has2DMap()) {
                    var i = a.getTopologyPoints(),
                        r = "//webmap0.bdimg.com/wolfman/static/pano/images/panorama/indoor_marker_24_b5a9d8a.png",
                        s = new BMap.Icon(r, new BMap.Size(16, 16), {
                            imageOffset: new BMap.Size(0, 30),
                            imageSize: new BMap.Size(30, 56)
                        });
                    this._topologyMarkers = d.each(i, function(e) {
                        var t = new BMap.Marker(new BMap.Point(e.panox, e.panoy), {
                            icon: s,
                            title: e.name
                        });
                        return t.addEventListener("click", function() {
                            n.dispatchEvent("pano_changed", {
                                data: {
                                    panoId: e.id,
                                    panoType: "inter"
                                }
                            })
                        }), o.addOverlay(t), t
                    }, !0)
                }
            }
        },
        initScaleControl: function() {
            var e = this._map,
                t = T('<div id="scale-controll-area"><a id="map-zoomout" title="放大一级" href="javascript:void(0)" class="fishbone_button"><span></span></a><div id="map-zoom-line"><div></div></div><a id="map-zoomin" href="javascript:void(0)" title="缩小一级" class="fishbone_button"><span></span></a></div>');
            this._fishBone = t[0], this.mapContainer.appendChild(this._fishBone);
            var o = T.g("map-zoomout"),
                n = T.g("map-zoomin");
            baidu.on(o, "click", function(t) {
                baidu.event.preventDefault(t), baidu.event.stopPropagation(t);
                var o = Math.floor(e.getZoom());
                19 > o && (e.zoomTo(o + 1), addStat(STAT_CODE.STAT_PANORAMA, {
                    item: "zoom-out-click"
                }))
            }), baidu.on(o, "mouseenter", function() {
                baidu(o).addClass("hover")
            }), baidu.on(o, "mouseleave", function() {
                baidu(o).removeClass("hover")
            }), baidu.on(n, "click", function(t) {
                baidu.event.preventDefault(t), baidu.event.stopPropagation(t);
                var o = Math.floor(e.getZoom());
                o > 3 && (e.zoomTo(o - 1), addStat(STAT_CODE.STAT_PANORAMA, {
                    item: "zoom-in-click"
                }))
            }), baidu.on(n, "mouseenter", function() {
                baidu(n).addClass("hover")
            }), baidu.on(n, "mouseleave", function() {
                baidu(n).removeClass("hover")
            })
        },
        hideScaleControl: function() {
            this._fishBone.style.display = "none"
        },
        showScaleControl: function() {
            this._fishBone.style.display = "block"
        },
        initMapLayer: function() {
            var e = this,
                t = e._opts,
                o = (e._fishboneCtrl, T.dom.create("div", {
                    id: "panoOverviewMap",
                    style: "width:100%; height:100%; overflow: hidden; z-index: " + t.zIndex
                }));
            this.mapContainer.appendChild(o), t.parent.style.display = "block";
            var n = e._map = new BMap.Map(o, {
                coordType: BMAP_COORD_MERCATOR,
                zoomLevelMin: 3,
                mapType: BMAP_NORMAL_MAP,
                enableResizeOnCenter: !0,
                forceRenderType: "dom"
            });
            n.enableScrollWheelZoom(), n.enableInertialDragging(), n.disableContinuousZoom(), n.centerAndZoom(e.point, e.level || Math.floor(n.getZoom())), n.setDefaultCursor("pointer"), e.bindMapEvents()
        },
        drawLine: function(e, t) {
            var o = this._map;
            void 0 === t ? t = v[0] : "number" == typeof t && (t = v[t]);
            var n = new BMap.Polyline(e, t);
            o.addOverlay(n)
        },
        addMarkers: function(e) {
            for (var t = 0; t < e.length; t++) p.addDestPoi(e[t].point, e[t].type, {
                text: e[t].wd,
                showText: !0,
                userMap: this._map
            })
        },
        addSearchMarker: function(e, t, o) {
            var n = new BMap.Point(e, t),
                a = "//webmap0.bdimg.com/wolfman/static/pano/images/pano_whole/pano-marker_f7456fc.gif",
                i = new BMap.Icon(a, new BMap.Size(18, 18));
            this.removeSearchMarker(), this.searchMarker = new BMap.Marker(n, {
                icon: i,
                offset: new BMap.Size(0, -2),
                title: o
            }), this._map.addOverlay(this.searchMarker), this.searchMarker.setTop(!0, 9999999)
        },
        removeSearchMarker: function() {
            this.searchMarker && (this._map.removeOverlay(this.searchMarker), this.searchMarker = null)
        },
        initRoadNetLayer: function() {
            var e = this,
                t = e._map;
            e._roadnet = new a({
                context: e._opts.context,
                map: t
            }), e._roadnet.addEventListener("photo_tour_enter", function(t) {
                e.dispatchEvent("photo_tour_enter", {
                    data: t.data
                })
            }), e._roadnet.show()
        },
        initPoiClickLayer: function() {
            var e = this,
                t = e._map;
            e._poiClickLayer = new i({
                context: e._opts.context,
                map: t,
                callback: "panoPoiClick"
            }), e.bindPoiClickEvents()
        },
        removePoiClickLayer: function() {
            this._roadnet.removeLayer(), this._poiClickLayer.removeEventListener("click", this.eventHandlers.house_click)
        },
        initOverlay: function() {
            var e = this,
                t = e._map,
                o = e.point;
            e.prePos = o, e._overlay = new r({
                position: o
            }), t.addOverlay(e._overlay), t.setCenter(o), t.setOptions({
                zoomCenter: o
            }), e._overlay.setDirection(e._opts.data.panoHeading), e.getCurCity(), e.bindOverlayEvents()
        },
        initNavLayer: function() {
            if (window.currentComponent && currentComponent.getPanoNavParams) {
                var e = currentComponent.getPanoNavParams(),
                    t = currentComponent.activeIndex || 0;
                if (e.end.indexOf("to:") > -1) {
                    var o = e.end.split("to:");
                    e.end = o.pop()
                }
                e.startmatchdis = 100, e.turnmatchdis = 100;
                var n = window.componentManager.getLastSearchTime("nav"),
                    a = document.cookie.match(/BAIDUID=([^;]*)/);
                baiduid = a && a[1] ? a[1].replace(/[\W]/g, "_") : "", e.key = a + "_" + n, e.id = t;
                var i = new l(e, ""),
                    r = this;
                i.on("ready", function() {
                    var e = i.getPoints();
                    r.drawLine(e, 3);
                    var t = i.getStart(),
                        o = i.getEnd();
                    t.point = t.pt, o.point = o.pt, t.type = 0, o.type = 1, r.addMarkers([t, o])
                })
            }
        },
        initPathLayer: function() {
            var e = this,
                t = e._map,
                o = window.currentComponent;
            if (o && "NavTrans" === o.name) this.initNavLayer();
            else if (o && o.getOverlays) {
                e.viewportPoints = [];
                var n, a = o.getOverlays(),
                    i = a.routes;
                if (i)
                    for (var r = 0; r < i.length; r++) n = p.addRoute(i[r].points, i[r].type, void 0, t), e.viewportPoints = e.viewportPoints.concat(n.points);
                var s = a.drRoutes;
                if (s)
                    for (var r = 0; r < s.length; r++) {
                        n = p.addDrRoute(s[r].flag, s[r].obj, !1, t);
                        for (var r = 0; r < n.length; r++) e.viewportPoints = e.viewportPoints.concat(n[r].points)
                    }
                var d = a.transMarkers;
                if (d)
                    for (var r = 0; r < d.length; r++) p.addTransPoi(d[r].point, d[r].type, d[r].text, t);
                var l = a.destMarkers;
                if (l)
                    for (var r = 0; r < l.length; r++) {
                        var v = {
                            userMap: t,
                            text: l[r].text
                        };
                        p.addDestPoi(l[r].point, l[r].type, v)
                    }
                var c = a.arrows;
                c && (e.arrows = c, e.redrawArrow(), t.addEventListener("zoomend", function() {
                    e.redrawArrow()
                }, e.guid + "_zoomend"), t.addEventListener("moveend", function() {
                    e.redrawArrow()
                }, e.guid + "_moveend"));
                var m = a.tips;
                if (m)
                    for (var r = 0; r < m.length; r++) p.createTip(m[r].content, m[r].className, m[r].opts, t);
                var u = a.markers;
                if (u)
                    for (var r = 0; r < u.length; r++) t.addOverlay(new BMap.Marker(u[r].point, {
                        icon: u[r].icon,
                        title: u[r].title
                    }))
            }
        },
        setMapClickHook: function(e) {
            this._mapClickHook = e
        },
        bindMapEvents: function() {
            var e = this,
                t = e._map;
            e.eventHandlers.map_click = function(t) {
                if ("function" == typeof e._mapClickHook) {
                    var o = e._mapClickHook(t.point.lng, t.point.lat);
                    if (o === !0) return
                }
                e._processMoving || e.getPanoInfo(t.point.lng, t.point.lat)
            }, e.eventHandlers.map_typechange = function(t) {
                t.mapType;
                e._roadnet && e._roadnet.update()
            }, e.eventHandlers.map_zoomend = function() {
                e.dispatchEvent("level_changed", {
                    data: {
                        level: Math.floor(t.getZoom())
                    }
                });
                var o = T.g("map-zoomout"),
                    n = T.g("map-zoomin"),
                    a = Math.floor(t.getZoom());
                baidu.dom.removeClass(o, "disabled"), baidu.dom.removeClass(n, "disabled"), 3 == a && baidu.dom.addClass(n, "disabled"), 19 == a && baidu.dom.addClass(o, "disabled"), e._isDrag = !1
            }, e.eventHandlers.map_tilesloaded = function() {
                e.dispatchEvent("tiles_loaded")
            }, e.eventHandlers.map_dragstart = function() {
                e._isDrag = !0
            }, e.eventHandlers.map_dragend = function() {
                e._isDrag && (e._isDrag = !1, window._pano_overviewmap_leaved && (window._mouseleave_trigger_source = "map", baidu("#panoMapOuterWapper").trigger("mouseleave")))
            }, t.addEventListener("click", e.eventHandlers.map_click), t.addEventListener("maptypechange", e.eventHandlers.map_typechange), t.addEventListener("zoomstart", e.eventHandlers.map_zoomstart), t.addEventListener("zoomend", e.eventHandlers.map_zoomend), t.addEventListener("tilesloaded", e.eventHandlers.map_tilesloaded), baidu.on("panoOverviewMap", "mousedown", e.eventHandlers.map_dragstart), baidu.on(document.body, "mouseup", e.eventHandlers.map_dragend), baidu.on("panoOverviewMap", "mouseenter", function() {
                e.dispatchEvent("mouseenter")
            }), baidu.on("panoOverviewMap", "mouseleave", function() {
                e.dispatchEvent("mouseleave")
            })
        },
        bindPoiClickEvents: function() {
            var e = this,
                t = e._poiClickLayer;
            e.eventHandlers.house_click = function(t) {
                var o = {
                    panoIId: t.panoUid,
                    panoType: "inter"
                };
                e.dispatchEvent("pano_changed", {
                    data: o
                })
            }, t.addEventListener("click", e.eventHandlers.house_click)
        },
        bindOverlayEvents: function() {
            var e = this,
                t = e._overlay;
            e.eventHandlers.overlay_rotate = function(t) {
                e.setViewPov(t.angle)
            }, e.eventHandlers.overlay_dragend = function(t) {
                e.getPanoInfo(t.point.lng, t.point.lat)
            }, t.addEventListener("oncircleclick", e.eventHandlers.overlay_rotate), t.addEventListener("onrotating", e.eventHandlers.overlay_rotate), t.addEventListener("onrotateend", e.eventHandlers.overlay_rotate), t.addEventListener("ondragend", e.eventHandlers.overlay_dragend)
        },
        removeOverlayEvents: function() {
            var e = this,
                t = e._overlay;
            t && (t.removeEventListener("oncircleclick", e.eventHandlers.overlay_rotate), t.removeEventListener("onrotating", e.eventHandlers.overlay_rotate), t.removeEventListener("onrotateend", e.eventHandlers.overlay_rotate), t.removeEventListener("ondragend", e.eventHandlers.overlay_dragend), e.eventHandlers = null)
        },
        setViewPov: function(e) {
            var t = this;
            if (t.tipLabel && t.tipLabel.hide(), !isNaN(e)) {
                var o = {
                    panoHeading: parseInt(e),
                    panoPitch: 0
                };
                t.dispatchEvent("pov_changed", {
                    data: o
                })
            }
        },
        getPanoInfo: function(e, t) {
            var o = this,
                n = o._map;
            o.tipLabel && o.tipLabel.hide();
            var a = o._opts.context.panoContext.getPanoOptions();
            s.getStreetBriefByLocation({
                point: {
                    lng: e,
                    lat: t
                },
                level: Math.floor(n.getZoom()),
                mode: a.mode
            }, function(n) {
                if (0 == n.error && n.content && n.content.id) {
                    var a = n.content.id,
                        i = n.content.point,
                        r = new BMap.Point(i.lng, i.lat);
                    o.prePos = r;
                    var s = {
                        panoId: a,
                        panoType: o._opts.data.panoType
                    };
                    o.dispatchEvent("pano_changed", {
                        data: s
                    }), o.getCurCity(), addStat(STAT_CODE.STAT_PANORAMA, {
                        item: "street",
                        catalog: "map",
                        func: "click",
                        from: "overview-map"
                    }), MapLogReport.send({
                        da_src: "pcmapPanoPG.miniMap.click"
                    })
                } else o.showTip(new BMap.Point(e, t)), o.resetPos()
            }, o)
        },
        getCurCity: function(e) {
            var t = this,
                o = t._map,
                n = o.getBounds(),
                a = n.minX + "," + n.minY + ";" + n.maxX + "," + n.maxY,
                i = Math.floor(o.getZoom()),
                r = (new Date).getTime();
            baidu.ajax("/?newmap=1&qt=ncent&ie=utf-8&b=" + a + "&l=" + i + "&t=" + r, {
                dataType: "json",
                success: function(o) {
                    o && o.content && o.current_city && t.setCurCity(o.current_city, e)
                },
                error: function() {}
            })
        },
        setCurCity: function(e, t) {
            this._currentCity = {
                cityId: e.code,
                cityName: e.name
            }, t && t(this._currentCity)
        },
        getCurrentCity: function(e) {
            this._currentCity ? e(this._currentCity) : this.getCurCity(e)
        },
        setOverlayPos: function(e) {
            var t = this;
            t._processMoving ? t._processQueue = e : (t._processMoving = !0, t.eventHandlers.map_movestart = function() {
                t._processMoving && (t._map.disableScrollWheelZoom(), t._map.disableDragging())
            }, t.eventHandlers.map_moving = function() {
                t._processMoving && (t._overlay.setPosition(t._map.getCenter()), t._map.setOptions({
                    zoomCenter: t._map.getCenter()
                }))
            }, t.eventHandlers.map_moveend = function() {
                t._processMoving && (t._processMoving = !1, t._overlay.setPosition(t.prePos), t._map.setOptions({
                    zoomCenter: t.prePos
                }), t._map.setCenter(t.prePos), t._map.enableScrollWheelZoom(), t._map.enableDragging(), t._map.removeEventListener(t.eventHandlers.map_movestart), t._map.removeEventListener(t.eventHandlers.map_moving), t._map.removeEventListener(t.eventHandlers.map_moveend), t._processQueue && (t._processMoving = !0, t._map.panTo(t._processQueue), t._processQueue = null))
            }, t._map.addEventListener("movestart", t.eventHandlers.map_movestart), t._map.addEventListener("moving", t.eventHandlers.map_moving), t._map.addEventListener("moveend", t.eventHandlers.map_moveend), t._map.panTo(e))
        },
        showTip: function(e) {
            var t = this;
            if (t.tipLabel) t.tipLabel.setPoint(e), t.tipLabel.show(), t.delayHide();
            else {
                var o = {
                    point: e,
                    offset: new BMap.Size(0, 0)
                };
                t.tipLabel = new BMap.Label("<div style='text-align:center;margin-top:5px;'>此处无全景</div ><div style='color:#4869a5;' >请点击蓝色路网</div>", o), t.tipLabel.setStyle({
                    backgroundColor: "#fff",
                    borderColor: "#b1b1b1",
                    borderWidth: "1px",
                    fontSize: "12px",
                    height: "50px",
                    lineHeight: "20px",
                    fontFamily: "微软雅黑"
                }), t._map.addOverlay(t.tipLabel), t.delayHide()
            }
        },
        delayHide: function() {
            var e = this;
            e.tipTimer && window.clearTimeout(e.tipTimer), e.tipTimer = window.setTimeout(function() {
                e.tipLabel && e.tipLabel.hide()
            }, 2e3)
        },
        resetPos: function() {
            var e = this;
            e.prePos && e._overlay && (e._overlay.setPosition(e.prePos), e._map.setOptions({
                zoomCenter: e.prePos
            }), e._map.panTo(e.prePos))
        },
        update: function(e, t) {
            var o = this;
            t = t || o.level, e && t && o._map.centerAndZoom(e, t)
        },
        redrawArrow: function() {
            for (var e = this._map, t = this.arrows; this.arrowMarkers.length;) e.removeOverlay(this.arrowMarkers.pop());
            for (var o = 0; o < t.length; o++) this.arrowMarkers = this.arrowMarkers.concat(p.addArrow(t[o].split(";"), e))
        },
        destroyAll: function() {
            this.mapContainer.removeChild(this._fishBone);
            var e = baidu.g("panoOverviewMap");
            e && e.parentNode && e.parentNode.removeChild(e), baidu.un(document.body, "mouseup", this.eventHandlers.map_dragend)
        },
        event_povChanged: function(e) {
            var t = this,
                o = t._overlay;
            o.setDirection(e)
        },
        event_panoChanged: function(e, t) {
            var o, n = this._overlay,
                a = e.panoHeading || e.heading;
            o = e.panoMCPoint ? new BMap.Point(e.panoMCPoint.x, e.panoMCPoint.y) : e.panoPoint ? e.panoPoint : new BMap.Point(e.x, e.y), this.prePos = o, this.setOverlayPos(o), n.setDirection(a), this.panoMode = e.mode || this.panoMode, !t || this._indoorModel && this._indoorModel.equal(t) || (this._indoorModel = t, this.updateTopologyMarkers())
        },
        event_floorChanged: function() {
            this.updateTopologyMarkers(!0)
        },
        event_exitIndoor: function() {
            this.updateTopologyMarkers(!0), this._indoorModel = null
        },
        getLevel: function() {
            return Math.floor(this._map.getZoom())
        },
        getBounds: function() {
            return this._map.getBounds()
        },
        getCenter: function() {
            return this._map.getCenter()
        },
        getCenterPointInfo: function() {
            var e = this;
            return {
                panoPoint: e._overlay.getPosition(),
                panoHeading: e._overlay.getDirection()
            }
        },
        setCenter: function() {
            var e = this,
                t = e._overlay;
            if (t) {
                var o = t.getPosition();
                t.setOffset(), e._map.panTo(o), e._map.setCenter(o)
            }
        },
        setZoom: function(e) {
            this._map.zoomTo(e)
        }
    }), o.exports = n
});;
define("pano:widget/module/PanoOverviewModule/PanoIndoorPlanComponent/PanoIndoorOverlayComponent/PanoIndoorOverlayComponent.js", function(e, t, n) {
    function o(e) {
        this._position = {
            x: e.x,
            y: e.y
        }, this._angle = this._direction = e.angle || 190, this._dom = e.dom, this._zIndex = e.zIndex, this._moving = !1, this._arrowDirection = "-168px -72px", this._rotating = !1;
        var t = baidu.dom.getPosition(this._dom);
        this._domTop = t.top, this._domLeft = t.left, this._opts = {
            enableDragging: !0,
            anchor: {
                width: -52,
                height: -52
            }
        }, this.DIV_ROTATE_DIRECTION = [
            [0, -19, -64],
            [22.5, -203, -59],
            [45, -391, -59],
            [67.5, -581, -58],
            [90, -778, -55],
            [112.5, -979, -50],
            [135, -1178, -55],
            [157.5, -1387, -51],
            [180, -1611, -60],
            [202.5, -1821, -61],
            [225, -2030, -65],
            [247.5, -2243, -73],
            [270, -2457, -62],
            [292.5, -2685, -65],
            [315, -2901, -70],
            [337.5, -3120, -70]
        ], this.initialize()
    }
    baidu.lang.inherits(o, baidu.lang.Class, "PanoIndoorOverlayComponent"), baidu.object.extend(o.prototype, {
        initialize: function() {
            var e = this,
                t = e._container = document.createElement("div"),
                n = document.createElement("div"),
                o = "url(//webmap0.bdimg.com/wolfman/static/pano/images/panorama/pano_markers_1959b18.png)";
            e._div = t, e._arrow = n, e._bgu = o, e._setDefCursor(), baidu.extend(t.style, {
                position: "absolute",
                zIndex: e._zIndex,
                backgroundRepeat: "no-repeat",
                cursor: "pointer",
                backgroundPosition: "-560px -36px",
                height: "104px",
                width: "104px"
            }), baidu(t).addClass("pano-fan"), baidu.extend(n.style, {
                position: "absolute",
                backgroundRepeat: "no-repeat",
                cursor: "pointer",
                backgroundPosition: "0 0",
                height: "24px",
                width: "24px",
                left: "34px",
                marginTop: "32px"
            }), baidu(n).addClass("pano-overlay-ie"), t.appendChild(n), e._dom.appendChild(t), e.draw(), e.setDirection(e._direction)
        },
        draw: function() {
            var e = this._opts.anchor,
                t = this._position;
            void 0 == t.x && (t.x = 0), void 0 == t.y && (t.y = 0), this._container.style.left = t.x + e.width + "px", this._container.style.top = t.y + e.height + "px"
        },
        enableDragging: function() {
            this._opts.enableDragging = !0
        },
        disableDragging: function() {
            this._opts.enableDragging = !1
        },
        getPosition: function() {
            return this._position
        },
        setPosition: function(e) {
            this._position = e, this.draw()
        },
        getDirection: function() {
            return this._direction
        },
        setDirection: function(e) {
            if (!isNaN(e)) {
                var t = this._direction = e;
                this._getRotateDirection(t)
            }
        },
        remove: function() {
            me._dispatchEvent(this, "onremove"), this._container && _purge(this._container), this._container && this._container.parentNode && this._container.parentNode.removeChild(this._container)
        },
        _setDefCursor: function() {
            T.browser.firefox ? (this.defaultCursor = "-moz-grab", this.draggingCursor = "-moz-grabbing") : T.browser.chrome || T.browser.safari ? (this.defaultCursor = "url(//webmap1.bdimg.com/wolfman/static/pano/images/api/openhand_feff915.cur) 8 8, default", this.draggingCursor = "url(//webmap0.bdimg.com/wolfman/static/pano/images/api/closedhand_5e32821.cur) 8 8, default") : (this.defaultCursor = "url(//webmap1.bdimg.com/wolfman/static/pano/images/api/openhand_feff915.cur)", this.draggingCursor = "url(//webmap0.bdimg.com/wolfman/static/pano/images/api/closedhand_5e32821.cur)")
        },
        _getRotateDirection: function(e) {
            if (!isNaN(e)) {
                var t = this.DIV_ROTATE_DIRECTION,
                    n = 0,
                    o = e - 31.75,
                    i = t.length;
                if (o > t[i - 1][0]) this._div.style.backgroundPosition = t[i - 1][1] + "px " + t[i - 1][2] + "px";
                else
                    for (var n = 0; i > n; n++)
                        if (o < t[n][0]) {
                            this._div.style.backgroundPosition = t[n][1] + "px " + t[n][2] + "px";
                            break
                        }
            }
        },
        _getMoveDirection: function(e, t) {
            if (!isNaN(e) && !isNaN(t)) {
                var n = -1,
                    o = e - this.preX;
                return this.preX > 5 && 0 > o ? n = 0 : this.preX > 5 && o > 0 && (n = 1), this.preX = e, this.preY = t, n
            }
        },
        _setEventDispath: function() {
            function e(e) {
                var e = window.event || e,
                    t = e.pageX || e.clientX || 0,
                    n = e.pageY || e.clientY || 0,
                    o = {
                        x: t,
                        y: n
                    };
                return {
                    point: o
                }
            }
            var t = this,
                n = t._container,
                o = t._arrow,
                i = t._dom,
                a = (t._angle, !1),
                r = !1,
                s = null;
            o.onmousedown = function(a) {
                var p = e(a);
                return o.setCapture ? (baidu.on(o, "onmousemove", u), baidu.on(o, "onmouseup", d)) : (baidu.on(i, "onmousemove", u), baidu.on(i, "onmouseup", d)), t._opts.enableDragging ? (s = p.point, t._dispatchEvent(t, "ondragstart", {
                    point: t._position
                }), r = !0, o.style.cursor = t.draggingCursor, baidu(n).removeClass("pano-overlay-ie"), o.setCapture && o.setCapture(), i.style.MozUserSelect = "none", i.style.KhtmlUserSelect = "none", i.style.WebkitUserSelect = "none", i.unselectable = "on", i.onselectstart = function() {
                    return !1
                }, void t._stopAndPrevent(a)) : void t._stopAndPrevent(a)
            }, n.onmousedown = function(e) {
                i.style.MozUserSelect = "none", i.style.KhtmlUserSelect = "none", i.style.WebkitUserSelect = "none", i.unselectable = "on", i.onselectstart = function() {
                    return !1
                }, t._stopAndPrevent(e)
            };
            var d = function(p) {
                    e(p);
                    return o.releaseCapture ? (baidu.un(o, "onmousemove", u), baidu.un(o, "onmouseup", d)) : (baidu.un(i, "onmousemove", u), baidu.un(i, "onmouseup", d)), t._opts.enableDragging ? (o.releaseCapture && o.releaseCapture(), o.style.backgroundPosition = t._arrowDirection, baidu(n).addClass("pano-overlay-ie"), o.style.cursor = "pointer", clearInterval(t._viewtypetimer), t._dispatchEvent(t, "ondragend", {
                        point: t._position
                    }), r = !1, a = !1, s = null, i.style.MozUserSelect = "", i.style.KhtmlUserSelect = "", i.style.WebkitUserSelect = "", i.unselectable = "off", i.onselectstart = function() {}, void t._stopAndPrevent(p)) : void t._stopAndPrevent(p)
                },
                u = function(n) {
                    if (t._opts.enableDragging && r) {
                        var o = e(n),
                            i = t._position,
                            a = o.point.x - s.x + i.x,
                            d = o.point.y - s.y + i.y;
                        s = o.point, t._position = {
                            x: a,
                            y: d
                        }, t.draw(), t._dispatchEvent(t, "ondragging", {
                            point: t._position
                        }), t._stopAndPrevent(n)
                    }
                }
        },
        _dispatchEvent: function(e, t, n) {
            0 != t.indexOf("on") && (t = "on" + t);
            var o = new baidu.lang.Event(t);
            if (n)
                for (var i in n) o[i] = n[i];
            e.dispatchEvent(o)
        },
        _purge: function(e) {
            if (e) {
                var t = e.attributes,
                    n = "";
                if (t)
                    for (var o = 0, i = t.length; i > o; o++) n = t[o].name, "function" == typeof e[n] && (e[n] = null);
                var a = e.childnodes;
                if (a)
                    for (var o = 0, i = a.length; i > o; o++) me._purge(e.childnodes[o])
            }
        },
        _stopAndPrevent: function(e) {
            var e = window.event || e;
            baidu.event.preventDefault(e), baidu.event.stopPropagation(e)
        }
    }), n.exports = o
});;
define("pano:widget/module/PanoGuideModule/AlbumModule/FloorComponent/FloorComponent.js", function(e, o, t) {
    var i = e("common:widget/ui/Animation/Animation.js"),
        n = e("pano:widget/component/TableView/TableView.js"),
        a = e("pano:widget/base/util.js");
    e.loadCss({
        content: ".floor-container{position:absolute;height:110px;width:58px;background-color:#252525;filter:alpha(opacity=90);background-color:rgba(37,37,37,.9)}#pano-floor-wrapper .floor-container{position:static;float:left;width:58px}.floor-container .tableview-wapper{text-align:center;position:static;margin-top:12px}.floor-container .tableview-la,.floor-container .tableview-ra{position:absolute;width:58px;text-align:center}.floor-container .tableview-ra{bottom:0}.floor-container .tableview-ra .tableview-bg,.floor-container .tableview-la .tableview-bg{background-image:url(//webmap0.bdimg.com/wolfman/static/pano/images/pano_whole/poi_detail_41c2576.png);background-repeat:no-repeat}.floor-container .tableview-ra .tableview-bg{background-position:-62px -80px}.floor-container .tableview-ra:hover .tableview-bg{background-position:-17px -80px}.floor-container .tableview-la .tableview-bg{background-position:-37px -80px}.floor-container .tableview-la:hover .tableview-bg{background-position:0 -80px}.floor-container .tableview-ra.tableview-ra-disabled,.floor-container .tableview-la.tableview-la-disabled{display:none}.floor-number{line-height:20px;color:#abb0b2;text-align:center;text-decoration:none;cursor:pointer}.floor-container .selected-item .floor-number,.floor-number:hover{color:#3af}.floor-container .tableview-li{height:22px;width:43px;margin:0 auto 7px;border:1px solid #53565c}.floor-container .tableview-li:last-child{margin-bottom:0}.floor-number.first{border-left:0}.floor-number.last{border-right:0}.floor-container .tableview-selected-border{display:none}"
    });
    var r = '<a i="{$i}"class="floor-number {$class}" href="javascript:void(0);">{$text}</a>',
        l = function(e, o) {
            var t = o.getFloorInfo(),
                i = (o.has2DMap(), o.hasPlanMap(), this.container = document.createElement("div"));
            e.appendChild(i), i.className = "floor-container", this._floorIndex = 0, this._data = o, this._position = {
                left: 0,
                top: 0
            };
            var l = !1;
            t.length <= 3 && (l = !0);
            var s = this.tableView = new n(i, {
                viewWidth: 58,
                viewHeight: 110,
                isHorizontal: !1,
                isFullSize: l,
                margin: "8"
            });
            a.each(t, function(e, o) {
                var i = "";
                i = e.realFloor > 0 ? r.replace("{$text}", e.realFloor + "F") : r.replace("{$text}", e.realFloor.toString().replace("-", "B")), i = i.replace("{$i}", o).replace("{$class}", 0 == o ? "first" : o == t.length - 1 ? "last" : ""), s.addItemContent(i)
            });
            var c = this;
            s.addEventListener("click", function(e) {
                e.index !== c._floorIndex && c.dispatchEvent("item_click", {
                    index: e.index
                })
            }), s.resize(), baidu.event.on(i, "mouseleave", function(e) {
                for (var o = e.relatedTarget; o;) {
                    if ("pano-overview-wrapper" == o.id) return;
                    if (o == document.body) break;
                    o = o.parentNode
                }
                c.dispatchEvent("fold_overview")
            }), baidu.event.on(i, "click", function() {
                addStat(STAT_CODE.STAT_PANORAMA, {
                    item: "floor_catalog_click",
                    type: "inter"
                })
            })
        };
    baidu.lang.inherits(l, baidu.lang.Class), T.object.extend(l.prototype, {
        setFloorIndex: function(e) {
            this._floorIndex = e, this.tableView.setSelectIndex(this._floorIndex)
        },
        getFloorIndex: function() {
            return this._floorIndex
        },
        getData: function() {
            return this._data
        },
        destroy: function() {
            this._data = null, this._floorIndex = null, T(this.container.parentNode).remove(), this.tableView.destroy()
        },
        setPosition: function(e, o, t) {
            var n = this.container;
            if (t) {
                var a = this._position.left,
                    r = this._position.top,
                    l = e - a,
                    s = o - r,
                    c = new i.Animation,
                    d = {
                        duration: 400,
                        fps: 40,
                        delay: i.Animation.INFINITE,
                        transition: i.Transitions.easeOutQuad,
                        finish: function() {},
                        render: function(e) {
                            n.style.left = a + l * e + "px", n.style.top = r + s * e + "px"
                        }
                    };
                c.build(d), c.start()
            } else n.style.left = e + "px", n.style.top = o + "px";
            this._position = {
                left: e,
                top: o
            }
        }
    }), t.exports = l
});;
define("pano:widget/module/PanoGuideModule/AlbumModule/CatalogComponent/CatalogComponent.js", function(t, e, a) {
    var i = t("common:widget/ui/Animation/Animation.js"),
        o = t("pano:widget/component/TableView/TableView.js"),
        n = t("pano:widget/base/util.js");
    t.loadCss({
        content: ".catalog-container{position:absolute;height:110px;background-color:#252525;filter:alpha(opacity=90);background-color:rgba(37,37,37,.9)}.catalog-container .tableview-wapper{position:static;margin-top:12px}.catalog-container .tableview-la,.catalog-container .tableview-ra{position:absolute;width:58px;text-align:center}.catalog-container .tableview-ra .tableview-bg,.catalog-container .tableview-la .tableview-bg{background-image:url(//webmap0.bdimg.com/wolfman/static/pano/images/pano_whole/poi_detail_41c2576.png);background-repeat:no-repeat}.catalog-container .tableview-ra .tableview-bg{background-position:-62px -80px}.catalog-container .tableview-ra:hover .tableview-bg{background-position:-17px -80px}.catalog-container .tableview-la .tableview-bg{background-position:-37px -80px}.catalog-container .tableview-la:hover .tableview-bg{background-position:0 -80px}.catalog-container .tableview-ra{bottom:0}.catalog-container .tableview-ra.tableview-ra-disabled,.catalog-container .tableview-la.tableview-la-disabled{display:none}#pano-floor-wrapper .catalog-container{position:static;float:left;width:58px}.catalog-text{line-height:22px;color:#abb0b2;width:100%;text-align:center;text-decoration:none;cursor:pointer;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;display:inline-block}.catalog-container .selected-item .catalog-text,.catalog-text:hover{color:#3af}.catalog-container .tableview-li{height:22px;width:50px;border:1px solid #53565c;text-align:center;margin:0 auto 7px}.catalog-container .tableview-li:last-child{margin-bottom:0}.catalog-text.first{border-left:0}.catalog-text.last{border-right:0}.catalog-container .tableview-selected-border{display:none}"
    });
    var l = ['<a i="{$i}"', ' class="catalog-text {$class}"', ' title="{$title}"', ' href="javascript:void(0);">{$text}</a>'].join(""),
        r = function(t, e) {
            var a = (e.has2DMap(), e.hasPlanMap(), e.getCatalogList()),
                i = this.container = document.createElement("div");
            t.appendChild(i), i.className = "catalog-container", this._index = 0, this._data = e;
            var r = this.tableView = new o(i, {
                viewWidth: 58,
                viewHeight: 110,
                isHorizontal: !1,
                isFullSize: !1,
                margin: "0"
            });
            n.each(a, function(t, e) {
                var i = l.replace("{$i}", e).replace("{$title}", t.label).replace("{$text}", t.label).replace("{$class}", 0 === e ? "first" : e === a.length - 1 ? "last" : "");
                r.addItemContent(i)
            });
            var c = this;
            r.addEventListener("click", function(t) {
                t.index !== c._index && c.dispatchEvent("item_click", {
                    index: t.index
                })
            }), r.resize(), baidu.event.on(i, "mouseleave", function(t) {
                for (var e = t.relatedTarget; e;) {
                    if ("pano-overview-wrapper" == e.id) return;
                    if (e == document.body) break;
                    e = e.parentNode
                }
                c.dispatchEvent("fold_overview")
            }), baidu.event.on(i, "click", function() {
                addStat(STAT_CODE.STAT_PANORAMA, {
                    item: "floor_catalog_click",
                    type: "inter"
                })
            })
        };
    baidu.lang.inherits(r, baidu.lang.Class), T.object.extend(r.prototype, {
        setSelectIndex: function(t) {
            this._index = t, this.tableView.setSelectIndex(this._index)
        },
        getSelectIndex: function() {
            return this._index
        },
        getData: function() {
            return this._data
        },
        destroy: function() {
            this._data = null, this._floorIndex = null, T(this.container.parentNode).remove(), this.tableView.destroy()
        },
        setPosition: function(t, e, a) {
            var o = this.container;
            if (a) {
                var n = this._position.left,
                    l = this._position.top,
                    r = t - n,
                    c = e - l,
                    s = new i.Animation,
                    d = {
                        duration: 400,
                        fps: 40,
                        delay: i.Animation.INFINITE,
                        transition: i.Transitions.easeOutQuad,
                        finish: function() {},
                        render: function(t) {
                            o.style.left = n + r * t + "px", o.style.top = l + c * t + "px"
                        }
                    };
                s.build(d), s.start()
            } else o.style.left = t + "px", o.style.top = e + "px";
            this._position = {
                left: t,
                top: e
            }
        }
    }), a.exports = r
});;
define("pano:widget/module/PanoOverviewModule/PanoIndoorPlanComponent/PanoIndoorPlanComponent.js", function(t, o, e) {
    function i(t, o) {
        T.lang.Class.call(this), this.mapContainer = t, this.opts = o || {}
    }
    var n = t("pano:widget/module/PanoOverviewModule/PanoIndoorPlanComponent/PanoIndoorOverlayComponent/PanoIndoorOverlayComponent.js"),
        r = t("common:widget/ui/util/util.js");
    baidu.lang.inherits(i, baidu.lang.Class, "PanoIndoorPlanComponent"), baidu.object.extend(i.prototype, {
        initialize: function() {
            this.isOpen = !1, this.tileSign = {}, this.viewport = null, this.VIEWPORTLT = {
                x: 0,
                y: 0
            }, this.panoMarker = null, this.mapDragging = !1, this.indoorInfo = null, this.tileWrap = null, this.tileLayer = null, this.markerLayer = null;
            var t = this.opts.context.panoContext.getPanoUrlConfig();
            this.udtVersion = t.UDT_VERSION || "20130819";
            var o = encodeURIComponent(window.AUTH) || "",
                e = encodeURIComponent(window.SECKEY) || "";
            this.tileUrl = t.PANO_SERVICE_URL + "?udt=" + this.udtVersion + "&qt=tdata&from=PC&auth=" + o + "&seckey=" + e, this.markers = [], this.EVENT = {}, this.indoorInfo = this.adjustIndoorData(this.opts.data), this.opts.parent.style.display = "block", this.createDomElements(), this.createOverlay(), this.initIndoorView(), this.initScaleControl(), this.bindDomEvent()
        },
        createDomElements: function() {
            var t = this,
                o = t.opts;
            return t.indoorViewContainer = T.dom.create("div", {
                id: "panoIndoorMap",
                style: "position:relative;width:100%; height:100%; background-color: #fff; overflow: hidden; z-index: " + o.zIndex
            }), t.tileWrap = T.dom.create("div", {
                id: "tileWrap",
                style: "position: absolute; left: 0; top: 0; width: 512px; height: 256px; color: green;"
            }), t.tileLayer = T.dom.create("div", {
                style: "position:absolute;top:0;left:0;right:0;bottom:0;z-index:11"
            }), t.markerLayer = T.dom.create("div", {
                style: "position:absolute;top:0;left:0;right:0;bottom:0;z-index:12"
            }), t.tileWrap.appendChild(t.tileLayer), t.tileWrap.appendChild(t.markerLayer), this.indoorViewContainer.appendChild(t.tileWrap), this.mapContainer && this.mapContainer.appendChild(t.indoorViewContainer), t.viewport = t.indoorViewContainer, !0
        },
        createOverlay: function() {
            var t = this,
                o = t.opts,
                e = o.data.currentPoint ? o.data.currentPoint : {
                    x: o.data.x,
                    y: o.data.y
                };
            t.overlay = new n({
                type: "indoorOverlay",
                position: e,
                dom: t.indoorViewContainer,
                zIndex: o.zIndex
            })
        },
        checkIndoorInfo: function(t) {
            var o = this;
            return o.indoorInfo = o.adjustIndoorData(t.data), !!o.indoorInfo
        },
        renderView: function(t) {
            var o = baidu.g("panoIndoorMap"),
                e = o.clientWidth,
                i = o.clientHeight,
                n = {
                    x: -t.x,
                    y: -t.y
                },
                r = {
                    x: n.x + e,
                    y: n.y + i
                };
            t.x > 0 && (n.x = 0, r.x = parseInt(this.tileWrap.style.width)), t.y > 0 && (n.y = 0, r.y = parseInt(this.tileWrap.style.height));
            var a = this._filterTile(n, r, {
                mw: this.indoorInfo.width,
                mh: this.indoorInfo.height,
                tw: this.indoorInfo.tileWidth,
                th: this.indoorInfo.tileHeight
            });
            this.addTileLayer({
                dom: this.tileLayer,
                area: a,
                tile: {
                    width: this.indoorInfo.tileWidth,
                    height: this.indoorInfo.tileHeight
                }
            })
        },
        adjustIndoorData: function(t) {
            this._getDefZoom(t.width, t.height, 512, 512);
            t.defZoom = t.zoomLevel > 1 ? 2 : 1, t.tileWidth = 256, t.tileHeight = 256;
            var o = Math.pow(2, t.defZoom - 1);
            t.width = t.width / o, t.height = t.height / o, t.currZoom = t.defZoom;
            for (var e = 0, i = t.points.length; i > e; e++) t.points[e].x /= o, t.points[e].y /= o;
            t.currPoint = {};
            var n = t.currentPid || t.uid;
            if (t.points.length)
                for (var e = 0; e < t.points.length; e++)
                    if (t.points[e].id === n) {
                        t.currPoint.x = t.points[e].x, t.currPoint.y = t.points[e].y;
                        break
                    }
            return t.uid && t.currPoint.x && t.currPoint.y || (t.currPoint.x = t.points[0].x, t.currPoint.y = t.points[0].y), t
        },
        initIndoorView: function() {
            this.tileSign = {}, this.markers = [], this.markerLayer.innerHTML = "", this.tileLayer.innerHTML = "";
            var t = this.adjustCenter(this.indoorInfo.currPoint);
            this.tileWrap.style.width = this.indoorInfo.width + "px", this.tileWrap.style.height = this.indoorInfo.height + "px", this.renderView({
                x: t.left,
                y: t.top
            }), this.addMarkers()
        },
        initScaleControl: function() {
            var t = this,
                o = T('<div id="scale-controll-area"><a id="map-zoomout" title="放大一级" href="javascript:void(0)" class="fishbone_button"><span></span></a><div id="map-zoom-line"><div></div></div><a id="map-zoomin" href="javascript:void(0)" title="缩小一级" class="fishbone_button"><span></span></a></div>');
            this._fishBone = o[0], this.indoorViewContainer.appendChild(this._fishBone);
            var e = T.g("map-zoomout"),
                i = T.g("map-zoomin");
            baidu.on(e, "click", function(o) {
                baidu.event.preventDefault(o), baidu.event.stopPropagation(o), t.indoorInfo.currZoom > 1 && t.zoom(1, {
                    x: t.viewport.offsetWidth / 2,
                    y: t.viewport.offsetHeight / 2
                })
            }), baidu.on(i, "click", function(o) {
                baidu.event.preventDefault(o), baidu.event.stopPropagation(o), t.indoorInfo.currZoom < t.indoorInfo.zoomLevel && t.zoom(-1, {
                    x: t.viewport.offsetWidth / 2,
                    y: t.viewport.offsetHeight / 2
                })
            })
        },
        bindDomEvent: function() {
            this._bindMouseDragEvent(), this._bindMouseWheelEvent(), this._bindClickEvent()
        },
        removeEvents: function() {
            var t = this;
            t.EVENT && (t.overlay.removeEventListener("ondragend", t.EVENT._cameraDragEnd), T(t.indoorViewContainer).off("mousedown", t.EVENT._mouseDown), T(t.indoorViewContainer).off("mousemove", t.EVENT._mouseMove), T(t.indoorViewContainer).off("mouseup", t.EVENT._mouseUp), T(t.indoorViewContainer).off("mouseleave", t.EVENT._mouseOut), T(document.body).off("mouseup", t.EVENT._bodymouseUp), T.un(t.viewport, T.browser.firefox ? "DOMMouseScroll" : "onmousewheel"), T(t.viewport).off("click", t.EVENT._clickPoint), t.EVENT = null)
        },
        _bindMouseDragEvent: function() {
            function t(t) {
                MS_POS.x = t.pageX, MS_POS.y = t.pageY, r.preventDefault(t)
            }
            window.MS_POS = {
                initX: 0,
                initX: 0,
                y: 0,
                MOUSEDOWN: !1,
                DRAG: !1
            };
            var o = (this.tileWrap, this);
            o.EVENT._mouseDown = function(e) {
                this.style.cursor = "url('//webmap0.bdimg.com/wolfman/static/pano/images/api/closedhand_5e32821.cur'), move", MS_POS.MOUSEDOWN = !0, t(e), MS_POS.initX = e.pageX, MS_POS.initY = e.pageY, o._isDrag = !0
            }, o.EVENT._mouseMove = function(e) {
                MS_POS.MOUSEDOWN && (this.style.cursor = "url('//webmap0.bdimg.com/wolfman/static/pano/images/api/closedhand_5e32821.cur')", MS_POS.DRAG = !0, o._drag({
                    x: e.pageX - MS_POS.x,
                    y: e.pageY - MS_POS.y
                }), t(e))
            }, o.EVENT._mouseUp = function(e) {
                this.style.cursor = "pointer", MS_POS.DRAG && Math.abs(e.pageX - MS_POS.initX) < 3 && Math.abs(e.pageY - MS_POS.initY) < 3 && (MS_POS.DRAG = !1), MS_POS.MOUSEDOWN = !1, t(e), o.renderView({
                    x: parseInt(o.tileWrap.style.left),
                    y: parseInt(o.tileWrap.style.top)
                })
            }, o.EVENT._bodymouseUp = function() {
                o._isDrag && (o._isDrag = !1, window._pano_overviewmap_leaved && (window._mouseleave_trigger_source = "map", baidu("#panoMapOuterWapper").trigger("mouseleave")))
            }, o.EVENT._mouseOut = function(e) {
                MS_POS.MOUSEDOWN && (MS_POS.MOUSEDOWN = !1, MS_POS.DRAG = !1, t(e), o.renderView({
                    x: parseInt(o.tileWrap.style.left),
                    y: parseInt(o.tileWrap.style.top)
                }))
            }, o.EVENT._cameraDragEnd = function(t) {
                o.EVENT._setCameraPos(t.point.x - parseInt(o.tileWrap.style.left), t.point.y - parseInt(o.tileWrap.style.top))
            }, o.overlay.addEventListener("ondragend", o.EVENT._cameraDragEnd), T.on(this.indoorViewContainer, "mousedown", o.EVENT._mouseDown), T.on(this.indoorViewContainer, "mousemove", o.EVENT._mouseMove), T.on(this.indoorViewContainer, "mouseup", o.EVENT._mouseUp), T.on(document.body, "mouseup", o.EVENT._bodymouseUp), T.on(this.indoorViewContainer, "mouseleave", o.EVENT._mouseOut)
        },
        _bindMouseWheelEvent: function() {
            var t = this,
                o = T.browser.firefox ? "DOMMouseScroll" : "onmousewheel";
            t.EVENT._zoomMouseWheel = function(o) {
                r.stopBubble(o);
                var e = T(this).offset(),
                    i = -o.detail / 3 || o.wheelDelta / 120,
                    n = o.pageX - e.left,
                    a = o.pageY - e.top;
                t.zoom(i, {
                    x: n,
                    y: a
                })
            }, T.on(this.viewport, o, t.EVENT._zoomMouseWheel)
        },
        _bindClickEvent: function() {
            var t = this;
            t.EVENT._clickPoint = function(o) {
                if (MS_POS.DRAG) return void(MS_POS.DRAG = !1);
                var e = T(t.tileWrap).offset(),
                    i = o.pageX - e.left,
                    n = o.pageY - e.top;
                t.EVENT._setCameraPos(i, n), t.renderView({
                    x: parseInt(t.tileWrap.style.left),
                    y: parseInt(t.tileWrap.style.top)
                })
            }, t.EVENT._setCameraPos = function(o, e) {
                if (t.markers.length) {
                    for (var i, n, r = 0, a = 0, s = 0; s < t.markers.length; s++) n = t.markers[s], i = Math.pow(Math.abs(n.x - o), 2) + Math.pow(Math.abs(n.y - e), 2), 0 === s ? a = i : a > i && (a = i, r = s);
                    t._clickMarker(t.markers[r])
                }
            }, t.EVENT._zoomIn = function(o) {
                r.stopBubble(o), t.zoom(1, {
                    x: t.viewport.offsetWidth / 2,
                    y: t.viewport.offsetHeight / 2
                })
            }, t.EVENT._zoomOut = function(o) {
                r.stopBubble(o), t.zoom(-1, {
                    x: t.viewport.offsetWidth / 2,
                    y: t.viewport.offsetHeight / 2
                })
            }, t.EVENT._zoomInMouseMove = function() {
                1 != t.indoorInfo.currZoom && (this.style.backgroundPosition = "-31px 0")
            }, t.EVENT._zoomOutMouseMove = function() {
                t.indoorInfo.currZoom != t.indoorInfo.zoomLevel && (this.style.backgroundPosition = "0 -25px")
            }, t.EVENT._zoomInMouseLeave = function() {
                1 != t.indoorInfo.currZoom && (this.style.backgroundPosition = "0 0")
            }, t.EVENT._zoomOutMouseLeave = function() {
                t.indoorInfo.currZoom != t.indoorInfo.zoomLevel && (this.style.backgroundPosition = "-31px -25px")
            }, T.on(this.viewport, "click", t.EVENT._clickPoint)
        },
        _drag: function(t) {
            var o, e, i = parseInt(this.tileWrap.style.left),
                n = parseInt(this.tileWrap.style.top),
                r = this.viewport.offsetWidth,
                a = this.viewport.offsetHeight,
                s = r - parseInt(this.tileWrap.style.width),
                d = a - parseInt(this.tileWrap.style.height),
                l = i,
                h = n;
            i = i + t.x > 0 ? 0 : i + t.x, n = n + t.y > 0 ? 0 : n + t.y, i = i > s ? i : s, n = n > d ? n : d, this.tileWrap.style.left = i + "px", this.tileWrap.style.top = n + "px", this._checkAdjustTileWrap(r, a, this.tileWrap), o = s > 0 ? 0 : i - l, e = d > 0 ? 0 : n - h;
            var p = {
                x: this.overlay.getPosition().x + o,
                y: this.overlay.getPosition().y + e
            };
            this.overlay.setPosition(p)
        },
        _checkAdjustTileWrap: function(t, o, e) {
            var i = parseInt(e.style.left),
                n = parseInt(e.style.top),
                r = parseInt(e.style.width),
                a = parseInt(e.style.height);
            return t > r && (i = (t - r) / 2), o > a && (n = (o - a) / 2), e.style.left = i + "px", e.style.top = n + "px", !0
        },
        adjustCenter: function(t) {
            var o, e, i = this.opts.parent,
                n = i.offsetWidth,
                r = i.offsetHeight,
                a = this.indoorInfo.width,
                s = this.indoorInfo.height,
                d = this.tileWrap;
            return e = r >= s ? (r - s) / 2 : t.y <= r / 2 ? 0 : s - t.y < r / 2 ? r - s : r / 2 - t.y, d.style.top = e + "px", o = n >= a ? (n - a) / 2 : t.x <= n / 2 ? 0 : a - t.x < n / 2 ? n - a : n / 2 - t.x, d.style.left = o + "px", {
                left: o,
                top: e
            }
        },
        addTileLayer: function(t) {
            var o, e, i = (t.dom, t.area),
                n = (t.tile.height, t.tile.width, t.tile),
                r = t.dom,
                a = null,
                s = this;
            s._totalTileImg = (i.maxCol + 1 - i.minCol) * (i.maxRow + 1 - i.minRow), s._tileImgLoaded = 0;
            for (var d = i.minCol; d <= i.maxCol; d++)
                for (var l = i.minRow; l <= i.maxRow; l++) this.tileSign[d + "_" + l] || (this.tileSign[d + "_" + l] = !0, e = n.width * d, o = n.height * l, a = T.dom.create("img", {
                    src: this.tileUrl + "&iid=" + this.indoorInfo.innerId + "&f=" + this.indoorInfo.realFloor + "&l=" + this.indoorInfo.currZoom + "&pos=" + d + "_" + l,
                    style: "position: absolute; top: " + o + "px; left:" + e + "px; width: 256px; height: 256px; display: block;"
                }), a.complete ? s._tileImgLoadHandler() : a.onload = function() {
                    s._tileImgLoadHandler()
                }, r.appendChild(a))
        },
        _tileImgLoadHandler: function() {
            var t = this;
            t._tileImgLoaded++, t._tileImgLoaded == t._totalTileImg && (t.dispatchEvent("tiles_loaded"), t.opts.parent.style.visibility = "visible")
        },
        _filterTile: function(t, o, e) {
            var i = e.tw,
                n = e.th,
                r = o.x - t.x > e.mw ? t.x + e.mw : o.x,
                a = o.y - t.y > e.mh ? t.y + e.mh : o.y,
                s = Math.floor(t.y / i),
                d = Math.floor(t.x / i),
                l = Math.ceil(a / n) - 1,
                h = Math.ceil(r / i) - 1;
            return {
                minRow: s,
                minCol: d,
                maxRow: l,
                maxCol: h
            }
        },
        _getDefZoom: function(t, o, e, i) {
            var n = 1,
                r = e + 512,
                a = i + 512;
            if (r >= t || a >= o) n = 1;
            else {
                for (; t >= r && o >= a;) t /= 2, o /= 2, n++;
                n--
            }
            return n
        },
        zoom: function(t, o) {
            if (this._zoomData(t)) {
                var e = this.viewport.offsetWidth,
                    i = this.viewport.offsetHeight,
                    n = this.indoorInfo.width,
                    r = this.indoorInfo.height,
                    a = parseInt(this.tileWrap.style.left),
                    s = parseInt(this.tileWrap.style.top),
                    d = o.x - (o.x - a) * Math.pow(2, t),
                    l = o.y - (o.y - s) * Math.pow(2, t);
                this.tileSign = {}, this.markerLayer.innerHTML = "", this.tileLayer.innerHTML = "", this.tileWrap.style.width = this.indoorInfo.width + "px", this.tileWrap.style.height = this.indoorInfo.height + "px", d = d > 0 ? 0 : d, l = l > 0 ? 0 : l, d = e > n + d ? e - n : d, l = i > r + l ? i - r : l, d = e > n ? (e - n) / 2 : d, l = i > r ? (i - r) / 2 : l, this.tileWrap.style.left = d + "px", this.tileWrap.style.top = l + "px", this.renderView({
                    x: d,
                    y: l
                }), this.addMarkers()
            }
        },
        _zoomData: function(t) {
            var o = this.indoorInfo.zoomLevel,
                e = this.indoorInfo.currZoom,
                i = this.indoorInfo;
            if (0 > t && e === o || t > 0 && 1 === e) return !1;
            if (t > 0) {
                i.currZoom -= 1, i.width *= 2, i.height *= 2;
                for (var n in i.points) i.points[n].x *= 2, i.points[n].y *= 2;
                i.currPoint.x *= 2, i.currPoint.y *= 2
            } else {
                i.currZoom += 1, i.width /= 2, i.height /= 2;
                for (var n in i.points) i.points[n].x /= 2, i.points[n].y /= 2;
                i.currPoint.x /= 2, i.currPoint.y /= 2
            }
            var r = T.g("map-zoomout"),
                a = T.g("map-zoomin");
            return baidu.dom.removeClass(a, "disabled"), baidu.dom.removeClass(r, "disabled"), 1 == i.currZoom ? baidu.dom.addClass(r, "disabled") : i.currZoom == o && baidu.dom.addClass(a, "disabled"), !0
        },
        addMarkers: function() {
            var t, o, e, i, n = [
                    [10, 10, 0, -46],
                    [16, 16, 0, -30],
                    [30, 30, 0, 0]
                ],
                r = this.indoorInfo.zoomLevel - this.indoorInfo.currZoom,
                a = this.indoorInfo.currPoint,
                s = Math.floor((this.indoorInfo.zoomLevel + 1) / 3),
                d = this.indoorInfo.zoomLevel - 2 * s;
            s > r && (i = 0), r >= s && s + d > r && (i = 1), r >= s + d && (i = 2);
            var l = "//webmap0.bdimg.com/wolfman/static/pano/images/panorama/indoor_marker_24_b5a9d8a.png",
                h = "//webmap1.bdimg.com/wolfman/static/pano/images/panorama/indoor_marker_8_f2612f9.png";
            this.markers = [];
            var p = {
                x: a.x + parseInt(this.tileWrap.style.left),
                y: a.y + parseInt(this.tileWrap.style.top)
            };
            this.overlay.setPosition(p), this.overlay.setDirection(a.defaultAngle);
            for (var u = 0; u < this.indoorInfo.points.length; u++) o = this.indoorInfo.points[u], e = n[i], t = {
                dom: T.dom.create("div", {
                    "data-id": o.id,
                    title: o.name,
                    style: "position:absolute; width:" + e[0] + "px; height:" + e[1] + "px;top:" + (o.y - e[1] / 2) + "px;left:" + (o.x - e[0] / 2) + "px;background:url(" + l + ") no-repeat " + e[2] + "px " + e[3] + "px; _background:url(" + h + ") no-repeat  " + e[2] + "px " + e[3] + "px;"
                }),
                id: o.id,
                x: o.x,
                y: o.y
            }, 0 == o.pin && (t.dom.style.display = "none"), this.markers.push(t), this.markerLayer.appendChild(t.dom)
        },
        redraw: function() {
            var t = this.indoorInfo.currPoint;
            if (this.adjustCenter(t), this.overlay) {
                var o = {
                    x: t.x + this.tileWrap.offsetLeft,
                    y: t.y + this.tileWrap.offsetTop
                };
                this.overlay.setPosition(o), t.heading && this.overlay.setDirection(t.heading)
            }
            this.renderView({
                x: parseInt(this.tileWrap.style.left),
                y: parseInt(this.tileWrap.style.top)
            })
        },
        _clickMarker: function(t) {
            this.setCenter(t), this.dispatchEvent("pano_changed", {
                data: {
                    panoId: t.id,
                    panoType: "inter"
                }
            })
        },
        event_povChanged: function(t) {
            this.overlay.setDirection(t)
        },
        event_indoorIdChanged: function(t) {
            var o = this,
                e = t.data.id = t.data.pid;
            for (var i in o.markers) o.markers[i].id === e && (t.data.x = o.markers[i].x, t.data.y = o.markers[i].y);
            this.setCenter(t.data)
        },
        event_exitIndoor: function() {
            this.removeEvents()
        },
        destroyAll: function() {
            this.indoorViewContainer.removeChild(this._fishBone);
            var t = baidu.g("panoIndoorMap");
            t && t.parentNode && t.parentNode.removeChild(t)
        },
        getCurrentCity: function(t) {
            var o = this;
            if (o._currentCity) return void t(o._currentCity);
            var e = o.opts.data,
                i = (new Date).getTime(),
                n = e.x - 1 + "," + (e.y - 1) + ";" + (e.x + 1) + "," + (e.y + 1);
            baidu.ajax("/?newmap=1&qt=ncent&ie=utf-8&b=" + n + "&l=16&t=" + i, {
                dataType: "json",
                success: function(e) {
                    if (e && e.content && e.current_city) {
                        var i = e.current_city;
                        o._currentCity = {
                            cityId: i.code,
                            cityName: i.name
                        }, t && t(o._currentCity)
                    }
                },
                error: function() {}
            })
        },
        getBounds: function() {},
        setCenter: function(t) {
            t && (this.indoorInfo.currPoint = t), this.redraw()
        },
        getInnerId: function() {
            return this.opts.data.innerId
        },
        getLevel: function() {
            return void 0
        }
    }), e.exports = i
});;
define("pano:widget/module/PanoOverviewModule/PanoOverviewModule.js", function(e, o, t) {
    var a = e("pano:widget/module/PanoOverviewModule/PanoMapComponent/PanoMapComponent.js"),
        n = e("pano:widget/module/PanoOverviewModule/PanoIndoorPlanComponent/PanoIndoorPlanComponent.js"),
        i = e("pano:widget/base/ModuleClass.js"),
        r = e("pano:widget/module/PanoModule/FlashRender/FlashUtil.js"),
        s = (e("pano:widget/base/service.js"), e("pano:widget/base/util.js")),
        d = (e("pano:widget/model/IndoorData.js"), e("common:widget/ui/Animation/Animation.js")),
        p = {
            none: 0,
            overview: 1,
            plan: 2
        };
    e.loadCss({
        content: '.panoOvZoomBtnBg{position:absolute;right:0;top:0;width:20px;height:20px;overflow:hidden;background-color:#252525;-ms-filter:"alpha(Opacity=50)";filter:alpha(opacity=50);-moz-opacity:.5;-khtml-opacity:.5;opacity:.5;display:none}.panoOvZoomBtnBgH{position:absolute;right:0;top:0;width:20px;height:20px;overflow:hidden;background-color:#252525;-ms-filter:"alpha(Opacity=80)";filter:alpha(opacity=80);-moz-opacity:.8;-khtml-opacity:.8;opacity:.8;display:none}.panoOvFramePinBg{position:absolute;right:0;top:20px;width:20px;height:20px;overflow:hidden;background-color:#252525;-ms-filter:"alpha(Opacity=50)";filter:alpha(opacity=50);-moz-opacity:.5;-khtml-opacity:.5;opacity:.5;display:none}.panoOvFramePinBgH{position:absolute;right:0;top:20px;width:20px;height:20px;overflow:hidden;background-color:#252525;-ms-filter:"alpha(Opacity=80)";filter:alpha(opacity=80);-moz-opacity:.8;-khtml-opacity:.8;opacity:.8;display:none}.panoOvFramePin{position:absolute;right:0;top:22px;width:18px;height:18px;overflow:hidden;display:none;cursor:pointer;background-image:url(//webmap1.bdimg.com/wolfman/static/pano/images/pano_whole/map_fishbone2_fe8f2da.png);background-repeat:no-repeat}.panoOvFramePin_lock{background-repeat:no-repeat;background-position:-49px -69px}.panoOvFramePin_locked{background-repeat:no-repeat;background-position:3px -69px}.panoOvFramePin_lockH{background-position:-75px -69px}.panoOvFramePin_lockedH{background-position:-23px -69px}.panoOvZoomBtn{position:absolute;right:0;top:2px;width:18px;height:18px;overflow:hidden;display:none;cursor:pointer}.panoOvZoomBtn_lock{background:url(//webmap0.bdimg.com/wolfman/static/pano/images/pano_whole/pano-icons_d3a4042.png) -109px -37px no-repeat}.panoOvZoomBtn_locked{background:url(//webmap0.bdimg.com/wolfman/static/pano/images/pano_whole/pano-icons_d3a4042.png) -145px -55px no-repeat}.panoOvZoomBtn_lockB{background:url(//webmap0.bdimg.com/wolfman/static/pano/images/pano_whole/pano-icons_d3a4042.png) -127px -55px no-repeat}.panoOvZoomBtn_lockedB{background:url(//webmap0.bdimg.com/wolfman/static/pano/images/pano_whole/pano-icons_d3a4042.png) -109px -55px no-repeat}#panoOvMarkerPosition{position:absolute;left:0;width:300px;height:106px;overflow:hidden}.overview-back-btn{height:20px;line-height:20px;width:301px;position:absolute;bottom:0;cursor:pointer;text-align:center;border-top:0;border-bottom:0;display:block;text-decoration:none;-webkit-transition:color 300ms,background-color 300ms;background-color:#252525;background-color:rgba(37,37,37,.5);filter:alpha(opacity=60);_filter:alpha(opacity=60);color:#ebf0f5}.overview-back-btnH{background-color:rgba(37,37,37,.8);color:#3af}.panoOvFrameMask{position:absolute;left:0;bottom:20px;width:100%;height:100%}#scale-controll-area{display:none;position:absolute;right:2px;bottom:22px;z-index:100019;font-size:0;display:none;border-radius:2px;background-color:#252525;background-color:rgba(37,37,37,.5);filter:alpha(opacity=60)}#scale-controll-area:hover{background-color:#252525;background-color:rgba(37,37,37,.8);filter:alpha(opacity=80)}.fishbone_button{_background:#535458;width:18px;height:18px;display:inline-block;cursor:pointer;overflow:hidden;position:relative}.fishbone_button span{background-image:url(//webmap1.bdimg.com/wolfman/static/pano/images/pano_whole/map_fishbone2_fe8f2da.png);background-repeat:no-repeat;width:18px;height:18px;display:inline-block;cursor:pointer;overflow:hidden;position:relative}#map-zoomout{border-radius:2px 2px 0 0}#map-zoomout.fishbone_button span{background-position:-36px 4px}#map-zoomout.fishbone_button.hover span{background-position:-16px 4px}#map-zoomout.fishbone_button:hover span{background-position:-16px 4px}#map-zoomout.fishbone_button.disabled span,#map-zoomout.fishbone_button.disabled:hover span{background-position:4px 4px}#map-zoom-line{background-color:rgba(37,37,37,.5);_background-color:#252525;filter:alpha(opacity=50)}#map-zoom-line div{height:1px;font-size:1px;line-height:1px;margin:0 auto;width:12px;background:#a8a8a8}#map-zoomin{border-radius:0 0 2px 2px}#map-zoomin.fishbone_button span{background-position:-36px -15px}#map-zoomin.fishbone_button.hover span{background-position:-16px -15px}#map-zoomin.fishbone_button:hover span{background-position:-16px -15px}#map-zoomin.fishbone_button.disabled span,#map-zoomin.fishbone_button.disabled:hover span{background-position:4px -15px}.pano-fan{background-image:url(//webmap1.bdimg.com/wolfman/static/pano/images/pano_whole/pano_fan_direction_a87c68b.png)!important}#panoMapOuterWapper .overview-back-btn:hover{background-color:rgba(37,37,37,.8);filter:alpha(opacity=80);color:#3af}#panoMapOuterWapper:hover #scale-controll-area{display:block}'
    });
    var l = 106,
        m = i.extend("PanoOverviewModule", {
            constructor: function() {
                this._map = null, this._opts = null, this._currentPanoType = null, this._mapType = p.none, this._mapCache = {
                    markers: null,
                    points: null
                }, this._state = "enable", this._searchMarker = {}
            },
            isAsync: function() {
                return !0
            },
            initialize: function(e) {
                var o = this;
                this._opts = e;
                var t = o._opts.data;
                o.animationStart = !1, o.animation = new d.Animation, o.initOutFrame(), o.bindOutFrameEvent(), t && o.create(t.panoType, o._opts)
            },
            initOutFrame: function() {
                var e = this._opts,
                    o = T.dom.create("div", {
                        id: "panoOvFramePin",
                        "class": "panoOvFramePin",
                        title: "固定",
                        style: "z-index: " + e.zIndex + 21
                    }),
                    t = T.dom.create("div", {
                        id: "panoOvFramePinBg",
                        "class": "panoOvFramePinBg",
                        style: "z-index: " + e.zIndex + 20
                    }),
                    a = T.dom.create("div", {
                        id: "panoOvZoomBtn",
                        "class": "panoOvZoomBtn",
                        style: "z-index: " + e.zIndex + 23
                    }),
                    n = T.dom.create("div", {
                        id: "panoOvZoomBtnBg",
                        "class": "panoOvZoomBtnBg",
                        style: "z-index: " + e.zIndex + 22
                    }),
                    i = T.dom.create("div", {
                        id: "panoOvMarkerPosition",
                        style: "z-index: 0"
                    }),
                    r = T.dom.create("a", {
                        id: "overviewBackBtn",
                        className: "overview-back-btn",
                        style: "z-index: 2"
                    });
                r.href = "javascript:void(0);", r.innerHTML = "返回地图";
                var s = T.dom.create("div", {
                        id: "panoMapOuterWapper",
                        style: "position:absolute;height:100%;width:100%;z-index:" + e.zIndex + 10
                    }),
                    d = T.dom.create("div", {
                        id: "panoOverMapWapper",
                        style: "position:absolute;height:100%;width:100%;z-index:1;"
                    });
                s.appendChild(o), s.appendChild(t), s.appendChild(a), s.appendChild(n), d.appendChild(i), s.appendChild(r), s.appendChild(d), e.parent && e.parent.appendChild(s)
            },
            drawLine: function(e, o) {
                return this._map instanceof a ? (this._mapCache.points = e, this._mapCache.drawLineOptions = o, this._map.drawLine(e, o)) : !1
            },
            addMarkers: function(e) {
                if (this._map instanceof a) {
                    var o = this._mapCache.markers || [],
                        t = s.each(e, function(e) {
                            for (var t = 0, a = o.length; a > t; t++)
                                if (o[t].point === e.point) return void 0;
                            return e
                        }, !0);
                    return this._mapCache.markers = t, this._map.addMarkers(e)
                }
                return !1
            },
            addSearchMarker: function(e, o, t) {
                return this._map instanceof a ? (this._map.addSearchMarker(e, o, t), void(this._searchMarker = {
                    x: e,
                    y: o,
                    name: t
                })) : !1
            },
            removeSearchMarker: function() {
                this._map instanceof a && (this._map.removeSearchMarker(), this._searchMarker = null)
            },
            initTrafficLayer: function() {
                return this._map instanceof a ? this._map.initPathLayer() : !1
            },
            removeMapClickLayer: function() {
                return this._map instanceof a ? this._map.removePoiClickLayer() : !1
            },
            create: function(e, o) {
                var t = this;
                t._currentPanoType = e || "inter";
                var i = baidu.g("panoOvZoomBtn");
                "inter" !== e && e ? t.bindZoomBtnEvent() : (t.unBindZoomBtnEvent(), i.setAttribute("title", "不可点击"));
                var r = "street" == e,
                    s = this._opts.indoorModel,
                    d = null,
                    l = !1,
                    m = baidu.g("panoOverMapWapper");
                if (r) d = new a(m, o), this._mapType = p.overview;
                else {
                    var u = s.has2DMap(),
                        c = s.hasPlanMap();
                    if (c) this._mapType = p.plan, o.data = s.getCurrentFloorData(), d = new n(m, o);
                    else if (u) {
                        this._mapType = p.overview;
                        var h = (o.data.panoHeading, s.get2DMapData());
                        h.currentPoint = o.data.currentPoint, h.panoHeading = o.data.currentPoint.heading, o.data = h, d = new a(m, o, s)
                    } else l = !0;
                    s && "undefined" != typeof o.enterNoExpand && (t.overviewExpand = !1, delete o.enterNoExpand)
                }
                if (d) {
                    if (this.dispatchEvent("layout_changed", {
                            display: !0
                        }), this._map = d, this.bindCommonEvent(), this._map.initialize(), r) {
                        this._mapCache.points && this._map.drawLine(this._mapCache.points, this._mapCache.drawLineOptions), this._mapCache.markers && this._map.addMarkers(this._mapCache.markers);
                        var v = t._searchMarker;
                        v.name && t.addSearchMarker(v.x, v.y, v.name)
                    }
                } else this.dispatchEvent("layout_changed", {
                    display: !1
                }), setTimeout(function() {
                    t.ready()
                }, 0)
            },
            destroyMap: function() {
                this._map && (this.clearMapListener(), this._map.destroyAll(), this._map = void 0, this._mapType = p.none)
            },
            createPositionFlash: function(e) {
                var o = "/wolfman/static/pano/swf/pano_whole/MarkerAnimation_299ef9e.swf";
                r.create({
                    id: "markerAnimation-0",
                    width: "100%",
                    height: "100%",
                    allowscriptaccess: "always",
                    wmode: "transparent",
                    quality: "high",
                    url: o,
                    menu: "false",
                    ver: "10",
                    errorMessage: "您未安装Flash Player播放器或者版本过低"
                }, e);
                var t = this;
                t.flashSize = {
                    width: 300,
                    height: l
                }, setTimeout(function() {}, 500)
            },
            _reset: function() {
                var e = this;
                e.locked = !1, e._isExpand = !1, e._opts.parent.style.visibility = "hidden", e._opts.parent.style.height = l + "px";
                var o = baidu.g("panoOvFramePin"),
                    t = baidu.g("panoOvFramePinBg"),
                    a = baidu.g("panoOvZoomBtn"),
                    n = baidu.g("panoOvZoomBtnBg"),
                    i = baidu.g("panoOvMarkerPosition");
                o.style.display = "none", t.style.display = "none", a.style.display = "none", n.style.display = "none", e._opts.parent.style.width = "300px", e._opts.parent.style.left = "10px", baidu.dom.removeClass(o, "panoOvFramePin_lock"), baidu.dom.removeClass(o, "panoOvFramePin_locked"), baidu.dom.removeClass(o, "panoOvFramePin_lockH"), baidu.dom.addClass(o, "panoOvFramePin_lock"), baidu.dom.removeClass(a, "panoOvZoomBtn_lock"), baidu.dom.removeClass(a, "panoOvZoomBtn_locked"), baidu.dom.removeClass(a, "panoOvZoomBtn_lockedB"), baidu.dom.removeClass(n, "panoOvZoomBtnBgH"), baidu.dom.removeClass(n, "panoOvZoomBtnBg"), o.setAttribute("title", "锁定"), i.style.height = "300px", i.style.width = "300px", e.flashSize = {
                    width: 300,
                    height: 300
                }, i.style.zIndex = 0
            },
            bindCommonEvent: function() {
                var e = this,
                    o = this._map;
                this.clearMapListener(), o.addEventListener("pov_changed", function(o) {
                    e.dispatchEvent("pov_changed", {
                        data: o.data
                    })
                }), o.addEventListener("pano_changed", function(o) {
                    e.dispatchEvent("pano_changed", {
                        data: o.data
                    })
                }), o.addEventListener("photo_tour_enter", function(o) {
                    e.dispatchEvent("photo_tour_enter", {
                        data: {
                            tourId: o.data
                        }
                    })
                }), o.addEventListener("layout_changed", function(o) {
                    e.dispatchEvent("layout_changed", {
                        display: o.data.display
                    })
                }), o.addEventListener("level_changed", function(o) {
                    e._opts.level = o.data.level
                }), o.addEventListener("tiles_loaded", function() {
                    e._opts.parent.style.visibility = "visible", e.ready()
                }), o.addEventListener("mouseenter", function() {
                    e.dispatchEvent("map_mouseenter")
                }), o.addEventListener("mouseleave", function() {
                    e.dispatchEvent("map_mouseleave")
                })
            },
            clearMapListener: function() {
                if (this._map) {
                    var e = this._map;
                    e.removeEventListener("pov_changed"), e.removeEventListener("pano_changed"), e.removeEventListener("layout_changed"), e.removeEventListener("level_changed"), e.removeEventListener("tiles_loaded")
                }
            },
            fold: function() {
                if (this._map && this._isExpand === !0) {
                    var e = this,
                        o = e._opts.parent,
                        t = baidu.g("panoOvFramePin"),
                        a = baidu.g("panoOvFramePinBg");
                    t.style.display = "none", a.style.display = "none", this.animationStart = !0;
                    var n = 300 - l;
                    this._isExpand = !1, this.flashSize = {
                        width: 300,
                        height: l
                    }, this.animation.build({
                        fps: 60,
                        transition: d.Transitions.linear,
                        duration: 200,
                        render: function(e) {
                            o.style.height = 300 - n * e + "px"
                        },
                        finish: function() {
                            e.animationStart = !1, e._map.setCenter()
                        }
                    }), this.overviewExpand = !1
                }
            },
            expand: function() {
                if (this._map && this._isExpand === !1) {
                    var e = this,
                        o = 300 - l;
                    this.animationStart = !0;
                    var t = e._opts.parent,
                        a = baidu.g("panoOvFramePin"),
                        n = baidu.g("panoOvFramePinBg");
                    a.style.display = "block", n.style.display = "block", this.flashSize = {
                        width: 300,
                        height: 300
                    }, this.animation.build({
                        fps: 60,
                        transition: d.Transitions.linear,
                        duration: 200,
                        render: function(e) {
                            t.style.height = l + o * e + "px"
                        },
                        finish: function() {
                            e.animationStart = !1, e._map.setCenter(), e._isExpand = !0
                        }
                    }), this.overviewExpand = !0
                }
            },
            isNotFullHeight: function() {
                var e = baidu.g("pano-overview-wrapper"),
                    o = baidu.g("pano-container"),
                    t = e.style.height;
                return t !== o.offsetHeight - 24 + "px" ? !0 : !1
            },
            setReturnBtnPosition: function() {
                var e = baidu.g("pano-return-btn"),
                    o = baidu.g("pano-ui-layer");
                e.style.left = "18px", o.style.left = "0"
            },
            bindOutFrameEvent: function() {
                function e() {
                    t.overviewExpand = !0, t.animationStart = !0, t.animation && t.animation.build({
                        fps: 60,
                        transition: d.Transitions.linear,
                        duration: 200,
                        render: function(e) {
                            a.style.height = l + h * e + "px"
                        },
                        finish: function() {
                            t.animationStart = !1, t._map && (t._map.setCenter(), t._isExpand = !0, "leave" == t.mousePosition && (t.shrinkTimeout = setTimeout(function() {
                                o()
                            }, 200)))
                        }
                    })
                }

                function o() {
                    t.overviewExpand = !1, t.animationStart = !0, t.animation && t.animation.build({
                        fps: 60,
                        transition: d.Transitions.linear,
                        duration: 200,
                        render: function(e) {
                            a.style.height = 300 - h * e + "px"
                        },
                        finish: function() {
                            t.animationStart = !1, t._map && (t._map.setCenter(), t._isExpand = !1, "enter" == t.mousePosition && (t._isExpandTimeout = setTimeout(function() {
                                e()
                            }, 200)))
                        }
                    })
                }
                var t = this,
                    a = t._opts.parent,
                    n = (baidu.g("panoIndoorMap"), baidu.g("panoOvFramePin")),
                    i = baidu.g("panoOvFramePinBg"),
                    r = baidu.g("pano-container"),
                    s = baidu.g("panoOvZoomBtn"),
                    p = baidu.g("panoOvZoomBtnBg"),
                    m = baidu.g("overviewBackBtn"),
                    u = (baidu.g("panoOverMapWapper"), baidu.g("panoMapOuterWapper")),
                    c = 600,
                    h = 300 - l;
                baidu.on(u, "mouseenter", function() {
                    window._pano_overviewmap_leaved = !1, t._leaveHandler && clearTimeout(t._leaveHandler), t.mousePosition = "enter", t.locked || (t.showTimeout = setTimeout(function() {
                        n.style.display = "block", i.style.display = "block", baidu.dom.addClass(n, "panoOvFramePin_lock"), s.style.display = "block", p.style.display = "block", t.isNotFullHeight() && (baidu.dom.addClass(s, "panoOvZoomBtn_lock"), baidu.dom.addClass(p, "panoOvZoomBtnBg"))
                    }, c)), clearTimeout(t.shrinkTimeout), t._isExpand || t.animationStart || (t._isExpandTimeout = setTimeout(function() {
                        e()
                    }, c))
                }), baidu.on(u, "mouseleave", function(e) {
                    function a() {
                        for (var a = e.relatedTarget; a;) {
                            if ("floor-container" == a.className) return;
                            if (a == document.body) break;
                            a = a.parentNode
                        }
                        if (t.mousePosition = "leave", !t.locked) {
                            n.style.display = "none", i.style.display = "none", s.style.display = "none", p.style.display = "none", baidu.dom.removeClass(n, "panoOvFramePin_lock");
                            var r = baidu.g("panoOvMarkerPosition");
                            r.style.height = l + "px", t.flashSize = {
                                width: 300,
                                height: l
                            }
                        }
                        clearTimeout(t._isExpandTimeout), t.locked || t._isExpand && !t.animationStart && (t.shrinkTimeout = setTimeout(function() {
                            o()
                        }, c))
                    }
                    window._pano_overviewmap_leaved = !0, clearTimeout(t.showTimeout), t._map && !t._map._isDrag && t.isNotFullHeight() && ("map" == window._mouseleave_trigger_source ? (window._mouseleave_trigger_source = null, t._leaveHandler = setTimeout(function() {
                        a()
                    }, 2e3)) : a())
                }), baidu.on(n, "click", function() {
                    t.isNotFullHeight() && (t.locked ? t.unlock() : t.lock())
                }), baidu.on(n, "mouseenter", function() {
                    t.isNotFullHeight() && (t.locked ? (baidu.dom.removeClass(n, "panoOvFramePin_locked"), baidu.dom.addClass(n, "panoOvFramePin_lockedH")) : (baidu.dom.removeClass(n, "panoOvFramePin_lock"), baidu.dom.addClass(n, "panoOvFramePin_lockH")), baidu.dom.addClass(i, "panoOvFramePinBgH"))
                }), baidu.on(n, "mouseleave", function() {
                    t.isNotFullHeight() && (t.locked ? (baidu.dom.removeClass(n, "panoOvFramePin_lockedH"), baidu.dom.addClass(n, "panoOvFramePin_locked")) : (baidu.dom.removeClass(n, "panoOvFramePin_lockH"), baidu.dom.addClass(n, "panoOvFramePin_lock")), baidu.dom.removeClass(i, "panoOvFramePinBgH"))
                }), t.isFullScreen = !1, t.timer = null, t.resize = function() {
                    window.clearTimeout(t.timer), t.timer = window.setTimeout(function() {
                        var e = baidu.g("pano-overview-wrapper"),
                            o = baidu.g("pano-return-btn"),
                            a = baidu.g("pano-ui-layer"),
                            n = baidu.g("pano-container");
                        t.isFullScreen ? (e.style.height = n.offsetHeight - 24 + "px", o.style.left = e.offsetWidth + 18 + "px", a.style.left = e.offsetWidth + 3 + "px", t.dispatchEvent("resize_guide")) : o && (o.style.left = "13px")
                    }, 10)
                }, T.on(window, "resize", t.resize), zoomBtnClickEvent = function() {
                    var e = baidu.g("pano-overview-wrapper"),
                        o = baidu.g("pano-return-btn"),
                        i = baidu.g("pano-ui-layer"),
                        d = (baidu.g("r_arrow"), baidu.g("l_arrow"), baidu.g("panoAlbum-container"), baidu.g("panoOvMarkerPosition"));
                    t.isNotFullHeight() ? (t.isFullScreen = !0, e.style.left = "0", e.style.width = "33%", a.style.height = r.offsetHeight - 24 + "px", o.style.left = e.offsetWidth + 18 + "px", i.style.left = e.offsetWidth + 3 + "px", m.style.width = "100%", t.dispatchEvent("resize_guide"), baidu.dom.removeClass(s, "panoOvZoomBtn_lockB"), baidu.dom.addClass(s, "panoOvZoomBtn_locked"), n.setAttribute("title", "不可点击"), t.locked || (baidu.dom.removeClass(n, "panoOvFramePin_lock"), baidu.dom.addClass(n, "panoOvFramePin_locked")), d.style.height = a.offsetHeight - 4 + "px", d.style.width = e.offsetWidth - 4 + "px", t.flashSize = {
                        width: e.offsetWidth - 4,
                        height: a.offsetHeight - 4
                    }) : (t.isFullScreen = !1, e.style.left = "10px", e.style.width = "300px", a.style.height = "300px", o.style.left = "13px", i.style.left = "0", t.dispatchEvent("resize_guide"), baidu.dom.removeClass(s, "panoOvZoomBtn_lockedB"), baidu.dom.addClass(s, "panoOvZoomBtn_lock"), t.locked ? n.setAttribute("title", "解锁") : (baidu.dom.removeClass(n, "panoOvFramePin_locked"), baidu.dom.addClass(n, "panoOvFramePin_lock"), n.setAttribute("title", "固定")), d.style.height = "300px", d.style.width = "300px", t.flashSize = {
                        width: 300,
                        height: 300
                    }), baidu.dom.removeClass(p, "panoOvZoomBtnBgH"), addStat(STAT_CODE.STAT_PANORAMA, {
                        item: "zoom-button-click"
                    })
                }, zoomBtnMouseenterEvent = function() {
                    t.isNotFullHeight() ? (baidu.dom.removeClass(s, "panoOvZoomBtn_lock"), baidu.dom.addClass(s, "panoOvZoomBtn_lockB"), s.title = "扩大图区") : (baidu.dom.removeClass(s, "panoOvZoomBtn_locked"), baidu.dom.addClass(s, "panoOvZoomBtn_lockedB"), s.title = "缩小图区"), baidu.dom.addClass(p, "panoOvZoomBtnBgH")
                }, zoomBtnMouseleaveEvent = function() {
                    t.isNotFullHeight() ? (baidu.dom.removeClass(s, "panoOvZoomBtn_lockB"), baidu.dom.addClass(s, "panoOvZoomBtn_lock")) : (baidu.dom.removeClass(s, "panoOvZoomBtn_lockedB"), baidu.dom.addClass(s, "panoOvZoomBtn_locked")), baidu.dom.removeClass(p, "panoOvZoomBtnBgH")
                }, baidu.on(m, "mouseenter", function() {
                    baidu.dom.addClass(m, "overview-back-btnH")
                }), baidu.on(m, "mouseleave", function() {
                    baidu.dom.removeClass(m, "overview-back-btnH")
                }), baidu.on(m, "click", function() {
                    t.dispatchEvent("close_pano"), addStat(STAT_CODE.STAT_PANORAMA, {
                        catalog: "overview-return-click"
                    })
                })
            },
            bindZoomBtnEvent: function() {
                var e = baidu.g("panoOvZoomBtn");
                "undefined" != typeof document.addEventListener ? (e.addEventListener("click", zoomBtnClickEvent), e.addEventListener("mouseenter", zoomBtnMouseenterEvent), e.addEventListener("mouseleave", zoomBtnMouseleaveEvent)) : (e.attachEvent("onclick", zoomBtnClickEvent), e.attachEvent("onmouseenter", zoomBtnMouseenterEvent), e.attachEvent("onmouseleave", zoomBtnMouseleaveEvent))
            },
            unBindZoomBtnEvent: function() {
                var e = baidu.g("panoOvZoomBtn");
                "undefined" != typeof document.removeEventListener ? (e.removeEventListener("click", zoomBtnClickEvent), e.removeEventListener("mouseenter", zoomBtnMouseenterEvent), e.removeEventListener("mouseleave", zoomBtnMouseleaveEvent)) : (e.detachEvent("onclick", zoomBtnClickEvent), e.detachEvent("onmouseenter", zoomBtnMouseenterEvent), e.detachEvent("onmouseleave", zoomBtnMouseleaveEvent))
            },
            lock: function() {
                if (!this.locked) {
                    var e = baidu.g("panoOvFramePin");
                    this.locked = !0, baidu.dom.removeClass(e, "panoOvFramePin_lockH"), baidu.dom.addClass(e, "panoOvFramePin_lockedH"), e.setAttribute("title", "解锁");
                    var o = baidu.g("panoOvMarkerPosition");
                    o.style.height = "300px", this.flashSize = {
                        width: 300,
                        height: 300
                    }, addStat(STAT_CODE.STAT_PANORAMA, {
                        catalog: "eagle-eye-stick"
                    })
                }
            },
            unlock: function() {
                if (this.locked) {
                    this.locked = !1;
                    var e = baidu.g("panoOvFramePin");
                    baidu.dom.removeClass(e, "panoOvFramePin_lockedH"), baidu.dom.addClass(e, "panoOvFramePin_lockH"), e.setAttribute("title", "锁定"), addStat(STAT_CODE.STAT_PANORAMA, {
                        catalog: "eagle-eye-stick"
                    })
                }
            },
            isLocked: function() {
                return this.locked
            },
            isExpand: function() {
                return this._isExpand
            },
            event_panoChanged: function(e) {
                var o = this,
                    t = o._map,
                    a = o._opts,
                    n = e.data.panoType || "inter";
                if (o._currentPanoType != n) this.destroyMap(), o._reset(), a.data = e.data, o.create(n, a);
                else {
                    if (!t) return;
                    t.event_panoChanged && t.event_panoChanged(e.data)
                }
            },
            setPolymerizationComponentPosition: function() {},
            _createPolymerizationComponent: function() {},
            _createCatalogComponent: function() {},
            _createFloorComponent: function() {},
            event_indoorEnter: function(e) {
                e.data.panoType = "inter";
                var o = this,
                    t = this._opts,
                    a = this._opts.indoorModel = e.indoorModel,
                    n = a.has2DMap();
                if (o._mapType === p.overview && n) {
                    o._map.event_panoChanged(e.data, a), o._reset(), o.isFullScreen = !1, o._currentPanoType = "inter";
                    var i = baidu.g("panoOvZoomBtn");
                    o.unBindZoomBtnEvent(), i.setAttribute("title", "不可点击"), o._map.setZoom(16), o.dispatchEvent("after_pano_changed", {
                        idm: a
                    })
                } else t.data = e.data, o.destroyMap(), o._reset(), o._opts.data = a.getCurrentFloorData(), t.enterNoExpand = !1, o.create("inter", t), o.isFullScreen = !1
            },
            event_floorChanged: function(e) {
                var o = this._opts;
                if (this._mapType === p.overview && o.indoorModel) {
                    this._map.updateTopologyMarkers();
                    var t = o.indoorModel.getCurrentPointData();
                    return void this._map.event_panoChanged(t)
                }
                this.destroyMap(), o.data = e.data, this.create("inter", o)
            },
            event_showPosition: function() {},
            event_hidePosition: function() {},
            _adaptData: function(e) {
                function o(e) {
                    for (var o = [], t = 0, a = e.length; a > t; t++) {
                        var n = e[t],
                            i = {
                                defaultAngle: 0,
                                id: n.PID,
                                name: n.name,
                                x: n.X / 100,
                                y: n.Y / 100
                            };
                        o.push(i)
                    }
                    return o
                }
                var t = this._opts.data,
                    a = e.floorsData,
                    n = {
                        defZoom: t.defZoom,
                        floor: e.floor,
                        hasImage: t.hasImage,
                        height: 1024,
                        width: 1024,
                        innerId: t.innerId,
                        pid: t.pid,
                        points: o(a.Points),
                        poiuid: t.poiuid,
                        uid: e.panoId,
                        x: a.LTpoint.X / 100,
                        y: a.LTpoint.Y / 100,
                        zoomLevel: t.zoomLevel
                    };
                return n
            },
            event_indoorIdChanged: function(e) {
                if (this._map) {
                    var o = this._map;
                    this._mapType === p.overview ? o.event_panoChanged(e.data) : o.event_indoorIdChanged(e)
                }
            },
            event_exitIndoor: function(e) {
                if (this._map) {
                    var o = this._map;
                    o.event_exitIndoor && o.event_exitIndoor(e)
                }
            },
            event_povChanged: function(e) {
                if (this._map) {
                    var o = this._map;
                    o.event_povChanged && o.event_povChanged(e.data.panoHeading, e.data.panoPitch)
                }
            },
            event_disable: function() {
                this._state = "disable";
                var e = this._opts,
                    o = T.dom.create("div", {
                        id: "panoOvFrameMask",
                        "class": "panoOvFrameMask",
                        style: "z-index: " + e.zIndex + 20
                    });
                T.g("panoMapOuterWapper").appendChild(o), this._map.hideScaleControl && this._map.hideScaleControl();
                var t = baidu.g("panoOvZoomBtn");
                this.unBindZoomBtnEvent(), t.setAttribute("title", "不可点击")
            },
            event_enable: function() {
                this._state = "enable";
                var e = T.g("panoOvFrameMask");
                e && T.g("panoMapOuterWapper").removeChild(e), this._map.showScaleControl && this._map.showScaleControl();
                baidu.g("panoOvZoomBtn");
                this.bindZoomBtnEvent()
            },
            getLevel: function() {
                return this._map && this._map.getLevel ? this._map.getLevel() : void 0
            },
            getInnerId: function() {
                var e = this._opts;
                return e.indoorModel && e.indoorModel.hasIndoorData() ? e.indoorModel.getIID() : this._map && this._map.getInnerId ? this._map.getInnerId() : "inter" == this._currentPanoType ? this._opts.data.innerId : void 0
            },
            getPoint: function() {
                return this._map ? this._map.getCenter ? this._map.getCenter() : null : void 0
            },
            getCurrentPointInfo: function() {
                return this._map ? this._map.getCenterPointInfo ? this._map.getCenterPointInfo() : null : void 0
            },
            getCurrentCity: function(e) {
                if (!this._map) {
                    var o = this._opts.data;
                    return void s.getCurrentCityByArea(o.x - 1, o.y - 1, o.x + 1, o.y + 1, function(o) {
                        var t = o.current_city;
                        e({
                            cityId: t.code,
                            cityName: t.name
                        })
                    })
                }
                return this._map.getCurrentCity ? this._map.getCurrentCity(e) : null
            },
            _move: function(e, o) {
                var t = document.getElementById("pano-overview-wrapper"),
                    a = o - e,
                    n = new d.Animation,
                    i = {
                        duration: 400,
                        fps: 40,
                        delay: d.Animation.INFINITE,
                        transition: d.Transitions.easeOutQuad,
                        finish: function() {},
                        render: function(o) {
                            t.style.bottom = e + a * o + "px"
                        }
                    };
                n.build(i), n.start()
            },
            show: function() {
                var e = document.getElementById("pano-overview-wrapper"),
                    o = parseInt(e.style.bottom),
                    t = 20;
                this._move(o, t)
            },
            hide: function() {
                var e = document.getElementById("pano-overview-wrapper"),
                    o = 20,
                    t = -e.clientHeight - 10;
                this._move(o, t)
            },
            dispose: function() {
                var e = this._opts.parent;
                e && (e.innerHTML = "", e.style.display = "none"), this.clearMapListener()
            },
            getSupportEvents: function() {
                return ["pov_changed", "pano_changed", "layout_changed", "level_changed", "close_pano", "photo_tour_enter", "resize_guide"]
            }
        });
    t.exports = m
});;
define("pano:widget/module/PanoGuideModule/TimelineModule/TimelineModule.js", function(require, exports, module) {
    var ModuleClass = require("pano:widget/base/ModuleClass.js"),
        util = require("pano:widget/base/util.js"),
        Animation = require("common:widget/ui/Animation/Animation.js"),
        config = require("common:widget/ui/config/config.js");
    require.loadCss({
        content: '.pc .pano_timeline_wrapper{font-family:Arial,Helvetica,"Microsoft Yahei",sans-serif}.pano_timeline_wrapper{position:relative;width:198px;height:108px;margin:0 1px 0 3px;border:1px solid #3d4145;font-size:0}.pano_timeline_wrapper img{cursor:pointer;border:0}.pano_timeline_wrapper .photo-desc{position:absolute;bottom:0;left:0;width:198px;height:24px;padding-top:25px;text-align:center;font-size:12px;color:#abb0b2;z-index:3;cursor:pointer;background:url(//webmap1.bdimg.com/wolfman/static/pano/images/pano_whole/album-title-bg_e85b917.png) left bottom repeat-x;_background:#000;_padding:0;_height:25px;_line-height:25px;_filter:alpha(opacity=75)}.pano_timeline_wrapper .photo-mask{z-index:3;position:absolute;bottom:0;left:0;width:100%;height:100%;text-align:center;font-size:12px;color:#fff;z-index:3;cursor:pointer;background-color:#000;filter:alpha(opacity=65);background-color:rgba(0,0,0,.65);text-decoration:none}.pano_timeline_wrapper .photo-mask .icon-day{display:block;background-image:url(//webmap0.bdimg.com/wolfman/static/pano/images/pano_whole/guide_day_night_7749dc0.png);width:30px;margin:0 auto;height:100%;background-repeat:no-repeat;background-position:0 center}.pano_timeline_wrapper .photo-mask:hover .icon-day{background-position:-30px center;color:#3af}.pano_timeline_wrapper .photo-mask .icon-night{display:block;background-image:url(//webmap0.bdimg.com/wolfman/static/pano/images/pano_whole/guide_day_night_7749dc0.png);width:31px;margin:0 auto;height:100%;background-repeat:no-repeat;background-position:-60px center}.pano_timeline_wrapper .photo-mask:hover .icon-night{background-position:-91px center;color:#3af}.pano_timeline_wrapper .photo-mask .time-text{position:absolute;width:100%;text-align:center;top:72px;left:0}.pano_timeline_wrapper .photo-mask:hover .time-text{color:#34a4f4}'
    });
    var TEMPLATE = [function(_template_object) {
            var _template_fun_array = [],
                fn = function(__data__) {
                    var _template_varName = "";
                    for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                    eval(_template_varName), _template_fun_array.push('<div class="pano_timeline_wrapper">    <a class="photo-mask" target="_blank" title="', "undefined" == typeof timelineData.timePointName ? "" : timelineData.timePointName, '">        '), _template_fun_array.push("day" === timelineData.time ? '            <div class="icon-day"></div>        ' : '            <div class="icon-night"></div>        '), _template_fun_array.push('        <div class="time-text">', "undefined" == typeof timelineData.timePointName ? "" : timelineData.timePointName, '</div>    </a>    <img width="198" height="108" src="', "undefined" == typeof timelineData.pano3DImage ? "" : timelineData.pano3DImage, '">    <!--div class="photo-desc">        <span title="', "undefined" == typeof timelineData.timePointName ? "" : timelineData.timePointName, '">', "undefined" == typeof timelineData.timePointName ? "" : timelineData.timePointName, "</span>    </div--></div>"), _template_varName = null
                }(_template_object);
            return fn = null, _template_fun_array.join("")
        }][0],
        panoTimelineModuleContainer = null,
        panoData = null,
        TIMEPOINT_NAME = {
            day: "日景",
            night: "夜景"
        },
        convertTimelineData = function(e) {
            for (var i = [], n = 0, a = e.length; a > n; n++) {
                var t = {};
                t.pano3DImage = util.getImage3DUrl(config.urlConfig.PANO_3DIMAGE_URL, e[n].id, e[n].heading, e[n].pitch, 198, 109), t.panoData = {
                    panoId: e[n].id,
                    panoHeading: e[n].heading,
                    panoPitch: e[n].pitch
                }, t.time = e[n].time, t.timePointName = TIMEPOINT_NAME[e[n].time], i.push(t)
            }
            return i
        },
        PanoTimelineModule = ModuleClass.extend("PanoTimelineModule", {
            initialize: function(e) {
                panoTimelineModuleContainer = e;
                var i = this;
                T(panoTimelineModuleContainer).on("click", function() {
                    panoData && (panoData.keepPov = !0, i.dispatchEvent("pano_changed", {
                        data: panoData
                    }), addStat(STAT_CODE.STAT_PANORAMA, {
                        item: "panotimeline-click"
                    }))
                })
            },
            getSupportEvents: function() {
                return ["pano_changed"]
            },
            dispose: function() {
                panoTimelineModuleContainer.innerHTML = ""
            },
            update: function(e) {
                var i = T.isArray(e) && e.length > 0,
                    n = void 0,
                    a = "";
                i && "" == panoTimelineModuleContainer.innerHTML ? n = !0 : i || "" == panoTimelineModuleContainer.innerHTML || (n = !1), i && (e = convertTimelineData(e), panoData = e[0].panoData, a = TEMPLATE({
                    timelineData: e[0]
                }));
                var t = new Animation.Animation;
                if (void 0 !== n) n === !0 ? (panoTimelineModuleContainer.innerHTML = a, t.build({
                    fps: 60,
                    duration: 300,
                    render: function(e) {
                        util.setOpacity(panoTimelineModuleContainer, e)
                    },
                    finish: function() {}
                })) : t.build({
                    fps: 60,
                    duration: 300,
                    render: function(e) {
                        e = 1 - e, util.setOpacity(panoTimelineModuleContainer, e)
                    },
                    finish: function() {
                        panoTimelineModuleContainer.innerHTML = ""
                    }
                });
                else if (i) {
                    var o = panoTimelineModuleContainer.cloneNode(!0);
                    o.style.position = "absolute", o.style.top = "0", panoTimelineModuleContainer.parentNode.appendChild(o), t.build({
                        fps: 60,
                        duration: 300,
                        render: function(e) {
                            e = 1 - e, util.setOpacity(o, e)
                        },
                        finish: function() {
                            o.parentNode.removeChild(o)
                        }
                    }), panoTimelineModuleContainer.innerHTML = a
                }
            }
        });
    module.exports = PanoTimelineModule
});;
define("pano:widget/module/PanoGuideModule/TimethroughModule/TimethroughModule.js", function(require, exports, module) {
    var ModuleClass = require("pano:widget/base/ModuleClass.js"),
        util = require("pano:widget/base/util.js"),
        Animation = require("common:widget/ui/Animation/Animation.js"),
        config = require("common:widget/ui/config/config.js");
    require.loadCss({
        content: '.pc .pano_timethrough_wrapper{font-family:Arial,Helvetica,"Microsoft YaHei",sans-serif}.pano_timethrough_wrapper{position:relative;width:198px;height:108px;margin:0 1px 0 3px;border:1px transparent solid;font-size:12px}.pano_timethrough_wrapper img{cursor:pointer;border:0;position:absolute;top:0;left:0;z-index:2;background-color:#000}.pano_timethrough_wrapper .photo-mask{z-index:3;position:absolute;bottom:0;left:0;width:100%;height:100%;text-align:center;font-size:12px;color:#fff;z-index:3;cursor:pointer;background-color:#000;filter:alpha(opacity=65);background-color:rgba(0,0,0,.65);text-decoration:none}.pano_timethrough_wrapper .photo-mask .icon{display:block;background-image:url(//webmap0.bdimg.com/wolfman/static/pano/images/pano_whole/timelineicon-8-black_cc9fe1f.png);width:32px;margin:0 auto;height:100%;background-repeat:no-repeat;background-position:0 center}.pano_timethrough_wrapper .photo-mask:hover .icon{background-position:-32px center;color:#3af}.pano_timethrough_wrapper .photo-mask .time-text{position:absolute;width:100%;text-align:center;top:72px;left:0}.pano_timethrough_wrapper .photo-mask:hover .time-text{color:#34a4f4}.pano_timethrough_wrapper .timethrough-list-container{width:100%;height:100%;overflow:hidden;position:relative}.pano_timethrough_wrapper .timethrough-list{width:100%;position:absolute;top:0;background-color:#252525;opacity:.9;_background-color:gray;*background-color:gray;text-align:center;z-index:1}.pano_timethrough_wrapper .timethrough-list-container .line{border-bottom:1px solid #393c40;margin:0 auto;width:95%;font-size:0;height:0}.pano_timethrough_wrapper .timethrough-list-container .item{height:50px;line-height:50px;color:#b5b9c5;display:block;text-decoration:none;cursor:pointer}.pano_timethrough_wrapper .timethrough-list-container .selected{color:#34a4f4}.pano_timethrough_wrapper .timethrough-list-container .item:hover{background-color:gray}'
    });
    var TEMPLATE = [function(_template_object) {
            var _template_fun_array = [],
                fn = function(__data__) {
                    var _template_varName = "";
                    for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                    eval(_template_varName), _template_fun_array.push('<div class="pano_timethrough_wrapper">    '), _template_fun_array.push(isLatest ? '        <a class="photo-mask">    ' : '        <a class="photo-mask">    '), _template_fun_array.push('        <div class="icon"></div>        <div class="time-text">', "undefined" == typeof label ? "" : label, '</div>    </a>    <img id="timeThroughThumb" style="background-color:#2b2e31;" width="198" height="108" src="', "undefined" == typeof currectImage ? "" : currectImage, '" onerror="this.src=&#39;', "undefined" == typeof error_src ? "" : error_src, '&#39;;">    <div class="timethrough-list-container">        <div class="timethrough-list">            ', "undefined" == typeof throughListHtml ? "" : throughListHtml, "        </div>    </div></div>"), _template_varName = null
                }(_template_object);
            return fn = null, _template_fun_array.join("")
        }][0],
        IMG_ERROR_URL = "//webmap0.bdimg.com/wolfman/static/pano/images/api/blank_21ab564.gif",
        panoTimelineModuleContainer = null,
        panoData = null,
        TIME_THROUGH_DATA_EXAMPLE = [{
            ID: "01011700001306272100190835F",
            IsCurrent: 1,
            Time: "day",
            TimeDir: "",
            TimeLine: "201402",
            Year: "2014"
        }, {
            ID: "01011700001306100916155955B",
            IsCurrent: 0,
            Time: "day",
            TimeDir: "obsolete",
            TimeLine: "201306",
            Year: "2013"
        }],
        convertTimelineData = function() {},
        PanoTimelineModule = ModuleClass.extend("PanoTimelineModule", {
            initialize: function(t) {
                this.container = t;
                var e = this;
                this.listStatus = -2, this.isMouseInRange = 0;
                var i = 0;
                T(t).on("click", function(t) {
                    var i = t.target ? t.target.getAttribute("data-pid") : null;
                    i && (e.dispatchEvent("pano_changed", {
                        data: {
                            panoId: i,
                            keepPov: !0
                        }
                    }), addStat(STAT_CODE.STAT_PANORAMA, {
                        item: "panotimethrough-click"
                    }), MapLogReport.send({
                        da_src: "pcmapPanoPG.timeMachine.click"
                    }), e.hide(!0), e.isMouseInRange = 0)
                }).on("mouseenter", function() {
                    e.isMouseInRange = 1, clearTimeout(i), i = setTimeout(function() {
                        e._fireAction()
                    }, 200)
                }).on("mouseleave", function() {
                    e.isMouseInRange = 0, clearTimeout(i), i = setTimeout(function() {
                        e._fireAction()
                    }, 300)
                })
            },
            _fireAction: function() {
                this.isMouseInRange ? this.show() : this.hide()
            },
            show: function() {
                if (-2 === this.listStatus) {
                    var t = this;
                    this.listStatus = 1;
                    var e = T(".timethrough-list-container", this.container),
                        i = T(".timethrough-list", this.container),
                        o = e.find(".item"),
                        n = o.length * o.eq(0).outerHeight() + 1 * (o.length - 1);
                    e.css({
                        height: n,
                        "margin-top": -n
                    }), i.css({
                        top: -n
                    });
                    var a = new Animation.Animation,
                        r = {
                            duration: 400,
                            fps: 40,
                            delay: Animation.Animation.INFINITE,
                            transition: Animation.Transitions.easeOutQuad,
                            render: function(t) {
                                i.css("top", n - t * n + "px")
                            },
                            finish: function() {
                                t.listStatus = 2, t._fireAction()
                            }
                        };
                    a.build(r), a.start()
                }
            },
            hide: function(t) {
                if (2 === this.listStatus) {
                    var e = this;
                    this.listStatus = -1;
                    var i = T(".timethrough-list-container", this.container),
                        o = i.outerHeight(),
                        n = T(".timethrough-list", this.container);
                    if (t === !0) return i.css("top", "0px"), void(this.listStatus = -2);
                    var a = new Animation.Animation,
                        r = {
                            duration: 400,
                            fps: 40,
                            delay: Animation.Animation.INFINITE,
                            transition: Animation.Transitions.easeOutQuad,
                            render: function(t) {
                                n.css("top", t * o + "px")
                            },
                            finish: function() {
                                e.listStatus = -2, e._fireAction(), i.css({
                                    height: "auto",
                                    "margin-top": 0
                                })
                            }
                        };
                    a.build(r), a.start()
                }
            },
            empty: function() {
                this.container.innerHTML = "", this.container.style.display = "none"
            },
            update: function(t) {
                var e = 0;
                this.container.style.display = "block", t.sort(function(t, e) {
                    var i, o, n;
                    return i = t.TimeLine, o = i.substr(0, 4), n = i.substr(4, 2), a_time = new Date(o, n), i = e.TimeLine, o = i.substr(0, 4), n = i.substr(4, 2), b_time = new Date(o, n), a_time > b_time ? 1 : -1
                });
                var i = "",
                    o = 0,
                    n = util.each(t, function(t) {
                        var n = "item",
                            a = t.TimeLine,
                            r = a.substr(0, 4),
                            s = a.substr(4, 2),
                            u = r + "年" + (parseInt(s, 10) ? s + "月" : "");
                        return 1 === t.IsCurrent && (e = t.ID, i = u, o = t.dir, n = "item selected"), '<a data-pid="' + t.ID + '" class="' + n + '">' + u + "</a>"
                    }, !0),
                    a = util.getImage3DUrl(config.urlConfig.PANO_3DIMAGE_URL, e, o, 0, 198, 108),
                    r = 1 === t[t.length - 1].IsCurrent,
                    s = {
                        currectImage: a,
                        label: r ? "时光机" : i,
                        throughListHtml: n.join('<div class="line"></div>'),
                        isLatest: r,
                        error_src: IMG_ERROR_URL
                    },
                    u = document.getElementById("timeThroughThumb");
                if (u) {
                    var h = u.src;
                    s.currentImage = h;
                    var l = new Image;
                    l.onload = function() {
                        var t = document.getElementById("timeThroughThumb");
                        t.src = this.src
                    }, l.src = a
                }
                var c = TEMPLATE(s);
                this.container.innerHTML = c, this.isMouseInRange && this.show()
            },
            getSupportEvents: function() {
                return ["pano_changed"]
            },
            dispose: function() {
                panoTimelineModuleContainer.innerHTML = ""
            }
        });
    module.exports = PanoTimelineModule
});;
define("pano:widget/module/PanoGuideModule/AlbumModule/AlbumModule.js", function(t, e, o) {
    var n = t("pano:widget/component/PanoAlbumComponent/AlbumComponent.js"),
        a = t("pano:widget/base/ModuleClass.js"),
        i = t("pano:widget/module/PanoGuideModule/AlbumModule/FloorComponent/FloorComponent.js"),
        r = t("pano:widget/module/PanoGuideModule/AlbumModule/CatalogComponent/CatalogComponent.js"),
        s = (t("pano:widget/base/service.js"), t("pano:widget/base/util.js")),
        d = 198,
        l = 108,
        c = a.extend("AlbumModule", {
            initialize: function(t, e, o) {
                this.options = {
                    albumImageDomain: e
                }, this._maxWidth = document.body.clientWidth, this.container = t;
                var a = this.album = new n(t, d, l, {
                    zIndex: o.zIndex || 1
                });
                this.indoorModel = o.indoorModel, this.indoorData = o.indoorData, this.indoorModel && this._createPolymerizationComponent(this.indoorModel);
                var i = this;
                this_AlbumEventHandlers = {}, a.addEventListener("click", function(t, e) {
                    var o, n = e.index;
                    if (o = "exit" === n ? i.exit : i.data[n], 9 == o.type && addStat(STAT_CODE.STAT_PANORAMA, {
                            item: "pano-ugc-entrance-click-album"
                        }), o && o.data) {
                        switch (o = o.data, a.setSelectIndex(n), o.type) {
                            case 2:
                                o.source = "PanoStreet", i.dispatchEvent("animate_pano_changed", {
                                    data: o
                                });
                                break;
                            case 21:
                                o.source = "InterPoi", i.dispatchEvent("inter_poi_changed", {
                                    data: o
                                });
                                break;
                            case 7:
                                i.dispatchEvent("photo_tour_enter", {
                                    data: o
                                });
                                break;
                            case 8:
                                i.dispatchEvent("pano_topic_enter", {
                                    data: o
                                });
                                break;
                            case 4:
                                o.source = "PanoStreet", i.dispatchEvent("animate_pano_changed", {
                                    data: o
                                });
                                break;
                            case 3:
                                i.dispatchEvent("pano_changed", {
                                    data: o
                                });
                                break;
                            case 1:
                            case 5:
                            case 6:
                                i.dispatchEvent("pano_changed", {
                                    data: o
                                });
                                break;
                            case 10:
                            case 9:
                                i.dispatchEvent("video_enter", {
                                    data: o
                                });
                                break;
                            case 11:
                                o.panoHeading = void 0, o.panoPitch = void 0, i.dispatchEvent("pano_changed", {
                                    data: o
                                })
                        }
                        i.dispatchEvent("hide_position"), addStat(STAT_CODE.STAT_PANORAMA, {
                            item: "guide_album_click",
                            type: o.type
                        }), MapLogReport.send({
                            da_src: "pcmapPanoPG.morePic.click"
                        })
                    }
                }), a.addEventListener("mouseenter", function(t, e) {
                    var o, n = e.index;
                    "exit" === n ? o = i.exit : (a.fitImage(n), o = i.data[n]), o && o.data && (o = o.data, i.dispatchEvent("show_position", {
                        data: {
                            x: o.x,
                            y: o.y
                        }
                    }))
                }), a.addEventListener("mouseleave", function() {
                    i.dispatchEvent("hide_position")
                }), a.addEventListener("show_position", function(t) {
                    i.dispatchEvent("show_position", {
                        data: t.data
                    })
                }), a.addEventListener("hide_position", function() {
                    i.dispatchEvent("hide_position")
                }), a.addEventListener("floor_changed", function(t) {
                    i.dispatchEvent("layout_changed", {
                        data: t.data
                    })
                })
            },
            update: function(t, e) {
                var o = this.options.albumImageDomain;
                this.data = t;
                var n = s.each(t, function(t) {
                    var e = {};
                    if (t.photoUrl) e.src = t.photoUrl;
                    else {
                        var n = t.data;
                        if (!n) return;
                        e.src = s.getImage3DUrl(o, n.panoId, n.prvHeading, n.prvPitch, d, l, n.prvFovy)
                    }
                    return e.name = t.name, e.icon = "i-poi-" + t.type, e
                }, !0);
                e && this.showExit(e);
                var a = this._catalogComponent || this._floorComponent ? !0 : !1;
                this.album.resize(void 0, a), this.album.update(n)
            },
            showExit: function(t) {
                this.exit = t;
                var e = this.options.albumImageDomain,
                    o = function(t) {
                        var o = {};
                        if (t.photoUrl) o.src = t.photoUrl;
                        else {
                            var n = t.data;
                            if (!n) return;
                            o.src = s.getImage3DUrl(e, n.panoId, n.prvHeading, n.prvPitch, d, l, n.prvFovy)
                        }
                        return o.name = t.name, o.icon = "i-poi-" + t.type, o
                    }(t);
                this.album.showExit(o)
            },
            destroyExit: function() {
                this.album.destroyExit()
            },
            setSelectPano: function(t) {
                var e = t,
                    o = void 0;
                return s.some(this.data, function(t, n) {
                    return t.data.panoId + "_" + t.data.uid == e ? (o = n, !0) : !1
                }), void 0 !== o ? (this.setSelectIndex(o), !0) : !1
            },
            unselect: function() {
                this.album.unselect()
            },
            setSelectIndex: function(t) {
                this.album.setSelectIndex(t)
            },
            scrollTo: function(t) {
                this.album.scrollTo(t)
            },
            getSelectIndex: function() {
                return this.album.getSelectIndex()
            },
            getSelectItem: function() {
                var t = this.album.getSelectIndex();
                if (void 0 === t || !this.data[t]) return null;
                var e = this.data[t].data,
                    o = this.album.getCurrentLiPosition(t);
                return o.x = o.x + this.container.offsetLeft, {
                    name: this.data[t].name,
                    data: e,
                    pos: {
                        x: o.x,
                        y: o.y
                    }
                }
            },
            ignoreMouseEvent: function(t) {
                this.album.ignoreMouseEvent(t)
            },
            event_layoutChanged: function(t) {
                var e = this._catalogComponent || this._floorComponent ? !0 : !1;
                this.album && this.album.resize(t, e)
            },
            dispose: function() {
                this.album && this.album.dispose()
            },
            _createPolymerizationComponent: function(t, e) {
                var o = t.getCatalogList();
                o.length > 0 ? this._createCatalogComponent(t, e) : this._createFloorComponent(t, e)
            },
            _createCatalogComponent: function(t) {
                if (!this._catalogComponent) {
                    var e;
                    if (e = document.getElementById("pano-floor-wrapper"), !e) {
                        var o = this.floorWrapper = document.createElement("div");
                        o.id = "pano-floor-wrapper", this.album.container.insertBefore(o, this.album.leftArrow), s.setOpacity(o, 0), e = o
                    }
                    e.style.visibility = "visible";
                    var n = this._catalogComponent = new r(e, t),
                        a = this;
                    n.addEventListener("item_click", function(e, o) {
                        var n = t.getCatalogList(),
                            i = n[o.index],
                            r = i.points[0].pid;
                        a.dispatchEvent("pano_changed", {
                            data: {
                                panoId: r,
                                panoType: "inter"
                            }
                        }), addStat(STAT_CODE.STAT_PANORAMA, {
                            item: "inter",
                            catalog: "catalog-switch"
                        })
                    });
                    var i = t.getCurrentPointData();
                    this.updateCatalog(i.pid)
                }
            },
            _createFloorComponent: function(t) {
                var e = t.getFloorInfo();
                if (!this._floorComponent && e.length > 1) {
                    var o;
                    if (o = document.getElementById("pano-floor-wrapper"), !o) {
                        var n = this.floorWrapper = document.createElement("div");
                        n.id = "pano-floor-wrapper", this.album.container.insertBefore(n, this.album.leftArrow), s.setOpacity(n, 0), o = n
                    }
                    o.style.visibility = "visible";
                    var a = this._floorComponent = new i(o, t),
                        r = this;
                    a.addEventListener("item_click", function(t, o) {
                        var n = e[o.index],
                            a = n.startid;
                        r.dispatchEvent("pano_changed", {
                            data: {
                                panoId: a,
                                panoType: "inter"
                            }
                        }), addStat(STAT_CODE.STAT_PANORAMA, {
                            item: "inter",
                            catalog: "floor-switch"
                        })
                    }), a.setFloorIndex(t.getCurrentFloor())
                }
            },
            updateCatalog: function(t) {
                var e = this.indoorModel;
                if (e && this._catalogComponent) {
                    var o = e.getCatalogList(),
                        n = null;
                    s.each(o, function(e, o) {
                        return null !== n ? !0 : void s.each(e.points, function(e) {
                            return t === e.pid ? (n = o, !0) : void 0
                        })
                    }), this._catalogComponent.setSelectIndex(n)
                }
            },
            updateFloor: function() {
                var t = this.indoorModel;
                t && this._createPolymerizationComponent(t)
            },
            event_floorChanged: function(t) {
                this.indoorModel && this._floorComponent && this._floorComponent.setFloorIndex(t.data.floor - 1), this.updateFloor()
            },
            event_indoorEnter: function(t) {
                t.data.panoType = "inter";
                var e = this.indoorModel = t.indoorModel;
                this._floorComponent && (this._floorComponent.destroy(), this._floorComponent = void 0), this._catalogComponent && (this._catalogComponent.destroy(), this._catalogComponent = void 0), e ? (this.album.resize(void 0, !0), this._createPolymerizationComponent(e)) : this.album.resize()
            },
            event_exitIndoor: function() {
                this._floorComponent && this._floorComponent.destroy(), this._catalogComponent && this._catalogComponent.destroy(), this._floorComponent = this._catalogComponent = null, this.destroyExit(), this.album.resize()
            }
        });
    o.exports = c
});;
define("pano:widget/module/PanoGuideModule/TopicModule/TopicModule.js", function(require, exports, module) {
    var ModuleClass = require("pano:widget/base/ModuleClass.js"),
        util = require("pano:widget/base/util.js"),
        Animation = require("common:widget/ui/Animation/Animation.js"),
        config = require("common:widget/ui/config/config.js");
    require.loadCss({
        content: '.pc .guide_topic_wrapper{font-family:Arial,Helvetica,"Microsoft Yahei",sans-serif}.guide_topic_wrapper{position:relative;width:198px;height:108px;margin:0 1px 0 3px;border:1px solid #3D4145;font-size:0}.guide_topic_wrapper img{cursor:pointer;border:0}.guide_topic_wrapper .photo-desc{position:absolute;bottom:0;left:0;width:198px;height:24px;padding-top:25px;text-align:center;font-size:12px;color:#abb0b2;z-index:3;cursor:pointer;background:url(//webmap1.bdimg.com/wolfman/static/pano/images/pano_whole/album-title-bg_e85b917.png) left bottom repeat-x;_background:#000;_padding:0;_height:25px;_line-height:25px;_filter:alpha(opacity=75)}.guide_topic_wrapper .photo-mask{z-index:3;position:absolute;bottom:0;left:0;width:100%;height:100%;text-align:center;font-size:12px;color:#fff;z-index:3;cursor:pointer;background-color:#000;filter:alpha(opacity=65);background-color:rgba(0,0,0,.65);text-decoration:none}.guide_topic_wrapper .photo-mask .icon{display:block;background-image:url(//webmap1.bdimg.com/wolfman/static/pano/images/pano_whole/guide_topic_icons_36586ed.png);width:28px;margin:0 auto;height:100%;background-repeat:no-repeat;background-position:0 center}.guide_topic_wrapper .photo-mask:hover .icon{background-position:-28px center;color:#3af}.guide_topic_wrapper .photo-mask .time-text{position:absolute;width:100%;text-align:center;top:72px;left:0}.guide_topic_wrapper .photo-mask:hover .time-text{color:#34a4f4}'
    });
    var TEMPLATE = [function(_template_object) {
            var _template_fun_array = [],
                fn = function(__data__) {
                    var _template_varName = "";
                    for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                    eval(_template_varName), _template_fun_array.push('<div class="guide_topic_wrapper"><a class="photo-mask" href="', "undefined" == typeof topicData.link ? "" : topicData.link, '" target="_blank" title="', "undefined" == typeof topicData.topicName ? "" : topicData.topicName, '专题">        <div class="icon"></div>        <div class="time-text">', "undefined" == typeof topicData.topicName ? "" : topicData.topicName, '</div></a>    <img width="198" height="108" title="', "undefined" == typeof topicData.topicName ? "" : topicData.topicName, '专题" alt="', "undefined" == typeof topicData.topicName ? "" : topicData.topicName, '专题" src="', "undefined" == typeof topicData.pano3DImage ? "" : topicData.pano3DImage, '">    <!--div class="photo-desc">        <span title="', "undefined" == typeof topicData.topicName ? "" : topicData.topicName, '">', "undefined" == typeof topicData.topicName ? "" : topicData.topicName, "</span>    </div--></div>"), _template_varName = null
                }(_template_object);
            return fn = null, _template_fun_array.join("")
        }][0],
        panoTopicModuleContainer = null,
        panoData = null,
        TIMEPOINT_NAME = {
            day: "日景",
            night: "夜景"
        },
        convertTopicData = function(o) {
            for (var t = [], i = 0, a = o.length; a > i; i++) {
                var e = {},
                    n = o[i].data;
                e.pano3DImage = util.getImage3DUrl(config.urlConfig.PANO_3DIMAGE_URL, n.panoId, n.panoHeading, n.panoPitch, 198, 109), e.panoData = {
                    panoId: o[i].data.panoId,
                    panoHeading: o[i].data.panoHeading,
                    panoPitch: o[i].data.panoPitch
                }, e.topicName = o[i].name, t.push(e)
            }
            return t
        },
        PanoTopicModule = ModuleClass.extend("PanoTopicModule", {
            initialize: function(o) {
                panoTopicModuleContainer = o;
                var t = this;
                T(panoTopicModuleContainer).on("click", function() {
                    panoData && (t.dispatchEvent("show_topic", {
                        data: panoData
                    }), addStat(STAT_CODE.STAT_PANORAMA, {
                        item: "panoTopic-click"
                    }))
                })
            },
            getSupportEvents: function() {
                return ["show_topic"]
            },
            dispose: function() {
                panoTopicModuleContainer.innerHTML = ""
            },
            empty: function() {
                panoTopicModuleContainer.innerHTML = ""
            },
            update: function(o) {
                var t = T.isArray(o) && o.length > 0,
                    i = void 0,
                    a = "";
                t && "" == panoTopicModuleContainer.innerHTML ? i = !0 : t || "" == panoTopicModuleContainer.innerHTML || (i = !1), t && (o = convertTopicData(o), o = o[0], o.link = config.urlConfig.PANO_HOME_URL + "/panotopic?topicPid=" + o.panoData.panoId, a = TEMPLATE({
                    topicData: o
                }));
                var e = new Animation.Animation;
                if (void 0 !== i) i === !0 ? (panoTopicModuleContainer.innerHTML = a, e.build({
                    fps: 60,
                    duration: 300,
                    render: function(o) {
                        util.setOpacity(panoTopicModuleContainer, o)
                    },
                    finish: function() {}
                })) : e.build({
                    fps: 60,
                    duration: 300,
                    render: function(o) {
                        o = 1 - o, util.setOpacity(panoTopicModuleContainer, o)
                    },
                    finish: function() {
                        panoTopicModuleContainer.innerHTML = ""
                    }
                });
                else if (t) {
                    var n = panoTopicModuleContainer.cloneNode(!0);
                    n.style.position = "absolute", n.style.top = "0", panoTopicModuleContainer.parentNode.appendChild(n), e.build({
                        fps: 60,
                        duration: 300,
                        render: function(o) {
                            o = 1 - o, util.setOpacity(n, o)
                        },
                        finish: function() {
                            n.parentNode.removeChild(n)
                        }
                    }), panoTopicModuleContainer.innerHTML = a
                }
            }
        });
    module.exports = PanoTopicModule
});;
define("pano:widget/module/PanoGuideModule/PanoGuideModule.js", function(e, t, n) {
    var i = e("common:widget/ui/Animation/Animation.js"),
        a = e("pano:widget/module/PanoGuideModule/AlbumModule/AlbumModule.js"),
        o = e("pano:widget/module/PanoGuideModule/TimelineModule/TimelineModule.js"),
        d = e("pano:widget/module/PanoGuideModule/TimethroughModule/TimethroughModule.js"),
        l = e("pano:widget/module/PanoGuideModule/TopicModule/TopicModule.js"),
        u = e("pano:widget/base/ModuleClass.js"),
        s = e("pano:widget/base/service.js"),
        p = e("pano:widget/base/util.js"),
        r = 300,
        c = null,
        h = null,
        m = null,
        g = u.extend("PanoGuideModule", {
            constructor: function() {
                this.container = null, this._data = null, this._display = !1, this._maxWidth = document.body.clientWidth, this._displayStatus = {
                    timeline: !1,
                    album: !1,
                    topic: !1
                }
            },
            initialize: function(e, t) {
                var n = this;
                n._opts = t;
                var i = this.container = document.createElement("div");
                this.container.style.height = "130px", e && e.appendChild(i);
                var u = this.timeLineWapper = document.createElement("div");
                u.className = "pano-func-item", u.style.zIndex = "2", i.appendChild(u), h = new o, h.initialize(u), h.addEventListener("pano_changed", function(e) {
                    n.dispatchEvent("pano_changed", {
                        data: e.data
                    })
                });
                var r = this.topicWapper = document.createElement("div");
                r.className = "pano-func-item", r.style.zIndex = "2", i.appendChild(r), m = new l, m.initialize(r);
                var g = this.timeThroughWapper = document.createElement("div");
                g.className = "pano-func-item", g.style.zIndex = "2", g.style.width = "200px", g.innerHTML = "timeline", i.appendChild(g);
                var f = this.timethroughModule = new d;
                f.initialize(g), f.addEventListener("pano_changed", function(e) {
                    n.dispatchEvent("pano_changed", {
                        data: e.data
                    })
                });
                var v = this.albumWapper = document.createElement("div");
                v.className = "pano-func-item", v.style.zIndex = "1", v.id = "pano-func-item", i.appendChild(v), c = new a, c.initialize(v, t.albumImageDomain, {
                    zIndex: t.zIndex,
                    indoorModel: t.indoorModel,
                    indoorData: t.indoorData
                });
                var _ = function(e, t) {
                    n.dispatchEvent(e.type, t)
                };
                p.each(["animate_pano_changed", "pano_changed", "inter_poi_changed", "floor_changed", "show_position", "hide_position", "photo_tour_enter", "video_enter"], function(e) {
                    c.addEventListener(e, _)
                });
                var y = t.data.panoId,
                    M = t.data.panoType;
                y && s.getGuideData(y, function(e) {
                    n.render(e, M, !0, y, null, t.timeThroughData, t.timelineData)
                })
            },
            getContainer: function() {
                return this.container
            },
            isAsync: function() {
                return !0
            },
            render: function(e, t, n, i, a, o, d) {
                var l = T.isArray(e.content) && e.content.length > 0,
                    u = T.isArray(d) && d.length > 0,
                    s = l ? e.content : null,
                    r = u ? d : null;
                if ("street" === t) {
                    var g = {
                        photoUrl: "//webmap1.bdimg.com/wolfman/static/pano/images/pano_whole/upload_pano2_ec5e5a3.png",
                        name: "",
                        type: 9
                    };
                    s ? s.push(g) : s = [g]
                }
                if (n && s)
                    if ("inter" === t)
                        if (e.catalogData) {
                            var f;
                            e.catalogData && (f = e.catalogData.exit[0]);
                            var v = [],
                                _ = null;
                            for (var y in e.catalogData) {
                                if (null !== _) break;
                                p.each(e.catalogData[y], function(e) {
                                    return i === e.data.panoId ? (_ = y, !0) : void 0
                                })
                            }
                            v = v.concat(e.catalogData[_]), c.update(v, f)
                        } else {
                            var f, M = void 0 !== a ? a + 1 : void 0,
                                v = p.each(s, function(e) {
                                    return 2 === e.type && (e.data.type = 21, e.type = 21), 3 === e.type || 1 === e.type || 5 === e.type || 6 === e.type || 21 === e.type || 11 === e.type ? (e.data.panoId === i && (M = e.data.floor), e) : void 0
                                }, !0);
                            void 0 !== M && (v = p.each(v, function(e) {
                                return 3 === e.type || 21 === e.type || 6 === e.type || e.data.floor === M || 0 === e.data.floor || 11 === e.type ? e : void 0
                            }, !0)), 3 === v[0].type && (f = v.splice(0, 1)[0]), c.update(v, f)
                        }
                else c.update(s);
                h.update(r);
                var x = o && o.length > 1;
                x ? this.timethroughModule.update(o) : this.timethroughModule.empty();
                var w = e.topicData && e.topicData.length > 0;
                w ? m.update(e.topicData) : m.empty(), this._displayStatus.timeline && !r || !this._displayStatus.timeline && !r, this._displayStatus.album = !!s, this._displayStatus.timeline = !!r, this._displayStatus.topic = !!w, this._displayStatus.timeThrough = x, this._display = !!(s || r || w), this.dispatchEvent("layout_changed", {
                    display: this._display
                }), this.ready()
            },
            event_indoorEnter: function(e) {
                c.event_indoorEnter(e)
            },
            resize: function(e) {
                var t = this._maxWidth,
                    n = this._displayStatus,
                    a = this.albumWapper,
                    o = this.timeLineWapper,
                    d = this.topicWapper,
                    l = this.timeThroughWapper,
                    u = parseInt(a.style.left || 0),
                    s = document.body.clientWidth - t,
                    p = s,
                    h = 0,
                    m = 0;
                n.timeline && (m = o.clientWidth, o.style.left = s + "px", p += m, h += m), n.topic && (m = d.clientWidth, d.style.left = s + h + "px", p += m, h += m), n.timeThrough && (m = l.clientWidth, l.style.left = s + h + "px", p += m, h += m), c.event_layoutChanged(t - h);
                var g = p - u;
                if (!e && Math.abs(g) > 10) {
                    c.ignoreMouseEvent(!0);
                    var f = new i.Animation;
                    f.build({
                        fps: 60,
                        transition: i.Transitions.easeOutQuad,
                        duration: Math.abs(g) / r * 1e3,
                        render: function(e) {
                            a.style.left = u + e * g + "px"
                        },
                        finish: function() {
                            a.style.left = p + "px", c.setSelectIndex(c.getSelectIndex()), c.ignoreMouseEvent(!1)
                        }
                    })
                } else a.style.left = p + "px", c.ignoreMouseEvent(!1)
            },
            getSelectAlbumItem: function() {
                return c ? c.getSelectItem() : null
            },
            update: function(e, t, n, i, a, o, d) {
                if (this.container.parentNode) {
                    var l = this,
                        u = a === this.getName(),
                        r = !0;
                    u && "inter" !== n && "street" === i && (r = !1);
                    var h = "inter" === i;
                    s.getGuideData(e, function(n) {
                        l.render(n, i, r, e, t, o, d), h ? n && n.content.length > 0 && p.each(n.content, function(t) {
                            t.data.panoId == e && c.setSelectPano(e + "_" + t.data.uid)
                        }) : u || (c.unselect(), c.scrollTo(0))
                    })
                }
            },
            event_layoutChanged: function(e, t) {
                e && (this._maxWidth = e, this.resize(t))
            },
            event_floorChanged: function(e) {
                c.event_floorChanged(e)
            },
            updateCatalog: function(e) {
                c.updateCatalog(e)
            },
            event_exitIndoor: function(e) {
                c.event_exitIndoor(e)
            },
            dispose: function() {
                c.dispose(), c = null, h.dispose(), h = null, m.dispose(), m = null
            },
            getSupportEvents: function() {
                return ["animate_pano_changed", "pano_changed", "inter_poi_changed", "layout_changed", "floor_changed", "show_position", "hide_position", "photo_tour_enter", "video_enter"]
            }
        });
    n.exports = g
});;
define("pano:widget/module/PanoLayoutManager/PanoLayoutManager.js", function(require, exports, module) {
    var util = require("pano:widget/base/util.js"),
        ModuleClass = require("pano:widget/base/ModuleClass.js"),
        Animation = require("common:widget/ui/Animation/Animation.js"),
        LAYER_TEMPLATE = [function(_template_object) {
            var _template_fun_array = [],
                fn = function(__data__) {
                    var _template_varName = "";
                    for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                    eval(_template_varName), _template_fun_array.push('<div id="pano-container">    <div id="pano-photo-wrapper"></div>    <div id="pano-flash-wrapper"></div>    <div id="pano-expand-wrapper">        <div id="pano-ui-layer" class="pano-ui-layer"></div>        <ul id="pano-header">            <li id="pano-indoor—poi-wrapper"></li>            <li style="width: 50px;height: 50px;display: inline-block;"></li>        </ul>        <ul id="pano-sidebar">            <li id="pano-fold-btn" class="pano_fold_forbid">                                <span class="pano_button" title="折叠功能区"><span></span></span>            </li>                    </ul>        <div id="pano-overview-wrapper"></div>        <div id="pano-footer">                        <div id="pano-logo"></div>                        <ul id="pano-funcarea"  isinit=\'1\' class="clearfix pano_funcarea_hide"></ul>                        <div id="pano-tips"></div>                        <div id="pano-fold-msk" class="transparent-msk"></div>        </div>    </div>    <div id="pano-msg"></div></div>'), _template_varName = null
                }(_template_object);
            return fn = null, _template_fun_array.join("")
        }][0],
        PANO_OVERVIEW_BOTTOM_EXP = 20,
        PANO_OVERVIEW_BOTTOM_FOLD = 10,
        COPYRIGHT_HEIGHT = 20;
    require.loadCss({
        content: "#pano-container{position:absolute;overflow:hidden;top:0;left:0;width:100%;height:100%;background-color:#eee;z-index:100001;visibility:hidden;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-user-drag:none;-moz-user-drag:none;-ms-user-drag:none;user-drag:none}#pano-photo-wrapper{position:absolute;width:100%;height:100%;z-index:1;background-color:#000}#pano-flash-wrapper{position:absolute;overflow:hidden;top:0;right:0;width:100%;height:100%;background-color:#fff;z-index:100001;cursor:default}#pano-msg{width:100%;display:none;height:100%;position:absolute;top:0;left:0;z-index:200000;_background:url(/wolfman/static/pano/images/transparent_3254726.gif)}#pano-header{position:absolute;top:20px;left:97px;z-index:100010}#pano-header li{float:left;display:inline-block}#pano-sidebar{position:absolute;right:12px;width:40px;z-index:100010;line-height:0;bottom:20px;border-radius:2px 2px 0 0}.pano_unfold_func{font-size:0}#pano-footer{position:absolute;width:100%;bottom:0;z-index:100005}#pano-footer .pano-func-item{position:absolute;padding-top:10px;height:110px}#pano-logo{position:absolute;right:60px;width:107px;height:25px;background:url(//webmap0.bdimg.com/wolfman/static/pano/images/pano-logo_7969e0c.png) no-repeat;background-size:100%}#pano-funcarea{padding-left:0;width:100%;height:120px;font-size:0;position:absolute}.transparent-msk{position:absolute;width:100%;z-index:-999;background-color:#252525;opacity:.9;filter:alpha(opacity=90)}#pano-footer .transparent-msk{left:0;height:140px}.pano_unfold_func{font-size:12px}.pano_funcarea_hide{}#pano-tips{display:inline-block;right:0;text-align:right;overflow:hidden;line-height:20px;font-size:12px;color:#797979;position:absolute;bottom:0;z-index:100009}#pano-tips span{font-size:12px}#pano-overview-wrapper{position:absolute;left:10px;bottom:20px;width:300px;height:106px;z-index:100010;visibility:hidden;border:2px solid #3D4145}#pano-overview-holder{width:300px;margin-right:10px}.pano-ui-layer{width:0;height:0;position:absolute;left:0;top:0;z-index:100011}#pano-floor-wrapper{position:static;float:left;height:110px;visibility:hidden;overflow:visible}"
    });
    var layeroutResizeTimer = null,
        isUserHideAlbum = !1,
        PanoLayoutManager = ModuleClass.extend("PanoLayoutManager", {
            constructor: function() {},
            initialize: function(e, o) {
                this._moduleHash = e, this._funcAreaModulesStateHash = {}, this._container = o, this._panoContainer = null, this.render(o), this._addLayoutEventListeners()
            },
            render: function(e) {
                var o = LAYER_TEMPLATE();
                this._panoContainer = T(o)[0], T(e).append(this._panoContainer)
            },
            getModuleContainer: function(e) {
                switch (e) {
                    case "PanoRoot":
                        return T.g("pano-container");
                    case "PanoModule":
                        return T.g("pano-flash-wrapper");
                    case "PanoOverviewModule":
                        return T.g("pano-overview-wrapper");
                    case "PanoGuideModule":
                        return T.g("pano-funcarea");
                    case "PanoIndoorPoiModule":
                        return T.g("pano-indoor—poi-wrapper");
                    case "PanoToolModule":
                        return T.g("pano-sidebar");
                    case "PanoActivity":
                        return T.g("activitypic");
                    case "PanoCopyrightModule":
                        return T.g("pano-tips");
                    case "PanoMessageBoxModule":
                        return T.g("pano-msg");
                    case "ui-layer":
                        return T.g("pano-ui-layer");
                    case "TrafficModule":
                        return T.g("pano-funcarea");
                    default:
                        return null
                }
            },
            resetFuncAreaModule: function(e) {
                if (!this.funcAreaModule || e.getName() !== this.funcAreaModule.getName()) {
                    for (var o = T.g("pano-funcarea"); o.lastChild;) o.removeChild(o.lastChild);
                    if (e && e.getContainer) {
                        this.funcAreaModule = e;
                        var a = e.getContainer();
                        return void o.appendChild(a)
                    }
                }
            },
            restoreFuncAreaDoms: function(e) {
                var o = T.g("pano-funcarea");
                util.each(e, function(e) {
                    o.appendChild(e)
                })
            },
            _addLayoutEventListeners: function() {
                var e = this;
                T.on(T.g("pano-fold-btn"), "click", function() {
                    if (addStat(STAT_CODE.STAT_PANORAMA, {
                            item: "funcarea-fold-click"
                        }), !T("#pano-fold-btn").hasClass("pano_fold_forbid")) {
                        var o = T("#pano-funcarea"),
                            a = o.hasClass("pano_funcarea_hide");
                        isUserHideAlbum = a ? !1 : !0, e._toggleFoldArea()
                    }
                }), T.on(T.g("pano-footer"), "mousedown", function(e) {
                    e.preventDefault()
                }), e._windowResizeHandler = function() {
                    if (!document.webkitIsFullScreen && !document.msFullscreenElement) {
                        var e = T.g("pano-container"),
                            o = document.body.scrollWidth,
                            a = document.body.scrollHeight;
                        e.style.width = 960 > o ? "960px" : o + "px", e.style.height = 480 > a ? "480px" : a + "px"
                    }
                }, T.on(window, "onresize", e._windowResizeHandler)
            },
            show: function(e) {
                this._toggleFoldArea(!0, e)
            },
            hide: function(e) {
                this._toggleFoldArea(!1, e)
            },
            _toggleFoldArea: function(e, o) {
                var a = T("#pano-fold-btn .pano_button"),
                    i = T("#pano-logo"),
                    n = T("#pano-funcarea"),
                    t = T("#pano-floor-wrapper"),
                    r = T("#pano-sidebar"),
                    s = T("#activitypic"),
                    l = T("#pano-cprt-msk"),
                    d = T("#pano-fold-msk"),
                    p = T("#pano-overview-wrapper"),
                    u = n.hasClass("pano_funcarea_hide");
                if (e === !0 && !u || e === !1 && u) return void(t.length > 0 && (util.setOpacity(t[0], 1), t.css("visibility", "visible")));
                var c = new Animation.Animation,
                    f = {
                        duration: 400,
                        fps: 40,
                        delay: Animation.Animation.INFINITE,
                        transition: Animation.Transitions.easeOutQuad,
                        finish: function() {},
                        render: function() {}
                    },
                    h = (T("#pano-footer"), parseInt(n.css("height"))),
                    _ = n.children(),
                    v = PANO_OVERVIEW_BOTTOM_EXP - PANO_OVERVIEW_BOTTOM_FOLD;
                util.each(_, function(e) {
                    "pano-floor-wrapper" != e.id && util.setOpacity(e, 0)
                });
                var g, m;
                e === !0 || void 0 === e && u ? (n.removeClass("pano_funcarea_hide"), r.addClass("pano_unfold_sidebar"), a.attr("title", "折叠功能区"), g = h, d.css("visibility", "visible"), f.render = function(e) {
                    r.css("bottom", COPYRIGHT_HEIGHT + e * g + "px"), i.css("bottom", COPYRIGHT_HEIGHT + e * (g + 10) + "px"), s.css("bottom", COPYRIGHT_HEIGHT + e * g + "px"), n.css("bottom", COPYRIGHT_HEIGHT + (e - 1) * g + "px"), d.css("bottom", COPYRIGHT_HEIGHT + (e - 1) * g - 20 + "px"), l.css({
                        opacity: 1 - e - .1,
                        filter: "alpha(opacity=0)"
                    }), o || p.css("bottom", PANO_OVERVIEW_BOTTOM_FOLD + e * v + "px"), util.each(_, function(o) {
                        util.setOpacity(o, e)
                    })
                }, f.finish = function() {
                    d.css("visibility", "visible")
                }, t && t.css("visibility", "visible"), this._moduleHash.PanoOverviewModule) : (n.addClass("pano_funcarea_hide"), r.removeClass("pano_unfold_sidebar"), a.attr("title", "展开功能区"), m = h + COPYRIGHT_HEIGHT, g = m - COPYRIGHT_HEIGHT, f.render = function(e) {
                    r.css("bottom", m - e * g + "px"), s.css("bottom", m - e * g + "px"), i.css("bottom", g + 10 + COPYRIGHT_HEIGHT - e * g + "px"), n.css("bottom", -e * h + "px"), d.css("bottom", -e * h + "px"), l.css({
                        opacity: e - .1,
                        filter: "alpha(opacity=90)"
                    }), o || p.css("bottom", PANO_OVERVIEW_BOTTOM_EXP - e * v + "px"), util.each(_, function(o) {
                        "pano-floor-wrapper" !== o.id && util.setOpacity(o, 1 - e)
                    })
                }, f.finish = function() {
                    d.css("visibility", "hidden"), t && t.css("visibility", "hidden"), util.each(_, function(e) {
                        util.setOpacity(e, 1)
                    })
                }, this._moduleHash.PanoOverviewModule), c.build(f), c.start()
            },
            _updateLayout: function(e, o) {
                var a = !o;
                a ? (T("#pano-fold-btn").addClass("pano_fold_forbid"), T("#pano-sidebar").removeClass("pano_unfold_sidebar"), T("#pano-sidebar").css("bottom", "20px")) : (T("#pano-fold-btn").removeClass("pano_fold_forbid"), o && !isUserHideAlbum && o && this._toggleFoldArea(!0), T("#pano-funcarea").hasClass("pano_funcarea_hide") || (T("#pano-sidebar").css("bottom", "140px"), T("#pano-sidebar").addClass("pano_unfold_sidebar"))), isUserHideAlbum ? T("#pano-overview-wrapper").css("bottom", PANO_OVERVIEW_BOTTOM_FOLD + "px") : T("#pano-overview-wrapper").css("bottom", PANO_OVERVIEW_BOTTOM_EXP + "px")
            },
            event_layoutChanged: function(e, o) {
                layeroutResizeTimer && clearTimeout(layeroutResizeTimer);
                var a = this;
                this._funcAreaModulesStateHash[e + "_changed"] = this._funcAreaModulesStateHash[e] != o, this._funcAreaModulesStateHash[e] = o, layeroutResizeTimer = setTimeout(function() {
                    {
                        var e = a._funcAreaModulesStateHash,
                            o = T("#pano-funcarea"),
                            i = a.funcAreaModule || a._moduleHash.PanoGuideModule,
                            n = e.PanoOverviewModule,
                            t = e.PanoGuideModule || e.TrafficModule,
                            r = e.PanoGuideModule_changed || e.TrafficModule_changed;
                        e.TrafficModule_changed
                    }
                    if (n && t) {
                        if (o.addClass("pano_has_overview"), document.getElementById("pano-overview-wrapper")) var s = document.getElementById("pano-overview-wrapper").clientWidth + 5;
                        i && i.event_layoutChanged(document.body.clientWidth - Math.max(315, s), e.PanoGuideModule_changed), !isUserHideAlbum && r && a._toggleFoldArea(!0, !0)
                    } else n && !t ? (o.removeClass("pano_has_overview"), a._toggleFoldArea(!1, !0)) : !n && t ? (i && i.event_layoutChanged(document.body.clientWidth, e.PanoGuideModule_changed), a._toggleFoldArea(!0), isUserHideAlbum = !1) : n || t || (o.removeClass("pano_has_overview"), a._toggleFoldArea(!1));
                    a._updateLayout(n, t)
                }, 50)
            },
            event_layoutToggle: function(e, o) {
                var a = this,
                    i = o ? "block" : "none";
                if ("TrafficModule" == e) {
                    var n = a.getModuleContainer(e);
                    n && (n.style.display = i), T.g("pano-ui-layer").style.display = i
                } else {
                    var n = a.getModuleContainer(e);
                    n && (n.style.display = i)
                }
            },
            dispose: function() {
                layeroutResizeTimer && clearTimeout(layeroutResizeTimer), this._container.removeChild(this._panoContainer), T.un(window, "onresize", this._windowResizeHandler)
            }
        });
    module.exports = PanoLayoutManager
});;
define("pano:widget/module/PanoCopyrightModule/PanoCopyrightModule.js", function(require, exports, module) {
    var ModuleClass = require("pano:widget/base/ModuleClass.js"),
        service = require("pano:widget/base/service.js");
    require.loadCss({
        content: "#pano-copyright{margin-right:30px;font-weight:900}#pano-copyright span{margin-left:7px}#pano-copyright .indoor_biz_link_copyright{color:#3af;margin-left:4px}#pano-copyright a{text-decoration:none;color:#797979}#pano-copyright a:hover{color:#3af}#pano-tips .transparent-msk{top:0;left:0;height:20px;opacity:0;filter:alpha(opacity=0)}"
    });
    var COPYRIGHT_TPL = [function(_template_object) {
            var _template_fun_array = [],
                fn = function(__data__) {
                    var _template_varName = "";
                    for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                    eval(_template_varName), _template_fun_array.push('<div id="pano-copyright">    '), panoData.businessData && panoData.businessData.copyrightLink.length > 0 ? _template_fun_array.push('        <a href="', "undefined" == typeof panoData.businessData.copyrightLink ? "" : panoData.businessData.copyrightLink, '" target="_blank" class="indoor_biz_link_copyright">', "undefined" == typeof panoData.panoCopyright.roadName ? "" : panoData.panoCopyright.roadName, "</a>    ") : _template_fun_array.push("    <span>", "undefined" == typeof panoData.panoCopyright.roadName ? "" : panoData.panoCopyright.roadName, "</span>    "), _template_fun_array.push('    <span>|</span>    <span><a target="_blank" id="pano-feedback" href="//map.baidu.com/pano/feedback/index.html?panoid=', "undefined" == typeof panoData.panoId ? "" : panoData.panoId, "&pitch=", "undefined" == typeof panoData.panoPitch ? "" : panoData.panoPitch, "&roll=", "undefined" == typeof panoData.panoHeading ? "" : panoData.panoHeading, '" style="display:inline;">问题反馈</a></span>    <span>|</span>    '), panoData.panoCopyright.provider && panoData.panoCopyright.provider.name && (_template_fun_array.push("        <span>Data ©</span>        "), panoData.panoCopyright.provider.url ? _template_fun_array.push('        <span><a target="_blank" href="', "undefined" == typeof panoData.panoCopyright.provider.url ? "" : panoData.panoCopyright.provider.url, '" style="display:inline;">', "undefined" == typeof panoData.panoCopyright.provider.name ? "" : panoData.panoCopyright.provider.name, "</a></span>        ") : _template_fun_array.push("        <span>", "undefined" == typeof panoData.panoCopyright.provider.name ? "" : panoData.panoCopyright.provider.name, "</span>        "), _template_fun_array.push("    ")), _template_fun_array.push('    <span class="upload-pano"><a id="pano-upload-link" class="upload" target="_blank" href="//pai.baidu.com/?qt=viewapp">上传全景图片</a></span>    <span>|</span>    <span>', "undefined" == typeof panoData.panoCopyright.admission ? "" : panoData.panoCopyright.admission, '</span>            </div><div id="pano-cprt-msk" class="transparent-msk"></div>'), _template_varName = null
                }(_template_object);
            return fn = null, _template_fun_array.join("")
        }][0],
        PanoCopyrightModule = ModuleClass.extend("PanoCopyrightModule", {
            constructor: function() {},
            initialize: function() {
                var a = service.getCopyRightData();
                this._copyRightDataDeferred = a, this.roadName = ""
            },
            render: function(a, n) {
                this.roadName = n.panoCopyright.roadName, this.container = a;
                var o, e = n.uid || n.indoorModel && n.indoorModel._basicData.uid;
                o = "inter" === n.panoType && e ? this.businessData = service.getIndoorPoiInfoByUid(e) : baidu.Deferred().resolve();
                var t = this;
                baidu.when(this._copyRightDataDeferred, o).then(function(o, e) {
                    var p = n.panoCopyright.dataProviderIndex,
                        i = t.getProviderFromIndex(p, o);
                    !T.trim(i.name) && n.panoCopyright.username && n.panoCopyright.userid && (i.url = "//pai.baidu.com/?qt=lensman&uid=" + n.panoCopyright.userid + "&type=lensman"), n.panoCopyright.provider = {
                        name: T.trim(i.name + n.panoCopyright.username),
                        url: T.trim(i.url)
                    }, 11 == p && (n.panoCopyright.admission = ""), e && e.content && e.content.businessData && (n.businessData = {
                        copyrightLink: e.content.businessData.copyrightLink
                    });
                    var r = COPYRIGHT_TPL({
                        panoData: n
                    });
                    a.innerHTML = r, T("#pano-funcarea").hasClass("pano_funcarea_hide") && T("#pano-cprt-msk").css("opacity", "0.9"), T.on(T.g("pano-feedback"), "click", function() {
                        addStat(STAT_CODE.STAT_PANORAMA, {
                            item: "pano-feedback-click"
                        }), MapLogReport.send({
                            da_src: "pcmapPanoPG.feedback.click"
                        })
                    }), T.on(T(".indoor_biz_link_copyright")[0], "click", function() {
                        addStat(STAT_CODE.STAT_PANORAMA, {
                            item: "indoor_info_biz_link_click"
                        })
                    }), T.on(T.g("pano-upload-link"), "click", function() {
                        addStat(STAT_CODE.STAT_PANORAMA, {
                            item: "pano-ugc-entrance-click-copyright"
                        }), MapLogReport.send({
                            da_src: "pcmapPanoPG.Upload.click"
                        })
                    })
                })
            },
            getProviderFromIndex: function(a, n) {
                for (var o = n.length - 1; o >= 0; o--)
                    if (n[o].id == a) return n[o];
                return {
                    name: "",
                    url: "",
                    id: ""
                }
            },
            show: function() {
                this.container.style.display = ""
            },
            hide: function() {
                this.container.style.display = "none"
            },
            getCurrentRoad: function() {
                return this.roadName
            }
        });
    module.exports = PanoCopyrightModule
});;
define("pano:widget/module/ClassifySearchModule/ClassifySearchModule.js", function(require, exports, module) {
    var ModuleClass = require("pano:widget/base/ModuleClass.js"),
        Animation = require("common:widget/ui/Animation/Animation.js"),
        service = require("pano:widget/base/service.js"),
        util = require("pano:widget/base/util.js");
    require.loadCss({
        content: "#pano-classify-wrapper{position:absolute;right:45px;top:0;height:40px;width:176px;overflow:hidden;z-index:100010}.pano-classify-panel{position:relative;left:176px;height:40px;width:176px;color:#fff;font-size:12px;*background-color:#252525;_background-color:#252525;border-radius:2px;font-size:12px;background-position:0 -3px}#pano-classify-wrapper .transparent-msk{left:0;top:0;height:40px;border-radius:2px;background-color:#252525;opacity:.9;filter:alpha(opacity=90)}.classify_splite_line{display:inline-block;height:18px;width:1px;font-size:1px;line-height:1px;vertical-align:top;margin-top:12px;margin-left:7px;background-color:#3c3e42;_background-color:#3c3e42;background-color:#222\\9}.pano-classify-panel li{float:left;display:inline-block;height:34px;width:35px}.pano-classify-panel li a{display:inline-block;width:48px;height:40px}.pano-classify-panel li a{display:inline-block;margin-top:7px;height:26px;width:27px;overflow:hidden;background-image:url(//webmap1.bdimg.com/wolfman/static/pano/images/pano_whole/classification_search_icons2_a150f2f.png);background-repeat:no-repeat}.pano_classify_hotel{background-position:3px -1px}.pano_classify_hotel:hover{background-position:3px -26px}.pano_classify_select .pano_classify_hotel,.pano_classify_select .pano_classify_hotel:hover{background-position:3px -100px}.pano_classify_restaurant{background-position:-49px -2px}.pano_classify_restaurant:hover{background-position:-49px -27px}.pano_classify_select .pano_classify_restaurant,.pano_classify_select .pano_classify_restaurant:hover{background-position:-49px -101px}.pano_classify_movie{background-position:-155px -51px}.pano_classify_movie:hover{background-position:-155px -24px}.pano_classify_select .pano_classify_movie,.pano_classify_select .pano_classify_station:hover{background-position:-162px -97px}.pano_classify_station{background-position:-24px -1px}.pano_classify_station:hover{background-position:-24px -26px}.pano_classify_select .pano_classify_station,.pano_classify_select .pano_classify_station:hover{background-position:-24px -100px}.pano_classify_indoor{background-position:-75px -1px}.pano_classify_indoor:hover{background-position:-75px -26px}.pano_classify_select .pano_classify_indoor,.pano_classify_select .pano_classify_indoor:hover{background-position:-75px -100px}.pano-classify-panel li:last-child a{border-radius:0 4px 4px 0}.pano-classify-panel li:first-child a{border-radius:4px 0 0 4px}"
    });
    var getClassifySearchWrapper = function() {
            var classifySearchTmpl = [function(_template_object) {
                var _template_fun_array = [],
                    fn = function(__data__) {
                        var _template_varName = "";
                        for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                        eval(_template_varName), _template_fun_array.push('<div id="pano-classify-wrapper"><ul class="clearfix pano-classify-panel"><li data-index="1"><a href="javascript:void(0);" title="检索周边酒店" class="pano_classify_hotel"></a><span class="classify_splite_line"></span></li><li data-index="2"><a href="javascript:void(0);" title="检索周边餐饮" class="pano_classify_restaurant"></a><span class="classify_splite_line"></span></li><li data-index="3"><a href="javascript:void(0);" title="检索周边电影院" class="pano_classify_movie"></a><span class="classify_splite_line"></span></li><li data-index="4"><a href="javascript:void(0);" title="检索周边公交站" class="pano_classify_station"></a><span class="classify_splite_line"></span></li><li data-index="5"><a href="javascript:void(0);" title="检索周边内景" class="pano_classify_indoor"></a></li><div class="transparent-msk"></div></ul></div>'), _template_varName = null
                    }(_template_object);
                return fn = null, _template_fun_array.join("")
            }][0];
            return function() {
                var a = classifySearchTmpl({});
                return T(a)[0]
            }
        }(),
        classifySearchWrapper = null,
        classifySearchContainer = null,
        selectedClassifySearchType = void 0,
        classifySearchBtn = null,
        classifySearchBtnVisible = !1,
        panoContext = null,
        _classifySearchPanelVisible = !1,
        _displayAnimate = function() {
            var a = 40,
                e = 400,
                s = Animation.Transitions["ease-out"],
                i = new Animation.Animation,
                n = 174,
                l = 0,
                o = "left";
            return function(r, t) {
                var c = T(classifySearchWrapper).find(".pano-classify-panel")[0];
                if (void 0 === t) _classifySearchPanelVisible = !_classifySearchPanelVisible;
                else {
                    if (_classifySearchPanelVisible === t) return;
                    _classifySearchPanelVisible = t
                }
                _classifySearchPanelVisible && (classifySearchWrapper.style.display = "block");
                var p = _classifySearchPanelVisible ? n : l,
                    f = _classifySearchPanelVisible ? l : n;
                i.build({
                    fps: a,
                    transition: s,
                    duration: e,
                    render: function(a) {
                        c.style[o] = p + (f - p) * a + "px"
                    },
                    finish: function() {
                        r(), !_classifySearchPanelVisible && (classifySearchWrapper.style.display = "none")
                    }
                })
            }
        }(),
        ClassifySearchModule = ModuleClass.extend("ClassifySearchModule", {
            initialize: function(a, e, s) {
                classifySearchBtnVisible = !0, classifySearchContainer = a, panoContext = s, classifySearchWrapper = getClassifySearchWrapper(), classifySearchContainer.appendChild(classifySearchWrapper), classifySearchBtn = e, this.open(), this.bindFoldExpandEvent(), this.bindEvents()
            },
            bindFoldExpandEvent: function() {
                var a = this,
                    e = null,
                    s = 800,
                    i = function() {
                        e && clearTimeout(e), a.open()
                    },
                    n = function() {
                        e && clearTimeout(e), e = setTimeout(function() {
                            a.close()
                        }, s)
                    };
                T.on(classifySearchWrapper, "mouseenter", i), T.on(classifySearchWrapper, "mouseleave", n), T.on(classifySearchBtn, "mouseenter", i), T.on(classifySearchBtn, "mouseleave", n)
            },
            toggle: function(a) {
                _displayAnimate(function() {}, a)
            },
            open: function() {
                this.toggle(!0), MapLogReport.send({
                    da_src: "pcmapPanoPG.nearbySearch.show"
                })
            },
            close: function() {
                this.toggle(!1)
            },
            bindEvents: function() {
                var a = this;
                T(classifySearchWrapper).on("click", function(e) {
                    for (var s = e.target;
                        "LI" !== s.nodeName && s !== classifySearchWrapper;) s = s.parentNode;
                    if ("LI" === s.nodeName) {
                        var i = s.getAttribute("data-index");
                        i !== selectedClassifySearchType ? (T(classifySearchWrapper).find(".pano_classify_select").attr("class", ""), T(s).attr("class", "pano_classify_select")) : (T(classifySearchWrapper).find(".pano_classify_select").attr("class", ""), i = void 0), selectedClassifySearchType = i, a._updateClassifySearchMarkers(selectedClassifySearchType), T(classifySearchBtn).attr("class", "classify_icon_" + selectedClassifySearchType), addStat(STAT_CODE.STAT_PANORAMA, {
                            item: "classifysearchpanel-click"
                        }), MapLogReport.send({
                            da_src: "pcmapPanoPG.nearbySearch.click",
                            searchType: selectedClassifySearchType
                        })
                    }
                    baidu.event.preventDefault(e)
                })
            },
            updateClassifySearch: function() {
                void 0 !== selectedClassifySearchType && this._updateClassifySearchMarkers(selectedClassifySearchType)
            },
            _updateClassifySearchMarkers: function(a) {
                this._removeClassifySearchMarkers();
                var e = panoContext.getPanoOptions(),
                    s = this;
                void 0 !== a && e && service.getClassifySearchData(e.panoMCPoint.x, e.panoMCPoint.y, a, function(a) {
                    return function(e) {
                        var i = panoContext.getPanoOptions();
                        i.panoId === a && e && e.length > 0 && s._addClassifySearchMarkers(e.slice(0, 10))
                    }
                }(e.panoId))
            },
            _addClassifySearchMarkers: function(a) {
                var e = this;
                e._markerIds = [], util.each(a, function(a) {
                    a.markerId = util.getUniqueId("MARKER_"), e._markerIds.push(a.markerId)
                }), this.dispatchEvent("add_markers", a)
            },
            _removeClassifySearchMarkers: function() {
                this._markerIds && this._markerIds.length && (this.dispatchEvent("remove_markers", this._markerIds), this._markerIds = null)
            },
            dispose: function() {
                classifySearchContainer.removeChild(classifySearchWrapper), classifySearchWrapper = null, classifySearchContainer = null, selectedClassifySearchType = void 0, classifySearchBtn = null, classifySearchBtnVisible = !1, T.un(document.body, "mousedown", window.pano_classify_global_click_handler), window.pano_classify_global_click_handler = null
            },
            getSupportEvents: function() {
                return ["add_markers", "remove_markers"]
            }
        });
    module.exports = ClassifySearchModule
});;
define("pano:widget/module/PanoIndoorPoiModule/PanoIndoorPoiModule.js", function(require, exports, module) {
    var Animation = require("common:widget/ui/Animation/Animation.js"),
        ModuleClass = require("pano:widget/base/ModuleClass.js"),
        ScrollView = require("pano:widget/component/ScrollView/ScrollView.js"),
        ModalDialog = require("pano:widget/component/PanoModalDialogComponent/ModalDialogComponent.js"),
        util = require("pano:widget/base/util.js"),
        DELAY_FOLD_TIME = 200,
        travelPoiTemplate = [function(_template_object) {
            var _template_fun_array = [],
                fn = function(__data__) {
                    var _template_varName = "";
                    for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                    eval(_template_varName), _template_fun_array.push('<div class="pano_popup">    <div class="travel_base_content">        '), data.lvyou.scope_grade && _template_fun_array.push('            <p class="travel_grade">                ', "undefined" == typeof data.lvyou.scope_grade ? "" : data.lvyou.scope_grade, "景区            </p>        "), _template_fun_array.push("                "), data.lvyou.entrance_price && data.lvyou.shop_hours && (_template_fun_array.push('            <div class="travel_info_list clearfix">                '), data.lvyou.scope_type && _template_fun_array.push('                    <dl class="clearfix">                        <dt><i class="pano_poi_icon travel_type"></i></dt>                        <dd><span>景区类别：</span>', "undefined" == typeof data.lvyou.scope_type ? "" : data.lvyou.scope_type, "</dd>                    </dl>                "), _template_fun_array.push("                "), data.lvyou.entrance_price && _template_fun_array.push('                    <dl class="clearfix">                        <dt><i class="pano_poi_icon travel_entrance_price"></i></dt>                        <dd><span>门票价格：</span>', "undefined" == typeof data.lvyou.entrance_price ? "" : data.lvyou.entrance_price, "</dd>                    </dl>                "), _template_fun_array.push("                "), data.lvyou.shop_hours && _template_fun_array.push('                    <dl class="clearfix">                        <dt><i class="pano_poi_icon travel_shop_hours"></i></dt>                        <dd><span>开放时间：</span>', "undefined" == typeof data.lvyou.shop_hours ? "" : data.lvyou.shop_hours, "</dd>                    </dl>                "), _template_fun_array.push("                "), data.base.address && _template_fun_array.push('                    <dl class="clearfix">                        <dt><i class="pano_poi_icon travel_addr"></i></dt>                        <dd><span>地址：</span>', "undefined" == typeof data.base.address ? "" : data.base.address, "</dd>                    </dl>                "), _template_fun_array.push("                "), data.base.phone && _template_fun_array.push('                    <dl class="clearfix">                        <dt><i class="pano_poi_icon travel_phone"></i></dt>                        <dd><span>电话：</span>', "undefined" == typeof data.base.phone ? "" : data.base.phone, "</dd>                    </dl>                "), _template_fun_array.push("            </div>        ")), _template_fun_array.push("    </div>    "), data.lvyou.entrance_price && data.lvyou.shop_hours && (data.lvyou.sug_time || data.lvyou.best_time) && _template_fun_array.push('        <div class="travel_content_line"></div>    '), _template_fun_array.push("    "), (data.lvyou.sug_time || data.lvyou.best_time) && (_template_fun_array.push('        <div class="travel_more_content">            <div class="travel_info_list clearfix">                '), data.lvyou.sug_time && _template_fun_array.push('                    <dl class="clearfix">                        <dt><i class="pano_poi_icon travel_sub_time"></i></dt>                        <dd><span>建议游玩时间：</span>', "undefined" == typeof data.lvyou.sug_time ? "" : data.lvyou.sug_time, "</dd>                    </dl>                "), _template_fun_array.push("                "), data.lvyou.best_time && _template_fun_array.push('                    <dl class="clearfix">                        <dt><i class="pano_poi_icon travel_best_time"></i></dt>                        <dd><span>最佳旅游季节：</span>', "undefined" == typeof data.lvyou.best_time ? "" : data.lvyou.best_time, "</dd>                    </dl>                "), _template_fun_array.push("                "), data.lvyou.url && _template_fun_array.push('                    <p class="travel_more"><a href="', "undefined" == typeof data.lvyou.url ? "" : data.lvyou.url, '" title="前往百度旅游查看详细信息" target="_blank">更多&gt;&gt;</a></p>                '), _template_fun_array.push("            </div>        </div>    ")), _template_fun_array.push("</div>"), _template_varName = null
                }(_template_object);
            return fn = null, _template_fun_array.join("")
        }][0],
        indoorPoiTemplate = [function(_template_object) {
            var _template_fun_array = [],
                fn = function(__data__) {
                    var _template_varName = "";
                    for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                    if (eval(_template_varName), _template_fun_array.push('<div class="pano_popup">    '), data.businessData && data.businessData.titleLink.length > 0 && _template_fun_array.push('<div class="pano_poi_header clearfix"><p class="title"><span class="indoor_poi_icon_new indoor_poi_icon_website"></span><a href="', "undefined" == typeof data.businessData.titleLink ? "" : data.businessData.titleLink, '" class="indoor_business_link" target="_blank">官方网站</a></p></div>    '), _template_fun_array.push('<ul class="pano_poi_content clearfix">'), data.base.address && _template_fun_array.push('<li class="clearfix">                <span class="indoor_poi_icon_new indoor_poi_icon_addr"></span><span class="type_name">地址：</span><span class="type_cont">', "undefined" == typeof data.base.address ? "" : data.base.address, "</span></li>"), _template_fun_array.push(""), data.base.phone && _template_fun_array.push('<li class="clearfix last">                <span class="indoor_poi_icon_new indoor_poi_icon_phone"></span><span class="type_name">电话：</span><span class="type_cont">', "undefined" == typeof data.base.phone ? "" : data.base.phone, "</span></li>"), _template_fun_array.push("</ul>    "), data.film && data.film.book_list && 0 !== data.film.book_list.length && !data.businessData) {
                        _template_fun_array.push('<div class="content_line"></div><div class="pano_movie_info"><ul class="movie_book clearfix">');
                        for (var i = 0; i < data.film.book_list.length && 2 > i; i++) _template_fun_array.push('<li class="clearfix"><span class="span1" title="', "undefined" == typeof data.film.book_list[i].movie_name ? "" : data.film.book_list[i].movie_name, '">', "undefined" == typeof data.film.book_list[i].movie_name ? "" : data.film.book_list[i].movie_name, '</span><span class="span2 gray">', "undefined" == typeof data.film.book_list[i].movie_type ? "" : data.film.book_list[i].movie_type, '</span><span class="span3 blue">¥', "undefined" == typeof data.film.book_list[i].price ? "" : data.film.book_list[i].price, '起</span><span class="span3"><a href="', "undefined" == typeof data.film.book_list[i].book_url ? "" : data.film.book_list[i].book_url, '" class="movie_book_btn" target="_blank">在线订座</a></span></li>');
                        _template_fun_array.push('</ul><div class="clearfix"><a href="', "undefined" == typeof data.film.url_all ? "" : data.film.url_all, '" class="book_link" target="_blank">更多电影>></a></div></div>')
                    }
                    if (_template_fun_array.push(""), data.film && _template_fun_array.push('<div class="content_line"></div><a href="', "undefined" == typeof data.film.url_all ? "" : data.film.url_all, '" class="detail_link gray single-link" target="_blank">更多详情>></a>'), _template_fun_array.push(""), data.hotel && _template_fun_array.push('<div class="content_line"></div><a href="', "undefined" == typeof data.hotel.url_all ? "" : data.hotel.url_all, '" class="detail_link gray single-link" target="_blank">更多详情>></a>'), _template_fun_array.push(""), data.hotel && data.hotel.book_list && 0 !== data.hotel.book_list.length && !data.businessData) {
                        _template_fun_array.push('<div class="content_line"></div><div class="pano_hotel_info"><ul class="hotel_book clearfix">');
                        for (var j = 0; j < data.hotel.book_list.length && 2 > j; j++) _template_fun_array.push('<li class="clearfix"><span class="span1">', "undefined" == typeof data.hotel.book_list[j].desc ? "" : data.hotel.book_list[j].desc, '</span><span class="span2 orange">¥', "undefined" == typeof data.hotel.book_list[j].price ? "" : data.hotel.book_list[j].price, '起</span><span class="span3"><a href="', "undefined" == typeof data.hotel.book_list[j].book_url ? "" : data.hotel.book_list[j].book_url, '" class="hotel_book_btn" target="_blank">预订&gt;&gt;</a></span></li>');
                        _template_fun_array.push('</ul><div class="clearfix"><a class="book_link" href="', "undefined" == typeof data.hotel.url_all ? "" : data.hotel.url_all, '" target="_blank">更多房型和日期&gt;&gt;</a></div></div>')
                    } else if (data.businessData && data.businessData.btnLinks && data.businessData.btnLinks.length > 0) {
                        _template_fun_array.push('<div class="content_line"></div><ul class="indoor_commercial_info clearfix">');
                        for (var i = 0; i < data.businessData.btnLinks.length; i++) _template_fun_array.push(""), 0 == data.businessData.btnLinks[i].type ? _template_fun_array.push('<li class="indoor_com_btn" style="background-color:', "undefined" == typeof data.businessData.btnLinks[i].btnBgColor ? "" : data.businessData.btnLinks[i].btnBgColor, ';"><a href="', "undefined" == typeof data.businessData.btnLinks[i].btnUrl ? "" : data.businessData.btnLinks[i].btnUrl, '" style="color:', "undefined" == typeof data.businessData.btnLinks[i].textColor ? "" : data.businessData.btnLinks[i].textColor, ';" target="_blank">', "undefined" == typeof data.businessData.btnLinks[i].btnText ? "" : data.businessData.btnLinks[i].btnText, "</a></li>") : 1 == data.businessData.btnLinks[i].type && _template_fun_array.push('<li class="indoor_com_btn indoor_dialog_btn" dialogSrc="', "undefined" == typeof data.businessData.btnLinks[i].btnUrl ? "" : data.businessData.btnLinks[i].btnUrl, '" style="background-color:', "undefined" == typeof data.businessData.btnLinks[i].btnBgColor ? "" : data.businessData.btnLinks[i].btnBgColor, ';"><a href="javascript:void(0)" style="color:', "undefined" == typeof data.businessData.btnLinks[i].textColor ? "" : data.businessData.btnLinks[i].textColor, ';">', "undefined" == typeof data.businessData.btnLinks[i].btnText ? "" : data.businessData.btnLinks[i].btnText, "</a></li>"), _template_fun_array.push("");
                        _template_fun_array.push("</ul>")
                    }
                    _template_fun_array.push("</div>"), _template_varName = null
                }(_template_object);
            return fn = null, _template_fun_array.join("")
        }][0],
        baikePoiTemplate = [function(_template_object) {
            var _template_fun_array = [],
                fn = function(__data__) {
                    var _template_varName = "";
                    for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                    if (eval(_template_varName), _template_fun_array.push('<div class="pano_popup baike-poi-detail">    '), data.businessData && data.businessData.titleLink.length > 0 && _template_fun_array.push('    <div class="pano_poi_header clearfix">        <p class="title">            <span class="indoor_poi_icon_new indoor_poi_icon_website"></span>            <a href="', "undefined" == typeof data.businessData.titleLink ? "" : data.businessData.titleLink, '" class="indoor_business_link" target="_blank">官方网站</a>        </p>    </div>    '), _template_fun_array.push('    <div class="pano_poi_content">        '), data.businessData && data.businessData.btnLinks && data.businessData.btnLinks.length > 0) {
                        _template_fun_array.push('            <div class="content_line"></div>            <ul class="indoor_commercial_info clearfix">                ');
                        for (var i = 0; i < data.businessData.btnLinks.length; i++) _template_fun_array.push("                    "), 0 == data.businessData.btnLinks[i].type ? _template_fun_array.push('                        <li class="indoor_com_btn"                         style="background-color:', "undefined" == typeof data.businessData.btnLinks[i].btnBgColor ? "" : data.businessData.btnLinks[i].btnBgColor, ';">                            <a href="', "undefined" == typeof data.businessData.btnLinks[i].btnUrl ? "" : data.businessData.btnLinks[i].btnUrl, '"                                 style="color:', "undefined" == typeof data.businessData.btnLinks[i].textColor ? "" : data.businessData.btnLinks[i].textColor, ';" target="_blank">                                ', "undefined" == typeof data.businessData.btnLinks[i].btnText ? "" : data.businessData.btnLinks[i].btnText, "                            </a>                        </li>                    ") : 1 == data.businessData.btnLinks[i].type && _template_fun_array.push('                        <li class="indoor_com_btn indoor_dialog_btn"                         dialogSrc="', "undefined" == typeof data.businessData.btnLinks[i].btnUrl ? "" : data.businessData.btnLinks[i].btnUrl, '"                             style="background-color:', "undefined" == typeof data.businessData.btnLinks[i].btnBgColor ? "" : data.businessData.btnLinks[i].btnBgColor, ';">                            <a href="javascript:void(0)" style="color:', "undefined" == typeof data.businessData.btnLinks[i].textColor ? "" : data.businessData.btnLinks[i].textColor, ';">                                ', "undefined" == typeof data.businessData.btnLinks[i].btnText ? "" : data.businessData.btnLinks[i].btnText, "                            </a>                        </li>                    "), _template_fun_array.push("                ");
                        _template_fun_array.push('            </ul>            <div class="content_line"></div>        ')
                    }
                    _template_fun_array.push("        <p>            ", "undefined" == typeof data.abstract ? "" : data.abstract, '        </p>            </div>    <a class="direct-to-baike" href="', "undefined" == typeof data.url ? "" : data.url, '" target="_blank">到百科查看更多信息&gt;&gt;</a></div>'), _template_varName = null
                }(_template_object);
            return fn = null, _template_fun_array.join("")
        }][0],
        panoIndoorPoiModuleTemplate = [function(_template_object) {
            var _template_fun_array = [],
                fn = function(__data__) {
                    var _template_varName = "";
                    for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                    eval(_template_varName), _template_fun_array.push('<div class="indoor_poi_detail_container">    <h3 class="indoor_poi_title">        <dl class="clearfix">            <dt><i class="indoor_poi_icon indoor_poi_name"></i></dt>            <dd>', "undefined" == typeof name ? "" : name, '</dd>        </dl>    </h3>    <div class="poi_container_wrapper">        <div class="poi_content_wrapper">            <div class="pop_scroller_wrapper">            </div>        </div>    </div>    </div>'), _template_varName = null
                }(_template_object);
            return fn = null, _template_fun_array.join("")
        }][0];
    require.loadCss({
        content: '.indoor_poi_detail_container{color:#fff;font-size:12px;z-index:100101}.indoor_poi_title{height:40px;width:268px;font-size:12px;line-height:40px;font-weight:400;padding:0 16px;background-color:rgba(37,37,37,.9);background-color:#252525\\9;filter:alpha(opacity=90)\\9;_filter:alpha(opacity=100);border-radius:2px 2px 0 0;color:#abb0b2}.indoor_poi_title dt{float:left;*padding-top:10px}.indoor_poi_title dd{padding-left:5px;cursor:pointer;white-space:nowrap;width:238px;text-overflow:ellipsis;overflow:hidden}.indoor_poi_title dd:hover{color:#3af}.indoor_poi_icon,.indoor_poi_icon_new{margin-top:-1px;width:14px;height:14px;display:inline-block;vertical-align:middle;margin-right:7px}.indoor_poi_icon{background-image:url(//webmap0.bdimg.com/wolfman/static/pano/images/pano_whole/travel_icons_5af0ca2.png);_background-image:url(//webmap0.bdimg.com/wolfman/static/pano/images/pano_whole/travel_icons_8_95f2fbd.png)}.indoor_poi_icon_new{background-image:url(//webmap1.bdimg.com/wolfman/static/pano/images/pano_whole/travel_icons_new_c5baec6.png)}.indoor_poi_icon_website{background-position:0 -18px}.indoor_poi_icon_addr{background-position:-38px -18px}.indoor_poi_icon_phone{background-position:-20px -18px}.indoor_poi_name{background-image:url(//webmap1.bdimg.com/wolfman/static/pano/images/pano_whole/poi_marker_2fd50fc.png);_background-image:url(//webmap1.bdimg.com/wolfman/static/pano/images/pano_whole/poi_marker_8_a90bb13.png);width:18px;height:18px;background-position:0 0}.pano_poi_header{margin:6px 14px 10px}.pano_poi_header .title{}.pano_poi_header .indoor_business_link{width:210px;text-decoration:underline;color:#3af;font-size:12px;font-family:"Microsoft Yahei"}.pano_poi_header .indoor_business_link:hover{}.poi_container_wrapper{width:300px;overflow:hidden;position:relative;border-top:1px solid #53565d}.poi_content_wrapper{position:absolute;top:-9999px;width:100%;padding:6px 0;overflow:hidden;background-color:rgba(37,37,37,.9);background-color:#252525\\9;filter:alpha(opacity=90)\\9;_filter:alpha(opacity=100);border-radius:0 0 2px 2px}.pop_scroller_wrapper{overflow:hidden}.pano-indoor-poi-wrapper .detail_link{margin:0 14px;display:inline-block;line-height:1}.detail_link.single-link{margin:0 14px 8px;display:inline-block}.pano_more{margin-left:14px;color:#cfd8c6;font-family:微软雅黑}.travel_base_content{padding:8px 14px 0}.travel_more_content{padding:0 14px}.travel_content_line{width:300px;height:1px;margin-bottom:16px;font-size:0;line-height:0;background:#53565d;background:#53565d\\9}.travel_info_list dl{margin-bottom:16px}.travel_info_list dd{padding-left:5px;width:245px}.travel_info_list span{color:#FFF}.travel_info_list dt,.travel_info_list dd{display:inline-block;margin:0;float:left}.travel_grade{display:inline-block;width:74px;height:20px;margin-bottom:16px;text-align:center;color:#000;background:#ffde00;line-height:20px;font-size:12px}.travel_type{background-position:0 0}.travel_entrance_price{background-position:-14px 0}.travel_shop_hours{background-position:-28px 0}.travel_addr{background-position:-42px 0}.travel_phone{background-position:-56px -1px}.travel_sub_time{background-position:-70px 0}.travel_best_time{background-position:-70px 0}.travel_more{float:right}.travel_more a{color:gray;text-decoration:none}.indoor_commercial_info{margin-left:14px}.indoor_commercial_info li{margin:0 7px 10px}.indoor_commercial_info a{display:inline-block;width:80px;height:25px;background-color:#3af;color:#fff;text-align:center;line-height:25px;border-radius:1px;font-size:10px}.indoor_com_btn:hover{cursor:pointer}.baike-poi-detail{}.baike-poi-detail .pano_poi_content{padding:4px 18px 0;font-size:12px;line-height:20px}.baike-poi-detail .direct-to-baike{display:inline-block;padding:4px 18px;margin-bottom:8px;color:#34a5f6}.baike-poi-detail .content_line{margin:0 0 14px}.poi_container_wrapper .scrollbar-y,.poi_container_wrapper .scrollbar-y-thumb-prev,.poi_container_wrapper .scrollbar-y-thumb-next,.poi_container_wrapper .scrollbar-y-prev,.poi_container_wrapper .scrollbar-y-next{background-image:none}.poi_container_wrapper .scrollbar-y-prev,.poi_container_wrapper .scrollbar-y-next{width:14px}.poi_container_wrapper .tangram-scrollbar-slider{margin:0 auto;border-radius:20px;background-color:#292c2f;opacity:.95;width:6px}.poi_container_wrapper .scrollbar-y-thumb-btn{margin:0 auto;width:4px;background:#B3B9C3;opacity:.3;border-radius:10px}'
    });
    var PanoIndoorPoiModule = ModuleClass.extend("PanoIndoorPoiModule", {
        _renderTravelPoiInfo: function(a) {
            return travelPoiTemplate({
                data: a
            })
        },
        _renderNormalPoiInfo: function(a) {
            return indoorPoiTemplate({
                data: a
            })
        },
        renderBaikePoiInfo: function(a) {
            return baikePoiTemplate({
                data: a
            })
        },
        initialize: function(a, t, e, n) {
            this._container = a, this._events = null, this._isMouseEntered = !1, this._hasPanoPlan = e, this._animateStateEnum = {
                FOLDING: 1,
                EXPANDING: 2,
                STATIC: 3
            }, this._animateState = this._animateStateEnum.STATIC, this.render(t, e, n)
        },
        render: function(a, t, e) {
            a.businessData && (this.businessData = a.businessData, this.addBizIndoorMarker(a.pid));
            var n = this,
                i = n._container;
            if (n._isMouseEntered = !1, n._hasPanoPlan = t, n._currentUid = e, n.currentPid = a.pid, n._data = a, n._animateState = this._animateStateEnum.STATIC, a.isBaike === !1 && a.base) {
                var o = a.base.name,
                    s = panoIndoorPoiModuleTemplate({
                        name: o
                    }),
                    r = T(s),
                    l = r.find(".pop_scroller_wrapper"),
                    _ = null;
                _ = a.lvyou ? this._renderTravelPoiInfo(a) : this._renderNormalPoiInfo(a), l.append(T(_)), i.innerHTML = "", T(i).append(r), addStat(STAT_CODE.STAT_PANORAMA, {
                    catalog: "poi-detail",
                    item: "inter",
                    from: a.base.type
                })
            } else {
                if (!a.isBaike) return;
                var s = panoIndoorPoiModuleTemplate({
                        name: a.title
                    }),
                    r = T(s),
                    l = r.find(".pop_scroller_wrapper"),
                    _ = this.renderBaikePoiInfo(a);
                l.append(_), i.innerHTML = "", T(i).append(r)
            }
            i.style.display = "block", this.bindEvents(), this._appendScroller(), setTimeout(function() {
                n._isMouseEntered || (n._expand(), setTimeout(function() {
                    n._isMouseEntered || n._fold()
                }, 2e3))
            }, 500), T.on(T(".travel_more")[0], "click", function() {
                addStat(STAT_CODE.STAT_PANORAMA, {
                    item: "travel-link-click"
                })
            }), T.on(T(".indoor_business_link")[0], "click", function() {
                addStat(STAT_CODE.STAT_PANORAMA, {
                    item: "indoor_biz_link_click"
                })
            }), T(r).delegate(".indoor_dialog_btn", "click", function() {
                {
                    var a = this.getAttribute("dialogSrc");
                    new ModalDialog({
                        isIframe: !0,
                        iframeUrl: a
                    })
                }
            }), this.dispatch(e)
        },
        addBizIndoorMarker: function(a) {
            var t = this;
            if (this.businessData) {
                t.bizMarkers = [];
                var e = this.businessData.markers,
                    n = this.businessData.albums,
                    i = this.markers2poi = {};
                if (e)
                    for (var o = 0; o < e.length; o++) ! function(a) {
                        var o = e[a];
                        o.markerId = util.getUniqueId("MARKER_"), "undefined" == typeof i[o.owner_pid] ? i[o.owner_pid] = [o] : i[o.owner_pid].push(o), o.rank = o.z, o.title && o.content ? (o.catalog = "FA02", o.clickHandler = function() {
                            if (o.albums) {
                                new ModalDialog({
                                    isIframe: !1,
                                    content: o.content,
                                    title: o.title,
                                    width: 1e3,
                                    height: 540,
                                    hasAlbum: !0,
                                    albumData: n,
                                    albums: o.albums
                                })
                            } else {
                                new ModalDialog({
                                    isIframe: !1,
                                    hasAlbum: !1,
                                    content: o.content,
                                    title: o.title,
                                    width: 800,
                                    height: 400
                                })
                            }
                            addStat(STAT_CODE.STAT_PANORAMA, {
                                item: "indoor_biz_marker_dlg_click"
                            })
                        }) : o.pid ? (o.catalog = "FA01", o.clickHandler = function() {
                            var a = {
                                id: t._currentUid,
                                panoId: o.pid,
                                x: o.x,
                                y: o.y,
                                rank: o.z,
                                heading: o.heading,
                                pitch: o.pitch,
                                markers: i[o.pid]
                            };
                            a.showBizIndoorMarkers = !0, t.dispatchEvent("biz_indoor_goto_poi", {
                                data: a
                            }), addStat(STAT_CODE.STAT_PANORAMA, {
                                item: "indoor_biz_marker_topo_click"
                            })
                        }) : o.link && (o.catalog = "FA03", o.clickHandler = function() {
                            window.open(o.link), addStat(STAT_CODE.STAT_PANORAMA, {
                                item: "indoor_biz_marker_jump_click"
                            })
                        })
                    }(o);
                this.updateCurrentPoiMarkers(a), this.dispatchEvent("add_markers", i[a])
            }
        },
        updateCurrentPoiMarkers: function(a) {
            if (!(this.bizMarkers.length > 0) && this.markers2poi[a])
                for (var t = 0; t < this.markers2poi[a].length; t++) this.bizMarkers.push(this.markers2poi[a][t].markerId)
        },
        event_poi_change: function(a, t) {
            this.render(a.indoorPoi, this._hasPanoPlan, t)
        },
        dispatch: function(a) {
            this.dispatchEvent("poi_change", {
                uid: a
            })
        },
        bindEvents: function() {
            {
                var a = this,
                    t = T(".indoor_poi_title")[0],
                    e = T(".poi_content_wrapper")[0];
                T(".indoor_poi_detail_container")[0]
            }
            a._events = {}, a._tagMouseIn = "", a._events.titleMouseEnter = function() {
                a._isMouseEntered = !0, a._tagMouseIn = "title", a._expand()
            }, a._events.titleMouseLeave = function() {
                "title" == a._tagMouseIn && (a._tagMouseIn = ""), setTimeout(function() {
                    "content" != a._tagMouseIn && "title" != a._tagMouseIn && a._fold()
                }, DELAY_FOLD_TIME)
            }, a._events.contMouseEnter = function() {
                a._isMouseEntered = !0, a._tagMouseIn = "content"
            }, a._events.contMouseLeave = function() {
                "content" == a._tagMouseIn && (a._tagMouseIn = ""), setTimeout(function() {
                    "title" != a._tagMouseIn && "content" != a._tagMouseIn && a._fold()
                }, DELAY_FOLD_TIME)
            }, T.on(t, "mouseenter", a._events.titleMouseEnter), T.on(t, "mouseleave", a._events.titleMouseLeave), T.on(e, "mouseenter", a._events.contMouseEnter), T.on(e, "mouseleave", a._events.contMouseLeave), T(".indoor_poi_detail_container .movie_book_btn").on("click", function() {
                addStat(STAT_CODE.STAT_PANORAMA, {
                    item: "streetview-bookmovie-click",
                    type: "inter"
                })
            }), T(".indoor_poi_detail_container .hotel_book_btn").on("click", function() {
                addStat(STAT_CODE.STAT_PANORAMA, {
                    item: "streetview-bookhotel-click",
                    type: "inter"
                })
            })
        },
        getCurrentUid: function() {
            return this._currentUid
        },
        getBizMarkers: function() {
            return this.bizMarkers ? this.bizMarkers : []
        },
        clearBizMarkers: function() {
            this.bizMarkers && (this.bizMarkers = [])
        },
        getPoiData: function() {
            return this._data
        },
        _removeEvents: function() {
            if (this._events) {
                var a = T(".travel_title")[0],
                    t = T(".poi_content_wrapper")[0];
                T.un(a, "mouseenter", this._events.titleMouseEnter), T.un(a, "mouseleave", this._events.titleMouseLeave), T.un(t, "mouseenter", this._events.contMouseEnter), T.un(t, "mouseleave", this._events.contMouseLeave)
            }
        },
        dispose: function() {
            this._removeEvents(), this._container.innerHTML = "", this._animation && (this._animation.cancel(), this._animation = null)
        },
        show: function() {
            this._container.style.display = "block"
        },
        hide: function() {
            this._container.style.display = "none"
        },
        _expand: function() {
            var a = T(".poi_container_wrapper")[0],
                t = T(".poi_content_wrapper")[0],
                e = T(".indoor_poi_title")[0];
            if (a && t && this._animateState != this._animateStateEnum.EXPANDING) {
                this._animateState = this._animateStateEnum.EXPANDING;
                var n = t.offsetHeight;
                a.style.height = n + 32 + "px";
                var i = t.offsetTop; - n > i && (i = -n), this._animation && this._animation.cancel(), a.style.borderTop = "1px solid #53565d", e.style.borderRadius = "2px 2px 0 0", t.style.top = i + "px", this._slideAnimate(t, i, 0)
            }
        },
        _fold: function() {
            var a = T(".poi_container_wrapper")[0],
                t = T(".poi_content_wrapper")[0],
                e = T(".indoor_poi_title")[0];
            if (a && t && this._animateState != this._animateStateEnum.FOLDING) {
                this._animateState = this._animateStateEnum.FOLDING;
                var n = t.offsetHeight,
                    i = t.offsetTop;
                this._animation && this._animation.cancel(), this._slideAnimate(t, i, -(n + 32), function() {
                    a.style.borderTop = "0", e.style.borderRadius = "2px"
                })
            }
        },
        _slideAnimate: function(a, t, e, n) {
            var i = a.offsetTop,
                o = this,
                t = +t,
                e = +e;
            i !== e && (this._animation || (this._animation = new Animation.Animation), this._animation.build({
                fps: 60,
                transition: Animation.Transitions.easeInQuad,
                duration: 350,
                render: function(n) {
                    a.style.top = t + n * (e - t) + "px"
                },
                finish: function() {
                    !!n && n(), t > e && T(".poi_container_wrapper")[0] && (T(".poi_container_wrapper")[0].style.height = 0), o._animateState = o._animateStateEnum.STATIC
                }
            }))
        },
        _appendScroller: function() {
            var a = T(".pop_scroller_wrapper")[0],
                t = a.offsetHeight,
                e = this._getMaxContentHeight();
            t > e ? (a.style.height = e + "px", this.scrollPanel = new ScrollView(a, {
                overflow: "overflow-y",
                autoUpdate: !1
            }), this.scrollPanel.update()) : a.style.height = t
        },
        _getMaxContentHeight: function() {
            var a = document.body.offsetHeight,
                t = 70,
                e = this._hasPanoPlan ? 335 : 135,
                n = 32,
                i = 0;
            return a > 768 && (a = 768), i = a - t - e - n, i > 0 ? i : 0
        },
        getShareParam: function() {
            var a = this.getCurrentUid();
            return {
                uid: a
            }
        },
        getSupportEvents: function() {
            return ["poi_change", "biz_indoor_goto_poi", "remove_markers", "add_markers"]
        }
    });
    module.exports = PanoIndoorPoiModule
});;
define("pano:widget/module/PoiInfoPanelModule/PoiInfoPanelModule.js", function(require, exports, module) {
    var FoldPanelComponent = require("pano:widget/component/FoldPanelComponent/FoldPanelComponent.js"),
        ModuleClass = require("pano:widget/base/ModuleClass.js"),
        util = require("pano:widget/base/util.js"),
        PanoPoi = require("pano:widget/model/PanoPoi.js");
    require.loadCss({
        content: ".list-title-bar{position:absolute;top:20px;left:97px;font-size:12px;line-height:40px;height:40px;width:87px;background-color:#252525;background-color:rgba(37,37,37,.9);filter:alpha(opacity=90);border-radius:2px 0 0 2px;color:#c5cbd6}.list-title-bar .v-line{position:absolute;right:0;top:10px;height:20px;width:1px;background-color:#53565c}.list_title_text{text-indent:42px;display:block;line-height:40px;text-decoration:none;color:#c5cbd6;background:url(//webmap0.bdimg.com/wolfman/static/pano/images/pano_whole/pano_list_icon2_29440ee.png) no-repeat 9px 8px;_background:url(//webmap0.bdimg.com/wolfman/static/pano/images/pano_whole/pano_list_icon_8_2_abd0108.png) no-repeat;_background-position:9px 8px}.list_title_text:hover{background:url(//webmap1.bdimg.com/wolfman/static/pano/images/pano_whole/pano_list_icon2_hover_12829e5.png) no-repeat 9px 7px;_background:url(//webmap1.bdimg.com/wolfman/static/pano/images/pano_whole/pano_list_icon_8_2_hover_951b39a.png) no-repeat;_background-position:9px 7px;color:#3af}.busline_title_icon,.busline_title_icon:hover{overflow:hidden;width:87px;white-space:nowrap;text-overflow:ellipsis;background:url(//webmap1.bdimg.com/wolfman/static/pano/images/pano_whole/busline-icon2_4c8ad16.png) no-repeat 10px 6px;_background-image:url(//webmap1.bdimg.com/wolfman/static/pano/images/pano_whole/busline-icon-ie6_69bb4a2.png)}.busline_title_icon:hover{background:url(//webmap1.bdimg.com/wolfman/static/pano/images/pano_whole/busline-icon2_hover_b638a12.png) no-repeat 12px 6px!important}.info-title-bar,.info-title-bar-nolist{position:absolute;top:20px;font-size:12px;line-height:40px;height:40px;width:193px;padding:0 10px;background-color:#252525;background-color:rgba(37,37,37,.9);_background-color:#252525;*background-color:#252525;filter:alpha(opacity=90);_filter:alpha(opacity=90);border-radius:0 2px 2px 0;color:#c5cbd6}.info-title-bar{left:190px}.info-title-bar p{_margin-top:10px}.info-title-bar-nolist{left:97px;width:280px;border-radius:2px}.poi_title_text{_margin-top:10px;width:95%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;cursor:pointer}.poi_title_text:hover{color:#3af}.poi_default_icon{background-image:url(//webmap1.bdimg.com/wolfman/static/pano/images/pano_whole/poi_marker_2fd50fc.png);*background-image:url(//webmap1.bdimg.com/wolfman/static/pano/images/pano_whole/poi_marker_8_a90bb13.png);width:18px;height:18px;background-position:0 0;margin-top:-2px;margin-right:7px;display:inline-block;vertical-align:middle}.info-title-bar dt,.info-title-bar dd{display:inline-block;margin:0;float:left}.info-title-bar dt{*margin-top:7px}.pano_popup_title{margin:0 auto;width:260px;height:35px;color:#c5cbd5;font-size:14px;line-height:35px;text-align:center;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.pano_popup_title span{color:#eaae00}.pano_popup{width:300px;font-size:12px;color:#939799}.pano_popup a{text-decoration:none;color:#c5cbd6}.pano_popup .content_line{margin:14px;height:1px;font-size:0;line-height:0;background:#3c3c42}.pano_popup .content_cut{margin:10px 14px;height:1px;line-height:0;background:transparent}.pano_poi_header{margin:9px 14px 0}.pano_poi_header .indoor_view_icon{float:left;margin-top:-3px}.pano_poi_header .detail_link{color:#71557b;float:right}.pano_poi_header .detail_link:hover{color:#33a9ff}.pano_poi_header .title{float:left;width:210px;margin-right:6px;font-size:12px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;color:#d3d8db}.pano_poi_content{margin-bottom:6px;margin-top:6px}.pano_poi_content li{margin:0 14px 10px}.pano_poi_content li.last{margin-bottom:0}.pano_poi_content li span{float:left}.pano_poi_content .type_cont{width:206px}.pano_popup .book_link{float:right;color:#7a7c80;margin-bottom:10px}.pano_popup .book_link:hover{color:#3af}.movie_newest{font-size:12px}.movie_newest a span{display:inline-block;width:48px;padding:5px 8px;vertical-align:middle;background:#9bcb66;color:#fff}.movie_book{margin-top:20px}.movie_book .span1{display:inline-block;width:104px;vertical-align:middle;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.movie_book .span2,.movie_book .span3{display:inline-block;width:48px;*margin-left:-3px}.movie_newest a em{color:red;font-style:normal}.pano_popup .gray{color:#71757b}.pano_popup .blue{color:#40acff}.pano_popup .orange{color:#ee6919}.pano_hotel_info li,.pano_movie_info li{margin-bottom:14px;line-height:20px}.pano_hotel_info,.pano_movie_info{margin:0 14px}.hotel_book{}.hotel_book .span1{display:inline-block;width:140px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.hotel_book .span2{display:inline-block;width:60px;overflow:hidden}.movie_book_btn{display:inline-block;height:20px;line-height:20px;text-align:center;text-decoration:none;font-size:12px;color:#caac00!important;_overflow:hidden;zoom:1;width:60px}.hotel_book_btn{display:inline-block;vertical-align:top;width:60px;height:20px;line-height:20px;font-size:12px;color:#caac00!important;text-align:center;text-decoration:none;_overflow:hidden;zoom:1}.pano_poi_icon{background-image:url(//webmap0.bdimg.com/wolfman/static/pano/images/pano_whole/travel_icons_5af0ca2.png);_background-image:url(//webmap0.bdimg.com/wolfman/static/pano/images/pano_whole/travel_icons_8_95f2fbd.png);margin-top:1px;margin-right:5px;width:14px;height:14px;display:inline-block;vertical-align:middle;background-repeat:no-repeat}.pano_more .detail_link{color:#cfd8e6}.detail_link:hover{color:#3af}.pano_popup .bottom_line{margin:12px 14px 0;font-size:0;line-height:0;height:1px;background:#3c3c42;_background:#222}.pano_poi_footer li{height:35px;text-align:center;cursor:pointer;font-size:12px}.pano_poi_footer .indoor_view{padding-top:9px;display:block}.pano_poi_footer .indoor_view:hover{color:#3af}.pano_poi_footer .detail_indoor_view_icon{display:inline-block;width:27px;height:29px;vertical-align:middle;margin-right:10px;margin-top:-4px;background:url(//webmap1.bdimg.com/wolfman/static/pano/images/pano_whole/classification_search_icons2_a150f2f.png) no-repeat;background-position:-75px 0;_background-position:-75px 0}.pano_poi_footer .indoor_view:hover .detail_indoor_view_icon{background-position:-75px -25px}.pano_popup h4.pano_poi_list_header{margin-bottom:18px;text-align:center;font-size:14px;font-weight:400;letter-spacing:3px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.pano_poi_list_content .list_item{position:relative;z-index:0;overflow:hidden;padding:14px 10px;vertical-align:middle}.pano_poi_list_content .list_item_line{position:absolute;top:0;left:18px;width:272px;height:1px;font-size:0;line-height:0;border:0;background:#3c3c42;_background:#222}.pano_poi_list_content .list_item_icon{float:left;width:30px}.list_item_content{float:left;cursor:pointer}.list_item_content .pano_poi_name{width:180px;margin-bottom:12px;font-weight:400;font-size:12px;color:#c5cbd5;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.pano_info_name{float:left;width:37px;color:#71757b}.pano_poi_addr{margin-bottom:7px}.pano_info_cont{float:left;width:170px;color:#71757b}.list_item_bg{position:absolute;z-index:-1;left:0;top:1px;width:100%;height:100%;background:transparent}.list_item_hover .list_item_bg{background-color:#4d4e4e;opacity:.8;filter:alpha(opacity=80);_filter:alpha(opacity=100)}.pano_entrance{position:absolute;top:10px;right:16px;width:58px;overflow:hidden}.street_view_icon,.indoor_view_icon{float:right;width:24px;height:26px}.street_view_icon{background:url(//webmap0.bdimg.com/wolfman/static/pano/images/pano_whole/poi_detail_41c2576.png) no-repeat}.indoor_view_icon{background:url(//webmap1.bdimg.com/wolfman/static/pano/images/pano_whole/classification_search_icons2_a150f2f.png) no-repeat;background-position:-78px -4px;_background-position:-80px 0}.list_item_hover .indoor_view_icon{background-position:-78px -4px}.street_view_icon{background-position:0 -32px}.pano_entrance_split_line{height:12px;width:1px;float:right;font-size:0;margin:4px 5px 4px 2px;background:#53565c;_background:#222}.indoor_view_icon_hover,.pano_poi_header .indoor_view_icon:hover{background-position:-78px -29px}.pano_poi_list_page{margin-top:5px;text-align:center}.pano_poi_list_page span{display:inline-block;margin:0 4px;color:#d3d8db;padding:0 5px}.pano_poi_list_page a{display:inline-block;line-height:20px;padding:0 5px;text-decoration:none;color:#939799}.pano_poi_list_page a:hover{color:#d3d8db}.list_item_icon span{display:inline-block;width:19px;height:29px;margin-left:5px;background:url(//webmap1.bdimg.com/wolfman/static/pano/images/pano_whole/markers_new_97ee5e6.png) no-repeat;_background:url(//webmap0.bdimg.com/wolfman/static/pano/images/pano_whole/markers_new_ie6_b87c545.png) no-repeat}.list_item_icon span.no_1{background-position:0 0}.list_item_hover span.no_1{background-position:0 -32px}.list_item_icon span.no_2{background-position:-24px 0}.list_item_hover span.no_2{background-position:-24px -32px}.list_item_icon span.no_3{background-position:-47px 0}.list_item_hover span.no_3{background-position:-47px -32px}.list_item_icon span.no_4{background-position:-69px 0}.list_item_hover span.no_4{background-position:-69px -32px}.list_item_icon span.no_5{background-position:-93px 0}.list_item_hover span.no_5{background-position:-93px -32px}.list_item_icon span.no_6{background-position:-117px 0}.list_item_hover span.no_6{background-position:-117px -32px}.list_item_icon span.no_7{background-position:-141px 0}.list_item_hover span.no_7{background-position:-141px -32px}.list_item_icon span.no_8{background-position:-164px 0}.list_item_hover span.no_8{background-position:-164px -32px}.list_item_icon span.no_9{background-position:-188px 0}.list_item_hover span.no_9{background-position:-188px -32px}.list_item_icon span.no_10{background-position:-211px 0}.list_item_hover span.no_10{background-position:-211px -32px}.pano_poi_list_content .list_item.busline_station{padding:5px 10px}.busline_station .pano_poi_name{line-height:25px;margin-bottom:0;margin-left:10px}"
    });
    var POI_DETAIL_TEMPLATE = [function(_template_object) {
            var _template_fun_array = [],
                fn = function(__data__) {
                    var _template_varName = "";
                    for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                    if (eval(_template_varName), _template_fun_array.push(""), panoPoi.tour) _template_fun_array.push('        <div class="pano_popup">        <div class="pano_poi_header clearfix">            <p href="javascript:void(0);" class="title">                ', "undefined" == typeof panoPoi.tour.name ? "" : panoPoi.tour.name, '            </p>        </div>        <div class="bottom_line"></div>        <div class="pano_poi_footer">            <ul>                <li data-action="tour" data-tourid="', "undefined" == typeof panoPoi.tour.tourid ? "" : panoPoi.tour.tourid, '">                    <a data-action="tour" data-tourid="', "undefined" == typeof panoPoi.tour.tourid ? "" : panoPoi.tour.tourid, '" href="javascript:void(0);" class="indoor_view"><span as-parent="1" class="detail_indoor_view_icon"></span>进入内景</a>                </li>            </ul>        </div>    </div>');
                    else {
                        if (_template_fun_array.push('    <div class="pano_popup">        <div class="pano_poi_header clearfix">            <p href="javascript:void(0);" class="title">                ', "undefined" == typeof panoPoi.poi.name ? "" : panoPoi.poi.name, '            </p>            <a href="javascript:void(0);" class="detail_link gray" target="_blank" data-action="detail">详情>></a>        </div>        <div class="content_line"></div>        <ul class="pano_poi_content">            '), panoPoi.poi.addr && (_template_fun_array.push('                <li class="clearfix">                                        '), _template_fun_array.push(1 === panoPoi.poi.poi_type || 3 === panoPoi.poi.poi_type ? '                        <span class="type_name">车次：</span>                    ' : '                        <span class="type_name">地址：</span>                    '), _template_fun_array.push('                    <span class="type_cont">', "undefined" == typeof panoPoi.poi.addr ? "" : panoPoi.poi.addr, "</span>                </li>            ")), _template_fun_array.push("            "), panoPoi.poi.tel && _template_fun_array.push('                <li class="clearfix last">                                        <span class="type_name">电话：</span>                    <span class="type_cont">', "undefined" == typeof panoPoi.poi.tel ? "" : panoPoi.poi.tel, "</span>                </li>            "), _template_fun_array.push("        </ul>        "), panoPoi.movie) {
                            _template_fun_array.push('            <div class="content_line"></div>            <div class="pano_movie_info">                <div class="movie_newest">                    '), panoPoi.poi.movie_count && _template_fun_array.push('                        <a href="javascript:void(0);">                            <span>实时影讯<i class="arrow"></i></span>                            目前                            <em>', "undefined" == typeof panoPoi.poi.movie_count ? "" : panoPoi.poi.movie_count, "</em>                            部影片                            <em>正在上映!</em>                        </a>                    "), _template_fun_array.push('                </div>                <ul class="movie_book">                    ');
                            for (var i = 0; i < panoPoi.movie.length; i++) _template_fun_array.push('                        <li class="clearfix">                            <span class="span1" title="', "undefined" == typeof panoPoi.movie[i].name ? "" : panoPoi.movie[i].name, '">', "undefined" == typeof panoPoi.movie[i].name ? "" : panoPoi.movie[i].name, '</span>                            <span class="span2 gray">', "undefined" == typeof panoPoi.movie[i].type ? "" : panoPoi.movie[i].type, '</span>                            <span class="span3 orange">¥', "undefined" == typeof panoPoi.movie[i].price ? "" : panoPoi.movie[i].price, '起</span>                            <span class="span3">                                <a href="javascript:void(0);" class="movie_book_btn" data-action="bookMovie" data-mid="', "undefined" == typeof panoPoi.movie[i].id ? "" : panoPoi.movie[i].id, '" target="_blank">在线订座</a>                            </span>                        </li>                    ');
                            _template_fun_array.push('                </ul>                <div class="clearfix">                    <a href="javascript:void(0)" class="book_link" target="_blank" data-action="moreMovie">更多电影>></a>                </div>            </div>        ')
                        }
                        if (_template_fun_array.push("        "), panoPoi.hotel) {
                            _template_fun_array.push('            <div class="content_line"></div>            <div class="pano_hotel_info">                <ul class="hotel_book">                    ');
                            for (var j = 0; j < panoPoi.hotel.length; j++) _template_fun_array.push('                        <li class="clearfix">                            <span class="span1">', "undefined" == typeof panoPoi.hotel[j].roomTypeName ? "" : panoPoi.hotel[j].roomTypeName, '</span>                            <span class="span2 orange">¥', "undefined" == typeof panoPoi.hotel[j].price ? "" : panoPoi.hotel[j].price, '起</span>                            <span class="span3">                                <a href="javascript:void(0);" class="hotel_book_btn" target="_blank" data-action="bookHotel" data-rid="', "undefined" == typeof panoPoi.hotel[j].roomId ? "" : panoPoi.hotel[j].roomId, '">                                    预订>>                                </a>                            </span>                        </li>                    ');
                            _template_fun_array.push('                </ul>                <div class="clearfix">                    <a class="book_link" href="javascript:void(0);" data-action="detail" target="_blank">更多房型和日期&gt;&gt;</a>                </div>            </div>        ')
                        }
                        _template_fun_array.push("        "), panoPoi.pano && panoPoi.pano.iid && _template_fun_array.push('            <div class="bottom_line"></div>            <div class="pano_poi_footer">                <ul>                    <li data-action="indoor" data-iid="', "undefined" == typeof panoPoi.pano.iid ? "" : panoPoi.pano.iid, '">                        <a data-action="indoor" data-iid="', "undefined" == typeof panoPoi.pano.iid ? "" : panoPoi.pano.iid, '" href="javascript:void(0);" class="indoor_view"><span as-parent="1" class="detail_indoor_view_icon"></span>进入内景</a>                    </li>                </ul>            </div>        '), _template_fun_array.push("    </div>")
                    }
                    _template_fun_array.push(""), _template_varName = null
                }(_template_object);
            return fn = null, _template_fun_array.join("")
        }][0],
        POI_LIST_TEMPLATE = [function(_template_object) {
            var _template_fun_array = [],
                fn = function(__data__) {
                    var _template_varName = "";
                    for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                    eval(_template_varName), _template_fun_array.push('<div class="pano_popup"><div class="pano_poi_list_content"><ul>');
                    for (var i = 0, len = panoPoiList.content.length; len > i; i++) _template_fun_array.push('<li data-action="goToPoi" data-index="', "undefined" == typeof i ? "" : i, '" class="list_item clearfix"><a class="list_item_bg"></a>'), 0 != i && _template_fun_array.push('<div class="list_item_line"></div>'), _template_fun_array.push('<a href="javascript:void(0);" class="list_item_icon"><span class="no_', "undefined" == typeof(i + 1) ? "" : i + 1, '"></span></a><div class="list_item_content"><h4 class="pano_poi_name">', "undefined" == typeof panoPoiList.content[i].poi.name ? "" : panoPoiList.content[i].poi.name, '</h4><ul class="pano_poi_detail">'), panoPoiList.content[i].poi.addr && _template_fun_array.push('<li class="clearfix pano_poi_addr"><span class="pano_info_name">地址：</span><span class="pano_info_cont">', "undefined" == typeof panoPoiList.content[i].poi.addr ? "" : panoPoiList.content[i].poi.addr, "</span></li>"), _template_fun_array.push(""), panoPoiList.content[i].poi.tel && _template_fun_array.push('<li class="clearfix pano_poi_tel"><span class="pano_info_name">电话：</span><span class="pano_info_cont">', "undefined" == typeof panoPoiList.content[i].poi.tel ? "" : panoPoiList.content[i].poi.tel, "</span></li>"), _template_fun_array.push('</ul><div class="pano_entrance">'), panoPoiList.content[i].poi.hasIndoor && _template_fun_array.push('<a data-action="showIndoor" data-index="', "undefined" == typeof i ? "" : i, '" href="javascript:void(0);" class="indoor_view_icon"></a><span class="pano_entrance_split_line"></span>'), _template_fun_array.push(""), panoPoiList.content[i].poi.sid && _template_fun_array.push('<span class="street_view_icon"></span>'), _template_fun_array.push("</div></div></li>");
                    if (_template_fun_array.push("</ul></div>"), panoPoiList.pageInfo) {
                        _template_fun_array.push('<div class="pano_poi_list_page"><p>'), panoPoiList.pageInfo.hasHome && _template_fun_array.push('<span class="home"><a data-action="home_page" href="javascript:void(0);">首页</a></span>'), _template_fun_array.push(""), panoPoiList.pageInfo.hasPrev && _template_fun_array.push('<span class="pre"><a data-action="prev_page" href="javascript:void(0);">&lt;上一页</a></span>'), _template_fun_array.push("");
                        for (var i = 0, len = panoPoiList.pageInfo.text.length; len > i; i++) _template_fun_array.push(""), panoPoiList.pageInfo.text[i] == panoPoiList.pageInfo.index ? _template_fun_array.push(' <span class="curPage">', "undefined" == typeof panoPoiList.pageInfo.text[i] ? "" : panoPoiList.pageInfo.text[i], "</span>") : _template_fun_array.push('<span><a data-action="pn" href="javascript:void(0);">', "undefined" == typeof panoPoiList.pageInfo.text[i] ? "" : panoPoiList.pageInfo.text[i], "</a></span>"), _template_fun_array.push("");
                        _template_fun_array.push(""), panoPoiList.pageInfo.hasNext && _template_fun_array.push('<span class="next"><a data-action="next_page" href="javascript:void(0);">下一页&gt;</a></span>'), _template_fun_array.push("</p></div>")
                    }
                    _template_fun_array.push("</div>"), _template_varName = null
                }(_template_object);
            return fn = null, _template_fun_array.join("")
        }][0],
        BUSLINE_TEMPLATE = [function(_template_object) {
            var _template_fun_array = [],
                fn = function(__data__) {
                    var _template_varName = "";
                    for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                    eval(_template_varName), _template_fun_array.push('<div class="pano_popup"><div class="pano_poi_list_content"><ul>');
                    for (var i = 0, len = poiList.length; len > i; i++) _template_fun_array.push('<li data-action="goToBusStation" data-index="', "undefined" == typeof i ? "" : i, '" class="list_item busline_station clearfix"><a class="list_item_bg"></a>'), 0 != i && _template_fun_array.push('<div class="list_item_line"></div>'), _template_fun_array.push('<div class="list_item_content"><h4 class="pano_poi_name">', "undefined" == typeof poiList[i].stationName ? "" : poiList[i].stationName, '</h4><div class="pano_entrance">'), poiList[i].pano && poiList[i].pano.pid && _template_fun_array.push('<span class="street_view_icon"></span>'), _template_fun_array.push("</div></div></li>");
                    _template_fun_array.push("</ul></div></div>"), _template_varName = null
                }(_template_object);
            return fn = null, _template_fun_array.join("")
        }][0],
        VIEW_HEADER = 59,
        VIEW_FOOTER = 150,
        CONTEN_PADDING = 12,
        BUFFER = 32,
        fitForIndex = function(i, o, a, t, e) {
            var n = t;
            if (o >= n && n + e >= a) return void 0;
            if (n > o) return o;
            if (a > n + e) {
                var p = o - (e - (a - o));
                return p
            }
        },
        getPanelMaxHeight = function() {
            var i = document.body.offsetHeight - VIEW_HEADER - VIEW_FOOTER - CONTEN_PADDING - BUFFER;
            return Math.max(i, 50)
        },
        gotoDetailPage = function(i) {
            var o = i.getAttribute("data-action");
            if (!o) {
                var a = i.getAttribute("as-parent");
                if (!a) return;
                i = i.parentNode, o = i.getAttribute("data-action")
            }
            var t = this._data.poi;
            switch (o) {
                case "indoor":
                    var e = i.getAttribute("data-iid");
                    this.dispatchEvent("pano_changed", {
                        data: {
                            source: "PoiInfoPanelModule",
                            panoIId: e
                        }
                    }), addStat(STAT_CODE.STAT_PANORAMA, {
                        item: "poidetail-indoorview-click"
                    });
                    break;
                case "detail":
                    3 === t.poi.poi_type ? util.showDetail(t.poi.uid, t.poi.poi_type, t.poi.city, "", "") : util.showDetail(t.poi.uid, 0, t.poi.city, t.poi.src, "Page");
                    break;
                case "bookMovie":
                    var n = i.getAttribute("data-mid");
                    util.showDetail(t.poi.uid, 0, t.poi.city, t.poi.src, "movie_book", "", n), addStat(STAT_CODE.STAT_PANORAMA, {
                        item: "streetview-bookmovie-click",
                        type: "street"
                    });
                    break;
                case "moreMovie":
                    util.showDetail(t.poi.uid, 0, t.poi.city, t.poi.src, "movie_more");
                    break;
                case "bookHotel":
                    var p = i.getAttribute("data-rid"),
                        s = "";
                    p && (s = baidu.url.jsonToQuery({
                        roomId: p
                    })), util.showDetail(t.poi.uid, 0, t.poi.city, t.poi.src, t.poi.src, "", s), addStat(STAT_CODE.STAT_PANORAMA, {
                        item: "streetview-bookhotel-click",
                        type: "street"
                    })
            }
        },
        listPanelAction = function(i, o) {
            for (var a = (this._data.poi, this._data.list.content), t = this._data.list.pageInfo, e = !1; !e && i && i !== o;) {
                var n = i.getAttribute("data-action");
                switch (n) {
                    case "goToPoi":
                    case "goToBusStation":
                        var p = i.getAttribute("data-index"),
                            s = a[p];
                        this.setSelect(p);
                        var r = this;
                        s.extend(PanoPoi.TYPE.pano).then(function() {
                            s.pano.belonging ? r.dispatchEvent("inter_poi_changed", {
                                data: {
                                    source: "PoiInfoPanelModule",
                                    panoId: s.pano.pid,
                                    uid: s.poi.uid,
                                    pid: s.pano.pid,
                                    poiType: 2,
                                    panoHeading: s.pano.dir,
                                    panoPitch: s.pano.pitch,
                                    x: s.pano.x,
                                    y: s.pano.y,
                                    panoX: s.pano.panox,
                                    panoY: s.pano.panoy
                                }
                            }) : r.dispatchEvent("animate_pano_changed", {
                                data: {
                                    source: "PoiInfoPanelModule",
                                    panoId: s.pano.pid,
                                    uid: s.poi.uid,
                                    pid: s.pano.pid,
                                    poiType: 2,
                                    panoHeading: s.pano.dir,
                                    panoPitch: s.pano.pitch,
                                    x: s.pano.x,
                                    y: s.pano.y,
                                    panoX: s.pano.panox,
                                    panoY: s.pano.panoy
                                }
                            }), r.foldList(), setTimeout(function() {
                                r.dispatchEvent("hide_position")
                            }, 100)
                        });
                        break;
                    case "showIndoor":
                        var p = i.getAttribute("data-index"),
                            s = a[p],
                            r = this;
                        s.extend(PanoPoi.TYPE.pano).then(function() {
                            r.dispatchEvent("pano_changed", {
                                data: {
                                    source: "PoiInfoPanelModule",
                                    panoIId: s.pano.iid
                                }
                            })
                        }), e = !0, addStat(STAT_CODE.STAT_PANORAMA, {
                            item: "poilist-indoorview-click"
                        });
                        break;
                    case "pn":
                        var l = parseInt(i.innerHTML);
                        l--, this.updatePoiListInfo({
                            pn: l,
                            nn: l * t.pageSize
                        }), e = !0;
                        break;
                    case "home_page":
                        l = 0, this.updatePoiListInfo({
                            pn: l,
                            nn: l * t.pageSize
                        }), e = !0;
                        break;
                    case "prev_page":
                        var l = t.index - 1;
                        l--, this.updatePoiListInfo({
                            pn: l,
                            nn: l * t.pageSize
                        }), e = !0;
                        break;
                    case "next_page":
                        var l = t.index - 1;
                        l++, this.updatePoiListInfo({
                            pn: l,
                            nn: l * t.pageSize
                        }), e = !0
                }
                i = i.parentNode
            }
        },
        PoiInfoPanelModule = ModuleClass.extend("PoiInfoPanelModule", {
            initialize: function(i, o, a, t, e, n) {
                this._busLineCityCode = n, this._busLineUid = e, this._panoContext = o, this._data = {
                    poi: void 0,
                    list: void 0,
                    listUrl: void 0
                }, this._saveData = {
                    poi: void 0,
                    list: void 0,
                    listUrl: void 0
                }, this.parentDom = parentDom = document.createElement("div");
                var p = document.createElement("div"),
                    s = this.listButton = document.createElement("div");
                s.className = "list-title-bar", p.appendChild(s);
                var r = this.infoButton = document.createElement("div");
                r.className = "info-title-bar", p.appendChild(r);
                var l = document.createElement("div"),
                    _ = this.infoPanel = new FoldPanelComponent(r, l, {
                        align: "right"
                    });
                _.setPosition(97, VIEW_HEADER);
                var d = this.listPanel = new FoldPanelComponent(s, l, {
                    align: "left"
                });
                d.setPosition(97, VIEW_HEADER), parentDom.appendChild(p), parentDom.appendChild(l), i.appendChild(parentDom), t || this.hide(), t && this.hide();
                var c = this;
                T.on(s, "mouseenter", function() {
                    _.fold(!0)
                }), T.on(r, "mouseenter", function() {
                    d.fold(!0);
                    var i = c._data.poi;
                    if (i) {
                        var o = i.poi ? i.poi.x : i.pano.x,
                            a = i.poi ? i.poi.y : i.pano.y;
                        c.dispatchEvent("show_position", {
                            data: {
                                x: o,
                                y: a
                            }
                        })
                    }
                }), T.on(r, "mouseleave", function() {
                    c.dispatchEvent("hide_position")
                }), _.addEventListener("click", function(i) {
                    gotoDetailPage.call(c, i.target, l), i.preventDefault()
                }), d.addEventListener("click", function(i) {
                    listPanelAction.call(c, i.target, l)
                });
                var u = {},
                    h = function(i, o) {
                        return o ? (f && u[o] && clearTimeout(u[o]), void(u[o] = setTimeout(function() {
                            o !== f && T(i).removeClass("list_item_hover")
                        }, 5))) : void T(i).removeClass("list_item_hover")
                    };
                d.addEventListener("mouseout", function(i) {
                    for (var o = i.target; o && o !== l;) {
                        var a = o.getAttribute("data-action");
                        if ("showIndoor" === a && T(o).removeClass("indoor_view_icon_hover"), "goToPoi" === a || "goToBusStation" === a) {
                            h(o, f), f = void 0;
                            break
                        }
                        o = o.parentNode
                    }
                });
                var f = void 0;
                d.addEventListener("mouseover", function(i) {
                    for (var o = i.target, a = !1; o && o !== l;) {
                        var t = o.getAttribute("data-action");
                        if ("showIndoor" === t && (T(o).addClass("indoor_view_icon_hover"), a = !0), "goToPoi" === t || "goToBusStation" === t) {
                            var e = o.getAttribute("data-index");
                            if (e !== f) {
                                var n = c._data.list.content[e];
                                n.extend(PanoPoi.TYPE.poi).then(function() {
                                    c.dispatchEvent("show_position", {
                                        data: {
                                            x: n.poi.x,
                                            y: n.poi.y
                                        }
                                    })
                                }), f = e
                            }
                            T(o).hasClass("list_item_hover") || T(o).addClass("list_item_hover"); {
                                o.offsetTop
                            }
                            a && T(o).removeClass("list_item_hover");
                            break
                        }
                        o = o.parentNode
                    }
                }), d.addEventListener("mouseleave", function() {
                    f = void 0, c.dispatchEvent("hide_position")
                });
                var m = void 0,
                    v = !1,
                    g = !1,
                    b = !1,
                    x = function() {
                        clearTimeout(m), setTimeout(function() {
                            var i = v || g;
                            i !== b && (b = i, c.dispatchEvent("status_changed", {
                                isExpand: b
                            }))
                        }, 200)
                    };
                if (d.addEventListener("before_expand", function() {
                        v = !0, x()
                    }), _.addEventListener("before_expand", function() {
                        g = !0, x()
                    }), d.addEventListener("before_fold", function() {
                        v = !1, x()
                    }), _.addEventListener("before_fold", function() {
                        g = !1, x()
                    }), this.$shareParam) {
                    var P = this.$shareParam.uid,
                        w = (this.$shareParam.url, this._panoContext.getMarkerUidInBestPano()),
                        y = !1;
                    this.$shareParam.busLineUid && (this._busLineUid = this.$shareParam.busLineUid, y = !0), this.$shareParam.ccode && (this._busLineCityCode = this.$shareParam.ccode), w ? this.setData(w, !0, y, w, null, !0) : this.setData(P, !0, !0)
                }
            },
            foldAllPanel: function() {
                return this.foldDetail().foldList(), this
            },
            foldDetail: function() {
                return this.infoPanel.fold(), this
            },
            expandDetail: function(i) {
                this.infoPanel.expand(i)
            },
            foldList: function() {
                return this.listPanel.fold(), this
            },
            freeze: function() {
                return this.infoPanel.ignoreMouseEvent(!0), this.listPanel.ignoreMouseEvent(!0), this
            },
            unfreeze: function() {
                return this.infoPanel.ignoreMouseEvent(!1), this.listPanel.ignoreMouseEvent(!1), this
            },
            setData: function(i, o, a, t, e) {
                var n, p, s = i instanceof PanoPoi ? i : new PanoPoi(i, this._busLineCityCode);
                void 0 === e && (e = !0), o && (n = this._busLineUid ? this.updateBusLineListInfo(this._busLineUid, this._busLineCityCode) : this.updatePoiListInfo()), p = this.updatePoiDetailInfo(s);
                var r = [];
                p && r.push(p), n && r.push(n);
                var l = T.when.apply(T, r),
                    _ = this;
                return l.then(function() {
                    if (_._data.list) {
                        var o = "";
                        o = _._data.list.buslineName ? '<a class="list_title_text busline_title_icon" href="javascript:void(0);">' + _._data.list.buslineName + '</a><div class="v-line"></div>' : '<a class="list_title_text" href="javascript:void(0);">列表</a><div class="v-line"></div>', _.listPanel.setTitle(o)
                    } else _.infoButton.className = "info-title-bar-nolist", _.infoPanel.setAlign("top");
                    var n = document.createElement("p");
                    if (n.innerHTML = '<i class="poi_default_icon"></i>' + s.poi.name, n.className = "poi_title_text", _.infoPanel.setTitle(n), s.getUid() === t && _.savePoiInfo(), _.unfreeze(), _.listPanel.fold(!0), e && _.infoPanel.expand(2500), a && _._data.list) {
                        var p = void 0;
                        util.each(_._data.list.content, function(o, a) {
                            return o.getUid() === i ? (p = a, !0) : void 0
                        }), void 0 !== p && _.setSelect(p)
                    }
                })
            },
            updatePoiDetailInfo: function(i) {
                var o = this;
                this._data.poi = i;
                var a = i.extend(PanoPoi.TYPE.pano, PanoPoi.TYPE.poi).then(function() {
                    return "hotel" == i.poi.src ? i.extend(PanoPoi.TYPE.hotel) : "movie" == i.poi.src ? i.extend(PanoPoi.TYPE.movie) : void 0
                });
                return a.then(function() {
                    var a = POI_DETAIL_TEMPLATE({
                        panoPoi: i
                    });
                    o.infoPanel.setContent(a, getPanelMaxHeight()), o.infoPanel.fold(!0), o.dispatchEvent("poi_change", {
                        uid: i.getUid(),
                        x: i.pano.x,
                        y: i.pano.y
                    })
                })
            },
            setDetailContent: function(i, o) {
                if (i) {
                    var a = document.createElement("p");
                    a.innerHTML = '<i class="poi_default_icon"></i>' + i, a.className = "poi_title_text", this.infoPanel.setTitle(a)
                }
                var t = POI_DETAIL_TEMPLATE({
                    panoPoi: o
                });
                this.infoPanel.setContent(t, getPanelMaxHeight())
            },
            restorePoiInfo: function() {
                function i(i) {
                    for (var o = 0, a = i.length; a > o; o++)
                        for (var t in PanoPoi.prototype) i[o][t] = PanoPoi.prototype[t]
                }
                this._data = baidu.object.clone(this._saveData), this._data && this._data.poi && i([this._data.poi]), this._data && this._data.list && this._data.list.content && i(this._data.list.content), this.infoPanel.restore(), this._data.poi || !this._data.list || this._data.list.content || this.hide()
            },
            savePoiInfo: function() {
                this._saveData = baidu.object.clone(this._data), this._saveData || (this._saveData = {
                    poi: void 0,
                    list: void 0,
                    listUrl: void 0
                }), this.infoPanel.save()
            },
            updatePoiListInfo: function(i, o) {
                var a = this,
                    t = o ? util.getSearchResultFromUrl(i) : util.getSearchResultFromPCMap(i);
                if (!t) return null;
                var e = t.then(function(i, o) {
                    if (i.content && !(i.content.length <= 1)) {
                        var t = PanoPoi.initWithPoiSearchResult(i);
                        a._data.list = t, a._data.listUrl = o;
                        var e = POI_LIST_TEMPLATE({
                            panoPoiList: t
                        });
                        a.listPanel.setContent(e, getPanelMaxHeight())
                    }
                });
                return e
            },
            updateBusLineListInfo: function(i, o) {
                var a = new PanoPoi(i, o),
                    t = this,
                    e = a.extend(PanoPoi.TYPE.busline).then(function() {
                        var i = PanoPoi.initWithBuslineResult(a.busline, o);
                        t._data.list = i;
                        var e = BUSLINE_TEMPLATE({
                                poiList: i.content
                            }),
                            n = a.busline.buslineFullName.split("(")[1].split(")")[0],
                            p = '<p class="pano_popup_title">' + a.busline.buslineName + "(<span>" + n + "</span>)</p>";
                        t.listPanel.setContentHeader(p), t.listPanel.setContent(e, getPanelMaxHeight())
                    });
                return e
            },
            setSelect: function(i) {
                if (this._data.list) {
                    var o = this._data.list.content[i];
                    if (o) {
                        var a = this;
                        PanoPoi.prototype.extend.call(o, PanoPoi.TYPE.poi, PanoPoi.TYPE.pano).then(function() {
                            panoPoiIndex = void 0 !== o.pano.index ? o.pano.index : i;
                            var t = {
                                poiuid: o.poi.uid,
                                pid: o.pano.pid,
                                panoIId: o.pano.iid,
                                name: o.poi.name,
                                poiType: o.pano.belonging ? "interPoi" : "poi",
                                index: panoPoiIndex,
                                heading: o.pano.dir,
                                pitch: o.pano.pitch,
                                x: o.pano.x,
                                y: o.pano.y,
                                px: o.pano.panox,
                                py: o.pano.panoy,
                                rank: o.pano.rank || 100,
                                catalog: o.pano.catalog
                            };
                            a._removePoiSearchMarker(), a._addPoiSearchMarker([t])
                        })
                    }
                }
            },
            _addPoiSearchMarker: function(i) {
                var o = this;
                o._markerIds = [], util.each(i, function(i) {
                    i.markerId = util.getUniqueId("MARKER_"), o._markerIds.push(i.markerId)
                }), this.dispatchEvent("add_markers", i), this.dispatchEvent("poi_search_marker_changed", i)
            },
            _removePoiSearchMarker: function() {
                this._markerIds && this._markerIds.length && (this.dispatchEvent("remove_markers", this._markerIds), this._markerIds = null)
            },
            show: function() {
                return this.parentDom.style.visibility = "visible", this
            },
            hide: function() {
                return this.parentDom.style.visibility = "hidden", this
            },
            getShareParam: function() {
                if (!this._data.poi) return null;
                var i = this._panoContext.getPanoOptions(),
                    o = i.panoId;
                if (this._data.poi.pano) {
                    var a = this._data.poi.pano.pid;
                    if (o !== a) return null
                }
                var t = this._data.poi.getUid(),
                    e = {
                        uid: t
                    };
                return this._busLineUid && (e.busLineUid = this._busLineUid, e.ccode = this._busLineCityCode), e
            },
            getDetailPanoPoi: function() {
                return this._data.poi
            },
            dispose: function() {
                this.infoPanel.dispose(), this._busLineUid = void 0, this._busLineCityCode = void 0;
                var i = this.parentDom;
                i.innerHTML = "", i.parentNode.removeChild(i)
            },
            getSupportEvents: function() {
                return ["pano_changed", "animate_pano_changed", "show_position", "hide_position", "poi_search_marker_changed", "remove_markers", "add_markers", "status_changed", "inter_poi_changed", "add_search_marker", "poi_change"]
            }
        });
    module.exports = PoiInfoPanelModule
});;
define("pano:widget/module/PanoActivityModule/PanoActivityModule.js", function(t, i, e) {
    var a = t("pano:widget/base/ModuleClass.js"),
        n = t("pano:widget/base/service.js"),
        r = a.extend("PanoActivityModule", {
            initialize: function(t) {
                this._panoContext = t;
                var i = this;
                this._activityList = !1, this._currentPanoData = {
                    pid: "",
                    x: "",
                    y: ""
                }, this.markers = [], i.createActivityPic()
            },
            createActivityPic: function() {
                var t = T.dom.create("a", {
                        id: "activitypic",
                        style: "position:absolute;bottom:20px;right:60px;display:none;z-index:99999999"
                    }),
                    i = T.dom.create("img", {
                        id: "activityimg"
                    });
                t.appendChild(i), T.g("pano-expand-wrapper").appendChild(t)
            },
            showActivityPic: function(t) {
                var i = T.g("activitypic"),
                    e = T.g("activityimg");
                e.src = t.info_list[t.imageIndex].image_l, e.height = t.info_list[t.imageIndex].height, e.width = t.info_list[t.imageIndex].width, e.title = t.title, i.style.display = "block", i.href = t.info_list[t.imageIndex].url, i.target = "_blank"
            },
            hideActivityPic: function() {
                var t = T.g("activitypic");
                t.style.display = "none"
            },
            panoChanged: function(t, i, e, a) {
                if (this._currentPanoData = {
                        pid: t,
                        x: i,
                        y: e
                    }, this._activityList === !1) {
                    var r = this;
                    this._activityList = !0, n.getActiveData().then(function(t) {
                        r._activityList = t, r.checkActivity(a)
                    })
                } else this._activityList === !0 || this.checkActivity(a)
            },
            checkActivity: function(t) {
                for (var i = this._currentPanoData, e = this._activityList, a = e.length, n = [], r = 0; a > r; r++) {
                    var c = e[r];
                    if (1 == c.type) {
                        for (var s = 0, o = c.pids.data.length; o > s; s++)
                            if (i.pid == c.pids.data[s].pid) {
                                var h = c.pids.data[s],
                                    d = {
                                        center: {
                                            center_x: h.x,
                                            center_y: h.y,
                                            center_z: h.z
                                        },
                                        rank: c.rank,
                                        info_list: c.info_list,
                                        marker_pos: c.marker_pos,
                                        title: c.title,
                                        share_content: c.share_content,
                                        imageIndex: h.image_index
                                    };
                                n.push(d)
                            }
                    } else
                        for (var l = c.center.data, _ = l.length, v = 0; _ > v; v++) {
                            var p = Math.pow(l[v].center_x / 100 - i.x, 2),
                                g = Math.pow(l[v].center_y / 100 - i.y, 2),
                                m = Math.pow(c.range, 2);
                            if (m > p + g) {
                                var d = {
                                    center: l[v],
                                    rank: c.rank,
                                    info_list: c.info_list,
                                    marker_pos: c.marker_pos,
                                    title: c.title,
                                    share_content: c.share_content,
                                    imageIndex: l[v].image_index
                                };
                                n.push(d)
                            }
                        }
                }
                n.sort(function(t, i) {
                    return i.rank - t.rank
                });
                var a = n.length;
                if (0 !== a) {
                    var y = [];
                    0 !== n[0].marker_pos && "street" === t ? this.showActivityPic(n[0]) : this.hideActivityPic();
                    for (var s = 0; a > s; s++) {
                        var f = n[s];
                        if (0 === f.marker_pos) {
                            var k = {
                                name: f.title,
                                catalog: "FC01",
                                markerId: s + f.center.center_x + f.center.center_y + f.center.center_z,
                                x: f.center.center_x,
                                y: f.center.center_y,
                                rank: f.center.center_z,
                                imageUrl: f.info_list[f.imageIndex].image_l,
                                width: f.info_list[f.imageIndex].width,
                                height: f.info_list[f.imageIndex].height,
                                notSearchMarker: !0,
                                clickHandler: function(t) {
                                    return function() {
                                        window.open(t)
                                    }
                                }(f.info_list[f.imageIndex].url)
                            };
                            y.push(k)
                        }
                        if (n[s + 1] && n[s].rank > n[s + 1].rank) break
                    }
                    for (var u = [], x = 0; x < y.length; x++) u.push(y[x].markerId);
                    this.dispatchEvent("remove_markers", this.markers), this.markers = u, "street" === t && this.dispatchEvent("add_markers", y)
                } else this.hideActivityPic()
            },
            getSupportEvents: function() {
                return ["add_markers", "remove_markers"]
            }
        });
    e.exports = r
});;
define("pano:widget/module/PanoActiveLogo/PanoActiveLogo.js", function(o, i, e) {
    var t = o("pano:widget/base/service.js"),
        d = !1,
        g = null,
        n = null,
        a = {
            init: function(o) {
                var i = a;
                return o ? ((!T.g("logodom") || g !== o || d) && t.getActiveLogo(o, i.getLogoData, i.hide), g = o, void(i.hideFg = !1)) : void a.hideLogoDom()
            },
            getLogoData: function(o) {
                if (!o || o.url) {
                    var i = a,
                        e = o.position || [10, 10],
                        t = o.size || [230, 56],
                        d = o.url;
                    i.createLogoDom(e, t, d), i.show()
                }
            },
            createLogoDom: function(o, i, e) {
                var t = a;
                if (T.g("logodom")) return void(e !== n && t.updateLogoSrc(e));
                var d = T.dom.create("div", {
                        id: "logodom",
                        style: "position:absolute;top:" + o[0] + "px;right:" + o[1] + "px;width: " + i[0] + "px;height: " + i[1] + "px;z-index:99999999;display:none;"
                    }),
                    g = T.dom.create("img", {
                        id: "logoImg",
                        src: e,
                        height: i[1] + "px",
                        width: i[0] + "px"
                    });
                d.appendChild(g), T.g("pano-expand-wrapper").appendChild(d), n = e
            },
            updateLogoSrc: function(o) {
                T.g("logoImg").src = o, n = o
            },
            show: function() {
                var o = T.g("logodom");
                o && baidu.dom.show(o), d = !1
            },
            hide: function() {
                var o = T.g("logodom");
                o && T.hide(o), d = !0, g = null
            }
        };
    e.exports = a
});;
define("pano:widget/module/ShareMarkerModule/ShareMarkerModule.js", function(e, a, r) {
    var t = e("pano:widget/base/ModuleClass.js"),
        s = "share_marker_id",
        i = "be_share_marker_id",
        n = null,
        h = t.extend("ShareMarkerModule", {
            constructor: function() {},
            initialize: function(e) {
                if (this.markerPosition = null, this.shareMarkerContent = "看这里", this.$shareParam) {
                    var a = this.$shareParam[0];
                    a.pid = e, a.isAdd = !1, n = a, addStat(STAT_CODE.STAT_PANORAMA, {
                        item: "share.marker.revert"
                    })
                }
                this.enterShareStatus()
            },
            getSupportEvents: function() {
                return ["add_markers", "remove_markers", "change_flash_cursor_style", "sync_share_status", "add_marker_panel"]
            },
            getShareParam: function() {
                return this.markerPosition ? {
                    name: this.shareMarkerContent,
                    x: this.markerPosition[0],
                    y: this.markerPosition[1],
                    z: this.markerPosition[2]
                } : null
            },
            event_panoChanged: function(e) {
                n && (e === n.pid && n.isAdd === !1 ? this.setSharedMarkerVisiable(!0) : e !== n.pid && n.isAdd === !0 && this.setSharedMarkerVisiable(!1))
            },
            setSharedMarkerVisiable: function(e) {
                var a = n;
                a && (e ? (this.dispatchEvent("add_markers", [{
                    catalog: "FB01",
                    markerId: i,
                    name: a.name,
                    rank: 100 * a.y,
                    x: a.x,
                    y: a.z
                }]), a.isAdd = !0) : (this.dispatchEvent("remove_markers", [i]), a.isAdd = !1))
            },
            event_clickPosition: function(e, a, r, t, i) {
                addStat(STAT_CODE.STAT_PANORAMA, {
                    item: "share.marker.add"
                });
                var n = this;
                "" === this.shareMarkerContent && (this.shareMarkerContent = "看这里"), this.markerPosition = [e, r, a], this.dispatchEvent("remove_markers", [s]), this.dispatchEvent("add_markers", [{
                    catalog: "FB01",
                    markerId: s,
                    name: this.shareMarkerContent,
                    rank: 100 * a,
                    x: e,
                    y: r,
                    autoHide: !1,
                    isEditable: !0,
                    editHandler: function(e) {
                        n.shareMarkerContent = e, addStat(STAT_CODE.STAT_PANORAMA, {
                            item: "share.marker.edit"
                        }), n.dispatchEvent("sync_share_status")
                    },
                    deleteIconClickHandler: function() {
                        n.markerPosition = null, n.dispatchEvent("remove_markers", [s]), n.dispatchEvent("change_flash_cursor_style", "mark"), n.dispatchEvent("sync_share_status"), n.dispatchEvent("add_marker_panel", [!1])
                    }
                }]), this.dispatchEvent("sync_share_status");
                var h = {
                    rank: 100 * a,
                    x: e,
                    y: r,
                    name: this.shareMarkerContent,
                    screenX: t,
                    screenY: i,
                    markerId: s
                };
                this.dispatchEvent("add_marker_panel", [!0, h])
            },
            updateMarkerContent: function(e) {
                this.shareMarkerContent = e, this.dispatchEvent("sync_share_status")
            },
            enterShareStatus: function() {
                this.setSharedMarkerVisiable(!1)
            },
            exitShareStatus: function() {
                this.markerPosition = null, this.shareMarkerContent = "", this.dispatchEvent("remove_markers", [s]), this.dispatchEvent("sync_share_status"), this.setSharedMarkerVisiable(!0)
            },
            hasBeSharedMarker: function() {
                return n ? !0 : !1
            }
        });
    r.exports = h
});;
define("pano:widget/eventImplements.js", function(o, e, a) {
    var t = o("pano:widget/base/MapContext.js"),
        n = o("pano:widget/base/PanoContext.js"),
        r = o("pano:widget/module/PanoShareModule/PanoShareModule.js"),
        i = o("pano:widget/module/ShareMarkerModule/ShareMarkerModule.js"),
        l = (o("pano:widget/base/service.js"), o("pano:widget/module/PanoModule/PanoModule.js")),
        d = o("pano:widget/module/PanoToolModule/PanoToolModule.js"),
        u = o("pano:widget/module/PanoOverviewModule/PanoOverviewModule.js"),
        s = o("pano:widget/module/PanoGuideModule/PanoGuideModule.js"),
        p = o("pano:widget/module/PanoLayoutManager/PanoLayoutManager.js"),
        g = o("pano:widget/module/PanoCopyrightModule/PanoCopyrightModule.js"),
        c = o("pano:widget/module/PoiInfoPanelModule/PoiInfoPanelModule.js"),
        M = o("pano:widget/module/ClassifySearchModule/ClassifySearchModule.js"),
        P = (o("pano:widget/module/PanoIndoorPoiModule/PanoIndoorPoiModule.js"), o("common:widget/ui/indexUtil/IndexUtil.js"), o("pano:widget/model/PanoPoi.js")),
        m = o("pano:widget/base/util.js"),
        f = o("pano:widget/module/PanoLoading/PanoLoading.js"),
        h = o("pano:widget/module/PanoMessageBox/PanoMessageBox.js"),
        v = o("pano:widget/Transition/Transition.js"),
        _ = o("pano:widget/module/PanoShareModule/PanoShareUtil.js"),
        x = o("common:widget/com/componentManager.js"),
        b = o("pano:widget/StreetViewTool/StreetViewTool.js"),
        k = o("pano:widget/module/PanoActivityModule/PanoActivityModule.js"),
        w = o("pano:widget/module/PanoPreviewModule/PanoPreviewModule.js"),
        C = o("pano:widget/module/PoiSearchModule/PoiSearchModule.js");
    o.loadCss({
        content: ".pano_content_box,.pano_button{background-color:rgba(37,37,37,.9);*background-color:#252525;filter:alpha(opacity=90);border-radius:2px 2px 0 0}.panoActivityIcon{display:none;position:absolute;width:200px;height:120px;cursor:pointer;background-image:url(//webmap1.bdimg.com/wolfman/static/pano/images/pano_whole/activity_icon_c1eb35e.png);_background-image:url(//webmap1.bdimg.com/wolfman/static/pano/images/pano_whole/activity_icon_ie6_dbde767.png);right:55px;bottom:140px;z-index:100009}.pano_lottery{display:block;position:absolute;z-index:100110;height:100%;width:100%;border:0;top:0;left:0}"
    }), o.loadCss({
        content: '@charset "utf-8";.marker_common_background_normal{background-color:#252525;border:1px solid #252525;height:28px;border-radius:2px;white-space:nowrap;cursor:pointer;text-align:center}.marker_common_background_hover{background-color:#252525;border:1px solid #008FF5;height:28px;border-radius:2px;white-space:nowrap;cursor:pointer;text-align:center}.marker_entrance_left_background_normal{background:url(//webmap1.bdimg.com/wolfman/static/pano/images/webgl/markers_icon_f9217aa.png) no-repeat -30px -2px;width:63px;height:30px;display:inline-block;vertical-align:middle;cursor:pointer}.marker_entrance_left_background_hover{background:url(//webmap1.bdimg.com/wolfman/static/pano/images/webgl/markers_icon_f9217aa.png) no-repeat -97px -2px;width:63px;height:30px;display:inline-block;vertical-align:middle;cursor:pointer}.marker_entrance_right_background_normal{background-color:#252525;border:1px solid #252525;border-left:0;height:28px;padding-left:2px;display:inline-block;vertical-align:middle;cursor:pointer}.marker_entrance_right_background_hover{background-color:#252525;border:1px solid #008FF5;border-left:0;height:28px;padding-left:2px;display:inline-block;vertical-align:middle;cursor:pointer}.marker_icon_default{background:url(//webmap1.bdimg.com/wolfman/static/pano/images/webgl/markers_icon_f9217aa.png) no-repeat -102px -49px;width:18px;height:18px;margin:5px 0 5px 8px;display:inline-block;vertical-align:top}.marker_icon_01FF{background-position:-1px -50px}.marker_icon_010A{background-position:-24px -50px}.marker_icon_010A03{background-position:-43px -50px}.marker_icon_010A05{background-position:-64px -50px}.marker_icon_010B{background-position:-83px -48px}.marker_icon_010C{background-position:-102px -49px}.marker_icon_010D{background-position:-123px -48px}.marker_icon_010E{background-position:-143px -50px}.marker_icon_010F{background-position:-163px -49px}.marker_icon_0101{background-position:-184px -49px}.marker_icon_0102{background-position:-203px -50px}.marker_icon_0103{background-position:-222px -50px}.marker_icon_0104{background-position:-241px -50px}.marker_icon_0105{background-position:-261px -49px}.marker_icon_0106{background-position:-281px -50px}.marker_icon_0107{background-position:-303px -50px}.marker_icon_0108{background-position:-324px -50px}.marker_icon_FA02,.marker_icon_FA03{width:28px;height:28px;margin:0;padding:0;display:inline-block;vertical-align:top;background:url(//webmap1.bdimg.com/wolfman/static/pano/images/webgl/marker_ui_cc099df.png);background-position:-184px -35px}.marker_icon_FA03{background-position:-212px -35px}.marker_icon_01FE{background-position:-737px 0}.marker_icon_FF01{background-position:-11px -83px}.marker_icon_FF02{background-position:-342px -50px}.marker_bottom_FF01{background:url(//webmap1.bdimg.com/wolfman/static/pano/images/webgl/markers_icon_f9217aa.png) no-repeat -79px -78px;width:24px;height:32px;margin:6px auto;cursor:default}.marker_bottom_FF02{background:url(//webmap1.bdimg.com/wolfman/static/pano/images/webgl/markers_icon_f9217aa.png) no-repeat -361px -46px;width:23px;height:32px;margin:6px auto;cursor:default}.marker_bottom_mark{background:url(//webmap1.bdimg.com/wolfman/static/pano/images/webgl/markers_icon_f9217aa.png) no-repeat -387px -46px;width:23px;height:32px;margin:6px auto;cursor:default}.marker_commercialize_mark{background:url(//webmap1.bdimg.com/wolfman/static/pano/images/webgl/marker_ui_cc099df.png);background-position:-184px -82px;width:25px;height:37px;margin:0 auto;cursor:pointer;z-index:100;position:relative}.marker_commercialize_topu_mark{background:url(//webmap1.bdimg.com/wolfman/static/pano/images/webgl/marker_ui_cc099df.png);background-position:-245px -81px;width:66px;height:44px;margin:0 auto;cursor:pointer;z-index:100;position:relative}.marker_bottom_mark_label{font-size:14px;color:#FFF;position:relative;top:3px;left:7px}.marker_title_label{font:400 12px Microsoft YaHei,Apple LiSung Light;color:#EBF0F5;line-height:28px;margin:0 6px;display:inline-block;vertical-align:top}.marker_separator{background:url(//webmap1.bdimg.com/wolfman/static/pano/images/webgl/markers_icon_f9217aa.png) no-repeat -167px -6px;width:2px;height:14px;margin-top:7px;display:inline-block;vertical-align:top}.marker_distance_label{font:400 12px Microsoft YaHei,Apple LiSung Light;color:#3DAEFF;margin:0 8px 0 6px;display:inline-block;line-height:28px;vertical-align:top}.marker_oprational_icon{display:inline-block;vertical-align:middle;width:128px;height:128px;cursor:pointer}.marker_operational_panel_bg{background-color:#252525;border:1px solid #252525;height:30px;white-space:nowrap;position:relative;left:-10px;display:inline-block;vertical-align:middle}.marker_operational_panel_bg_hide{display:none}.marker_tag_background_normal{}.marker_input_normal{height:22px;border:1px solid #53565C;background-color:#3a3b40;display:inline-block;color:#D3D8DB;font:400 12px "STHeiti Light [STXihei]",Apple LiSung Light;padding-left:4px}.marker_tag_close_icon{background:url(//webmap1.bdimg.com/wolfman/static/pano/images/webgl/markers_icon_f9217aa.png) no-repeat -33px -85px;width:17px;height:17px;display:inline-block;vertical-align:middle;margin-left:10px;cursor:pointer}.marker_tag_btn_panel{display:inline-block;vertical-align:middle}.marker_tag_btn{font:400 12px Microsoft YaHei,Apple LiSung Light;color:#939799;display:inline-block;vertical-align:middle;margin:0 10px;cursor:pointer}.marker_tag_separator{background:url(//webmap1.bdimg.com/wolfman/static/pano/images/webgl/markers_icon_f9217aa.png) no-repeat -167px -6px;width:2px;height:15px;display:inline-block;vertical-align:middle}.marker_tag_bottom_mark{background:url(//webmap1.bdimg.com/wolfman/static/pano/images/webgl/markers_icon_f9217aa.png) no-repeat -105px -79px;width:26px;height:37px;margin:6px auto;cursor:pointer}.marker_tag_label{font:400 12px "Microsoft YaHei","Apple LiSung Light";color:#EBF0F5;margin:6px 10px;display:inline-block;vertical-align:top}'
    });
    var y, S, I, O, A = null,
        E = 1e4,
        L = function(e, a, t) {
            var n = e.currentPoint ? new BMap.Point(e.currentPoint.x, e.currentPoint.y) : new BMap.Point(e.panoMCPoint.x, e.panoMCPoint.y),
                r = P.getInstaceByPanoId(e.panoId);
            r && (e.uid = r.getUid());
            var i = re.root.getModule("PanoIndoorPoiModule");
            i && "inter" == e.panoType && (e.uid = i.getCurrentUid());
            var l = b.getShareInstance();
            if (window.panoExitMarker) {
                if (window.panoExitMarker.show(e, n, a), t && window.panoExitMarker.set("from", t), !l || !l.isOpen) return void panoExitMarker.hide()
            } else o.async("pano:widget/module/PanoExitMarker/PanoExitMarker.js", function(o) {
                var r = new o;
                return r.initialize(e, n, a), window.panoExitMarker = r, t && window.panoExitMarker.set("from", t), l && l.isOpen ? void 0 : void r.hide()
            })
        },
        N = function(o, e, a) {
            var t = re.root.getModule("TrafficModule");
            Y(), a || y.getCurrentCity(function(a) {
                if (a)
                    if (a.cityId != y.getPCMapCity().cityId) x.go("cur&wd=" + encodeURIComponent(a.cityName), {
                        cinfo: {
                            isFromPano: !0
                        },
                        onload: function() {
                            L(o, e)
                        }
                    });
                    else if (t) {
                    var n = null;
                    t.isNav() ? n = "nav" : t.isBus() ? n = "bus" : t.isWalk() && (n = "walk"), L(o, e, n)
                } else L(o, e)
            })
        },
        F = !1,
        D = 0,
        V = null,
        B = null,
        U = null,
        j = {},
        R = function(o) {
            j[o.type] ? (o.source = j[o.type], j[o.type] = null) : o.source = "PanoModule"
        },
        z = function(o) {
            var e = re.root.getModule("PanoCopyrightModule"),
                a = I.getModuleContainer("PanoCopyrightModule");
            o.panoCopyright && e && ("inter" === o.panoType ? (e.render(a, o), H({
                uid: null,
                x: o.panoMCPoint.x,
                y: o.panoMCPoint.y
            })) : (o.panoCopyright.roadName || (o.panoCopyright.roadName = "未知道路"), e.render(a, o), H({
                uid: null,
                x: o.panoMCPoint.x,
                y: o.panoMCPoint.y
            })))
        },
        H = function(o) {
            function e(o, e) {
                var a = T.g(o);
                e || !a ? setTimeout(function() {
                    a = T.g(o), a && a.setAttribute("href", i)
                }, 1e3) : a.setAttribute("href", i)
            }
            if (!o.uid) {
                var a = re.root.getModule("PanoModule").getPanoOptions();
                if ("inter" == a.panoType) {
                    var t = re.root.getModule("PanoIndoorPoiModule");
                    t && (o.uid = t.getCurrentUid())
                } else {
                    var t = re.root.getModule("PoiInfoPanelModule");
                    if (t) {
                        var n = t.getDetailPanoPoi();
                        n && (o.uid = n.uid)
                    }
                }
            }
            var r = {
                    uid: o.uid || "",
                    location: o.x + "," + o.y,
                    from: "pcmap"
                },
                i = m.getUgcUploadUrl(r);
            e("pano-upload-link"), e("ugc-upload-item", !0), e("tool-ugc-upload")
        },
        G = function(o) {
            if (!o) return void re.root.safeCall("PanoModule", "closePano");
            var e = m.parseUrlParam(o);
            if (e && e.panoid && e.panotype) {
                var a = m.revertStreetView(e);
                a.panoShareParam && (a.panoShareParam = decodeURIComponent(a.panoShareParam)), re.showPano(null, a)
            }
        },
        Y = function() {
            function o() {
                var o = re.root.getModule("PanoModule"),
                    e = re.root.getModule("PanoOverviewModule"),
                    a = {},
                    t = [];
                if (o && o.getPanoOptions()) {
                    a.data = o.getPanoOptions() || {}, e && (a.iid = e.getInnerId()), a.shareParam = re.root.getShareParam(), a.level = y.getLevel();
                    var n = _.prepareShareParam(a);
                    for (var r in n) null != n[r] && t.push(r + "=" + n[r]);
                    U = t.join("&");
                    var i = window.location;
                    "#" + U != i.hash && m.setHash("#" + U)
                }
            }
            B && clearTimeout(B), B = setTimeout(function() {
                o()
            }, 500)
        },
        Z = function() {
            this._mask = null, this._timouter = null, this._init = function() {
                if (!this._mask) {
                    var o = this._mask = document.createElement("div");
                    o.style.cssText = ["top:0", "left:0", "position:absolute", "width:100%", "height:100%", "background-color:black", "filter:alpha(opacity=0)", "opacity:0", "z-index:200001"].join(";")
                }
            }, this.dispose = function() {
                this._mask.parentNode.removeChild(this._mask), this._mask = null
            }, this.show = function() {
                var o = this;
                this._mask || o._init();
                var e = document.getElementById("pano-container");
                e.appendChild(this._mask), this._timouter = setTimeout(function() {
                    o.hide()
                }, 8e3)
            }, this.hide = function() {
                this._mask && (null !== this._timouter && clearTimeout(this._timouter), this._mask.parentNode && this._mask.parentNode.removeChild(this._mask))
            }
        },
        W = new Z,
        Q = new Z,
        X = function(o) {
            return o >= 7 ? !0 : !1
        },
        q = function(o) {
            return 8 === o || 10 === o || 19 === o || 20 === o || 21 === o
        },
        J = function() {
            var o = re.root.getModule("PanoModule"),
                e = o.getPanoOptions(),
                a = o.getPanoCopyright();
            e && a && (a && q(a.dataProviderIndex) ? re.root.safeCall("PanoToolModule", "updateUGCPanel", [!0, e.panoId]) : re.root.safeCall("PanoToolModule", "updateUGCPanel", [!1, e.panoId]))
        },
        K = void 0,
        $ = void 0,
        oe = void 0,
        ee = void 0,
        ae = !1,
        te = void 0,
        ne = [],
        re = {
            _initialize: function() {
                var o = re.root.getModule();
                y = new t(o), S = new n(o)
            },
            showPanoPreview: function(o, e) {
                var a = S.getPanoUrlConfig(),
                    t = document.body,
                    n = [{
                        module: w,
                        args: [t, a, y]
                    }],
                    r = re.root.bootstrap(n);
                r.then(function() {
                    re.root.getModule("PanoPreviewModule").showPanoPreview(e), addStat(STAT_CODE.STAT_PANORAMA, {
                        item: "pano-preview-click"
                    })
                })
            },
            pano_preview_click: function(o) {
                re.root.safeCall("PanoPreviewModule", "closePanoPreview");
                var e = o.data,
                    a = {};
                e.x && e.y && (a = new BMap.Point(e.x, e.y));
                var t = e.dir || 0;
                v.checkSupport(e.from), v.enter(null, null, a, t, function() {
                    addStat(STAT_CODE.STAT_PANORAMA, {
                        item: "pano-enter-from-preview"
                    }), re.showPano(o, e)
                })
            },
            closePanoPreview: function() {
                re.root.safeCall("PanoPreviewModule", "closePanoPreview")
            },
            showPano: function(o, e) {
                m.isHashChangeListing() === !1 && m.onHashChange(G);
                var a = b.getShareInstance();
                if (a && a.disableEscapeQuit(), $ = e.panoType, K = e.uid || e.poiUid, e.playRouteVideo && (D = 1), e.research === !0) {
                    var t = e.searchParam.uid,
                        n = (e.searchParam.index, new P(t));
                    return void n.extend(P.TYPE.pano).then(function() {
                        var o = n.pano,
                            a = void 0,
                            r = e.searchParam.index;
                        a = [{
                            poiuid: t,
                            pid: o.pid,
                            panoIId: o.iid,
                            poiType: o.belonging ? "interPoi" : "poi",
                            name: o.name,
                            index: void 0 !== r ? r : -1,
                            heading: o.dir,
                            pitch: o.pitch,
                            x: o.x,
                            y: o.y,
                            px: o.panox,
                            py: o.panoy,
                            rank: o.rank || 100,
                            catalog: o.catalog
                        }], o.belonging && (ee = t), re.showPano(null, {
                            panoMarkers: a,
                            panoId: "street" == $ ? o.pid : o.belonging ? o.pid : void 0,
                            panoIId: "inter" == $ ? o.iid : void 0,
                            uid: t,
                            panoType: $,
                            point: new BMap.Point(o.x / 100, o.y / 100),
                            panoHeading: "inter" === $ ? void 0 : o.dir,
                            panoPitch: o.pitch
                        })
                    })
                }
                I || (I = new p, I.initialize(re.root.getModule(), document.body));
                var r = I.getModuleContainer("PanoModule"),
                    i = S.getPanoUrlConfig(),
                    d = [{
                        module: l,
                        args: [r, i, y]
                    }],
                    u = oe = e.from;
                ("nav" === u || "bus" === u || "walk" === u || "buswalk" === u || "share" === u) && d.push({
                    module: "TrafficModule",
                    args: [u, e.panoShareParam, null, I.getModuleContainer("ui-layer"), [e], D]
                }), d.push({
                    module: k,
                    args: []
                }), e.panoShareParam && (e.panoShareParam.PanoIndoorPoiModule && "inter" == e.panoType && (ee = e.panoShareParam.PanoIndoorPoiModule.uid), e.panoShareParam.VideoPlayer && (te = e.panoShareParam.VideoPlayer), e.panoShareParam.VideoPlayer && m.isSupportVideo() && d.push({
                    module: "VideoPlayer",
                    args: [e.panoShareParam.VideoPlayer]
                }), e.panoShareParam.ShareMarkerModule && d.push({
                    module: "ShareMarkerModule",
                    args: [e.panoId]
                }));
                var s = re.root.bootstrap(d);
                s.then(function() {
                    var o = re.root.getModule("TrafficModule");
                    if ("share" !== u && o && o.isEnable()) {
                        var a = o.getClosestPoint(e.panoId, e.point.lat, e.point.lng);
                        a && (e.panoId = a.pid, e.point.lat = a.y, e.point.lng = a.x, e.panoHeading = a.dir), e.panoMarkers = []
                    }
                    re.root.getModule("PanoModule").showPano(e), I.getModuleContainer("PanoRoot").style.visibility = "visible"
                }), m.isSupportChangeStatus() && location.search && history.replaceState({}, 0, location.pathname), y.getCurrentCity(function(o) {
                    MapLogReport.send({
                        da_src: "pcmapPanoPG.PGshow",
                        cityid: o.cityId,
                        panotype: $
                    })
                })
            },
            closePano: function() {
                re.root.shutdown(), I.getModuleContainer("PanoModule").innerHTML = "", I.getModuleContainer("PanoRoot").style.visibility = "hidden", I.dispose(), I = null, K = null, ee = null, m.stopClock("panoVideoPlayTime"), m.clearHash("");
                var o = b.getShareInstance();
                o && o.enableEscapeQuit(), m.offHashChange()
            },
            "PanoModule:pov_changed": function(o) {
                R(o), re.root.safeCall("PanoOverviewModule", "event_povChanged", [o]), re.root.safeCall("PanoShareModule", "hideExtraPanel", [o]), Y()
            },
            "PanoModule:zoom_changed": function(o) {
                R(o);
                var e = re.root.getModule("PanoToolModule");
                e && e.updateFishBone(o.data), e && e.updateMaxMinZoomTool(o.data), re.root.safeCall("PanoShareModule", "hideExtraPanel", [o]), Y(), Q && Q.hide()
            },
            "PanoModule:visible_changed": function(o) {
                if (o.data.visible === !0 && (I.getModuleContainer("PanoRoot").style.visibility = "visible"), 0 == o.data.visible) {
                    var e = y.getOverviewLevel() || window.map.getZoom();
                    o.data.panoOptions && N(o.data.panoOptions, e, o.data.cityName), re.closePano(), A = void 0, D = 0
                }
            },
            "PanoModule:indoor_enter": function(o) {
                if (o.currentTarget.panoMarkers && 0 !== o.currentTarget.panoMarkers.length) var e = o.currentTarget.panoMarkers[0].poiType;
                var a, t = o.data.hasImage,
                    n = !1,
                    r = baidu.g("pano-return-btn");
                r.style.left = "18px", ee ? (a = ee, ee = null, ae = !0, n = !0) : a = o.data.poiuid;
                var i = new P(a);
                i.extend(P.TYPE.indoorPoi, P.TYPE.pano).then(function() {
                    if (i.indoorPoi.businessData || i.indoorPoi.base || i.indoorPoi.abstract) {
                        var o = re.root.safeCall("PanoModule", "getIndoorModel");
                        if (!X(o.maxImgLevel)) {
                            var e = re.root.getModule("PanoModule"),
                                n = e.getPanoOptions();
                            if (!n || "street" !== n.panoType) {
                                re.root.safeCall("PoiSearchModule", "hide"), re.root.safeCall("PoiInfoPanelModule", "hide");
                                var r = re.root.getModule("PanoIndoorPoiModule");
                                if (r) r.event_poi_change(i, a);
                                else {
                                    var l = re.root.getModule("PanoModule"),
                                        d = l.getPanoOptions();
                                    i.indoorPoi.pid = d.panoId, re.root.bootstrap({
                                        module: "PanoIndoorPoiModule",
                                        args: [I.getModuleContainer("PanoIndoorPoiModule"), i.indoorPoi, t, a]
                                    })
                                }
                            }
                        }
                    }
                }), re.root.safeCall("PanoOverviewModule", "event_indoorEnter", [o]), re.root.safeCall("PanoGuideModule", "event_indoorEnter", [o]), re.root.safeCall("PanoToolModule", "setItemsEnable", [
                    [!1]
                ]), re.root.safeCall("ClassifySearchModule", "_removeClassifySearchMarkers"), re.root.safeCall("PoiInfoPanelModule", "_removePoiSearchMarker"), ("poi" === e || "share" === oe && "street" === $) && re.root.safeCall("PanoModule", "removePanoModuleMarker");
                var l = re.root.getModule("PanoGuideModule"),
                    d = re.root.getModule("TrafficModule"),
                    u = re.root.getModule("PanoOverviewModule");
                d && d.hide(), d && l && (d.setHeaderVisible(!1), I.resetFuncAreaModule(l), u && u.floorWrapper && I.restoreFuncAreaDoms([u.floorWrapper])), y.getCurrentCity(function(o) {
                    var e = re.root.safeCall("PanoModule", "getIndoorModel");
                    e && X(e.maxImgLevel) ? addStat(STAT_CODE.STAT_PANORAMA, {
                        item: "billion-pixels-enter",
                        cityname: o.cityName
                    }) : addStat(STAT_CODE.STAT_PANORAMA, {
                        item: "indoorview-enter",
                        cityname: o.cityName
                    })
                })
            },
            indoor_exit: function(o, e) {
                if (o.currentTarget.panoMarkers && 0 !== o.currentTarget.panoMarkers.length) var a = o.currentTarget.panoMarkers[0].poiType;
                j.pano_changed = null;
                var t = re.root.safeCall("PanoIndoorPoiModule", "getBizMarkers");
                t && t.length > 0 && re.remove_markers(void 0, t), re.root.shutdown("PanoIndoorPoiModule");
                var n = e.pano_change_dispatcher,
                    r = re.root.getModule("PoiInfoPanelModule"),
                    i = re.root.getModule("PoiSearchModule"),
                    l = baidu.g("pano-ui-layer");
                if (l.style.left = "0", "returnButton" == n) i && (i.show(), i.expandDetail(2e3), O = e.data.uid);
                else if ("PanoOverviewModule" != n || K) {
                    var d = new P(e.data.uid);
                    d.extend(P.TYPE.pano).then(function() {
                        r && (O = e.data.uid, K ? ae ? (i.setData(d, !1, !0, A || O, !0), ae = !1) : i.setData(d, !0, !0, A || K, !0) : i.setData(d, !1, !0, A, !0), i.show())
                    })
                } else i.show(), i.expandDetail(2e3);
                re.root.safeCall("PanoModule", "showPanoModuleMarker"), ("interPoi" === a || "share" === oe && "inter" === $) && re.root.safeCall("PanoModule", "removePanoModuleMarker");
                var u = re.root.getModule("PanoGuideModule"),
                    s = re.root.getModule("TrafficModule");
                s && s.show(), s && u && s.isEnable() ? (s.setHeaderVisible(!0), I.resetFuncAreaModule(s)) : re.root.safeCall("PanoToolModule", "setItemsEnable", [
                    [!0]
                ]), re.root.safeCall("PanoOverviewModule", "event_exitIndoor", [o]), re.root.safeCall("PanoGuideModule", "event_exitIndoor", [o])
            },
            "PanoModule:indoor_plan_id_changed": function(o) {
                var e = re.root.getModule("PanoOverviewModule");
                e && e.event_indoorIdChanged(o)
            },
            "PanoModule:indoor_floor_changed": function(o) {
                var e = re.root.getModule("PanoOverviewModule");
                e && e.event_floorChanged(o);
                var a = re.root.getModule("PanoGuideModule");
                a && a.event_floorChanged(o)
            },
            after_pano_changed: function(o, e) {
                re.root.safeCall("PanoShareModule", "dispose");
                var a = re.root.getModule("TrafficModule");
                if (!a || !a.isEnable()) {
                    var t = re.root.getModule("PanoActivityModule");
                    t.panoChanged(e.data.panoId, e.data.panoMCPoint.x, e.data.panoMCPoint.y, e.data.panoType)
                }
                var n = re.root.getModule("PanoModule"),
                    r = n.getPanoCopyright(),
                    i = n.getPanoTimeline(),
                    l = n.getPanoTimeThrough();
                if (r) {
                    r.roadName
                }
                R(o), re.root.shutdown("PanoMessageBox"), z(e.data);
                var d = e.pano_change_dispatcher,
                    u = re.root.getModule("PanoOverviewModule"),
                    s = re.root.getModule("PanoGuideModule");
                if (u) {
                    if ("inter" !== e.data.panoType) {
                        u.event_panoChanged(o);
                        var p = re.root.getModule("TrafficModule");
                        if (p && !p.isNav()) u.initTrafficLayer();
                        else if (p && p.isNav()) {
                            var g = p.getRoutPoints();
                            u.drawLine(g, 3), g = p.getMarkers(), u.addMarkers(g)
                        }
                    }
                    s && "inter" === e.data.panoType && s.updateCatalog(e.data.panoId)
                }
                if (s && ("InterPoi" != d || "inter" == e.data.panoType && "street" == e.last_data.panoType) && s.update(o.data.panoId, o.data.floor, e.last_data.panoType, e.data.panoType, d, l, i), J(), X(e.data.maxImgLevel) ? (re.root.safeCall("PanoToolModule", "setItemsEnable", [
                        [!1, !1, !0, !0, !0, null, !0]
                    ]), re.root.safeCall("PanoToolModule", "setTilesLevelLimitValue", [e.data.maxImgLevel - 3, 1])) : (re.root.safeCall("PanoToolModule", "setInfoDialogVisible", [!1]), re.root.safeCall("PanoToolModule", "setTilesLevelLimitValue", [4, 1]), re.root.safeCall("PanoToolModule", "setItemsEnable", [
                        [null, !0, null, !1, !0, null, !0]
                    ])), "inter" == e.data.panoType && "InterPoi" != d) {
                    re.root.safeCall("PoiInfoPanelModule", "hide"), re.root.safeCall("PoiSearchModule", "hide");
                    var c = re.root.getModule("PanoIndoorPoiModule");
                    if (c) {
                        var M = re.root.getModule("PanoModule"),
                            m = M.getPanoIndoorData();
                        if (c.getCurrentUid() != m.poiuid) {
                            var f = new P(m.poiuid);
                            f.extend(P.TYPE.indoorPoi).then(function() {
                                c.event_poi_change(f, m.poiuid)
                            })
                        }
                        var h = c.getBizMarkers();
                        h.length > 0 && (re.root.safeCall("PanoModule", "removeMarkers", [h]), c.clearBizMarkers()), c.addBizIndoorMarker(m.currentPid)
                    }
                }
                re.root.safeCall("TrafficModule", "event_panoChanged", [o.data.panoId]), "inter" !== e.data.panoType && re.root.safeCall("ClassifySearchModule", "updateClassifySearch"), re.root.safeCall("ShareMarkerModule", "event_panoChanged", [o.data.panoId]), Y()
            },
            show_billion_pixels_dialog: function() {
                re.root.safeCall("PanoToolModule", "setInfoDialogVisible", [!0])
            },
            deselect_poi: function() {
                return O ? void(O = null) : void re.root.safeCall("PoiSearchModule", "restorePoiInfo")
            },
            pano_error: function(o) {
                var e = "",
                    a = "",
                    t = "";
                t = o.returnUid;
                var n = o.cityName;
                switch (o.data) {
                    case "IO_ERROR":
                        e = "网络异常，请重新加载!", a = "error", v.close();
                        break;
                    case "NO_PANO":
                        e = "抱歉, 该地方没有全景";
                        break;
                    case "OUTOF_RANGE":
                        e = "您已超出导航路线", a = "alert";
                        break;
                    case "CHANGE_CITY":
                        e = "是否退出全景，查看" + n + "地图？";
                        break;
                    default:
                        e = "抱歉错误了，请重新加载!", a = "error"
                }
                W.hide(), re.root.bootstrap({
                    module: h,
                    args: [{
                        container: I.getModuleContainer("PanoMessageBoxModule"),
                        data: {
                            info: e,
                            funtype: a,
                            returnUid: t,
                            cityName: n
                        }
                    }]
                })
            },
            "PanoModule:pano_player_error": function() {
                var o = "抱歉错误了，请重新加载",
                    e = "error";
                W.hide(), re.root.bootstrap({
                    module: "PanoMessageBox",
                    args: [{
                        container: I.getModuleContainer("PanoMessageBoxModule"),
                        data: {
                            info: o,
                            funtype: e
                        }
                    }]
                })
            },
            after_go_to_poi: function(o, e) {
                if (R(o), e.id) {
                    var a = e.id,
                        t = new P(a);
                    t.extend(P.TYPE.pano, P.TYPE.indoorPoi).then(function() {
                        var o = re.root.getModule("PanoGuideModule").getSelectAlbumItem(),
                            e = re.root.getModule("PanoModule").getPanoOptions();
                        if (o && o.data.uid === a && "inter" != e.panoType ? re.root.getModule("PanoModule").drawLineToPoint(o.data.uid, o.pos.x, o.pos.y, t.pano.x, t.pano.y, t.pano.rank, function() {
                                W.hide()
                            }) : W.hide(), "inter" == e.panoType) {
                            var n = re.root.getModule("PanoIndoorPoiModule");
                            n && n.event_poi_change(t, a)
                        } else {
                            var r = re.root.getModule("PoiInfoPanelModule"),
                                i = re.root.getModule("PoiSearchModule");
                            r && i.setData(t, !1, !0, A, !0)
                        }
                        Y()
                    })
                } else W.hide()
            },
            once_tiles_complete: function() {
                v.enableAutoutoClose();
                var o = re.root.getModule("PanoModule"),
                    e = o.getPanoOptions(),
                    a = o.getPanoIndoorData(),
                    t = o.getPanoTimeThrough(),
                    n = o.getPanoTimeline();
                e && (e.panoCopyright = o.getPanoCopyright());
                var r = "street" === e.panoType,
                    i = m.createTask({
                        timeout: 1e4
                    });
                !r && a && (a.currentPid = e.panoId);
                var l = function() {
                        return re.root.bootstrap({
                            module: u,
                            args: [{
                                context: {
                                    mapContext: y,
                                    panoContext: S
                                },
                                parent: I.getModuleContainer("PanoOverviewModule"),
                                isStreet: r,
                                data: r ? e : a,
                                indoorModel: o.getIndoorModel(),
                                zIndex: E + 10,
                                level: re.root.isEnterFromShareLink() ? 16 : window.map.getZoom()
                            }]
                        })
                    },
                    p = function() {
                        re.root.bootstrap({
                            module: g,
                            args: []
                        });
                        var o = new T.Deferred;
                        return "inter" === e.panoType ? (e.iid = a.innerId, e.uid = a.poiuid, re.root.getModule("PanoCopyrightModule").render(I.getModuleContainer("PanoCopyrightModule"), e), o.resolve()) : (e.panoCopyright.roadName || (e.panoCopyright.roadName = "未知道路"), re.root.getModule("PanoCopyrightModule") && re.root.getModule("PanoCopyrightModule").render(I.getModuleContainer("PanoCopyrightModule"), e), o.resolve()), o
                    },
                    M = function() {
                        return re.root.bootstrap({
                            module: d,
                            args: [I.getModuleContainer("PanoToolModule")]
                        })
                    },
                    P = function() {
                        return re.root.bootstrap({
                            module: s,
                            args: [I.getModuleContainer("PanoGuideModule"), {
                                albumImageDomain: S.getPanoUrlConfig().PANO_3DIMAGE_URL,
                                data: e,
                                indoorData: a,
                                indoorModel: o.getIndoorModel(),
                                zIndex: E + 10,
                                timeThroughData: t,
                                timelineData: n
                            }]
                        })
                    };
                if (1 == D) return i.add(l).add(p).start().then(function() {
                    var o = re.root.getModule("PanoOverviewModule");
                    o && o.event_disable(), o.initTrafficLayer()
                }), void T("#pano-return-btn em").text("退出");
                var h, _, x = y.getPCMapCity().cityId,
                    b = m.getBusLineInfoFromPCMap(e.panoMCPoint.x, e.panoMCPoint.y),
                    k = !0;
                b && (h = b.buslineUid, _ = b.closestBusStationUid), K || (k = !1, K = _);
                var w = function() {
                        re.root.bootstrap({
                            module: c,
                            args: [I.getModuleContainer("ui-layer"), S, K, r, h, x, k]
                        })
                    },
                    O = function() {
                        re.root.bootstrap({
                            module: C,
                            args: [I.getModuleContainer("ui-layer"), S, K, r, h, x, k]
                        })
                    },
                    A = re.root.getModule("TrafficModule");
                if (A && A.isEnable()) {
                    var L = re.root.getModule("PanoModule"),
                        N = A.getRoutParam();
                    N && L.setRoutParam(baidu.json.stringify(N)), L.enableShareMarker(!1), i.add(l).add(p).add(M).add(function() {
                        var o = re.root.safeCall("PanoModule", "getIndoorModel");
                        A.show(), o && A.hide();
                        var e = re.root.getModule("PanoOverviewModule");
                        if (A.isBus() || A.isWalk()) e.initTrafficLayer();
                        else if (A.isNav()) {
                            var a = A.getRoutPoints();
                            e.drawLine(a, 3), a = A.getMarkers(), e.addMarkers(a)
                        }
                        r && I.resetFuncAreaModule(A)
                    }), i.add(r ? function() {
                        A.setHeaderVisible(!0), re.root.bootstrap({
                            module: s,
                            args: [null, {
                                albumImageDomain: S.getPanoUrlConfig().PANO_3DIMAGE_URL,
                                data: {},
                                zIndex: E + 10
                            }]
                        })
                    } : function() {
                        return A.setHeaderVisible(!1), P()
                    })
                } else i.add(l).add(p).add(M).add(P).add(w).add(O).add(function() {
                    r && re.root.safeCall("PanoToolModule", "setItemsEnable", [
                        [!0]
                    ]), J(), X(e.maxImgLevel) && (re.root.safeCall("PanoToolModule", "setInfoDialogVisible", [!0]), re.root.safeCall("PanoToolModule", "setItemsEnable", [
                        [null, !1, null, !0, null, null, null]
                    ]), re.root.safeCall("PanoToolModule", "setTilesLevelLimitValue", [e.maxImgLevel - 3, 1]))
                });
                if (void 0 !== te) {
                    if (m.isSupportVideo()) {
                        var F = te;
                        i.add(function() {
                            re.root.bootstrap({
                                module: "VideoPlayer",
                                args: [F]
                            })
                        })
                    } else i.add(function() {
                        re.root.bootstrap({
                            module: "PanoMessageBox",
                            args: [{
                                container: I.getModuleContainer("PanoMessageBoxModule"),
                                data: {
                                    info: "您的浏览器版本过低或无法兼容，暂不支持此功能。",
                                    funtype: "alert"
                                }
                            }]
                        })
                    });
                    te = void 0
                }
                var V = i.start();
                V.then(function() {
                    if (ne && ne.length > 0) {
                        var o = ne[0],
                            a = re.root.getModule("PanoOverviewModule");
                        a && a.addSearchMarker(o.x, o.y, o.name), ne = null
                    }
                    var t = K,
                        n = re.root.getModule("PanoIndoorPoiModule");
                    "inter" == e.panoType && n && (t = n.getCurrentUid()), t && H({
                        uid: t,
                        x: e.panoMCPoint.x,
                        y: e.panoMCPoint.y
                    }), Y()
                }), f.removeMask()
            },
            pov_changed: function(o) {
                "PanoModule" != o.target.getName() && (re.root.getModule("PanoModule").setPov(o.data), Y())
            },
            resize_guide: function() {
                I.event_layoutChanged("PanoGuideModule", !0)
            },
            pano_changed: function(o) {
                "PanoModule" != o.target.getName() && (j.pano_changed = o.data.source, o.data.eventSource = "external", re.root.getModule("PanoModule").showPano(o.data, null, o.from), re.root.safeCall("PoiInfoPanelModule", "foldAllPanel"))
            },
            inter_poi_changed: function(o) {
                "PoiInfoPanelModule" == o.data.source && (ee = o.data.uid);
                var e = new P(o.data.uid);
                e.extend(P.TYPE.indoorPoi).then(function() {
                    var a = re.root.getModule("PanoIndoorPoiModule");
                    a && a.event_poi_change(e, o.data.uid)
                }), j.pano_changed = o.data.source, o.data.eventSource = "external", re.root.getModule("PanoModule").showPano(o.data, null, "InterPoi")
            },
            animate_pano_changed: function(o) {
                var e = re.root.getModule("PanoModule"),
                    a = e.getPanoOptions();
                "street" == a.panoType ? o.data.source = "PanoStreet" : (o.from = "PanoInterPoi", o.data.source = "PanoInterPoi"), j.pano_changed = o.data.source, j.after_go_to_poi = o.data.source, o.data.eventSource = "external", W.show();
                var t = re.root.getModule("PoiInfoPanelModule");
                if (t) {
                    var n = t.getDetailPanoPoi();
                    n && n.getUid() == o.data.uid || t.foldDetail()
                }
                e.showPano(o.data, !0, o.from)
            },
            zoom_changed: function(o) {
                "PanoModule" != o.target.getName() && (o.data.eventSource = "external", re.root.getModule("PanoModule").setZoom(o.data))
            },
            set_limit_zoom: function(o) {
                "PanoModule" !== o.target.getName() && (o.data.eventSource = "external", Q.show(), re.root.getModule("PanoModule").setLimitZoom(o.data))
            },
            layout_changed: function(o, e) {
                I.event_layoutChanged(o.target.getName(), e.display)
            },
            floor_changed: function(o) {
                "PanoModule" != o.target.getName() && (j.pano_changed = o.data.source, o.data.eventSource = "external", re.root.getModule("PanoModule").showPano(o.data, null, o.from))
            },
            close_pano: function(e) {
                var a, t = void 0;
                return e.data && (a = e.data.cityName || void 0), re.root.getModule("PanoModule").closePano(t, a), a ? void(document.querySelector("#sole-input").value = a) : void(e.data && e.data.returnUid && o.async("poidetail:widget/libs/poiDetailMgr/poiDetailMgr.js", function(o) {
                    addStat(STAT_CODE.STAT_PANORAMA, {
                        item: "pano_search_exit_pano"
                    }), o.create({
                        uid: e.data.returnUid
                    }, {
                        withMarker: !0
                    })
                }))
            },
            show_position: function(o) {
                var e = re.root.getModule("PanoOverviewModule");
                e && e.event_showPosition(o.data.x, o.data.y)
            },
            hide_position: function() {
                var o = re.root.getModule("PanoOverviewModule");
                o && o.event_hidePosition()
            },
            interface_ready: function() {
                if (1 == D) {
                    var o = re.root.getModule("TrafficModule"),
                        e = o.getSteps();
                    m.getRouteVideoParamFromPCMap(e).then(function(o) {
                        re.root.getModule("PanoModule").playRouteVideo(D, o)
                    })
                }
            },
            play_routeVideo: function() {
                D = 2;
                var o = re.root.getModule("PanoOverviewModule");
                o && (V = o.getCurrentPointInfo(), V.panoType = "street");
                var e = re.root.getModule("TrafficModule"),
                    a = e.getSteps();
                m.getRouteVideoParamFromPCMap(a).then(function(o) {
                    re.root.getModule("PanoModule").playRouteVideo(D, o), I.event_layoutChanged("PanoGuideModule", !1), I.event_layoutChanged("TrafficModule", !1), I.event_layoutToggle("PanoToolModule", !1), I.event_layoutToggle("TrafficModule", !1), I.event_layoutToggle("RouteVideoModule", !1);
                    var e = re.root.getModule("PanoOverviewModule");
                    e && e.event_disable(), e.isNotFullHeight() || (e._reset(), e.setReturnBtnPosition()), T("#pano-return-btn em").text("退出")
                })
            },
            return_clicked: function(o, e, a) {
                var a = e.routeVideoEntrance,
                    t = e.returnVars,
                    n = re.root.getModule("PanoModule"),
                    r = re.root.getModule("PanoShareModule");
                r ? (T("#pano-return-btn em").text("返回"), re.root.safeCall("PanoShareModule", "dispose")) : 2 == a ? (a = 0, T("#pano-return-btn em").text("返回"), re.root.getModule("PanoModule").closeRouteVideo(), setTimeout(function() {
                    I.event_layoutToggle("TrafficModule", !0), I.event_layoutToggle("PanoToolModule", !0), I.event_layoutChanged("TrafficModule", !0);
                    var o = re.root.getModule("PanoOverviewModule");
                    o && (o.event_panoChanged({
                        data: V
                    }), o && o.event_enable())
                }, 800)) : "inter" == t.panoType && t.panoLastStreetPanoOptions ? t.panoUid ? (t.panoLastStreetPanoOptions.uid = t.panoUid, n.showPano(t.panoLastStreetPanoOptions, !0, "returnButton")) : (re.root.safeCall("PanoToolModule", "setInfoDialogVisible", [!1]), n.showPano(t.panoLastStreetPanoOptions, null, "returnButton")) : n.closePano()
            },
            routeVideo_pano_changed: function(o) {
                var e = re.root.getModule("PanoOverviewModule");
                e && e.event_panoChanged(o)
            },
            classify_search_panel_visible: function(o) {
                var e = re.root.getModule("ClassifySearchModule"),
                    a = o.data;
                e || re.root.bootstrap({
                    module: M,
                    args: [I.getModuleContainer("PanoToolModule"), a, S]
                })
            },
            remove_markers: function(o, e) {
                re.root.getModule("PanoModule").removeMarkers(e)
            },
            poi_change: function(o, e) {
                var a = re.root.getModule("PanoModule").getPanoOptions();
                if (a) {
                    var t = e.getUid ? e.getUid() : e.uid,
                        n = e.pano ? e.pano.x : a.panoMCPoint.x,
                        r = e.pano ? e.pano.y : a.panoMCPoint.y,
                        i = {
                            uid: t,
                            x: n,
                            y: r
                        };
                    H(i)
                }
            },
            change_flash_cursor_style: function(o, e) {
                re.root.getModule("PanoModule").setFlashCursorStyle(e)
            },
            add_markers: function(o, e) {
                re.root.getModule("PanoModule").addMarkers(e)
            },
            marker_status_changed: function(o, e) {
                re.root.getModule("PanoModule").setMarkerStatus(e)
            },
            add_search_marker: function(o) {
                if (o.markers && o.markers.length > 0) {
                    var e = re.root.getModule("PanoOverviewModule");
                    if (e) {
                        var a = o.markers[0];
                        e.addSearchMarker(a.x, a.y, a.name)
                    } else ne = o.markers
                }
            },
            remove_search_marker: function() {
                var o = re.root.getModule("PanoOverviewModule");
                o && o.removeSearchMarker()
            },
            poi_search_marker_changed: function(o, e) {
                var a = !0;
                if (!e) return void re.root.getModule("PanoModule").removePanoModuleMarker(a);
                A = e[0].poiuid;
                var t = e[0],
                    n = re.root.getModule("PanoOverviewModule");
                n && n.addSearchMarker(t.x, t.y, t.name)
            },
            status_changed: function(o, e) {
                var a = e.isExpand,
                    t = re.root.getModule("PanoOverviewModule");
                if (t)
                    if (a === !0 && t.isLocked() && t.isNotFullHeight()) F = !0, t._reset();
                    else if (a === !1 && !t.isExpand()) return
            },
            clear_marker: function() {
                re.root.getModule("PanoModule").clearMarker()
            },
            dispose: function(o) {
                re.root.shutdown(o.target)
            },
            video_enter: function(o) {
                var e = o.data;
                if (m.isSupportVideo()) {
                    var a = re.root.getModule("VideoPlayer");
                    a ? a.play(e.uid) : (re.root.bootstrap({
                        module: "VideoPlayer",
                        args: [e.uid]
                    }), Y())
                } else re.root.bootstrap({
                    module: "PanoMessageBox",
                    args: [{
                        container: I.getModuleContainer("PanoMessageBoxModule"),
                        data: {
                            info: "您的浏览器版本过低或无法兼容，暂不支持此功能。",
                            funtype: "alert"
                        }
                    }]
                })
            },
            tool_share_pano: function(o) {
                var e = re.root.getModule("PanoShareModule"),
                    a = re.root.getModule("ShareMarkerModule");
                if (e) re.root.safeCall("PanoShareModule", "dispose"), J();
                else {
                    var t = re.root.getShareParam();
                    re.root.bootstrap({
                        module: r,
                        args: [{
                            context: {
                                mapContext: y,
                                panoContext: S
                            },
                            parent: I.getModuleContainer("PanoToolModule"),
                            data: o.data,
                            zIndex: E + 10,
                            shareParam: t
                        }]
                    }), a ? a.enterShareStatus() : re.root.bootstrap({
                        module: i,
                        args: []
                    }), I.hide(!0), re.root.safeCall("PanoModule", "toShareStatus"), re.root.safeCall("PanoOverviewModule", "hide"), re.root.safeCall("PanoCopyrightModule", "hide"), re.root.safeCall("TrafficModule", "setPanelVisiable", [!1]), re.root.safeCall("PoiSearchModule", "hide"), re.root.safeCall("PanoToolModule", "setItemsEnable", [
                        [!1, !1, !0, null, null, !1, !1]
                    ]);
                    var n = re.root.getModule("PanoIndoorPoiModule");
                    n ? re.root.safeCall("PanoIndoorPoiModule", "hide") : re.root.safeCall("PoiInfoPanelModule", "hide"), T("#pano-return-btn em").text("退出分享");
                    var l = T("#pano-return-btn"),
                        d = l.css("left");
                    l.attr("leftBeforeHide", d), l.css("left", "18px"), document.getElementById("pano-share-btn").className = "active"
                }
                var u = re.root.safeCall("PanoModule", "getIndoorModel");
                u && X(u.maxImgLevel) && addStat(STAT_CODE.STAT_PANORAMA, {
                    item: "billion-pixels-share-click"
                }), addStat(STAT_CODE.STAT_PANORAMA, {
                    item: "pano-share-click"
                })
            },
            clicked_position: function(o) {
                re.root.safeCall("ShareMarkerModule", "event_clickPosition", [o.x, o.y, o.z, o.screenX, o.screenY])
            },
            "PanoShareModule:dispose": function() {
                "hidden" === T("html").css("overflow") && T("html").css("overflow", ""), document.getElementById("pano-share-btn").className = "";
                var o = re.root.getModule("PanoIndoorPoiModule");
                T("#pano-return-btn em").text("返回");
                var e = T("#pano-return-btn"),
                    a = e.attr("leftBeforeHide");
                e.css("left", a), I.show(!0), re.root.safeCall("PanoModule", "revertShareStatus"), re.root.safeCall("PanoOverviewModule", "show"), re.root.safeCall("PanoCopyrightModule", "show"), re.root.safeCall("TrafficModule", "setPanelVisiable", [!0]);
                var t = re.root.safeCall("TrafficModule", "isEnable"),
                    n = re.root.safeCall("PanoModule", "getIndoorModel");
                n || t ? n && X(n.maxImgLevel) ? re.root.safeCall("PanoToolModule", "setItemsEnable", [
                    [!1, !1, !0, null, null, null, !0]
                ]) : re.root.safeCall("PanoToolModule", "setItemsEnable", [
                    [!1, !0, !0, null, null, null, !0]
                ]) : (re.root.safeCall("PanoToolModule", "setItemsEnable", [
                    [!0, !0, !0, null, null, null, !0]
                ]), re.root.safeCall("PoiSearchModule", "show")), re.root.safeCall("ShareMarkerModule", "exitShareStatus"), o ? re.root.safeCall("PanoIndoorPoiModule", "show") : re.root.safeCall("PoiInfoPanelModule", "show"), re.root.safeCall("ShareMarkerModule", "hasBeSharedMarker") === !1 && re.root.shutdown("ShareMarkerModule")
            },
            "VideoPlayer:dispose": function() {
                Y()
            },
            share_video: function(o, e) {
                var a = re.root.getModule("PanoPhotoShareModule");
                if (!a) {
                    var t = re.root.getShareParam();
                    re.root.bootstrap({
                        module: "PanoPhotoShareModule",
                        args: [{
                            context: {
                                mapContext: y,
                                panoContext: S
                            },
                            parent: e.container,
                            data: o.data,
                            zIndex: E + 10,
                            shareParam: t,
                            sharePanelClassName: e.sharePanelClassName
                        }]
                    })
                }
            },
            "PanoPhotoShareModule:dispose": function() {
                re.root.safeCall("VideoPlayer", "onShareClose")
            },
            add_marker_panel: function(o, e) {
                e[0] ? (re.root.safeCall("PanoShareModule", "hideDefaultPanel"), re.root.safeCall("PanoShareModule", "addExtraPanel", [e[1]])) : re.root.safeCall("PanoShareModule", "showDefaultPanel")
            },
            delete_marker_panel: function(o, e) {
                var a = {
                    id: e[0]
                };
                re.root.safeCall("PanoModule", "deleteTagMarker", [a])
            },
            tag_marker_clicked: function(o, e) {
                "share_marker_id" === e.data.markerId && re.root.safeCall("PanoShareModule", "showExtraPanel", [e.data])
            },
            tag_marker_value_changed: function(o, e) {
                e && re.root.safeCall("ShareMarkerModule", "updateMarkerContent", [e.value])
            },
            biz_indoor_goto_poi: function(o) {
                re.root.safeCall("PanoModule", "showPano", [o.data, !0])
            },
            sync_share_status: function() {
                var o = re.root.getShareParam();
                Y(), re.root.safeCall("PanoShareModule", "syncShareStatus", [o])
            }
        };
    a.exports = re
});;
define("pano:widget/Root.js", function(e, n, r) {
    var a = e("pano:widget/eventImplements.js"),
        t = !1,
        o = {},
        i = "",
        s = {
            _handlers: {},
            on: function(e, n) {
                this._handlers[e] = n
            },
            fire: function(e, n) {
                if (n[0] instanceof baidu.lang.Event) {
                    var r = n[0].target.getName && n[0].target.getName(),
                        a = this._handlers[r + ":" + e];
                    a && a.apply(window, n)
                }
                var t = this._handlers[e];
                t && t.apply(window, n)
            }
        },
        f = {},
        l = [],
        u = function(e) {
            return "pano:widget/module/" + e + "/" + e + ".js"
        },
        v = function(e, n) {
            e.target.getName && (e.from = e.target.getName()), s.fire(e.type, [e, n])
        };
    v.events = {};
    var h = {
        getModule: function(e) {
            return e ? o[e] : o
        },
        initialize: function(e) {
            e.root = this, e._initialize(o), delete e._initialize;
            for (var n in e) s.on(n, e[n])
        },
        getShareParam: function() {
            for (var e = {}, n = 0, r = l.length; r > n; n++) {
                var a = l[n],
                    t = a.getShareParam();
                void 0 !== t && null !== t && (e[a.getName()] = t)
            }
            return e
        },
        isEnterFromShareLink: function() {
            return "share" == i ? !0 : !1
        },
        bootstrap: function(n) {
            n = T.isArray(n) ? n : [n];
            var r, a, t, i, s = [];
            for (r = 0, i = n.length; i > r; r++) {
                var d = n[r],
                    p = d.module;
                if ("string" == typeof p) ! function() {
                    var n = new T.Deferred,
                        r = d.args;
                    e.async(u(p), function(e) {
                        h.bootstrap({
                            module: e,
                            args: r
                        }).then(function() {
                            n.resolveWith(h)
                        })
                    }), s.push(n)
                }();
                else {
                    var c = d.args,
                        g = new p;
                    if (o[g.getName()]) {
                        var m = new T.Deferred;
                        return m.resolve(), m
                    }
                    if (g.isAsync() === !0) {
                        var m = new T.Deferred;
                        m.name = g.getName(), g.once("ready", function(e) {
                            return function() {
                                e.resolveWith(h)
                            }
                        }(m)), s.push(m)
                    }
                    for (var w = g.getSupportEvents(), a = 0, t = w.length; t > a; a++) {
                        var P = w[a];
                        v.events[P] ? v.events[P]++ : v.events[P] = 1, g.addEventListener(P, v)
                    }
                    var S = f[g.getName()];
                    S && (g.$shareParam = S, delete f[g.getName()]), g.initialize && g.initialize.apply(g, c), g.$shareParam = void 0, l.push(g), o[g.getName()] = g
                }
            }
            var m = new T.Deferred;
            return T.when.apply(T, s).done(function() {
                m.resolve()
            }), m
        },
        shutdown: function(e) {
            void 0 === e ? (e = l.slice(), l = []) : T.isArray(e) || (e = [e]);
            var n, r, a, t, i = 0;
            for (n = 0, t = e.length; t > n; n++) {
                var s = e[n];
                if ("string" == typeof s && (s = o[s]), s) {
                    for (var f in o)
                        if (o[f] === s) {
                            delete o[f];
                            break
                        }
                    var u = s.getSupportEvents() || [];
                    for (r = 0, a = u.length; a > r; r++) {
                        var h = u[r];
                        v.events[h]--, 0 == v.events[h] && delete v.events[h], s.removeEventListener(h)
                    }
                    s.dispose && s.dispose(), i++
                }
            }
            return i
        },
        safeCall: function(e, n, r) {
            var a = this.getModule(e);
            return a && a[n] ? a[n].apply(a, r || []) : void 0
        }
    };
    r.exports = {
        showPanoPreview: function(e, n) {
            t || (h.initialize(a), t = !0), s.fire("showPanoPreview", [null, e, n])
        },
        closePanoPreview: function() {
            t && (s.fire("closePanoPreview", []), h.shutdown())
        },
        showPano: function(e, n) {
            var r = !1;
            if (e.panoShareParam) {
                r = !0;
                try {
                    var o = decodeURIComponent(e.panoShareParam);
                    e.panoShareParam = f = T.json.parse(o)
                } catch (l) {
                    throw l
                }
            }
            if (e.cpinfo) {
                r = !0;
                try {
                    var u = T.json.parse(decodeURIComponent(e.cpinfo));
                    e.panoShareParam || (e.panoShareParam = {}), e.panoShareParam.ShareMarkerModule = u, f.ShareMarkerModule = u, delete e.cpinfo
                } catch (l) {}
            }
            t || (h.initialize(a), t = !0, r && addStat(STAT_CODE.STAT_PANORAMA, {
                item: "share.link.open"
            })), i = e.from, s.fire("showPano", [null, e, n])
        },
        closePano: function() {
            t && (f = {}, s.fire("closePano"), h.shutdown())
        },
        isRunning: function() {
            return l.length
        }
    }
});;
define("pano:widget/module/PoiSearchModule/PoiSearchModule.js", function(require, exports, module) {
    function getPoiListThumbnail(t) {
        var a = "//webmap0.bdimg.com/wolfman/static/pano/images/pano_whole/default_thumbnail_0cf3da1.png";
        if (t.thumbnailSrc = a, t.content instanceof Array)
            for (var i = 0; i < t.content.length; i++) {
                var e = "";
                e = t.content[i].poi.uid, t.content[i].poi.panoThumbnail = e && t.content[i].poi.sid ? PR3DPOI_URL + "&uid=" + e : a
            }
        return t
    }

    function listPanelAction(t, a) {
        for (var i = (this._data.poi, this._data.list.content), e = this._data.list.pageInfo, n = !1; !n && t && t !== a;) {
            var o = t.getAttribute("data-action"),
                s = this;
            switch (o) {
                case "goToPoi":
                    var r = t.getAttribute("data-index"),
                        p = i[r];
                    s.setData(p.poi.uid, !1, !1, !0, !1), this.setSelect(r), addStat(STAT_CODE.STAT_PANORAMA, {
                        item: "pano_search_result_click"
                    }), MapLogReport.send({
                        da_src: "pcmapPanoPG.poiList.click"
                    }), p.extend(PanoPoi.TYPE.pano).then(function() {
                        return p.pano.pid ? (s._data.poiCity && (s.cityCode = s._data.poiCity), p.pano.belonging ? s.dispatchEvent("inter_poi_changed", {
                            data: {
                                source: "PoiSearchModule",
                                panoId: p.pano.pid,
                                uid: p.poi.uid,
                                pid: p.pano.pid,
                                poiType: 2,
                                panoHeading: p.pano.dir,
                                panoPitch: p.pano.pitch,
                                x: p.pano.x,
                                y: p.pano.y,
                                panoX: p.pano.panox,
                                panoY: p.pano.panoy
                            }
                        }) : s.dispatchEvent("animate_pano_changed", {
                            data: {
                                source: "PoiSearchModule",
                                panoId: p.pano.pid,
                                uid: p.poi.uid,
                                pid: p.pano.pid,
                                poiType: 2,
                                panoHeading: p.pano.dir,
                                panoPitch: p.pano.pitch,
                                x: p.pano.x,
                                y: p.pano.y,
                                panoX: p.pano.panox,
                                panoY: p.pano.panoy
                            }
                        }), s.foldList(), void setTimeout(function() {
                            s.dispatchEvent("hide_position")
                        }, 100)) : (s.dispatchEvent("pano_error", {
                            data: "NO_PANO",
                            returnUid: p.poi.uid
                        }), void addStat(STAT_CODE.STAT_PANORAMA, {
                            item: "pano_search_no_pano"
                        }))
                    });
                    break;
                case "pn":
                    var l = parseInt(t.innerHTML, 10);
                    l--, this.updatePoiListInfo({
                        pn: l,
                        nn: l * e.pageSize
                    }), n = !0;
                    break;
                case "home_page":
                    l = 0, this.updatePoiListInfo({
                        pn: l,
                        nn: l * e.pageSize
                    }), n = !0;
                    break;
                case "prev_page":
                    var l = e.index - 1;
                    l--, this.updatePoiListInfo({
                        pn: l,
                        nn: l * e.pageSize
                    }), n = !0;
                    break;
                case "next_page":
                    var l = e.index - 1;
                    l++, this.updatePoiListInfo({
                        pn: l,
                        nn: l * e.pageSize
                    }), n = !0
            }
            t = t.parentNode
        }
    }

    function detailPanelAction(t) {
        var a = window.addStat,
            i = window.STAT_CODE,
            e = t.getAttribute("data-action");
        if (!e) {
            var n = t.getAttribute("as-parent");
            if (!n) return;
            t = t.parentNode, e = t.getAttribute("data-action")
        }
        var o = this._data.poi;
        switch (e) {
            case "indoor":
                var s = t.getAttribute("data-iid");
                this.dispatchEvent("pano_changed", {
                    data: {
                        source: "PoiInfoPanelModule",
                        panoIId: s
                    }
                }), a(i.STAT_PANORAMA, {
                    item: "poidetail-indoorview-click"
                }), MapLogReport.send({
                    da_src: "pcmapPanoPG.poiInter.click"
                });
                break;
            case "detail":
                3 === o.poi.poi_type ? util.showDetail(o.poi.uid, o.poi.poi_type, o.poi.city, "", "") : util.showDetail(o.poi.uid, 0, o.poi.city, o.poi.src, "Page");
                break;
            case "bookMovie":
                var r = t.getAttribute("data-mid");
                util.showDetail(o.poi.uid, 0, o.poi.city, o.poi.src, "movie_book", "", r), a(i.STAT_PANORAMA, {
                    item: "streetview-bookmovie-click",
                    type: "street"
                });
                break;
            case "moreMovie":
                util.showDetail(o.poi.uid, 0, o.poi.city, o.poi.src, "movie_more");
                break;
            case "bookHotel":
                var p = t.getAttribute("data-rid"),
                    l = "";
                p && (l = baidu.url.jsonToQuery({
                    roomId: p
                })), util.showDetail(o.poi.uid, 0, o.poi.city, o.poi.src, o.poi.src, "", l), a(i.STAT_PANORAMA, {
                    item: "streetview-bookhotel-click",
                    type: "street"
                })
        }
    }

    function cityListAction(t) {
        var a = t.getAttribute("data-action");
        if ("searchInCity" === a) {
            var i = t.getAttribute("data-code");
            this.cityCode = i, this.search({
                wd: this._data.list.wd,
                from: "user"
            })
        }
    }
    var FoldPanelComponent = require("pano:widget/component/FoldPanelComponent/FoldPanelComponent.js"),
        ModuleClass = require("pano:widget/base/ModuleClass.js"),
        util = require("pano:widget/base/util.js"),
        PanoPoi = require("pano:widget/model/PanoPoi.js"),
        PR3DPOI_URL = "//mapsv0.bdimg.com/?qt=pr3dpoi&fovy=65&width=70&height=58&quality=100",
        hisMgr = require("common:widget/ui/searchHistory/hisMgr.js"),
        config = require("common:widget/ui/config/config.js"),
        modelConfig = config.modelConfig,
        style = ".pano-search-box-container{width:350px;height:40px;border-radius:2px;position:relative;top:20px;left:97px;background-color:#252525;background-color:rgba(37,37,37,.9);filter:alpha(opacity=90);color:#c5cbd6}.pano-search-content{width:280px;height:40px;display:inline-block;background-color:#252525}.pano-search-box{position:relative;top:-13px;width:219px;padding:9px;line-height:20px;font-size:16px;height:20px;color:#c5cbd6;background-color:#252525;border:0}.pano-search-cancel-button{display:inline-block;box-sizing:border-box;height:38px;width:39px;cursor:pointer;position:relative;top:1px;left:0;background:url(//webmap0.bdimg.com/wolfman/static/pano/images/pano_whole/search_clear_752a9e8.png) no-repeat 11px 11px}.pano-search-cancel-button:hover{background:url(//webmap0.bdimg.com/wolfman/static/pano/images/pano_whole/search_clear_hover_f00141f.png) no-repeat 11px 11px}.pano-search-button{display:inline-block;height:38px;width:66px;cursor:pointer;position:relative;top:1px;right:1px;background:url(//webmap0.bdimg.com/wolfman/static/pano/images/pano_whole/search_icon_1a38328.png) no-repeat 22px 8px #434448}.pano-search-button:hover{background:url(//webmap1.bdimg.com/wolfman/static/pano/images/pano_whole/search_icon_hover_b187b83.png) no-repeat 22px 8px #434448}.poi-list-title-bar{position:absolute;top:62px;left:97px;font-size:12px;line-height:40px;height:40px;width:350px;background-color:#252525;background-color:rgba(37,37,37,.9);filter:alpha(opacity=90);border-radius:2px;color:#c5cbd6}.pano_search_popup{width:340px}.pano-thumbnail-wrapper{position:absolute;top:22px;right:16px;width:70px;height:58px;overflow:hidden}.list-pano-thumbnail{width:70px;height:58px}.list-item:hover{}.list_item:hover .list_item_bg{background-color:#4d4e4e;opacity:.8;filter:alpha(opacity=80);_filter:alpha(opacity=100)}.list_item:hover span.no_1{background-position:0 -32px}.list_item:hover span.no_2{background-position:-24px -32px}.list_item:hover span.no_3{background-position:-47px -32px}.list_item:hover span.no_4{background-position:-69px -32px}.list_item:hover span.no_5{background-position:-93px -32px}.list_item:hover span.no_6{background-position:-117px -32px}.list_item:hover span.no_7{background-position:-141px -32px}.list_item:hover span.no_8{background-position:-164px -32px}.list_item:hover span.no_9{background-position:-188px -32px}.list_item:hover span.no_10{background-position:-211px -32px}.list_default_text{display:block;height:40px;width:350px;line-height:40px;font-size:12px;text-indent:12px}.detail-info-title-bar{position:absolute;top:104px;left:97px;font-size:12px;line-height:40px;height:40px;width:330px;padding:0 10px;background-color:#252525;background-color:rgba(37,37,37,.9);_background-color:#252525;*background-color:#252525;filter:alpha(opacity=90);_filter:alpha(opacity=90);border-radius:0 2px 2px 0;color:#c5cbd6}.detail-info-title-bar-nolist{position:absolute;top:62px;left:97px;font-size:12px;line-height:40px;height:40px;width:330px;padding:0 10px;background-color:#252525;background-color:rgba(37,37,37,.9);_background-color:#252525;*background-color:#252525;filter:alpha(opacity=90);_filter:alpha(opacity=90);border-radius:0 2px 2px 0;color:#c5cbd6}.city_list_container{position:absolute;top:62px;left:97px;width:332px;padding:9px;background-color:#252525;opacity:.9}.pano_city_table{border:0;margin:5px 0;width:100%}.pano_city_table td{width:33%;valign:top;line-height:28px;height:28px;display:table-cell}.pano_city_table a{text-decoration:none;color:#fff;outline:0;cursor:pointer}";
    require.loadCss({
        content: style,
        name: "PoiSearchModule"
    });
    var POI_SEARCH_TEMPLATE = [function(_template_object) {
            var _template_fun_array = [],
                fn = function(__data__) {
                    var _template_varName = "";
                    for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                    eval(_template_varName), _template_fun_array.push('<div>    <div class="pano-search-box-container">        <div class="pano-search-content">            <input class="pano-search-box" type="text" name="word"                value="', "undefined" == typeof panoPoiSearch.keyWord ? "" : panoPoiSearch.keyWord, '" placeholder="搜索周边">            <div class="pano-search-cancel-button"></div>        </div>        <div class="pano-search-button"></div>    </div>    <div class="pano-search-suggest"></div></div>'), _template_varName = null
                }(_template_object);
            return fn = null, _template_fun_array.join("")
        }][0],
        POI_DETAIL_TEMPLATE = [function(_template_object) {
            var _template_fun_array = [],
                fn = function(__data__) {
                    var _template_varName = "";
                    for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                    if (eval(_template_varName), _template_fun_array.push(""), panoPoi.tour) _template_fun_array.push('        <div class="pano_popup pano_search_popup">        <div class="pano_poi_header clearfix">            <p href="javascript:void(0);" class="title">                ', "undefined" == typeof panoPoi.tour.name ? "" : panoPoi.tour.name, '            </p>        </div>        <div class="bottom_line"></div>        <div class="pano_poi_footer">            <ul>                <li data-action="tour" data-tourid="', "undefined" == typeof panoPoi.tour.tourid ? "" : panoPoi.tour.tourid, '">                    <a data-action="tour" data-tourid="', "undefined" == typeof panoPoi.tour.tourid ? "" : panoPoi.tour.tourid, '" href="javascript:void(0);" class="indoor_view"><span as-parent="1" class="detail_indoor_view_icon"></span>进入内景</a>                </li>            </ul>        </div>    </div>');
                    else {
                        if (_template_fun_array.push('    <div class="pano_popup pano_search_popup">        <div class="pano_poi_header clearfix">            <p href="javascript:void(0);" class="title">                ', "undefined" == typeof panoPoi.poi.name ? "" : panoPoi.poi.name, '            </p>            <a href="javascript:void(0);" class="detail_link gray" target="_blank" data-action="detail">详情>></a>        </div>        <div class="content_line"></div>        <ul class="pano_poi_content">            '), panoPoi.poi.addr && (_template_fun_array.push('                <li class="clearfix">                                        '), _template_fun_array.push(1 === panoPoi.poi.poi_type || 3 === panoPoi.poi.poi_type ? '                        <span class="type_name">车次：</span>                    ' : '                        <span class="type_name">地址：</span>                    '), _template_fun_array.push('                    <span class="type_cont">', "undefined" == typeof panoPoi.poi.addr ? "" : panoPoi.poi.addr, "</span>                </li>            ")), _template_fun_array.push("            "), panoPoi.poi.tel && _template_fun_array.push('                <li class="clearfix last">                                        <span class="type_name">电话：</span>                    <span class="type_cont">', "undefined" == typeof panoPoi.poi.tel ? "" : panoPoi.poi.tel, "</span>                </li>            "), _template_fun_array.push("        </ul>        "), panoPoi.movie) {
                            _template_fun_array.push('            <div class="content_line"></div>            <div class="pano_movie_info">                <div class="movie_newest">                    '), panoPoi.poi.movie_count && _template_fun_array.push('                        <a href="javascript:void(0);">                            <span>实时影讯<i class="arrow"></i></span>                            目前                            <em>', "undefined" == typeof panoPoi.poi.movie_count ? "" : panoPoi.poi.movie_count, "</em>                            部影片                            <em>正在上映!</em>                        </a>                    "), _template_fun_array.push('                </div>                <ul class="movie_book">                    ');
                            for (var i = 0; i < panoPoi.movie.length; i++) _template_fun_array.push('                        <li class="clearfix">                            <span class="span1" title="', "undefined" == typeof panoPoi.movie[i].name ? "" : panoPoi.movie[i].name, '">', "undefined" == typeof panoPoi.movie[i].name ? "" : panoPoi.movie[i].name, '</span>                            <span class="span2 gray">', "undefined" == typeof panoPoi.movie[i].type ? "" : panoPoi.movie[i].type, '</span>                            <span class="span3 orange">¥', "undefined" == typeof panoPoi.movie[i].price ? "" : panoPoi.movie[i].price, '起</span>                            <span class="span3">                                <a href="javascript:void(0);" class="movie_book_btn" data-action="bookMovie" data-mid="', "undefined" == typeof panoPoi.movie[i].id ? "" : panoPoi.movie[i].id, '" target="_blank">在线订座</a>                            </span>                        </li>                    ');
                            _template_fun_array.push('                </ul>                <div class="clearfix">                    <a href="javascript:void(0)" class="book_link" target="_blank" data-action="moreMovie">更多电影>></a>                </div>            </div>        ')
                        }
                        if (_template_fun_array.push("        "), panoPoi.hotel) {
                            _template_fun_array.push('            <div class="content_line"></div>            <div class="pano_hotel_info">                <ul class="hotel_book">                    ');
                            for (var j = 0; j < panoPoi.hotel.length; j++) _template_fun_array.push('                        <li class="clearfix">                            <span class="span1">', "undefined" == typeof panoPoi.hotel[j].roomTypeName ? "" : panoPoi.hotel[j].roomTypeName, '</span>                            <span class="span2 orange">¥', "undefined" == typeof panoPoi.hotel[j].price ? "" : panoPoi.hotel[j].price, '起</span>                            <span class="span3">                                <a href="javascript:void(0);" class="hotel_book_btn" target="_blank" data-action="bookHotel" data-rid="', "undefined" == typeof panoPoi.hotel[j].roomId ? "" : panoPoi.hotel[j].roomId, '">                                    预订>>                                </a>                            </span>                        </li>                    ');
                            _template_fun_array.push('                </ul>                <div class="clearfix">                    <a class="book_link" href="javascript:void(0);" data-action="detail" target="_blank">更多房型和日期&gt;&gt;</a>                </div>            </div>        ')
                        }
                        _template_fun_array.push("        "), panoPoi.pano && panoPoi.pano.iid && _template_fun_array.push('            <div class="bottom_line"></div>            <div class="pano_poi_footer">                <ul>                    <li data-action="indoor" data-iid="', "undefined" == typeof panoPoi.pano.iid ? "" : panoPoi.pano.iid, '">                        <a data-action="indoor" data-iid="', "undefined" == typeof panoPoi.pano.iid ? "" : panoPoi.pano.iid, '" href="javascript:void(0);" class="indoor_view"><span as-parent="1" class="detail_indoor_view_icon"></span>进入内景</a>                    </li>                </ul>            </div>        '), _template_fun_array.push("    </div>")
                    }
                    _template_fun_array.push(""), _template_varName = null
                }(_template_object);
            return fn = null, _template_fun_array.join("")
        }][0],
        POI_LIST_TEMPLATE = [function(_template_object) {
            var _template_fun_array = [],
                fn = function(__data__) {
                    var _template_varName = "";
                    for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                    eval(_template_varName), _template_fun_array.push('<div class="pano_popup pano_search_popup"><div class="pano_poi_list_content"><ul>');
                    for (var i = 0, len = panoPoiList.content.length; len > i; i++) _template_fun_array.push('<li data-action="goToPoi" data-index="', "undefined" == typeof i ? "" : i, '" class="list_item clearfix" style="min-height: 74px;"><a class="list_item_bg"></a>'), 0 != i && _template_fun_array.push('<div class="list_item_line" style="width:314px"></div>'), _template_fun_array.push('<a href="javascript:void(0);" class="list_item_icon"><span class="no_', "undefined" == typeof(i + 1) ? "" : i + 1, '"></span></a><div class="list_item_content"><h4 class="pano_poi_name">', "undefined" == typeof panoPoiList.content[i].poi.name ? "" : panoPoiList.content[i].poi.name, '</h4><ul class="pano_poi_detail">'), panoPoiList.content[i].poi.addr && _template_fun_array.push('<li class="clearfix pano_poi_addr"><span class="pano_info_name">地址：</span><span class="pano_info_cont">', "undefined" == typeof panoPoiList.content[i].poi.addr ? "" : panoPoiList.content[i].poi.addr, "</span></li>"), _template_fun_array.push(""), panoPoiList.content[i].poi.tel && _template_fun_array.push('<li class="clearfix pano_poi_tel"><span class="pano_info_name">电话：</span><span class="pano_info_cont">', "undefined" == typeof panoPoiList.content[i].poi.tel ? "" : panoPoiList.content[i].poi.tel, "</span></li>"), _template_fun_array.push('</ul><div class="pano-thumbnail-wrapper"><img src="', "undefined" == typeof panoPoiList.content[i].poi.panoThumbnail ? "" : panoPoiList.content[i].poi.panoThumbnail, '"onerror="onerror=null;src=&#39;', "undefined" == typeof panoPoiList.thumbnailSrc ? "" : panoPoiList.thumbnailSrc, '&#39;" class="list-pano-thumbnail"></div></div></li>');
                    if (_template_fun_array.push("</ul></div>"), panoPoiList.pageInfo) {
                        _template_fun_array.push('<div class="pano_poi_list_page"><p>'), panoPoiList.pageInfo.hasHome && _template_fun_array.push('<span class="home"><a data-action="home_page" href="javascript:void(0);">首页</a></span>'), _template_fun_array.push(""), panoPoiList.pageInfo.hasPrev && _template_fun_array.push('<span class="pre"><a data-action="prev_page" href="javascript:void(0);">&lt;上一页</a></span>'), _template_fun_array.push("");
                        for (var i = 0, len = panoPoiList.pageInfo.text.length; len > i; i++) _template_fun_array.push(""), panoPoiList.pageInfo.text[i] == panoPoiList.pageInfo.index ? _template_fun_array.push('<span class="curPage">', "undefined" == typeof panoPoiList.pageInfo.text[i] ? "" : panoPoiList.pageInfo.text[i], "</span>") : _template_fun_array.push('<span><a data-action="pn" href="javascript:void(0);">', "undefined" == typeof panoPoiList.pageInfo.text[i] ? "" : panoPoiList.pageInfo.text[i], "</a></span>"), _template_fun_array.push("");
                        _template_fun_array.push(""), panoPoiList.pageInfo.hasNext && _template_fun_array.push('<span class="next"><a data-action="next_page" href="javascript:void(0);">下一页&gt;</a></span>'), _template_fun_array.push("</p></div>")
                    }
                    _template_fun_array.push("</div>"), _template_varName = null
                }(_template_object);
            return fn = null, _template_fun_array.join("")
        }][0],
        cityListTemplate = [function(_template_object) {
            var _template_fun_array = [],
                fn = function(__data__) {
                    var _template_varName = "";
                    for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                    eval(_template_varName), _template_fun_array.push('<div class="city_list_container"><p>其他城市搜索结果:</p><div><table class="pano_city_table"><tbody>');
                    for (var i = 0, len = cityList.content.length / 3 + 1; len > i; i++) {
                        _template_fun_array.push("                <tr>                    ");
                        for (var j = 0; 3 > j; j++) _template_fun_array.push("                        "), 3 * i + j < cityList.content.length && _template_fun_array.push('                        <td>                                    <a data-action="searchInCity" data-code="', "undefined" == typeof cityList.content[3 * i + j].code ? "" : cityList.content[3 * i + j].code, '">                                    ', "undefined" == typeof cityList.content[3 * i + j].name ? "" : cityList.content[3 * i + j].name, "(", "undefined" == typeof cityList.content[3 * i + j].num ? "" : cityList.content[3 * i + j].num, ")</a>                                 </td>                        "), _template_fun_array.push("                        ");
                        _template_fun_array.push("                    </tr>                ")
                    }
                    _template_fun_array.push("</tbody>        </table></div></div>"), _template_varName = null
                }(_template_object);
            return fn = null, _template_fun_array.join("")
        }][0],
        LIST_VIEW_TOP = 102,
        LIST_VIEW_LEFT = 97,
        DETAIL_VIEW_TOP = 144,
        DETAIL_VIEW_LEFT = 97,
        LIST_BUTTON_TOP = 62,
        DETAIL_BUTTON_TOP = 104,
        PANEL_WIDTH = 350,
        VIEW_FOOTER = 150,
        CONTEN_PADDING = 12,
        BUFFER = 32,
        SHOW_SEARCH_BOX = !1,
        SHOW_LIST_BUTTON = !1,
        SHOW_DETAIL_BUTTON = !1,
        addStat = window.addStat,
        STAT_CODE = window.STAT_CODE,
        panoMapKey = {
            65: "A",
            37: "LEFTARROW",
            87: "W",
            38: "UPARROW",
            68: "D",
            39: "RIGHTARROW",
            83: "S",
            40: "DOWNARROW"
        },
        moduleCode = {
            1: "City",
            2: "City",
            5: "BusStops",
            6: "PoiSearch",
            7: "Clarify",
            11: "PoiSearch",
            13: "RouteAddr",
            14: "BusTrans",
            15: "LinesQuery",
            18: "BusLines",
            19: "RouteAddr",
            20: "NavTrans",
            21: "PoiSearch",
            22: "BusTrans",
            23: "RouteAddr",
            24: "RouteAddr",
            26: "SpecialPoi",
            28: "District",
            29: "RouteAddr",
            31: "NavWalk",
            32: "NavBike",
            36: "PoiSearch",
            37: "Clarify",
            38: "PoiSearch",
            39: "PoiSearch",
            40: "Clarify",
            41: "PoiAddr",
            48: "CBusTrans",
            49: "RouteAddr",
            50: "RouteAddr"
        },
        historySearchModel = {
            1: "s",
            2: "s",
            5: "s",
            6: "s",
            7: "s",
            11: "s",
            21: "bd",
            26: "s",
            28: "s",
            29: "s",
            36: "s",
            37: "s",
            38: "nb",
            39: "bd",
            40: "bd",
            41: "s"
        },
        getPanelMaxHeight = function(t) {
            var a = document.body.offsetHeight - t - VIEW_FOOTER - CONTEN_PADDING - BUFFER;
            return Math.max(a, 50)
        },
        PoiSearchModule = ModuleClass.extend("PoiSearchModule", {
            initialize: function(t, a, i, e) {
                this.container = t, this._panoContext = a, this._data = {
                    poi: void 0,
                    list: void 0,
                    listUrl: void 0
                }, this._saveData = {
                    poi: void 0,
                    list: void 0,
                    listUrl: void 0
                }, this.fromPCMap = !1, this.renderPage(), i && e && (this.fromPCMap = !0, this.setData(i, !0, !0, i, !0)), e || this.hide()
            },
            renderPage: function() {
                this.parentDom = document.createElement("div"), this.container.appendChild(this.parentDom), this.addSearchContainer(), this.addPoiDetailContainer(), this.addPoiListContainer(), this.addCityContainer()
            },
            addSearchContainer: function() {
                var t = this,
                    a = this.searchContainer = document.createElement("div"),
                    i = {
                        keyWord: ""
                    },
                    e = POI_SEARCH_TEMPLATE({
                        panoPoiSearch: i
                    });
                e = T(e), a.appendChild(e[0]), this.parentDom.appendChild(a), SHOW_SEARCH_BOX = !0, this.input = e.find(".pano-search-box"), this.createSuggestion();
                var n = e.find(".pano-search-cancel-button");
                n.on("click", function() {
                    t.input.val(""), t.hideListAndMoveInfo.apply(t, [])
                }), this.input.on("keydown", function(a) {
                    var i = a.keyCode,
                        e = t.input.val();
                    return 13 === i && e && t.search({
                        wd: e,
                        from: "user"
                    }), 27 === i && t.dispatchEvent("close_pano"), i in panoMapKey ? void a.stopPropagation() : void 0
                }), this.input.on("focus", function() {
                    addStat(STAT_CODE.STAT_PANORAMA, {
                        item: "pano_search_box_click"
                    })
                });
                var o = e.find(".pano-search-button");
                o.on("click", function() {
                    addStat(STAT_CODE.STAT_PANORAMA, {
                        item: "pano_search_btn_click"
                    }), t.search({
                        wd: t.input.val(),
                        from: "user"
                    })
                })
            },
            createSuggestion: function() {
                var t = this,
                    a = this.input;
                require.async("pano:widget/module/PoiSearchModule/MapSearchSuggest/MapSearchSuggest.js", function(i) {
                    i.initialize({
                        input: a,
                        isAutoWidth: !1,
                        adjustTop: 0,
                        hasHistory: !0,
                        showMyPlace: !1,
                        from: "pano",
                        width: 350,
                        "z-index": 100002,
                        onSelect: function(a, i, e) {
                            t.search({
                                wd: a,
                                wd2: i,
                                extra: e,
                                from: "user"
                            })
                        }
                    })
                })
            },
            search: function(t) {
                function a() {
                    if (!e._data.list.content && !e._data.list.isTraffic) {
                        var t = "",
                            a = e._data.list.noResultInfo;
                        return t = a.isGRequest ? '<span class="list_default_text">附近未找到相关地点</span>' : a.isAntiCrawl ? '<span class="list_default_text">操作频繁，请稍后刷新再试</span>' : a.cityName && a.ctype ? '<span class="list_default_text">在' + a.cityName + "及全国范围内未找到相关地点</span>" : '<span class="list_default_text">全国范围内未找到相关地点</span>', void e.listPanel.setTitle(t)
                    }
                    if (!e._data.list.content && e._data.list.isTraffic) {
                        e._data.list.isTraffic = null;
                        var t = "";
                        return t = '<span class="list_default_text">暂不支持搜索路线</span>', void e.listPanel.setTitle(t)
                    }
                    if (e._data.list.isCities) return void e.updateCityList(e._data.list);
                    if (e._data.list.changeCity) return void e.hideListAndMoveInfo();
                    var t = "";
                    t = '<a class="list_title_text" href="javascript:void(0);">列表</a><div class="v-line"></div>', e.listPanel.setTitle(t), e.listPanel.expand(2500)
                }

                function i(t) {
                    var a = t.result,
                        i = a.type,
                        e = {};
                    if (e.json = t, historySearchModel[i]) {
                        if (!a.wd) return;
                        if (!e.cinfo || !e.cinfo.genRequestKey) {
                            var n = {};
                            n.qt = historySearchModel[i], n.wd = a.wd, a.where && (n.wd2 = a.where), hisMgr.setSearchData([n])
                        }
                    }
                }
                var e = this,
                    n = this.getQuery(t);
                if (t = t || {}, n) {
                    var o = {
                            from: "searchBox"
                        },
                        s = "";
                    if (s = n, "function" == typeof o) {
                        o = {}
                    }
                    o = o || {};
                    for (var r = s.split("&"), p = {}, l = 0; l < r.length; l++) {
                        var d = r[l].split("=");
                        2 === d.length && (p[d[0]] = d[1])
                    }
                    this.isPanoSearch = !0;
                    var c;
                    if (e.cityCode) p.c = e.cityCode, e.newSearchParam = r = p, c = e.updatePoiListInfo(r, !1), c.then(function(t) {
                        a(), i(t)
                    });
                    else {
                        var _ = this.bounds;
                        util.getCurrentCityByArea(_.minX, _.minY, _.maxX, _.maxY, function(t) {
                            e.cityCode = t.current_city.code, p.c = e.cityCode, e.newSearchParam = r = p, c = e.updatePoiListInfo(r, !1), c.then(function(t) {
                                a(), i(t)
                            })
                        })
                    }
                }
            },
            getQuery: function(t) {
                var a = {
                    wd: this.input.val()
                };
                a.da_src = "searchBox.button", t = T.extend(a, t);
                var i = this.soleSearch(t);
                return i.code && this.input.focus(), i.query
            },
            soleSearch: function(t) {
                var a = this.filtQuery(t.wd.trim());
                if ("" === a) return {
                    code: 1,
                    query: ""
                };
                var i = t.da_src,
                    e = t.wd2 || "",
                    n = e ? 1 : 0,
                    o = "s&da_src=" + i + "&wd=" + encodeURIComponent(a) + "&src=0&wd2=" + encodeURIComponent(e) + "&sug=" + n + "&from=webmap";
                o += "&sug_forward=" + (t.extra || "");
                var s = location.pathname,
                    r = "";
                document.location.href.indexOf("format=1") > -1 && (r = "&format=1");
                var p = this._panoContext.getPanoOptions(),
                    l = p.currentPoint.x,
                    d = p.currentPoint.y,
                    c = "";
                if (l && d) {
                    var _ = l - 2e3,
                        u = l + 2e3,
                        h = d - 2e3,
                        f = d + 2e3;
                    c = "&b=(" + _ + "," + h + ";" + u + "," + f + ")", this.bounds = {
                        minX: _,
                        maxX: u,
                        minY: h,
                        maxY: f
                    }
                }
                return o = s + modelConfig.DATA_URL + o + r + c + "&refer=pano&ie=utf-8&t=" + (new Date).getTime(), {
                    code: 0,
                    query: o
                }
            },
            filtQuery: function(t) {
                return t = t || "", t.replace(/[\uac00-\ud7a3]/g, "").replace(/\u2022|\u2027|\u30FB/g, String.fromCharCode(183)).replace(/^\s*|\s*$/g, "")
            },
            addPoiListContainer: function() {
                var t = this,
                    a = this.poiListContainer = document.createElement("div"),
                    i = this.listButton = document.createElement("div");
                i.className = "poi-list-title-bar", a.appendChild(i);
                var e = document.createElement("div"),
                    n = this.listPanel = new FoldPanelComponent(i, e, {
                        align: "left",
                        panelWidth: PANEL_WIDTH
                    });
                n.setPosition(LIST_VIEW_LEFT, LIST_VIEW_TOP), a.appendChild(e), this.parentDom.appendChild(a), n.addEventListener("before_expand", function() {
                    t.dispatchEvent("status_changed", {
                        isExpand: !0
                    }), t.infoButton && t._data.list.content && (t.poiDetailContainer.style.transition || (t.poiDetailContainer.style.transition = "opacity " + n.getAnimationDuration() + "ms ease", t.poiDetailContainer.style.webkitTransition = "opacity " + n.getAnimationDuration() + "ms ease", t.poiDetailContainer.style.mozTransition = "opacity " + n.getAnimationDuration() + "ms ease"), t.poiDetailContainer.style.opacity = "0")
                }), n.addEventListener("before_fold", function() {
                    t.infoButton && (t.poiDetailContainer.style.opacity = "1")
                }), this.listenerHandlers = {}, this.listenerHandlers.hidePoiList = function() {
                    t.foldList()
                }, this.listenerHandlers.showPoiList = function() {
                    t.expandList(2500)
                }, this.listenerHandlers.hidePoiDetail = function() {
                    t.poiDetailContainer.style.opacity = "0"
                }, this.listenerHandlers.showPoiDetail = function() {
                    t.poiDetailContainer.style.opacity = "1"
                }, listener.on("panoPoiSearch", "hidePoiList", this.listenerHandlers.hidePoiList), listener.on("panoPoiSearch", "showPoiList", this.listenerHandlers.showPoiList), listener.on("panoPoiSearch", "hidePoiDetail", this.listenerHandlers.hidePoiDetail), listener.on("panoPoiSearch", "showPoiDetail", this.listenerHandlers.showPoiDetail), n.addEventListener("click", function(a) {
                    listPanelAction.call(t, a.target, e)
                });
                var o = void 0;
                n.addEventListener("mouseover", function(a) {
                    for (var i = a.target; i && i !== e;) {
                        var n = i.getAttribute("data-action");
                        if ("goToPoi" === n) {
                            var s = i.getAttribute("data-index");
                            if (s !== o) {
                                o = s;
                                var r = t._data.list.content[s];
                                r.extend(PanoPoi.TYPE.poi).then(function() {
                                    t.dispatchEvent("show_position", {
                                        data: {
                                            x: r.poi.x,
                                            y: r.poi.y
                                        }
                                    })
                                })
                            }
                            break
                        }
                        i = i.parentNode
                    }
                }), n.addEventListener("mouseleave", function() {
                    o = void 0, t.dispatchEvent("hide_position")
                })
            },
            addPoiDetailContainer: function() {
                var t = this,
                    a = this.poiDetailContainer = document.createElement("div"),
                    i = this.infoButton = document.createElement("div");
                i.className = "detail-info-title-bar", a.appendChild(i);
                var e = document.createElement("div"),
                    n = this.infoPanel = new FoldPanelComponent(i, e, {
                        align: "left",
                        panelWidth: PANEL_WIDTH
                    });
                n.setPosition(DETAIL_VIEW_LEFT, DETAIL_VIEW_TOP), a.appendChild(e), this.parentDom.appendChild(a), n.addEventListener("click", function(a) {
                    a.preventDefault(), detailPanelAction.call(t, a.target, e)
                })
            },
            addCityContainer: function() {
                var t = this,
                    a = this.cityListContainer = document.createElement("div");
                a.style.display = "none";
                var i = cityListTemplate({
                    cityList: {
                        content: [],
                        isCities: !0,
                        wd: ""
                    }
                });
                i = T(i), a.appendChild(i[0]), this.parentDom.appendChild(a), a.addEventListener("click", function(a) {
                    cityListAction.call(t, a.target)
                })
            },
            setData: function(t, a, i, e, n) {
                var o, s, r = t instanceof PanoPoi ? t : new PanoPoi(t);
                void 0 === n && (n = !0), s = this.updatePoiDetailInfo(r), a && (o = this.updatePoiListInfo());
                var p = [];
                s && p.push(s), o && p.push(o);
                var l = T.when.apply(T, p),
                    d = this;
                return l.then(function() {
                    if (d._data.list && !d._data.list.content && a) {
                        var t = "";
                        t = '<span class="list_default_text">在本市及全国范围内未找到相关地点</span>', d.listPanel.setTitle(t), d.updateSearchInfo(d._data.list.wd)
                    } else if (!d._data.list || d._data.list.content || a)
                        if (d._data.list && d._data.list.content && d._data.list.isCities) d.updateCityList(d._data.list);
                        else if (d._data.list && d._data.list.content && d._data.list.changeCity) d.hideListAndMoveInfo();
                    else if (d._data.list) {
                        var t = "";
                        t = '<a class="list_title_text" href="javascript:void(0);">列表</a><div class="v-line"></div>', d.listPanel.setTitle(t), d.updateSearchInfo(d._data.list.wd)
                    } else d.hideListAndMoveInfo();
                    else d.hideListAndMoveInfo();
                    var i = document.createElement("p");
                    i.innerHTML = '<i class="poi_default_icon"></i>' + r.poi.name, i.className = "poi_title_text", d.infoPanel.setTitle(i), r.getUid() === e && d.savePoiInfo(), d.listPanel.fold(!0), n && d.infoPanel.expand(2500)
                })
            },
            updateSearchInfo: function(t) {
                var a = t || "";
                this.input.val(a)
            },
            updateCityList: function(t) {
                var a = cityListTemplate({
                    cityList: t
                });
                this.cityListContainer.innerHTML = a, this.showCityList()
            },
            updatePoiListInfo: function(t, a) {
                var i = this;
                t = T.extend(this.newSearchParam, t), t.auth = encodeURIComponent(window.AUTH) || "", t.seckey = encodeURIComponent(window.SECKEY) || "", this.isPanoSearch && (t = baidu.url.jsonToQuery(t, function(t) {
                    return t
                }));
                var e = a || this.isPanoSearch ? util.getSearchResultFromUrl(t) : util.getSearchResultFromPCMap(t);
                if (!e) return null;
                var n = e.then(function(t, a) {
                    if (i.showListAndMoveInfo(), t) {
                        try {
                            t.result.auth && (window.AUTH = t.result.auth)
                        } catch (e) {
                            console.log(e)
                        }
                        if (99 === t.result.type) return i._data.list = {
                            content: null,
                            pageInfo: null,
                            noResultInfo: {
                                isAntiCrawl: !0
                            }
                        }, i.listPanel.setContent("", 0), i.listPanel.ignoreMouseEvent(!0), t;
                        if (!t.content && 0 === t.result.total || 0 === t.result.total && t.content && t.content.length < 1) return addStat(STAT_CODE.STAT_PANORAMA, {
                            item: "pano_search_no_result"
                        }), i._data.list = {
                            content: null,
                            wd: t.wd,
                            pageInfo: null,
                            noResultInfo: {
                                isGRequest: 11 !== t.result.type && 1 === t.result.op_gel ? !0 : !1,
                                cityName: t.current_city ? t.current_city.name : "",
                                ctype: t.current_city ? t.current_city.type : ""
                            }
                        }, i.listPanel.setContent("", 0), i.listPanel.ignoreMouseEvent(!0), t;
                        if (t.result && (t.result.start && t.result.end || t.result.start_city && t.result.end_city)) return i._data.list = {
                            content: null,
                            isTraffic: !0,
                            pageInfo: null
                        }, i.listPanel.setContent("", 0), i.listPanel.ignoreMouseEvent(!0), t;
                        if (t.content instanceof Object && t.content.uid) return addStat(STAT_CODE.STAT_PANORAMA, {
                            item: "pano_search_change_city"
                        }), i.dispatchEvent("pano_error", {
                            data: "CHANGE_CITY",
                            cityName: t.content.cname
                        }), i._data.list = {
                            content: t.content,
                            wd: t.result.wd,
                            changeCity: !0
                        }, t;
                        if (t.content && !t.content[0].uid && t.content[0].code) return i._data.list = {
                            content: t.content,
                            wd: t.wd,
                            isCities: !0
                        }, t;
                        i.listPanel.ignoreMouseEvent(!1);
                        var n = PanoPoi.initWithPoiSearchResult(t);
                        n = getPoiListThumbnail(n, t), i._data.list = n, i._data.listUrl = a, t.current_city && (i._data.poiCity = t.current_city.code);
                        var o = POI_LIST_TEMPLATE({
                            panoPoiList: n
                        });
                        return i.listPanel.setContent(o, getPanelMaxHeight(LIST_VIEW_TOP)), t
                    }
                });
                return n
            },
            updatePoiDetailInfo: function(t) {
                var a = this;
                this._data.poi = t;
                var i = t.extend(PanoPoi.TYPE.pano, PanoPoi.TYPE.poi).then(function() {
                    return "hotel" === t.poi.src ? t.extend(PanoPoi.TYPE.hotel) : "movie" === t.poi.src ? t.extend(PanoPoi.TYPE.movie) : void 0
                });
                return i.then(function() {
                    var i = POI_DETAIL_TEMPLATE({
                        panoPoi: t
                    });
                    a.infoPanel.setContent(i, getPanelMaxHeight(DETAIL_VIEW_TOP)), a.infoPanel.fold(!0), a.dispatchEvent("poi_change", {
                        uid: t.getUid(),
                        x: t.pano.x,
                        y: t.pano.y
                    })
                })
            },
            restorePoiInfo: function() {
                function t(t) {
                    for (var a = 0, i = t.length; i > a; a++)
                        for (var e in PanoPoi.prototype) t[a][e] = PanoPoi.prototype[e]
                }
                this._data = baidu.object.clone(this._saveData), this._data && this._data.poi && t([this._data.poi]), this._data && this._data.list && this._data.list.content && t(this._data.list.content), this.infoPanel.restore(), !this._data.poi && this._data.list && !this._data.list.content
            },
            savePoiInfo: function() {
                this._saveData = baidu.object.clone(this._data), this._saveData || (this._saveData = {
                    poi: void 0,
                    list: void 0,
                    listUrl: void 0
                }), this.infoPanel.save()
            },
            foldAllPanel: function() {
                return this.foldDetail().foldList(), this
            },
            foldDetail: function() {
                return this.infoPanel.fold(), this
            },
            expandDetail: function(t) {
                this.infoPanel.expand(t)
            },
            expandList: function(t) {
                return this.listPanel.expand(t), this
            },
            foldList: function() {
                return this.listPanel.fold(), this
            },
            freeze: function() {
                return this.infoPanel.ignoreMouseEvent(!0), this.listPanel.ignoreMouseEvent(!0), this
            },
            unfreeze: function() {
                return this.infoPanel.ignoreMouseEvent(!1), this.listPanel.ignoreMouseEvent(!1), this
            },
            show: function() {
                this.parentDom.style.display = "block"
            },
            hide: function() {
                this.parentDom.style.display = "none"
            },
            hideListAndDetail: function() {
                this.poiDetailContainer.style.display = "none", this.poiListContainer.style.display = "none"
            },
            showListAndMoveInfo: function() {
                this.cityListContainer.style.display = "none", this.poiListContainer.style.display = "block", this.infoButton.style.top = DETAIL_BUTTON_TOP + "px", this.infoButton.className = "detail-info-title-bar", this.infoPanel.setPosition(DETAIL_VIEW_LEFT, DETAIL_VIEW_TOP)
            },
            hideListAndMoveInfo: function() {
                this.poiListContainer.style.display = "none", this.cityListContainer.style.display = "none", this.infoButton.style.top = LIST_BUTTON_TOP + "px", this.infoButton.className = "detail-info-title-bar-nolist", this.infoPanel.setPosition(LIST_VIEW_LEFT, LIST_VIEW_TOP)
            },
            showCityList: function() {
                this.poiListContainer.style.display = "none", this.cityListContainer.style.display = "block";
                var t = this.cityListContainer.firstElementChild.clientHeight,
                    a = this.infoButton.clientHeight,
                    i = t - a + DETAIL_VIEW_TOP;
                this.infoButton.style.top = i - a + "px", this.infoPanel.setPosition(DETAIL_VIEW_LEFT, i)
            },
            setSelect: function(t) {
                if (this._data.list) {
                    var a = this._data.list.content[t];
                    if (a) {
                        var i = this;
                        PanoPoi.prototype.extend.call(a, PanoPoi.TYPE.poi, PanoPoi.TYPE.pano).then(function() {
                            var e = "";
                            e = void 0 !== a.pano.index ? a.pano.index : t;
                            var n = {
                                poiuid: a.poi.uid,
                                pid: a.pano.pid,
                                panoIId: a.pano.iid,
                                name: a.poi.name,
                                poiType: a.pano.belonging ? "interPoi" : "poi",
                                index: e,
                                heading: a.pano.dir,
                                pitch: a.pano.pitch,
                                x: a.pano.x,
                                y: a.pano.y,
                                px: a.pano.panox,
                                py: a.pano.panoy,
                                rank: a.pano.rank || 100,
                                catalog: a.pano.catalog
                            };
                            i._removePoiSearchMarker(), i._addPoiSearchMarker([n])
                        })
                    }
                }
            },
            _addPoiSearchMarker: function(t) {
                var a = this;
                a._markerIds = [], util.each(t, function(t) {
                    t.markerId = util.getUniqueId("MARKER_"), a._markerIds.push(t.markerId)
                }), this.dispatchEvent("add_markers", t), this.dispatchEvent("poi_search_marker_changed", t)
            },
            _removePoiSearchMarker: function() {
                this.dispatchEvent("poi_search_marker_changed"), this._markerIds && this._markerIds.length && (this.dispatchEvent("remove_markers", this._markerIds), this._markerIds = null)
            },
            getSupportEvents: function() {
                return ["pano_changed", "animate_pano_changed", "add_markers", "poi_search_marker_changed", "remove_markers", "show_position", "hide_position", "pano_error", "close_pano", "status_changed"]
            },
            dispose: function() {
                listener.off("panoPoiSearch", "hidePoiList", this.listenerHandlers.hidePoiList), listener.off("panoPoiSearch", "showPoiList", this.listenerHandlers.showPoiList), listener.off("panoPoiSearch", "hidePoiDetail", this.listenerHandlers.hidePoiDetail), listener.off("panoPoiSearch", "showPoiDetail", this.listenerHandlers.showPoiDetail)
            }
        });
    module.exports = PoiSearchModule
});;
define("pano:widget/module/PoiSearchModule/MapSearchSuggest/MapSearchSuggest.js", function(t, e, a) {
    var i = function(e) {
            function a(t) {
                return (t || "").replace(/</g, "&lt;").replace(/>/g, "&gt;")
            }
            var i = t("common:widget/ui/config/config.js"),
                o = i.modelConfig,
                s = i.mapConfig,
                n = t("common:widget/ui/util/util.js"),
                r = t("common:widget/ui/searchHistory/hisMgr.js"),
                d = t("common:widget/ui/toast/toast.js"),
                u = t("common:widget/ui/userMgr/userMgr.js"),
                l = {
                    input: null,
                    url: "/su",
                    cityId: o.cityCode,
                    type: 0,
                    from: null,
                    adjustTop: 0,
                    adjustLeft: 0,
                    adjustWidth: 0,
                    "z-index": 1e3,
                    top: 0,
                    left: 0,
                    width: 0,
                    isAutoWidth: !1,
                    onSelect: null,
                    onClose: null,
                    onShowWrap: null,
                    onlyPrecise: !1,
                    showMyPlace: !1,
                    hasHistory: !0
                };
            e = T.extend(l, e);
            var c = e.input;
            if (c) {
                "$DOM" !== T.type(c) && (c = e.input = T(e.input));
                var p, g, h, f = "ui3-suggest-item-hover",
                    w = (T(document.body), !0),
                    m = {
                        16: 1,
                        17: 1,
                        18: 1,
                        27: 1,
                        91: 1,
                        38: 1,
                        40: 1,
                        13: 1
                    },
                    y = {
                        SHIFTLEFT: 16,
                        CONTROLLEFT: 17,
                        ALTLEFT: 18,
                        ESCAPE: 27,
                        WINSTART: 91,
                        UPARROW: 38,
                        DOWNARROW: 40,
                        ENTER: 13,
                        TAB: 9
                    },
                    v = g = {
                        work: function() {
                            g.isInSuggestList = !1, this.bindInputEvents()
                        },
                        bindInputEvents: function() {
                            c.on("keyup", this.processKeyUp).on("keydown", this.processKeyDown).on("focus", this.processFocus).on("click", this.processClick).on("blur", this.processBlur).on("copy", this.processCopy).on("paste", this.processPaste)
                        },
                        processFocus: function() {
                            this.onBlur = !1
                        },
                        processBlur: function() {
                            g.isInSuggestList || (this.onBlur = !0, setTimeout(function() {
                                g.hide()
                            }, 100))
                        },
                        processClick: function() {
                            !e.hasHistory || "" !== T.trim(c.val()) || g.onEnter || g.onBlur || setTimeout(function() {
                                g.processData(), "pano" === e.from
                            }, 200)
                        },
                        processKeyDown: function(t) {
                            function a(t) {
                                var e = t ? !1 : {
                                    extra: l.attr("data-extra")
                                };
                                c.data("sugData", e)
                            }
                            g.onPaste = !1, g.onCopy = !1, g.onEnter = !1, g.onBlur = !1;
                            var i = t.keyCode;
                            if (i !== y.ENTER && c.data("sugData", !1), !(i in m && p)) return i !== y.ENTER || p || (g.onEnter = !0), void(i === y.TAB && (g.onBlur = !0));
                            i === y.ESCAPE && g.hide();
                            var o, s, n, u = g.userKey;
                            p && (s = p.find("." + f)), s && !s.length ? o = 0 : s && (o = s.prevAll("li").length + 1), p && (n = p.find("li"));
                            var l, h;
                            if (i === y.UPARROW && (0 === o ? (l = n.eq(-1).addClass(f), c.val(l.attr("data-key"))) : (s.removeClass(f), 1 === o ? (c.val(u), h = !0) : (l = n.eq(o - 2).addClass(f), c.val(l.attr("data-key")))), a(h)), i === y.DOWNARROW) {
                                var w = 0;
                                void 0 !== g.list ? w = g.list.length : void 0 !== g.hisList && null !== g.hisList && (w = g.hisList.length), 0 === o ? (l = n.eq(0).addClass(f), c.val(l.attr("data-key"))) : (s.removeClass(f), o === n.length ? (c.val(u), h = !0) : (l = n.eq(o).addClass(f), c.val(l.attr("data-key")))), a(h)
                            }
                            if (i === y.ENTER) {
                                if (g.hide(), 0 === o) return void(g.onEnter = !0);
                                var v = s.attr("data-target");
                                if (v);
                                else {
                                    var S = s.attr("data-key"),
                                        x = s.attr("data-location"),
                                        k = s.attr("data-extra") || "";
                                    if (c.val(S), "clear" === k) return r.clearSearchData(), void d.show("删除成功");
                                    e.onSelect && e.onSelect.call(this, S, x, k)
                                }
                            }
                            t.preventDefault(), t.stopPropagation()
                        },
                        processInput: function() {},
                        processPaste: function() {
                            g.onPaste = !0
                        },
                        processCopy: function() {
                            g.onCopy = !0
                        },
                        processKeyUp: function(t) {
                            if (!g.onPaste && !g.onCopy) {
                                var a = t.keyCode;
                                if (!(a in m)) {
                                    var i = c.val();
                                    if (i !== g.userKey) {
                                        if ("" === i && g.wrap) {
                                            if (g.hide(), !e.hasHistory) return;
                                            g.processData()
                                        }
                                        g.userKey = i, g.sendRequest({
                                            url: e.url,
                                            cityId: e.cityId,
                                            query: i,
                                            type: e.type
                                        })
                                    }
                                }
                            }
                        },
                        sendRequest: function(t) {
                            if ("" !== t.query) {
                                t = T.extend({
                                    url: "",
                                    query: "",
                                    cityId: "",
                                    type: ""
                                }, t);
                                var a = n.formatBounds({
                                    margins: [0, 0, 0, s.leftMargin]
                                });
                                0 === g.readyState ? clearTimeout(g.timeout) : 1 === g.readyState && g.xhr.abort(), g.readyState = 0, g.timeout = setTimeout(function() {
                                    g.readyState = 1, g.xhr = T.ajax(t.url, {
                                        dataType: "json",
                                        data: {
                                            wd: t.query,
                                            cid: t.cityId || e.cityId,
                                            type: t.type,
                                            newmap: 1,
                                            b: a,
                                            t: +new Date,
                                            pc_ver: 2
                                        },
                                        success: function(e) {
                                            g.readyState = 2, g.data = e, e && g.processData(t.query, "search")
                                        }
                                    })
                                }, 200)
                            }
                        },
                        processData: function(t) {
                            var a = this;
                            if (t) {
                                if ("" === T.trim(c.val()) || g.onEnter || g.onBlur) return;
                                var i = this.data,
                                    o = i.s;
                                if (!o || !o.length) return void this.hide();
                                var s = r.getSearchData();
                                s.done(function(e) {
                                    a.generateHTML({
                                        query: t,
                                        sug: o,
                                        history: e
                                    })
                                })
                            } else {
                                var s = r.getSearchData();
                                s.done(function(t) {
                                    t.length || e.showMyPlace ? a.generateHTML({
                                        history: t
                                    }) : (a.wrap && a.wrap.hide(), "search" === e.from && a.generateHTML({
                                        history: t
                                    }))
                                })
                            }
                        },
                        generateHTML: function(t) {
                            function a() {
                                var a, i, o = t.history,
                                    s = [],
                                    n = 0;
                                if (t.query) {
                                    o.length && e.hasHistory && T.each(o, function(e, a) {
                                        a.wd.indexOf(t.query) >= 0 && s.length < 3 && s.push(a)
                                    }), a = g.processList(s, 2), 0 !== s.length, n = n + s.length + t.sug.length - 10;
                                    for (var r = 0; n > r; r++) t.sug.pop();
                                    i = g.processList(t.sug, 0), g.list = t.sug, h = "sug", p.find("ul").empty().append(a + i)
                                } else {
                                    var i = "";
                                    h = "history", o.length && (i += g.processList(o, 2, "only-history")), g.hisList = o, p.find("ul").empty().append(i)
                                }
                                listener.trigger("panoPoiSearch", "hidePoiList"), listener.trigger("panoPoiSearch", "hidePoiDetail")
                            }
                            t.history;
                            if (this.wrap) a();
                            else {
                                if (window.panoSearchSuggestWrapper) p = this.wrap = window.panoSearchSuggestWrapper.hide().remove();
                                else {
                                    var i = ['<div class="pano-suggest-wrap" id="pano-suggest-wrap">', '<div id="pano-suggest-scroll">', "    <ul>", "    </ul>", "</div>", "</div>"];
                                    window.panoSearchSuggestWrapper = p = this.wrap = T(i.join(""))
                                }
                                this.setPosAndSize(), a(), p.appendTo(document.body)
                            }
                            this.bindSuggestEvents(), p.suggestInputTarget !== c && (w = !1, this.setPosAndSize()), this.bindGEvents(), listener.trigger("pano.suggest", "show"), p.show(), p.find("li").width(p.width());
                            var o = T("#pano-suggest-scroll");
                            o.width(p.width());
                            var s = document.documentElement.clientHeight - p.offset().top - 70,
                                n = p.find("ul").height();
                            s = Math.min(s, n), o.height(s), 10 > s && p.hide(), addStat("searchbox.sug.show", "show", {
                                da_e_name: "pcmap3"
                            }), p.suggestInputTarget = c, e.onShowWrap && e.onShowWrap.call(this, p, c)
                        },
                        bindGEvents: function() {
                            var t = this;
                            window.hasPanoSearchSuggestGEvents || (window.panoSearchSuggestGEvents = function() {
                                t.hide(), window.hasPanoSearchSuggestGEvents = !1, map.removeEventListener("mousedown", window.panoSearchSuggestGEvents)
                            }, map.addEventListener("mousedown", window.panoSearchSuggestGEvents), window.hasPanoSearchSuggestGEvents = !0)
                        },
                        processList: function(t, a, i) {
                            var o = [];
                            if (T.each(t, function(t, i) {
                                    var s;
                                    0 === a ? (i = i.split("$"), (!e.onlyPrecise || i[5]) && (s = g.processItem("sug", i[3], i[0] + i[1] + i[2], i[5]), o.push(s))) : 1 === a || (2 === a ? (s = g.processItem("history", i.wd, i.wd2, "", "history", i.platform ? i.platform : "3"), o.push(s)) : 3 === a && (i = i.split("-"), s = g.processItem("history", i[0], i[1]), o.push(s)))
                                }), 2 === a && "only-history" === i) {
                                var s = "删除历史";
                                ("route" === e.from || "infowindow" === e.from) && (s = "删除历史");
                                var n = ['<li class="clear-history" data-extra="clear">', '<span class="clear-login"><a class="clear-login-link">立即登录</a>可查看更多历史记录</span>', '<a class="clear-link">', s, "</a>", "</li>"];
                                o.push(n.join(""))
                            }
                            return o.join("")
                        },
                        processMyPlaceList: function() {},
                        processItem: function(t, e, i, o, s, n) {
                            s = s ? s : "default";
                            var r = ['<li class="ui3-suggest-item" data-from="', n, '" data-type="', t, '" data-key="', e, '" data-location="', i, '" data-extra="', o, '">', " <a>", ' <i class = "', s, '">', a(e), "</i>", " <em>", a(i), "</em>", " </a>", "</li>"];
                            return r.join("")
                        },
                        setPosAndSize: function() {
                            var t = this.wrap,
                                a = c.offset(),
                                i = {
                                    width: c.outerWidth(),
                                    height: c.outerHeight()
                                },
                                o = e.isAutoWidth ? 0 : e.width || i.width + e.adjustWidth;
                            if (t.css({
                                    top: e.top || a.top + i.height + e.adjustTop,
                                    left: e.left || a.left + e.adjustLeft,
                                    zIndex: e["z-index"] || 1e3
                                }), e.isAutoWidth) t.css({
                                "min-width": o
                            });
                            else {
                                var o = e.width || i.width + e.adjustWidth;
                                t.css({
                                    width: o
                                })
                            }
                        },
                        bindSuggestEvents: function() {
                            this.wrap.find(".city-special-item,.city-normal-item").on("click", function() {
                                g.hide();
                                var t = $(this),
                                    a = t.attr("data-key"),
                                    i = (t.attr("data-stat-code"), p.suggestInputTarget);
                                i.val(a), e.onSelect && e.onSelect.call(this, a)
                            }).bind("mousedown", function() {
                                g.isInSuggestList = !0
                            }).bind("mouseup", function() {
                                g.isInSuggestList = !1, g.hide()
                            }), this.wrap.find(".clear-login-link").bind("click", function() {
                                addStat("multi.history.login", "click", {
                                    da_e_name: "pcmap3",
                                    da_trd: e.from
                                }), u.login(void 0, void 0, "sug-his")
                            }), this.wrap.find(".clear-link").bind("click", function() {
                                g.hide(), r.clearSearchData(), d.show("删除成功"), addStat("searchbox.history.clear", "click", {
                                    da_e_name: "pcmap3"
                                })
                            }), this.wrap.find("li").bind("click", function(t) {
                                var a = (T(t.target), T(this));
                                if (!a.hasClass("clear-history")) {
                                    var i = a.attr("data-type"),
                                        o = a.attr("data-key"),
                                        s = a.attr("data-location"),
                                        n = a.attr("data-extra") || "",
                                        r = a.attr("data-from") || "web";
                                    if (this.getAttribute("data-target")) return void g.hide();
                                    var d = p.suggestInputTarget;
                                    d.val(o), e.onSelect && e.onSelect.call(this, o, s, n), "sug" === i || "history" === i && (e.from && "route" === e.from ? addStat("route.sug.history.click", "click", {
                                        da_e_name: "pcmap3",
                                        da_trd: r
                                    }) : "sug" === h ? addStat("searchbox.sug.history.click", "click", {
                                        da_e_name: "pcmap3",
                                        da_trd: r
                                    }) : e.from && "search" === e.from ? addStat("searchbox.history.click", "click", {
                                        da_e_name: "pcmap3",
                                        da_trd: r
                                    }) : e.from && "infowindow" === e.from && addStat("infowindow.history.click", "click", {
                                        da_e_name: "pcmap3",
                                        da_trd: r
                                    })), g.hide()
                                }
                            }).bind("mouseenter", function() {}).bind("mouseleave", function() {}).bind("mousedown", function() {
                                g.isInSuggestList = !0
                            }).bind("mouseup", function() {
                                g.isInSuggestList = !1, g.hide()
                            }), e.showMyPlace
                        },
                        hide: function() {
                            window.panoSearchSuggestWrapper && (p = window.panoSearchSuggestWrapper, p.hide(), 0 === g.readyState ? clearTimeout(g.timeout) : 1 === g.readyState && g.xhr.abort(), listener.trigger("pano.suggest", "hide"), listener.trigger("panoPoiSearch", "showPoiDetail"))
                        }
                    };
                return v.work(), {
                    hide: v.hide,
                    wrap: p
                }
            }
        },
        o = '.pc .pano-suggest-wrap{font-family:Arial,Helvetica,"Microsoft YaHei",sans-serif;z-index:100001}.pano-suggest-wrap #pano-suggest-scroll{width:100%;overflow-y:auto;overflow-x:hidden}.pano-suggest-wrap{position:absolute;background-color:#252525;border-top:1px solid #202020;display:none;box-shadow:1px 2px 1px rgba(0,0,0,.15);border-radius:0 0 2px 2px}.pano-suggest-wrap .ui3-suggest-item a{display:block;height:35px;line-height:35px;padding-right:10px;text-decoration:none;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.pano-suggest-wrap .ui3-suggest-item i{padding-left:39px;font-style:normal;color:#666;position:relative;z-index:1;padding-top:1px}.pano-suggest-wrap .ui3-suggest-item .history{background:url(//webmap0.bdimg.com/wolfman/static/pano/images/pano_whole/suggestion_icon_a0251d1.png) no-repeat 12px 2px}.pano-suggest-wrap .ui3-suggest-item .default{background:url(//webmap0.bdimg.com/wolfman/static/pano/images/pano_whole/suggestion_icon_a0251d1.png) no-repeat 12px -12px}.pano-suggest-wrap .ui3-suggest-item em{margin-left:10px;margin-right:20px;font-style:normal;color:#999}.pano-suggest-wrap .clear-history{border-top:1px solid #202020;overflow:hidden}.pano-suggest-wrap .clear-history .clear-link{height:35px;line-height:35px;text-decoration:none;color:#B2B2B2;float:right;padding:0 10px}.pano-suggest-wrap .clear-history .clear-link:hover{background-color:#434448}.pano-suggest-wrap .clear-history .clear-login-link:hover{text-decoration:underline}.pano-suggest-wrap .clear-history .clear-login{height:35px;line-height:35px;float:left;color:#333;display:none}.pano-suggest-wrap .clear-history .clear-login-link{text-decoration:none;color:#3385ff;padding:0 5px 0 30px;background:url(/static/images/unloginSug.gif) no-repeat 10px 5px;float:left;height:35px}.pano-suggest-wrap .ui3-suggest-item-hover a,.pano-suggest-wrap .ui3-suggest-item:hover a{background-color:#434448}.pano-suggest-wrap .ui3-suggest-item-hover em,.pano-suggest-wrap .ui3-suggest-item:hover em{}.pano-suggest-wrap strong{color:#999;float:right;margin-right:15px;display:none;position:relative;z-index:2}.pano-suggest-wrap .ui3-suggest-item-hover strong{display:block}.pano-suggest-wrap .ui3-suggest-item-hover strong:hover{color:#666}';
    t.loadCss({
        content: o,
        name: "MapSearchSuggest"
    }), a.exports = {
        initialize: i
    }
});