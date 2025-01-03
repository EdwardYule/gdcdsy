define("common:widget/ui/place/placeConfig.js", function(e, i, n) {
    var r = {
        src_name: "通用",
        price: "人均",
        priceUnit: "元"
    };
    n.exports = {
        basicInfoCN: {
            cater: {
                src_name: "餐饮",
                service_rating: "服务",
                hygiene_rating: "卫生",
                facility_rating: "设施",
                taste_rating: "口味",
                environment_rating: "环境",
                price: "人均",
                priceUnit: "元"
            },
            hotel: {
                src_name: "酒店",
                service_rating: "服务",
                hygiene_rating: "卫生",
                facility_rating: "设施",
                price: "参考价",
                priceUnit: "元"
            },
            house: {
                src_name: "房产",
                price: "均价",
                priceUnit: "元/平方米"
            },
            hospital: {
                src_name: "医疗",
                tag: "标签",
                technology_rating: "技术",
                service_rating: "服务"
            },
            life: {
                src_name: "休闲娱乐",
                price: "人均",
                priceUnit: "元"
            },
            beauty: {
                src_name: "休闲娱乐",
                price: "人均",
                priceUnit: "元"
            },
            education: r,
            enterprise: r,
            scope: r,
            shopping: r
        },
        replace: {
            elong: {
                find: /\?f=301030\&/gi,
                replace: "?f=1994&"
            }
        }
    }
});;
define("common:widget/ui/place/place.js", function(require, exports, module) {
    var constant = require("common:widget/ui/constant/Constant.js"),
        util = require("common:widget/ui/util/util.js"),
        config = require("common:widget/ui/config/config.js"),
        MapConfig = config.mapConfig,
        modelConfig = config.modelConfig,
        placeConfig = require("common:widget/ui/place/placeConfig.js"),
        placeDetail = require("common:widget/ui/place/placeDetail.js"),
        filterArea = function() {
            var e = {
                title: "位置",
                allName: "全部城区",
                level: 0,
                menu: ["位置"],
                bLast: !1
            };
            return function(a, t) {
                return 2 == arguments.length && e[a] >= 0 && (e[a] = t), e[a]
            }
        }(),
        place = {
            hotel: null,
            scope: null,
            cinema: null,
            urlParams: "",
            URL_PARAM_PREFIX: "pl_",
            urlParam: {},
            result: !1,
            barState: {
                tag: {
                    display: !0
                },
                price: {
                    display: !0
                },
                first: !0
            },
            statVar: {
                hotel: "",
                cater: "C_"
            },
            area: filterArea,
            placeRe: /^(hotel|cater|hospital|house|life|education|enterprise|scope|shopping|beauty)$/,
            placeConfig: placeConfig,
            showDetail: placeDetail.showDetail,
            isDefaultFilterSection: function(e) {
                return /^0,\+$/.test(e)
            },
            generateAsyncBookPrice: function(e) {
                var a, t, o, i, n, r = this,
                    c = e.ext,
                    s = e.uid,
                    l = "hotel" == c.src_name && parseInt(c.detail_info.pc_bookable),
                    p = "scope" == c.src_name && 1 === parseInt(c.detail_info.ticket_book_flag),
                    _ = '<p class="async-book-loading"></p>',
                    d = "/detail";
                return p ? r.generateScopeBookPrice(e) : l ? (t = '<div class="async-book-container" data-uid="#{0}" >' + _ + "</div>", t = T.string.format(t, [s]), o = new Date, i = new Date(o.getFullYear(), o.getMonth(), o.getDate() + 2), n = new Date(o.getFullYear(), o.getMonth(), o.getDate() + 3), a = {
                    qt: "ota",
                    uid: s,
                    st: T.date.format(i, "yyyy-MM-dd"),
                    et: T.date.format(n, "yyyy-MM-dd")
                }, setTimeout(function() {
                    var t;
                    return c.otaData ? (t = T.json.parse(c.otaData), place.otaDataDecode(t.room_info || []), void r.renderAsyncBookPrice(e, t)) : void T.ajax(d + "?" + baidu.url.jsonToQuery(a), {
                        data: a,
                        dataType: "json",
                        cache: !0,
                        duration: 1e4,
                        success: function(a, t) {
                            var o = this;
                            a = a || {};
                            try {
                                c.otaData = t.responseText, place.otaDataDecode(a.room_info || []), r.renderAsyncBookPrice(e, a)
                            } catch (i) {
                                o.onfailure()
                            }
                        },
                        error: function() {
                            r.renderAsyncBookPrice(e, {})
                        },
                        timeout: function() {
                            r.renderAsyncBookPrice(e, {})
                        }
                    })
                }, 100), t) : ""
            },
            generateScopeBookPrice: function(e) {
                function a(e) {
                    var a = T.dom(".async-book-container"),
                        t = e.ext;
                    try {
                        a.find(".hotel-order-new").click(function() {
                            var a, o = T.dom(this).attr("ticket-id");
                            o && (a = {
                                ticketId: o
                            }), place.showDetail(e.uid, e.poiType, e.cityCode, t.src_name, t.src_name, "iw", baidu.url.jsonToQuery(a))
                        }), a.find(".async-book-link").click(function() {
                            place.showDetail(e.uid, e.poiType, e.cityCode, t.src_name, t.src_name, "")
                        })
                    } catch (o) {}
                } {
                    var t, o = e.ext.detail_info.brief_ticket;
                    T.dom(".async-book-container"), e.ext
                }
                return t = this.createScopeBookHTML(e, o), setTimeout(function() {
                    a(e)
                }, 350), t
            },
            generateCaterBookPrice: function(e) {
                var a, t = e.ext.detail_info.ori_info,
                    o = (T.dom(".async-book-container"), e.ext);
                return a = "", a = T.string.format(a, [e.uid]), a += place.createCaterBookPrice({
                    renderData: t,
                    cfg: e,
                    ext: o
                })
            },
            generateAsyncBookByMovie: function(e) {
                var a = this,
                    t = e.uid,
                    o = {
                        qt: "timetable",
                        uid: t,
                        from: "pc",
                        sflag: "bubble"
                    },
                    i = '<p class="async-book-loading"></p>';
                return this.urlParam.pl_business_id ? (o.limit = 20, html = '<div class="async-book-container booking-movie booking-movie-single" style="margin-top: 3px" data-uid="#{0}" >' + i + "</div>") : html = '<div class="async-book-container booking-movie" style="margin-top: 3px" data-uid="#{0}" >' + i + "</div>", html = T.string.format(html, [t]), T.ajax("/detail?" + baidu.url.jsonToQuery(o), {
                    data: o,
                    dataType: "json",
                    success: function(t) {
                        var o = this;
                        t = t || {};
                        try {
                            a.urlParam.pl_business_id && (t = T.array.filter(t, function(e) {
                                return e.movie_id == a.urlParam.pl_business_id
                            })), a.renderAsyncBookByMovie(e, t)
                        } catch (i) {
                            o.error()
                        }
                    },
                    error: function() {
                        a.renderAsyncBookByMovie(e)
                    },
                    timeout: function() {
                        a.renderAsyncBookByMovie(e)
                    }
                }), html
            },
            renderAsyncBookPrice: function(e, a) {
                try {
                    var t, o, i, n, r = this,
                        c = e.uid,
                        s = e.ext,
                        l = [],
                        p = T.array;
                    if (t = T.dom(".async-book-container"), 0 == t.length && this.iw) return void this.iw.addEventListener("open", function() {
                        r.renderAsyncBookPrice(e, a)
                    });
                    o = a.room_info || [], n = function(e) {
                        try {
                            var a = {};
                            return a.roomTypeName = e.basic_info.room_type_name, a.roomId = e.basic_info.room_id, p.each(e.ota_list, function(e) {
                                p.each(e.price_info, function(e) {
                                    var e = parseInt(e.room_price.price) - parseInt(e.minus && e.minus.price || 0) - parseInt(e.coupons && e.coupons.price || 0) + parseInt(e.tax_info && e.tax_info.price || 0);
                                    a.price = a.price ? a.price > e ? e : a.price : e
                                })
                            }), a
                        } catch (t) {
                            "undefined" != typeof alog && alog("exception.fire", "catch", {
                                msg: t.message || t.description,
                                path: "common:widget/ui/place/place.js",
                                ln: 333
                            })
                        }
                    }, p.each(o, function(e) {
                        var a;
                        return 2 == l.length ? !1 : void((1 == e.basic_info.book_state || 2 == e.basic_info.book_state) && (a = n(e), a.roomTypeName && a.price && l.push(a)))
                    }), l.length < 2 && p.each(o, function(e) {
                        var a;
                        return 2 == l.length ? !1 : void(1 != e.basic_info.book_state && 2 != e.basic_info.book_state && (a = n(e), a.roomTypeName && a.price && l.push(a)))
                    }), 0 == l.length && l.push({
                        roomTypeName: "标准间",
                        priceInfo: "暂无报价"
                    }), i = this.createAsyncHTML(l), t.html(i), 1 == l.length && this.iw.setHeight(T(".BMap_bubble_center").height() - 35), t.find(".async-book-link").click(function() {
                        place.showDetail(c, e.poiType, e.cityCode, s.src_name, "Page", "Iw")
                    }), t.find(".hotel-order-new").click(function() {
                        var a, t = T.dom(this).data("room-id");
                        t && (a = {
                            roomId: t
                        }), place.showDetail(c, e.poiType, e.cityCode, s.src_name, s.src_name, "", baidu.url.jsonToQuery(a))
                    })
                } catch (_) {
                    "undefined" != typeof alog && alog("exception.fire", "catch", {
                        msg: _.message || _.description,
                        path: "common:widget/ui/place/place.js",
                        ln: 414
                    })
                }
            },
            renderAsyncBookByMovie: function(e, a) {
                try {
                    var t = this,
                        o = a,
                        i = e.uid,
                        n = e.category,
                        r = e.poiType,
                        c = e.cityCode,
                        s = T.dom(".async-book-loading");
                    window.setTimeout(function() {
                        html = o && o.length ? t.createAsyncMovieHTML(o, i, r, c, n) : '<ul><li class="async-book-ota clearfix" style="text-align:center">暂无相关数据</li></ul><a class="async-book-link" href="javascript:void(0);" onclick="place.showDetail(\'' + i + "', '" + r + "', '" + c + "', '" + n + "', 'movie_more', 'Iw');\">更多电影>></a>", s.length && ((!o || !o.length) && s.parent().removeClass("booking-movie"), s[0].insertAdjacentHTML("beforeBegin", html), s.remove(), t.iw && t.iw.redraw())
                    }, 500)
                } catch (l) {
                    "undefined" != typeof alog && alog("exception.fire", "catch", {
                        msg: l.message || l.description,
                        path: "common:widget/ui/place/place.js",
                        ln: 445
                    })
                }
            },
            resetArea: function() {
                place.hotel && (place.hotel.cacheCurrentIdxs = place.hotel.defaultSelected)
            },
            createScopeBookHTML: function(cfg, renderDatas) {
                try {
                    if (!renderDatas) return "";
                    var template = [function(_template_object) {
                        var _template_fun_array = [],
                            fn = function(__data__) {
                                var _template_varName = "";
                                for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                                eval(_template_varName), _template_fun_array.push('<div class="async-book-container" data-uid="', "undefined" == typeof uid ? "" : uid, '" >    <ul>         ');
                                for (var i = 0, ll = renderDatas.length; ll > i; i++) _template_fun_array.push('            <li class="async-book-ota clearfix"><span class="span1">', "undefined" == typeof renderDatas[i].name ? "" : renderDatas[i].name, "</span>"), renderDatas[i].min_price && _template_fun_array.push('<span class="span2 blue">¥', "undefined" == typeof renderDatas[i].min_price ? "" : renderDatas[i].min_price, "起</span>"), _template_fun_array.push('<span class="span3"><a href="javascript:void(0);" ticket-id="', "undefined" == typeof renderDatas[i].ticket_id ? "" : renderDatas[i].ticket_id, '" class="hotel-order-new hotel-order-new-small">预订</a></span>            </li>        ');
                                _template_fun_array.push('    </ul>    <a class="async-book-link" href="javascript:void(0);">更多门票和价格>></a></div>'), _template_varName = null
                            }(_template_object);
                        return fn = null, _template_fun_array.join("")
                    }][0];
                    return template({
                        uid: cfg.uid,
                        renderDatas: renderDatas
                    })
                } catch (e) {
                    "undefined" != typeof alog && alog("exception.fire", "catch", {
                        msg: e.message || e.description,
                        path: "common:widget/ui/place/place.js",
                        ln: 466
                    })
                }
            },
            createAsyncHTML: function(renderDatas) {
                try {
                    var template = [function(_template_object) {
                        var _template_fun_array = [],
                            fn = function(__data__) {
                                var _template_varName = "";
                                for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                                eval(_template_varName), _template_fun_array.push("<ul>");
                                for (var i = 0, ll = renderDatas.length; ll > i; i++) _template_fun_array.push('    <li class="async-book-ota clearfix">        <span class="span1">', "undefined" == typeof renderDatas[i].roomTypeName ? "" : renderDatas[i].roomTypeName, "</span>"), renderDatas[i].price && _template_fun_array.push('<span class="span2 blue">¥', "undefined" == typeof renderDatas[i].price ? "" : renderDatas[i].price, "起</span>"), _template_fun_array.push(""), renderDatas[i].priceInfo && _template_fun_array.push('<span class="span2 gray">', "undefined" == typeof renderDatas[i].priceInfo ? "" : renderDatas[i].priceInfo, "</span>"), _template_fun_array.push('<span class="span3"><a href="javascript:void(0);" data-room-id="', "undefined" == typeof renderDatas[i].roomId ? "" : renderDatas[i].roomId, '" class="hotel-order-new hotel-order-new-small">预订</a></span>    </li>');
                                _template_fun_array.push('</ul><a class="async-book-link" href="javascript:void(0);">更多房型和日期>></a>'), _template_varName = null
                            }(_template_object);
                        return fn = null, _template_fun_array.join("")
                    }][0];
                    return template({
                        renderDatas: renderDatas
                    })
                } catch (e) {
                    "undefined" != typeof alog && alog("exception.fire", "catch", {
                        msg: e.message || e.description,
                        path: "common:widget/ui/place/place.js",
                        ln: 475
                    })
                }
            },
            createAsyncMovieHTML: function(renderDatas, uid, poiType, cityCode, category, movie_id) {
                try {
                    var template = [function(_template_object) {
                        var _template_fun_array = [],
                            fn = function(__data__) {
                                var _template_varName = "";
                                for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                                eval(_template_varName), _template_fun_array.push("<ul>");
                                for (var i = 0, ll = renderDatas.length; ll > i; i++) {
                                    _template_fun_array.push("    ");
                                    var item = renderDatas[i];
                                    _template_fun_array.push('    <li class="async-book-ota clearfix">        <span class="span2" title="', "undefined" == typeof item.movie_name ? "" : item.movie_name, '">', "undefined" == typeof item.movie_name ? "" : item.movie_name, "</span>        "), item.movie_type && _template_fun_array.push('<span class="span3 gray">', "undefined" == typeof item.movie_type ? "" : item.movie_type, "</span>"), _template_fun_array.push(""), (item.price || item.origin_price) && _template_fun_array.push('<span class="span3 blue">¥', "undefined" == typeof(item.price || item.origin_price) ? "" : item.price || item.origin_price, "起</span>"), _template_fun_array.push('<span class="span3"><a href="javascript:void(0);" onclick="place.showDetail(&#39;', "undefined" == typeof uid ? "" : uid, "&#39;, &#39;", "undefined" == typeof poiType ? "" : poiType, "&#39;, &#39;", "undefined" == typeof cityCode ? "" : cityCode, "&#39;,&#39;", "undefined" == typeof category ? "" : category, "&#39;, &#39;movie_film&#39;, &#39;Iw&#39;,&#39;", "undefined" == typeof item.movie_id ? "" : item.movie_id, '&#39;);" class="movieOrderBtn">在线订座</a></span>    </li>')
                                }
                                _template_fun_array.push('</ul><a class="async-book-link" href="javascript:void(0);" onclick="place.showDetail(&#39;', "undefined" == typeof uid ? "" : uid, "&#39;, &#39;", "undefined" == typeof poiType ? "" : poiType, "&#39;, &#39;", "undefined" == typeof cityCode ? "" : cityCode, "&#39;,&#39;", "undefined" == typeof category ? "" : category, '&#39;,&#39;movie_more&#39;, &#39;Iw&#39;);">更多电影>></a>'), _template_varName = null
                            }(_template_object);
                        return fn = null, _template_fun_array.join("")
                    }][0];
                    return template({
                        renderDatas: renderDatas,
                        uid: uid,
                        poiType: poiType,
                        cityCode: cityCode,
                        category: category
                    })
                } catch (e) {
                    "undefined" != typeof alog && alog("exception.fire", "catch", {
                        msg: e.message || e.description,
                        path: "common:widget/ui/place/place.js",
                        ln: 487
                    })
                }
            },
            createCaterBookPrice: function(json) {
                var template = [function(_template_object) {
                    var _template_fun_array = [],
                        fn = function(__data__) {
                            var _template_varName = "";
                            for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                            eval(_template_varName), _template_fun_array.push('<p class="place-preferential bookab"><em class="order_icon"></em>', "undefined" == typeof renderData.content ? "" : renderData.content, "&nbsp;"), renderData.promotion.guarantee && _template_fun_array.push('<em class="save_icon" title="已加入消费者保障计划！"></em>'), _template_fun_array.push(""), renderData.promotion.discount && _template_fun_array.push('<em class="disc_icon"></em>'), _template_fun_array.push('    <a href="javascript:void(0);" onclick="addStat(&#39;poiinfowin.poi.seatreserving&#39;);place.showDetail(&#39;', "undefined" == typeof cfg.uid ? "" : cfg.uid, "&#39;, &#39;", "undefined" == typeof cfg.poiType ? "" : cfg.poiType, "&#39;, &#39;", "undefined" == typeof cfg.cityCode ? "" : cfg.cityCode, "&#39;, &#39;", "undefined" == typeof ext.src_name ? "" : ext.src_name, '&#39;, &#39;cater_book&#39;, &#39;iw&#39;);" class="hotel-order-new hotel-order-new-small" style="margin-top:-2px;">订座</a> </p>'), _template_varName = null
                        }(_template_object);
                    return fn = null, _template_fun_array.join("")
                }][0];
                return template(json)
            },
            showTakeout: function(e) {
                var a = "http://waimai.baidu.com/waimai/shop/" + e;
                e && window.open(a)
            },
            placeHookPano: function() {},
            otaDataDecode: function(e) {
                var a, t, o, i;
                for (i = function(e) {
                        var a, t, o, i, n, r, c, s = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
                        for (r = e.length, n = 0, c = ""; r > n;) {
                            do a = s[255 & e.charCodeAt(n++)]; while (r > n && -1 == a);
                            if (-1 == a) break;
                            do t = s[255 & e.charCodeAt(n++)]; while (r > n && -1 == t);
                            if (-1 == t) break;
                            c += String.fromCharCode(a << 2 | (48 & t) >> 4);
                            do {
                                if (o = 255 & e.charCodeAt(n++), 61 == o) return c;
                                o = s[o]
                            } while (r > n && -1 == o);
                            if (-1 == o) break;
                            c += String.fromCharCode((15 & t) << 4 | (60 & o) >> 2);
                            do {
                                if (i = 255 & e.charCodeAt(n++), 61 == i) return c;
                                i = s[i]
                            } while (r > n && -1 == i);
                            if (-1 == i) break;
                            c += String.fromCharCode((3 & o) << 6 | i)
                        }
                        return c
                    }, o = function(e) {
                        var a, t, o, i, n, r;
                        for (a = "", o = e.length, t = 0; o > t;) switch (i = e.charCodeAt(t++), i >> 4) {
                            case 0:
                            case 1:
                            case 2:
                            case 3:
                            case 4:
                            case 5:
                            case 6:
                            case 7:
                                a += e.charAt(t - 1);
                                break;
                            case 12:
                            case 13:
                                n = e.charCodeAt(t++), a += String.fromCharCode((31 & i) << 6 | 63 & n);
                                break;
                            case 14:
                                n = e.charCodeAt(t++), r = e.charCodeAt(t++), a += String.fromCharCode((15 & i) << 12 | (63 & n) << 6 | (63 & r) << 0)
                        }
                        return a
                    }, t = function(e) {
                        var a, t, n = "";
                        for (a = 0; a < e.length; a++) t = e.charCodeAt(a), 128 > t && (t = 7 ^ t), n += String.fromCharCode(t);
                        return o(i(n))
                    }, a = 0; a < e.length; a++) {
                    if (e[a].basic_info) {
                        var n;
                        for (n in e[a].basic_info) e[a].basic_info[n] && (e[a].basic_info[n] = t(e[a].basic_info[n]))
                    }
                    if (e[a].ota_list) {
                        var r;
                        for (r = 0; r < e[a].ota_list.length; r++)
                            if (e[a].ota_list[r].price_info) {
                                var c;
                                for (c = 0; c < e[a].ota_list[r].price_info.length; c++) e[a].ota_list[r].price_info[c].book_state && (e[a].ota_list[r].price_info[c].book_state = t(e[a].ota_list[r].price_info[c].book_state)), e[a].ota_list[r].price_info[c].room_name && (e[a].ota_list[r].price_info[c].room_name = t(e[a].ota_list[r].price_info[c].room_name)), e[a].ota_list[r].price_info[c].room_price && e[a].ota_list[r].price_info[c].room_price.price && (e[a].ota_list[r].price_info[c].room_price.price = t(e[a].ota_list[r].price_info[c].room_price.price)), e[a].ota_list[r].price_info[c].coupons && e[a].ota_list[r].price_info[c].coupons.price && (e[a].ota_list[r].price_info[c].coupons.price = t(e[a].ota_list[r].price_info[c].coupons.price))
                            }
                    }
                }
            }
        };
    module.exports = window.place = place
});;
define("common:widget/ui/NbSearch/NbSearch.js", function(e, o, n) {
    var i, t, a, m, r = e("common:widget/ui/constant/Constant.js"),
        l = e("common:widget/ui/config/config.js"),
        c = (l.mapConfig, e("common:widget/ui/mapUtil/mapUtil.js")),
        s = (e("common:widget/ui/util/util.js"), {});
    s.show = function(e) {
        function o(e) {
            T.on(document, "onmousemove", n), T.on(document, "onmouseup", l);
            var o = e.clientX || e.x,
                i = map.pointToPixel(a.getPoint());
            f = o - i.x, v = !0
        }

        function n(e) {
            var o = (e.clientX || e.x) - f,
                n = new BMap.Pixel(o, map.pointToPixel(a.getPoint()).y),
                r = Math.floor(map.getDistance(map.pixelToPoint(n), t.getPoint()));
            500 > r ? r = 500 : r > 1e4 ? r = 1e4 : a.setPoint(map.pixelToPoint(n)), GRControll.GRCircleRadius = r, i.setRadius(r);
            var l = "";
            l = GRControll.GRCircleRadius < 1e3 ? GRControll.GRCircleRadius + "米" : Math.round(GRControll.GRCircleRadius / 10) / 100 + "公里", m.setContent(l)
        }

        function l() {
            v = !1, a && a.iconDom && (a.iconDom.children[0].style.left = "0px"), T.un(document, "onmousemove", n), T.un(document, "onmouseup", l), c.setViewport([new BMap.Point(i.getBounds().minX, i.getBounds().minY), new BMap.Point(i.getBounds().maxX, i.getBounds().maxY)], -50)
        }
        this.loadCss(), i && (map.removeOverlay(i), map.removeOverlay(t), map.removeOverlay(a), map.removeOverlay(m)), i = new BMap.Circle(e, GRControll.GRCircleRadius, {
            strokeColor: "#a3b1cc",
            fillColor: "#4673cc",
            strokeOpacity: .9,
            fillOpacity: .35,
            strokeWeight: 1
        }), map.addOverlay(i);
        var s = {
                anchor: r.A_J_MARKER_OFFSET,
                imageSize: new BMap.Size(280, 676),
                imageOffset: new BMap.Size(200, 0),
                infoWindowOffset: r.A_J_MARKER_INFOWND_OFFSET
            },
            d = new BMap.Icon("//webmap1.bdimg.com/wolfman/static/common/images/bgs_6dbfd12.gif", r.A_J_MARKER_RED_SIZE, s);
        t = new BMap.Marker(e, {
            icon: d,
            baseZIndex: 25e5
        });
        var p = i.getBounds();
        e = new BMap.Point(p.maxX, .5 * (p.minY + p.maxY));
        var u = map.pointToPixel(e);
        a = new BMap.Marker(map.pixelToPoint(u), {
            icon: new BMap.Icon("//webmap1.bdimg.com/wolfman/static/common/images/nbsearch_c01dcd1.png", new BMap.Size(31, 19), {
                anchor: new BMap.Size(16, 14),
                imageSize: new BMap.Size(120, 20),
                imageOffset: new BMap.Size(0, 0),
                infoWindowOffset: r.A_J_MARKER_INFOWND_OFFSET
            }),
            baseZIndex: 25e6
        }), a.addEventListener("mouseover", function(e) {
            e.target.iconDom && (e.target.iconDom.children[0].style.left = "-88px")
        }), a.addEventListener("mouseout", function(e) {
            !v && e.target.iconDom && (e.target.iconDom.children[0].style.left = "0px")
        }), m = new BMap.Label("a", {
            offset: new BMap.Size(18, -14)
        }), m.setStyle({
            zIndex: 20020,
            background: "url(//webmap1.bdimg.com/wolfman/static/common/images/nbsearch_c01dcd1.png) -31px 0",
            border: "none",
            height: "20px",
            color: "black",
            textIndent: "5px",
            textAlign: "center",
            zoom: 1,
            width: "56px",
            lineHeight: "20px",
            padding: "0"
        });
        var g = "";
        g = GRControll.GRCircleRadius < 1e3 ? GRControll.GRCircleRadius + "米" : Math.round(GRControll.GRCircleRadius / 10) / 100 + "公里", m.setContent(g), a.setLabel(m), map.addOverlay(a), map.addOverlay(t), T(m.getDom()).attr("tid", "nbHandleLabel");
        var f, v = !1;
        a.addEventListener("mousedown", o)
    }, s.hide = function() {
        map.removeOverlay(i), map.removeOverlay(t), map.removeOverlay(a), map.removeOverlay(m)
    }, s.loadCss = function() {
        var o = ".nb_dis{float:right;margin-right:4px;display:block;*position:absolute;*right:80px}";
        e.loadCss({
            content: o,
            name: "NbSearch"
        })
    }, s.init = function(e, o) {
        o = o || {}, this.json = e || {}, this.cinfo = o.cinfo || {}
    }, n.exports = s
});;
define("common:widget/ui/page/Page.js", function(a, e, t) {
    function i(a, e, t) {
        if (T.lang.Class.call(this), a) {
            this.container = "object" == typeof a ? a : T.g(a), this.page = 1, this.pageCount = 100, this.argName = "pg", this.pagecap = 4, this.callback = e, this.update = !0;
            var i = {
                page: 1,
                totalCount: 100,
                pageCount: 100,
                pagecap: 4,
                argName: "pg",
                update: !0
            };
            t || (t = i);
            for (var s in t) "undefined" != typeof t[s] && (this[s] = t[s]);
            this.render()
        }
    }
    T.extend(i.prototype, {
        render: function() {
            try {
                var e = '.page{font-family:"宋体",sans-serif;text-align:center;line-height:12px;font-size:13px}.page a{display:inline-block;border:#e7ecf0 solid 1px;padding:5px 6px 3px;text-decoration:none}.page a:hover{background:#e8f1f6}.page span{display:inline-block;margin:0 2px}.page span.curPage{padding:4px 5px;font-weight:700}.page a.next-none{cursor:default;color:#949494}.page a.next-none:hover{background:#fff}';
                a.loadCss({
                    content: e,
                    name: "page"
                }), this.initialize()
            } catch (t) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: t.message || t.description,
                    path: "common:widget/ui/page/Page.js",
                    ln: 49
                })
            }
        },
        initialize: function() {
            try {
                this.checkPages(), this.container.innerHTML = this.createHtml()
            } catch (a) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: a.message || a.description,
                    path: "common:widget/ui/page/Page.js",
                    ln: 57
                })
            }
        },
        checkPages: function() {
            isNaN(parseInt(this.page)) && (this.page = 1), isNaN(parseInt(this.pageCount)) && (this.pageCount = 1), this.page < 1 && (this.page = 1), this.pageCount < 1 && (this.pageCount = 1), this.page > this.pageCount && (this.page = this.pageCount), this.page = parseInt(this.page), this.pageCount = parseInt(this.pageCount)
        },
        getPage: function() {
            {
                var a = location.search,
                    e = new RegExp("[?&]?" + this.argName + "=([^&]*)[&$]?", "gi");
                a.match(e)
            }
            this.page = RegExp.$1
        },
        createHtml: function() {
            var a = [],
                e = this.page - 1,
                t = this.page + 1;
            if (a.push('<p class="page">'), 1 > e || (this.page >= this.pagecap && a.push('<span><a href="javascript:void(0)" tid="toFirstPage" onclick="Instance(\'' + this.guid + "').toPage(1);return false;\">首页</a></span>"), a.push('<span><a href="javascript:void(0)" tid="toPrevPage" onclick="Instance(\'' + this.guid + "').toPage(" + e + ');return false;"><上一页</a></span>')), this.page < this.pagecap) {
                if (this.page % this.pagecap == 0) var i = this.page - this.pagecap - 1;
                else var i = this.page - this.page % this.pagecap + 1;
                var s = i + this.pagecap - 1
            } else {
                var p = Math.floor(this.pagecap / 2),
                    n = this.pagecap % 2 - 1;
                if (this.pageCount > this.page + p) var s = this.page + p,
                    i = this.page - p - n;
                else var s = this.pageCount,
                    i = this.page - p - n
            }
            if (this.page > this.pageCount - this.pagecap && this.page >= this.pagecap) var i = this.pageCount - this.pagecap + 1,
                s = this.pageCount;
            for (var g = i; s >= g; g++)
                if (g > 0)
                    if (g == this.page) a.push('<span class="curPage">' + g + "</span>");
                    else if (g >= 1 && g <= this.pageCount) {
                var h = "";
                2 == g && (h = "tid=secPageNum"), a.push('<span><a href="javascript:void(0)" ' + h + " onclick=\"Instance('" + this.guid + "').toPage(" + g + ');return false;">' + g + "</a></span>")
            }
            return a.push(t > this.pageCount ? '<span><a href="javascript:void(0)" tid="toNextPage" class="next next-none">下一页&gt;</a></span>' : '<span><a href="javascript:void(0)" tid="toNextPage" onclick="Instance(\'' + this.guid + "').toPage(" + t + ');return false;">下一页></a></span>'), a.push("</p>"), a.join("")
        },
        toPage: function(a) {
            var e = a ? a : 1;
            "function" == typeof this.callback && (this.callback(e), this.page = e), this.update && this.render()
        }
    }), t.exports = i
});;
define("common:widget/ui/iKnow/iKnow.js", function(n, t, e) {
    var i = n("common:widget/ui/config/config.js"),
        o = i.modelConfig,
        a = {
            IknowBtnOver: function(n) {
                n.style.backgroundPosition = "left center"
            },
            IknowBtnOut: function(n) {
                n.style.backgroundPosition = "left top"
            },
            IknowBtnDown: function(n) {
                n.style.backgroundPosition = "left bottom"
            },
            IknowBtnUp: function(n) {
                n.style.backgroundPosition = "left center"
            },
            getIknowCode: function(n) {
                return n = baidu.string.filterFormat.escapeString(n), ['<div class="nr_know"><p>您可以在知道提问，让其他网友帮您解决问题：</p>', '<form name="IknowForm" action="//zhidao.baidu.com/new" method="get" target="_blank">', '<p class="nr_pi"><input type="text" name="word" value="' + n + '" /></p>', '<div class="IknownBtn"  onclick="IknowForm.submit()">我要提问</div>', '<input type="hidden" name="ct" value="17" />', '<input type="hidden" name="tn" value="ikask" />', '<input type="hidden" name="cm" value="1" />', '<input type="hidden" name="lm" value="394496" />', '<input type="hidden" name="pn" value="0" />', '<input type="hidden" name="rn" value="10" />', '<input type="hidden" name="fr" value="map" /></form></div>'].join("")
            },
            getPromptInfo: function(n, t) {
                var e = "//zhidao.baidu.com/new?word=#{word}&ct=#{ct}&tn=#{tn}&cm=#{cm}&lm=#{lm}&pn=#{pn}&rn=#{rn}&fr=#{fr}",
                    i = {
                        word: n,
                        ct: 17,
                        tn: "ikask",
                        cm: 1,
                        lm: 394496,
                        pn: 0,
                        rn: 10,
                        fr: "map"
                    },
                    a = "http://www.baidu.com/s?ie=utf-8&wd=" + encodeURIComponent(t) + "&cl=3",
                    d = [],
                    r = (o && o.cityName ? o.cityName : "全国", {
                        city_id: window.currentCity.code || 1,
                        business_trigger: 7,
                        poi_name: t
                    });
                return d.push("<div class='nr_suggest'>", "<p class='sg_title'>您还可以：</p>", "<ul>", "<li>检查输入是否正确或者输入其它词</li>", "<li>在百度网页中查找“<a href='" + a + "' target='_blank'>" + t + "</a>”</li>", '<li>在百度知道<a href="' + baidu.template._encodeHTML(baidu.string.format(e, i)) + '" target="_blank">提问</a>让其他网友帮您解决</li>', "<li>在百度地图<a href='https://ugc.map.baidu.com/ifix/poiproblem/addpoipcpage?" + baidu.url.jsonToQuery(r, encodeURIComponent) + "' target='_blank'>添加该地点</a></li>", "<li>输入香港、澳门、台湾或海外城市查询当地结果</li>", "</ul>", "</div>"), d.join("")
            }
        };
    e.exports = a, window.IknowInst = a
});;
define("common:widget/ui/place/caterPopInner.js", function(require, exports, module) {
    var place = window.place || {};
    place.caterPopInner = place.caterPopInner || {};
    var CATER_TEMPLATE = [function(_template_object) {
        var _template_fun_array = [],
            fn = function(__data__) {
                var _template_varName = "";
                for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                eval(_template_varName), _template_fun_array.push('<div id="caterPopInner">    <div class="basic-info clearfix">        '), placeDetail.image && _template_fun_array.push('        <div class="head-img">            <img width="104" onclick="place.showDetail(&#39;', "undefined" == typeof content.uid ? "" : content.uid, "&#39;, ", "undefined" == typeof content.poiType ? "" : content.poiType, ", ", "undefined" == typeof sCityCode ? "" : sCityCode, ", &#39;", "undefined" == typeof placeSrcName ? "" : placeSrcName, '&#39;,&#39;Page&#39;,&#39;List&#39;);" height="69" src="//webmap0.bdimg.com/client/services/thumbnails?width=106&height=71&align=center,center&src=', "undefined" == typeof encodeURIComponent(placeDetail.image) ? "" : encodeURIComponent(placeDetail.image), '">        </div>        '), _template_fun_array.push('        <div class="head-info" '), placeDetail.image || _template_fun_array.push(' style="width: auto;"'), _template_fun_array.push(">            "), content.addr && _template_fun_array.push("                <p>", "undefined" == typeof content.addr ? "" : content.addr, "</p>            "), _template_fun_array.push("            "), content.tel && _template_fun_array.push("                <p>", "undefined" == typeof content.tel.replace(/(,|;)/gi, ", ") ? "" : content.tel.replace(/(,|;)/gi, ", "), "</p>            "), _template_fun_array.push("            "), (placeDetail.overall_rating || placeDetail.tag || placeDetail.price) && (_template_fun_array.push('                <p class="hotel_res">                    '), placeDetail.overall_rating && _template_fun_array.push('                    <span class="score">                        <b style="width:', "undefined" == typeof Math.round(61 * placeDetail.overall_rating / 5) ? "" : Math.round(61 * placeDetail.overall_rating / 5), 'px">评分</b>                    </span>                    '), _template_fun_array.push("                    "), placeDetail.tag && _template_fun_array.push('                        <span class="map_tagBox">', "undefined" == typeof(placeDetail.tag.split(/[, ]/)[0] || "") ? "" : placeDetail.tag.split(/[, ]/)[0] || "", "</span>                    "), _template_fun_array.push("                    "), placeDetail.tag && placeDetail.price && _template_fun_array.push('                        <span class="line"></span>                    '), _template_fun_array.push("                    "), placeDetail.price && _template_fun_array.push('                        <span class="price">人均￥', "undefined" == typeof parseFloat(placeDetail.price, 10) ? "" : parseFloat(placeDetail.price, 10), "</span>                    "), _template_fun_array.push("                </p>            ")), _template_fun_array.push("        </div>    </div>    "), (takeout || placeDetail.groupon && placeDetail.groupon.length || placeDetail.pc_bookable || placeDetail.premium2 && placeDetail.premium2.length) && (_template_fun_array.push('    <div class="ext-info">        '), placeDetail.groupon && placeDetail.groupon.length ? _template_fun_array.push('            <a class="ext-item" href="javascript:;" onclick="place.showDetail(&#39;', "undefined" == typeof content.uid ? "" : content.uid, "&#39;, ", "undefined" == typeof content.poiType ? "" : content.poiType, ", ", "undefined" == typeof sCityCode ? "" : sCityCode, ", &#39;", "undefined" == typeof placeSrcName ? "" : placeSrcName, '&#39;,&#39;groupon&#39;,&#39;List&#39;);addStat(&#39;poiinfoWin.poi.tuan&#39;, &#39;click&#39;, {da_trd: &#39;cater&#39;, da_abtest:&#39;true&#39;});return false;">                <span class="icon-label bgr">团</span>                <span class="desc">', "undefined" == typeof placeDetail.groupon[0].groupon_title ? "" : placeDetail.groupon[0].groupon_title, '</span>                <span class="btn">去看看</span>            </a>        ') : placeDetail.premium2 && placeDetail.premium2.length && _template_fun_array.push('            <a class="ext-item" href="javascript:;" onclick="place.showDetail(&#39;', "undefined" == typeof content.uid ? "" : content.uid, "&#39;, ", "undefined" == typeof content.poiType ? "" : content.poiType, ", ", "undefined" == typeof sCityCode ? "" : sCityCode, ", &#39;", "undefined" == typeof placeSrcName ? "" : placeSrcName, '&#39;,&#39;premium&#39;,&#39;List&#39;);addStat(&#39;poiinfoWin.poi.discount&#39;, &#39;click&#39;, {da_trd: &#39;cater&#39;, da_abtest:&#39;true&#39;});return false;" >                <span class="icon-label bgy">惠</span>                <span class="desc">', "undefined" == typeof placeDetail.premium2[0].discount_title ? "" : placeDetail.premium2[0].discount_title, '</span>                <span class="btn">去看看</span>            </a>        '), _template_fun_array.push("        "), placeDetail.pc_bookable && _template_fun_array.push('            <a class="ext-item" href="javascript:;" onclick="place.showDetail(&#39;', "undefined" == typeof content.uid ? "" : content.uid, "&#39;, ", "undefined" == typeof content.poiType ? "" : content.poiType, ", ", "undefined" == typeof sCityCode ? "" : sCityCode, ", &#39;", "undefined" == typeof placeSrcName ? "" : placeSrcName, '&#39;,&#39;cater_book&#39;,&#39;List&#39;);addStat(&#39;poiinfoWin.poi.seatreserving&#39;, &#39;click&#39;, {da_trd: &#39;cater&#39;, da_abtest:&#39;true&#39;});return false;">                <span class="icon-label bgb">订</span>                <span class="desc">本店支持在线订座</span>                <span class="btn">我要订座</span>            </a>        '), _template_fun_array.push("        "), takeout && (_template_fun_array.push('            <a class="ext-item" href="javascript:;" onclick="place.showTakeout(&#39;', "undefined" == typeof takeout.shop_id ? "" : takeout.shop_id, '&#39;);addStat(&#39;poiinfoWin.poi.takeoutBtn&#39;, &#39;click&#39;, {da_trd: &#39;cater&#39;});return false;">                <span class="icon-label bgt">外</span>                <span class="desc">本店支持外卖配送，'), takeout.tips ? _template_fun_array.push("", "undefined" == typeof takeout.tips ? "" : takeout.tips, "") : _template_fun_array.push("专业配送，品质保证"), _template_fun_array.push('</span>                <span class="btn">去看看</span>            </a>        ')), _template_fun_array.push("    </div>    ")), _template_fun_array.push("    "), placeDetail.comment && placeDetail.comment.length && (_template_fun_array.push('    <div class="comment">        <a class="num" href="javascript:;" onclick="addStat(&#39;poiinfoWin.poi.commentLnk&#39;, &#39;click&#39;, {da_trd: &#39;cater&#39;, da_abtest:&#39;true&#39;});place.showDetail(&#39;', "undefined" == typeof content.uid ? "" : content.uid, "&#39;, ", "undefined" == typeof content.poiType ? "" : content.poiType, ", ", "undefined" == typeof sCityCode ? "" : sCityCode, ", &#39;", "undefined" == typeof placeSrcName ? "" : placeSrcName, '&#39;,&#39;comment&#39;,&#39;List&#39;);return false;">共', "undefined" == typeof placeDetail.comment_num ? "" : placeDetail.comment_num, '条评论</a>        <p class="desc" onclick="addStat(&#39;poiinfoWin.poi.comment&#39;, &#39;click&#39;, {da_trd: &#39;cater&#39;, da_abtest:&#39;true&#39;});place.showDetail(&#39;', "undefined" == typeof content.uid ? "" : content.uid, "&#39;, ", "undefined" == typeof content.poiType ? "" : content.poiType, ", ", "undefined" == typeof sCityCode ? "" : sCityCode, ", &#39;", "undefined" == typeof placeSrcName ? "" : placeSrcName, '&#39;,&#39;comment&#39;,&#39;List&#39;);return false;">            <i class="arrow"></i>            '), placeDetail.comment[0].length > 45 ? _template_fun_array.push("                ", "undefined" == typeof placeDetail.comment[0].substring(0, 45) ? "" : placeDetail.comment[0].substring(0, 45), "...            ") : _template_fun_array.push("                ", "undefined" == typeof placeDetail.comment[0] ? "" : placeDetail.comment[0], "            "), _template_fun_array.push("        </p>    </div>    ")), _template_fun_array.push("    "), hasDetail && _template_fun_array.push('    <div class="other-info">        <a class="more-btn" href="javascript:;" onclick="addStat(&#39;poiinfoWin.poi.showmoreBtn&#39;, &#39;click&#39;, {da_trd: &#39;cater&#39;, da_abtest:&#39;true&#39;});place.showDetail(&#39;', "undefined" == typeof content.uid ? "" : content.uid, "&#39;, ", "undefined" == typeof content.poiType ? "" : content.poiType, ", ", "undefined" == typeof sCityCode ? "" : sCityCode, ", &#39;", "undefined" == typeof placeSrcName ? "" : placeSrcName, '&#39;,&#39;Page&#39;,&#39;List&#39;);return false;">            查看更多<i class="arrow"></i>        </a>        <a class="ugc-upload" target="_blank" href="/ugc/upload/index?uid=', "undefined" == typeof content.uid ? "" : content.uid, '" onclick="addStat(&#39;poiinfoWin.poi.uploadBtn&#39;, &#39;click&#39;, {da_trd: &#39;cater&#39;, da_abtest:&#39;true&#39;})">传照片</a>        <a class="ugc-remark" target="_blank" href="/ugc/remark/index?uid=', "undefined" == typeof content.uid ? "" : content.uid, '" onclick="addStat(&#39;poiinfoWin.poi.remarkBtn&#39;, &#39;click&#39;, {da_trd: &#39;cater&#39;, da_abtest:&#39;true&#39;})">写评论</a>            </div>    '), _template_fun_array.push("</div>"), _template_varName = null
            }(_template_object);
        return fn = null, _template_fun_array.join("")
    }][0];
    T.extend(place.caterPopInner, {
        contentHtml: function(e, a) {
            addStat("poiinfoWin.poi.poiinfowin", "show", {
                da_trd: "cater",
                da_abtest: !0
            });
            var t = e.ext || {},
                n = t.detail_info || {},
                p = n && (n.pc_bookable || n.di_review_keyword || n.groupon_num || n.premium_flag),
                i = t.src_name || "",
                o = n.book_info && n.book_info.coms && "takeout" === n.book_info.coms.type,
                l = n.takeout && n.takeout[0],
                c = o ? baidu.json.parse(n.book_info.coms.content) : l && n.takeout[0];
            return CATER_TEMPLATE({
                content: e,
                placeExt: t,
                placeDetail: n,
                placeSrcName: i,
                sCityCode: a,
                hasDetail: p,
                takeout: c
            })
        }
    }), module.exports = place.caterPopInner
});;
define("common:widget/ui/place/placeDetail.js", function(e, t) {
    function i(e, t, i, n, l, c, u, p) {
        var r = {
            cuid: e,
            uid: e
        };
        c && l && (r.ct = c.toLowerCase() + "_" + l.toLowerCase()), n && (r.category = n), addStat(STAT_CODE.STAT_POI_ONXQ, r);
        var s = a.DETAIL_PAGE_URL,
            w = window.location.pathname,
            g = s + (w && w.length <= 1 ? "" : window.location.pathname),
            _ = "inf";
        if (window.place && window.place.placeRe.test(n) && (g += "/detail", _ = "ninf"), t == d.POI_TYPE_BUSLINE || t == d.POI_TYPE_SUBLINE) g += "?newmap=1&t=" + map.mapType + "&s=" + encodeURIComponent("bsl&bsltp=0&uid=" + e + "&c=" + i);
        else {
            var f = map.getBounds({
                    margins: [0, 0, 0, o.leftMargin],
                    heading: 0,
                    tilt: 0
                }),
                h = Math.min(f.minX, f.maxX),
                I = Math.max(f.minX, f.maxX),
                q = Math.min(f.minY, f.maxY),
                C = Math.max(f.minY, f.maxY),
                P = "(" + h + "," + q + ";" + I + "," + C + ")",
                v = window.currentComponent && window.currentComponent.curKw || "";
            v = encodeURIComponent(v);
            var T = "&wd=" + v + "&b=" + P + "&" + m.jsonToQuery(statParamInterceptor(), function() {
                return ""
            });
            if (n) {
                {
                    n.toUpperCase()
                }
                if ("ISHOP_INFO" == n && (g += "/ishop/detail.html?newmap=1&s=" + encodeURIComponent(_ + "&uid=" + e + "&c=" + i)), "ISHOP_INFO_IMG" == n && (g += "/ishop/detail.html?newmap=1&s=" + encodeURIComponent(_ + "&uid=" + e + "&c=" + i) + "#picresult"), "Page" == l && (g += "?qt=" + _ + "&uid=" + e + T + "&detail=" + n, p && (g += "&business_id=" + p)), "Page_Pic" == l && (g += "?qt=" + _ + "&uid=" + e + T + "&detail=" + n + "#picresult"), "Page_Comm" == l && (g += "?qt=" + _ + "&uid=" + e + T + "&detail=" + n + "#comment"), "Pic_Page" == l && (g += "?qt=" + _ + "&uid=" + e + T + "&detail=" + n), "Info_Page" == l && (g += "?qt=" + _ + "&uid=" + e + T + "&detail=" + n), "page_discount" == l && (g += "?qt=" + _ + "&uid=" + e + T + "&detail=" + n + "&dstype=discount"), "groupon" == l || "premium" === l || "comment" === l) {
                    var O = {
                        comment: "newComments",
                        premium: "premiumAndGroupon",
                        groupon: "premiumAndGroupon"
                    };
                    g += "?qt=" + _ + "&uid=" + e + T + "&detail=" + n + "#" + O[l]
                }
                "announcement" == l && (g += "?qt=" + _ + "&uid=" + e + T + "&detail=" + n + "&antype=1#announcement"), ("movie_book" == l || "movie_film" == l || "movie_info" == l || "movie_more" == l) && (g += location.href.match(/sfrom=shuangdan/g) ? "?qt=" + _ + "&uid=" + e + T + "&detail=" + n + (u ? "&target=" + u : "") + "&channel=shuangdan" + (u ? "#schedule-" + u : "#showTable") : "?qt=" + _ + "&uid=" + e + T + "&sfrom=pc_detail&detail=" + n + (u ? "&target=" + u : "") + (u ? "#schedule-" + u : "#showTable")), "venue" == l && (g += "?qt=" + _ + "&uid=" + e + T + "&detail=" + n + "#venue"), "other_opera" == l && (g += "?qt=" + _ + "&uid=" + e + T + "&detail=" + n + "#schedule"), ("ota" == l || "hotel" == l) && (g += "?qt=" + _ + "&uid=" + e + T + "&detail=" + n + (u ? "&" + u : "") + "#otalist"), "scope" == l && (g += "?qt=" + _ + "&uid=" + e + T + "&detail=" + n + (u ? "&" + u : "") + "#otalist"), "cater_book" == l && (g += "?qt=" + _ + "&uid=" + e + T + "&detail=" + n + (u ? "&" + u : "") + "#order-seat"), /activity_/.test(l) && (g += "?qt=" + _ + "&uid=" + e + T + "&detail=" + n + (u ? "&" + u : "") + "#" + l)
            } else g += "?newmap=1&t=" + map.mapType + "&s=" + encodeURIComponent("inf&uid=" + e + "&c=" + i)
        }
        g = g.replace(/&from=\w*/, ""), g += "&from=map", "Iw" === c && addStat("infowin.title.detail", "click"), addStat("detail.title." + n, "click", {
            from: "map"
        }), "scope" !== n && "hotel" !== n && (g += "&ugc_ver=1"), g && 0 === g.indexOf("//") && g.indexOf("/detail?") > 0 && (g = "http:" + g), window.open(g)
    }
    var n = e("common:widget/ui/config/config.js"),
        a = n.urlConfig,
        o = n.mapConfig,
        d = e("common:widget/ui/constant/Constant.js"),
        m = e("common:widget/ui/util/util.js");
    t.showDetail = i
});;
define("common:widget/ui/place/placeEnter.js", function(e, a, c) {
    var n = e("common:widget/com/componentManager.js"),
        o = e("common:widget/ui/util/util.js"),
        r = e("common:widget/ui/searchBox/searchBox.js"),
        t = {
            BD: ["餐饮", "酒店", "超市", "KTV", "电影院", "银行", "医院", "公交站", "停车场", "加油站"],
            placeCaterWd: ["中餐馆", "西餐厅", "日本菜", "韩国料理", "东南亚菜", "快餐", "甜点冷饮", "火锅"],
            placeHotelWd: ["快捷酒店", "星级酒店", "旅馆", "度假村", "五星级", "四星级", "三星级", "招待所", "青年旅社"],
            placeHospitalWd: ["中医院", "口腔医院", "儿童医院", "肿瘤医院", "妇科医院", "眼科医院", "骨科医院", "妇幼保健院"],
            placeLifeWd: ["电影院", "KTV", "体育场馆", "健身", "游泳馆", "羽毛球馆", "棋牌室", "网吧", "洗浴", "按摩", "足疗"],
            insertHtml: function(e, a, c, n, o, r) {
                var l = t,
                    i = "",
                    s = "",
                    p = [];
                switch (e) {
                    case 33:
                        i = l.BD, s = r;
                        break;
                    case 13:
                        i = l.placeCaterWd, s = "餐饮";
                        break;
                    case 14:
                        i = l.placeHotelWd, s = "酒店";
                        break;
                    case 18:
                        i = l.placeLifeWd, s = "休闲娱乐";
                        break;
                    case 20:
                        i = l.placeHospitalWd, s = "医院";
                        break;
                    default:
                        i = ""
                }
                if (33 == e) {
                    p.push('<div tid="placeEntranceBox" class="placeEntranceBox_bd">'), p.push("<h3>在“<span>" + s + "</span>”附近找</h3>");
                    for (var d = 0; d < i.length; d++) p.push('<a href="javascript:void(0)" onclick="place.placeEntrance._showPlaceWdLink_NB(this,' + a + ", " + c + ", " + n + ", '" + o + "');return false;\">" + i[d] + "</a>");
                    p.push("</div>")
                } else {
                    p.push('<div tid="placeEntranceBox" class="placeEntranceBox">'), p.push('<h3>查看更多附近“<a href="javascript:void(0)" onclick="place.placeEntrance._showPlaceWdLink_BD(this,' + a + "," + e + ');return false;">' + s + "</a>”</h3>");
                    for (var d = 0; d < i.length; d++) p.push('<a href="javascript:void(0)" onclick="place.placeEntrance._showPlaceWdLink_BD(this,' + a + ", " + e + ');return false;">' + i[d] + "</a>");
                    p.push("</div>")
                }
                return p.join("")
            },
            _showPlaceWdLink_BD: function(e, a) {
                var c = e.innerHTML;
                r.setState("sole", {
                    query: c
                }), n.go("bd&c=" + a + "&wd=" + encodeURIComponent(c))
            },
            _showPlaceWdLink_NB: function(e, a, c, n, r) {
                var t = 2e3;
                c = 1 * c, n = 1 * n, t = 1 * t;
                var l = c - t,
                    i = n - t,
                    s = c + t,
                    p = n + t,
                    d = "(" + l + "," + i + ";" + s + "," + p + ")",
                    h = e.innerHTML,
                    u = "(" + c + "," + n + ")";
                map.centerAndZoom(u, 16), param = {
                    c: a,
                    l: Math.floor(map.getZoom()),
                    wd: h,
                    nb_x: c,
                    nb_y: n,
                    r: t,
                    b: d,
                    uid: r
                }, o.loadSearchInfo(function(e) {
                    e.roundSearchByValue(h, r, "crangeListI", a, null, c, n)
                })
            },
            execGeo: function(e) {
                var a = /([^\|;]*)(?=;)/,
                    c = a.exec(e),
                    n = 1 * c[0].split(",")[0],
                    o = 1 * c[0].split(",")[1],
                    r = {
                        x: n,
                        y: o
                    };
                return r
            }
        },
        l = window.place = window.place || {};
    l.placeEntrance = t, c.exports = t
});