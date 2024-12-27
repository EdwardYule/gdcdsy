define("common:widget/ui/genericRequest/GenericRequest.js", function(e, t, n) {
    function i() {
        T.lang.Class.call(this), this.json = null, this.gInfo = {}, this.qWord = "", this.qCity = -1, this.listeners = {}, this.isGRequest = !1, this.isableGenUIRequest = !0, this.isableGRequestByMapChanged = !0, this.isableGenMDRequest = !1, this.GRCircleRadius = 1e3, this.isGRCircleShow = !0, this.isClearBeforeSend = !0, this.queryStr = "", this.uiPermit = 1e3, this.openedMarker = null, this.curSearchCPt = null, this.types = {
            36: {
                t: 1
            },
            37: {
                t: 2
            },
            38: {
                t: 1
            },
            39: {
                t: 1
            },
            40: {
                t: 2
            }
        }, this.disabledGR = !1, this.initialize(), this.xhrs = [], this.resCache = [], this.duplicate = 0, this.xhrComplete = 0
    }
    var s, r = e("common:widget/ui/util/util.js"),
        o = e("common:widget/ui/config/config.js"),
        a = e("common:widget/ui/constant/Constant.js"),
        c = e("common:widget/com/componentManager.js"),
        d = e("common:widget/ui/searchData/searchData.js"),
        u = e("common:widget/ui/mapShare/MapShare.js"),
        l = e("common:widget/ui/card/cardMgr.js"),
        h = e("common:widget/com/IpLocation/IpLocation.js"),
        p = o.modelConfig,
        m = o.mapConfig,
        f = e("common:widget/search/SearchUrlParam.js"),
        g = e("common:widget/ui/FilterStatus/FilterStatus.js"),
        R = new BMap.Icon(a.A_J_MARKER_IMG_NEW, new BMap.Size(10, 10), {
            imageOffset: new BMap.Size(107, 232),
            anchor: new BMap.Size(5, 5),
            infoWindowOffset: new BMap.Size(5, 0),
            imageSize: new BMap.Size(a.A_J_MARKER_IMG_NEW_WIDTH, a.A_J_MARKER_IMG_NEW_HEIGHT),
            srcSet: a.A_J_MARKER_IMG_NEW2X_SRCSET
        }),
        v = new BMap.Icon(a.A_J_MARKER_IMG_NEW, new BMap.Size(10, 10), {
            imageOffset: new BMap.Size(107, 242),
            anchor: new BMap.Size(5, 5),
            infoWindowOffset: new BMap.Size(5, 0),
            imageSize: new BMap.Size(a.A_J_MARKER_IMG_NEW_WIDTH, a.A_J_MARKER_IMG_NEW_HEIGHT),
            srcSet: a.A_J_MARKER_IMG_NEW2X_SRCSET
        }),
        M = [],
        G = [],
        b = 50,
        S = 50,
        _ = 0;
    T.extend(i.prototype, {
        initialize: function(e) {
            try {
                for (var t in e) "undefined" != typeof e[t] && (this[t] = e[t]);
                this.clearCache()
            } catch (n) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: n.message || n.description,
                    path: "common:widget/ui/genericRequest/GenericRequest.js",
                    ln: 130
                })
            }
        },
        setGRData: function(e, t) {
            return this.disabledGR ? (this.clearCache(), void this.clearGRMap()) : void(e && (this.json = e, this.gInfo = t || {}, this.clearListener(), this.resetStatus(), addStat("poisearch.gr.show", "show", {
                da_trd: "new"
            })))
        },
        resetStatus: function() {
            var e = this.json.result.type.toString(),
                t = this.json.content;
            this.types[e] && (this.isGRequest = !0, 1 == this.types[e].t ? t && 0 != t.length ? this.addGRMap() : (this.clearGRMap(), this.clearListener()) : 2 == this.types[e].t && (this.clearGRMap(), this.clearListener()), this.addMDEvent(), this.curSearchCPt = map.getCenter())
        },
        clearBeforeSendAtBase: function() {
            this.isClearBeforeSend ? this.clearListener() : this.isClearBeforeSend = !0
        },
        clearAfterGetAtBase: function(e) {
            var t = {
                    36: "poiSearch",
                    38: "circleSearch",
                    39: "poiSearch"
                },
                n = {
                    18: "busLine",
                    6: "busLineStop",
                    27: "rightClick"
                },
                i = e.result.type;
            if (i && (2 != i || !e.content || 0 != e.content.error) && !t[i]) {
                if (n[i]) return; {
                    e.result.return_query || "", e.result.wd2 || ""
                }
                this.qWord = "", this.qCity = -1, this.clearGRMap(), this.openedMarker = null
            }
        },
        clearCache: function() {
            var e = this;
            e.isableGenUIRequest = !0, e.isableGRequestByMapChanged = !0, e.isGRequest = !1, e.isableGenMDRequest = !1, e.clearListener(), this.clearXHRCache(), clearTimeout(s)
        },
        clearXHRCache: function() {
            if (this.xhrs && this.xhrs.length)
                for (var e = 0; e < this.xhrs.length; e++) {
                    var t = this.xhrs[e];
                    t.abort()
                }
            this.xhrs = [], this.resCache = []
        },
        checkEventBind: function(e, t, n, i) {
            return e ? t[n] && t[n] == i ? !1 : (t[n] = i, !0) : t[n] && t[n] == i ? (t[n] = "", delete t[n], !0) : !1
        },
        clearListener: function(e) {
            var t = this;
            e && "ui" != e || (t.checkEventBind(!1, t.listeners, "map_load", "bindGenResLoad") && map.removeEventListener("load", t.bindGenResLoad), t.checkEventBind(!1, t.listeners, "map_moveend", "bindGenResMove") && map.removeEventListener("moveend", t.bindGenResMove), t.checkEventBind(!1, t.listeners, "map_movestart", "bindGenResMoveStart") && map.removeEventListener("movestart", t.bindGenResMoveStart), t.checkEventBind(!1, t.listeners, "map_zoomend", "bindGenResZoom") && map.removeEventListener("zoomend", t.bindGenResZoom), t.checkEventBind(!1, t.listeners, "map_mapcontainerresize", "bindGenResResize") && map.removeEventListener("mapcontainerresize", t.bindGenResResize))
        },
        clearGRMap: function() {
            for (var e = 0; e < M.length; e++) map.removeOverlay(M[e]);
            M = [], this.resCache = []
        },
        clearLastMarkers: function() {
            for (var e = 0; e < G.length; e++) map.removeOverlay(G[e]);
            G = []
        },
        addGRMap: function() {
            var e = this;
            if (e.json && ("&gr=2" === e.gInfo.cinfo.genRequestKey && (G = M, M = []), e.clearGRMap(), !(38 === e.json.result.type && map.zoomLevel < 11))) {
                this.duplicate = 0, this.xhrComplete = 0, this.clearXHRCache();
                var t = Math.min(b, this.json.result.total),
                    n = Math.ceil(t / S),
                    i = T.Deferred();
                listener.once("search.poi." + this.gInfo.guid, "lastanimationend", function() {
                    i.resolve()
                });
                for (var s = 0; n > s; s++) e.xhrs.push(e.fetchSpot(e.gInfo.pageReq + "&rn=" + S, s, n, i))
            }
        },
        fetchSpot: function(e, t, n, i) {
            e = e.replace(/pn=(\d+)/, "pn=" + t), e = e.replace(/nn=(\d+)/, "nn=" + t * S), 0 === e.indexOf("con") ? e = e.replace("con", "spot") : 0 === e.indexOf("nb") && (e = e.replace("nb", "spot"));
            var s = this;
            return d.fetch(e, function(e) {
                s.xhrComplete++, s.resCache.push(e), s.xhrComplete === n && i.done(function() {
                    s.renderSpots()
                })
            })
        },
        renderSpots: function() {
            try {
                for (var t = this, n = this.json.content, i = 0; i < this.resCache.length; i++) {
                    var s = this.resCache[i];
                    if (s && s.content)
                        for (var o = 0; o < s.content.length; o++) {
                            var a = !1;
                            if (this.duplicate < n.length)
                                for (var c = 0; c < n.length; c++)
                                    if (n[c].uid === s.content[o].uid) {
                                        this.duplicate++, a = !0;
                                        break
                                    }
                            if (!a) {
                                var d = r.parseGeo(s.content[o].geo),
                                    u = r.getPointByStr(d.points),
                                    l = new BMap.Marker(u, {
                                        icon: R,
                                        title: s.content[o].name,
                                        startAnimation: "marker-fadein"
                                    });
                                l.uid = s.content[o].uid, M.push(l), l.addEventListener("mouseover", function() {
                                    this.setIcon(v), this.setTop(!0, 27e7)
                                }), l.addEventListener("mouseout", function() {
                                    t.onMarker !== this && (this.setIcon(R), this.setTop(!1))
                                }), l.addEventListener("click", function() {
                                    addStat("poisearch.gr.click", "click", {
                                        da_trd: "new"
                                    });
                                    var n = this;
                                    t.onMarker = n;
                                    var i = e("poidetail:widget/libs/poiDetailMgr/poiDetailMgr.js");
                                    i.create({
                                        uid: n.uid
                                    }).then(function(e) {
                                        var i = e.poiDetailCard,
                                            s = e.data;
                                        r.loadSearchSimpleInfo(function(e) {
                                            var r = t.showInfoWindow(n.uid, s, e);
                                            r && i.setInfoWindow(r)
                                        })
                                    }, function() {})
                                }), map.addOverlay(l)
                            }
                        }
                }
                M.length && G.length && r.vendorEvent(M[0].iconDom, "animationend", function() {
                    t.clearLastMarkers()
                })
            } catch (h) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: h.message || h.description,
                    path: "common:widget/ui/genericRequest/GenericRequest.js",
                    ln: 431
                })
            }
        },
        showInfoWindow: function(e, t, n) {
            var i = this,
                s = {},
                o = t.content,
                a = r.getPointByStr(r.parseGeo(o.geo).points),
                c = {
                    name: o.name
                },
                d = o.ext;
            d && "hotel" === d.src_name && d.detail_info && d.detail_info.wise_realtime_price && (c.wiseRealtimePrice = d.detail_info.wise_realtime_price);
            var l = n.createCommonInfoWindow(c, {
                cityCode: i.sCityCode,
                x: a.lng,
                y: a.lat,
                uid: o.uid
            });
            return l ? (i.openedMarker = {
                uid: o.uid,
                geo: o.geo,
                name: o.name
            }, l.addEventListener("open", function() {
                var e = this.overlay;
                try {
                    e.setIcon(v), e.setTop(!0, 27e7)
                } catch (t) {}
                window.spotInfoWnd = !0, i.setGRequestFlg(1500), l.removeEventListener("open", arguments.callee)
            }), l.addEventListener("close", function() {
                window.spotInfoWnd = !1, u.listIndex = "", this.overlay.setIcon(R), this.overlay.setTop(!1), i.openedMarker = null, l.removeEventListener("close", arguments.callee)
            }), i.onMarker && (s.from = "gr", n.openSearchInfoWndPOI(l, i.onMarker, s)), l) : void 0
        },
        setGRequestFlg: function(e) {
            var t = this;
            t.isableGRequestByMapChanged = !1, setTimeout(function() {
                t.isableGRequestByMapChanged = !0
            }, e)
        },
        ifChangeMap: function() {
            if (!this.json) return {
                f: 0
            };
            if (1 == this.json.result.op_gel) {
                var e = new BMap.Point(this.json.result.res_x, this.json.result.res_y);
                return {
                    f: 1,
                    p: e,
                    l: this.json.result.res_l
                }
            }
            return {
                f: 2
            }
        },
        checkMove: function() {
            var e = this;
            if (!e.curSearchCPt) return !1;
            var t = map.pointToPixel(e.curSearchCPt),
                n = map.pointToPixel(map.getCenter()),
                i = Math.abs(t.x - n.x),
                s = Math.abs(t.y - n.y);
            return i >= .2 * map.width || s >= .2 * map.height ? !0 : !1
        },
        addMDEvent: function() {
            var e = this;
            e.clearListener(), e.bindGenResLoad || (e.bindGenResLoad = function() {
                e.sendGenRequest()
            }), e.bindGenResDrag || (e.bindGenResDrag = function() {
                1 == e.checkMove() && e.sendGenRequest("&gr=2")
            }), e.bindGenResMove || (e.bindGenResMove = function() {
                1 == e.checkMove() && (s = setTimeout(function() {
                    e.sendGenRequest("&gr=2")
                }, 100))
            }), e.bindGenResMoveStart || (e.bindGenResMoveStart = function() {
                clearTimeout(s)
            }), e.bindGenResZoom || (e.bindGenResZoom = function() {
                var t = Math.floor(map.getZoom());
                t !== _ && (_ = t, e.sendGenRequest("&gr=1"))
            }), e.bindGenResResize || (e.bindGenResResize = function() {
                e.sendGenRequest()
            }), e.checkEventBind(!0, e.listeners, "map_load", "bindGenResLoad") && map.addEventListener("load", e.bindGenResLoad), e.checkEventBind(!0, e.listeners, "map_moveend", "bindGenResMove") && map.addEventListener("moveend", e.bindGenResMove), e.checkEventBind(!0, e.listeners, "map_movestart", "bindGenResMoveStart") && map.addEventListener("movestart", e.bindGenResMoveStart), e.checkEventBind(!0, e.listeners, "map_zoomend", "bindGenResZoom") && map.addEventListener("zoomend", e.bindGenResZoom), e.checkEventBind(!0, e.listeners, "map_mapcontainerresize", "bindGenResResize") && map.addEventListener("mapcontainerresize", e.bindGenResResize)
        },
        sendGenRequest: function(e) {
            if (h.isGenericRequest()) {
                var t = this,
                    n = window;
                if (t.curSearchCPt = map.getCenter(), l.getCards("poidetail").length) return void addStat("poisearch.dragsearch.filtered", "show");
                if (t.json) {
                    if (38 == t.json.result.type && map.getZoom() < 11) return t.clearGRMap(), void listener.trigger("generequest", "poisearch", {
                        type: ""
                    });
                    if (t.isableGenUIRequest && t.isableGRequestByMapChanged) {
                        t.clearListener(), e || (e = "");
                        var i = t.json.result.return_query,
                            s = "&c=" + p.cityCode + "&wd=" + encodeURIComponent(i) + "&da_src=pcmappg.map&on_gel=1&l=" + Math.floor(map.getZoom()) + e;
                        t.json.result.wd2 && (s += "&wd2=" + t.json.result.wd2);
                        var o = map.getBounds({
                            margins: [0, 0, 0, m.leftMargin],
                            heading: 0,
                            tilt: 0
                        });
                        s += "&b=(" + o.minX + "," + o.minY + ";" + o.maxX + "," + o.maxY + ")", t.isableGenUIRequest = !1;
                        var a = f.getParams(),
                            d = baidu.url.jsonToQuery(a, encodeURIComponent) || "",
                            u = t.json.result.type;
                        if (n.currentComponent) switch (u) {
                            case 36:
                                listener.trigger("generequest", "poisearch", {
                                    type: u,
                                    logstr: e
                                }), setTimeout(function() {
                                    t.isableGenUIRequest = !0
                                }, t.uiPermit);
                                var g = t.judgeFilter();
                                g !== !1 ? (s = s.replace("&on_gel=1", "").replace("&gr=2", ""), t.queryStr = "s" + s + "&" + d, t.queryStr += "&district_name=" + encodeURIComponent(g.districtName) + "&business_name=" + encodeURIComponent(g.businessName), n.currentComponent.modelQuery = t.queryStr, c.go(t.queryStr, {
                                    cinfo: {
                                        genRequestKey: e,
                                        noChangeMap: !0,
                                        isFilter: !0
                                    },
                                    staticExpand: !0,
                                    isFold: !0,
                                    isMainRequest: "no",
                                    reserveReturnCard: !0,
                                    replaceState: !0,
                                    fromMapMove: !0
                                })) : (t.queryStr = "s" + s + "&" + d, n.currentComponent.modelQuery = t.queryStr, c.go(t.queryStr, {
                                    cinfo: {
                                        genRequestKey: e
                                    },
                                    staticExpand: !0,
                                    isFold: !0,
                                    isMainRequest: "no",
                                    reserveReturnCard: !0,
                                    replaceState: !0,
                                    fromMapMove: !0
                                }));
                                break;
                            case 37:
                                listener.trigger("generequest", "poisearch", {
                                    type: u,
                                    logstr: e
                                }), setTimeout(function() {
                                    t.isableGenUIRequest = !0
                                }, t.uiPermit), t.queryStr = "s" + s, c.go(t.queryStr, {
                                    isMainRequest: "no",
                                    replaceState: !0
                                });
                                break;
                            case 38:
                                var R = "";
                                if (listener.trigger("generequest", "poisearch", {
                                        type: u,
                                        logstr: e
                                    }), t.json.center && t.json.center.poi) {
                                    R += "&uid=" + t.json.center.poi[0].uid;
                                    var v = r.getPointByStr(r.parseGeo(t.json.center.poi[0].geo).points);
                                    R += "&nb_x=" + v.lng, R += "&nb_y=" + v.lat
                                } else t.gInfo.cinfo.centerPoint && (R += "&nb_x=" + t.gInfo.cinfo.centerPoint.lng, R += "&nb_y=" + t.gInfo.cinfo.centerPoint.lat);
                                t.GRCircleRadius && (R += "&gr_radius=" + t.GRCircleRadius), setTimeout(function() {
                                    t.isableGenUIRequest = !0
                                }, t.uiPermit), n.currentComponent.modelQuery = "nb" + s + R, t.gInfo.cinfo ? c.go("nb" + s + "&" + d + R, {
                                    cinfo: t.gInfo.cinfo,
                                    isMainRequest: "no",
                                    staticExpand: !0,
                                    isFold: !0,
                                    reserveReturnCard: !0,
                                    replaceState: !0,
                                    fromMapMove: !0
                                }) : c.go("nb" + s + "&" + d + R, {
                                    isMainRequest: "no",
                                    staticExpand: !0,
                                    isFold: !0,
                                    reserveReturnCard: !0,
                                    replaceState: !0,
                                    fromMapMove: !0
                                });
                                break;
                            case 39:
                                listener.trigger("generequest", "poisearch", {
                                    type: u,
                                    logstr: e
                                }), setTimeout(function() {
                                    t.isableGenUIRequest = !0
                                }, t.uiPermit), n.currentComponent.modelQuery = "bd" + s, c.go("bd" + s + "&" + d, {
                                    cinfo: {
                                        genRequestKey: e
                                    },
                                    staticExpand: !0,
                                    isMainRequest: "no",
                                    replaceState: !0
                                });
                                break;
                            case 40:
                                listener.trigger("generequest", "poisearch", {
                                    type: u,
                                    logstr: e
                                }), setTimeout(function() {
                                    t.isableGenUIRequest = !0
                                }, t.uiPermit), c.go("bd" + s, {
                                    isMainRequest: "no",
                                    replaceState: !0
                                })
                        }
                    }
                }
            }
        },
        _getCateInfo: function(e) {
            for (var t = [], n = 0, i = e.length; i > n; n++) t.push(e[n][1]), i - 1 > n && t.push(", ");
            return t.join("")
        },
        getDataForSnap: function() {
            if (this.isGRequest && this.json) {
                var e = this.json.result.return_query || "",
                    t = this.json.result.wd2 || "",
                    n = "bkg_png",
                    i = p.cityCode;
                return {
                    wd: e,
                    wd2: t,
                    qt: n,
                    c: i
                }
            }
            return !1
        },
        judgeFilter: function() {
            return g.active ? {
                districtName: g.districtName,
                businessName: g.businessName
            } : !1
        }
    }), n.exports = i
});