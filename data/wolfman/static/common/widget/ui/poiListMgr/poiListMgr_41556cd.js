define("common:widget/ui/poiListMgr/poiListMgr.js", function(require, exports, module) {
    var style = ".poilist-widget-container::-webkit-scrollbar{height:0!important}.poilist-widget-container{box-sizing:border-box;width:100%;position:fixed;bottom:2px;background-color:#fff;-webkit-transform:translateY(100%);-ms-transform:translateY(100%);transform:translateY(100%);-webkit-transition:-webkit-transform 1s;transition:transform 1s;padding-left:390px;z-index:3;background:transparent;pointer-events:none}.poilist-widget-container.show{-webkit-transform:translateY(0);-ms-transform:translateY(0);transform:translateY(0)}.poilist-widget-container .poilist-wrapper{box-shadow:1px 2px 1px rgba(0,0,0,.15)}.poilist-widget-container .h-flexbox{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-box-pack:justify;-webkit-box-align:center;-webkit-box-lines:single;display:-webkit-flex;-webkit-flex-direction:row;-webkit-align-items:stretch;-webkit-align-content:flex-start;-webkit-flex-wrap:nowrap}.poilist-widget-container .poilist{pointer-events:auto;padding:18px 15px 16px;overflow-x:scroll;overflow-y:hidden;background:#fff}.poilist-widget-container .poilist::-webkit-scrollbar{height:0!important}.poilist-widget-container .poilist-item.active{border:2px solid #37F}.poilist-widget-container .poilist-item{cursor:pointer;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;width:138px;height:170px;overflow:hidden;border:1px solid #ECECEC;border-radius:5px;overflow:hidden;margin:0 5px}.poilist-widget-container .poilist-item .h-image{width:138px;height:87px}.poilist-widget-container .poilist-item .top{margin-top:9px;position:relative}.poilist-widget-container .poilist-item .number{position:absolute;top:0;left:0;-webkit-transform:scale(0.5);-ms-transform:scale(0.5);transform:scale(0.5);-webkit-transform-origin:top left;-ms-transform-origin:top left;transform-origin:top left}.poilist-widget-container .poilist-item .name{padding:0 20px;font-size:14px;color:#11141A;font-weight:700}.poilist-widget-container .poilist-item .addr{padding:0 20px}.poilist-widget-container .poilist-item .score{margin:3px 0 0 20px;background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/star_a58455e.png);width:61px;height:11px;display:inline-block;background-position:0 -14px}.poilist-widget-container .poilist-item .score:hover{text-decoration:none}.poilist-widget-container .poilist-item .score b{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/star_a58455e.png);width:61px;height:11px;display:inline-block}.poilist-widget-container .poilist-item .score b:hover{text-decoration:none}.poilist-widget-container .poilist-item .bottom{margin:3px 0 0 20px;font-size:12px;color:#878D99}.poilist-widget-container .poilist-item .split{display:inline-block;height:8px;width:1px;background:#E9E9E9}.poilist-widget-container .text-overflow{text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.poilist-widget-container .no-1{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/markers_new2_7621a9c.png);width:18px;height:27px;display:inline-block;margin-left:6px;margin-top:4px;background-position:0 -139px}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){.poilist-widget-container .no-1{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/markers_new2x_2960fb4.png);width:18px;height:27px;display:inline-block;background-size:300px,auto}.poilist-widget-container .no-1:hover{text-decoration:none}}.poilist-widget-container .no-1:hover{text-decoration:none}.poilist-widget-container .no-2{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/markers_new2_7621a9c.png);width:18px;height:27px;display:inline-block;margin-left:6px;margin-top:4px;background-position:-18px -139px}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){.poilist-widget-container .no-2{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/markers_new2x_2960fb4.png);width:18px;height:27px;display:inline-block;background-size:300px,auto}.poilist-widget-container .no-2:hover{text-decoration:none}}.poilist-widget-container .no-2:hover{text-decoration:none}.poilist-widget-container .no-3{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/markers_new2_7621a9c.png);width:18px;height:27px;display:inline-block;margin-left:6px;margin-top:4px;background-position:-36px -139px}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){.poilist-widget-container .no-3{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/markers_new2x_2960fb4.png);width:18px;height:27px;display:inline-block;background-size:300px,auto}.poilist-widget-container .no-3:hover{text-decoration:none}}.poilist-widget-container .no-3:hover{text-decoration:none}.poilist-widget-container .no-4{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/markers_new2_7621a9c.png);width:18px;height:27px;display:inline-block;margin-left:6px;margin-top:4px;background-position:-54px -139px}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){.poilist-widget-container .no-4{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/markers_new2x_2960fb4.png);width:18px;height:27px;display:inline-block;background-size:300px,auto}.poilist-widget-container .no-4:hover{text-decoration:none}}.poilist-widget-container .no-4:hover{text-decoration:none}.poilist-widget-container .no-5{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/markers_new2_7621a9c.png);width:18px;height:27px;display:inline-block;margin-left:6px;margin-top:4px;background-position:-72px -139px}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){.poilist-widget-container .no-5{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/markers_new2x_2960fb4.png);width:18px;height:27px;display:inline-block;background-size:300px,auto}.poilist-widget-container .no-5:hover{text-decoration:none}}.poilist-widget-container .no-5:hover{text-decoration:none}.poilist-widget-container .no-6{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/markers_new2_7621a9c.png);width:18px;height:27px;display:inline-block;margin-left:6px;margin-top:4px;background-position:-90px -139px}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){.poilist-widget-container .no-6{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/markers_new2x_2960fb4.png);width:18px;height:27px;display:inline-block;background-size:300px,auto}.poilist-widget-container .no-6:hover{text-decoration:none}}.poilist-widget-container .no-6:hover{text-decoration:none}.poilist-widget-container .no-7{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/markers_new2_7621a9c.png);width:18px;height:27px;display:inline-block;margin-left:6px;margin-top:4px;background-position:-108px -139px}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){.poilist-widget-container .no-7{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/markers_new2x_2960fb4.png);width:18px;height:27px;display:inline-block;background-size:300px,auto}.poilist-widget-container .no-7:hover{text-decoration:none}}.poilist-widget-container .no-7:hover{text-decoration:none}.poilist-widget-container .no-8{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/markers_new2_7621a9c.png);width:18px;height:27px;display:inline-block;margin-left:6px;margin-top:4px;background-position:-126px -139px}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){.poilist-widget-container .no-8{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/markers_new2x_2960fb4.png);width:18px;height:27px;display:inline-block;background-size:300px,auto}.poilist-widget-container .no-8:hover{text-decoration:none}}.poilist-widget-container .no-8:hover{text-decoration:none}.poilist-widget-container .no-9{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/markers_new2_7621a9c.png);width:18px;height:27px;display:inline-block;margin-left:6px;margin-top:4px;background-position:-144px -139px}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){.poilist-widget-container .no-9{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/markers_new2x_2960fb4.png);width:18px;height:27px;display:inline-block;background-size:300px,auto}.poilist-widget-container .no-9:hover{text-decoration:none}}.poilist-widget-container .no-9:hover{text-decoration:none}.poilist-widget-container .no-10{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/markers_new2_7621a9c.png);width:18px;height:27px;display:inline-block;margin-left:6px;margin-top:4px;background-position:-162px -139px}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){.poilist-widget-container .no-10{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/markers_new2x_2960fb4.png);width:18px;height:27px;display:inline-block;background-size:300px,auto}.poilist-widget-container .no-10:hover{text-decoration:none}}.poilist-widget-container .no-10:hover{text-decoration:none}.poilist-widget-container .no-11{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/markers_new2_7621a9c.png);width:18px;height:27px;display:inline-block;margin-left:6px;margin-top:4px;background-position:-180px -139px}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){.poilist-widget-container .no-11{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/markers_new2x_2960fb4.png);width:18px;height:27px;display:inline-block;background-size:300px,auto}.poilist-widget-container .no-11:hover{text-decoration:none}}.poilist-widget-container .no-11:hover{text-decoration:none}.poilist-widget-container .no-12{background-image:url(//webmap0.bdimg.com/wolfman/static/common/images/markers_new2_7621a9c.png);width:18px;height:27px;display:inline-block;margin-left:6px;margin-top:4px;background-position:-198px -139px}@media only screen and (-webkit-min-device-pixel-ratio:2),(-webkit-min-device-pixel-ratio:2),(min-resolution:2dppx),(min-resolution:192dpi){.poilist-widget-container .no-12{background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/markers_new2x_2960fb4.png);width:18px;height:27px;display:inline-block;background-size:300px,auto}.poilist-widget-container .no-12:hover{text-decoration:none}}.poilist-widget-container .no-12:hover{text-decoration:none}",
        searchUtil = require("common:widget/search/SearchUtil.js"),
        NOPIC = "//webmap1.bdimg.com/wolfman/static/common/images/nopic_96d29d1.gif";
    require.loadCss({
        content: style,
        name: "poiListMgr"
    });
    var poiListMgr = {
        init: function() {
            this.data = [], this.tpl = [function(_template_object) {
                var _template_fun_array = [],
                    fn = function(__data__) {
                        var _template_varName = "";
                        for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                        eval(_template_varName), _template_fun_array.push('<div class="poilist-widget-container">    <div class="poilist-wrapper">        <ul class="poilist h-flexbox"></ul>    </div></div>'), _template_varName = null
                    }(_template_object);
                return fn = null, _template_fun_array.join("")
            }][0], this.caterItemTpl = [function(_template_object) {
                var _template_fun_array = [],
                    fn = function(__data__) {
                        var _template_varName = "";
                        for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                        eval(_template_varName), _template_fun_array.push('<li class="poilist-caterItem poilist-item" data-index=', "undefined" == typeof index ? "" : index, '>    <img class="h-image" src="', "undefined" == typeof hImage ? "" : hImage, '">    <div class="h-flexbox top">        <a href="javascript:void(0)" class="number no-', "undefined" == typeof(index + 1) ? "" : index + 1, '"></a>        <div class="name text-overflow" >', "undefined" == typeof name ? "" : name, '</div>    </div>    <div>        <span class="score">            <b style="width:', "undefined" == typeof scoreWidth ? "" : scoreWidth, 'px"></b>        </span>    </div>    <div class="bottom">        '), price && _template_fun_array.push("            <span>人均", "undefined" == typeof unescape("%A5") ? "" : unescape("%A5"), '</span><span class="d-red">', "undefined" == typeof price ? "" : price, '</span>            <i class="split"></i>        '), _template_fun_array.push("        ", "undefined" == typeof tag ? "" : tag, "    </div></li>"), _template_varName = null
                    }(_template_object);
                return fn = null, _template_fun_array.join("")
            }][0], this.scopeItemTpl = [function(_template_object) {
                var _template_fun_array = [],
                    fn = function(__data__) {
                        var _template_varName = "";
                        for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                        eval(_template_varName), _template_fun_array.push('<li class="poilist-scopeItem poilist-item" data-index=', "undefined" == typeof index ? "" : index, '>    <img class="h-image" src="', "undefined" == typeof hImage ? "" : hImage, '">    <div class="h-flexbox top">        <a href="javascript:void(0)" class="number no-', "undefined" == typeof(index + 1) ? "" : index + 1, '"></a>        <div class="name text-overflow" >', "undefined" == typeof name ? "" : name, '</div>    </div>    <div>        <span class="score">            <b style="width:', "undefined" == typeof scoreWidth ? "" : scoreWidth, 'px"></b>        </span>    </div>    <div class="bottom">        <span>            '), score && _template_fun_array.push('            <span class="d-red">', "undefined" == typeof score ? "" : score, "</span>            "), _template_fun_array.push("            "), score && standard && _template_fun_array.push('            <i class="split"></i>            '), _template_fun_array.push("            ", "undefined" == typeof standard ? "" : standard, "        </span>    </div></li>"), _template_varName = null
                    }(_template_object);
                return fn = null, _template_fun_array.join("")
            }][0], this.commonItemTpl = [function(_template_object) {
                var _template_fun_array = [],
                    fn = function(__data__) {
                        var _template_varName = "";
                        for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                        eval(_template_varName), _template_fun_array.push('<li class="poilist-car4sItem poilist-item" data-index=', "undefined" == typeof index ? "" : index, '>    <img class="h-image" src="', "undefined" == typeof hImage ? "" : hImage, '">    <div class="h-flexbox top">        <a href="javascript:void(0)" class="number no-', "undefined" == typeof(index + 1) ? "" : index + 1, '"></a>        <div class="name text-overflow" >', "undefined" == typeof name ? "" : name, '</div>    </div>       <div class="text-overflow">        '), addr && _template_fun_array.push('        <span class="addr">', "undefined" == typeof addr ? "" : addr, "</span>        "), _template_fun_array.push('    </div>    <div class="bottom">        '), tels && _template_fun_array.push('        <div class="text-overflow">电话:', "undefined" == typeof tels ? "" : tels, "</div>        "), _template_fun_array.push("    </div></li>"), _template_varName = null
                    }(_template_object);
                return fn = null, _template_fun_array.join("")
            }][0], this.bindEvent(), this.rendered = !1, this.curSelectIndex = -1
        },
        bindEvent: function() {
            listener.on("poisearch", "poidetailshow", this.onPoiDetailShow, this), listener.on("app", "reset", this.remove, this)
        },
        onPoiDetailShow: function(i, e) {
            var t = e && e.uid;
            if (t && this.data && this.data.length) return this.rendered ? void this.select(t) : void this.render(t)
        },
        setData: function(i) {
            this.clear(), this.data = i
        },
        render: function(i) {
            try {
                if (!this.data || !this.data.length) return;
                var e = this.generateList(),
                    t = this.tpl();
                this.container = $(t), $("#app").append(this.container), this.container.find(".poilist").append(e), this.container.addClass("show"), this.rendered = !0, this.select(i), this.moveMapOp("up"), this.bindDomEvent()
            } catch (n) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: n.message || n.description,
                    path: "common:widget/ui/poiListMgr/poiListMgr.js",
                    ln: 82
                })
            }
        },
        bindDomEvent: function() {
            var i = this;
            this.container.on("click", ".poilist-item", function() {
                var e = +$(this).data("index");
                i.selectByIndex(e);
                var t = i.data[e];
                t.select()
            })
        },
        unHighlightMarkers: function() {
            for (var i = 0; i < this.data.length; i++) {
                var e = this.data[i];
                e.unhighlightMarker()
            }
        },
        generateList: function() {
            for (var i = [], e = 0; e < this.data.length; e++) {
                var t = this.data[e].data,
                    n = this.generateItem(t, e);
                n && i.push(n)
            }
            return i.join("")
        },
        generateItem: function(i, e) {
            if (searchUtil.isCater(i)) {
                var t = this.getCaterData(i, e);
                return this.caterItemTpl(t)
            }
            if (searchUtil.isScenery(i)) {
                var t = this.getScopeData(i, e);
                return this.scopeItemTpl(t)
            }
            var t = this.getCommonData(i, e);
            return this.commonItemTpl(t)
        },
        getCommonData: function(i, e) {
            var t = i.name || "",
                n = i.addr || "",
                a = i.ext || {},
                o = a.detail_info,
                r = o.image ? o.image : NOPIC,
                s = i.tel || "",
                p = null;
            return o.overall_rating && (p = Math.round(61 * o.overall_rating / 5)), {
                name: t,
                addr: n,
                hImage: r,
                tels: s,
                scoreWidth: p,
                index: e
            }
        },
        getScopeData: function(item, index) {
            var name = item.name || "",
                ext = item.ext || {},
                placeDetail = ext.detail_info,
                hImage = placeDetail.image ? placeDetail.image : NOPIC,
                scoreWidth = Math.round(61 * placeDetail.overall_rating / 5),
                placeDetail = ext.detail_info || {},
                vsContent = placeDetail.vs_content || {},
                invisible = vsContent.invisible || {},
                scoreData = invisible.bigdata || {},
                score = "";
            if (eval(scoreData.showtag) instanceof Array) {
                var tagArr = eval(scoreData.showtag)[0] || [],
                    tag = tagArr[0] || "";
                score = tag
            }
            var standard = "";
            return placeDetail.std_tag ? (standard = placeDetail.std_tag.split(";").reverse()[0] || "", "其他" === standard && (standard = placeDetail.std_tag.split(";").reverse()[1] || "")) : standard = model.tag ? model.tag.split(" ").reverse()[0] || "" : "", {
                name: name,
                hImage: hImage,
                scoreWidth: scoreWidth,
                score: score,
                standard: standard,
                index: index
            }
        },
        getCaterData: function(i, e) {
            var t = i.name || "",
                n = i.ext || {},
                a = n.detail_info,
                o = a.image ? a.image : NOPIC,
                r = Math.round(61 * a.overall_rating / 5),
                s = a.tag || "",
                p = a.price;
            return {
                name: t,
                hImage: o,
                scoreWidth: r,
                tag: s,
                price: p,
                index: e
            }
        },
        select: function(i) {
            var e = this.data;
            if (this.data && this.data.length) {
                for (var t = -1, n = 0; n < e.length; n++)
                    if (i === e[n].data.uid) {
                        t = n;
                        break
                    }
                this.selectByIndex(t)
            }
        },
        selectByIndex: function(i) {
            var e = this.container.find(".poilist").children();
            if (e && i !== this.curSelectIndex) {
                if (-1 !== this.curSelectIndex) {
                    var t = e[this.curSelectIndex];
                    $(t).removeClass("active")
                }
                this.curSelectIndex = i, -1 !== i && ($(e[i]).addClass("active"), this.scroll(i))
            }
        },
        scroll: function(i) {
            var e = this.container.find(".poilist"),
                t = e.width(),
                n = e.offset(),
                a = $(e.children()[i]);
            if (a) {
                var o = a.offset(),
                    r = a.width(),
                    s = o.left - t / 2 - n.left + r / 2;
                e[0].scrollTo ? e[0].scrollTo(s + e[0].scrollLeft, 0) : e[0].scrollLeft = s + e[0].scrollLeft
            }
        },
        clear: function() {
            this.rendered = !1, this.curSelectIndex = -1, this.data = [], this.container && (this.container.remove(), this.container = null), this.moveMapOp("down")
        },
        isShow: function() {
            return this.rendered
        },
        moveMapOp: function(i) {
            var e = $("#map-operate"),
                t = $("#newuilogo");
            return "up" === i ? (e.css("bottom", "260px"), t.css("bottom", "215px"), void window.scaleCtrl.setOffset(new BMap.Size(110, 216))) : (e.css("bottom", ""), t.css("bottom", ""), void window.scaleCtrl.setOffset(new BMap.Size(110, 6)))
        }
    };
    module.exports = poiListMgr
});