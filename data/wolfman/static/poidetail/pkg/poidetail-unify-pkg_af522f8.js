define("poidetail:widget/unify/unifylibs/dom.js", function(i, t, h) {
    function s(i) {
        this.index = i.index, this.height = i.height || 0, this.width = i.width || "100%", this.id = e + this.index, this.container = i.container, this.cardName = i.cardName || "", this.isVisible = i.isVisible || !1
    }
    var e = "phoenix_dom_",
        o = '<div class="phoenix-loading"><i></i></div>';
    s.prototype.getWrap = function() {
        return '<div id="' + this.id + '" cardname="' + this.cardName + '" class="phoenix-block"></div>'
    }, s.prototype.init = function() {
        this.$dom = $(this.getWrap());
        var i = {};
        return 0 !== this.height && 0 !== this.width ? (this.height < 44 && (this.height = 44), this.width < 44 && (this.width = 44), i.height = this.height, i.width = this.width, this.$loading = $(o), this.$dom.append(this.$loading), this.$dom.css(i)) : (i.display = "none", this.$dom.css(i)), $(this.container).append(this.$dom), this
    }, s.prototype.show = function() {
        return this.$loading && this.$loading.remove(), this.isVisible && this.$dom.attr("style", "").addClass("phoenix-show"), this
    }, s.prototype.append = function(i) {
        return this.$dom.append(i), this
    }, s.prototype.refresh = function(i) {
        return this.$dom.refresh(i), this
    }, s.prototype.remove = function() {
        return this.$dom.remove(), this
    }, h.exports = s
});;
define("poidetail:widget/unify/unifydetail_two/unifydetail_two.js", function(n, e, i) {
    var t = n("poidetail:widget/unify/unifylibs/dom.js"),
        o = n("common:widget/ui/searchBox/searchBox.js");
    i.exports = {
        pageTwoDomIndex: 1e3,
        lastTimeStamp: (new Date).getTime(),
        init: function(n, e) {
            var i = (new Date).getTime();
            if (i - this.lastTimeStamp > 300) {
                var t = e.unifyContainerIndex;
                this.renderCards(n, t), this.lastTimeStamp = i
            }
        },
        renderCards: function(e, i) {
            try {
                o.loading(); {
                    var a = this,
                        r = e.page,
                        d = window.UnifyFilePathConfig[r];
                    window.TDB.get("base")
                }
                d ? n([d.path], function() {
                    n([d.module], function(n) {
                        var d = a.pageTwoDomIndex++,
                            s = "#unifycontainer-two" + i + " .unifycontainer-two-content",
                            u = new t({
                                index: d,
                                container: s,
                                isVisible: !0
                            }).init(),
                            f = n({
                                data: e,
                                pageInfo: {
                                    name: r
                                },
                                unifyContainer: "#unifycontainer-two" + i,
                                unifyContainerWrapper: ".unifycontainer-two-wrapper"
                            }, function(n) {
                                return n === !1 ? (o.endLoading(), u.remove(), null) : (n = void 0 === n ? "" : n, u.append(n).show(), a.showPageTwo(i, e), a.resetPageTwoHeight(i), o.endLoading(), {
                                    domIndex: u.index,
                                    domId: u.id
                                })
                            });
                        a.module = f
                    })
                }) : (o.endLoading(), console.log("二级页路由不存在"))
            } catch (s) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: s.message || s.description,
                    path: "poidetail:widget/unify/unifydetail_two/unifydetail_two.js",
                    ln: 83
                })
            }
        },
        showPageTwo: function(n, e) {
            var i = this,
                t = e.pageTitle,
                o = "返回详情页";
            e.name && (o = e.name.length > 8 ? "返回" + baidu.string(e.name).subByte(16, "..") : "返回" + e.name), $("#unifycontainer-two" + n + " .unifycontainer-two-close").text(o), $("#unifycontainer-two" + n + " .unifycontainer-two-title").text(t), $("#unifycontainer-two" + n).css({
                left: "0px"
            }), $("#unifycontainer-two" + n + " .unifycontainer-two-close").on("click", function() {
                i.hidePageTwo(n)
            })
        },
        hidePageTwo: function(n) {
            $("#unifycontainer-two" + n + " .unifycontainer-two-content").html(""), $("#unifycontainer-two" + n).css({
                left: "-1000px"
            }), this.destroy()
        },
        resetPageTwoHeight: function(n) {
            var e = $("#unifycontainer-two" + n).height(),
                i = $("#unifycontainer-two" + n + " .unifycontainer-two-wrapper"),
                t = parseInt(i.css("margin-top"), 10);
            e - t > 0 && i.height(e - t)
        },
        destroy: function() {
            this.module && this.module.destroy && this.module.destroy()
        }
    }
});;
define("poidetail:widget/unify/unifylibs/jssdk.js", function(i, o, a) {
    var e = {
            "http://a.hiphotos.baidu.com": "https://ss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy",
            "http://b.hiphotos.baidu.com": "https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy",
            "http://c.hiphotos.baidu.com": "https://ss3.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy",
            "http://d.hiphotos.baidu.com": "https://ss0.baidu.com/-Po3dSag_xI4khGko9WTAnF6hhy",
            "http://e.hiphotos.baidu.com": "https://ss1.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy",
            "http://f.hiphotos.baidu.com": "https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy",
            "http://g.hiphotos.baidu.com": "https://ss3.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy",
            "http://h.hiphotos.baidu.com": "https://ss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy",
            "http://himg.baidu.com": "https://ss0.baidu.com/7Ls0a8Sm2Q5IlBGlnYG",
            "http://pcsv0.map.bdimg.com": "https://mapsv0.bdimg.com",
            "http://p1.meituan.net": "https://p1.meituan.net"
        },
        t = new RegExp(["^http://t10.baidu.com", "^http://t11.baidu.com", "^http://t12.baidu.com", "^http://i2.dpfile.com", "^http://qcloud.dpfile.com"].join("|")),
        n = i("poidetail:widget/unify/unifydetail_two/unifydetail_two.js"),
        d = i("common:widget/ui/searchBox/searchBox.js"),
        p = i("common:widget/ui/card/cardMgr.js"),
        r = i("pano:widget/PanoInterface/PanoInterface.js");
    a.exports = function(o, a) {
        function s() {}

        function u() {}
        return a.jssdkBaseData = o, window.jssdkBaseData = o, window.jssdkCurPoiCard = a, window.bindUpdateJsSdkData || (window.bindUpdateJsSdkData = 1, listener.on("ui.card.returncard", "updatejssdkdata", function(i, o) {
            window.jssdkCurPoiCard = o.card, window.jssdkBaseData = o.card.jssdkBaseData
        })), "jssdk_entrence" !== a.srcFrom && (window.prePoiDetailCard = a), {
            platform: "webmap",
            getPhoneInfo: function(i) {
                s(i, u, "DeviceInfo", "phoneInfo", [])
            },
            getLocationInfo: function() {},
            nativeToast: function() {},
            hideLoading: function(i) {
                i = i || function() {}, s(i, u, "MessageChannel", "hideLoading", [])
            },
            getPoiDataByNA: function(i, o) {
                o = o || u, s(i, o, "MessageChannel", "ready", [])
            },
            signIn: function(i) {
                s(i, u, "PoiCheckIn", "checkIn", [])
            },
            getLoginStatus: function() {},
            jumpToLogin: function() {},
            callUp: function() {},
            offlineLog: function() {},
            uploadPicture: function(i, o) {
                s(o, u, "UploadPic", "upload", [{
                    url: i.url,
                    picture_key: i.picture_key || "pic",
                    max_height: i.max_height || 800,
                    max_width: i.max_width || 800
                }])
            },
            poiUploadPicture: function() {
                var i = "http://map.baidu.com/ugc/upload/index?uid=" + window.jssdkBaseData.uid;
                window.open(i, "_blank")
            },
            invokeFastComment: function(i, o) {
                s(o, u, "UgcNotify", "commit", [{
                    poiId: i.poiId,
                    poiType: i.poiType,
                    rating: i.rating
                }])
            },
            cacheCommentStar: function(i, o) {
                s(o, u, "UgcNotify", "transpara", [{
                    rating: i.rating,
                    poiId: i.poiId
                }])
            },
            getFileLocalPath: function(i, o, a) {
                s(o, a, "WebResDownload", "download", [{
                    comid: "comdetailtmpl",
                    path: "cards",
                    filename: i.name + ".js",
                    md5: i.md5,
                    url: i.url
                }])
            },
            getPagesFileLocalPath: function() {},
            getUgcRequestProxy: function(i, o, a) {
                window.jssdkBaseData || (window.jssdkBaseData = ""), "comment/poicmtlist" === i.path ? $.ajax({
                    url: "/detail",
                    type: "GET",
                    dataType: "jsonp",
                    cache: !1,
                    timeout: 3e3,
                    data: {
                        qt: "ugccmtlist",
                        type: window.jssdkBaseData.srcName,
                        uid: window.jssdkBaseData.uid,
                        from: "mapandroid",
                        pageIndex: i.pageIndex,
                        pageCount: i.pageCount,
                        showPic: i.showPic,
                        agree: i.agree
                    },
                    success: function(i) {
                        i.data = i.comment, o && o(i)
                    },
                    error: function(i) {
                        a && a(i)
                    }
                }) : "comment/poiphotolist" === i.path ? $.ajax({
                    url: "/detail",
                    type: "GET",
                    dataType: "jsonp",
                    cache: !1,
                    timeout: 3e3,
                    data: {
                        qt: "ugcphotolist",
                        src: i.src,
                        type: window.jssdkBaseData.srcName,
                        uid: window.jssdkBaseData.uid,
                        from: "mapandroid",
                        photoType: i.photoType,
                        orderBy: i.orderBy,
                        pageIndex: i.pageIndex,
                        pageCount: i.pageCount
                    },
                    success: function(i) {
                        o && o(i)
                    },
                    error: function(i) {
                        a && a(i)
                    }
                }) : "comment/poipiclist" === i.path && $.ajax({
                    url: "/mobile/webapp/place/piclist",
                    type: "GET",
                    dataType: "jsonp",
                    cache: !1,
                    timeout: 3e3,
                    data: {
                        type: window.jssdkBaseData.srcName,
                        uid: window.jssdkBaseData.uid,
                        from: "mapandroid",
                        pageIndex: i.pageIndex,
                        pageCount: i.pageCount || 10
                    },
                    success: function(i) {
                        o && o(i)
                    },
                    error: function(i) {
                        a && a(i)
                    }
                })
            },
            changeDetailPageMode: function(i, o) {
                var a = i && i.mode || "card";
                s(o, u, "PoiGotoMap", "gotomap", [{
                    mode: a
                }])
            },
            pageReadyToNative: function() {},
            pageGoBack: function() {
                "number" == typeof window.jssdkCurPoiCard.unifyContainerIndex && setTimeout(function() {
                    n.hidePageTwo(window.jssdkCurPoiCard.unifyContainerIndex)
                }, 300)
            },
            jumpToNAComp: function(i, o, a) {
                s(o, a || u, "CompApi", "dispatch", [{
                    category: i.category,
                    target: i.target,
                    base_params: i.baseParams
                }])
            },
            jumpToIndoorNAComp: function() {},
            jumpToIndoorGuideSearchNAComp: function() {},
            jumpToOilNAComp: function(i, o) {
                s(o, u, "CompApi", "dispatch", [{
                    category: "oil",
                    target: "order",
                    base_params: {
                        mapid: i.mapid,
                        uid: i.uid,
                        oil_from: i.oil_from || "poi_oil",
                        ldata: window.jssdkBaseData.ldata || ""
                    }
                }])
            },
            jumpToLBCNAComp: function(i, o) {
                s(o, u, "CompApi", "dispatch", [{
                    category: "lbc",
                    target: "webshell_login_page",
                    base_params: {
                        url: i.url,
                        needLogin: i.needLogin || "0"
                    }
                }])
            },
            jumpToExpressNAComp: function(i, o) {
                s(o, u, "CompApi", "dispatch", [{
                    category: "brand",
                    target: "show_express_page",
                    base_params: {
                        express_action: i.express_action,
                        business_id: i.business_id,
                        from_source: i.from_source || "poiDetail"
                    }
                }])
            },
            jumpToGrouponNAComp: function(i) {
                location.href = i.webapp_url
            },
            jumpToStreetScapeNAComp: function(i) {
                if (i.street_url) {
                    paramJson = $.url.queryToJson(i.street_url);
                    var o = paramJson.panotype || "street",
                        a = paramJson.panoid,
                        e = {
                            uid: window.jssdkBaseData.uid,
                            addr: window.jssdkBaseData.addr,
                            from: "detail",
                            wd: window.jssdkBaseData.name
                        };
                    r.showPano({
                        panoId: a,
                        panoType: o,
                        searchParam: e,
                        research: !0,
                        from: "PoiDetail"
                    })
                }
            },
            jumpToPoiPageNAComp: function(o) {
                var a = null;
                window.prePoiDetailCard && (window.prePoiDetailCard.foldCard(!0), window.prePoiDetailCard.childMarkers && window.prePoiDetailCard.childMarkers.forEach(function(i) {
                    i._uid === o.uid && (a = i)
                }));
                var e = i("poidetail:widget/libs/poiDetailMgr/poiDetailMgr.js");
                e.create({
                    uid: o.uid
                }, {
                    withMarker: !0,
                    marker: a,
                    srcFrom: "jssdk_entrence"
                }).then(function(i) {
                    var o = a || i.poiDetailCard.marker,
                        e = i.poiDetailCard.infoWindow;
                    o && e && o.openSimpleInfoWindow(e)
                })
            },
            jumpToCommentPageNAComp: function() {
                var i = "http://map.baidu.com/ugc/remark/index?uid=" + window.jssdkBaseData.uid;
                window.open(i, "_blank")
            },
            jumpToVideoPlayNAComp: function(o) {
                if (o && o.video_url) {
                    var a = o.video_url;
                    i.async("poidetail:widget/ui/videoViewer/videoViewer.js", function(i) {
                        var o = new i(a);
                        o.playVideo()
                    })
                }
            },
            jumpToCarCareNAComp: function(i, o) {
                s(o, u, "CompApi", "dispatch", [{
                    category: i.category,
                    target: i.target,
                    base_params: {
                        weburl: i.base_params.weburl,
                        src_from: i.base_params.src_from
                    }
                }])
            },
            jumpToMarkPageNAComp: function(i) {
                var o = {
                        uid: i.uid,
                        from_source: i.from_source || "poi_detail_page",
                        statistics_source: i.statistics_source || "cater_detail_not_certified"
                    },
                    a = this.buildOpenApiUrl({
                        comName: "lbc",
                        target: "show_lbc_bgc_page",
                        param: encodeURIComponent(JSON.stringify(o))
                    });
                this.openApi({
                    url: a
                })
            },
            jumpToMarkedPageNAComp: function(i) {
                var o = {
                        uid: i.uid,
                        name: i.name || ""
                    },
                    a = this.buildOpenApiUrl({
                        comName: "lbc",
                        target: "merchant_certified_v",
                        param: encodeURIComponent(JSON.stringify(o))
                    });
                this.openApi({
                    url: a
                })
            },
            jumpToUserSysNAComp: function() {},
            jumpToVipCarNAComp: function(i) {
                i = i || {};
                var o = {
                        uid: i.uid || window.jssdkBaseData.uid,
                        level: i.level || "18",
                        poiLocx: "" + Number(i.poiLocx || window.jssdkBaseData.x),
                        poiLocy: "" + Number(i.poiLocy || window.jssdkBaseData.y),
                        poiname: i.poiname || window.jssdkBaseData.name
                    },
                    a = this.buildOpenApiUrl({
                        category: "rentcar",
                        target: "vipcar_main_page",
                        param: encodeURIComponent(JSON.stringify(o))
                    });
                this.openApi({
                    url: a
                })
            },
            jumpToWebShellComp: function(i) {
                var o = i.url;
                o.indexOf("ugc.map.baidu.com/ifix/poiproblem/poiproblempcpage") > -1 ? (o = "https://ugc.map.baidu.com/ifix/poiproblem/poiproblempcpage?business_trigger=12&poi_uid=" + window.jssdkBaseData.uid, window.open(o, "_blank")) : (o = o.replace("https://", "http://"), window.open(o, "_blank"))
            },
            jumpToDetailSecondPage: function(i) {
                var o = i.data || {},
                    a = $.extend(o, window.jssdkBaseData, {
                        page: i.page,
                        pageTitle: i.title
                    });
                n.init(a, window.jssdkCurPoiCard)
            },
            jumpToCouponPage: function() {},
            jumpToActivityPage: function() {},
            jumpToShoppingGuidePage: function() {},
            jumpToShoppingFloorPage: function() {},
            jumpToImagePage: function(o) {
                var a = o.index || 0;
                i.async("poidetail:widget/ui/photoViewer/photoViewer.js", function(i) {
                    var o = new i(a);
                    o.getPhotosData(window.jssdkBaseData.uid, window.jssdkBaseData.srcName)
                })
            },
            jumpToCommentPage: function(i) {
                if ("" === i.commentId) {
                    var o = $.extend(i, window.jssdkBaseData, {
                        page: "commentPage",
                        pageTitle: "评论"
                    });
                    n.init(o, window.jssdkCurPoiCard)
                }
            },
            jumpToFlowPage: function(i) {
                var o = $.extend(i, window.jssdkBaseData, {
                    page: "flowPage",
                    pageTitle: "人口流动指数"
                });
                n.init(o, window.jssdkCurPoiCard)
            },
            jumpToBigImagePage: function(o) {
                var a = o.index || 0;
                i.async("poidetail:widget/ui/photoViewer/photoViewer.js", function(i) {
                    var e = new i(a);
                    o.poiUid = window.jssdkBaseData.uid, o.type = window.jssdkBaseData.srcName, e.getCommentPhotosData(o)
                })
            },
            jumpToLabelsPage: function(i) {
                var o = $.extend(i, window.jssdkBaseData, {
                    page: "labelsPage",
                    pageTitle: "印象标签"
                });
                n.init(o, window.jssdkCurPoiCard)
            },
            jumpToLabelsThirdPage: function(i) {
                var o = $.extend(i, window.jssdkBaseData, {
                    page: "labelsPage",
                    pageTitle: "印象标签"
                });
                n.init(o, window.jssdkCurPoiCard)
            },
            jumpToScopeIntroPage: function(i) {
                var o = $.extend(i, window.jssdkBaseData, {
                    page: "scopeIntroPage",
                    pageTitle: "景点介绍"
                });
                n.init(o, window.jssdkCurPoiCard)
            },
            jumpToScopeRouteGuide: function(i) {
                var o = {
                        uid: i.uid || window.jssdkBaseData.uid,
                        from: i.from || "fromDetail"
                    },
                    a = this.buildOpenApiUrl({
                        category: "scenery",
                        target: "scenery_route_guide_page",
                        param: encodeURIComponent(JSON.stringify(o))
                    });
                this.openApi({
                    url: a
                })
            },
            jumpToScopeVoiceGuide: function() {},
            jumpToScopeHeatMap: function() {},
            postPageViewToNative: function(i, o) {
                s(o, u, "WebToNativePost", "helpH5ToPost", [i])
            },
            jumpToTieBaThirdApp: function(i, o) {
                s(o, u, "ThirdApp", "thirdapp", [{
                    category: "com.baidu.tieba",
                    param: {
                        base_params: {
                            tname: i.tname,
                            turl: encodeURIComponent(i.turl) || "",
                            tid: i.tid
                        }
                    }
                }])
            },
            jumpToTicketsPage: function(i) {
                var o = $.extend(i, window.jssdkBaseData, {
                    page: "tickets",
                    pageTitle: "门票预订"
                });
                n.init(o, window.jssdkCurPoiCard)
            },
            jumpToGlobalDetailPage: function(i) {
                i.detailInfo = JSON.stringify(i.detailInfo);
                var o = $.extend(i, window.jssdkBaseData, {
                    page: "globalDetailPage",
                    pageTitle: "详情"
                });
                n.init(o, window.jssdkCurPoiCard)
            },
            jumpToGlobalRecommendPage: function(i) {
                i.list = JSON.stringify(i.list);
                var o = $.extend(i, window.jssdkBaseData, {
                    page: "globalRecommendPage",
                    pageTitle: "网友推荐"
                });
                n.init(o, window.jssdkCurPoiCard)
            },
            jumpToGlobalCommentPage: function(i) {
                var o = $.extend(i, window.jssdkBaseData, {
                    page: "globalCommentPage",
                    pageTitle: "评论"
                });
                n.init(o, window.jssdkCurPoiCard)
            },
            jumpToDishRecommendPage: function(i) {
                var o = $.extend(i, window.jssdkBaseData, {
                    page: "dishRecommendPage",
                    pageTitle: "推荐菜"
                });
                n.init(o, window.jssdkCurPoiCard)
            },
            jumpToRecommendCaterPage: function(i) {
                var o = $.extend(i, window.jssdkBaseData, {
                    page: "recommendCaterPage",
                    pageTitle: "推荐菜"
                });
                n.init(o, window.jssdkCurPoiCard)
            },
            openApiForTripEdit: function(i) {
                var o = "baidumap://map/trip?popRoot=no&sourceFrom=detailPage&action=edit&name=" + i.name + "&uid=" + i.uid + "&addr=" + i.addr + "&loc=" + i.loc + "&tripId=";
                this.openApi({
                    url: o
                })
            },
            openApiForTripList: function(i) {
                var o = "baidumap://map/trip?popRoot=no&sourceFrom=detailPage&action=list&tripId=" + i.tripId;
                this.openApi({
                    url: o
                })
            },
            openApiForSurroundGuide: function(i) {
                p.hideCards(), window.jssdkCurPoiCard.lockMarkerHighlight = !0, window.jssdkCurPoiCard.foldCard(!0), window.jssdkCurPoiCard.lockMarkerHighlight = !1, d.setState("nearby", {
                    center: {
                        name: i.name,
                        uid: window.jssdkBaseData.uid,
                        point: {
                            x: i.pos[0],
                            y: i.pos[1]
                        },
                        cid: window.jssdkBaseData.c
                    }
                }, {
                    keepResult: !0
                })
            },
            openApiForSurroundGuideItem: function(i) {
                p.hideCards(), window.jssdkCurPoiCard.lockMarkerHighlight = !0, window.jssdkCurPoiCard.foldCard(!0), window.jssdkCurPoiCard.lockMarkerHighlight = !1, d.setState("nearby", {
                    center: {
                        name: i.name,
                        uid: window.jssdkBaseData.uid,
                        point: {
                            x: i.pos[0],
                            y: i.pos[1]
                        },
                        cid: window.jssdkBaseData.c,
                        invokeFrom: "jssdk"
                    },
                    query: i.keyword
                }, {
                    keepResult: !0
                }).then(function() {
                    d.search()
                })
            },
            openApiForWaimai: function(i) {
                var o = "baidumap://map/bainuocomp?compid=waimai&compage=shoplist&shop_id=" + i.shop_id + "&shop_name=" + i.shop_name;
                this.openApi({
                    url: o
                })
            },
            openApiForPoiDetailPage: function(o) {
                window.prePoiDetailCard && window.prePoiDetailCard.foldCard(!0);
                var a = i("poidetail:widget/libs/poiDetailMgr/poiDetailMgr.js");
                a.create({
                    uid: o.uid
                }, {
                    withMarker: !0,
                    srcFrom: "jssdk_entrence"
                }).then(function(i) {
                    var o = i.poiDetailCard.marker,
                        a = i.poiDetailCard.infoWindow;
                    o && a && o.openSimpleInfoWindow(a)
                })
            },
            onlinePageForOilCard: function(i, o) {
                this.onlinePage(i, o)
            },
            onlinePageForShopmallMain: function(i, o) {
                var a = "http://client.map.baidu.com/shoppingmall/main/index.html?from=detailpage&uid=" + i.uid;
                this.onlinePage({
                    url: a
                }, o)
            },
            onlinePageForShopmallBrands: function(i, o) {
                var a = "http://client.map.baidu.com/shoppingmall/brands/index.html?from=detailpage&uid=" + i.uid;
                this.onlinePage({
                    url: a
                }, o)
            },
            onlinePageForShopmallProductDetail: function(i, o) {
                var a = "http://client.map.baidu.com/shoppingmall/detail/index.html?from=detailpage&uid=" + i.uid + "&brand_uid=" + i.brand_id + "&product_id=" + i.product_id + "&provider_txt=" + (i.provider_txt || "");
                this.onlinePage({
                    url: a
                }, o)
            },
            onlinePageForShopmallNews: function(i, o) {
                var a = "http://client.map.baidu.com/shoppingmall/news/index.html?from=detailpage&uid=" + i.uid;
                this.onlinePage({
                    url: a
                }, o)
            },
            onlinePageForOrbcc: function(i, o) {
                var a = i.url + "&loc=" + i.loc;
                this.onlinePage({
                    url: a
                }, o)
            },
            onlinePageForBusTicket: function(i, o) {
                var a = "http://kuai.baidu.com/webapp/common/index.html?us=map_h5&os=android";
                this.onlinePage({
                    url: a
                }, o)
            },
            uploadPictureForUgcVote: function(i) {
                var o = "http://api.s.baidu.com/ifix/util/addpic";
                this.uploadPicture({
                    url: o
                }, i)
            },
            jumpToLBCOnlinePage: function(i, o, a) {
                var e = [];
                for (var t in o) e.push(t + "=" + o[t]);
                i += "?" + e.join("&"), this.onlinePage({
                    url: i
                }, a)
            },
            jumpToLBCOnlinePageForRentList: function(i, o) {
                var a = "http://mbcapi.baidu.com/mbc/estates/index/?t=" + (new Date).valueOf() + "/#!/",
                    e = {
                        bid: i.bid,
                        city_id: i.city_id,
                        lng: i.lng,
                        lat: i.lat,
                        name: i.name,
                        isapp: 1,
                        from_source: "poiDetail"
                    };
                this.jumpToLBCOnlinePage(a, e, o)
            },
            jumpToLBCOnlinePageForRentDetail: function(i, o) {
                var a = "http://mbcapi.baidu.com/mbc/estates/index/?t=" + (new Date).valueOf() + "/#!/houseDetail",
                    e = {
                        bid: i.bid,
                        city_id: i.city_id,
                        lng: i.lng,
                        lat: i.lat,
                        house_id: i.house_id,
                        third_id: i.third_id,
                        isapp: 1,
                        from_source: "poiDetail"
                    };
                this.jumpToLBCOnlinePage(a, e, o)
            },
            jumpToLBCOnlinePageForSale2List: function(i, o) {
                var a = "http://mbcapi.baidu.com/mbc/estates/secHouse/?t=" + (new Date).valueOf() + "/#!/",
                    e = {
                        bid: i.bid,
                        city_id: i.city_id,
                        lng: i.lng,
                        lat: i.lat,
                        name: i.name,
                        isapp: 1,
                        from_source: "poiDetail"
                    };
                this.jumpToLBCOnlinePage(a, e, o)
            },
            jumpToLBCOnlinePageForSale2Detail: function(i, o) {
                var a = "http://mbcapi.baidu.com/mbc/estates/secHouse/?t=" + (new Date).valueOf() + "/#!/houseDetail",
                    e = {
                        bid: i.bid,
                        city_id: i.city_id,
                        lng: i.lng,
                        lat: i.lat,
                        house_id: i.house_id,
                        third_id: i.third_id,
                        isapp: 1,
                        from_source: "poiDetail"
                    };
                this.jumpToLBCOnlinePage(a, e, o)
            },
            buildOpenApiUrl: function(i) {
                return i = $.url.jsonToQuery(i), "baidumap://map/component?" + i
            },
            openApiFilter: function(i) {
                var o, a;
                if (/^(?:baidumap):\/\/map\/place\/detail/.test(i)) return o = i.split("?")[1], a = $.url.queryToJson(o), this.jumpToPoiPageNAComp({
                    uid: a.uid
                }), !0;
                if (/^(?:baidumap):\/\/map\/cost_share/.test(i)) {
                    var e = i.split("?");
                    if (o = e[1], a = $.url.queryToJson(o), a.url) return e[2] && (a.url += "?" + e[2]), a.url = decodeURIComponent(a.url), a.url += -1 !== a.url.indexOf("?") ? "&unifydetail=1" : "?unifydetail=1", window.open(a.url, "_blank"), !0
                }
                if (/^baidumap:\/\/map\/bainuocomp\?mode=NORMAL_MODE&popRoot=no&compid=lvyou&comppage=orderfill/.test(i)) {
                    o = i.split("?")[1], a = $.url.queryToJson(o);
                    var t = {
                            qt: "order_input",
                            partner_id: a.partner_id,
                            scope_id: a.scope_id,
                            ticket_id: a.ticket_id,
                            ext_from: a.ext_from
                        },
                        n = $.url.jsonToQuery(t),
                        d = "https://lvyou.baidu.com/business/ticket/orderfill/" + n;
                    return window.open(d, "_blank"), !0
                }
                return !1
            },
            openApi: function(i) {
                this.openApiFilter(i.url)
            },
            onlinePage: function(i) {
                i.url && i.url.length > 0 && window.open(i.url, "_blank")
            },
            setWebviewPipeInterface: function() {},
            jumpToBarrageNAComp: function() {},
            toHttps: function(i) {
                if ("https:" === location.protocol) {
                    if (t.test(i)) return i.replace("http:", "");
                    for (var o in e)
                        if (0 === i.indexOf(o)) return i.replace(o, e[o]);
                    return i
                }
                return i
            }
        }
    }
});;
define("poidetail:widget/unify/unifylibs/eventemitter.js", function(e, t, n) {
    ! function(e) {
        "use strict";

        function t() {}

        function r(e, t) {
            for (var n = e.length; n--;)
                if (e[n].listener === t) return n;
            return -1
        }

        function i(e) {
            return function() {
                return this[e].apply(this, arguments)
            }
        }

        function s(e) {
            return "function" == typeof e || e instanceof RegExp ? !0 : e && "object" == typeof e ? s(e.listener) : !1
        }
        var o = t.prototype,
            u = e.EventEmitter;
        o.getListeners = function(e) {
            var t, n, r = this._getEvents();
            if (e instanceof RegExp) {
                t = {};
                for (n in r) r.hasOwnProperty(n) && e.test(n) && (t[n] = r[n])
            } else t = r[e] || (r[e] = []);
            return t
        }, o.flattenListeners = function(e) {
            var t, n = [];
            for (t = 0; t < e.length; t += 1) n.push(e[t].listener);
            return n
        }, o.getListenersAsObject = function(e) {
            var t, n = this.getListeners(e);
            return n instanceof Array && (t = {}, t[e] = n), t || n
        }, o.addListener = function(e, t) {
            if (!s(t)) throw new TypeError("listener must be a function");
            var n, i = this.getListenersAsObject(e),
                o = "object" == typeof t;
            for (n in i) i.hasOwnProperty(n) && -1 === r(i[n], t) && i[n].push(o ? t : {
                listener: t,
                once: !1
            });
            return this
        }, o.on = i("addListener"), o.addOnceListener = function(e, t) {
            return this.addListener(e, {
                listener: t,
                once: !0
            })
        }, o.once = i("addOnceListener"), o.defineEvent = function(e) {
            return this.getListeners(e), this
        }, o.defineEvents = function(e) {
            for (var t = 0; t < e.length; t += 1) this.defineEvent(e[t]);
            return this
        }, o.removeListener = function(e, t) {
            var n, i, s = this.getListenersAsObject(e);
            for (i in s) s.hasOwnProperty(i) && (n = r(s[i], t), -1 !== n && s[i].splice(n, 1));
            return this
        }, o.off = i("removeListener"), o.addListeners = function(e, t) {
            return this.manipulateListeners(!1, e, t)
        }, o.removeListeners = function(e, t) {
            return this.manipulateListeners(!0, e, t)
        }, o.manipulateListeners = function(e, t, n) {
            var r, i, s = e ? this.removeListener : this.addListener,
                o = e ? this.removeListeners : this.addListeners;
            if ("object" != typeof t || t instanceof RegExp)
                for (r = n.length; r--;) s.call(this, t, n[r]);
            else
                for (r in t) t.hasOwnProperty(r) && (i = t[r]) && ("function" == typeof i ? s.call(this, r, i) : o.call(this, r, i));
            return this
        }, o.removeEvent = function(e) {
            var t, n = typeof e,
                r = this._getEvents();
            if ("string" === n) delete r[e];
            else if (e instanceof RegExp)
                for (t in r) r.hasOwnProperty(t) && e.test(t) && delete r[t];
            else delete this._events;
            return this
        }, o.removeAllListeners = i("removeEvent"), o.emitEvent = function(e, t) {
            var n, r, i, s, o, u = this.getListenersAsObject(e);
            for (s in u)
                if (u.hasOwnProperty(s))
                    for (n = u[s].slice(0), i = 0; i < n.length; i++) r = n[i], r.once === !0 && this.removeListener(e, r.listener), o = r.listener.apply(this, t || []), o === this._getOnceReturnValue() && this.removeListener(e, r.listener);
            return this
        }, o.trigger = i("emitEvent"), o.emit = function(e) {
            var t = Array.prototype.slice.call(arguments, 1);
            return this.emitEvent(e, t)
        }, o.setOnceReturnValue = function(e) {
            return this._onceReturnValue = e, this
        }, o._getOnceReturnValue = function() {
            return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
        }, o._getEvents = function() {
            return this._events || (this._events = {})
        }, t.noConflict = function() {
            return e.EventEmitter = u, t
        }, "object" == typeof n && n.exports ? n.exports = t : e.EventEmitter = t
    }(this || {})
});;
define("poidetail:widget/unify/unifylibs/trunk.js", function(e, i, n) {
    var t = e("poidetail:widget/unify/unifylibs/jssdk.js"),
        s = e("poidetail:widget/unify/unifylibs/eventemitter.js");
    n.exports = function(e, i) {
        var n = t(e.base, i);
        window.jssdk = n;
        var u = e || {},
            d = ["base"],
            f = {
                eventBus: new s,
                dataBus: {
                    set: function(e, i) {
                        ~d.indexOf(e) || (u[e] = i)
                    },
                    get: function(e) {
                        return $.extend({}, u[e])
                    }
                },
                methodBus: n
            };
        return f
    }
});;
define("poidetail:widget/unify/unifylibs/config.js", function(i, e, o) {
    o.exports = {
        poiCacheTime: 0,
        logConfig: {
            logClass: ".BMap-log",
            prefix: "unify",
            pageSign: "page",
            cardSign: "card",
            logKeySign: "data-logkey"
        },
        base: {
            sv: "10.0.0",
            os: "android",
            cuid: T.cookie.get("BAIDUID") + "_baiduid"
        }
    }
});;
define("poidetail:widget/unify/unifydetail/relatedpoihook.js", function(e, i, n) {
    var t = e("common:widget/ui/constant/Constant.js"),
        a = new BMap.Icon(t.A_J_MARKER_IMG_NEW, new BMap.Size(22, 34), {
            imageSize: new BMap.Size(t.A_J_MARKER_IMG_NEW_WIDTH, t.A_J_MARKER_IMG_NEW_HEIGHT),
            imageOffset: new BMap.Size(200, 189),
            anchor: new BMap.Size(11, 34),
            infoWindowOffset: new BMap.Size(13, 1),
            srcSet: t.A_J_MARKER_IMG_NEW2X_SRCSET
        }),
        o = new BMap.Icon(t.A_J_MARKER_IMG_NEW, new BMap.Size(22, 34), {
            imageSize: new BMap.Size(t.A_J_MARKER_IMG_NEW_WIDTH, t.A_J_MARKER_IMG_NEW_HEIGHT),
            imageOffset: new BMap.Size(200, 225),
            anchor: new BMap.Size(11, 34),
            infoWindowOffset: new BMap.Size(13, 1),
            srcSet: t.A_J_MARKER_IMG_NEW2X_SRCSET
        });
    n.exports = {
        init: function(e, i) {
            this.data = e, this.renderMarkers(e, i)
        },
        renderMarkers: function(e, i) {
            try {
                var n = this;
                i.childMarkers = [], e.content.forEach(function(e, t) {
                    if (e.geo && e.uid) {
                        var r = e.geo,
                            c = e.uid,
                            d = r.split(","),
                            s = d[0],
                            M = d[1],
                            _ = new BMap.Marker(new BMap.Point(s, M), {
                                icon: a
                            });
                        _._uid = c, _.unhighlightMarker = function() {
                            _.setIcon(a)
                        }, i.childMarkers.push(_), map.addOverlay(_), _.addEventListener("mouseover", function() {
                            _.setIcon(o)
                        }), _.addEventListener("mouseout", function() {
                            _.selected || _.setIcon(a)
                        }), _.addEventListener("click", function() {
                            n.sonClick(i, t)
                        })
                    }
                })
            } catch (t) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: t.message || t.description,
                    path: "poidetail:widget/unify/unifydetail/relatedpoihook.js",
                    ln: 76
                })
            }
        },
        sonClick: function(i, n) {
            var t = i.childMarkers[n];
            i.foldCard(!0), i.childMarkers.forEach(function(e) {
                e.selected = !1, e.setIcon(a)
            }), t.selected = !0, t.setIcon(o);
            var r = e("poidetail:widget/libs/poiDetailMgr/poiDetailMgr.js");
            r.create({
                uid: this.data.content[n].uid
            }, {
                withMarker: !0,
                marker: t,
                srcFrom: "jssdk_entrence"
            }).then(function(e) {
                t.openSimpleInfoWindow(e.poiDetailCard.infoWindow)
            }), r.preMainCard = i
        },
        name: "relatedpoihook"
    }
});;
define("poidetail:widget/unify/unifydetail/cardfilter.js", function(i, o, t) {
    var a = i("poidetail:widget/unify/unifydetail/relatedpoihook.js"),
        e = {
            pcIgnorCard: {},
            hookCard: {
                relatedPoi: "relatedPoiHook"
            },
            filter: function(i) {
                return this.pcIgnorCard[i.card_info.name] ? !1 : T.browser.ie && "zhidaoEntry" === i.card_info.name ? !1 : !0
            },
            hook: function(i, o) {
                var t = i.card_info.name;
                this.hookCard[t] && "function" == typeof this[this.hookCard[t]] && this[this.hookCard[t]](i, o)
            },
            relatedPoiHook: function(i, o) {
                a.init(i.data, o)
            }
        };
    t.exports = e
});;
define("poidetail:widget/unify/unifydetail/unifydetail.js", function(e, n, t) {
    var i = e("poidetail:widget/unify/unifylibs/trunk.js"),
        r = e("poidetail:widget/unify/unifylibs/dom.js"),
        o = e("poidetail:widget/unify/unifylibs/config.js"),
        a = e("poidetail:widget/unify/unifydetail/cardfilter.js"),
        d = e("common:widget/ui/util/util.js");
    t.exports = {
        init: function(e, n) {
            function t() {
                var e = d.getParam(location.href);
                if (e && e.invoketofun) {
                    var n = null;
                    switch (e.invoketofun) {
                        case "nav":
                            n = $("#generalheader > .generalHead-right-header > #route-go");
                            break;
                        case "photo":
                            n = $("div[cardname='imagewall'] .special8-title-box");
                            break;
                        case "comment":
                            n = $("div[cardname='comment'] .J-goto-commit");
                            break;
                        default:
                            return
                    }
                    n.length && n.click()
                }
            }
            e.base = $.extend(e.content, o.base);
            var r = n.unifyContainerIndex;
            this.trunk = i({
                base: e.base
            }, n), window.trunk = this.trunk, window.trunkDataBus = window.TDB = this.trunk.dataBus, window.trunkEventBus = window.TEB = this.trunk.eventBus, window.trunkMethodBus = window.TMB = this.trunk.methodBus, this.renderCards(e.avocado, n, r), window.TEB.once("autoInvoke", t)
        },
        renderCards: function(e, n, t) {
            function i() {
                clearTimeout(c);
                for (var e = a.firstScreenCount; e < r.length; e++) a.renderCard(e, r[e], !1, n, t)
            }
            try {
                var r = e.cards,
                    a = this;
                this.firstScreenCards = [], this.firstScreenCount = Math.min(5, r.length), this.totalCardCount = r.length, this.renderedFirstScreenCount = 0, this.renderCardCount = 0;
                var d = (window.TDB.get("base"), e.base.logprefix || "");
                "global" === d && (o.logConfig.cardSign = d + "_" + o.logConfig.cardSign, o.logConfig.pageSign = d + "_" + o.logConfig.pageSign), $("#unifycontainer" + t).on("click", ["a", o.logConfig.logClass].join(","), function(e) {
                    var n = $(this);
                    "#" === n.attr("href") && e.preventDefault();
                    var t = n.attr("href");
                    /^baidumap:/.test(t) && (e.preventDefault(), TMB.openApi({
                        url: t
                    })), e.stopPropagation()
                });
                for (var s = 0; s < this.firstScreenCount; s++) a.renderCard(s, r[s], !0, n, t);
                var c = setTimeout(function() {
                    window.TEB.off("FirstScreen", i), i()
                }, 300);
                window.TEB.once("FirstScreen", i)
            } catch (f) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: f.message || f.description,
                    path: "poidetail:widget/unify/unifydetail/unifydetail.js",
                    ln: 107
                })
            }
        },
        renderCard: function(e, n, t, i, o) {
            try {
                var d = a.filter(n);
                a.hook(n, i);
                var s = new r({
                    index: e + "_" + o,
                    height: n.card_info.height,
                    width: n.card_info.width,
                    container: "#unifycontainer" + o,
                    cardName: n.card_info.name,
                    isVisible: d
                }).init();
                this.renderCardContent(n, s, t)
            } catch (c) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: c.message || c.description,
                    path: "poidetail:widget/unify/unifydetail/unifydetail.js",
                    ln: 129
                })
            }
        },
        renderCardContent: function(n, t, i) {
            try {
                {
                    var r = this,
                        o = (n.card_info.name, Date.now(), n.info.url);
                    window.TDB.get("base")
                }
                e([o], function() {
                    r.postProcessCardRender(), e([n.info.name], function(e) {
                        $.isArray(n.data) && 0 === n.data.length && (n.data = {});
                        try {
                            e({
                                data: n.data,
                                cardInfo: n.card_info
                            }, function(e) {
                                return e === !1 ? (t.remove(), null) : (e = void 0 === e ? "" : e, i && r.firstScreenCards ? (r.firstScreenCards.push(t), t.$dom && t.$dom[0] && (t.$dom[0].innerHTML = e)) : t.append(e).show(), {
                                    domIndex: t.index,
                                    domId: t.id
                                })
                            })
                        } catch (o) {
                            console.log(o)
                        }
                        if (i && (r.renderedFirstScreenCount++, r.renderedFirstScreenCount === r.firstScreenCount)) {
                            for (var a = 0; a < r.firstScreenCards.length; a++) r.firstScreenCards[a].show();
                            r.firstScreenCards = void 0, window.TEB.emit("FirstScreen")
                        }
                        r.totalCardCount === r.renderCardCount && window.TEB.emit("autoInvoke")
                    })
                }, function() {
                    if (i && (r.renderedFirstScreenCount++, r.renderedFirstScreenCount === r.firstScreenCount)) {
                        for (var e = 0; e < r.firstScreenCards.length; e++) r.firstScreenCards[e].show();
                        r.firstScreenCards = void 0, window.TEB.emit("FirstScreen")
                    }
                    r.totalCardCount === r.renderCardCount && window.TEB.emit("autoInvoke")
                })
            } catch (a) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: a.message || a.description,
                    path: "poidetail:widget/unify/unifydetail/unifydetail.js",
                    ln: 211
                })
            }
        },
        moveCommentCardToTop: function() {
            if (!this.hasMovedCommentCard) {
                this.hasMovedCommentCard = !0;
                var e = $('.poidetail-container [cardname="comment"]');
                if (-1 !== location.href.indexOf("da_src=pc-alading-comment") && e.length) {
                    var n = e[0].offsetTop,
                        t = $(".poidetail-container .poidetail-widget-generalHead").height(),
                        i = e[0].parentElement.parentElement.parentElement;
                    i.scrollTo ? i.scrollTo(0, n - t) : i.scrollTop = n - t
                }
            }
        },
        postProcessCardRender: function() {
            try {
                this.moveCommentTimeId && clearTimeout(this.moveCommentTimeId);
                var e = this;
                if (this.moveCommentTimeId = setTimeout(function() {
                        e.moveCommentCardToTop()
                    }, 300), this.renderCardCount++, this.renderCardCount !== this.totalCardCount) return;
                setTimeout(function() {
                    clearTimeout(e.moveCommentTimeId), e.moveCommentCardToTop()
                }, 100)
            } catch (n) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: n.message || n.description,
                    path: "poidetail:widget/unify/unifydetail/unifydetail.js",
                    ln: 249
                })
            }
        }
    }
});;
define("poidetail:widget/unify/unifyMgr/unifyMgr.js", function(require, exports, module) {
    var DynamicWidgetsPageMgr = require("common:widget/com/dynamicWidgetsPageMgr.js"),
        cardMgr = require("common:widget/ui/card/cardMgr.js"),
        PoiDetailCard = require("poidetail:widget/libs/poiDetailCard/poiDetailCard.js"),
        searchBox = require("common:widget/ui/searchBox/searchBox.js"),
        unifydetail = require("poidetail:widget/unify/unifydetail/unifydetail.js"),
        DynamicBanner = require("common:widget/com/DynamicBanner/DynamicBanner.js"),
        style = '@charset "UTF-8";::-webkit-scrollbar{width:6px!important}.unifycontainer .c-line-bottom{border-color:#eee}.unifycontainer .c-title{font-color:#333;font-size:12px;font-weight:700}.unifycontainer .c-main{font-size:12px}.unifycontainer .lvyou1-title{font-size:12px;font-weight:700}.unifycontainer .lvyou1-tags-nav .item{padding:0 0 0 16px;font-size:12px;cursor:pointer}.unifycontainer .lvyou1-ticket-item .price{cursor:pointer}.unifycontainer .lvyou1-ticket-item .title{font-size:12px;height:auto}.unifycontainer .lvyou1-padding-t{padding-top:20px}.unifycontainer .lvyou1-ticket-list .more{cursor:pointer}.unifycontainer .special18-box .labels-inner span{cursor:pointer}.unifycontainer .comment-item .comment-imgs .ugc-img{cursor:pointer}.unifycontainer .phoenix-block{border-bottom:1px solid #ddd}.unifycontainer .shopping3-box .list-wrapper .list-each .info .top p{font-size:12px;overflow:hidden;height:auto;line-height:normal}.unifycontainer .shopping3-box .floor-wrapper{z-index:10}.unifycontainer .special8-title-box{cursor:pointer}.unifycontainer .special8-box .photo-list ul li{cursor:pointer}.unifycontainer .text6-box .content-wrapper a[data-logkey~="baikeCollege.list"]{cursor:default}.unifycontainer .text6-box .content-wrapper a[data-logkey~="relatedPoi.list"]{cursor:pointer}.unifycontainer .text6-box .title{height:36px;line-height:36px;cursor:pointer}.unifycontainer .special18-box .title{cursor:pointer;height:40px}.unifycontainer .special18-box .no-label-box{cursor:pointer}.unifycontainer .entry6-box .entry6-three{cursor:default}.unifycontainer .special23-more,.unifycontainer .special23-less{cursor:pointer}.unifycontainer .special2-box .commit-container .agree-box{display:none}.unifycontainer .shopping3-box a.check-wrapper{display:none}.unifycontainer .c-flexbox,.unifycontainer .flexbox,.unifycontainer c-row{display:-webkit-box;display:-webkit-flex;display:flex;display:-ms-flexbox;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}.unifycontainer .text6-box .content-wrapper a{-ms-flex:1;-webkit-box-flex:1}.unifycontainer .c-flexitem0{-ms-flex:0 0 auto;-webkit-box-flex:0 0 auto}.unifycontainer .c-flexitem1{-ms-flex:1 1 auto;-webkit-box-flex:1 1 auto}.unifycontainer .c-auxiliary{font-size:12px;overflow:visible}.unifycontainer .special11-zhidao-box,.unifycontainer .special2-box .head-wrapper{height:36px;line-height:36px}.unifycontainer .special23-title{font-size:12px;font-weight:700;min-height:none;height:36px;line-height:36px}.unifycontainer .special23-body,.unifycontainer .shopping3-box{font-size:12px}.unifycontainer .special2-box .score-wrapper .score{color:#000}.unifycontainer .commit-container li.comment-item{padding-bottom:10px}.unifycontainer .shopping3-box .title-wrapper .brands .list-brand .brand .name{font-size:12px}.unifycontainer .shopping3-box .title-wrapper .all-floors{font-size:12px}.unifycontainer .shopping3-box .title-wrapper:before{display:none}.unifycontainer .shopping3-box .floor-wrapper .floors .floor span,.unifycontainer .shopping3-box .text{font-size:12px}.unifycontainer .c-annotation[data-cmturl*="dianping.com"]{cursor:pointer}.unifycontainer .source-title-box{cursor:default}.unifycontainer .source-body-box li{cursor:pointer}.unifycontainer .shopping3-box .list-wrapper .list-each .pic{margin-top:10px;width:50px;height:50px}.unifycontainer .phoenix-block[cardname~=meishirecommendfood]{cursor:pointer}.unifycontainer .phoenix-block[cardname~=styleguide]{display:none}.unifycontainer .phoenix-block[cardname~=globalAddressTel]{display:none}.unifycontainer .special20-box .title{font-size:12px;font-weight:700}.unifycontainer .special20-box .sub-title{font-size:12px}.unifycontainer .poico9-box .head .title-each .text{font-size:12px;font-weight:700}.unifycontainer .detail-box{cursor:pointer}.unifycontainer .lvyou1-ticket-item .book-tip,.unifycontainer .lvyou1-ticket-item .split,.unifycontainer .lvyou1-ticket-item .extra:after{display:none}.unifycontainer .special2-1-box{cursor:pointer}.unifycontainer .list12-box-title .title{height:auto}.unifycontainer .special8-1-content{cursor:pointer}.unifycontainer .special21-weather{display:none}.unifycontainer .special21-weather+.c-line-bottom{display:none}.unifycontainer .list12-more-box{cursor:pointer}.unifycontainer .parking-wrapper .parking-header .title{font-size:12px;font-weight:700}.unifycontainer .parking-wrapper .parking-container table .day-info .name,.unifycontainer .parking-wrapper .parking-container table .night-info .name{font-size:12px}.unifycontainer .parking-left-wrapper .parking-left-container .parking-left-detail .info{font-size:12px}.unifycontainer .parking-left-wrapper .parking-left-header .title{font-size:12px;font-weight:700}.unifycontainer .parking-left-wrapper .parking-left-header .feedback{display:none}.unifycontainer .finance4-box .title,.unifycontainer .dianxin-box .dianxin-itme,.unifycontainer .finance4-box .finance4-itme span{font-size:12px}.unifycontainer .cater1-box .recommend-dishes .item-img{height:60px}.unifycontainer .poico3-box .price-font{font-size:12px}.unifycontainer .poico4-box .body .cell .contain .top-label,.unifycontainer .poico4-box .body .cell .contain .mid-label,.unifycontainer .poico4-box .body .cell .contain .bottom-label{font-size:12px}.unifycontainer .poico3-box .main-font,.unifycontainer .poico4-box .main-font{font-size:12px;font-weight:700}.unifycontainer .special21-body-right{display:none\\9}@-moz-document url-prefix(){.unifycontainer .special21-body-right{display:none}}.unifycontainer .poico11-box{border:1px #f5f6f7 solid}.unifycontainer .poico11-box .head .title-each .text{font-size:12px;font-weight:700}.unifycontainer .poico11-box .body .body-head .poico11-box-content .poico11-number{font-size:12px;color:#000;cursor:default}.unifycontainer .special2-box .histogram-wrapper .left{width:34%}.unifycontainer .special2-box .histogram-wrapper .left .c-flexbox{margin-right:15px}.unifycontainer .special2-box .histogram-wrapper .left .score{font-size:40px}.unifycontainer .special2-box .histogram-wrapper .left .grade{width:54px;height:10px}.unifycontainer .special2-box .histogram-wrapper .left .grade .grade-each{height:10px;width:10px}.unifycontainer .special2-box .histogram-wrapper .right{width:60%;height:80px}.unifycontainer .special2-box .histogram-wrapper .right .bar-wrapper{height:26px;line-height:20px;margin-bottom:0}.unifycontainer .special2-box .histogram-wrapper .right .bar-wrapper .bar{height:14px;border-radius:0 2px 2px 0;margin-top:2px}.unifycontainer .special2-box .histogram-wrapper .right .bar-wrapper .bar-text{font-size:13px}.unifycontainer .global-detail-box .shop-hours .sub-title{font-size:12px}.unifycontainer .global-detail-box .shop-hours{font-size:12px}.unifycontainer .global-detail-box .title-each span{font-size:12px}.unifycontainer .source-title{font-size:12px;font-weight:700}.unifycontainer .global-detail-box .content-wrapper .detail{font-size:12px}.unifycontainer .global-detail-box .check-wrapper .check-text{font-size:12px}.unifycontainer .special2-sub-title{margin-top:3px}.unifycontainer .tripadvisor-box-title{font-size:12px}.unifycontainer .tripadvisor-box-subtitle{font-size:12px}.unifycontainer-two{position:absolute;z-index:100;width:100%;height:100%;background:#fff;left:-1000px;top:0;transition:left .5s;-moz-transition:left .5s;-webkit-transition:left .5s;-o-transition:left .5s}.unifycontainer-two .c-auxiliary{font-size:12px}.unifycontainer-two .c-main{font-size:12px}.unifycontainer-two .unifycontainer-two-top{position:absolute;left:0;top:0;width:100%;height:40px;z-index:10}.unifycontainer-two .unifycontainer-two-top .unifycontainer-two-title{height:40px;margin:0 5px;text-align:center;line-height:40px;color:#000;font-size:14px;font-weight:700;border-bottom:solid 1px #ccc;margin-left:20px}.unifycontainer-two .unifycontainer-two-top .unifycontainer-two-close{position:absolute;left:15px;top:0;height:40px;text-align:center;font-size:12px;line-height:40px;cursor:pointer;color:#3385ff}.unifycontainer-two .unifycontainer-two-top .unifycontainer-two-close:before{content:\'\';display:inline-block;width:5px;height:9px;background:url(//webmap0.bdimg.com/wolfman/static/poidetail/images/arrow_bd8b88f.png) no-repeat;background-size:5px 9px;padding-right:10px}.unifycontainer-two .unifycontainer-two-wrapper{margin-top:40px;height:100%;overflow-y:auto;overflow-x:hidden}.unifycontainer-two .unifycontainer-two-wrapper .unifycontainer-two-content .comment-box{overflow-y:auto}.unifycontainer-two .unifycontainer-two-wrapper .unifycontainer-two-content .page-labels-box .submit{position:static;margin-left:0;cursor:pointer;border-radius:6px}.unifycontainer-two .unifycontainer-two-wrapper .unifycontainer-two-content .page-labels-box .label-item{cursor:pointer}.unifycontainer-two .comment-box .commit-container .ugc-img{cursor:pointer}.unifycontainer-two .comment-box .commit-container{overflow-y:hidden}.unifycontainer-two .comment-box .commit-container:after{display:none}.unifycontainer-two .item-source a.J-agree span{display:none}.unifycontainer-two .comment-box .btn-commit-wrapper{display:none}.unifycontainer-two .commit-container li.comment-item{padding-bottom:10px}.unifycontainer-two .phoenix-block{border-bottom:0}.unifycontainer-two .c-annotation[data-cmturl*="dianping.com"]{cursor:pointer}.unifycontainer-two .comment-box .J-agree{display:none}.unifycontainer-two .comment-box .commit-container .commit-each .middle .commit-detail .content{font-size:12px}.unifycontainer-two .lvyou1-padding-t{padding-top:20px}.unifycontainer-two .lvyou1-ticket-item .price{cursor:pointer}.unifycontainer-two .lvyou1-ticket-item .title{font-size:12px;height:auto}.unifycontainer-two .lvyou1-tags-nav .item{padding:0 0 0 16px;font-size:12px;cursor:pointer}.unifycontainer-two .lvyou1-nav{position:static}.unifycontainer-two .lvyou1-ticket-item .book-tip,.unifycontainer-two .lvyou1-ticket-item .split,.unifycontainer-two .lvyou1-ticket-item .extra:after{display:none}.unifycontainer-two .page-dish-recommend-box .box-bottom{margin-top:0}.unifycontainer-two .c-flexbox,.unifycontainer-two .flexbox,.unifycontainer-two c-row{display:-webkit-box;display:-webkit-flex;display:flex;display:-ms-flexbox;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}.unifycontainer-two .text6-box .content-wrapper a{-ms-flex:1;-webkit-box-flex:1}.unifycontainer-two .c-flexitem0{-ms-flex:0 0 auto;-webkit-box-flex:0 0 auto}.unifycontainer-two .c-flexitem1{-ms-flex:1 1 auto;-webkit-box-flex:1 1 auto}.unifycontainer-two .page-labels-box .submit span{-webkit-box-flex:1;-ms-flex:1}.unifycontainer-two .page-labels-box .label-item-wrapper{width:49%}.unifycontainer-two .page-scope-intro-content{overflow-y:auto}.unifycontainer-two .comment-box .text{font-size:12px}.unifycontainer-two .tab li{font-size:12px;cursor:pointer}.unifycontainer,.unifycontainer-two{}.unifycontainer .pc-fontsize,.unifycontainer-two .pc-fontsize{font-size:12px}.unifycontainer .pc-title,.unifycontainer-two .pc-title{font-weight:700;color:#333}.unifycontainer .pc-content,.unifycontainer-two .pc-content{color:#666}.unifycontainer .pc-annotation,.unifycontainer .pc-time,.unifycontainer .pc-from,.unifycontainer-two .pc-annotation,.unifycontainer-two .pc-time,.unifycontainer-two .pc-from{color:#999}.unifycontainer .pc-tab-active,.unifycontainer-two .pc-tab-active{color:#3385ff}.unifycontainer .pc-state-highlight,.unifycontainer-two .pc-state-highlight{color:#f76454}.unifycontainer .pc-photo-pic,.unifycontainer-two .pc-photo-pic{width:80px;height:56px}.unifycontainer .pc-list-pic,.unifycontainer-two .pc-list-pic{width:64px;height:64px}.unifycontainer .pc-link,.unifycontainer-two .pc-link{cursor:pointer}.unifycontainer .pc-flex,.unifycontainer-two .pc-flex{-ms-flex:1;-webkit-box-flex:1}.unifycontainer .pc-none,.unifycontainer-two .pc-none{display:none}';
    require.loadCss({
        content: style,
        name: "unifyMgr"
    });
    var bannerStyle = ".poiLeadDownloadCard .download-banner .download-img{float:left;margin:10px 19px 10px 16px}.poiLeadDownloadCard .download-banner .title{padding-top:16px;margin-bottom:4px;line-height:28px;height:28px;font-size:20px;color:#000}.poiLeadDownloadCard .download-banner .sub-title{line-height:16px;height:16px;font-size:16px;color:#666}.poiLeadDownloadCard .download-banner{pointer-events:auto;position:relative}.poiLeadDownloadCard .close-btn-download-banner{position:absolute;width:20px;height:20px;line-height:20px;font-size:28px;text-align:center;display:block;cursor:pointer;right:6px;top:8px;color:#ccc}.poiLeadDownloadCard .qrcode-box{float:left;margin:10px 19px 10px 16px;width:60px;height:60px}";
    require.loadCss({
        content: bannerStyle,
        name: "poiDownloadBanner"
    });
    var UnifyMgr = {
        unifyContainerIndex: 0,
        init: function(n, i, e) {
            var o = this;
            o.data = n, o.opts = i, o.renderHeader(n, i, e, function(n) {
                try {
                    o.renderUnifyComponent(n)
                } catch (i) {
                    "undefined" != typeof alog && alog("exception.fire", "catch", {
                        msg: i.message || i.description,
                        path: "poidetail:widget/unify/unifyMgr/unifyMgr.js",
                        ln: 43
                    })
                }
            })
        },
        renderHeader: function(pageData, options, promiseHandler, renderNextCbk) {
            try {
                var me = this,
                    uid = pageData.content.uid,
                    name = pageData.content.name,
                    geo = pageData.content.geo;
                options = options || {}, options = T.extend(options, {
                    record: !0,
                    uid: uid,
                    name: name,
                    geo: geo
                });
                var poiDetailCard = new PoiDetailCard(options);
                promiseHandler.resolve({
                    poiDetailCard: poiDetailCard,
                    data: pageData
                }), listener.trigger("poisearch", "poidetailshow", {
                    uid: uid
                });
                var unifyContainerIndex = this.unifyContainerIndex;
                this.unifyContainerIndex++;
                var widgetsArrange = [];
                widgetsArrange.push({
                    js: "poidetail:widget/ui/generalHead/generalHead.js",
                    data: pageData.content,
                    wrapClass: "customerHead"
                }, {
                    children: [{
                        js: "poidetail:widget/ui/generalInfo/generalInfo.js",
                        data: pageData.content
                    }, {
                        js: "poidetail:widget/unify/unifycontainer/unifycontainer.js",
                        data: T.extend(pageData.content, {
                            unifyContainerIndex: unifyContainerIndex
                        })
                    }],
                    wrapClass: "customerOther"
                }), pageData.industry = "unify";
                var pageOpts = {
                        pageData: pageData,
                        containerClass: "poidetail-container",
                        widgets: widgetsArrange
                    },
                    dynamicWidgetsPageMgr = new DynamicWidgetsPageMgr(pageOpts);
                dynamicWidgetsPageMgr.addEventListener("renderComplete", function() {
                    try {
                        poiDetailCard.render = function() {
                            try {
                                var n = "",
                                    i = "",
                                    e = "";
                                if (pageOpts && pageOpts.pageData) var o = pageOpts.pageData;
                                o && o.content && (n = o.content.uid || "", i = o.content.showtag || "", e = o.content.std_tag || ""), addStat("poidetail.unifycard.render", "show", {
                                    uid: n,
                                    show_tag: i,
                                    std_tag: e
                                });
                                var t = dynamicWidgetsPageMgr.getPageDom();
                                return me.createUnifyDetailTwoContainer(t, unifyContainerIndex), t
                            } catch (a) {
                                "undefined" != typeof alog && alog("exception.fire", "catch", {
                                    msg: a.message || a.description,
                                    path: "poidetail:widget/unify/unifyMgr/unifyMgr.js",
                                    ln: 126
                                })
                            }
                        }, searchBox.endLoading(), cardMgr.add(poiDetailCard, {
                            isReturn: options.isReturn
                        }).then(function() {
                            var poiLeadDownloadEl = $(".poiLeadDownloadCard");
                            if (poiLeadDownloadEl.length) baidu.dom.insertAfter(poiLeadDownloadEl[0], poiDetailCard.$cardEl[0]), poiLeadDownloadEl[0].style.display = "block", $(".poiLeadDownloadCard .download-img").hide();
                            else {
                                var leadDownloadCard = '<div class="poiLeadDownloadCard"></div>',
                                    template = [function(_template_object) {
                                        var _template_fun_array = [],
                                            fn = function(__data__) {
                                                var _template_varName = "";
                                                for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                                                eval(_template_varName), _template_fun_array.push('<div class="download-banner">    <div class="close-btn-download-banner" title="关闭">×</div>       <img src="', "undefined" == typeof qrcodeUrl ? "" : baidu.template._encodeHTML(qrcodeUrl), '" alt="二维码" width="60" height="60" class="download-img"/>    <div class="qrcode-box"></div>    <div>        <p class="title">扫码下载百度地图</p>        <p class="sub-title">', "undefined" == typeof subTitle ? "" : baidu.template._encodeHTML(subTitle), "</p>    </div></div>"), _template_varName = null
                                            }(_template_object);
                                        return fn = null, _template_fun_array.join("")
                                    }][0],
                                    wrapEl = T(leadDownloadCard),
                                    urlImg = "//webmap1.bdimg.com/wolfman/static/poidetail/images/qrcode-download/poi-map-dowload-test_43a78a0.png",
                                    banner = template({
                                        qrcodeUrl: urlImg,
                                        subTitle: "世界很复杂,百度地图更懂你"
                                    });
                                wrapEl.append(banner), poiDetailCard.$cardEl && poiDetailCard.$cardEl[0] && (baidu.dom.insertAfter(wrapEl[0], poiDetailCard.$cardEl[0]), $(".poiLeadDownloadCard .download-img").hide())
                            }
                            var jumpLink = me.getJumpLink(uid);
                            DynamicBanner.renderQrCode(jumpLink, ".poiLeadDownloadCard .download-img", ".poiLeadDownloadCard .qrcode-box"), DynamicBanner.renderDynamicTitle({
                                bannerContainer: ".poiLeadDownloadCard",
                                name: "poiDetail"
                            }), $(".poiLeadDownloadCard") && $(".poiLeadDownloadCard")[0] && $(".poiLeadDownloadCard").on("click", ".close-btn-download-banner", function() {
                                $(".poiLeadDownloadCard").hide()
                            }), listener.on("ui.cardmgr", "removegroup", function(n, i) {
                                i = i || {}, "removegroup" === n && "poidetail" === i.group && $(".poiLeadDownloadCard") && $(".poiLeadDownloadCard").length && $(".poiLeadDownloadCard").remove()
                            }), searchBox.setState("sole", {
                                query: name,
                                cardId: poiDetailCard.cardId
                            }, {
                                keepResult: options.record
                            });
                            var callbackCard = poiDetailCard;
                            callbackCard.srcFrom = options.srcFrom, callbackCard.unifyContainerIndex = unifyContainerIndex, renderNextCbk && renderNextCbk(callbackCard), dynamicWidgetsPageMgr = null
                        }), cardMgr.addCardToGroup(poiDetailCard.cardId, "poidetail")
                    } catch (e) {
                        "undefined" != typeof alog && alog("exception.fire", "catch", {
                            msg: e.message || e.description,
                            path: "poidetail:widget/unify/unifyMgr/unifyMgr.js",
                            ln: 196
                        })
                    }
                }), dynamicWidgetsPageMgr.addEventListener("endLoading", function() {
                    searchBox.endLoading()
                }), dynamicWidgetsPageMgr.buildPage(poiDetailCard)
            } catch (e) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: e.message || e.description,
                    path: "poidetail:widget/unify/unifyMgr/unifyMgr.js",
                    ln: 203
                })
            }
        },
        getJumpLink: function(n) {
            var i = "baidumap://map/place/detail?show_type=detail_page&uid=" + n + "&src=mapdownload.pcmap.all.placedetail",
                e = "WEBAPP2015",
                o = "https://map.baidu.com/mapclient-pages/download/?from=pcmap&openapi=" + encodeURIComponent(i) + "&token=" + e;
            return o
        },
        createUnifyDetailTwoContainer: function(n, i) {
            var e = T('<div id="unifycontainer-two' + i + '" class="unifycontainer-two"><div class="unifycontainer-two-top"><div class="unifycontainer-two-title"></div><div class="unifycontainer-two-close">返回详情页</div></div><div class="unifycontainer-two-wrapper"><div class="unifycontainer-two-content"></div></div></div>');
            n.append(e)
        },
        renderUnifyComponent: function(n) {
            try {
                unifydetail.init(this.data, n)
            } catch (i) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: i.message || i.description,
                    path: "poidetail:widget/unify/unifyMgr/unifyMgr.js",
                    ln: 239
                })
            }
        }
    };
    module.exports = UnifyMgr
});;
define("poidetail:widget/unify/unifycontainer/unifycontainer.js", function(require, exports, module) {
    module.exports = Widget.extend({
        render: function(data) {
            try {
                var template = [function(_template_object) {
                        var _template_fun_array = [],
                            fn = function(__data__) {
                                var _template_varName = "";
                                for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                                eval(_template_varName), _template_fun_array.push('<div id="unifycontainer', "undefined" == typeof data.unifyContainerIndex ? "" : baidu.template._encodeHTML(data.unifyContainerIndex), '" class="unifycontainer">    <style type="text/css">        /* 内嵌到模板中，目的是将内联css与所引用div设置的近一些，尽可能避免被覆盖的情况*/        .card-box {            background-color: #fff;        }        .phoenix-block {            position: relative;            border-bottom: 10px solid #f2f4f5;            background-color: #fff;        }        @keyframes phoenix-loading {            0% {                -webkit-transform: rotate(0deg);                        transform: rotate(0deg);            }            100% {                -webkit-transform: rotate(360deg);                        transform: rotate(360deg);            }        }        @-webkit-keyframes phoenix-loading {            0% {                -webkit-transform: rotate(0deg);                        transform: rotate(0deg);            }            100% {                -webkit-transform: rotate(360deg);                        transform: rotate(360deg);            }        }        .phoenix-show {        }        @keyframes phoenix-show {            from {                opacity: .5;            }            to {                opacity: 1;                -webkit-transform: none;                        transform: none;            }        }        @-webkit-keyframes phoenix-show {            from {                opacity: .5;            }            to {                opacity: 1;                -webkit-transform: none;                        transform: none;            }        }        .phoenix-block .icon {            width: auto;            height: auto;        }        /*卡片内容显示所需样式*/        .c-container{padding:0 4%}.c-flexbox{display:-webkit-box;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-box-pack:justify;-webkit-box-align:center;-webkit-box-lines:single;display:-webkit-flex;-webkit-flex-direction:row;-webkit-justify-content:space-between;-webkit-align-items:stretch;-webkit-align-content:flex-start;-webkit-flex-wrap:nowrap}.c-flexitem0{-webkit-box-flex:0;-webkit-flex:0 0 auto}.c-flexitem1{-webkit-box-flex:1;-webkit-flex:1 1 auto}.c-name{font-size:21px}.c-title{font-size:16px}.c-main{font-size:14px}.c-auxiliary{font-size:13px}.c-abstract{font-size:12px}.c-annotation{font-size:11px}.c-tag{font-size:10px}.c-color{color:#333}.c-color-normal{color:#666}.c-color-auxi{color:#999}.c-color-gray{color:#ccc}.c-color-white{color:#fff}.c-color-red{color:#f76454}.c-color-blue{color:#3385ff}.c-line-clamp1{display:block;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;white-space:nowrap}.c-line-clamp2,.c-line-clamp3,.c-line-clamp4,.c-line-clamp5{display:-webkit-box;-webkit-box-orient:vertical;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis}.c-line-clamp2{-webkit-line-clamp:2}.c-line-clamp3{-webkit-line-clamp:3}.c-line-clamp4{-webkit-line-clamp:4}.c-line-clamp5{-webkit-line-clamp:5}.c-line-top{border-top:1px solid #eaeaea}.c-line-bottom{border-bottom:1px solid #eaeaea}.c-text-box{display:inline-block;height:18px;line-height:18px;font-size:12px;padding:0 7px;border:1px solid #ddd;border-radius:2px}.c-btn{display:inline-block;width:80px;height:20px;line-height:20px;text-align:center;font-size:11px;border-radius:12px}.c-btn-red{color:#f76454;border:1px solid #f76454}.c-btn-red:active{color:#f76454}.c-btn-blue{color:#3385ff;border:1px solid #3385ff}.c-btn-blue:active{color:#3385ff}.c-btn-disable{color:#ccc;border:1px solid #ccc}.c-btn-disable:active{color:#ccc}.c-btn-red-reverse{color:#fff;background:#f76454;border:1px solid #f76454}.c-btn-blue-reverse{color:#fff;background:#3385ff;border:1px solid #3385ff}.c-btn-disable-reverse{color:#fff;background:#ccc;border:1px solid #ccc}.c-btn-red-reverse:active,.c-btn-blue-reverse:active,.c-btn-disable-reverse:active{color:#fff}.c-icon-arrowup{display:inline-block;width:10px;height:5px;background:url("data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAMAAACDi47UAAAAQlBMVEUAAAAzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzN+8gE8AAAAFXRSTlMA+QXw48m9Qi0ctVrGpJaHeGkPqE+O1l03AAAAWklEQVQI112OSQ6AMAwDk0D3veD/fxUJVLXUJ2sO9tCIU8rRFnsCp/0zc0BrHGZlgXGJePA9WWNkIZIMboMVoH6tAuUtksBh2UlC1Mf+fOwUh8l0i+R3Z6f8A1JqA21qMIMoAAAAAElFTkSuQmCC") no-repeat;background-size:cover}.c-icon-arrowdown{display:inline-block;width:10px;height:5px;background:url("data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAMAAACDi47UAAAAP1BMVEUAAAAzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzM12c1RAAAAFHRSTlMA+cgG8OO9Qi0ctVqklod4aQ+oTw23QxsAAABcSURBVAjXXY9ZDsAgCEQH6Wpd27n/WZtojAtf5BHgDay5MdVtLAz3a2TXToN8cDs7OzceGVBHeRp7hE5LF8hYWSRDmyehV0A9JQHD1qtqKR8w368fF5Pitjr3FD9i6gM7hLikxgAAAABJRU5ErkJggg==") no-repeat;background-size:cover}.c-icon-arrowright{display:inline-block;width:5px;height:10px;background:url("data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAUCAMAAACDMFxkAAAAP1BMVEUAAAAzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzM12c1RAAAAFHRSTlMA+cgG8OO9Qi0cpVq3lod4aQ+xT0MtXSMAAABQSURBVAjXZc83EgAhDANAsMlcPv3/rTTWuIBqh3GQwyFvsCcoauwZg98t4aJrxENPxEnfiJU+kZpRB3KnC2SjfixgG4dxxe+LPY6H3KP7QQtijgM7WADnqQAAAABJRU5ErkJggg==") no-repeat;background-size:cover}    </style></div>'), _template_varName = null
                            }(_template_object);
                        return fn = null, _template_fun_array.join("")
                    }][0],
                    html = template(data);
                return html
            } catch (e) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: e.message || e.description,
                    path: "poidetail:widget/unify/unifycontainer/unifycontainer.js",
                    ln: 11
                })
            }
        },
        renderComplete: function() {
            try {} catch (e) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: e.message || e.description,
                    path: "poidetail:widget/unify/unifycontainer/unifycontainer.js",
                    ln: 21
                })
            }
        },
        name: "unifyContainer"
    })
});;
define("poidetail:widget/unify/unifylibs/storage.js", function(s, t, i) {
    var n = "phoenix_list_",
        e = 5,
        l = {
            lists: [],
            init: function() {
                localStorage || (window.localStorage = {});
                var s = localStorage[n + "lists"];
                return s && (this.lists = JSON.parse(s)), this
            },
            set: function(s, t) {
                var i, l = this.findList(s);
                return void 0 !== l ? (i = this.lists[l].storageId, this.pushListToEnd(l)) : this.lists.length >= e ? (i = this.lists.shift().storageId, this.lists.push({
                    id: s,
                    storageId: i
                })) : (i = n + this.lists.length, this.lists.push({
                    id: s,
                    storageId: n + this.lists.length
                })), localStorage[i] = JSON.stringify(t), this.saveLists(), this
            },
            get: function(s) {
                var t, i = this.findList(s);
                if (void 0 !== i) {
                    var n = this.lists[i],
                        e = n.storageId;
                    t = JSON.parse(localStorage[e]), this.pushListToEnd(i), this.saveLists()
                }
                return t
            },
            saveLists: function() {
                return localStorage[n + "lists"] = JSON.stringify(this.lists), this
            },
            findList: function(s) {
                for (var t, i = 0, n = this.lists.length; n > i; i++)
                    if (this.lists[i].id === s) {
                        t = i;
                        break
                    }
                return t
            },
            pushListToEnd: function(s) {
                return this.lists.push(this.lists.splice(s, 1)[0]), this
            }
        };
    i.exports = l.init()
});