define("common:widget/com/DynamicBanner/DynamicBanner.js", function(require, exports, module) {
    var bannerStyle = ".leadDownloadCard .download-banner .download-img{float:left;margin:10px 19px 10px 16px}.leadDownloadCard .download-banner .title{padding-top:16px;margin-bottom:4px;line-height:28px;height:28px;font-size:20px;color:#000}.leadDownloadCard .download-banner .sub-title{line-height:16px;height:16px;font-size:16px;color:#666}.leadDownloadCard .download-banner{position:relative}.leadDownloadCard .download-banner .close-btn-download-banner,.trafficLeadDownloadCard .download-banner .close-btn-download-banner{position:absolute;width:20px;height:20px;line-height:20px;font-size:28px;text-align:center;display:block;cursor:pointer;right:6px;top:8px;color:#ccc}.leadDownloadCard .download-banner .close-btn-download-banner:hover,.trafficLeadDownloadCard .download-banner .close-btn-download-banner:hover{color:#6da1ea}.bus-trans-banner .leadDownloadCard,.nav-trans-banner .leadDownloadCard,.walk-trans-banner .leadDownloadCard,.bike-trans-banner .leadDownloadCard{border-top:1px solid #e4e6e7}.leadDownloadCard .qrcode-box{float:left;margin:10px 19px 10px 16px;width:60px;height:60px}";
    require.loadCss({
        content: bannerStyle,
        name: "transBanner"
    });
    var bannerConfigInfo = null,
        DynamicBanner = {
            SHARE_PROC_URL: "//j.map.baidu.com/",
            showDynamicBanner: function(opts) {
                opts = opts || {}, this.opts = opts;
                var jumpLink = opts.jumpLink || "",
                    bannerContainer = opts.bannerContainer || "",
                    urlImg = "https://map-mobile-opnimg.cdn.bcebos.com/7182c446d8c20307c7613a57cbf2168e.png",
                    defaultImg = opts.defaultImg || urlImg,
                    closeClickCB = opts.closeClickCB || function() {};
                if (jumpLink && bannerContainer) {
                    var transBanner = $(bannerContainer),
                        bannerDom = '<div class="leadDownloadCard"></div>',
                        wrapEl = T(bannerDom),
                        templateOfBanner = [function(_template_object) {
                            var _template_fun_array = [],
                                fn = function(__data__) {
                                    var _template_varName = "";
                                    for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                                    eval(_template_varName), _template_fun_array.push('<div class="download-banner">    <img src="', "undefined" == typeof qrcodeUrl ? "" : baidu.template._encodeHTML(qrcodeUrl), '" alt="二维码" width="60" height="60" class="download-img"/>    <div class="qrcode-box"></div>    <div>        <p class="title">扫码下载百度地图</p>        <p class="sub-title">', "undefined" == typeof subTitle ? "" : baidu.template._encodeHTML(subTitle), '</p>    </div>    <div class="close-btn-download-banner">×</div></div>'), _template_varName = null
                                }(_template_object);
                            return fn = null, _template_fun_array.join("")
                        }][0],
                        defaultImgDom = bannerContainer + " .leadDownloadCard .download-img";
                    this.renderQrCode(jumpLink, defaultImgDom);
                    var banner = templateOfBanner({
                        qrcodeUrl: defaultImg,
                        subTitle: "世界很复杂,百度地图更懂你"
                    });
                    wrapEl.append(banner);
                    var bannerDom = bannerContainer + " .leadDownloadCard";
                    if (!$(bannerDom).length) {
                        transBanner.append(wrapEl), $(defaultImgDom).hide();
                        var closeBtn = bannerContainer + " .close-btn-download-banner";
                        $(closeBtn).bind("click", function() {
                            $(bannerContainer).hide(), closeClickCB()
                        })
                    }
                    this.renderDynamicTitle(opts)
                }
            },
            _procCbk: function(n, e) {
                n && n.url && 0 !== n.url.indexOf("https") && (n.url = n.url.replace("http", "https"));
                var e = e || this.opts.bannerContainer + " .qrcode-box";
                if ($(e) && $(e).length) {
                    $(e).html(""); {
                        new QRCode(document.querySelector(e), {
                            text: n.url,
                            width: 60,
                            height: 60,
                            colorDark: "#000000",
                            colorLight: "#ffffff",
                            correctLevel: QRCode.CorrectLevel.H
                        })
                    }
                    $(e).show()
                }
            },
            renderQrCode: function(n, e, a) {
                try {
                    if (!n || !e) return;
                    var o = this,
                        a = a || this.opts.bannerContainer + " .qrcode-box";
                    n && baidu.jsonp(this.SHARE_PROC_URL + "?url=" + encodeURIComponent(n) + "&exp=1", function(n) {
                        n.code || !n.url ? ($(e).show(), $(a).hide()) : o._procCbk(n, a)
                    })
                } catch (t) {
                    "undefined" != typeof alog && alog("exception.fire", "catch", {
                        msg: t.message || t.description,
                        path: "common:widget/com/DynamicBanner/DynamicBanner.js",
                        ln: 127
                    })
                }
            },
            showStaticQrCode: function(n) {
                n = n || {};
                var e = n.bannerContainer || "";
                if (e) {
                    var a = e + " .qrcode-box";
                    $(a) && $(a).length && $(a).hide()
                }
            },
            saveConfigInfo: function(n) {
                n && (bannerConfigInfo = n)
            },
            getConfigInfo: function() {
                return bannerConfigInfo
            },
            renderDynamicTitle: function(n) {
                try {
                    if (!bannerConfigInfo) return;
                    var e = n.bannerContainer || "",
                        a = n.name || "",
                        o = $(e);
                    if (!$(e) || !$(e).length || !a) return;
                    o.hide();
                    var a = n.name || "";
                    if (bannerConfigInfo[a]) {
                        var t = bannerConfigInfo[a],
                            r = t.title || "",
                            l = t.subTitle || "",
                            d = $(e + " .title");
                        d && r.length && r && d.text(r);
                        var i = $(e + " .sub-title");
                        i && i.length && l && i.text(l)
                    }
                    o.show()
                } catch (c) {
                    "undefined" != typeof alog && alog("exception.fire", "catch", {
                        msg: c.message || c.description,
                        path: "common:widget/com/DynamicBanner/DynamicBanner.js",
                        ln: 183
                    })
                }
            }
        };
    module.exports = DynamicBanner
});