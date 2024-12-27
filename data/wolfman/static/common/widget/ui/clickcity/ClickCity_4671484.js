define("common:widget/ui/clickcity/ClickCity.js", function(e, t, i) {
    var o = e("common:widget/com/componentManager.js"),
        n = (e("common:widget/ui/constant/Constant.js"), e("common:widget/ui/util/util.js")),
        a = e("common:widget/ui/config/config.js"),
        s = (e("common:widget/ui/searchData/searchData.js"), e("common:widget/ui/indexUtil/IndexUtil.js"), e("common:widget/ui/searchBox/searchBox.js")),
        r = (a.mapConfig, a.mapVersion),
        l = (a.modelConfig, e("common:widget/ui/mapShare/MapShare.js")),
        d = e("common:widget/ui/BizFare/BizFare.js"),
        c = e("common:widget/ui/mapUtil/mapUtil.js"),
        p = ["https://ss0.bdstatic.com/8bo_dTSlR1gBo1vgoIiO_jowehsv/tile/?qt=vtileQuest&styles=pl", "https://ss1.bdstatic.com/8bo_dTSlR1gBo1vgoIiO_jowehsv/tile/?qt=vtileQuest&styles=pl", "https://ss2.bdstatic.com/8bo_dTSlR1gBo1vgoIiO_jowehsv/tile/?qt=vtileQuest&styles=pl", "https://ss3.bdstatic.com/8bo_dTSlR1gBo1vgoIiO_jowehsv/tile/?qt=vtileQuest&styles=pl"],
        u = window.devicePixelRatio && window.devicePixelRatio > 1 ? 2 : 1,
        v = function(t) {
            var i = null,
                a = function(e) {
                    this.map = e, this.citySpotId = null, this.poiSpotId = null, this.cacheData = {}, this.maxCache = 8, this.cacheIds = [], this.squareSide = 1, this.spotOnId = "", this.mkr1 = this.mkr2 = null, this.label1 = this.label2 = null, this.spotOnUid = null, this.poiUid = null, this.icType = "", this.icType1 = "", this.tMkr = null, this.isOverSpot = 0, this.isMoving = !1, this.overSpotPoint = null, this.fetchId = "", this.curTileId = "", this.curClickUid = null, this.curOpenUid = null, this.overTilePosStr = "", this.curOpenTilePosStr = "", this.currentClickPoint = null, this.init(), this.isCanvasMap() && e._spotDataOnCanvas && (this._shouldDisableSpot() || (this.poiSpotId = e.addSpots(e._spotDataOnCanvas, {
                        enableMultiResponse: !1
                    })))
                };
            return i = a.prototype, i.init = function() {
                var e = this;
                e.addShadowLabel(), e.bind(), setInterval(function() {
                    e.isMoving = !1
                }, 300)
            }, i.urlParse = function() {
                var e = n.getParam(location.href);
                if (e && e.msi) {
                    var t = e.msi.split("|");
                    return this.sendUidRequest(t[0], {
                        isSendStatPars: !0
                    }), !0
                }
                return !1
            }, i.bind = function() {
                this.bindMapRequest(), this.bindMouseMove(), this.bindSpotEvent()
            }, i.mouseMoveEvent = function(e) {
                var i = this;
                if (this.isCanvasMap() || "webgl" === t.getRenderType() || "B_EARTH_MAP" === t.getMapType()) return i.isMoving = !0, i.isOverSpot && (i.overSpotPoint = e.point), void(1 !== i.isOverSpot && (i.label1 && i.label1.hide(), i.label2 && i.label2.hide(), i.sdLab && i.sdLab.hide()));
                if (i.clearCityCache(), e && e.point) {
                    i.isOverSpot && (i.overSpotPoint = e.point), i.isMoving = !0, 1 !== i.isOverSpot && (i.label1 && i.label1.hide(), i.label2 && i.label2.hide(), i.sdLab && i.sdLab.hide());
                    var o = t.getTileId(e.point, Math.floor(t.getZoom()));
                    if (o.row && o.column && o.level) {
                        i.curTileId = o.level + "_" + o.row + "_" + o.column;
                        var n = o.level + "_" + i.m1(o.row) + "_" + i.m1(o.column);
                        i.cacheData[n] ? i.spotOnId !== i.curTileId && i._addSpot(i.curTileId) : i.sendRequest({
                            l: o.level,
                            x: i.m1(o.row),
                            y: i.m1(o.column)
                        })
                    }
                }
            }, i._addSpot = function(e) {
                var i = this;
                if (this._shouldDisableSpot()) return i.clearPoiCache(), void i.hideOverlays();
                var o = e.split("_"),
                    n = o[0] + "_" + i.m1(o[1]) + "_" + i.m1(o[2]);
                if (i.cacheData[n]) {
                    i.clearPoiCache();
                    var a = i.cacheData[n][e] ? i.cacheData[n][e] : [];
                    i.poiSpotId = t.addSpots(a, {
                        enableMultiResponse: !1
                    }), i.spotOnId = e;
                    for (var s = -1, r = 0, l = i.cacheIds.length; l > r; r++)
                        if (n == i.cacheIds[r]) {
                            s = r;
                            break
                        }
                    s >= 0 && (i.cacheIds.splice(s, 1), i.cacheIds.push(n))
                }
            }, i._shouldDisableSpot = function() {
                return window.streetViewTool && window.streetViewTool.isOpen ? !0 : t.mapType !== BMAP_SATELLITE_MAP || t._isHybridShow ? !1 : !0
            }, i.bindMouseMove = function() {
                var e = this;
                t.addEventListener("mousemove", function(t) {
                    e.mouseMoveEvent(t)
                })
            }, i.clickSpot = function(e) {
                if (e.spots) {
                    this._spots = e.spots;
                    var i = e.spots[0].userdata && e.spots[0].userdata.iconPoint || e.spots[0].pt;
                    if (this.currentClickPoint = i, t.getZoom() < 10) {
                        if (e.spots[0] && e.spots[0].userdata && e.spots[0].userdata.name) {
                            {
                                var n = e.spots[0].userdata.name.replace("<br>", "").replace(/\\/, "");
                                e.spots[0].pt
                            }
                            if (n.indexOf("黄岩岛") >= 0 || n.indexOf("钓鱼岛") >= 0 || n.indexOf("赤尾屿") >= 0 || n.indexOf("曾母暗沙") >= 0) o.go("s&wd=" + encodeURIComponent(n) + "&ie=utf-8");
                            else {
                                var a = e.spots[0].userdata.uid;
                                a && o.go("inf&needWeather=1&wd=" + encodeURIComponent(n) + "&uid=" + a + "&ie=utf-8", {
                                    action: "clickCity"
                                })
                            }
                        }
                    } else this.clickMkr(e.spots[0])
                } else {
                    if (null !== e.curAreaSpot) return void this.sendUidRequest(e.curAreaSpot, {
                        fromIndoor: !0
                    });
                    if (t.getZoom() >= 10) {
                        var r = s.getState();
                        if ("route" === r.state) {
                            var l = e.point;
                            c.getGEORevertAddress(l, function(e) {
                                var t = e.content,
                                    i = t.address,
                                    o = t.point && t.point.x + "," + t.point.y || "";
                                listener.trigger("map.route.base", "click", {
                                    name: i,
                                    pt: o,
                                    flag: "basemap"
                                })
                            })
                        }
                    }
                }
            }, i.getSimplePoiInfo = function(e) {
                var t = {
                    ugc_type: "0",
                    ugc_ver: "1",
                    qt: "detailConInfo",
                    uid: e
                };
                return window.AUTH && (t.auth = encodeURIComponent(window.AUTH)), window.SECKEY && (t.seckey = encodeURIComponent(window.SECKEY)), new Promise(function(e, i) {
                    T.ajax("/", {
                        method: "GET",
                        data: t,
                        timeout: 3e3,
                        dataType: "json",
                        success: function(t) {
                            "success" === t.status ? e(t.content) : i()
                        },
                        error: function() {
                            i()
                        }
                    })
                })
            }, i.clickMkr = function(e) {
                if (!(t.getZoom() < 10) && e) {
                    var i = e.userdata.uid || this.spotOnUid;
                    if (this.curClickUid !== i) {
                        var o = this;
                        if (o.isOverSpot = 0, i) {
                            this.curClickUid = i;
                            var n = this._spots;
                            if (n && n[0]) {
                                var a = "vectorCustom" === n[0].userdata.type ? !0 : !1;
                                if (a) {
                                    var r = n[0].userdata;
                                    addStat("clickcity.biz.click", "click", {
                                        revda_log: r.adver_log
                                    });
                                    var l = window.currentComponent && window.currentComponent.curKw;
                                    if (r.adver_log) {
                                        var c = {
                                            client_id: 1,
                                            poi_id: r.uid,
                                            ad: r.adver_log,
                                            click_time: (new Date).getTime(),
                                            baidu_id: baidu.cookie.get("BAIDUID") || "",
                                            user_agent: navigator.userAgent || "",
                                            word: l,
                                            search_id: "",
                                            zone: 1
                                        };
                                        d.sendFareInfo(c)
                                    }
                                }
                            }
                            var p = s.getState();
                            if ("route" === p.state && s.hasEmptyInput() === !0) o.getSimplePoiInfo(i).then(function(e) {
                                var t = e.geo.replace(/^1\|/, "");
                                t = t.split("|"), t = t.pop(), t = t.replace(/;$/, ""), listener.trigger("map.route.poimarker", "click", {
                                    uid: e.uid,
                                    name: e.name,
                                    pt: t
                                })
                            }, function() {});
                            else {
                                var u = {
                                    isBizPoi: a
                                };
                                o.sendUidRequest(i, u)
                            }
                        }
                    }
                }
            }, i.sendUidRequest = function(i, o) {
                if (i) {
                    var a = this;
                    o = o || {};
                    var s = e("poidetail:widget/libs/poiDetailMgr/poiDetailMgr.js");
                    s.create({
                        uid: i,
                        info_merge: 1,
                        isBizPoi: o && o.isBizPoi ? !0 : !1
                    }, {
                        noPushState: o && o.noPushState ? !0 : !1,
                        isReturn: o && o.isReturn ? !0 : !1
                    }).then(function(e) {
                        var r = e.poiDetailCard,
                            l = e.data;
                        if (o.fromIndoor !== !0 && n.loadSearchSimpleInfo(function(e) {
                                var t = a.showInfoWindow(i, l, e);
                                t && r.setInfoWindow(t)
                            }), s.preMainCard && s.preMainCard.childMarkers) {
                            var d = s.preMainCard.childMarkers;
                            d.forEach(function(e) {
                                t.removeOverlay(e)
                            }), d = null
                        }
                        a.curOpenUid = i, a.curOpenTilePosStr = a.overTilePosStr
                    }, function() {
                        a.curClickUid = null, t.resetSpotStatus(), a.curOpenUid && t.hightlightSpotByUid(a.curOpenUid, a.curOpenTilePosStr)
                    })
                }
            }, i.showInfoWindow = function(e, i, o) {
                var a = this,
                    s = {},
                    r = i.content,
                    d = this.currentClickPoint || n.getPointByStr(n.parseGeo(r.geo).points);
                s.isFromMPC = !0;
                var c = r.ext,
                    p = {
                        name: r.name
                    };
                c && "hotel" === c.src_name && c.detail_info && c.detail_info.pc_realtime_price && (p.wiseRealtimePrice = c.detail_info.wise_realtime_price);
                var u = o.createCommonInfoWindow(p, {
                    cityCode: a.sCityCode,
                    x: d.lng,
                    y: d.lat,
                    uid: r.uid,
                    isFromMPC: !0,
                    offset: new BMap.Size(0, -6)
                });
                return u ? (u.addEventListener("open", function() {
                    window.GRControll && GRControll.setGRequestFlg(2e3), u.removeEventListener("open", arguments.callee), t.isCanvasMap() && (a.updateOverlayPosition = function() {
                        var e = t.getCanvasMapCoordByUid(t.temp.infoWin.overlay._uid);
                        e && t.temp.infoWin.overlay.setPoint(e)
                    }, t.temp.infoWin && t.temp.infoWin.overlay && (t.temp.infoWin.overlay._uid = e, t.addEventListener("zoomend", a.updateOverlayPosition)))
                }), u.addEventListener("close", function() {
                    a.label1 && a.label1.hide(), a.label2 && a.label2.hide(), a.sdLab && a.sdLab.hide(), t.temp.infoWin.overlay && t.temp.infoWin.overlay.hide(), l.mapSpotInf = null, a.curClickUid = null, a.curOpenUid = null, a.curOpenTilePosStr = "", u.removeEventListener("close", arguments.callee), a.isCanvasMap() && t.removeEventListener("zoomend", a.updateOverlayPosition)
                }), o.openSearchInfoWndPOI(u, null, s, d), a.label1 && a.label1.hide(), a.label2 && a.label2.hide(), a.sdLab && a.sdLab.hide(), u) : void 0
            }, i.moveOverSpot = function(e) {
                if (!(t.getZoom() < 10 || "webgl" === t.getRenderType() && t.temp.isPermitSpotOver === !1)) {
                    var i = e.spots;
                    if (i && !(i.length < 1) && i[0].tag && "MAP_SPOT_INFO" == i[0].tag && (this.poiUid = i[0].userdata.uid, this.spotOnUid = this.poiUid + (i[0].userdata.tilePosStr || ""), this.overTilePosStr = i[0].userdata.tilePosStr || "", null === this.curClickUid || this.curClickUid !== this.spotOnUid)) {
                        var o = this;
                        o._spots = i;
                        var n = o.label1;
                        if (!t.temp.infoWin || 1 != t.temp.infoWin.isOpen() || !l.mapSpotInf || i[0].userdata.uid != l.mapSpotInf.split("|")[0]) {
                            var a = i[0].userdata.iconPoint || i[0].pt;
                            o.showLabel(e, n, a)
                        }
                    }
                }
            }, i.showLabel = function(e, i, o) {
                var n = this,
                    a = e.spots,
                    s = [{
                        backgroundColor: "#FFFFE1",
                        borderColor: "#8C8C8C",
                        color: "#4D4D4D"
                    }, {
                        backgroundColor: "#F0F7FF",
                        borderColor: "#7AA3CC",
                        color: "#224B73"
                    }];
                if (i && i.map)
                    if (i.hide(), a[0].userdata.name) {
                        n.isOverSpot = 1, i.setContent(a[0].userdata.name);
                        var r = n.getLabelPoint(o, 1, {
                            x: Math.abs(a[0].bd[0]) + 6,
                            y: -9
                        });
                        i.setPoint(r), i.setStyle(s[1]), i.show(), n.getShadowLabel({
                            point: r,
                            name: a[0].userdata.name
                        })
                    } else n.isOverSpot = 2, i.setContent("点击可查看详情"), i.setStyle(s[0]), i.setPoint(e.point), n.timeMachine(i);
                else if (a[0].userdata.name) {
                    n.isOverSpot = 1;
                    var r = n.getLabelPoint(o, 1, {
                        x: Math.abs(a[0].bd[0]) + 6,
                        y: -9
                    });
                    i = new BMap.Label(a[0].userdata.name, {
                        point: r
                    }), t.addOverlay(i), n.label1 = i, i.setStyle(s[1]), n.getShadowLabel({
                        point: r,
                        name: a[0].userdata.name
                    })
                } else n.isOverSpot = 2, i = new BMap.Label("点击可查看详情", {
                    point: n.getLabelPoint(e.point, 0)
                }), i.hide(), t.addOverlay(i), n.label1 = i, i.setStyle(s[0]), n.timeMachine(i)
            }, i.timeMachine = function(e) {
                var t = this,
                    i = e;
                t.timer0 = setInterval(function() {
                    t.isMoving || setTimeout(function() {
                        if (2 != t.isOverSpot) return void clearInterval(t.timer0);
                        var e = t.getLabelPoint(t.overSpotPoint, 0);
                        i.setPoint(e), i.show(), t.getShadowLabel({
                            point: e,
                            name: "点击可查看详情"
                        }), clearInterval(t.timer0)
                    }, 500)
                }, 200)
            }, i.getLabelPoint = function(e, i, o) {
                var n = t.pointToPixel(e);
                if (o) var a = o;
                else if (0 == i) var a = {
                    x: -1,
                    y: 24
                };
                else if (1 == i) var a = {
                    x: 12,
                    y: -9
                };
                try {
                    if (0 == i) return t.pixelToPoint(new BMap.Pixel(n.x + a.x, n.y + a.y));
                    if (1 == i) return t.pixelToPoint(new BMap.Pixel(n.x + a.x, n.y + a.y))
                } catch (s) {}
            }, i.moveOutSpot = function() {
                if (!(t.getZoom() < 10 || "webgl" === t.getRenderType() && t.temp.isPermitSpotOver === !1)) {
                    var e = this;
                    e._spots = null, e.isOverSpot = 0, e.label1 && e.label1.hide(), e.label2 && e.label2.hide(), e.sdLab && e.sdLab.hide(), e.timer0 && clearInterval(e.timer0)
                }
            }, i.bindMapRequest = function() {
                var e = this;
                t.addEventListener("spotsdataready", function(t) {
                    return e.clearPoiCache(), e.clearCityCache(), e._shouldDisableSpot() ? void e.hideOverlays() : void(this.getZoom() < 10 ? e.citySpotId = this.addSpots(t.spots) : e.poiSpotId = this.addSpots(t.spots, {
                        enableMultiResponse: !1
                    }))
                }), t.addEventListener("zoomend", function() {
                    e.isCanvasMap() || (e.clearCityCache(), e.clearPoiCache()), t.temp.infoWin && 1 == t.temp.infoWin.isOpen() || (e.mkr1 && e.mkr1.hide(), e.mkr2 && e.mkr2.hide(), e.label1 && e.label1.hide(), e.label2 && e.label2.hide(), e.sdLab && e.sdLab.hide(), e.isOverSpot = 0, e.timer0 && clearInterval(e.timer0))
                })
            }, i.sendRequest = function(e) {
                var i = this;
                if (e && i.fetchId != e.l + "_" + e.x + "_" + e.y) {
                    i.fetchId = e.l + "_" + e.x + "_" + e.y;
                    var o = [],
                        n = parseInt(3 * Math.random()),
                        a = p;
                    o.push(a[n]), o.push("&x=" + e.x + "&y=" + e.y + "&z=" + Math.floor(t.getZoom()) + "&scaler=" + u), o.push(r && r.mapJS ? "&v=" + r.mapJS : "&v=021"), o.push(r && r.mapJSUdt ? "&udt=" + r.mapJSUdt : "&udt=20150805"), o.push("&fn=MPC_Mgr.getPoiData"), T.sio.callByBrowser(o.join(""))
                }
            }, i.getPoiData = function(e) {
                if (e && e.content && !(e.content.length < 1)) {
                    for (var i = e.content, o = {}, n = !1, a = this, s = 0, r = i.length; r > s; s++) {
                        for (var l = [], d = i[s], c = 0, p = d.uids.length; p > c; c++) {
                            var u = d.uids[c],
                                v = (u.bound.xmax + u.bound.xmin) / 2,
                                h = (u.bound.ymax + u.bound.ymin) / 2,
                                m = t.pointToPixel(new BMap.Point(u.bound.xmin, u.bound.ymin)),
                                f = t.pointToPixel(new BMap.Point(u.bound.xmax, u.bound.ymax)),
                                S = u.name ? u.name.replace("\\\\", "<br>") : "",
                                b = [(m.x - f.x) / 2, (f.y - m.y) / 2, (f.x - m.x) / 2, (m.y - f.y) / 2];
                            l.push({
                                pt: new BMap.Point(v, h),
                                bd: b,
                                userdata: {
                                    name: S,
                                    uid: u.uid,
                                    type: u.type,
                                    iconPoint: u.icon ? new BMap.Point(u.icon.x, u.icon.y) : "",
                                    catalog: u.catalog
                                },
                                tag: "MAP_SPOT_INFO"
                            })
                        }
                        a.curTileId && a.curTileId == d.tileid && (n = !0), o[d.tileid] = l
                    }
                    var g = i[0].tileid.split("_"),
                        y = g[0] + "_" + a.m1(g[1]) + "_" + a.m1(g[2]);
                    if (a.cacheData[y] = o, a.cacheIds.push(y), a.cacheIds.length > a.maxCache) {
                        var w = a.cacheIds.shift();
                        a.cacheData[w] = null, w = null
                    }
                    n && a._addSpot(a.curTileId)
                }
            }, i.getPoiDataCbk = i.getPoiData, i.clearPoiCache = function() {
                var e = this;
                e.poiSpotId && (t.removeSpots(e.poiSpotId), e.poiSpotId = null, e.spotOnId = "", e.curTileId = "")
            }, i.clearCityCache = function() {
                var e = this;
                e.citySpotId && (t.removeSpots(e.citySpotId), e.citySpotId = null)
            }, i.hideOverlays = function() {
                var e = this;
                e.mkr1 && e.mkr1.hide(), e.mkr2 && e.mkr2.hide(), e.label1 && e.label1.hide(), e.label2 && e.label2.hide(), e.sdLab && e.sdLab.hide(), e.timer0 && clearInterval(e.timer0)
            }, i._getCateInfo = function(e) {
                for (var t = [], i = 0, o = e.length; o > i; i++) t.push(e[i][1]), o - 1 > i && t.push(", ");
                return t.join("")
            }, i.addShadowLabel = function() {
                var e = this;
                e.sdLab || (e.sdLab = new BMap.Label("shadow"), t.addOverlay(e.sdLab), e.sdLab.setStyle({
                    backgroundColor: "#BEBEBE",
                    borderColor: "#BEBEBE",
                    color: "#BEBEBE",
                    zIndex: -2e4
                })), e.sdLab.hide()
            }, i.getShadowLabel = function(e) {
                return
            }, i.m1 = function(e) {
                return Math.floor(parseInt(e, 10) / this.squareSide)
            }, i.addSpotEvent = function() {
                if (this.isAddSpotEvent !== !0) {
                    this.isAddSpotEvent = !0;
                    var e = this;
                    e._moveOverSpot || (e._moveOverSpot = function(t) {
                        e.moveOverSpot(t)
                    }), e._moveOutSpot || (e._moveOutSpot = function(t) {
                        e.moveOutSpot(t)
                    }), e._clickSpot || (e._clickSpot = function(t) {
                        e.clickSpot(t)
                    }), t.addEventListener("spotmouseover", e._moveOverSpot), t.addEventListener("spotmouseout", e._moveOutSpot), t.addEventListener("spotclick", e._clickSpot)
                }
            }, i.removeSpotEvent = function() {
                var e = this;
                t.removeEventListener("spotmouseover", e._moveOverSpot), t.removeEventListener("spotmouseout", e._moveOutSpot), t.removeEventListener("spotclick", e._clickSpot), this.isAddSpotEvent = !1
            }, i.bindSpotEvent = function() {
                var e = this;
                e.addSpotEvent(), t.addEventListener("onstreetlayer_show", function() {
                    e.addSpotEvent()
                }), t.addEventListener("onstreetlayer_hide", function() {
                    e.clearPoiCache(), e.hideOverlays(), e.removeSpotEvent()
                })
            }, i.isCanvasMap = function() {
                return !(!t.isCanvasMap() && "webgl" !== t.getRenderType())
            }, new a(t)
        }(map);
    i.exports = v
});