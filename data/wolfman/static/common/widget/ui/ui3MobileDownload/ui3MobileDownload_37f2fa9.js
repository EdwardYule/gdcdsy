define("common:widget/ui/ui3MobileDownload/ui3MobileDownload.js", function(require, exports, module) {
    var POPUP_ANCHOR_MAP_CENTER = 1,
        POPUP_ANCHOR_WINDOW_CENTER = 2,
        style = ".moContainer{overflow:hidden;width:660px;position:relative}.moContainerSuccess{width:660px;position:relative}.pc .moContainer{font-family:'Microsoft YaHei'}.moLeft{padding:5px 5px 0;float:left}.dimensionalCode{position:absolute;width:130px;height:130px;right:30px;bottom:78px}.pc .dimensionalCodeTi{font-family:Arial,Helvetica,SimSun,sans-serif}.dimensionalCodeTip{position:absolute;font-size:12px;color:#999;right:35px;bottom:64px;line-height:20px}.moCenterTipImg{position:absolute;left:101px;top:98px;background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/pcmoindex_677045c.png);background-position:0 -86px;width:23px;height:23px}.moSmsMethod{float:left;padding:0 22px 0 40px;width:158px}.moCodeMethod{float:left;padding:0 30px;border-left:#f2f2f2 1px solid}.moWebMethod{float:left;padding:0 40px 0 22px;width:158px}.moSmsNo{padding:18px 0 0}.moSmsInput{vertical-align:middle;width:153px;height:24px;border:#e6e6e6 2px solid;font-size:12px;color:#666;line-height:24px}.moSmsBtnContainer{padding:10px 0 0}.moSmsBtn{display:block;background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/pcmoindex_677045c.png);background-position:-35px -69px;width:68px;height:33px}.moSmsBtn:hover{display:block;background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/pcmoindex_677045c.png);background-position:-104px -69px;width:68px;height:33px}.moMethodImg{padding:13px 0 0;text-align:center}.moBackBtn{position:absolute;right:152px;bottom:24px;background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/pcmoindex_677045c.png);background-position:-18px -69px;width:16px;height:16px}.moBtnCur{display:inline-block;background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/pcmoindex_677045c.png);background-position:-2px -109px;width:6px;height:6px}.moBtnUnCur{display:inline-block;background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/pcmoindex_677045c.png);background-position:-14px -109px;width:6px;height:6px}.moPptBtnContainer{float:right;padding:0 15px 0 0}.moverifycode{width:94px;vertical-align:middle;border:#e6e6e6 2px solid;height:24px;font-size:12px;color:#666;line-height:24px}.moSmsBtnContainer img{vertical-align:middle;width:43px;height:28px;margin-left:5px}.errorTip{color:#e60012}.moImgContainer{padding:38px 0 0 10px;width:143px;overflow:hidden}.moRight{float:left;padding:50px 0 0}.moTitle{font-size:30px;color:#333}.moSlogan{padding:10px 0 20px;font-size:18px;color:#74a2f2}.moLeft img{width:255px;height:398px;display:block}.moRecContentList{width:220px;max-height:118px;min-height:75px;font-size:13px;color:#777;line-height:20px;padding-left:5px;overflow:hidden}.moRecContentList em{float:left;display:inline-block;height:5px;width:5px;background:url(//webmap1.bdimg.com/wolfman/static/common/images/pcmoindex_677045c.png) 0 -121px;position:relative;top:8px}.moRecContentList div{margin-left:10px}.andriodDownload{padding:16px 0 0;position:relative;width:127px}.andriodVersion{position:absolute;top:14px;right:-1px;width:25px;height:26px;z-index:20}.andriodDownloadBtn{display:block;background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/pcmoindex_677045c.png);background-position:-1px -1px;width:127px;height:33px}.andriodDownloadBtn:hover{display:block;background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/pcmoindex_677045c.png);background-position:-129px -1px;width:127px;height:33px}.pc .moTextTip{font-family:Arial,Helvetica,SimSun,sans-serif}.moTextTip{font-size:12px;color:#999;line-height:24px}.moTextTip a{text-decoration:none}.moTextTip a:hover{text-decoration:underline}.iphoneDownload{padding:15px 0 0;position:relative;width:127px}.iphoneVersion{position:absolute;top:13px;right:-1px;width:25px;height:26px;z-index:20}.iphoneDownloadBtn{display:block;background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/pcmoindex_677045c.png);background-position:-1px -35px;width:127px;height:33px}.iphoneDownloadBtn:hover{display:block;background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/pcmoindex_677045c.png);background-position:-129px -35px;width:127px;height:33px}.moGoBtn{position:absolute;right:24px;bottom:-29px;background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/pcmoindex_677045c.png);background-position:-1px -69px;width:16px;height:16px}.moContainer .moGoBtn{bottom:27px}.moContainer .moGoBtnTip{bottom:27px}.pc .moGoBtnTip{font-family:Arial,Helvetica,SimSun,sans-serif}.moGoBtnTip{position:absolute;right:52px;bottom:-29px;font-size:12px;color:#e6e6e6}.moGoBtnTip a{text-decoration:none;color:#3d6dcc}.moGoBtnTip a:hover{text-decoration:underline;color:#3d6dcc}.moCenter{font-size:30px;color:#333;text-align:center;padding:45px 0 0}.moCenterTip{padding:11px 0 38px 131px;font-size:13px;color:#999}.moCenterTip a{text-decoration:none}.moCenterTip a:hover{text-decoration:underline}.moCenterTipImg{position:absolute;left:101px;top:98px;background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/pcmoindex_677045c.png);background-position:0 -86px;width:23px;height:23px}.moSmsMethod{float:left;padding:0 22px 0 40px;_padding:0 22px 0 40px;width:158px}.moWebMethod{float:left;padding:0 40px 0 22px;_padding:0 40px 0 22px;width:158px}.moMethodFirstLine{font-size:13px;color:#666;line-height:20px}.moMethodFirstLine .moMethodSpan{color:#74a2f2}.moMethodFirstLine .moMethodTip{color:#999}.moSmsNo{padding:18px 0 0}.moSmsInput{vertical-align:middle;width:153px;height:24px;border:#e6e6e6 2px solid;font-size:12px;color:#666;line-height:24px}.moSmsBtnContainer{padding:10px 0 0}.moMethodImg{padding:13px 0 0;text-align:center}.moBackBtn{position:absolute;right:152px;bottom:24px;background-image:url(//webmap1.bdimg.com/wolfman/static/common/images/pcmoindex_677045c.png);background-position:-18px -69px;width:16px;height:16px}.moPptContainer{width:2000px}.moPptContainer li{float:left}.moverifycode{width:94px;vertical-align:middle;border:#e6e6e6 2px solid;height:24px;font-size:12px;color:#666;line-height:24px}.errorTip{color:#e60012}.starBg{padding-right:5px;width:250px;height:395px}.moDownloadMethod{padding-left:73px}";
    require.loadCss({
        content: style,
        name: "ui3MobileDownload"
    });
    var ui3MobileDownload = {
        VCODE_URL: "/v",
        SEND_URL: "/ag/sms/send_sms/",
        vcode: "",
        openPop: function(opData) {
            var template = [function(_template_object) {
                    var _template_fun_array = [],
                        fn = function(__data__) {
                            var _template_varName = "";
                            for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                            eval(_template_varName), _template_fun_array.push('<div id="moContainerId" class="moContainer cf"><div class="moLeft">        <img src="', "undefined" == typeof background_png ? "" : background_png, '" alt="百度地图" /></div><div class="moRight"><div class="moTitle">', "undefined" == typeof title ? "" : title, '</div><div class="moSlogan">', "undefined" == typeof subTitle ? "" : subTitle, '</div><ul class="moRecContentList">            ');
                            for (var i = 0; i < contentList.length; i++) _template_fun_array.push("    <li><em></em><div>", "undefined" == typeof contentList[i] ? "" : contentList[i], "</div></li>            ");
                            _template_fun_array.push('</ul><div class="andriodDownload"><a class="andriodDownloadBtn" href="https://newclient.map.baidu.com/client/mapappdownload?app=map&qudao=', "undefined" == typeof qudao ? "" : qudao, '" target="andriodApk" title="点击将安装包下载到电脑，通过数据线安装到手机"></a><img class="andriodVersion" src="', "undefined" == typeof version_img_andriod ? "" : version_img_andriod, '" width="25" height="26" /></div><div class="iphoneDownload"><a class="iphoneDownloadBtn" href="http://itunes.apple.com/cn/app/id452186370?ls=1&mt=8" title="点击前往苹果官方商店下载" target="_blank"></a><img class="iphoneVersion" src="', "undefined" == typeof version_img_iphone ? "" : version_img_iphone, '" width="25" height="26" /></div><div class="moTextTip">在AppStore搜索“百度地图”</div><div class="dimensionalCode"><img src="', "undefined" == typeof code ? "" : code, '" alt="二维码" width="130" height="130"/></div><div class="dimensionalCodeTip">扫描二维码&nbsp;轻松下载</div></div></div>'), _template_varName = null
                        }(_template_object);
                    return fn = null, _template_fun_array.join("")
                }][0],
                html = template({
                    title: opData.tctitle,
                    version_img_andriod: opData.versionAndriodImg,
                    version_img_iphone: opData.versionIphoneImg,
                    qudao: opData.qudao,
                    subTitle: opData.subTitle || "出门就靠百度地图!",
                    background_png: opData.backgroundImg,
                    contentList: opData.contentList,
                    code: "http://qrcode.map.baidu.com/?url=http://map.baidu.com/zt/y2015/mapdownload/?qd=" + opData.qudao
                });
            this._open(html, opData)
        },
        openDownloadPop: function(data) {
            data.hideReturn = 1;
            var template = [function(_template_object) {
                var _template_fun_array = [],
                    fn = function(__data__) {
                        var _template_varName = "";
                        for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                        eval(_template_varName), _template_fun_array.push('<div id="moContainerId" class="moContainerSuccess cf"><div class="moCenter">感谢您使用百度手机地图</div><div class="moCenterTip">下载会在几秒内自动开始，如浏览器长时间没有响应，请点击<a href="https://newclient.map.baidu.com/client/mapappdownload?app=map&qudao=', "undefined" == typeof qudao ? "" : qudao, '" target="andriodApk" title="点击将安装包下载到电脑，通过数据线安装到手机">重新下载</a></div><div class="moCenterTipImg"></div><div class="moDownloadMethod cf"><div class="moSmsMethod"><div class="moMethodFirstLine"><span class="moMethodSpan">方式一：</span>发送免费短信下载</div><div class="moSmsNo"><input name="moNo" maxlength="11" id="moNoId" type="input" class="moSmsInput" value="请输入手机号"/></div><div class="moSmsBtnContainer"><input name="moVerifycode" id="moVerifycodeId" class="moverifycode" maxlength="4" value="请输入验证码"/><img id="moVerifyImgId" class="verify" alt="点击刷新" title="点击刷新"></div><div class="moSmsBtnContainer"><a id="sendToMobileId" class="moSmsBtn" href="#"></a></div><div class="moSmsBtnContainer errorTip" id="sendToMobileTipId"></div></div><div class="moCodeMethod"><div class="moMethodFirstLine"><span>方式二：</span>扫描二维码下载<br /><span class="moMethodTip">推荐使用<span class="n-blue">手机百度app</span>扫二维码即可下载</span></div><div class="moMethodImg"><img src="http://qrcode.map.baidu.com/?url=http://map.baidu.com/zt/y2015/mapdownload/?qd=', "undefined" == typeof qudao ? "" : qudao, '" alt="二维码" width="130" height="130"/></div></div><div class="moGoBtn"></div><div class="moGoBtnTip"><a href="javascript:void(0);" onclick="addStat(&#39;downloadapp.infowin.backbtn&#39;);PcToMobile.open(&#39;IMG&#39;, &#39;后退&#39;);" style="', "undefined" == typeof(hideReturn ? "display:none" : "") ? "" : hideReturn ? "display:none" : "", '" >返回</a></div><div class="moBackBtn" style="', "undefined" == typeof(hideReturn ? "display:none" : "") ? "" : hideReturn ? "display:none" : "", '"></div></div></div>'), _template_varName = null
                    }(_template_object);
                return fn = null, _template_fun_array.join("")
            }][0];
            html = template(data), this._open(html), this.sendToMobile(data)
        },
        _open: function(o, i) {
            var e = this,
                t = {
                    content: o,
                    isTitle: !1,
                    extClass: "mo-popup",
                    height: 412,
                    width: 674,
                    defaultAnchor: POPUP_ANCHOR_WINDOW_CENTER,
                    clickClose: !1,
                    closeButton: '<button class="mo-close" title="关闭"></button>',
                    close: function() {
                        T("#mapmask").remove(), i && addStat("op-banner-" + i.opid + "-close", "click", {})
                    }
                };
            require.async("common:widget/ui/Popup/Popup.js", function(o) {
                var n = new o(t);
                n.render(), n.dialog(n), T(n.content).delegate(".andriodDownloadBtn,.iphoneDownloadBtn", "click", function() {
                    n.close(), e.openDownloadPop(i);
                    var o = T(this);
                    o.hasClass("andriodDownloadBtn") ? addStat("op-banner-" + i.opid + "-popAndriod", "click", {}) : addStat("op-banner-" + i.opid + "-popIos", "click", {})
                }).delegate(".go-website", "click", function() {
                    addStat("op-banner-" + i.opid + "-gowebsite", "click", {})
                })
            })
        },
        sendToMobile: function(o) {
            var i = this,
                e = o.qudao;
            this.sendToMobileBtnEl = T.g("sendToMobileId"), this.tipMsgEl = T.g("sendToMobileTipId"), this.phoneEl = T.g("moNoId"), this.vcodeEl = T.g("moVerifycodeId"), this.verImg = T.G("moVerifyImgId"), T.on(this.verImg, "click", function() {
                i.getCode()
            }), T.on(this.sendToMobileBtnEl, "click", function() {
                if (i.validateMoData() === !0) {
                    var o = [],
                        t = i.phoneEl.value,
                        n = i.vcodeEl.value;
                    o.push("phone[0]=" + t), o.push("vcode=" + i.vcode), o.push("code_input=" + n), o.push("tn=map"), o.push("channel=" + e), i.sendMessage(i.SEND_URL, o.join("&"))
                }
            }), T.on("moContainerId", "click", function(o) {
                baidu.event.getTarget(o).id != i.sendToMobileBtnEl.id && i.hideTipMsg()
            }), T.on(this.phoneEl, "focus", function() {
                inputValue = baidu.dom.getAttr(i.phoneEl, "value"), "请输入手机号" == inputValue && baidu.dom.setAttr(i.phoneEl, "value", "")
            }), T.on(this.vcodeEl, "focus", function() {
                inputValue = baidu.dom.getAttr(i.vcodeEl, "value"), "请输入验证码" == inputValue && baidu.dom.setAttr(i.vcodeEl, "value", "")
            }), i.getCode()
        },
        getCode: function() {
            var o = this,
                i = T.G("moVerifyImgId");
            baidu.ajax(this.VCODE_URL + "&t=" + (new Date).getTime(), {
                dataType: "json",
                success: function(e) {
                    o.vcode = e.captcha_vcode_str, i.src = o.VCODE_URL + "/genimg/" + o.vcode + "&t=" + (new Date).getTime()
                },
                error: function() {}
            })
        },
        sendMessage: function(o, i) {
            var e = this;
            e.showTipMsg("短信正在发送中，请稍候！"), baidu.ajax(o, {
                method: "post",
                data: i,
                dataType: "json",
                success: function(o) {
                    e.sendMessageCallBack(o)
                },
                error: function() {
                    e.showTipMsg("发送失败"), e.getCode()
                }
            })
        },
        sendMessageCallBack: function(o) {
            var i = this,
                e = [];
            switch (o.type) {
                case "PHONE_NUM_INVALID":
                    e.push({
                        msg: "手机号错误",
                        el: this.phoneEl
                    });
                    break;
                case "VCODE_VERITY_FAIL":
                    e.push({
                        msg: "验证码错误",
                        el: this.vcodeEl
                    });
                    break;
                case "SMS_SEND_FAIL":
                    e.push({
                        msg: "信息发送失败"
                    });
                    break;
                case "SMS_SEND_SUCCESS":
                    e.push({
                        msg: "发送成功"
                    });
                    break;
                default:
                    e.push({
                        msg: "抱歉，未知错误，请稍候重试"
                    })
            }
            i.getCode(), this.showTipMsg(e)
        },
        validateMoData: function() {
            var o = "请输入手机号" == this.phoneEl.value ? "" : this.phoneEl.value,
                i = "请输入验证码" == this.vcodeEl.value ? "" : this.vcodeEl.value,
                e = [];
            return this.hideTipMsg(), this.isEmpty(o) && e.push({
                msg: "请输入手机号码",
                el: this.phoneEl
            }), this.isMobilePhone(o) || e.push({
                msg: "手机号错误",
                el: this.phoneEl
            }), this.isEmpty(i) && e.push({
                msg: "请输入验证码",
                el: this.vcodeEl
            }), e.length > 0 ? (this.showTipMsg(e), !1) : !0
        },
        isMobilePhone: function(o) {
            return /^\d{11}/.test(o)
        },
        isEmpty: function(o) {
            return !/./.test(o)
        },
        isVCode: function(o) {
            return /^[a-zA-Z0-9]{4}$/.test(o)
        },
        showTipMsg: function(o) {
            T.isString(o) && (o = {
                msg: o
            }), o = [].concat(o), msg = o[0].msg;
            for (var i = 0; i < o.length; i++) {
                var e = o[i],
                    t = e.el;
                t && (t.style.borderColor = "#e60012")
            }
            this.tipMsgEl.innerHTML = msg, this.tipMsgEl.style.display = "block"
        },
        hideTipMsg: function() {
            this.phoneEl.style.borderColor = "#e6e6e6", this.vcodeEl.style.borderColor = "#e6e6e6", this.tipMsgEl.innerHTML = "", this.tipMsgEl.style.display = "none"
        }
    };
    module.exports = ui3MobileDownload
});