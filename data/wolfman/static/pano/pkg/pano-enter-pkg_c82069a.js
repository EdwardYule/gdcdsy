define("pano:widget/StreetViewTool/StreetViewTool.js", function(t, e, o) {
    function i(t) {
        this._map = t.map || map, w = this, this.isOpen = !1, this.isBtnActionOpen = !1, this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT, this.defaultOffset = new BMap.Size(m, g), h = this._map.getMaxZoom(), f = this._map.getMaxZoom() - 1, this.ICON = ["0px 26px", "-49px -26px"]
    }
    var n, s, r = t("pano:widget/StreetViewTool/MarkController.js"),
        a = (t("common:widget/ui/util/util.js"), t("pano:widget/base/service.js")),
        p = t("common:widget/ui/config/config.js"),
        l = p.modelConfig,
        u = t("common:widget/ui/mapTypeTab/mapTypeTab.js"),
        c = [2284],
        d = function(t) {
            var e = window.G_POC || [],
                o = !1;
            t = t || l.cityCode;
            for (var i = 0; i < e.length; i++) t == e[i] && (o = !0);
            for (var i = 0; i < c.length; i++) t === c[i] && (o = !0);
            return o
        },
        h = 19,
        f = 18,
        g = 50,
        m = 9,
        w = null;
    i.prototype = new BMap.Control, i.prototype.initialize = function() {
        var t = this,
            e = this.streetTool = this.btn = T('<a data-model="streetViewTool" href="#" onclick="return false" class="ui3-street-view ui3-control-shadow"><div class="ui3-street-view-top"></div><div class="ui3-street-view-bottom">全景</div></a>'),
            o = this.stMapTypeTabDomT = u.getPanoProxy().getPanoCard(),
            i = a.getCursorPic();
        return i.then(function(i) {
            t.cursorConfig = i, i.streetviewtools.icon && (e.find(".ui3-street-view-top").css("background", "url(" + i.streetviewtools.icon + ") no-repeat"), o.css("background", "url(" + i.streetviewtools.icon + ") no-repeat"));
            var n = t._map.getContainer();
            n.appendChild(e[0])
        }), this._addEvents(), e[0]
    }, i.prototype._addEvents = function() {
        var e = this,
            o = window,
            i = this.streetTool;
        baidu.on(i, "click", function() {
            d() ? (n = null, e.stEntranceDomClickHandler("openTemp")) : t.async("pano:widget/module/PanoCityPageModule/PanoCityPageModule.js", function(t) {
                var e = new t;
                e.initialize(l.cityCode)
            })
        }), this._map.addEventListener("maptypechange", function(t) {
            var o = t.mapType;
            o === BMAP_EARTH_MAP ? (e.hide(), e.close()) : (e.setPostion(), e.isOpen && e.markController.updateRoadLayer())
        }), this._map.addEventListener("zoomend", function() {
            var t = e._map.getZoom();
            d() && h > t && e.isOpen && !s && "mouseScroll" == n && e.close()
        }), this._map.addEventListener("rightclick", function() {
            e.isOpen && (e.close(), window.contextMenu.disable(), setTimeout(function() {
                window.contextMenu.enable()
            }, 250))
        });
        var r = function() {
                e.isOpen && e.markController && e.markController.pause()
            },
            a = function() {
                e.isOpen && e.markController && e.markController.resume()
            };
        baidu.on(i, "mouseover", r), baidu.on(i, "mouseout", a), o.stdMapCtrl && o.stdMapCtrl.addEventListener("mouseover", r), o.stdMapCtrl && o.stdMapCtrl.addEventListener("mouseout", a)
    }, i.prototype.stEntranceDomClickHandler = function(e) {
        var o = this;
        if (e)
            if (d()) {
                if (n = null, "openTemp" === e) return void o.toggle();
                o.open()
            } else t.async("pano:widget/module/PanoCityPageModule/PanoCityPageModule.js", function(t) {
                var e = new t;
                e.initialize(l.cityCode)
            });
        else o.close()
    }, i.prototype.bindKeyEvent = function() {
        this.enableEscapeQuit();
        var t = this,
            e = T.browser.ie && T.browser.ie <= 7 ? "keypress" : "keydown";
        baidu.on(document, e, function(o) {
            if (27 == o.keyCode && t.isEnableKey) {
                t.isOpen && t.close();
                var i = arguments.callee;
                T.un(document, e, i), i = null
            }
        })
    };
    var C = function() {
        var t = T.G("defCityTip");
        t && (t.style.display = "none")
    };
    i.prototype.setTools = function() {
        var t = window;
        t.captureCtrl && t.captureCtrl.endCapture(), t.MapSignInst && t.MapSignInst.exituserSign()
    }, i.prototype.loadStreetView = function() {
        this._map.closeInfoWindow();
        var t = window;
        if (t.captureCtrl && t.captureCtrl.endCapture(), t.MapSignInst && t.MapSignInst.exituserSign(), t.weipaiTool) {
            {
                t.weipaiTool.wpClick
            }
            t.weipaiTool.isOpen && t.weipaiTool.resetStatus()
        }
        this.markController = new r({
            map: this._map
        }), this.bindKeyEvent()
    }, i.prototype.setPostion = function() {
        this.isVisible() && this.setOffset(this.defaultOffset)
    }, i.prototype.getToolPos = function() {
        var t = T.dom.getPosition(this._map.getContainer()),
            e = this.getDom(),
            o = this.getOffset(),
            i = o.width + e.clientWidth + 10,
            n = o.height + t.top;
        return {
            top: n,
            right: i
        }
    }, i.prototype.open = function() {
        if (!this.isOpen) {
            this.isOpen = !0, window.listener.trigger("pano.model.state", "change", {
                state: "open"
            }), window.toolsMediator.addActive(this.streetTool), addStat(STAT_CODE.STAT_PANORAMA, {
                catalog: "tool",
                func: "click"
            });
            var t = this._map.getBounds(),
                e = this;
            a.checkBounds(t, function(t) {
                t && 0 == t.error && t.content ? e.loadStreetView() : (e.disableEscapeForQuit(), e.isOpen = !1, e._map.setDefaultCursor(e.cursorConfig.streetviewtools.cursor ? e.cursorConfig.streetviewtools.cursor : e._map.config.defaultCursor))
            })
        }
    }, i.prototype.close = function() {
        if (this.isOpen) {
            this.isOpen = !1, window.listener.trigger("pano.model.state", "change", {
                state: "close"
            });
            window.panoExitMarker && window.panoExitMarker.hide(), window.toolsMediator.removeActive(this.streetTool), C(), this._map.setDefaultCursor(this._map.config.defaultCursor), this._map.setDraggingCursor(this._map.config.draggingCursor), this.setPostion(), this.markController && this.markController.dispose()
        }
    }, i.prototype.resetStatus = function() {
        this.close()
    }, i.prototype.hideDialog = function() {
        this.close()
    }, i.prototype.toggle = function() {
        this.isOpen ? this.close() : this.open()
    }, i.prototype.enableEscapeQuit = function() {
        this.isEnableKey = !0
    }, i.prototype.disableEscapeQuit = function() {
        this.isEnableKey = !1
    }, i.getShareInstance = function() {
        return w
    }, o.exports = i
});;
define("pano:widget/StreetViewTool/MarkController.js", function(e, t, i) {
    function n(e) {
        T.lang.Class.call(this), this.map = e.map, this.initialize(e)
    }
    var o = (window.Pano = window.Pano || {}, e("pano:widget/StreetViewTool/PanoOverlay.js")),
        a = e("pano:widget/base/service.js"),
        r = e("pano:widget/PanoInterface/PanoInterface.js"),
        s = (e("common:widget/ui/config/config.js"), e("pano:widget/StreetViewTool/PanoLayer.js")),
        p = e("pano:widget/StreetViewTool/PanoPoiClick.js");
    T.lang.inherits(n, T.lang.Class, "MarkController"), T.object.extend(n.prototype, {
        isPause: !1,
        fetchTimer: 0,
        initialize: function() {
            var e = -1e3,
                t = -1e3,
                i = this.getMapPoint(e, t);
            this.panoMarker = new o(i, {}), this.map.addOverlay(this.panoMarker), this.panoMarker.hideBubble(), this.roadLayer = new s(this.map, this.panoMarker), this.panoPoiClick = new p(this.map, this.panoMarker), this.roadLayer.addEventListener("spotclick", function(e) {
                r.showPano({
                    panoIId: e.panoUid,
                    panoType: "inter"
                })
            }), this.bindEvents(), this.hasEvents = !0, window.MPC_Mgr && window.MPC_Mgr.removeSpotEvent(), this.roadLayer.show()
        },
        bindEvents: function() {
            var e = this,
                t = (this.guid, this.map),
                i = null,
                n = null;
            mc = t.getContainer();
            var o = function() {
                    var e = (new Date).getTime();
                    return i && i > 0 && 500 > e - i ? !0 : (i = e, !1)
                },
                a = function(t) {
                    e.mouseMoveEvent(t)
                },
                r = function() {
                    e.resume()
                },
                s = function() {
                    e.pause()
                },
                p = function(t) {
                    var i = o();
                    n || (n = setTimeout(function() {
                        e.streetViewMapClick(t), n = null
                    }, 300)), i === !0 && (clearTimeout(n), n = null)
                },
                u = function() {
                    e.pause()
                },
                h = function() {
                    e.resume()
                };
            baidu.on(mc, "mouseenter", r), baidu.on(mc, "mouseleave", s), t.addEventListener("click", p), t.addEventListener("mousemove", a), t.addEventListener("moving", u), t.addEventListener("moveend", h), this.removeEvents = function() {
                baidu.un(mc, "mouseenter", r), baidu.un(mc, "mouseleave", s), t.removeEventListener("click", p), t.removeEventListener("mousemove", a), t.removeEventListener("moving", u), t.removeEventListener("moveend", h)
            }
        },
        streetViewMapClick: function(e) {
            if (!e.overlay || e.overlay instanceof BMap.Polygon || e.overlay instanceof BMap.Polyline) {
                {
                    this.guid, this.map.getContainer()
                }
                this.map.removeEventListener("mousemove", this.streetViewMove), this.panoMarker && this.panoMarker.dragTimer && window.clearTimeout(this.panoMarker.dragTimer), this.showStreetView(e.point)
            }
        },
        mapRightClick: function() {
            this.resetStatus(), this.panoTool && this.panoTool.resetStatus()
        },
        resetStatus: function() {
            this.isOpen = !1, this.curPixel = null, this.removeEvents(), this.panoMarker && this.panoMarker.hide()
        },
        getMapPoint: function(e, t) {
            if (!isNaN(e) && !isNaN(t)) {
                var i = this.map,
                    n = i.getContainer(),
                    o = T.dom.getPosition(n),
                    a = e - o.left,
                    r = t - o.top,
                    s = new BMap.Pixel(a, r);
                return i.pixelToPoint(s)
            }
        },
        mouseMoveEvent: function(e) {
            if (!this.isPause) {
                var t = e.point,
                    i = e.pixel,
                    n = this.panoMarker.isOnIndoorIcon();
                if (!(!e.overlay || n || e.overlay instanceof BMap.Polygon || e.overlay instanceof BMap.Polyline)) return void this.panoMarker.hide();
                n || this.panoMarker.redraw(null, t, i, !1), this.curPixel = i;
                var o = this;
                this.fetchTimer && window.clearTimeout(this.fetchTimer), this.fetchTimer = window.setTimeout(function() {
                    o.panoMarker._setDefDirect(), a.getStreetBriefByLocation({
                        point: t,
                        level: o.map.getZoom()
                    }, function(e) {
                        if (o.isPause) return void o.panoMarker.hide();
                        var a = e.content;
                        n ? (o.panoMarker.show(), o.panoMarker.showBubble()) : a ? (o.panoMarker.showBubble(), o.panoMarker.show(), o.panoMarker.redraw(a, t, i, !1)) : o.panoMarker.hideBubble()
                    })
                }, 200)
            }
        },
        showStreetView: function(e) {
            var t = (this.map.getContainer(), this);
            a.getStreetBriefByLocation({
                point: e,
                level: t.map.getZoom(),
                from: "mapclick"
            }, function(e) {
                0 == e.error && e.content && e.content.id ? (t.setPanoMap(e), setTimeout(function() {
                    t.map.addEventListener("mousemove", t.streetViewMove)
                }, 500)) : t.map.addEventListener("mousemove", t.streetViewMove)
            }, t)
        },
        setPanoMap: function(e) {
            var t = e.content.id,
                i = e.content.point,
                n = {
                    panoId: t,
                    panoType: "street",
                    interPosition: i
                };
            r.showPano(n), addStat(STAT_CODE.STAT_PANORAMA, {
                item: "street",
                catalog: "map",
                func: "click",
                from: "pc-map"
            })
        },
        pause: function() {
            this.isPause || (this.panoMarker.hide(), this.isPause = !0)
        },
        resume: function() {
            this.isPause && (this.isPause = !1)
        },
        updateRoadLayer: function() {
            this.roadLayer.update()
        },
        dispose: function() {
            this.resetStatus(), this.roadLayer.hide(), this.panoPoiClick && (this.panoPoiClick.dispose(), window.MPC_Mgr.bindMouseMove(), window.MPC_Mgr.bindSpotEvent()), this.removeEvents(), this.panoMarker.remove(), this.isPause = !0
        }
    }), i.exports = n
});;
define("pano:widget/StreetViewTool/PanoOverlay.js", function(t, e, i) {
    function o(t, e) {
        var i = "//mapsv0.bdimg.com/scape/?udt=201400606&qt=idata&iid=" + t;
        baidu.jsonp(i, function(t) {
            var i = t.content[0].interinfo,
                o = null,
                n = "",
                s = "",
                r = "";
            if (i && i.Floors.length > 0) {
                for (var p = i.Floors.length - 1; p >= 0; p--) i.Floors[p].Floor == i.Defaultfloor && (o = i.Floors[p].Points[0]);
                o && (n = o.PID, s = o.movedir, r = 0)
            }
            var h = encodeURIComponent(window.AUTH) || "",
                l = encodeURIComponent(window.SECKEY) || "",
                d = a.urlConfig.PANO_3DIMAGE_URL + "/?qt=pr3d&fovy=75&quality=80&panoid=" + n + "&heading=" + s + "&pitch=" + r + "&width=100&height=75&from=PC&auth=" + h + "&seckey=" + l;
            e(d)
        }, {
            cbtype: "fn"
        })
    }

    function n(t, e, i) {
        0 != e.indexOf("on") && (e = "on" + e);
        var o = new baidu.lang.Event(e);
        if (i)
            for (var n in i) o[n] = i[n];
        t.dispatchEvent(o)
    }
    var s = t("common:widget/ui/util/util.js"),
        a = (t("pano:widget/base/service.js"), t("common:widget/ui/config/config.js")),
        r = "url(https://map-mobile-lbsapp.cdn.bcebos.com/b5f6c55081f105356409ac095da38701.png)",
        p = function(t, e) {
            t && t instanceof BMap.Point && (this._map = null, this._container = null, this._size = null, this.enableMove = !0, this._visible = !0, e = e || {}, this._opts = baidu.extend(baidu.extend(this._opts || {}, {
                anchor: new BMap.Size(0, 0)
            }), e), this.PANO_IMG = "url(//webmap0.bdimg.com/wolfman/static/pano/images/panorama/pano_markers_1959b18.png)", this.PANO_IMG_PNG8 = "url(//webmap0.bdimg.com/wolfman/static/pano/images/panorama/pano_markers_png8_c9f79d0.png)", this.BUBBLE_IMG = "url(//webmap1.bdimg.com/wolfman/static/pano/images/street_overview_04ceb33.gif)", this.PANO_OFFSET_ICON = ["-408px -72px", "-384px -72px", "-432px -72px"], this.PANO_OFFSET = [25, 42], this.MOVE_DIRECT = {
                LEFT: 0,
                MIDDLE: 1,
                RIGHT: 2
            }, this.preX = 0, this.preY = 0, this.BUBBLE_OFFSET = [
                [0, 0],
                [75, 75],
                [0, 165],
                [-75, 75]
            ], this.BUBBLE_CLS = [{
                width: 112,
                height: 122,
                backgroundPosition: "-2px -2px",
                _margin: "3px 0px 0 3px",
                _txtMargin: "auto",
                _ie6Margin: "5px 3px 3px 3px"
            }, {
                width: 125,
                height: 112,
                backgroundPosition: "-2px -135px",
                _margin: "3px 0px 0 16px",
                _txtMargin: "auto auto auto 17px",
                _ie6Margin: "5px 3px 3px 17px"
            }, {
                width: 112,
                height: 122,
                backgroundPosition: "-122px -2px",
                _margin: "15px 3px 0 3px",
                _txtMargin: "auto",
                _ie6Margin: "17px 3px 3px 3px"
            }, {
                width: 122,
                height: 112,
                backgroundPosition: "-133px -133px",
                _margin: "3px 17px 0 3px",
                _txtMargin: "auto 3px",
                _ie6Margin: "5px 16px 3px 3px"
            }], this.defPos = new BMap.Pixel(0, 0), this.defStatus = 0, this.preDirect = 1, this.imgSize = 75, this.defImg = "//webmap0.bdimg.com/wolfman/static/pano/images/streetview_no_5a81976.png")
        };
    p.prototype = new BMap.Overlay, p.prototype.initialize = function(t) {
        var e = this,
            i = e._container = document.createElement("div");
        return e._map = t, baidu.extend(i.style, {
            zIndex: 99999,
            background: "#FFF",
            cursor: "auto"
        }), e._setOverlayContent(), e._getContainerSize(), i
    }, p.prototype.draw = function() {}, p.prototype.enable = function() {
        this.enableMove = !0
    }, p.prototype.disable = function() {
        this.enableMove = !1
    }, p.prototype.hidePanoCursor = function() {
        this.panoCursor.style.display = "none"
    }, p.prototype.showPanoCursor = function() {
        this.panoCursor.style.display = "block"
    }, p.prototype._getContainerSize = function() {
        if (this._container) {
            var t = this._container.offsetHeight,
                e = this._container.offsetWidth;
            this._size = new BMap.Size(e, t)
        }
    }, p.prototype.remove = function() {
        n(this, "onremove"), this._container && s.purgeEvents(this._container), this._container && this._container.parentNode && this._container.parentNode.removeChild(this._container)
    }, p.prototype._setOverlayContent = function() {
        var t = this.panoCursor = document.createElement("div"),
            e = this.bubble = document.createElement("div"),
            i = this.bubImgHolder = document.createElement("div"),
            o = this.bubbleImg = document.createElement("img"),
            n = this.bubbleTxt = document.createElement("div"),
            s = baidu.browser.ie < 7 ? this.PANO_IMG_PNG8 : r,
            a = this._map.platform.style.cursor;
        baidu.extend(t.style, {
            position: "absolute",
            backgroundImage: s,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "-384px -72px",
            cursor: a,
            width: "24px",
            height: "40px"
        }), baidu.extend(e.style, {
            position: "absolute",
            backgroundImage: this.BUBBLE_IMG,
            backgroundRepeat: "no-repeat",
            overflow: "hidden",
            padding: "3px",
            zoom: 1
        }), baidu.extend(o.style, {
            width: "100px",
            height: "75px"
        }), baidu.extend(n.style, {
            width: "100px",
            height: "19px",
            lineHeight: "19px",
            overflow: "hidden",
            font: "13px"
        }), i.appendChild(o), e.appendChild(i), e.appendChild(n), this._container.appendChild(t), this._container.appendChild(e), this._map.getPanes().labelPane.appendChild(this._container);
        var p = this.tipDom = document.createElement("div");
        p.innerHTML = '<div class="tip_cont">右键关闭全景模式</div>', baidu.extend(p.style, {
            border: "1px solid #dbb051",
            color: "#666",
            backgroundColor: "#fcfef1",
            position: "absolute",
            textAlign: "center",
            padding: "0 10px",
            height: "22px",
            lineHeight: "22px",
            top: "9px",
            left: "35px",
            whiteSpace: "nowrap"
        }), t.appendChild(p), this.panoCursor.style.left = "-1000px", this.panoCursor.style.top = "-1000px", this._bindEvents(), this.autoHideTipTimer = setTimeout(function() {}, 5e3)
    }, p.prototype._bindEvents = function() {
        var t = this,
            e = (this.bubbleMask, this.bubbleImg),
            i = this.bubbleTxt;
        e.src = this.defImg, baidu.on(e, "onload", function() {}), baidu.on(e, "onerror", function() {
            i.innerHTML = "暂无数据", e.src = t.defImg
        })
    }, p.prototype._drawPano = function(t) {
        var e = this.panoCursor,
            i = e.clientWidth,
            o = e.clientHeight,
            n = t.x - parseInt(i / 2),
            s = t.y - o;
        e.style.left = n + "px", e.style.top = s + "px", this._setDirectIcon(t)
    }, p.prototype._drawBubble = function(t) {
        var e = this.getBubbleStatus(t);
        return -1 == e ? void(this.bubble.style.display = "none") : void 0
    }, p.prototype._setBubble = function(t, e) {
        var i = this.BUBBLE_CLS[e];
        baidu.setStyles(this.bubble, {
            width: i.width + "px",
            height: i.height + "px",
            backgroundPosition: i.backgroundPosition,
            left: t.x + "px",
            top: t.y + "px"
        }), this.bubImgHolder.style.margin = baidu.browser.ie <= 7 ? i._ie6Margin : i._margin, this.bubbleTxt.style.margin = i._txtMargin
    }, p.prototype.getBubbleStatus = function(t) {
        {
            var e, i, o, n, s, a, r, p = this._getMapSize(),
                h = 0,
                l = 0,
                d = p.width,
                u = p.height;
            map.getSize()
        }
        return e = this._pixel ? this._pixel.x : t.x + h, i = this._pixel ? this._pixel.y : t.y + l, o = Math.abs(e - h), n = Math.abs(d - e), s = Math.abs(i - l), a = Math.abs(u - i), r = 2, r = o > 60 && n > 60 && s > 160 ? 0 : o > 60 && n > 60 && a > 160 && 160 > s ? 2 : n > 150 && s > 80 && a > 80 ? 1 : o > 160 && 60 > n && a > 60 ? 3 : -1
    }, p.prototype._setDirectIcon = function(t) {
        {
            var e = t.x,
                i = t.y,
                o = 1,
                n = e - this.preX;
            i - this.preY
        }
        Math.abs(n) > 0 && (this.preX > 1 && 0 > n ? o = this.MOVE_DIRECT.LEFT : this.preX > 1 && n > 0 && (o = this.MOVE_DIRECT.RIGHT), this.preDirect != o && (this.panoCursor.style.backgroundPosition = this.PANO_OFFSET_ICON[o]), this.preX = e, this.preY = i, this.preDirect = o)
    }, p.prototype._setDefDirect = function() {
        this.panoCursor.style.backgroundPosition = this.PANO_OFFSET_ICON[1]
    }, p.prototype._setBubInfo = function(t) {
        var e = t.panoImg,
            i = t.rname;
        i = baidu.string.getByteLength(i) > 15 ? baidu.string.subByte(i, 12) + "..." : i, this.bubbleImg.src = e ? e : this.defImg, this.bubbleTxt.innerHTML = i || "未知道路"
    }, p.prototype._getBubPos = function(t, e, i) {
        var o = this.BUBBLE_CLS[e],
            n = this.BUBBLE_OFFSET[e],
            s = (this.panoCursor.clientWidth, this.panoCursor.clientHeight),
            a = parseInt(o.width / 2),
            r = parseInt(o.height),
            p = t.x - a + n[0],
            h = t.y - r - s + n[1];
        if (i) {
            var l = [
                [-55, -135],
                [15, -55],
                [-55, 13],
                [-140, -55]
            ];
            return {
                x: t.x + l[e][0],
                y: t.y + l[e][1]
            }
        }
        return {
            x: p,
            y: h
        }
    }, p.prototype.enableIndoorOverlay = function(t, e, i) {
        this.disable(), this.hidePanoCursor();
        var n = this,
            s = this._map,
            a = s.pointToPixel(t);
        a.x += 350, a.y += 110, this.redraw(null, t, a, !0);
        o(e, function(t) {
            n.enableMove || n._setBubInfo({
                panoImg: t,
                rname: i
            })
        })
    }, p.prototype.disableIndoorOverlay = function() {
        this.enable(), this.showPanoCursor()
    }, p.prototype._getMapSize = function() {
        var t = this._map.getContainer(),
            e = T.dom.getPosition(t),
            i = t.clientWidth,
            o = t.clientHeight;
        return {
            left: e.left,
            top: e.top,
            right: e.left + i,
            bottom: e.top + o,
            width: i,
            height: o
        }
    }, p.prototype.isOnIndoorIcon = function() {
        return !this.enableMove
    }, p.prototype.redraw = function(t, e, i, o) {
        var n = this._map,
            s = this._opts.anchor,
            a = n.pointToOverlayPixel(e);
        this._container.style.left = a.x + s.width + "px", this._container.style.top = a.y + s.height + "px", t && this._setBubInfo(t);
        var r = this.getBubbleStatus(i);
        if (this._drawPano(a), -1 != r) {
            this._drawBubble(a);
            var p = this._getBubPos(a, r, o);
            this._setBubble(p, r)
        }
    }, p.prototype.isVisible = function() {
        return this._visible
    }, p.prototype.show = function() {
        this.domElement.style.display = "", this._visible = !0
    }, p.prototype.hide = function() {
        this.domElement.style.display = "none", this._visible = !1
    }, p.prototype.showBubble = function() {
        this.bubble.style.display = "block"
    }, p.prototype.hideBubble = function() {
        this.bubble.style.display = "none"
    }, i.exports = p
});;
define("pano:widget/StreetViewTool/PanoPoiClick.js", function(e, n, t) {
    function i(e) {
        var e = window.event || e;
        baidu.event.stopPropagation(e), baidu.event.preventDefault(e)
    }
    var o = e("common:widget/ui/config/config.js"),
        a = o.mapVersion,
        s = o.urlConfig,
        d = function(e, n) {
            this._map = e, this.overlay = n, this.cacheData = {}, this.maxCache = 8, this.cacheIds = [], this.poiSpotId = null, this.spotOnId = "", this.spotOnUid = null, this.mkr = null, this.label = null, this.squareSide = 4, this.tMkr = null, this.tempMarker = null, this.overSpotPoint = null, this.isMoving = !1, this.fetchId = "", this.curTileId = "", this.labelName = "", this.ic = new BMap.Icon("//webmap1.bdimg.com/wolfman/static/pano/images/panorama/pano_click_poi_0eca00d.png", new BMap.Size(20, 24), {
                offset: new BMap.Size(10, 12),
                infoWindowOffset: new BMap.Size(5, 0)
            }), this.clickVersion = a.INDOOR_CLICK_VER || "1003", this.init()
        },
        l = {};
    l.init = function() {
        this.bind()
    }, l.refresh = function(e) {
        var n = this;
        n.clearPoiCache(), n.hideOverlays(), n.tMkr = null, n.tempMarker = null, n.spotOnId = null, n._map = e, n.init()
    }, l.bind = function() {
        this.bindMapRequest(), this.bindMouseMove()
    }, l.unbind = function() {
        this.unbindMapRequest(), this.unbindMouseMove()
    }, l.bindMapRequest = function() {
        var e = this;
        e._panotilesloadedEvent || (e._panotilesloadedEvent = function() {
            e.tilesloadedEvent()
        }), e._panozoomendEvent || (e._panozoomendEvent = function() {
            e.zoomendEvent()
        }), e._map.addEventListener("tilesloaded", e._panotilesloadedEvent), e._map.addEventListener("zoomend", e._panozoomendEvent)
    }, l.unbindMapRequest = function() {
        var e = this;
        e._map.removeEventListener("tilesloaded", e._panotilesloadedEvent), e._map.removeEventListener("zoomend", e._panozoomendEvent)
    }, l.tilesloadedEvent = function() {
        var e = this;
        map.getZoom() < 10 && e.clearPoiCache()
    }, l.zoomendEvent = function() {
        var e = this;
        e.clearPoiCache(), e.hideOverlays()
    }, l.bindMouseMove = function() {
        var e = this;
        e._panomouseMoveEvent || (e._panomouseMoveEvent = function(n) {
            e.mouseMoveEvent(n)
        }), e._map.addEventListener("mousemove", e._panomouseMoveEvent)
    }, l.unbindMouseMove = function() {
        var e = this;
        e._map.removeEventListener("mousemove", e._panomouseMoveEvent)
    }, l.mouseMoveEvent = function(e) {
        var n = this;
        if (n._map.getZoom() < 10) n.clearPoiCache();
        else {
            if (!e || !e.point) return;
            n.overSpotPoint = e.point, n.isMoving = !0;
            var t = n._map.getTileId(e.point, n._map.getZoom());
            if (!t.row || !t.column || !t.level) return;
            n.curTileId = t.level + "_" + t.row + "_" + t.column;
            var i = t.level + "_" + n.m1(t.row) + "_" + n.m1(t.column);
            n.cacheData[i] ? n.spotOnId != n.curTileId && (n.clearPoiCache(), n._addSpot(n.curTileId)) : n.sendRequest({
                l: t.level,
                x: n.m1(t.row),
                y: n.m1(t.column)
            })
        }
    }, l._addSpot = function(e) {
        var n = this,
            t = e.split("_"),
            i = t[0] + "_" + n.m1(t[1]) + "_" + n.m1(t[2]);
        if (n.cacheData[i]) {
            var o = n.cacheData[i][e] ? n.cacheData[i][e] : !1;
            if (o) {
                n.poiSpotId = n._map.addSpots(o, {
                    enableMultiResponse: !1
                }), n.spotOnId = e;
                for (var a = -1, s = 0, d = n.cacheIds.length; d > s; s++)
                    if (i == n.cacheIds[s]) {
                        a = s;
                        break
                    }
                a >= 0 && (n.cacheIds.splice(a, 1), n.cacheIds.push(i))
            }
        }
    }, l.sendRequest = function(e) {
        var n = this;
        if (e && n.fetchId != e.l + "_" + e.x + "_" + e.y) {
            n.fetchId = e.l + "_" + e.x + "_" + e.y;
            var t = e.x + "_" + e.y + "_" + e.l + "_" + this.clickVersion;
            baidu.jsonp(s.PANO_INDOOR_ICON_URL + "/?qt=ck&tid=" + t, {
                cbtype: "fn",
                success: function(e) {
                    e = e && e.content || {}, e && e.length > 0 && n.getPoiData(e)
                },
                error: function() {}
            })
        }
    }, l.getPoiData = function(e) {
        for (var n = {}, t = !1, i = this, o = (this._map, 0), a = e.length; a > o; o++) {
            for (var s = [], d = e[o], l = 0, c = d.uids.length; c > l; l++) {
                var r = d.uids[l],
                    u = (r.bound.xmax + r.bound.xmin) / 2,
                    p = (r.bound.ymax + r.bound.ymin) / 2,
                    h = (new BMap.Marker(new BMap.Point(u, p)), i._map.pointToPixel(new BMap.Point(r.bound.xmin, r.bound.ymin))),
                    m = i._map.pointToPixel(new BMap.Point(r.bound.xmax, r.bound.ymax)),
                    v = [(h.x - m.x) / 2, (m.y - h.y) / 2, (m.x - h.x) / 2, (h.y - m.y) / 2];
                "street_1" != r.catalog && s.push({
                    pt: new BMap.Point(u, p),
                    bd: v,
                    userdata: {
                        name: r.name ? r.name : "",
                        uid: r.uid,
                        type: r.type,
                        iconpoint: r.icon ? new BMap.Point(r.icon.x, r.icon.y) : ""
                    },
                    tag: "MAP_SPOT_INFO",
                    isPano: 1
                })
            }
            i.curTileId && i.curTileId == d.tileid && (t = !0), n[d.tileid] = s
        }
        var _ = e[0].tileid.split("_"),
            f = _[0] + "_" + i.m1(_[1]) + "_" + i.m1(_[2]);
        if (i.cacheData[f] = n, i.cacheIds.push(f), i.cacheIds.length > i.maxCache) {
            var M = i.cacheIds.shift();
            delete i.cacheData[M], delete M
        }
        t && i._addSpot(i.curTileId)
    }, l.moveOutSpot = function() {
        var e = this;
        e.hideOverlays()
    }, l.moveSpot = function(e) {
        i(e)
    }, l.clearPoiCache = function() {
        var e = this;
        e.poiSpotId && (e._map.removeSpots(e.poiSpotId), e.poiSpotId = null, e.spotOnId = null)
    }, l.hideOverlays = function() {
        var e = this;
        e.mkr && e.mkr.hide(), e.label && e.label.hide()
    }, l.dispose = function() {
        this.hideOverlays(), this.clearPoiCache(), this.unbind(), this._map.removeOverlay(this.tempMarker), this.tempMarker = null
    }, l.m1 = function(e) {
        return Math.floor(parseInt(e, 10) / this.squareSide)
    }, baidu.lang.inherits(d, baidu.lang.Class, "PanoPoiClick"), baidu.object.extend(d.prototype, l), t.exports = d
});;
define("pano:widget/StreetViewTool/PanoLayer.js", function(e, r, i) {
    function t(e, r) {
        baidu.lang.Class.call(this), this._map = e, this.PANO_URL = n.urlConfig.PANO_ROAD_LAYER, this.udtVersion = n.mapVersion.UDT_VERSION || "20150520", this.overlay = r, this.clickVersion = s.INDOOR_CLICK_VER || "1003", this.visible = !1, this.layerId = "", this.squareSide = 4, this.indoorMarkerArr = {}, this.indoorUids = {}, this.tidCache = [], this.currentMarkers = {
            markers: [],
            level: o(e.getZoom())
        }
    }

    function a(e) {
        var e = window.event || e;
        baidu.event.stopPropagation(e), baidu.event.preventDefault(e)
    }

    function o(e) {
        return Math.floor(e)
    }
    var n = (window.Pano = window.Pano || {}, e("common:widget/ui/config/config.js")),
        s = (e("pano:widget/PanoInterface/PanoInterface.js"), n.mapVersion),
        d = e("pano:widget/base/service.js");
    baidu.lang.inherits(t, baidu.lang.Class, "StreetViewLayer"), baidu.object.extend(t.prototype, {
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
        getVisible: function() {
            return this.visible
        },
        addLayer: function() {
            if (this._map && !this._map.getTileLayer(this.layerId)) {
                var e = this,
                    r = !0,
                    i = this._map.getMapType() == BMAP_NORMAL_MAP ? "il" : "sl";
                i = "pl";
                var t;
                this._map.on("zoomstart", function() {
                    var r = e._map.getZoom(),
                        i = o(r);
                    t = i, e.removeIndoorOverlay(e.currentMarkers.markers)
                }), this._map.on("zoomend", function() {
                    var r = e._map.getZoom(),
                        i = o(r);
                    e.removeIndoorOverlay(e.indoorMarkerArr[t]), i > 11 && e.visible && e.showIndoorOverlay(e.indoorMarkerArr[i]), e.currentMarkers.markers = e.indoorMarkerArr[i], e.currentMarkers.level = i, e.currentMarkers.markers
                }), this.tilelayer = new BMap.TileLayer({
                    transparentPng: r
                }), this.tilelayer.zIndex = 110; {
                    o(e._map.getZoom()), this.indoorMarkerArr || []
                }
                this.tilelayer.getTilesUrl = function(r, t) {
                    t = Math.floor(t); {
                        var a = e.PANO_URL + "/tile/?udt=" + e.udtVersion + "&qt=tile&styles=" + i + "&x=" + r.x + "&y=" + r.y + "&z=" + t;
                        e._map
                    }
                    return setTimeout(function() {
                        t > 11 && e.addIndoorOverlay(r, t)
                    }, 0), T.browser.ie && T.browser.ie <= 6 && (a += "&color_dep=32"), a
                }, this._map.addTileLayer(this.tilelayer), this.layerId = this.tilelayer.getMapType(), this.visible = !0
            }
        },
        addIndoorOverlay: function(e, r) {
            if (this.visible) {
                var i = this._map,
                    t = this,
                    n = this.indoorUids,
                    s = this.m1(e.x) + "_" + this.m1(e.y) + "_" + r + "_" + this.clickVersion;
                t.indoorMarkerArr[r] || (t.indoorMarkerArr[r] = [], t.indoorUids[r] = []), this.tidCache.indexOf(s) >= 0 || (this.tidCache.push(s), d.getIndoorIcon(s).done(function(e) {
                    if (e = e && e.content || {}, e && e.length > 0) {
                        for (var s = 0, d = e.length; d > s; s++)
                            for (var l = e[s], h = 0, u = l.uids.length; u > h; h++) {
                                var v = l.uids[h];
                                if (n[r].indexOf(v.uid) < 0) {
                                    n[r].push(v.uid);
                                    var c = (v.bound.xmax + v.bound.xmin) / 2,
                                        m = (v.bound.ymax + v.bound.ymin) / 2,
                                        p = new BMap.Marker(new BMap.Point(c, m), {
                                            icon: new BMap.Icon("//webmap1.bdimg.com/wolfman/static/pano/images/pano_whole/indoor_icon_61ea549.png", new BMap.Size(24, 28))
                                        });
                                    p.pt = {
                                        lat: m,
                                        lng: c
                                    }, p.userdata = {
                                        name: v.name,
                                        type: v.type,
                                        uid: v.uid
                                    }, p.addEventListener("mouseover", function(e) {
                                        a(e), t.moveOverSpot(e)
                                    }), p.addEventListener("mouseout", function(e) {
                                        a(e), t.moveOutSpot(e)
                                    }), p.addEventListener("click", function(e) {
                                        a(e), t.clickMkr(e)
                                    }), r === o(i.getZoom()) && t.visible && i.addOverlay(p), t.indoorMarkerArr[r].push(p)
                                }
                            }
                        r === o(i.getZoom()) && r > 11 && (t.currentMarkers.markers = t.indoorMarkerArr[r], t.currentMarkers.level = r)
                    }
                }).fail(function() {}))
            }
        },
        showIndoorOverlay: function(e) {
            if (e)
                for (var r = 0; r < e.length; r++) this._map.addOverlay(e[r])
        },
        removeLayer: function() {
            var e = this._map.getTileLayer(this.layerId),
                r = o(this._map.getZoom()),
                i = this.indoorMarkerArr;
            e && (this._map.removeTileLayer(e), this.layerId = "", this.removeIndoorOverlay(i[r])), this.visible = !1
        },
        removeIndoorOverlay: function(e) {
            if (e)
                for (var r = 0; r < e.length; r++) this._map.removeOverlay(e[r])
        },
        moveOverSpot: function(e) {
            var r = this;
            if (!(r._map.getZoom() < 10)) {
                var i = e.target,
                    t = i.pt;
                if (i && i.userdata && i.userdata.uid && i.userdata.type && this.overlay) {
                    var a = i.userdata;
                    this.overlay.enableIndoorOverlay(t, a.uid, a.name)
                }
            }
        },
        clickMkr: function(e) {
            var r = e.target;
            this.dispatchEvent("spotclick", {
                panoUid: r.userdata.uid,
                panoType: "inter"
            }), a(e), addStat(STAT_CODE.STAT_PANORAMA, {
                item: "inter",
                catalog: "map",
                func: "click",
                from: "pc-map"
            })
        },
        moveOutSpot: function() {
            this._map.getZoom() < 10 || this.overlay && this.overlay.disableIndoorOverlay()
        },
        hideOverlays: function() {},
        getLayerId: function() {
            return this.layerId
        },
        update: function() {
            this.removeLayer(), this.addLayer()
        },
        m1: function(e) {
            return o(parseInt(e, 10) / this.squareSide)
        }
    }), i.exports = t
});