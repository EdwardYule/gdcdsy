define("common:widget/ui/MapTest/MapTest.js", function(t, o, n) {
    function r() {
        T.ajax("/wolfman/static/common/images/transparent.gif?t=" + Math.floor(1e6 * Math.random()), {
            success: function(t, o) {
                o.slow ? ErrorMonitor("web", "req_slow" + o.slow, "", !0, {
                    xhr: o,
                    type: "slow",
                    url: "/wolfman/static/common/images/transparent.gif"
                }) : ErrorMonitor("web", "succ", "", !0, {
                    xhr: o,
                    type: "succ",
                    url: "/wolfman/static/common/images/transparent.gif"
                })
            },
            error: function(t) {
                ErrorMonitor("web", "req_fail", t.status, !0, {
                    xhr: t,
                    type: "fail",
                    url: "/wolfman/static/common/images/transparent.gif"
                })
            }
        })
    }

    function e() {
        var t = new Image,
            o = (new Date).getTime(),
            n = {
                timeStart: o
            };
        t.onerror = function() {
            n.timeEnd = (new Date).getTime(), ErrorMonitor("cdn", "req_fail", "", !0, {
                url: "//webmap1.bdimg.com/wolfman/static/common/images/transparent_cdn_3254726.gif",
                type: "fail",
                xhr: n
            })
        }, t.onload = function() {
            n.timeEnd = (new Date).getTime();
            var t = n.timeEnd - o,
                r = !1;
            t > 6e3 ? r = 6 : t > 3e3 ? r = 3 : t > 2e3 && (r = 2), r ? ErrorMonitor("cdn", "req_slow" + r, "", !0, {
                url: "//webmap1.bdimg.com/wolfman/static/common/images/transparent_cdn_3254726.gif",
                type: "slow",
                xhr: n
            }) : ErrorMonitor("cdn", "succ", "", !0, {
                url: "//webmap1.bdimg.com/wolfman/static/common/images/transparent_cdn_3254726.gif",
                type: "succ",
                xhr: n
            })
        }, t.src = "//webmap1.bdimg.com/wolfman/static/common/images/transparent_cdn_3254726.gif?t=" + Math.floor(1e6 * Math.random())
    }
    n.exports = {
        testCDN: e,
        testWeb: r
    }
});;
define("common:widget/ui/mapTypeTab/mapTypeTab.js", function(require, exports, module) {
    var favMgr = require("common:widget/ui/fav/favMgr.js"),
        userMgr = require("common:widget/ui/userMgr/userMgr.js");
    require.loadCss({
        content: "#mapType-wrapper{position:absolute;bottom:0;right:0;z-index:1;bottom:32px}#mapType{height:80px;cursor:pointer;-webkit-transition-property:width,background-color;transition-property:width,background-color;-webkit-transition-duration:.4s;transition-duration:.4s;width:110px;background-color:rgba(255,255,255,0)}.expand #mapType{width:298px;background-color:#fff;background-color:rgba(255,255,255,.8)}.expand #mapType .mapTypeCard{border:1px solid rgba(255,255,255,0);background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/new/maptype_a6d3e9b.png)}.expand #mapType .mapTypeCard.active{border:1px solid #3385FF}.expand #mapType .normal{right:202px}.expand #mapType .satellite,.expand #mapType .earth{right:106px}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){.expand #mapType .mapTypeCard{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/new/maptype2x_282f70b.png)}}#mapType .mapTypeCard{height:60px;width:86px;position:absolute;border-radius:2px;top:10px;box-sizing:border-box;border:1px solid transparent;border:1px solid rgba(153,153,153,.42);background:url(//webmap1.bdimg.com/wolfman/static/common/images/new/shadow_3a100ef.png) no-repeat 0 0;background-size:86px 240px;-webkit-transition-property:right,background-image;transition-property:right,background-image;-webkit-transition-duration:.4s;transition-duration:.4s}#mapType .mapTypeCard span{position:absolute;bottom:0;right:0;display:inline-block;padding:3px 3px 2px 4px;font-size:12px;height:12px;line-height:12px;color:#FFF;border-top-left-radius:2px}#mapType .mapTypeCard.active span,#mapType .mapTypeCard:hover span{background-color:#3385FF}#mapType .mapTypeCard:hover{border:1px solid #3385FF}#mapType .normal{z-index:1;background-position:0 0;right:20px}#mapType .normal .switch-box p{margin-left:20px}#mapType .normal .switch-box input.switch{left:5px}#mapType .normal:hover .switch-box{visibility:visible}#mapType .satellite,#mapType .earth{right:15px;z-index:2;background-position:0 -60px}#mapType .satellite:hover .switch-box,#mapType .earth:hover .switch-box{visibility:visible}#mapType .earth{background-position:0 -181px}#mapType .panorama{z-index:3;right:10px;background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/new/maptype_a6d3e9b.png);background-position:0 -121px;border-left:1px solid rgba(153,153,153,.6)}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){#mapType .panorama{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/new/maptype2x_282f70b.png)}}#mapType .switch-box{visibility:hidden;position:absolute;width:100%;height:20px;line-height:22px;color:#fff;background:rgba(0,0,0,.5)}#mapType .switch-box p{display:inline-block;margin-left:25px}#mapType .switch-box input.switch{position:absolute;left:8px;top:4px;cursor:pointer}",
        name: "mapTypeTab"
    });
    var streetViewTool = null,
        panoProxy = {
            $panoCard: null,
            getPanoCard: function() {
                return this.$panoCard
            },
            setPanoCard: function(e) {
                this.$panoCard = e || null
            }
        },
        cardNameIndex = {
            normalMap: 0,
            satellite: 1,
            panorama: 2,
            earth: 1
        },
        MapTypeTab = {
            _currentName: null,
            init: function(e) {
                streetViewTool = e.streetViewTool, streetViewTool.hide(), this._map = e.map || map, this._container = baidu("#mapType"), this._wrapper = baidu("#mapType-wrapper"), this.render(), this.initialize()
            },
            render: function() {
                try {
                    var tpl = [function(_template_object) {
                        var _template_fun_array = [],
                            fn = function(__data__) {
                                var _template_varName = "";
                                for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                                eval(_template_varName), _template_fun_array.push('<div class=\'mapTypeCard normal\' data-name=\'normalMap\'><div class="switch-box"><input type="checkbox" class="switch" disabled="true" /><p>显示收藏点</p></div>    <span>地图</span></div>'), _template_fun_array.push(isSupportEarth ? '<div class="mapTypeCard earth" data-name="earth"><div class="switch-box"><input type="checkbox" class="switch" checked="true" /><p>开启路网</p></div>    <span>地球</span></div>' : '<div class=\'mapTypeCard satellite\' data-name=\'satellite\'><div class="switch-box"><input type="checkbox" class="switch" checked="true" /><p>开启路网</p></div>    <span>卫星</span></div>'), _template_fun_array.push("<div class='mapTypeCard panorama choosedType' data-name='panorama'>    <span>全景</span></div>"), _template_varName = null
                            }(_template_object);
                        return fn = null, _template_fun_array.join("")
                    }][0];
                    baidu(this._container).append(tpl({
                        isSupportEarth: map.isSupportEarth()
                    })), panoProxy.setPanoCard(this._container.find(".mapTypeCard").eq(2))
                } catch (e) {
                    "undefined" != typeof alog && alog("exception.fire", "catch", {
                        msg: e.message || e.description,
                        path: "common:widget/ui/mapTypeTab/mapTypeTab.js",
                        ln: 62
                    })
                }
            },
            initialize: function() {
                try {
                    this.updateUI(this._map.getMapType()), this.bindEvents()
                } catch (e) {
                    "undefined" != typeof alog && alog("exception.fire", "catch", {
                        msg: e.message || e.description,
                        path: "common:widget/ui/mapTypeTab/mapTypeTab.js",
                        ln: 66
                    })
                }
            },
            bindEvents: function() {
                var e, a = this,
                    t = T(".mapTypeCard.normal .switch-box input.switch");
                userMgr.defferd.then(function() {
                    t.attr("disabled", !1), "hide" !== T.cookie.get("favmarker") && t.attr("checked", !0)
                }, function() {
                    t.attr("disabled", !1)
                }), this._container.on("mouseenter", function() {
                    clearTimeout(e), a._wrapper.addClass("expand")
                }), this._container.on("mouseleave", function() {
                    e = setTimeout(function() {
                        a._wrapper.removeClass("expand")
                    }, 400)
                }), this._wrapper.delegate("#renderModeSwitch", "mouseenter", function() {
                    try {
                        clearTimeout(e)
                    } catch (a) {
                        "undefined" != typeof alog && alog("exception.fire", "catch", {
                            msg: a.message || a.description,
                            path: "common:widget/ui/mapTypeTab/mapTypeTab.js",
                            ln: 90
                        })
                    }
                }), this._wrapper.delegate("#renderModeSwitch", "mouseleave", function() {
                    try {
                        e = setTimeout(function() {
                            a._wrapper.removeClass("expand")
                        }, 400)
                    } catch (t) {
                        "undefined" != typeof alog && alog("exception.fire", "catch", {
                            msg: t.message || t.description,
                            path: "common:widget/ui/mapTypeTab/mapTypeTab.js",
                            ln: 95
                        })
                    }
                }), this._container.delegate(".mapTypeCard", "click", function() {
                    var e = $(this).data("name");
                    "panorama" === e ? (a.setMapType("normalMap"), streetViewTool.stEntranceDomClickHandler(!0)) : (streetViewTool.stEntranceDomClickHandler(!1), a.setMapType($(this).data("name"))), addStat("map.maptype." + e, "click")
                }), this._container.find(".satellite .switch-box, .earth .switch-box").on("click", function(e) {
                    var a = T(e.target),
                        t = T(this).find("input.switch");
                    if (!a.is("input.switch")) {
                        var i = "checked" === t.attr("checked");
                        t.attr("checked", !i)
                    }
                    var p = "checked" === t.attr("checked") ? "open" : "close";
                    addStat("map.maptype." + p + "RouteMap", "click")
                }), this._container.find(".mapTypeCard.normal .switch-box").on("click", function(e) {
                    "normalMap" === a._currentName && e.stopPropagation();
                    var t = T(this).find("input.switch");
                    if (!userMgr.loginStatus) return addStat("map.maptype.loginbyopenfav", "click"), userMgr.login(void 0, void 0, "maptypefav"), t.attr("checked", !1), !1;
                    var i = T(e.target);
                    if (!t.attr("disabled")) {
                        if (!i.is("input.switch")) {
                            var p = "checked" === t.attr("checked");
                            t.attr("checked", !p)
                        }
                        var n = "checked" === t.attr("checked") ? "open" : "close";
                        "open" === n ? favMgr.showPoiMarkers() : favMgr.hidePoiMarkers(), addStat("map.maptype." + n + "fav", "click")
                    }
                }), listener.on("fav.panel", function(e) {
                    var a = T(".mapTypeCard.normal .switch-box input.switch");
                    "open" === e || "unfold" === e ? (a.attr("disabled", !0).attr("checked", !0), favMgr.showPoiMarkers()) : a.attr("disabled", !1)
                }), this._map.addEventListener("onmaptypechange", function() {
                    a.updateUI(this.mapType)
                }), listener.on("pano.model.state", "change", function(e, t) {
                    "open" === t.state ? a.pUpdateCardByName("panorama") : "close" === t.state && a.updateUI(a._map.getMapType())
                }), listener.on("com.subway", "load", function() {
                    a.hide()
                }), listener.on("com.subway", "unload", function() {
                    a.show()
                })
            },
            unBindEvents: function() {},
            unload: function() {},
            hide: function() {
                this._container.addClass("hide")
            },
            show: function() {
                this._container.removeClass("hide")
            },
            setMapType: function(e) {
                var a = this;
                switch (e) {
                    case "normalMap":
                        this._map.setMapType("B_NORMAL_MAP");
                        break;
                    case "satellite":
                    case "earth":
                        var t = "checked" === this._container.find("." + e + " .switch-box .switch").attr("checked");
                        streetViewTool.stEntranceDomClickHandler(!1), "earth" === e ? (this._map.setMapType("B_EARTH_MAP"), "B_EARTH_MAP" === this._map.mapType ? a._map.showStreetLayer(t) : this._map.addEventListener("onmaptypechange", function(e) {
                            var i = e.mapType;
                            "B_EARTH_MAP" === i && a._map.showStreetLayer(t), a._map.removeEventListener("onmaptypechange", arguments.callee)
                        })) : (this._map.setMapType("B_SATELLITE_MAP"), this._map.showStreetLayer(t))
                }
            },
            updateUI: function(e) {
                switch (e) {
                    case "B_NORMAL_MAP":
                        this.pUpdateCardByName("normalMap");
                        break;
                    case "B_SATELLITE_MAP":
                        this.pUpdateCardByName("satellite");
                        break;
                    case "B_EARTH_MAP":
                        this.pUpdateCardByName("earth");
                        break;
                    case "PANORAMA":
                        this.pUpdateCardByName("panorama")
                }
            },
            pUpdateCardByName: function(e) {
                var a = this._container.children(".mapTypeCard");
                this._currentName !== e && (null != this._currentName && a.eq(cardNameIndex[this._currentName]).removeClass("active"), this._currentName = e, a.eq(cardNameIndex[this._currentName]).addClass("active"))
            },
            getPanoProxy: function() {
                return panoProxy
            }
        };
    module.exports = MapTypeTab
});;
define("common:widget/ui/loadCtrls/LoadCtrls.js", function(n, o, t) {
    function e() {}

    function i() {
        try {
            u.pvstat();
            var o = Math.random();
            .2 > o ? l.testWeb() : .4 > o && l.testCDN(), ErrorMonitor("load", "BASE", "");
            var t = window._OLR && baidu.json.parse(window._OLR.index);
            t && t.content && 1 == t.content.code ? ErrorMonitor("load", "loccity_fail", "", void 0, {
                url: "",
                xhr: {
                    startTime: 0,
                    endTime: 0
                },
                type: "fail"
            }) : ErrorMonitor("load", "succ", "", void 0, {
                url: "",
                xhr: {
                    startTime: 0,
                    endTime: 0
                },
                type: "succ"
            })
        } catch (e) {
            console.log("init stat fail")
        }
        map.addEventListener("movestart", function() {
            window.firstbounds = s.formatBounds()
        }), map.addEventListener("moveend", function() {
            window.lastbounds = s.formatBounds(), window.useraction = "move"
        }), map.addEventListener("zoomstart", function() {
            window.firstbounds = s.formatBounds()
        }), map.addEventListener("zoomend", function() {
            window.lastbounds = s.formatBounds(), window.useraction = "zoom"
        }), map.addEventListener("clickex", function(n) {
            n.overlay && n.overlay instanceof BMap.Circle && this.getInfoWindow() && this.closeInfoWindow()
        }), map.addEventListener("click", function() {
            T(".search_box input").blur()
        }), n.async("common:widget/ui/changeMap/ChangeMap.js", function(n) {
            n(map)
        })
    }

    function a() {
        var n = baidu.url.queryToJson(location.href);
        n && n.hb && n.hb == BMAP_TYPE_HYBIRD && n.tn && n.tn == BMAP_SATELLITE_MAP && map.showStreetLayer(!0)
    }

    function c() {
        var n = s.getParam(location.href);
        if (n && 1 == n.mapdebug) {
            var o = window.location.protocol + "//" + window.location.host;
            o += window.location.pathname ? window.location.pathname : "/", o += "mapdebug.js", T.Ajax.request(o, {
                async: !1,
                onsuccess: function(n) {
                    var o = n.responseText;
                    window.execScript ? window.execScript(o) : window.eval(o), "undefined" != typeof mapDebug && mapDebug.openDebug()
                }
            })
        }
    }

    function d() {
        baidu(".search_box a.mo_dl").on("click", function(o) {
            n.async("common:widget/ui/Pc2Mobile/Pc2Mobile.js", function(n) {
                n.open("IMG", "搜索框链接")
            }), o.preventDefault()
        }), T("#user_info").delegate("[data-stat-code]", "click", function() {
            var n = "index" === T(this).attr("data-stat-code") ? !0 : !1;
            addStat("indexheader.nav." + T(this).attr("data-stat-code"), "click", {}, n)
        }), T("#searchWrapper").on("click", ".return-old-link", function() {
            T.cookie.set("force", "oldsample", {
                expires: 6048e5
            }), addStat("indexheader.searchbox.returnold", "click", {}), location.href = "/"
        })
    }

    function r() {
        n.async("common:widget/ui/Pc2Mobile/Pc2Mobile.js", function() {}), n.async("common:widget/ui/MapCenter/MapCenter.js", function(n) {
            n.init()
        }), n.async("common:widget/ui/clickcity/ClickCity.js", function(n) {
            window.MPC_Mgr = n
        }), n.async("common:widget/ui/contextMenu/ContextMenu.js", function(n) {
            window.contextMenu = n.init()
        }), m.loadPlaceAsync()
    }
    var s = n("common:widget/ui/util/util.js"),
        u = (n("common:widget/ui/indexUtil/IndexUtil.js"), n("common:widget/ui/stat/CodeStat.js")),
        l = n("common:widget/ui/MapTest/MapTest.js"),
        m = n("common:widget/com/componentManager.js");
    t.exports = {
        init: function() {
            e(), i(), r(), a(), d(), c()
        }
    }
});;
define("common:widget/ui/dataCopyRight/dataCopyRight.js", function(a, i) {
    var o = a("common:widget/ui/areaCfg/areaCfg.js"),
        t = a("common:widget/ui/qrpop/qrpop.js"),
        p = (a("common:widget/ui/sms/sms.js"), a("common:widget/ui/config/config.js")),
        n = p.modelConfig,
        d = (p.mapConfig, "#copy-right-strong{padding-left:12px;position:relative}#copy-right-strong::before{content:'';height:12px;width:9px;position:absolute;left:0;top:50%;-webkit-transform:translateY(-52%);-ms-transform:translateY(-52%);transform:translateY(-52%);background:url(//webmap1.bdimg.com/wolfman/static/common/images/hot-copyright_ac4ab30.png) 0 0 no-repeat;background-size:100% 100%}");
    a.loadCss({
        content: d,
        name: "dataCopyRight"
    }), i.setCopyRight = function(a) {
        if (!window.isPrint) {
            var i, p = a || n.cityCode,
                d = map.mapType,
                e = [o["常州"], o["南昌"], o["乌鲁木齐"], o["无锡"], o["福州"], o["泉州"], o["珠海"], o["贵阳"]],
                c = ([o["北京"], o["上海"], o["广州"], o["深圳"], o["宁波"], o["石家庄"], o["沈阳"], o["长春"], o["青岛"], o["温州"], o["台州"], o["金华"], o["佛山"], o["中山"], o["昆明"], o["南宁"], o["苏州"], o["西安"], o["济南"], o["郑州"], o["合肥"], o["呼和浩特"], o["杭州"], o["成都"], o["武汉"], o["长沙"], o["天津"], o["南京"], o["重庆"], o["大连"], o["东莞"], o["厦门"]], [o["香港特别行政区"]]),
                s = (T.array.indexOf(e, "" + p) > -1, T.array.indexOf(c, "" + p) > -1, p >= 9e3 && 9378 >= p),
                r = p >= 2e4 && 20499 >= p,
                l = p >= 20500 && 25999 >= p,
                b = p >= 26e3 && 29999 >= p,
                w = p >= 3e4 && 30999 >= p,
                m = p >= 31e3 && 37e3 >= p,
                u = p >= 46609 && 52505 >= p,
                h = p >= 39509 && 53500 >= p,
                g = p >= 54e3 && 7e4 >= p,
                y = "&copy; #{0} Baidu - GS(2023)3206号 - 甲测资字11111342 - 京ICP证030173号 ";
            if (i = [y], map.getZoom() <= 9 ? i = [y] : s ? i = [y] : b || w ? i = [y] : r || l ? i = [y] : m ? i = [y] : u ? i = [y] : h ? i = [y] : g && (i = [y]), i.push("&nbsp;&nbsp;&nbsp;<a href=\"javascript:void(0);\" onclick=\"addStat('copyright.jumpebaidu','click', {wd: '版权信息'}); window.open('https://map.baidu.com/zt/client/copyrightPc/index.html', '_blank');\">版权信息</a>"), i.push("&nbsp;&nbsp;&nbsp;<a href=\"javascript:void(0);\" onclick=\"addStat('copyright.jumpebaidu','click', {wd: '百度首页'});window.open('//www.baidu.com', '_blank');\">百度首页</a>"), i.push("&nbsp;&nbsp;&nbsp;<a href=\"javascript:void(0);\" onclick=\"addStat('copyright.jumpebaidu','click', {wd: '服务条款'}); window.open('https://map.baidu.com/zt/client/service/index.html', '_blank');\">服务条款</a>"), i.push("&nbsp;&nbsp;&nbsp;<a href=\"javascript:void(0);\" onclick=\"addStat('copyright.jumpebaidu','click', {wd: '隐私政策'}); window.open('https://map.baidu.com/zt/client/privacy/index.html', '_blank');\">隐私政策</a>"), i.push("&nbsp;&nbsp;&nbsp;<a id=\"copy-right-strong\" href=\"javascript:void(0);\" onclick=\"addStat('copyright.jumpebaidu','click', {wd: '商业合作'}); window.open('https://map-hz.baidu.com/', '_blank');\">商业合作</a>"), i.push("&nbsp;&nbsp;&nbsp;<a href=\"javascript:void(0);\" onclick=\"addStat('copyright.jumpebaidu','click', {wd: '地图开放平台'}); window.open('http://lbsyun.baidu.com', '_blank');\">地图开放平台</a>"), i.push("&nbsp;&nbsp;&nbsp;<a href=\"javascript:void(0);\" onclick=\"addStat('copyright.jumpebaidu','click', {wd: '品牌/商户认领'}); window.open('http://biaozhu.baidu.com/?from=mapbottom', '_blank');\">品牌/商户认领</a>"), i.push("&nbsp;&nbsp;&nbsp;<a href=\"javascript:void(0);\" onclick=\"addStat('copyright.jumpebaidu','click', {wd: '意见建议'}); window.open('https://help.baidu.com/newadd?prod_id=4&category=6', '_blank');\">意见建议</a>"), i.push("&nbsp;&nbsp;&nbsp;<a id=\"download-app\"onclick=\"addStat('copyright.jumpebaidu','click', {wd: '下载地图客户端'});\">下载地图客户端</a>"), i.push("&nbsp;&nbsp;&nbsp;<a id=\"download-app\" href=\"javascript:void(0);\" onclick=\"addStat('copyright.jumpebaidu','click', {wd: '新增地点'}); window.open('https://didian.baidu.com/lbc/merchant/shopenterpage?business_trigger=76', '_blank');\">新增地点</a>"), i.push("&nbsp;&nbsp;&nbsp;<a href=\"javascript:void(0);\" onclick=\"addStat('copyright.jumpebaidu','click', {wd: '百度营销'}); window.open('http://e.baidu.com/?refer=134', '_blank');\">百度营销</a>"), !window.copyCtrl) {
                window.copyCtrl = new BMap.CopyrightControl({
                    offset: new BMap.Size(-10, 0)
                }), map.addControl(window.copyCtrl);
                var d = map.getMapType();
                d === BMAP_SATELLITE_MAP || d === BMAP_EARTH_MAP ? (T("#newuilogo").addClass("white"), window.copyCtrl && window.copyCtrl.addSateMapStyle()) : d === BMAP_NORMAL_MAP && (T("#newuilogo").removeClass("white"), window.copyCtrl && window.copyCtrl.removeSateMapStyle())
            }
            var f = (new Date).getFullYear();
            window.copyCtrl.addCopyright({
                content: baidu.string.format(i.join(""), [f]),
                id: 1
            });
            var k, v = function() {
                0 === T(".BMap_cpyCtrl").length ? k = setTimeout(function() {
                    v()
                }, 1e3) : T(window.copyCtrl.getDom()).off("click", "#download-app").on("click", "#download-app", function() {
                    t.ready()
                }), 0 === T(".BMap_cpyCtrl").length && setTimeout(function() {
                    k && clearTimeout(k)
                }, 1e4)
            };
            v()
        }
    }
});;
define("common:widget/ui/changeMap/ChangeMap.js", function(e, a, t) {
    function n(e) {
        e.addEventListener("beforesetmaptype", function() {
            e.closeInfoWindow()
        });
        e.addEventListener("maptypechange", function(e) {
            var a = e.mapType;
            if (i.setDataCopyRight(), a === BMAP_SATELLITE_MAP || a === BMAP_EARTH_MAP ? (window.copyCtrl && window.copyCtrl.addSateMapStyle(), window.scaleCtrl && window.scaleCtrl.addSateMapStyle()) : a === BMAP_NORMAL_MAP && (window.copyCtrl && window.copyCtrl.removeSateMapStyle(), window.scaleCtrl && window.scaleCtrl.removeSateMapStyle()), "B_NORMAL_MAP" === a) addStat("basemap.maptypechange.normalmap");
            else if ("B_SATELLITE_MAP" === a) addStat("basemap.maptypechange.satellitetype");
            else if ("B_EARTH_MAP" === a) {
                var t = {};
                t.da_e_name = "pcmapearth", addStat("basemap.maptypechange.earthtype", "show", t)
            }
        })
    } {
        var o = e("common:widget/ui/config/config.js"),
            i = e("common:widget/ui/indexUtil/IndexUtil.js");
        o.modelConfig, o.mapConfig
    }
    t.exports = n
});;
define("common:widget/ui/MapCenter/MapCenter.js", function(t, e, n) {
    function i() {
        T.lang.Class.call(this), this._map = map, this.startPoint = map.getCenter(), this.unit = 1e4, this.url = m.MAP_CENTER_URL + "?newmap=1&qt=cen", this._cbks = []
    }

    function o() {
        var t = map.getBounds(),
            e = function(t) {
                return 1e3 * parseInt(t / 1e3)
            };
        return e(t.minX) + "," + e(t.minY) + ";" + e(t.maxX) + "," + e(t.maxY)
    }
    var a = t("common:widget/ui/config/config.js"),
        s = t("common:widget/ui/Traffic/Traffic.js"),
        r = t("common:widget/ui/Weather/Weather.js"),
        c = t("common:widget/ui/indexUtil/IndexUtil.js"),
        u = t("common:widget/ui/AQIMgr/AQIMgr.js"),
        l = a.modelConfig,
        m = (a.mapConfig, a.urlConfig);
    T.extend(i.prototype, {
        init: function() {
            var t = this,
                e = map;
            l.enableMapMove = !0, e.addEventListener("load", function(e) {
                t.request(e), s.setHighLevel()
            }), e.addEventListener("moveend", function(e) {
                t.request(e)
            }), e.addEventListener("centerandzoom", function(e) {
                t.request(e)
            }), e.addEventListener("zoomend", function(e) {
                t.request(e), s.setHighLevel()
            }), map.getMapType() === BMAP_EARTH_MAP && t.request()
        },
        request: function() {
            if (r.active || l.enableMapMove !== !1) {
                {
                    var t = map.getZoom();
                    window.currentComponent
                }
                if (4 >= t) return window.temp.map_level = t, void c.setCurCity({
                    name: "全国",
                    code: "1",
                    type: 0
                });
                var e = map.getCenter(),
                    n = this.startPoint,
                    i = Math.sqrt((n.lng - e.lng) * (n.lng - e.lng) + (n.lat - e.lat) * (n.lat - e.lat)),
                    a = this;
                if (i > this.unit || window.temp.map_level != t || r.active) {
                    window.temp.map_level = t, this.startPoint = e;
                    var s = this.url + "&b=" + o() + "&l=" + t;
                    s += "&dtype=1", baidu.jsonp(s, function(t) {
                        t && t.content && a.curCity(t)
                    })
                }
            }
        },
        curCity: function(t) {
            if (t && (r.add(t.weather), u.set(t.aqi, t.current_city, "mapcenter")), 0 != l.enableMapMove) {
                try {
                    {
                        var e = t,
                            n = e.content,
                            i = e.current_city;
                        i.code, i.type
                    }
                    n.sup = i.sup, c.setCurCity(i, {
                        from: "mapcenter"
                    }), null != n.sup_bus && c.setSupBus(n.sup_bus), e.hot_city && window._OLR && (window._OLR.hot_city = e.hot_city)
                } catch (o) {}
                for (var a = 0, s = this._cbks.length; s > a; a++) this._cbks[a] && "function" == typeof this._cbks[a] && this._cbks[a]()
            }
        },
        addCallback: function(t) {
            this._cbks.push(t)
        },
        removeCallback: function(t) {
            for (var e = 0, n = this._cbks.length; n > e; e++) this._cbks[e] === t && (this._cbks.splice(e, 1), e--)
        },
        clearCallbacks: function() {
            this._cbks.length = 0
        }
    }), n.exports = new i
});;
define("common:widget/ui/contextMenu/ContextMenu.js", function(e, t, n) {
    function i(e, t) {
        t = t || 0;
        var n = m.getState();
        if ("route" === n.state) {
            var i = n.subData;
            "bus" === i.index ? l.load("BusTrans", {
                cinfo: {
                    isPos: !0,
                    destFlag: t,
                    point: e
                },
                record: !1,
                isMainRequest: "no",
                isFromContextMenu: !0
            }) : "drive" === i.index && l.load("NavTrans", {
                cinfo: {
                    isPos: !0,
                    destFlag: t,
                    point: e
                },
                record: !1,
                isMainRequest: "no",
                isFromContextMenu: !0
            })
        }
    }

    function o(e, t) {
        t = t || 0, l.load("BusTrans", {
            cinfo: {
                isPos: !0,
                destFlag: t,
                point: e
            },
            record: !1,
            isMainRequest: "no",
            isFromContextMenu: !0
        })
    }

    function a(e, t) {
        t = t || 0, l.load("NavTrans", {
            cinfo: {
                isPos: !0,
                destFlag: t,
                point: e
            },
            record: !1,
            isMainRequest: "no",
            isFromContextMenu: !0
        })
    }

    function r(e, t) {
        t = t || 0, l.load("NavWalk", {
            cinfo: {
                isPos: !0,
                destFlag: t,
                point: e
            },
            record: !1,
            isMainRequest: "no",
            isFromContextMenu: !0
        })
    }

    function s(e, t) {
        t = t || 0, l.load("NavBike", {
            cinfo: {
                isPos: !0,
                destFlag: t,
                point: e
            },
            record: !1,
            isMainRequest: "no",
            isFromContextMenu: !0
        })
    }

    function d() {
        var t = function(e) {
                listener.trigger("poiinfowin.rightmenu.select"), window.currentComponent && "RouteAddr" === window.currentComponent._className ? i(e) : m.setState("route").then(function() {
                    var t = m.getState(),
                        n = t.subData;
                    "bus" === n.index ? o(e, 0) : "drive" === n.index ? a(e, 0) : "walk" === n.index ? r(e, 0) : s(e, 0)
                }), addStat("poiinfowin.rightmenu.starthere")
            },
            n = function(e) {
                listener.trigger("poiinfowin.rightmenu.select"), addStat("poiinfowin.rightmenu.passthroughhere"), p.getGEORevertAddress(e, function(t) {
                    if (t.content) {
                        var n = {
                                pt: e.lng + "," + e.lat
                            },
                            i = t.content;
                        n.wd = i.address, i.point && (n.pt = i.point.x + "," + i.point.y), m.setState("route", {
                            tp: {
                                index: -1,
                                location: n
                            },
                            doSearch: !0
                        })
                    }
                })
            },
            d = function(e) {
                listener.trigger("poiinfowin.rightmenu.select"), window.currentComponent && "RouteAddr" === window.currentComponent._className ? i(e) : m.setState("route").then(function() {
                    var t = m.getState(),
                        n = t.subData;
                    "bus" === n.index ? o(e, 1) : "drive" === n.index ? a(e, 1) : "walk" === n.index ? r(e, 1) : s(e, 1)
                }), addStat("poiinfowin.rightmenu.goinghere")
            },
            c = function(t) {
                listener.trigger("poiinfowin.rightmenu.select"), e.async("common:widget/ui/searchInfoWindow/searchInfoWindow.js", function(e) {
                    var n = t,
                        i = e.addRangeSearchCenterPoi(n),
                        o = e.createRangeInfoWnd(n);
                    o.addEventListener("close", function() {
                        e.exitRangeSearch(), o.overlay && o.overlay.remove()
                    }), o.addEventListener("open", function() {
                        window.GRControll && window.GRControll.setGRequestFlg(1500), h.addEventListener("moveend", function() {
                            setTimeout(function() {
                                if (T.g("rangekw")) try {
                                    T.g("rangekw").focus()
                                } catch (e) {}
                            }, 100), h.removeEventListener("moveend", arguments.callee)
                        })
                    }), e.openSearchInfoWnd(o, i, {
                        pano: !0,
                        panoPoint: n
                    })
                }), addStat("poiinfowin.rightmenu.searchnb")
            },
            l = function(e) {
                listener.trigger("poiinfowin.rightmenu.select");
                var t = (window.map.mercatorToLnglat(e.lng, e.lat), {
                    lng: e.lng,
                    lat: e.lat,
                    city_id: window.currentCity.code,
                    business_trigger: 9
                });
                window.open("https://didian.baidu.com/lbc/merchant/shopenterpage?" + baidu.url.jsonToQuery(t, encodeURIComponent))
            },
            v = u([{
                text: "<span id='cmitem_start'> 以此为起点</span>",
                callback: t,
                width: 90
            }, {
                text: "<span id='cmitem_pass'> 以此为途经点</span>",
                callback: n,
                width: 90
            }, {
                text: "<span id='cmitem_end'> 以此为终点</span>",
                callback: d,
                width: 90
            }, {
                separator: !0
            }, {
                text: "<span id='cmitem_nsearch'> 在此点附近找...</span>",
                callback: c,
                width: 90
            }, {
                text: '<span id="cmitem_add"> 添加新地点</span>',
                callback: l,
                width: 90
            }]);
        h.addEventListener("maptypechange", function() {
            this.getMapType() == BMAP_NORMAL_MAP && v.enable()
        });
        var x = function(e, t) {
            if (window.currentComponent && "RouteAddr" === window.currentComponent._className && window.startPoi !== !1 && window.endPoi !== !1) return e.getItem(0 + t).disable(), e.getItem(1 + t).disable(), void e.getItem(2 + t).disable();
            e.getItem(0 + t) && e.getItem(0 + t).enable(), e.getItem(2 + t) && e.getItem(2 + t).enable(), h.getZoom() < 10 ? e.getItem(3 + t).disable() : e.getItem(3 + t).enable();
            var n = m.getState();
            "route" === n.state && "drive" === n.subData.index && n.subData.sureTpList.length < 5 ? e.getItem(1 + t).enable() : e.getItem(1 + t).disable()
        };
        return v.addEventListener("open", function(e) {
            var t = this,
                n = 0,
                i = t.getItem(0);
            b ? (f.point = e.point, f.pixel = e.pixel, g.closePanoPreview(), i.setText('<span id="cmitem_preview">全景预览</span><span id="cmitem_preview_disable"></span>'), i.disable(), n = 1, w.getStreetBriefByLocation({
                point: f.point,
                level: h.getZoom()
            }, function(e) {
                var o = e.content;
                o ? (i.setText('<span id="cmitem_preview">全景预览</span><span id="cmitem_preview_enable"></span>'), i.enable(), f.panoId = o.id) : i.disable(), x(t, n)
            })) : x(t, n)
        }), v
    }

    function c(e) {
        var t = [{
            separator: !0
        }, {
            text: '<span id="cmitem_preview">全景预览</span><span id="cmitem_preview_icon"></span>',
            callback: I,
            width: 90
        }];
        if (b)
            for (var n = 0, i = t.length; i > n; n++) {
                var o = t[n];
                o.separator ? e.addSeparator(0) : e.addItem(new x.MenuItem(o.text, o.callback || function() {}, {
                    width: o.width || 100,
                    id: o.id
                }), 0)
            }
    }

    function u(e, t, n) {
        var i = new x.ContextMenu({
            container: t
        });
        t && t !== h ? i.initialize(h) : h.addContextMenu(i);
        for (var o = 0, a = e.length; a > o; o++) {
            var r = e[o];
            r.separator ? i.addSeparator() : i.addItem(new x.MenuItem(r.text, r.callback || function() {}, {
                width: r.width || 100,
                id: r.id
            }))
        }
        return i.setCursor(n), c(i), i
    }
    var l = e("common:widget/com/componentManager.js"),
        m = e("common:widget/ui/searchBox/searchBox.js"),
        p = e("common:widget/ui/mapUtil/mapUtil.js"),
        g = e("pano:widget/PanoInterface/PanoInterface.js"),
        w = e("pano:widget/base/service.js"),
        v = function() {
            var e, t = document.createElement("canvas"),
                n = !0;
            try {
                e = t.getContext("experimental-webgl") || t.getContext("webgl") || t.getContext("moz-webgl") || t.getContext("webkit-3d")
            } catch (i) {}
            return e || (n = !1), t = null, e = null, n
        },
        f = {},
        h = window.map,
        x = window.BMap,
        b = v(),
        I = function() {
            var e = h.container,
                t = T.dom(e).offset(),
                n = t.top + f.pixel.y,
                i = t.left + f.pixel.x;
            g.showPanoPreview({
                panoId: f.panoId,
                from: "contextMenu",
                top: n,
                left: i
            });
            var o = function() {
                g.closePanoPreview(), T.un(document.body, "click", o)
            };
            T.on(document.body, "click", o);
            var a = function() {
                g.closePanoPreview(), h.removeEventListener("zoomstart", a)
            };
            h.addEventListener("zoomstart", a);
            var a = function() {
                g.closePanoPreview(), h.removeEventListener("moving", a)
            };
            h.addEventListener("moving", a);
            var r = function() {
                g.closePanoPreview(), h.removeEventListener("oncenterandzoom", r)
            };
            h.addEventListener("oncenterandzoom", r)
        },
        P = {
            init: function() {
                var e = d();
                return e
            },
            create: function(e, t, n) {
                var i = u(e, t, n);
                return i
            },
            destroy: function(e) {
                e && e.destroy && (e.destroy(), e = null)
            }
        };
    n.exports = P
});;
define("common:widget/ui/Storage/Storage.js", function(e, t, a) {
    baidu.storage = {}, baidu.storage._isValidKey = function(e) {
        return new RegExp('^[^\\x00-\\x20\\x7f\\(\\)<>@,;:\\\\\\"\\[\\]\\?=\\{\\}\\/\\u0080-\\uffff]+$').test(e)
    }, baidu.storage.userData = function() {
        var e = "_BAIDU.ALL.KEY_",
            t = function() {
                var e = null;
                return e = document.createElement("input"), e.type = "hidden", e.addBehavior("#default#userData"), document.body.appendChild(e), e
            },
            a = function(e, a) {
                try {
                    var r = t(),
                        o = a || {};
                    if (o.expires) {
                        var u;
                        "number" == typeof o.expires && (u = new Date, u.setTime(u.getTime() + o.expires)), r.expires = u.toUTCString()
                    }
                    o.expires = null, r.setAttribute(o.key, o.value), r.save(o.key)
                } catch (l) {}
            },
            r = function(t, r) {
                a(t, r), result = o({
                    key: e
                }), result = result ? {
                    value: result
                } : {
                    key: e,
                    value: ""
                }, new RegExp("(^||)" + t + "(||$)").test(result.value) || (result.value += "|" + t, a(e, result))
            },
            o = function(e) {
                try {
                    var a = t();
                    return a.load(e.key), a.getAttribute(e.key) || null
                } catch (r) {
                    return null
                }
            },
            u = function(e) {
                try {
                    var a = t();
                    a.load(e.key), a.removeAttribute(e.key);
                    var r = new Date;
                    r.setTime(r.getTime() - 1), a.expires = r.toUTCString(), a.save(e.key)
                } catch (o) {}
            },
            l = function() {
                if (result = o({
                        key: e
                    })) {
                    result = {
                        value: result
                    };
                    for (var t = (result.value || "").split("|"), a = t.length, r = 0; a > r; r++) u({
                        key: t[r]
                    })
                }
            };
        return {
            getItem: o,
            setItem: r,
            removeItem: u,
            clearAll: l
        }
    }(), baidu.storage._isSupportLocalStorage = function() {
        try {
            window.localStorage.setItem("testLocalStorage", "hello world")
        } catch (e) {
            return !1
        }
        return "localStorage" in window && null !== window.localStorage
    }, baidu.storage.isSupportStorage = function() {
        return "localStorage" in window && null !== window.localStorage || document.all
    }, baidu.storage.set = function(e) {
        if (baidu.storage._isValidKey(e.key)) {
            var t = e || {};
            baidu.storage._isSupportLocalStorage() ? (window.localStorage.setItem(t.key, t.value), e.expires && window.localStorage.setItem(t.key + ".expires", t.expires)) : baidu.storage.userData.setItem(e.key, t)
        }
    }, baidu.storage.get = function(e) {
        var t = null;
        if (!baidu.storage._isValidKey(e.key)) return t;
        if (baidu.storage._isSupportLocalStorage()) {
            if (t = window.localStorage.getItem(e.key)) {
                var a = window.localStorage.getItem(e.key + ".expires");
                t = {
                    value: t,
                    expires: a ? new Date(a) : null
                }, t && t.expires && t.expires < new Date && (t = null, window.localStorage.removeItem(e.key))
            }
        } else t = baidu.storage.userData.getItem(e), t && (t = {
            value: t
        });
        return t ? t.value : null
    }, baidu.storage.remove = function(e) {
        baidu.storage._isSupportLocalStorage() ? (window.localStorage.removeItem(e.key), window.localStorage.removeItem(e.key + ".expires")) : baidu.storage.userData.removeItem(e)
    }, baidu.storage.clearAll = function() {
        baidu.storage._isSupportLocalStorage() ? window.localStorage.clear() : baidu.storage.userData.clearAll()
    }, a.exports = baidu.storage
});;
define("common:widget/ui/searchInfoWindow/searchInfoWindow.js", function(e, i, a) {
    function t(e) {
        var i = e.ext,
            a = i.detail_info,
            t = i.src_name,
            n = (t.toUpperCase() + "_", e.uid),
            o = e.poiType,
            s = e.cityCode,
            r = [],
            d = "hotel" == i.src_name && parseInt(a.pc_bookable),
            l = /^(hospital|house|education|scope|shopping)$/,
            c = /^(hospital|house|education|shopping)$/;
        if ("cater" != i.src_name && a && a.homepage && r.push('<div class="url"><a href="' + a.homepage + '" target="_blank" >' + a.homepage + "</a></div>"), a && (a.overall_rating || a.price) && !d && "090300" != e.catId) {
            if (r.push('<div class="hotel_iw">'), a.overall_rating) {
                var p = Math.round(1 * a.overall_rating * 12.2);
                p = isNaN(p) ? 0 : p, p > 0 && (l.test(t) || r.push('<span class="score"><b style="width:' + p + 'px">评分</b></span><span tid="iw_poi_score" class="starNum">' + a.overall_rating + "</span>"))
            }
            if (a.price) {
                var u = parseFloat(a.price),
                    h = place.placeConfig.basicInfoCN[i.src_name],
                    _ = h.price,
                    f = h.priceUnit,
                    m = parseFloat(a.realPrice);
                c.test(t) || (!isNaN(m) && m > 0 ? r.push('<span tid="iw_poi_price" class="price">报价：<span style="color:red">' + m + "元起</span></span>") : !isNaN(u) && u > 0 && _ && f && r.push('<span tid="iw_poi_price" class="price">' + _ + "：&nbsp;" + u + f + "</span>"))
            }
            a.venue_flag && r.push(['<a class="no-underline" onclick="place.showDetail(\'' + n + "', " + o + ", " + s + ", '" + t + "','venue','Iw');return false\" href=\"javascript:void(0)\">", "价格表&gt;&gt;", "</a>"].join("")), r.push("</div>")
        }
        return r.join("")
    }

    function n(e) {
        var i = e.ext,
            a = this,
            t = i.detail_info,
            n = i.src_name || "",
            o = e.uid,
            s = e.poiType,
            r = e.cityCode,
            d = (n.toUpperCase() + "_", {
                action: "open_iw"
            }),
            l = [],
            c = 0,
            p = "hotel" == i.src_name && parseInt(t.pc_bookable),
            u = "cater" == i.src_name && parseInt(i.detail_info.pc_bookable),
            h = ("scope" == i.src_name && parseInt(t.ticket_book_flag), S.getParams());
        if (u && l.push(a.generateCaterBookPrice(e)), t.premium2 && T.isArray(t.premium2) && t.premium2.length && "hotel" != n) {
            var _, f, m = t.premium2;
            if (c = 1, m.length > 1)
                for (var w = 0;
                    (_ = m[w]) && "lbc-claim" != _.name; w++);
            _ = _ || t.premium2[0], f = _.discount_title, f.length > 20 && (f = f.substr(0, 20) + "..."), l.push(['<p class="place-preferential">', "<a onclick=\"place.showDetail('" + o + "', '" + s + "', '" + r + "', '" + n + "','page_discount','Iw');\" href=\"javascript:void(0)\">", "<em></em><strong>" + f + "</strong><i></i>", "</a></p>"].join("")), d.discount = 1
        }
        if (t.groupon && T.isArray(t.groupon) && "hotel" != n) {
            var v, g = t.groupon_num || t.groupon.length;
            v = "cater" == n ? '<p class="place-preferential groupon" ' + ("090300" == e.categoryId ? 'style="margin-top: 3px;"' : "") + "><a onclick=\"place.showDetail('" + o + "', '" + s + "', '" + r + "', '" + n + "','groupon','Iw');\" href=\"javascript:void(0)\"> <em></em><strong>" + g + "条团购信息</strong></a></p>" : '<p class="place-preferential groupon" ' + ("090300" == e.categoryId ? 'style="margin-top: 3px;"' : "") + ">                    <a onclick=\"place.showDetail('" + o + "', '" + s + "', '" + r + "', '" + n + "','groupon','Iw');\" href=\"javascript:void(0)\">                    <em></em><strong>" + g + "条团购信息</strong>                    </a></p>", l.push(v), d.groupon = 1
        }
        if (t.announcement && t.announcement.title) {
            var b = t.announcement.title;
            b.length > 20 && (b = b.substr(0, 20) + "..."), l.push(['<p class="place-preferential announcement">', "<a onclick=\"place.showDetail('" + o + "', '" + s + "', '" + r + "', '" + n + "','announcement','Iw');\" href=\"javascript:void(0)\">", "<em></em><strong>" + b + "</strong>", "</a></p>"].join(""))
        }
        if (t.other_opera_num && (l.push(['<p class="link"><span>近期上演' + t.other_opera_num + "个剧目，</span>", "<a onclick=\"place.showDetail('" + o + "', '" + s + "', '" + r + "', '" + i.src_name + "','other_opera','Iw');return false\" href=\"javascript:void(0)\">", "查看演出信息&gt;&gt;", "</a></p>"].join("")), d.other_opera = 1), "090300" != e.categoryId && (t.link = t.link || [])) {
            var y = [];
            y.push(p ? '<p tid="iw_poi_detail" class="link link-gray"><em>详情：</em>' : '<p tid="iw_poi_detail" class="link"><em>详情：</em>');
            for (var C = 0; C < t.link.length; C++)
                if (t.link && t.link[C].url && "DAODAO" != t.link[C].name.toUpperCase()) {
                    var I = t.link[C].name,
                        k = t.link[C].url,
                        x = T.url.getQueryValue(k, "qt"),
                        P = "",
                        R = "",
                        M = {
                            from: "map",
                            category: n.toLowerCase(),
                            fun: I,
                            area: "iw"
                        };
                    if (x ? (P = k, R = decodeURIComponent(T.url.getQueryValue(k, "url"))) : (P = "http://map.baidu.com/detail?qt=ur", R = k), "kuxun" == I && (R += "?fromid=Khslmapbaidu-S1168731-T1183261&est=marketing"), "elong" == I) {
                        var B = /^http:\/\/www\.elong\.com.*?(_|-)(\d*)(\.html|\-photos.*|_index_1\.html)$/,
                            O = "http://hotel.elong.com/search/$2",
                            E = "?semid=baidumap";
                        R = R.replace(B, O + "-hotel/" + E)
                    }
                    "shenbian" == I && -1 == I.indexOf("bd=baidu_map") && (/\?/.test(R) ? R = R.replace(/(\?)(.*)$/, "$1bd=baidu_map&$2") : /\#/.test(R) ? R = R.replace(/(\#)(.*)$/, "?bd=baidu_map#$2") : R += "?bd=baidu_map"), x ? P = P.replace(/(&|\?|#)(url=)([^&#]*)(&|$|#)/, "$1$2" + encodeURIComponent(R) + "$4") : M.url = R, P = P + "&" + T.url.jsonToQuery(M, function(e) {
                        return encodeURIComponent(e)
                    }), y.push('<span ><a href="' + P + '" target="_blank">' + t.link[C].cn_name + "</a></span>")
                }
            y.push("</p>"), l.push(y.join(""))
        }
        return t.movie_film_count && "090300" == e.categoryId && (h.pl_business_id && t.timetable.length ? (l.push('<div class="movie-info-newest" style="width:208px;_width:204px;">'), l.push(baidu.string.format("<a href=\"javascript:void(0);\" onclick=\"place.showDetail('#{0}','#{1}','#{2}','#{3}','#{4}','Iw','#{5}');return false;\"><span>近期场次<i class=\"arrow\"></i></span><em class=\"light\">" + t.timetable.slice(0, 4).join('</em><em class="light">') + "</em></a>", [o, s, r, n, "movie_info", h.pl_business_id]))) : (l.push('<div class="movie-info-newest">'), l.push(baidu.string.format("<a href=\"javascript:void(0);\" onclick=\"place.showDetail('#{0}','#{1}','#{2}','#{3}','#{4}','Iw');return false;\"><span>实时影讯<i class=\"arrow\"></i></span>目前<em>" + t.movie_film_count + "</em>部影片<em>正在上映!</em></a>", [o, s, r, n, "movie_info"]))), l.push("</div>"), d.other_movie = 1), l.join("")
    }

    function o(e) {
        var i = !!e;
        if (i) switch (e.src_name) {
            case "ctrip_hotel":
                break;
            case "ctrip_site":
                i = !1;
                break;
            case "dianping":
                i = !1;
                break;
            case "house_new":
                break;
            case "house_ershou":
                break;
            case "biaozhu_data":
        }
        return i
    }

    function s(e) {
        var i = e.ext ? e.ext.detail_info : {},
            a = [],
            t = "",
            n = "";
        switch (e.status) {
            case 1:
            case 2:
            case 4:
            case 8:
            case 10:
                break;
            case 5:
                t = "该店即将开业，建议确认后再去 ";
                break;
            case 3:
            case 9:
                t = "该地点已关闭或搬迁";
                break;
            case 11:
                t = "可能已搬迁或关闭，建议确认后再去 "
        }
        return n = i && i.point ? "http://tousu.baidu.com/map/add?place=" + encodeURIComponent(e.name) + "&lat=" + i.point.y + "&lng=" + i.point.x + "#1" : "http://tousu.baidu.com/map/add?place=" + encodeURIComponent(e.name) + "#1", t && (a.push('<div class="msgBox inbub">'), a.push('<span class="alrt"></span>'), a.push(t), a.push('<a target="_blank" href="' + n + "\" onclick=\"addStat('7000',{area:'iw_page',item:'bub_alrt_clk',from:'map'})\">欢迎报错</a>"), a.push("</div>")), a.join("")
    }
    var r = e("common:widget/com/componentManager.js"),
        d = e("common:widget/ui/util/util.js"),
        l = e("common:widget/ui/constant/Constant.js"),
        c = e("common:widget/ui/signMgr/signMgr.js"),
        p = e("common:widget/ui/fav/favMgr.js"),
        u = e("common:widget/ui/mapUtil/mapUtil.js"),
        h = e("common:widget/ui/indexUtil/IndexUtil.js"),
        _ = e("common:widget/ui/sms/sms.js"),
        f = e("common:widget/ui/config/config.js"),
        m = e("pano:widget/PanoInterface/PanoInterface.js"),
        w = e("common:widget/ui/FilterStatus/FilterStatus.js"),
        v = f.modelConfig,
        g = f.mapConfig,
        b = f.urlConfig,
        S = e("common:widget/search/SearchUrlParam.js"),
        y = function() {
            var e, i = 0,
                a = null;
            return function(t, n, o, s, r, d) {
                var l, c, p, u;
                if (100 > r - i) return !0;
                500 > r - i && a ? (l = a.mainMenuPosition, c = a.subMenuPosition, p = a.mainMenuStyle, u = a.subMenuStyle) : (a = {}, l = a.mainMenuPosition = T.dom.getPosition(n), c = a.subMenuPosition = T.dom.getPosition(o), p = a.mainMenuStyle = {
                    width: parseInt(T.dom.getComputedStyle(n, "width") || n.currentStyle.width),
                    height: parseInt(T.dom.getComputedStyle(n, "height") || n.currentStyle.height)
                }, u = a.subMenuStyle = {
                    width: parseInt(T.dom.getComputedStyle(o, "width") || o.currentStyle.width),
                    height: parseInt(T.dom.getComputedStyle(o, "height") || o.currentStyle.height)
                });
                var h, _, f, m = function() {
                    e = setTimeout(function() {
                        d && d()
                    }, 500)
                };
                if (i = r, clearTimeout(e), c.left <= 0 || c.top <= 0) return a = null, !1;
                if (s);
                else {
                    if (t.y >= c.top) return !0;
                    if (t.x < l.left) h = t.x - c.left, _ = c.top - t.y, f = p.height / (l.left - c.left), m();
                    else {
                        if (!(t > l.left + p.width)) return !0;
                        h = c.left + u.width - t.x, _ = c.top - t.y, f = p.height / (c.left + u.width - c.left - u.width), m()
                    }
                }
                var w = f >= _ / h;
                return w || clearTimeout(e), w
            }
        }(),
        C = {
            content: null,
            opts: null,
            queryWd: "",
            iwExt: null,
            iwOpts: null,
            rangeSearchCenterMarker: null,
            addRangeSearchCenterPoi: function(e, i, a, t) {
                this.rangeSearchCenterMarker && (this.rangeSearchCenterMarker.remove(), this.rangeSearchCenterMarker = null);
                var n = d.getPoiPoint(e);
                if (n) {
                    var o = new BMap.Icon(l.A_J_MARKER_IMG_NEW, l.A_J_MARKER_CENTERBLUE_SIZE, {
                            offset: l.A_J_MARKER_CENTERBLUE_OFFSET,
                            imageOffset: new BMap.Size(75, 233),
                            infoWindowOffset: l.A_J_MARKER_INFOWND_OFFSET,
                            imageSize: new BMap.Size(l.A_J_MARKER_IMG_NEW_WIDTH, l.A_J_MARKER_IMG_NEW_HEIGHT),
                            srcSet: l.A_J_MARKER_IMG_NEW2X_SRCSET
                        }),
                        s = t || 25e5,
                        r = new BMap.Marker(n, {
                            icon: o,
                            zIndexFixed: !0,
                            baseZIndex: s,
                            startAnimation: "marker-raise"
                        });
                    return map.addOverlay(r), r._stCode = l.OVERLAY_STYLE.MKR_RCTR, a || (this.rangeSearchCenterMarker = r), i && r.setTitle(i), r
                }
            },
            createSearchInfoWnd: function(e, i) {
                this.content = e, this.opts = i || {}, i = i || {}, window.addStat("search.info.win", "show");
                var a = e.title,
                    r = "null" === e.addr ? "" : e.addr,
                    d = e.desc,
                    p = e.blinfo,
                    u = e.tel && e.tel.replace(/(,|;)/gi, ", "),
                    h = e.uid || "",
                    _ = e.poiType || l.POI_TYPE_NORMAL,
                    f = e.hasDetail,
                    m = e.ext,
                    w = e.transUid,
                    g = e.mingpian,
                    S = m && m.pic_info ? m.pic_info : [],
                    y = e.userSign || 0,
                    C = e.fav || 0,
                    I = e.content,
                    k = (e.bizType, window.place ? window.place.placeRe : ""),
                    x = (window.place ? window.place.placeConfig : "", window.place ? !!m && m.src_name : ""),
                    P = "cater" === x,
                    R = e.origin_id && e.origin_id.overview_guid ? e.origin_id.overview_guid : "",
                    M = e.catId,
                    B = "",
                    O = "",
                    E = "",
                    N = this,
                    G = e.pano || 0,
                    A = e.indoor_pano || 0,
                    U = ("undefined" == typeof e.pano_index ? -1 : e.pano_index, e.wd || "", e.street_id || "");
                S.length > 0 && S[0].pics && (S = m.pic_info[0].pics);
                var j = i.cityCode || v.cityCode;
                if (!a) return null;
                var F = o(m);
                this.hasDetailPage = k ? !(!m || !k.test(x)) : "";
                var L = a;
                _ == l.POI_TYPE_BUSSTOP ? L += "-公交车站" : _ == l.POI_TYPE_SUBSTOP && (L += "-地铁站"), B = L, L.replace(/[\u0100-\uffff]/g, "##").length > 30 && (L = L.substring(0, 14) + "..."), L = baidu.encodeHTML(L);
                var D = 0;
                if (m && m.detail_info) {
                    var W = m.detail_info;
                    W.premium2 && baidu.isArray(W.premium2) && W.premium2.length && (D = 1)
                }
                var Y = "<p class='iw_poi_title " + (P ? "cater_title" : "") + "' title='" + a + "'>";
                if (Y += "<span class='susIconSetFlag'></span>", P || f && _ !== l.POI_TYPE_BUSSTOP && _ !== l.POI_TYPE_BUSLINE && _ !== l.POI_TYPE_SUBSTOP && _ !== l.POI_TYPE_SUBLINE || !i.hideDetail && (_ === l.POI_TYPE_BUSLINE || _ === l.POI_TYPE_SUBLINE)) {
                    var q = P ? 20 : 25,
                        H = P ? 9 : 11;
                    L.replace(/[\u0100-\uffff]/g, "##").length > q && (L = L.substring(0, H) + "...");
                    var $ = "";
                    if (k && m && ("biaozhu_data" == m.src_name || k.test(x))) {
                        var J = "详情",
                            z = m.detail_info,
                            V = z && (z.pc_bookable || z.di_review_keyword || z.groupon_num || z.premium_flag);
                        if (Y += "cater" == m.src_name ? "<a  href='javascript:void(0)' class='title' onclick='addStat(\"poiinfowin.poi.title\");place.showDetail(\"" + h + '", ' + _ + ", " + j + ', "' + m.src_name + '","Page","Iw");return false;\'>' + L + "</a>" : "<a  href='javascript:void(0)' class='title' onclick='place.showDetail(\"" + h + '", ' + _ + ", " + j + ', "' + m.src_name + '","Page","Iw");return false;\'>' + L + "</a>", k.test(x)) {
                            var X = (x.toUpperCase() + "_", "");
                            "hospital" == x && e.business_id && (X = e.business_id), "cater" == x ? V && (Y += '<a class="iw_poi_detail" href="javascript:void(0)" onclick="place.showDetail(\'' + h + "', " + _ + ", " + j + ", '" + m.src_name + "','Page','Iw'" + (X ? ",false,'" + X + "'" : "") + ");addStat('poiinfowin.poi.detail');return false;\">" + J + "&raquo;</a>") : Y += '<a class="iw_poi_detail" href="javascript:void(0)" onclick="place.showDetail(\'' + h + "', " + _ + ", " + j + ", '" + m.src_name + "','Page','Iw'" + (X ? ",false,'" + X + "'" : "") + ');return false;">' + J + "&raquo;</a>"
                        } else Y += '<a class="iw_poi_detail" href="javascript:void(0)" onclick="place.showDetail(\'' + h + "', " + _ + ", " + j + ", '" + m.src_name + "','Page','Iw');" + $ + 'return false;">' + J + "&raquo;</a>"
                    } else Y += "<a href='javascript:void(0)' class='title' onclick='place.showDetail(\"" + h + '", ' + _ + ", " + j + ");return false;'>" + L + "</a>", Y += '<a class="iw_poi_detail" href="javascript:void(0)" onclick="place.showDetail(\'' + h + "', " + _ + ", " + j + ");" + $ + 'return false;">详情&raquo;</a>'
                } else i.smp && (Y += "<span class='iw_icon_" + i.smp + "'></span>"), Y += '<span class="title">' + L + "</span>";
                Y += "</p>";
                var K = [],
                    Q = "";
                if ((y || e.iwPoiDisplay) && (Q = 'style="display:none;"'), P) K.push("<div class='cater_poi_conTop'" + Q + ">"), K.push(place.caterPopInner.contentHtml(e, j)), K.push("</div>");
                else {
                    if (K.push("<div class='iw_poi_conTop'" + Q + ">"), G) {
                        var Z = i && i.isFromMPC ? U : h;
                        if (A) {
                            var ei = A.match(/sid=([\d\w]*)/);
                            ei = ei ? ei[1] : Z, K.push("<div class='panoInfoBox_hasInAndOut'>");
                            var ii = b.PANO_URL + "/pr/?qt=poiprv&uid=" + Z + "&width=107&height=101&quality=80&fovx=50",
                                ai = b.PANO_3DIMAGE_URL + "/?qt=pr3d&panoid=" + ei + "&width=212&height=101&quality=80&fovx=180";
                            K.push("<div class='indoor_pano_box' title='" + a + "内部环境'><img class='pano_thumnail_img' width=212 height=101 border='0' alt='" + a + "内部环境' src='" + ai + "' id='pano_" + h + "'/>"), K.push("<div class='panoInfoBoxTitleBg'></div><a href='javascript:void(0)' class='panoInfoBoxTitleContent'>内部环境&gt;&gt;</a></div>"), K.push("<div class='pano_box' title='" + a + "街道全景'><img class='pano_thumnail_img' width=107 height=101 border='0' alt='" + a + "街道全景' src='" + ii + "' id='indoor_pano" + h + "'/>"), K.push("<div class='panoInfoBoxTitleBg'></div><a href='javascript:void(0)' class='panoInfoBoxTitleContent' >街道全景&gt;&gt;</a></div>"), K.push("</div>")
                        } else {
                            K.push("<div class='panoInfoBox' title='" + a + "街道全景' title='查看全景' >");
                            var ii = b.PANO_URL + "/pr/?qt=poiprv&uid=" + Z + "&width=323&height=101&quality=80&fovx=250";
                            K.push("<img class='pano_thumnail_img' width=323 height=101 border='0' alt='" + a + "街道全景' src='" + ii + "' id='pano_" + h + "'/>"), K.push("<div class='panoInfoBoxTitleBg'></div><a href='javascript:void(0)' class='panoInfoBoxTitleContent' >街道全景&gt;&gt;</a>"), K.push("</div>")
                        }
                    }
                    if (!G && A) {
                        var ei = A.match(/sid=([\d\w]*)/);
                        ei = ei ? ei[1] : Z;
                        var ai = b.PANO_URL + "/?qt=pr3d&panoid=" + ei + "&width=212&height=101&quality=80&fovx=250";
                        K.push("<div class='panoInfoBox' title='" + a + "内部环境' title='查看内景' >"), K.push("<img class='pano_thumnail_img' width=323 height=101 border='0' alt='" + a + "内部环境' src='" + ai + "' id='pano_" + h + "'/>"), K.push("<div class='panoInfoBoxTitleBg'></div><a href='javascript:void(0)' class='panoInfoBoxTitleContent' >内部环境&gt;&gt;</a>"), K.push("</div>")
                    }
                    if (K.push(s(e)), F && m.pic && m.pic.length > 0 && m.pic[0] && K.push("<div style='float:right;width:70px;height:70px;overflow:hidden;display:inline' title='" + a + "'><img border='0' alt='" + a + "' src='" + m.pic[0] + "'/></div>"), F && m.src_name && ("biaozhu_data" == m.src_name && "1" == m.yw_type && S.length > 0 && S[0].minurl || k && k.test(m.src_name) && m.detail_info && m.detail_info.image)) {
                        var ti = "",
                            ni = "",
                            oi = 106,
                            si = 104,
                            ri = 71,
                            di = 69,
                            li = "",
                            ci = "",
                            pi = "ISHOP_INFO_IMG",
                            ui = "";
                        if (this.createSearchInfoWnd.iwImgLoading = 1, ti = a, oi = 106, si = 104, ri = 71, di = 69, li = " style='border:#bdbdbd solid 1px'", ni = m.detail_info.image, pi = m.src_name, ui = "Page_Pic", ci = ";text-align:center", /sina|soufun/i.test(ni) && (ni += "?"), !G && !A) {
                            if (K.push("090300" == e.catId ? "<div style='float:right;width:" + oi + "px;height:" + ri + "px;display:none" + ci + "' title='" + ti + "'>" : "<div style='float:right;width:" + oi + "px;height:" + ri + "px;display:inline" + ci + "' title='" + ti + "'>"), k && k.test(m.src_name)) {
                                {
                                    x.toUpperCase() + "_"
                                }
                                K.push("<a href='javascript:void(0)' onclick='place.showDetail(\"" + h + '", ' + _ + ", " + j + ', "' + pi + '", "' + ui + '","Iw");return false;\'\'>')
                            } else K.push("<a href='javascript:void(0)' onclick='place.showDetail(\"" + h + '", ' + _ + ", " + j + ', "' + pi + '", "' + ui + '","Iw");return false;\'\'>');
                            var hi = "//webmap0.bdimg.com/client/services/thumbnails?width=" + si + "&height=" + di + "&align=center,center&src=" + encodeURIComponent(ni);
                            K.push("<img tid='iw_poi_img' width='" + si + "' height='" + di + "' border='0'" + li + " alt='" + ti + "' src='" + hi + "' id='detail_" + h + "'/>"), K.push("</a>"), K.push("</div>")
                        }
                        6 == T.browser.ie && (this.createSearchInfoWnd.iwImgLoadingSum = 0, this.createSearchInfoWnd.iwImgLoadingTimer && clearInterval(this.createSearchInfoWnd.iwImgLoadingTimer), this.createSearchInfoWnd.iwImgLoadingTimer = setInterval(function() {
                            N.createSearchInfoWnd.iwImgLoadingSum >= 100 && (clearInterval(N.createSearchInfoWnd.iwImgLoadingTimer), N.createSearchInfoWnd.iwImgLoadingSum = 0), N.createSearchInfoWnd.iwImgLoading && T.G("detail_" + h) && (T.G("detail_" + h).src = ni, N.createSearchInfoWnd.iwImgLoadingSum++)
                        }, 100))
                    }
                    var _i = 25;
                    if (F && m && m.title_link ? K.push("<div class='iw_poi_content iw_poi_content_search' style='width:220px'>") : F && m && ("biaozhu_data" == m.src_name && S.length > 0 || k && k.test(m.src_name) && m.detail_info && m.detail_info.image && "090300" == !e.catId) ? K.push("<div class='iw_poi_content iw_poi_content_search' style='width:214px;'>") : (K.push("<div class='iw_poi_content iw_poi_content_search'>"), _i = 35), r)
                        if (_ == l.POI_TYPE_BUSSTOP || _ == l.POI_TYPE_SUBSTOP) {
                            if (K.push("<p>车次："), p) {
                                for (var fi = [], mi = 0, wi = p.length; wi - 1 > mi; mi++)
                                    if (!baidu.array.contains(fi, p[mi].addr)) {
                                        var vi = "s&wd=" + p[mi].addr + "&c=" + v.cityCode,
                                            gi = encodeURIComponent(vi.replace(/&b=\((-?\d+)(\.\d+),(-?\d+)(\.\d+);(-?\d+)(\.\d+),(-?\d+)(\.\d+)\)/gi, "")),
                                            bi = "?newmap=1&shareurl=1&s=" + gi;
                                        K.push('<a class="detail blueA" tid="poiDetail_' + mi + '" target="_blank" href="' + bi + '" >' + p[mi].addr + "; </a>"), fi.push(p[mi].addr)
                                    }
                                if (!baidu.array.contains(fi, p[mi].addr)) {
                                    var vi = "s&wd=" + p[wi - 1].addr + "&c=" + v.cityCode,
                                        gi = encodeURIComponent(vi.replace(/&b=\((-?\d+)(\.\d+),(-?\d+)(\.\d+);(-?\d+)(\.\d+),(-?\d+)(\.\d+)\)/gi, "")),
                                        bi = "?newmap=1&shareurl=1&s=" + gi;
                                    K.push('<a class="detail blueA" tid="poiDetail_' + wi + '" href="' + bi + '" >' + p[wi - 1].addr + "</a>")
                                }
                            } else r && K.push(r);
                            K.push("</p>"), O = (_ == l.POI_TYPE_BUSSTOP ? "途经公交：" : "途经地铁：") + r
                        } else K.push('<table cellspacing="0" class="table_addr_tel"><tr tid="iw_poi_addr"><th>地址：&nbsp;</th><td>'), K.push(r + "&nbsp;</td></tr>"), O = r, u && (K.push('<tr tid="iw_poi_tel"><th>电话：&nbsp;</th><td>' + u + "</td></tr>"), E = u), K.push("</table>");
                    else u && (K.push('<table cellspacing="0" class="table_addr_tel">'), r && K.push('<tr tid="iw_poi_addr"><th>地址：&nbsp;</th><td>' + r + "</td></tr>"), K.push('<tr tid="iw_poi_tel"><th>电话：&nbsp;</th><td>' + u + "</td></tr>"), E = u, K.push("</table>"));
                    if (d && K.push("<p>" + d + "</p>"), window.place && m && k.test(m.src_name) && (K.push(t({
                            ext: m,
                            uid: h,
                            poiType: _,
                            cityCode: j,
                            catId: M
                        })), u && (u = u.replace("、", "<br />"))), F && m && m.title_link) {
                        var Si = ["<p style='margin-top:2px'>"];
                        if (m.title_link)
                            for (var mi = 0, wi = m.title_link.length; wi > mi; mi++) Si.push("<a class='ns_link' href='" + m.title_link[mi].link + "' target='_blank' >" + m.title_link[mi].title + "</a>"), mi < m.title_link.length - 1 && Si.push("&nbsp;&nbsp;");
                        K.push(Si.join("")), K.push("</p>")
                    }
                    K.push("</div>"), g && K.push("<p>" + g + "</p>"), window.place && (m && m.detail_info && k.test(m.src_name) && K.push(n({
                        ext: m,
                        uid: h,
                        poiType: _,
                        cityCode: j,
                        categoryId: M
                    })), m && window.place && k.test(m.src_name) && K.push(window.place.generateAsyncBookPrice({
                        ext: m,
                        uid: h,
                        poiType: _,
                        cityCode: j
                    })), window.place && m && m.detail_info && m.detail_info.book_info && "undefined" != typeof m.detail_info.movie_film_count && K.push(window.place.generateAsyncBookByMovie({
                        uid: h,
                        poiType: _,
                        category: m.src_name,
                        cityCode: j
                    }))), K.push("<div class='iw_btn_con suspendContainer'></div>"), K.push("<div class='iw_btn_con'>"), "undefined" != typeof e.ext_type && 1 & e.ext_type && K.push('<span class="inr_iw" onmouseover="this.className=\'inr_iw_on\'" onmouseout="this.className=\'inr_iw\'" onmousedown="this.className=\'inr_iw_down\'" onmouseup="this.className=\'inr_iw_on\'"  title="查看室内地图"></span>'), K.push("</div>"), K.push("</div>")
                }
                if (y || h || i.smp) {
                    var Ti = e.iwPoiDisplay ? 'style="display:none;"' : "";
                    if (y ? (K.push('<div id="userSignContent" ' + Ti + ">" + baidu.encodeHTML(I) + "</div>"), K.push('<div id="userSignCtrl" class="userShowCtrl" >')) : K.push('<div id="userSignCtrl" class="userShowCtrl" data-nosign="true" >'), K.push('<div class="ctrl">'), e.jiucuofr) {
                        e.jiucuofr
                    } else;
                    y && !C && K.push('<span class="delete"><b class="sign_del" title="删除此点"></b></span>');
                    var yi = "";
                    if (c._USERSHARE || !y) {
                        var Ci = "",
                            Ii = "",
                            ki = "shareBtn_u sharex";
                        y || (Ci = "onmouseover=\"T.ac(this,'span_focus')\" onmouseout=\"T.rc(this,'span_focus')\"", Ii = "分享", ki = "shareBtn sharex"); {
                            i.x + " " + i.y
                        }
                        yi = '<span class="' + ki + '" ' + Ci + ' title="将此点在图区上的位置分享给好友"><b></b>' + Ii + "</span>", c._USERSHARE && y && K.push(yi)
                    }
                    P && G && K.push('<span class="pano-box"><a class="panoBtn" href="javascript:;" title="全景"><b class="pano" title="全景" style="cursor:pointer;" onclick="addStat(\'poiinfowin.poi.pano\');"></b></a></span>');
                    var xi, Pi = "";
                    if (c._USERFAV) {
                        var Ri = a.replace(/\"/g, "&quot;"),
                            Mi = [];
                        r ? Mi.push(_ == l.POI_TYPE_BUSSTOP || _ == l.POI_TYPE_SUBSTOP ? "车次:" + r + "<br/>" : "地址:" + r + "<br/>") : I && Mi.push(I), u && Mi.push("电话:" + u);
                        var Bi = Mi.join("").replace(/\"/g, "&quot;"),
                            Oi = parseFloat(i.x) + "|" + parseFloat(i.y),
                            Ei = {
                                point: Oi,
                                uid: h,
                                cityCode: j,
                                title: Ri,
                                content: Bi,
                                panoGuid: R
                            },
                            Ni = /'/g;
                        Ni.test(r) && (r = r.replace(Ni, " "), Bi = Bi.replace(Ni, " ")), y ? (xi = {
                            userSign: y,
                            isfav: C,
                            json: Ei,
                            uid: h
                        }, K.push('<span class="fav" id="JiwFav" data-title="' + Ri + '" data-cont="' + Bi + '" title="加入收藏夹"><b></b></span>')) : (xi = {
                            uid: h
                        }, K.push('<span class="fav" id="JiwFav" data-title="' + Ri + '" data-cont="' + Bi + '" uid="' + h + '" title="加入收藏夹" onclick="addStat(\'poiinfowin.poi.fav\');"><b></b></span>'))
                    }!y && h && K.push("<span class='send_telf'><b  title=\"免费发送到手机\"></b></span>"), !y && h && K.push('<span><a class="sms_jiucuo"  href="https://ugc.map.baidu.com/ifix/poiproblem/poiproblempcpage?business_trigger=11&poi_uid=' + h + '" target="_blank"><b class="jiucuo" title="纠错" style="cursor:pointer;"></b></a></span>'), y || (K.push("<span id='iw_tool_icon' class='box' onmouseover=\"this.className='box box_on';T.g('iw_tool_box').style.top=''\"><b></b>"), K.push('<div class="iw_tool_box" id="iw_tool_box" style="top:-2000px">'), Pi = '<span id="JiwFav" class="point"  data-title=\'' + Ri + "' data-cont='" + Bi + '\' onmouseover="T.ac(this,\'span_focus\')" onmouseout="T.rc(this,\'span_focus\')" title="将此点的位置标记在地图上"><b></b>标记</span>', K.push(Pi), i.smp || (K.push(yi), K.push('<span class="sicon08 carIcon" onmouseover="T.ac(this,\'span_focus\')" onmouseout="T.rc(this,\'span_focus\')"  title="发至汽车"><b></b>发至汽车</span>')), K.push("</div></span>")), K.push("</div>"), K.push('<div class="share" id="iw_share_con" style="display:none">'), K.push("</div>"), K.push("</div>")
                }
                K.push(this.addBottomTabs(i, P, h, y)), K.push("<div id='userSignEdit' style='display:none;'></div>");
                var Gi = [0, -26];
                i.forBusLine && (Gi[1] = -5), i.isMenu && (Gi[1] = -30);
                var Ai = this.createInfWindow(Y, K.join(""));
                return xi && (Ai.favObj = xi), Ai._config.collisions = [
                    [65, 245],
                    [233, 39],
                    [10, 10],
                    [10, 10]
                ], Ai._ext = {
                    uid: h,
                    pt: new BMap.Point(i.x, i.y),
                    name: a,
                    c: j,
                    poiType: _,
                    geoloc: i.geoloc,
                    placesrcname: x
                }, Ai._transUid = w, window.place && (window.place.iw = Ai), Ai
            },
            createAdInfWindow: function(e, i, a) {
                this.opts = a || {}, e = '<div class="damoce-bubble-title">' + e + "</div>", i = '<div class="damoce-bubble-content">' + i + "</div>", a.hideFrom = !0, a.hideNear = !0;
                var t = C.createInfWindow(e, i + this.addBottomTabs(a));
                return t._config.collisions = [
                    [65, 245],
                    [233, 39],
                    [10, 10],
                    [10, 10]
                ], t._ext = {
                    pt: new BMap.Point(a.x, a.y),
                    name: a.name,
                    c: a.sCityCode
                }, window.place && (window.place.iw = t), t
            },
            addBottomTabs: function(e, i, a, t) {
                e = e || {};
                var n = "/wolfman/static/common/images/transparent.gif",
                    o = e.tabIndex,
                    s = ["", "", ""],
                    r = ["none", "none", "none"],
                    d = [];
                if (void 0 !== o && r[o] ? (s[o] = "hover", r[o] = "block") : (s[1] = "hover", r[1] = "block"), d.push('<div class="iw_poi_inter" id="iw_poi_inter">'), d.push('<ul class="nav_tab ' + (i ? "cater_tab" : "") + '">'), !e.hideTo) {
                    var l = e.hideFrom && e.hideNear ? "right-border" : "";
                    d.push('<li id="nav_tab0" data-tab="0" class="second blueA ' + s[1] + " " + l + '" ><em class="to-icon"></em>到这去</li>')
                }
                if (!e.hideFrom) {
                    var l = e.hideNear ? "right-border" : "";
                    d.push('<li id="nav_tab1" data-tab="1" class="first blueA ' + s[2] + " " + l + '" ><em class="from-icon"></em>从这出发</li>')
                }
                e.hideNear || d.push('<li id="nav_tab2"  data-tab="2"  class="third blueA ' + s[0] + '" ><img  class="search-nearby" src="' + n + '"></em>在附近找</li>'), d.push("</ul>"), e.hideTo || (d.push('<div id="iw_tab0" class="nav_tab_content" style="display:' + r[1] + '">'), d.push('<form id="iw_s_frm">'), d.push('<div style="white-space:nowrap;"><span id="iw_ssnSpan" class="iw_txt_wrap"><input id="iw_ssn" type="text" size="22" maxlength="100" autocomplete="off" placeholder="请输入起点"/></span>'), d.push('<input id="iw_ssb_btn" type="submit" value="公交" class="iw_bt" onmouseover="this.className=\'iw_bt_over\'" onmouseout="this.className=\'iw_bt\'" onmousedown="this.className=\'iw_bt_down\'" onmouseup="this.className=\'iw_bt_over\'" />'), d.push('<input id="iw_ssd_btn" type="button" class="iw_bt" value="驾车" onmouseover="this.className=\'iw_bt_over\'" onmouseout="this.className=\'iw_bt\'" onmousedown="this.className=\'iw_bt_down\'" onmouseup="this.className=\'iw_bt_over\'" /></div>'), d.push("</form></div>")), e.hideFrom || (d.push('<div id="iw_tab1" class="nav_tab_content" style="display:' + r[2] + '">'), d.push('<form id="iw_e_frm">'), d.push('<div style="white-space:nowrap;"><span id="iw_esnSpan" class="iw_txt_wrap"><input id="iw_esn" type="text" size="22" maxlength="100" autocomplete="off" placeholder="请输入终点"/></span>'), d.push('<input id="iw_esb_btn" type="submit" value="公交" class="iw_bt" onmouseover="this.className=\'iw_bt_over\'" onmouseout="this.className=\'iw_bt\'" onmousedown="this.className=\'iw_bt_down\'" onmouseup="this.className=\'iw_bt_over\'"/>'), d.push('<input id="iw_esd_btn" type="button" value="驾车" class="iw_bt" onmouseover="this.className=\'iw_bt_over\'" onmouseout="this.className=\'iw_bt\'" onmousedown="this.className=\'iw_bt_down\'" onmouseup="this.className=\'iw_bt_over\'" /></div>'), d.push("</form></div>")), e.hideNear || (d.push('<div id="iw_tab2" class="nav_tab_content" style="white-space:nowrap;display:' + r[0] + '">'), d.push('<div class="iw_cate_form">'), d.push('<form  class="info_form" >'), d.push('<input id="rangekw" type="text" size="19" maxLength="100" autocomplete="off" placeholder="搜索周边信息"/> '), d.push('<input id="iw_ns_btn" tid="iwNSBtn" type="submit" value="搜索" class="iw_bt" onmouseover="this.className=\'iw_bt_over\'" onmouseout="this.className=\'iw_bt\'" onmousedown="this.className=\'iw_bt_down\'" onmouseup="this.className=\'iw_bt_over\'" />'), d.push("</form></div>")), d.push('<div class="iw_cate_list">');
                var c = ["酒店", "餐馆", "银行", "医院", "公交站"],
                    p = e.isFromMPC ? 1 : 0,
                    u = e.cityCode || v.cityCode;
                if (a)
                    for (var h = 0, _ = c.length; _ > h; h++) {
                        var f = this.generateSingleLink(c[h], a, "", u, 0 === h, e.x + ", " + e.y, p);
                        d.push(f)
                    } else
                        for (var h = 0, _ = c.length; _ > h; h++) {
                            var f = this.generateSingleLinkForRange(c[h], e.x + "," + e.y, "", u, 0 === h, null, e.statCode || 0, p, t);
                            d.push(f)
                        }
                return d.push("</div></div>"), d.push("</div>"), d.join("")
            },
            createInfWindow: function(e, i) {
                this.opts = this.opts || {};
                var a = this,
                    t = 345,
                    n = new BMap.InfoWindow(i, {
                        title: e,
                        height: 0,
                        width: t,
                        margin: g.infowinMargin
                    });
                return n.addEventListener("open", function() {
                    var e = n.overlay.getLabel();
                    e && e._indoor && e.hide(), map.infoWindow.closeButton && !map.infoWindow.closeButton._statBinded && (map.infoWindow.closeButton._statBinded = !0), a.bindInfoEvents(this)
                }), n.addEventListener("close", function() {
                    var e = n.overlay.getLabel();
                    e && e._indoor && e.show()
                }), n
            },
            bindInfoEvents: function() {
                var e = this,
                    i = this.content || {},
                    a = this.opts || {},
                    t = (i.title, i.addr),
                    n = (i.desc, i.tel && i.tel.replace(/(,|;)/gi, ", "), i.uid || ""),
                    o = i.poiType || l.POI_TYPE_NORMAL,
                    s = (i.hasDetail, i.ext || {}),
                    r = (i.transUid, i.fav || 0),
                    d = (i.content, i.bizType, a.tabIndex, a.cityCode || v.cityCode),
                    u = "",
                    h = "",
                    f = "",
                    w = a.x + " " + a.y,
                    g = parseFloat(a.x) + "|" + parseFloat(a.y),
                    b = i.userSign || 0,
                    S = i.origin_id && i.origin_id.overview_guid ? i.origin_id.overview_guid : "",
                    C = i.pano || 0,
                    I = i.indoor_pano || 0,
                    k = "undefined" == typeof i.pano_index ? -1 : i.pano_index,
                    x = i.wd || "",
                    P = i.street_id || "",
                    R = s.detail_info && s.detail_info.tag,
                    M = "ktv" === R ? "ktv" : s.src_name;
                T(".BMap_bubble_content").delegate(".head-img img", "click", function() {
                    addStat("poiinfowin.headimg." + M)
                }).delegate(".panoInfoBox", "click", function() {
                    addStat("poiinfowin.pano." + M)
                }).delegate("[data-room-id]", "click", function() {
                    addStat("poiinfowin.book." + M)
                }).delegate(".async-book-link", "click", function() {
                    addStat("poiinfowin.morebook." + M)
                }).delegate("[tid=iw_poi_detail] a", "click", function() {
                    var e = T(this).text();
                    "百度旅游" === e ? addStat("poiinfowin.baidutravel." + M) : "去哪儿" === e ? addStat("poiinfowin.qunatravel." + M) : "同程旅游" === e ? addStat("poiinfowin.tongchengtravel." + M) : "大众点评" === e && addStat("poiinfowin.dazhongtravel." + M)
                }).delegate(".hotel-order-new", "click", function() {
                    addStat("poiinfowin.hotelorder." + M)
                }).delegate(".groupon", "click", function() {
                    addStat("poiinfowin.groupon." + M)
                }).delegate(".movie-info-newest", "click", function() {
                    addStat("poiinfowin.movienew." + M)
                }).delegate(".movieOrderBtn", "click", function() {
                    addStat("poiinfowin.moviebook." + M)
                }), (C || !C && I) && (baidu("#userSignCtrl .panoBtn").on("click", function(e) {
                    var i = a.isFromMPC ? P : n;
                    m.showPano({
                        research: !0,
                        panoType: !C && I ? "inter" : "street",
                        searchParam: {
                            uid: i,
                            index: k,
                            addr: t,
                            from: "infownd|poi",
                            wd: x
                        }
                    }), addStat(STAT_CODE.STAT_STREETVIEW, {
                        from: "infownd",
                        catalog: "poi",
                        uid: i
                    }), e.preventDefault()
                }), baidu(".iw_poi_conTop .panoInfoBox").on("click", function(e) {
                    var i = "street";
                    addStat(STAT_CODE.STAT_PANORAMA, {
                        catalog: "poi",
                        from: "infownd",
                        item: i
                    });
                    var t = a.isFromMPC ? P : n;
                    !C && I && (i = "inter", t = n), m.showPano({
                        research: !0,
                        panoType: i,
                        searchParam: {
                            uid: t,
                            index: k,
                            from: "infownd|poi",
                            wd: x
                        }
                    }), e.preventDefault(), s && window.place.placeHookPano(s, "iw")
                }), baidu(".iw_poi_conTop .pano_box").on("click", function(e) {
                    var i = "street";
                    addStat(STAT_CODE.STAT_PANORAMA, {
                        catalog: "poi",
                        from: "infownd",
                        item: i
                    });
                    var t = a.isFromMPC ? P : n;
                    !C && I && (i = "inter", t = n), m.showPano({
                        research: !0,
                        panoType: i,
                        searchParam: {
                            uid: t,
                            index: k,
                            from: "infownd|poi",
                            wd: x
                        }
                    }), e.preventDefault(), s && window.place.placeHookPano(s, "iw")
                }), baidu(".iw_poi_conTop .indoor_pano_box").on("click", function(e) {
                    addStat(STAT_CODE.STAT_PANORAMA, {
                        catalog: "poi",
                        from: "infownd",
                        item: "inter"
                    });
                    var i = a.isFromMPC ? P : n;
                    m.showPano({
                        research: !0,
                        panoType: "inter",
                        searchParam: {
                            uid: i,
                            index: k,
                            from: "infownd|poi",
                            wd: x
                        }
                    }), e.preventDefault(), s && window.place.placeHookPano(s, "iw")
                }), baidu(".iw_poi_conTop  .pano_thumnail_img").on("error", function() {
                    Pano.PanoEntranceUtil && Pano.PanoEntranceUtil.thumbnailNotFound(this, 323, 101)
                })), baidu(".userShowCtrl").on("mouseout", function(i) {
                    var a = baidu(this).data("nosign");
                    a && e.iwMenuMouseOut(this, i)
                }), baidu(".userShowCtrl").on("mousemove", function() {
                    var e = baidu(this).data("nosign");
                    e && (y({
                        x: event.clientX,
                        y: event.clientY
                    }, T.g("iw_tool_icon"), T.g("iw_tool_box"), !1, event.timeStamp || (new Date).getTime(), function() {
                        T.g("iw_tool_icon").className = "box", T.g("iw_tool_box").style.top = "-2000px"
                    }) || (T.g("iw_tool_icon").className = "box", T.g("iw_tool_box").style.top = "-2000px"))
                }), b && !r && (baidu(".userShowCtrl .sign_edit").on("click", function() {
                    MapSignInst.editInfoWnd({
                        type: "button"
                    })
                }), baidu(".userShowCtrl .sign_del").on("click", function() {
                    MapSignInst.deletePoint()
                })), baidu(".userShowCtrl .sharex").on("click", function() {
                    addStat("poiinfowin.share.bubbleshare", "click"), c.goShare({
                        uid: n,
                        cityCode: d,
                        title: u,
                        addr: h,
                        tel: f,
                        point: w
                    })
                }), baidu(".userShowCtrl .fav").on("click", function() {
                    addStat(STAT_CODE.STAT_FAV_IW_BTN);
                    var t = T(this),
                        o = t.offset(),
                        s = t.data("cont"),
                        r = t.data("title");
                    if (t.hasClass("has_fav")) {
                        if (i.sid) p.removeFav(i.sid);
                        else if (n) p.removeFav(n, "uid");
                        else {
                            var d = {
                                    name: e.content && e.content.title,
                                    addr: e.content && (e.content.addr || e.content.content),
                                    pointStr: e.opts.x + "," + e.opts.y
                                },
                                l = p.getSidByData(d);
                            l && p.removeFav(l)
                        }(b || a.smp) && (c = T.g("JiwFav"), c.className = "fav", c.title = "收藏")
                    } else {
                        if (b || a.smp) {
                            p.addFav(2, {
                                name: r,
                                content: s,
                                x: a.x,
                                y: a.y
                            });
                            var c = T.g("JiwFav");
                            c.className = "has_fav", c.title = "取消收藏"
                        } else p.addFav(1, {
                            uid: n,
                            name: r,
                            x: a.x,
                            y: a.y
                        });
                        listener.trigger("searchInfoWindow.fav", "click", {
                            pos: o
                        }), addStat("newfav.poi.addfrombubble", "click", {})
                    }
                }), baidu(".iw_tool_box .point").on("click", function() {
                    addStat("poiinfowin.toolbar.mark");
                    var e = baidu(this).data("cont"),
                        i = baidu(this).data("title");
                    c("searchPoiSign", {
                        point: g,
                        uid: n,
                        cityCode: d,
                        title: i,
                        content: e,
                        panoGuid: S
                    })
                }), baidu("span.send_telf").on("click", function(e) {
                    addStat("poiinfowin.toolbar.poibubbletomb"), addStat(STAT_CODE.STAT_SHOUJI_SEND, {
                        ct: "iw"
                    }), _.ready(this, n, o, d, "iw", this.hasDetailPage), e.preventDefault()
                }), baidu("a.sms_jiucuo").on("click", function() {
                    i.jiucuofr || "";
                    addStat("poiinfowin.revision.revisionbtn")
                }), baidu("span.carIcon").on("click", function(i) {
                    addStat("poiinfowin.toolbar.poibubbletocar"), _.ready(this, n, o, d, "iw", null, {
                        name: e.content.title,
                        addr: e.content.addr
                    }), i.preventDefault()
                }), baidu("ul.nav_tab").delegate("li", "click", function() {
                    var i = e.opts.isFromMPC ? 1 : 0,
                        a = parseInt(baidu(this).data("tab")),
                        t = i ? "rangekw" : "";
                    e.switchInfoWndTab(a, t, !1, !1, !0)
                }), baidu(".iw_cate_form .info_form").on("submit", function(t) {
                    window.addStat("search.nearby.sn_btn", "click");
                    var o = "rangekw",
                        s = null,
                        r = a.cityCode || v.cityCode,
                        d = null,
                        l = a.x,
                        c = a.y,
                        p = a.isFromMPC ? !0 : !1,
                        u = p ? 1 : 0,
                        h = i.userSign;
                    n ? e.roundSearchByInput(o, n, s, r, d, l, c, p) : e.rangeSearchByInput(o, l, c, null, r, null, a.statCode || 0, u, h), t.preventDefault()
                }), baidu("div.iw_cate_list").delegate("a", "click", function(i) {
                    var t = (Boolean(baidu(this).data("fst")), ""),
                        o = a.cityCode || v.cityCode,
                        s = a.isFromMPC ? 1 : 0,
                        r = r ? r : 0,
                        d = a.statCode || 0;
                    n ? e.roundSearchByLink(this, n, t, o, 0, a.x, a.y, s) : e.rangeSearchByLink(this, a.x, a.y, t, o, null, d, s, r), i.preventDefault()
                })
            },
            goCorrect: function() {},
            openSearchInfoWndPOI: function(e, i, a) {
                if (window.GRControll) {
                    var t = window.GRControll.ifChangeMap();
                    0 != t.f && window.GRControll.setGRequestFlg(2e3)
                }
                this.openSearchInfoWnd(e, i, a)
            },
            openSearchInfoWnd: function(i, a, t) {
                if (!window.isPrint) {
                    var n = this,
                        o = i._ext || {};
                    if (o && o.uid) {
                        var s = map.getBounds(),
                            r = Math.min(s.minX, s.maxX),
                            l = Math.max(s.minX, s.maxX),
                            c = Math.min(s.minY, s.maxY),
                            u = Math.max(s.minY, s.maxY),
                            h = "(" + r + "," + c + ";" + l + "," + u + ")",
                            _ = (window.currentComponent && window.currentComponent._className, window.currentComponent && window.currentComponent.curKw || ""),
                            f = {
                                uid: o.uid,
                                wd: _,
                                b: h
                            };
                        o.placesrcname && (f.place = 1, f.category = o.placesrcname), addStat(STAT_CODE.STAT_USER_BEHAVIOUR_MINMING, f)
                    }
                    if (!t) var t = {};
                    if (i) {
                        var m = 0;
                        if (o && o.detail_info) {
                            var w = o.detail_info;
                            w.premium2 && "[object Array]" == Object.prototype.toString.call(w.premium2) && w.premium2.length && (m = 1)
                        }
                        i.addEventListener("open", function() {
                            var e = this.favObj;
                            ! function() {
                                if (e) {
                                    var i = {
                                        name: n.content && n.content.title,
                                        addr: n.content && (n.content.addr || n.content.content),
                                        pointStr: n.opts.x + "," + n.opts.y
                                    };
                                    if (1 === e.isfav || p.getModelByUid(e.uid) || p.getSidByData(i)) {
                                        var a = T.g("JiwFav");
                                        a.className = "has_fav", a.title = "取消收藏"
                                    }
                                    n.removeFavHandler = function(i, t) {
                                        for (var n = 0; n < t.length; n++)
                                            if (t[n].uid === e.uid) {
                                                a = T.g("JiwFav"), a.className = "fav", a.title = "收藏";
                                                break
                                            }
                                    }, listener.on("fav.poi.model", "remove", n.removeFavHandler), n.addFavHandler = function(i, t) {
                                        for (var n = 0; n < t.length; n++)
                                            if (t[n].uid === e.uid) {
                                                a = T.g("JiwFav"), a.className = "has_fav", a.title = "取消收藏";
                                                break
                                            }
                                    }, listener.on("fav.poi.model", "add", n.addFavHandler), n.renameHandler = function(i, a) {
                                        if (a.uid === e.uid) {
                                            var t = a.name;
                                            t.replace(/[\u0100-\uffff]/g, "##").length > 20 && (t = t.substring(0, 9) + "..."), T(".iw_poi_title .title").text(t)
                                        }
                                    }, listener.on("fav.poi.model", "rename", n.renameHandler)
                                }
                            }();
                            var a = "gr" == t.from || "poisearch" == t.from || "searchinview" == t.from;
                            n.rangeSearchCenterMarker && a && d.getOverlayPoint(n.rangeSearchCenterMarker) != d.getOverlayPoint(i) && n.switchInfoWndTab(0, "iw_ssn"), n.iwExt = o, n.iwOpts = t, T.on(T.G("iw_s_frm"), "submit", function(e) {
                                window.addStat("search.goinghere.bus_bt", "click"), n.iwNavSubmit(e)
                            }), T.on(T.G("iw_e_frm"), "submit", function(e) {
                                window.addStat("search.fromhere.bus_bt", "click"), n.iwNavSubmit(e)
                            }), T.on(T.G("iw_ssd_btn"), "click", function(e) {
                                window.addStat("search.goinghere.driver_bt", "click"), n.iwNavSubmit(e)
                            }), T.on(T.G("iw_esd_btn"), "click", function(e) {
                                window.addStat("search.fromhere.driver_bt", "click"), n.iwNavSubmit(e)
                            }), i.removeEventListener("open", arguments.callee)
                        }), i.addEventListener("close", function() {
                            i.iw_sugg_0 && (i.iw_sugg_0.disposeSug(), i.iw_sugg_0 = null), i.iw_sugg_1 && (i.iw_sugg_1.disposeSug(), i.iw_sugg_1 = null), i.removeEventListener("close", arguments.callee), listener.off("fav.poi.model", "add", n.addFavHandler), listener.off("fav.poi.model", "remove", n.removeFavHandler), listener.off("fav.poi.model", "rename", n.renameHandler), addStat("poiinfowin.toolbar.close")
                        }), t && t.notMove && i.disableAutoPan(), t && t.pano && t.panoPoint ? e.async("pano:widget/PanoEntranceUtil/PanoEntranceUtil.js", function(e) {
                            e.addPanoEntranceInInfoWindow(i, t.panoPoint, function(e) {
                                e && e.length > 0 && (i = e[0], a && a.openInfoWindow(i, t))
                            })
                        }) : a ? a.openInfoWindow(i, t) : map.openInfoWindow(i, t)
                    }
                }
            },
            switchInfoWndTab: function(e, i, a, t, n) {
                var o = [T.G("nav_tab0"), T.G("nav_tab1"), T.G("nav_tab2")],
                    s = [T.G("iw_tab0"), T.G("iw_tab1"), T.G("iw_tab2")];
                if (!o[e] || !o[e].className.match(/hover/) || a) {
                    if (T.ac(o[e], "hover"), n) switch (e) {
                        case 0:
                            addStat("poiinfowin.tabexchange.goinghere");
                            break;
                        case 1:
                            addStat("poiinfowin.tabexchange.fromhere");
                            break;
                        case 2:
                            addStat("poiinfowin.tabexchange.searchnb")
                    }
                    s[e] && (s[e].style.display = "block");
                    for (var r = 0, d = o.length; d > r; r++) r != e && (T.rc(o[r], "hover"), s[r].style.display = "none");
                    if (i && T.G(i)) try {
                        T.G(i).focus()
                    } catch (l) {
                        setTimeout(function() {
                            try {
                                T.G(i).focus()
                            } catch (e) {}
                        }, 100)
                    }
                }
            },
            generateSingleLink: function(e, i, a, t, n, o, s) {
                return n ? "<a href='javascript:void(0)' tid='iwNSLink' data-fst='" + n + "'  class='first'>" + e + "</a>" : "<a href='javascript:void(0)' data-fst='" + n + "' >" + e + "</a>"
            },
            generateSingleLinkForRange: function(e, i, a, t, n, o, s, r, d) {
                d = d ? d : 0;
                return n ? "<a href='javascript:void(0)' class='first' >" + e + "</a>" : "<a href='javascript:void(0)' >" + e + "</a>"
            },
            roundSearchByLink: function(e, i, a, t, n, o, s, r) {
                var d = r ? 1 : 0;
                if ("a" == e.nodeName.toLowerCase()) {
                    var l = e.innerHTML;
                    if (l) {
                        var c = n || 0;
                        switch (this.roundSearchByValue(l, i, a, t, c, o, s, d), e.innerHTML) {
                            case "银行":
                                addStat("poiinfowin.nbsearch.bank");
                                break;
                            case "酒店":
                                addStat("poiinfowin.nbsearch.hotel");
                                break;
                            case "医院":
                                addStat("poiinfowin.nbsearch.hospital");
                                break;
                            case "餐馆":
                                addStat("poiinfowin.nbsearch.restaurant");
                                break;
                            case "公交站":
                                addStat("poiinfowin.nbsearch.busstation");
                                break;
                            default:
                                addStat("poiinfowin.nbsearch.userinput")
                        }
                    }
                }
            },
            roundSearchByInput: function(e, i, a, t, n, o, s, r) {
                var l = r ? 1 : 0;
                if (T.G(e)) {
                    if (!T.G(e).value) return T.G(e).focus(), !1;
                    var c = n || 1;
                    this.roundSearchByValue(d.filtQuery(T.G(e).value), i, a, t, c, o, s, l), addStat("poiinfowin.rangesearch.userinput")
                }
            },
            roundSearchByValue: function(e, i, a, t, n, o, s, r, d, l) {
                var c = 1e3;
                if (e) {
                    if (null !== r) var p = 1e3;
                    else var p = window.GRControll ? window.GRControll.GRCircleRadius : c;
                    a && T.G(a) && (p = T.G(a).value);
                    var u = {
                        r: p,
                        c: t,
                        wd: encodeURIComponent(e),
                        nbtp: n,
                        nb_x: o,
                        nb_y: s
                    };
                    if (r) u.spotclick = 1;
                    else
                        for (var h in d) d.hasOwnProperty(h) && (u[h] = encodeURIComponent(d[h]));
                    u.reserveReturnCard = l, this.roundSearch(i, u)
                }
            },
            roundSearch: function(e, i) {
                var a = "",
                    i = i || {};
                i = statParamInterceptor(i), i.query && (i.query = encodeURIComponent(i.query));
                for (var t in i) "undefined" != typeof i[t] && (a = a + "&" + t + "=" + i[t]);
                var n = "nb" + a + "&uid=" + e,
                    o = 16;
                if (window.GRControll && (window.GRControll.GRCircleRadius = i.r, window.GRControll.isGRCircleShow = !0, window.GRControll.setGRequestFlg(1500), window.GRControll.GRCircleRadius > 1500 && (o = 15), window.GRControll.GRCircleRadius > 2500 && (o = 14)), map.centerAndZoom(new BMap.Point(i.nb_x, i.nb_y), o, {
                        noAnimation: !0
                    }), n.indexOf("b=") < 0) {
                    var s = map.getBounds({
                            margins: [0, 0, 0, g.leftMargin]
                        }),
                        d = Math.min(s.minX, s.maxX),
                        l = Math.max(s.minX, s.maxX),
                        c = Math.min(s.minY, s.maxY),
                        p = Math.max(s.minY, s.maxY);
                    n += "&b=(" + d + "," + c + ";" + l + "," + p + ")"
                }
                var u = window.devicePixelRatio && window.devicePixelRatio > 1 ? 2 : 1,
                    h = "B_NORMAL_MAP" === map.getMapType() ? "pl" : "sl";
                if (n += '&biz_forward={"scaler":' + u + ',"styles":"' + h + '"}', n.indexOf("l=") < 0) {
                    var s = map.getBounds();
                    n += "&l=" + Math.floor(map.getZoom())
                }
                window.GRControll && (window.GRControll.GRCircleRadius && (n += "&gr_radius=" + window.GRControll.GRCircleRadius), window.GRControll.openedMarker = null), w.active = !1, r.go(n + "&from=webmap", {
                    cinfo: {
                        oc: i.c,
                        isnbSearch: !0
                    },
                    reserveReturnCard: i.reserveReturnCard,
                    staticExpand: i.reserveReturnCard
                })
            },
            rangeSearchByInput: function(e, i, a, t, n, o, s, r, l) {
                var c = r ? 1 : 0;
                if (T.G(e))
                    if (T.G(e).value) {
                        var p = o || 1;
                        addStat("poiinfowin.rangesearch.userinput"), this.rangeSearchByValue(d.filtQuery(T.G(e).value), i, a, t, n, p, s, c, null, l)
                    } else T.G(e).focus()
            },
            rangeSearchByLink: function(e, i, a, t, n, o, s, r, d) {
                var l = r ? 1 : 0;
                if ("a" == e.nodeName.toLowerCase()) {
                    var c = e.innerHTML;
                    if (c) {
                        var p = o || 0;
                        switch (this.rangeSearchByValue(c, i, a, t, n, p, s, l, null, d), e.innerHTML) {
                            case "银行":
                                addStat("poiinfowin.rangesearch.bank");
                                break;
                            case "酒店":
                                addStat("poiinfowin.rangesearch.hotel");
                                break;
                            case "医院":
                                addStat("poiinfowin.rangesearch.hospital");
                                break;
                            case "餐馆":
                                addStat("poiinfowin.rangesearch.restaurant");
                                break;
                            case "公交站":
                                addStat("poiinfowin.rangesearch.busstation");
                                break;
                            default:
                                addStat("poiinfowin.rangesearch.userinput")
                        }
                    }
                }
            },
            rangeSearchByValue: function(e, i, a, t, n, o, s, r, d, l, c) {
                if (n = v.cityCode, e) {
                    if (null !== r) var p = 1e3;
                    else var p = window.GRControll.GRCircleRadius;
                    t && T.G(t) && (p = T.G(t).value), i = 1 * i, a = 1 * a, p = 1 * p;
                    var u = i - p,
                        h = a - p,
                        _ = i + p,
                        f = a + p,
                        m = "(" + u + "," + h + ";" + _ + "," + f + ")",
                        w = {
                            ar: m,
                            wd: encodeURIComponent(e),
                            c: n,
                            bdtp: o,
                            nb_x: i,
                            nb_y: a,
                            userSign: l
                        };
                    if (r) w.spotclick = 1;
                    else
                        for (var g in d) d.hasOwnProperty(g) && (w[g] = encodeURIComponent(d[g]));
                    w.reserveReturnCard = c, this.rangeSearch(w, new BMap.Point(i, a), p)
                }
            },
            rangeSearch: function(e, i, a) {
                if (e) {
                    var t = "";
                    for (var n in e) "undefined" != typeof e[n] && (t = t + "&" + n + "=" + e[n]);
                    var o = 16;
                    window.GRControll && (window.GRControll.GRCircleRadius = a, window.GRControll.isGRCircleShow = !0, window.GRControll.setGRequestFlg(1500), window.GRControll.GRCircleRadius > 1500 && (o = 15), window.GRControll.GRCircleRadius > 2500 && (o = 14)), map.centerAndZoom(i, o, {
                        noAnimation: !0
                    });
                    var s = "nb" + t;
                    if (s.indexOf("b=") < 0) {
                        var l = map.getBounds({
                            margins: [0, 0, 0, g.leftMargin]
                        });
                        s += "&b=(" + l.minX + "," + l.minY + ";" + l.maxX + "," + l.maxY + ")"
                    }
                    if (s.indexOf("l=") < 0) {
                        var l = map.getBounds();
                        s += "&l=" + Math.floor(map.getZoom())
                    }
                    s.indexOf("pn=") < 0 && (s += "&pn=0");
                    var p = "中心点";
                    if (e.userSign) {
                        for (var u, h = c.mapSign.pointInfo.list, n = 0; u = h[n]; n++)
                            if (u.point == i.lng + "|" + i.lat) {
                                p = u.title;
                                break
                            }
                    } else if (this.rangeSearchCenterMarker) p = this.rangeSearchCenterMarker.getTitle();
                    else
                        for (var u, _ = map.getOverlays(), n = 0; u = _[n]; n++) {
                            var f = d.getOverlayPoint(u);
                            if (f && f.lat == i.lat && f.lng == i.lng) {
                                p = u.getTitle();
                                break
                            }
                        }
                    p || (p = "中心点");
                    var m = this.getCenterPoiNameCbk._uid ? this.getCenterPoiNameCbk._uid : "";
                    m && (s += "&uid=" + m), window.GRControll && window.GRControll.GRCircleRadius && (s += "&gr_radius=" + window.GRControll.GRCircleRadius), w.active = !1, r.go(s + "&r=" + a + "&from=webmap", {
                        cinfo: {
                            searchByContextMenu: !0,
                            centerPoint: i,
                            ctPoiName: p,
                            radius: a,
                            oc: e.c,
                            uid: m,
                            isnbSearch: !0
                        },
                        reserveReturnCard: e.reserveReturnCard,
                        staticExpand: e.reserveReturnCard
                    })
                }
            },
            getCenterPoiNameCbk: function(e) {
                var i = this,
                    a = map.getInfoWindow();
                if (a) {
                    var t = e.content;
                    if (t && t.address) {
                        var n = t.address;
                        t.surround_poi && t.surround_poi[0] && (n = t.surround_poi[0].addr, this.getCenterPoiNameCbk._uid = t.surround_poi[0].uid);
                        var o = a.getPoint && a.getPoint(),
                            s = this.rangeSearchCenterMarker.getPoint && this.rangeSearchCenterMarker.getPoint();
                        if (o == s) {
                            var r = "<p class='iw_poi_title' title='" + n + "'>" + n + "</p>";
                            a.setTitle(r), this.rangeSearchCenterMarker.setTitle(n)
                        }
                    }
                } else window.setTimeout(function() {
                    i.getCenterPoiNameCbk(e)
                }, 50)
            },
            createRangeInfoWnd: function(e) {
                if (e) {
                    var i = this;
                    return u.getGEORevertAddress(e, function(e) {
                        i.getCenterPoiNameCbk(e)
                    }), this.createSearchInfoWnd({
                        title: "未知地点",
                        poiType: 0
                    }, {
                        x: e.lng,
                        y: e.lat,
                        statCode: "",
                        tabIndex: 0
                    })
                }
            },
            exitRangeSearch: function() {
                this.rangeSearchCenterMarker && (this.rangeSearchCenterMarker.remove(), this.rangeSearchCenterMarker = null)
            },
            iwNavSubmit: function(e) {
                e = window.event || e;
                var i = "",
                    a = "",
                    t = "sn",
                    n = "en",
                    o = "sc",
                    s = "ec",
                    c = "",
                    p = "",
                    u = {},
                    _ = {},
                    f = e.target || e.srcElement,
                    m = "",
                    w = this.iwExt,
                    g = this.iwOpts,
                    b = w.c || v.cityCode,
                    S = "",
                    y = "",
                    C = "dep",
                    I = h.getBusExpTime(),
                    k = 5,
                    x = 0;
                switch (f.id) {
                    case "iw_s_pano_frm":
                        i = "iw_pano_ssn", a = "bt", t = "en", n = "sn", o = "ec", s = "sc", c = "bus_end_input", p = "bus_start_input", x = 0, S = "0", m = "end";
                        break;
                    case "iw_ssd_pano_btn":
                        i = "iw_pano_ssn", a = "nav", c = "drive_end_input", p = "drive_start_input", t = "en", n = "sn", o = "ec", s = "sc", x = 0, y = "0", m = "end";
                        break;
                    case "iw_e_pano_frm":
                        i = "iw_pano_esn", a = "bt", c = "bus_start_input", p = "bus_end_input", x = 1, S = 1, m = "start";
                        break;
                    case "iw_esd_pano_btn":
                        i = "iw_pano_esn", a = "nav", c = "drive_start_input", p = "drive_end_input", x = 1, y = 1, m = "start";
                        break;
                    case "iw_s_frm":
                        i = "iw_ssn", a = "bt", t = "en", n = "sn", o = "ec", s = "sc", c = "bus_end_input", p = "bus_start_input", x = 0, S = "0", m = "end";
                        break;
                    case "iw_e_frm":
                        i = "iw_esn", a = "bt", c = "bus_start_input", p = "bus_end_input", x = 1, S = 1, m = "start";
                        break;
                    case "iw_ssd_btn":
                        i = "iw_ssn", a = "nav", c = "drive_end_input", p = "drive_start_input", t = "en", n = "sn", o = "ec", s = "sc", x = 0, y = "0", m = "end";
                        break;
                    case "iw_esd_btn":
                        i = "iw_esn", a = "nav", c = "drive_start_input", p = "drive_end_input", x = 1, y = 1, m = "start"
                }
                var P = T.g(i),
                    R = T.string.trim(P.value);
                if (P && !/\S+/.test(R)) return P.focus(), void(e.returnValue = !1);
                a = "bt" === a ? "bse" : "nse";
                var M = "pcmappg.routesrach.as" + m,
                    B = w.pt.lng + "," + w.pt.lat,
                    O = w.name || "",
                    E = w.uid || "",
                    N = w.wd2 ? 1 : 0,
                    G = w.wd2 || "",
                    A = R,
                    U = w.poiType === l.POI_TYPE_BUSSTOP || w.poiType === l.POI_TYPE_SUBSTOP ? 0 : 1;
                u = {
                    c: b,
                    da_src: M,
                    poiType: w.poiType,
                    ptx: w.pt.lng,
                    pty: w.pt.lat,
                    sug: N,
                    wd: encodeURIComponent(A),
                    wd2: encodeURIComponent(G),
                    name: encodeURIComponent(O),
                    isSingle: "true",
                    nsetp: y,
                    bsetp: S
                }, u = statParamInterceptor(u), u.query && (u.query = encodeURIComponent(u.query)), u[t] = U + "$$" + E + "$$" + B + "$$" + encodeURIComponent(O) + "$$$$$$", "bse" === a && (u.exptype = C, u.exptime = I, u.version = k), _ = {
                    cinfo: {
                        q: a + "&" + d.jsonToQuery(u),
                        c: b,
                        t: x,
                        isSingle: !0,
                        kwn: {
                            name: O,
                            uid: E,
                            pt: w.pt,
                            poiType: w.poiType
                        }
                    }
                };
                g && g.isFromMPC && (u.spotclick = 1), window.GRControll && window.GRControll.isGRequest && (u.gr = 5), 1 == w.geoloc && (u.geoloc = 1), ("nav" == a || "nse" == a) && (u.version = 4, u.mrs = 1, u.route_traffic = 1);
                var j = a + "&" + d.jsonToQuery(u),
                    F = u.poiType;
                r.go(j, _), "start" == m ? "bt" == a || "bse" == a ? (F == l.POI_TYPE_BUSSTOP ? addStat("businfowin.tabexchange.fromhere", null, {
                    da_attr: "bus"
                }) : F == l.POI_TYPE_SUBSTOP && addStat("subinfowin.tabexchange.fromhere", null, {
                    da_attr: "bus"
                }), addStat("poiinfowin.tabexchange.fromhere", null, {
                    da_attr: "bus"
                })) : ("nav" == a || "nse" == a) && (F == l.POI_TYPE_BUSSTOP ? addStat("businfowin.tabexchange.fromhere", null, {
                    da_attr: "driving"
                }) : F == l.POI_TYPE_SUBSTOP && addStat("subinfowin.tabexchange.fromhere", null, {
                    da_attr: "driving"
                }), addStat("poiinfowin.tabexchange.fromhere", null, {
                    da_attr: "driving"
                })) : "end" == m && ("bt" == a || "bse" == a ? (F == l.POI_TYPE_BUSSTOP ? addStat("businfowin.tabexchange.goinghere", null, {
                    da_attr: "bus"
                }) : F == l.POI_TYPE_SUBSTOP && addStat("subinfowin.tabexchange.goinghere", null, {
                    da_attr: "bus"
                }), addStat("poiinfowin.tabexchange.goinghere", null, {
                    da_attr: "bus"
                })) : ("nav" == a || "nse" == a) && (F == l.POI_TYPE_BUSSTOP ? addStat("businfowin.tabexchange.goinghere", null, {
                    da_attr: "driving"
                }) : F == l.POI_TYPE_SUBSTOP && addStat("subinfowin.tabexchange.goinghere", null, {
                    da_attr: "driving"
                }), addStat("poiinfowin.tabexchange.goinghere", null, {
                    da_attr: "driving"
                }))), baidu.event.preventDefault(e)
            },
            iwMenuMouseOut: function(e, i) {
                var a = T.g("iw_tool_box");
                i.relatedTarget = i.relatedTarget || i.toElement, i.target = i.target || i.fromElement, (i.relatedTarget !== e && !baidu.dom.contains(e, i.relatedTarget) || (a === i.target || baidu.dom.contains(a, i.target)) && !baidu.dom.contains(a, i.relatedTarget)) && (T.g("iw_tool_icon").className = "box", T.g("iw_tool_box").style.top = "-2000px")
            }
        };
    a.exports = C
});;
define("common:widget/ui/Pc2Mobile/Pc2Mobile.js", function(e, i, o) {
    var t = (e("common:widget/ui/stat/CodeStat.js"), e("common:widget/ui/util/util.js")),
        d = {
            box: null,
            init: function() {
                var e = this;
                this.box = T.dom.create("div", {
                    id: "pc2mobile_cover"
                }), this._innerFun = function() {
                    e.resize()
                }, T.on(window, "resize", this._innerFun)
            },
            show: function() {
                var e = this.box;
                document.body.appendChild(e), this.resize()
            },
            hide: function() {
                var e = this;
                e.box && document.body.removeChild(e.box), e.clear()
            },
            resize: function() {
                if (this.box) {
                    var e = this.box,
                        i = t.getClientSize();
                    6 == T.browser.ie && (e.style.width = i.width + "px", e.style.height = i.height + "px")
                }
            },
            clear: function() {
                this._innerFun && (T.un(window, "resize", this._innerFun), delete this._innerFun), delete this.box
            }
        },
        n = {
            popup: null,
            component: null,
            open: function(e, i, o) {
                switch (o = o || {}, i) {
                    case "城市推广安卓按钮":
                        addStat("sendtodevice.sendtomb.citylisttodevicebyand");
                        break;
                    case "城市推广ios按钮":
                        addStat("sendtodevice.sendtomb.citylisttodevicebyios");
                        break;
                    case "公交安卓按钮":
                        addStat("sendtodevice.sendtomb.bltodevicebyandroid");
                        break;
                    case "公交ios按钮":
                        addStat("sendtodevice.sendtomb.bltodevicebyios");
                        break;
                    case "POI安卓按钮":
                        addStat("sendtodevice.sendtomb.poitodevicebyandroid");
                        break;
                    case "POIios按钮":
                        addStat("sendtodevice.sendtomb.poitodevicebyios");
                        break;
                    case "短信窗口安卓按钮":
                        addStat("sendtodevice.sendtomb.smstodevicebyandroid");
                        break;
                    case "短信窗口ios按钮":
                        addStat("sendtodevice.sendtomb.smstodevicebyios");
                        break;
                    case "下载页安卓按钮":
                        addStat("sendtodevice.sendtomb.downpagetodevicebyandroid");
                        break;
                    case "下载页ios按钮":
                        addStat("sendtodevice.sendtomb.downpagetodevicebyios");
                        break;
                    case "收藏栏":
                        addStat("sendtodevice.sendtomb.favouritetodevice")
                }
            },
            close: function() {
                this.popup && this.popup.close()
            },
            _open: function() {},
            clear: function(e) {
                if (this._escFun) {
                    var i = T.browser.ie && T.browser.ie <= 7 ? "keypress" : "keydown";
                    T.un(window.document, i, this._escFun), this._escFun = null
                }
                d.hide(), e = null
            },
            addTip: function() {
                var e = this;
                "2" === T.cookie.get("Maptodowntip") || window.isPrint || baidu(document.body).insertHTML("beforeend", '<div id="MaptoDown_tip" class="search-tip"><i title="关闭" class="close">关闭</i><div class="inner"><div class="lk-btn1"><a  href="javascript:void(0)">离线使用，省90%流量！</a></div></div><a  href="javascript:void(0)" class="moIndexTip">立即下载</a></div>'), baidu("#MaptoDown_tip").on("click", function() {
                    e.open("IMG", "检索框tip"), addStat("indexheader.clientdownpage.searchboxtip")
                }), baidu("#MaptoDown_tip i").on("click", function(i) {
                    e.removeTip(), i.stopPropagation(), i.preventDefault()
                })
            },
            removeTip: function() {
                var e = T.g("MaptoDown_tip");
                baidu.dom.remove(e), T.cookie.set("Maptodowntip", "2", {
                    expires: 6048e5
                })
            },
            show: function() {
                T("#MaptoDown_tip").css("display", "block")
            },
            hide: function() {
                T("#MaptoDown_tip").css("display", "none")
            }
        };
    o.exports = window.PcToMobile = n
});;
define("common:widget/ui/BannerAds/BannerAds.js", function(n, a, e) {
    var i = n("common:widget/ui/config/config.js"),
        t = i.mapConfig;
    e.exports = {
        init: function() {
            {
                var n = window._OLR ? baidu.json.parse(_OLR.index) || {} : {},
                    a = n.special && n.special.data,
                    e = a.banner || [];
                a.top || [], a.bottom || []
            }
            e.length > 0 && this.createBanner(e), addStat("indexheader.pcads.pcads", "show")
        },
        createBanner: function(n) {
            var a = n.length,
                e = parseInt(Math.random() * a),
                i = n[e],
                r = "",
                c = "";
            "image" == i.type && T.trim(i.pic_url).length > 0 && (r = '<a  href="#{0}" target="_blank" ><img src="//webmap0.bdimg.com/client/services/thumbnails?width=300&height=110&quality=100&align=center,center&src=#{1}" /></a>', c = encodeURIComponent(t.host(i.pic_url)), r = baidu.string.format(r, [i.href, c]), baidu("#mapBanner").html(r)), this.bind(i)
        },
        bind: function(n) {
            baidu("#mapBanner a").click(function() {
                addStat("indexheader.pcads.pcads", "click", {
                    da_par: n.title
                })
            })
        }
    }
});;
define("common:widget/ui/earthTools/earthTools.js", function(require, exports, module) {
    function EarthTools(t) {
        this._map = t.map || map, this.defaultCursor = this._map.config.defaultCursor, this.draggingCursor = this._map.config.draggingCursor, this.startTop = 70, this.startRight = 10, this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT, this.defaultOffset = new BMap.Size(this.startRight, this.startTop), this._curCount = 0, this._clickCount = 0, this._getCountURL = "http://map.baidu.com/opn/revo/counter/BaiduEarthLikeit/get?counter=click", this._postCountURL = "http://" + location.host + "/opn/revo/counter/BaiduEarthLikeit/incr/?counter=click", this._earthClockIsOpen = !1, this._isClosing = !1
    }
    var util = require("common:widget/ui/util/util.js"),
        EarthClock = require("common:widget/ui/earthTools/earthClock.js"),
        comMgr = require("common:widget/com/componentManager.js"),
        config = require("common:widget/ui/config/config.js"),
        style = ".earth-control-wrap{visibility:'hidden'}.earth-control-wrap span{float:left;width:29px;height:28px;background:url(//webmap0.bdimg.com/wolfman/static/common/images/earth-tools_88dc934.png) no-repeat;cursor:pointer}.earth-control-wrap .toggle-earth{display:none;background-position:0 0}.earth-control-wrap .toggle-earth.active{background-position:0 -28px}.earth-control-wrap .share-it{background-position:-29px 0}.earth-control-wrap .share-it.active{background-position:-29px -28px}.earth-control-wrap .like-it{width:62px;background-position:-58px 0;color:#A0ADBF;line-height:28px;text-indent:25px}.earth-control-wrap .like-it.active{color:#fff;background-position:-58px -28px}.earth-control-wrap #likeItTip{position:absolute;height:25px;line-height:25px;right:20px;top:0;display:none;font-size:18px;color:red;opacity:1;transition:all 2s;-moz-transition:all 2s;-webkit-transition:all 2s;-o-transition:all 2s}.earth-control-wrap .earth-clock-container{position:absolute;visibility:hidden;width:80px;height:80px;left:-80px;top:0}.earth-control-wrap .earth-clock-container canvas{width:80px;height:80px}";
    require.loadCss({
        content: style,
        name: "earthTools"
    }), EarthTools.prototype = new BMap.Control, T.extend(EarthTools.prototype, {
        initialize: function() {
            try {
                var tpl = [function(_template_object) {
                        var _template_fun_array = [],
                            fn = function(__data__) {
                                var _template_varName = "";
                                for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                                eval(_template_varName), _template_fun_array.push('<div class="earth-control-wrap" id="earth_control_wrap">    <span id="earthClockBtn" map-on-click="toggleEarth" class="toggle-earth" title="地球时钟"></span>    <span map-on-click="shareIt" class="share-it" title="分享"></span>    <span map-on-click="likeIt" class="like-it" title="点赞" id=\'likeItNum\'>2000</span>    <div id=\'likeItTip\'>+1</div>    <div class="earth-clock-container"><canvas id="cvsEarthClock"></canvas></div></div>'), _template_varName = null
                            }(_template_object);
                        return fn = null, _template_fun_array.join("")
                    }][0],
                    container = this.container = T(tpl()).appendTo(this._map.getContainer());
                return this.initEnv(), this.bindEvent(), container[0]
            } catch (e) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: e.message || e.description,
                    path: "common:widget/ui/earthTools/earthTools.js",
                    ln: 63
                })
            }
        },
        initEnv: function() {
            var t = this;
            T.jsonp(this._getCountURL, function(o) {
                var e = o.data.click,
                    i = t.formatNum(e);
                T("#likeItNum").text(i), t._curCount = parseInt(e, 10)
            })
        },
        formatNum: function(t) {
            var o = 1e4;
            if (o > t) return t.toString();
            var e = (t / o).toFixed(2).toString();
            return e.lastIndexOf(".00") > -1 && (e = e.replace(".00", "")), e + "万"
        },
        bindEvent: function() {
            var t = this.container,
                o = t.find("span"),
                e = this;
            t.delegate("span", "click", function() {
                var t = T(this),
                    o = e[t.attr("map-on-click")];
                "function" == typeof o && o.call(e, t)
            }).delegate("span", "mouseover", function() {
                o.removeClass("active"), T(this).addClass("active")
            }).delegate("span", "mouseout", function() {
                o.removeClass("active")
            }).delegate("span", "dblclick", function(t) {
                t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0
            }).delegate("div", "dblclick", function(t) {
                t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0
            });
            var i = this._map;
            i.addEventListener("maptypechange", function() {
                e.stopEarth(!0);
                var t = window.temp.linkPop;
                t && t.visible && t.close()
            }), i.addEventListener("onsunlighttime_change", function(t) {
                e._isClosing = !1;
                var o = t.timeForSunLight,
                    i = o.hour,
                    a = o.minute,
                    n = new Date;
                n.setHours(i), n.setMinutes(a);
                var r = n.getTime();
                e._earthClock.showTime(r)
            }), i.addEventListener("onsunlighttime_clear", function() {
                e.stopEarth()
            })
        },
        closeCurQuery: function(t) {
            T("#clearMapArea").css("display", "none"), window.poi2RouteSearchName = void 0, comMgr.go("cur&wd=" + encodeURIComponent("全国"), {
                cinfo: {
                    from: "earth_close"
                }
            }, t)
        },
        isEarthClockOpened: function() {
            return this._earthClockIsOpen
        },
        isEarthClockOpening: function() {
            return this._isClosing
        },
        startEarth: function() {
            map.startSunLightAnimation(), this._earthClockIsOpen = !0, this.setEarthClockBtnStatus()
        },
        stopEarth: function(t) {
            map.stopSunLightAnimation(t), this._earthClockIsOpen = !1, this.setEarthClockBtnStatus()
        },
        setEarthClockBtnStatus: function() {
            var t = T("#earthClockBtn")[0];
            t.style.backgroundPosition = this._earthClockIsOpen ? "0 -56px" : ""
        },
        toggleEarth: function() {
            if (!this._isClosing && !this._map.getLock())
                if (this._earthClockIsOpen) this.stopEarth();
                else {
                    var t = this;
                    t._isClosing = !0, t.closeCurQuery(function() {
                        t.startEarth()
                    }), addStat("earth.clock", "click", {
                        da_e_name: "pcmapearth"
                    })
                }
        },
        setEarthClockPosition: function() {
            var t = this._clockContainer,
                o = t.offsetWidth,
                e = map.getSize(),
                i = e.width,
                a = i / 2 + o / 2 - this.container[0].offsetWidth - this.startRight;
            t.style.left = -a + "px"
        },
        shareIt: function() {
            require.async("common:widget/ui/toolShare/ToolShare.js", function(t) {
                var o = window.temp.linkPop;
                o && o.visible ? o.close() : t.open()
            }), addStat("earth.share", "click", {
                da_e_name: "pcmapearth"
            })
        },
        likeIt: function() {
            if (0 === this._clickCount) {
                var t = this.formatNum(++this._curCount);
                T("#likeItNum").text(t), T.ajax(this._postCountURL, {
                    method: "post",
                    dataType: "json"
                });
                var o = T("#likeItTip")[0];
                o.style.display = "block", setTimeout(function() {
                    o.style.top = "-100px", o.style.opacity = 0
                }, 100)
            }
            this._clickCount++, addStat("earth.like", "click", {
                da_e_name: "pcmapearth"
            })
        }
    }), module.exports = {
        init: function() {
            window.earthTools = new EarthTools(map), map.addControl(window.earthTools)
        }
    }
});;
define("common:widget/ui/earthTools/earthClock.js", function(t, i, e) {
    function h(t) {
        var i = t.getContext("2d");
        this._canvas = t, this._ctx = i, this._ctxWidth = t.width, this._ctxHeight = t.height, this._date = new Date
    }
    var a = "#A0ADBF",
        n = 3,
        o = 25,
        r = "#A0ADBF",
        s = 2,
        c = 30,
        l = "rgba(12,13,44,0.51)",
        d = "#A0ADBF",
        x = "#A0ADBF",
        w = 3,
        _ = 3,
        f = 2,
        g = 2,
        u = "#A0ADBF";
    T.extend(h.prototype, {
        drawLine: function(t, i, e, h, a, n, o, r, s, c) {
            t.save(), t.lineWidth = i, t.strokeStyle = e, t.translate(s, c), t.rotate(r), t.beginPath(), t.moveTo(h, a), t.lineTo(n, o), t.closePath(), t.stroke(), t.restore()
        },
        drawCircle: function(t, i, e, h, a, n, o) {
            t.save(), t.lineWidth = i, t.strokeStyle = h, t.fillStyle = e, t.beginPath(), t.arc(a, n, o, 0, 2 * Math.PI, !1), t.closePath(), t.fill(), t.restore()
        },
        drawHorizontalLine: function(t, i, e, h, a, n, o, r, s) {
            this.drawLine(t, i, h, a, n, a + e, n, o, r, s)
        },
        drawClockPanel: function(t) {
            var i = 3,
                e = l,
                h = d,
                a = this._ctxWidth / 2,
                n = this._ctxHeight / 2,
                o = this._ctxWidth / 2 - 3;
            this.drawCircle(t, i, e, h, a, n, o)
        },
        drawScales: function(t) {
            for (var i = 0; 12 > i; i++) 0 !== i && 3 !== i && 6 !== i && 9 !== i && this.drawHorizontalLine(t, f, g, x, 36 - g, 0, 30 * i * Math.PI / 180, this._ctxWidth / 2, this._ctxHeight / 2);
            for (var i = 0; 4 > i; i++) this.drawHorizontalLine(t, i % 3 === 0 ? 1.2 * w : w, i % 3 === 0 ? 1.2 * _ : _, x, 36 - _, 0, 90 * i * Math.PI / 180, this._ctxWidth / 2, this._ctxHeight / 2)
        },
        drawHourPoint: function(t, i) {
            this.drawHorizontalLine(t, n, o, a, 0, 0, 30 * (i - 3) * Math.PI / 180, this._ctxWidth / 2, this._ctxHeight / 2)
        },
        drawMinPoint: function(t, i) {
            this.drawHorizontalLine(t, s, c, r, 0, 0, 6 * (i - 15) * Math.PI / 180, this._ctxWidth / 2, this._ctxHeight / 2)
        },
        drawText: function(t, i, e) {
            t.fillStyle = u, t.font = "bold 12px arial", i = 1 === i.toString().length ? "0" + i : i, e = 1 === e.toString().length ? "0" + e : e, t.fillText(i + ":" + e, 22, 60)
        },
        showTime: function(t) {
            var i = this._ctx,
                e = this._date;
            i.clearRect(0, 0, this._ctxWidth, this._ctxHeight), this.drawClockPanel(i), this.drawScales(i), e.setTime(t);
            var h = e.getMinutes(),
                a = e.getHours(),
                n = a + h / 60;
            this.drawHourPoint(i, n), this.drawMinPoint(i, h), this.drawText(i, a, h)
        }
    }), e.exports = h
});