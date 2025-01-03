define("common:widget/route/setMyPlace/ui3SetMyPlacePop.js", function(require, exports, module) {
    function initialize(opts) {
        var that, wrap, $address, $confirm, $cancel, defaults = {
                target: "",
                name: "",
                point: "",
                level: "",
                onSelect: null
            },
            result, optsDft = opts;
        opts = T.extend(defaults, "object" == typeof opts ? opts : {});
        var Popup = require("common:widget/ui/Popup/Popup.js"),
            POPUP_ANCHOR_MAP_CENTER = 1,
            POPUP_ANCHOR_WINDOW_CENTER = 2,
            popOpts = {
                isTitle: !1,
                isAddBottomHeight: !1,
                extClass: "ui3-popup smp-popup",
                closeButton: "",
                height: 183,
                width: 353,
                left: 380,
                clickClose: !1,
                addDom: document.body,
                offset: [0, 0],
                defaultAnchor: POPUP_ANCHOR_WINDOW_CENTER,
                close: function() {
                    ui3SetMyPlace.close(), map.enableScrollWheelZoom()
                }
            },
            ui3SetMyPlace = that = {
                work: function() {
                    this._open(), this.render(), setTimeout(function() {
                        that.bindEvents()
                    }, 100)
                },
                markers: ui3SetMyPlaceMarkers,
                addAllPlace: function() {
                    var e = storer.getAll();
                    if (e && 0 != e.length)
                        for (var t = 0, o = e.length; o > t; t++) this.buildOverlay(e[t])
                },
                buildOverlay: function(e) {
                    var t = this,
                        o = this.createMarker(e);
                    return map.addOverlay(o), o.addEventListener("click", function() {
                        this.selected = !0, addStat("route.map." + e.target + "icon", "click", {}), this.setIcon(clickIcons[e.target]), util.loadSearchInfo(function(n) {
                            t.rgcSearch(e.point, function(a) {
                                var i = t.createInfoWindow(e, a.content.address, n);
                                n.openSearchInfoWnd(i, o)
                            })
                        })
                    }), o.addEventListener("mouseover", function() {
                        this.setIcon(clickIcons[e.target])
                    }), o.addEventListener("mouseout", function() {
                        this.selected !== !0 && this.setIcon(icons[e.target])
                    }), {
                        marker: o
                    }
                },
                remove: function(e) {
                    isLogin ? this.syncToCloud({
                        target: e,
                        remove: !0
                    }) : (this.markers[e] && map.removeOverlay(this.markers[e]), storer.rmvItemByTarget(e)), toast.show("清空成功")
                },
                clearOverlay: function() {
                    for (var e in this.markers) this.markers[e] && (map.removeOverlay(this.markers[e]), this.markers[e] = void 0)
                },
                updateOverLay: function(e) {
                    if (e && e.target) {
                        var t = e.target,
                            o = this.markers[t];
                        o && map.removeOverlay(o), this.buildOverlay(e)
                    }
                },
                createInfoWindow: function(e, t, o) {
                    if (e) {
                        var n = this,
                            a = e.point.split(","),
                            i = o.createSearchInfoWnd({
                                title: "home" === e.target ? "我的家" : "公司 / 学校",
                                addr: t
                            }, {
                                smp: e.target,
                                x: a[0],
                                y: a[1]
                            });
                        return i.addEventListener("close", function() {
                            n.markers[e.target].setIcon(icons[e.target]), n.markers[e.target].selected = !1
                        }), i
                    }
                },
                createMarker: function(e) {
                    if (e) {
                        var t = util.getPoiPoint(e.point),
                            o = new BMap.Marker(t, {
                                icon: icons[e.target],
                                title: "home" === e.target ? "我的家" : "公司 / 学校",
                                enableMassClear: !1
                            });
                        return this.markers[e.target] = o, o
                    }
                },
                sync: function() {
                    isLogin = !0;
                    var e = this,
                        t = "/" + modelConfig.DATA_URL + "usync";
                    T.ajax(t + "&mode=sync&t=" + (new Date).getTime(), {
                        dataType: "json",
                        method: "get",
                        success: function(t) {
                            if (t && !t.error && (storer.clear(), t.data && t.data.updates)) {
                                for (var o = 0; o < t.data.updates.length; o++) e.syncToLocal(t.data.updates[o]);
                                e.addAllPlace()
                            }
                        },
                        error: function() {}
                    })
                },
                syncToLocal: function(e) {
                    if (!e.content || "home" !== e.key && "company" !== e.key) storer.rmvItemByTarget(e.key);
                    else {
                        var t = {
                            point: e.content.locx + "," + e.content.locy,
                            name: e.content.name,
                            note: T.string.filterFormat.escapeString(e.content.name),
                            target: e.key
                        };
                        storer.set(t)
                    }
                    return t
                },
                syncToCloud: function(e) {
                    var t = this,
                        o = "/" + modelConfig.DATA_URL + "usync";
                    if (e.remove) var n = {
                        key: e.target,
                        remove: 1
                    };
                    else var a = e.point.split(","),
                        n = {
                            key: e.target,
                            name: e.name,
                            locx: a[0],
                            locy: a[1]
                        };
                    var i = T.cookie.get("validate");
                    n = T.extend(n, {
                        validate: i
                    }), T.ajax(o + "&mode=modify&t=" + (new Date).getTime(), {
                        dataType: "json",
                        method: "post",
                        data: n,
                        success: function(e) {
                            if (e.data && e.data.updates) {
                                for (var o = 0; o < e.data.updates.length; o++) t.syncToLocal(e.data.updates[o]);
                                t.clearOverlay(), t.addAllPlace()
                            }
                        },
                        error: function() {}
                    })
                },
                open: function(e) {
                    opts.onSelect = e.onSelect, opts.target = e(), this.pop.show()
                },
                bindEvents: function() {
                    require.async("common:widget/ui/ui3MapSuggest/ui3MapSuggest.js", function(e) {
                        e.initialize({
                            input: $address,
                            isAutoWidth: !0,
                            adjustTop: 0,
                            width: 214,
                            "z-index": 5e4,
                            onlyPrecise: !0,
                            showMyPlace: !1,
                            hasHistory: !1,
                            onSelect: function(e, t, o) {
                                o && that.getInfo(o)
                            },
                            onClose: function() {}
                        })
                    }), $address.focus(), $address.bind("keyup", this.reset).bind("paste", this.reset), wrap.delegate(".smp-confirm", "click", function() {
                        result.target = opts.target, storer.set(result), isLogin ? that.syncToCloud(result) : that.updateOverLay(result), opts.onSelect && opts.onSelect.call(null, result), that.pop.close(), toast.show("常用地址添加成功"), "usercenter" === opts.from && addStat("usercenter.address.setsuccess", "click"), "add" == opts.action && addStat("indexleftmenu.setMyPlace.setSuccess", "click", {})
                    }).delegate(".smp-cancel", "click", function() {
                        that.close(), map.enableScrollWheelZoom()
                    })
                },
                close: function() {
                    T(that.pop.main).remove(), T("#mapmask").hide()
                },
                getInfo: function(e) {
                    var t = "/?qt=inf&uid=" + e + "&ie=utf-8&t=" + (new Date).getTime();
                    T.ajax(t, {
                        dataType: "json",
                        success: function(e) {
                            if (e && e.content) {
                                var t = e.content;
                                $confirm.prop("disabled", !1);
                                var o = t.geo.split("|")[2];
                                o = o.substring(0, o.length - 1), result = {
                                    point: o,
                                    name: t.name,
                                    note: T.string.filterFormat.escapeString(t.name),
                                    target: opts.target
                                }
                            }
                        },
                        error: function(e) {
                            console.log("sendUidRequest qt=inf", e)
                        }
                    })
                },
                reset: function() {
                    result && T.trim($address.val()).toLowerCase() !== result.name.toLowerCase() && (result = void 0, $confirm.prop("disabled", !0))
                },
                rgcSearch: function(e, t) {
                    if (e) {
                        var o = e.split(",")[0],
                            n = e.split(",")[1],
                            a = o + "," + n;
                        mapUtil.getGEORevertAddress(a, function(e) {
                            t && t(e)
                        })
                    }
                },
                _open: function() {
                    var e = this.pop = new Popup(popOpts);
                    e.render(), e.dialog(e), wrap = T(this.pop.content), e.show()
                },
                render: function() {
                    try {
                        var template = [function(_template_object) {
                                var _template_fun_array = [],
                                    fn = function(__data__) {
                                        var _template_varName = "";
                                        for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                                        eval(_template_varName), _template_fun_array.push('<div class="title">设置常用地点</div><div class="smp-content">    <div class="smp-field">    '), _template_fun_array.push("home" === target ? '    <label><span class="label-home"></span>我的家：</label>    ' : '    <label><span class="label-company"></span>公司：</label>    '), _template_fun_array.push('    <input class="smp-input" placeholder="例如 “北京市海淀区上地十街9号”" type="text" name="name" value="" autocomplete="off"/>    </div>    <div class="smp-btns">        <button disabled class="smp-confirm">确定</button>        <button class="smp-cancel">取消</button>    </div></div>'), _template_varName = null
                                    }(_template_object);
                                return fn = null, _template_fun_array.join("")
                            }][0],
                            templateObj = opts;
                        wrap.html(template(templateObj)), $address = wrap.find(".smp-input"), $confirm = wrap.find(".smp-confirm"), $cancel = wrap.find(".smp-cancel")
                    } catch (e) {
                        "undefined" != typeof alog && alog("exception.fire", "catch", {
                            msg: e.message || e.description,
                            path: "common:widget/route/setMyPlace/ui3SetMyPlacePop.js",
                            ln: 484
                        })
                    }
                }
            };
        return "bundle" === optsDft ? ui3SetMyPlace : (ui3SetMyPlace.work(), ui3SetMyPlace)
    }
    var util = require("common:widget/ui/util/util.js"),
        config = require("common:widget/ui/config/config.js"),
        modelConfig = config.modelConfig,
        constant = require("common:widget/ui/constant/Constant.js"),
        toast = require("common:widget/ui/toast/toast.js"),
        mapUtil = require("common:widget/ui/mapUtil/mapUtil.js"),
        storer = require("common:widget/route/setMyPlace/SetMyPlaceStorer.js");
    storer.init();
    var imgUrl = "//webmap0.bdimg.com/wolfman/static/common/images/ui3/common-address_2efc8e8.png",
        imgUrlx2 = "//webmap0.bdimg.com/wolfman/static/common/images/ui3/common-addressx2_c6680ea.png",
        iconSize = new BMap.Size(21, 21),
        iconOffset = new BMap.Size(10, 10),
        iwOffset = new BMap.Size(10, 0),
        icons = {
            home: new BMap.Icon(imgUrl, iconSize, {
                anchor: iconOffset,
                imageSize: new BMap.Size(21, 84),
                imageOffset: new BMap.Size(0, 0),
                infoWindowOffset: iwOffset,
                srcSet: {
                    "2x": imgUrlx2
                }
            }),
            company: new BMap.Icon(imgUrl, iconSize, {
                anchor: iconOffset,
                imageSize: new BMap.Size(21, 84),
                imageOffset: new BMap.Size(0, 42),
                infoWindowOffset: iwOffset,
                srcSet: {
                    "2x": imgUrlx2
                }
            })
        },
        clickIcons = {
            home: new BMap.Icon(imgUrl, iconSize, {
                offset: iconOffset,
                imageOffset: new BMap.Size(0, 21),
                imageSize: new BMap.Size(21, 84),
                infoWindowOffset: iwOffset,
                srcSet: {
                    "2x": imgUrlx2
                }
            }),
            company: new BMap.Icon(imgUrl, iconSize, {
                offset: iconOffset,
                imageOffset: new BMap.Size(0, 63),
                imageSize: new BMap.Size(21, 84),
                infoWindowOffset: iwOffset,
                srcSet: {
                    "2x": imgUrlx2
                }
            })
        },
        isLogin = !1;
    window.ui3SetMyPlaceMarkers = window.ui3SetMyPlaceMarkers || {};
    var style = ".smp-content label{color:#333;padding-left:18px;position:relative}.smp-content .smp-field{margin:30px auto;text-align:center}.smp-content .label-home{position:absolute;left:0;top:-1px;width:13px;height:14px;background:url(//webmap1.bdimg.com/wolfman/static/common/images/ui3/tools/suggestion-icon_a0251d1.png) no-repeat 0 -40px}.smp-content .label-company{position:absolute;left:0;top:-1px;width:13px;height:14px;background:url(//webmap1.bdimg.com/wolfman/static/common/images/ui3/tools/suggestion-icon_a0251d1.png) no-repeat 0 -26px}.smp-content .smp-input{height:24px;width:212px;padding:0 10px;border:1px solid #d5d8dc;line-height:24px}.smp-content .smp-btns{text-align:center}.smp-content .smp-btns button{position:static;z-index:auto;top:auto;right:auto;border:1px solid #d5d8dc;background:#f8f9fc;width:88px;height:26px;cursor:pointer}.smp-content .smp-btns button:first-child{margin-right:10px}.smp-popup #popup_close{width:15px;height:14px;background:url(//webmap0.bdimg.com/wolfman/static/common/images/ui3/popup_close_a21f5f7.png) no-repeat 0 0;top:9px;right:8px}";
    require.loadCss({
        content: style,
        name: "ui3SetMyPlacePop"
    }), module.exports = {
        initialize: initialize,
        bundle: function() {
            return initialize("bundle")
        },
        storer: storer
    }
});