define("common:widget/ui/ui3MapSuggest/downloadBanner.js", function(require, exports, module) {
    function RouteNavDownloadBannerCard(e) {
        e = e || {}, e.padding = 0, Card.call(this, e), this.canNotFold = !0, this.canNotReturn = !0
    }
    var Card = require("common:widget/ui/card/Card.js"),
        searchbox = require("common:widget/ui/searchBox/searchBox.js"),
        DynamicBanner = require("common:widget/com/DynamicBanner/DynamicBanner.js"),
        tmpl = [function(_template_object) {
            var _template_fun_array = [],
                fn = function(__data__) {
                    var _template_varName = "";
                    for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                    eval(_template_varName), _template_fun_array.push('<div class="download-banner">    <img src="', "undefined" == typeof qrcodeUrl ? "" : baidu.template._encodeHTML(qrcodeUrl), '" alt="二维码" width="60" height="60" class="download-img"/>    <div class="qrcode-box"></div>    <div>        <p class="title">扫码下载百度地图</p>        <p class="sub-title">', "undefined" == typeof subTitle ? "" : baidu.template._encodeHTML(subTitle), '</p>    </div>    <div class="close-btn-download-banner">×</div></div>'), _template_varName = null
                }(_template_object);
            return fn = null, _template_fun_array.join("")
        }][0],
        style = ".leadDownloadCard .download-banner .download-img{float:left;margin:10px 19px 10px 16px}.leadDownloadCard .download-banner .title{padding-top:16px;margin-bottom:4px;line-height:28px;height:28px;font-size:20px;color:#000}.leadDownloadCard .download-banner .sub-title{line-height:16px;height:16px;font-size:16px;color:#666}.leadDownloadCard .download-banner{position:relative}.leadDownloadCard .download-banner .close-btn-download-banner,.trafficLeadDownloadCard .download-banner .close-btn-download-banner{position:absolute;width:20px;height:20px;line-height:20px;font-size:28px;text-align:center;display:block;cursor:pointer;right:6px;top:8px;color:#ccc}.leadDownloadCard .download-banner .close-btn-download-banner:hover,.trafficLeadDownloadCard .download-banner .close-btn-download-banner:hover{color:#6da1ea}.bus-trans-banner .leadDownloadCard,.nav-trans-banner .leadDownloadCard,.walk-trans-banner .leadDownloadCard,.bike-trans-banner .leadDownloadCard{border-top:1px solid #e4e6e7}.leadDownloadCard .qrcode-box{float:left;margin:10px 19px 10px 16px;width:60px;height:60px}";
    require.loadCss({
        content: style,
        name: "routeNavdownloadBanner"
    });
    var bannerConfigTable = {
        bus: {
            subTitle: "查看公交到站时间",
            imgUrl: "//webmap0.bdimg.com/wolfman/static/common/images/qrcode-download/bus-map-dowload-test_773fc46.png"
        },
        drive: {
            subTitle: "语音交互更方便",
            imgUrl: "//webmap0.bdimg.com/wolfman/static/common/images/qrcode-download/car-map-dowload-test_7270b12.png"
        },
        walk: {
            subTitle: "体验AR导航",
            imgUrl: "//webmap0.bdimg.com/wolfman/static/common/images/qrcode-download/walk-map-dowload-test_749dffd.png"
        },
        bike: {
            subTitle: "世界很复杂，百度地图更懂你",
            imgUrl: "//webmap0.bdimg.com/wolfman/static/common/images/qrcode-download/ride-map-dowload-test_92ce50f.png"
        }
    };
    T.inherits(RouteNavDownloadBannerCard, Card, "RouteNavDownloadBannerCard"), T.extend(RouteNavDownloadBannerCard.prototype, {
        render: function() {
            try {
                var e = '<div class="route-search-banner leadDownloadCard"></div>',
                    a = this.getSubTitle(),
                    n = this.getQrCodeUrl(),
                    o = {
                        qrcodeUrl: n,
                        subTitle: a
                    },
                    r = T(e);
                return r.append(tmpl(o)), r
            } catch (t) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: t.message || t.description,
                    path: "common:widget/ui/ui3MapSuggest/downloadBanner.js",
                    ln: 46
                })
            }
        },
        initialize: function() {
            try {
                DynamicBanner.showStaticQrCode({
                    bannerContainer: ".route-search-banner"
                });
                var e = this.getConfigName();
                DynamicBanner.renderDynamicTitle({
                    name: e,
                    bannerContainer: ".route-search-banner"
                }), $(".route-search-banner").on("click", ".close-btn-download-banner", function() {
                    $(".route-search-banner").hide()
                }), listener.on("searchbox.routeTypeChange", "click", function() {
                    if ($(".route-search-banner") && $(".route-search-banner").length) {
                        var e = this.getSubTitle(),
                            a = this.getQrCodeUrl(),
                            n = $("#cards-level1 .card .route-search-banner .download-banner .sub-title");
                        n && n.text(e);
                        var o = this.getConfigName();
                        DynamicBanner.renderDynamicTitle({
                            name: o,
                            bannerContainer: ".route-search-banner"
                        });
                        var r = $("#cards-level1 .card .route-search-banner .download-banner .download-img");
                        r && r.attr("src", a)
                    }
                }, this)
            } catch (a) {
                "undefined" != typeof alog && alog("exception.fire", "catch", {
                    msg: a.message || a.description,
                    path: "common:widget/ui/ui3MapSuggest/downloadBanner.js",
                    ln: 79
                })
            }
        },
        getSubTitle: function() {
            var e = $("#route-searchbox-content");
            if (!e) return bannerConfigTable.bike.subTitle;
            for (key in bannerConfigTable)
                if (e.hasClass(key)) return bannerConfigTable[key].subTitle;
            return bannerConfigTable.bike.subTitle
        },
        getConfigName: function() {
            var e = $("#route-searchbox-content");
            if (!e) return "suggest";
            var a = {
                bus: "busSearch",
                drive: "driveSearch",
                walk: "walkSearch",
                bike: "rideSearch"
            };
            for (key in a)
                if (e.hasClass(key)) return a[key];
            return "suggest"
        },
        getQrCodeUrl: function() {
            var e = $("#route-searchbox-content"),
                a = "//webmap1.bdimg.com/wolfman/static/common/images/qrcode-download/index-map-dowload-test_e676ccd.png";
            if (!e) return a;
            for (key in bannerConfigTable)
                if (e.hasClass(key)) return bannerConfigTable[key].imgUrl;
            return a
        }
    }), module.exports = RouteNavDownloadBannerCard
});