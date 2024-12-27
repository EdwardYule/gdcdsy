define("poidetail:widget/libs/poiDetailCard/poiDetailCard.js", function(i, e, t) {
    function o(i) {
        i = i || {}, i.padding = 0, i.monopolize = !0, i.overflow = "hidden", a.call(this, i), this.uid = i.uid, this.name = i.name, this.geo = i.geo, this.cardLevel = 2, this.canNotFold = !0, this.returnTitle = "返回“" + this.name + "”的详情", this.recordUrl = "poi:" + this.uid, i.withMarker && (this.pBindMarkerAndBubble(i.marker), this.withMarker = i.marker)
    }
    var a = i("common:widget/ui/card/Card.js"),
        n = i("common:widget/ui/card/cardMgr.js"),
        r = i("common:widget/ui/searchBox/searchBox.js"),
        s = i("common:widget/ui/util/util.js"),
        d = i("common:widget/ui/mapUtil/mapUtil.js"),
        h = i("common:widget/ui/constant/Constant.js"),
        c = {
            common: {
                image: h.A_J_MARKER_IMG_NEW,
                size: new BMap.Size(25, 40),
                offset: h.A_J_MARKER_RED_OFFSET,
                imageOffset: new BMap.Size(0, 193),
                infoWindowOffset: h.A_J_MARKER_INFOWND_OFFSET,
                imageSize: new BMap.Size(h.A_J_MARKER_IMG_NEW_WIDTH, h.A_J_MARKER_IMG_NEW_HEIGHT),
                srcSet: h.A_J_MARKER_IMG_NEW2X_SRCSET
            },
            highlight: {
                image: h.A_J_MARKER_IMG_NEW,
                size: new BMap.Size(25, 40),
                offset: h.A_J_MARKER_BLUE_OFFSET,
                imageOffset: new BMap.Size(0, 233),
                infoWindowOffset: h.A_J_MARKER_INFOWND_OFFSET,
                imageSize: new BMap.Size(h.A_J_MARKER_IMG_NEW_WIDTH, h.A_J_MARKER_IMG_NEW_HEIGHT),
                srcSet: h.A_J_MARKER_IMG_NEW2X_SRCSET
            },
            clicked: {
                image: h.A_J_MARKER_IMG_NEW,
                size: new BMap.Size(25, 40),
                offset: h.A_J_MARKER_BLUE_OFFSET,
                imageOffset: new BMap.Size(0, 233),
                infoWindowOffset: h.A_J_MARKER_INFOWND_OFFSET,
                imageSize: new BMap.Size(h.A_J_MARKER_IMG_NEW_WIDTH, h.A_J_MARKER_IMG_NEW_HEIGHT),
                srcSet: h.A_J_MARKER_IMG_NEW2X_SRCSET
            }
        };
    T.inherits(o, a, "PoiDetailCard"), T.extend(o.prototype, {
        render: function() {
            try {} catch (i) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: i.message || i.description,
                    path: "poidetail:widget/libs/poiDetailCard/poiDetailCard.js",
                    ln: 76
                })
            }
        },
        onResize: function(i) {
            var e = (this.$cardEl, this.titleNeedWrap);
            $(".generalHead-titlename ") && $(".generalHead-titlename ").last() && $(".generalHead-titlename ").last().height() > 30 && (e = this.titleNeedWrap = !0);
            var t = $(".poidetail-container").find(".customerHead"),
                o = $(".poidetail-container").find(".customerOther");
            if (o.length) {
                {
                    o.height()
                }
                o.css("height", "auto"), o.css("overflow-y", "auto"), o.css("max-height", i - t.height() - 80)
            }
        },
        initialize: function() {
            try {
                window.iFrameResize({
                    log: !1
                }, ".hotelBookFrame"), window.iFrameResize({
                    log: !1
                }, ".houseIframeInfo"), T.browser.safari && T("#vertifyinfo") && T("#vertifyinfo").css("top", "-24px")
            } catch (i) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: i.message || i.description,
                    path: "poidetail:widget/libs/poiDetailCard/poiDetailCard.js",
                    ln: 203
                })
            }
        },
        setInfoWindow: function(i) {
            this.infoWindow = i
        },
        onFold: function() {
            n.removeCardFromGroup(this.cardId, "sole"), n.removeCardFromGroup(this.cardId, "result"), n.removeCardFromGroup(this.cardId, "poidetail"), this.withMarker && !this.lockMarkerHighlight && this.withMarker.unhighlight && this.withMarker.unhighlight()
        },
        onUnfold: function() {
            n.addCardToGroup(this.cardId, "poidetail"), n.addCardToGroup(this.cardId, "sole"), n.addCardToGroup(this.cardId, "result"), r.setState("sole", {
                query: this.name,
                cardId: this.cardId
            }), this.childMarkers && this.childMarkers.forEach(function(i) {
                i.unhighlightMarker && i.unhighlightMarker()
            }), this.withMarker && this.withMarker.highlight && this.withMarker.highlight()
        },
        pBindMarkerAndBubble: function(i) {
            var e = s.getPointByStr(s.parseGeo(this.geo).points),
                t = this;
            if (e) {
                var o = !1;
                i || (this.marker = new BMap.Marker(e, {
                    icon: this.pCreateIcon(c.common),
                    zIndexFixed: !0,
                    startAnimation: "marker-raise marker-0"
                }), map.addOverlay(this.marker), d.setViewport([e], 10), o = !0), this.name && "string" == typeof this.name && s.loadSearchSimpleInfo(function(i) {
                    var a = i.createCommonInfoWindow({
                        name: t.name
                    }, {
                        x: e.lng,
                        y: e.lat,
                        uid: t.uid,
                        isFromMPC: !1
                    });
                    a && (t.infoWindow = a, o && t.pBindEvents())
                })
            }
        },
        pCreateIcon: function(i) {
            return new BMap.Icon(i.image, i.size, {
                anchor: i.offset,
                imageOffset: i.imageOffset,
                infoWindowOffset: i.infoWindowOffset,
                imageSize: i.imageSize,
                srcSet: i.srcSet
            })
        },
        pBindEvents: function() {
            var i = this;
            this.marker.addEventListener("click", function() {
                this.setIcon(i.pCreateIcon(c.clicked)), this.openSimpleInfoWindow(i.infoWindow), this.clicked = !0
            }), this.marker.addEventListener("mouseover", function() {
                this.clicked !== !0 && this.setIcon(i.pCreateIcon(c.highlight))
            }), this.marker.addEventListener("mouseout", function() {
                this.clicked !== !0 && this.setIcon(i.pCreateIcon(c.common))
            }), this.infoWindow.addEventListener("close", function() {
                i.marker.clicked = !1, i.marker.setIcon(i.pCreateIcon(c.common))
            })
        },
        unload: function() {
            window.temp && window.temp.detailInfoPop && window.temp.detailInfoPop.close(), this.infoWindow && (this.infoWindow.close(), this.infoWindow = null), this.marker && (map.removeOverlay(this.marker), this.marker = null), this.childMarkers && (this.childMarkers.forEach(function(i) {
                map.removeOverlay(i)
            }), this.childMarkers = null), this.jssdkBaseData && (this.jssdkBaseData = null), this.dispatchEvent("unload")
        }
    }), t.exports = o
});;
define("poidetail:widget/libs/poiDetailMgr/poiDetailMgr.js", function(require, exports, module) {
    var style = ".poidetail-container{position:relative;font-size:12px}.poidetail-container .mt10{margin-top:10px}.poidetail-container .top-border-override{border-top:1px solid #fff;position:relative}.poidetail-container .text-overflow{text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.poidetail-container .title{height:40px;line-height:45px;position:relative}.poidetail-container .title .icon{width:21px;height:21px;display:inline-block;border-radius:50%;color:#FFF;background-color:#6cc8ef;position:absolute;left:0;top:11px;line-height:22px;text-align:center}.poidetail-container .title .caption{margin-left:25px;color:#333}.poidetail-container .title .more{position:absolute;display:block;right:0;top:15px;line-height:normal;color:#999;text-decoration:none}.poidetail-container .accept-default-image{border:0;background:url(//webmap0.bdimg.com/wolfman/static/poidetail/images/default-image_b0276c9.png);background:-webkit-image-set(url(//webmap0.bdimg.com/wolfman/static/poidetail/images/default-image_b0276c9.png) 1x,url(//webmap0.bdimg.com/wolfman/static/poidetail/images/default-image-2x_249ed48.png) 2x);background:-moz-image-set(url(//webmap0.bdimg.com/wolfman/static/poidetail/images/default-image_b0276c9.png) 1x,url(//webmap0.bdimg.com/wolfman/static/poidetail/images/default-image-2x_249ed48.png) 2x);background:-o-image-set(url(//webmap0.bdimg.com/wolfman/static/poidetail/images/default-image_b0276c9.png) 1x,url(//webmap0.bdimg.com/wolfman/static/poidetail/images/default-image-2x_249ed48.png) 2x);background:-ms-image-set(url(//webmap0.bdimg.com/wolfman/static/poidetail/images/default-image_b0276c9.png) 1x,url(//webmap0.bdimg.com/wolfman/static/poidetail/images/default-image-2x_249ed48.png) 2x);background-size:cover}.poidetail-container .customerOther>div:last-child>div.bottom-split{border-bottom:0}";
    require.loadCss({
        content: style,
        name: "poiDetailMgr"
    });
    var bannerStyle = ".poiLeadDownloadCard .download-banner .download-img{float:left;margin:10px 19px 10px 16px}.poiLeadDownloadCard .download-banner .title{padding-top:16px;margin-bottom:4px;line-height:28px;height:28px;font-size:20px;color:#000}.poiLeadDownloadCard .download-banner .sub-title{line-height:16px;height:16px;font-size:16px;color:#666}.poiLeadDownloadCard .download-banner{pointer-events:auto;position:relative}.poiLeadDownloadCard .close-btn-download-banner{position:absolute;width:20px;height:20px;line-height:20px;font-size:28px;text-align:center;display:block;cursor:pointer;right:6px;top:8px;color:#ccc}.poiLeadDownloadCard .qrcode-box{float:left;margin:10px 19px 10px 16px;width:60px;height:60px}";
    require.loadCss({
        content: bannerStyle,
        name: "poiDownloadBanner"
    });
    var DynamicWidgetsPageMgr = require("common:widget/com/dynamicWidgetsPageMgr.js"),
        cardMgr = require("common:widget/ui/card/cardMgr.js"),
        PoiDetailCard = require("poidetail:widget/libs/poiDetailCard/poiDetailCard.js"),
        searchBox = require("common:widget/ui/searchBox/searchBox.js"),
        toast = require("common:widget/ui/toast/toast.js"),
        unifyMgr = require("poidetail:widget/unify/unifyMgr/unifyMgr.js"),
        jigsawVerify = require("common:widget/ui/JigsawVerification/JigsawVerification.js"),
        DynamicBanner = require("common:widget/com/DynamicBanner/DynamicBanner.js"),
        util = require("common:widget/ui/util/util.js"),
        deviceRatio = window.devicePixelRatio > 1 ? 2 : 1,
        linkDOM = document.createElement("a"),
        poiDetailMgr = {
            create: function(e, a) {
                listener.trigger("poiDeatailMagr.create"), window.testbegin = new Date, this.opts = e || {}, a = a || {};
                var t = 1,
                    i = this,
                    o = util.getParam(location.href),
                    n = T.extend(e, {
                        ugc_type: "3",
                        ugc_ver: "1",
                        qt: "detailConInfo",
                        device_ratio: deviceRatio,
                        compat: t,
                        t: (new Date).getTime()
                    });
                return o && o.invoketofun && ["nav", "photo", "comment"].indexOf(o.invoketofun) > -1 && (n.invoketofun = o.invoketofun), searchBox.loading(), new Promise(function(e, t) {
                    function o(o, n) {
                        var d = {
                            resolve: e,
                            reject: t
                        };
                        if (o && o.result) {
                            var l = o.result;
                            if (window.AUTH = l.auth, 99 === l.type) return void jigsawVerify.open("", l.image, l.jigsawImage, function() {
                                r.data.auth = window.AUTH, T.ajax("/", r)
                            }, function() {
                                i.error("验证失败", t)
                            })
                        }
                        o.content && o.content.ext && o.content.ext.src_name && "house" === o.content.ext.src_name ? i.processData(o, a, d) : o && 1 === o.isUnify ? unifyMgr.init(o, a, d) : i.processData(o, a, d), require.async(["common:widget/ui/urlManager/urlManager.js"], function(e) {
                            linkDOM.href = n.responseURL;
                            var t = "";
                            o && o.content && (t = o.content.name);
                            var i = linkDOM.search;
                            a.noPushState || e.setFeature("poi", t, i, a.replaceState), e.setTitle(t)
                        })
                    }
                    var r;
                    r = {
                        method: "GET",
                        data: n,
                        timeout: 3e3,
                        dataType: "json",
                        success: o,
                        error: function() {
                            i.error(null, t)
                        }
                    }, T.ajax("/", r)
                })
            },
            error: function(e, a) {
                e = e || "当前信息加载失败，请稍后再试", toast.show(e, "warning"), searchBox.endLoading(), a(e)
            },
            processData: function(e, a, t) {
                if (!e || !e.content) return void this.error("", t.reject);
                this.opts && this.opts.isBizPoi && (e.isBizPoi = !0);
                var i = e.content.indoor_pano || "";
                if (e.content.indoor_pano_id = "", "" !== i) {
                    var o = /&sid=([0-9a-z]+?)&/i.exec(i);
                    o && (e.content.indoor_pano_id = o[1])
                }
                e._extra_ = {
                    enableComment: !0
                }, e.content.ext = e.content.ext || {}, e.content.ext.detail_info = e.content.ext.detail_info || {}, e.content.ext.detail_info.groupon = e.content.ext.detail_info.groupon || [], e.content.ext.rich_info = e.content.ext.rich_info || {}, e.content.ext.other_info = e.content.ext.other_info || {}, e.content.ext.src_name = e.content.ext.src_name || "", e.interSource = e.interSource || "", e.hasDetailPage = "ninf" === e.interSource ? !0 : !1;
                for (var n = e.content.ext.detail_info.std_tag || e.content.ext.detail_info.tag || e.content.ext.src_name || "", r = ["医疗", "公交", "车站", "地铁站", "dt_stop", "房地产", "政府机构", "洗浴按摩"], d = r.length - 1; d >= 0; d--) {
                    var l = new RegExp(r[d], "i");
                    if (l.test(n)) {
                        e._extra_.enableComment = !1;
                        break
                    }
                }
                e.content.poiType && 1 === e.content.poiType && (e._extra_.enableComment = !1), this.distribute(e, a, t)
            },
            distribute: function(e, a, t) {
                var i = {};
                e.content && e.content.ext && (i = e.content.ext);
                var o, n = i.src_name || this.opts.industry || "";
                switch (n) {
                    case "scope":
                        o = require("poidetail:widget/industry/scopeIndustryMgr.js");
                        break;
                    case "hotel":
                        o = require("poidetail:widget/industry/hotelIndustryMgr.js");
                        break;
                    case "cater":
                        o = require("poidetail:widget/industry/caterIndustryMgr.js");
                        break;
                    case "house":
                        o = require("poidetail:widget/industry/houseIndustryMgr.js");
                        break;
                    default:
                        o = require(i.movie_forsearch && "movie" === i.movie_forsearch.business_scope_type ? "poidetail:widget/industry/movieIndustryMgr.js" : "poidetail:widget/industry/lifeIndustryMgr.js")
                }
                this.buildPoiDetailPage(o, e, a, t)
            },
            buildPoiDetailPage: function(industryMgr, pageData, options, promiseHandler) {
                var me = this;
                industryMgr.init(pageData, function(pageOpts) {
                    var uid = pageData && pageData.content && pageData.content.uid,
                        name = pageData && pageData.content && pageData.content.name,
                        geo = pageData && pageData.content && pageData.content.geo;
                    options = options || {}, options = T.extend({
                        record: !0
                    }, options), options = T.extend(options, {
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
                    }), pageOpts.pageData = pageOpts.pageData || pageData, pageOpts.containerClass = "poidetail-container";
                    var widgetsArrange = [];
                    widgetsArrange.push({
                        js: "poidetail:widget/ui/generalHead/generalHead.js",
                        data: pageData.content,
                        wrapClass: "customerHead"
                    }), widgetsArrange.push({
                        children: pageOpts.widgets,
                        wrapClass: "customerOther"
                    }), pageOpts.widgets = widgetsArrange;
                    var dynamicWidgetsPageMgr = new DynamicWidgetsPageMgr(pageOpts);
                    dynamicWidgetsPageMgr.addEventListener("renderComplete", function() {
                        try {
                            poiDetailCard.render = function() {
                                try {
                                    if (addStat("poidetail.card.render", "show"), pageOpts && pageOpts.pageData) {
                                        var e = pageOpts.pageData;
                                        e.industry && addStat("poidetail." + e.industry + ".render", "show")
                                    }
                                    return dynamicWidgetsPageMgr.getPageDom()
                                } catch (a) {
                                    "undefined" != typeof alog && alog("exception.fire", "catch", {
                                        msg: a.message || a.description,
                                        path: "poidetail:widget/libs/poiDetailMgr/poiDetailMgr.js",
                                        ln: 355
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
                                }), listener.on("ui.cardmgr", "removegroup", function(e, a) {
                                    a = a || {}, "removegroup" === e && "poidetail" === a.group && $(".poiLeadDownloadCard") && $(".poiLeadDownloadCard").length && $(".poiLeadDownloadCard").remove()
                                }), searchBox.setState("sole", {
                                    query: name,
                                    cardId: poiDetailCard.cardId
                                }, {
                                    keepResult: options.record
                                });
                                var jumpFr = util.getParam(location.href);
                                if (jumpFr && jumpFr.invoketofun && "nav" === jumpFr.invoketofun) {
                                    var dom = $("#generalheader > .generalHead-right-header > #route-go");
                                    dom.length && dom.click()
                                }
                            }), cardMgr.addCardToGroup(poiDetailCard.cardId, "poidetail")
                        } catch (e) {
                            "undefined" != typeof alog && alog("exception.fire", "catch", {
                                msg: e.message || e.description,
                                path: "poidetail:widget/libs/poiDetailMgr/poiDetailMgr.js",
                                ln: 417
                            })
                        }
                    }), dynamicWidgetsPageMgr.addEventListener("endLoading", function() {
                        searchBox.endLoading()
                    }), dynamicWidgetsPageMgr.buildPage(poiDetailCard)
                })
            },
            getJumpLink: function(e) {
                var a = "baidumap://map/place/detail?show_type=detail_page&uid=" + e + "&src=mapdownload.pcmap.all.placedetail",
                    t = "WEBAPP2015",
                    i = "https://map.baidu.com/mapclient-pages/download/?from=pcmap&openapi=" + encodeURIComponent(a) + "&token=" + t;
                return i
            }
        };
    module.exports = poiDetailMgr
});;
define("poidetail:widget/libs/poiDetailUtil/poiDetailUtil.js", function(e, r, t) {
    var n = {
        isIE: function(e) {
            var r = document.createElement("b");
            return r.innerHTML = "<!--[if IE " + e + "]><i></i><![endif]-->", 1 === r.getElementsByTagName("i").length
        },
        len: function(e) {
            for (var r = 0, t = e.length, n = -1, i = 0; t > i; i++) {
                var n = e.charCodeAt(i);
                r += n >= 0 && 128 >= n ? 1 : 2
            }
            return r
        },
        sub: function(e, r) {
            var t = /[^\x00-\xff]/g;
            if (e.replace(t, "mm").length <= r) return e;
            for (var n = Math.floor(r / 2), i = n; i < e.length; i++)
                if (e.substr(0, i).replace(t, "mm").length >= r) return e.substr(0, i) + "...";
            return e
        },
        isEmptyobj: function(e) {
            if (e) {
                for (var r in e) return !1;
                return !0
            }
            return !0
        }
    };
    t.exports = n
});