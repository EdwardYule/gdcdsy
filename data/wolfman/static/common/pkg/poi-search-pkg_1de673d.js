define("common:widget/com/PoiSearch/PoiSearch.js", function(e, t, s) {
    function i(e) {
        e = e || {}, o.call(this, e), this.json && this.json.content && this.json.content.length > 10 && this.json.result && this.json.result.count < this.json.content.length && this.json.content.splice(-1, 1), window.PoiSearchInst = this, this.isOnlyShowMainRes = !0, this.mainResNo = 0, this.isShowAllRes = !1, this.isShowJumpBack = !1, this.lineNum = 0, this.setInitStatus(), window.mapDebugObjWxp && window.mapDebugObjWxp.debug_info && delete window.mapDebugObjWxp.debug_info, window.clearClarify && clearClarify(), this.searchController = new u(this.json, {
            cinfo: this.cinfo,
            startCity: this.startCity,
            module: this
        });
        var t = this.searchController.getPageRequest({
            nn: 0,
            pn: 0,
            bizCount: 0
        });
        this.setGrRequest(t.req), this.foldTitle = "共找到" + this.json.result.total + "个搜索结果", this.returnTitle = "返回“" + this.json.result.wd + "”的搜索结果";
        var s = "";
        this.json && this.json.result && (s = this.json.result.wd), this.noPushState || f.setFeature("search", s, this.modelQuery, void 0, this.replaceState), f.setTitle(s), this.hasRejectSetViewport = !1
    }
    var o = e("common:widget/com/BaseSearchComponent.js"),
        n = e("common:widget/ui/searchBox/searchBox.js"),
        r = e("common:widget/ui/mapUtil/mapUtil.js"),
        a = e("common:widget/ui/util/util.js"),
        l = e("common:widget/ui/constant/Constant.js"),
        h = e("common:widget/ui/config/config.js"),
        c = h.modelConfig,
        p = (h.mapConfig, e("common:widget/ui/toolShare/ToolShare.js")),
        u = e("common:widget/search/SearchController.js"),
        d = e("common:widget/search/SearchPage.js"),
        m = e("common:widget/ui/searchData/searchData.js"),
        f = e("common:widget/ui/urlManager/urlManager.js");
    T.inherits(i, o, "PoiSearch"), T.extend(i.prototype, {
        render: function() {
            try {
                addStat("searchresult.searchresult.pvuv", "show");
                var e = this.$el = T(this.searchController.render());
                return this.$listview = e.find(".search-item"), e
            } catch (t) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: t.message || t.description,
                    path: "common:widget/com/PoiSearch/PoiSearch.js",
                    ln: 93
                })
            }
        },
        initialize: function() {
            try {
                if (this.json && this.json.biz && map.isCanvasMap()) {
                    map.loadBizData(this.json.biz), this.bizPoints = this.createBizPoints(this.json.biz), map.isBindMapTypeForBiz || (map.isBindMapTypeForBiz = !0, this.bindMapTypeForBiz());
                    var e = this.json.biz.pois,
                        t = [];
                    if (e && e.length > 0)
                        for (var s = 0, i = e.length; i > s; s++) {
                            var o = e[s];
                            o.adver_log && t.push(o.adver_log)
                        }
                    addStat("poisearch.biz.show", "show", {
                        revda_log: t.join(",")
                    })
                }
                this.json.result.debug && window.mapDebugObjWxp && window.mapDebugObjWxp.init(this.json.debug_info), 1 === this.json.result.debug && this.json.debug_info && this.json.debug_info.results && this.json.debug_info.results.length && window.mapDebugObjWxp && window.mapDebugObjWxp.showPoiDebug && this.debugRender(this.json.debug_info.results), this.searchData = this.searchController.searchData, this.points = this.searchController.getPoints(), this.modules = this.searchController.modules, this.bindModules(), this.searchController.initialize(), this.setStatusByRes(), this.setMapView(this.points), this.setSearchBox(!0), this.setBdShare(), this.addSEMStatLog()
            } catch (n) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: n.message || n.description,
                    path: "common:widget/com/PoiSearch/PoiSearch.js",
                    ln: 154
                })
            }
        },
        debugRender: function(e) {
            try {
                for (var t = 0; t < this.$listview.length; t++) $(this.$listview[t]).after(window.mapDebugObjWxp.showPoiDebug(e, t));
                window.mapDebugObjWxp.bindPoiDebug()
            } catch (s) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: s.message || s.description,
                    path: "common:widget/com/PoiSearch/PoiSearch.js",
                    ln: 162
                })
            }
        },
        addSEMStatLog: function() {
            var e = this.json.result;
            if (e && e.lbs_forward && e.lbs_forward.param && e.lbs_forward.param.length > 0) {
                var t = e.lbs_forward.param.length - 1,
                    s = e.lbs_forward.param[t];
                s.ad_page_logs && addStat("poisearch.bizsem.show", "show", {
                    ad_page_logs: s.ad_page_logs
                })
            }
        },
        createBizPoints: function(e) {
            for (var t = [], s = e.pois, i = 0, o = s.length; o > i; i++) {
                var n = s[i],
                    r = new BMap.Point(n.x, n.y);
                t.push(r)
            }
            return t
        },
        bindMapTypeForBiz: function() {
            map.on("maptypechange", function(e) {
                var t = e.mapType;
                if (t !== BMAP_EARTH_MAP) {
                    var s = history.getSearchQuery(); - 1 !== s.indexOf("biz_forward") && (t === BMAP_NORMAL_MAP ? s = s.replace(/"styles":"sl"/, '"styles":"pl"') : t === BMAP_SATELLITE_MAP && (s = s.replace(/"styles":"pl"/, '"styles":"sl"')), m.fetch(s, function(e) {
                        e && e.biz && map.loadBizData(e.biz)
                    }))
                }
            })
        },
        bindModules: function() {
            listener.on("search.module", "defaultgeo", this.setViewport, this), listener.on("search.module", "defaultline", this.setViewport, this), listener.on("search.controller", "more_result", this.setViewport, this), listener.on("search.module", "busline_viewport", this.setViewByLine, this);
            for (var e = 0, t = -1, s = 0; s < this.modules.length; s++) {
                var i = this.modules[s];
                "damoce" !== i.businessType && (-1 === t && (t = s), e++)
            }
            this.json.result.area_profile && 1 == this.json.result.area_profile ? this.modules[0] && this.modules[0].data && this.modules[0].data.profile_geo ? this.modules[0].activate(!0) : listener.trigger("search.module", "defaultgeo", {}) : e >= 1 && this.modules[t].model.ty === l.GEO_TYPE_LINE && this.modules[t].model.poiType !== l.POI_TYPE_BUSLINE && this.modules[t].model.poiType !== l.POI_TYPE_SUBLINE ? this.modules[t].activate(!0) : 0 === this.lineNum && !this.isGRequest
        },
        unload: function(e, t) {
            listener.off("search.module", "defaultgeo", this.setViewport, this), listener.off("search.module", "defaultline", this.setViewport, this), listener.off("search.controller", "more_result", this.setViewport, this), listener.off("search.module", "busline_viewport", this.setViewByLine, this);
            var s = t && t.json && t.json.result && 1 === t.json.result.op_gel;
            !map.isCanvasMap() || s === !0 && this.isGRequest === !0 || (map.unloadBizData(), this.bizPoints = null), this.searchController.unload(t), o.prototype.unload.apply(this)
        },
        setViewport: function(e, t) {
            var s = this.opts.url,
                i = !1;
            if (s.indexOf("provider=pc-aladin") > -1 && (i = !0), this.opts && this.opts.fromUrl && !i && !this.hasRejectSetViewport) return void(this.hasRejectSetViewport = !0);
            if (!this.opts || !this.opts.fromMapMove) {
                var o = this.points;
                t && t.points && (o = o.concat(t.points)), this.points = o, r.setViewport(o)
            }
        },
        setMapView: function(e) {
            var t = this.opts.url,
                s = !1;
            if (t.indexOf("provider=pc-aladin") > -1 && (s = !0), this.opts && this.opts.fromUrl && !s && !this.hasRejectSetViewport) return void(this.hasRejectSetViewport = !0);
            if (!this.opts || !this.opts.fromMapMove) {
                var i = 0;
                if (this.json && this.json.content && this.json.content[0] && (i = this.json.content[0].poi_profile), this.isGRequest || 1 !== this.json.result.area_profile || 1 !== i) {
                    var o = this.json,
                        n = this.isGRequest;
                    if (this.bizPoints && (e = e.concat(this.bizPoints)), !(this.cinfo && this.cinfo._maplevel && this.cinfo._centerPoint))
                        if (n)
                            if (1 === o.result.op_gel && o.result.res_l > 0)
                                if (window.GRControll.setGRequestFlg(1e3), this.cinfo && this.cinfo.isFilter === !0) this.cinfo.noChangeMap !== !0 && this.setViewByAreaFilter(o);
                                else {
                                    var a = parseFloat(o.result.res_x),
                                        l = parseFloat(o.result.res_y),
                                        h = new BMap.Point(a, l);
                                    if (0 == a && 0 == l) return;
                                    var c = map.getMapType();
                                    if (c !== BMAP_EARTH_MAP || c === BMAP_EARTH_MAP && this.cinfo.centerAndZoom) {
                                        var p = o.result.res_l;
                                        if (p = +p, c === BMAP_EARTH_MAP && map.getZoom() !== p) map.centerAndZoom(h, p);
                                        else {
                                            var u = "webgl" !== map._renderType,
                                                d = map.pointToPixel(h, {
                                                    zoom: p,
                                                    heading: 0,
                                                    tilt: 0
                                                });
                                            if (!u) {
                                                var m = map.pointToPixel(map.getCenter(), {
                                                    heading: 0,
                                                    tilt: 0
                                                });
                                                (Math.abs(map.getZoom() - p) >= 1 || Math.abs(m.x - d.x) > 100 || Math.abs(m.y - d.y) > 100) && (u = !0)
                                            }
                                            u && map.centerAndZoom(h, p)
                                        }
                                    }
                                }
                    else 1 == o.result.op_gel && 0 == o.result.res_l && 0 == parseFloat(o.result.res_x) && 0 == parseFloat(o.result.res_y) && (window.GRControll.setGRequestFlg(1e3), r.setViewport(e, 30));
                    else 1 == o.result.area_profile ? r.setViewport(e) : r.setViewport(e, 30)
                }
            }
        },
        setViewByAreaFilter: function(e) {
            var t, s, i, o, n, a, l, h, c = e.result.business_bound,
                p = e.result.res_bound,
                u = e.result.res_bound_acc;
            u && "(0,0;0,0)" !== u ? (t = u.replace(";", ",").substring(1, u.length - 1).split(","), s = new BMap.Point(t[0], t[1]), i = new BMap.Point(t[2], t[3]), r.setViewport([s, i], 20)) : p && "(0,0;0,0)" !== p ? (t = p.replace(";", ",").substring(1, p.length - 1).split(","), s = new BMap.Point(t[0], t[1]), i = new BMap.Point(t[2], t[3]), c && "(0,0;0,0)" !== c && (o = c.replace(";", ",").substring(1, c.length - 1).split(","), n = new BMap.Point(o[0], o[1]), a = new BMap.Point(o[2], o[3]), l = map.getViewport([s, i], 20), h = map.getViewport([n, a], 20), h.zoom - l.zoom >= 2 && l.zoom++, map.setViewport(l)), r.setViewport([s, i], 20)) : c && "(0,0;0,0)" !== c && (o = c.replace(";", ",").substring(1, c.length - 1).split(","), n = new BMap.Point(o[0], o[1]), a = new BMap.Point(o[2], o[3]), r.setViewport([n, a], 20))
        },
        setViewByLine: function(e, t) {
            t.points && r.setViewport(t.points, 10)
        },
        setStatusByRes: function() {
            var e = this.json,
                t = e.result,
                s = t.type,
                i = e.current_city,
                o = 1 & e.result.result_show;
            if (i && !o && 11 == s && 0 == e.result.total && 0 == e.result.spec_dispnum) {
                var n = ["country", "province", "city", "area"],
                    r = null != i.type ? c.level[n[i.type]] : void 0,
                    l = null != i.geo ? l = a.geoToPoint(i.geo) : void 0;
                map.centerAndZoom(l, r)
            }
        },
        setSearchBox: function(e) {
            if (11 != this.json.result.type && 36 != this.json.result.type || this.json.center)
                if (this.searchController.isnbSearch) {
                    var t = this.searchController.curKw;
                    n.setState("nearby", {
                        query: t,
                        cardId: this.cardId,
                        center: {
                            name: this.searchController.ctPoiName,
                            point: this.searchController.centerPt,
                            cid: this.searchController.centerCityCode,
                            uid: this.searchController.ctPoiUid
                        }
                    }, {
                        keepResult: e
                    })
                } else n.setState("sole", {
                    query: this.json.result.wd,
                    cardId: this.cardId
                });
            else n.setState("sole", {
                query: this.json.result.wd,
                cardId: this.cardId
            })
        },
        setInitStatus: function() {
            this.setDetail(), this.getLineNum(), this.setMainRes(), this.setMapJump()
        },
        setDetail: function() {
            var e = this.json;
            6 === e.result.type && T.isObject(e.content) && !T.isArray(e.content) && (e.content = [e.content], e.result.total = 1, e.result.count = 1, e.place_info = {
                d_data_type: ""
            }), this.json = e
        },
        setMainRes: function() {
            this.cinfo && this.cinfo.isClickNextPage && (this.isOnlyShowMainRes = !1)
        },
        setMapJump: function() {
            var e = this.json,
                t = e.result,
                s = this.startCity.code,
                i = e.current_city.code,
                o = t.sug_index || !1;
            this.isShowJumpBack = !(!t.jump_back || !(o || t.sug_index < 0) || s == i)
        },
        getLineNum: function() {
            for (var e = this.json.result, t = this.json.content || [], s = e.count > t.length ? t.length : e.count, i = 0, o = s; o > i; i++)(t[i].poiType == l.POI_TYPE_BUSLINE || t[i].poiType == l.POI_TYPE_SUBLINE) && this.lineNum++
        },
        setBdShare: function() {
            var e = this,
                t = this.searchController;
            p.getMInfo = function() {
                var s = "",
                    i = "more",
                    o = t.curSelIndex,
                    n = e.json;
                if (n && n.content && d.displayCount && 0 != d.displayCount) {
                    var r = n.content[o];
                    if (r) {
                        var a = r.name || "",
                            h = r.addr || "",
                            c = r.tel || "";
                        switch (r.poiType) {
                            case l.POI_TYPE_BUSLINE:
                                i = "busline";
                                break;
                            case l.POI_TYPE_SUBLINE:
                                i = "busline";
                                break;
                            case l.POI_TYPE_BUSSTOP:
                                i = "single", a = p.fixName(a + "-公交车站"), h = h ? "途经公交：" + T.array.unique(h.split(";")).join("; ") : "";
                                break;
                            case l.POI_TYPE_SUBSTOP:
                                i = "single", a = p.fixName(a + "-地铁站"), h = h ? "途经地铁：" + T.array.unique(h.split(";")).join("; ") : "";
                                break;
                            default:
                                i = "single", a = p.fixName(a), c = c.replace(/,/g, ", ")
                        }
                        s = [a, h, c].join(" ")
                    } else s = this.curKw + "的搜索结果 "
                }
                return {
                    text: s,
                    className: e._className,
                    type: i
                }
            }
        },
        onUnfold: function(e) {
            this.searchController.getModules().forEach(function(e) {
                e.cancelSelect()
            }), e && this.setMapView(this.points), this.setSearchBox(!0)
        }
    }), s.exports = i
});;
define("common:widget/search/SearchPage.js", function(t, e, a) {
    var i = t("common:widget/ui/page/Page.js"),
        s = t("common:widget/search/SearchUtil.js"),
        n = {
            MAX_RESULT_COUNT: 760,
            itemsPerPage: 10,
            curSelA: null,
            cmdNo: 45,
            curItemPPage: 0,
            curPage: 0,
            totalCount: 0,
            totalPage: 0,
            buslineTotalPage: 0,
            bizCount: 0,
            pn: 0,
            nn: 0,
            json: null,
            pageCbk: null,
            init: function(t, e) {
                this.json = t.json || {}, this.cinfo = t.cinfo || {}, this.searchData = t.searchData, this.isBusLinePage = t.isBusLinePage, this.page = t.page, this.pageCbk = e, this.setParams(t), this.createPage()
            },
            setBuslinePager: function() {
                {
                    var t = this;
                    new i("result_page_c", function(e) {
                        var a, i = t.sCityCode,
                            s = t.json.result.wd;
                        a = e - 1 === 0 ? 0 : 10 * (e - 1), t.nn = a, searchData.fetch("s&c=" + i + "&wd=" + encodeURIComponent(s) + "&nn=" + a, function(e) {
                            t.dispMoreBusline(e)
                        })
                    }, {
                        pageCount: t.buslineTotalPage,
                        page: t.curPage + 1,
                        update: !0
                    })
                }
            },
            setParams: function(t) {
                var e = this.json.result;
                this.curPage = t.page ? t.page - 1 : e.page_num, this.totalCount = e.total, this.pagingCount = e.total > this.MAX_RESULT_COUNT ? this.MAX_RESULT_COUNT : e.total, this.specialCount = e.spec_dispnum || 0, this.displayCount = this.totalCount + this.specialCount, this.curItemPPage = e.count, this.totalPage = Math.ceil(this.pagingCount / this.itemsPerPage), this.buslineTotalPage = Math.ceil(this.json.result.total_busline_num / this.itemsPerPage), this.bizCount = 0 == this.curPage ? s.getBizCount(this.json.content) : this.cinfo.bizCount || 0
            },
            createPage: function() {
                var t = this;
                if (this.pagingCount > 10) {
                    var e = this.totalPage = this.isBusLinePage ? this.buslineTotalPage : this.totalPage,
                        a = this.page || this.curPage + 1,
                        s = {
                            pageCount: e,
                            page: this.page || this.curPage + 1,
                            update: !1
                        };
                    this.page = new i("poi_page", function(a) {
                        pn = a - 1;
                        var i = t.getNormalNum(a);
                        t.pageCbk && t.pageCbk({
                            pn: pn,
                            nn: i,
                            totalPage: e,
                            bizCount: t.bizCount
                        })
                    }, s)
                }
                e === a && baidu("#poi_page").append('<div class="ugc-tip">没找到想要的结果?你可以在地图上<a href="https://ugc.map.baidu.com/ifix/poiproblem/addpoipcpage?business_trigger=8&city_id=' + window.currentCity.code + "&poi_name=" + encodeURIComponent(this.searchData.wd).replace(/'/g, escape("'")) + '" target="_blank">添加该地点</a></div>')
            },
            getNormalNum: function(t) {
                var e = 0;
                return t > 2 ? e = 10 * (t - 1) - this.specialCount - this.bizCount : t > 1 && (e = 10 * (t - 1) - this.specialCount - this.bizCount), e
            }
        };
    a.exports = n
});;
define("common:widget/search/SearchController.js", function(require, exports, module) {
    function SearchController(e, i) {
        i = i || {}, window.poiResponse = e, this.json = e, this.cinfo = i.cinfo || {}, this.startCity = i.startCity || {}, this.module = i.module || {}, this.setSecurityFilter(this.json.result), this.curKw = "", this.sugKw = "", this.curSelIndex = -1, this.points = [], this.uids = [], this.markers = [], this.modules = [], this.noResult = !1;
        var t = this.json.result,
            n = this.json.content;
        (0 == t.total && n && 0 == n.length || 0 == t.total && !n) && (this.noResult = !0, addStat("searchbox.search.noresult", "show"), this.securityFilter && addStat("searchResult.securityFilter.noresult", "show"), this.json.suggest_query && this.json.suggest_query.length > 0 && addStat("searchResult.haveSuggestion.noresult", "show")), this.totalCount = t.total, this.noResult || this.preDisposeHiddenPoints(), this.searchData = this.generateSearchData(), this.setNbSearchData()
    }
    var constant = require("common:widget/ui/constant/Constant.js"),
        config = require("common:widget/ui/config/config.js"),
        mapConfig = config.mapConfig,
        modelConfig = config.modelConfig,
        comMgr = require("common:widget/com/componentManager.js"),
        util = require("common:widget/ui/util/util.js"),
        indexUtil = require("common:widget/ui/indexUtil/IndexUtil.js"),
        searchData = require("common:widget/ui/searchData/searchData.js"),
        iKnow = require("common:widget/ui/iKnow/iKnow.js"),
        sateCityList = require("common:widget/ui/sateCityList/SateCityList.js"),
        NbSearch = require("common:widget/ui/NbSearch/NbSearch.js"),
        Share = require("common:widget/ui/mapShare/MapShare.js"),
        BaseSearchView = require("common:widget/search/modules/baseSearchModule/inc.js"),
        CaterSearchView = require("common:widget/search/modules/caterSearchModule/inc.js"),
        HouseSearchView = require("common:widget/search/modules/houseSearchModule/inc.js"),
        MovieSearchView = require("common:widget/search/modules/movieSearchModule/inc.js"),
        HotelSearchView = require("common:widget/search/modules/hotelSearchModule/inc.js"),
        ScenerySearchView = require("common:widget/search/modules/scenerySearchModule/inc.js"),
        BusStopSearchView = require("common:widget/search/modules/busStopSearchModule/inc.js"),
        SubStationSearchView = require("common:widget/search/modules/subStationSearchModule/inc.js"),
        BusLineSearchView = require("common:widget/search/modules/busLineSearchModule/inc.js"),
        SubLineSearchView = require("common:widget/search/modules/subLineSearchModule/inc.js"),
        MissingView = require("common:widget/search/modules/missingModule/inc.js"),
        DamoceSearchView = require("common:widget/search/modules/damoceSearchModule/inc.js"),
        SearchFilter = require("common:widget/search/filters/SearchFilter/SearchFilter.js"),
        filterCfg = require("common:widget/search/filters/SearchFilter/FilterConfig.js"),
        placeData = filterCfg.placeData,
        filterStatus = require("common:widget/ui/FilterStatus/FilterStatus.js"),
        searchUtil = require("common:widget/search/SearchUtil.js"),
        searchPage = require("common:widget/search/SearchPage.js"),
        searchParam = require("common:widget/search/SearchUrlParam.js"),
        userMgr = require("common:widget/ui/userMgr/userMgr.js"),
        NOPIC = "//webmap1.bdimg.com/wolfman/static/common/images/nopic_96d29d1.gif",
        DynamicBanner = require("common:widget/com/DynamicBanner/DynamicBanner.js"),
        poiListMgr = require("common:widget/ui/poiListMgr/poiListMgr.js"),
        movieReg = filterCfg.movieReg,
        placeRe = filterCfg.hasFilterReg,
        events = "blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave mousewheel change select submit keydown keypress keyup error contextmenu".split(" "),
        hideBanner = !1,
        pageChangeOption = !1;
    require.loadCss({
        content: '@charset "UTF-8";.map-info a{text-decoration:none}.backWay{display:inline-block;margin-left:96px;color:#6889D7}.placeEntranceBox a{color:#3385ff}.placeEntranceBox a:hover{text-decoration:underline}.poilist{padding:5px 0 0;pointer-events:auto}.poilist a{color:#3385ff}.poilist .hidden{display:none}.street-pano-float-title{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/ui3/search/street_tool_c0371ce.png);width:72px;height:12px;display:inline-block;background-position:2px -117px;padding:7px 17px;color:#333;line-height:12px;z-index:999}.street-pano-float-title:hover{text-decoration:none}.search-item{padding:6px 0}.search-item.damoce-search-item{overflow:hidden}.search-item .alrt{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/iw_bg_c0e0b0a.png);width:18px;height:13px;display:inline-block;background-position:-197px -136px;position:relative;top:1px}.search-item .alrt:hover{text-decoration:none}.search-item .banner-3d{height:30px;line-height:30px;border-radius:3px;text-align:center;font-size:12px;color:#fff;margin:10px 10px 10px 30px;background-color:#2f87ff}.search-item a:hover{text-decoration:none}.search-item .col-l{float:left}.search-item .col-r{float:right;width:75px;margin-right:10px;text-align:right}.search-item .seperate{color:#dcdcdc;margin:0 6px}.search-item .r-row-first{padding:4px 0;height:20px;text-align:right}.search-item .img-wrap{position:relative}.search-item .hasIndoorPano:hover{opacity:.8;filter:alpha(opacity=80)}.search-item .street-pano{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/ui3/search/camera_ff8b5e3.png);width:13px;height:17px;display:inline-block;background-position:0 26px;line-height:17px;float:right}.search-item .street-pano:hover{text-decoration:none}.search-item .pano-360{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/ui3/search/search_6a66a85.png);width:17px;height:14px;display:inline-block;background-position:0 -38px}.search-item .pano-360:hover{text-decoration:none}.search-item .indoor-pano{color:#fff;width:71px;height:16px;line-height:16px;background-color:#000;text-align:center;position:absolute;top:42px;left:4px;opacity:.7;filter:alpha(opacity=70)}.search-item .fav{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/ui3/search/search_6a66a85.png);width:14px;height:12px;display:inline-block;background-position:0 0}.search-item .fav:hover{text-decoration:none}.search-item .fav:hover{background-position:0 -13px}.search-item .fav.has-faved{background-position:0 -26px}.search-item .phone{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/ui3/search/search_6a66a85.png);width:8px;height:13px;display:inline-block;background-position:-14px 0}.search-item .phone:hover{text-decoration:none}.search-item .phone:hover{background-position:-14px -13px}.search-item .share{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/ui3/search/search_6a66a85.png);width:13px;height:12px;display:inline-block;background-position:-22px 0}.search-item .share:hover{text-decoration:none}.search-item .share:hover{background-position:-22px -13px}.search-item .amend{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/ui3/search/search_6a66a85.png);width:13px;height:12px;display:inline-block;background-position:-35px 0}.search-item .amend:hover{text-decoration:none}.search-item .amend:hover{background-position:-35px -13px}.search-item .no-1{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/markers_new2_7621a9c.png);width:18px;height:27px;display:inline-block;margin-left:6px;margin-top:4px;background-position:0 -139px}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){.search-item .no-1{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/markers_new2x_2960fb4.png);width:18px;height:27px;display:inline-block;background-size:300px,auto}.search-item .no-1:hover{text-decoration:none}}.search-item .no-1:hover{text-decoration:none}.search-item .no-2{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/markers_new2_7621a9c.png);width:18px;height:27px;display:inline-block;margin-left:6px;margin-top:4px;background-position:-18px -139px}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){.search-item .no-2{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/markers_new2x_2960fb4.png);width:18px;height:27px;display:inline-block;background-size:300px,auto}.search-item .no-2:hover{text-decoration:none}}.search-item .no-2:hover{text-decoration:none}.search-item .no-3{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/markers_new2_7621a9c.png);width:18px;height:27px;display:inline-block;margin-left:6px;margin-top:4px;background-position:-36px -139px}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){.search-item .no-3{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/markers_new2x_2960fb4.png);width:18px;height:27px;display:inline-block;background-size:300px,auto}.search-item .no-3:hover{text-decoration:none}}.search-item .no-3:hover{text-decoration:none}.search-item .no-4{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/markers_new2_7621a9c.png);width:18px;height:27px;display:inline-block;margin-left:6px;margin-top:4px;background-position:-54px -139px}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){.search-item .no-4{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/markers_new2x_2960fb4.png);width:18px;height:27px;display:inline-block;background-size:300px,auto}.search-item .no-4:hover{text-decoration:none}}.search-item .no-4:hover{text-decoration:none}.search-item .no-5{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/markers_new2_7621a9c.png);width:18px;height:27px;display:inline-block;margin-left:6px;margin-top:4px;background-position:-72px -139px}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){.search-item .no-5{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/markers_new2x_2960fb4.png);width:18px;height:27px;display:inline-block;background-size:300px,auto}.search-item .no-5:hover{text-decoration:none}}.search-item .no-5:hover{text-decoration:none}.search-item .no-6{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/markers_new2_7621a9c.png);width:18px;height:27px;display:inline-block;margin-left:6px;margin-top:4px;background-position:-90px -139px}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){.search-item .no-6{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/markers_new2x_2960fb4.png);width:18px;height:27px;display:inline-block;background-size:300px,auto}.search-item .no-6:hover{text-decoration:none}}.search-item .no-6:hover{text-decoration:none}.search-item .no-7{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/markers_new2_7621a9c.png);width:18px;height:27px;display:inline-block;margin-left:6px;margin-top:4px;background-position:-108px -139px}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){.search-item .no-7{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/markers_new2x_2960fb4.png);width:18px;height:27px;display:inline-block;background-size:300px,auto}.search-item .no-7:hover{text-decoration:none}}.search-item .no-7:hover{text-decoration:none}.search-item .no-8{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/markers_new2_7621a9c.png);width:18px;height:27px;display:inline-block;margin-left:6px;margin-top:4px;background-position:-126px -139px}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){.search-item .no-8{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/markers_new2x_2960fb4.png);width:18px;height:27px;display:inline-block;background-size:300px,auto}.search-item .no-8:hover{text-decoration:none}}.search-item .no-8:hover{text-decoration:none}.search-item .no-9{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/markers_new2_7621a9c.png);width:18px;height:27px;display:inline-block;margin-left:6px;margin-top:4px;background-position:-144px -139px}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){.search-item .no-9{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/markers_new2x_2960fb4.png);width:18px;height:27px;display:inline-block;background-size:300px,auto}.search-item .no-9:hover{text-decoration:none}}.search-item .no-9:hover{text-decoration:none}.search-item .no-10{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/markers_new2_7621a9c.png);width:18px;height:27px;display:inline-block;margin-left:6px;margin-top:4px;background-position:-162px -139px}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){.search-item .no-10{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/markers_new2x_2960fb4.png);width:18px;height:27px;display:inline-block;background-size:300px,auto}.search-item .no-10:hover{text-decoration:none}}.search-item .no-10:hover{text-decoration:none}.search-item .no-11{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/markers_new2_7621a9c.png);width:18px;height:27px;display:inline-block;margin-left:6px;margin-top:4px;background-position:-180px -139px}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){.search-item .no-11{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/markers_new2x_2960fb4.png);width:18px;height:27px;display:inline-block;background-size:300px,auto}.search-item .no-11:hover{text-decoration:none}}.search-item .no-11:hover{text-decoration:none}.search-item .no-12{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/markers_new2_7621a9c.png);width:18px;height:27px;display:inline-block;margin-left:6px;margin-top:4px;background-position:-198px -139px}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){.search-item .no-12{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/markers_new2x_2960fb4.png);width:18px;height:27px;display:inline-block;background-size:300px,auto}.search-item .no-12:hover{text-decoration:none}}.search-item .no-12:hover{text-decoration:none}.search-item.hover{background-color:#f6f6f6}.search-item.hover .no-1{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/markers_new2_7621a9c.png);width:18px;height:27px;display:inline-block;margin-left:6px;margin-top:4px;background-position:0 -166px}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){.search-item.hover .no-1{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/markers_new2x_2960fb4.png);width:18px;height:27px;display:inline-block;background-size:300px,auto}.search-item.hover .no-1:hover{text-decoration:none}}.search-item.hover .no-1:hover{text-decoration:none}.search-item.hover .no-2{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/markers_new2_7621a9c.png);width:18px;height:27px;display:inline-block;margin-left:6px;margin-top:4px;background-position:-18px -166px}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){.search-item.hover .no-2{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/markers_new2x_2960fb4.png);width:18px;height:27px;display:inline-block;background-size:300px,auto}.search-item.hover .no-2:hover{text-decoration:none}}.search-item.hover .no-2:hover{text-decoration:none}.search-item.hover .no-3{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/markers_new2_7621a9c.png);width:18px;height:27px;display:inline-block;margin-left:6px;margin-top:4px;background-position:-36px -166px}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){.search-item.hover .no-3{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/markers_new2x_2960fb4.png);width:18px;height:27px;display:inline-block;background-size:300px,auto}.search-item.hover .no-3:hover{text-decoration:none}}.search-item.hover .no-3:hover{text-decoration:none}.search-item.hover .no-4{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/markers_new2_7621a9c.png);width:18px;height:27px;display:inline-block;margin-left:6px;margin-top:4px;background-position:-54px -166px}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){.search-item.hover .no-4{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/markers_new2x_2960fb4.png);width:18px;height:27px;display:inline-block;background-size:300px,auto}.search-item.hover .no-4:hover{text-decoration:none}}.search-item.hover .no-4:hover{text-decoration:none}.search-item.hover .no-5{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/markers_new2_7621a9c.png);width:18px;height:27px;display:inline-block;margin-left:6px;margin-top:4px;background-position:-72px -166px}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){.search-item.hover .no-5{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/markers_new2x_2960fb4.png);width:18px;height:27px;display:inline-block;background-size:300px,auto}.search-item.hover .no-5:hover{text-decoration:none}}.search-item.hover .no-5:hover{text-decoration:none}.search-item.hover .no-6{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/markers_new2_7621a9c.png);width:18px;height:27px;display:inline-block;margin-left:6px;margin-top:4px;background-position:-90px -166px}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){.search-item.hover .no-6{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/markers_new2x_2960fb4.png);width:18px;height:27px;display:inline-block;background-size:300px,auto}.search-item.hover .no-6:hover{text-decoration:none}}.search-item.hover .no-6:hover{text-decoration:none}.search-item.hover .no-7{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/markers_new2_7621a9c.png);width:18px;height:27px;display:inline-block;margin-left:6px;margin-top:4px;background-position:-108px -166px}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){.search-item.hover .no-7{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/markers_new2x_2960fb4.png);width:18px;height:27px;display:inline-block;background-size:300px,auto}.search-item.hover .no-7:hover{text-decoration:none}}.search-item.hover .no-7:hover{text-decoration:none}.search-item.hover .no-8{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/markers_new2_7621a9c.png);width:18px;height:27px;display:inline-block;margin-left:6px;margin-top:4px;background-position:-126px -166px}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){.search-item.hover .no-8{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/markers_new2x_2960fb4.png);width:18px;height:27px;display:inline-block;background-size:300px,auto}.search-item.hover .no-8:hover{text-decoration:none}}.search-item.hover .no-8:hover{text-decoration:none}.search-item.hover .no-9{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/markers_new2_7621a9c.png);width:18px;height:27px;display:inline-block;margin-left:6px;margin-top:4px;background-position:-144px -166px}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){.search-item.hover .no-9{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/markers_new2x_2960fb4.png);width:18px;height:27px;display:inline-block;background-size:300px,auto}.search-item.hover .no-9:hover{text-decoration:none}}.search-item.hover .no-9:hover{text-decoration:none}.search-item.hover .no-10{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/markers_new2_7621a9c.png);width:18px;height:27px;display:inline-block;margin-left:6px;margin-top:4px;background-position:-162px -166px}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){.search-item.hover .no-10{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/markers_new2x_2960fb4.png);width:18px;height:27px;display:inline-block;background-size:300px,auto}.search-item.hover .no-10:hover{text-decoration:none}}.search-item.hover .no-10:hover{text-decoration:none}.search-item.hover .no-11{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/markers_new2_7621a9c.png);width:18px;height:27px;display:inline-block;margin-left:6px;margin-top:4px;background-position:-180px -166px}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){.search-item.hover .no-11{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/markers_new2x_2960fb4.png);width:18px;height:27px;display:inline-block;background-size:300px,auto}.search-item.hover .no-11:hover{text-decoration:none}}.search-item.hover .no-11:hover{text-decoration:none}.search-item.hover .no-12{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/markers_new2_7621a9c.png);width:18px;height:27px;display:inline-block;margin-left:6px;margin-top:4px;background-position:-198px -166px}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){.search-item.hover .no-12{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/markers_new2x_2960fb4.png);width:18px;height:27px;display:inline-block;background-size:300px,auto}.search-item.hover .no-12:hover{text-decoration:none}}.search-item.hover .no-12:hover{text-decoration:none}.search-item:hover{background-color:#f6f6f6;cursor:pointer}.search-item:hover .hidden{visibility:visible}.search-item:hover .no-1{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/markers_new2_7621a9c.png);width:18px;height:27px;display:inline-block;margin-left:6px;margin-top:4px;background-position:0 -166px}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){.search-item:hover .no-1{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/markers_new2x_2960fb4.png);width:18px;height:27px;display:inline-block;background-size:300px,auto}.search-item:hover .no-1:hover{text-decoration:none}}.search-item:hover .no-1:hover{text-decoration:none}.search-item:hover .no-2{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/markers_new2_7621a9c.png);width:18px;height:27px;display:inline-block;margin-left:6px;margin-top:4px;background-position:-18px -166px}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){.search-item:hover .no-2{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/markers_new2x_2960fb4.png);width:18px;height:27px;display:inline-block;background-size:300px,auto}.search-item:hover .no-2:hover{text-decoration:none}}.search-item:hover .no-2:hover{text-decoration:none}.search-item:hover .no-3{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/markers_new2_7621a9c.png);width:18px;height:27px;display:inline-block;margin-left:6px;margin-top:4px;background-position:-36px -166px}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){.search-item:hover .no-3{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/markers_new2x_2960fb4.png);width:18px;height:27px;display:inline-block;background-size:300px,auto}.search-item:hover .no-3:hover{text-decoration:none}}.search-item:hover .no-3:hover{text-decoration:none}.search-item:hover .no-4{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/markers_new2_7621a9c.png);width:18px;height:27px;display:inline-block;margin-left:6px;margin-top:4px;background-position:-54px -166px}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){.search-item:hover .no-4{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/markers_new2x_2960fb4.png);width:18px;height:27px;display:inline-block;background-size:300px,auto}.search-item:hover .no-4:hover{text-decoration:none}}.search-item:hover .no-4:hover{text-decoration:none}.search-item:hover .no-5{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/markers_new2_7621a9c.png);width:18px;height:27px;display:inline-block;margin-left:6px;margin-top:4px;background-position:-72px -166px}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){.search-item:hover .no-5{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/markers_new2x_2960fb4.png);width:18px;height:27px;display:inline-block;background-size:300px,auto}.search-item:hover .no-5:hover{text-decoration:none}}.search-item:hover .no-5:hover{text-decoration:none}.search-item:hover .no-6{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/markers_new2_7621a9c.png);width:18px;height:27px;display:inline-block;margin-left:6px;margin-top:4px;background-position:-90px -166px}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){.search-item:hover .no-6{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/markers_new2x_2960fb4.png);width:18px;height:27px;display:inline-block;background-size:300px,auto}.search-item:hover .no-6:hover{text-decoration:none}}.search-item:hover .no-6:hover{text-decoration:none}.search-item:hover .no-7{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/markers_new2_7621a9c.png);width:18px;height:27px;display:inline-block;margin-left:6px;margin-top:4px;background-position:-108px -166px}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){.search-item:hover .no-7{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/markers_new2x_2960fb4.png);width:18px;height:27px;display:inline-block;background-size:300px,auto}.search-item:hover .no-7:hover{text-decoration:none}}.search-item:hover .no-7:hover{text-decoration:none}.search-item:hover .no-8{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/markers_new2_7621a9c.png);width:18px;height:27px;display:inline-block;margin-left:6px;margin-top:4px;background-position:-126px -166px}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){.search-item:hover .no-8{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/markers_new2x_2960fb4.png);width:18px;height:27px;display:inline-block;background-size:300px,auto}.search-item:hover .no-8:hover{text-decoration:none}}.search-item:hover .no-8:hover{text-decoration:none}.search-item:hover .no-9{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/markers_new2_7621a9c.png);width:18px;height:27px;display:inline-block;margin-left:6px;margin-top:4px;background-position:-144px -166px}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){.search-item:hover .no-9{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/markers_new2x_2960fb4.png);width:18px;height:27px;display:inline-block;background-size:300px,auto}.search-item:hover .no-9:hover{text-decoration:none}}.search-item:hover .no-9:hover{text-decoration:none}.search-item:hover .no-10{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/markers_new2_7621a9c.png);width:18px;height:27px;display:inline-block;margin-left:6px;margin-top:4px;background-position:-162px -166px}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){.search-item:hover .no-10{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/markers_new2x_2960fb4.png);width:18px;height:27px;display:inline-block;background-size:300px,auto}.search-item:hover .no-10:hover{text-decoration:none}}.search-item:hover .no-10:hover{text-decoration:none}.search-item:hover .no-11{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/markers_new2_7621a9c.png);width:18px;height:27px;display:inline-block;margin-left:6px;margin-top:4px;background-position:-180px -166px}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){.search-item:hover .no-11{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/markers_new2x_2960fb4.png);width:18px;height:27px;display:inline-block;background-size:300px,auto}.search-item:hover .no-11:hover{text-decoration:none}}.search-item:hover .no-11:hover{text-decoration:none}.search-item:hover .no-12{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/markers_new2_7621a9c.png);width:18px;height:27px;display:inline-block;margin-left:6px;margin-top:4px;background-position:-198px -166px}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){.search-item:hover .no-12{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/markers_new2x_2960fb4.png);width:18px;height:27px;display:inline-block;background-size:300px,auto}.search-item:hover .no-12:hover{text-decoration:none}}.search-item:hover .no-12:hover{text-decoration:none}.search-item .hotel-detail-link:hover{text-decoration:underline}.search-item .row,.search-item .select-row,.search-item .content-des{padding:5px 0;line-height:1.2}.search-item .score{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/star_a58455e.png);width:61px;height:11px;display:inline-block;background-position:0 -14px}.search-item .score:hover{text-decoration:none}.search-item .score b{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/star_a58455e.png);width:61px;height:11px;display:inline-block}.search-item .score b:hover{text-decoration:none}.search-item .tuan{display:inline-block;color:#fff;height:20px;line-height:20px;width:20px;background-color:#F8605F;text-align:center;border-radius:50%}.search-item .wai{display:inline-block;color:#fff;height:20px;line-height:20px;width:20px;background-color:#FB9440;text-align:center;border-radius:50%}.search-item .ding{display:inline-block;color:#fff;height:20px;line-height:20px;width:20px;background-color:#46A6F6;text-align:center;border-radius:50%}.search-item .hui{display:inline-block;color:#fff;height:20px;line-height:20px;width:20px;background-color:#FB9440;text-align:center;border-radius:50%}.search-item .movie-info{display:inline-block;color:#fff;height:18px;line-height:18px;width:33px;background-color:#9bcb66;text-align:center;border-radius:1px}.search-item .buy{display:inline-block;color:#fff;height:19px;line-height:19px;width:48px;background-color:#ff9429;text-align:center;border-radius:1px}.search-item .l-row{height:0;overflow:hidden;display:none;padding:8px 0 2px;border-top:1px solid #E5E5E5}.search-item .l-row .icon{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/ui3/tools/goBackIcon_a1556b3.png);width:10px;height:10px;display:inline-block;margin-right:1px;position:relative;top:1px}.search-item .l-row .icon:hover{text-decoration:none}.search-item .l-row .to-icon{background-position:-2px -24px}.search-item .l-row .from-icon{background-position:-2px -13px}.search-item .l-row i{font-style:normal}.search-item .go{line-height:22px;margin-left:11px;color:#666;text-align:center}.search-item .go span{position:relative;background-color:#fdfdfe;display:inline-block;width:67px;border:1px solid #dcdcdc;margin-left:-1px;padding:0 6px}.search-item .go span:hover{border:1px solid #999;z-index:10}.search-item .select-row{color:#666}.search-item .select-row a{margin-bottom:5px;display:inline-block;padding:2px 4px;color:#fff;border-radius:2px;background:#36C}.search-item .hidden{visibility:hidden;display:inline}.search-item .content-des{color:#666}.search-item .selected{background-color:#D6E2F5}.search-item .selected:hover{text-decoration:none}.search-item .addr{overflow:hidden}.search-item .unsuretip{position:relative}.search-item .unsurelogo{display:block;background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/retina/shangjia@2x_5d9ec45.png);width:12px;height:12px;display:inline-block;background-size:12px,12px;background-position:0 0;position:absolute;left:-16px}.search-item .unsurelogo:hover{text-decoration:none}.bus-stop-item .content{color:#6889D7;background-color:#EFF4FF;padding:7px 0 9px 23px;margin-left:-17px;position:relative;border-top:#CBCBCB 1px solid}.bus-stop-item .content .close{font-size:16px;color:#BABABA;position:absolute;top:2px;right:6px}.bus-stop-item .content .close:hover{color:#333;text-decoration:none}.bus-stop-item .content .start_end_title{font-style:normal}.bus-stop-item .content .start_end_time{color:#666;font-style:normal;margin-left:4px}.bus-stop-item .content .price{color:#666}.bus-stop-item .content .back-icon{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/ui3/tools/goBackIcon_a1556b3.png);width:17px;height:10px;display:inline-block;background-position:15px 1px}.bus-stop-item .content .back-icon:hover{text-decoration:none}.bus-sub-line-item{margin-bottom:10px}.bus-sub-line-item a:hover{text-decoration:underline}.bus-sub-line-item .row,.bus-sub-line-item .search-item .select-row,.search-item .bus-sub-line-item .select-row,.bus-sub-line-item .search-item .content-des,.search-item .bus-sub-line-item .content-des{padding:5px 0}.bus-sub-line-item .top{border:1px solid #3385ff;color:#fff;cursor:pointer;overflow:hidden}.bus-sub-line-item .top-title{background-color:#3385ff;line-height:31px;float:left;min-width:75px;margin-right:12px;text-align:center}.bus-sub-line-item .top-line-num{font-size:24px}.bus-sub-line-item .top-line-num.line-num-small{font-size:12px}.bus-sub-line-item .top-line-title{width:75px;height:50px;line-height:20px;text-align:center;padding-top:12px}.bus-sub-line-item .top-line-meta{font-size:12px;background:#0c6eff;border-radius:5px;margin-top:8px;line-height:18px;width:56px;margin:0 auto}.bus-sub-line-item .top-content{overflow:hidden;color:#3385ff;padding-top:15px}.bus-sub-line-item .name{font-weight:700;font-size:14px;margin-bottom:10px}.bus-sub-line-item .arrow{background:url(//webmap1.bdimg.com/wolfman/static/common/images/ui3/transparent_9922ea9.png) no-repeat 0 0;width:15px;height:10px;margin:0 5px}.bus-sub-line-item .describe{margin:0 6px}.bus-sub-line-item .bline-row{line-height:20px}.bus-sub-line-item .content{display:none;padding:0 12px 10px;border:1px solid #e4e6e7;border-top:0}.bus-sub-line-item .content a{color:#36C}.bus-sub-line-item .content .station-list{padding-left:6px}.bus-sub-line-item .content .station-list li{line-height:30px;position:relative}.bus-sub-line-item .content .station-list.sub-list{padding-left:0}.bus-sub-line-item .content .station-list.sub-list li{padding-left:25px;background:url(//webmap0.bdimg.com/wolfman/static/common/images/ui3/sub-bar_d16bc82.png) no-repeat 0 -53px}.bus-sub-line-item .content .station-list.sub-list li:first-child{background-position:0 7px}.bus-sub-line-item .content .station-list.sub-list li:last-child,.bus-sub-line-item .content .station-list.sub-list li.last-child{background-position:0 -113px}.bus-sub-line-item .content .station-list.sub-list .station-transfer{position:absolute;left:0;top:7px;width:16px;height:16px;background:url(//webmap0.bdimg.com/wolfman/static/common/images/ui3/sub-bar_d16bc82.png) no-repeat 0 -168px}.bus-sub-line-item .content .station-list.sub-list .station-seq{position:absolute;left:0;top:7px;width:16px;height:16px;line-height:16px;text-align:center;color:#666;-webkit-transform:scale(0.83);font-size:10px}.bus-sub-line-item .content .station-name{float:left}.bus-sub-line-item .content .subway-label{float:left;padding:0 8px;margin-left:8px;margin-top:5px;line-height:20px}.bus-sub-line-item .content-des{zoom:1;padding:0 12px;line-height:35px;border:1px solid #e4e6e7;border-top:0}.bus-sub-line-item .content-des:after{visibility:hidden;display:block;font-size:0;content:" ";clear:both;height:0;line-height:0}.bus-sub-line-item .unfold{float:left;padding-left:25px;background:url(//webmap1.bdimg.com/wolfman/static/common/images/ui3/bussub_68c7674.png) no-repeat 0 8px;color:#36C}.bus-sub-line-item .fold-wrap{line-height:35px;overflow:hidden}.bus-sub-line-item .fold{float:left;padding-left:25px;background:url(//webmap1.bdimg.com/wolfman/static/common/images/ui3/bussub_68c7674.png) no-repeat 0 -56px}.bus-sub-line-item .fold a{color:#36C}.bus-sub-line-item .street-view-point{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/street_tool_049d1ab.png);width:15px;height:18px;display:inline-block;background-position:0 -259px;float:right;margin:6px 0 0}.bus-sub-line-item .street-view-point:hover{text-decoration:none}.bus-sub-line-item .name-wrap{margin-right:20px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.more-lines{padding:7px 0;text-align:center;background-color:#F8F9FC;border:1px solid #E9E9E9;margin-bottom:6px}.more-lines a{color:#36C}.more-lines:hover{background-color:#EFF5FE}.more-result{padding:7px 0;text-align:center;margin-bottom:6px}.more-result a{color:#36C}#poi_page{margin:5px 0 0}.search-showall{text-align:right;padding:10px}.poi-ads-bottom{padding:10px 5px;position:absolute;bottom:0}.jump_back{margin:8px 0 0;padding:5px 10px;background-color:#e5eeff;line-height:25px;text-align:center}.jump_back b{margin:0 2px}.poi-title{line-height:1.5;background:#E5EEFF;padding:10px;margin-top:10px;word-wrap:break-word;word-break:break-all}.poi-title a{margin-left:4px;color:#3385ff}.poi-title .centerpoi-link{cursor:pointer;color:#3385ff}.sugg_query{padding:5px;margin:10px 10px 0}.sugg_query a,.su_muti_q a,.su_uniq_q a{line-height:25px;text-decoration:none;color:#36c}.sugg_query a:hover,.su_muti_q a:hover{text-decoration:underline}.sugg_query .sugg_return_query{color:#ee0303}.sugg_query .sugg_src_query{font-family:arial;color:#36c}.su_uniq_q{background-color:#e5eeff;padding:8px}.su_muti_q{padding-left:10px;line-height:18px;zoom:1;margin:0}.sugg_query{padding:5px;margin:8px 10px 0}.sugg_q_result,.sugg_q_wd,.jump_black{margin:8px 10px 0;padding:5px 10px;background-color:#e5eeff;line-height:25px}.sugg_q_result a,.jump_black a,.sugg_q a{text-decoration:none;color:#36c;margin-right:10px}.sugg_q_result a:hover,.jump_black a:hover,.sugg_q a:hover{text-decoration:underline}.sugg_q_wd b{color:#ee0303;font-weight:700}.sugg_q{padding:5px 10px;line-height:18px}a.orign_search{margin:0}#txtPanel p.bus-line-info a:hover{text-decoration:underline}.sug_title{padding-left:10px}.poi-query-tip{padding:0 10px}.ugc-tip{margin-top:10px}.pc .children-container .children-accordion .accordion-title{font-family:Arial,Helvetica,"Microsoft YaHei",sans-serif}.children-container{display:none}.children-container .children-accordion .children-accordion-item{width:100%;color:#36C;padding-left:13px;margin-left:-13px;border-top:solid #e1e1e1 1px;-moz-user-select:none;position:relative}.children-container .children-accordion .children-accordion-item .accordion-title{cursor:pointer;width:100%;position:relative;line-height:31px}.children-container .children-accordion .children-accordion-item:hover .accordion-title,.children-container .children-accordion .children-accordion-item.hover .accordion-title{font-weight:700}.children-container .children-accordion .children-accordion-item .accordion-arrow{float:right;width:32px;height:32px;cursor:pointer;background:url(//webmap1.bdimg.com/wolfman/static/common/images/child-arrow_9002af7.gif) no-repeat;position:absolute;right:0;background-position:0 -32px}.children-container .children-accordion .children-accordion-item .accordion-arrow:hover{background:url(//webmap1.bdimg.com/wolfman/static/common/images/child-arrow-hover_decf54b.gif) no-repeat;background-position:0 -32px}.children-container .children-accordion .children-accordion-item .accordion-arrow.up{background-position:0 0}.children-container .children-accordion .children-accordion-item .accordion-arrow.up:hover{background:url(//webmap1.bdimg.com/wolfman/static/common/images/child-arrow-hover_decf54b.gif) no-repeat;background-position:0 0}.children-container .children-tab{}.children-container .children-tab .children-tab-tip{color:#999;margin-bottom:5px}.children-container .children-tab .children-tab-nav{color:#666;width:100%;height:26px;line-height:26px;margin-bottom:5px;border-bottom:solid #e1e1e1 1px}.children-container .children-tab .children-tab-nav li{float:left;padding-right:9px;padding-left:9px;height:25px;line-height:25px;text-align:center;cursor:pointer}.children-container .children-tab .children-tab-nav .active{border-top:solid #e1e1e1 1px;border-left:solid #e1e1e1 1px;border-right:solid #e1e1e1 1px;border-bottom:solid #fff 1px;color:#333;font-weight:700}.children-container .children-tab .children-tab-content{display:none;width:100%;margin-bottom:2px;margin-top:2px}.children-container .children-tab .children-tab-content.active{display:block}.children-container .children-tab .children-tab-content li{line-height:18px;margin-left:10px;padding:2px 0 1px}.children-container .children-tab .children-tab-content li a{color:#496ce0}.search-item:hover .children-container .children-tab .children-tab-nav .active,.search-item.hover .children-container .children-tab .children-tab-nav .active{border-bottom:1px solid #f6f6f6}',
        name: "searchStyle"
    });
    var hasRevertUrl;
    T.inherits(SearchController, T.lang.Class, "SearchController"), T.extend(SearchController.prototype, {
        render: function() {
            try {
                var template = [function(_template_object) {
                        var _template_fun_array = [],
                            fn = function(__data__) {
                                var _template_varName = "";
                                for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                                eval(_template_varName), _template_fun_array.push('<div class="poi-wrapper-box"><div class="poi-wrapper">    <div id="unlogined">    '), securityFilter ? _template_fun_array.push('    <div id="unlog" class="filtered">        <img class="info-login-img" src="', "/wolfman/static/common/images/transparent.gif", '"/>        更多优质结果，请        <a class = \'result-login\' href="javascript:void(0);">            登录        </a>        后查看    </div>    ') : logined || _template_fun_array.push('    <div id="unlog">        <img class="info-login-img" src="', "/wolfman/static/common/images/transparent.gif", '"/>        登录即可一键发送地点到手机        <a class="area-login" href="javascript:void(0);">            登录        </a>    </div>    '), _template_fun_array.push("    </div>    "), jump_back && (_template_fun_array.push('    <p class="jump_back">已切换至<b>', "undefined" == typeof curCity.name ? "" : curCity.name, '</b>，<a class="orign_search"  href="javascript:void(0)">点击查看</a>    '), "全国" === startCity.name || "中国" === startCity.name ? _template_fun_array.push("            <b>其他城市</b>的搜索结果</p>        ") : _template_fun_array.push("            <b>", "undefined" == typeof startCity.name ? "" : startCity.name, "</b>的搜索结果</p>        "), _template_fun_array.push("")), _template_fun_array.push("    "), statSugg && (_template_fun_array.push("        "), supportSate ? (_template_fun_array.push("            "), jump_back || _template_fun_array.push('                <p class="jump_back">您是否要<a href="javascript:void(0)" class="sate-suggest-query">在', "undefined" == typeof curCity.name ? "" : baidu.template._encodeHTML(curCity.name), '找名称中含有"', "undefined" == typeof returnQuery ? "" : baidu.template._encodeHTML(returnQuery), '"的地点？</a></p>            '), _template_fun_array.push("        ")) : _template_fun_array.push('            <p class="jump_back">当前城市不支持卫星图</p>        '), _template_fun_array.push("    ")), _template_fun_array.push('    <div class="poi-filter"></div>    <div class="poi-sug-title"></div>    <div class="poi-suggest"></div>      <div class="poi-query-tip"></div>    <ul class="poilist"></ul>    <div id="poi_page" class="poi-page"></div>    <div class="poi-no-result"></div>    ', "undefined" == typeof place_entrance_wd ? "" : place_entrance_wd, "    "), _template_fun_array.push(adsPositionBottom ? '    <div class="poi-ads-bottom">    ' : '    <div class="poi-ads">    '), _template_fun_array.push('        <div id="user_feedback" class="blueC">百度提醒您：结果有错误？请到<a id="mapComplaintCenter" target="_blank"  href="https://help.baidu.com/newadd?prod_id=4&category=1">百度地图投诉中心</a>反馈。</div>                    </div></div> <div id="leadDownloadCard"></div></div>'), _template_varName = null
                            }(_template_object);
                        return fn = null, _template_fun_array.join("")
                    }][0],
                    templateData = this.getTemplateData();
                this.setPlaceEntrance(this.json.content, templateData), this.$el = T(template(templateData)), this.$list = this.$el.find(".poilist"), this.filterEl = this.$el.find(".poi-filter");
                var content = this.json.content;
                this.isShowBottomPoiList = this.ifShowBottomPoiList();
                var filterBox = this.setFilter(this.json);
                if (this.filterEl.append(filterBox), this.disposeTitle(), this.noResult) return this.setNoResult(), this.$el;
                this.bridge = {}, this.affectRoute(this.json), this.generateViewList(content);
                var isIE = -1 !== navigator.userAgent.indexOf("MSIE") && !window.opera,
                    isIE11 = navigator.userAgent.indexOf("Trident") > -1 && navigator.userAgent.indexOf("rv:11.0") > -1;
                switch (this.ifShowBottomPoiList() && this.modules && this.modules.length > 1 && !isIE && !isIE11 && poiListMgr.setData(this.modules), this.disposeNearByPOI(), content[0].poiType) {
                    case constant.POI_TYPE_NORMAL:
                        break;
                    case constant.POI_TYPE_BUSSTOP:
                        addStat("searchbox.bus.stop", "show"), addStat("searchbox.bussub.all", "show");
                        break;
                    case constant.POI_TYPE_SUBSTOP:
                        addStat("searchbox.sub.stop", "show"), addStat("searchbox.bussub.all", "show");
                        break;
                    case constant.POI_TYPE_BUSLINE:
                        addStat("searchbox.bus.line", "show"), addStat("searchbox.bussub.all", "show");
                        break;
                    case constant.POI_TYPE_SUBLINE:
                        addStat("searchbox.sub.line", "show"), addStat("searchbox.bussub.all", "show")
                }
                return this.afterDisposeHiddenPoints(), this.setMissingModule(), this.$el
            } catch (e) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: e.message || e.description,
                    path: "common:widget/search/SearchController.js",
                    ln: 217
                })
            }
        },
        ifShowBottomPoiList: function() {
            var e = ["cater", "scope", "car_4s"];
            return this.json.place_info && -1 !== e.indexOf(this.json.place_info.d_business_type) ? !0 : this.json.place_info && 0 === this.json.place_info.d_tag_info_list.indexOf("房地产") ? !0 : !1
        },
        setSecurityFilter: function(e) {
            this.securityFilter = !1, e = e || {}, userMgr.loginStatus || e && e.data_security_filt_res && 0 != parseInt(4 & e.data_security_filt_res) && (this.securityFilter = !0)
        },
        addunLoginTip: function(e) {
            e ? addStat("poilistHoneypot.login.pvuv", "show", {}) : addStat("poilistNormal.login.pvuv", "show", {}), baidu("#unlog a").off("click").on("click", function(i) {
                e ? (userMgr.login(void 0, void 0, "poilistHoneypot"), addStat("poilistHoneypot.login.pvuv", "click", {})) : (userMgr.login(void 0, void 0, "poilistNormal"), addStat("poilistNormal.login.pvuv", "click", {})), i.stopPropagation(), i.preventDefault()
            })
        },
        initialize: function() {
            try {
                var e = this;
                if (userMgr.defferd.then(function() {
                        T("#unlogined").hide()
                    }, function() {
                        e.addunLoginTip(e.securityFilter)
                    }), searchUtil.changeMap(modelConfig.cityCode), this.bindEvents(), this.searchFilter && this.bindFilter(), this.isnbSearch && this.addCenterPoint(this.json.center), this.noResult) return;
                this.setPage(), this.revertUrl();
                for (var i = 0; i < this.modules.length; i++) this.modules[i].initializeAfterRender();
                var t = this.getJumpLink();
                DynamicBanner.showDynamicBanner({
                    jumpLink: t,
                    bannerContainer: "#leadDownloadCard",
                    defaultImg: "//webmap1.bdimg.com/wolfman/static/common/images/qrcode-download/searchlist-map-dowload-test_fbab8c2.png",
                    closeClickCB: function() {
                        hideBanner = !0
                    },
                    name: "poiList"
                }), pageChangeOption === !0 && hideBanner === !0 && $("#leadDownloadCard").hide(), pageChangeOption = !1
            } catch (n) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: n.message || n.description,
                    path: "common:widget/search/SearchController.js",
                    ln: 334
                })
            }
        },
        getJumpLink: function() {
            var e = this.wd,
                i = this.sCityCode || "";
            if (!e) return "";
            var t = "baidumap://map/place/search?query=" + encodeURIComponent(e) + "&city_id=" + i + "&src=mapdownload.pcmap.all.searchlist";
            if (this.centerPt && this.radius) {
                var n = BMap.Project.convertMC2LL(this.centerPt),
                    o = n.lat + "," + n.lng;
                t = "baidumap://map/place/nearby?center=" + o + "&radius=" + this.radius + "&query=" + encodeURIComponent(e) + "&src=mapdownload.pcmap.all.searchlist"
            }
            var a = "WEBAPP2008",
                r = "https://map.baidu.com/mapclient-pages/download/?from=pcmap&openapi=" + encodeURIComponent(t) + "&token=" + a;
            return r
        },
        disposeTitle: function() {
            var e, i = this.json,
                t = (this.json.content, this.json.center, this.json.result),
                n = this.cinfo.sg_search || 0;
            this.isnbSearch || !this.isnbSearch && t.requery && (e = ['<div class="poi-title">', '未找到结果，为您提供"<span class="d-red">', t.requery, '</span>"的搜索结果', "</div>"].join("")), e && this.$el.find("#unlogined").after(e), !n && i.suggest_query ? this.setResultSug() : i.psrs && i.psrs.SENum > 0 && !i.suggest_query && i.result && i.result.return_query == i.result.wd && (this.securityFilter || this.setQuerySug())
        },
        setResultSug: function() {
            var e = this.json,
                i = (e.content, e.result),
                t = e.suggest_query,
                n = 1 == i.current_null && !this.totalCount,
                o = [],
                a = [],
                r = "",
                r = e.result.sugg_wd;
            if (r && 1 === t.length) r = e.result.sugg_wd || t[0].query, a.push("<p class='sugg_query su_uniq_q' >已显示“<span class='sugg_return_query' >" + e.result.return_query + '</span>”的搜索结果，仍然搜索：<a  class=\'sugg_pinyin\' map-on-click="suggQuery" data-query="' + r + '" data-src=0 data-force=true >' + r + "</a><br /></p>");
            else {
                n ? (o.push('<p class="no_result_title sug_title">未找到相关地点。</p>'), a.push("<p class='sugg_q su_muti_q'>您是否要找：<br />")) : a.push("<p class='sugg_q_result'>您是否要找：");
                for (var s = 0, c = t.length; c > s; s++) a.push('<a href="javascript:void(0)" map-on-click="suggQuery"  data-query="' + t[s].query + '" data-src=2 data-force=true >'), a.push(t[s].query), a.push("</a>"), s < t.length - 1 && n && a.push("<br />");
                a.push("</p>")
            }
            this.$el.find(".poi-sug-title").html(o.join("")), this.$el.find(".poi-suggest").html(a.join(""))
        },
        setQuerySug: function() {
            {
                var e = this.json;
                e.content
            }
            this.no_result_wd_flag = 1 == e.result.current_null && !this.totalCount;
            for (var i = [], t = [], n = "", o = 0, a = e.psrs.SENum; a > o; o++) t.push(['<a data-query="', e.psrs.SEResult[o], '" data-src="2" map-on-click="suggQuery">', e.psrs.SEResult[o], "</a>"].join(""));
            n = t.join(""), i.push(this.no_result_wd_flag ? ['<div class="poi-title">', "<p>", "未找到相关地点。", "</p>", "<p>", "您是否要找：", n, "</p>", "</div>"].join("") : "<div class='poi-title'>您是否要找：" + n + "</idv>"), this.$el.find(".poi-suggest").html(i.join(""))
        },
        suggQueryClick: function(e) {
            var i = e.directTarget.attr("data-query"),
                t = e.directTarget.attr("data-src") || 0,
                n = e.directTarget.attr("data-force") || !1;
            if (i) {
                {
                    this.curKw ? this.curKw : "", this.sCityName
                }
                comMgr.go("s&from=webmap&stp=0&wd=" + encodeURIComponent(i) + "&c=" + this.sCityCode + "&src=" + t + "&force_query=" + n, {
                    cinfo: {
                        sg_search: 1
                    }
                })
            }
        },
        setNoResult: function() {
            var sugTip = "",
                value = "",
                href = "",
                name = "",
                nearbyName = "未知地点";
            if (this.isnbSearch) {
                var ctr = this.json.center,
                    hasCtrName = ctr && ctr.poi && ctr.poi[0] && ctr.poi[0].name,
                    noResultTmpl = [function(_template_object) {
                        var _template_fun_array = [],
                            fn = function(__data__) {
                                var _template_varName = "";
                                for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                                eval(_template_varName), _template_fun_array.push('<div class="mapinfo_con">    <p>未找到相关地点。</p>    '), _template_fun_array.push(data.isGRequest ? "        <p>您可在上方<strong>更改条件</strong> 再次尝试。</p>    " : "        <p>您可在上方<strong>更改关键词</strong> 再次尝试。</p>    "), _template_fun_array.push("    ", "undefined" == typeof data.sg ? "" : data.sg, '<!--     <div class="nr_suggest">您还可以：        <ul>            <li>看看输入的文字是否有误</li>            <li>在百度网页中查找“<a href="', "undefined" == typeof data.href ? "" : baidu.template._encodeHTML(data.href), '">', "undefined" == typeof data.name ? "" : baidu.template._encodeHTML(data.name), "</a>”</li>        </ul>    </div> --></div>"), _template_varName = null
                            }(_template_object);
                        return fn = null, _template_fun_array.join("")
                    }][0];
                hasCtrName ? (nearbyName = ctr.poi[0].name, name = ctr.poi[0].name + " " + this.curKw) : name = this.curKw, href = "http://www.baidu.com/s?ie=utf-8&wd=" + encodeURIComponent(name) + "&cl=3", hasCtrName ? (value = "想知道: " + this.curKw + " " + ctr.poi[0].name + "附近哪有" + this.curKw, sugTip = iKnow.getPromptInfo(value, this.curKw)) : sugTip = ["<div class='nr_suggest'>您还可以：", "<ul>", "<li>看看输入的文字是否有误</li>", '<li>在百度网页中查找“<a target="_blank" href="' + href + '">' + this.curKw + "</a>”</li>", "</ul>", "</div>"].join("");
                var templateObj = {
                    data: {
                        name: name,
                        nearbyName: nearbyName,
                        href: href,
                        curKw: this.curKw,
                        isGRequest: this.isGRequest
                    }
                }
            } else {
                var noResultTmpl = [function(_template_object) {
                    var _template_fun_array = [],
                        fn = function(__data__) {
                            var _template_varName = "";
                            for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                            eval(_template_varName), _template_fun_array.push('<div class="mapinfo_con">    <p class="no_result_title">        '), _template_fun_array.push(data.isGRequest || data.isSearchInView ? "            在<strong>当前视图区域</strong>内未找到相关地点。        " : "            未找到相关地点。        "), _template_fun_array.push("    </p>    ", "undefined" == typeof data.sg ? "" : data.sg, "</div>"), _template_varName = null
                        }(_template_object);
                    return fn = null, _template_fun_array.join("")
                }][0];
                sugTip = iKnow.getPromptInfo("想知道: " + this.searchData.curKw + "在哪", this.searchData.curKw);
                var templateObj = {
                    data: {
                        isGRequest: this.isGRequest,
                        cityName: this.searchData.sCityName,
                        ctype: this.searchData.ctype
                    }
                }
            }
            var title = noResultTmpl(templateObj);
            this.securityFilter || (this.$el.find(".poi-sug-title").html(title), this.$el.find(".poi-query-tip").html(sugTip))
        },
        showSpacePoiClick: function() {
            var e = this.json.space_poi;
            this._showSpacePoi(e.uid, e.name)
        },
        _showSpacePoi: function(e, i) {
            if (e) {
                var t = map.getMaxZoom() - 3,
                    n = "ext&uid=" + e + "&l=" + t + "&c=" + this.sCityCode + "&wd=" + encodeURIComponent(i);
                searchData.fetch(n, function(e) {
                    e && e.content && comMgr.load("SpacePoi", {
                        cinfo: {
                            initData: e,
                            poiName: i
                        }
                    })
                }, function() {})
            }
        },
        changeNbRuleClick: function(e) {
            this._showRangePop(e.directTarget)
        },
        _showRangePop: function(e) {
            var i = this,
                t = e;
            require.async(["common:widget/ui/Popup/Popup.js", "common:widget/ui/searchInfoWindow/searchInfoWindow.js"], function(e, n) {
                if (i.changeRangePopup) i.changeRangePopup && i.changeRangePopup.close();
                else {
                    i.changeRangePopup = new e({
                        title: "周边搜索",
                        content: i._generateMorePopupHtml(i.ctPoiName),
                        width: 293,
                        addDom: "card-" + i.module.cardId,
                        close: function() {
                            i.changeRangePopup = null
                        }
                    }), i.changeRangePopup.addConnectDom(t), i.changeRangePopup.render();
                    var o = i.changeRangePopup.getDom().style;
                    o.left = "36px", o.top = "50px", i.changeRangePopup.content.style.paddingLeft = "6px", i.changeRangePopup.content.style.paddingBottom = "8px", T.G("crangeKw") && (T.G("crangeKw").focus(), T.G("crangeKw").value = i.json && i.json.result && i.json.result.wd);
                    var a = T.G("crangeBtn");
                    T.on(a.form, "submit", function(e) {
                        "" == T.G("crangeKw").value ? T.G("crangeKw").focus() : (i.ctPoiUid ? n.roundSearchByInput("crangeKw", i.ctPoiUid, "crangeList", i.centerCityCode, 3, i.centerPt.lng, i.centerPt.lat) : n.rangeSearchByInput("crangeKw", i.centerPt.lng, i.centerPt.lat, "crangeList", i.centerCityCode, 3), i.changeRangePopup && i.changeRangePopup.close()), baidu.event.preventDefault(e)
                    });
                    var r = T.G("crange_cate_list");
                    if (r)
                        for (var s = r.getElementsByTagName("a"), c = 0, l = s.length; l > c; c++) i.ctPoiUid ? ! function() {
                            var e = s[c];
                            T.on(e, "click", function() {
                                n.roundSearchByLink(e, i.ctPoiUid, "crangeList", i.centerCityCode, 2, i.centerPt.lng, i.centerPt.lat), i.changeRangePopup && i.changeRangePopup.close()
                            })
                        }() : ! function() {
                            var e = s[c];
                            T.on(e, "click", function() {
                                n.rangeSearchByLink(e, i.centerPt.lng, i.centerPt.lat, "crangeList", i.centerCityCode, 2), i.changeRangePopup && i.changeRangePopup.close()
                            })
                        }()
                }
            })
        },
        _generateMorePopupHtml: function(e) {
            var i = [];
            i.push("<div>"), i.push("<div class='change_rs_title'>在<span class='important'>" + e + "</span>查找：</div>"), i.push("<div id='crange_cate_list' class='iw_cate_list' style='float:none;margin-top:10px;'>");
            for (var t = ["ATM", "银行", "宾馆", "餐馆", "公交站", "超市", "加油站"], n = 0, o = t.length; o > n; n++) i.push(0 == n ? "<a href='javascript:void(0)' class='first'>" + t[n] + "</a>" : "<a href='javascript:void(0)'>" + t[n] + "</a>");
            return i.push("</div>"), i.push("<div class='mt10'>"), i.push("<form>"), i.push("<span>其他：</span><input id='crangeKw' style='vertical-align:middle;width:140px;padding:0;height:24px;line-height:24px;' type='text' size='20' maxLength='100' autocomplete='off' /> <input id='crangeBtn' class='iw_bt' type='submit' value='搜索' />"), i.push("</form>"), i.push("</div></div>"), i.join("")
        },
        disposeNearByPOI: function() {
            var e = this.json.line_content;
            if (e && e[0]) {
                var i = e[0];
                i.index = 0; {
                    this.nearByline = new BusLineSearchView(e[0], this.searchData, this.bridge)
                }
            }
        },
        affectRoute: function(e) {
            var i = e.result.wd;
            i && (window.poi2RouteSearchName = i)
        },
        generateAdList: function() {
            try {
                var e = this.json.damoce;
                if (e && e.ads) {
                    for (var i = e.ads, t = 0, n = 0, o = 0; o < i.length; o++) {
                        var a = i[o];
                        if (a.ext.pos >= 0 && a.search_item_html) {
                            a.index = n, n++, (1 === a.ext.type || 3 === a.ext.type) && (a.showIndex = t, t++);
                            var r = new DamoceSearchView(a, this.searchData, this.bridge);
                            r && (this.$list.append(r.render()), r.initialize(), this.modules.push(r))
                        }
                    }
                    return {
                        index: n,
                        showIndex: t
                    }
                }
                return {
                    index: 0,
                    showIndex: 0
                }
            } catch (s) {}
        },
        generatePostAdList: function(e, i) {
            try {
                var t = this.json.damoce;
                if (t && t.ads)
                    for (var n = t.ads, o = 0, a = 0, r = 0; r < n.length; r++) {
                        var s = n[r];
                        if (s.ext.pos < 0 && s.search_item_html) {
                            s.index = o + e + 1, o++, (1 === s.ext.type || 3 === s.ext.type) && (s.showIndex = a + i + 1, a++);
                            var c = new DamoceSearchView(s, this.searchData, this.bridge);
                            c && (this.$list.append(c.render()), c.initialize(), this.modules.push(c))
                        }
                    }
            } catch (l) {}
        },
        generateViewList: function(e) {
            if (this.hiddenModules = this.modules, this.modules = [], this.$list.empty(), e) {
                for (var i = this.generateAdList(), t = 0, n = 0; n < e.length; n++) {
                    var o = e[n];
                    o.index = i.index + n, o.poiType !== constant.POI_TYPE_BUSLINE && o.poiType !== constant.POI_TYPE_SUBLINE && (o.showIndex = i.showIndex + t, t++), o.searchIndex = n, o.isShowBottomPoiList = this.isShowBottomPoiList;
                    var a = this.generateView(o);
                    if (a) {
                        this.$list.append(a.render());
                        var r = map.temp.scenic3dPoints,
                            s = map.temp.scenic3dMarkers;
                        if (r && s)
                            for (var c = 0; c < r.length; c++)
                                if (r[c].uid === o.uid) {
                                    s[c] && (s[c].isHideZoomend = !0, map.removeOverlay(s[c]));
                                    break
                                }
                        a.initialize(), this.modules.push(a)
                    }
                }
                this.generatePostAdList(i.index + n - 1, i.showIndex + n - 1);
                for (var n = 0; n < this.searchData.content.length; n++) addStat("poisearch.item.item", "show", {
                    s_from: this.searchData.searchFrom,
                    wd: this.searchData.wd,
                    std_tag: this.searchData.content[n].std_tag,
                    uid: this.searchData.content[n].uid
                });
                addStat("poisearch.list.show", "show", {
                    da_trd: this.searchData.trdName,
                    d_stat: this.searchData.damoceStat,
                    s_from: this.searchData.searchFrom,
                    wd: this.searchData.wd
                })
            }
        },
        generateView: function(e) {
            var i;
            switch (e.poiType) {
                case constant.POI_TYPE_NORMAL:
                    searchUtil.isCater(e) ? i = new CaterSearchView(e, this.searchData, this.bridge) : searchUtil.isHouse(e) ? i = new HouseSearchView(e, this.searchData, this.bridge) : searchUtil.isHotel(e) ? i = new HotelSearchView(e, this.searchData, this.bridge) : searchUtil.isMovie(e) ? (e.isMovie = !0, i = new MovieSearchView(e, this.searchData, this.bridge)) : i = searchUtil.isScenery(e) ? new ScenerySearchView(e, this.searchData, this.bridge) : new BaseSearchView(e, this.searchData, this.bridge);
                    break;
                case constant.POI_TYPE_BUSSTOP:
                    e.addr && (i = new BusStopSearchView(e, this.searchData, this.bridge));
                    break;
                case constant.POI_TYPE_SUBSTOP:
                    e.addr && (i = new SubStationSearchView(e, this.searchData, this.bridge));
                    break;
                case constant.POI_TYPE_BUSLINE:
                    i = new BusLineSearchView(e, this.searchData, this.bridge);
                    break;
                case constant.POI_TYPE_SUBLINE:
                    i = new SubLineSearchView(e, this.searchData, this.bridge);
                    break;
                default:
                    i = new BaseSearchView(e, this.searchData)
            }
            return i
        },
        fetchMoreBusinfo: function() {
            var e = this.searchData,
                i = e.sCityCode,
                t = e.result.wd,
                n = this;
            searchData.fetch("s&c=" + i + "&wd=" + encodeURIComponent(t), function(e) {
                n.blfirstLoad = !0, n.dispMoreBusline(e)
            })
        },
        preDisposeHiddenPoints: function(e) {
            var e = this.json.content,
                i = (e[0].poiType, []),
                t = [],
                n = this;
            e[0] && e[0].acc_flag && 1 == e[0].acc_flag && (T.each(e, function(e, o) {
                var a = o.acc_flag;
                1 == a ? t.push(o) : (i.push(o), n.hasHiddenPoints = !0)
            }), this.json.content = t, this.shownPoints = t, this.hiddenPoints = i, this.allPoints = t.concat(i), (e[0].poiType === constant.POI_TYPE_SUBLINE || e[0].poiType === constant.POI_TYPE_BUSLINE) && (this.shownPointsNeedHide = !0))
        },
        afterDisposeHiddenPoints: function() {
            var content = this.json.content,
                searchData = this.searchData;
            if (this.hasHiddenPoints) {
                var $morePoints;
                if (this.shownPointsNeedHide) {
                    var tmpl = [function(_template_object) {
                            var _template_fun_array = [],
                                fn = function(__data__) {
                                    var _template_varName = "";
                                    for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                                    eval(_template_varName), _template_fun_array.push(""), isShowMore && (_template_fun_array.push(""), moreLinesNum > 0 && _template_fun_array.push('<li class="more-lines">    <a href="javascript:void(0)" map-on-click="moreLines">显示其他', "undefined" == typeof moreLinesNum ? "" : moreLinesNum, "条线路</a></li>"), _template_fun_array.push('<li class="more-result">    <a href="javascript:void(0)" map-on-click="moreResult">查找其他名称中含有“', "undefined" == typeof wd ? "" : baidu.template._encodeHTML(wd), "”的结果</a></li>")), _template_fun_array.push(""), _template_varName = null
                                }(_template_object);
                            return fn = null, _template_fun_array.join("")
                        }][0],
                        displayNum = searchData.result.spec_dispnum,
                        model = {};
                    model.isShowMore = !0, model.moreLinesNum = searchData.result.total_busline_num - displayNum, model.wd = searchData.wd, $morePoints = T(tmpl(model))
                } else $morePoints = T(['<li class="more-result">', '<a href="javascript:void(0)" map-on-click="moreResult">查看全部', searchData.result.total, "条结果</a>", "</li>"].join(""));
                this.$list.append(this.$morePoints = $morePoints)
            }
        },
        setMissingModule: function() {
            if (this.isGRequest && window.GRControll.openedMarker)
                if (this.json && this.json.center && this.json.center.poi && this.json.center.poi[0] && this.json.center.poi[0].uid == window.GRControll.openedMarker.uid) window.GRControll.openedMarker = null;
                else {
                    for (var e = !1, i = 0, t = this.modules.length; t > i; i++) {
                        var n = this.modules[i];
                        if (n.model.uid == window.GRControll.openedMarker.uid) {
                            n.select(!0), e = !0;
                            break
                        }
                    }
                    if (!e && !window.spotInfoWnd) {
                        var o = this;
                        o.generateMissingModule()
                    }
                }
        },
        generateMissingModule: function() {
            var e = this,
                i = "/?qt=inf&uid=" + window.GRControll.openedMarker.uid + "&ie=utf-8&t=" + (new Date).getTime();
            baidu.ajax(i, {
                dataType: "json",
                success: function(i) {
                    if (i && i.content) {
                        var t = new MissingView(i.content, e.searchData);
                        t.initialize(), t.select(!0), e.missingModule = t
                    }
                },
                error: function() {}
            })
        },
        getTemplateData: function() {
            var e = this.json.result,
                i = this.json.current_city.code,
                t = !(!e.jump_back || !("undefined" == typeof e.sug_index || e.sug_index < 0) || this.startCity.code == i),
                n = 1 === e.pattern_sign,
                o = sateCityList.isSateMapSupportCity(i);
            return {
                jump_back: t,
                statSugg: n,
                supportSate: o,
                curCity: this.json.current_city,
                startCity: this.startCity,
                wd: this.searchData.wd,
                returnQuery: e.return_query,
                securityFilter: this.securityFilter,
                adsPositionBottom: this.securityFilter && this.noResult,
                logined: userMgr.loginStatus
            }
        },
        generateSearchData: function() {
            var e = {},
                i = this.json,
                t = i.result;
            if (i.current_city ? (e.sCityCode = i.current_city.code, e.sCityName = i.current_city.name, e.ctype = i.current_city.type) : (e.sCityCode = modelConfig.cityCode, e.sCityName = modelConfig.cityName), this.sCityCode = e.sCityCode, this.sCityName = e.sCityName, this.wd = e.wd = i.result.wd || "", this.curKw = e.curKw = t.return_query || t.wd, this.what = e.what = t.what || t.wd, this.sugKw = e.sugKw = t.wd2 || "", e.result = i.result, e.place_info = i.place_info, this.setGerRequest(e), e.content = this.json.content, e.allContents = this.allPoints, this.json.damoce && this.json.damoce.result && this.json.damoce.result.logs) {
                e.damoceStat = this.json.damoce.result.logs;
                var n = this.json.damoce.result.logs.match(/sampid:(\d+)/);
                e.trdName = "", n && (e.trdName += n[1]), e.trdName += this.json.damoce.result.ad_num > 0 ? ",1" : ",0", e.damoceStat += "_result_type:" + i.result.type
            } else e.damoceStat = "", e.trdName = "";
            if (this.json.damoce && this.json.damoce.result && this.json.damoce.result.ad_num && (addStat("poisearch.list.damoce", "show"), this.json.damoce.result.common_scripts)) {
                var o = this.json.damoce.result.common_scripts.js,
                    a = this.json.damoce.result.common_scripts.css;
                if (a && require.loadCss({
                        content: a
                    }), o) try {
                    util.evalScript(o)
                } catch (r) {}
            }
            if (e.searchFrom = "0", this.cinfo.genRequestKey) {
                var n = this.cinfo.genRequestKey.match(/gr=(\d)/);
                n && (e.searchFrom = n[1])
            } else "nav_menu" === this.cinfo.from ? e.searchFrom = "4" : this.cinfo.isFilter && (e.searchFrom = "5");
            return e.guid = this.module.guid, e
        },
        listenerHandler: function(e, i) {
            var t = i.directive,
                n = i.module;
            if (t) {
                var o = t + e.replace(/^\w/, e.substring(0, 1).toUpperCase()),
                    a = n && n[o];
                "function" == typeof a ? a.call(n, i.e) : (a = this[o], "function" == typeof a && a.call(this, i.e))
            }
        },
        fetchMoreBusinfo: function(e, i, t) {
            var n = this.searchData,
                o = n.sCityCode,
                a = n.result.wd;
            searchData.fetch("s&pn=" + t.pn + "&c=" + encodeURIComponent(o) + "&wd=" + encodeURIComponent(a) + "&nn=" + e, function(e) {
                i(e)
            })
        },
        showMoreBusLine: function(e) {
            var i = this;
            e = T.extend({
                pn: 0
            }, e || {});
            var t = searchPage.itemsPerPage * e.pn;
            this.setPage({
                isBusLinePage: !0,
                callback: this.showMoreBusLine,
                page: e.pn + 1
            }), this.fetchMoreBusinfo(t, function(e) {
                i.json = e, i.searchData = i.generateSearchData();
                var t = i.bridge;
                t && t.selectLine && (t.selectLine._clearBusLine(), t.selectLine._clearLine(), t.selectLine._clearArea()), i.$morePoints.hide(), i.generateViewList(e.content), i.$page.show()
            }, e)
        },
        moreLinesClick: function() {
            this.showMoreBusLine({
                pn: 0
            })
        },
        moreResultClick: function() {
            addStat(STAT_CODE.STAT_STRONG_ALL, {
                wd: this.curKw ? this.curKw : "",
                uid: 1
            });
            var e;
            e = this.shownPointsNeedHide ? this.hiddenPoints : this.allPoints, this.$morePoints.hide(), this.generateViewList(e), window.mapDebugObjWxp && this.json.debug_info && this.json.debug_info.results && this.debugRender(e, this.json.debug_info.results), this.$page && this.$page.show();
            var i = this.hiddenModules;
            T.each(i, function(e, i) {
                i.selectLine && (i._clearBusLine(), i._clearLine(), i._clearArea())
            }), listener.trigger("search.controller", "more_result", {
                points: this.getPoints()
            })
        },
        debugRender: function(e, i) {
            try {
                for (var t = 0; t < e.length; t++) $(this.$list.find(".search-item")[t]).after(window.mapDebugObjWxp.showPoiDebug(i, t));
                window.mapDebugObjWxp.bindPoiDebug()
            } catch (n) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: n.message || n.description,
                    path: "common:widget/search/SearchController.js",
                    ln: 1342
                })
            }
        },
        bindEvents: function() {
            for (var e = this, i = 0; i < events.length; i++) ! function(i, t) {
                t.$el.on(i, "[map-on-" + i + "]", function(t) {
                    if (e.isBindListener && (t.target === this || "true" !== T(t.target).attr("stop-propagation"))) {
                        var n = T(this),
                            o = n.attr("data-index") || n.parents(".search-item").attr("data-index");
                        isNaN(+o) && (o = n.parents(".bus-sub-line-item").attr("data-index"));
                        var a = e.modules[o - 1];
                        t.directTarget = n, e.isGRequest && "click" == i && window.GRControll.setGRequestFlg(2e3), listener.trigger("search.event", i, {
                            module: a,
                            directive: n.attr("map-on-" + i),
                            e: t
                        })
                    }
                })
            }(events[i], this);
            this.isBindListener = !0, listener.on("search.event", this.listenerHandler, this), listener.on("generequest", "poisearch", this.clearMap, this), listener.on("searchbox.search", function() {
                hideBanner = !1
            }, this), listener.on("generequest", "searchinview", this.clearMapView, this), this.$el.find(".orign_search").click(function() {
                e.cnameSearch()
            }), this.$el.find(".sate-suggest-query").click(function() {
                searchUtil.sendSateSuggestQuery(e.searchData.curKw, e.searchData.sCityCode)
            }), this.$el.delegate("[data-stat-code]", "click", function() {
                var i = e.json && e.json.result && e.json.result.page_num || 0,
                    t = T(this),
                    n = t.attr("data-index") || t.parents(".search-item").attr("data-index") || 0,
                    o = t.attr("data-stat-code"),
                    a = o.split(";");
                if (e.searchData) {
                    var r = {
                            list_page: i,
                            list_index: n,
                            da_trd: e.searchData.trdName,
                            d_stat: e.searchData.damoceStat,
                            s_from: e.searchData.searchFrom
                        },
                        s = t.attr("data-searchindex");
                    e.json && e.json.result && (r.wd = e.json.result.wd || ""), void 0 !== s && e.json && e.json.content && e.json.content[s] && (r.poi_name = e.json.content[s].name, r.std_tag = e.json.content[s].std_tag, r.uid = e.json.content[s].uid || "");
                    for (var c = 0; c < a.length; c++) addStat(a[c], "click", r)
                }
            }), this.$el.delegate("[data-detail-code]", "click", function() {
                var i = T(this),
                    t = i.attr("data-detail-code"),
                    n = i.attr("data-index") || i.parents(".search-item").attr("data-index");
                isNaN(+n) && (n = i.parents(".bus-sub-line-item").attr("data-index"));
                var o = e.modules[n - 1] || {},
                    a = {
                        cuid: o.model && o.model.uid,
                        uid: o.model && o.model.uid,
                        ct: t
                    },
                    r = "";
                o.model && o.model.ext && o.model.ext.src_name && (r = o.model.ext.src_name), a.category = r, addStat(STAT_CODE.STAT_POI_ONXQ, a), addStat("detail.title." + r, "click", {
                    from: "list"
                })
            }), this.$el.find(".img-wrap img").bind("error", function() {
                var e = T(this).attr("src", NOPIC);
                e.unbind("error")
            }), this.$el.delegate(".camera-icon", "mouseover", function(i) {
                var t = T(i.target),
                    n = t.offset();
                T("#streetPanoFloatTitle").show().offset({
                    left: n.left + 20,
                    top: n.top - 5
                }), 1 != t.data("animate") && e.cameraAnimate(t)
            }), this.$el.delegate(".camera-icon", "mouseout", function() {
                T("#streetPanoFloatTitle").hide()
            })
        },
        cameraAnimate: function(e) {
            e.data("animate", !0);
            var i = 16,
                t = 0,
                n = function() {
                    return 0 === i ? void e.data("animate", !1) : (--i, t -= 16, e.css("background-position", t + "px 26px"), void setTimeout(arguments.callee, 100))
                };
            setTimeout(n, 100)
        },
        unbindEvents: function() {
            listener.off("search.event", "overall", this.listenerHandler, this), listener.off("generequest", "poisearch", this.clearMap, this), listener.off("generequest", "searchinview", this.clearMapView, this), this.isBindListener = !1
        },
        unload: function() {
            this.unbindEvents();
            for (var e = 0; e < this.modules.length; e++) this.modules[e].unload();
            this.searchData = null, this.missingModule && this.missingModule.unload(), this.clearMarkers(), this.modules = []
        },
        getModules: function() {
            return this.modules
        },
        getMarkers: function() {
            var e = T.array.map(this.modules, function(e) {
                return e.marker
            });
            return e
        },
        getPoints: function() {
            var e = T.array.map(this.modules, function(e) {
                return e.model.point
            });
            return e = T.array.filter(e, function(e) {
                return !!e
            })
        },
        setFilter: function(e) {
            var i = "",
                t = e.result && e.result.page_num || 0,
                n = e.result && e.result.total || 0;
            if (e.place_info && placeRe.test(e.place_info.d_data_type))
                if ("cinema" !== e.place_info.d_business_type && "movie" !== e.place_info.d_business_type) {
                    var o = e.place_info.d_data_type;
                    "cater" === o ? addStat("poisearch.cater.show", "show", {
                        list_page: t,
                        total: n,
                        da_trd: this.searchData.trdName,
                        d_stat: this.searchData.damoceStat,
                        s_from: this.searchData.searchFrom
                    }) : "hotel" === o ? addStat("poisearch.hotel.show", "show", {
                        list_page: t,
                        total: n,
                        da_trd: this.searchData.trdName,
                        d_stat: this.searchData.damoceStat,
                        s_from: this.searchData.searchFrom
                    }) : "scope" === o ? addStat("poisearch.scenery.show", "show", {
                        list_page: t,
                        total: n,
                        da_trd: this.searchData.trdName,
                        d_stat: this.searchData.damoceStat,
                        s_from: this.searchData.searchFrom
                    }) : addStat("poisearch.other.show", "show", {
                        list_page: t,
                        total: n,
                        da_trd: this.searchData.trdName,
                        d_stat: this.searchData.damoceStat,
                        s_from: this.searchData.searchFrom
                    }), this.searchFilter = new SearchFilter(e, {
                        cinfo: this.cinfo
                    }), i = this.searchFilter.render()
                } else addStat("poisearch.movie.show", "show", {
                    list_page: t,
                    total: n,
                    da_trd: this.searchData.trdName,
                    d_stat: this.searchData.damoceStat,
                    s_from: this.searchData.searchFrom
                });
            else addStat("poisearch.general.show", "show", {
                list_page: t,
                total: n,
                da_trd: this.searchData.trdName,
                d_stat: this.searchData.damoceStat,
                s_from: this.searchData.searchFrom
            });
            return i
        },
        bindFilter: function() {
            var e = this,
                i = this.searchFilter;
            i.initialize(), i.addEventListener("filterquery", function(i) {
                e.searchByFilter(i.data)
            }), i.addEventListener("togglequery", function() {})
        },
        searchByFilter: function(e) {
            var i = this,
                t = searchParam.getUrlParamString(e),
                n = searchParam.getParam("sub_type"),
                o = n,
                a = this.searchData,
                r = "";
            if ("" == n && (n = o = a.curKw), n.indexOf("-") > -1) {
                var s = n.split("-");
                o = s[s.length - 1], "" == o && (o = s[s.length - 2])
            }
            this.isnbSearch ? util.loadSearchInfo(i.ctPoiUid ? function(t) {
                t.roundSearchByValue(o, i.ctPoiUid, "crangeListI", i.centerCityCode, 2, i.centerPt.lng, i.centerPt.lat, null, e, !0)
            } : function(t) {
                t.rangeSearchByValue(o, i.centerPt.lng, i.centerPt.lat, "crangeListI", i.centerCityCode, null, null, null, e, null, !0)
            }) : (r = e.pl_sub_type && e.pl_sub_type.match(movieReg) ? "s&c=" + a.sCityCode + t + "&on_gl=0" + (e.wd ? "" : "&wd=" + encodeURIComponent(o)) : "s&c=" + a.sCityCode + t + (e.wd ? "" : "&wd=" + encodeURIComponent(o)), comMgr.go(r, {
                staticExpand: !0,
                cinfo: {
                    isFilter: !0
                }
            }))
        },
        setPage: function(e) {
            var i = this;
            e = T.extend({
                json: this.json,
                cinfo: this.cinfo,
                searchData: this.searchData
            }, e || {}), searchPage.init(e, function(t) {
                pageChangeOption = !0, e.callback ? e.callback.call(i, t) : i.requestPage(t)
            }), searchPage.page && (this.$page = T(searchPage.page.container), this.hasHiddenPoints && this.$page.hide())
        },
        getPageRequest: function(e) {
            var i = this.searchData,
                t = e.pn,
                n = e.nn,
                o = e.bizCount,
                a = this.sugKw ? 1 : 0,
                r = this.json.result.db,
                s = "",
                c = "",
                l = {},
                d = {
                    from: "webmap",
                    c: i.sCityCode,
                    wd: i.curKw,
                    wd2: i.sugKw,
                    pn: t,
                    nn: n,
                    db: r,
                    sug: a,
                    addr: 0
                };
            filterStatus.active && (d.district_name = filterStatus.districtName, d.business_name = filterStatus.businessName, filterStatus.specialFlag && (d.wd = filterStatus.tag ? filterStatus.tag + " " + filterStatus.districtName : ""));
            var m = searchParam.getParams(),
                p = {};
            this.isGRequest && (p = this.getGrParam()), this.isnbSearch ? (s = "nb", this.cinfo.centerPoint ? (p.nb_x = this.cinfo.centerPoint.lng, p.nb_y = this.cinfo.centerPoint.lat, p.uid = this.cinfo.uid, window.GRControll.GRCircleRadius && (p.gr_radius = window.GRControll.GRCircleRadius), l = {
                cinfo: {
                    isnbSearch: !0,
                    isClickNextPage: !0,
                    searchByContextMenu: !0,
                    centerPoint: this.cinfo.centerPoint,
                    ctPoiName: this.cinfo.ctPoiName,
                    radius: this.radius,
                    bizCount: o
                }
            }) : (p.uid = this.ctPoiUid, p.r = this.radius, l = {
                cinfo: {
                    isnbSearch: !0,
                    isClickNextPage: !0,
                    bizCount: o
                }
            })) : (map.noShowBl = !0, s = window.mapDebugObjWxp ? "s" : 45 == this.cmdNo || this.nearByline ? "s" : "con", l = {
                cinfo: {
                    isClickNextPage: !0,
                    bizCount: o
                }
            }), filterStatus.active && (delete p.gr, delete p.on_gel), d.pn >= 2 && (d.pn += 1);
            var h = baidu.url.jsonToQuery(d, encodeURIComponent),
                u = baidu.url.jsonToQuery(m, encodeURIComponent),
                g = baidu.url.jsonToQuery(p, encodeURIComponent),
                c = s + "&" + h + "&" + u + "&" + g;
            return l.cinfo && (l.cinfo.perPageSearch = !0), l.staticExpand = !0, {
                req: c,
                opts: l
            }
        },
        requestPage: function(e) {
            addStat("poisearch.list.page", "click", {
                da_trd: this.searchData.trdName,
                d_stat: this.searchData.damoceStat,
                s_from: this.searchData.searchFrom
            });
            var i = this.getPageRequest(e);
            comMgr.go(i.req, i.opts)
        },
        getGrParam: function() {
            var e = map.getBounds({
                    margins: [0, 0, 0, mapConfig.leftMargin],
                    heading: 0,
                    tilt: 0
                }),
                i = ("(" + e.minX + "," + e.minY + ";" + e.maxX + "," + e.maxY + ")", {
                    da_src: "pcmappg.poi.page",
                    on_gel: 1,
                    src: 7,
                    gr: 3,
                    l: map.getZoom()
                });
            return i
        },
        setGerRequest: function(e) {
            var i = this.json.result;
            this.isGRequest = e.isGRequest = 11 != i.type && 1 == i.op_gel ? !0 : !1, window.GRContr && (window.GRControll.isGRequest = this.isGRequest)
        },
        setNbSearchData: function() {
            var e = this.json,
                i = e.result;
            this.centerCityCode = this.cinfo && this.cinfo.oc || this.sCityCode;
            var t = util.getParam("?qt=" + window.currentComponent.modelQuery);
            t && t.gr_radius && (window.GRControll.GRCircleRadius = t.gr_radius);
            var n = e.center,
                o = n && n.poi && n.poi[0],
                a = o && n.poi[0].geo,
                r = o && n.poi[0].uid,
                s = this.hasCtName = o && n.poi[0].name;
            this.cinfo && this.cinfo.searchByContextMenu ? (this.isnbSearch = !0, this.centerPt = this.cinfo.centerPoint, this.ctPoiName = this.cinfo.ctPoiName ? this.cinfo.ctPoiName : "中心点", this.radius = this.cinfo.radius) : a ? (this.isnbSearch = !!n, this.centerPt = util.getPointByStr(util.parseGeo(n.poi[0].geo).points), this.radius = i.radius) : t && "nb" == t.qt && t.nb_x && t.nb_y && (this.isnbSearch = !0, this.centerPt = new BMap.Point(t.nb_x, t.nb_y), this.cinfo.centerPoint = this.centerPt, this.cinfo.searchByContextMenu = !0, this.radius = i.radius), r && s && (this.ctPoiUid = n.poi[0].uid, this.ctPoiName = n.poi[0].name), this.ctPoiName || (this.ctPoiName = "未知点"), this.searchData.isnbSearch = this.isnbSearch
        },
        clearMap: function(e, i) {
            hideBanner = !1, 36 == i.type || 38 == i.type ? this.clearMarkers(e, i.logstr) : 37 == i.type && window.clearClarify && clearClarify()
        },
        clearMapView: function(e, i) {
            39 == i.type ? this.clearMarkers(e, i.logstr) : 40 == i.type
        },
        clearMarkers: function(e, i) {
            this.markers = this.getMarkers();
            var t;
            window.GRControll && (t = GRControll.openedMarker);
            for (var n = 0, o = this.markers.length; o > n; n++) this.markers[n] && map.removeOverlay(this.markers[n]);
            "&gr=2" !== i && window.GRControll && GRControll.clearGRMap(), this.markers.length = 0, e && "circle" != e || (this.centerPt && map.removeOverlay(this.centerPt), this.centerPt = null, this.centerPoi && map.removeOverlay(this.centerPoi), this.centerPoi = null), NbSearch && NbSearch.hide(), this.unListMarker && (map.removeOverlay(this.unListMarker), this.unListMarker = null), this.missingModule && map.removeOverlay(this.missingModule.marker), t && (GRControll.openedMarker = t), this.cInfoWnd = null
        },
        cnameSearch: function() {
            indexUtil.cnameSearch(this.searchData.wd, this.startCity.code, 3)
        },
        addCenterPoint: function(e) {
            var i = this;
            i.cinfo.simpleInfoWindow ? util.loadSearchSimpleInfo(function(t) {
                i.setCenterPt(e, t)
            }) : util.loadSearchInfo(function(t) {
                i.setCenterPt(e, t)
            })
        },
        setCenterPt: function(e, i) {
            var t = this;
            if (window.GRControll.isGRCircleShow && this.showCircleTool(), this.centerPoi = i.addRangeSearchCenterPoi(this.centerPt, this.ctPoiName, !1), e && e.poi && e.poi[0]) {
                var n = e.poi[0].addr,
                    o = e.poi[0].tel;
                (e.poi[0].poiType == constant.POI_TYPE_BUSSTOP || e.poi[0].poiType == constant.POI_TYPE_SUBSTOP) && (n = T.array.unique(n.split(";")).join("; ")), o && (o = o.replace(/,/g, ", ")), this.cInfoWnd = this.cinfo.simpleInfoWindow ? i.createCommonInfoWindow({
                    name: this.ctPoiName,
                    uid: e.poi[0].uid,
                    poiType: e.poi[0].poiType,
                    ext: e.poi[0].ext,
                    status: 5,
                    cp: e.poi[0].cp,
                    cla: e.poi[0].cla
                }, {
                    cityCode: this.centerCityCode,
                    x: this.centerPt.lng,
                    y: this.centerPt.lat
                }) : i.createSearchInfoWnd({
                    title: this.ctPoiName,
                    addr: n,
                    tel: o,
                    uid: e.poi[0].uid,
                    poiType: e.poi[0].poiType,
                    ext: e.poi[0].ext,
                    status: 5,
                    cp: e.poi[0].cp,
                    cla: e.poi[0].cla
                }, {
                    cityCode: this.centerCityCode,
                    x: this.centerPt.lng,
                    y: this.centerPt.lat
                })
            } else this.cinfo && this.cinfo.centerPoint && (this.cInfoWnd = this.cinfo.simpleInfoWindow ? i.createCommonInfoWindow({
                name: this.ctPoiName
            }, {
                x: this.centerPt.lng,
                y: this.centerPt.lat,
                cityCode: this.centerCityCode
            }) : i.createSearchInfoWnd({
                title: this.ctPoiName
            }, {
                x: this.centerPt.lng,
                y: this.centerPt.lat,
                cityCode: this.centerCityCode
            }));
            this.centerPoi && this.cInfoWnd && (this.cInfoWnd.addEventListener("close", function() {
                searchUtil.setTop(this.overlay, !1), t.curSelIndex = -1, t._setShareSelIndex(t.curSelIndex)
            }), this.centerPoi.addEventListener("click", function() {
                if ("c" != t.curSelIndex) {
                    window.GRControll.isGRCircleShow && (t.showCircleTool(), window.GRControll.isGRCircleShow = !0), t.selCenterPoi(-1);
                    var e = this;
                    setTimeout(function() {
                        searchUtil.setTop(e, !0)
                    }, 100), t.cinfo.simpleInfoWindow ? i.openSearchInfoWndPOI(t.cInfoWnd, t.centerPoi) : i.openSearchInfoWnd(t.cInfoWnd, t.centerPoi), t.curSelIndex = "c", t._setShareSelIndex(t.curSelIndex)
                }
            }), this.centerPoi.addEventListener("mouseover", function() {
                searchUtil.setTop(this, !0, !0)
            }), this.centerPoi.addEventListener("mouseout", function() {
                map.temp.infoWin && 1 == map.temp.infoWin.isOpen() && map.temp.infoWin.overlay === this || searchUtil.setTop(this, !1)
            }))
        },
        showCircleTool: function() {
            var e = this;
            if (mapConfig.poiSearch.showCircle && e.json) {
                var i = null;
                e.cinfo.centerPoint ? i = e.cinfo.centerPoint : e.json.center && e.json.center.poi && (i = util.getPointByStr(util.parseGeo(e.json.center.poi[0].geo).points)), NbSearch.show(i)
            }
        },
        selCenterPoi: function(e, i) {
            i = i || {}, this.curStopSelIndex = -1, this.isnbSearch && this.centerPoi && !this.centerPoi.isVisible() && (this.centerPoi = null, this.cInfoWnd = null, this._addCenterPoint(this.json.center)), this.isnbSearch && (i.notZoom = !0)
        },
        _setShareSelIndex: function(e) {
            var i = this.curLineSelIndex,
                t = this.curStopSelIndex;
            "undefined" == typeof e && (e = -1), "undefined" == typeof i ? i = -1 : (i = this.curLineSelIndex + "", i = i.split("_") && i.split("_")[1] || -1), "undefined" == typeof t ? t = -1 : (t = this.curStopSelIndex + "", t = t.split("_") && t.split("_")[1] || -1);
            var n = "";
            this.isGRequest && this.json && this.json.content && this.json.content[e] && (n = "|" + this.json.content[e].uid), Share.listIndex = e + "|" + i + "|" + t + n
        },
        setPlaceEntrance: function(e, i) {
            if (!place.result && e && e[0] && (e[0].cla && e[0].cla[0] && e[0].cla[0][0] && e[0].geo || e[0].poi_origin && 33 == e[0].poi_origin)) {
                var t = null,
                    n = e[0].geo,
                    o = "",
                    a = {
                        nb_x: place.placeEntrance.execGeo(n).x,
                        nb_y: place.placeEntrance.execGeo(n).y,
                        uid: e[0].uid
                    };
                e[0].poi_origin && 33 == e[0].poi_origin ? (t = 33, o = e[0].name) : e[0].cla && e[0].cla[0] && e[0].cla[0][0] && e[0].geo && (t = e[0].cla[0][0]);
                var r = {
                    13: !0,
                    14: !0,
                    18: !0,
                    20: !0,
                    33: !0
                };
                if (r[t]) {
                    var s = place.placeEntrance.insertHtml(t, this.sCityCode, a.nb_x, a.nb_y, a.uid, o);
                    i.place_entrance_wd = '<div id="place_tag">' + s + "</div>"
                }
            }
        },
        revertUrl: function() {
            if (!hasRevertUrl) {
                hasRevertUrl = !0;
                var e = this;
                if (this.cinfo && "undefined" != typeof this.cinfo._index && e.json && e.json.content) {
                    this.cinfo._index = decodeURIComponent(this.cinfo._index);
                    var i = this.cinfo._index.split("|") && this.cinfo._index.split("|")[0] || this.cinfo._index,
                        t = this.cinfo._index.split("|") && this.cinfo._index.split("|")[1] || -1,
                        n = this.cinfo._index.split("|") && this.cinfo._index.split("|")[2] || -1,
                        o = this.cinfo._index.split("|") && this.cinfo._index.split("|")[3] || "",
                        a = !0;
                    "" != o && e.json && e.json.content && e.json.content[i] && o != e.json.content[i].uid && (a = !1), a && (this.reIndex = [i, t, n], this.setMarkerOpenInUrl(i, t, n))
                }
            }
        },
        valiSuggQuery: function() {
            if (this.json && this.json.content && this.json.result && 0 == this.json.result.page_num && this.json.result.sug_index >= 0 && this.json.result.sug_index <= 9 && this.cinfo && !this.cinfo._maplevel && !this.cinfo._centerPoint) {
                var e = this;
                setTimeout(function() {
                    e.modules[e.json.result.sug_index].select()
                }, 500)
            }
        },
        setMarkerOpenInUrl: function(e, i, t) {
            var n = this;
            if (-1 != e && "c" != e) {
                var o = this.modules[e] && this.modules[e].model.poiType || -1;
                o == constant.POI_TYPE_BUSLINE && -1 != t && n.showBusStop(this.modules[e])
            }
        },
        showBusStop: function(e) {
            var i = (this.reIndex[0], this.reIndex[1], this.reIndex[2]); - 1 != i && e.showBusStopsClick({}, function() {
                e.selectBusStop(i, e.data.name, e.model.index, {
                    notMove: !0,
                    notZoom: !0
                })
            })
        }
    }), module.exports = SearchController
});;
define("common:widget/search/modules/baseSearchModule/inc.js", function(require, exports, module) {
    function BaseSearch(e, t, a) {
        a && (bridge = a), View.call(this), this.data = e, this.searchData = t, this.index = e.index, this.showIndex = e.showIndex, this.searchIndex = e.searchIndex, this.model = this.baseUpdateModel(e), this.config = this.getBaseConfig(), this.active = !1, this.selected = !1, this.childSelect = !1, this.polygons = [], this.polylines = [], this.businessType = "all", this.infoWindowContent = {
            name: this.model.name
        }
    }

    function hasDetailData(e) {
        return e.detail && e.ty == constant.GEO_TYPE_POINT || e.poiType == constant.POI_TYPE_BUSLINE || e.poiType == constant.POI_TYPE_SUBLINE
    }
    var View = require("common:widget/view/View.js"),
        favMgr = require("common:widget/ui/fav/favMgr.js"),
        sms = require("common:widget/ui/sms/sms.js"),
        BShare = require("common:widget/ui/toolShare/ToolShare.js"),
        util = require("common:widget/ui/util/util.js"),
        mapUtil = require("common:widget/ui/mapUtil/mapUtil.js"),
        constant = require("common:widget/ui/constant/Constant.js"),
        searchData = require("common:widget/ui/searchData/searchData.js"),
        PanoInterface = require("pano:widget/PanoInterface/PanoInterface.js"),
        searchUtil = require("common:widget/search/SearchUtil.js"),
        searchbox = require("common:widget/ui/searchBox/searchBox.js"),
        config = require("common:widget/ui/config/config.js"),
        urlConfig = config.urlConfig,
        mapConfig = config.mapConfig,
        bridge;
    T.inherits(BaseSearch, View, "BaseSearch"), T.object.extend(BaseSearch.prototype, {
        render: function() {
            try {
                return this.template = [function(_template_object) {
                    var _template_fun_array = [],
                        fn = function(__data__) {
                            var _template_varName = "";
                            for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                            eval(_template_varName), _template_fun_array.push('<li data-index="', "undefined" == typeof(index + 1) ? "" : index + 1, '"  data-searchindex="', "undefined" == typeof searchIndex ? "" : searchIndex, '" class="search-item base-item" map-on-click="poiitem" map-on-mouseenter="poiitem" map-on-mouseleave="poiitem" data-stat-code="poisearch.item.item;poisearch.all.item', "undefined" == typeof(3 > searchIndex ? ";poisearch.all.topitem" : "") ? "" : 3 > searchIndex ? ";poisearch.all.topitem" : "", '">    <div class="cf">        <div class="col-l">            <a href="javascript:void(0)" class="no-', "undefined" == typeof(showIndex + 1) ? "" : showIndex + 1, '"></a>        </div>                '), hImage && (_template_fun_array.push('            <div class="col-r">                <div class="mt_5 h_20">'), dtxt && _template_fun_array.push('<span class="n-grey">', "undefined" == typeof dtxt ? "" : dtxt, "</span>"), _template_fun_array.push(""), has360Pano && _template_fun_array.push('<a href="javascript:void(0)" title="360实景" class="pano-360" map-on-click="360Pano">&nbsp;</a>'), _template_fun_array.push(""), hasStreetPano && _template_fun_array.push('<a href="javascript:void(0)" class="camera-icon street-pano ml_5" stop-propagation="true" map-on-click="streetPano" data-index="', "undefined" == typeof(index + 1) ? "" : index + 1, '" data-stat-code="poisearch.all.pano" >&nbsp;</a>'), _template_fun_array.push('                </div>                <div class="img-wrap">                '), hasIndoorPano ? _template_fun_array.push('                    <a href="javascript:void(0)"  map-on-click="indoorPano" data-index="', "undefined" == typeof(index + 1) ? "" : index + 1, '" data-stat-code="poisearch.all.image">                        <img src="', "undefined" == typeof hImage ? "" : hImage, '" class="hasIndoorPano" style="width:71px;height:58px;" />                        <span title="内部环境" class="indoor-pano">内部环境</span>                    </a>                ') : _template_fun_array.push('                    <a href="', "undefined" == typeof detailUrl ? "" : detailUrl, '" data-index="', "undefined" == typeof(index + 1) ? "" : index + 1, '" data-stat-code="poisearch.all.image" data-detail-code="list_page_pic">                        <img src="', "undefined" == typeof hImage ? "" : hImage, '" style="width:71px;height:58px;" />                    </a>                '), _template_fun_array.push("                </div>            </div>        ")), _template_fun_array.push("        ");
                            var rClass = hImage ? "mr_90" : "";
                            _template_fun_array.push('        <div class="ml_30 ', "undefined" == typeof rClass ? "" : rClass, '">            <div class="row">                <span>                <a href="javascript:void(0);" class="n-blue" data-index="', "undefined" == typeof(index + 1) ? "" : index + 1, '" data-stat-code="poisearch.all.title">', "undefined" == typeof name ? "" : name, "</a>                "), isBiz && _template_fun_array.push('                    <span class="n-grey">推广</span>                '), _template_fun_array.push("                </span>                "), hImage || (_template_fun_array.push("                    <span class='span_right'>"), dtxt && _template_fun_array.push('<span class="n-grey">', "undefined" == typeof dtxt ? "" : dtxt, "</span>"), _template_fun_array.push(""), has360Pano && _template_fun_array.push('<a href="javascript:void(0)" title="360实景" class="pano-360" map-on-click="360Pano">&nbsp;</a>'), _template_fun_array.push(""), hasStreetPano && _template_fun_array.push('<a href="javascript:void(0)" title="全景" class="camera-icon street-pano ml_5" map-on-click="streetPano">&nbsp;</a>'), _template_fun_array.push("                    </span>                ")), _template_fun_array.push("                <span>                "), groupon && _template_fun_array.push('                    <a href="', "undefined" == typeof detailUrl ? "" : detailUrl, '" title="共有', "undefined" == typeof placeDetail.groupon.length ? "" : placeDetail.groupon.length, '条团购信息" class="tuan" data-index="', "undefined" == typeof(index + 1) ? "" : index + 1, '" data-stat-code="poisearch.all.tuan" data-detail-code="list_groupon">团</a>                '), _template_fun_array.push("                "), takeout && _template_fun_array.push('                    <a href="', "undefined" == typeof detailUrl ? "" : detailUrl, '" title="', "undefined" == typeof takeout.tips ? "" : takeout.tips, '" class="wai">外</a>                '), _template_fun_array.push("                "), pc_bookable && _template_fun_array.push('                    <a href="', "undefined" == typeof detailUrl ? "" : detailUrl, '" title="本店支持在线订座" class="ding">订</a>                '), _template_fun_array.push("                "), premium2 && premium2.length && _template_fun_array.push('                    <a href="', "undefined" == typeof detailUrl ? "" : detailUrl, '" title="共有', "undefined" == typeof placeDetail.premium2.length ? "" : placeDetail.premium2.length, '条优惠信息" class="hui" data-detail-code="list_page_discount">惠</a>                '), _template_fun_array.push("                </span>            </div>            "), alertMsg && _template_fun_array.push('                <div class="row l-grey">                    <span class="alrt"></span>', "undefined" == typeof alertMsg.alert ? "" : alertMsg.alert, '<a href="', "undefined" == typeof alertMsg.alertUrl ? "" : alertMsg.alertUrl, '" title="报错" target="_blank">欢迎报错</a>                </div>            '), _template_fun_array.push("            "), standard && _template_fun_array.push('            <div class="row">                <span>                    ', "undefined" == typeof standard ? "" : standard, "                </span>            </div>            "), _template_fun_array.push('            <div class="row addr">                <span class="n-grey" title="', "undefined" == typeof addr ? "" : addr, '">', "undefined" == typeof addr ? "" : addr, "</span>                "), unSureAlert && _template_fun_array.push('                    <span style="color:', "undefined" == typeof unSureAlertColor ? "" : unSureAlertColor, '">                        ', "undefined" == typeof unSureAlert ? "" : unSureAlert, "                    </span>                "), _template_fun_array.push("            </div>            "), tels && _template_fun_array.push('                <div class="row tel">                    电话:', "undefined" == typeof tels ? "" : tels, "                </div>            "), _template_fun_array.push('            <div class="children-container row"></div>            '), unSureTip && _template_fun_array.push('                <div class="row unsuretip" style="color:', "undefined" == typeof unSureTipColor ? "" : unSureTipColor, '">                    <span class="unsurelogo"></span>                    ', "undefined" == typeof unSureTip ? "" : unSureTip, "                </div>            "), _template_fun_array.push("        </div>    </div>    "), isShow3DBanner && _template_fun_array.push('        <div class="banner-3d" map-on-click="banner3d">进入3D地图</div>    '), _template_fun_array.push('    <div class="l-row">        <span class="go">            <span map-on-click="to">                <em class=\'to-icon icon\'></em>                <i>到这去</i></span            ><span map-on-click="from">                <em class=\'from-icon icon\'></em>                <i>从这出发</i>            </span>        </span>        <span class="operate ml_5">            <a href="javascript:void(0)" class="message" title="发送到手机" map-on-click="message" data-stat-code="poisearch.message.open" clickNoBubble="true" >发送到手机</a            ><a href="javascript:void(0)"   class="fav ml_10 ', "undefined" == typeof fav.favSelectedCls ? "" : fav.favSelectedCls, '" title="', "undefined" == typeof fav.favTitle ? "" : fav.favTitle, '" map-on-click="fav" clickNoBubble="true" >&nbsp;</a            ><a href="', "undefined" == typeof amendUrl ? "" : amendUrl, '" target="_blank" title="纠错" data-index="', "undefined" == typeof(index + 1) ? "" : index + 1, '" data-stat-code="searchbox.gothere.amend" class="amend ml_10" clickNoBubble="true">&nbsp;</a>        </span>    </div></li>'), _template_varName = null
                        }(_template_object);
                    return fn = null, _template_fun_array.join("")
                }][0], this.$el = T(this.template(this.model)), this.$el
            } catch (e) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: e.message || e.description,
                    path: "common:widget/search/modules/baseSearchModule/inc.js",
                    ln: 68
                })
            }
        },
        initialize: function() {
            try {
                this.bindEvents(), this.marker = this.generateMarker()
            } catch (e) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: e.message || e.description,
                    path: "common:widget/search/modules/baseSearchModule/inc.js",
                    ln: 86
                })
            }
        },
        initializeAfterRender: function() {
            try {} catch (e) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: e.message || e.description,
                    path: "common:widget/search/modules/baseSearchModule/inc.js",
                    ln: 89
                })
            }
        },
        initAlert: function(e) {
            var t = (this.data.ext ? this.data.ext.detail_info : {}, ""),
                a = "",
                i = e.uid || "";
            switch (this.data.status) {
                case 1:
                    break;
                case 2:
                    break;
                case 4:
                    break;
                case 8:
                    break;
                case 10:
                    t = e.unSureTip ? e.unSureTip : "暂停开放";
                    break;
                case 5:
                    t = e.unSureTip ? e.unSureTip : "尚未开放";
                    break;
                case 3:
                    t = e.unSureTip ? e.unSureTip : "暂停开放";
                    break;
                case 9:
                    t = e.unSureTip ? e.unSureTip : "暂停开放";
                    break;
                case 11:
                    t = e.unSureTip ? e.unSureTip : "暂停开放"
            }
            i && (a = "https://ugc.map.baidu.com/ifix/poiproblem/poiproblempcpage?business_trigger=11&poi_uid=" + i), e.alertMsg = !this.data.suspected_flag && t ? {
                alert: t,
                alertUrl: a
            } : !1
        },
        unload: function() {
            this.clearGEO(), this.unbindEvents()
        },
        bindEvents: function() {
            var e = this;
            listener.on("search.module", "activate", this.activateHandler, this), this.addFavHandler = function(t, a) {
                for (var i = e.data.uid, n = 0; n < a.length; n++)
                    if (i == a[n].uid) {
                        e.$el.find(".fav").addClass("has-faved").attr("title", "取消收藏");
                        break
                    }
            }, this.removeFavHandler = function(t, a) {
                for (var i = e.data.uid, n = 0; n < a.length; n++)
                    if (i == a[n].uid) {
                        e.$el.find(".fav").removeClass("has-faved").attr("title", "收藏");
                        break
                    }
            }, listener.on("fav.poi.model", "add", this.addFavHandler), listener.on("fav.poi.model", "remove", this.removeFavHandler)
        },
        activateHandler: function(e, t) {
            t.index !== this.index && this.deactivate()
        },
        unbindEvents: function() {
            listener.off("search.module", "activate", this.activateHandler, this), listener.off("fav.poi.model", "add", this.addFavHandler), listener.off("fav.poi.model", "remove", this.removeFavHandler)
        },
        baseUpdateModel: function(e) {
            var t = T.object.clone(e),
                a = e.ext || {},
                i = a.detail_info;
            t.unSureAlert = "", t.unSureAlertColor = "", i && i.vs_content && i.vs_content.poi_status && i.vs_content.poi_status.mohushangxiaxian && (t.unSureAlert = i.vs_content.poi_status.mohushangxiaxian.text || "", t.unSureAlertColor = i.vs_content.poi_status.mohushangxiaxian.color || ""), t.unSureTip = "", t.unSureTipColor = "", i && i.vs_content && i.vs_content.gray_line && i.vs_content.gray_line.mohushangxiaxian && (t.unSureTip = i.vs_content.gray_line.mohushangxiaxian.text || "", t.unSureTipColor = i.vs_content.gray_line.mohushangxiaxian.color || ""), t.placeDetail = i, t.parsedGeo = util.parseGeo(e.geo), t.parsedGeo && (t.point = util.getPointByStr(t.parsedGeo.points), t.pointStr = t.point.lng + "|" + t.point.lat), t._hasDetail = hasDetailData(e), e.origin_id && e.origin_id.overview_guid && (t.pGuid = e.origin_id.overview_guid);
            var n = [],
                s = e.tel && e.tel.replace(/(,|;)/gi, ", ").replace("、", "<br />");
            e.addr && n.push("地址:" + e.addr + "<br/>"), s && n.push("电话:" + s), t.con = n.join(""), t.isGroupon = e.ext && e.ext.detail_info && e.ext.detail_info.groupon && T.isArray(e.ext.detail_info.groupon), t.amendUrl = a && a.detail_info && a.detail_info.point ? "http://tousu.baidu.com/map/add?place=" + encodeURIComponent(e.name) + "&lat=" + encodeURIComponent(a.detail_info.point.y) + "&lng=" + encodeURIComponent(a.detail_info.point.x) + "&uid=" + encodeURIComponent(e.uid) + "#1" : "http://tousu.baidu.com/map/add?place=" + encodeURIComponent(e.name) + "&uid=" + encodeURIComponent(e.uid) + "#1";
            var o = "";
            if (this.searchData.isnbSearch && (o = e.dis < 1e3 ? e.dis + "米" : (e.dis / 1e3).toFixed(1) + "公里"), t.dtxt = o, t.isShow3DBanner = !1, map.temp.ifSupportWebGL) {
                var r = t.uid,
                    d = map.temp.scenic3dPoints;
                if (d)
                    for (var l = 0; l < d.length; l++)
                        if (d[l].uid === r) {
                            t.isShow3DBanner = !0;
                            break
                        }
            }
            var s = e.tel,
                c = [];
            if (s && T.each(s.split("、"), function(e, t) {
                    T.each(t.split(/,|;/), function(e, t) {
                        c.push(t.replace(/\((\d+)\)/, "$1-"))
                    })
                }), t.tels = c.length ? c.join("/") : !1, t.standard = "", i && i.std_tag) {
                var h = i.std_tag.split(";").reverse()[0] || "";
                "商圈" === h && (t.standard = h)
            }
            return this.updatePanoStatus(t), this.updateFavStatus(t), this.updateTuanStatus(t), this.updateDetailStatus(t), this.updateImgStatus(t), this.initAlert(t), t
        },
        updateImgStatus: function(e) {
            var t, a = e.placeDetail;
            if (a) var i = "//webmap0.bdimg.com/client/services/thumbnails?width=132&height=104&align=center,center&quality=100&src=",
                t = a.image ? i + encodeURIComponent(a.image) : "";
            !t && e.indoor_pano && (t = e.indoor_pano), e.hImage = t
        },
        updateDetailStatus: function(e) {
            var t, a, i, n = e.ext,
                s = (this.searchData.place_info, e.uid, e.poiType, this.searchData.sCityCode, n ? n.src_name : ""),
                o = 1 == e.biz_type;
            if (e.detail && e.ty == constant.GEO_TYPE_POINT || e.poiType == constant.POI_TYPE_BUSLINE || e.poiType == constant.POI_TYPE_SUBLINE)
                if (n && ("biaozhu_data" == s && "1" == n.yw_type || searchUtil.placeRe.test(s))) {
                    if ("biaozhu_data" == s && "1" == n.yw_type) s = "ISHOP_INFO";
                    else {
                        var r = "";
                        "hospital" == s && e.business_id && (r = e.business_id), r && (t = !1, a = "keshiBusinessId")
                    }
                    i = !0
                } else 6 !== this.searchData.result.type && "aoi" != s && (i = !0);
            var d;
            i && (d = "javascript:void(0)"), e.detailUrl = d, e.hasDetail = i, e.isBiz = o
        },
        updateTuanStatus: function(e) {
            var t = e.placeDetail;
            if (T.extend(e, {
                    groupon: "",
                    takeout: "",
                    pc_bookable: "",
                    premium2: ""
                }), t) {
                e.groupon = t.groupon, e.pc_bookable = t.pc_bookable, e.premium2 = t.premium2;
                var a = t.book_info && t.book_info.coms && "takeout" === t.book_info.coms.type,
                    i = a && baidu.json.parse(t.book_info.coms.content);
                e.takeout = i;
                var n = t.pc_realtime_price || t.price;
                e.price = Math.round(n || 0)
            }
        },
        updatePanoStatus: function(e) {
            e.has360Pano = !1;
            e.hasStreetPano = !!e.pano, e.hasIndoorPano = !!e.indoor_pano
        },
        updateFavStatus: function(e) {
            var t = [],
                a = e.addr,
                i = e.tel && e.tel.replace(/(,|;)/gi, ", ").replace("、", "<br />");
            a && t.push(e.poiType == constant.POI_TYPE_BUSSTOP || e.poiType == constant.POI_TYPE_SUBSTOP ? "车次:" + a + "<br/>" : "地址:" + a + "<br/>"), i && t.push("电话:" + i), t = t.join("");
            var n = "";
            e.origin_id && e.origin_id.overview_guid && (n = e.origin_id.overview_guid);
            var s = ({
                    point: e.pointStr,
                    uid: e.uid,
                    cityCode: this.searchData.sCityCode,
                    title: e.name,
                    content: t,
                    panoGuid: n
                }, !!favMgr.getModelByUid(e.uid)),
                o = "",
                r = "加入收藏夹",
                d = r;
            s && (o = "has-faved", r = "取消收藏", d = r), e.fav = {
                favSelectedCls: o,
                favTitle: r,
                favAlt: d
            }
        },
        generateDetailUrl: function(e, t, a, i, n, s, o, r, d) {
            var l = urlConfig.DETAIL_PAGE_URL,
                c = window.location.pathname,
                h = l + (c && c.length <= 1 ? "" : window.location.pathname),
                p = "inf";
            if (window.place && window.place.placeRe.test(i) && (h += "/detail", p = "ninf"), t == constant.POI_TYPE_BUSLINE || t == constant.POI_TYPE_SUBLINE) h += "?newmap=1&t=" + map.mapType + "&s=" + encodeURIComponent("bsl&bsltp=0&uid=" + e + "&c=" + a);
            else {
                {
                    var u = map.getBounds({
                        margins: [0, 0, 0, mapConfig.leftMargin],
                        heading: 0,
                        tilt: 0
                    });
                    Math.min(u.minX, u.maxX), Math.max(u.minX, u.maxX), Math.min(u.minY, u.maxY), Math.max(u.minY, u.maxY), encodeURIComponent(window.currentComponent && window.currentComponent.curKw || "")
                }
                if (statStr = "", i) {
                    {
                        i.toUpperCase()
                    }
                    if ("ISHOP_INFO" == i && (h += "/ishop/detail.html?newmap=1&s=" + encodeURIComponent(p + "&uid=" + e + "&c=" + a)), "ISHOP_INFO_IMG" == i && (h += "/ishop/detail.html?newmap=1&s=" + encodeURIComponent(p + "&uid=" + e + "&c=" + a) + "#picresult"), "Page" == n && (h += "?qt=" + p + "&uid=" + e + statStr + "&detail=" + i, r && (h += "&business_id=" + r)), "Page_Pic" == n && (h += "?qt=" + p + "&uid=" + e + statStr + "&detail=" + i + "#picresult"), "Page_Comm" == n && (h += "?qt=" + p + "&uid=" + e + statStr + "&detail=" + i + "#comment"), "Pic_Page" == n && (h += "?qt=" + p + "&uid=" + e + statStr + "&detail=" + i), "Info_Page" == n && (h += "?qt=" + p + "&uid=" + e + statStr + "&detail=" + i), "page_discount" == n && (h += "?qt=" + p + "&uid=" + e + statStr + "&detail=" + i + "&dstype=discount"), "groupon" == n || "premium" === n || "comment" === n) {
                        var m = {
                            comment: "newComments",
                            premium: "premiumAndGroupon",
                            groupon: "premiumAndGroupon"
                        };
                        h += "?qt=" + p + "&uid=" + e + statStr + "&detail=" + i + "#" + m[n]
                    }
                    "announcement" == n && (h += "?qt=" + p + "&uid=" + e + statStr + "&detail=" + i + "&antype=1#announcement"), ("movie_book" == n || "movie_film" == n || "movie_info" == n || "movie_more" == n) && (h += location.href.match(/sfrom=shuangdan/g) ? "?qt=" + p + "&uid=" + e + statStr + "&detail=" + i + (o ? "&target=" + o : "") + "&channel=shuangdan" + (o ? "#schedule-" + o : "#showTable") : "?qt=" + p + "&uid=" + e + statStr + "&sfrom=pc_detail&detail=" + i + (o ? "&target=" + o : "") + (o ? "#schedule-" + o : "#showTable")), "venue" == n && (h += "?qt=" + p + "&uid=" + e + statStr + "&detail=" + i + "#venue"), "other_opera" == n && (h += "?qt=" + p + "&uid=" + e + statStr + "&detail=" + i + "#schedule"), ("ota" == n || "hotel" == n) && (h += "?qt=" + p + "&uid=" + e + statStr + "&detail=" + i + (o ? "&" + o : "") + "#otalist"), "scope" == n && (h += "?qt=" + p + "&uid=" + e + statStr + "&detail=" + i + (o ? "&" + o : "") + "#otalist"), "cater_book" == n && (h += "?qt=" + p + "&uid=" + e + statStr + "&detail=" + i + (o ? "&" + o : "") + "#order-seat"), /activity_/.test(n) && (h += "?qt=" + p + "&uid=" + e + statStr + "&detail=" + i + (o ? "&" + o : "") + "#" + n)
                } else h += "?newmap=1&t=" + map.mapType + "&s=" + encodeURIComponent("inf&uid=" + e + "&c=" + a + "&it=" + (STAT_CODE.STAT_INF_NORMAL || ""))
            }
            return h += "&from=list", ("cater" === i || "life" === i && d !== !0 || "shopping" === i || "beauty" === i || "hospital" === i) && (h += "&ugc_ver=1"), "scope" !== i && "hotel" !== i && (h += "&ugc_ver=1"), h
        },
        getBaseConfig: function() {
            return {
                marker: {
                    common: {
                        image: constant.A_J_MARKER_IMG_NEW,
                        size: constant.A_J_MARKER_RED_SIZE,
                        offset: constant.A_J_MARKER_RED_OFFSET,
                        imageOffset: new BMap.Size(constant.A_J_MARKER_RED_ICON_WID * this.showIndex, 0),
                        infoWindowOffset: constant.A_J_MARKER_INFOWND_OFFSET,
                        imageSize: new BMap.Size(constant.A_J_MARKER_IMG_NEW_WIDTH, constant.A_J_MARKER_IMG_NEW_HEIGHT),
                        srcSet: constant.A_J_MARKER_IMG_NEW2X_SRCSET
                    },
                    highlight: {
                        image: constant.A_J_MARKER_IMG_NEW,
                        size: constant.A_J_MARKER_BLUE_SIZE,
                        offset: constant.A_J_MARKER_BLUE_OFFSET,
                        imageOffset: new BMap.Size(constant.A_J_MARKER_BLUE_ICON_WID * this.showIndex, constant.A_J_MARKER_BLUE_ICON_Y),
                        infoWindowOffset: constant.A_J_MARKER_INFOWND_OFFSET,
                        imageSize: new BMap.Size(constant.A_J_MARKER_IMG_NEW_WIDTH, constant.A_J_MARKER_IMG_NEW_HEIGHT),
                        srcSet: constant.A_J_MARKER_IMG_NEW2X_SRCSET
                    },
                    clicked: {
                        image: constant.A_J_MARKER_IMG_NEW,
                        size: constant.A_J_MARKER_CLICK_SIZE,
                        offset: constant.A_J_MARKER_CLICK_OFFSET,
                        imageOffset: new BMap.Size(constant.A_J_MARKER_CLICK_ICON_WID * this.showIndex, constant.A_J_MARKER_CLICK_ICON_Y),
                        infoWindowOffset: constant.A_J_MARKER_INFOWND_OFFSET,
                        imageSize: new BMap.Size(constant.A_J_MARKER_IMG_NEW_WIDTH, constant.A_J_MARKER_IMG_NEW_HEIGHT),
                        srcSet: constant.A_J_MARKER_IMG_NEW2X_SRCSET
                    }
                }
            }
        },
        generateMarker: function() {
            if (this.model.poiType !== constant.POI_TYPE_BUSLINE && this.model.poiType !== constant.POI_TYPE_SUBLINE) {
                var e = this,
                    t = mapUtil.addSearchPoi(this.model.point, this.showIndex, this.model.name, {
                        type: "damoce" === this.businessType ? "groupon" : "normal",
                        uid: this.model.uid,
                        ext_type: this.model.ext_type,
                        origin_id: this.model.origin_id || {}
                    });
                if ("undefined" != typeof t) return e.searchIndex === e.searchData.result.count - 1 && ("B_EARTH_MAP" === map.getMapType() || "webgl" === map._renderType ? listener.trigger("search.poi." + e.searchData.guid, "lastanimationend") : util.vendorEvent(t.iconDom, "animationend", function() {
                    listener.trigger("search.poi." + e.searchData.guid, "lastanimationend")
                })), t.addEventListener("click", function() {
                    e.select(), e.showInfoWindow();
                    var t = "";
                    e.model.ext && e.model.ext.src_name && (t = e.model.ext.src_name);
                    var a = STAT_CODE.STAT_MAP_SELECT;
                    11 != e.searchData.result.type && (a = STAT_CODE.STAT_GR_MARKER_CLICK), addStat(a, {
                        n: e.index,
                        uid: e.model.uid,
                        category: t,
                        ct: "mk"
                    });
                    var i = e.searchData.result && e.searchData.result.page_num || 0;
                    addStat("poisearch.item.marker", "click", {
                        list_page: i,
                        list_index: e.index,
                        da_trd: e.searchData.trdName,
                        d_stat: e.searchData.damoceStat,
                        s_from: e.searchData.searchFrom,
                        wd: e.searchData.wd,
                        std_tag: e.model.std_tag,
                        uid: e.model.uid
                    })
                }), t.addEventListener("mouseover", function() {
                    e.highlightMarker(), e.highlightItem()
                }), t.addEventListener("mouseout", function() {
                    e.isSelected() || (e.unhighlightMarker(), e.unhighlightItem())
                }), t.highlight = this.highlightMarker.bind(this), t.unhighlight = this.unhighlightMarker.bind(this), t
            }
        },
        generateInfoWnd: function(e) {
            var t = (this.model.topic || "", this.model.date || "", e.createCommonInfoWindow(this.infoWindowContent, {
                    cityCode: this.sCityCode,
                    x: this.model.point.lng,
                    y: this.model.point.lat,
                    uid: this.model.uid
                })),
                a = this;
            return t && (t._aIndex = this.index, t.addEventListener("open", function() {
                var e = "poisearch.item.infowin",
                    t = a.searchData.result && a.searchData.result.page_num || 0;
                addStat(e, "show", {
                    list_page: t,
                    list_index: a.index,
                    da_trd: a.searchData.trdName,
                    d_stat: a.searchData.damoceStat,
                    s_from: a.searchData.searchFrom
                })
            }), this.searchData.isGRequest && (t.addEventListener("close", function() {
                window.GRControll.openedMarker = null
            }), t.addEventListener("open", function() {
                window.GRControll.openedMarker = {
                    uid: a.model.uid,
                    geo: a.model.geo,
                    name: a.model.name
                }
            }))), t
        },
        poiitemClick: function() {
            this.select();
            var e = "";
            this.model.ext && this.model.ext.src_name && (e = this.model.ext.src_name);
            var t = STAT_CODE.STAT_PANEL_SELECT;
            11 != this.searchData.result.type && (t = STAT_CODE.STAT_GR_ITEM_CLICK), addStat(t, {
                n: this.index,
                uid: this.model.uid,
                category: e
            }), this.addSEMStatLog()
        },
        addSEMStatLog: function() {
            if (this.model && this.searchData.result) {
                var e = this.model,
                    t = this.searchData.result;
                if (e.ad_logs) addStat("poilist.bizsem.click", "click", {
                    ad_logs: e.ad_logs,
                    pos: this.index
                });
                else if (t && t.lbs_forward && t.lbs_forward.param && t.lbs_forward.param.length > 0) {
                    var a = t.lbs_forward.param.length - 1,
                        i = t.lbs_forward.param[a];
                    i.ad_page_logs && addStat("poilist.bizsem.click", "click", {
                        ad_page_logs: i.ad_page_logs,
                        pos: this.index
                    })
                }
            }
        },
        poiitemMouseenter: function() {
            this.highlightMarker()
        },
        poiitemMouseleave: function() {
            this.isSelected() || this.unhighlightMarker()
        },
        highlightMarker: function() {
            this.marker && (this.marker.setIcon(this.getIcon(this.config.marker.highlight)), this.marker.setTop(!0))
        },
        unhighlightMarker: function() {
            this.marker && (this.marker.setIcon(this.getIcon(this.config.marker.common)), this.marker.setTop(!1))
        },
        clickMarker: function() {
            this.marker && (this.marker.setIcon(this.getIcon(this.config.marker.clicked)), this.marker.setTop(!0), map.setCenter(this.marker.point))
        },
        cancelClickMarker: function() {
            this.marker && (this.marker.setIcon(this.getIcon(this.config.marker.common)), this.marker.setTop(!0))
        },
        highlightItem: function() {
            this.$el.addClass("hover")
        },
        unhighlightItem: function() {
            this.$el.removeClass("hover")
        },
        getIcon: function(e) {
            return new BMap.Icon(e.image, e.size, {
                anchor: e.offset,
                imageOffset: e.imageOffset,
                infoWindowOffset: e.infoWindowOffset,
                imageSize: e.imageSize,
                srcSet: e.srcSet
            })
        },
        activate: function(e) {
            this.isActive() || (this.showGEO(e), this.active = !0, listener.trigger("search.module", "activate", {
                index: this.index
            }))
        },
        select: function(e) {
            return this.isSelected() && !this.childSelect && this.poiDetailCard ? void this.poiDetailCard.unfoldCard() : (this.highlightMarker(), this.highlightItem(), this.clickMarker(), e || (this.showInfoWindow(), this.loadPoiDetail()), this.selected = !0, void(bridge.selectModule = this))
        },
        cancelSelect: function() {
            this.isSelected() && (this.childSelect || (this.cancelClickMarker(), this.unhighlightMarker(), this.unhighlightItem(), this.slideUpLastRow(), this.infoWnd && this.infoWnd.close(), this.selected = !1))
        },
        loadPoiDetail: function() {
            var e = this,
                t = this.data.uid,
                a = require("poidetail:widget/libs/poiDetailMgr/poiDetailMgr.js");
            a.create({
                uid: t
            }, {
                withMarker: !0,
                marker: e.marker
            }).then(function(a) {
                var i = a.data.content.ext.detail_info.guoke_geo && a.data.content.ext.detail_info.guoke_geo.geo ? a.data.content.ext.detail_info.guoke_geo.geo : "";
                e.data.profile_geo = i;
                var n = a.poiDetailCard;
                e.isActive() || e.activate(), n.addEventListener("unload", function() {
                    e.deactivate()
                }), e.infoWnd && n.setInfoWindow(e.infoWnd), e.poiDetailCard = n, listener.trigger("poisearch", "poidetailshow", {
                    uid: t
                })
            }, function() {})
        },
        deactivate: function() {
            this.isActive() && (this.isSelected() && this.cancelSelect(), this.clearGEO(), this.active = !1)
        },
        isActive: function() {
            return this.active
        },
        isSelected: function() {
            return this.selected
        },
        showGEO: function(e) {
            switch (this.model.ty) {
                case constant.GEO_TYPE_AREA:
                    this.showArea();
                    break;
                case constant.GEO_TYPE_LINE:
                    this.showLine();
                    break;
                case constant.GEO_TYPE_POINT:
            }
            this.model.poi_profile && this.showPoiArea({
                isInit: e
            })
        },
        clearGEO: function() {
            this.clearArea(), this.clearLine()
        },
        showPoiArea: function(e) {
            if (this.polygons.length)
                for (var t = 0; t < this.polygons.length; t++) map.addOverlay(this.polygons[t]);
            else this.getAreaDataAndShow(e)
        },
        getAreaDataAndShow: function(e) {
            var t = this;
            t.active = !0, listener.trigger("search.module", "activate", {
                index: t.index
            }), e = e || {};
            var a = t.data || {},
                i = a.profile_geo || "",
                n = util.parseGeo(i);
            n = n.points;
            var s = [],
                o = mapUtil.addArea(n, constant.AREA_TYPE_POI);
            t.polygons.push(o), mapUtil.addAdministrationArea(o);
            for (var r = n.split(";"), d = 0, l = r.length; l > d; d++) s.push(new BMap.Point(parseFloat(r[d].split(",")[0]), parseFloat(r[d].split(",")[1])));
            e.isInit && (window.GRControll.isGRequest || listener.trigger("search.module", "defaultgeo", {
                points: s
            }))
        },
        showArea: function() {},
        clearArea: function() {
            for (var e = 0, t = this.polygons.length; t > e; e++) mapUtil.removeArea(this.polygons[e]);
            mapUtil.clearAdministrationArea()
        },
        showLine: function(e) {
            if (this.polylines.length)
                for (var t = 0; t < this.polylines.length; t++) map.addOverlay(this.polylines[t]);
            else this.getLineDataAndShow(e)
        },
        getLineDataAndShow: function(e) {
            var t = this;
            e = e || {}; {
                var a = t.data || {},
                    i = a.profile_geo || "",
                    n = util.parseGeo(i),
                    s = [];
                n.bound
            }
            if ("string" == typeof n.points) {
                t.polylines.push(mapUtil.addRoute(n.points));
                for (var o = n.points.split(";"), r = 0, d = o.length; d > r; r++) {
                    var l = o[r].split(",");
                    s.push(new BMap.Point(l[0], l[1]))
                }
            } else
                for (var r = 0, d = n.points.length; d > r; r++)
                    if (n.points[r]) {
                        t.polylines.push(mapUtil.addRoute(n.points[r]));
                        for (var c = n.points[r].split(";"), h = 0, p = c.length; p > h; h++) s.push(new BMap.Point(parseFloat(c[h].split(",")[0]), parseFloat(c[h].split(",")[1])))
                    }
            mapUtil.setViewport(s, 10)
        },
        clearLine: function() {
            for (var e = 0, t = this.polylines.length; t > e; e++) mapUtil.removeRoute(this.polylines[e])
        },
        showInfoWindow: function(e) {
            var t = this;
            util.loadSearchSimpleInfo(function(a) {
                t.loadInfoWindow(a, {
                    notMove: e
                })
            })
        },
        loadInfoWindow: function(e, t) {
            var a = this;
            t = t || {}, t.from = "poisearch";
            var i = map.pointToPixel(this.model.point);
            i && !a.searchData.isGRequest && (i.y = i[1] = i.y - 60, map.setCenter(map.pixelToPoint(i))), this.infoWnd = this.generateInfoWnd(e), this.infoWnd && e.openSearchInfoWndPOI(this.infoWnd, this.marker, t)
        },
        setExtArea: function(e, t) {
            !e || e && !e.content || (t = t || {})
        },
        favClick: function(e) {
            var t = T(e.directTarget),
                a = t.offset();
            t.hasClass("has-faved") ? favMgr.removeFav(this.model.uid, "uid") : (favMgr.addFav(1, {
                uid: this.model.uid,
                name: this.model.name,
                x: this.model.point.lng,
                y: this.model.point.lat
            }), listener.trigger("searchModule.fav", "click", {
                pos: a
            }), addStat("newfav.poi.addfromlist", "click", {})), addStat(STAT_CODE.STAT_FAV_LIST_BTN)
        },
        phoneClick: function(e) {
            sms.ready(e.target, this.model.uid, this.model.poiType, this.searchData.sCityCode, "list"), addStat(STAT_CODE.STAT_SHOUJI_SEND)
        },
        messageClick: function(e) {
            sms.ready(e.target, this.model.uid, this.model.poiType, this.searchData.sCityCode, "list", null, {
                name: this.model.name,
                addr: this.model.addr
            })
        },
        shareClick: function(e) {
            BShare._open(e, {
                from: "poishare",
                linkinfo: {
                    poiShareUid: this.model.uid
                }
            })
        },
        streetPanoClick: function(e) {
            e.stopPropagation();
            var t = {
                uid: this.model.uid,
                index: this.index,
                addr: this.model.addr,
                from: "list",
                wd: this.searchData.wd
            };
            PanoInterface.showPano({
                panoId: this.model.sid,
                research: !0,
                panoType: "street",
                searchParam: t,
                from: "PoiSearch"
            }), addStat(STAT_CODE.STAT_PANORAMA, {
                catalog: "list",
                item: "street",
                func: "click"
            });
            var a = STAT_CODE.STAT_PANEL_SELECT;
            11 != this.searchData.result.type && (a = STAT_CODE.STAT_GR_ITEM_CLICK), addStat(a, {
                ct: "list_page_street"
            })
        },
        indoorPanoClick: function() {
            var e = this.model,
                t = {
                    uid: e.uid,
                    from: "list",
                    wd: this.searchData.wd
                };
            PanoInterface.showPano({
                panoId: e.sid,
                research: !0,
                panoType: "inter",
                searchParam: t
            }), addStat(STAT_CODE.STAT_PANORAMA, {
                catalog: "list",
                item: "inter",
                func: "click"
            })
        },
        banner3dClick: function() {
            for (var e = this.model, t = e.uid, a = map.temp.scenic3dPoints, i = 0; i < a.length; i++)
                if (t === a[i].uid) {
                    addStat("gotoscenic3dpage.poilistbanner", "click"), listener.trigger("toScenic3DPage", "click", {
                        uid: t,
                        from: "poilistbanner"
                    });
                    break
                }
        },
        toClick: function() {
            var e = this.model.name,
                t = this.model.cp;
            searchbox.setState("route", {
                end: {
                    wd: e,
                    uid: this.model.uid,
                    pt: this.model.pointStr.replace("|", ",")
                }
            }), "bus" === t && window.addStat("bus.gothere.to", "show"), window.addStat("searchbox.gothere.to", "show", {
                da_trd: this.searchData.trdName,
                d_stat: this.searchData.damoceStat,
                s_from: this.searchData.searchFrom
            })
        },
        fromClick: function() {
            var e = this.model.name,
                t = this.model.cp;
            searchbox.setState("route", {
                start: {
                    wd: e,
                    uid: this.model.uid,
                    pt: this.model.pointStr.replace("|", ",")
                }
            }), "bus" === t && window.addStat("bus.gothere.from", "show"), window.addStat("searchbox.gothere.from", "show", {
                da_trd: this.searchData.trdName,
                d_stat: this.searchData.damoceStat,
                s_from: this.searchData.searchFrom
            })
        },
        slideUpLastRow: function() {
            var e = this.$el.find(".l-row");
            e.hide().height(0), this.hasSlideDown = !1
        },
        slideDownLastRow: function() {
            var e = this.$el.find(".l-row");
            bridge && bridge.selectModule && bridge.selectModule !== this && bridge.selectModule.slideUpLastRow(), this.hasSlideDown = !0, e.show().animate({
                height: 24
            }, 200), addStat("searchbox.gothere.show", "show")
        }
    }), module.exports = BaseSearch
});;
define("common:widget/search/modules/caterSearchModule/inc.js", function(require, exports, module) {
    function CaterSearch() {
        BaseSearch.apply(this, arguments), this.businessType = "cater", this.caterUpdateModel(this.model)
    }
    var BaseSearch = require("common:widget/search/modules/baseSearchModule/inc.js"),
        util = require("common:widget/ui/util/util.js"),
        place = require("common:widget/ui/place/placeDetail.js"),
        constant = require("common:widget/ui/constant/Constant.js"),
        searchUtil = require("common:widget/search/SearchUtil.js"),
        config = require("common:widget/ui/config/config.js"),
        MapConfig = config.mapConfig,
        modelConfig = config.modelConfig,
        urlConfig = config.urlConfig,
        NOPIC = "//webmap1.bdimg.com/wolfman/static/common/images/nopic_96d29d1.gif";
    T.inherits(CaterSearch, BaseSearch, "CaterSearch"), T.object.extend(CaterSearch.prototype, {
        render: function() {
            try {
                var model = this.model;
                this.template = [function(_template_object) {
                    var _template_fun_array = [],
                        fn = function(__data__) {
                            var _template_varName = "";
                            for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                            eval(_template_varName), _template_fun_array.push('<li data-index="', "undefined" == typeof(index + 1) ? "" : index + 1, '" data-searchindex="', "undefined" == typeof searchIndex ? "" : searchIndex, '" class="search-item cater-item" map-on-click="poiitem" map-on-mouseenter="poiitem" map-on-mouseleave="poiitem" data-stat-code="poisearch.item.item;poisearch.cater.item', "undefined" == typeof(3 > searchIndex ? ";poisearch.cater.topitem" : "") ? "" : 3 > searchIndex ? ";poisearch.cater.topitem" : "", '">    <div class="cf mb_5">        <div class="col-l">            <a href="javascript:void(0)" class="no-', "undefined" == typeof(showIndex + 1) ? "" : showIndex + 1, '"></a>        </div>        <div class="col-r">            <div class="mt_5 h_20">            '), dtxt && _template_fun_array.push('            <span class="n-grey">', "undefined" == typeof dtxt ? "" : dtxt, "</span>"), _template_fun_array.push(""), has360Pano && _template_fun_array.push('<a href="javascript:void(0)" title="360实景" class="pano-360" map-on-click="360Pano">&nbsp;</a>'), _template_fun_array.push(""), hasStreetPano && _template_fun_array.push('<a href="javascript:void(0)" class="camera-icon street-pano ml_5" map-on-click="streetPano" data-index="', "undefined" == typeof(index + 1) ? "" : index + 1, '" data-stat-code="poisearch.cater.pano" stop-propagation="true">&nbsp;</a>'), _template_fun_array.push('            </div>            <div class="img-wrap">                '), hasIndoorPano ? _template_fun_array.push('                    <a href="javascript:void(0)"  map-on-click="indoorPano" data-index="', "undefined" == typeof(index + 1) ? "" : index + 1, '" data-stat-code="poisearch.cater.image">                        <img src="', "undefined" == typeof hImage ? "" : hImage, '" class="hasIndoorPano" style="width:71px;height:58px;" />                        <span title="内部环境" class="indoor-pano">内部环境</span>                    </a>                ') : _template_fun_array.push('                    <a href="', "undefined" == typeof detailUrl ? "" : detailUrl, '" data-index="', "undefined" == typeof(index + 1) ? "" : index + 1, '" data-stat-code="poisearch.cater.image" data-detail-code="list_page_pic">                        <img src="', "undefined" == typeof hImage ? "" : hImage, '" style="width:71px;height:58px;" />                    </a>                '), _template_fun_array.push('            </div>        </div>        <div class="ml_30 mr_85">            <div class="row">                <span>                    <a href="javascript:void(0)" class="n-blue" data-index="', "undefined" == typeof(index + 1) ? "" : index + 1, '" data-stat-code="poisearch.cater.title" data-detail-code="list_page">', "undefined" == typeof name ? "" : name, "</a>                "), groupon && _template_fun_array.push('                    <a href="', "undefined" == typeof detailUrl ? "" : detailUrl, '" title="共有', "undefined" == typeof placeDetail.groupon.length ? "" : placeDetail.groupon.length, '条团购信息" class="tuan" data-index="', "undefined" == typeof(index + 1) ? "" : index + 1, '" data-stat-code="poisearch.cater.tuan" data-detail-code="list_groupon">团</a>                '), _template_fun_array.push("                "), takeout && _template_fun_array.push('                    <a href="javascript:void(0);" title="', "undefined" == typeof takeout.tips ? "" : takeout.tips, '" class="wai">外</a>                '), _template_fun_array.push("                "), pc_bookable && _template_fun_array.push('                    <a href="', "undefined" == typeof detailUrl ? "" : detailUrl, '" title="本店支持在线订座" class="ding" data-index="', "undefined" == typeof(index + 1) ? "" : index + 1, '" data-stat-code="poisearch.cater.ding" data-detail-code="list_cater_book">订</a>                '), _template_fun_array.push("                "), premium2 && premium2.length && _template_fun_array.push('                    <a href="', "undefined" == typeof detailUrl ? "" : detailUrl, '" title="共有', "undefined" == typeof placeDetail.premium2.length ? "" : placeDetail.premium2.length, '条优惠信息" class="hui" data-index="', "undefined" == typeof(index + 1) ? "" : index + 1, '" data-stat-code="poisearch.cater.hui" data-detail-code="list_page_discount">惠</a>                '), _template_fun_array.push("                </span>            </div>            "), alertMsg && _template_fun_array.push('                <div class="row l-grey">                    <span class="alrt"></span>', "undefined" == typeof alertMsg.alert ? "" : alertMsg.alert, '<a href="', "undefined" == typeof alertMsg.alertUrl ? "" : alertMsg.alertUrl, '" title="报错" target="_blank">欢迎报错</a>                </div>            '), _template_fun_array.push('            <div class="row">                <span class="score">                    <b style="width:', "undefined" == typeof scoreWidth ? "" : scoreWidth, 'px"></b>                </span                >', "undefined" == typeof placeDetail.tag ? "" : placeDetail.tag, "                "), price && _template_fun_array.push('                    <i class="seperate">|</i                    >人均 <span class="d-red"><strong>', "undefined" == typeof unescape("%A5") ? "" : unescape("%A5"), "</strong>", "undefined" == typeof price ? "" : price, "</span>                "), _template_fun_array.push("                "), unSureAlert && _template_fun_array.push('                    <span style="color:', "undefined" == typeof unSureAlertColor ? "" : unSureAlertColor, '">                        ', "undefined" == typeof unSureAlert ? "" : unSureAlert, "                    </span>                "), _template_fun_array.push('            </div>            <div class="row addr">                <span class="n-grey" title="', "undefined" == typeof addr ? "" : addr, '">', "undefined" == typeof addr ? "" : addr, "</span>            </div>            "), unSureTip && _template_fun_array.push('                <div class="row unsuretip" style="color:', "undefined" == typeof unSureTipColor ? "" : unSureTipColor, '">                    <span class="unsurelogo"></span>                    ', "undefined" == typeof unSureTip ? "" : unSureTip, "                </div>            "), _template_fun_array.push('        </div>    </div>    <div class="children-container ml_30"></div>    <div class="l-row">        <span class="go">            <span map-on-click="to">                <em class=\'to-icon icon\'></em>                <i>到这去</i></span            ><span map-on-click="from">                <em class=\'from-icon icon\'></em>                <i>从这出发</i>            </span>        </span>        <span class="operate ml_5">            <a href="javascript:void(0)" class="message" title="发送到手机" map-on-click="message" data-stat-code="poisearch.message.open" clickNoBubble="true" >发送到手机</a            ><a href="javascript:void(0)"   class="fav ml_10 ', "undefined" == typeof fav.favSelectedCls ? "" : fav.favSelectedCls, '" title="', "undefined" == typeof fav.favTitle ? "" : fav.favTitle, '" map-on-click="fav" clickNoBubble="true" >&nbsp;</a            ><a href="', "undefined" == typeof amendUrl ? "" : amendUrl, '" target="_blank" title="纠错" data-index="', "undefined" == typeof(index + 1) ? "" : index + 1, '" data-stat-code="searchbox.gothere.amend" class="amend ml_10" clickNoBubble="true">&nbsp;</a>        </span>    </div></li>'), _template_varName = null
                        }(_template_object);
                    return fn = null, _template_fun_array.join("")
                }][0];
                var uid = model.uid || "";
                return uid && model.alertMsg && model.alertMsg.alertUrl && (model.alertMsg.alertUrl = "https://ugc.map.baidu.com/ifix/poiproblem/poiproblempcpage?business_trigger=11&poi_uid=" + uid), this.$el = T(this.template(this.model)), this.$el
            } catch (e) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: e.message || e.description,
                    path: "common:widget/search/modules/caterSearchModule/inc.js",
                    ln: 39
                })
            }
        },
        caterUpdateModel: function(e) {
            var a = e.ext || {},
                t = a.detail_info,
                i = "//webmap0.bdimg.com/client/services/thumbnails?width=132&height=104&align=center,center&quality=100&src=",
                n = t.image ? i + encodeURIComponent(t.image) : NOPIC;
            e.hImage = n, e.scoreWidth = Math.round(61 * t.overall_rating / 5), e.premium2 = "", this.generateBookUrl()
        },
        generateBookUrl: function() {
            {
                var e, a, t, i, n = this.model,
                    r = n.ext || {},
                    s = r.detail_info,
                    d = this.searchData.place_info;
                this.searchData.sCityCode
            }
            searchUtil.isMovie(n) ? (e = s.book_info ? "movie_book" : "Info_Page", a = "购票", t = 1 == s.is_gwj && s.activity_gwj && 1 == s.activity_gwj.is_book ? "movieOrderBtnGWJ" : "movieOrderBtnSmall", i = d.d_business_id || "") : (e = searchUtil.isScenery(n) ? "scope" : "cater_book", a = "订座", t = "list");
            var o = "javascript:void(0)";
            n.bookUrl = o
        }
    }), module.exports = CaterSearch
});;
define("common:widget/search/modules/houseSearchModule/inc.js", function(require, exports, module) {
    function HouseSearch(e, t, a) {
        a && (bridge = a), View.call(this), this.data = e, this.searchData = t, this.index = e.index, this.showIndex = e.showIndex, this.searchIndex = e.searchIndex, this.model = this.baseUpdateModel(e), this.config = this.getBaseConfig(), this.active = !1, this.selected = !1, this.childSelect = !1, this.polygons = [], this.polylines = [], this.businessType = "house", this.infoWindowContent = {
            name: this.model.name
        }
    }

    function hasDetailData(e) {
        return e.detail && e.ty == constant.GEO_TYPE_POINT || e.poiType == constant.POI_TYPE_BUSLINE || e.poiType == constant.POI_TYPE_SUBLINE
    }
    var View = require("common:widget/view/View.js"),
        favMgr = require("common:widget/ui/fav/favMgr.js"),
        sms = require("common:widget/ui/sms/sms.js"),
        BShare = require("common:widget/ui/toolShare/ToolShare.js"),
        util = require("common:widget/ui/util/util.js"),
        mapUtil = require("common:widget/ui/mapUtil/mapUtil.js"),
        constant = require("common:widget/ui/constant/Constant.js"),
        searchData = require("common:widget/ui/searchData/searchData.js"),
        PanoInterface = require("pano:widget/PanoInterface/PanoInterface.js"),
        searchUtil = require("common:widget/search/SearchUtil.js"),
        searchbox = require("common:widget/ui/searchBox/searchBox.js"),
        config = require("common:widget/ui/config/config.js"),
        urlConfig = config.urlConfig,
        mapConfig = config.mapConfig,
        bridge;
    require.loadCss({
        content: ".flex{display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex}.flex-sk{-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.house-rec{padding:5px 10px 5px 0!important}.house-rec-des{text-overflow:ellipsis;overflow:hidden;white-space:nowrap}",
        name: "houseSearchModule"
    }), T.inherits(HouseSearch, View, "HouseSearch"), T.object.extend(HouseSearch.prototype, {
        render: function() {
            try {
                return this.template = [function(_template_object) {
                    var _template_fun_array = [],
                        fn = function(__data__) {
                            var _template_varName = "";
                            for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                            eval(_template_varName), _template_fun_array.push('<li data-index="', "undefined" == typeof(index + 1) ? "" : index + 1, '"  data-searchindex="', "undefined" == typeof searchIndex ? "" : searchIndex, '" class="search-item base-item" map-on-click="poiitem" map-on-mouseenter="poiitem" map-on-mouseleave="poiitem" data-stat-code="poisearch.item.item;poisearch.all.item', "undefined" == typeof(3 > searchIndex ? ";poisearch.all.topitem" : "") ? "" : 3 > searchIndex ? ";poisearch.all.topitem" : "", '">    <div class="cf">        <div class="col-l">            <a href="javascript:void(0)" class="no-', "undefined" == typeof(showIndex + 1) ? "" : showIndex + 1, '"></a>        </div>                '), hImage && (_template_fun_array.push('            <div class="col-r">                <div class="mt_5 h_20">'), dtxt && _template_fun_array.push('<span class="n-grey">', "undefined" == typeof dtxt ? "" : dtxt, "</span>"), _template_fun_array.push(""), has360Pano && _template_fun_array.push('<a href="javascript:void(0)" title="360实景" class="pano-360" map-on-click="360Pano">&nbsp;</a>'), _template_fun_array.push(""), hasStreetPano && _template_fun_array.push('<a href="javascript:void(0)" class="camera-icon street-pano ml_5" stop-propagation="true" map-on-click="streetPano" data-index="', "undefined" == typeof(index + 1) ? "" : index + 1, '" data-stat-code="poisearch.all.pano" >&nbsp;</a>'), _template_fun_array.push('                </div>                <div class="img-wrap">                '), hasIndoorPano ? _template_fun_array.push('                    <a href="javascript:void(0)"  map-on-click="indoorPano" data-index="', "undefined" == typeof(index + 1) ? "" : index + 1, '" data-stat-code="poisearch.all.image">                        <img src="', "undefined" == typeof hImage ? "" : hImage, '" class="hasIndoorPano" style="width:71px;height:58px;" />                        <span title="内部环境" class="indoor-pano">内部环境</span>                    </a>                ') : _template_fun_array.push('                    <a href="', "undefined" == typeof detailUrl ? "" : detailUrl, '" data-index="', "undefined" == typeof(index + 1) ? "" : index + 1, '" data-stat-code="poisearch.all.image" data-detail-code="list_page_pic">                        <img src="', "undefined" == typeof hImage ? "" : hImage, '" style="width:71px;height:58px;" />                    </a>                '), _template_fun_array.push("                </div>            </div>        ")), _template_fun_array.push("        ");
                            var rClass = hImage ? "mr_90" : "";
                            _template_fun_array.push('        <div class="ml_30 ', "undefined" == typeof rClass ? "" : rClass, '">            <div class="row">                <span>                <a href="javascript:void(0);" class="n-blue" data-index="', "undefined" == typeof(index + 1) ? "" : index + 1, '" data-stat-code="poisearch.all.title">', "undefined" == typeof name ? "" : name, "</a>                "), isBiz && _template_fun_array.push('                    <span class="n-grey">推广</span>                '), _template_fun_array.push("                </span>                "), hImage || (_template_fun_array.push("                    <span class='span_right'>"), dtxt && _template_fun_array.push('<span class="n-grey">', "undefined" == typeof dtxt ? "" : dtxt, "</span>"), _template_fun_array.push(""), has360Pano && _template_fun_array.push('<a href="javascript:void(0)" title="360实景" class="pano-360" map-on-click="360Pano">&nbsp;</a>'), _template_fun_array.push(""), hasStreetPano && _template_fun_array.push('<a href="javascript:void(0)" title="全景" class="camera-icon street-pano ml_5" map-on-click="streetPano">&nbsp;</a>'), _template_fun_array.push("                    </span>                ")), _template_fun_array.push("                <span>                "), groupon && _template_fun_array.push('                    <a href="', "undefined" == typeof detailUrl ? "" : detailUrl, '" title="共有', "undefined" == typeof placeDetail.groupon.length ? "" : placeDetail.groupon.length, '条团购信息" class="tuan" data-index="', "undefined" == typeof(index + 1) ? "" : index + 1, '" data-stat-code="poisearch.all.tuan" data-detail-code="list_groupon">团</a>                '), _template_fun_array.push("                "), takeout && _template_fun_array.push('                    <a href="', "undefined" == typeof detailUrl ? "" : detailUrl, '" title="', "undefined" == typeof takeout.tips ? "" : takeout.tips, '" class="wai">外</a>                '), _template_fun_array.push("                "), pc_bookable && _template_fun_array.push('                    <a href="', "undefined" == typeof detailUrl ? "" : detailUrl, '" title="本店支持在线订座" class="ding">订</a>                '), _template_fun_array.push("                "), premium2 && premium2.length && _template_fun_array.push('                    <a href="', "undefined" == typeof detailUrl ? "" : detailUrl, '" title="共有', "undefined" == typeof placeDetail.premium2.length ? "" : placeDetail.premium2.length, '条优惠信息" class="hui" data-detail-code="list_page_discount">惠</a>                '), _template_fun_array.push("                </span>            </div>            "), alertMsg && _template_fun_array.push('                <div class="row l-grey">                    <span class="alrt"></span>', "undefined" == typeof alertMsg.alert ? "" : alertMsg.alert, '<a href="', "undefined" == typeof alertMsg.alertUrl ? "" : alertMsg.alertUrl, '" title="报错" target="_blank">欢迎报错</a>                </div>            '), _template_fun_array.push("            "), standard && _template_fun_array.push('            <div class="row">                <span>                    ', "undefined" == typeof standard ? "" : standard, "                </span>            </div>            "), _template_fun_array.push('            <div class="row addr">                <span class="n-grey" title="', "undefined" == typeof addr ? "" : addr, '">', "undefined" == typeof addr ? "" : addr, "</span>                "), unSureAlert && _template_fun_array.push('                    <span style="color:', "undefined" == typeof unSureAlertColor ? "" : unSureAlertColor, '">                        ', "undefined" == typeof unSureAlert ? "" : unSureAlert, "                    </span>                "), _template_fun_array.push("            </div>            "), tels && _template_fun_array.push('                <div class="row tel">                    电话:', "undefined" == typeof tels ? "" : tels, "                </div>            "), _template_fun_array.push("            "), recommend && _template_fun_array.push('                <div class="row flex house-rec">                    <span class="flex-sk" style="color:#F44336">[精选户型]</span>                    <span class="house-rec-des">', "undefined" == typeof recommend.text ? "" : recommend.text, '</span>                    <span class="flex-sk" style="color:#3385FF;margin-left:auto;">查看更多></span>                </div>            '), _template_fun_array.push('            <div class="children-container row"></div>            '), unSureTip && _template_fun_array.push('                <div class="row unsuretip" style="color:', "undefined" == typeof unSureTipColor ? "" : unSureTipColor, '">                    <span class="unsurelogo"></span>                    ', "undefined" == typeof unSureTip ? "" : unSureTip, "                </div>            "), _template_fun_array.push("        </div>    </div>    "), isShow3DBanner && _template_fun_array.push('        <div class="banner-3d" map-on-click="banner3d">进入3D地图</div>    '), _template_fun_array.push('    <div class="l-row">        <span class="go">            <span map-on-click="to">                <em class=\'to-icon icon\'></em>                <i>到这去</i></span            ><span map-on-click="from">                <em class=\'from-icon icon\'></em>                <i>从这出发</i>            </span>        </span>        <span class="operate ml_5">            <a href="javascript:void(0)" class="message" title="发送到手机" map-on-click="message" data-stat-code="poisearch.message.open" clickNoBubble="true" >发送到手机</a            ><a href="javascript:void(0)"   class="fav ml_10 ', "undefined" == typeof fav.favSelectedCls ? "" : fav.favSelectedCls, '" title="', "undefined" == typeof fav.favTitle ? "" : fav.favTitle, '" map-on-click="fav" clickNoBubble="true" >&nbsp;</a            ><a href="', "undefined" == typeof amendUrl ? "" : amendUrl, '" target="_blank" title="纠错" data-index="', "undefined" == typeof(index + 1) ? "" : index + 1, '" data-stat-code="searchbox.gothere.amend" class="amend ml_10" clickNoBubble="true">&nbsp;</a>        </span>    </div></li>'), _template_varName = null
                        }(_template_object);
                    return fn = null, _template_fun_array.join("")
                }][0], this.$el = T(this.template(this.model)), this.$el
            } catch (e) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: e.message || e.description,
                    path: "common:widget/search/modules/houseSearchModule/inc.js",
                    ln: 71
                })
            }
        },
        initialize: function() {
            try {
                this.bindEvents(), this.marker = this.generateMarker()
            } catch (e) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: e.message || e.description,
                    path: "common:widget/search/modules/houseSearchModule/inc.js",
                    ln: 89
                })
            }
        },
        initializeAfterRender: function() {
            try {} catch (e) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: e.message || e.description,
                    path: "common:widget/search/modules/houseSearchModule/inc.js",
                    ln: 92
                })
            }
        },
        initAlert: function(e) {
            var t = (this.data.ext ? this.data.ext.detail_info : {}, ""),
                a = "",
                i = e.uid || "";
            switch (this.data.status) {
                case 1:
                    break;
                case 2:
                    break;
                case 4:
                    break;
                case 8:
                    break;
                case 10:
                    t = e.unSureTip ? e.unSureTip : "暂停开放";
                    break;
                case 5:
                    t = e.unSureTip ? e.unSureTip : "尚未开放";
                    break;
                case 3:
                    t = e.unSureTip ? e.unSureTip : "暂停开放";
                    break;
                case 9:
                    t = e.unSureTip ? e.unSureTip : "暂停开放";
                    break;
                case 11:
                    t = e.unSureTip ? e.unSureTip : "暂停开放"
            }
            i && (a = "https://ugc.map.baidu.com/ifix/poiproblem/poiproblempcpage?business_trigger=11&poi_uid=" + i), e.alertMsg = !this.data.suspected_flag && t ? {
                alert: t,
                alertUrl: a
            } : !1
        },
        unload: function() {
            this.clearGEO(), this.unbindEvents()
        },
        bindEvents: function() {
            var e = this;
            listener.on("search.module", "activate", this.activateHandler, this), this.addFavHandler = function(t, a) {
                for (var i = e.data.uid, n = 0; n < a.length; n++)
                    if (i == a[n].uid) {
                        e.$el.find(".fav").addClass("has-faved").attr("title", "取消收藏");
                        break
                    }
            }, this.removeFavHandler = function(t, a) {
                for (var i = e.data.uid, n = 0; n < a.length; n++)
                    if (i == a[n].uid) {
                        e.$el.find(".fav").removeClass("has-faved").attr("title", "收藏");
                        break
                    }
            }, listener.on("fav.poi.model", "add", this.addFavHandler), listener.on("fav.poi.model", "remove", this.removeFavHandler)
        },
        activateHandler: function(e, t) {
            t.index !== this.index && this.deactivate()
        },
        unbindEvents: function() {
            listener.off("search.module", "activate", this.activateHandler, this), listener.off("fav.poi.model", "add", this.addFavHandler), listener.off("fav.poi.model", "remove", this.removeFavHandler)
        },
        baseUpdateModel: function(e) {
            var t = T.object.clone(e),
                a = e.ext || {},
                i = a.detail_info;
            t.unSureAlert = "", t.unSureAlertColor = "", i && i.vs_content && i.vs_content.poi_status && i.vs_content.poi_status.mohushangxiaxian && (t.unSureAlert = i.vs_content.poi_status.mohushangxiaxian.text || "", t.unSureAlertColor = i.vs_content.poi_status.mohushangxiaxian.color || ""), t.unSureTip = "", t.unSureTipColor = "", i && i.vs_content && i.vs_content.gray_line && i.vs_content.gray_line.mohushangxiaxian && (t.unSureTip = i.vs_content.gray_line.mohushangxiaxian.text || "", t.unSureTipColor = i.vs_content.gray_line.mohushangxiaxian.color || ""), t.placeDetail = i, t.parsedGeo = util.parseGeo(e.geo), t.parsedGeo && (t.point = util.getPointByStr(t.parsedGeo.points), t.pointStr = t.point.lng + "|" + t.point.lat), t._hasDetail = hasDetailData(e), e.origin_id && e.origin_id.overview_guid && (t.pGuid = e.origin_id.overview_guid);
            var n = [],
                s = e.tel && e.tel.replace(/(,|;)/gi, ", ").replace("、", "<br />");
            e.addr && n.push("地址:" + e.addr + "<br/>"), s && n.push("电话:" + s), t.con = n.join(""), t.isGroupon = e.ext && e.ext.detail_info && e.ext.detail_info.groupon && T.isArray(e.ext.detail_info.groupon), t.amendUrl = a && a.detail_info && a.detail_info.point ? "http://tousu.baidu.com/map/add?place=" + encodeURIComponent(e.name) + "&lat=" + encodeURIComponent(a.detail_info.point.y) + "&lng=" + encodeURIComponent(a.detail_info.point.x) + "&uid=" + encodeURIComponent(e.uid) + "#1" : "http://tousu.baidu.com/map/add?place=" + encodeURIComponent(e.name) + "&uid=" + encodeURIComponent(e.uid) + "#1";
            var o = "";
            if (this.searchData.isnbSearch && (o = e.dis < 1e3 ? e.dis + "米" : (e.dis / 1e3).toFixed(1) + "公里"), t.dtxt = o, t.isShow3DBanner = !1, map.temp.ifSupportWebGL) {
                var r = t.uid,
                    d = map.temp.scenic3dPoints;
                if (d)
                    for (var l = 0; l < d.length; l++)
                        if (d[l].uid === r) {
                            t.isShow3DBanner = !0;
                            break
                        }
            }
            var s = e.tel,
                c = [];
            if (s && T.each(s.split("、"), function(e, t) {
                    T.each(t.split(/,|;/), function(e, t) {
                        c.push(t.replace(/\((\d+)\)/, "$1-"))
                    })
                }), t.tels = c.length ? c.join("/") : !1, t.standard = "", i && i.std_tag) {
                var h = i.std_tag.split(";").reverse()[0] || "";
                "商圈" === h && (t.standard = h)
            }
            var p = i.vs_content && i.vs_content.aiad_vehicles_new;
            return t.recommend = p && p.business_service_info && p.business_service_info.sug ? p.business_service_info.sug : null, this.updatePanoStatus(t), this.updateFavStatus(t), this.updateTuanStatus(t), this.updateDetailStatus(t), this.updateImgStatus(t), this.initAlert(t), t
        },
        updateImgStatus: function(e) {
            var t, a = e.placeDetail;
            if (a) var i = "//webmap0.bdimg.com/client/services/thumbnails?width=132&height=104&align=center,center&quality=100&src=",
                t = a.image ? i + encodeURIComponent(a.image) : "";
            !t && e.indoor_pano && (t = e.indoor_pano), e.hImage = t
        },
        updateDetailStatus: function(e) {
            var t, a, i, n = e.ext,
                s = (this.searchData.place_info, e.uid, e.poiType, this.searchData.sCityCode, n ? n.src_name : ""),
                o = 1 == e.biz_type;
            if (e.detail && e.ty == constant.GEO_TYPE_POINT || e.poiType == constant.POI_TYPE_BUSLINE || e.poiType == constant.POI_TYPE_SUBLINE)
                if (n && ("biaozhu_data" == s && "1" == n.yw_type || searchUtil.placeRe.test(s))) {
                    if ("biaozhu_data" == s && "1" == n.yw_type) s = "ISHOP_INFO";
                    else {
                        var r = "";
                        "hospital" == s && e.business_id && (r = e.business_id), r && (t = !1, a = "keshiBusinessId")
                    }
                    i = !0
                } else 6 !== this.searchData.result.type && "aoi" != s && (i = !0);
            var d;
            i && (d = "javascript:void(0)"), e.detailUrl = d, e.hasDetail = i, e.isBiz = o
        },
        updateTuanStatus: function(e) {
            var t = e.placeDetail;
            if (T.extend(e, {
                    groupon: "",
                    takeout: "",
                    pc_bookable: "",
                    premium2: ""
                }), t) {
                e.groupon = t.groupon, e.pc_bookable = t.pc_bookable, e.premium2 = t.premium2;
                var a = t.book_info && t.book_info.coms && "takeout" === t.book_info.coms.type,
                    i = a && baidu.json.parse(t.book_info.coms.content);
                e.takeout = i;
                var n = t.pc_realtime_price || t.price;
                e.price = Math.round(n || 0)
            }
        },
        updatePanoStatus: function(e) {
            e.has360Pano = !1;
            e.hasStreetPano = !!e.pano, e.hasIndoorPano = !!e.indoor_pano
        },
        updateFavStatus: function(e) {
            var t = [],
                a = e.addr,
                i = e.tel && e.tel.replace(/(,|;)/gi, ", ").replace("、", "<br />");
            a && t.push(e.poiType == constant.POI_TYPE_BUSSTOP || e.poiType == constant.POI_TYPE_SUBSTOP ? "车次:" + a + "<br/>" : "地址:" + a + "<br/>"), i && t.push("电话:" + i), t = t.join("");
            var n = "";
            e.origin_id && e.origin_id.overview_guid && (n = e.origin_id.overview_guid);
            var s = ({
                    point: e.pointStr,
                    uid: e.uid,
                    cityCode: this.searchData.sCityCode,
                    title: e.name,
                    content: t,
                    panoGuid: n
                }, !!favMgr.getModelByUid(e.uid)),
                o = "",
                r = "加入收藏夹",
                d = r;
            s && (o = "has-faved", r = "取消收藏", d = r), e.fav = {
                favSelectedCls: o,
                favTitle: r,
                favAlt: d
            }
        },
        generateDetailUrl: function(e, t, a, i, n, s, o, r, d) {
            var l = urlConfig.DETAIL_PAGE_URL,
                c = window.location.pathname,
                h = l + (c && c.length <= 1 ? "" : window.location.pathname),
                p = "inf";
            if (window.place && window.place.placeRe.test(i) && (h += "/detail", p = "ninf"), t == constant.POI_TYPE_BUSLINE || t == constant.POI_TYPE_SUBLINE) h += "?newmap=1&t=" + map.mapType + "&s=" + encodeURIComponent("bsl&bsltp=0&uid=" + e + "&c=" + a);
            else {
                {
                    var u = map.getBounds({
                        margins: [0, 0, 0, mapConfig.leftMargin],
                        heading: 0,
                        tilt: 0
                    });
                    Math.min(u.minX, u.maxX), Math.max(u.minX, u.maxX), Math.min(u.minY, u.maxY), Math.max(u.minY, u.maxY), encodeURIComponent(window.currentComponent && window.currentComponent.curKw || "")
                }
                if (statStr = "", i) {
                    {
                        i.toUpperCase()
                    }
                    if ("ISHOP_INFO" == i && (h += "/ishop/detail.html?newmap=1&s=" + encodeURIComponent(p + "&uid=" + e + "&c=" + a)), "ISHOP_INFO_IMG" == i && (h += "/ishop/detail.html?newmap=1&s=" + encodeURIComponent(p + "&uid=" + e + "&c=" + a) + "#picresult"), "Page" == n && (h += "?qt=" + p + "&uid=" + e + statStr + "&detail=" + i, r && (h += "&business_id=" + r)), "Page_Pic" == n && (h += "?qt=" + p + "&uid=" + e + statStr + "&detail=" + i + "#picresult"), "Page_Comm" == n && (h += "?qt=" + p + "&uid=" + e + statStr + "&detail=" + i + "#comment"), "Pic_Page" == n && (h += "?qt=" + p + "&uid=" + e + statStr + "&detail=" + i), "Info_Page" == n && (h += "?qt=" + p + "&uid=" + e + statStr + "&detail=" + i), "page_discount" == n && (h += "?qt=" + p + "&uid=" + e + statStr + "&detail=" + i + "&dstype=discount"), "groupon" == n || "premium" === n || "comment" === n) {
                        var m = {
                            comment: "newComments",
                            premium: "premiumAndGroupon",
                            groupon: "premiumAndGroupon"
                        };
                        h += "?qt=" + p + "&uid=" + e + statStr + "&detail=" + i + "#" + m[n]
                    }
                    "announcement" == n && (h += "?qt=" + p + "&uid=" + e + statStr + "&detail=" + i + "&antype=1#announcement"), ("movie_book" == n || "movie_film" == n || "movie_info" == n || "movie_more" == n) && (h += location.href.match(/sfrom=shuangdan/g) ? "?qt=" + p + "&uid=" + e + statStr + "&detail=" + i + (o ? "&target=" + o : "") + "&channel=shuangdan" + (o ? "#schedule-" + o : "#showTable") : "?qt=" + p + "&uid=" + e + statStr + "&sfrom=pc_detail&detail=" + i + (o ? "&target=" + o : "") + (o ? "#schedule-" + o : "#showTable")), "venue" == n && (h += "?qt=" + p + "&uid=" + e + statStr + "&detail=" + i + "#venue"), "other_opera" == n && (h += "?qt=" + p + "&uid=" + e + statStr + "&detail=" + i + "#schedule"), ("ota" == n || "hotel" == n) && (h += "?qt=" + p + "&uid=" + e + statStr + "&detail=" + i + (o ? "&" + o : "") + "#otalist"), "scope" == n && (h += "?qt=" + p + "&uid=" + e + statStr + "&detail=" + i + (o ? "&" + o : "") + "#otalist"), "cater_book" == n && (h += "?qt=" + p + "&uid=" + e + statStr + "&detail=" + i + (o ? "&" + o : "") + "#order-seat"), /activity_/.test(n) && (h += "?qt=" + p + "&uid=" + e + statStr + "&detail=" + i + (o ? "&" + o : "") + "#" + n)
                } else h += "?newmap=1&t=" + map.mapType + "&s=" + encodeURIComponent("inf&uid=" + e + "&c=" + a + "&it=" + (STAT_CODE.STAT_INF_NORMAL || ""))
            }
            return h += "&from=list", ("cater" === i || "life" === i && d !== !0 || "shopping" === i || "beauty" === i || "hospital" === i) && (h += "&ugc_ver=1"), "scope" !== i && "hotel" !== i && (h += "&ugc_ver=1"), h
        },
        getBaseConfig: function() {
            return {
                marker: {
                    common: {
                        image: constant.A_J_MARKER_IMG_NEW,
                        size: constant.A_J_MARKER_RED_SIZE,
                        offset: constant.A_J_MARKER_RED_OFFSET,
                        imageOffset: new BMap.Size(constant.A_J_MARKER_RED_ICON_WID * this.showIndex, 0),
                        infoWindowOffset: constant.A_J_MARKER_INFOWND_OFFSET,
                        imageSize: new BMap.Size(constant.A_J_MARKER_IMG_NEW_WIDTH, constant.A_J_MARKER_IMG_NEW_HEIGHT),
                        srcSet: constant.A_J_MARKER_IMG_NEW2X_SRCSET
                    },
                    highlight: {
                        image: constant.A_J_MARKER_IMG_NEW,
                        size: constant.A_J_MARKER_BLUE_SIZE,
                        offset: constant.A_J_MARKER_BLUE_OFFSET,
                        imageOffset: new BMap.Size(constant.A_J_MARKER_BLUE_ICON_WID * this.showIndex, constant.A_J_MARKER_BLUE_ICON_Y),
                        infoWindowOffset: constant.A_J_MARKER_INFOWND_OFFSET,
                        imageSize: new BMap.Size(constant.A_J_MARKER_IMG_NEW_WIDTH, constant.A_J_MARKER_IMG_NEW_HEIGHT),
                        srcSet: constant.A_J_MARKER_IMG_NEW2X_SRCSET
                    },
                    clicked: {
                        image: constant.A_J_MARKER_IMG_NEW,
                        size: constant.A_J_MARKER_CLICK_SIZE,
                        offset: constant.A_J_MARKER_CLICK_OFFSET,
                        imageOffset: new BMap.Size(constant.A_J_MARKER_CLICK_ICON_WID * this.showIndex, constant.A_J_MARKER_CLICK_ICON_Y),
                        infoWindowOffset: constant.A_J_MARKER_INFOWND_OFFSET,
                        imageSize: new BMap.Size(constant.A_J_MARKER_IMG_NEW_WIDTH, constant.A_J_MARKER_IMG_NEW_HEIGHT),
                        srcSet: constant.A_J_MARKER_IMG_NEW2X_SRCSET
                    }
                }
            }
        },
        generateMarker: function() {
            if (this.model.poiType !== constant.POI_TYPE_BUSLINE && this.model.poiType !== constant.POI_TYPE_SUBLINE) {
                var e = this,
                    t = mapUtil.addSearchPoi(this.model.point, this.showIndex, this.model.name, {
                        type: "damoce" === this.businessType ? "groupon" : "normal",
                        uid: this.model.uid,
                        ext_type: this.model.ext_type,
                        origin_id: this.model.origin_id || {}
                    });
                if ("undefined" != typeof t) return e.searchIndex === e.searchData.result.count - 1 && ("B_EARTH_MAP" === map.getMapType() || "webgl" === map._renderType ? listener.trigger("search.poi." + e.searchData.guid, "lastanimationend") : util.vendorEvent(t.iconDom, "animationend", function() {
                    listener.trigger("search.poi." + e.searchData.guid, "lastanimationend")
                })), t.addEventListener("click", function() {
                    e.select(), e.showInfoWindow();
                    var t = "";
                    e.model.ext && e.model.ext.src_name && (t = e.model.ext.src_name);
                    var a = STAT_CODE.STAT_MAP_SELECT;
                    11 != e.searchData.result.type && (a = STAT_CODE.STAT_GR_MARKER_CLICK), addStat(a, {
                        n: e.index,
                        uid: e.model.uid,
                        category: t,
                        ct: "mk"
                    });
                    var i = e.searchData.result && e.searchData.result.page_num || 0;
                    addStat("poisearch.item.marker", "click", {
                        list_page: i,
                        list_index: e.index,
                        da_trd: e.searchData.trdName,
                        d_stat: e.searchData.damoceStat,
                        s_from: e.searchData.searchFrom,
                        wd: e.searchData.wd,
                        std_tag: e.model.std_tag,
                        uid: e.model.uid
                    })
                }), t.addEventListener("mouseover", function() {
                    e.highlightMarker(), e.highlightItem()
                }), t.addEventListener("mouseout", function() {
                    e.isSelected() || (e.unhighlightMarker(), e.unhighlightItem())
                }), t.highlight = this.highlightMarker.bind(this), t.unhighlight = this.unhighlightMarker.bind(this), t
            }
        },
        generateInfoWnd: function(e) {
            var t = (this.model.topic || "", this.model.date || "", e.createCommonInfoWindow(this.infoWindowContent, {
                    cityCode: this.sCityCode,
                    x: this.model.point.lng,
                    y: this.model.point.lat,
                    uid: this.model.uid
                })),
                a = this;
            return t && (t._aIndex = this.index, t.addEventListener("open", function() {
                var e = "poisearch.item.infowin",
                    t = a.searchData.result && a.searchData.result.page_num || 0;
                addStat(e, "show", {
                    list_page: t,
                    list_index: a.index,
                    da_trd: a.searchData.trdName,
                    d_stat: a.searchData.damoceStat,
                    s_from: a.searchData.searchFrom
                })
            }), this.searchData.isGRequest && (t.addEventListener("close", function() {
                window.GRControll.openedMarker = null
            }), t.addEventListener("open", function() {
                window.GRControll.openedMarker = {
                    uid: a.model.uid,
                    geo: a.model.geo,
                    name: a.model.name
                }
            }))), t
        },
        poiitemClick: function() {
            this.select();
            var e = "";
            this.model.ext && this.model.ext.src_name && (e = this.model.ext.src_name);
            var t = STAT_CODE.STAT_PANEL_SELECT;
            11 != this.searchData.result.type && (t = STAT_CODE.STAT_GR_ITEM_CLICK), addStat(t, {
                n: this.index,
                uid: this.model.uid,
                category: e
            }), this.addSEMStatLog()
        },
        addSEMStatLog: function() {
            if (this.model && this.searchData.result) {
                var e = this.model,
                    t = this.searchData.result;
                if (e.ad_logs) addStat("poilist.bizsem.click", "click", {
                    ad_logs: e.ad_logs,
                    pos: this.index
                });
                else if (t && t.lbs_forward && t.lbs_forward.param && t.lbs_forward.param.length > 0) {
                    var a = t.lbs_forward.param.length - 1,
                        i = t.lbs_forward.param[a];
                    i.ad_page_logs && addStat("poilist.bizsem.click", "click", {
                        ad_page_logs: i.ad_page_logs,
                        pos: this.index
                    })
                }
            }
        },
        poiitemMouseenter: function() {
            this.highlightMarker()
        },
        poiitemMouseleave: function() {
            this.isSelected() || this.unhighlightMarker()
        },
        highlightMarker: function() {
            this.marker && (this.marker.setIcon(this.getIcon(this.config.marker.highlight)), this.marker.setTop(!0))
        },
        unhighlightMarker: function() {
            this.marker && (this.marker.setIcon(this.getIcon(this.config.marker.common)), this.marker.setTop(!1))
        },
        clickMarker: function() {
            this.marker && (this.marker.setIcon(this.getIcon(this.config.marker.clicked)), this.marker.setTop(!0), map.setCenter(this.marker.point))
        },
        cancelClickMarker: function() {
            this.marker && (this.marker.setIcon(this.getIcon(this.config.marker.common)), this.marker.setTop(!0))
        },
        highlightItem: function() {
            this.$el.addClass("hover")
        },
        unhighlightItem: function() {
            this.$el.removeClass("hover")
        },
        getIcon: function(e) {
            return new BMap.Icon(e.image, e.size, {
                anchor: e.offset,
                imageOffset: e.imageOffset,
                infoWindowOffset: e.infoWindowOffset,
                imageSize: e.imageSize,
                srcSet: e.srcSet
            })
        },
        activate: function(e) {
            this.isActive() || (this.showGEO(e), this.active = !0, listener.trigger("search.module", "activate", {
                index: this.index
            }))
        },
        select: function(e) {
            return this.isSelected() && !this.childSelect && this.poiDetailCard ? void this.poiDetailCard.unfoldCard() : (this.highlightMarker(), this.highlightItem(), this.clickMarker(), e || (this.showInfoWindow(), this.loadPoiDetail()), this.selected = !0, void(bridge.selectModule = this))
        },
        cancelSelect: function() {
            this.isSelected() && (this.childSelect || (this.cancelClickMarker(), this.unhighlightMarker(), this.unhighlightItem(), this.slideUpLastRow(), this.infoWnd && this.infoWnd.close(), this.selected = !1))
        },
        loadPoiDetail: function() {
            var e = this,
                t = this.data.uid,
                a = require("poidetail:widget/libs/poiDetailMgr/poiDetailMgr.js");
            a.create({
                uid: t
            }, {
                withMarker: !0,
                marker: e.marker
            }).then(function(a) {
                var i = a.data.content.ext.detail_info.guoke_geo && a.data.content.ext.detail_info.guoke_geo.geo ? a.data.content.ext.detail_info.guoke_geo.geo : "";
                e.data.profile_geo = i;
                var n = a.poiDetailCard;
                e.isActive() || e.activate(), n.addEventListener("unload", function() {
                    e.deactivate()
                }), e.infoWnd && n.setInfoWindow(e.infoWnd), e.poiDetailCard = n, listener.trigger("poisearch", "poidetailshow", {
                    uid: t
                })
            }, function() {})
        },
        deactivate: function() {
            this.isActive() && (this.isSelected() && this.cancelSelect(), this.clearGEO(), this.active = !1)
        },
        isActive: function() {
            return this.active
        },
        isSelected: function() {
            return this.selected
        },
        showGEO: function(e) {
            switch (this.model.ty) {
                case constant.GEO_TYPE_AREA:
                    this.showArea();
                    break;
                case constant.GEO_TYPE_LINE:
                    this.showLine();
                    break;
                case constant.GEO_TYPE_POINT:
            }
            this.model.poi_profile && this.showPoiArea({
                isInit: e
            })
        },
        clearGEO: function() {
            this.clearArea(), this.clearLine()
        },
        showPoiArea: function(e) {
            if (this.polygons.length)
                for (var t = 0; t < this.polygons.length; t++) map.addOverlay(this.polygons[t]);
            else this.getAreaDataAndShow(e)
        },
        getAreaDataAndShow: function(e) {
            var t = this;
            t.active = !0, listener.trigger("search.module", "activate", {
                index: t.index
            }), e = e || {};
            var a = t.data || {},
                i = a.profile_geo || "",
                n = util.parseGeo(i);
            n = n.points;
            var s = [],
                o = mapUtil.addArea(n, constant.AREA_TYPE_POI);
            t.polygons.push(o), mapUtil.addAdministrationArea(o);
            for (var r = n.split(";"), d = 0, l = r.length; l > d; d++) s.push(new BMap.Point(parseFloat(r[d].split(",")[0]), parseFloat(r[d].split(",")[1])));
            e.isInit && (window.GRControll.isGRequest || listener.trigger("search.module", "defaultgeo", {
                points: s
            }))
        },
        showArea: function() {},
        clearArea: function() {
            for (var e = 0, t = this.polygons.length; t > e; e++) mapUtil.removeArea(this.polygons[e]);
            mapUtil.clearAdministrationArea()
        },
        showLine: function(e) {
            if (this.polylines.length)
                for (var t = 0; t < this.polylines.length; t++) map.addOverlay(this.polylines[t]);
            else this.getLineDataAndShow(e)
        },
        getLineDataAndShow: function(e) {
            var t = this;
            e = e || {}; {
                var a = t.data || {},
                    i = a.profile_geo || "",
                    n = util.parseGeo(i),
                    s = [];
                n.bound
            }
            if ("string" == typeof n.points) {
                t.polylines.push(mapUtil.addRoute(n.points));
                for (var o = n.points.split(";"), r = 0, d = o.length; d > r; r++) {
                    var l = o[r].split(",");
                    s.push(new BMap.Point(l[0], l[1]))
                }
            } else
                for (var r = 0, d = n.points.length; d > r; r++)
                    if (n.points[r]) {
                        t.polylines.push(mapUtil.addRoute(n.points[r]));
                        for (var c = n.points[r].split(";"), h = 0, p = c.length; p > h; h++) s.push(new BMap.Point(parseFloat(c[h].split(",")[0]), parseFloat(c[h].split(",")[1])))
                    }
            mapUtil.setViewport(s, 10)
        },
        clearLine: function() {
            for (var e = 0, t = this.polylines.length; t > e; e++) mapUtil.removeRoute(this.polylines[e])
        },
        showInfoWindow: function(e) {
            var t = this;
            util.loadSearchSimpleInfo(function(a) {
                t.loadInfoWindow(a, {
                    notMove: e
                })
            })
        },
        loadInfoWindow: function(e, t) {
            var a = this;
            t = t || {}, t.from = "poisearch";
            var i = map.pointToPixel(this.model.point);
            i && !a.searchData.isGRequest && (i.y = i[1] = i.y - 60, map.setCenter(map.pixelToPoint(i))), this.infoWnd = this.generateInfoWnd(e), this.infoWnd && e.openSearchInfoWndPOI(this.infoWnd, this.marker, t)
        },
        setExtArea: function(e, t) {
            !e || e && !e.content || (t = t || {})
        },
        favClick: function(e) {
            var t = T(e.directTarget),
                a = t.offset();
            t.hasClass("has-faved") ? favMgr.removeFav(this.model.uid, "uid") : (favMgr.addFav(1, {
                uid: this.model.uid,
                name: this.model.name,
                x: this.model.point.lng,
                y: this.model.point.lat
            }), listener.trigger("searchModule.fav", "click", {
                pos: a
            }), addStat("newfav.poi.addfromlist", "click", {})), addStat(STAT_CODE.STAT_FAV_LIST_BTN)
        },
        phoneClick: function(e) {
            sms.ready(e.target, this.model.uid, this.model.poiType, this.searchData.sCityCode, "list"), addStat(STAT_CODE.STAT_SHOUJI_SEND)
        },
        messageClick: function(e) {
            sms.ready(e.target, this.model.uid, this.model.poiType, this.searchData.sCityCode, "list", null, {
                name: this.model.name,
                addr: this.model.addr
            })
        },
        shareClick: function(e) {
            BShare._open(e, {
                from: "poishare",
                linkinfo: {
                    poiShareUid: this.model.uid
                }
            })
        },
        streetPanoClick: function(e) {
            e.stopPropagation();
            var t = {
                uid: this.model.uid,
                index: this.index,
                addr: this.model.addr,
                from: "list",
                wd: this.searchData.wd
            };
            PanoInterface.showPano({
                panoId: this.model.sid,
                research: !0,
                panoType: "street",
                searchParam: t,
                from: "PoiSearch"
            }), addStat(STAT_CODE.STAT_PANORAMA, {
                catalog: "list",
                item: "street",
                func: "click"
            });
            var a = STAT_CODE.STAT_PANEL_SELECT;
            11 != this.searchData.result.type && (a = STAT_CODE.STAT_GR_ITEM_CLICK), addStat(a, {
                ct: "list_page_street"
            })
        },
        indoorPanoClick: function() {
            var e = this.model,
                t = {
                    uid: e.uid,
                    from: "list",
                    wd: this.searchData.wd
                };
            PanoInterface.showPano({
                panoId: e.sid,
                research: !0,
                panoType: "inter",
                searchParam: t
            }), addStat(STAT_CODE.STAT_PANORAMA, {
                catalog: "list",
                item: "inter",
                func: "click"
            })
        },
        banner3dClick: function() {
            for (var e = this.model, t = e.uid, a = map.temp.scenic3dPoints, i = 0; i < a.length; i++)
                if (t === a[i].uid) {
                    addStat("gotoscenic3dpage.poilistbanner", "click"), listener.trigger("toScenic3DPage", "click", {
                        uid: t,
                        from: "poilistbanner"
                    });
                    break
                }
        },
        toClick: function() {
            var e = this.model.name,
                t = this.model.cp;
            searchbox.setState("route", {
                end: {
                    wd: e,
                    uid: this.model.uid,
                    pt: this.model.pointStr.replace("|", ",")
                }
            }), "bus" === t && window.addStat("bus.gothere.to", "show"), window.addStat("searchbox.gothere.to", "show", {
                da_trd: this.searchData.trdName,
                d_stat: this.searchData.damoceStat,
                s_from: this.searchData.searchFrom
            })
        },
        fromClick: function() {
            var e = this.model.name,
                t = this.model.cp;
            searchbox.setState("route", {
                start: {
                    wd: e,
                    uid: this.model.uid,
                    pt: this.model.pointStr.replace("|", ",")
                }
            }), "bus" === t && window.addStat("bus.gothere.from", "show"), window.addStat("searchbox.gothere.from", "show", {
                da_trd: this.searchData.trdName,
                d_stat: this.searchData.damoceStat,
                s_from: this.searchData.searchFrom
            })
        },
        slideUpLastRow: function() {
            var e = this.$el.find(".l-row");
            e.hide().height(0), this.hasSlideDown = !1
        },
        slideDownLastRow: function() {
            var e = this.$el.find(".l-row");
            bridge && bridge.selectModule && bridge.selectModule !== this && bridge.selectModule.slideUpLastRow(), this.hasSlideDown = !0, e.show().animate({
                height: 24
            }, 200), addStat("searchbox.gothere.show", "show")
        }
    }), module.exports = HouseSearch
});;
define("common:widget/search/modules/movieSearchModule/inc.js", function(require, exports, module) {
    function MovieSearch() {
        CaterSearch.apply(this, arguments), this.businessType = "movie", this.movieUpdateModel(this.model)
    }
    var CaterSearch = require("common:widget/search/modules/caterSearchModule/inc.js"),
        util = require("common:widget/ui/util/util.js"),
        NOPIC = "//webmap1.bdimg.com/wolfman/static/common/images/nopic_96d29d1.gif";
    T.inherits(MovieSearch, CaterSearch, "MovieSearch"), T.object.extend(MovieSearch.prototype, {
        render: function() {
            try {
                var model = this.model;
                this.template = [function(_template_object) {
                    var _template_fun_array = [],
                        fn = function(__data__) {
                            var _template_varName = "";
                            for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                            eval(_template_varName), _template_fun_array.push('<li data-index="', "undefined" == typeof(index + 1) ? "" : index + 1, '" data-searchindex="', "undefined" == typeof searchIndex ? "" : searchIndex, '" class="search-item movie-item" map-on-click="poiitem" map-on-mouseenter="poiitem" map-on-mouseleave="poiitem" data-stat-code="poisearch.item.item;poisearch.movie.item', "undefined" == typeof(3 > searchIndex ? ";poisearch.movie.topitem" : "") ? "" : 3 > searchIndex ? ";poisearch.movie.topitem" : "", '">    <div class="cf mb_5">        <div class="col-l">            <a href="javascript:void(0)" class="no-', "undefined" == typeof(showIndex + 1) ? "" : showIndex + 1, '"></a>        </div>        <div class="col-r">            <div class="mt_5 h_20">            '), dtxt && _template_fun_array.push('            <span class="n-grey">', "undefined" == typeof dtxt ? "" : dtxt, "</span>"), _template_fun_array.push(""), has360Pano && _template_fun_array.push('<a href="javascript:void(0)" title="360实景" class="pano-360" map-on-click="360Pano">&nbsp;</a>'), _template_fun_array.push(""), hasStreetPano && _template_fun_array.push('<a href="javascript:void(0)" class="camera-icon street-pano ml_5" map-on-click="streetPano" data-index="', "undefined" == typeof(index + 1) ? "" : index + 1, '" data-stat-code="poisearch.movie.pano" stop-propagation="true">&nbsp;</a>'), _template_fun_array.push('            </div>            <div class="img-wrap">                '), hasIndoorPano ? _template_fun_array.push('                    <a href="javascript:void(0)"  map-on-click="indoorPano" data-index="', "undefined" == typeof(index + 1) ? "" : index + 1, '" data-index="', "undefined" == typeof(index + 1) ? "" : index + 1, '" data-stat-code="poisearch.movie.image">                        <img src="', "undefined" == typeof hImage ? "" : hImage, '" class="hasIndoorPano" style="width:71px;height:58px;" />                        <span title="内部环境" class="indoor-pano">内部环境</span>                    </a>                ') : _template_fun_array.push('                    <a href="', "undefined" == typeof detailUrl ? "" : detailUrl, '" data-index="', "undefined" == typeof(index + 1) ? "" : index + 1, '" data-stat-code="poisearch.movie.image" data-detail-code="list_page_pic">                        <img src="', "undefined" == typeof hImage ? "" : hImage, '" style="width:71px;height:58px;" />                    </a>                '), _template_fun_array.push('            </div>        </div>        <div class="ml_30 mr_90">            <div class="row">                <span>                <a href="javascript:void(0);" class="n-blue" data-index="', "undefined" == typeof(index + 1) ? "" : index + 1, '" data-stat-code="poisearch.movie.title">', "undefined" == typeof name ? "" : name, "</a>                "), groupon && _template_fun_array.push('                    <a href="', "undefined" == typeof detailUrl ? "" : detailUrl, '" title="共有', "undefined" == typeof placeDetail.groupon.length ? "" : placeDetail.groupon.length, '条团购信息" class="tuan" data-index="', "undefined" == typeof(index + 1) ? "" : index + 1, '" data-stat-code="poisearch.movie.tuan" data-detail-code="list_groupon">团</a>                '), _template_fun_array.push("                "), takeout && _template_fun_array.push('                    <a href="', "undefined" == typeof detailUrl ? "" : detailUrl, '" title="', "undefined" == typeof takeout.tips ? "" : takeout.tips, '" class="wai">外</a>                '), _template_fun_array.push("                "), pc_bookable && _template_fun_array.push('                    <a href="', "undefined" == typeof detailUrl ? "" : detailUrl, '" title="本店支持在线订座" class="ding" data-detail-code="list_movie_book">订</a>                '), _template_fun_array.push("                "), premium2 && premium2.length && _template_fun_array.push('                    <a href="', "undefined" == typeof detailUrl ? "" : detailUrl, '" title="共有', "undefined" == typeof placeDetail.premium2.length ? "" : placeDetail.premium2.length, '条优惠信息" class="hui" data-detail-code="list_page_discount">惠</a>                '), _template_fun_array.push("                </span>            </div>            "), alertMsg && _template_fun_array.push('                <div class="row l-grey">                    <span class="alrt"></span>', "undefined" == typeof alertMsg.alert ? "" : alertMsg.alert, '<a href="', "undefined" == typeof alertMsg.alertUrl ? "" : alertMsg.alertUrl, '" title="报错" target="_blank">欢迎报错</a>                </div>            '), _template_fun_array.push('            <div class="row">                <span class="score">                    <b style="width:', "undefined" == typeof scoreWidth ? "" : scoreWidth, 'px"></b>                </span>            </div>            <div class="row addr">                <span class="n-grey" title="', "undefined" == typeof addr ? "" : addr, '">', "undefined" == typeof addr ? "" : addr, "</span>            </div>            "), price && _template_fun_array.push('                <div class="row">                    <span>                        <span class="d-red mr_3"><strong>', "undefined" == typeof unescape("%A5") ? "" : unescape("%A5"), "</strong>", "undefined" == typeof price ? "" : price, '</span>起<a href="', "undefined" == typeof bookUrl ? "" : bookUrl, '" class="buy ml_5" data-index="', "undefined" == typeof(index + 1) ? "" : index + 1, '" data-stat-code="poisearch.movie.book" data-detail-code="list_movie_book">预订</a>                    </span>                </div>            '), _template_fun_array.push('        </div>    </div>    <div class="children-container ml_30"></div>    <div class="l-row">        <span class="go">            <span map-on-click="to">                <em class=\'to-icon icon\'></em>                <i>到这去</i></span            ><span map-on-click="from">                <em class=\'from-icon icon\'></em>                <i>从这出发</i>            </span>        </span>        <span class="operate ml_5">            <a href="javascript:void(0)" class="message" title="发送到手机" map-on-click="message" data-stat-code="poisearch.message.open" clickNoBubble="true" >发送到手机</a            ><a href="javascript:void(0)"   class="fav ml_10 ', "undefined" == typeof fav.favSelectedCls ? "" : fav.favSelectedCls, '" title="', "undefined" == typeof fav.favTitle ? "" : fav.favTitle, '" map-on-click="fav" clickNoBubble="true" >&nbsp;</a            ><a href="', "undefined" == typeof amendUrl ? "" : amendUrl, '" target="_blank" title="纠错" data-index="', "undefined" == typeof(index + 1) ? "" : index + 1, '" data-stat-code="searchbox.gothere.amend" class="amend ml_10" clickNoBubble="true">&nbsp;</a>        </span>    </div></li>'), _template_varName = null
                        }(_template_object);
                    return fn = null, _template_fun_array.join("")
                }][0], this.$el = T(this.template(this.model));
                var uid = model.uid || "";
                return uid && model.alertMsg && model.alertMsg.alertUrl && (model.alertMsg.alertUrl = "https://ugc.map.baidu.com/ifix/poiproblem/poiproblempcpage?business_trigger=11&poi_uid=" + uid), this.$el
            } catch (e) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: e.message || e.description,
                    path: "common:widget/search/modules/movieSearchModule/inc.js",
                    ln: 30
                })
            }
        },
        movieUpdateModel: function(e) {
            {
                var a = e.ext || {};
                a.detail_info
            }
        }
    }), module.exports = MovieSearch
});;
define("common:widget/search/modules/hotelSearchModule/inc.js", function(require, exports, module) {
    function HotelSearch() {
        CaterSearch.apply(this, arguments), this.businessType = "hotel", this.hotelUpdateModel(this.model), this.infoWindowContent = {
            name: this.model.name,
            wiseRealtimePrice: this.model.ext && this.model.ext.detail_info && this.model.ext.detail_info.wise_realtime_price,
            wiseRealtimePriceFlag: this.model.ext && this.model.ext.detail_info && this.model.ext.detail_info.wise_realtime_price_flag
        }
    }
    var CaterSearch = require("common:widget/search/modules/caterSearchModule/inc.js"),
        util = require("common:widget/ui/util/util.js"),
        NOPIC = "//webmap1.bdimg.com/wolfman/static/common/images/nopic_96d29d1.gif";
    T.inherits(HotelSearch, CaterSearch, "HotelSearch"), T.object.extend(HotelSearch.prototype, {
        render: function() {
            try {
                var model = this.model,
                    uid = model.uid || "";
                return uid && model.alertMsg && model.alertMsg.alertUrl && (model.alertMsg.alertUrl = "https://ugc.map.baidu.com/ifix/poiproblem/poiproblempcpage?business_trigger=11&poi_uid=" + uid), this.template = [function(_template_object) {
                    var _template_fun_array = [],
                        fn = function(__data__) {
                            var _template_varName = "";
                            for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                            eval(_template_varName), _template_fun_array.push('<li data-index="', "undefined" == typeof(index + 1) ? "" : index + 1, '" data-searchindex="', "undefined" == typeof searchIndex ? "" : searchIndex, '" class="search-item hotel-item" map-on-click="poiitem" map-on-mouseenter="poiitem" map-on-mouseleave="poiitem" data-stat-code="poisearch.item.item;poisearch.hotel.item', "undefined" == typeof(3 > searchIndex ? ";poisearch.hotel.topitem" : "") ? "" : 3 > searchIndex ? ";poisearch.hotel.topitem" : "", '" >    <div class="cf mb_5">        <div class="col-l">            <a href="javascript:void(0)" class="no-', "undefined" == typeof(showIndex + 1) ? "" : showIndex + 1, '"></a>        </div>        <div class="col-r">            <div class="mt_5 h_20">            '), dtxt && _template_fun_array.push('            <span class="n-grey">', "undefined" == typeof dtxt ? "" : dtxt, "</span>"), _template_fun_array.push(""), has360Pano && _template_fun_array.push('<a href="javascript:void(0)" title="360实景" class="pano-360" map-on-click="360Pano">&nbsp;</a>'), _template_fun_array.push(""), hasStreetPano && _template_fun_array.push('<a href="javascript:void(0)" class="camera-icon street-pano ml_5" map-on-click="streetPano" data-index="', "undefined" == typeof(index + 1) ? "" : index + 1, '" data-stat-code="poisearch.hotel.pano" stop-propagation="true">&nbsp;</a>'), _template_fun_array.push('            </div>            <div class="img-wrap">                '), hasIndoorPano ? _template_fun_array.push('                    <a href="javascript:void(0)"  map-on-click="indoorPano" data-index="', "undefined" == typeof(index + 1) ? "" : index + 1, '" data-stat-code="poisearch.hotel.image" >                        <img src="', "undefined" == typeof hImage ? "" : hImage, '" class="hasIndoorPano" style="width:71px;height:58px;" />                        <span title="内部环境" class="indoor-pano">内部环境</span>                    </a>                ') : _template_fun_array.push('                    <a href="javascript:void(0)" data-index="', "undefined" == typeof(index + 1) ? "" : index + 1, '" data-stat-code="poisearch.hotel.image" data-detail-code="list_page_pic">                        <img src="', "undefined" == typeof hImage ? "" : hImage, '" style="width:71px;height:58px;" />                    </a>                '), _template_fun_array.push('            </div>        </div>        <div class="ml_30 mr_90">            <div class="row">                <span>                    <a href="javascript:void(0)" class="n-blue" data-index="', "undefined" == typeof(index + 1) ? "" : index + 1, '" data-stat-code="poisearch.hotel.title" data-detail-code="list_page">', "undefined" == typeof name ? "" : name, "</a>                "), groupon && _template_fun_array.push('                    <a href="', "undefined" == typeof detailUrl ? "" : detailUrl, '" title="共有', "undefined" == typeof placeDetail.groupon.length ? "" : placeDetail.groupon.length, '条团购信息" class="tuan" data-detail-code="list_groupon">团</a>                '), _template_fun_array.push("                "), takeout && _template_fun_array.push('                    <a href="', "undefined" == typeof detailUrl ? "" : detailUrl, '" title="', "undefined" == typeof takeout.tips ? "" : takeout.tips, '" class="wai">外</a>                '), _template_fun_array.push("                "), pc_bookable && _template_fun_array.push("                                    "), _template_fun_array.push("                "), premium2 && premium2.length && _template_fun_array.push('                    <a href="', "undefined" == typeof detailUrl ? "" : detailUrl, '" title="共有', "undefined" == typeof placeDetail.premium2.length ? "" : placeDetail.premium2.length, '条优惠信息" class="hui" data-detail-code="list_page_discount">惠</a>                '), _template_fun_array.push("                </span>            </div>            "), alertMsg && _template_fun_array.push('                <div class="row l-grey">                    <span class="alrt"></span>', "undefined" == typeof alertMsg.alert ? "" : alertMsg.alert, '<a href="', "undefined" == typeof alertMsg.alertUrl ? "" : alertMsg.alertUrl, '" title="报错" target="_blank">欢迎报错</a>                </div>            '), _template_fun_array.push('            <div class="row">                <span>                    ', "undefined" == typeof score ? "" : score, '/5分<i class="seperate">|</i>', "undefined" == typeof standard ? "" : standard, "                </span>                "), unSureAlert && _template_fun_array.push('                    <span style="color:', "undefined" == typeof unSureAlertColor ? "" : unSureAlertColor, '">                        ', "undefined" == typeof unSureAlert ? "" : unSureAlert, "                    </span>                "), _template_fun_array.push('            </div>            <div class="row addr">                <span class="n-grey" title="', "undefined" == typeof addr ? "" : addr, '">', "undefined" == typeof addr ? "" : addr, "</span>            </div>            "), price && _template_fun_array.push('                <div class="row">                    <span>                                            </span>                </div>            '), _template_fun_array.push("            "), unSureTip && _template_fun_array.push('                <div class="row unsuretip" style="color:', "undefined" == typeof unSureTipColor ? "" : unSureTipColor, '">                    <span class="unsurelogo"></span>                    ', "undefined" == typeof unSureTip ? "" : unSureTip, "                </div>            "), _template_fun_array.push('        </div>    </div>    <div class="children-container ml_30"></div>    <div class="l-row">        <span class="go">            <span map-on-click="to">                <em class=\'to-icon icon\'></em>                <i>到这去</i></span            ><span map-on-click="from">                <em class=\'from-icon icon\'></em>                <i>从这出发</i>            </span>        </span>        <span class="operate ml_5">            <a href="javascript:void(0)" class="message" title="发送到手机" map-on-click="message" data-stat-code="poisearch.message.open" clickNoBubble="true" >发送到手机</a            ><a href="javascript:void(0)"   class="fav ml_10 ', "undefined" == typeof fav.favSelectedCls ? "" : fav.favSelectedCls, '" title="', "undefined" == typeof fav.favTitle ? "" : fav.favTitle, '" map-on-click="fav" clickNoBubble="true" >&nbsp;</a            ><a href="', "undefined" == typeof amendUrl ? "" : amendUrl, '" target="_blank" title="纠错" data-index="', "undefined" == typeof(index + 1) ? "" : index + 1, '" data-stat-code="searchbox.gothere.amend" class="amend ml_10" clickNoBubble="true">&nbsp;</a>        </span>    </div></li>'), _template_varName = null
                        }(_template_object);
                    return fn = null, _template_fun_array.join("")
                }][0], this.$el = T(this.template(this.model)), this.$el
            } catch (e) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: e.message || e.description,
                    path: "common:widget/search/modules/hotelSearchModule/inc.js",
                    ln: 37
                })
            }
        },
        hotelUpdateModel: function(e) {
            var a = e.ext || {},
                t = a.detail_info;
            e.score = t.overall_rating, e.standard = t.tag ? t.tag.split(" ").reverse()[0] || "" : e.tag ? e.tag.split(";").reverse()[0] || "" : ""
        }
    }), module.exports = HotelSearch
});;
define("common:widget/search/modules/scenerySearchModule/inc.js", function(require, exports, module) {
    function ScenerySearch() {
        CaterSearch.apply(this, arguments), this.businessType = "scenery", this.sceneryUpdateModel(this.model)
    }
    var CaterSearch = require("common:widget/search/modules/caterSearchModule/inc.js"),
        util = require("common:widget/ui/util/util.js"),
        NOPIC = "//webmap1.bdimg.com/wolfman/static/common/images/nopic_96d29d1.gif";
    T.inherits(ScenerySearch, CaterSearch, "ScenerySearch"), T.object.extend(ScenerySearch.prototype, {
        render: function() {
            try {
                var model = this.model;
                this.template = [function(_template_object) {
                    var _template_fun_array = [],
                        fn = function(__data__) {
                            var _template_varName = "";
                            for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                            eval(_template_varName), _template_fun_array.push('<li data-index="', "undefined" == typeof(index + 1) ? "" : index + 1, '" data-searchindex="', "undefined" == typeof searchIndex ? "" : searchIndex, '" class="search-item scenery-item" map-on-click="poiitem" map-on-mouseenter="poiitem" map-on-mouseleave="poiitem" data-stat-code="poisearch.item.item;poisearch.scenery.item', "undefined" == typeof(3 > searchIndex ? ";poisearch.scenery.topitem" : "") ? "" : 3 > searchIndex ? ";poisearch.scenery.topitem" : "", '">    <div class="cf mb_5">        <div class="col-l">            <a href="javascript:void(0)" class="no-', "undefined" == typeof(showIndex + 1) ? "" : showIndex + 1, '"></a>        </div>        <div class="col-r">            <div class="mt_5 h_20">            '), dtxt && _template_fun_array.push('            <span class="n-grey">', "undefined" == typeof dtxt ? "" : dtxt, "</span>"), _template_fun_array.push(""), has360Pano && _template_fun_array.push('<a href="javascript:void(0)" title="360实景" class="pano-360" map-on-click="360Pano">&nbsp;</a>'), _template_fun_array.push(""), hasStreetPano && _template_fun_array.push('<a href="javascript:void(0)" class="camera-icon street-pano ml_5" map-on-click="streetPano" data-index="', "undefined" == typeof(index + 1) ? "" : index + 1, '" data-stat-code="poisearch.scenery.pano" stop-propagation="true">&nbsp;</a>'), _template_fun_array.push('            </div>            <div class="img-wrap">                '), hasIndoorPano ? _template_fun_array.push('                    <a href="javascript:void(0)"  map-on-click="indoorPano" data-index="', "undefined" == typeof(index + 1) ? "" : index + 1, '" data-stat-code="poisearch.scenery.image" >                        <img src="', "undefined" == typeof hImage ? "" : hImage, '" class="hasIndoorPano" style="width:71px;height:58px;" />                        <span title="内部环境" class="indoor-pano">内部环境</span>                    </a>                ') : _template_fun_array.push('                    <a href="', "undefined" == typeof detailUrl ? "" : detailUrl, '" data-index="', "undefined" == typeof(index + 1) ? "" : index + 1, '" data-stat-code="poisearch.scenery.image" data-detail-code="list_page_pic">                        <img src="', "undefined" == typeof hImage ? "" : hImage, '" style="width:71px;height:58px;" />                    </a>                '), _template_fun_array.push('            </div>        </div>        <div class="ml_30 mr_90">            <div class="row">                <span>                <a href="javascript:void(0);" class="n-blue" data-index="', "undefined" == typeof(index + 1) ? "" : index + 1, '" data-stat-code="poisearch.scenery.title">', "undefined" == typeof name ? "" : name, "</a>                "), groupon && _template_fun_array.push('                    <a href="', "undefined" == typeof detailUrl ? "" : detailUrl, '" title="共有', "undefined" == typeof placeDetail.groupon.length ? "" : placeDetail.groupon.length, '条团购信息" class="tuan" data-detail-code="list_groupon">团</a>                '), _template_fun_array.push("                "), takeout && _template_fun_array.push('                    <a href="', "undefined" == typeof detailUrl ? "" : detailUrl, '" title="', "undefined" == typeof takeout.tips ? "" : takeout.tips, '" class="wai">外</a>                '), _template_fun_array.push("                "), pc_bookable && _template_fun_array.push('                    <a href="', "undefined" == typeof detailUrl ? "" : detailUrl, '" title="本店支持在线订座" class="ding" data-index="', "undefined" == typeof(index + 1) ? "" : index + 1, '" data-stat-code="poisearch.scenery.sbook" data-detail-code="list_scope">订</a>                '), _template_fun_array.push("                "), premium2 && premium2.length && _template_fun_array.push('                    <a href="', "undefined" == typeof detailUrl ? "" : detailUrl, '" title="共有', "undefined" == typeof placeDetail.premium2.length ? "" : placeDetail.premium2.length, '条优惠信息" class="hui" data-detail-code="list_page_discount">惠</a>                '), _template_fun_array.push("                </span>            </div>            "), alertMsg && _template_fun_array.push('                <div class="row l-grey">                    <span class="alrt"></span>', "undefined" == typeof alertMsg.alert ? "" : alertMsg.alert, '<a href="', "undefined" == typeof alertMsg.alertUrl ? "" : alertMsg.alertUrl, '" title="报错" target="_blank">欢迎报错</a>                </div>            '), _template_fun_array.push('            <div class="row">                <span>                    '), score && _template_fun_array.push('                    <span class="d-red">', "undefined" == typeof score ? "" : score, "</span>                    "), _template_fun_array.push("                    "), score && standard && _template_fun_array.push('                    <i class="seperate">|</i>                    '), _template_fun_array.push("                    ", "undefined" == typeof standard ? "" : standard, "                </span>                "), unSureAlert && _template_fun_array.push('                    <span style="color:', "undefined" == typeof unSureAlertColor ? "" : unSureAlertColor, '">                        ', "undefined" == typeof unSureAlert ? "" : unSureAlert, "                    </span>                "), _template_fun_array.push('            </div>            <div class="row addr">               <span class="n-grey" title="', "undefined" == typeof addr ? "" : addr, '">', "undefined" == typeof addr ? "" : addr, "</span>            </div>            "), unSureTip && _template_fun_array.push('                <div class="row unsuretip" style="color:', "undefined" == typeof unSureTipColor ? "" : unSureTipColor, '">                    <span class="unsurelogo"></span>                    ', "undefined" == typeof unSureTip ? "" : unSureTip, "                </div>            "), _template_fun_array.push("        </div>    </div>    "), isShow3DBanner && _template_fun_array.push('        <div class="banner-3d" map-on-click="banner3d">进入3D地图</div>    '), _template_fun_array.push('    <div class="children-container ml_30"></div>    <div class="l-row">        <span class="go">            <span map-on-click="to">                <em class=\'to-icon icon\'></em>                <i>到这去</i></span            ><span map-on-click="from">                <em class=\'from-icon icon\'></em>                <i>从这出发</i>            </span>        </span>        <span class="operate ml_5">            <a href="javascript:void(0)" class="message" title="发送到手机" map-on-click="message" data-stat-code="poisearch.message.open" clickNoBubble="true" >发送到手机</a            ><a href="javascript:void(0)"   class="fav ml_10 ', "undefined" == typeof fav.favSelectedCls ? "" : fav.favSelectedCls, '" title="', "undefined" == typeof fav.favTitle ? "" : fav.favTitle, '" map-on-click="fav" clickNoBubble="true" >&nbsp;</a            ><a href="', "undefined" == typeof amendUrl ? "" : amendUrl, '" target="_blank" title="纠错" data-index="', "undefined" == typeof(index + 1) ? "" : index + 1, '" data-stat-code="searchbox.gothere.amend" class="amend ml_10" clickNoBubble="true">&nbsp;</a>        </span>    </div></li>'), _template_varName = null
                        }(_template_object);
                    return fn = null, _template_fun_array.join("")
                }][0];
                var uid = model.uid || "";
                return uid && model.alertMsg && model.alertMsg.alertUrl && (model.alertMsg.alertUrl = "https://ugc.map.baidu.com/ifix/poiproblem/poiproblempcpage?business_trigger=11&poi_uid=" + uid), this.$el = T(this.template(this.model)), this.$el
            } catch (e) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: e.message || e.description,
                    path: "common:widget/search/modules/scenerySearchModule/inc.js",
                    ln: 30
                })
            }
        },
        sceneryUpdateModel: function(model) {
            var ext = model.ext || {},
                placeDetail = ext.detail_info || {},
                vsContent = placeDetail.vs_content || {},
                invisible = vsContent.invisible || {},
                scoreData = invisible.bigdata || {};
            if (model.score = "", eval(scoreData.showtag) instanceof Array) {
                var tagArr = eval(scoreData.showtag)[0] || [],
                    tag = tagArr[0] || "";
                model.score = tag
            }
            if (placeDetail.std_tag ? (model.standard = placeDetail.std_tag.split(";").reverse()[0] || "", "其他" === model.standard && (model.standard = placeDetail.std_tag.split(";").reverse()[1] || "")) : model.standard = model.tag ? model.tag.split(" ").reverse()[0] || "" : "", model.price = placeDetail.list_min_price || 0, this.model.isShow3DBanner = !1, map.temp.ifSupportWebGL) {
                var uid = this.model.uid,
                    scenic3dPoints = map.temp.scenic3dPoints;
                if (scenic3dPoints)
                    for (var i = 0; i < scenic3dPoints.length; i++)
                        if (scenic3dPoints[i].uid === uid) {
                            this.model.isShow3DBanner = !0;
                            break
                        }
            }
        }
    }), module.exports = ScenerySearch
});;
define("common:widget/search/modules/busSubCommonModule/inc.js", function(t, n, e) {
    function o() {
        u.apply(this, arguments), this.busPolylines = [], this.routeStartEndMkr = [], this.routeStartEndMkr = [], this.stationPoints = [], this.busStopPois = [], this.stationTips = [], this.normPolylines = [], this.normPolygons = []
    }
    var s = t("common:widget/ui/util/util.js"),
        i = t("common:widget/ui/constant/Constant.js"),
        a = t("pano:widget/PanoEntranceUtil/PanoEntranceUtil.js"),
        r = t("common:widget/ui/mapUtil/mapUtil.js"),
        l = t("common:widget/ui/searchData/searchData.js"),
        u = t("common:widget/search/modules/baseSearchModule/inc.js");
    T.inherits(o, u, "BusSubCommon"), T.object.extend(o.prototype, {
        _getBusLineData: function(t, n) {
            var e = "/",
                o = "qt=bsl&uid=" + t;
            baidu.ajax(e, {
                data: {
                    qt: "bsl",
                    tps: "",
                    newmap: 1,
                    uid: t,
                    c: this.searchData.sCityCode,
                    gsign: md5(o)
                },
                cache: !1,
                dataType: "json",
                success: function(t) {
                    if (t && (!t || t.content)) {
                        {
                            t.content[0]
                        }
                        n && "function" == typeof n && n(t)
                    }
                }
            })
        },
        _getPanoEntrancesData: function(t) {
            var n = this.model.panoStations,
                e = this.model.stations,
                o = this;
            a.insertPanoInfoInSearch(n, "busline", function(n) {
                if (n)
                    for (var s = 0; s < e.length; s++) n[s].uid = e[s].uid, n[s].buslineUid = e[s].buslineuid;
                t.call(o, n)
            })
        },
        _drawBusLine: function(t, n, e, o, a) {
            if (t = t || {}, !t.selectLine || !o) {
                t.selectLine ? (t.selectLine._clearBusLine(), t.selectLine._clearLine(), t.selectLine._clearArea(), t.lastSelectLine = t.selectLine, t.selectLine = this) : t.selectLine = this;
                var l, u = this,
                    c = s.parseGeo(n.geo);
                if (this.routeStartEndMkr = [], c && 2 == c.type && (map.showTerminal = "yes2", l = r.addRoute(c.points, i.ROUTE_TYPE_BUS, !1, null, n.line_color), this.busPolylines.push(l), this.routeStartEndMkr.push(l._sMarker), this.routeStartEndMkr.push(l._eMarker), o && listener.trigger("search.module", "defaultline", {
                        points: l.points
                    })), n && (!n || n.stations)) {
                    var d = u.curStops = n.stations;
                    u.stationPoints = [], u.busStopPois = [], u.stationTips = [];
                    for (var h = 0, p = d.length; p > h; h++) ! function() {
                        var t = h,
                            e = s.parseGeo(d[t].geo);
                        if (1 == e.type) {
                            var o = r.addBusStopPoi(e.points, d[t].name);
                            u.busStopPois.push(o), o.addEventListener("click", function() {
                                addStat("searchresult.busline.mapselectbusstop", "click", {}), u.selectBusStop(t, n.name, u.model.index)
                            }), u.stationPoints.push(s.getPoiPoint(e.points)), a ? (0 == h || h == p - 1) && u.stationTips.push(r.createTip(n.stations[h].name, "TipC", {
                                point: o.getPoint()
                            })) : u.stationTips.push(r.createTip(n.stations[h].name, "TipC", {
                                point: o.getPoint()
                            }))
                        }
                    }()
                }
            }
        },
        _clearBusLine: function() {
            if (this.busPolylines) {
                for (var t = 0, n = this.busPolylines.length; n > t; t++) r.removeRoute(this.busPolylines[t]), this.busPolylines[t] = null;
                this.busPolylines.length = 0
            }
            for (var t = 0; t < this.busStopPois.length; t++) this.busStopPois[t] && (this.busStopPois[t].remove(), this.busStopPois[t] = null, map.removeOverlay(this.stationTips[t]));
            for (var t = 0; t < this.routeStartEndMkr.length; t++) this.routeStartEndMkr[t] && (map.removeOverlay(this.routeStartEndMkr[t]), this.routeStartEndMkr[t] = null);
            this.busStopPois.length = 0, this.stationPoints.lengtn = 0, this.curStopSelIndex = -1
        },
        _clearLine: function() {
            for (var t = 0, n = this.normPolylines.length; n > t; t++) r.removeRoute(this.normPolylines[t]), this.normPolylines[t] = null;
            this.normPolylines.length = 0
        },
        _clearArea: function() {
            for (var t = 0, n = this.normPolygons.length; n > t; t++) r.removeArea(this.normPolygons[t]), this.normPolygons[t] = null;
            this.normPolygons.length = 0
        },
        selectBusStop: function(t, n, e, o) {
            var i = this,
                r = this.stationPoints,
                u = this.model.stations;
            if ((this.curStopSelIndex != e + "_" + t || r[t] && !map.getBounds().containsPoint(r[t])) && u) {
                var c = i.busStopPois[t];
                map.closeInfoWindow(); {
                    this.curStopSelIndex
                }
                this.curStopSelIndex = e + "_" + t, u[t] && (window.GRControll && (window.GRControll.isClearBeforeSend = !1), l.fetch("inf&uid=" + u[t].uid + "&c=" + this.searchData.sCityCode, function(e) {
                    if (e) {
                        var l, d = n;
                        e.content && e.content.addr && (d = e.content.addr, l = e.content.blinfo), d = T.array.unique(d.split(";")).join("; ");
                        var h = "";
                        h = e.content && e.content.primary_uid ? e.content.primary_uid : u[t].uid, s.loadSearchInfo(function(n) {
                            var s = n.createSearchInfoWnd({
                                title: u[t].name,
                                addr: d,
                                uid: h,
                                blinfo: l,
                                poiType: e.content.poiType
                            }, {
                                forBusLine: !0,
                                cityCode: i.searchData.sCityCode,
                                x: r[t].lng,
                                y: r[t].lat
                            });
                            i.busPanoData && i.busPanoData[t] ? (s = a.addPanoThumbnailsInInfoWnd([s], [i.busPanoData[t]], i.busPanoData, "busline")[0], s.addEventListener("close", function() {
                                T.G("stop_list_" + i.curStopSelIndex) && T.rc(T.G("stop_list_" + i.curStopSelIndex), "selected"), i.curStopSelIndex = -1
                            }), n.openSearchInfoWndPOI(s, c, o)) : i._getPanoEntrancesData(function(e) {
                                i.busPanoData = e, i.busPanoData && i.busPanoData[t] && (s = a.addPanoThumbnailsInInfoWnd([s], [i.busPanoData[t]], i.busPanoData, "busline")[0]), s.addEventListener("close", function() {
                                    T.G("stop_list_" + i.curStopSelIndex) && T.rc(T.G("stop_list_" + i.curStopSelIndex), "selected"), i.curStopSelIndex = -1
                                }), n.openSearchInfoWndPOI(s, c, o)
                            })
                        })
                    }
                }))
            }
        },
        returnLType: function(t) {
            for (var n = [
                    [0, 2, 3, 4, 5, 6, 7, 9, 10, 11],
                    [1, 12, 13, 14],
                    [8]
                ], e = n.length, o = 0; e > o; o++)
                for (var s = n[o], i = 0; i < s.length; i++) {
                    var a = s[i];
                    if (a == t) return o
                }
        }
    }), e.exports = o
});;
define("common:widget/search/modules/busStopSearchModule/inc.js", function(require, exports, module) {
    function BusStopSearch(data, searchData, moduleBridge) {
        bridge = moduleBridge, this.busLineMap = {}, BusSubCommon.apply(this, arguments), this.busStopUpdateModel(this.model), this.busLineTmpl = [function(_template_object) {
            var _template_fun_array = [],
                fn = function(__data__) {
                    var _template_varName = "";
                    for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                    eval(_template_varName), _template_fun_array.push('<div class="content">    <div class="row ">        ', "undefined" == typeof describe ? "" : describe, '        <span></span>    </div>    <div class="row">         '), timetable && _template_fun_array.push("            <span class=\"row\">                <em class='start_end_title'>首末班:</em>                <em class='start_end_time'>", "undefined" == typeof timetable[1] ? "" : timetable[1], "</em>             </span>        "), _template_fun_array.push('    </div>    <div class="row">        '), ticketPrice && _template_fun_array.push("            起步票价:            <span class='price'>", "undefined" == typeof ticketPrice ? "" : ticketPrice, "元</span>         "), _template_fun_array.push("        "), backTrackUid && _template_fun_array.push('        <a href="javascript:void(0)" class=\'backWay\' map-on-click="backTrack" stop-propagation="true" clickNoBubble="true" ><em class=\'back-icon\'></em>返程</a>        '), _template_fun_array.push('    </div>       <a href="javascript:void(0)" class="close" map-on-click="hideBusLine" stop-propagation="true" title="关闭">        ', "undefined" == typeof unescape("×") ? "" : unescape("×"), "    </a></div>"), _template_varName = null
                }(_template_object);
            return fn = null, _template_fun_array.join("")
        }][0]
    }
    var BusSubCommon = require("common:widget/search/modules/busSubCommonModule/inc.js"),
        constant = require("common:widget/ui/constant/Constant.js"),
        bridge;
    T.inherits(BusStopSearch, BusSubCommon, "BusStopSearch"), T.object.extend(BusStopSearch.prototype, {
        render: function() {
            try {
                this.template = [function(_template_object) {
                    var _template_fun_array = [],
                        fn = function(__data__) {
                            var _template_varName = "";
                            for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                            if (eval(_template_varName), _template_fun_array.push('<li data-index="', "undefined" == typeof(index + 1) ? "" : index + 1, '" class="search-item bus-stop-item" map-on-click="poiitem" map-on-mouseenter="poiitem" map-on-mouseleave="poiitem">    <div class="cf">        <div class="col-l">            <a href="javascript:void(0)" class="no-', "undefined" == typeof(showIndex + 1) ? "" : showIndex + 1, '"></a>        </div>        <div class="ml_30 mr_10">            <div class="row">                <span>                        <a href="javascript:void(0)" class="n-blue">', "undefined" == typeof name ? "" : name, "&nbsp;-&nbsp;", "undefined" == typeof stopName ? "" : stopName, "</a>"), has360Pano && _template_fun_array.push('<a href="javascript:void(0)" title="360实景" class="pano-360" map-on-click="360Pano">&nbsp;</a>'), _template_fun_array.push(""), hasStreetPano && _template_fun_array.push('<a href="javascript:void(0)" title="全景" class="camera-icon street-pano ml_5" map-on-click="streetPano" stop-propagation="true">&nbsp;</a>'), _template_fun_array.push("                </span>                "), dtxt && _template_fun_array.push('                <span class="float-r n-grey">', "undefined" == typeof dtxt ? "" : dtxt, "</span>                "), _template_fun_array.push("            </div>            "), nblinfo && nblinfo.length && nblinfo[0].addr) {
                                _template_fun_array.push('            <div class="select-row">                    途经', "undefined" == typeof lineName ? "" : lineName, "：                    ");
                                for (var i = 0; i < nblinfo.length; i++) {
                                    var backTrackUid = nblinfo[i].backTrack && nblinfo[i].backTrack.uid,
                                        blUrl = nblinfo[i].blUrl;
                                    blUrl ? _template_fun_array.push('                        <a href="', "undefined" == typeof blUrl ? "" : blUrl, '" style="background: #', "undefined" == typeof nblinfo[i].clr ? "" : nblinfo[i].clr, '" target="_blank" class=&#39;bus&#39;>', "undefined" == typeof nblinfo[i].addr ? "" : nblinfo[i].addr, "</a>                    ") : _template_fun_array.push('                        <a href="javascript:void(0);"  style="background: #', "undefined" == typeof nblinfo[i].clr ? "" : nblinfo[i].clr, '" stop-propagation="true" data-uid="', "undefined" == typeof nblinfo[i].uid ? "" : nblinfo[i].uid, '" data-backtrack-uid="', "undefined" == typeof backTrackUid ? "" : backTrackUid, '" map-on-click="showBusLine" class=&#39;subway&#39;>', "undefined" == typeof nblinfo[i].addr ? "" : nblinfo[i].addr, "</a>                    ")
                                }
                                _template_fun_array.push('            </div>            <div class="content-wrap">                            </div>            <div class="children-container row"></div>            <div class="content-des">                    可点击车次查看路线详情            </div>            ')
                            }
                            _template_fun_array.push('        </div>    </div>    <div class="l-row">        <span class="go">            <span map-on-click="to">                <em class=\'to-icon icon\'></em>                <i>到这去</i></span            ><span map-on-click="from">                <em class=\'from-icon icon\'></em>                <i>从这出发</i>            </span>        </span>        <span class="operate ml_5">            <a href="javascript:void(0)" class="message" title="发送到手机" map-on-click="message" data-stat-code="poisearch.message.open" clickNoBubble="true" >发送到手机</a            ><a href="javascript:void(0)"   class="fav ml_10 ', "undefined" == typeof fav.favSelectedCls ? "" : fav.favSelectedCls, '" title="', "undefined" == typeof fav.favTitle ? "" : fav.favTitle, '" map-on-click="fav" clickNoBubble="true" >&nbsp;</a            ><a href="', "undefined" == typeof amendUrl ? "" : amendUrl, '" target="_blank" title="纠错" data-index="', "undefined" == typeof(index + 1) ? "" : index + 1, '" data-stat-code="searchbox.gothere.amend" class="amend ml_10" clickNoBubble="true">&nbsp;</a>        </span>    </div></li>'), _template_varName = null
                        }(_template_object);
                    return fn = null, _template_fun_array.join("")
                }][0];
                var $el = this.$el = T(this.template(this.model));
                return this.contentDes = $el.find(".content-des"), this.model.isHidden && $el.addClass("hidden"), $el
            } catch (e) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: e.message || e.description,
                    path: "common:widget/search/modules/busStopSearchModule/inc.js",
                    ln: 32
                })
            }
        },
        dataColorPick: function(e) {
            var a = JSON.parse(e.line_info),
                t = [];
            if (a)
                for (var i in a) t[i] = a[i].line_color.split("x")[1];
            return t
        },
        busStopUpdateModel: function(e) {
            var a = e.ext || {},
                t = a.detail_info,
                i = this;
            e.placeDetail = t, e.type = "bus", e.lineName = "公交车", e.stopName = "公交站";
            var n = e.blinfo,
                s = {},
                r = [],
                l = e.line_info,
                c = baidu.json.parse(l),
                o = [];
            if (c)
                for (var d in c) o[d] = c[d].line_color.split("x")[1];
            T.each(n, function(e, a) {
                var t = a.addr;
                return t in s ? (s[t].backTrack = a, !0) : (s[t] = a, void r.push(a))
            });
            for (var p in r) r[p].clr = o[p];
            e.nblinfo = r;
            var u = this.searchData.isGRequest;
            u && T.each(r, function(e, a) {
                a.blUrl = i.generateDetailUrl(a.uid, constant.POI_TYPE_BUSLINE, i.searchData.sCityCode)
            })
        },
        hideBusLineClick: function() {
            this.lockSlideDownStatus && this.lockSlideDownStatus(), this.$el.find(".content-wrap").empty().parent().find(".select-row>a").removeClass("selected"), this.contentDes.show(), this.curBslUid = ""
        },
        backTrackClick: function() {
            this.lockSlideDownStatus && this.lockSlideDownStatus();
            var e = this.curBslUid;
            this.curBslUid = this.curBackTrackUid, this.curBackTrackUid = e, this.selectBusLine(this.curBslUid), window.addStat("stop.busline.back", "click")
        },
        showBusLineClick: function(e) {
            this.lockSlideDownStatus && this.lockSlideDownStatus();
            var a = e.directTarget,
                t = a.attr("data-uid"),
                i = a.attr("data-backtrack-uid");
            this.curBslUid = t, this.curBackTrackUid = i, this.selectBusLine(t, function() {
                a.addClass("selected").siblings("a").removeClass("selected")
            }), window.addStat("stop.busline.click", "click")
        },
        selectBusLine: function(e, a) {
            var t = this;
            this._getBusLineData(e, function(e) {
                var i = e.content[0];
                if (i.uid === t.curBslUid) {
                    t.busLineMap[i.uid] = i;
                    var n, s = i.name,
                        r = s.slice(0, s.indexOf("(")),
                        l = s.slice(s.indexOf("(")),
                        c = /^\(/i,
                        o = /\)$/i;
                    if (l = l.replace("-", " - ").replace(c, "").replace(o, ""), i.startTime && i.endTime ? n = ["起点站首末班时间", i.startTime + "-" + i.endTime] : i.startTime ? n = ["起点站首班时间", i.startTime] : i.endTime ? n = ["起点站末班时间", i.endTime] : i.timetable && (n = ["起点站首末班时间", i.timetable]), i.maxPrice) var d = i.maxPrice / 100;
                    if (i.ticketPrice) var p = i.ticketPrice / 100;
                    var u = t.busLineTmpl({
                        name: r,
                        describe: l,
                        timetable: n,
                        maxPrice: d,
                        ticketPrice: p,
                        backTrackUid: t.curBackTrackUid
                    });
                    t.$el.find(".content-wrap").html(u), t.contentDes.hide(), t._drawBusLine(bridge, i, !1), a && a()
                }
            })
        }
    }), module.exports = BusStopSearch
});;
define("common:widget/search/modules/subStationSearchModule/inc.js", function(e, t, o) {
    function n() {
        i.apply(this, arguments), this.subStationUpdateModel(this.model)
    }
    var i = e("common:widget/search/modules/busStopSearchModule/inc.js");
    T.inherits(n, i, "SubStationSearch"), T.object.extend(n.prototype, {
        subStationUpdateModel: function(e) {
            e.type = "sub", e.lineName = "地铁", e.stopName = "地铁站"
        }
    }), o.exports = n
});;
define("common:widget/search/modules/busLineSearchModule/inc.js", function(require, exports, module) {
    function BusLineSearch(e, t, i) {
        bridge = i || {}, BusSubCommon.apply(this, arguments), this.busLineUpdateModel(this.model)
    }
    var util = require("common:widget/ui/util/util.js"),
        constant = require("common:widget/ui/constant/Constant.js"),
        PanoEntranceUtil = require("pano:widget/PanoEntranceUtil/PanoEntranceUtil.js"),
        mapUtil = require("common:widget/ui/mapUtil/mapUtil.js"),
        searchData = require("common:widget/ui/searchData/searchData.js"),
        LineView = require("common:widget/view/BusSubLine/LineView.js"),
        BusSubCommon = require("common:widget/search/modules/busSubCommonModule/inc.js"),
        bridge = null;
    T.inherits(BusLineSearch, BusSubCommon, "BusLineSearch"), T.object.extend(BusLineSearch.prototype, {
        render: function() {
            try {
                return this.template = [function(_template_object) {
                    var _template_fun_array = [],
                        fn = function(__data__) {
                            var _template_varName = "";
                            for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                            eval(_template_varName), _template_fun_array.push('<li data-index="', "undefined" == typeof(index + 1) ? "" : baidu.template._encodeHTML(index + 1), '" class="bus-sub-line-item ', "undefined" == typeof selected ? "" : baidu.template._encodeHTML(selected), " ", "undefined" == typeof type ? "" : baidu.template._encodeHTML(type), '" map-on-mouseenter="poiitem" map-on-mouseleave="poiitem">    <div class="top" map-on-click="selectBusLine">        <div class="top-title">            <div class="top-title-container">                                '), lineMeta && (_template_fun_array.push("                "), "nbus" === type ? _template_fun_array.push('                <div class="top-line-meta" title="', "undefined" == typeof(lineMeta[0] || lineMeta[1]) ? "" : baidu.template._encodeHTML(lineMeta[0] || lineMeta[1]), '">', "undefined" == typeof(lineMeta[0] || lineMeta[1]) ? "" : baidu.template._encodeHTML(lineMeta[0] || lineMeta[1]), "</div>                ") : _template_fun_array.push('                <div class="top-line-meta" title="', "undefined" == typeof(lineMeta[1] || lineMeta[0]) ? "" : baidu.template._encodeHTML(lineMeta[1] || lineMeta[0]), '">', "undefined" == typeof(lineMeta[1] || lineMeta[0]) ? "" : baidu.template._encodeHTML(lineMeta[1] || lineMeta[0]), "</div>                "), _template_fun_array.push("                ")), _template_fun_array.push('            </div>        </div>        <div class="top-content">            <div class="bline-row name">                <span class="startName"></span><img width="15" height="10" class="arrow" src="', "/wolfman/static/common/images/transparent.gif", '" /><span class="endName"></span>            </div>            <div class="bline-row">                <span class="ntimetable-wrap">                    <span class="timetable-0">首末车</span                    >：<span class="timetable-1"></span>                </span>            </div>            <div class="bline-row">                起步票价：<span class="ticketPrice-wrap"></span> 元            </div>        </div>    </div>    <div class="content-des">        <a class="unfold" map-on-click="showBusStops" href="javascript:void(0)">            <span>途经站点</span>        </a>    </div>    <div class="content">    </div></li>'), _template_varName = null
                        }(_template_object);
                    return fn = null, _template_fun_array.join("")
                }][0], this.$el = T(this.template(this.model)), this.contentDes = this.$el.find(".content-des"), this.contentWrap = this.$el.find(".content"), this.$el
            } catch (e) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: e.message || e.description,
                    path: "common:widget/search/modules/busLineSearchModule/inc.js",
                    ln: 31
                })
            }
        },
        busLineUpdateModel: function(e) {
            var t = e.ext || {},
                i = (t.detail_info, "(" + this.getStartEndStationStr(e.name) + ")"),
                n = e.name.replace(i, "");
            e.name = n, e.type = "nbus", e.lineMeta = [n], 0 === e.index && (e.selected = "selected", this.selectLine = !0), this.disposeBusLineData(e)
        },
        getStartEndStationStr: function(e) {
            var t = e.length,
                i = e[t - 1],
                n = [];
            if (")" !== i || 2 >= t) return "";
            n.push(i);
            for (var a = t - 2; a >= 0; a--) {
                if ("(" === e[a] && (n.pop(), !n.length)) return e.slice(a + 1, -1);
                ")" === e[a] && n.push(e[a])
            }
            return ""
        },
        getStartEndStation: function(e) {
            var t = e.name;
            return this.getStartEndStationStr(t) || ""
        },
        disposeBusLineData: function(e) {
            var t = this;
            this._getBusLineData(e.uid, function(i) {
                var n, a, s, l = i.content[0],
                    o = t.getStartEndStation(l),
                    r = l.kind,
                    d = l.kindtype,
                    u = ["节假日", "工作日", "高峰车", "定班车", "夜班车"],
                    c = [];
                if ("sub" === e.type) l.timetable && (a = {
                    buslineTypeArray: [{
                        buslineType: "首末车",
                        buslineClass: "busline-time-0"
                    }],
                    timetable: l.timetable
                });
                else if (r) {
                    for (var p = 0; 4 >= p; p++) r & Math.pow(2, p) && (n = u[p], c.push({
                        buslineType: n,
                        buslineClass: "busline-time-" + p
                    }), s = l.timetable);
                    256 == r ? (l.startTime && l.endTime ? (n = "首末班", s = l.startTime + "-" + l.endTime) : l.startTime ? (n = "首班时间", s = l.startTime) : l.endTime ? (n = "末班时间", s = l.endTime) : l.timetable && (n = "首末班", s = l.timetable), c.push({
                        buslineType: n,
                        buslineClass: ""
                    })) : 288 == r && 32 == d && (c.push({
                        buslineType: "时段车",
                        buslineClass: ""
                    }), s = l.timetable), a = {
                        buslineTypeArray: c,
                        timetable: s
                    }, t.model.ntimetable = a
                }
                if (l.maxPrice) var m = l.maxPrice / 100;
                if (l.ticketPrice) var h = l.ticketPrice / 100;
                if (t.model.ntimetable = a, t.model.maxPrice = m, t.model.ticketPrice = h, t.$el) {
                    var b = (100 - t.$el.find(".top-title-container").height()) / 2;
                    if (t.$el.find(".top-title-container").css({
                            "margin-top": b,
                            "margin-bottom": b
                        }), m ? t.$el.find(".maxPrice-wrap").text(m) : t.$el.find(".maxPrice-wrap").parent().remove(), h ? t.$el.find(".ticketPrice-wrap").text(h) : t.$el.find(".ticketPrice-wrap").parent().remove(), o) {
                        var f = o.split("-")[0],
                            v = o.split("-")[1];
                        t.$el.find(".startName").text(f), t.$el.find(".endName").text(v)
                    }
                    if (a) {
                        var _ = t.$el.find(".ntimetable-wrap"),
                            L = [];
                        T.each(a.buslineTypeArray, function(e, t) {
                            var i = ['<span class="timetable-0 ', t.buslineClass, '">', t.buslineType, , "</span>："].join("");
                            L.push(i)
                        }), L.push('<span class="timetable-1">' + a.timetable + "</span>"), _.html(L.join(""))
                    }
                }
                t.busLineData = i, t.afterDisposeBusLineData(), 0 === t.model.index && t._drawBusLine(bridge, l, !1, !0, !0), t.needShowBusLine && (t._drawBusLine(bridge, l, !1, !1, !0), t.needShowBusLine = !1, t.needShowBusLineCallback && t.needShowBusLineCallback(), t.needShowBusLineCallback = void 0)
            })
        },
        afterDisposeBusLineData: function() {
            for (var e, t, i = this.busLineData.content[0], n = this.busLineData.result, a = i.stations, s = a.length, l = (Math.floor(s / 2), 0), o = this.returnLType(n.linetype), r = i.uid, d = 1 == o ? "010A03" : "010A05", u = [], c = [], p = []; s > l;) {
                e = a[l], t = util.parseGeo(e.geo).points, T.object.extend(e, {
                    index: l + 1,
                    point: t,
                    poiType: d,
                    buslineuid: r
                }), u.push({
                    mercatorLnglat: t,
                    poiType: d,
                    name: e.name
                }), c.push(t);
                var m = new BMap.Point(parseFloat(t.split(",")[0]), parseFloat(t.split(",")[1]));
                p.push(m), l++
            }
            this.model.line = i, this.model.stations = a, this.model.panoStations = u, this.model.stationPoints = c, this.model.stationPointsObjectArray = p
        },
        selectBusLineClick: function(e, t) {
            var i = this.busLineData;
            this.select(!0), this.$el.addClass("selected").siblings().removeClass("selected"), this.selectLine = !0, listener.trigger("search.module", "busline_viewport", {
                points: this.model.stationPointsObjectArray
            }), i ? (this._drawBusLine(bridge, i.content[0], !1, !1, !0), t && t()) : (this.needShowBusLine = !0, this.needShowBusLineCallback = t)
        },
        hideBusLineClick: function(e) {
            addStat("searchresult.busline.hidestations", "click", {}), this.contentWrap.hide(), this.contentDes.show(), e.scrollUpdate === !1
        },
        showBusStopsClick: function(e, t) {
            addStat("searchresult.busline.showstations", "click", {});
            var i = this;
            if (!this.isSelected()) return void this.selectBusLineClick({}, function() {
                i.showBusStopsClick(e, t)
            });
            bridge && bridge.showStopsLine && bridge.showStopsLine.hideBusLineClick({
                scrollUpdate: !1
            }), bridge.showStopsLine = this, this.contentDes.hide();
            var n = this.busLineData.content[0],
                a = new LineView({
                    stations: n.stations,
                    type: this.model.type,
                    expandable: !0
                }),
                s = a.render();
            this.contentWrap.show().empty().append(s), this._getPanoEntrancesData(this.setBusStopPanoEntrances), t && t()
        },
        setBusStopPanoEntrances: function(e) {
            this.busPanoData = e;
            var t = this.$el.find(".street-view-point");
            PanoEntranceUtil.walkThroughPanoEntrances(t, e, "busline")
        },
        selectBusStopClick: function(e) {
            addStat("searchresult.busline.selectbusstop", "click", {}); {
                var t = e.directTarget,
                    i = t.attr("data-busStopIndex");
                this.model.stations[i]
            }
            this.selectBusStop(i, this.data.name, this.model.index)
        }
    }), module.exports = BusLineSearch
});;
define("common:widget/search/modules/subLineSearchModule/inc.js", function(e, n, i) {
    function o() {
        s.apply(this, arguments), this.subLineUpdateModel(this.model)
    }
    var s = e("common:widget/search/modules/busLineSearchModule/inc.js");
    T.inherits(o, s, "SubLineSearch"), T.object.extend(o.prototype, {
        subLineUpdateModel: function(e) {
            e.type = "sub"
        },
        showBusLineClick: function() {}
    }), i.exports = o
});;
define("common:widget/search/modules/missingModule/inc.js", function(e, i, t) {
    function n() {
        _.apply(this, arguments), this.config = this.getMissingConfig(), this.$el = T("")
    }
    var _ = e("common:widget/search/modules/baseSearchModule/inc.js"),
        s = e("common:widget/ui/constant/Constant.js");
    T.inherits(n, _, "Missing"), T.object.extend(n.prototype, {
        getMissingConfig: function() {
            return {
                marker: {
                    common: {
                        image: s.A_J_MARKER_IMG_NEW,
                        size: s.A_J_MARKER_CENTERBLUE_SIZE,
                        offset: s.A_J_MARKER_CENTERBLUE_OFFSET,
                        imageOffset: new BMap.Size(0, 193),
                        infoWindowOffset: s.A_J_MARKER_INFOWND_OFFSET,
                        imageSize: new BMap.Size(s.A_J_MARKER_IMG_NEW_WIDTH, s.A_J_MARKER_IMG_NEW_HEIGHT),
                        srcSet: s.A_J_MARKER_IMG_NEW2X_SRCSET
                    },
                    highlight: {
                        image: s.A_J_MARKER_IMG_NEW,
                        size: s.A_J_MARKER_CENTERBLUE_SIZE,
                        offset: s.A_J_MARKER_CENTERBLUE_OFFSET,
                        imageOffset: new BMap.Size(0, 233),
                        infoWindowOffset: s.A_J_MARKER_INFOWND_OFFSET,
                        imageSize: new BMap.Size(s.A_J_MARKER_IMG_NEW_WIDTH, s.A_J_MARKER_IMG_NEW_HEIGHT),
                        srcSet: s.A_J_MARKER_IMG_NEW2X_SRCSET
                    }
                }
            }
        },
        generateMarker: function() {
            var e = this,
                i = this.getIcon(this.config.marker.common),
                t = new BMap.Marker(this.model.point, {
                    icon: i,
                    zIndexFixed: !0,
                    baseZIndex: 25e5
                });
            return map.addOverlay(t), t._stCode = s.OVERLAY_STYLE.GEN_MKR1, t.setTitle(window.GRControll.openedMarker.name), t.addEventListener("mouseover", function() {
                e.highlightMarker()
            }), t.addEventListener("mouseout", function() {
                e.unhighlightMarker()
            }), t.addEventListener("click", function() {
                e.select()
            }), t
        },
        select: function() {
            this.isActive() || this.activate(), this.highlightMarker(), this.showInfoWindow(!0), this.selected = !0
        }
    }), t.exports = n
});;
define("common:widget/search/modules/damoceSearchModule/inc.js", function(require, exports, module) {
    function DamoceSearch() {
        BaseSearch.apply(this, arguments), this.businessType = "damoce", this.adUpdateModel()
    }
    var constant = require("common:widget/ui/constant/Constant.js"),
        util = require("common:widget/ui/util/util.js"),
        ecommUtil = require("common:widget/ui/ecommUtil/ecommUtil.js"),
        BaseSearch = require("common:widget/search/modules/baseSearchModule/inc.js");
    T.inherits(DamoceSearch, BaseSearch, "DamoceSearch"), T.object.extend(DamoceSearch.prototype, {
        adUpdateModel: function() {
            this.model.ext.x && (this.model.point = new BMap.Point(this.model.ext.x, this.model.ext.y), this.model.pointStr = this.model.point.lng + "|" + this.model.point.lat), this.model.name = this.model.ext.name, this.model.addr = this.model.ext.addr, this.config.marker.common.imageOffset = new BMap.Size(constant.A_J_MARKER_RED_ICON_WID * this.showIndex, constant.A_J_MARKER_ORANGE_ICON_Y)
        },
        render: function() {
            try {
                addStat("poisearch.item.damoce", "show");
                var model = this.model;
                return require.loadCss({
                    content: model.search_item_css
                }), this.template = 1 === model.ext.type || 3 === model.ext.type ? [function(_template_object) {
                    var _template_fun_array = [],
                        fn = function(__data__) {
                            var _template_varName = "";
                            for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                            eval(_template_varName), _template_fun_array.push('<li data-index="', "undefined" == typeof(index + 1) ? "" : index + 1, '" class="search-item damoce-search-item" ', "undefined" == typeof("poi" === ext.exptype ? 'map-on-click="poiitem"' : "") ? "" : "poi" === ext.exptype ? 'map-on-click="poiitem"' : "", ' map-on-mouseenter="poiitem" map-on-mouseleave="poiitem" data-stat-code="poisearch.damoce.item" >    ', "undefined" == typeof search_item_html ? "" : search_item_html, "</li>"), _template_varName = null
                        }(_template_object);
                    return fn = null, _template_fun_array.join("")
                }][0] : [function(_template_object) {
                    var _template_fun_array = [],
                        fn = function(__data__) {
                            var _template_varName = "";
                            for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                            eval(_template_varName), _template_fun_array.push('<li data-index="', "undefined" == typeof(index + 1) ? "" : index + 1, '" class="search-item damoce-search-item damoce-search-item-nopoi" map-on-mouseenter="poiitem" map-on-mouseleave="poiitem" data-stat-code="poisearch.damoce.item" >    ', "undefined" == typeof search_item_html ? "" : search_item_html, "</li>"), _template_varName = null
                        }(_template_object);
                    return fn = null, _template_fun_array.join("")
                }][0], this.$el = T(this.template(this.model)), this.$el.find(".damoce-search-item-index").addClass("damoce-search-index-" + (this.model.showIndex + 1)), this.$el
            } catch (e) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: e.message || e.description,
                    path: "common:widget/search/modules/damoceSearchModule/inc.js",
                    ln: 51
                })
            }
        },
        initialize: function() {
            try {
                this.model.point && (this.marker = this.generateMarker())
            } catch (e) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: e.message || e.description,
                    path: "common:widget/search/modules/damoceSearchModule/inc.js",
                    ln: 56
                })
            }
        },
        initializeAfterRender: function() {
            try {
                this.evalFunc(this.model.search_item_js, "damoce_item_func", this.$el[0])
            } catch (e) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: e.message || e.description,
                    path: "common:widget/search/modules/damoceSearchModule/inc.js",
                    ln: 60
                })
            }
        },
        generateInfoWnd: function(e) {
            if (!this.model.point) return null;
            require.loadCss({
                content: this.model.bubble_title_css + this.model.bubble_content_css
            });
            var t = e.createAdInfWindow(this.model.bubble_title_html, this.model.bubble_content_html, {
                    name: this.model.name,
                    cityCode: this.searchData.sCityCode,
                    x: this.model.point.lng,
                    y: this.model.point.lat
                }),
                a = this;
            return t && (t._aIndex = this.index, t.addEventListener("close", function() {
                a.cancelSelect()
            }), t.addEventListener("open", function() {
                addStat("poisearch.list.damoceinfowin", "show", {
                    da_trd: a.searchData.trdName,
                    d_stat: a.searchData.damoceStat,
                    s_from: a.searchData.searchFrom
                }), a.evalFunc(a.model.bubble_title_js, "damoce_title_func", T(".damoce-bubble-title").get(0)), a.evalFunc(a.model.bubble_content_js, "damoce_content_func", T(".damoce-bubble-content").get(0))
            }), this.searchData.isGRequest && (t.addEventListener("close", function() {
                window.GRControll.openedMarker = null
            }), t.addEventListener("open", function() {
                window.GRControll.openedMarker = {
                    uid: a.model.uid,
                    geo: a.model.geo,
                    name: a.model.name
                }
            }))), t
        },
        evalFunc: function(e, t, a) {
            try {
                try {
                    if (e && t) {
                        var o = (new Date).getTime(),
                            n = t + o,
                            i = new RegExp("function\\s+" + t);
                        e = e.replace(i, "window." + n + "=function"), util.evalScript(e), window[n] && window[n](a), delete window[n]
                    }
                } catch (m) {}
            } catch (m) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: m.message || m.description,
                    path: "common:widget/search/modules/damoceSearchModule/inc.js",
                    ln: 122
                })
            }
        }
    }), module.exports = DamoceSearch
});;
define("common:widget/search/filters/SearchFilter/FilterUtil.js", function(e, t, o) {
    var c = void 0,
        i = Math.floor((new Date - Date.parse("01/01/2012")) / 864e5) + ",+",
        a = {
            cater: "餐馆",
            hotel: "酒店",
            scope: "景点",
            movie: "电影院"
        };
    o.exports = {
        comTag: c,
        sectionDiscount: i,
        getAreaData: function(e, t) {
            setTimeout(function() {
                t && t(null)
            }, 100)
        },
        getTypeTag: function(e) {
            return a[e] || "分类"
        },
        getBookTag: function(e, t) {
            var o;
            switch (t) {
                case "cater":
                    o = "1-1" === e.d_cater_book_pc_section ? "item-selected" : "";
                    break;
                case "hotel":
                    o = "1-1" === e.d_hotel_book_pc_section ? "item-selected" : "";
                    break;
                case "scope":
                    o = "1-1" === e.d_ticket_book_flag_section ? "item-selected" : ""
            }
            return o
        }
    }
});;
define("common:widget/search/filters/SearchFilter/SearchFilter.js", function(require, exports, module) {
    function SearchFilter(t, e) {
        this.json = t, this.cinfo = e && e.cinfo ? e.cinfo : {}, this.cityCode = t.current_city.up_cityid || t.current_city.code, this.wd = t.result.wd, this.what = t.result.what, this.dataType = t.place_info.d_data_type || "", this.subType = t.place_info.d_sub_type || "", this.businessType = t.place_info.d_business_type, this.isnbSearch = e.cinfo && e.cinfo.isnbSearch ? e.cinfo.isnbSearch : "", this.what ? (this.curTag = this.what.split(" ")[0] || this.what, filterStatus.tag = this.curTag) : this.wd && (this.curTag = this.wd.split(" ")[0] || this.wd, filterStatus.tag = this.curTag), this.cinfo.isFilter || filterStatus.active && this.cinfo.perPageSearch || (filterStatus.active = !1, filterStatus.specialFlag = !1), filterStatus.active || this.cinfo.noChangeMap ? (this.curTag = filterStatus.tag, this.curArea = filterStatus.businessName || filterStatus.districtName || "") : (this.curArea = t.result.where || "", filterStatus.active = !1, filterStatus.specialFlag = !1)
    }
    var hotImg = "//webmap1.bdimg.com/wolfman/static/common/images/hot_8f6c491.png",
        filterConf = require("common:widget/search/filters/SearchFilter/FilterConfig.js"),
        placeData = filterConf.placeData,
        filterMap = filterConf.filterMap,
        sortNameMap = filterConf.sortNameMap,
        filterUtil = require("common:widget/search/filters/SearchFilter/FilterUtil.js"),
        comTag = filterUtil.comTag,
        searchInTag = filterUtil.searchInTag,
        sectionDiscount = filterUtil.sectionDiscount,
        searchParam = require("common:widget/search/SearchUrlParam.js"),
        searchUtil = require("common:widget/search/SearchUtil.js"),
        config = require("common:widget/ui/config/config.js"),
        MapConfig = config.mapConfig,
        modelConfig = config.modelConfig,
        filterStatus = require("common:widget/ui/FilterStatus/FilterStatus.js"),
        areaMap = {},
        filterParam = {},
        filterTmpl = [function(_template_object) {
            var _template_fun_array = [],
                fn = function(__data__) {
                    var _template_varName = "";
                    for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                    eval(_template_varName), _template_fun_array.push('<div id="caterFilter">    '), hasFilter && (_template_fun_array.push('    <ul class="toolbar clearfix  '), hasSort || _template_fun_array.push("tool-bar-two"), _template_fun_array.push('">        <li class="tool-item city-item '), hasSort || _template_fun_array.push("tool-item-two"), _template_fun_array.push(" "), curFilterObj.isnbSearch && _template_fun_array.push("hide"), _template_fun_array.push('" data-type="city-panel">            <label>', "undefined" == typeof(curFilterObj.defArea || "所有地区") ? "" : curFilterObj.defArea || "所有地区", '</label>            <i class="icon-cater arrow"></i>        </li>                <li class="tool-item '), curFilterObj.isnbSearch && _template_fun_array.push("tool-item-noarea"), _template_fun_array.push(" tag-item  botn-line  "), hasSort || _template_fun_array.push("tool-item-two"), _template_fun_array.push('" data-type="tag-panel"  data-stat-code="poisearch.selecttag.', "undefined" == typeof dataType ? "" : dataType, '">            <label>', "undefined" == typeof curFilterObj.defTag ? "" : curFilterObj.defTag, '</label>            <i class="icon-cater arrow"></i>        </li>        '), hasSort && (_template_fun_array.push('        <li class="tool-item '), curFilterObj.isnbSearch && _template_fun_array.push("tool-item-noarea"), _template_fun_array.push(' sort-item" data-type="sort-panel"  data-stat-code="poisearch.selectsort.', "undefined" == typeof dataType ? "" : dataType, '">            <label>', "undefined" == typeof curFilterObj.defSort ? "" : curFilterObj.defSort, '</label>            <i class="icon-cater arrow"></i>        </li>         ')), _template_fun_array.push("    </ul>    ")), _template_fun_array.push('<!--     <div class="place-filter-cb">        '), hasPremium && "cater" !== dataType && _template_fun_array.push('        <a class="placeFilter ', "undefined" == typeof curFilterObj.defPremium ? "" : curFilterObj.defPremium, '" data-type="premium" href="javascript:void(0);" data-stat-code="poisearch.premium.', "undefined" == typeof dataType ? "" : dataType, '">            <em class="checkbox"></em><span>有优惠</span>        </a>        '), _template_fun_array.push("        "), hasGroupon && _template_fun_array.push('        <a class="placeFilter ', "undefined" == typeof curFilterObj.defGroupon ? "" : curFilterObj.defGroupon, '" data-type="groupon" href="javascript:void(0);" data-stat-code="poisearch.groupon.', "undefined" == typeof dataType ? "" : dataType, '">            <em class="checkbox"></em><span>正在团购</span>        </a>        '), _template_fun_array.push("        "), hasBook && "cater" !== dataType && _template_fun_array.push('        <a class="placeFilter ', "undefined" == typeof curFilterObj.defBook ? "" : curFilterObj.defBook, '" data-type="book" href="javascript:void(0);" data-stat-code="poisearch.book.', "undefined" == typeof dataType ? "" : dataType, '">            <em class="checkbox"></em><span>', "undefined" == typeof(curFilterObj.bookName || "在线预订") ? "" : curFilterObj.bookName || "在线预订", "</span>        </a>        "), _template_fun_array.push('    </div>     -->    <div class="select-panel-city clearfix">        <div class="hd-list-wrap">            <ul class="areaList hd-list"></ul>                    </div>        <div id="bsAreaList">            <ul class="bdList bd-list" ></ul>        </div>    </div>    <div class="select-panel-tag" id="select_panel_tag"></div>    <div class="select-panel-sort '), curFilterObj.isnbSearch && _template_fun_array.push("select-panel-sort-noarea"), _template_fun_array.push('" id="select_panel_sort"></div>'), _template_varName = null
                }(_template_object);
            return fn = null, _template_fun_array.join("")
        }][0];
    require.loadCss({
        content: '@charset "UTF-8";#caterFilter{font-family:"宋体",Arial,sans-serif;position:relative;zoom:1}#caterFilter .toolbar{border:1px solid #d5d8dc;background-color:#f8f9fc;margin:10px 0;zoom:1}#caterFilter .tool-item{float:left;width:114px;line-height:14px;padding:6px 0;text-align:center;cursor:pointer;zoom:1;cursor:pointer;position:relative;*zoom:1}#caterFilter .tool-item.sort-item{width:auto;overflow:hidden;float:none}#caterFilter .tool-item.tag-item{width:171px}#caterFilter .tool-item.city-item{display:none}#caterFilter .tool-item label{cursor:pointer}#caterFilter .tool-item .icon-cater{display:block;position:absolute;top:10px;right:10px;height:4px;width:7px;background:url(//webmap0.bdimg.com/wolfman/static/common/images/arrow_4e4b4f6.png) no-repeat}#caterFilter .tool-item .arrow{background-position:-11px 0;margin-left:6px}#caterFilter .tool-item-noarea{width:143px}#caterFilter .botn-line{border-right:1px solid #eaeaef;border-left:1px solid #eaeaef}#caterFilter ul,#caterFilter li{padding:0;margin:0}#caterFilter .select-panel-city,#caterFilter .select-panel-tag{box-sizing:border-box;display:none;position:absolute;z-index:10;background-color:#f8f9fc;width:100%;border:1px solid #d5d8dc;border-top:0;left:0;top:28px;*top:39px;overflow:hidden}#caterFilter .select-panel-sort{display:none;height:250px}#caterFilter .select-panel-city .bd-list{padding:10px 13px;width:155px;float:left}#caterFilter .select-panel-city .bd-list li{display:inline-block;*display:inline;*zoom:1;margin-bottom:5px}#caterFilter .select-panel-city .bd-list .item{display:block;padding:0 5px;line-height:20px;height:20px;text-decoration:none;color:#333}#caterFilter .select-panel-city .hd-list-wrap{float:left;width:114px;background-color:#fff;border-right:1px solid #eaeaef;background-color:#fff;margin-bottom:-10000px;padding-bottom:10000px}#caterFilter .select-panel-city .bd-list .item:hover{background-color:#deeaff;text-decoration:none;color:#3f61b1}#caterFilter .select-panel-city .hd-list .label{display:block;padding-left:23px;margin-left:4px;height:25px;line-height:25px;border:1px solid #fff;cursor:pointer}#caterFilter .select-panel-city .hd-list .active .label{border:1px solid #eaeaef;background-color:#f8f9fc;border-right:1px solid #f8f9fc;position:relative;right:-1px;padding-left:22px}#caterFilter.city-panel .toolbar .city-item{background-color:#fff}#caterFilter .select-panel-tag{background-color:#fff}#caterFilter.city-panel .toolbar .city-item,#caterFilter.tag-panel .toolbar .tag-item,#caterFilter.sort-panel .toolbar .sort-item{background-color:#fff;position:relative;bottom:-1px;padding-top:5px;padding-bottom:7px}#caterFilter.city-panel .city-item .arrow,#caterFilter.tag-panel .tag-item .arrow,#caterFilter.sort-panel .sort-item .arrow{background-position:0 0;top:9px}#caterFilter.city-panel .select-panel-city,#caterFilter.tag-panel .select-panel-tag,#caterFilter.sort-panel .select-panel-sort{display:block}#caterFilter .select-panel-tag{display:none;padding:10px 0 5px;height:auto}#caterFilter .select-panel-tag dd{float:left;color:#369;width:233px}#caterFilter .select-panel-tag dt{float:left;text-align:right;width:54px;color:#369}#caterFilter .select-panel-tag dt h3,#caterFilter .select-panel-tag dt h2{font-size:12px;height:20px;line-height:20px;font-weight:400}.label{color:#999;font-weight:400}#caterFilter .select-panel-tag dt h2{font-weight:700;color:#333}#caterFilter .select-panel-tag .tag-list{padding:0 10px;margin-bottom:5px}#caterFilter .select-panel-tag .tag-list li{display:inline-block;*display:inline;*zoom:1}#caterFilter .select-panel-tag .tag-list .item{display:inline-block;*display:inline;*zoom:1;padding:0 5px;line-height:20px;height:20px;text-decoration:none;color:#666}#caterFilter .select-panel-tag .tag-list .item:hover{background-color:#deeaff;text-decoration:none;color:#3f61b1}#caterFilter .select-panel-sort{display:none;position:absolute;z-index:10;background-color:#fff;width:100%;box-sizing:border-box;border:1px solid #d5d8dc;border-top:0;left:0;top:28px;*top:39px;height:auto}#caterFilter .select-panel-sort .item{display:block;line-height:25px;height:25px;text-decoration:none;color:#333;text-align:center}#caterFilter .select-panel-sort .item:hover{background-color:#f6f6f6;text-decoration:none}#caterFilter .select-panel-sort-noarea .item{padding-left:0;text-align:center}',
        name: "SearchFilter"
    }), T.inherits(SearchFilter, T.lang.Class, "SearchFilter"), T.extend(SearchFilter.prototype, {
        render: function() {
            try {
                var t = this.getFilterHtml(this.json);
                return t
            } catch (e) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: e.message || e.description,
                    path: "common:widget/search/filters/SearchFilter/SearchFilter.js",
                    ln: 89
                })
            }
        },
        initialize: function() {
            try {
                this.filterEl = T.dom("#caterFilter"), this.tagEl = T("#select_panel_tag"), this.sortEl = T("#select_panel_sort"), this.getFilterTag(), this.getAreaData(this.cityCode), this.bindEvent()
            } catch (t) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: t.message || t.description,
                    path: "common:widget/search/filters/SearchFilter/SearchFilter.js",
                    ln: 105
                })
            }
        },
        bindEvent: function() {
            var t = this.filterEl,
                e = this;
            t.delegate(".tool-item", "click", function() {
                var e = T.dom(this),
                    a = e.data("type");
                t.attr("class", t.hasClass(a) ? "" : a)
            }), t.delegate(".areaItem", "mouseover", function() {
                e.showMenu(T.dom(this))
            }), t.delegate(".areaItem", "mouseout", function() {
                e.ptimer && clearTimeout(e.ptimer), e.ptimer = ""
            }), t.delegate(".placeFilter", "click", function() {
                e.toggleFilter(this)
            }), t.delegate(".selectItem", "click", function() {
                e.selectItem(this)
            })
        },
        getFilterHtml: function(t) {
            var e = t.place_info || {},
                a = e.d_sort_type + "," + e.d_sort_rule,
                i = this.curArea || "所有地区",
                r = this.curTag || "",
                l = sortNameMap[a] || "默认排序",
                s = e.d_discount2_section === sectionDiscount.replace(",", "-") ? "item-selected" : "",
                o = e.d_groupon_section === sectionDiscount.replace(",", "-") ? "item-selected" : "",
                c = filterUtil.getBookTag(e, this.dataType),
                n = {
                    dataType: this.dataType,
                    hasFilter: filterConf.hasFilterReg.test(this.dataType),
                    hasPremium: filterConf.hasPremiumReg.test(this.dataType),
                    hasGroupon: filterConf.hasGrouponReg.test(this.dataType),
                    hasBook: filterConf.hasBookReg.test(this.dataType),
                    hasSort: filterConf.hasSortReg.test(this.dataType)
                };
            n.curFilterObj = {
                defArea: i,
                defTag: r,
                defSort: l,
                defGroupon: o,
                defPremium: s,
                defBook: c,
                dataType: this.dataType,
                isnbSearch: this.isnbSearch
            }, this.filterData = n;
            var p = filterTmpl(n);
            return p
        },
        getFilterTag: function() {
            switch (this.dataType) {
                case "cater":
                    this.getCaterAsync();
                    break;
                case "hotel":
                    this.getHotelAsync();
                    break;
                case "scope":
                    this.getScopeAsync();
                    break;
                case "bank":
                    this.getBankAsync();
                    break;
                case "life":
                    this.getLifeAsync();
                    break;
                case "shopping":
                    this.getShoppingAsync();
                    break;
                case "hospital":
                    this.getHospitalAsync();
                    break;
                case "beauty":
                    this.getBeautyAsync()
            }
        },
        getCaterAsync: function() {
            var t = this;
            require.async(["common:widget/search/filters/CaterFilter/CaterFilter.js"], function(e) {
                e.render(t.tagEl, t.sortEl, {
                    data: t.json
                })
            })
        },
        getHotelAsync: function() {
            var t = this;
            require.async(["common:widget/search/filters/HotelFilter/HotelFilter.js"], function(e) {
                e.render(t.tagEl, t.sortEl, {
                    data: t.json
                })
            })
        },
        getScopeAsync: function() {
            var t = this;
            require.async(["common:widget/search/filters/ScopeFilter/ScopeFilter.js"], function(e) {
                e.render(t.tagEl, t.sortEl, {
                    data: t.json
                })
            })
        },
        getBankAsync: function() {
            var t = this;
            require.async(["common:widget/search/filters/BankFilter/BankFilter.js"], function(e) {
                e.render(t.tagEl, t.sortEl, {
                    data: t.json
                })
            })
        },
        getLifeAsync: function() {
            var t = this;
            require.async(["common:widget/search/filters/LifeFilter/LifeFilter.js"], function(e) {
                e.render(t.tagEl, t.sortEl, {
                    data: t.json
                })
            })
        },
        getShoppingAsync: function() {
            var t = this;
            require.async(["common:widget/search/filters/ShoppingFilter/ShoppingFilter.js"], function(e) {
                e.render(t.tagEl, t.sortEl, {
                    data: t.json
                })
            })
        },
        getHospitalAsync: function() {
            var t = this;
            require.async(["common:widget/search/filters/HospitalFilter/HospitalFilter.js"], function(e) {
                e.render(t.tagEl, t.sortEl, {
                    data: t.json
                })
            })
        },
        getBeautyAsync: function() {
            var t = this;
            require.async(["common:widget/search/filters/BeautyFilter/BeautyFilter.js"], function(e) {
                e.render(t.tagEl, t.sortEl, {
                    data: t.json
                })
            })
        },
        getAreaData: function(t) {
            var e = this;
            return areaMap[t] ? this.buildAreaMenu(areaMap[t]) : void filterUtil.getAreaData(t, function(a) {
                areaMap[t] = a, e.buildAreaMenu(a)
            })
        },
        buildAreaMenu: function(t) {
            var e = [{
                    n: "全部",
                    sub: ["所有地区"]
                }],
                a = t && t.data || {},
                i = a.content || {},
                r = e.concat(i.place_tag || []),
                l = [],
                s = "",
                o = "",
                c = "";
            this.bdMap = {};
            for (var n = 0; n < r.length; n++) 1 === n && (s = r[n].n), o = 1 === n ? "active" : "", c = '<li class="areaItem ' + o + '" data-value="' + r[n].n + '"><span class="label">' + r[n].n + "</span></li>", l.push(c), this.bdMap[r[n].n] = r[n].sub;
            this.filterEl.find(".areaList").html(l.join("")), this.buildBdMenu(s)
        },
        buildBdMenu: function(t) {
            for (var e, a = this.bdMap[t] || [], i = [], r = 0; r < a.length; r++) e = "全部" === a[r] ? t : a[r], e = "所有地区" === e ? "" : e, i.push('<li><a data-value="area:' + e + '" class="selectItem item" href="javascript:;">' + a[r] + "</a></li>");
            this.filterEl.find(".bdList").html(i.join(""))
        },
        showMenu: function(t) {
            var e = this;
            this.ptimer = setTimeout(function() {
                e.filterEl.find(".areaItem").removeClass("active"), t.addClass("active"), e.buildBdMenu(t.data("value"))
            }, 100)
        },
        toggleFilter: function(t) {
            {
                var e = T.dom(t),
                    a = e.data("type"),
                    i = e.hasClass("item-selected"),
                    r = i ? "removeClass" : "addClass";
                T.dom(".placeFilter")
            }
            e[r]("item-selected");
            var l = searchParam[this.dataType];
            i ? (filterMap[a] && delete l[filterMap[a]], "book" == a && ("scope" == this.dataType ? l.pl_ticket_book_flag_section = "0,+" : "hotel" == this.dataType && (l.pl_hotel_book_pc_section = "0"))) : (filterMap[a] && (l[filterMap[a]] = "book" === a ? "1,1" : sectionDiscount), "book" == a && ("scope" == this.dataType ? l.pl_ticket_book_flag_section = "1,1" : "hotel" == this.dataType && (l.pl_hotel_book_pc_section = "1"))), filterStatus.active === !0 && (l.district_name = filterStatus.districtName, l.business_name = filterStatus.businessName), this.placeRequest(l)
        },
        selectItem: function(t) {
            var e = T.dom(t),
                a = e.data("value") || "";
            a = a.split(":");
            var i = a[0],
                r = a[1];
            switch (i) {
                case "tag":
                    this.curTag = r, this.wd = r, filterStatus.tag = r;
                    break;
                case "area":
                    this.curArea = r;
                    var l = this.filterEl.find(".active").data("value");
                    filterStatus.active = !0, filterStatus.districtName = l, filterStatus.specialFlag = "全部" === e.text() ? !0 : !1, filterStatus.businessName = "全部" === e.text() ? "" : r;
                    break;
                case "sort":
                    var s = r.split(",");
                    searchParam[this.dataType].pl_sort_type = s[0], searchParam[this.dataType].pl_sort_rule = s[1];
                    break;
                case "price":
                    searchParam[this.dataType].pl_price_section = r, filterStatus.PriceTag = r
            }
            this.filterEl.attr("class", ""), filterStatus.active === !0 && (searchParam[this.dataType].district_name = filterStatus.districtName || "", searchParam[this.dataType].business_name = filterStatus.businessName || ""), this.placeRequest(searchParam[this.dataType])
        },
        placeRequest: function(t) {
            t.wd = filterStatus.specialFlag === !0 ? filterStatus.tag ? filterStatus.tag + " " + filterStatus.districtName : this.wd : filterStatus.tag || this.wd, "data_type" == t.pl_sort_type && (t.pl_sort_type = "default"), this.dispatchEvent("filterquery", {
                type: "filterquery",
                data: t
            }), t.pl_business_type == this.dataType && delete t.wd
        }
    }), module.exports = SearchFilter
});;
define("common:widget/search/filters/BankFilter/BankFilterData.js", function(a, e, t) {
    t.exports = {
        dataType: "bank",
        tagFilter: {
            name: "不限分类",
            value: [{
                name: "全部银行",
                value: "tag:银行"
            }, {
                name: "工商银行",
                value: "tag:工商银行"
            }, {
                name: "建设银行",
                value: "tag:建设银行"
            }, {
                name: "农业银行",
                value: "tag:农业银行"
            }, {
                name: "中国银行",
                value: "tag:中国银行"
            }, {
                name: "招商银行",
                value: "tag:招商银行"
            }, {
                name: "交通银行",
                value: "tag:交通银行"
            }, {
                name: "邮政储蓄",
                value: "tag:邮政储蓄"
            }, {
                name: "农村信用社",
                value: "tag:农村信用社"
            }, {
                name: "中信银行",
                value: "tag:中信银行"
            }, {
                name: "民生银行",
                value: "tag:民生银行"
            }, {
                name: "光大银行",
                value: "tag:光大银行"
            }, {
                name: "广发银行",
                value: "tag:广发银行"
            }, {
                name: "北京银行",
                value: "tag:北京银行"
            }, {
                name: "浦发银行",
                value: "tag:浦发银行"
            }, {
                name: "平安银行",
                value: "tag:平安银行"
            }, {
                name: "兴业银行",
                value: "tag:兴业银行"
            }]
        },
        sortFilter: {
            name: "综合排序",
            value: [{
                name: "综合排序",
                value: "data_type,0"
            }]
        }
    }
});;
define("common:widget/search/filters/BankFilter/BankFilter.js", function(require, exports, module) {
    var bankData = require("common:widget/search/filters/BankFilter/BankFilterData.js"),
        tagTpl = [function(_template_object) {
            var _template_fun_array = [],
                fn = function(__data__) {
                    var _template_varName = "";
                    for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                    eval(_template_varName), _template_fun_array.push('<div class="bank-filter-tag">    <ul class="tag-list">        ');
                    for (var j = 0; j < tagFilter.value.length; j++) _template_fun_array.push('        <li>            <a data-value="', "undefined" == typeof tagFilter.value[j].value ? "" : tagFilter.value[j].value, '" class="selectItem item" href="javascript:;">                ', "undefined" == typeof tagFilter.value[j].name ? "" : tagFilter.value[j].name, "            </a>        </li>        ");
                    _template_fun_array.push("    </ul></div>"), _template_varName = null
                }(_template_object);
            return fn = null, _template_fun_array.join("")
        }][0],
        sortTpl = [function(_template_object) {
            var _template_fun_array = [],
                fn = function(__data__) {
                    var _template_varName = "";
                    for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                    eval(_template_varName), _template_fun_array.push("<ul>    ");
                    for (var i = 0; i < sortFilter.value.length; i++) _template_fun_array.push('    <li>        <a data-value="sort:', "undefined" == typeof sortFilter.value[i].value ? "" : sortFilter.value[i].value, '" href="javascript:;" class="selectItem item"  data-stat-code="poisearch.sorttype.', "undefined" == typeof sortFilter.value[i].value ? "" : sortFilter.value[i].value, ".", "undefined" == typeof dataType ? "" : dataType, '">            ', "undefined" == typeof sortFilter.value[i].name ? "" : sortFilter.value[i].name, "        </a>    </li>    ");
                    _template_fun_array.push("</ul>"), _template_varName = null
                }(_template_object);
            return fn = null, _template_fun_array.join("")
        }][0],
        searchInTag = function(e) {
            for (var a = [], t = e.tagFilter.value, r = 0; r < t.length; r++) a.push(t[r].name), a.push(t[r].value);
            return a = a.join(","),
                function(e) {
                    return a.indexOf(e) >= 0
                }
        }(bankData);
    require.loadCss({
        content: "#caterFilter .tool-bar-two .tool-item-two{width:50%;box-sizing:border-box}",
        name: "BankFilter"
    });
    var bankFilter = {
        render: function(e, a, t) {
            try {
                e.html(tagTpl(bankData)), this.setTag(t)
            } catch (r) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: r.message || r.description,
                    path: "common:widget/search/filters/BankFilter/BankFilter.js",
                    ln: 41
                })
            }
        },
        initialize: function() {
            try {} catch (e) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: e.message || e.description,
                    path: "common:widget/search/filters/BankFilter/BankFilter.js",
                    ln: 46
                })
            }
        },
        setTag: function(e) {
            e = e || {};
            var a = e.data,
                t = a.result.wd,
                r = t.split(" ")[0] || t;
            searchInTag(r) ? "银行" === r && (r = "所有银行") : r = "所有银行", T("#caterFilter .tag-item label").html(r)
        }
    };
    module.exports = bankFilter
});;
define("common:widget/search/filters/BeautyFilter/BeautyFilterData.js", function(e, a, t) {
    t.exports = {
        dataType: "beauty",
        tagFilter: {
            name: "不限分类",
            value: [{
                name: "丽人",
                value: "tag:丽人"
            }, {
                name: "美容",
                value: "tag:美容"
            }, {
                name: "美发",
                value: "tag:美发"
            }, {
                name: "美甲",
                value: "tag:美甲"
            }, {
                name: "美体",
                value: "tag:美体"
            }]
        },
        sortFilter: {
            name: "综合排序",
            value: [{
                name: "综合排序",
                value: "data_type,0"
            }, {
                name: "评分高到低",
                value: "overall_rating,0"
            }, {
                name: "评论数多到少",
                value: "comment_num,0"
            }, {
                name: "价格低到高",
                value: "price,1"
            }, {
                name: "价格高到低",
                value: "price,0"
            }]
        }
    }
});;
define("common:widget/search/filters/BeautyFilter/BeautyFilter.js", function(require, exports, module) {
    var beautyData = require("common:widget/search/filters/BeautyFilter/BeautyFilterData.js"),
        tagTpl = [function(_template_object) {
            var _template_fun_array = [],
                fn = function(__data__) {
                    var _template_varName = "";
                    for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                    eval(_template_varName), _template_fun_array.push('<div class="beauty-filter-tag">    <ul class="tag-list">        ');
                    for (var j = 0; j < tagFilter.value.length; j++) _template_fun_array.push('        <li>            <a data-value="', "undefined" == typeof tagFilter.value[j].value ? "" : tagFilter.value[j].value, '" class="selectItem item" href="javascript:;">                ', "undefined" == typeof tagFilter.value[j].name ? "" : tagFilter.value[j].name, "            </a>        </li>        ");
                    _template_fun_array.push("    </ul></div>"), _template_varName = null
                }(_template_object);
            return fn = null, _template_fun_array.join("")
        }][0],
        sortTpl = [function(_template_object) {
            var _template_fun_array = [],
                fn = function(__data__) {
                    var _template_varName = "";
                    for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                    eval(_template_varName), _template_fun_array.push("<ul>    ");
                    for (var i = 0; i < sortFilter.value.length; i++) _template_fun_array.push('    <li>        <a data-value="sort:', "undefined" == typeof sortFilter.value[i].value ? "" : sortFilter.value[i].value, '" href="javascript:;" class="selectItem item"  data-stat-code="poisearch.sorttype.', "undefined" == typeof sortFilter.value[i].value ? "" : sortFilter.value[i].value, ".", "undefined" == typeof dataType ? "" : dataType, '">            ', "undefined" == typeof sortFilter.value[i].name ? "" : sortFilter.value[i].name, "        </a>    </li>    ");
                    _template_fun_array.push("</ul>"), _template_varName = null
                }(_template_object);
            return fn = null, _template_fun_array.join("")
        }][0],
        beautyFilter = {
            render: function(e, a) {
                try {
                    e.html(tagTpl(beautyData)), a.html(sortTpl(beautyData))
                } catch (t) {
                    "undefined" != typeof alog && alog("exception.fire", "catch", {
                        msg: t.message || t.description,
                        path: "common:widget/search/filters/BeautyFilter/BeautyFilter.js",
                        ln: 15
                    })
                }
            },
            initialize: function() {
                try {} catch (e) {
                    "undefined" != typeof alog && alog("exception.fire", "catch", {
                        msg: e.message || e.description,
                        path: "common:widget/search/filters/BeautyFilter/BeautyFilter.js",
                        ln: 20
                    })
                }
            }
        };
    module.exports = beautyFilter
});;
define("common:widget/search/filters/CaterFilter/CaterFilterData.js", function(a, e, l) {
    l.exports = {
        dataType: "cater",
        tagFilter: {
            name: "不限分类",
            value: [{
                name: "常用",
                value: [{
                    name: "所有餐厅",
                    value: "tag:餐饮"
                }]
            }, {
                name: "中餐馆",
                value: [{
                    name: "全部",
                    value: "tag:中餐馆"
                }, {
                    name: "火锅",
                    value: "tag:火锅"
                }, {
                    name: "自助餐",
                    value: "tag:自助餐"
                }, {
                    name: "川菜",
                    value: "tag:川菜"
                }, {
                    name: "湘菜",
                    value: "tag:湘菜"
                }, {
                    name: "粤菜",
                    value: "tag:粤菜"
                }, {
                    name: "东北菜",
                    value: "tag:东北菜"
                }, {
                    name: "江浙菜",
                    value: "tag:江浙菜"
                }, {
                    name: "烧烤",
                    value: "tag:烧烤"
                }, {
                    name: "海鲜",
                    value: "tag:海鲜"
                }, {
                    name: "小吃",
                    value: "tag:小吃"
                }]
            }, {
                name: "西餐厅",
                value: [{
                    name: "全部",
                    value: "tag:西餐厅"
                }, {
                    name: "披萨",
                    value: "tag:披萨"
                }, {
                    name: "牛排",
                    value: "tag:牛排"
                }, {
                    name: "意大利菜",
                    value: "tag:意大利菜"
                }, {
                    name: "法国菜",
                    value: "tag:法国菜"
                }, {
                    name: "德国菜",
                    value: "tag:德国菜"
                }, {
                    name: "俄罗斯菜",
                    value: "tag:俄罗斯菜"
                }, {
                    name: "拉美烧烤",
                    value: "tag:拉美烧烤"
                }, {
                    name: "中东料理",
                    value: "tag:中东料理"
                }]
            }, {
                name: "日韩料理",
                value: [{
                    name: "日本料理",
                    value: "tag:日本料理"
                }, {
                    name: "韩国料理",
                    value: "tag:韩国料理"
                }, {
                    name: "日式烧烤",
                    value: "tag:日式烧烤"
                }, {
                    name: "寿司",
                    value: "tag:寿司"
                }, {
                    name: "日式自助",
                    value: "tag:日式自助"
                }]
            }, {
                name: "东南亚菜",
                value: [{
                    name: "全部",
                    value: "tag:东南亚菜"
                }, {
                    name: "泰国菜",
                    value: "tag:泰国菜"
                }, {
                    name: "越南菜",
                    value: "tag:越南菜"
                }, {
                    name: "印度菜",
                    value: "tag:印度菜"
                }, {
                    name: "菲律宾菜",
                    value: "tag:菲律宾菜"
                }, {
                    name: "印尼菜",
                    value: "tag:印尼菜"
                }]
            }, {
                name: "快餐",
                value: [{
                    name: "全部",
                    value: "tag:快餐"
                }, {
                    name: "中式快餐",
                    value: "tag:中式快餐"
                }, {
                    name: "西式快餐",
                    value: "tag:西式快餐"
                }, {
                    name: "肯德基",
                    value: "tag:肯德基"
                }, {
                    name: "麦当劳",
                    value: "tag:麦当劳"
                }, {
                    name: "永和大王",
                    value: "tag:永和大王"
                }, {
                    name: "味千拉面",
                    value: "tag:味千拉面"
                }, {
                    name: "马兰拉面",
                    value: "tag:马兰拉面"
                }, {
                    name: "真功夫",
                    value: "tag:真功夫"
                }]
            }, {
                name: "甜点冷饮",
                value: [{
                    name: "全部",
                    value: "tag:甜点冷饮"
                }, {
                    name: "面包西点",
                    value: "tag:面包西点"
                }, {
                    name: "冰淇淋",
                    value: "tag:冰淇淋"
                }, {
                    name: "甜点饮品",
                    value: "tag:甜点饮品"
                }, {
                    name: "稻香村",
                    value: "tag:稻香村"
                }, {
                    name: "面包新语",
                    value: "tag:面包新语"
                }, {
                    name: "味多美",
                    value: "tag:味多美"
                }]
            }, {
                name: "火锅",
                value: [{
                    name: "全部",
                    value: "tag:火锅"
                }, {
                    name: "海底捞",
                    value: "tag:海底捞"
                }, {
                    name: "小肥羊",
                    value: "tag:小肥羊"
                }, {
                    name: "东来顺",
                    value: "tag:东来顺"
                }, {
                    name: "呷哺呷哺",
                    value: "tag:呷哺呷哺"
                }]
            }]
        },
        sortFilter: {
            name: "默认排序",
            value: [{
                name: "默认排序",
                value: "data_type,0"
            }, {
                name: "按评分排序",
                value: "overall_rating,0"
            }, {
                name: "按人气排序",
                value: "hot_value,0"
            }, {
                name: "价格低到高",
                value: "price,1"
            }, {
                name: "价格高到低",
                value: "price,0"
            }]
        }
    }
});;
define("common:widget/search/filters/CaterFilter/CaterFilter.js", function(require, exports, module) {
    var caterData = require("common:widget/search/filters/CaterFilter/CaterFilterData.js"),
        tagTpl = [function(_template_object) {
            var _template_fun_array = [],
                fn = function(__data__) {
                    var _template_varName = "";
                    for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                    eval(_template_varName), _template_fun_array.push('<div class="cater-filter-tag">');
                    for (var i = 0; i < tagFilter.value.length; i++) {
                        _template_fun_array.push('<dl class="clearfix">    <dt>    '), _template_fun_array.push("常用" === tagFilter.value[i].name ? '      <h2 style="color: #e10724;">    ' : "      <h2>     "), _template_fun_array.push("", "undefined" == typeof tagFilter.value[i].name ? "" : tagFilter.value[i].name, '</h2>    </dt>    <dd>        <ul class="tag-list">            ');
                        for (var j = 0; j < tagFilter.value[i].value.length; j++) _template_fun_array.push('            <li>                <a data-value="', "undefined" == typeof tagFilter.value[i].value[j].value ? "" : tagFilter.value[i].value[j].value, '" class="selectItem item" href="javascript:;">', "undefined" == typeof tagFilter.value[i].value[j].name ? "" : tagFilter.value[i].value[j].name, "</a>            </li>            ");
                        _template_fun_array.push("        </ul>    </dd></dl>")
                    }
                    _template_fun_array.push("</div>"), _template_varName = null
                }(_template_object);
            return fn = null, _template_fun_array.join("")
        }][0],
        sortTpl = [function(_template_object) {
            var _template_fun_array = [],
                fn = function(__data__) {
                    var _template_varName = "";
                    for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                    eval(_template_varName), _template_fun_array.push("<ul>    ");
                    for (var i = 0; i < sortFilter.value.length; i++) _template_fun_array.push('    <li>        <a data-value="sort:', "undefined" == typeof sortFilter.value[i].value ? "" : sortFilter.value[i].value, '" href="javascript:;" class="selectItem item"  data-stat-code="poisearch.sorttype.', "undefined" == typeof sortFilter.value[i].value ? "" : sortFilter.value[i].value, ".", "undefined" == typeof dataType ? "" : dataType, '">            ', "undefined" == typeof sortFilter.value[i].name ? "" : sortFilter.value[i].name, "        </a>    </li>    ");
                    _template_fun_array.push("</ul>"), _template_varName = null
                }(_template_object);
            return fn = null, _template_fun_array.join("")
        }][0],
        searchInTag = function(e) {
            for (var a, t, r = [], l = e.tagFilter.value, i = 0; i < l.length; i++) {
                a = l[i].value || [];
                for (var n = 0; n < a.length; n++) t = a[n], r.push(t.name), r.push(t.value)
            }
            return r = r.join(","),
                function(e) {
                    return r.indexOf(e) >= 0
                }
        }(caterData),
        caterFilter = {
            render: function(e, a, t) {
                try {
                    e.html(tagTpl(caterData)), a.html(sortTpl(caterData)), this.setTag(t)
                } catch (r) {
                    "undefined" != typeof alog && alog("exception.fire", "catch", {
                        msg: r.message || r.description,
                        path: "common:widget/search/filters/CaterFilter/CaterFilter.js",
                        ln: 37
                    })
                }
            },
            initialize: function() {
                try {} catch (e) {
                    "undefined" != typeof alog && alog("exception.fire", "catch", {
                        msg: e.message || e.description,
                        path: "common:widget/search/filters/CaterFilter/CaterFilter.js",
                        ln: 42
                    })
                }
            },
            setTag: function(e) {
                e = e || {}, this.json = e.data;
                var a = this.json.result.wd,
                    t = a.split(" ")[0] || a;
                searchInTag(t) ? "餐饮" === t && (t = "所有餐厅") : t = "所有餐厅", T("#caterFilter .tag-item label").html(t)
            }
        };
    module.exports = caterFilter
});;
define("common:widget/search/filters/HospitalFilter/HospitalFilterData.js", function(a, e, t) {
    t.exports = {
        dataType: "hospital",
        tagFilter: {
            name: "不限分类",
            value: [{
                name: "常用",
                value: [{
                    name: "全部医院",
                    value: "tag:医院"
                }]
            }, {
                name: "类型",
                value: [{
                    name: "全部医院",
                    value: "tag:医院"
                }, {
                    name: "综合医院",
                    value: "tag:综合医院"
                }, {
                    name: "中医院",
                    value: "tag:中医院"
                }, {
                    name: "妇幼保健院",
                    value: "tag:妇幼保健院"
                }, {
                    name: "儿童医院",
                    value: "tag:儿童医院"
                }, {
                    name: "口腔医院",
                    value: "tag:口腔医院"
                }, {
                    name: "肿瘤医院",
                    value: "tag:肿瘤医院"
                }, {
                    name: "妇科医院",
                    value: "tag:妇科医院"
                }, {
                    name: "眼科医院",
                    value: "tag:眼科医院"
                }, {
                    name: "骨科医院",
                    value: "tag:骨科医院"
                }, {
                    name: "诊所",
                    value: "tag:诊所"
                }]
            }, {
                name: "等级",
                value: [{
                    name: "三级医院",
                    value: "tag:三级医院"
                }, {
                    name: "三甲医院",
                    value: "tag:三甲医院"
                }, {
                    name: "三乙医院",
                    value: "tag:三乙医院"
                }, {
                    name: "三丙医院",
                    value: "tag:三丙医院"
                }, {
                    name: "二级医院",
                    value: "tag:二级医院"
                }, {
                    name: "一级医院",
                    value: "tag:一级医院"
                }]
            }]
        },
        sortFilter: {
            name: "综合排序",
            value: [{
                name: "综合排序",
                value: "data_type,0"
            }]
        }
    }
});;
define("common:widget/search/filters/HospitalFilter/HospitalFilter.js", function(require, exports, module) {
    var hospitalData = require("common:widget/search/filters/HospitalFilter/HospitalFilterData.js"),
        tagTpl = [function(_template_object) {
            var _template_fun_array = [],
                fn = function(__data__) {
                    var _template_varName = "";
                    for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                    eval(_template_varName), _template_fun_array.push('<div class="hotel-filter-tag">');
                    for (var i = 0; i < tagFilter.value.length; i++) {
                        _template_fun_array.push('<dl class="clearfix">    <dt>    '), _template_fun_array.push("常用" === tagFilter.value[i].name ? '      <h2 style="color: #e10724;">    ' : "      <h2>     "), _template_fun_array.push("", "undefined" == typeof tagFilter.value[i].name ? "" : tagFilter.value[i].name, '</h2>    </dt>    <dd>        <ul class="tag-list">            ');
                        for (var j = 0; j < tagFilter.value[i].value.length; j++) _template_fun_array.push('            <li>                <a data-value="', "undefined" == typeof tagFilter.value[i].value[j].value ? "" : tagFilter.value[i].value[j].value, '" class="selectItem item" href="javascript:;">', "undefined" == typeof tagFilter.value[i].value[j].name ? "" : tagFilter.value[i].value[j].name, "</a>            </li>            ");
                        _template_fun_array.push("        </ul>    </dd></dl>")
                    }
                    _template_fun_array.push("</div>"), _template_varName = null
                }(_template_object);
            return fn = null, _template_fun_array.join("")
        }][0],
        sortTpl = [function(_template_object) {
            var _template_fun_array = [],
                fn = function(__data__) {
                    var _template_varName = "";
                    for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                    eval(_template_varName), _template_fun_array.push("<ul>    ");
                    for (var i = 0; i < sortFilter.value.length; i++) _template_fun_array.push('    <li>        <a data-value="sort:', "undefined" == typeof sortFilter.value[i].value ? "" : sortFilter.value[i].value, '" href="javascript:;" class="selectItem item"  data-stat-code="poisearch.sorttype.', "undefined" == typeof sortFilter.value[i].value ? "" : sortFilter.value[i].value, ".", "undefined" == typeof dataType ? "" : dataType, '">            ', "undefined" == typeof sortFilter.value[i].name ? "" : sortFilter.value[i].name, "        </a>    </li>    ");
                    _template_fun_array.push("</ul>"), _template_varName = null
                }(_template_object);
            return fn = null, _template_fun_array.join("")
        }][0];
    require.loadCss({
        content: "#caterFilter .tool-bar-two .tool-item-two{width:50%;box-sizing:border-box}",
        name: "HospitalFilter"
    });
    var hospitalFilter = {
        render: function(e) {
            try {
                e.html(tagTpl(hospitalData))
            } catch (a) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: a.message || a.description,
                    path: "common:widget/search/filters/HospitalFilter/HospitalFilter.js",
                    ln: 22
                })
            }
        },
        initialize: function() {
            try {} catch (e) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: e.message || e.description,
                    path: "common:widget/search/filters/HospitalFilter/HospitalFilter.js",
                    ln: 26
                })
            }
        }
    };
    module.exports = hospitalFilter
});;
define("common:widget/search/filters/HotelFilter/HotelFilterData.js", function(a, e, l) {
    l.exports = {
        dataType: "hotel",
        tagFilter: {
            name: "不限分类",
            value: [{
                name: "常用",
                value: [{
                    name: "全部酒店",
                    value: "tag:酒店"
                }]
            }, {
                name: "类型",
                value: [{
                    name: "全部",
                    value: "tag:酒店"
                }, {
                    name: "快捷酒店",
                    value: "tag:快捷酒店"
                }, {
                    name: "五星级酒店",
                    value: "tag:五星级酒店"
                }, {
                    name: "四星级酒店",
                    value: "tag:四星级酒店"
                }, {
                    name: "三星级酒店",
                    value: "tag:三星级酒店"
                }, {
                    name: "青年旅社",
                    value: "tag:青年旅社"
                }, {
                    name: "旅馆",
                    value: "tag:旅馆"
                }]
            }, {
                name: "品牌",
                value: [{
                    name: "不限",
                    value: "tag:酒店"
                }, {
                    name: "如家",
                    value: "tag:如家"
                }, {
                    name: "汉庭",
                    value: "tag:汉庭"
                }, {
                    name: "7天",
                    value: "tag:7天"
                }, {
                    name: "速8",
                    value: "tag:速8"
                }, {
                    name: "莫泰",
                    value: "tag:莫泰"
                }, {
                    name: "格林豪泰",
                    value: "tag:格林豪泰"
                }, {
                    name: "锦江之星",
                    value: "tag:锦江之星"
                }, {
                    name: "布丁",
                    value: "tag:布丁"
                }]
            }, {
                name: "价格",
                value: [{
                    name: "不限",
                    value: "price:0,+"
                }, {
                    name: "150元以下",
                    value: "price:0,150"
                }, {
                    name: "150-300元",
                    value: "price:150,300"
                }, {
                    name: "300-500元",
                    value: "price:300,500"
                }]
            }]
        },
        sortFilter: {
            name: "综合排序",
            value: [{
                name: "综合排序",
                value: "data_type,0"
            }, {
                name: "评分高到低",
                value: "total_score,0"
            }, {
                name: "价格低到高",
                value: "price,1"
            }, {
                name: "价格高到低",
                value: "price,0"
            }]
        }
    }
});;
define("common:widget/search/filters/HotelFilter/HotelFilter.js", function(require, exports, module) {
    var hotelData = require("common:widget/search/filters/HotelFilter/HotelFilterData.js"),
        tagTpl = [function(_template_object) {
            var _template_fun_array = [],
                fn = function(__data__) {
                    var _template_varName = "";
                    for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                    eval(_template_varName), _template_fun_array.push('<div class="hotel-filter-tag">');
                    for (var i = 0; i < tagFilter.value.length; i++) {
                        _template_fun_array.push('<dl class="clearfix">    <dt>    '), _template_fun_array.push("常用" === tagFilter.value[i].name ? '      <h2 style="color: #e10724;">    ' : "      <h2>     "), _template_fun_array.push("", "undefined" == typeof tagFilter.value[i].name ? "" : tagFilter.value[i].name, '</h2>    </dt>    <dd>        <ul class="tag-list">            ');
                        for (var j = 0; j < tagFilter.value[i].value.length; j++) _template_fun_array.push('            <li>                <a data-value="', "undefined" == typeof tagFilter.value[i].value[j].value ? "" : tagFilter.value[i].value[j].value, '" class="selectItem item" href="javascript:;">', "undefined" == typeof tagFilter.value[i].value[j].name ? "" : tagFilter.value[i].value[j].name, "</a>            </li>            ");
                        _template_fun_array.push("        </ul>    </dd></dl>")
                    }
                    _template_fun_array.push("</div>"), _template_varName = null
                }(_template_object);
            return fn = null, _template_fun_array.join("")
        }][0],
        sortTpl = [function(_template_object) {
            var _template_fun_array = [],
                fn = function(__data__) {
                    var _template_varName = "";
                    for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                    eval(_template_varName), _template_fun_array.push("<ul>    ");
                    for (var i = 0; i < sortFilter.value.length; i++) _template_fun_array.push('    <li>        <a data-value="sort:', "undefined" == typeof sortFilter.value[i].value ? "" : sortFilter.value[i].value, '" href="javascript:;" class="selectItem item"  data-stat-code="poisearch.sorttype.', "undefined" == typeof sortFilter.value[i].value ? "" : sortFilter.value[i].value, ".", "undefined" == typeof dataType ? "" : dataType, '">            ', "undefined" == typeof sortFilter.value[i].name ? "" : sortFilter.value[i].name, "        </a>    </li>    ");
                    _template_fun_array.push("</ul>"), _template_varName = null
                }(_template_object);
            return fn = null, _template_fun_array.join("")
        }][0],
        searchInTag = function() {
            for (var e, a, t = [], l = hotelData.tagFilter.value, r = 0; r < l.length; r++) {
                e = l[r].value || [];
                for (var i = 0; i < e.length; i++) a = e[i], t.push(a.name), t.push(a.value)
            }
            return t = t.join(","),
                function(e) {
                    return t.indexOf(e) >= 0
                }
        }(),
        hotelFilter = {
            render: function(e, a, t) {
                try {
                    e.html(tagTpl(hotelData)), a.html(sortTpl(hotelData)), this.setTag(t)
                } catch (l) {
                    "undefined" != typeof alog && alog("exception.fire", "catch", {
                        msg: l.message || l.description,
                        path: "common:widget/search/filters/HotelFilter/HotelFilter.js",
                        ln: 36
                    })
                }
            },
            initialize: function() {
                try {} catch (e) {
                    "undefined" != typeof alog && alog("exception.fire", "catch", {
                        msg: e.message || e.description,
                        path: "common:widget/search/filters/HotelFilter/HotelFilter.js",
                        ln: 40
                    })
                }
            },
            setTag: function(e) {
                e = e || {}, this.json = e.data;
                var a = this.json.result.wd,
                    t = a.split(" ")[0] || a;
                searchInTag(t) ? "酒店" === t && (t = "所有酒店") : t = "所有酒店", T("#caterFilter .tag-item label").html(t)
            }
        };
    module.exports = hotelFilter
});;
define("common:widget/search/filters/LifeFilter/LifeFilterData.js", function(a, e, t) {
    t.exports = {
        dataType: "life",
        tagFilter: {
            name: "不限分类",
            value: [{
                name: "洗浴",
                value: "tag:洗浴"
            }, {
                name: "KTV",
                value: "tag:KTV"
            }, {
                name: "体育场馆",
                value: "tag:体育场馆"
            }, {
                name: "游泳馆",
                value: "tag:游泳馆"
            }, {
                name: "羽毛球馆",
                value: "tag:羽毛球馆"
            }, {
                name: "乒乓球馆",
                value: "tag:乒乓球馆"
            }, {
                name: "健身",
                value: "tag:健身"
            }, {
                name: "棋牌室",
                value: "tag:棋牌室"
            }, {
                name: "网吧",
                value: "tag:网吧"
            }, {
                name: "洗浴中心",
                value: "tag:洗浴中心"
            }, {
                name: "足浴",
                value: "tag:足浴"
            }, {
                name: "温泉",
                value: "tag:温泉"
            }, {
                name: "桑拿",
                value: "tag:桑拿"
            }, {
                name: "按摩",
                value: "tag:按摩"
            }]
        },
        sortFilter: {
            name: "综合排序",
            value: [{
                name: "综合排序",
                value: "data_type,0"
            }, {
                name: "评分高到低",
                value: "overall_rating,0"
            }, {
                name: "价格低到高",
                value: "price,1"
            }, {
                name: "价格高到低",
                value: "price,0"
            }]
        }
    }
});;
define("common:widget/search/filters/LifeFilter/LifeFilter.js", function(require, exports, module) {
    var lifeData = require("common:widget/search/filters/LifeFilter/LifeFilterData.js"),
        tagTpl = [function(_template_object) {
            var _template_fun_array = [],
                fn = function(__data__) {
                    var _template_varName = "";
                    for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                    eval(_template_varName), _template_fun_array.push('<div class="life-filter-tag">    <ul class="tag-list">        ');
                    for (var j = 0; j < tagFilter.value.length; j++) _template_fun_array.push('        <li>            <a data-value="', "undefined" == typeof tagFilter.value[j].value ? "" : tagFilter.value[j].value, '" class="selectItem item" href="javascript:;">                ', "undefined" == typeof tagFilter.value[j].name ? "" : tagFilter.value[j].name, "            </a>        </li>        ");
                    _template_fun_array.push("    </ul></div>"), _template_varName = null
                }(_template_object);
            return fn = null, _template_fun_array.join("")
        }][0],
        sortTpl = [function(_template_object) {
            var _template_fun_array = [],
                fn = function(__data__) {
                    var _template_varName = "";
                    for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                    eval(_template_varName), _template_fun_array.push("<ul>    ");
                    for (var i = 0; i < sortFilter.value.length; i++) _template_fun_array.push('    <li>        <a data-value="sort:', "undefined" == typeof sortFilter.value[i].value ? "" : sortFilter.value[i].value, '" href="javascript:;" class="selectItem item"  data-stat-code="poisearch.sorttype.', "undefined" == typeof sortFilter.value[i].value ? "" : sortFilter.value[i].value, ".", "undefined" == typeof dataType ? "" : dataType, '">            ', "undefined" == typeof sortFilter.value[i].name ? "" : sortFilter.value[i].name, "        </a>    </li>    ");
                    _template_fun_array.push("</ul>"), _template_varName = null
                }(_template_object);
            return fn = null, _template_fun_array.join("")
        }][0],
        searchInTag = function(e) {
            for (var a = [], t = e.tagFilter.value, l = 0; l < t.length; l++) a.push(t[l].name), a.push(t[l].value.toLowerCase());
            return a = a.join(","),
                function(e) {
                    return e = e.toLowerCase(), a.indexOf(e) >= 0
                }
        }(lifeData);
    require.loadCss({
        content: "#caterFilter #select_panel_tag .life-filter-tag{padding:10px 0}",
        name: "lifeFilter"
    });
    var lifeFilter = {
        render: function(e, a, t) {
            try {
                e.html(tagTpl(lifeData)), a.html(sortTpl(lifeData)), this.setTag(t)
            } catch (l) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: l.message || l.description,
                    path: "common:widget/search/filters/LifeFilter/LifeFilter.js",
                    ln: 42
                })
            }
        },
        initialize: function() {
            try {} catch (e) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: e.message || e.description,
                    path: "common:widget/search/filters/LifeFilter/LifeFilter.js",
                    ln: 46
                })
            }
        },
        setTag: function(e) {
            e = e || {};
            var a = e.data,
                t = a.result.wd,
                l = t.split(" ")[0] || t;
            searchInTag(l) ? "生活" === l && (l = "生活服务") : l = "生活服务", T("#caterFilter .tag-item label").html(l)
        }
    };
    module.exports = lifeFilter
});;
define("common:widget/search/filters/MovieFilter/MovieFilterData.js", function(e, a, l) {
    l.exports = {
        tagFilter: {
            name: "不限分类",
            value: [{
                name: "全部景点",
                value: "tag:景点"
            }, {
                name: "名胜古迹",
                value: "tag:名胜古迹"
            }, {
                name: "风景区",
                value: "tag:风景区"
            }, {
                name: "公园",
                value: "tag:公园"
            }, {
                name: "动物园",
                value: "tag:动物园"
            }, {
                name: "植物园",
                value: "tag:植物园"
            }, {
                name: "博物馆",
                value: "tag:博物馆"
            }, {
                name: "游乐园",
                value: "tag:游乐园"
            }, {
                name: "水族馆",
                value: "tag:水族馆"
            }]
        },
        sortFilter: {
            name: "综合排序",
            value: [{
                name: "综合排序",
                value: "data_type,0"
            }, {
                name: "评分高到低",
                value: "overall_rating,0"
            }, {
                name: "等级低到高",
                value: "level,1"
            }, {
                name: "等级高到低",
                value: "level,0"
            }]
        }
    }
});;
define("common:widget/search/filters/ScopeFilter/ScopeFilterData.js", function(a, e, t) {
    t.exports = {
        dataType: "scope",
        tagFilter: {
            name: "不限分类",
            value: [{
                name: "全部景点",
                value: "tag:景点"
            }, {
                name: "名胜古迹",
                value: "tag:名胜古迹"
            }, {
                name: "风景区",
                value: "tag:风景区"
            }, {
                name: "公园",
                value: "tag:公园"
            }, {
                name: "动物园",
                value: "tag:动物园"
            }, {
                name: "植物园",
                value: "tag:植物园"
            }, {
                name: "博物馆",
                value: "tag:博物馆"
            }, {
                name: "游乐园",
                value: "tag:游乐园"
            }, {
                name: "水族馆",
                value: "tag:水族馆"
            }]
        },
        sortFilter: {
            name: "综合排序",
            value: [{
                name: "综合排序",
                value: "data_type,0"
            }, {
                name: "评分高到低",
                value: "overall_rating,0"
            }, {
                name: "等级低到高",
                value: "scope_grade,1"
            }, {
                name: "等级高到低",
                value: "scope_grade,0"
            }]
        }
    }
});;
define("common:widget/search/filters/ScopeFilter/ScopeFilter.js", function(require, exports, module) {
    var scopeData = require("common:widget/search/filters/ScopeFilter/ScopeFilterData.js"),
        tagTpl = [function(_template_object) {
            var _template_fun_array = [],
                fn = function(__data__) {
                    var _template_varName = "";
                    for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                    eval(_template_varName), _template_fun_array.push('<div class="scope-filter-tag">    <ul class="tag-list">        ');
                    for (var j = 0; j < tagFilter.value.length; j++) _template_fun_array.push('        <li>            <a data-value="', "undefined" == typeof tagFilter.value[j].value ? "" : tagFilter.value[j].value, '" class="selectItem item" href="javascript:;">                ', "undefined" == typeof tagFilter.value[j].name ? "" : tagFilter.value[j].name, "            </a>        </li>        ");
                    _template_fun_array.push("    </ul></div>"), _template_varName = null
                }(_template_object);
            return fn = null, _template_fun_array.join("")
        }][0],
        sortTpl = [function(_template_object) {
            var _template_fun_array = [],
                fn = function(__data__) {
                    var _template_varName = "";
                    for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                    eval(_template_varName), _template_fun_array.push("<ul>    ");
                    for (var i = 0; i < sortFilter.value.length; i++) _template_fun_array.push('    <li>        <a data-value="sort:', "undefined" == typeof sortFilter.value[i].value ? "" : sortFilter.value[i].value, '" href="javascript:;" class="selectItem item"  data-stat-code="poisearch.sorttype.', "undefined" == typeof sortFilter.value[i].value ? "" : sortFilter.value[i].value, ".", "undefined" == typeof dataType ? "" : dataType, '">            ', "undefined" == typeof sortFilter.value[i].name ? "" : sortFilter.value[i].name, "        </a>    </li>    ");
                    _template_fun_array.push("</ul>"), _template_varName = null
                }(_template_object);
            return fn = null, _template_fun_array.join("")
        }][0],
        searchInTag = function(e) {
            for (var a = [], t = e.tagFilter.value, r = 0; r < t.length; r++) a.push(t[r].name), a.push(t[r].value);
            return a = a.join(","),
                function(e) {
                    return a.indexOf(e) >= 0
                }
        }(scopeData);
    require.loadCss({
        content: "#caterFilter #select_panel_tag .scope-filter-tag{padding:10px 0}",
        name: "scopeFilter"
    });
    var scopeFilter = {
        render: function(e, a, t) {
            try {
                e.html(tagTpl(scopeData)), a.html(sortTpl(scopeData)), this.setTag(t)
            } catch (r) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: r.message || r.description,
                    path: "common:widget/search/filters/ScopeFilter/ScopeFilter.js",
                    ln: 41
                })
            }
        },
        initialize: function() {
            try {} catch (e) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: e.message || e.description,
                    path: "common:widget/search/filters/ScopeFilter/ScopeFilter.js",
                    ln: 45
                })
            }
        },
        setTag: function(e) {
            e = e || {};
            var a = e.data,
                t = a.result.wd,
                r = t.split(" ")[0] || t;
            searchInTag(r) ? "景点" === r && (r = "所有景点") : r = "所有景点", T("#caterFilter .tag-item label").html(r)
        }
    };
    module.exports = scopeFilter
});;
define("common:widget/search/filters/ShoppingFilter/ShoppingFilterData.js", function(a, e, t) {
    t.exports = {
        dataType: "shopping",
        tagFilter: {
            name: "不限分类",
            value: [{
                name: "全部超市",
                value: "tag:超市"
            }, {
                name: "购物中心",
                value: "tag:购物中心"
            }, {
                name: "超市",
                value: "tag:超市"
            }, {
                name: "便利店",
                value: "tag:便利店"
            }, {
                name: "书店",
                value: "tag:书店"
            }, {
                name: "数码家电",
                value: "tag:数码家电"
            }, {
                name: "眼镜店",
                value: "tag:眼镜店"
            }]
        },
        sortFilter: {
            name: "综合排序",
            value: [{
                name: "综合排序",
                value: "data_type,0"
            }, {
                name: "评分高到低",
                value: "overall_rating,0"
            }, {
                name: "评论数多到少",
                value: "comment_num,0"
            }]
        }
    }
});;
define("common:widget/search/filters/ShoppingFilter/ShoppingFilter.js", function(require, exports, module) {
    var shoppingData = require("common:widget/search/filters/ShoppingFilter/ShoppingFilterData.js"),
        tagTpl = [function(_template_object) {
            var _template_fun_array = [],
                fn = function(__data__) {
                    var _template_varName = "";
                    for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                    eval(_template_varName), _template_fun_array.push('<div class="life-filter-tag">    <ul class="tag-list">        ');
                    for (var j = 0; j < tagFilter.value.length; j++) _template_fun_array.push('        <li>            <a data-value="', "undefined" == typeof tagFilter.value[j].value ? "" : tagFilter.value[j].value, '" class="selectItem item" href="javascript:;">                ', "undefined" == typeof tagFilter.value[j].name ? "" : tagFilter.value[j].name, "            </a>        </li>        ");
                    _template_fun_array.push("    </ul></div>"), _template_varName = null
                }(_template_object);
            return fn = null, _template_fun_array.join("")
        }][0],
        sortTpl = [function(_template_object) {
            var _template_fun_array = [],
                fn = function(__data__) {
                    var _template_varName = "";
                    for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                    eval(_template_varName), _template_fun_array.push("<ul>    ");
                    for (var i = 0; i < sortFilter.value.length; i++) _template_fun_array.push('    <li>        <a data-value="sort:', "undefined" == typeof sortFilter.value[i].value ? "" : sortFilter.value[i].value, '" href="javascript:;" class="selectItem item"  data-stat-code="poisearch.sorttype.', "undefined" == typeof sortFilter.value[i].value ? "" : sortFilter.value[i].value, ".", "undefined" == typeof dataType ? "" : dataType, '">            ', "undefined" == typeof sortFilter.value[i].name ? "" : sortFilter.value[i].name, "        </a>    </li>    ");
                    _template_fun_array.push("</ul>"), _template_varName = null
                }(_template_object);
            return fn = null, _template_fun_array.join("")
        }][0],
        searchInTag = function(e) {
            for (var a = [], t = e.tagFilter.value, l = 0; l < t.length; l++) a.push(t[l].name), a.push(t[l].value);
            return a = a.join(","),
                function(e) {
                    return a.indexOf(e) >= 0
                }
        }(shoppingData);
    require.loadCss({
        content: "#caterFilter #select_panel_tag .life-filter-tag{padding:10px 0}",
        name: "ShoppingFilter"
    });
    var shoppingFilter = {
        render: function(e, a, t) {
            try {
                e.html(tagTpl(shoppingData)), a.html(sortTpl(shoppingData)), this.setTag(t)
            } catch (l) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: l.message || l.description,
                    path: "common:widget/search/filters/ShoppingFilter/ShoppingFilter.js",
                    ln: 41
                })
            }
        },
        initialize: function() {
            try {} catch (e) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: e.message || e.description,
                    path: "common:widget/search/filters/ShoppingFilter/ShoppingFilter.js",
                    ln: 45
                })
            }
        },
        setTag: function(e) {
            e = e || {};
            var a = e.data,
                t = a.result.wd,
                l = t.split(" ")[0] || t;
            searchInTag(l) ? "超市" === l && (l = "所有超市") : l = "所有超市", T("#caterFilter .tag-item label").html(l)
        }
    };
    module.exports = shoppingFilter
});;
define("common:widget/ui/ecommUtil/ecommUtil.js", function(e, t, o) {
    var i = e("common:widget/ui/searchBox/searchBox.js"),
        m = {
            toHere: function(e, t) {
                var o = {
                    wd: e
                };
                t && (t.x = T.trim(t.x), t.y = T.trim(t.y), o.pt = t.x + "," + t.y), i.setState("route", {
                    end: o
                })
            }
        };
    window.ecommUtil = m, o.exports = m
});