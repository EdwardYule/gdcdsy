define("common:widget/ui/vcode/Vcode.js", function(require, exports, module) {
    function getQueryParam(t) {
        var o = t.indexOf("&"),
            e = t.substr(o),
            n = baidu.url.queryToJson(e);
        return n.qt = t.substr(0, o), n
    }
    var util = require("common:widget/ui/util/util.js"),
        POPUP_ANCHOR_MAP_CENTER = 1,
        hintMessage = {
            networkError: "结果出错，辛苦重新刷新一次",
            errorInput: "输入验证码有误，请重新输入"
        },
        style = '#content{position:absolute;width:350px;font-size:14px;font-family:"微软雅黑",Arial,Helvetica,STHeiti,"宋体";background-color:#fff}#navtitle{background:#F7F7F7;height:38px;line-height:35px}#navtitle .vcodehint{margin-left:25px}#content .content-msg{line-height:30px;margin-top:10px;margin-bottom:10px;padding-left:80px;height:30px}#content #vcode_msg_error{color:red;font-size:14px}#content .account-label{display:block;float:left;width:70px;padding-right:10px;text-align:right;color:#333}#content .basebackground{background-repeat:no-repeat}#content .clearfix{zoom:1}#content .clearfix:after{content:"\\20";display:block;height:0;clear:both;visibility:hidden;overflow:hidden}#content .content-div{height:30px;margin-bottom:20px;line-height:40px}#content .content-input-vcode{width:43px;height:38px;border:1px solid #e6e6e6;border-bottom-color:#d9d9d9;margin-right:-1px;float:left}#content .del-img-sudoku{background:#F0F1F1 url(//webmap1.bdimg.com/wolfman/static/common/images/Vcode/vcode_32401c6.gif) no-repeat 4px -41px;width:42px;height:40px;float:left;cursor:pointer}.content-div .account-img-vcode-sudoku{height:36px;width:110px;margin-left:80px;float:left}.content-div a{color:#1d61ad;cursor:pointer;text-decoration:none}.content-div .acount-link-vcode{font-size:12px}#content .content-vcode-sudoku{line-height:30px;margin-bottom:10px;margin-left:80px}.content-vcode-sudoku p{font-size:12px}.content-vcode-sudoku div{width:165px}.content-vcode-sudoku div a{width:43px;height:38px;border:1px solid #e6e6e6;border-bottom-color:#d9d9d9;margin:10px 10px 0 0;float:left;cursor:pointer}.content-vcode-sudoku div a:hover{border:1px solid #458cf0}.content-input-vcode{background-position:100px 100px}.img-sudoku-1{background-position:-4px -40px}.img-sudoku-2{background-position:-50px -40px}.img-sudoku-3{background-position:-97px -40px}.img-sudoku-4{background-position:-4px -85px}.img-sudoku-5{background-position:-50px -85px}.img-sudoku-6{background-position:-97px -85px}.img-sudoku-7{background-position:-4px -137px}.img-sudoku-8{background-position:-50px -137px}.img-sudoku-9{background-position:-97px -137px}.content-button{margin-left:80px}.vcode-button{height:34px;width:91px;cursor:pointer;border:0;margin-left:120px;background:url(//webmap0.bdimg.com/wolfman/static/common/images/Vcode/vcode_btn_98334ce.gif) no-repeat}.vcode-button-ok{background-repeat:no-repeat;background-position:0 -53px}';
    require.loadCss({
        content: style,
        name: "Vcode"
    });
    var Vcode = {
        VCODE_URL: "",
        inputstr: "",
        openPop: function(opData) {
            window.addStat("window.vcode.show", "show"), this.vcodeparam = opData || {}, this.sudokuInitArr = [1, 2, 3, 4, 5, 6, 7, 8, 9], this.reSet(), this.domainUrl = "/genimg?";
            var template = [function(_template_object) {
                    var _template_fun_array = [],
                        fn = function(__data__) {
                            var _template_varName = "";
                            for (var name in __data__) _template_varName += "var " + name + '=__data__["' + name + '"];';
                            eval(_template_varName), _template_fun_array.push("<div id='content'>    <div id='navtitle'>        <span class='vcodehint'>为了您的账号安全，本次检索需输入验证码</span>    </div>    <div class='content-msg content-msg-vcodeverify'>        <span class='content-msg-error' id='vcode_msg_error'></span>    </div>    <div class='content-div content-input'>        <label class='account-label'>验证码</label>        <span class='content-input-vcode basebackground'></span>        <span class='content-input-vcode basebackground'></span>        <span class='content-input-vcode basebackground'></span>        <span class='content-input-vcode basebackground'></span>        <span class='del-img-sudoku'></span>    </div>    <div class='content-div'>        <span class=\"account-img-vcode-sudoku basebackground\"></span>        <a class=\"acount-link-vcode\" id=\"refresh_link_vcode\">看不清，换一张</a>    </div>    <div class='content-vcode-sudoku'>        <p>请从下面九宫格中选择验证的内容</p>        <div class='clearfix'>            <a class='basebackground img-sudoku-1' p='1'></a>            <a class='basebackground img-sudoku-2' p='2'></a>            <a class='basebackground img-sudoku-3' p='3'></a>            <a class='basebackground img-sudoku-4' p='4'></a>            <a class='basebackground img-sudoku-5' p='5'></a>            <a class='basebackground img-sudoku-6' p='6'></a>            <a class='basebackground img-sudoku-7' p='7'></a>            <a class='basebackground img-sudoku-8' p='8'></a>            <a class='basebackground img-sudoku-9' p='9'></a>        </div>    </div>    <input type='button' class='content-div vcode-button' id='submit-vcode' value=''/></div>"), _template_varName = null
                        }(_template_object);
                    return fn = null, _template_fun_array.join("")
                }][0],
                html = template({});
            this.open(html, opData), this.bindEvent(), baidu("#refresh_link_vcode").trigger("click"), this.count = 0
        },
        open: function(t) {
            var o = this,
                e = {
                    content: t,
                    isTitle: !1,
                    extClass: "mo-popup",
                    height: 450,
                    width: 350,
                    defaultAnchor: POPUP_ANCHOR_MAP_CENTER,
                    clickClose: !1,
                    closeButton: '<button class="mo-close" title="关闭"></button>',
                    close: function() {
                        window.addStat("window.vcode.close", "click"), baidu("#mapmask").remove()
                    }
                };
            require.async("common:widget/ui/Popup/Popup.js", function(t) {
                o.pop = new t(e), o.pop.render(), o.pop.dialog(o.pop)
            })
        },
        bindEvent: function() {
            var t = this;
            baidu("#content").mouseout(function(o) {
                t.isTop = 1, o.preventDefault()
            }), baidu("#refresh_link_vcode").on("click", function(o) {
                o.preventDefault(), t.reSet(), baidu("#submit-vcode").attr("disabled", !0), baidu("#submit-vcode").removeClass("vcode-button-ok"), t.codestr = t.vcodeparam.codestr, $(".content-input-vcode").attr("class", "content-input-vcode basebackground");
                var e = t.domainUrl + t.codestr + "&t=" + (new Date).getTime();
                baidu(".basebackground").attr("style", "background-image:url(" + e + ")")
            }), baidu(".content-vcode-sudoku a").on("click", function(o) {
                o.preventDefault();
                var e = $(this).attr("p");
                t.updataSudoku("1", e), 4 === t.sudokuVal.length && (t.isClick = 1, baidu("#submit-vcode").addClass("vcode-button-ok"), baidu("#submit-vcode").attr("disabled", !1))
            }), baidu(".del-img-sudoku").on("click", function(o) {
                o.preventDefault(), t.updataSudoku("-1"), t.sudokuVal.length < 4 && (baidu("#submit-vcode").removeClass("vcode-button-ok"), baidu("#submit-vcode").attr("disabled", !0))
            }), baidu("#submit-vcode").on("click", function() {
                t.isSubmit = 1, window.addStat("window.vcode.submit", "click"), t.postVode(t.vcodeparam)
            })
        },
        updataSudoku: function(t, o) {
            var e = this;
            if ("1" === t && e.sudokuVal.length < 4) {
                e.sudokuVal.push(e.sudokuInitArr[o - 1]);
                var n = Math.max(e.sudokuVal.length - 1, 0);
                $(".content-input-vcode").eq(n).attr("class", "content-input-vcode basebackground img-sudoku-" + o)
            }
            if ("-1" === t && e.sudokuVal.length >= 0) {
                e.sudokuVal.pop(e.sudokuInitArr[o]);
                var n = Math.min(e.sudokuVal.length, 3);
                $(".content-input-vcode").eq(n).attr("class", "content-input-vcode basebackground")
            }
        },
        postVode: function(t) {
            var o = this,
                e = t.setUrl,
                n = t.lastRequest,
                a = {},
                i = this.sudokuVal.join("");
            a.inputstr = i, a.codestr = t.codestr, a.vcode_verify = 1, a.istop = o.isTop, a.issubmit = o.isSubmit, a.isclick = o.isClick, baidu.ajax(e, {
                dataType: "json",
                data: a,
                success: function(t) {
                    if (0 === t.vcode_status) {
                        var e = getQueryParam(n),
                            a = e.qt;
                        delete e.qt;
                        var i = a + "&" + util.jsonToQuery(e, null);
                        o.close(), require.async("common:widget/com/componentManager.js", function(t) {
                            t.go(i)
                        })
                    } else {
                        if (o.count < 2) return o.count++, void baidu("#vcode_msg_error").text(hintMessage.errorInput);
                        var i = n;
                        o.close(), require.async("common:widget/com/componentManager.js", function(t) {
                            t.go(i)
                        })
                    }
                },
                failure: function() {
                    baidu("#vcode_msg_error").text(hintMessage.networkError)
                }
            })
        },
        reSet: function() {
            this.sudokuVal = [], baidu("#vcode_msg_error").text(""), this.isClick = 0, this.isSubmit = 0, this.isTop = 0
        },
        close: function() {
            this.pop.close()
        }
    };
    module.exports = Vcode
});