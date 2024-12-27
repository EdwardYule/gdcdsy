define('common:widget/ui/tangram/tangram.js', function(require, exports, module) {
    var util = require('common:widget/ui/util/util.js');
    var T, baidu = T = function() {
        // Copyright (c) 2009-2012, Baidu Inc. All rights reserved.
        //
        // Licensed under the BSD License
        // you may not use this file except in compliance with the License.
        // You may obtain a copy of the License at
        // 
        //      http://tangram.baidu.com/license.html
        //
        // Unless required by applicable law or agreed to in writing, software
        // distributed under the License is distributed on an "AS-IS" BASIS,
        // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
        // See the License for the specific language governing permissions and
        // limitations under the License.

        var T, baidu = T = baidu || function(q, c) {
            return baidu.dom ? baidu.dom(q, c) : null;
        };

        baidu.version = '2.0.2.3';
        baidu.guid = "$BAIDU$";
        baidu.key = "tangram_guid";

        // Tangram 可能被放在闭包中
        // 一些页面级别唯一的属性，需要挂载在 window[baidu.guid]上

        var _ = window[baidu.guid] = window[baidu.guid] || {};
        (_.versions || (_.versions = [])).push(baidu.version);

        // 20120709 mz 添加参数类型检查器，对参数做类型检测保护
        baidu.check = baidu.check || function() {};



        baidu.merge = function(first, second) {
            var i = first.length,
                j = 0;

            if (typeof second.length === "number") {
                for (var l = second.length; j < l; j++) {
                    first[i++] = second[j];
                }

            } else {
                while (second[j] !== undefined) {
                    first[i++] = second[j++];
                }
            }

            first.length = i;

            return first;
        };



        baidu.forEach = function(enumerable, iterator, context) {
            var i, n, t;

            if (typeof iterator == "function" && enumerable) {

                // Array or ArrayLike or NodeList or String or ArrayBuffer
                n = typeof enumerable.length == "number" ? enumerable.length : enumerable.byteLength;
                if (typeof n == "number") {

                    // 20121030 function.length
                    //safari5.1.7 can not use typeof to check nodeList - linlingyu
                    if (Object.prototype.toString.call(enumerable) === "[object Function]") {
                        return enumerable;
                    }

                    for (i = 0; i < n; i++) {

                        t = enumerable[i]
                        t === undefined && (t = enumerable.charAt && enumerable.charAt(i));

                        // 被循环执行的函数，默认会传入三个参数(array[i], i, array)
                        iterator.call(context || null, t, i, enumerable);
                    }

                    // enumerable is number
                } else if (typeof enumerable == "number") {

                    for (i = 0; i < enumerable; i++) {
                        iterator.call(context || null, i, i, i);
                    }

                    // enumerable is json
                } else if (typeof enumerable == "object") {

                    for (i in enumerable) {
                        if (enumerable.hasOwnProperty(i)) {
                            iterator.call(context || null, enumerable[i], i, enumerable);
                        }
                    }
                }
            }

            return enumerable;
        };



        baidu.lang = baidu.lang || {};



        baidu.type = (function() {
            var objectType = {},
                nodeType = [null, "HTMLElement", "Attribute", "Text", null, null, null, null, "Comment", "Document", null, "DocumentFragment", null],
                str = "Array Boolean Date Error Function Number RegExp String",
                retryType = {
                    'object': 1,
                    'function': '1'
                }, //解决safari对于childNodes算为function的问题
                toString = objectType.toString;

            // 给 objectType 集合赋值，建立映射
            baidu.forEach(str.split(" "), function(name) {
                objectType["[object " + name + "]"] = name.toLowerCase();

                baidu["is" + name] = function(unknow) {
                    return baidu.type(unknow) == name.toLowerCase();
                }
            });

            // 方法主体
            return function(unknow) {
                var s = typeof unknow;
                return !retryType[s] ? s : unknow == null ? "null" : unknow._type_ || objectType[toString.call(unknow)] || nodeType[unknow.nodeType] || (unknow == unknow.window ? "Window" : "") || "object";
            };
        })();

        // extend
        baidu.isDate = function(unknow) {
            return baidu.type(unknow) == "date" && unknow.toString() != 'Invalid Date' && !isNaN(unknow);
        };

        baidu.isElement = function(unknow) {
            return baidu.type(unknow) == "HTMLElement";
        };

        // 20120818 mz 检查对象是否可被枚举，对象可以是：Array NodeList HTMLCollection $DOM
        baidu.isEnumerable = function(unknow) {
            return unknow != null && (typeof unknow == "object" || ~Object.prototype.toString.call(unknow).indexOf("NodeList")) && (typeof unknow.length == "number" || typeof unknow.byteLength == "number" //ArrayBuffer
                ||
                typeof unknow[0] != "undefined");
        };
        baidu.isNumber = function(unknow) {
            return baidu.type(unknow) == "number" && isFinite(unknow);
        };

        // 20120903 mz 检查对象是否为一个简单对象 {}
        baidu.isPlainObject = function(unknow) {
            var key,
                hasOwnProperty = Object.prototype.hasOwnProperty;

            if (baidu.type(unknow) != "object") {
                return false;
            }

            //判断new fn()自定义对象的情况
            //constructor不是继承自原型链的
            //并且原型中有isPrototypeOf方法才是Object
            if (unknow.constructor && !hasOwnProperty.call(unknow, "constructor") && !hasOwnProperty.call(unknow.constructor.prototype, "isPrototypeOf")) {
                return false;
            }
            //判断有继承的情况
            //如果有一项是继承过来的，那么一定不是字面量Object
            //OwnProperty会首先被遍历，为了加速遍历过程，直接看最后一项
            for (key in unknow) {}
            return key === undefined || hasOwnProperty.call(unknow, key);
        };

        baidu.isObject = function(unknow) {
            return typeof unknow === "function" || (typeof unknow === "object" && unknow != null);
        };



        baidu.extend = function(depthClone, object) {
            var second, options, key, src, copy,
                i = 1,
                n = arguments.length,
                result = depthClone || {},
                copyIsArray, clone;

            baidu.isBoolean(depthClone) && (i = 2) && (result = object || {});
            !baidu.isObject(result) && (result = {});

            for (; i < n; i++) {
                options = arguments[i];
                if (baidu.isObject(options)) {
                    for (key in options) {
                        src = result[key];
                        copy = options[key];
                        // Prevent never-ending loop
                        if (src === copy) {
                            continue;
                        }

                        if (baidu.isBoolean(depthClone) && depthClone && copy && (baidu.isPlainObject(copy) || (copyIsArray = baidu.isArray(copy)))) {
                            if (copyIsArray) {
                                copyIsArray = false;
                                clone = src && baidu.isArray(src) ? src : [];
                            } else {
                                clone = src && baidu.isPlainObject(src) ? src : {};
                            }
                            result[key] = baidu.extend(depthClone, clone, copy);
                        } else if (copy !== undefined) {
                            result[key] = copy;
                        }
                    }
                }
            }
            return result;
        };



        baidu.createChain = function(chainName, fn, constructor) {
            // 创建一个内部类名
            var className = chainName == "dom" ? "$DOM" : "$" + chainName.charAt(0).toUpperCase() + chainName.substr(1),
                slice = Array.prototype.slice,
                chain = baidu[chainName];
            if (chain) {
                return chain
            }
            // 构建链头执行方法
            chain = baidu[chainName] = fn || function(object) {
                return baidu.extend(object, baidu[chainName].fn);
            };

            // 扩展 .extend 静态方法，通过本方法给链头对象添加原型方法
            chain.extend = function(extended) {
                var method;

                // 直接构建静态接口方法，如 baidu.array.each() 指向到 baidu.array().each()
                for (method in extended) {
                    (function(method) { //解决通过静态方法调用的时候，调用的总是最后一个的问题。
                        // 20121128 这个if判断是防止console按鸭子判断规则将本方法识别成数组
                        if (method != "splice") {
                            chain[method] = function() {
                                var id = arguments[0];

                                // 在新版接口中，ID选择器必须用 # 开头
                                chainName == "dom" && baidu.type(id) == "string" && (id = "#" + id);

                                var object = chain(id);
                                var result = object[method].apply(object, slice.call(arguments, 1));

                                // 老版接口返回实体对象 getFirst
                                return baidu.type(result) == "$DOM" ? result.get(0) : result;
                            }
                        }
                    })(method);
                }
                return baidu.extend(baidu[chainName].fn, extended);
            };

            // 创建 链头对象 构造器
            baidu[chainName][className] = baidu[chainName][className] || constructor || function() {};

            // 给 链头对象 原型链做一个短名映射
            chain.fn = baidu[chainName][className].prototype;

            return chain;
        };


        baidu.overwrite = function(Class, list, fn) {
            for (var i = list.length - 1; i > -1; i--) {
                Class.prototype[list[i]] = fn(list[i]);
            }

            return Class;
        };



        baidu.createChain("array", function(array) {
            var pro = baidu.array.$Array.prototype,
                ap = Array.prototype,
                key;

            baidu.type(array) != "array" && (array = []);

            for (key in pro) {
                //ap[key] || (array[key] = pro[key]);
                array[key] = pro[key];
            }

            return array;
        });

        // 对系统方法新产生的 array 对象注入自定义方法，支持完美的链式语法
        baidu.overwrite(baidu.array.$Array, "concat slice".split(" "), function(key) {
            return function() {
                return baidu.array(Array.prototype[key].apply(this, arguments));
            }
        });



        baidu.array.extend({
            unique: function(fn) {
                var len = this.length,
                    result = this.slice(0),
                    i, datum;

                if ('function' != typeof fn) {
                    fn = function(item1, item2) {
                        return item1 === item2;
                    };
                }

                // 从后往前双重循环比较
                // 如果两个元素相同，删除后一个
                while (--len > 0) {
                    datum = result[len];
                    i = len;
                    while (i--) {
                        if (fn(datum, result[i])) {
                            result.splice(len, 1);
                            break;
                        }
                    }
                }

                len = this.length = result.length;
                for (i = 0; i < len; i++) {
                    this[i] = result[i];
                }

                return this;
            }
        });



        baidu.query = baidu.query || function() {
            var rId = /^(\w*)#([\w\-\$]+)$/,
                rId0 = /^#([\w\-\$]+)$/,
                rTag = /^\w+$/,
                rClass = /^(\w*)\.([\w\-\$]+)$/,
                rComboClass = /^(\.[\w\-\$]+)+$/,
                rDivider = /\s*,\s*/,
                rSpace = /\s+/g,
                slice = Array.prototype.slice;

            // selector: #id, .className, tagName, *
            function query(selector, context) {
                var t, x, id, dom, tagName, className, arr, list, array = [];

                // tag#id
                if (rId.test(selector)) {
                    id = RegExp.$2;
                    tagName = RegExp.$1 || "*";

                    // 本段代码效率很差，不过极少流程会走到这段
                    baidu.forEach(context.getElementsByTagName(tagName), function(dom) {
                        dom.id == id && array.push(dom);
                    });

                    // tagName or *
                } else if (rTag.test(selector) || selector == "*") {
                    baidu.merge(array, context.getElementsByTagName(selector));

                    // .className
                } else if (rClass.test(selector)) {
                    arr = [];
                    tagName = RegExp.$1;
                    className = RegExp.$2;
                    t = " " + className + " ";
                    // bug: className: .a.b

                    if (context.getElementsByClassName) {
                        arr = context.getElementsByClassName(className);
                    } else {
                        baidu.forEach(context.getElementsByTagName("*"), function(dom) {
                            dom.className && ~(" " + dom.className + " ").indexOf(t) && (arr.push(dom));
                        });
                    }

                    if (tagName && (tagName = tagName.toUpperCase())) {
                        baidu.forEach(arr, function(dom) {
                            dom.tagName.toUpperCase() === tagName && array.push(dom);
                        });
                    } else {
                        baidu.merge(array, arr);
                    }

                    // IE 6 7 8 里组合样式名(.a.b)
                } else if (rComboClass.test(selector)) {
                    list = selector.substr(1).split(".");

                    baidu.forEach(context.getElementsByTagName("*"), function(dom) {
                        if (dom.className) {
                            t = " " + dom.className + " ";
                            x = true;

                            baidu.forEach(list, function(item) {
                                ~
                                t.indexOf(" " + item + " ") || (x = false);
                            });

                            x && array.push(dom);
                        }
                    });
                }

                return array;
            }

            // selector 还可以是上述四种情况的组合，以空格分隔
            // @return ArrayLike
            function queryCombo(selector, context) {
                var a, s = selector,
                    id = "__tangram__",
                    array = [];

                // 在 #id 且没有 context 时取 getSingle，其它时 getAll
                if (!context && rId0.test(s) && (a = document.getElementById(s.substr(1)))) {
                    return [a];
                }

                context = context || document;

                // 用 querySelectorAll 时若取 #id 这种唯一值时会多选
                if (context.querySelectorAll) {
                    // 在使用 querySelectorAll 时，若 context 无id将貌似 document 而出错
                    if (context.nodeType == 1 && !context.id) {
                        context.id = id;
                        a = context.querySelectorAll("#" + id + " " + s);
                        context.id = "";
                    } else {
                        a = context.querySelectorAll(s);
                    }
                    return a;
                } else {
                    if (!~s.indexOf(" ")) {
                        return query(s, context);
                    }

                    baidu.forEach(query(s.substr(0, s.indexOf(" ")), context), function(dom) { // 递归
                        baidu.merge(array, queryCombo(s.substr(s.indexOf(" ") + 1), dom));
                    });
                }

                return array;
            }

            return function(selector, context, results) {
                if (!selector || typeof selector != "string") {
                    return results || [];
                }

                var arr = [];
                selector = selector.replace(rSpace, " ");
                results && baidu.merge(arr, results) && (results.length = 0);

                baidu.forEach(selector.indexOf(",") > 0 ? selector.split(rDivider) : [selector], function(item) {
                    baidu.merge(arr, queryCombo(item, context));
                });

                return baidu.merge(results || [], baidu.array(arr).unique());
            };
        }();



        baidu.createChain("dom",

            // method function


            function(selector, context) {
                var e, me = new baidu.dom.$DOM(context);

                // Handle $(""), $(null), or $(undefined)
                if (!selector) {
                    return me;
                }

                // Handle $($DOM)
                if (selector._type_ == "$DOM") {
                    return selector;

                    // Handle $(DOMElement)
                } else if (selector.nodeType || selector == selector.window) {
                    me[0] = selector;
                    me.length = 1;
                    return me;

                    // Handle $(Array) or $(Collection) or $(NodeList)
                } else if (selector.length && me.toString.call(selector) != "[object String]") {
                    return baidu.merge(me, selector);

                } else if (typeof selector == "string") {
                    // HTMLString
                    if (selector.charAt(0) == "<" && selector.charAt(selector.length - 1) == ">" && selector.length > 2) {
                        // Match a standalone tag
                        var rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
                            doc = context && context._type_ === '$DOM' ? context[0] : context,
                            ret = rsingleTag.exec(selector);
                        doc = doc && doc.nodeType ? doc.ownerDocument || doc : document;
                        ret = ret ? [doc.createElement(ret[1])] : (baidu.dom.createElements ? baidu.dom.createElements(selector) : []);
                        baidu.merge(me, ret);
                        // baidu.query
                    } else {
                        baidu.query(selector, context, me);
                    }

                    // document.ready
                } else if (typeof selector == "function") {
                    return me.ready ? me.ready(selector) : me;
                }

                return me;
            },

            // constructor
            function(context) {
                this.length = 0;
                this._type_ = "$DOM";
                this.context = context || document;
            }

        ).extend({



            size: function() {
                    return this.length;
                }

                // 2012.11.27 mz 拥有 .length 和 .splice() 方法，console.log() 就认为该对象是 ArrayLike
                ,
            splice: function() {}


                ,
            get: function(index) {

                    if (typeof index == "number") {
                        return index < 0 ? this[this.length + index] : this[index];
                    }

                    return Array.prototype.slice.call(this, 0);
                }

                // 将 $DOM 转换成 Array(dom, dom, ...) 返回
                ,
            toArray: function() {
                return this.get();
            }

        });



        baidu.dom.extend({
            each: function(iterator) {
                baidu.check("function", "baidu.dom.each");
                var i, result,
                    n = this.length;

                for (i = 0; i < n; i++) {
                    result = iterator.call(this[i], i, this[i], this);

                    if (result === false || result == "break") {
                        break;
                    }
                }

                return this;
            }
        });


        baidu.global = baidu.global || (function() {
            var me = baidu._global_ = window[baidu.guid],
                // 20121116 mz 在多个tangram同时加载时有互相覆写的风险
                global = me._ = me._ || {};

            return function(key, value, overwrite) {
                if (typeof value != "undefined") {
                    overwrite || (value = typeof global[key] == "undefined" ? value : global[key]);
                    global[key] = value;

                } else if (key && typeof global[key] == "undefined") {
                    global[key] = {};
                }

                return global[key];
            }
        })();



        baidu._util_ = baidu._util_ || {};



        baidu._util_.access = function(tang, key, value, callback, pass) {
            if (tang.size() <= 0) {
                return tang;
            }
            switch (baidu.type(key)) {
                case 'string': //高频
                    if (value === undefined) {
                        return callback.call(tang, tang[0], key);
                    } else {
                        tang.each(function(index, item) {
                            callback.call(tang, item, key, (baidu.type(value) === 'function' ? value.call(item, index, callback.call(tang, item, key)) : value),
                                pass);
                        });
                    }
                    break;
                case 'object':
                    for (var i in key) {
                        baidu._util_.access(tang, i, key[i], callback, value);
                    }
                    break;
            }
            return tang;
        };

        baidu._util_.nodeName = function(ele, nodeName) {
            return ele.nodeName && ele.nodeName.toLowerCase() === nodeName.toLowerCase();
        };

        baidu._util_.propFixer = {
            tabindex: 'tabIndex',
            readonly: 'readOnly',
            'for': 'htmlFor',
            'class': 'className',
            'classname': 'className',
            maxlength: 'maxLength',
            cellspacing: 'cellSpacing',
            cellpadding: 'cellPadding',
            rowspan: 'rowSpan',
            colspan: 'colSpan',
            usemap: 'useMap',
            frameborder: 'frameBorder',
            contenteditable: 'contentEditable',


            //rboolean在baidu._util_.removeAttr 和 baidu._util_.attr中需要被共同使用
            rboolean: /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i
        };
        // IE6/7 call enctype encoding
        !document.createElement('form').enctype && (baidu._util_.propFixer.enctype = 'encoding');
        //Sizzle.isXML

        baidu._util_.isXML = function(ele) {
            var docElem = (ele ? ele.ownerDocument || ele : 0).documentElement;
            return docElem ? docElem.nodeName !== 'HTML' : false;
        };
        baidu._util_.prop = function() {
            var rfocusable = /^(?:button|input|object|select|textarea)$/i,
                rclickable = /^a(?:rea|)$/i,
                select = document.createElement('select'),
                opt = select.appendChild(document.createElement('option')),
                propHooks = {
                    tabIndex: {
                        get: function(ele) {
                            var attrNode = ele.getAttributeNode('tabindex');
                            return attrNode && attrNode.specified ? parseInt(attrNode.value, 10) : rfocusable.test(ele.nodeName) || rclickable.test(ele.nodeName) && ele.href ? 0 : undefined;
                        }
                    }
                };
            !opt.selected && (propHooks.selected = {
                get: function(ele) {
                    var par = ele.parentNode;
                    if (par) {
                        par.selectedIndex;
                        par.parentNode && par.parentNode.selectedIndex;
                    }
                    return null;
                }
            });
            select = opt = null;

            return function(ele, key, val) {
                var nType = ele.nodeType,
                    hooks, ret;
                if (!ele || ~'238'.indexOf(nType)) {
                    return;
                }
                if (nType !== 1 || !baidu._util_.isXML(ele)) {
                    key = baidu._util_.propFixer[key] || key;
                    hooks = propHooks[key] || {};
                }
                if (val !== undefined) {
                    if (hooks.set && (ret = hooks.set(ele, key, val)) !== undefined) {
                        return ret;
                    } else {
                        return (ele[key] = val);
                    }
                } else {
                    if (hooks.get && (ret = hooks.get(ele, key)) !== null) {
                        return ret;
                    } else {
                        return ele[key];
                    }
                }
            }
        }();


        baidu._util_.support = baidu._util_.support || function() {
            var div = document.createElement('div'),
                baseSupport, a, input, select, opt;
            div.setAttribute('className', 't');
            div.innerHTML = ' <link/><table></table><a href="/a">a</a><input type="checkbox"/>';
            a = div.getElementsByTagName('A')[0];
            a.style.cssText = 'top:1px;float:left;opacity:.5';
            select = document.createElement('select');
            opt = select.appendChild(document.createElement('option'));
            input = div.getElementsByTagName('input')[0];
            input.checked = true;

            baseSupport = {
                dom: {
                    div: div,
                    a: a,
                    select: select,
                    opt: opt,
                    input: input
                }
                //        radioValue: only import by baidu._util.attr
                //        hrefNormalized: only import by baidu._util.attr
                //        style: only import by baidu._util.attr
                //        optDisabled: only import by baidu.dom.val
                //        checkOn: only import by baidu.dom.val
                //        noCloneEvent: only import by baidu.dom.clone
                //        noCloneChecked: only import by baidu.dom.clone
                //        cssFloat: only import baidu.dom.styleFixer
                //        htmlSerialize: only import baidu.dom.html
                //        leadingWhitespace: only import baidu.dom.html
            };
            return baseSupport;
        }();
        baidu._util_.support.getSetAttribute = baidu._util_.support.dom.div.className !== 't';
        baidu._util_.nodeHook = function() {
            if (baidu._util_.support.getSetAttribute) {
                return;
            }
            var fixSpecified = {};
            fixSpecified.name = fixSpecified.id = fixSpecified.coords = true;
            return {
                get: function(ele, key) {
                    var ret = ele.getAttributeNode(key);
                    return ret && (fixSpecified[key] ? ret.value !== '' : ret.specified) ?
                        ret.value : undefined;
                },
                set: function(ele, key, val) {
                    // Set the existing or create a new attribute node
                    var ret = ele.getAttributeNode(key);
                    if (!ret) {
                        ret = document.createAttribute(key);
                        ele.setAttributeNode(ret);
                    }
                    return (ret.value = val + '');
                }
            };
        }();



        baidu._util_.removeAttr = function() {
            var propFixer = baidu._util_.propFixer,
                core_rspace = /\s+/,
                getSetAttribute = baidu._util_.support.getSetAttribute;
            return function(ele, key) {
                if (!key || ele.nodeType !== 1) {
                    return;
                }
                var array = key.split(core_rspace),
                    propName, isBool;
                for (var i = 0, attrName; attrName = array[i]; i++) {
                    propName = propFixer[attrName] || attrName;
                    isBool = propFixer.rboolean.test(attrName);
                    !isBool && baidu._util_.attr(ele, attrName, '');
                    ele.removeAttribute(getSetAttribute ? attrName : propName);
                    isBool && (propName in ele) && (ele[propName] = false);
                }
            }
        }();

        baidu._util_.contains = document.compareDocumentPosition ?
            function(container, contained) {
                return !!(container.compareDocumentPosition(contained) & 16);
            } : function(container, contained) {
                if (container === contained) {
                    return false;
                }
                if (container.contains && contained.contains) {
                    return container.contains(contained);
                } else {
                    while (contained = contained.parentNode) {
                        if (contained === container) {
                            return true;
                        }
                    }
                    return false;
                }
            };

        baidu._util_.attr = function() {
            var util = baidu._util_,
                rtype = /^(?:button|input)$/i,
                supportDom = util.support.dom,
                radioValue = supportDom.input.value === 't',
                hrefNormalized = supportDom.a.getAttribute('href') === '/a',
                style = /top/.test(supportDom.a.getAttribute('style')),
                nodeHook = util.nodeHook,
                attrFixer = {
                    className: 'class'
                },
                boolHook = { //处理对属性值是布尔值的情况
                    get: function(ele, key) {
                        var val = util.prop(ele, key),
                            attrNode;
                        return val === true || typeof val !== 'boolean' && (attrNode = ele.getAttributeNode(key)) && attrNode.nodeValue !== false ? key.toLowerCase() : undefined;
                    },
                    set: function(ele, key, val) {
                        if (val === false) {
                            util.removeAttr(ele, key);
                        } else {
                            var propName = util.propFixer[key] || key;
                            (propName in ele) && (ele[propName] = true);
                            ele.setAttribute(key, key.toLowerCase());
                        }
                        return key;
                    }
                },
                attrHooks = {
                    type: {
                        set: function(ele, key, val) {
                            // We can't allow the type property to be changed (since it causes problems in IE)
                            //                    if(rtype.test(ele.nodeName) && util.contains(document.body, ele)){return val;};
                            if (rtype.test(ele.nodeName) && ele.parentNode) {
                                return val;
                            };
                            if (!radioValue && val === 'radio' && util.nodeName(ele, 'input')) {
                                var v = ele.value;
                                ele.setAttribute('type', val);
                                v && (ele.value = v);
                                return val;
                            };
                        }
                    },
                    value: {
                        get: function(ele, key) {
                            if (nodeHook && util.nodeName(ele, 'button')) {
                                return nodeHook.get(ele, key);
                            }
                            return key in ele ? ele.value : null;
                        },
                        set: function(ele, key, val) {
                            if (nodeHook && util.nodeName(ele, 'button')) {
                                return nodeHook.set(ele, key, val);
                            }
                            ele.value = val;
                        }
                    }
                };
            // Set width and height to auto instead of 0 on empty string
            // This is for removals
            if (!util.support.getSetAttribute) { //
                baidu.forEach(['width', 'height'], function(item) {
                    attrHooks[item] = {
                        set: function(ele, key, val) {
                            if (val === '') {
                                ele.setAttribute(key, 'auto');
                                return val;
                            }
                        }
                    };
                });
                attrHooks.contenteditable = {
                    get: nodeHook.get,
                    set: function(ele, key, val) {
                        val === '' && (val = false);
                        nodeHook.set(ele, key, val);
                    }
                };
            }
            // Some attributes require a special call on IE
            if (!hrefNormalized) {
                baidu.forEach(['href', 'src', 'width', 'height'], function(item) {
                    attrHooks[item] = {
                        get: function(ele, key) {
                            var ret = ele.getAttribute(key, 2);
                            return ret === null ? undefined : ret;
                        }
                    };
                });
            }
            if (!style) {
                attrHooks.style = {
                    get: function(ele) {
                        return ele.style.cssText.toLowerCase() || undefined;
                    },
                    set: function(ele, key, val) {
                        return (ele.style.cssText = val + '');
                    }
                };
            }
            //attr
            return function(ele, key, val, pass) {
                var nType = ele.nodeType,
                    notxml = nType !== 1 || !util.isXML(ele),
                    hooks, ret;
                if (!ele || ~'238'.indexOf(nType)) {
                    return;
                }
                if (pass && baidu.dom.fn[key]) {
                    return baidu.dom(ele)[key](val);
                }
                //if getAttribute is undefined, use prop interface
                if (notxml) {
                    key = attrFixer[key] || key.toLowerCase();
                    hooks = attrHooks[key] || (util.propFixer.rboolean.test(key) ? boolHook : nodeHook);
                }
                if (val !== undefined) {
                    if (val === null) {
                        util.removeAttr(ele, key);
                        return
                    } else if (notxml && hooks && hooks.set && (ret = hooks.set(ele, key, val)) !== undefined) {
                        return ret;
                    } else {
                        ele.setAttribute(key, val + '');
                        return val;
                    }
                } else if (notxml && hooks && hooks.get && (ret = hooks.get(ele, key)) !== null) {
                    return ret;
                } else {
                    ret = ele.getAttribute(key);
                    return ret === null ? undefined : ret;
                }
            }
        }();
        baidu.dom.extend({
            attr: function(key, value) {
                return baidu._util_.access(this, key, value, function(ele, key, val, pass) {
                    return baidu._util_.attr(ele, key, val, pass);
                });
            }
        });

        baidu.dom.extend({
            removeAttr: function(key) {
                this.each(function(index, item) {
                    baidu._util_.removeAttr(item, key);
                });
                return this;
            }
        });


        baidu.dom.extend({
            prop: function(propName, value) {
                return baidu._util_.access(this, propName, value, function(ele, key, val) {
                    return baidu._util_.prop(ele, key, val);
                });
            }
        });

        baidu.dom.extend({
            removeProp: function(key) {
                key = baidu._util_.propFixer[key] || key;
                this.each(function(index, item) {
                    // try/catch handles cases where IE balks (such as removing a property on window)
                    try {
                        item[key] = undefined;
                        delete item[key];
                    } catch (e) {}
                });
                return this;
            }
        });



        baidu.browser = baidu.browser || function() {
            var ua = navigator.userAgent;

            var result = {
                isStrict: document.compatMode == "CSS1Compat",
                isGecko: /gecko/i.test(ua) && !/like gecko/i.test(ua),
                isWebkit: /webkit/i.test(ua)
            };

            try {
                /(\d+\.\d+)/.test(external.max_version) && (result.maxthon = +RegExp['\x241'])
            } catch (e) {};

            // 蛋疼 你懂的
            switch (true) {
                case /msie (\d+\.\d+)/i.test(ua):
                    result.ie = document.documentMode || +RegExp['\x241'];
                    break;
                case navigator.appName == 'Netscape' && new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})").test(ua):
                    result.ie = document.documentMode;
                    break;
                case /chrome\/(\d+\.\d+)/i.test(ua):
                    result.chrome = +RegExp['\x241'];
                    break;
                case /(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(ua) && !/chrome/i.test(ua):
                    result.safari = +(RegExp['\x241'] || RegExp['\x242']);
                    break;
                case /firefox\/(\d+\.\d+)/i.test(ua):
                    result.firefox = +RegExp['\x241'];
                    break;

                case /opera(?:\/| )(\d+(?:\.\d+)?)(.+?(version\/(\d+(?:\.\d+)?)))?/i.test(ua):
                    result.opera = +(RegExp["\x244"] || RegExp["\x241"]);
                    break;
            }

            baidu.extend(baidu, result);

            return result;
        }();
        //[old interface]
        window.Instance = function(hashCode) {
            return baidu.id(hashCode, "get");
        };

        baidu.id = function() {
            var maps = baidu.global("_maps_id"),
                key = baidu.key;

            // 2012.12.21 与老版本同步
            window[baidu.guid]._counter = window[baidu.guid]._counter || 1;

            return function(object, command) {
                var e, str_1 = baidu.isString(object),
                    obj_1 = baidu.isObject(object),
                    id = obj_1 ? object[key] : str_1 ? object : "";

                // 第二个参数为 String
                if (baidu.isString(command)) {
                    switch (command) {
                        case "get":
                            return obj_1 ? id : maps[id];
                            //            break;
                        case "remove":
                        case "delete":
                            if (e = maps[id]) {
                                // 20120827 mz IE低版本(ie6,7)给 element[key] 赋值时会写入DOM树，因此在移除的时候需要使用remove
                                if (baidu.isElement(e) && baidu.browser.ie < 8) {
                                    e.removeAttribute(key);
                                } else {
                                    delete e[key];
                                }
                                delete maps[id];
                            }
                            return id;
                            //            break;
                        default:
                            if (str_1) {
                                (e = maps[id]) && delete maps[id];
                                e && (maps[e[key] = command] = e);
                            } else if (obj_1) {
                                id && delete maps[id];
                                maps[object[key] = command] = object;
                            }
                            return command;
                    }
                }

                // 第一个参数不为空
                if (obj_1) {
                    !id && (maps[object[key] = id = baidu.id()] = object);
                    return id;
                } else if (str_1) {
                    return maps[object];
                }

                return "TANGRAM_" + baidu._global_._counter++;
            };
        }();

        //TODO: mz 20120827 在低版本IE做delete操作时直接 delete e[key] 可能出错，这里需要重新评估，重写



        baidu.dom.extend({
            data: function() {
                var guid = baidu.key,
                    maps = baidu.global("_maps_HTMLElementData");

                return function(key, value) {
                    baidu.forEach(this, function(dom) {
                        !dom[guid] && (dom[guid] = baidu.id());
                    });

                    if (baidu.isString(key)) {

                        // get first
                        if (typeof value == "undefined") {
                            var data, result;
                            result = this[0] && (data = maps[this[0][guid]]) && data[key];
                            if (typeof result != 'undefined') {
                                return result;
                            } else {

                                //取得自定义属性
                                var attr = this[0].getAttribute('data-' + key);
                                return !~String(attr).indexOf('{') ? attr : Function("return " + attr)();
                            }
                        }

                        // set all
                        baidu.forEach(this, function(dom) {
                            var data = maps[dom[guid]] = maps[dom[guid]] || {};
                            data[key] = value;
                        });

                        // json
                    } else if (baidu.type(key) == "object") {

                        // set all
                        baidu.forEach(this, function(dom) {
                            var data = maps[dom[guid]] = maps[dom[guid]] || {};

                            baidu.forEach(key, function(item, index) {
                                data[index] = key[index];
                            });
                        });
                    }

                    return this;
                }
            }()
        });



        baidu.dom.extend({
            removeData: function() {
                var guid = baidu.key,
                    maps = baidu.global("_maps_HTMLElementData");

                return function(key) {
                    baidu.forEach(this, function(dom) {
                        !dom[guid] && (dom[guid] = baidu.id());
                    });

                    // set all
                    baidu.forEach(this, function(dom) {
                        var map = maps[dom[guid]];

                        if (typeof key == "string") {
                            map && delete map[key];

                        } else if (baidu.type(key) == "array") {
                            baidu.forEach(key, function(i) {
                                map && delete map[i];
                            });
                        }
                    });

                    return this;
                }
            }()
        });



        baidu.createChain('string',
            // 执行方法
            function(string) {
                var type = baidu.type(string),
                    str = new String(~'string|number'.indexOf(type) ? string : type),
                    pro = String.prototype;
                baidu.forEach(baidu.string.$String.prototype, function(fn, key) {
                    pro[key] || (str[key] = fn);
                });
                return str;
            }
        );



        baidu.string.extend({
            trim: function() {
                var trimer = new RegExp('(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)', 'g');
                return function() {
                    return this.replace(trimer, '');
                }
            }()
        });

        baidu.dom.extend({
            addClass: function(value) {

                if (!arguments.length)
                    return this;

                var t = typeof value,
                    b = " ";

                if (t == "string") {
                    value = baidu.string.trim(value);

                    var arr = value.split(" ");

                    baidu.forEach(this, function(item, index) {
                        var str = item.className;

                        for (var i = 0; i < arr.length; i++)
                            if (!~(b + str + b).indexOf(b + arr[i] + b))
                                str += " " + arr[i];

                        item.className = str.replace(/^\s+/g, "");
                    });
                } else if (t == "function")
                    baidu.forEach(this, function(item, index) {
                        baidu.dom(item).addClass(value.call(item, index, item.className));
                    });

                return this;
            }
        });



        baidu.dom.extend({
            removeClass: function(value) {

                var type = typeof value,
                    b = " ";

                if (!arguments.length)
                    baidu.forEach(this, function(item) {
                        item.className = "";
                    });

                if (type == "string") {
                    value = baidu.string.trim(value);
                    var arr = value.split(" ");

                    baidu.forEach(this, function(item) {
                        var str = item.className;
                        for (var i = 0; i < arr.length; i++)
                            while (~(b + str + b).indexOf(b + arr[i] + b))
                                str = (b + str + b).replace(b + arr[i] + b, b);
                        item.className = baidu.string.trim(str);
                    });

                } else if (type == "function") {
                    baidu.forEach(this, function(item, index, className) {
                        baidu.dom(item).removeClass(value.call(item, index, item.className));
                    });
                }

                return this;
            }
        });



        baidu.dom.extend({

            pushStack: function(elems) {
                var ret = baidu.dom();

                baidu.merge(ret, elems);

                ret.prevObject = this;
                ret.context = this.context;

                return ret;
            }
        });



        baidu.dom.extend({
            eq: function(index) {
                baidu.check("number", "baidu.dom.eq");
                var item = this.get(index);
                return this.pushStack(typeof item === "undefined" ? [] : [item]);
            }
        });



        baidu.dom.extend({
            getComputedStyle: function(key) {
                if (!this[0].ownerDocument) {
                    return;
                } // document can not get style;
                var defaultView = this[0].ownerDocument.defaultView,
                    computedStyle = defaultView && defaultView.getComputedStyle && defaultView.getComputedStyle(this[0], null),
                    val = computedStyle ? (computedStyle.getPropertyValue(key) || computedStyle[key]) : '';
                return val || this[0].style[key];
            }
        });


        baidu.dom.extend({
            getCurrentStyle: function() {
                var css = document.documentElement.currentStyle ?
                    function(key) {
                        return this[0].currentStyle ? this[0].currentStyle[key] : this[0].style[key];
                    } : function(key) {
                        return this.getComputedStyle(key);
                    }
                return function(key) {
                    return css.call(this, key);
                }
            }()
        });



        baidu.each = function(enumerable, iterator, context) {
            var i, n, t, result;

            if (typeof iterator == "function" && enumerable) {

                // Array or ArrayLike or NodeList or String or ArrayBuffer
                n = typeof enumerable.length == "number" ? enumerable.length : enumerable.byteLength;
                if (typeof n == "number") {

                    // 20121030 function.length
                    //safari5.1.7 can not use typeof to check nodeList - linlingyu
                    if (Object.prototype.toString.call(enumerable) === "[object Function]") {
                        return enumerable;
                    }

                    for (i = 0; i < n; i++) {
                        //enumerable[ i ] 有可能会是0
                        t = enumerable[i];
                        t === undefined && (t = enumerable.charAt && enumerable.charAt(i));
                        // 被循环执行的函数，默认会传入三个参数(i, array[i], array)
                        result = iterator.call(context || t, i, t, enumerable);

                        // 被循环执行的函数的返回值若为 false 和"break"时可以影响each方法的流程
                        if (result === false || result == "break") {
                            break;
                        }
                    }

                    // enumerable is number
                } else if (typeof enumerable == "number") {

                    for (i = 0; i < enumerable; i++) {
                        result = iterator.call(context || i, i, i, i);
                        if (result === false || result == "break") {
                            break;
                        }
                    }

                    // enumerable is json
                } else if (typeof enumerable == "object") {

                    for (i in enumerable) {
                        if (enumerable.hasOwnProperty(i)) {
                            result = iterator.call(context || enumerable[i], i, enumerable[i], enumerable);

                            if (result === false || result == "break") {
                                break;
                            }
                        }
                    }
                }
            }

            return enumerable;
        };



        baidu._util_.getWidthOrHeight = function() {
            var ret = {},
                cssShow = {
                    position: 'absolute',
                    visibility: 'hidden',
                    display: 'block'
                },
                rdisplayswap = /^(none|table(?!-c[ea]).+)/;

            function swap(ele, options) {
                var defaultVal = {};
                for (var i in options) {
                    defaultVal[i] = ele.style[i];
                    ele.style[i] = options[i];
                }
                return defaultVal;
            }
            baidu.forEach(['Width', 'Height'], function(item) {
                var cssExpand = {
                    Width: ['Right', 'Left'],
                    Height: ['Top', 'Bottom']
                }[item];
                ret['get' + item] = function(ele, extra) {
                    var tang = baidu.dom(ele),
                        defaultValue = ele.offsetWidth === 0 && rdisplayswap.test(tang.getCurrentStyle('display')) && (swap(ele, cssShow)),
                        rect = ele['offset' + item] || parseInt(tang.getCurrentStyle(item.toLowerCase())) || 0,
                        delString = 'padding|border';
                    extra && baidu.forEach(extra.split('|'), function(val) {
                        if (!~delString.indexOf(val)) { //if val is margin
                            rect += parseFloat(tang.getCurrentStyle(val + cssExpand[0])) || 0;
                            rect += parseFloat(tang.getCurrentStyle(val + cssExpand[1])) || 0;
                        } else { //val is border or padding
                            delString = delString.replace(new RegExp('\\|?' + val + '\\|?'), '');
                        }
                    });
                    delString && baidu.forEach(delString.split('|'), function(val) {
                        rect -= parseFloat(tang.getCurrentStyle(val + cssExpand[0] + (val === 'border' ? 'Width' : ''))) || 0;
                        rect -= parseFloat(tang.getCurrentStyle(val + cssExpand[1] + (val === 'border' ? 'Width' : ''))) || 0;
                    });
                    defaultValue && swap(ele, defaultValue);
                    return rect;
                }
            });
            //
            return function(ele, key, extra) {
                return ret[key === 'width' ? 'getWidth' : 'getHeight'](ele, extra);
            }
        }();


        baidu._util_.setPositiveNumber = function() {
            var core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
                rnumsplit = new RegExp('^(' + core_pnum + ')(.*)$', 'i');
            return function(ele, val, subtract) {
                var mc = rnumsplit.exec(val);
                return mc ?
                    Math.max(0, mc[1] - (subtract || 0)) + (mc[2] || 'px') : val;
            };
        }();

        baidu._util_.style = baidu.extend({
            set: function(ele, key, val) {
                ele.style[key] = val;
            }
        }, document.documentElement.currentStyle ? {
            get: function(ele, key) {
                var val = baidu.dom(ele).getCurrentStyle(key),
                    defaultLeft;
                if (/^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i.test(val)) {
                    defaultLeft = ele.style.left;
                    ele.style.left = key === 'fontSize' ? '1em' : val;
                    val = ele.style.pixelLeft + 'px';
                    ele.style.left = defaultLeft;
                }
                return val;
            }
        } : {
            get: function(ele, key) {
                return baidu.dom(ele).getCurrentStyle(key);
            }
        });

        baidu._util_.cssHooks = function() {
            var alpha = /alpha\s*\(\s*opacity\s*=\s*(\d{1,3})/i,
                style = baidu._util_.style,
                //        nonpx = /^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i,
                anchor = baidu._util_.support.dom.a,
                cssMapping = {
                    fontWeight: {
                        normal: 400,
                        bold: 700,
                        bolder: 700,
                        lighter: 100
                    }
                },
                cssHooks = {
                    opacity: {},
                    width: {},
                    height: {},
                    fontWeight: {
                        get: function(ele, key) {
                            var ret = style.get(ele, key);
                            return cssMapping.fontWeight[ret] || ret;
                        }
                    }
                };
            //
            function setValue(ele, key, val) {
                baidu.type(val) === 'string' && (val = baidu._util_.setPositiveNumber(ele, val));
                style.set(ele, key, val);
            }
            //
            baidu.extend(cssHooks.opacity, /^0.5/.test(anchor.style.opacity) ? {
                get: function(ele, key) {
                    var ret = baidu.dom(ele).getCurrentStyle(key);
                    return ret === '' ? '1' : ret;
                }
            } : {
                get: function(ele) {
                    return alpha.test((ele.currentStyle || ele.style).filter || '') ? parseFloat(RegExp.$1) / 100 : '1';
                },
                set: function(ele, key, value) {
                    var filterString = (ele.currentStyle || ele.style).filter || '',
                        opacityValue = value * 100;
                    ele.style.zoom = 1;
                    ele.style.filter = alpha.test(filterString) ? filterString.replace(alpha, 'Alpha(opacity=' + opacityValue) : filterString + ' progid:dximagetransform.microsoft.Alpha(opacity=' + opacityValue + ')';
                }
            });
            //
            baidu.forEach(['width', 'height'], function(item) {
                cssHooks[item] = {
                    get: function(ele) {
                        return baidu._util_.getWidthOrHeight(ele, item) + 'px';
                    },
                    set: setValue
                };
            });

            baidu.each({
                padding: "",
                border: "Width"
            }, function(prefix, suffix) {
                cssHooks[prefix + suffix] = {
                    set: setValue
                };
                var cssExpand = ["Top", "Right", "Bottom", "Left"],
                    i = 0;
                for (; i < 4; i++) {
                    cssHooks[prefix + cssExpand[i] + suffix] = {
                        set: setValue
                    };
                }
            });
            return cssHooks;
        }();

        baidu._util_.cssNumber = {
            'columnCount': true,
            'fillOpacity': true,
            'fontWeight': true,
            'lineHeight': true,
            'opacity': true,
            'orphans': true,
            'widows': true,
            'zIndex': true,
            'zoom': true
        };



        //支持单词以“-_”分隔
        //todo:考虑以后去掉下划线支持？
        baidu.string.extend({
            toCamelCase: function() {
                var source = this.valueOf();
                //提前判断，提高getStyle等的效率 thanks xianwei
                if (source.indexOf('-') < 0 && source.indexOf('_') < 0) {
                    return source;
                }
                return source.replace(/[-_][^-_]/g, function(match) {
                    return match.charAt(1).toUpperCase();
                });
            }
        });


        baidu.dom.styleFixer = function() {
            var style = baidu._util_.style,
                cssHooks = baidu._util_.cssHooks,
                cssNumber = baidu._util_.cssNumber,
                cssProps = {
                    'float': !!baidu._util_.support.dom.a.style.cssFloat ? 'cssFloat' : 'styleFloat'
                };
            return function(ele, key, val) {
                var origKey = baidu.string.toCamelCase(key),
                    method = val === undefined ? 'get' : 'set',
                    origVal, hooks;
                origKey = cssProps[origKey] || origKey;
                origVal = baidu.type(val) === 'number' && !cssNumber[origKey] ? val + 'px' : val;
                hooks = cssHooks.hasOwnProperty(origKey) && cssHooks[origKey][method] || style[method];
                return hooks(ele, origKey, origVal);
            }
        }();



        baidu.dom.extend({
            css: function(key, value) {
                baidu.check('^(?:(?:string(?:,(?:number|string|function))?)|object)$', 'baidu.dom.css');
                return baidu._util_.access(this, key, value, function(ele, key, val) {
                    var styleFixer = baidu.dom.styleFixer;
                    return styleFixer ? styleFixer(ele, key, val) : (val === undefined ? this.getCurrentStyle(key) : ele.style[key] = val);
                });
            }
        });



        baidu.dom.extend({
            getDocument: function() {
                if (this.size() <= 0) {
                    return undefined;
                }
                var ele = this[0];
                return ele.nodeType == 9 ? ele : ele.ownerDocument || ele.document;
            }
        });



        baidu._util_.getDefaultDisplayValue = function() {
            var valMap = {};
            return function(tagName) {
                if (valMap[tagName]) {
                    return valMap[tagName];
                }
                var ele = document.createElement(tagName),
                    val, frame, ownDoc;
                document.body.appendChild(ele);
                val = baidu.dom(ele).getCurrentStyle('display');
                document.body.removeChild(ele);
                if (val === '' || val === 'none') {
                    frame = document.body.appendChild(document.createElement('iframe'));
                    frame.frameBorder =
                        frame.width =
                        frame.height = 0;
                    ownDoc = (frame.contentWindow || frame.contentDocument).document;
                    ownDoc.writeln('<!DOCTYPE html><html><body>');
                    ownDoc.close();
                    ele = ownDoc.appendChild(ownDoc.createElement(tagName));
                    val = baidu.dom(ele).getCurrentStyle('display');
                    document.body.removeChild(frame);
                    frame = null;
                }
                ele = null;
                return valMap[tagName] = val;
            }
        }();



        baidu._util_.isHidden = function(ele) {
            return baidu.dom(ele).getCurrentStyle('display') === 'none' || !baidu._util_.contains(ele.ownerDocument, ele);
        }



        baidu.dom.extend({
            show: function() {
                var vals = [],
                    display, tang;
                this.each(function(index, ele) {
                    if (!ele.style) {
                        return;
                    }
                    tang = baidu.dom(ele);
                    display = ele.style.display;
                    vals[index] = tang.data('olddisplay');
                    if (!vals[index] && display === 'none') {
                        ele.style.display = '';
                    }
                    if (ele.style.display === '' && baidu._util_.isHidden(ele)) {
                        tang.data('olddisplay', (vals[index] = baidu._util_.getDefaultDisplayValue(ele.nodeName)));
                    }
                });

                return this.each(function(index, ele) {
                    if (!ele.style) {
                        return;
                    }
                    if (ele.style.display === 'none' || ele.style.display === '') {
                        ele.style.display = vals[index] || '';
                    }
                });
            }
        });



        baidu.dom.extend({
            hide: function() {
                var vals = [],
                    tang, isHidden, display;
                return this.each(function(index, ele) {
                    if (!ele.style) {
                        return;
                    } //当前的这个不做操作
                    tang = baidu(ele);
                    vals[index] = tang.data('olddisplay');
                    display = ele.style.display;
                    if (!vals[index]) {
                        isHidden = baidu._util_.isHidden(ele);
                        if (display && display !== 'none' || !isHidden) {
                            tang.data('olddisplay', isHidden ? display : tang.getCurrentStyle('display'));
                        }
                    }
                    ele.style.display = 'none';
                });
            }
        });



        baidu.dom.extend({
            toggle: function() {
                for (var i = 0, num = this.size(); i < num; i++) {
                    var ele = this.eq(i);
                    if (ele.css('display') != 'none') {
                        ele.hide();
                    } else {
                        ele.show();
                    };
                };
            }
        });

        /// support magic - Tangram 1.x Code Start



        baidu.dom.g = function(id) {
            if (!id) return null; //修改IE下baidu.dom.g(baidu.dom.g('dose_not_exist_id'))报错的bug，by Meizz, dengping
            if ('string' == typeof id || id instanceof String) {
                return document.getElementById(id);
            } else if (id.nodeName && (id.nodeType == 1 || id.nodeType == 9)) {
                return id;
            }
            return null;
        };

        /// support magic - Tangram 1.x Code End

        /// Tangram 1.x Code Start


        baidu.dom.toggle = function(element) {
            element = baidu.dom.g(element);
            element.style.display = element.style.display == "none" ? "" : "none";

            return element;
        };
        /// Tangram 1.x Code End


        baidu.dom.extend({
            toggleClass: function(value, status) {
                var type = typeof value;
                var status = (typeof status === 'undefined') ? status : Boolean(status);

                if (arguments.length <= 0) {
                    baidu.forEach(this, function(item) {
                        item.className = '';
                    });
                };

                switch (typeof value) {
                    case 'string':

                        //对输入进行处理
                        value = value.replace(/^\s+/g, '').replace(/\s+$/g, '').replace(/\s+/g, ' ');

                        var arr = value.split(' ');
                        baidu.forEach(this, function(item) {
                            var str = item.className;
                            for (var i = 0; i < arr.length; i++) {

                                //有这个className
                                if ((~(' ' + str + ' ').indexOf(' ' + arr[i] + ' ')) && (typeof status === 'undefined')) {
                                    str = (' ' + str + ' ').replace(' ' + arr[i] + ' ', ' ');

                                } else if ((!~(' ' + str + ' ').indexOf(' ' + arr[i] + ' ')) && (typeof status === 'undefined')) {
                                    str += ' ' + arr[i];

                                } else if ((!~(' ' + str + ' ').indexOf(' ' + arr[i] + ' ')) && (status === true)) {
                                    str += ' ' + arr[i];

                                } else if ((~(' ' + str + ' ').indexOf(' ' + arr[i] + ' ')) && (status === false)) {
                                    str = str.replace(arr[i], '');
                                };
                            };
                            item.className = str.replace(/^\s+/g, '').replace(/\s+$/g, '');
                        });
                        break;
                    case 'function':

                        baidu.forEach(this, function(item, index) {
                            baidu.dom(item).toggleClass(value.call(item, index, item.className), status);
                        });

                        break;
                };

                return this;
            }
        });



        baidu.dom.extend({
            hasClass: function(value) {
                //异常处理
                if (arguments.length <= 0 || typeof value === 'function') {
                    return this;
                };

                if (this.size() <= 0) {
                    return false;
                };

                //对输入进行处理
                value = value.replace(/^\s+/g, '').replace(/\s+$/g, '').replace(/\s+/g, ' ');
                var arr = value.split(' ');
                var result;
                baidu.forEach(this, function(item) {
                    var str = item.className;
                    for (var i = 0; i < arr.length; i++) {
                        if (!~(' ' + str + ' ').indexOf(' ' + arr[i] + ' ')) {
                            //有一个不含有
                            result = false;
                            return;
                        };
                    };
                    if (result !== false) {
                        result = true;
                        return;
                    };
                });
                return result;
            }
        });

        /// Tangram 1.x Code Start
        //兼容老接口



        baidu.dom.toggleClass = function(element, className) {
            if (baidu.dom.hasClass(element, className)) {
                baidu.dom.removeClass(element, className);
            } else {
                baidu.dom.addClass(element, className);
            }
        };
        /// Tangram 1.x Code End



        baidu.dom.createElements = function() {
            var tagReg = /<(\w+)/i,
                rhtml = /<|&#?\w+;/,
                tagMap = {
                    area: [1, "<map>", "</map>"],
                    col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
                    legend: [1, "<fieldset>", "</fieldset>"],
                    option: [1, "<select multiple='multiple'>", "</select>"],
                    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                    thead: [1, "<table>", "</table>"],
                    tr: [2, "<table><tbody>", "</tbody></table>"],
                    _default: [0, "", ""]
                };

            // 建立映射
            tagMap.optgroup = tagMap.option;
            tagMap.tbody = tagMap.tfoot = tagMap.colgroup = tagMap.caption = tagMap.thead;
            tagMap.th = tagMap.td;

            // 将<script>解析成正常可执行代码
            function parseScript(box, doc) {
                var list = box.getElementsByTagName("SCRIPT"),
                    i, script, item;

                for (i = list.length - 1; i >= 0; i--) {
                    item = list[i];
                    script = doc.createElement("SCRIPT");

                    item.id && (script.id = item.id);
                    item.src && (script.src = item.src);
                    item.type && (script.type = item.type);
                    script[item.text ? "text" : "textContent"] = item.text || item.textContent;

                    item.parentNode.replaceChild(script, item);
                }
            }

            return function(htmlstring, doc) {
                baidu.isNumber(htmlstring) && (htmlstring = htmlstring.toString());
                doc = doc || document;

                var wrap, depth, box,
                    hs = htmlstring,
                    n = hs.length,
                    div = doc.createElement("div"),
                    df = doc.createDocumentFragment(),
                    result = [];

                if (baidu.isString(hs)) {
                    if (!rhtml.test(hs)) { // TextNode
                        result.push(doc.createTextNode(hs));
                    } else { //htmlString
                        wrap = tagMap[hs.match(tagReg)[1].toLowerCase()] || tagMap._default;

                        div.innerHTML = "<i>mz</i>" + wrap[1] + hs + wrap[2];
                        div.removeChild(div.firstChild); // for ie (<script> <style>)
                        parseScript(div, doc);

                        depth = wrap[0];
                        box = div;
                        while (depth--) {
                            box = box.firstChild;
                        };

                        baidu.merge(result, box.childNodes);

                        // 去除 item.parentNode
                        baidu.forEach(result, function(dom) {
                            df.appendChild(dom);
                        });

                        div = box = null;
                    }
                }

                div = null;

                return result;
            };
        }();



        baidu.createChain("event",

            // method
            function() {
                var lastEvt = {};
                return function(event, json) {
                    switch (baidu.type(event)) {
                        // event
                        case "object":
                            return lastEvt.originalEvent === event ?
                                lastEvt : lastEvt = new baidu.event.$Event(event);

                        case "$Event":
                            return event;

                            // event type
                            //                case "string" :
                            //                    var e = new baidu.event.$Event( event );
                            //                    if( typeof json == "object" ) 
                            //                        baidu.forEach( e, json );
                            //                    return e;
                    }
                }
            }(),

            // constructor
            function(event) {
                var e, t, f;
                var me = this;

                this._type_ = "$Event";

                if (typeof event == "object" && event.type) {

                    me.originalEvent = e = event;

                    for (var name in e)
                        if (typeof e[name] != "function")
                            me[name] = e[name];

                    if (e.extraData)
                        baidu.extend(me, e.extraData);

                    me.target = me.srcElement = e.srcElement || (
                        (t = e.target) && (t.nodeType == 3 ? t.parentNode : t)
                    );

                    me.relatedTarget = e.relatedTarget || (
                        (t = e.fromElement) && (t === me.target ? e.toElement : t)
                    );

                    me.keyCode = me.which = e.keyCode || e.which;

                    // Add which for click: 1 === left; 2 === middle; 3 === right
                    if (!me.which && e.button !== undefined)
                        me.which = e.button & 1 ? 1 : (e.button & 2 ? 3 : (e.button & 4 ? 2 : 0));

                    var doc = document.documentElement,
                        body = document.body;

                    me.pageX = e.pageX || (
                        e.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0)
                    );

                    me.pageY = e.pageY || (
                        e.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0)
                    );

                    me.data;
                }

                // event.type
                //        if( typeof event == "string" )
                //            this.type = event;

                // event.timeStamp
                this.timeStamp = new Date().getTime();
            }

        ).extend({
            stopPropagation: function() {
                var e = this.originalEvent;
                e && (e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true);
            },

            preventDefault: function() {
                var e = this.originalEvent;
                e && (e.preventDefault ? e.preventDefault() : e.returnValue = false);
            }
        });


        baidu._util_.eventBase = baidu._util_.eventBase || {};


        void

        function(base, listener) {
            if (base.listener) return;

            listener = base.listener = {};

            if (window.addEventListener)
                listener.add = function(target, name, fn) {
                    target.addEventListener(name, fn, false);
                };
            else if (window.attachEvent)
                listener.add = function(target, name, fn) {
                    target.attachEvent("on" + name, fn);
                };
        }(baidu._util_.eventBase);

        void

        function(base, be) {
            if (base.queue) return;

            var I = baidu.id;
            var queue = base.queue = {};
            var attaCache = queue.attaCache = baidu.global("eventQueueCache");
            var listener = base.listener;

            queue.get = function(target, type, bindType, attachElements) {
                var id = I(target),
                    c;

                if (!attaCache[id])
                    attaCache[id] = {};

                c = attaCache[id];

                if (type) {
                    if (!c[type] && bindType) {
                        this.setupCall(target, type, bindType, c[type] = [], attachElements);
                    }
                    return c[type] || [];
                } else return c;
            };

            queue.add = function(target, type, bindType, item, attachElements) {
                this.get(target, type, bindType, attachElements).push(item);
            };

            queue.remove = function(target, type, fn) {
                var arr, c;
                if (type) {
                    var arr = this.get(target, type);
                    if (fn) {
                        for (var i = arr.length - 1; i >= 0; i--)
                            if (arr[i].orig == fn)
                                arr.splice(i, 1);
                    } else {
                        arr.length = 0;
                    }
                } else {
                    var c = this.get(target);
                    for (var i in c)
                        c[i].length = 0;
                }
            };

            queue.handlerList = function(target, fnAry) {
                var handlerQueue = [];
                //对delegate进行处理，这里牺牲性能换取事件执行顺序
                for (var i = 0, item; item = fnAry[i]; i++) {
                    if (item.delegate && baidu.dom(item.delegate, target).size() < 1) {
                        continue;
                    }
                    handlerQueue.push(item);
                }
                return handlerQueue;
            }

            queue.call = function(target, type, fnAry, e) {
                if (fnAry) {
                    if (!fnAry.length)
                        return;

                    var args = [].slice.call(arguments, 1),
                        one = [];
                    args.unshift(e = baidu.event(e || type));
                    e.type = type;

                    if (!e.currentTarget)
                        e.currentTarget = target;

                    if (!e.target)
                        e.target = target;

                    //这里加入判断处理delegate 过滤fnAry 类似jq的功能
                    fnAry = queue.handlerList(target, fnAry);

                    for (var i = 0, r, l = fnAry.length; i < l; i++)
                        if (r = fnAry[i]) {
                            r.pkg.apply(target, args);
                            if (r.one)
                                one.unshift(i);
                        }

                    if (one.length)
                        for (var i = 0, l = one.length; i < l; i++)
                            this.remove(target, type, fnAry[i].fn);

                } else {
                    fnAry = this.get(target, type);
                    this.call(target, type, fnAry, e);
                }
            };

            queue.setupCall = function() {
                var add = function(target, type, bindType, fnAry) {
                    listener.add(target, bindType, function(e) {
                        queue.call(target, type, fnAry, e);
                    });
                };
                return function(target, type, bindType, fnAry, attachElements) {
                    if (!attachElements)
                        add(target, type, bindType, fnAry);
                    else {
                        target = baidu.dom(attachElements, target);
                        for (var i = 0, l = target.length; i < l; i++)
                            add(target[i], type, bindType, fnAry);
                    }
                };
            }();

        }(baidu._util_.eventBase, baidu.event);

        baidu._util_.cleanData = function(array) {
            var tangId;
            for (var i = 0, ele; ele = array[i]; i++) {
                tangId = baidu.id(ele, 'get');
                if (!tangId) {
                    continue;
                }
                baidu._util_.eventBase.queue.remove(ele);
                baidu.id(ele, 'remove');
            }
        };



        baidu.dom.extend({
            empty: function() {
                for (var i = 0, item; item = this[i]; i++) {
                    item.nodeType === 1 && baidu._util_.cleanData(item.getElementsByTagName('*'));
                    while (item.firstChild) {
                        item.removeChild(item.firstChild);
                    }
                }
                return this;
            }
        });

        /// Tangram 1.x Code Start



        /// Tangram 1.x Code End


        baidu.dom.extend({
            html: function(value) {

                var bd = baidu.dom,
                    bt = baidu._util_,
                    me = this,
                    isSet = false,
                    htmlSerialize = !!bt.support.dom.div.getElementsByTagName('link').length,
                    leadingWhitespace = (bt.support.dom.div.firstChild.nodeType === 3),
                    result;

                //当dom选择器为空时
                if (!this.size())
                    switch (typeof value) {
                        case 'undefined':
                            return undefined;
                        default:
                            return me;
                    }

                var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
                    "header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
                    rnoInnerhtml = /<(?:script|style|link)/i,
                    rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
                    rleadingWhitespace = /^\s+/,
                    rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
                    rtagName = /<([\w:]+)/,
                    wrapMap = {
                        option: [1, "<select multiple='multiple'>", "</select>"],
                        legend: [1, "<fieldset>", "</fieldset>"],
                        thead: [1, "<table>", "</table>"],
                        tr: [2, "<table><tbody>", "</tbody></table>"],
                        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
                        area: [1, "<map>", "</map>"],
                        _default: [0, "", ""]
                    };
                wrapMap.optgroup = wrapMap.option;
                wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
                wrapMap.th = wrapMap.td;

                // IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
                // unless wrapped in a div with non-breaking characters in front of it.
                if (!htmlSerialize)
                    wrapMap._default = [1, "X<div>", "</div>"];

                baidu.forEach(me, function(elem, index) {

                    if (result)
                        return;

                    var tangramDom = bd(elem);

                    switch (typeof value) {
                        case 'undefined':
                            result = (elem.nodeType === 1 ? elem.innerHTML : undefined);
                            return;

                        case 'number':
                            value = String(value);

                        case 'string':
                            isSet = true;

                            // See if we can take a shortcut and just use innerHTML
                            if (!rnoInnerhtml.test(value) &&
                                (htmlSerialize || !rnoshimcache.test(value)) &&
                                (leadingWhitespace || !rleadingWhitespace.test(value)) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {

                                value = value.replace(rxhtmlTag, "<$1></$2>");

                                try {

                                    // Remove element nodes and prevent memory leaks
                                    if (elem.nodeType === 1) {
                                        tangramDom.empty();
                                        elem.innerHTML = value;
                                    }

                                    elem = 0;

                                    // If using innerHTML throws an exception, use the fallback method
                                } catch (e) {}
                            }

                            if (elem) {
                                me.empty().append(value);
                            }

                            break;

                        case 'function':
                            isSet = true;
                            tangramDom.html(value.call(elem, index, tangramDom.html()));
                            break;
                    };
                });

                return isSet ? me : result;
            }
        });

        baidu._util_.smartInsert = function(tang, args, callback) {
            if (args.length <= 0 || tang.size() <= 0) {
                return;
            }
            if (baidu.type(args[0]) === 'function') {
                var fn = args[0],
                    tangItem;
                return baidu.forEach(tang, function(item, index) {
                    tangItem = baidu.dom(item);
                    args[0] = fn.call(item, index, tangItem.html());
                    baidu._util_.smartInsert(tangItem, args, callback);
                });
            }
            var doc = tang.getDocument() || document,
                fragment = doc.createDocumentFragment(),
                len = tang.length - 1,
                firstChild;
            for (var i = 0, item; item = args[i]; i++) {
                if (item.nodeType) {
                    fragment.appendChild(item);
                } else {
                    baidu.forEach(~'string|number'.indexOf(baidu.type(item)) ?
                        baidu.dom.createElements(item, doc) : item,
                        function(ele) {
                            fragment.appendChild(ele);
                        });
                }
            }
            if (!(firstChild = fragment.firstChild)) {
                return;
            }
            baidu.forEach(tang, function(item, index) {
                callback.call(item.nodeName.toLowerCase() === 'table' && firstChild.nodeName.toLowerCase() === 'tr' ?
                    item.tBodies[0] || item.appendChild(item.ownerDocument.createElement('tbody')) : item, index < len ? fragment.cloneNode(true) : fragment);
            });
        };



        baidu.dom.extend({
            append: function() {
                baidu.check('^(?:string|function|HTMLElement|\\$DOM)(?:,(?:string|array|HTMLElement|\\$DOM))*$', 'baidu.dom.append');
                baidu._util_.smartInsert(this, arguments, function(child) {
                    this.nodeType === 1 && this.appendChild(child);
                });
                return this;
            }
        });


        baidu.dom.extend({
            prepend: function() {
                baidu.check('^(?:string|function|HTMLElement|\\$DOM)(?:,(?:string|array|HTMLElement|\\$DOM))*$', 'baidu.dom.prepend');
                baidu._util_.smartInsert(this, arguments, function(child) {
                    this.nodeType === 1 && this.insertBefore(child, this.firstChild);
                });
                return this;
            }
        });


        baidu.makeArray = function(array, results) {
            var ret = results || [];
            if (!array) {
                return ret;
            }
            array.length == null || ~'string|function|regexp'.indexOf(baidu.type(array)) ? [].push.call(ret, array) : baidu.merge(ret, array);
            return ret;
        };

        baidu.dom.toggleClass = function(element, className) {
            if (baidu.dom.hasClass(element, className)) {
                baidu.dom.removeClass(element, className);
            } else {
                baidu.dom.addClass(element, className);
            }
        };



        baidu.dom.extend({
            map: function(iterator) {
                baidu.check("function", "baidu.dom.map");
                var ret = [],
                    i = 0;

                baidu.forEach(this, function(dom, index) {
                    ret[i++] = iterator.call(dom, index, dom, dom);
                });

                return this.pushStack(ret);
            }
        });



        void

        function(base, be) {
            if (base.core) return;

            var queue = base.queue;
            var core = base.core = {};
            var special = be.special = {};
            var push = [].push;

            var findVestedEl = function(target, parents) {
                var parentsTargets = [];
                for (var i = 0, l = parents.length; i < l; i++) {
                    if (parents.get(i).contains(target)) {
                        parentsTargets.push(parents[i]);
                    }
                }
                /**
                 *  chenqiao 2015-1-20
                 *  add start
                 */
                function inner2Outer(elementsArray) {
                    if (elementsArray.length < 2) {
                        return elementsArray;
                    } else {
                        var obj = [];
                        for (var k = 0; k < elementsArray.length; k++) {
                            obj.push({
                                'deep': domDeeps(elementsArray[k]),
                                'value': elementsArray[k],
                                toString: function() {
                                    return this.value;
                                }
                            });
                        }
                        obj.sort(function(a, b) {
                            return b.deep - a.deep;
                        });
                        elementsArray = [];
                        for (var k = 0; k < obj.length; k++) {
                            elementsArray.push(obj[k].value);
                        }
                        return elementsArray;
                    }
                };

                function domDeeps(ele) {
                    var deep = 0;
                    while (!(ele.parentElement === document.body)) {
                        deep++;
                        ele = ele.parentElement;
                    }
                    return deep;
                }

                /**
                 * add end
                 */
                //return parentsTargets;
                return inner2Outer(parentsTargets);
            };

            core.build = function(target, name, fn, selector, data) {

                var bindElements;

                if (selector)
                    bindElements = baidu.dom(selector, target);

                if ((name in special) && special[name].pack)
                    fn = special[name].pack(fn);

                return function(e) { // e is instance of baidu.event()
                    var t = baidu.dom(e.target),
                        args = [e],
                        bindElementArray;

                    if (data && !e.data)
                        e.data = data;
                    if (e.triggerData)
                        push.apply(args, e.triggerData);

                    if (!bindElements)
                        return e.result = fn.apply(target, args);

                    for (var i = 0; i < 2; i++) {
                        // 后添加的元素加入到bindElements中
                        bindElements = baidu.dom(selector, target);
                        var isNext = true;
                        if ((bindElementArray = findVestedEl(e.target, bindElements)) && bindElementArray.length) {
                            for (var h = 0; h < bindElementArray.length; h++) {
                                if (isNext && fn.apply(bindElementArray[h], args) === false) {
                                    isNext = false;
                                }
                                //fn.apply(bindElementArray[h], args);
                            }
                            return;
                        }
                    }
                };
            };

            core.add = function(target, type, fn, selector, data, one) {
                var pkg = this.build(target, type, fn, selector, data),
                    attachElements, bindType;
                bindType = type;
                if (type in special)
                    attachElements = special[type].attachElements,
                    bindType = special[type].bindType || type;

                queue.add(target, type, bindType, {
                    type: type,
                    pkg: pkg,
                    orig: fn,
                    one: one,
                    delegate: selector
                }, attachElements);
            };

            core.remove = function(target, type, fn, selector) {
                queue.remove(target, type, fn, selector);
            };

        }(baidu._util_.eventBase, baidu.event);



        baidu.dom.extend({
            clone: function() {
                var util = baidu._util_,
                    eventCore = util.eventBase.core,
                    eventQueue = util.eventBase.queue,
                    div = util.support.dom.div,
                    noCloneChecked = util.support.dom.input.cloneNode(true).checked, //用于判断ie是否支持clone属性
                    noCloneEvent = true;
                if (!div.addEventListener && div.attachEvent && div.fireEvent) {
                    div.attachEvent('onclick', function() {
                        noCloneEvent = false;
                    });
                    div.cloneNode(true).fireEvent('onclick');
                }
                //
                function getAll(ele) {
                    return ele.getElementsByTagName ? ele.getElementsByTagName('*') : (ele.querySelectorAll ? ele.querySelectorAll('*') : []);
                }
                //
                function cloneFixAttributes(src, dest) {
                    dest.clearAttributes && dest.clearAttributes();
                    dest.mergeAttributes && dest.mergeAttributes(src);
                    switch (dest.nodeName.toLowerCase()) {
                        case 'object':
                            dest.outerHTML = src.outerHTML;
                            break;
                        case 'textarea':
                        case 'input':
                            if (~'checked|radio'.indexOf(src.type)) {
                                src.checked && (dest.defaultChecked = dest.checked = src.checked);
                                dest.value !== src.value && (dest.value = src.value);
                            }
                            dest.defaultValue = src.defaultValue;
                            break;
                        case 'option':
                            dest.selected = src.defaultSelected;
                            break;
                        case 'script':
                            dest.text !== src.text && (dest.text = src.text);
                            break;
                    }
                    dest[baidu.key] && dest.removeAttribute(baidu.key);
                }
                //
                function cloneCopyEvent(src, dest) {
                    if (dest.nodeType !== 1 || !baidu.id(src, 'get')) {
                        return;
                    }
                    var defaultEvents = eventQueue.get(src);
                    for (var i in defaultEvents) {
                        for (var j = 0, handler; handler = defaultEvents[i][j]; j++) {
                            eventCore.add(dest, i, handler.orig, null, null, handler.one);
                        }
                    }
                }
                //
                function clone(ele, dataAndEvents, deepDataAndEvents) {
                    var cloneNode = ele.cloneNode(true),
                        srcElements, destElements, len;
                    //IE
                    if ((!noCloneEvent || !noCloneChecked) && (ele.nodeType === 1 || ele.nodeType === 11) && !baidu._util_.isXML(ele)) {
                        cloneFixAttributes(ele, cloneNode);
                        srcElements = getAll(ele);
                        destElements = getAll(cloneNode);
                        len = srcElements.length;
                        for (var i = 0; i < len; i++) {
                            destElements[i] && cloneFixAttributes(srcElements[i], destElements[i]);
                        }
                    }
                    if (dataAndEvents) {
                        cloneCopyEvent(ele, cloneNode);
                        if (deepDataAndEvents) {
                            srcElements = getAll(ele);
                            destElements = getAll(cloneNode);
                            len = srcElements.length;
                            for (var i = 0; i < len; i++) {
                                cloneCopyEvent(srcElements[i], destElements[i]);
                            }
                        }
                    }
                    return cloneNode;
                }
                //
                return function(dataAndEvents, deepDataAndEvents) {
                    dataAndEvents = !!dataAndEvents;
                    deepDataAndEvents = !!deepDataAndEvents;
                    return this.map(function() {
                        return clone(this, dataAndEvents, deepDataAndEvents);
                    });
                }
            }()
        });



        baidu.dom.extend({
            contains: function(contained) {
                var container = this[0];
                contained = baidu.dom(contained)[0];
                if (!container || !contained) {
                    return false;
                }
                return baidu._util_.contains(container, contained);
            }
        });



        /// Tangram 1.x Code Start

        baidu.dom._g = function(id) {
            return baidu.type(id) === 'string' ? document.getElementById(id) : id;
        };
        /// Tangram 1.x Code End

        /// Tangram 1.x Code Start
        baidu.dom.contains = function(container, contained) {
            var g = baidu.dom._g;
            return baidu._util_.contains(g(container), g(contained));
        };
        /// Tangram 1.x Code End

        baidu._util_.smartInsertTo = function(tang, target, callback, orie) {
            var insert = baidu.dom(target),
                first = insert[0],
                tangDom;

            if (orie && first && (!first.parentNode || first.parentNode.nodeType === 11)) {
                orie = orie === 'before';
                tangDom = baidu.merge(orie ? tang : insert, !orie ? tang : insert);
                if (tang !== tangDom) {
                    tang.length = 0;
                    baidu.merge(tang, tangDom);
                }
            } else {
                for (var i = 0, item; item = insert[i]; i++) {
                    baidu._util_.smartInsert(baidu.dom(item), i > 0 ? tang.clone(true, true) : tang, callback);
                }
            }
        };


        baidu.dom.extend({
            appendTo: function(target) {
                var ret = [],
                    array_push = ret.push;

                baidu.check('^(?:string|HTMLElement|\\$DOM)$', 'baidu.dom.appendTo');
                baidu._util_.smartInsertTo(this, target, function(child) {
                    array_push.apply(ret, baidu.makeArray(child.childNodes));
                    this.appendChild(child);
                });
                return this.pushStack(ret);
            }
        });



        baidu.dom.extend({
            prependTo: function(target) {
                var ret = [],
                    array_push = ret.push;
                baidu.check('^(?:string|HTMLElement|\\$DOM)$', 'baidu.dom.prependTo');
                baidu._util_.smartInsertTo(this, target, function(child) {
                    array_push.apply(ret, baidu.makeArray(child.childNodes));
                    this.insertBefore(child, this.firstChild);
                });
                return this.pushStack(ret);
            }
        });



        baidu.dom.extend({
            after: function() {
                baidu.check('^(?:string|function|HTMLElement|\\$DOM)(?:,(?:string|array|HTMLElement|\\$DOM))*$', 'baidu.dom.after');

                baidu._util_.smartInsert(this, arguments, function(node) {
                    this.parentNode && this.parentNode.insertBefore(node, this.nextSibling);
                });

                return this;
            }
        });



        baidu.dom.extend({
            before: function() {
                baidu.check('^(?:string|function|HTMLElement|\\$DOM)(?:,(?:string|array|HTMLElement|\\$DOM))*$', 'baidu.dom.before');

                baidu._util_.smartInsert(this, arguments, function(node) {
                    this.parentNode && this.parentNode.insertBefore(node, this);
                });

                return this;
            }
        });



        baidu.dom.extend({
            insertAfter: function(target) {
                var ret = [],
                    array_push = ret.push;

                baidu.check('^(?:string|HTMLElement|\\$DOM)$', 'baidu.dom.insertAfter');

                baidu._util_.smartInsertTo(this, target, function(node) {
                    array_push.apply(ret, baidu.makeArray(node.childNodes));
                    this.parentNode.insertBefore(node, this.nextSibling);
                }, 'after');

                return this.pushStack(ret);
            }
        });



        /// Tangram 1.x Code Start

        baidu.dom.insertAfter = function(newElement, existElement) {
            var get = baidu.dom._g;
            return baidu.dom(get(newElement)).insertAfter(get(existElement))[0];
        };
        /// Tangram 1.x Code End



        baidu.dom.extend({
            insertBefore: function(target) {
                var ret = [],
                    array_push = ret.push;
                baidu.check('^(?:string|HTMLElement|\\$DOM)$', 'baidu.dom.insertBefore');
                baidu._util_.smartInsertTo(this, target, function(node) {
                    array_push.apply(ret, baidu.makeArray(node.childNodes));
                    this.parentNode.insertBefore(node, this);
                }, 'before');
                return this.pushStack(ret);
            }
        });



        /// Tangram 1.x Code Start

        baidu.dom.insertBefore = function(newElement, existElement) {
            var get = baidu.dom._g;
            return baidu.dom(get(newElement)).insertBefore(get(existElement))[0];
        };
        /// Tangram 1.x Code End



        baidu.dom.match = function() {
            var reg = /^[\w\#\-\$\.\*]+$/,

                // 使用这个临时的 div 作为CSS选择器过滤
                div = document.createElement("DIV");
            div.id = "__tangram__";

            return function(array, selector, context) {
                var root, results = baidu.array();

                switch (baidu.type(selector)) {
                    // 取两个 TangramDom 的交集
                    case "$DOM":
                        for (var x = array.length - 1; x > -1; x--) {
                            for (var y = selector.length - 1; y > -1; y--) {
                                array[x] === selector[y] && results.push(array[x]);
                            }
                        }
                        break;

                        // 使用过滤器函数，函数返回值是 Array
                    case "function":
                        baidu.forEach(array, function(item, index) {
                            selector.call(item, index) && results.push(item);
                        });
                        break;

                    case "HTMLElement":
                        baidu.forEach(array, function(item) {
                            item == selector && results.push(item);
                        });
                        break;

                        // CSS 选择器
                    case "string":
                        var da = baidu.query(selector, context || document);
                        baidu.forEach(array, function(item) {
                            if (root = getRoot(item)) {
                                var t = root.nodeType == 1
                                    // in DocumentFragment
                                    ?
                                    baidu.query(selector, root) : da;

                                for (var i = 0, n = t.length; i < n; i++) {
                                    if (t[i] === item) {
                                        results.push(item);
                                        break;
                                    }
                                }
                            }
                        });
                        results = results.unique();
                        break;

                    default:
                        results = baidu.array(array).unique();
                        break;
                }
                return results;

            };

            function getRoot(dom) {
                var result = [],
                    i;

                while (dom = dom.parentNode) {
                    dom.nodeType && result.push(dom);
                }

                for (var i = result.length - 1; i > -1; i--) {
                    // 1. in DocumentFragment
                    // 9. Document
                    if (result[i].nodeType == 1 || result[i].nodeType == 9) {
                        return result[i];
                    }
                }
                return null;
            }
        }();



        baidu.dom.extend({
            filter: function(selector) {
                return this.pushStack(baidu.dom.match(this, selector));
            }
        });



        baidu.dom.extend({
            remove: function(selector, keepData) {
                arguments.length > 0 && baidu.check('^string(?:,boolean)?$', 'baidu.dom.remove');
                var array = selector ? this.filter(selector) : this;
                for (var i = 0, ele; ele = array[i]; i++) {
                    if (!keepData && ele.nodeType === 1) {
                        baidu._util_.cleanData(ele.getElementsByTagName('*'));
                        baidu._util_.cleanData([ele]);
                    }
                    ele.parentNode && ele.parentNode.removeChild(ele);
                }
                return this;
            }
        });


        baidu.dom.extend({
            detach: function(selector) {
                selector && baidu.check('^string$', 'baidu.dom.detach');
                return this.remove(selector, true);
            }
        });



        baidu.dom.extend({
            getWindow: function() {
                var doc = this.getDocument();
                return (this.size() <= 0) ? undefined : (doc.parentWindow || doc.defaultView);
            }
        });



        baidu.dom.extend({
            text: function(value) {

                var bd = baidu.dom,
                    me = this,
                    isSet = false,
                    result;

                //当dom选择器为空时
                if (this.size() <= 0) {
                    switch (typeof value) {
                        case 'undefined':
                            return undefined;
                            // break;
                        default:
                            return me;
                            // break;
                    }
                }


                var getText = function(elem) {
                    var node,
                        ret = "",
                        i = 0,
                        nodeType = elem.nodeType;

                    if (nodeType) {
                        if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
                            // Use textContent for elements
                            // innerText usage removed for consistency of new lines (see #11153)
                            if (typeof elem.textContent === "string") {
                                return elem.textContent;
                            } else {
                                // Traverse its children
                                for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                                    ret += getText(elem);
                                }
                            }
                        } else if (nodeType === 3 || nodeType === 4) {
                            return elem.nodeValue;
                        }
                        // Do not include comment or processing instruction nodes
                    }
                    //  else {

                    //     // If no nodeType, this is expected to be an array
                    //     for ( ; (node = elem[i]); i++ ) {
                    //         // Do not traverse comment nodes
                    //         ret += getText( node );
                    //     }
                    // }
                    return ret;
                };

                baidu.forEach(me, function(elem, index) {

                    var tangramDom = bd(elem);
                    if (result) {
                        return;
                    };

                    switch (typeof value) {
                        case 'undefined':

                            //get first
                            result = getText(elem);
                            return result;

                            // break;

                        case 'number':
                            value = String(value);
                        case 'string':

                            //set all
                            isSet = true;
                            tangramDom.empty().append((elem && elem.ownerDocument || document).createTextNode(value));
                            break;

                        case 'function':

                            //set all
                            isSet = true;
                            tangramDom.text(value.call(elem, index, tangramDom.text()));

                            break;
                    };
                });

                return isSet ? me : result;
            }
        });



        baidu.dom.extend({
            find: function(selector) {
                var a = [],
                    expr,
                    id = "__tangram__find__",
                    td = [];

                switch (baidu.type(selector)) {
                    case "string":
                        this.each(function() {
                            baidu.merge(td, baidu.query(selector, this));
                        });
                        break;
                    case "HTMLElement":
                        expr = selector.tagName + "#" + (selector.id ? selector.id : (selector.id = id));
                        this.each(function() {
                            if (baidu.query(expr, this).length > 0) a.push(selector);
                        });
                        selector.id == id && (selector.id = "");
                        if (a.length > 0) baidu.merge(td, a);
                        break;
                    case "$DOM":
                        a = selector.get();
                        this.each(function() {
                            baidu.forEach(baidu.query("*", this), function(dom) {
                                for (var i = 0, n = a.length; i < n; i++) {
                                    dom === a[i] && (td[td.length++] = a[i]);
                                }
                            });
                        });
                        break;
                }
                return this.pushStack(td);
            }
        });



        baidu._util_.inArray = function(ele, array, index) {
            if (!array) {
                return -1;
            }
            var indexOf = Array.prototype.indexOf,
                len;
            if (indexOf) {
                return indexOf.call(array, ele, index);
            }
            len = array.length;
            index = index ? index < 0 ? Math.max(0, len + index) : index : 0;
            for (; index < len; index++) {
                if (index in array && array[index] === ele) {
                    return index;
                }
            }
            return -1;
        };



        baidu.array.extend({
            map: function(iterator, context) {
                baidu.check("function(,.+)?", "baidu.array.map");
                var len = this.length,
                    array = baidu.array([]);
                for (var i = 0; i < len; i++) {
                    array[i] = iterator.call(context || this, this[i], i, this);
                }
                return array;
            }
        });
        /// Tangram 1.x Code Start
        baidu.array.map = function(array, iterator, context) {
            return baidu.isArray(array) ? baidu.array(array).map(iterator, context) : array;
        };
        baidu.map = baidu.array.map;
        /// Tangram 1.x Code End



        baidu.dom.extend({
            val: function() {
                baidu._util_.support.dom.select.disabled = true;
                var util = baidu._util_,
                    checkOn = util.support.dom.input.value === 'on',
                    optDisabled = !util.support.dom.opt.disabled,
                    inputType = ['radio', 'checkbox'],
                    valHooks = {
                        option: {
                            get: function(ele) {
                                var val = ele.attributes.value;
                                return !val || val.specified ? ele.value : ele.text;
                            }
                        },
                        select: {
                            get: function(ele) {
                                var options = ele.options,
                                    index = ele.selectedIndex,
                                    one = ele.type === 'select-one' || index < 0,
                                    ret = one ? null : [],
                                    len = one ? index + 1 : options.length,
                                    i = index < 0 ? len : one ? index : 0,
                                    item, val;
                                for (; i < len; i++) {
                                    item = options[i];
                                    if ((item.selected || i === index) && (optDisabled ? !item.disabled : item.getAttribute('disabled') === null) && (!item.parentNode.disabled || !util.nodeName(item.parentNode, 'optgroup'))) {
                                        val = baidu.dom(item).val();
                                        if (one) {
                                            return val;
                                        }
                                        ret.push(val);
                                    }
                                }
                                return ret;
                            },
                            set: function(ele, key, val) {
                                var ret = baidu.makeArray(val);
                                baidu.dom(ele).find('option').each(function(index, item) {
                                    item.selected = util.inArray(baidu.dom(this).val(), ret) >= 0;
                                });
                                !ret.length && (ele.selectedIndex = -1);
                                return ret;
                            }
                        }
                    };
                !util.support.getSetAttribute && (valHooks.button = util.nodeHook);
                if (!checkOn) {
                    baidu.forEach(inputType, function(item) {
                        valHooks[item] = {
                            get: function(ele) {
                                return ele.getAttribute('value') === null ? 'on' : ele.value;
                            }
                        };
                    });
                }
                baidu.forEach(inputType, function(item) {
                    valHooks[item] = valHooks[item] || {};
                    valHooks[item].set = function(ele, key, val) {
                        if (baidu.type(val) === 'array') {
                            return (ele.checked = util.inArray(baidu.dom(ele).val(), val) >= 0);
                        }
                    }
                });

                return function(value) {
                    var ele, hooks;
                    if (value === undefined) {
                        if (!(ele = this[0])) {
                            return;
                        }
                        hooks = valHooks[ele.type] || valHooks[ele.nodeName.toLowerCase()] || {};
                        return hooks.get && hooks.get(ele, 'value') || ele.value;
                    }
                    this.each(function(index, item) {
                        if (item.nodeType !== 1) {
                            return;
                        }
                        var tang = baidu.dom(item),
                            val = baidu.type(value) === 'function' ?
                            value.call(item, index, tang.val()) : value;
                        if (val == null) {
                            val = '';
                        } else if (baidu.type(val) === 'number') {
                            val += '';
                        } else if (baidu.type(val) === 'array') {
                            val = baidu.array(val).map(function(it) {
                                return it == null ? '' : it + '';
                            });
                        }
                        hooks = valHooks[item.type] || valHooks[item.nodeName.toLowerCase()] || {};
                        if (!hooks.set || hooks.set(item, 'value', val) === undefined) {
                            item.value = val;
                        }
                    });
                    return this;
                }
            }()
        });



        //baidu.browser.opera = /opera(\/| )(\d+(\.\d+)?)(.+?(version\/(\d+(\.\d+)?)))?/i.test(navigator.userAgent) ?  + ( RegExp["\x246"] || RegExp["\x242"] ) : undefined;



        baidu.dom.extend({
            insertHTML: function(position, html) {
                var range, begin, element = this[0];

                //在opera中insertAdjacentHTML方法实现不标准，如果DOMNodeInserted方法被监听则无法一次插入多element
                //by lixiaopeng @ 2011-8-19
                if (element.insertAdjacentHTML && !baidu.browser.opera) {
                    element.insertAdjacentHTML(position, html);
                } else {
                    // 这里不做"undefined" != typeof(HTMLElement) && !window.opera判断，其它浏览器将出错？！
                    // 但是其实做了判断，其它浏览器下等于这个函数就不能执行了
                    range = element.ownerDocument.createRange();
                    // FF下range的位置设置错误可能导致创建出来的fragment在插入dom树之后html结构乱掉
                    // 改用range.insertNode来插入html, by wenyuxiang @ 2010-12-14.
                    position = position.toUpperCase();
                    if (position == 'AFTERBEGIN' || position == 'BEFOREEND') {
                        range.selectNodeContents(element);
                        range.collapse(position == 'AFTERBEGIN');
                    } else {
                        begin = position == 'BEFOREBEGIN';
                        range[begin ? 'setStartBefore' : 'setEndAfter'](element);
                        range.collapse(begin);
                    }
                    range.insertNode(range.createContextualFragment(html));
                }
                return element;
            }
        });



        baidu.dom.extend({
            on: function(events, selector, data, fn, _one) {
                var eb = baidu._util_.eventBase.core;
                // var specials = { mouseenter: 1, mouseleave: 1, focusin: 1, focusout: 1 };

                if (typeof selector == "object" && selector)
                    fn = data,
                    data = selector,
                    selector = null;
                else if (typeof data == "function")
                    fn = data,
                    data = null;
                else if (typeof selector == "function")
                    fn = selector,
                    selector = data = null;

                if (typeof events == "string") {
                    events = events.split(/[ ,]+/);
                    this.each(function() {
                        baidu.forEach(events, function(event) {
                            // if( specials[ event ] )
                            //     baidu( this )[ event ]( data, fn );
                            // else
                            eb.add(this, event, fn, selector, data, _one);
                        }, this);
                    });
                } else if (typeof events == "object") {
                    if (fn)
                        fn = null;
                    baidu.forEach(events, function(fn, eventName) {
                        this.on(eventName, selector, data, fn, _one);
                    }, this);
                }

                return this;
            }

            // _on: function( name, data, fn ){
            //     var eb = baidu._util_.eventBase;
            //     this.each(function(){
            //         eb.add( this, name, fn, undefined, data );
            //     });
            //     return this;
            // }
        });

        /// support - magic Tangram 1.x Code Start

        baidu.event.on = baidu.on = function(element, evtName, handler) {
            if (typeof element == "string")
                element = baidu.dom.g(element);
            baidu.dom(element).on(evtName.replace(/^\s*on/, ""), handler);
            return element;
        };
        /// support - magic Tangram 1.x Code End



        baidu.dom.extend({
            off: function(events, selector, fn) {
                var eb = baidu._util_.eventBase.core,
                    me = this;
                if (!events)
                    baidu.forEach(this, function(item) {
                        eb.remove(item);
                    });
                else if (typeof events == "string") {
                    if (typeof selector == "function")
                        fn = selector,
                        selector = null;
                    events = events.split(/[ ,]/);
                    baidu.forEach(this, function(item) {
                        baidu.forEach(events, function(event) {
                            eb.remove(item, event, fn, selector);
                        });
                    });
                } else if (typeof events == "object")
                    baidu.forEach(events, function(fn, event) {
                        me.off(event, selector, fn);
                    });

                return this;
            }
        });

        /// support - magic Tangram 1.x Code Start

        baidu.event.un = baidu.un = function(element, evtName, handler) {
            if (typeof element == "string")
                element = baidu.dom.g(element);
            baidu.dom(element).off(evtName.replace(/^\s*on/, ''), handler);
            return element;
        };
        /// support - magic Tangram 1.x Code End



        baidu.dom.extend({
            bind: function(type, data, fn) {
                return this.on(type, undefined, data, fn);
            }
        });



        baidu.dom.extend({
            unbind: function(type, fn) {
                return this.off(type, fn);
            }
        });



        void

        function(special) {
            if (special.mousewheel) return;
            var ff = /firefox/i.test(navigator.userAgent),
                ie = /msie/i.test(navigator.userAgent);

            baidu.each({
                mouseenter: "mouseover",
                mouseleave: "mouseout"
            }, function(name, fix) {
                special[name] = {
                    bindType: fix,
                    pack: function(fn) {
                        var contains = baidu.dom.contains;
                        return function(e) { // e instance of baidu.event
                            var related = e.relatedTarget;
                            e.type = name;
                            if (!related || (related !== this && !contains(this, related)))
                                return fn.apply(this, arguments);
                        }
                    }
                }
            });

            if (!ie)
                baidu.each({
                    focusin: "focus",
                    focusout: "blur"
                }, function(name, fix) {
                    special[name] = {
                        bindType: fix,
                        attachElements: "textarea,select,input,button,a"
                    }
                });

            special.mousewheel = {
                bindType: ff ? "DOMMouseScroll" : "mousewheel",
                pack: function(fn) {
                    return function(e) { // e instance of baidu.event
                        var oe = e.originalEvent;
                        e.type = "mousewheel";
                        e.wheelDelta = e.wheelDelta || (ff ? oe.detail * -40 : oe.wheelDelta) || 0;
                        return fn.apply(this, arguments);
                    }
                }
            };

        }(baidu.event.special);



        void

        function(base) {
            var queue = base.queue;

            baidu.dom.extend({
                triggerHandler: function(type, triggerData, _e) {
                    if (_e && !_e.triggerData)
                        _e.triggerData = triggerData;

                    baidu.forEach(this, function(item) {
                        queue.call(item, type, undefined, _e);
                    });
                    return this;
                }
            });

        }(baidu._util_.eventBase);



        void

        function(base, be) {
            var special = be.special;
            var queue = base.queue;
            var dom = baidu.dom;

            var ie = !window.addEventListener,
                firefox = /firefox/i.test(navigator.userAgent);

            var abnormals = {
                submit: 3,
                focus: ie ? 3 : 2,
                blur: ie ? 3 : firefox ? 1 : 2
            };

            var createEvent = function(type, opts) {
                var evnt;

                if (document.createEvent)
                    evnt = document.createEvent("HTMLEvents"),
                    evnt.initEvent(type, true, true);
                else if (document.createEventObject)
                    evnt = document.createEventObject(),
                    evnt.type = type;

                var extraData = {};

                if (opts)
                    for (var name in opts)
                        try {
                            evnt[name] = opts[name];
                        } catch (e) {
                            if (!evnt.extraData)
                                evnt.extraData = extraData;
                            extraData[name] = opts[name];
                        }

                return evnt;
            };

            var dispatchEvent = function(element, type, event) {
                if (element.dispatchEvent)
                    return element.dispatchEvent(event);
                else if (element.fireEvent)
                    return element.fireEvent("on" + type, event);
            };

            //    var upp = function( str ){
            //        return str.toLowerCase().replace( /^\w/, function( s ){
            //            return s.toUpperCase();
            //        } );
            //    };

            var fire = function(element, type, triggerData, _eventOptions, special) {
                var evnt, eventReturn;

                if (evnt = createEvent(type, _eventOptions)) {
                    if (triggerData)
                        evnt.triggerData = triggerData;

                    if (special)
                        queue.call(element, type, null, evnt);
                    else {
                        var abnormalsType = element.window === window ? 3 : abnormals[type];

                        try {
                            if (abnormalsType & 1 || !(type in abnormals))
                                eventReturn = dispatchEvent(element, type, evnt);
                        } catch (e) {
                            dom(element).triggerHandler(type, triggerData, evnt);
                        }

                        if (eventReturn !== false && abnormalsType & 2) {
                            try {
                                if (element[type])
                                    element[type]();
                            } catch (e) {}
                        }
                    }
                }
            };

            baidu.dom.extend({
                trigger: function(type, triggerData, _eventOptions) {
                    var sp;

                    if (type in special)
                        sp = special[type];

                    this.each(function() {
                        fire(this, type, triggerData, _eventOptions, sp);
                    });

                    return this;
                }
            });
        }(baidu._util_.eventBase, baidu.event);



        baidu.array.extend({
            indexOf: function(match, fromIndex) {
                baidu.check(".+(,number)?", "baidu.array.indexOf");
                var len = this.length;

                // 小于 0
                (fromIndex = fromIndex | 0) < 0 && (fromIndex = Math.max(0, len + fromIndex));

                for (; fromIndex < len; fromIndex++) {
                    if (fromIndex in this && this[fromIndex] === match) {
                        return fromIndex;
                    }
                }

                return -1;
            }
        });



        baidu.createChain('Callbacks', function(options) {
            var opts = options;
            if (baidu.type(options) === 'string') {
                opts = {};
                baidu.forEach(options.split(/\s/), function(item) {
                    opts[item] = true;
                });
            }
            return new baidu.Callbacks.$Callbacks(opts);
        }, function(options) {
            var opts = baidu.extend({}, options || {}),
                fnArray = [],
                fireQueue = [],
                fireIndex = 0,
                memory, isLocked, isFired, isFiring,
                fireCore = function(data, index) {
                    var item, fn;
                    if (!fireQueue || !fnArray) {
                        return;
                    }
                    memory = opts.memory && data;
                    isFired = true;
                    fireQueue.push(data);
                    if (isFiring) {
                        return;
                    }
                    isFiring = true;
                    while (item = fireQueue.shift()) {
                        for (fireIndex = index || 0; fn = fnArray[fireIndex]; fireIndex++) {
                            if (fn.apply(item[0], item[1]) === false && opts.stopOnFalse) {
                                memory = false;
                                break;
                            }
                        }
                    }
                    isFiring = false;
                    opts.once && (fnArray = []);
                },
                callbacks = {
                    add: function() {
                        if (!fnArray) {
                            return this;
                        }
                        var index = fnArray && fnArray.length;
                        (function add(args) {
                            var len = args.length,
                                type, item;
                            for (var i = 0, item; i < len; i++) {
                                if (!(item = args[i])) {
                                    continue;
                                }
                                type = baidu.type(item);
                                if (type === 'function') {
                                    (!opts.unique || !callbacks.has(item)) && fnArray.push(item);
                                } else if (item && item.length && type !== 'string') {
                                    add(item);
                                }
                            }
                        })(arguments);
                        !isFiring && memory && fireCore(memory, index);
                        return this;
                    },

                    remove: function() {
                        if (!fnArray) {
                            return this;
                        }
                        var index;
                        baidu.forEach(arguments, function(item) {
                            while ((index = baidu.array(fnArray).indexOf(item)) > -1) {
                                fnArray.splice(index, 1);
                                isFiring && index < fireIndex && fireIndex--;
                            }
                        });
                        return this;
                    },

                    has: function(fn) {
                        return baidu.array(fnArray).indexOf(fn) > -1;
                    },

                    empty: function() {
                        return fnArray = [], this;
                    },
                    disable: function() {
                        return fnArray = fireQueue = memory = undefined, this;
                    },
                    disabled: function() {
                        return !fnArray;
                    },
                    lock: function() {
                        isLocked = true;
                        !memory && callbacks.disable();
                        return this;
                    },
                    fired: function() {
                        return isFired;
                    },
                    fireWith: function(context, args) {
                        if (isFired && opts.once || isLocked) {
                            return this;
                        }
                        args = args || [];
                        args = [context, args.slice ? args.slice() : args];
                        fireCore(args);
                        return this;
                    },
                    fire: function() {
                        callbacks.fireWith(this, arguments);
                        return this;
                    }
                };
            return callbacks;
        });



        baidu.createChain('Deferred', function(fn) {
            return new baidu.Deferred.$Deferred(fn);
        }, function(fn) {
            var me = this,
                state = 'pending',
                tuples = [
                    ['resolve', 'done', baidu.Callbacks('once memory'), 'resolved'],
                    ['reject', 'fail', baidu.Callbacks('once memory'), 'rejected'],
                    ['notify', 'progress', baidu.Callbacks('memory')]
                ],
                promise = {
                    state: function() {
                        return state;
                    },
                    always: function() {
                        me.done(arguments).fail(arguments);
                        return this;
                    },
                    then: function() {

                        var args = arguments;
                        return baidu.Deferred(function(defer) {
                            baidu.forEach(tuples, function(item, index) {
                                var action = item[0],
                                    fn = args[index];
                                me[item[1]](baidu.type(fn) === 'function' ? function() {
                                    var ret = fn.apply(this, arguments);
                                    if (ret && baidu.type(ret.promise) === 'function') {
                                        ret.promise()
                                            .done(defer.resolve)
                                            .fail(defer.reject)
                                            .progress(defer.notify);
                                    } else {
                                        defer[action + 'With'](this === me ? defer : this, [ret]);
                                    }
                                } : defer[action]);
                            });
                        }).promise();

                    },
                    promise: function(instance) {
                        return instance != null ? baidu.extend(instance, promise) : promise;
                    }
                };
            //
            promise.pipe = promise.then;
            baidu.forEach(tuples, function(item, index) {
                var callbacks = item[2],
                    stateName = item[3];
                // promise[ done | fail | progress ] = list.add
                promise[item[1]] = callbacks.add;
                stateName && callbacks.add(function() {
                    // state = [ resolved | rejected ]
                    state = stateName;
                    // [ reject_list | resolve_list ].disable; progress_list.lock
                }, tuples[index ^ 1][2].disable, tuples[2][2].lock);
                // deferred[ resolve | reject | notify ] = list.fire
                me[item[0]] = callbacks.fire;
                me[item[0] + 'With'] = callbacks.fireWith;
            });
            promise.promise(me);
            fn && fn.call(me, me);
        });



        baidu.dom.extend({
            ready: function() {

                var me = this,

                    // The deferred used on DOM ready
                    readyList,

                    // Use the correct document accordingly with window argument (sandbox)
                    document = window.document;

                // Is the DOM ready to be used? Set to true once it occurs.
                baidu._util_.isDomReady = false;

                // A counter to track how many items to wait for before
                // the ready event fires. See #6781
                baidu._util_._readyWait = 1;

                // Hold (or release) the ready event
                baidu.dom.holdReady = function(hold) {
                    if (hold) {
                        baidu._util_.readyWait++;
                    } else {
                        _ready(true);
                    }
                };

                // Handle when the DOM is ready
                var _ready = function(wait) {

                    // Abort if there are pending holds or we're already ready
                    if (wait === true ? --baidu._util_.readyWait : baidu._util_.isDomReady) {
                        return;
                    }

                    // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
                    if (!document.body) {
                        return setTimeout(_ready, 1);
                    }

                    // Remember that the DOM is ready
                    baidu._util_.isReady = true;

                    // If a normal DOM Ready event fired, decrement, and wait if need be
                    if (wait !== true && --baidu._util_.readyWait > 0) {
                        return;
                    }

                    // If there are functions bound, to execute
                    readyList.resolveWith(document);

                    // Trigger any bound ready events
                    if (baidu.dom.trigger) {
                        baidu.dom(document).trigger("ready").off("ready");
                    }
                };

                var DOMContentLoaded = function() {
                    if (document.addEventListener) {
                        document.removeEventListener("DOMContentLoaded", DOMContentLoaded, false);
                        _ready();
                    } else if (document.readyState === "complete") {
                        // we're here because readyState === "complete" in oldIE
                        // which is good enough for us to call the dom ready!
                        document.detachEvent("onreadystatechange", DOMContentLoaded);
                        _ready();
                    }
                };

                var readyPromise = function(obj) {
                    if (!readyList) {

                        readyList = baidu.Deferred();

                        // Catch cases where $(document).ready() is called after the browser event has already occurred.
                        // we once tried to use readyState "interactive" here, but it caused issues like the one
                        // discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
                        if (document.readyState === "complete") {
                            // Handle it asynchronously to allow scripts the opportunity to delay ready
                            setTimeout(_ready, 1);

                            // Standards-based browsers support DOMContentLoaded
                        } else if (document.addEventListener) {
                            // Use the handy event callback
                            document.addEventListener("DOMContentLoaded", DOMContentLoaded, false);

                            // A fallback to window.onload, that will always work
                            window.addEventListener("load", _ready, false);

                            // If IE event model is used
                        } else {
                            // Ensure firing before onload, maybe late but safe also for iframes
                            document.attachEvent("onreadystatechange", DOMContentLoaded);

                            // A fallback to window.onload, that will always work
                            window.attachEvent("onload", _ready);

                            // If IE and not a frame
                            // continually check to see if the document is ready
                            var top = false;

                            try {
                                top = window.frameElement == null && document.documentElement;
                            } catch (e) {}

                            if (top && top.doScroll) {
                                (function doScrollCheck() {
                                    if (!baidu._util_.isDomReady) {

                                        try {
                                            // Use the trick by Diego Perini
                                            // http://javascript.nwbox.com/IEContentLoaded/
                                            top.doScroll("left");
                                        } catch (e) {
                                            return setTimeout(doScrollCheck, 50);
                                        }

                                        // and execute any waiting functions
                                        _ready();
                                    }
                                })();
                            }
                        }
                    }
                    return readyList.promise(obj);
                };

                return function(fn) {

                    // Add the callback
                    readyPromise().done(fn);

                    return me;
                }

            }()
        });

        /// Tangram 1.x Code Start
        baidu.dom.ready = baidu.dom.fn.ready;
        /// Tangram 1.x Code End



        baidu.dom.extend({
            one: function(types, selector, data, fn) {
                return this.on(types, selector, data, fn, 1);
            }
        });



        baidu.dom.extend({
            delegate: function(selector, type, data, fn) {
                if (typeof data == "function")
                    fn = data,
                    data = null;
                return this.on(type, selector, data, fn);
            }
        });



        baidu.dom.extend({
            undelegate: function(selector, type, fn) {
                return this.off(type, selector, fn);
            }
        });

        void

        function() {
            var arr = ("blur focus focusin focusout load resize scroll unload click dblclick " +
                "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave mousewheel " +
                "change select submit keydown keypress keyup error contextmenu").split(" ");

            var conf = {};
            var create = function(name) {
                conf[name] = function(data, fn) {
                    if (fn == null)
                        fn = data,
                        data = null;

                    return arguments.length > 0 ?
                        this.on(name, null, data, fn) :
                        this.trigger(name);
                }
            };

            for (var i = 0, l = arr.length; i < l; i++)
                create(arr[i]);

            baidu.dom.extend(conf);
        }();



        baidu.dom.extend({
            is: function(selector) {
                return baidu.dom.match(this, selector).length > 0;
            }
        });



        baidu.dom.extend({
            children: function(selector) {
                var a = [];

                this.each(function() {
                    baidu.forEach(this.children || this.childNodes, function(dom) {
                        dom.nodeType == 1 && a.push(dom);
                    });
                });

                return this.pushStack(baidu.dom.match(a, selector));
            }
        });

        /// Tangram 1.x Code Start

        baidu.dom.children = function(dom) {
            baidu.check("string|HTMLElement", "baidu.dom.children");
            return baidu.dom(baidu.isString(dom) ? "#" + dom : dom).children().toArray();
        };
        /// Tangram 1.x Code End



        baidu.dom.extend({
            first: function() {
                return this.eq(0);
            }
        });
        /// Tangram 1.x Code Start
        baidu.dom.first = function(e) {
            baidu.isString(e) && (e = "#" + e);

            return baidu.dom(e).children()[0];
        };
        /// Tangram 1.x Code End



        baidu.dom.extend({
            last: function() {
                return this.eq(-1);
            }
        });



        /// Tangram 1.x Code Start
        baidu.dom.last = function(element) {
            element = baidu.dom.g(element);

            for (var node = element.lastChild; node; node = node.previousSibling) {
                if (node.nodeType == 1) {
                    return node;
                }
            }

            return null;
        };
        /// Tangram 1.x Code End



        baidu.dom.extend({
            has: function(selector) {
                var a = [],
                    td = baidu.dom(document.body);

                baidu.forEach(this, function(dom) {
                    td[0] = dom;
                    td.find(selector).length && a.push(dom);
                });

                return baidu.dom(a);
            }
        });



        baidu.dom.extend({
            not: function(selector) {
                var i, j, n, all = this.get(),
                    a = baidu.isArray(selector) ? selector : baidu.dom.match(this, selector);

                for (i = all.length - 1; i > -1; i--) {
                    for (j = 0, n = a.length; j < n; j++) {
                        a[j] === all[i] && all.splice(i, 1);
                    }
                }

                return this.pushStack(all);
            }
        });



        baidu.dom.extend({
            slice: function() {
                var slice = Array.prototype.slice;

                return function(start, end) {
                    baidu.check("number(,number)?", "baidu.dom.slice");

                    // ie bug
                    // return baidu.dom( this.toArray().slice(start, end) );
                    return this.pushStack(slice.apply(this, arguments));
                }
            }()
        });



        baidu.dom.extend({
            closest: function(selector, context) {
                var results = baidu.array();

                baidu.forEach(this, function(dom) {
                    var t = [dom];
                    while (dom = dom.parentNode) {
                        dom.nodeType && t.push(dom);
                    }
                    t = baidu.dom.match(t, selector, context);

                    t.length && results.push(t[0]);
                });

                return this.pushStack(results.unique());
            }
        });



        baidu.dom.extend({
            next: function(filter) {
                var td = [];

                baidu.forEach(this, function(dom) {
                    while ((dom = dom.nextSibling) && dom && dom.nodeType != 1);
                    dom && (td[td.length++] = dom);
                });

                return this.pushStack(filter ? baidu.dom.match(td, filter) : td);
            }
        });



        baidu.dom.extend({
            nextAll: function(selector) {
                var array = [];

                baidu.forEach(this, function(dom) {
                    while (dom = dom.nextSibling) {
                        dom && (dom.nodeType == 1) && array.push(dom);
                    };
                });

                return this.pushStack(baidu.dom.match(array, selector));
            }
        });



        baidu.dom.extend({
            nextUntil: function(selector, filter) {
                var array = baidu.array();

                baidu.forEach(this, function(dom) {
                    var a = baidu.array();

                    while (dom = dom.nextSibling) {
                        dom && (dom.nodeType == 1) && a.push(dom);
                    };

                    if (selector && a.length) {
                        var b = baidu.dom.match(a, selector);
                        // 有符合 selector 的目标存在
                        if (b.length) {
                            a = a.slice(0, a.indexOf(b[0]));
                        }
                    }
                    baidu.merge(array, a);
                });

                return this.pushStack(baidu.dom.match(array, filter));
            }
        });



        baidu.dom.extend({
            offset: function() {

                function setOffset(ele, options, index) {
                    var tang = tang = baidu.dom(ele),
                        position = tang.getCurrentStyle('position');
                    position === 'static' && (ele.style.position = 'relative');
                    var currOffset = tang.offset(),
                        currLeft = tang.getCurrentStyle('left'),
                        currTop = tang.getCurrentStyle('top'),
                        calculatePosition = (~'absolute|fixed'.indexOf(position)) && ~('' + currLeft + currTop).indexOf('auto'),
                        curPosition = calculatePosition && tang.position();
                    currLeft = curPosition && curPosition.left || parseFloat(currLeft) || 0;
                    currTop = curPosition && curPosition.top || parseFloat(currTop) || 0;
                    baidu.type('options') === 'function' && (options = options.call(ele, index, currOffset));
                    options.left != undefined && (ele.style.left = options.left - currOffset.left + currLeft + 'px');
                    options.top != undefined && (ele.style.top = options.top - currOffset.top + currTop + 'px');
                }

                return function(options) {
                    if (options) {
                        baidu.check('^(?:object|function)$', 'baidu.dom.offset');
                        for (var i = 0, item; item = this[i]; i++) {
                            setOffset(item, options, i);
                        }
                        return this;
                    }
                    var ele = this[0],
                        doc = this.getDocument(),
                        box = {
                            left: 0,
                            top: 0
                        },
                        win, docElement;
                    if (!doc) {
                        return;
                    }
                    docElement = doc.documentElement;
                    if (!baidu._util_.contains(docElement, ele)) {
                        return box;
                    }
                    (typeof ele.getBoundingClientRect) !== 'undefined' && (box = ele.getBoundingClientRect());
                    win = this.getWindow();
                    return {
                        left: box.left + (win.pageXOffset || docElement.scrollLeft) - (docElement.clientLeft || 0),
                        top: box.top + (win.pageYOffset || docElement.scrollTop) - (docElement.clientTop || 0)
                    };
                }
            }(),
            offsetParent: function() {
                return this.map(function() {
                    var offsetParent = this.offsetParent || document.body,
                        exclude = /^(?:body|html)$/i;
                    while (offsetParent && baidu.dom(offsetParent).getCurrentStyle('position') === 'static' && !exclude.test(offsetParent.nodeName)) {
                        offsetParent = offsetParent.offsetParent;
                    }
                    return offsetParent;
                });
            }
        });



        baidu.dom.extend({
            parent: function(filter) {
                var array = [];

                baidu.forEach(this, function(dom) {
                    (dom = dom.parentNode) && dom.nodeType == 1 && array.push(dom);
                });

                return this.pushStack(baidu.dom.match(array, filter));
            }
        });



        baidu.dom.extend({
            outerHeight: function(margin) {
                if (this.size() <= 0) {
                    return 0;
                }
                var ele = this[0],
                    type = ele != null && ele === ele.window ? 'window' : (ele.nodeType === 9 ? 'document' : false);
                return type ? baidu._util_.getWindowOrDocumentWidthOrHeight(ele, type, 'height') : baidu._util_.getWidthOrHeight(ele, 'height', 'padding|border' + (margin ? '|margin' : ''));
            },
            outerWidth: function(margin) {
                if (this.size() <= 0) {
                    return 0;
                }
                var ele = this[0],
                    type = ele != null && ele === ele.window ? 'window' : (ele.nodeType === 9 ? 'document' : false);
                return type ? baidu._util_.getWindowOrDocumentWidthOrHeight(ele, type, 'width') : baidu._util_.getWidthOrHeight(ele, 'width', 'padding|border' + (margin ? '|margin' : ''));
            }
        });


        baidu.dom.extend({
            parents: function(filter) {
                var array = [];

                baidu.forEach(this, function(dom) {
                    var a = [];

                    while ((dom = dom.parentNode) && dom.nodeType == 1) a.push(dom);

                    baidu.merge(array, a);
                });

                return this.pushStack(baidu.dom.match(array, filter));
            }
        });



        baidu.dom.extend({
            parentsUntil: function(selector, filter) {
                baidu.check("(string|HTMLElement)(,.+)?", "baidu.dom.parentsUntil");
                var array = [];

                baidu.forEach(this, function(dom) {
                    var a = baidu.array();

                    while ((dom = dom.parentNode) && dom.nodeType == 1) a.push(dom);

                    if (selector && a.length) {
                        var b = baidu.dom.match(a, selector);
                        // 有符合 selector 的目标存在
                        if (b.length) {
                            a = a.slice(0, a.indexOf(b[0]));
                        }
                    }
                    baidu.merge(array, a);
                });

                return this.pushStack(baidu.dom.match(array, filter));
            }
        });



        baidu.dom.extend({
            prev: function(filter) {
                var array = [];

                baidu.forEach(this, function(dom) {
                    while (dom = dom.previousSibling) {
                        if (dom.nodeType == 1) {
                            array.push(dom);
                            break;
                        }
                    }
                });

                return this.pushStack(baidu.dom.match(array, filter));
            }
        });



        baidu.dom.extend({
            prevAll: function(filter) {
                var array = baidu.array();

                baidu.forEach(this, function(dom) {
                    var a = [];
                    while (dom = dom.previousSibling) dom.nodeType == 1 && a.push(dom);

                    baidu.merge(array, a.reverse());
                });

                return this.pushStack(typeof filter == "string" ? baidu.dom.match(array, filter) : array.unique());
            }
        });



        baidu.dom.extend({
            prevUntil: function(selector, filter) {
                baidu.check("(string|HTMLElement)(,.+)?", "baidu.dom.prevUntil");
                var array = [];

                baidu.forEach(this, function(dom) {
                    var a = baidu.array();

                    while (dom = dom.previousSibling) {
                        dom && (dom.nodeType == 1) && a.push(dom);
                    };

                    if (selector && a.length) {
                        var b = baidu.dom.match(a, selector);
                        // 有符合 selector 的目标存在
                        if (b.length) {
                            a = a.slice(0, a.indexOf(b[0]));
                        }
                    }

                    baidu.merge(array, a);
                });

                return this.pushStack(baidu.dom.match(array, filter));
            }
        });



        baidu.dom.extend({
            siblings: function(filter) {
                var array = [];

                baidu.forEach(this, function(dom) {
                    var p = [],
                        n = [],
                        t = dom;

                    while (t = t.previousSibling) t.nodeType == 1 && p.push(t);
                    while (dom = dom.nextSibling) dom.nodeType == 1 && n.push(dom);

                    baidu.merge(array, p.reverse().concat(n));
                });

                return this.pushStack(baidu.dom.match(array, filter));
            }
        });



        baidu.dom.extend({
            add: function(object, context) {
                var a = baidu.array(this.get());

                switch (baidu.type(object)) {
                    case "HTMLElement":
                        a.push(object);
                        break;

                    case "$DOM":
                    case "array":
                        baidu.merge(a, object)
                        break;

                        // HTMLString or selector
                    case "string":
                        baidu.merge(a, baidu.dom(object, context));
                        break;
                        // [TODO] case "NodeList" :
                    default:
                        if (typeof object == "object" && object.length) {
                            baidu.merge(a, object)
                        }
                }
                return this.pushStack(a.unique());
            }
        });

        // meizz 20120601 add方法可以完全使用 baidu.merge(this, baidu.dom(object, context)) 这一句代码完成所有功能，但为节约内存和提高效率的原因，将几个常用分支单独处理了



        baidu.dom.extend({
            contents: function() {
                var ret = [],
                    nodeName;
                for (var i = 0, ele; ele = this[i]; i++) {
                    nodeName = ele.nodeName;
                    ret.push.apply(ret, baidu.makeArray(nodeName && nodeName.toLowerCase() === 'iframe' ?
                        ele.contentDocument || ele.contentWindow.document : ele.childNodes));
                }
                return this.pushStack(ret);
            }
        });


        //baidu.browser.isStrict = document.compatMode == "CSS1Compat";


        //baidu.browser.isGecko = /gecko/i.test(navigator.userAgent) && !/like gecko/i.test(navigator.userAgent);


        //baidu.browser.isWebkit = /webkit/i.test(navigator.userAgent);


        //baidu.browser.chrome = /chrome\/(\d+\.\d+)/i.test(navigator.userAgent) ? + RegExp['\x241'] : undefined;


        //baidu.browser.firefox = /firefox\/(\d+\.\d+)/i.test(navigator.userAgent) ? + RegExp['\x241'] : undefined;

        //IE 8下，以documentMode为准
        //在百度模板中，可能会有$，防止冲突，将$1 写成 \x241

        //baidu.browser.ie = baidu.ie = /msie (\d+\.\d+)/i.test(navigator.userAgent) ? (document.documentMode || + RegExp['\x241']) : undefined;

        //try {
        //    if (/(\d+\.\d+)/.test(external.max_version)) {

        //        baidu.browser.maxthon = + RegExp['\x241'];
        //    }
        //} catch (e) {}

        //(function(){
        //    var ua = navigator.userAgent;



        //    baidu.browser.safari = /(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(ua) && !/chrome/i.test(ua) ? + (RegExp['\x241'] || RegExp['\x242']) : undefined;
        //})();



        baidu.string.extend({
            decodeHTML: function() {
                var str = this
                    .replace(/&quot;/g, '"')
                    .replace(/&lt;/g, '<')
                    .replace(/&gt;/g, '>')
                    .replace(/&amp;/g, "&");
                //处理转义的中文和实体字符
                return str.replace(/&#([\d]+);/g, function(_0, _1) {
                    return String.fromCharCode(parseInt(_1, 10));
                });
            }
        });



        baidu.string.extend({
            encodeHTML: function() {
                return this.replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/"/g, "&quot;")
                    .replace(/'/g, "&#39;");
            }
        });

        baidu.string.extend({
            // 只encode HTML标签尖括号
            encodeHTMLTagOnly: function() {
                return this.replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;');
            }
        });


        baidu.string.extend({
            escapeReg: function() {
                return this.replace(new RegExp("([.*+?^=!:\x24{}()|[\\]\/\\\\])", "g"), '\\\x241');
            }
        });

        /// Tangram 1.x Code Start



        baidu.string.filterFormat = function(source, opts) {

            var data = [].slice.call(arguments, 1),
                dl = data.length,
                _ = {}.toString;

            if (dl) {

                if (dl == 1 && opts && /Array|Object/.test(_.call(opts)))
                    data = opts;

                return source.replace(/#\{(.+?)\}/g, function(match, key) {
                    var fl = key.split("|"),
                        r, i, l, f;

                    if (!data) return "";

                    if (typeof(r = data[fl[0]]) == "function")
                        r = r(fl[0]);

                    for (i = 1, l = fl.length; i < l; ++i)
                        if (typeof(f = baidu.string.filterFormat[fl[i]]) == "function")
                            r = f(r);

                    return r == null ? "" : r;
                });
            }

            return source;
        };
        /// Tangram 1.x Code End



        //format(a,a,d,f,c,d,g,c);
        baidu.string.extend({
            format: function(opts) {
                var source = this.valueOf(),
                    data = Array.prototype.slice.call(arguments, 0),
                    toString = Object.prototype.toString;
                if (data.length) {
                    data = data.length == 1 ?

                        (opts !== null && (/\[object Array\]|\[object Object\]/.test(toString.call(opts))) ? opts : data) : data;
                    return source.replace(/#\{(.+?)\}/g, function(match, key) {
                        var replacer = data[key];
                        // chrome 下 typeof /a/ == 'function'
                        if ('[object Function]' == toString.call(replacer)) {
                            replacer = replacer(key);
                        }
                        return ('undefined' == typeof replacer ? '' : replacer);
                    });
                }
                return source;
            }
        });



        baidu.string.extend({
            formatColor: function() {
                // 将正则表达式预创建，可提高效率
                var reg1 = /^\#[\da-f]{6}$/i,
                    reg2 = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/i,
                    keyword = {
                        black: '#000000',
                        silver: '#c0c0c0',
                        gray: '#808080',
                        white: '#ffffff',
                        maroon: '#800000',
                        red: '#ff0000',
                        purple: '#800080',
                        fuchsia: '#ff00ff',
                        green: '#008000',
                        lime: '#00ff00',
                        olive: '#808000',
                        yellow: '#ffff0',
                        navy: '#000080',
                        blue: '#0000ff',
                        teal: '#008080',
                        aqua: '#00ffff'
                    };

                return function() {
                    var color = this.valueOf();
                    if (reg1.test(color)) {
                        // #RRGGBB 直接返回
                        return color;
                    } else if (reg2.test(color)) {
                        // 非IE中的 rgb(0, 0, 0)
                        for (var s, i = 1, color = "#"; i < 4; i++) {
                            s = parseInt(RegExp["\x24" + i]).toString(16);
                            color += ("00" + s).substr(s.length);
                        }
                        return color;
                    } else if (/^\#[\da-f]{3}$/.test(color)) {
                        // 简写的颜色值: #F00
                        var s1 = color.charAt(1),
                            s2 = color.charAt(2),
                            s3 = color.charAt(3);
                        return "#" + s1 + s1 + s2 + s2 + s3 + s3;
                    } else if (keyword[color])
                        return keyword[color];

                    return '';
                }
            }()
        });



        baidu.string.extend({
            stripTags: function() {
                return (this || '').replace(/<[^>]+>/g, '');
            }
        });



        baidu.string.extend({
            getByteLength: function() {
                return this.replace(/[^\x00-\xff]/g, 'ci').length;
            }
            //获取字符在gbk编码下的字节长度, 实现原理是认为大于127的就一定是双字节。如果字符超出gbk编码范围, 则这个计算不准确
        });



        baidu.string.extend({
            subByte: function(len, tail) {
                baidu.check('number(,string)?$', 'baidu.string.subByte');

                if (len < 0 || this.getByteLength() <= len) {
                    return this.valueOf(); // 20121109 mz 去掉tail
                }
                //thanks 加宽提供优化方法
                var source = this.substr(0, len)
                    .replace(/([^\x00-\xff])/g, "\x241 ") //双字节字符替换成两个
                    .substr(0, len) //截取长度
                    .replace(/[^\x00-\xff]$/, "") //去掉临界双字节字符
                    .replace(/([^\x00-\xff]) /g, "\x241"); //还原
                return source + (tail || "");
            }
        });



        baidu.string.extend({
            toHalfWidth: function() {
                return this.replace(/[\uFF01-\uFF5E]/g,
                    function(c) {
                        return String.fromCharCode(c.charCodeAt(0) - 65248);
                    }).replace(/\u3000/g, " ");
            }
        });



        baidu.string.extend({
            wbr: function() {
                return this.replace(/(?:<[^>]+>)|(?:&#?[0-9a-z]{2,6};)|(.{1})/gi, '$&<wbr>')
                    .replace(/><wbr>/g, '>');
            }
        });



        baidu.array.extend({
            contains: function(item) {
                return !!~this.indexOf(item);
            }
        });



        baidu.array.extend({
            each: function(iterator, context) {
                return baidu.each(this, iterator, context);
            },

            forEach: function(iterator, context) {
                return baidu.forEach(this, iterator, context);
            }
        });
        /// Tangram 1.x Code Start
        // TODO: delete in tangram 3.0
        baidu.array.each = baidu.array.forEach = function(array, iterator, context) {
            var fn = function(index, item, array) {
                return iterator.call(context || array, item, index, array);
            };
            return baidu.isEnumerable(array) ? baidu.each(array, typeof iterator == "function" ? fn : "", context) : array;
        };
        /// Tangram 1.x Code End



        baidu.array.extend({
            empty: function() {
                this.length = 0;
                return this;
            }
        });



        baidu.array.extend({
            filter: function(iterator, context) {
                var result = baidu.array([]),
                    i, n, item, index = 0;

                if (baidu.type(iterator) === "function") {
                    for (i = 0, n = this.length; i < n; i++) {
                        item = this[i];

                        if (iterator.call(context || this, item, i, this) === true) {
                            result[index++] = item;
                        }
                    }
                }
                return result;
            }
        });
        /// Tangram 1.x Code Start
        // TODO: delete in tangram 3.0
        baidu.array.filter = function(array, filter, context) {
            return baidu.isArray(array) ? baidu.array(array).filter(filter, context) : [];
        };
        /// Tangram 1.x Code End



        baidu.array.extend({
            find: function(iterator) {
                var i, item, n = this.length;

                if (baidu.type(iterator) == "function") {
                    for (i = 0; i < n; i++) {
                        item = this[i];
                        if (iterator.call(this, item, i, this) === true) {
                            return item;
                        }
                    }
                }

                return null;
            }
        });



        baidu.array.extend({
            hash: function(values) {
                var result = {},
                    vl = values && values.length,
                    i, n;

                for (i = 0, n = this.length; i < n; i++) {
                    result[this[i]] = (vl && vl > i) ? values[i] : true;
                }
                return result;
            }
        });



        baidu.array.extend({
            lastIndexOf: function(match, fromIndex) {
                baidu.check(".+(,number)?", "baidu.array.lastIndexOf");
                var len = this.length;

                (!(fromIndex = fromIndex | 0) || fromIndex >= len) && (fromIndex = len - 1);
                fromIndex < 0 && (fromIndex += len);

                for (; fromIndex >= 0; fromIndex--) {
                    if (fromIndex in this && this[fromIndex] === match) {
                        return fromIndex;
                    }
                }

                return -1;
            }
        });



        baidu.array.extend({
            remove: function(match) {
                var n = this.length;

                while (n--) {
                    if (this[n] === match) {
                        this.splice(n, 1);
                    }
                }
                return this;
            }
        });



        baidu.array.extend({
            removeAt: function(index) {
                baidu.check("number", "baidu.array.removeAt");
                return this.splice(index, 1)[0];
            }
        });

        baidu.object = baidu.object || {};



        //baidu.lang.isArray = function (source) {
        //    return '[object Array]' == Object.prototype.toString.call(source);
        //};
        baidu.lang.isArray = baidu.isArray;



        baidu.object.isPlain = baidu.isPlainObject;


        baidu.object.clone = function(source) {
            var result = source,
                i, len;
            if (!source || source instanceof Number || source instanceof String || source instanceof Boolean) {
                return result;
            } else if (baidu.lang.isArray(source)) {
                result = [];
                var resultLen = 0;
                for (i = 0, len = source.length; i < len; i++) {
                    result[resultLen++] = baidu.object.clone(source[i]);
                }
            } else if (baidu.object.isPlain(source)) {
                result = {};
                for (i in source) {
                    if (source.hasOwnProperty(i)) {
                        result[i] = baidu.object.clone(source[i]);
                    }
                }
            }
            return result;
        };


        baidu.object.each = function(source, iterator) {
            var returnValue, key, item;
            if ('function' == typeof iterator) {
                for (key in source) {
                    if (source.hasOwnProperty(key)) {
                        item = source[key];
                        returnValue = iterator.call(source, item, key);

                        if (returnValue === false) {
                            break;
                        }
                    }
                }
            }
            return source;
        };



        //baidu.object.extend = function (target, source) {
        //    for (var p in source) {
        //        if (source.hasOwnProperty(p)) {
        //            target[p] = source[p];
        //        }
        //    }
        //    
        //    return target;
        //};
        baidu.object.extend = baidu.extend;


        baidu.object.isEmpty = function(obj) {
            var ret = true;
            if ('[object Array]' === Object.prototype.toString.call(obj)) {
                ret = !obj.length;
            } else {
                obj = new Object(obj);
                for (var key in obj) {
                    return false;
                }
            }
            return ret;
        };


        baidu.object.keys = function(source) {
            var result = [],
                resultLen = 0,
                k;
            for (k in source) {
                if (source.hasOwnProperty(k)) {
                    result[resultLen++] = k;
                }
            }
            return result;
        };


        baidu.object.map = function(source, iterator) {
            var results = {};
            for (var key in source) {
                if (source.hasOwnProperty(key)) {
                    results[key] = iterator(source[key], key);
                }
            }
            return results;
        };



        //baidu.lang.isObject = function (source) {
        //    return 'function' == typeof source || !!(source && 'object' == typeof source);
        //};
        baidu.lang.isObject = baidu.isObject;



        //baidu.lang.isFunction = function (source) {
        // chrome下,'function' == typeof /a/ 为true.
        //    return '[object Function]' == Object.prototype.toString.call(source);
        //};
        baidu.lang.isFunction = baidu.isFunction;



        baidu.object.merge = function() {
            function isPlainObject(source) {
                return baidu.lang.isObject(source) && !baidu.lang.isFunction(source);
            };

            function mergeItem(target, source, index, overwrite, recursive) {
                if (source.hasOwnProperty(index)) {
                    if (recursive && isPlainObject(target[index])) {
                        // 如果需要递归覆盖，就递归调用merge
                        baidu.object.merge(
                            target[index],
                            source[index], {
                                'overwrite': overwrite,
                                'recursive': recursive
                            }
                        );
                    } else if (overwrite || !(index in target)) {
                        // 否则只处理overwrite为true，或者在目标对象中没有此属性的情况
                        target[index] = source[index];
                    }
                }
            };

            return function(target, source, opt_options) {
                var i = 0,
                    options = opt_options || {},
                    overwrite = options['overwrite'],
                    whiteList = options['whiteList'],
                    recursive = options['recursive'],
                    len;

                // 只处理在白名单中的属性
                if (whiteList && whiteList.length) {
                    len = whiteList.length;
                    for (; i < len; ++i) {
                        mergeItem(target, source, whiteList[i], overwrite, recursive);
                    }
                } else {
                    for (i in source) {
                        mergeItem(target, source, i, overwrite, recursive);
                    }
                }
                return target;
            };
        }();


        baidu.object.values = function(source) {
            var result = [],
                resultLen = 0,
                k;
            for (k in source) {
                if (source.hasOwnProperty(k)) {
                    result[resultLen++] = source[k];
                }
            }
            return result;
        };



        baidu.createChain("fn",

            // 执行方法
            function(fn) {
                return new baidu.fn.$Fn(~'function|string'.indexOf(baidu.type(fn)) ? fn : function() {});
            },

            // constructor
            function(fn) {
                this.fn = fn;
            });


        baidu.fn.extend({
            bind: function(scope) {
                var func = this.fn,
                    xargs = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : null;
                return function() {
                    var fn = baidu.type(func) === 'string' ? scope[func] : func,
                        args = xargs ? xargs.concat(Array.prototype.slice.call(arguments, 0)) : arguments;
                    return fn.apply(scope || fn, args);
                }
            }
        });
        /// Tangram 1.x Code Start

        baidu.fn.bind = function(func, scope) {
            var fn = baidu.fn(func);
            return fn.bind.apply(fn, Array.prototype.slice.call(arguments, 1));
        };
        /// Tangram 1.x Code End



        baidu.fn.blank = function() {};

        baidu.json = baidu.json || {};


        baidu.json.parse = function(data) {
            //2010/12/09：更新至不使用原生parse，不检测用户输入是否正确
            return (new Function("return (" + data + ")"))();
        };



        baidu.json.stringify = (function() {

            var escapeMap = {
                "\b": '\\b',
                "\t": '\\t',
                "\n": '\\n',
                "\f": '\\f',
                "\r": '\\r',
                '"': '\\"',
                "\\": '\\\\'
            };


            function encodeString(source) {
                if (/["\\\x00-\x1f]/.test(source)) {
                    source = source.replace(
                        /["\\\x00-\x1f]/g,
                        function(match) {
                            var c = escapeMap[match];
                            if (c) {
                                return c;
                            }
                            c = match.charCodeAt();
                            return "\\u00" + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
                        });
                }
                return '"' + source + '"';
            }


            function encodeArray(source) {
                var result = ["["],
                    l = source.length,
                    preComma, i, item;

                for (i = 0; i < l; i++) {
                    item = source[i];

                    switch (typeof item) {
                        case "undefined":
                        case "function":
                        case "unknown":
                            break;
                        default:
                            if (preComma) {
                                result.push(',');
                            }
                            result.push(baidu.json.stringify(item));
                            preComma = 1;
                    }
                }
                result.push("]");
                return result.join("");
            }


            function pad(source) {
                return source < 10 ? '0' + source : source;
            }


            function encodeDate(source) {
                return '"' + source.getFullYear() + "-" + pad(source.getMonth() + 1) + "-" + pad(source.getDate()) + "T" + pad(source.getHours()) + ":" + pad(source.getMinutes()) + ":" + pad(source.getSeconds()) + '"';
            }

            return function(value) {
                switch (typeof value) {
                    case 'undefined':
                        return 'undefined';

                    case 'number':
                        return isFinite(value) ? String(value) : "null";

                    case 'string':
                        return encodeString(value);

                    case 'boolean':
                        return String(value);

                    default:
                        if (value === null) {
                            return 'null';
                        } else if (baidu.type(value) === 'array') {
                            return encodeArray(value);
                        } else if (baidu.type(value) === 'date') {
                            return encodeDate(value);
                        } else {
                            var result = ['{'],
                                encode = baidu.json.stringify,
                                preComma,
                                item;

                            for (var key in value) {
                                if (Object.prototype.hasOwnProperty.call(value, key)) {
                                    item = value[key];
                                    switch (typeof item) {
                                        case 'undefined':
                                        case 'unknown':
                                        case 'function':
                                            break;
                                        default:
                                            if (preComma) {
                                                result.push(',');
                                            }
                                            preComma = 1;
                                            result.push(encode(key) + ':' + encode(item));
                                    }
                                }
                            }
                            result.push('}');
                            return result.join('');
                        }
                }
            };
        })();

        baidu.cookie = baidu.cookie || {};


        baidu.cookie._isValidKey = function(key) {
            // http://www.w3.org/Protocols/rfc2109/rfc2109
            // Syntax:  General
            // The two state management headers, Set-Cookie and Cookie, have common
            // syntactic properties involving attribute-value pairs.  The following
            // grammar uses the notation, and tokens DIGIT (decimal digits) and
            // token (informally, a sequence of non-special, non-white space
            // characters) from the HTTP/1.1 specification [RFC 2068] to describe
            // their syntax.
            // av-pairs   = av-pair *(";" av-pair)
            // av-pair    = attr ["=" value] ; optional value
            // attr       = token
            // value      = word
            // word       = token | quoted-string

            // http://www.ietf.org/rfc/rfc2068.txt
            // token      = 1*<any CHAR except CTLs or tspecials>
            // CHAR       = <any US-ASCII character (octets 0 - 127)>
            // CTL        = <any US-ASCII control character
            //              (octets 0 - 31) and DEL (127)>
            // tspecials  = "(" | ")" | "<" | ">" | "@"
            //              | "," | ";" | ":" | "\" | <">
            //              | "/" | "[" | "]" | "?" | "="
            //              | "{" | "}" | SP | HT
            // SP         = <US-ASCII SP, space (32)>
            // HT         = <US-ASCII HT, horizontal-tab (9)>

            return (new RegExp("^[^\\x00-\\x20\\x7f\\(\\)<>@,;:\\\\\\\"\\[\\]\\?=\\{\\}\\/\\u0080-\\uffff]+\x24")).test(key);
        };


        baidu.cookie.getRaw = function(key) {
            if (baidu.cookie._isValidKey(key)) {
                var reg = new RegExp("(^| )" + key + "=([^;]*)(;|\x24)"),
                    result = reg.exec(document.cookie);

                if (result) {
                    return result[2] || null;
                }
            }

            return null;
        };



        baidu.cookie.get = function(key) {
            var value = baidu.cookie.getRaw(key);
            if ('string' == typeof value) {
                value = decodeURIComponent(value);
                return value;
            }
            return null;
        };



        baidu.cookie.setRaw = function(key, value, options) {
            if (!baidu.cookie._isValidKey(key)) {
                return;
            }

            options = options || {};
            //options.path = options.path || "/"; // meizz 20100402 设定一个初始值，方便后续的操作
            //berg 20100409 去掉，因为用户希望默认的path是当前路径，这样和浏览器对cookie的定义也是一致的

            // 计算cookie过期时间
            var expires = options.expires;
            if ('number' == typeof options.expires) {
                expires = new Date();
                expires.setTime(expires.getTime() + options.expires);
            }

            document.cookie =
                key + "=" + value + (options.path ? "; path=" + options.path : "") + (expires ? "; expires=" + expires.toGMTString() : "") + (options.domain ? "; domain=" + options.domain : "") + (options.secure ? "; secure" : '');
        };



        baidu.cookie.set = function(key, value, options) {
            baidu.cookie.setRaw(key, encodeURIComponent(value), options);
        };


        baidu.cookie.remove = function(key, options) {
            options = options || {};
            options.expires = new Date(0);
            baidu.cookie.setRaw(key, '', options);
        };



        baidu.when = baidu.when || function(subordinate) {
            var args = arguments,
                len = arguments.length,
                remaining = len !== 1 || (subordinate && baidu.type(subordinate.promise) === 'function') ? len : 0,
                defer = remaining === 1 ? subordinate : baidu.Deferred(),
                progressVals, progressContexts, resolveContexts;

            function update(index, contexts, vals) {
                return function(val) {
                    contexts[index] = this;
                    vals[index] = arguments.length > 1 ? arguments : val;
                    if (vals === progressVals) {
                        defer.notifyWith(contexts, vals);
                    } else if (!(--remaining)) {
                        defer.resolveWith(contexts, vals);
                    }
                };
            }

            if (len > 1) {
                progressVals = new Array(len);
                progressContexts = new Array(len);
                resolveContexts = new Array(len);
                for (var i = 0; i < len; i++) {
                    if (args[i] && baidu.type(args[i].promise) === 'function') {
                        args[i].promise()
                            .done(update(i, resolveContexts, args))
                            .fail(defer.reject)
                            .progress(update(i, progressContexts, progressVals));
                    } else {
                        --remaining;
                    }
                }

            }!remaining && defer.resolveWith(resolveContexts, args);
            return defer.promise();
        }


        baidu.createChain("sio",

            // 执行方法
            function(url) {
                switch (typeof url) {
                    case "string":
                        return new baidu.sio.$Sio(url);
                        // break;
                }
            },

            // constructor
            function(url) {
                this.url = url;
            });


        baidu.sio._createScriptTag = function(scr, url, charset) {
            scr.setAttribute('type', 'text/javascript');
            charset && scr.setAttribute('charset', charset);
            scr.setAttribute('src', url);
            document.getElementsByTagName('head')[0].appendChild(scr);
        };



        baidu.sio._removeScriptTag = function(scr) {
            if (scr.clearAttributes) {
                scr.clearAttributes();
            } else {
                for (var attr in scr) {
                    if (scr.hasOwnProperty(attr)) {
                        delete scr[attr];
                    }
                }
            }
            if (scr && scr.parentNode) {
                scr.parentNode.removeChild(scr);
            }
            scr = null;
        };



        baidu.sio.extend({
            callByBrowser: function(opt_callback, opt_options) {
                var url = this.url;
                var scr = document.createElement("SCRIPT"),
                    scriptLoaded = 0,
                    options = opt_options || {},
                    charset = options['charset'],
                    callback = opt_callback || function() {},
                    timeOut = options['timeOut'] || 0,
                    timer;

                // IE和opera支持onreadystatechange
                // safari、chrome、opera支持onload
                scr.onload = scr.onreadystatechange = function() {
                    // 避免opera下的多次调用
                    if (scriptLoaded) {
                        return;
                    };

                    var readyState = scr.readyState;
                    if ('undefined' == typeof readyState || readyState == "loaded" || readyState == "complete") {
                        scriptLoaded = 1;
                        try {
                            callback();
                            clearTimeout(timer);
                        } finally {
                            scr.onload = scr.onreadystatechange = null;
                            baidu.sio._removeScriptTag(scr);
                        }
                    }
                };

                if (timeOut) {
                    timer = setTimeout(function() {
                        scr.onload = scr.onreadystatechange = null;
                        baidu.sio._removeScriptTag(scr);
                        options.onfailure && options.onfailure();
                    }, timeOut);
                };
                baidu.sio._createScriptTag(scr, url, charset);
            }
        });



        //baidu.lang.isString = function (source) {
        //    return '[object String]' == Object.prototype.toString.call(source);
        //};
        baidu.lang.isString = baidu.isString;


        baidu.sio.extend({
            callByServer: function(callback, opt_options) {
                var url = this.url;
                var scr = document.createElement('SCRIPT'),
                    prefix = 'bd__cbs__',
                    callbackName,
                    callbackImpl,
                    options = opt_options || {},
                    charset = options['charset'],
                    queryField = options['queryField'] || 'callback',
                    timeOut = options['timeOut'] || 0,
                    timer,
                    reg = new RegExp('(\\?|&)' + queryField + '=([^&]*)'),
                    matches;

                if (baidu.lang.isFunction(callback)) {
                    callbackName = prefix + Math.floor(Math.random() * 2147483648).toString(36);
                    window[callbackName] = getCallBack(0);
                } else if (baidu.lang.isString(callback)) {
                    // 如果callback是一个字符串的话，就需要保证url是唯一的，不要去改变它
                    // TODO 当调用了callback之后，无法删除动态创建的script标签
                    callbackName = callback;
                } else {
                    if (matches = reg.exec(url)) {
                        callbackName = matches[2];
                    }
                }

                if (timeOut) {
                    timer = setTimeout(getCallBack(1), timeOut);
                }

                //如果用户在URL中已有callback，用参数传入的callback替换之
                url = url.replace(reg, '\x241' + queryField + '=' + callbackName);

                if (url.search(reg) < 0) {
                    url += (url.indexOf('?') < 0 ? '?' : '&') + queryField + '=' + callbackName;
                }
                baidu.sio._createScriptTag(scr, url, charset);


                function getCallBack(onTimeOut) {

                    return function() {
                        try {
                            if (onTimeOut) {
                                options.onfailure && options.onfailure();
                            } else {
                                callback.apply(window, arguments);
                                clearTimeout(timer);
                            }
                            window[callbackName] = null;
                            delete window[callbackName];
                        } catch (exception) {
                            // ignore the exception
                        } finally {
                            baidu.sio._removeScriptTag(scr);
                        }
                    }
                }
            }

        });



        baidu.sio.extend({
            log: function() {
                var url = this.url;
                var img = new Image(),
                    key = 'tangram_sio_log_' + Math.floor(Math.random() *
                        2147483648).toString(36);

                // 这里一定要挂在window下
                // 在IE中，如果没挂在window下，这个img变量又正好被GC的话，img的请求会abort
                // 导致服务器收不到日志
                window[key] = img;

                img.onload = img.onerror = img.onabort = function() {
                    // 下面这句非常重要
                    // 如果这个img很不幸正好加载了一个存在的资源，又是个gif动画
                    // 则在gif动画播放过程中，img会多次触发onload
                    // 因此一定要清空
                    img.onload = img.onerror = img.onabort = null;

                    window[key] = null;

                    // 下面这句非常重要
                    // new Image创建的是DOM，DOM的事件中形成闭包环引用DOM是典型的内存泄露
                    // 因此这里一定要置为null
                    img = null;
                };

                // 一定要在注册了事件之后再设置src
                // 不然如果图片是读缓存的话，会错过事件处理
                // 最后，对于url最好是添加客户端时间来防止缓存
                // 同时服务器也配合一下传递Cache-Control: no-cache;
                img.src = url;
            }
        });


        baidu.swf = baidu.swf || {};



        baidu.swf.version = (function() {
            var n = navigator;
            if (n.plugins && n.mimeTypes.length) {
                var plugin = n.plugins["Shockwave Flash"];
                if (plugin && plugin.description) {
                    return plugin.description
                        .replace(/([a-zA-Z]|\s)+/, "")
                        .replace(/(\s)+r/, ".") + ".0";
                }
            } else if (window.ActiveXObject && !window.opera) {
                for (var i = 12; i >= 2; i--) {
                    try {
                        var c = new ActiveXObject('ShockwaveFlash.ShockwaveFlash.' + i);
                        if (c) {
                            var version = c.GetVariable("$version");
                            return version.replace(/WIN/g, '').replace(/,/g, '.');
                        }
                    } catch (e) {}
                }
            }
        })();



        baidu.swf.createHTML = function(options) {
            options = options || {};
            var version = baidu.swf.version,
                needVersion = options['ver'] || '6.0.0',
                vUnit1, vUnit2, i, k, len, item, tmpOpt = {},
                encodeHTML = baidu.string.encodeHTML;

            // 复制options，避免修改原对象
            for (k in options) {
                tmpOpt[k] = options[k];
            }
            options = tmpOpt;

            // 浏览器支持的flash插件版本判断
            if (version) {
                version = version.split('.');
                needVersion = needVersion.split('.');
                for (i = 0; i < 3; i++) {
                    vUnit1 = parseInt(version[i], 10);
                    vUnit2 = parseInt(needVersion[i], 10);
                    if (vUnit2 < vUnit1) {
                        break;
                    } else if (vUnit2 > vUnit1) {
                        return ''; // 需要更高的版本号
                    }
                }
            } else {
                return ''; // 未安装flash插件
            }

            var vars = options['vars'],
                objProperties = ['classid', 'codebase', 'id', 'width', 'height', 'align'];

            // 初始化object标签需要的classid、codebase属性值
            options['align'] = options['align'] || 'middle';
            options['classid'] = 'clsid:d27cdb6e-ae6d-11cf-96b8-444553540000';
            options['codebase'] = 'http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0';
            options['movie'] = options['url'] || '';
            delete options['vars'];
            delete options['url'];

            // 初始化flashvars参数的值
            if ('string' == typeof vars) {
                options['flashvars'] = vars;
            } else {
                var fvars = [];
                for (k in vars) {
                    item = vars[k];
                    fvars.push(k + "=" + encodeURIComponent(item));
                }
                options['flashvars'] = fvars.join('&');
            }

            // 构建IE下支持的object字符串，包括属性和参数列表
            var str = ['<object '];
            for (i = 0, len = objProperties.length; i < len; i++) {
                item = objProperties[i];
                str.push(' ', item, '="', encodeHTML(options[item]), '"');
            }
            str.push('>');
            var params = {
                'wmode': 1,
                'scale': 1,
                'quality': 1,
                'play': 1,
                'loop': 1,
                'menu': 1,
                'salign': 1,
                'bgcolor': 1,
                'base': 1,
                'allowscriptaccess': 1,
                'allownetworking': 1,
                'allowfullscreen': 1,
                'seamlesstabbing': 1,
                'devicefont': 1,
                'swliveconnect': 1,
                'flashvars': 1,
                'movie': 1
            };

            for (k in options) {
                item = options[k];
                k = k.toLowerCase();
                if (params[k] && (item || item === false || item === 0)) {
                    str.push('<param name="' + k + '" value="' + encodeHTML(item) + '" />');
                }
            }

            // 使用embed时，flash地址的属性名是src，并且要指定embed的type和pluginspage属性
            options['src'] = options['movie'];
            options['name'] = options['id'];
            delete options['id'];
            delete options['movie'];
            delete options['classid'];
            delete options['codebase'];
            options['type'] = 'application/x-shockwave-flash';
            options['pluginspage'] = 'http://www.macromedia.com/go/getflashplayer';


            // 构建embed标签的字符串
            str.push('<embed');
            // 在firefox、opera、safari下，salign属性必须在scale属性之后，否则会失效
            // 经过讨论，决定采用BT方法，把scale属性的值先保存下来，最后输出
            var salign;
            for (k in options) {
                item = options[k];
                if (item || item === false || item === 0) {
                    if ((new RegExp("^salign\x24", "i")).test(k)) {
                        salign = item;
                        continue;
                    }

                    str.push(' ', k, '="', encodeHTML(item), '"');
                }
            }

            if (salign) {
                str.push(' salign="', encodeHTML(salign), '"');
            }
            str.push('></embed></object>');

            return str.join('');
        };


        baidu.swf.create = function(options, target) {
            options = options || {};
            var html = baidu.swf.createHTML(options) || options['errorMessage'] || '';

            if (target && 'string' == typeof target) {
                target = document.getElementById(target);
            }
            baidu.dom.insertHTML(target || document.body, 'beforeEnd', html);
        };



        baidu.lang.toArray = function(source) {
            if (source === null || source === undefined)
                return [];
            if (baidu.lang.isArray(source))
                return source;

            // The strings and functions also have 'length'
            if (typeof source.length !== 'number' || typeof source === 'string' || baidu.lang.isFunction(source)) {
                return [source];
            }

            //nodeList, IE 下调用 [].slice.call(nodeList) 会报错
            if (source.item) {
                var l = source.length,
                    array = new Array(l);
                while (l--)
                    array[l] = source[l];
                return array;
            }

            return [].slice.call(source);
        };

        baidu.swf.getMovie = function(name) {
            //ie9下, Object标签和embed标签嵌套的方式生成flash时,
            //会导致document[name]多返回一个Object元素,而起作用的只有embed标签
            var movie = document[name],
                ret;
            return baidu.browser.ie == 9 ?
                movie && movie.length ?
                (ret = baidu.array.remove(baidu.lang.toArray(movie), function(item) {
                    return item.tagName.toLowerCase() != "embed";
                })).length == 1 ? ret[0] : ret : movie : movie || window[name];
        };



        baidu.base = baidu.base || {
            blank: function() {}
        };



        baidu.base.Class = (function() {
            var instances = (baidu._global_ = window[baidu.guid])._instances;
            instances || (instances = baidu._global_._instances = {});

            // constructor
            return function() {
                this.guid = baidu.id(this);
                this._decontrol_ || (instances[this.guid] = this);
            }
        })();


        baidu.extend(baidu.base.Class.prototype, {

            toString: baidu.base.Class.prototype.toString = function() {
                    return "[object " + (this._type_ || "Object") + "]";
                }


                ,
            dispose: function() {
                    // 2013.1.11 暂时关闭此事件的派发
                    // if (this.fire("ondispose")) {
                    // decontrol
                    delete baidu._global_._instances[this.guid];

                    if (this._listeners_) {
                        for (var item in this._listeners_) {
                            this._listeners_[item].length = 0;
                            delete this._listeners_[item];
                        }
                    }

                    for (var pro in this) {
                        if (!baidu.isFunction(this[pro])) delete this[pro];
                        else this[pro] = baidu.base.blank;
                    }

                    this.disposed = true; //20100716
                    // }
                }


                ,
            fire: function(event, options) {
                    baidu.isString(event) && (event = new baidu.base.Event(event));

                    var i, n, list, item, t = this._listeners_,
                        type = event.type
                        // 20121023 mz 修正事件派发多参数时，参数的正确性验证
                        ,
                        argu = [event].concat(Array.prototype.slice.call(arguments, 1));
                    !t && (t = this._listeners_ = {});

                    // 20100603 添加本方法的第二个参数，将 options extend到event中去传递
                    baidu.extend(event, options || {});

                    event.target = event.target || this;
                    event.currentTarget = this;

                    type.indexOf("on") && (type = "on" + type);

                    baidu.isFunction(this[type]) && this[type].apply(this, argu);
                    (i = this._options) && baidu.isFunction(i[type]) && i[type].apply(this, argu);

                    if (baidu.isArray(list = t[type])) {
                        for (i = list.length - 1; i > -1; i--) {
                            item = list[i];
                            item && item.handler.apply(this, argu);
                            item && item.once && list.splice(i, 1);
                        }
                    }

                    return event.returnValue;
                }


                ,
            on: function(type, handler, once) {
                    if (!baidu.isFunction(handler)) {
                        return this;
                    }

                    var list, t = this._listeners_;
                    !t && (t = this._listeners_ = {});

                    type.indexOf("on") && (type = "on" + type);

                    !baidu.isArray(list = t[type]) && (list = t[type] = []);
                    t[type].unshift({
                        handler: handler,
                        once: !!once
                    });

                    return this;
                }
                // 20120928 mz 取消on()的指定key

                ,
            once: function(type, handler) {
                return this.on(type, handler, true);
            },
            one: function(type, handler) {
                    return this.on(type, handler, true);
                }


                ,
            off: function(type, handler) {
                var i, list,
                    t = this._listeners_;
                if (!t) return this;

                // remove all event listener
                if (typeof type == "undefined") {
                    for (i in t) {
                        delete t[i];
                    }
                    return this;
                }

                type.indexOf("on") && (type = "on" + type);

                // 移除某类事件监听
                if (typeof handler == "undefined") {
                    delete t[type];
                } else if (list = t[type]) {

                    for (i = list.length - 1; i >= 0; i--) {
                        list[i].handler === handler && list.splice(i, 1);
                    }
                }

                return this;
            }
        });
        baidu.base.Class.prototype.addEventListener =
            baidu.base.Class.prototype.on;
        baidu.base.Class.prototype.removeEventListener =
            baidu.base.Class.prototype.un =
            baidu.base.Class.prototype.off;
        baidu.base.Class.prototype.dispatchEvent =
            baidu.base.Class.prototype.fire;



        window["baiduInstance"] = function(guid) {
            return window[baidu.guid]._instances[guid];
        }



        baidu.base.Event = function(type, target) {
            this.type = type;
            this.returnValue = true;
            this.target = target || null;
            this.currentTarget = null;
            this.preventDefault = function() {
                this.returnValue = false;
            };
        };


        //  2011.11.23  meizz   添加 baiduInstance 这个全局方法，可以快速地通过guid得到实例对象
        //  2011.11.22  meizz   废除创建类时指定guid的模式，guid只作为只读属性

        /// support magic - Tangram 1.x Code Start



        baidu.lang.Class = baidu.base.Class;


        /**
         * 自定义的事件对象。
         * @class
         * @name  baidu.lang.Event
         * @grammar baidu.lang.Event(type[, target])
         * @param   {string} type  事件类型名称。为了方便区分事件和一个普通的方法，事件类型名称必须以"on"(小写)开头。
         * @param   {Object} [target]触发事件的对象
         * @meta standard
         * @remark 引入该模块，会自动为Class引入3个事件扩展方法：addEventListener、removeEventListener和dispatchEvent。
         * @meta standard
         * @see baidu.lang.Class
         */
        baidu.lang.Event = function(type, target) {
            this.type = type;
            this.returnValue = true;
            this.target = target || null;
            this.currentTarget = null;
        };

        /**
         * 注册对象的事件监听器。引入baidu.lang.Event后，Class的子类实例才会获得该方法。
         * @grammar obj.addEventListener(type, handler[, key])
         * @param   {string}   type         自定义事件的名称
         * @param   {Function} handler      自定义事件被触发时应该调用的回调函数
         * @param   {string}   [key]    为事件监听函数指定的名称，可在移除时使用。如果不提供，方法会默认为它生成一个全局唯一的key。
         * @remark  事件类型区分大小写。如果自定义事件名称不是以小写"on"开头，该方法会给它加上"on"再进行判断，即"click"和"onclick"会被认为是同一种事件。
         */
        baidu.lang.Class.prototype.addEventListener = function(type, handler, key) {
            if (!baidu.lang.isFunction(handler)) {
                return;
            }

            !this.__listeners && (this.__listeners = {});

            var t = this.__listeners,
                id;
            if (typeof key == "string" && key) {
                if (/[^\w\-]/.test(key)) {
                    throw ("nonstandard key:" + key);
                } else {
                    handler.hashCode = key;
                    id = key;
                }
            }
            type.indexOf("on") != 0 && (type = "on" + type);

            typeof t[type] != "object" && (t[type] = {});
            id = id || baidu.id();
            handler.hashCode = id;
            t[type][id] = handler;
        };

        /**
         * 移除对象的事件监听器。引入baidu.lang.Event后，Class的子类实例才会获得该方法。
         * @grammar obj.removeEventListener(type, handler)
         * @param {string}   type     事件类型
         * @param {Function|string} handler  要移除的事件监听函数或者监听函数的key
         * @remark  如果第二个参数handler没有被绑定到对应的自定义事件中，什么也不做。
         */
        baidu.lang.Class.prototype.removeEventListener = function(type, handler) {
            if (typeof handler != "undefined") {
                if ((baidu.lang.isFunction(handler) && !(handler = handler.hashCode)) || (!baidu.lang.isString(handler))) {
                    return;
                }
            }

            !this.__listeners && (this.__listeners = {});

            type.indexOf("on") != 0 && (type = "on" + type);

            var t = this.__listeners;
            if (!t[type]) {
                return;
            }
            if (typeof handler != "undefined") {
                t[type][handler] && delete t[type][handler];
            } else {
                for (var guid in t[type]) {
                    delete t[type][guid];
                }
            }
        };

        /**
 * 派发自定义事件，使得绑定到自定义事件上面的函数都会被执行。引入baidu.lang.Event后，Class的子类实例才会获得该方法。
 * @grammar obj.dispatchEvent(event, options)
 * @param {baidu.lang.Event|String} event   Event对象，或事件名称(1.1.1起支持)
 * @param {Object}          options 扩展参数,所含属性键值会扩展到Event对象上(1.2起支持)
 * @remark 处理会调用通过addEventListenr绑定的自定义事件回调函数之外，还会调用直接绑定到对象上面的自定义事件。例如：<br>
myobj.onMyEvent = function(){}<br>
myobj.addEventListener("onMyEvent", function(){});
 */
        baidu.lang.Class.prototype.dispatchEvent = function(event, options) {
            if (baidu.lang.isString(event)) {
                event = new baidu.lang.Event(event);
            }!this.__listeners && (this.__listeners = {});

            // 20100603 添加本方法的第二个参数，将 options extend到event中去传递
            options = options || {};
            for (var i in options) {
                event[i] = options[i];
            }

            var i, t = this.__listeners,
                p = event.type;
            event.target = event.target || this;
            event.currentTarget = this;

            p.indexOf("on") != 0 && (p = "on" + p);

            baidu.lang.isFunction(this[p]) && this[p].apply(this, arguments);

            if (typeof t[p] == "object") {
                for (i in t[p]) {
                    t[p][i].apply(this, arguments);
                }
            }
            return event.returnValue;
        };



        /**
         * 添加多个自定义事件。
         * @grammar obj.addEventListeners(events, fn)
         * @param   {object}   events       json对象，key为事件名称，value为事件被触发时应该调用的回调函数
         * @param   {Function} fn         要挂载的函数
         * @version 1.3
         */
        /* addEventListeners("onmyevent,onmyotherevent", fn);
         * addEventListeners({
         *      "onmyevent"         : fn,
         *      "onmyotherevent"    : fn1
         * });
         */
        baidu.lang.Class.prototype.addEventListeners = function(events, fn) {
            if (typeof fn == 'undefined') {
                for (var i in events) {
                    this.addEventListener(i, events[i]);
                }
            } else {
                events = events.split(',');
                var i = 0,
                    len = events.length,
                    event;
                for (; i < len; i++) {
                    this.addEventListener(baidu.trim(events[i]), fn);
                }
            }
        };

        //  2011.11.23  meizz   添加 baiduInstance 这个全局方法，可以快速地通过guid得到实例对象
        //  2011.11.22  meizz   废除创建类时指定guid的模式，guid只作为只读属性
        //  2011.11.22  meizz   废除 baidu.lang._instances 模块，由统一的global机制完成；


        /// support magic - Tangram 1.x Code End



        baidu.createClass = function(constructor, type, options) {
            constructor = baidu.isFunction(constructor) ? constructor : function() {};
            options = typeof type == "object" ? type : options || {};

            // 创建新类的真构造器函数
            var fn = function() {
                var me = this;

                // 20101030 某类在添加该属性控制时，guid将不在全局instances里控制
                options.decontrolled && (me._decontrol_ = true);

                // 继承父类的构造器
                fn.superClass.apply(me, arguments);

                // 全局配置
                for (var i in fn.options) me[i] = fn.options[i];

                constructor.apply(me, arguments);

                for (var i = 0, reg = fn._reg_; reg && i < reg.length; i++) {
                    reg[i].apply(me, arguments);
                }
            };

            baidu.extend(fn, {
                superClass: options.superClass || baidu.base.Class

                    ,
                inherits: function(superClass) {
                        if (typeof superClass != "function") return fn;

                        var C = function() {};
                        C.prototype = (fn.superClass = superClass).prototype;

                        // 继承父类的原型（prototype)链
                        var fp = fn.prototype = new C();
                        // 继承传参进来的构造器的 prototype 不会丢
                        baidu.extend(fn.prototype, constructor.prototype);
                        // 修正这种继承方式带来的 constructor 混乱的问题
                        fp.constructor = constructor;

                        return fn;
                    }

                    ,
                register: function(hook, methods) {
                        (fn._reg_ || (fn._reg_ = [])).push(hook);
                        methods && baidu.extend(fn.prototype, methods);
                        return fn;
                    }

                    ,
                extend: function(json) {
                    baidu.extend(fn.prototype, json);
                    return fn;
                }
            });

            type = baidu.isString(type) ? type : options.className || options.type;
            baidu.isString(type) && (constructor.prototype._type_ = type);
            baidu.isFunction(fn.superClass) && fn.inherits(fn.superClass);

            return fn;
        };

        // 20111221 meizz   修改插件函数的存放地，重新放回类构造器静态属性上
        // 20121105 meizz   给类添加了几个静态属性方法：.options .superClass .inherits() .extend() .register()

        /// support magic - Tangram 1.x Code Start



        baidu.lang.createClass = baidu.createClass;

        // 20111221 meizz   修改插件函数的存放地，重新放回类构造器静态属性上

        /// support magic - Tangram 1.x Code End


        baidu.swf.Proxy = function(id, property, loadedHandler) {

            var me = this,
                flash = this._flash = baidu.swf.getMovie(id),
                timer;
            if (!property) {
                return this;
            }
            timer = setInterval(function() {
                try {

                    if (flash[property]) {
                        me._initialized = true;
                        clearInterval(timer);
                        if (loadedHandler) {
                            loadedHandler();
                        }
                    }
                } catch (e) {}
            }, 100);
        };

        baidu.swf.Proxy.prototype.getFlash = function() {
            return this._flash;
        };

        baidu.swf.Proxy.prototype.isReady = function() {
            return !!this._initialized;
        };

        baidu.swf.Proxy.prototype.call = function(methodName, var_args) {
            try {
                var flash = this.getFlash(),
                    args = Array.prototype.slice.call(arguments);

                args.shift();
                if (flash[methodName]) {
                    flash[methodName].apply(flash, args);
                }
            } catch (e) {}
        }; // 声明快捷



        ////// [old interface]


        /**
 * 为类型构造器建立继承关系
 * @name baidu.lang.inherits
 * @function
 * @grammar baidu.lang.inherits(subClass, superClass[, className])
 * @param {Function} subClass 子类构造器
 * @param {Function} superClass 父类构造器
 * @param {string} className 类名标识
 * @remark
 * 
使subClass继承superClass的prototype，因此subClass的实例能够使用superClass的prototype中定义的所有属性和方法。<br>
这个函数实际上是建立了subClass和superClass的原型链集成，并对subClass进行了constructor修正。<br>
<strong>注意：如果要继承构造函数，需要在subClass里面call一下，具体见下面的demo例子</strong>
  
 * @shortcut inherits
 * @meta standard
 * @see baidu.lang.Class
 */
        baidu.lang.inherits = function(f, b, h) {
            var d, a, c = f.prototype,
                g = new Function;
            g.prototype = b.prototype,
                a = f.prototype = new g;
            for (d in c) {
                a[d] = c[d]
            }
            if ("string" == typeof h) {
                a._className = h;
            }
            return f.prototype.constructor = f,
                f.superClass = b.prototype,
                typeof h == "string" && (a.__type = h),
                f.extend = function(e) {
                    for (var i in e) {
                        a[i] = e[i]
                    }
                    return f
                },
                f
        }
        baidu.inherits = baidu.lang.inherits;
        baidu.ac = baidu.dom.addClass;
        baidu.rc = baidu.dom.removeClass;

        baidu.dom.setAttr = function(element, key, value) {
            baidu(element).attr(key, value);
            return element;
        };
        baidu.dom.setAttrs = function(element, attributes) {
            element = baidu.dom.g(element);

            for (var key in attributes) {
                baidu.dom.setAttr(element, key, attributes[key]);
            }

            return element;
        };

        /**
         * 对字符串做安全转义,转义字符包括: 单引号,双引号,左右小括号,斜杠,反斜杠,上引号.
         * @name baidu.string.filterFormat.escapeString
         * @function
         * @grammar baidu.string.filterFormat.escapeString(source)
         * @param {String} source 待转义字符串
         *
         * @see baidu.string.filterFormat,baidu.string.filterFormat.escapeJs,baidu.string.filterFormat.toInt
         * @version 1.2
         * @return {String} 转义之后的字符串
         */
        baidu.string.filterFormat.escapeString = function(str) {
            if (!str || 'string' != typeof str) return str;
            return str.replace(/["'<>\\\/`]/g, function($0) {
                return '&#' + $0.charCodeAt(0) + ';';
            });
        };

        /**
         * 判断一个数组中是否有部分元素满足给定条件
         * @name baidu.array.some
         * @function
         * @grammar baidu.array.some(source, iterator[,thisObject])
         * @param {Array} source 需要判断的数组.
         * @param {Function} iterator 判断函数.
         * @param {Object} [thisObject] 函数调用时的this指针，如果没有此参数，默认是当前遍历的数组
         * @return {boolean} 判断结果.
         * @see baidu.array.every
         */
        baidu.array.some = function(source, iterator, thisObject) {
            var i = 0,
                len = source.length;
            for (; i < len; i++) {
                if (i in source && iterator.call(thisObject || source, source[i], i)) {
                    return true;
                }
            }
            return false;
        };

        /**
         * @namespace baidu.url 操作url的方法。
         */
        baidu.url = baidu.url || {};
        /**
         * 对字符串进行%#&+=以及和\s匹配的所有字符进行url转义
         * @name baidu.url.escapeSymbol
         * @function
         * @grammar baidu.url.escapeSymbol(source)
         * @param {string} source 需要转义的字符串.
         * @return {string} 转义之后的字符串.
         * @remark
         * 用于get请求转义。在服务器只接受gbk，并且页面是gbk编码时，可以经过本转义后直接发get请求。
         *
         * @return {string} 转义后的字符串
         */
        baidu.url.escapeSymbol = function(source) {

            //TODO: 之前使用\s来匹配任意空白符
            //发现在ie下无法匹配中文全角空格和纵向指标符\v，所以改\s为\f\r\n\t\v以及中文全角空格和英文空格
            //但是由于ie本身不支持纵向指标符\v,故去掉对其的匹配，保证各浏览器下效果一致
            return String(source).replace(/[#%&+=\/\\\ \　\f\r\n\t]/g, function(all) {
                return '%' + (0x100 + all.charCodeAt()).toString(16).substring(1).toUpperCase();
            });
        };

        /**
         * 根据参数名从目标URL中获取参数值
         * @name baidu.url.getQueryValue
         * @function
         * @grammar baidu.url.getQueryValue(url, key)
         * @param {string} url 目标URL
         * @param {string} key 要获取的参数名
         * @meta standard
         * @see baidu.url.jsonToQuery
         *
         * @returns {string|null} - 获取的参数值，其中URI编码后的字符不会被解码，获取不到时返回null
         */
        baidu.url.getQueryValue = function(url, key) {
            var reg = new RegExp(
                "(^|&|\\?|#)" + baidu.string.escapeReg(key) + "=([^&#]*)(&|\x24|#)",
                "");
            var match = url.match(reg);
            if (match) {
                return match[2];
            }

            return null;
        };


        /**
         * 解析目标URL中的参数成json对象
         * @name baidu.url.queryToJson
         * @function
         * @grammar baidu.url.queryToJson(url)
         * @param {string} url 目标URL
         * @see baidu.url.jsonToQuery
         *
         * @returns {Object} - 解析为结果对象，其中URI编码后的字符不会被解码，'a=%20' ==> {a:'%20'}。
         */
        baidu.url.queryToJson = function(url) {
            var query = url.substr(url.lastIndexOf('?') + 1),
                params = query.split('&'),
                len = params.length,
                result = {},
                i = 0,
                key, value, item, param;

            for (; i < len; i++) {
                if (!params[i]) {
                    continue;
                }
                param = params[i].split('=');
                key = param[0];
                value = param[1];

                item = result[key];
                if ('undefined' == typeof item) {
                    result[key] = value;
                } else if (baidu.lang.isArray(item)) {
                    item.push(value);
                } else { // 这里只可能是string了
                    result[key] = [item, value];
                }
            }

            return result;
        };
        /**
         * 将json对象解析成query字符串
         * @name baidu.url.jsonToQuery
         * @function
         * @grammar baidu.url.jsonToQuery(json[, replacer])
         * @param {Object} json 需要解析的json对象
         * @param {Function=} replacer_opt 对值进行特殊处理的函数，function (value, key)
         * @see baidu.url.queryToJson,baidu.url.getQueryValue
         *
         * @return {string} - 解析结果字符串，其中值将被URI编码，{a:'&1 '} ==> "a=%261%20"。
         */
        baidu.url.jsonToQuery = function(json, replacer_opt) {
            var result = [],
                itemLen,
                replacer = replacer_opt || function(value) {
                    return baidu.url.escapeSymbol(value);
                };

            baidu.object.each(json, function(item, key) {
                // 这里只考虑item为数组、字符串、数字类型，不考虑嵌套的object
                if (baidu.lang.isArray(item)) {
                    itemLen = item.length;
                    // value的值需要encodeURIComponent转义吗？
                    // FIXED 优化了escapeSymbol函数
                    while (itemLen--) {
                        result.push(key + '=' + replacer(item[itemLen], key));
                    }
                } else {
                    result.push(key + '=' + replacer(item, key));
                }
            });

            return result.join('&');
        };



        //链头
        baidu.array = baidu.array || {};

        //链头
        baidu.dom = baidu.dom || {};

        //为目标元素添加className
        baidu.addClass = baidu.dom.addClass || {};

        //从文档中获取指定的DOM元素
        baidu.g = baidu.G = baidu.dom.g || {};

        //获取目标元素的属性值
        baidu.getAttr = baidu.dom.getAttr = baidu._util_.attr;

        //获取目标元素的样式值
        baidu.getStyle = baidu.dom.getStyle || {};

        //隐藏目标元素
        baidu.hide = baidu.dom.hide || {};

        //在目标元素的指定位置插入HTML代码
        baidu.insertHTML = baidu.dom.insertHTML || {};

        //通过className获取元素
        baidu.dom.q = function(className) {
            return document.getElementsByClassName(className);
        }
        baidu.dom.create = function(tagName, opt_attributes) {
            var el = document.createElement(tagName),
                attributes = opt_attributes || {};
            return baidu.dom.setAttrs(el, attributes);
        };
        //移除目标元素的className
        baidu.removeClass = baidu.dom.removeClass || {};


        //链头
        baidu.event = baidu.event || {};

        //为目标元素添加事件监听器
        baidu.on = baidu.event.on || {};

        //为目标元素移除事件监听器
        baidu.un = baidu.event.un || {};

        //链头
        baidu.object = baidu.object || {};

        //链头
        baidu.string = baidu.string || {};

        //对目标字符串进行html解码
        baidu.decodeHTML = baidu.string.decodeHTML || {};

        //对目标字符串进行html编码
        baidu.encodeHTML = baidu.string.encodeHTML || {};

        //对目标字符串进行html标签尖括号编码
        baidu.encodeHTMLTagOnly = baidu.string.encodeHTMLTagOnly || {};

        //对目标字符串进行格式化
        baidu.format = baidu.string.format || {};

        //删除目标字符串两端的空白字符
        baidu.trim = (function() {
            var trimer = new RegExp('(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)', 'g');
            return function(target) {
                return String(target).replace(trimer, '');
            }
        })();
        return baidu;
    }();
    var qtList = [
        's',
        'spot',
        'con',
        'nb',
        'inf',
        'detailConInfo',
        'detailInfo',
        'ind',
        'index',
        'bse',
        'messageCenterNew',
        'sdata',
        'hp',
        'bd',
        'sug'
    ];

    function getHeader(qt, callback) {
        if (qtList.indexOf(qt) > -1) {
            // 检查是否有该方法
            if (
                'getAcsTokenWithAbcliteActiveReport' in window.paris_2059 &&
                typeof window.paris_2059.getAcsTokenWithAbcliteActiveReport === 'function'
            ) {
                // alreadySend : 请求是否已经发送标志位，初始化为 false，未发送
                var alreadySend = false;
                window.paris_2059.getAcsTokenWithAbcliteActiveReport(function(acsToken) {
                    // 获得acsToken,如果未发送，发送请求并将标志位置为true
                    if (!alreadySend) {
                        alreadySend = true;
                        callback(acsToken);
                    }
                });
                // 超时保证正常发送请求，Acs-Token 置为 timeout
                setTimeout(function() {
                    // 如果已发送，不再发送；如果未发送，发送请求并将标志位置为true
                    if (!alreadySend) {
                        alreadySend = true;
                        callback('timeout');
                    }
                }, 100);
            } else {
                // 如果未找到asctoken产出的方法，返回tokenerror
                callback('tokenerror');
            }
        } else {
            // 不属于qtlist中的选项，返回空
            callback();
        }
    }
    /**
     * 创建一个baidu.lang.Class的单例实例
     * @name baidu.lang.createSingle
     * @function
     * @grammar baidu.lang.createSingle(json)
     * @param {Object} json 直接挂载到这个单例里的预定属性/方法
     * @version 1.2
     * @see baidu.lang.Class
     *
     * @returns {Object} 一个实例
     */
    baidu.lang.createSingle = function(json) {
        var c = new baidu.lang.Class();

        for (var key in json) {
            c[key] = json[key];
        }
        return c;
    };

    /**
     * 批量设置目标元素的style样式值
     * @name baidu.dom.setStyles
     * @function
     * @grammar baidu.dom.setStyles(element, styles)
     * @param {HTMLElement|string} element 目标元素或目标元素的id
     * @param {Object} styles 要设置的样式集合
     * @shortcut setStyles
     * @meta standard
     * @see baidu.dom.setStyle,baidu.dom.getStyle
     *
     * @returns {HTMLElement} 目标元素
     */
    baidu.dom.setStyles = function(element, styles) {
        element = baidu.dom.g(element);

        for (var key in styles) {
            baidu.dom.setStyle(element, key, styles[key]);
        }

        return element;
    };

    // 声明快捷方法
    baidu.setStyles = baidu.dom.setStyles;

    /******************* patch **********************/
    /**
     * 此文件包括的代码不是从tangram中直接拷贝的文件，而是参考tangram规范自己编写的通用类库，
     * 或者是从tangram中拷贝过来的代码，又进行了修改。
     *
     * 类库列表:
     * baidu.ajax 是直接拷贝的Fe框架中的部分，这样逻辑代码改动量少, by wjp
     * baidu.dom.removeClass 给空元素设置样式经常报错，所以小改了一下，放在Patch中,by wjp
     *
     * baidu.UI.ScrollPanel 自定义滚动条，内部代码有修改，主要是滚动条有焦点或无焦点时候的样式, by wjp
     * baidu.swf.createHTML flash本地存储，修改了浏览器falsh版本或末安装的判断，bj jason.zhou
     *
     */

    //TODO delete 使用tangram2.0中的ajax方法
    //2013.11.6
    /**
     * 获取XMLHttpRequest对象
     * @ignore
     * @return {XMLHttpRequest} XMLHttpRequest对象
     */
    function getXHR() {
        if (window.ActiveXObject) {
            try {
                return new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    return new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {}
            }
        }
        if (window.XMLHttpRequest) {
            return new XMLHttpRequest();
        }
    }

    // window.getXhr = getXHR;


    /**
     * @method baidu.jsonp
     * @desc jsonp请求，由jsonp自动分配回调函数，使用完成后回收，避免污染全局
     * @param  String     [description]
     * @param  [Function] [description]
     *      @param  Object  回调的参数
     *      @param  Object  jsonp对象，类似于xhr
     *          @property   Stirng url 请求的url
     *          @property   Object options 请求的配置
     *          @property   startTime   请求开始的时间
     *          @property   endTime   请求完成的时间
     * @param  [Object]
     *      @property  [Stirng] cbtype  表示回调函数的url参数名称，支持除callback之外的自定义参数：如:cb、fn等
     *      @property  [String] cbname  回调函数的名称，用于支持回调函数固定的情况，不建议使用 **还未实现
     *      @property  [Function] fail  失败时的回调函数
     * @return Object jsonp对象
     * @author  gyx, fms
     */
    //jsonp请求默认回调监听器
    window.jsonp = {};

    baidu.jsonp = function(url, callback, opts) {
        var urlData = util.getParam(url) || {};
        var qt = urlData.qt;
        if (callback && typeof callback != 'function') {
            opts = callback;
            callback = opts.success || function() {}
        }
        opts = opts || {};
        opts.cbtype = opts.cbtype || 'callback';
        // 所有请求加 auth 和 seckey 参数
        url = addExtraParamsToUrl(url);
        var hash = "jsonp" + Math.floor(Math.random() * 100000000);
        //jsonp 需要在window上面增加监听
        window[hash] = function(data) {
            jsonpObj.endTime = new Date().getTime();
            //计算执行是否超时
            var duration = jsonpObj.endTime - jsonpObj.startTime;
            if (duration > 6000) {
                jsonpObj.slow = '6';
            } else if (duration > 3000) {
                jsonpObj.slow = '3';
            } else if (duration > 2000) {
                jsonpObj.slow = '2';
            }
            window[hash] = undefined;
            // 请求中 统一 更新 auth
            if (data && data.result && data.result.auth) {
                window.AUTH = data.result.auth;
            }
            if (data && data.anti_auth) {
                window.AUTH = data.anti_auth;
            }
            callback && callback(data, jsonpObj);
            jsonpObj.dom = null;
            document.body.removeChild(sc);
        }
        var sc = document.createElement("script");
        //jsonp object
        var jsonpObj = {
            options: opts,
            startTime: new Date().getTime(),
            slow: false,
            dom: sc,
            url: url
        };
        if (url.indexOf('?') != -1) {
            var sep = '&';
        } else {
            var sep = '?';
        }
        var scSrc = '';

        function sendJsonp(src) {
            sc.src = src;
            sc.onerror = function() {
                window[hash] = undefined;
                opts.error && opts.error(jsonpObj);
                jsonpObj.dom = null;
                document.body.removeChild(sc);
            };
            document.body.appendChild(sc);
        };
        // 检查是否有qt和方法
        if (qt && window.paris_2059) {
            // 获取到header，添加到参数里，并发送请求
            getHeader(qt, function(acsToken) {
                // 返回asctoken拼接
                if (acsToken) {
                    scSrc = url + sep + 'acsToken=' + acsToken + '&' + opts.cbtype + '=' + hash;
                } else {
                    scSrc = url + sep + opts.cbtype + '=' + hash;
                }
                sendJsonp(scSrc);
            });
        } else {
            // 如果不带qt，则保持原逻辑
            scSrc = url + sep + opts.cbtype + '=' + hash;
            sendJsonp(scSrc);
        }
        return jsonpObj;
    };
    /**
     * 直接从老的Fe框架中拷贝过来的，这样代码改动量少, by wjp
     * @TODO 建议改用最新的baidu.ajax方法
     */
    baidu.Ajax = function(op) {

        this.url = "";

        this.data = "";

        this.async = true;

        this.duration = -1;

        this.overtime = false;

        this.username = "";

        this.password = "";

        this.method = "GET";

        if (typeof op == "object" && op) {
            for (var i in op) {
                this[i] = op[i];
            }
        }
    };


    (function() {

        baidu.Ajax.prototype.request = function(url, data, onslow) {
            var me = this,
                pool = getPool(),
                xhr = pool.xhr;

            pool.active = true;
            me.url = url;

            if (typeof data == "string" && data) {
                me.data = data;
            }

            if (typeof me.onexecute == "function") {
                me.onexecute(xhr);
            }
            me.url = addExtraParamsToUrl(me.url);
            try {
                if (!me.username) {
                    xhr.open(me.method, me.url, me.async);
                } else {
                    xhr.open(me.method, me.url, me.async, me.username, me.password);
                }

                if (me.async) {
                    xhr.onreadystatechange = _rsc;
                }

                if (me.method.toUpperCase() == "POST") {
                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                }

                me.beginTime = new Date().getTime();

                if (me.duration > 0) {
                    timeout();
                }
                xhr.send(me.data);

            } catch (ex) {
                if (typeof me.onerror == "function") {
                    me.onerror(ex);
                }
            }

            if (!me.async) {
                _rsc();
            }
            var startTime = new Date().getTime();

            function _rsc() {
                if (xhr.readyState == 4) {
                    try {
                        xhr.status;
                    } catch (ex) { // fixed for Firefox disconnect
                        if (typeof me.ondisconnect == "function") {
                            me.ondisconnect(xhr);
                        }
                        pool.active = false;
                        return;
                    }
                    try {
                        var finishTime = new Date().getTime();
                        if (finishTime - startTime > 6000 && onslow) {
                            onslow('6');
                        } else if (finishTime - startTime > 3000 && onslow) {
                            onslow('3');
                        } else if (finishTime - startTime > 2000 && onslow) {
                            onslow('');
                        }
                    } catch (ex) {}
                    me.duration = -1;

                    if (!me.overtime) {
                        if (typeof me["on" + xhr.status] == "function") {
                            me["on" + xhr.status](xhr);
                        }

                        if (xhr.status == 200 || xhr.status === 304) {
                            try {
                                var json = baidu.json.parse(xhr.responseText);
                                // 请求返回中 统一 更新 auth
                                if (json && json.result && json.result.auth) {
                                    window.AUTH = json.result.auth;
                                }
                                if (json && json.anti_auth) {
                                    window.AUTH = json.anti_auth;
                                }
                            } catch (e) {

                            }
                            if (typeof me.onsuccess == "function") {
                                me.onsuccess(xhr);
                            }
                        } else {
                            if (typeof me.onfailure == "function") {
                                me.onfailure(xhr);
                            }
                        }
                    }

                    pool.active = false;

                    xhr.onreadystatechange = function() {};
                }
            }

            function timeout() {
                if (me.duration == -1) return;
                if (new Date().getTime() - me.beginTime > me.duration) {
                    me.duration = -1;
                    try {
                        xhr.abort();
                    } catch (e) {}
                    me.overtime = true;
                    pool.active = false;
                    if (typeof me.ontimeout == "function") {
                        me.ontimeout(xhr);
                    }
                }
                setTimeout(function() {
                    timeout();
                }, 10);
            }
        };

        var xhrpools = [];

        function getPool() {
            var pools = xhrpools;
            for (var pool = null, i = 0; i < pools.length; i++) {
                pool = pools[i];
                if (!pool.active) {
                    break;
                }
            }

            if (i >= pools.length) {
                pool = {
                    active: false,
                    xhr: getXHR()
                };
                pools[pools.length] = pool;
            }

            return pool;
        };
    })();

    baidu.Ajax.get = function(url, callback) {
        return this.request(url, callback);
    };
    baidu.Ajax.post = function(url, data, succCallback, failCallback) {
        var mm = new baidu.Ajax({
            onsuccess: succCallback,
            onfailure: failCallback
        });
        mm.method = "POST";
        mm.request(url, data);
        return mm;
    };
    baidu.Ajax.request = function(url, data, options) {
        if (typeof data == "object" && data) {
            options = data;
            data = null;
        } else if (typeof data == "function") {
            options = options || {};
            options.onsuccess = data;
            data = null;
        }
        if (options.onslow) {
            var onslow = options.onslow;
            options.onslow = null;
        }
        var mm = new baidu.Ajax(options);
        mm.request(url, data, onslow);
        return mm;
    };

    function addExtraParamsToUrl(url) {
        if (typeof url !== 'string') {
            return;
        }
        // qt 正则，所有 qt 都增加反抓参数
        var regQt = /qt=\S+(&|$)/g;
        // rri 请求正则
        var regRii = /ugcapi.baidu.com\/richindex\/2\/(comment|photo|detail)/g;
        // 补充反抓相关参数
        if ((regQt.test(url) || regRii.test(url))) {
            if (url.indexOf('&auth=') < 0 && url.indexOf('?auth=') < 0) {
                if (window.AUTH) {
                    url += (url.indexOf('?') === -1 ? '?' : '&') + 'auth=' + encodeURIComponent(window.AUTH);
                }
            }
            if (url.indexOf('&seckey=') < 0 && url.indexOf('?seckey=') < 0) {
                if (window.SECKEY) {
                    url += (url.indexOf('?') === -1 ? '?' : '&') + 'seckey=' + encodeURIComponent(window.SECKEY);
                }
            }
        }

        // 统一补充pcevaname=pc4.1参数
        if (url.indexOf('&pcevaname=') < 0 && url.indexOf('?pcevaname=') < 0) {
            url += (url.indexOf('?') === -1 ? '?' : '&') + 'pcevaname=pc4.1';
        }
        // 统一补充newfrom参数，标识来自主站
        if (url.indexOf('&newfrom=') < 0 && url.indexOf('?newfrom=') < 0) {
            url += (url.indexOf('?') === -1 ? '?' : '&') + 'newfrom=zhuzhan_webmap';
        }
        // 识别QA环境 的 newfrom参数，反抓会将其过滤掉
        var href = location.href || '';
        var json = baidu.url.queryToJson(href) || {};

        if (json.newfrom) {
            var newFrom = 'newfrom=' + json.newfrom;
            url = url.replace(/newfrom=([^&]*)/, newFrom);
        }
        return url;
    }
    T.ajax = (function() {
        function array2Url(data) {
            var arr = [];
            for (key in data) {
                arr.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
            }
            if (arr.length > 0) {
                return arr.join('&');
            }
            return '';
        }

        /********************************************** 类定义 **********************************************/
        /**
         * @method request {XMLHttpRequest}
         * @param url {String} 请求的地址，可以是绝对路径或者相对于host的路径
         * @param [options] {Object} 选项
         * @param [options.data] {Object} 发送的数据
         * @param [options.dataType] {String} json|text|xml请求的method
         * @param [options.method] {Object} 请求的method
         * @param [options.context] {Object} 成功和失败回调的作用域
         * @param [options.async] {Boolean} 是否为异步请求
         * @param [options.success] {Function} 成功的回调函数
         * @param [options.error] {Function} 失败的回调函数
         * @param [options.headers] {Object} 发送请求时额外的headers
         */
        function request(url, options) {
            var oldUrl = url;
            var oldOptions = options;
            // 兼容三端统一详情页zepto的调用格式，
            // 将zepto调用格式适配成tangram认识的格式
            if (typeof url === 'object') {
                var zeptoOpts = url;
                var zeptoUrl = zeptoOpts.url;
                zeptoOpts.method = zeptoOpts.type || 'get';
                var reqType = zeptoOpts.dataType || '';
                if (reqType === 'jsonp') {
                    var strParam = '';
                    if (zeptoOpts.data) {
                        var strTemp = array2Url(zeptoOpts.data);
                        if (strTemp) {
                            strParam = (zeptoUrl.indexOf('?') > -1 ? '&' : '?') + strTemp;
                        }
                    }
                    var strUrl = zeptoUrl + strParam;
                    var cbType = zeptoOpts.jsonp || '';
                    baidu.jsonp(strUrl, zeptoOpts.success, {
                        error: zeptoOpts.error,
                        cbtype: cbType
                    });
                    return;
                }
                options = zeptoOpts;
                url = zeptoUrl;
            }

            var method = ((options && options.method) || 'get').toLowerCase();
            var data = options.data;

            //  解析data，并进行相应的处理
            var needAddDefaultHeader = true;
            if (typeof data == 'object' && data !== null) {
                if (window.FormData && data instanceof window.FormData) {
                    needAddDefaultHeader = false;
                } else {
                    data = array2Url(data);
                }
            }
            // 如果以/开头，则认为是当前域
            if (url.indexOf("/") == 0) {
                url = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "") + url;
            }
            //  如果method只能通过url传递参数，那就放到url上
            if ((method == 'get' || method == 'delete' || method == 'put') && typeof(data) == 'string') {
                url += (url.indexOf('?') == -1 ? '?' : '&') + data;
            }
            // 所有请求加 auth 和 seckey 参数
            url = addExtraParamsToUrl(url);
            //  获取原生Ajax
            var trans = getTransport(url);

            //  打开Ajax
            if (options.async === undefined) {
                options.async = true;
            };
            trans.open(method, url, options.async);

            //  设置headers
            var headers = options.headers || {};
            if (needAddDefaultHeader && method == 'post' && !headers['Content-Type']) {
                headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
            }
            for (var name in headers) {
                var value = headers[name];
                if (typeof value != 'string') continue;
                trans.setRequestHeader(name, value);
            }

            //  设置ajax的跟踪事件
            trans.onreadystatechange = function() {
                stateChange(trans, options, oldUrl, oldOptions);
            }
            //tran 在ie6下不能修改
            if (isXhr) {
                trans.timeStart = (new Date()).getTime();
            }
            var svcpStk = baidu.cookie.get('svcp_stk');
            if (svcpStk) {
                trans.setRequestHeader('svcp_stk', svcpStk);
            }
            //  发送数据
            var dataQuery = util.getParam('?' + data) || {};
            var urlQuery = util.getParam(url) || {};
            var dataQt = dataQuery.qt || '';
            var urlQt = urlQuery.qt || '';
            var qt = dataQt ? dataQt : urlQt;
            // 检查是否有qt和方法
            if (qt && window.paris_2059) {
                getHeader(qt, function(acsToken) {
                    // 有acstoken设置请求头
                    if (acsToken) {
                        trans.setRequestHeader('Acs-Token', acsToken);
                    }
                    trans.send(data);
                });
            } else {
                trans.send(data);
            }
            return trans;
        }
        /********************************************** 私有方法 **********************************************/
        function stateChange(trans, options, oldUrl, oldOptions) {
            if (trans.readyState == 4) {
                trans.onreadystatechange = function() {};
                var status = trans.status;

                if ((typeof(status) == 'number') && status >= 200 && status < 300) {
                    if (typeof(options.success) != 'function') return;
                    if (isXhr) {
                        trans.timeEnd = (new Date()).getTime();
                        var duration = trans.timeEnd - trans.timeStart;
                        if (duration > 6000) {
                            trans.slow = '6';
                        } else if (duration > 3000) {
                            trans.slow = '3';
                        } else if (duration > 2000) {
                            trans.slow = '2';
                        } else {
                            trans.slow = null;
                        }
                    }
                    var data;
                    // try {
                    switch (options.dataType) {
                        case 'text':
                            data = trans.responseText;
                            break;
                        case 'json':
                            if (trans.responseText) {
                                data = eval('(' + trans.responseText + ')');
                            }
                            break;
                        case 'xml':
                            data = trans.responseXML;
                            break;
                    }
                    // 请求返回中 统一 更新 auth
                    if (data && data.result && data.result.auth) {
                        window.AUTH = data.result.auth;
                    }
                    if (data && data.anti_auth) {
                        window.AUTH = data.anti_auth;
                    }
                    var query = util.getParam(trans.responseURL) || {};
                    var qt = query.qt || '';
                    if (qtList.indexOf(qt) > -1) {
                        var urlResult = data.result || {};
                        var antiSession = urlResult.anti_session || {};
                        var needRecaptcha = antiSession.need_recaptcha || false;
                        if (needRecaptcha) {
                            // 验证码方法
                            var BiocFacade = window.BiocFacade;
                            var ak = 'gKbXJKeT7tmAq5a9hc7coNKZQMKTSn5f'; // 联系管理员申请获取
                            var captcha = BiocFacade.createCaptcha({
                                ak
                            });
                            captcha.showPopup();
                            captcha.onSuccess(function(token) {
                                // TODO: 处理token
                                // 如：设置到cookie中，方便重新发起请求时带上
                                document.cookie = 'svcp_stk=' + token.stk +
                                    '; expires=' + new Date(Date.now() + 60000).toUTCString() + ';';
                                oldUrl = oldUrl.replace(/(&t=)(\d+)/, '&t=' + new Date().getTime());
                                request(oldUrl, oldOptions);
                            });
                        } else {
                            options.success.call(options.context, data, trans);
                        }
                    } else {
                        options.success.call(options.context, data, trans);
                    }
                    //dp平台ajax请求耗时
                    alog('cus.fire', 'time', {
                        'z_ajax_time': duration
                    });

                    // } catch (e) {
                    //     if (typeof options.error == 'function') {
                    //         options.error.call(e, trans);
                    //     }
                    // }
                } else {
                    if (typeof(options.error) == 'function') {
                        var error = {
                            status: trans.status,
                            statusText: trans.statusText,
                            data: trans.responseText
                        };
                        options.error.call(options.context, trans);
                        //dp平台计数监控
                        alog('cus.fire', 'count', 'z_ajax_error');
                    }
                }
            }
        }
        /**
         * 获取原生的Ajax
         */
        var getTransport = function() {
            if (window.XMLHttpRequest) {
                isXhr = true;
                return new XMLHttpRequest();
            } else {
                try {
                    return new ActiveXObject('Msxml2.XMLHTTP');
                } catch (e) {
                    try {
                        return new ActiveXObject('Microsoft.XMLHTTP');
                    } catch (e) {
                        return false;
                    }
                }
            }
        };
        var isXhr = false;;
        return request;
    })();

    var rbracket = /\[\]$/;

    function addParam(array, key, val) {
        val = baidu.type(val) === 'function' ? val() : (typeof val == 'undefined' || val == null ? '' : val);
        array.push(encodeURIComponent(key) + '=' + encodeURIComponent(val));
    }

    function buildParams(array, key, val, traditional) {
        if (baidu.type(val) === 'array') {
            baidu.forEach(val, function(item, index) {
                if (traditional || rbracket.test(key)) {
                    addParam(array, key, item);
                } else {
                    buildParams(array, key + '[' + (typeof item === 'object' ? index : '') + ']', item, traditional);
                }
            });
        } else if (!traditional && baidu.type(val) === "object") {
            for (var i in val) {
                buildParams(array, key + '[' + i + ']', val[i], traditional);
            }
        } else {
            addParam(array, key, val);
        }
    }

    baidu.ajax.param = function(src, traditional) {
        var ret = [];
        if (baidu.type(src) === 'array') {
            baidu.forEach(src, function(item) {
                addParam(ret, item.name, item.value);
            });
        } else {
            for (var i in src) {
                buildParams(ret, i, src[i], traditional);
            }
        }
        return ret.join('&').replace(/%20/g, '+');
    };


    /**
     * 移除目标元素的className
     * @name baidu.dom.removeClass
     * @function
     * @grammar baidu.dom.removeClass(element, className)
     * @param {HTMLElement|string} element 目标元素或目标元素的id
     * @param {string} className 要移除的className，允许同时移除多个class，中间使用空白符分隔
     * @remark
     * 使用者应保证提供的className合法性，不应包含不合法字符，className合法字符参考：http://www.w3.org/TR/CSS2/syndata.html。
     * @shortcut removeClass
     * @meta standard
     * @see baidu.dom.addClass
     *
     * @returns {HTMLElement} 目标元素
     */
    baidu.dom.removeClass = function(element, className) {
        if (!element) { //给空元素设置样式经常报错，小改一下,by wjp
            return;
        }

        element = baidu.dom.g(element);

        var oldClasses = element.className.split(/\s+/),
            newClasses = className.split(/\s+/),
            lenOld,
            lenDel = newClasses.length,
            j,
            i = 0;
        //考虑到同时删除多个className的应用场景概率较低,故放弃进一步性能优化 
        // by rocy @1.3.4
        for (; i < lenDel; ++i) {
            for (j = 0, lenOld = oldClasses.length; j < lenOld; ++j) {
                if (oldClasses[j] == newClasses[i]) {
                    oldClasses.splice(j, 1);
                    break;
                }
            }
        }
        element.className = oldClasses.join(' ');
        return element;
    };

    // 声明快捷方法
    baidu.removeClass = baidu.rc = baidu.dom.removeClass;

    /**
     * 各种页面的UI组件
     * @namespace baidu.ui
     */
    baidu.ui = baidu.ui || {
        version: '1.3.9'
    };

    /**
     * 通过uiType找到UI类，查找规则：suggestion -> baidu.ui.Suggestion，toolbar-spacer -> baidu.ui.Toolbar.Spacer.
     * @function
     * @grammar baidu.ui.getUI(uiType)
     * @param {String} uiType
     * @return {object} UI类
     * @author berg
     */
    baidu.ui.getUI = function(uiType) {
        var uiType = uiType.split('-'),
            result = baidu.ui,
            len = uiType.length,
            i = 0;

        for (; i < len; i++) {
            result = result[uiType[i].charAt(0).toUpperCase() + uiType[i].slice(1)];
        }
        return result;
    };

    /**
     * 创建一个ui控件
     * @function
     * @grammar baidu.ui.create(UI, options)
     * @param {object|String} UI控件类或者uiType
     * @param {object} options optional 控件的初始化属性
     * @config {Boolean} autoRender 是否自动render，默认true
     * @config {String|HTMLElement} render到的元素
     * @config {Object} parent 父控件
     * @return {Object} 创建好的控件实例
     * @author berg
     */
    baidu.ui.create = function(UI, options) {
        if (baidu.lang.isString(UI)) {
            UI = baidu.ui.getUI(UI);
        }
        return new UI(options);
    };

    /**
     * UI基类，所有的UI都应该从这个类中派生出去
     * @name baidu.ui.Base
     * @grammar baidu.ui.Base
     * @class
     * @return {baidu.ui.Base}
     * @author berg
     */
    baidu.ui.Base =
        /**
         * @lends baidu.ui.Base.prototype
         */
        {

            id: "",

            /**
             * 获得当前控件的id
             * @param {string} optional key
             * @return {string} id
             */
            getId: function(key) {
                var ui = this,
                    idPrefix;
                //通过guid区别多实例
                idPrefix = "tangram-" + ui.uiType + '--' + (ui.id ? ui.id : ui.guid);
                return key ? idPrefix + "-" + key : idPrefix;
            },

            /**
             * 获得class，支持skin
             *
             * @param {string} optional key
             *
             * @return {string} className
             */
            getClass: function(key) {
                var me = this,
                    className = me.classPrefix,
                    skinName = me.skin;
                if (key) {
                    className += '-' + key;
                    skinName += '-' + key;
                }
                if (me.skin) {
                    className += ' ' + skinName;
                }
                return className;
            },

            getMain: function() {
                return baidu.g(this.mainId);
            },

            getBody: function() {
                return baidu.g(this.getId());
            },


            /**
             * 控件类型：如dialog
             */
            uiType: "",

            /**
             * 获取调用的字符串的引用前缀
             */
            getCallRef: function() {
                return "window['$BAIDU$']._instances['" + this.guid + "']";
            },

            /**
             * 获取调用的字符串
             */
            getCallString: function(fn) {
                var i = 0,
                    arg = Array.prototype.slice.call(arguments, 1),
                    len = arg.length;
                for (; i < len; i++) {
                    if (typeof arg[i] == 'string') {
                        arg[i] = "'" + arg[i] + "'";
                    }
                }
                //如果被闭包包起来了，用baidu.lang.instance会找到最外面的baidu函数，可能出错
                return this.getCallRef() + '.' + fn + '(' + arg.join(',') + ');';
            },

            /**
             * 添加事件. 避免析构中漏掉注销事件.
             * @param {HTMLElement|string|window} element 目标元素或目标元素id
             * @param {string} type 事件类型
             * @param {Function} listener 需要添加的监听器
             */
            on: function(element, type, listener) {
                baidu.on(element, type, listener);
                this.addEventListener("ondispose", function() {
                    baidu.un(element, type, listener);
                });
            },

            /**
             * 渲染控件到指定的元素
             * @param {HTMLElement} main optional   要渲染到的元素，可选。
             *                                      如果不传此参数，则会在body下创建一个绝对定位的div做为main
             * @return  {HTMLElement} main 渲染到的元素
             */
            renderMain: function(main) {
                var ui = this,
                    i = 0,
                    len;
                //如果被渲染过就不重复渲染
                if (ui.getMain()) {
                    return;
                }
                main = baidu.g(main);
                //如果没有main元素，创建一个在body下面的div当作main
                if (!main) {
                    main = document.createElement('div');
                    document.body.appendChild(main);
                    main.style.position = "absolute";
                    //给这个元素创建一个class，方便用户控制
                    main.className = ui.getClass("main");
                }
                if (!main.id) {
                    main.id = ui.getId("main");
                }
                ui.mainId = main.id;
                main.setAttribute('data-guid', ui.guid);

                return main;
            },

            /**
             * 销毁当前实例
             */
            dispose: function() {
                this.dispatchEvent("dispose");
                baidu.lang.Class.prototype.dispose.call(this);
            }
        };

    /**
     * 创建一个UI控件类
     * @function
     * @grammar baidu.ui.createUI(constructor, options)
     * @param {Function} constructor ui控件构造器
     * @param {Object} options 选项
     * @return {Object} ui控件
     */
    baidu.ui.createUI = function(constructor, options) {

        options = options || {};
        var superClass = options.superClass || baidu.lang.Class,
            lastInherit = superClass == baidu.lang.Class ? 1 : 0,
            i,
            n,
            ui = function(opt, _isInherits) { // 创建新类的真构造器函数
                var me = this;
                opt = opt || {};
                // 继承父类的构造器，将isInherits设置成true，在后面不执行render操作
                superClass.call(me, !lastInherit ? opt : (opt.guid || ""), true);

                //扩展静态配置到this上
                baidu.object.extend(me, ui.options);
                //扩展当前options中的项到this上
                baidu.object.extend(me, opt);
                //baidu.object.merge(me, opt, {overwrite:true, recursive:true});

                me.classPrefix = me.classPrefix || "tangram-" + me.uiType.toLowerCase();

                //初始化行为
                //行为就是在控件实例上附加一些属性和方法
                for (i in baidu.ui.behavior) {
                    //添加行为到控件上
                    if (typeof me[i] != 'undefined' && me[i]) {
                        baidu.object.extend(me, baidu.ui.behavior[i]);
                        if (baidu.lang.isFunction(me[i])) {
                            me.addEventListener("onload", function() {
                                baidu.ui.behavior[i].call(me[i].apply(me));
                            });
                        } else {
                            baidu.ui.behavior[i].call(me);
                        }
                    }
                }

                //执行控件自己的构造器
                constructor.apply(me, arguments);

                //执行插件的构造器
                for (i = 0, n = ui._addons.length; i < n; i++) {
                    ui._addons[i](me);
                }
                if (opt.parent && me.setParent) {
                    me.setParent(opt.parent);
                }
                if (!_isInherits && opt.autoRender) {
                    me.render(opt.element);
                }
            },
            C = function() {};

        C.prototype = superClass.prototype;

        //继承父类的原型链
        var proto = ui.prototype = new C();

        //继承Base中的方法到prototype中
        for (i in baidu.ui.Base) {
            proto[i] = baidu.ui.Base[i];
        }

        /**
         * 扩展控件的prototype
         *
         * @param {Object} json 要扩展进prototype的对象
         *
         * @return {Object} 扩展后的对象
         */
        ui.extend = function(json) {
            for (i in json) {
                ui.prototype[i] = json[i];
            }
            return ui; // 这个静态方法也返回类对象本身
        };

        //插件支持
        ui._addons = [];
        ui.register = function(f) {
            if (typeof f == "function")
                ui._addons.push(f);
        };

        //静态配置支持
        ui.options = {};

        return ui;
    };

    /**
     * 对目标字符串进行格式化
     * @name baidu.string.format
     * @function
     * @grammar baidu.string.format(source, opts)
     * @param {string} source 目标字符串
     * @param {Object|string...} opts  提供相应数据的对象或多个字符串
     * @remark
     * 
    opts参数为“Object”时，替换目标字符串中的#{property name}部分。<br>
    opts为“string...”时，替换目标字符串中的#{0}、#{1}...部分。
            
     * @shortcut format
     * @meta standard
     *             
     * @returns {string} 格式化后的字符串
     */
    baidu.string.format = function(source, opts) {
        source = String(source);
        var data = Array.prototype.slice.call(arguments, 1),
            toString = Object.prototype.toString;
        if (data.length) {
            data = data.length == 1 ?
                /* ie 下 Object.prototype.toString.call(null) == '[object Object]' */
                (opts !== null && (/\[object Array\]|\[object Object\]/.test(toString.call(opts))) ? opts : data) : data;
            return source.replace(/#\{(.+?)\}/g, function(match, key) {
                var replacer = data[key];
                // chrome 下 typeof /a/ == 'function'
                if ('[object Function]' == toString.call(replacer)) {
                    replacer = replacer(key);
                }
                return ('undefined' == typeof replacer ? '' : replacer);
            });
        }
        return source;
    };

    // 声明快捷方法
    baidu.format = baidu.string.format;

    /**
     * 设置UI控件的父控件
     * @memberOf baidu.ui.Base.prototype
     * @param {UI} 父控件
     */
    baidu.ui.Base.setParent = function(parent) {
        var me = this,
            oldParent = me._parent;
        oldParent && oldParent.dispatchEvent("removechild");
        if (parent.dispatchEvent("appendchild", {
                child: me
            })) {
            me._parent = parent;

            /* 
             * childName名字没有确定，暂时先不加这段代码
             * //如果有childName，skin和classPrefix以父元素为准
             *if(me.childName){
             *    if(parent.skin){
             *        me.skin = parent.skin + '-' + me.childName;
             *    }
             *    if(parent.classPrefix){
             *        me.classPrefix = parent.classPrefix + '-' + me.childName;
             *    }
             *}
             */
        }
    };

    /**
     * 获取UI控件的父控件
     * @memberOf baidu.ui.Base.prototype
     * @return {UI} 父控件
     */
    baidu.ui.Base.getParent = function() {
        return this._parent || null;
    };

    /**
     * Tangram UI
     * Copyright 2009 Baidu Inc. All rights reserved.
     *
     * path: ui/behavior/statable.js
     * author: berg, lingyu
     * version: 1.0.0
     * date: 2010/09/04
     */
    /**
     * @namespace baidu.ui.behavior 为各个控件增加装饰器
     */
    baidu.ui.behavior = baidu.ui.behavior || {};

    /**
     * 获取事件的触发元素
     * @name baidu.event.getTarget
     * @function
     * @grammar baidu.event.getTarget(event)
     * @param {Event} event 事件对象
     * @meta standard
     * @returns {HTMLElement} 事件的触发元素
     */

    baidu.event.getTarget = function(event) {
        return event.target || event.srcElement;
    };

    /**
     * 为ui控件添加状态管理行为
     */
    (function() {
        var Statable = baidu.ui.behavior.statable = function() {
            var me = this;

            me.addEventListeners('ondisable,onenable', function(event, options) {
                var element, group;
                options = options || {};
                elementId = (options.element || me.getMain()).id;
                group = options.group;

                if (event.type == 'ondisable' && !me.getState(elementId, group)['disabled']) {
                    me.removeState('press', elementId, group);
                    me.removeState('hover', elementId, group);
                    me.setState('disabled', elementId, group);
                } else if (event.type == 'onenable' && me.getState(elementId, group)['disabled']) {
                    me.removeState('disabled', elementId, group);
                }
            });
        };

        //保存实例中所有的状态，格式：group+elementId : {stateA : 1, stateB : 1}
        Statable._states = {};
        //所有可用的状态，调用者通过addState添加
        Statable._allStates = ['hover', 'press', 'disabled'];
        Statable._allEventsName = ['mouseover', 'mouseout', 'mousedown', 'mouseup'];
        Statable._eventsHandler = {
            'mouseover': function(id, group) {
                var me = this;
                if (!me.getState(id, group)['disabled']) {
                    me.setState('hover', id, group);
                    return true;
                }
            },
            'mouseout': function(id, group) {
                var me = this;
                if (!me.getState(id, group)['disabled']) {
                    me.removeState('hover', id, group);
                    me.removeState('press', id, group);
                    return true;
                }
            },
            'mousedown': function(id, group) {
                var me = this;
                if (!me.getState(id, group)['disabled']) {
                    me.setState('press', id, group);
                    return true;
                }
            },
            'mouseup': function(id, group) {
                var me = this;
                if (!me.getState(id, group)['disabled']) {
                    me.removeState('press', id, group);
                    return true;
                }
            }
        };

        /**
         * 获得状态管理方法的字符串，用于插入元素的HTML字符串的属性部分
         *
         * @param {string} group optional    状态分组，同一组的相同状态会被加上相同的css.
         * @param {string} key optional 索引，在同一类中的索引.
         *
         * @return {string} 元素属性字符串.
         */
        Statable._getStateHandlerString = function(group, key) {
            var me = this,
                i = 0,
                len = me._allEventsName.length,
                ret = [],
                eventType;
            if (typeof group == 'undefined') {
                group = key = '';
            }
            for (; i < len; i++) {
                eventType = me._allEventsName[i];
                ret[i] = 'on' + eventType + '=\"' + me.getCallRef() + "._fireEvent('" + eventType + "', '" + group + "', '" + key + "', event)\"";
            }

            return ret.join(' ');
        };

        /**
         * 触发指定类型的事件
         * @param {string} eventType  事件类型.
         * @param {string} group optional    状态分组，同一组的相同状态会被加上相同的css.
         * @param {string} key 索引，在同一类中的索引.
         * @param {DOMEvent} e DOM原始事件.
         */
        Statable._fireEvent = function(eventType, group, key, e) {
            var me = this,
                id = me.getId(group + key);
            if (me._eventsHandler[eventType].call(me, id, group)) {
                me.dispatchEvent(eventType, {
                    element: id,
                    group: group,
                    key: key,
                    DOMEvent: e
                });
            }
        };

        /**
         * 添加一个可用的状态
         * @param {string} state 要添加的状态.
         * @param {string} eventNam optional DOM事件名称.
         * @param {string} eventHandler optional DOM事件处理函数.
         */
        Statable.addState = function(state, eventName, eventHandler) {
            var me = this;
            me._allStates.push(state);
            if (eventName) {
                me._allEventsName.push(eventName);
                if (!eventHandler) {
                    eventHandler = function() {
                        return true;
                    };
                }
                me._eventsHandler[eventName] = eventHandler;
            }
        };

        /**
         * 获得指定索引的元素的状态
         * @param {string} elementId 元素id，默认是main元素id.
         * @param {string} group optional    状态分组，同一组的相同状态会被加上相同的css.
         */
        Statable.getState = function(elementId, group) {
            var me = this,
                _states;
            group = group ? group + '-' : '';
            elementId = elementId ? elementId : me.getId();
            _states = me._states[group + elementId];
            return _states ? _states : {};
        };

        /**
         * 设置指定索的元素的状态
         * @param {string} state 枚举量 in ui._allStates.
         * @param {string} elementId optional 元素id，默认是main元素id.
         * @param {string} group optional    状态分组，同一组的相同状态会被加上相同的css.
         */
        Statable.setState = function(state, elementId, group) {
            var me = this,
                stateId,
                currentState;

            group = group ? group + '-' : '';
            elementId = elementId ? elementId : me.getId();
            stateId = group + elementId;

            me._states[stateId] = me._states[stateId] || {};
            currentState = me._states[stateId][state];
            if (!currentState) {
                me._states[stateId][state] = 1;
                baidu.addClass(elementId, me.getClass(group + state));
            }
        };

        /**
         * 移除指定索引的元素的状态
         * @param {string} state 枚举量 in ui._allStates.
         * @param {string} element optional 元素id，默认是main元素id.
         * @param {string} group optional    状态分组，同一组的相同状态会被加上相同的css.
         */
        Statable.removeState = function(state, elementId, group) {
            var me = this,
                stateId;

            group = group ? group + '-' : '';
            elementId = elementId ? elementId : me.getId();
            stateId = group + elementId;

            if (me._states[stateId]) {
                me._states[stateId][state] = 0;
                baidu.removeClass(elementId, me.getClass(group + state));
            }
        };
    })();


    /**
     * button基类，创建一个button实例
     * @name baidu.ui.Button
     * @class
     * @grammar new baidu.ui.Button(options)
     * @param {Object} [options] 选项
     * @config {String}             content     按钮文本信息
     * @config {Boolean}            disabled    按钮是否有效，默认为false（有效）。
     * @config {Function}           onmouseover 鼠标悬停在按钮上时触发
     * @config {Function}           onmousedown 鼠标按下按钮时触发
     * @config {Function}           onmouseup   按钮弹起时触发
     * @config {Function}           onmouseout  鼠标移出按钮时触发
     * @config {Function}           onclick        鼠标点击按钮时触发
     * @config {Function}           onupdate    更新按钮时触发
     * @config {Function}           onload        页面加载时触发
     * @config {Function}           ondisable   当调用button的实例方法disable，使得按钮失效时触发。
     * @config {Function}           onenable    当调用button的实例方法enable，使得按钮有效时触发。
     * @returns {Button}                        Button类
     * @plugin statable             状态行为，为button组件添加事件和样式。
     * @remark  创建按钮控件时，会自动为控件加上四种状态的style class，分别为正常情况(tangram-button)、鼠标悬停在按钮上(tangram-button-hover)、鼠标按下按钮时(tangram-button-press)、按钮失效时(tangram-button-disable)，用户可自定义样式。
     */
    baidu.ui.Button = baidu.ui.createUI(new Function).extend(
        /**
         *  @lends baidu.ui.Button.prototype
         */
        {

            //ui控件的类型，传入给UIBase **必须**
            uiType: 'button',
            //ui控件的class样式前缀 可选
            //classPrefix     : "tangram-button-",
            tplBody: '<div id="#{id}" #{statable} class="#{class}">#{content}</div>',
            disabled: false,
            statable: true,

            /**
             *  获得button的HTML字符串
             *  @private
             *  @return {String} 拼接的字符串
             */
            _getString: function() {
                var me = this;
                return baidu.format(me.tplBody, {
                    id: me.getId(),
                    statable: me._getStateHandlerString(),
                    'class': me.getClass(),
                    content: me.content
                });
            },

            /**
             *  将button绘制到DOM树中。
             *  @param {HTMLElement|String} target  需要渲染到的元素
             */
            render: function(target) {
                var me = this,
                    body;
                me.addState('click', 'click');
                baidu.dom.insertHTML(me.renderMain(target), 'beforeEnd', me._getString());

                body = baidu.g(target).lastChild;
                if (me.title) {
                    body.title = me.title;
                }

                me.disabled && me.setState('disabled');
                me.dispatchEvent('onload');
            },

            /**
             *  判断按钮是否处于失效状态。
             *  @return {Boolean} 是否失效的状态
             */
            isDisabled: function() {
                var me = this,
                    id = me.getId();
                return me.getState()['disabled'];
            },

            /**
             *  销毁实例。
             */
            dispose: function() {
                var me = this,
                    body = me.getBody();
                me.dispatchEvent('dispose');
                //删除当前实例上的方法
                baidu.each(me._allEventsName, function(item, index) {
                    body['on' + item] = null;
                });
                baidu.dom.remove(body);

                me.dispatchEvent('ondispose');
                baidu.lang.Class.prototype.dispose.call(me);
            },

            /**
             * 设置disabled属性
             */
            disable: function() {
                var me = this,
                    body = me.getBody();
                me.dispatchEvent('ondisable', {
                    element: body
                });
            },

            /**
             * 删除disabled属性
             */
            enable: function() {
                var me = this;
                body = me.getBody();
                me.dispatchEvent('onenable', {
                    element: body
                });
            },

            /**
             * 触发button事件
             * @param {String} eventName   要触发的事件名称
             * @param {Object} e           事件event
             */
            fire: function(eventType, e) {
                var me = this,
                    eventType = eventType.toLowerCase();
                if (me.getState()['disabled']) {
                    return;
                }
                me._fireEvent(eventType, null, null, e);
            },

            /**
             * 更新button的属性
             * @param {Object}              options     更新button的属性
             * @config {String}             content     按钮文本信息
             * @config {Boolean}            disabled    按钮是否有效，默认为false（有效）。
             * @config {Function}           onmouseover 鼠标悬停在按钮上时触发
             * @config {Function}           onmousedown 鼠标按下按钮时触发
             * @config {Function}           onmouseup   按钮弹起时触发
             * @config {Function}           onmouseout  鼠标移出按钮时触发
             * @config {Function}           onclick        鼠标点击按钮时触发
             * @config {Function}           onupdate    更新按钮时触发
             * @config {Function}           onload        页面加载时触发
             * @config {Function}           ondisable   当调用button的实例方法disable，使得按钮失效时触发。
             * @config {Function}           onenable    当调用button的实例方法enable，使得按钮有效时触发。
             *
             */
            update: function(options) {
                var me = this;
                baidu.extend(me, options);
                options.content && (me.getBody().innerHTML = options.content);

                me.dispatchEvent('onupdate');
            }
        });

    /**
     * 使按钮支持capture，实现在按钮上点击并保持鼠标按着状态拖离鼠标，请在构造函数的options中定义capture参数为true来激活该状态
     * @class
     * @param {Object} options options参数.
     * @config {Boolean} capture 当为true时表示需要使按钮是一个capture的按钮.
     * @author linlingyu
     */
    baidu.ui.Button.register(function(me) {
        if (!me.capture) {
            return;
        }
        me.addEventListener('load', function() {
            var body = me.getBody(),
                //onMouseOut = body.onmouseout,
                mouseUpHandler = baidu.fn.bind(function(evt) {

                    var target = baidu.event.getTarget(evt);
                    if (target != body && !baidu.dom.contains(body, target) && me.getState()['press']) {
                        me.fire('mouseout', evt);
                    }
                }),
                mouseOutHandler = function(evt) {
                    if (!me.getState()['press']) {
                        me.fire('mouseout', evt);
                    }
                };
            body.onmouseout = null;
            me.on(body, 'mouseout', mouseOutHandler);
            me.on(document, 'mouseup', mouseUpHandler);
        });
    });

    /**
     * 判断目标参数是否Boolean对象
     * @name baidu.lang.isBoolean
     * @function
     * @grammar baidu.lang.isBoolean(source)
     * @param {Any} source 目标参数
     * @version 1.3
     * @see baidu.lang.isString,baidu.lang.isObject,baidu.lang.isNumber,baidu.lang.isElement,baidu.lang.isArray,baidu.lang.isDate
     *
     * @returns {boolean} 类型判断结果
     */
    baidu.lang.isBoolean = function(o) {
        return typeof o === 'boolean';
    };

    /**
     * 使按钮支持poll轮询，实现在按钮上点击并保持鼠标按着状态时连续激活事件侦听器
     * @addon baidu.ui.Button
     * @param   {Object}    options config参数.
     * @config  {Object}    poll 当为true时表示需要使按钮是一个poll的按钮，如果是一个json的描述，可以有两个可选参数：{interval: 100, time: 4}，interval表示轮询的时间间隔，time表示第一次执行和第二执行之间的时间间隔是time*interval毫秒
     * @author linlingyu
     */
    baidu.ui.Button.register(function(me) {
        if (!me.poll) {
            return;
        }
        baidu.lang.isBoolean(me.poll) && (me.poll = {});
        me.addEventListener('mousedown', function(evt) {
            var pollIdent = 0,
                interval = me.poll.interval || 100,
                timer = me.poll.time || 0;
            (function() {
                if (me.getState()['press']) {
                    pollIdent++ > timer && me.onmousedown && me.onmousedown();
                    me.poll.timeOut = setTimeout(arguments.callee, interval);
                }
            })();
        });
        me.addEventListener('dispose', function() {
            if (me.poll.timeOut) {
                me.disable();
                window.clearTimeout(me.poll.timeOut);
            }
        });
    });

    /**
     * 获得页面里的目前鼠标所在的坐标
     * @name baidu.page.getMousePosition
     * @function
     * @grammar baidu.page.getMousePosition()
     * @version 1.2
     *
     * @returns {object} 鼠标坐标值{x:[Number], y:[Number]}
     */
    /**
     * 对页面层面的封装，包括页面的高宽属性、以及外部css和js的动态添加
     * @namespace baidu.page
     */
    baidu.page = baidu.page || {};


    /**
     * 获取纵向滚动量
     * @name baidu.page.getScrollTop
     * @function
     * @grammar baidu.page.getScrollTop()
     * @see baidu.page.getScrollLeft
     * @meta standard
     * @returns {number} 纵向滚动量
     */
    baidu.page.getScrollTop = function() {
        var d = document;
        return window.pageYOffset || d.documentElement.scrollTop || d.body.scrollTop;
    };

    /**
     * 获取横向滚动量
     * @name baidu.page.getScrollLeft
     * @function
     * @grammar baidu.page.getScrollLeft()
     * @see baidu.page.getScrollTop
     *
     * @returns {number} 横向滚动量
     */
    /**
     * 获取横向滚动量
     *
     * @return {number} 横向滚动量
     */
    baidu.page.getScrollLeft = function() {
        var d = document;
        return window.pageXOffset || d.documentElement.scrollLeft || d.body.scrollLeft;
    };

    /**
     * 取得当前页面里的目前鼠标所在的坐标（x y）
     *
     * @return  {JSON}  当前鼠标的坐标值({x, y})
     */
    (function() {

        baidu.page.getMousePosition = function() {
            return {
                x: baidu.page.getScrollLeft() + xy.x,
                y: baidu.page.getScrollTop() + xy.y
            };
        };

        var xy = {
            x: 0,
            y: 0
        };
        // 监听当前网页的 mousemove 事件以获得鼠标的实时坐标
        baidu.event.on(document, "onmousemove", function(e) {
            e = window.event || e;
            xy.x = e.clientX;
            xy.y = e.clientY;
        });

    })();

    /**
     * 获取目标元素所属的document对象
     * @name baidu.dom.getDocument
     * @function
     * @grammar baidu.dom.getDocument(element)
     * @param {HTMLElement|string} element 目标元素或目标元素的id
     * @meta standard
     * @see baidu.dom.getWindow
     *
     * @returns {HTMLDocument} 目标元素所属的document对象
     */
    baidu.dom.getDocument = function(element) {
        element = baidu.dom.g(element);
        return element.nodeType == 9 ? element : element.ownerDocument || element.document;
    };


    /**
     * 获取目标元素的computed style值。如果元素的样式值不能被浏览器计算，则会返回空字符串（IE）
     *
     * @author berg
     * @name baidu.dom.getComputedStyle
     * @function
     * @grammar baidu.dom.getComputedStyle(element, key)
     * @param {HTMLElement|string} element 目标元素或目标元素的id
     * @param {string} key 要获取的样式名
     *
     * @see baidu.dom.getStyle
     *
     * @returns {string} 目标元素的computed style值
     */
    baidu.dom.getComputedStyle = function(element, key) {
        element = baidu.dom._g(element);
        var doc = baidu.dom.getDocument(element),
            styles;
        if (doc.defaultView && doc.defaultView.getComputedStyle) {
            styles = doc.defaultView.getComputedStyle(element, null);
            if (styles) {
                return styles[key] || styles.getPropertyValue(key);
            }
        }
        return '';
    };

    /**
     * 提供给setStyle与getStyle使用
     */
    baidu.dom._styleFixer = baidu.dom._styleFixer || {};

    /**
     * 提供给setStyle与getStyle使用
     */
    baidu.dom._styleFilter = baidu.dom._styleFilter || [];



    /**
     * 为获取和设置样式的过滤器
     * @private
     * @meta standard
     */
    baidu.dom._styleFilter.filter = function(key, value, method) {
        for (var i = 0, filters = baidu.dom._styleFilter, filter; filter = filters[i]; i++) {
            if (filter = filter[method]) {
                value = filter(key, value);
            }
        }

        return value;
    };

    /**
     * 将目标字符串进行驼峰化处理
     * @name baidu.string.toCamelCase
     * @function
     * @grammar baidu.string.toCamelCase(source)
     * @param {string} source 目标字符串
     * @remark
     * 支持单词以“-_”分隔
     * @meta standard
     *
     * @returns {string} 驼峰化处理后的字符串
     */

    //todo:考虑以后去掉下划线支持？
    baidu.string.toCamelCase = function(source) {
        //提前判断，提高getStyle等的效率 thanks xianwei
        if (source.indexOf('-') < 0 && source.indexOf('_') < 0) {
            return source;
        }
        return source.replace(/[-_][^-_]/g, function(match) {
            return match.charAt(1).toUpperCase();
        });
    };


    /**
     * 获取目标元素的样式值
     * @name baidu.dom.getStyle
     * @function
     * @grammar baidu.dom.getStyle(element, key)
     * @param {HTMLElement|string} element 目标元素或目标元素的id
     * @param {string} key 要获取的样式名
     * @remark
     *
     * 为了精简代码，本模块默认不对任何浏览器返回值进行归一化处理（如使用getStyle时，不同浏览器下可能返回rgb颜色或hex颜色），也不会修复浏览器的bug和差异性（如设置IE的float属性叫styleFloat，firefox则是cssFloat）。<br />
     * baidu.dom._styleFixer和baidu.dom._styleFilter可以为本模块提供支持。<br />
     * 其中_styleFilter能对颜色和px进行归一化处理，_styleFixer能对display，float，opacity，textOverflow的浏览器兼容性bug进行处理。
     * @shortcut getStyle
     * @meta standard
     * @see baidu.dom.setStyle,baidu.dom.setStyles, baidu.dom.getComputedStyle
     *
     * @returns {string} 目标元素的样式值
     */
    baidu.dom.getStyle = function(element, key) {
        var dom = baidu.dom;

        element = dom.g(element);
        key = baidu.string.toCamelCase(key);
        //computed style, then cascaded style, then explicitly set style.
        var value = element.style[key] ||
            (element.currentStyle ? element.currentStyle[key] : "") ||
            dom.getComputedStyle(element, key);

        // 在取不到值的时候，用fixer进行修正
        if (!value) {
            var fixer = dom._styleFixer[key];
            if (fixer) {
                value = fixer.get ? fixer.get(element) : baidu.dom.getStyle(element, fixer);
            }
        }

        /* 检查结果过滤器 */
        if (fixer = dom._styleFilter) {
            value = fixer.filter(key, value, 'get');
        }

        return value;
    };

    // 声明快捷方法
    baidu.getStyle = baidu.dom.getStyle;

    /**
     * 获取目标元素相对于整个文档左上角的位置
     * @name baidu.dom.getPosition
     * @function
     * @grammar baidu.dom.getPosition(element)
     * @param {HTMLElement|string} element 目标元素或目标元素的id
     * @meta standard
     *
     * @returns {Object} 目标元素的位置，键值为top和left的Object。
     */
    baidu.dom.getPosition = function(element) {
        element = baidu.dom.g(element);
        var doc = baidu.dom.getDocument(element),
            browser = baidu.browser,
            getStyle = baidu.dom.getStyle,
            // Gecko 1.9版本以下用getBoxObjectFor计算位置
            // 但是某些情况下是有bug的
            // 对于这些有bug的情况
            // 使用递归查找的方式
            BUGGY_GECKO_BOX_OBJECT = browser.isGecko > 0 &&
            doc.getBoxObjectFor &&
            getStyle(element, 'position') == 'absolute' &&
            (element.style.top === '' || element.style.left === ''),
            pos = {
                "left": 0,
                "top": 0
            },
            viewport = (browser.ie && !browser.isStrict) ? doc.body : doc.documentElement,
            parent,
            box;

        if (element == viewport) {
            return pos;
        }


        if (element.getBoundingClientRect) { // IE and Gecko 1.9+

            //当HTML或者BODY有border width时, 原生的getBoundingClientRect返回值是不符合预期的
            //考虑到通常情况下 HTML和BODY的border只会设成0px,所以忽略该问题.
            box = element.getBoundingClientRect();

            pos.left = Math.floor(box.left) + Math.max(doc.documentElement.scrollLeft, doc.body.scrollLeft);
            pos.top = Math.floor(box.top) + Math.max(doc.documentElement.scrollTop, doc.body.scrollTop);

            // IE会给HTML元素添加一个border，默认是medium（2px）
            // 但是在IE 6 7 的怪异模式下，可以被html { border: 0; } 这条css规则覆盖
            // 在IE7的标准模式下，border永远是2px，这个值通过clientLeft 和 clientTop取得
            // 但是。。。在IE 6 7的怪异模式，如果用户使用css覆盖了默认的medium
            // clientTop和clientLeft不会更新
            pos.left -= doc.documentElement.clientLeft;
            pos.top -= doc.documentElement.clientTop;

            var htmlDom = doc.body,
                // 在这里，不使用element.style.borderLeftWidth，只有computedStyle是可信的
                htmlBorderLeftWidth = parseInt(getStyle(htmlDom, 'borderLeftWidth')),
                htmlBorderTopWidth = parseInt(getStyle(htmlDom, 'borderTopWidth'));
            if (browser.ie && !browser.isStrict) {
                pos.left -= isNaN(htmlBorderLeftWidth) ? 2 : htmlBorderLeftWidth;
                pos.top -= isNaN(htmlBorderTopWidth) ? 2 : htmlBorderTopWidth;
            }
            /*
     * 因为firefox 3.6和4.0在特定页面下(场景待补充)都会出现1px偏移,所以暂时移除该逻辑分支
     * 如果 2.0版本时firefox仍存在问题,该逻辑分支将彻底移除. by rocy 2011-01-20
    } else if (doc.getBoxObjectFor && !BUGGY_GECKO_BOX_OBJECT){ // gecko 1.9-

        // 1.9以下的Gecko，会忽略ancestors的scroll值
        // https://bugzilla.mozilla.org/show_bug.cgi?id=328881 and
        // https://bugzilla.mozilla.org/show_bug.cgi?id=330619

        box = doc.getBoxObjectFor(element);
        var vpBox = doc.getBoxObjectFor(viewport);
        pos.left = box.screenX - vpBox.screenX;
        pos.top  = box.screenY - vpBox.screenY;
        */
        } else { // safari/opera/firefox
            parent = element;

            do {
                pos.left += parent.offsetLeft;
                pos.top += parent.offsetTop;

                // safari里面，如果遍历到了一个fixed的元素，后面的offset都不准了
                if (browser.isWebkit > 0 && getStyle(parent, 'position') == 'fixed') {
                    pos.left += doc.body.scrollLeft;
                    pos.top += doc.body.scrollTop;
                    break;
                }

                parent = parent.offsetParent;
            } while (parent && parent != element);

            // 对body offsetTop的修正
            if (browser.opera > 0 || (browser.isWebkit > 0 && getStyle(element, 'position') == 'absolute')) {
                pos.top -= doc.body.offsetTop;
            }

            // 计算除了body的scroll
            parent = element.offsetParent;
            while (parent && parent != doc.body) {
                pos.left -= parent.scrollLeft;
                // see https://bugs.opera.com/show_bug.cgi?id=249965
                //            if (!b.opera || parent.tagName != 'TR') {
                if (!browser.opera || parent.tagName != 'TR') {
                    pos.top -= parent.scrollTop;
                }
                parent = parent.offsetParent;
            }
        }

        return pos;
    };

    /**
     * 阻止事件的默认行为
     * @name baidu.event.preventDefault
     * @function
     * @grammar baidu.event.preventDefault(event)
     * @param {Event} event 事件对象
     * @meta standard
     * @see baidu.event.stop,baidu.event.stopPropagation
     */
    baidu.event.preventDefault = function(event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    };

    /**
     * 拖动指定的DOM元素
     * @name baidu.dom.drag
     * @function
     * @grammar baidu.dom.drag(element, options)
     * @param {HTMLElement|string} element 元素或者元素的id
     * @param {Object} options 拖曳配置项
                    
     * @param {Array} options.range 限制drag的拖拽范围，数组中必须包含四个值，分别是上、右、下、左边缘相对上方或左方的像素距离。默认无限制
     * @param {Number} options.interval 拖曳行为的触发频度（时间：毫秒）
     * @param {Boolean} options.capture 鼠标拖曳粘滞
     * @param {Object} options.mouseEvent 键名为clientX和clientY的object，若不设置此项，默认会获取当前鼠标位置
     * @param {Function} options.ondragstart drag开始时触发
     * @param {Function} options.ondrag drag进行中触发
     * @param {Function} options.ondragend drag结束时触发
     * @param {function} options.autoStop 是否在onmouseup时自动停止拖拽。默认为true
     * @version 1.2
     * @remark
     * 
                要拖拽的元素必须事先设定样式的postion值，如果postion为absloute，并且没有设定top和left，拖拽开始时，无法取得元素的top和left值，这时会从[0,0]点开始拖拽
            
     * @see baidu.dom.draggable
     */
    /**
     * 拖曳DOM元素
     * @param   {HTMLElement|ID}    element 被拖曳的元素
     * @param   {JSON}              options 拖曳配置项
     *          {autoStop, interval, capture, range, ondragstart, ondragend, ondrag, mouseEvent}
     */
    (function() {
        var target, // 被拖曳的DOM元素
            op, ox, oy, //timer, 
            top, left, mozUserSelect,
            lastLeft, lastTop,
            isFunction = baidu.lang.isFunction,
            timer,
            offset_parent, offset_target;

        baidu.dom.drag = function(element, options) {
            //每次开始拖拽的时候重置lastTop和lastLeft
            lastTop = lastLeft = null;

            if (!(target = baidu.dom.g(element))) return false;
            op = baidu.object.extend({
                autoStop: true // false 用户手动结束拖曳 ｜ true 在mouseup时自动停止拖曳
                    ,
                capture: true // 鼠标拖曳粘滞
                    // ,
                    // interval: 16 // 拖曳行为的触发频度（时间：毫秒）
                    ,
                interval: 20 // 拖曳行为的触发频度（时间：毫秒）            
                    ,
                handler: target
            }, options);

            offset_parent = baidu.dom.getPosition(target.offsetParent);
            offset_target = baidu.dom.getPosition(target);

            if (baidu.getStyle(target, 'position') == "absolute") {
                top = offset_target.top - (target.offsetParent == document.body ? 0 : offset_parent.top);
                left = offset_target.left - (target.offsetParent == document.body ? 0 : offset_parent.left);
            } else {
                top = parseFloat(baidu.getStyle(target, "top")) || -parseFloat(baidu.getStyle(target, "bottom")) || 0;
                left = parseFloat(baidu.getStyle(target, "left")) || -parseFloat(baidu.getStyle(target, "right")) || 0;
            }

            if (op.mouseEvent) {
                // [2010/11/16] 可以不依赖getMousePosition，直接通过一个可选参数获得鼠标位置
                ox = baidu.page.getScrollLeft() + op.mouseEvent.clientX;
                oy = baidu.page.getScrollTop() + op.mouseEvent.clientY;
            } else {
                var xy = baidu.page.getMousePosition(); // 得到当前鼠标坐标值
                ox = xy.x;
                oy = xy.y;
            }

            //timer = setInterval(render, op.interval);

            // 这项为 true，缺省在 onmouseup 事件终止拖曳
            op.autoStop && baidu.event.on(op.handler, "mouseup", stop);
            op.autoStop && baidu.event.on(window, "mouseup", stop);

            // 在拖曳过程中页面里的文字会被选中高亮显示，在这里修正
            baidu.event.on(document, "selectstart", unselect);

            // 设置鼠标粘滞
            if (op.capture && op.handler.setCapture) {
                op.handler.setCapture();
            } else if (op.capture && window.captureEvents) {
                window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
            }
            //baidu.on(target,"mousemove",render);

            // fixed for firefox
            mozUserSelect = document.body.style.MozUserSelect;
            document.body.style.MozUserSelect = "none";

            // ondragstart 事件
            if (isFunction(op.ondragstart)) {
                op.ondragstart(target, op);
            }
            // console.log(' op.interval:', op.interval);
            // 
            timer = setInterval(render, op.interval);
            return {
                stop: stop,
                update: update
            };
        };

        /**
         * 更新当前拖拽对象的属性
         */
        function update(options) {
            baidu.extend(op, options);
        }

        /**
         * 手动停止拖拽
         */
        function stop() {
            clearInterval(timer);

            // 解除鼠标粘滞
            if (op.capture && op.handler.releaseCapture) {
                op.handler.releaseCapture();
            } else if (op.capture && window.releaseEvents) {
                window.releaseEvents(Event.MOUSEMOVE | Event.MOUSEUP);
            }

            // 拖曳时网页内容被框选
            document.body.style.MozUserSelect = mozUserSelect;
            baidu.event.un(document, "selectstart", unselect);
            op.autoStop && baidu.event.un(op.handler, "mouseup", stop);
            op.autoStop && baidu.event.un(window, "mouseup", stop);

            // ondragend 事件
            if (isFunction(op.ondragend)) {
                op.ondragend(target, op);
            }
        }

        // 对DOM元素进行top/left赋新值以实现拖曳的效果
        function render(e) {
            var rg = op.range,
                xy = baidu.page.getMousePosition(),
                el = left + xy.x - ox,
                et = top + xy.y - oy;

            // 如果用户限定了可拖动的范围
            if (typeof rg == "object" && rg && rg.length == 4) {
                el = Math.max(rg[3], el);
                el = Math.min(rg[1] - target.offsetWidth, el);
                et = Math.max(rg[0], et);
                et = Math.min(rg[2] - target.offsetHeight, et);
            }
            target.style.top = et + "px";
            target.style.left = el + "px";

            if ((lastLeft !== el || lastTop !== et) && (lastLeft !== null || lastTop !== null)) {
                if (isFunction(op.ondrag)) {
                    op.ondrag(target, op);
                }
            }
            lastLeft = el;
            lastTop = et;
        }

        // 对document.body.onselectstart事件进行监听，避免拖曳时文字被选中
        function unselect(e) {
            return baidu.event.preventDefault(e, false);
        }
    })();

    /**
     * 设置目标元素的style样式值
     * @name baidu.dom.setStyle
     * @function
     * @grammar baidu.dom.setStyle(element, key, value)
     * @param {HTMLElement|string} element 目标元素或目标元素的id
     * @param {string} key 要设置的样式名
     * @param {string} value 要设置的样式值
     * @remark
     * 
                为了精简代码，本模块默认不对任何浏览器返回值进行归一化处理（如使用getStyle时，不同浏览器下可能返回rgb颜色或hex颜色），也不会修复浏览器的bug和差异性（如设置IE的float属性叫styleFloat，firefox则是cssFloat）。<br />
    baidu.dom._styleFixer和baidu.dom._styleFilter可以为本模块提供支持。<br />
    其中_styleFilter能对颜色和px进行归一化处理，_styleFixer能对display，float，opacity，textOverflow的浏览器兼容性bug进行处理。
            
     * @shortcut setStyle
     * @meta standard
     * @see baidu.dom.getStyle,baidu.dom.setStyles
     *             
     * @returns {HTMLElement} 目标元素
     */
    baidu.dom.setStyle = function(element, key, value) {
        var dom = baidu.dom,
            fixer;

        // 放弃了对firefox 0.9的opacity的支持
        element = dom.g(element);
        key = baidu.string.toCamelCase(key);

        if (fixer = dom._styleFilter) {
            value = fixer.filter(key, value, 'set');
        }

        fixer = dom._styleFixer[key];
        (fixer && fixer.set) ? fixer.set(element, value): (element.style[fixer || key] = value);

        return element;
    };

    // 声明快捷方法
    baidu.setStyle = baidu.dom.setStyle;

    /**
     * 让一个DOM元素可拖拽
     * @name baidu.dom.draggable
     * @function
     * @grammar baidu.dom.draggable(element[, options])
     * @param  {string|HTMLElement}   element                 元素或者元素的ID.
     * @param  {Object}               [options]             选项.
     * @config {Array}                   [range]                 限制drag的拖拽范围，数组中必须包含四个值，分别是上、右、下、左边缘相对上方或左方的像素距离。默认无限制.
     * @config {Number}               [interval]             拖曳行为的触发频度（时间：毫秒）.
     * @config {Boolean}               [capture]             鼠标拖曳粘滞.
     * @config {Object}               [mouseEvent]             键名为clientX和clientY的object，若不设置此项，默认会获取当前鼠标位置.
     * @config {Function}               [onbeforedragstart]   drag开始前触发（即鼠标按下时）.
     * @config {Function}               [ondragstart]         drag开始时触发.
     * @config {Function}               [ondrag]                 drag进行中触发.
     * @config {Function}               [ondragend]             drag结束时触发.
     * @config {HTMLElement}          [handler]             用于拖拽的手柄，比如dialog的title.
     * @config {Function}               [toggle]                 在每次ondrag的时候，会调用这个方法判断是否应该停止拖拽。如果此函数返回值为false，则停止拖拽.
     * @version 1.2
     * @remark    要拖拽的元素必须事先设定样式的postion值，如果postion为absloute，并且没有设定top和left，拖拽开始时，无法取得元素的top和left值，这时会从[0,0]点开始拖拽<br>如果要拖拽的元素是static定位，会被改成relative定位方式。
     * @see baidu.dom.drag
     * @returns {Draggable Instance} 拖拽实例，包含cancel方法，可以停止拖拽.
     */

    baidu.dom.draggable = function(element, options) {
        options = baidu.object.extend({
            toggle: function() {
                return true
            }
        }, options || {});
        options.autoStop = true;
        element = baidu.dom.g(element);
        options.handler = options.handler || element;
        var manager,
            events = ['ondragstart', 'ondrag', 'ondragend'],
            i = events.length - 1,
            eventName,
            dragSingle,
            draggableSingle = {
                dispose: function() {
                    dragSingle && dragSingle.stop();
                    baidu.event.un(options.handler, 'onmousedown', handlerMouseDown);
                    baidu.lang.Class.prototype.dispose.call(draggableSingle);
                }
            },
            me = this;

        //如果存在ddManager, 将事件转发到ddManager中
        if (manager = baidu.dom.ddManager) {
            for (; i >= 0; i--) {
                eventName = events[i];
                options[eventName] = (function(eventName) {
                    var fn = options[eventName];
                    return function() {
                        baidu.lang.isFunction(fn) && fn.apply(me, arguments);
                        manager.dispatchEvent(eventName, {
                            DOM: element
                        });
                    }
                })(eventName);
            }
        }


        // 拖曳只针对有 position 定位的元素
        if (element) {
            function handlerMouseDown(e) {
                var event = options.mouseEvent = window.event || e;
                if (event.button > 1 //只支持鼠标左键拖拽; 左键代码: IE为1,W3C为0
                    // 可以通过配置项里的这个开关函数暂停或启用拖曳功能
                    ||
                    (baidu.lang.isFunction(options.toggle) && !options.toggle())) {
                    return;
                }
                if (baidu.dom.getStyle(element, 'position') == 'static') {
                    baidu.dom.setStyle(element, 'position', 'relative');
                }
                if (baidu.lang.isFunction(options.onbeforedragstart)) {
                    options.onbeforedragstart(element);
                }
                dragSingle = baidu.dom.drag(element, options);
                draggableSingle.stop = dragSingle.stop;
                draggableSingle.update = dragSingle.update;
                //防止ff下出现禁止拖拽的图标
                baidu.event.preventDefault(event);
            }

            // 对拖曳的扳机元素监听 onmousedown 事件，以便进行拖曳行为
            baidu.event.on(options.handler, 'onmousedown', handlerMouseDown);
        }
        return {
            cancel: function() {
                draggableSingle.dispose();
            }
        };
    };



    /**
     * 拖动条控件，可用作音乐播放进度。
     * @class
     * @grammar new baidu.ui.Slider(options)
     * @param      {String|HTMLElement}     target       存放滑块控件的元素，按钮会渲染到该元素内。
     * @param      {Object}                 [options]    选项layout
     * @config     {Number}                 value        记录滑块的当前进度值
     * @config     {Number}                 layout       滑块的布局[水平：horizontal,垂直：vertical]
     * @config     {Number}                 min          进度条最左边代表的值，默认值取0
     * @config     {Number}                 max          进度条最右边代表的值，默认值取100
     * @config     {Array}                  range        可拖动的范围，取值min到max之间，例如[30, 80]
     * @config     {Boolean}                disabled     是否禁用
     * @config     {String}                 skin         自定义样式名称前缀
     * @plugin     progressBar              进度条跟随滑块的滑动
     */
    baidu.ui.Slider = baidu.ui.createUI(function(options) {
        var me = this;
        me.range = me.range || [me.min, me.max]; //初始化range
    }).extend(
        /**
         *  @lends baidu.ui.Slider.prototype
         */
        {
            layout: 'horizontal', //滑块的布局方式 horizontal :水平  vertical:垂直
            uiType: 'slider',
            tplBody: '<div id="#{id}" class="#{class}" onmousedown="#{mousedown}" style="position:relative;">#{thumb}</div>',
            tplThumb: '<div id="#{thumbId}" class="#{thumbClass}" style="position:absolute;"></div>',
            value: 0, //初始化时，进度条所在的值
            min: 0, //进度条最左边代表的值
            max: 100, //进度条最右边代表的值
            disabled: false,
            //    range: [0, 100],
            _dragOpt: {},
            _axis: { //位置换算
                horizontal: {
                    mousePos: 'x',
                    pos: 'left',
                    size: 'width',
                    clientSize: 'clientWidth',
                    offsetSize: 'offsetWidth'
                },
                vertical: {
                    mousePos: 'y',
                    pos: 'top',
                    size: 'height',
                    clientSize: 'clientHeight',
                    offsetSize: 'offsetHeight'
                }
            },

            /**
             * 获得slider控件字符串
             * @private
             * @return {String}  string     控件的html字符串
             */
            getString: function() {
                var me = this;
                return baidu.format(me.tplBody, {
                    id: me.getId(),
                    "class": me.getClass(),
                    mousedown: me.getCallRef() + "._mouseDown(event)",
                    thumb: baidu.format(me.tplThumb, {
                        thumbId: me.getId("thumb"),
                        thumbClass: me.getClass("thumb")
                    })
                });
            },

            /**
             * 处理鼠标在滚动条上的按下事件
             * @private
             */
            _mouseDown: function(e) {
                var me = this,
                    axis = me._axis[me.layout],
                    mousePos = baidu.page.getMousePosition(),
                    mainPos = baidu.dom.getPosition(me.getBody()),
                    thumb = me.getThumb(),
                    target = baidu.event.getTarget(e);
                //如果点在了滑块上面，就不移动
                if (target == thumb || baidu.dom.contains(thumb, target) || me.disabled) {
                    return;
                }
                me._calcValue(mousePos[axis.mousePos] - mainPos[axis.pos] - thumb[axis.offsetSize] / 2);
                me.update()
                me.dispatchEvent("slideclick");
            },

            /**
             * 渲染slider
             * @public
             * @param     {String|HTMLElement}   target     将渲染到的元素或元素id
             */
            render: function(target) {
                var me = this;
                if (!target) {
                    return;
                }
                baidu.dom.insertHTML(me.renderMain(target), "beforeEnd", me.getString());
                //        me.getMain().style.position = "relative";
                me._createThumb();
                me.update();
                me.dispatchEvent("onload");
            },

            /**
             * 创建滑块
             * @private
             */
            _createThumb: function() {
                var me = this,
                    drag;
                me._dragOpt = {
                    "ondragend": function() {
                        me.dispatchEvent("slidestop");
                    },
                    "ondragstart": function() {
                        me.dispatchEvent("slidestart");
                    },
                    "ondrag": function() {
                        var axis = me._axis[me.layout],
                            len = me.getThumb().style[axis.pos];
                        me._calcValue(parseInt(len));
                        me.dispatchEvent("slide");
                    },
                    range: [0, 0, 0, 0]
                };
                me._updateDragRange();
                drag = baidu.dom.draggable(me.getThumb(), me._dragOpt);
                me.addEventListener('dispose', function() {
                    drag.cancel();
                });
            },

            /**
             * 更新拖拽范围，使用户可以动态修改滑块的拖拽范围
             * @private
             */
            _updateDragRange: function(val) {
                var me = this,
                    axis = me._axis[me.layout],
                    range = val || me.range,
                    dragRange = me._dragOpt.range,
                    thumb = me.getThumb();
                range = [Math.max(Math.min(range[0], me.max), me.min),
                    Math.max(Math.min(range[1], me.max), me.min)
                ];
                if (me.layout.toLowerCase() == 'horizontal') {
                    dragRange[1] = me._parseValue(range[1], 'fix') + thumb[axis.offsetSize];
                    dragRange[3] = me._parseValue(range[0], 'fix');
                    dragRange[2] = thumb.clientHeight;
                } else {
                    dragRange[0] = me._parseValue(range[0], 'fix');
                    dragRange[2] = me._parseValue(range[1], 'fix') + thumb[axis.offsetSize];
                    dragRange[1] = thumb.clientWidth;
                }
            },

            /**
             * 更新slider状态
             * @public
             * @param   {Object}                 [options]    选项layout
             * @config  {Number}                 value        记录滑块的当前进度值
             * @config  {Number}                 layout       滑块的布局[水平：horizontal,垂直：vertical]
             * @config  {Number}                 min          进度条最左边代表的值
             * @config  {Number}                 max          进度条最右边代表的值
             * @config  {Boolean}                disabled     是否禁用
             * @config  {String}                 skin         自定义样式名称前缀
             */
            update: function(options) {
                var me = this,
                    axis = me._axis[me.layout],
                    body = me.getBody();
                options = options || {};
                baidu.object.extend(me, options);
                me._updateDragRange();
                me._adjustValue();
                if (me.dispatchEvent("beforesliderto", {
                        drop: options.drop
                    })) {
                    me.getThumb().style[axis.pos] = me._parseValue(me.value, 'pix') + 'px';
                    me.dispatchEvent("update");
                }
            },

            /**
             * 校准value值，保证它在range范围内
             * @private
             */
            _adjustValue: function() {
                var me = this,
                    range = me.range;
                me.value = Math.max(Math.min(me.value, range[1]), range[0]);
            },

            /**
             * 将位置值转换为value，记录在当前实例中
             * @private
             * @param {number} position
             */
            _calcValue: function(pos) {
                var me = this;
                me.value = me._parseValue(pos, 'value');
                me._adjustValue();
            },

            /**
             * 将刻度转换为像素或是将像素转换为刻度
             * @param {Number} val 刻度值或是像素
             * @param {Object} type 'pix':刻度转换为像素, 'value':像素转换为刻度
             * @private
             */
            _parseValue: function(val, type) {
                var me = this,
                    axis = me._axis[me.layout];
                var len = me.getBody()[axis.clientSize] - me.getThumb()[axis.offsetSize];
                if (type == 'value') {
                    val = (me.max - me.min) / len * val + me.min;
                } else { //to pix
                    val = Math.round(len / (me.max - me.min) * (val - me.min));
                }
                return val;
            },

            /**
             * 获得当前的value
             * @public
             * @return {Number} value     当前滑块位置的值
             */
            getValue: function() {
                return this.value;
            },

            /**
             * 获取target元素
             * @private
             * @return {HTMLElement} target
             */
            getTarget: function() {
                return baidu.g(this.targetId);
            },

            /**
             * 获取滑块元素
             * @return {HTMLElement} thumb     滑块元素
             */
            getThumb: function() {
                return baidu.g(this.getId("thumb"));
            },
            /**
             * 使slider失去作用
             */
            disable: function() {
                var me = this;
                me.disabled = true;
                me._updateDragRange([me.value, me.value]);
            },
            /**
             * 启用slider
             */
            enable: function() {
                var me = this;
                me.disabled = false;
                me._updateDragRange(me.range);
            },
            /**
             * 销毁当前实例
             * @public
             */
            dispose: function() {
                var me = this;
                me.dispatchEvent('dispose');
                baidu.dom.remove(me.getId());
                me.dispatchEvent('ondispose');
                baidu.lang.Class.prototype.dispose.call(me);
            }
        });

    /**
     * 创建一个简单的滚动条
     * @class ScrollBar基类
     * @grammar new baidu.ui.ScrollBar(options)
     * @param   {Object}    options config参数.
     * @config  {String}    orientation 设置横向或是竖向滚动条，默认值：vertical,可取值：horizontal.
     * @config  {Number}    value       滚动条滚动的百分比值，定义域(0, 100)
     * @config  {Number}    dimension   滚动条滑块占全部内容的百分比，定义域(0, 100)
     * @config  {Number}    step        用户自定义当点击滚动按钮时每次滚动百分比距离，定义域(0, 100)
     * @config  {Function}  onscroll    当滚动时触发该事件，function(evt){}，evt.value可以取得滚动的百分比
     * @author linlingyu
     */
    baidu.ui.ScrollBar = baidu.ui.createUI(function(options) {
        var me = this;
        me._scrollBarSize = {
            width: 0,
            height: 0
        }; //用来存入scrollbar的宽度和高度
    }).extend(
        /**
         *  @lends baidu.ui.ScrollBar.prototype
         */
        {
            uiType: 'scrollbar',
            tplDOM: '<div id="#{id}" class="#{class}"></div>',
            tplThumb: '<div class="#{prev}"></div><div class="#{track}"></div><div class="#{next}"></div>',
            value: 0, //描述滑块初始值停留的百分比，定义域(0, 100)
            dimension: 10, //描述滑块占整个可滚动区域的百分比，定义域(0, 100)
            orientation: 'vertical', //横竖向的排列方式，取值 horizontal,vertical
            step: 10, //单步移动10%, 修改by wjp
            _axis: {
                horizontal: {
                    size: 'width',
                    unSize: 'height',
                    offsetSize: 'offsetWidth',
                    unOffsetSize: 'offsetHeight',
                    clientSize: 'clientWidth',
                    scrollPos: 'scrollLeft',
                    scrollSize: 'scrollWidth'
                },
                vertical: {
                    size: 'height',
                    unSize: 'width',
                    offsetSize: 'offsetHeight',
                    unOffsetSize: 'offsetWidth',
                    clientSize: 'clientHeight',
                    scrollPos: 'scrollTop',
                    scrollSize: 'scrollHeight'
                }
            },

            /**
             * 生成滑块的内容字符串
             * @return {String}
             * @private
             */
            getThumbString: function() {
                var me = this;
                return baidu.string.format(me.tplThumb, {
                    prev: me.getClass('thumb-prev'),
                    track: me.getClass('thumb-track'),
                    next: me.getClass('thumb-next')
                });
            },

            /**
             * 将scrollBar的body渲染到用户给出的target
             * @param {String|HTMLElement} target 一个dom的id字符串或是dom对象.
             */
            render: function(target) {
                var me = this;
                if (!target || me.getMain()) {
                    return;
                }
                baidu.dom.insertHTML(me.renderMain(target), 'beforeEnd',
                    baidu.string.format(me.tplDOM, {
                        id: me.getId(),
                        'class': me.getClass()
                    }));
                me._renderUI();
                me.dispatchEvent('load');
            },

            /**
             * 将Button和Slider渲染到body中
             * @private
             */
            _renderUI: function() {
                var me = this,
                    axis = me._axis[me.orientation],
                    body = me.getBody(),
                    prev,
                    slider,
                    next;

                function options(type) {
                    return {
                        classPrefix: me.classPrefix + '-' + type,
                        skin: me.skin ? me.skin + '-' + type : '',
                        poll: {
                            time: 4
                        },
                        onmousedown: function() {
                            me._basicScroll(type);
                        },
                        element: body,
                        autoRender: true
                    };
                }
                prev = me._prev = new baidu.ui.Button(options('prev'));
                baidu.dom.insertHTML(body, 'beforeEnd', baidu.string.format(me.tplDOM, {
                    id: me.getId('track'),
                    'class': me.getClass('track')
                }));
                next = me._next = new baidu.ui.Button(options('next'));

                function handler(evt) {
                    me.dispatchEvent('scroll', {
                        value: Math.round(evt.target.getValue())
                    });
                }
                slider = me._slider = new baidu.ui.Slider({
                    classPrefix: me.classPrefix + '-slider',
                    skin: me.skin ? me.skin + '-slider' : '',
                    layout: me.orientation,
                    onslide: handler,
                    onslideclick: handler,
                    element: baidu.dom.g(me.getId('track')),
                    autoRender: true
                });
                me._scrollBarSize[axis.unSize] = next.getBody()[axis.unOffsetSize]; //这里先运算出宽度，在flushUI中运算高度
                me._thumbButton = new baidu.ui.Button({
                    classPrefix: me.classPrefix + '-thumb-btn',
                    skin: me.skin ? me.skin + '-thumb-btn' : '',
                    content: me.getThumbString(),
                    capture: true,
                    element: slider.getThumb(),
                    autoRender: true
                });
                me.flushUI(me.value, me.dimension);
                //注册滚轮事件
                me._registMouseWheelEvt(me.getMain());
            },

            /**
             * 更新组件的外观，通过传入的value来使滚动滑块滚动到指定的百分比位置，通过dimension来更新滑块所占整个内容的百分比宽度
             * @param {Number} value 滑块滑动的百分比，定义域(0, 100).
             * @param {Number} dimension 滑块的宽点占内容的百分比，定义域(0, 100).
             */
            flushUI: function(value, dimension) {
                var me = this,
                    axis = me._axis[me.orientation],
                    btnSize = me._prev.getBody()[axis.offsetSize] + me._next.getBody()[axis.offsetSize],
                    body = me.getBody(),
                    slider = me._slider,
                    thumb = slider.getThumb(),
                    val;
                if (isNaN(dimension)) {
                    dimension = 0;
                }
                //当外观改变大小时
                baidu.dom.hide(body);
                val = me.getMain()[axis.clientSize];
                me._scrollBarSize[axis.size] = (val <= 0) ? btnSize : val;
                slider.getMain().style[axis.size] = (val <= 0 ? 0 : val - btnSize) + 'px'; //容错处理
                thumb.style[axis.size] = Math.max(Math.min(dimension, 100), 0) + '%';

                if (T.browser.ie == 6) { //ie6滚动条最小为12像素, by wjp           
                    var tempHeight = (val * dimension / 100);
                    if (tempHeight > 0 && tempHeight < 12) {
                        thumb.style.height = "12px";
                    }
                }

                baidu.dom.show(body);
                me._scrollTo(value); //slider-update
            },

            /**
             * 滚动内容到参数指定的百分比位置
             * @param {Number} val 一个百分比值.
             * @private
             */
            _scrollTo: function(val) {
                //slider有容错处理
                this._slider.update({
                    value: val
                });
            },

            /**
             * 滚动内容到参数指定的百分比位置
             * @param {Number} val 一个百分比值.
             */
            scrollTo: function(val) {
                var me = this;
                me._scrollTo(val);
                me.dispatchEvent('scroll', {
                    value: val
                });
            },

            /**
             * 根据参数实现prev和next按钮的基础滚动
             * @param {String} pos 取值prev|next.
             * @private
             */
            _basicScroll: function(pos) {
                var me = this;
                me.scrollTo(Math.round(me._slider.getValue()) + (pos == 'prev' ? -me.step : me.step));
            },

            /**
             * 滑轮事件侦听器
             * @param {Event} evt 滑轮的事件对象.
             * @private
             */
            _onMouseWheelHandler: function(evt) {
                var me = this,
                    target = me.target,
                    evt = evt || window.event,
                    detail = evt.detail || -evt.wheelDelta;
                baidu.event.preventDefault(evt);
                me._basicScroll(detail > 0 ? 'next' : 'prev');
            },

            /**
             * 注册一个滚轮事件
             * @param {HTMLElement} target 需要注册的目标dom.
             * @private
             */
            _registMouseWheelEvt: function(target) {
                //        if(this.orientation != 'vertical'){return;}
                var me = this,
                    getEvtName = function() {
                        var ua = navigator.userAgent.toLowerCase(),
                            //代码出处jQuery
                            //add  /(trident)/.exec(ua)  chenqiao
                            matcher = /(webkit)/.exec(ua) || /(opera)/.exec(ua) || /(msie)/.exec(ua) || /(trident)/.exec(ua) || ua.indexOf('compatible') < 0 && /(mozilla)/.exec(ua) || [];
                        return matcher[1] == 'mozilla' ? 'DOMMouseScroll' : 'mousewheel';
                    },
                    entry = {
                        target: target,
                        evtName: getEvtName(),
                        handler: baidu.fn.bind('_onMouseWheelHandler', me)
                    };
                baidu.event.on(entry.target, entry.evtName, entry.handler);
                me.addEventListener('dispose', function() {
                    baidu.event.un(entry.target, entry.evtName, entry.handler);
                });
            },

            /**
             * 设置滚动条的隐藏或显示
             * @param {Boolean} val 布尔值 true:显示, false:隐藏.
             */
            setVisible: function(val) {
                var _display = '';
                if (baidu.browser.ie == 6) {
                    _display = 'inline'
                }
                this.getMain().style.display = val ? _display : 'none';
            },

            /**
             * 取得当前是隐藏或是显示状态
             * @return {Boolean} true:显示, false:隐藏.
             */
            isVisible: function() {
                if (this.getMain()) {
                    return this.getMain().style.display != 'none';
                } else {
                    return false;
                }
            },

            /**
             * 取得滚动条的宽度和高度
             * @return {Object} 一个json，有width和height属性.
             */
            getSize: function() {
                return this._scrollBarSize;
            },

            /**
             * 更新滚动条的外观
             * @param {Object} options 参考构造函数参数.
             */
            update: function(options) {
                var me = this;
                me.dispatchEvent('beforeupdate'); //该事件是用于和插件container结合使用，不对外开放
                baidu.object.extend(me, options);
                me.flushUI(me.value, me.dimension);
                me.dispatchEvent('update');
            },

            /**
             * 销毁对象
             */
            dispose: function() {
                var me = this;
                me.dispatchEvent('dispose');
                me._prev.dispose();
                me._thumbButton.dispose();
                me._slider.dispose();
                me._next.dispose();
                baidu.dom.remove(me.getMain());
                baidu.lang.Class.prototype.dispose.call(me);
            }
        });

    /**
     * 让滚动条邦定一个容器
     * @param   {Object}                options config参数.
     * @config  {String|HTMLElement}    container 一个容器的dom或是id的字符串
     * @author linlingyu
     */
    baidu.ui.ScrollBar.register(function(me) {
        if (!me.container) {
            return;
        }
        me.addEventListeners({
            load: function() {
                me.update();
                if (me.orientation == 'vertical') {
                    me._registMouseWheelEvt(me.getContainer());
                }
            },
            beforeupdate: function() {
                var me = this;
                var axis = me._axis[me.orientation],
                    container = me.getContainer();
                if (!container) {
                    return;
                }

                me.dimension = Math.round(container[axis.clientSize] / container[axis.scrollSize] * 100);
                me.value = container[axis.scrollSize] - container[axis.clientSize];
                me.value > 0 && (me.value = Math.round(container[axis.scrollPos] / (container[axis.scrollSize] - container[axis.clientSize]) * 100));
            },
            scroll: function(evt) {
                var container = me.getContainer(),
                    axis = me._axis[me.orientation];
                container[axis.scrollPos] = evt.value / 100 * (container[axis.scrollSize] - container[axis.clientSize]);
            }
        });
    });
    baidu.object.extend(baidu.ui.ScrollBar.prototype, {
        /**
         * 取得用户传入的需要被滚动条管理的对象
         * @return {HTMLElement}
         */
        getContainer: function() {
            return baidu.dom.g(this.container);
        }
    });



    /**
     * 提供给setStyle与getStyle使用
     * @meta standard
     */
    baidu.dom._styleFixer["float"] = baidu.browser.ie ? "styleFloat" : "cssFloat";



    /**
     * 创建一个panel来作为滚动条的容器
     * @class ScrollPanel基类
     * @grammar new baidu.ui.ScrollPanel(options)
     * @param   {Object}                options config参数.
     * @config  {String}                overflow 取值'overflow-y':创建竖向滚动, 'overflow-x':创建横向滚动条, 'auto':创建滚动条(默认)
     * @config  {String|HTMLElement}    container 需要被滚动条管理的容器对象
     * @author linlingyu
     */
    baidu.ui.ScrollPanel = baidu.ui.createUI(function(options) {
        if (options.autoUpdate) {
            this.autoUpdate = true; //设置是否由管理器自动更新, by wjp
        }

    }).extend(
        /**
         *  @lends baidu.ui.ScrollPanel.prototype
         */
        {
            uiType: 'scrollpanel',
            tplDOM: '<div id="#{id}" class="#{class}">#{body}</div>',
            overflow: 'auto',
            _scrollBarSize: 0, //滚动条尺寸
            _yVisible: false, //用来标示竖向滚动条的隐藏显示状态
            _xVisible: false, //用来标示横向滚动条的隐藏显示状态
            _axis: {
                y: {
                    size: 'height',
                    unSize: 'width',
                    unScrollSize: 'scrollWidth',
                    unClientSize: 'clientWidth',
                    offsetSize: 'offsetHeight'
                },
                x: {
                    size: 'width',
                    unSize: 'height',
                    unScrollSize: 'scrollHeight',
                    unClientSize: 'clientHeight',
                    offsetSize: 'offsetWidth'
                }
            },
            setMargin: function() {
                var me = this,
                    margin = me.margin || [0, 0, 0, 0];

                for (var i = 0; i < margin.length; i++) {
                    if (isNaN(margin[i])) {
                        margin[i] = 0;
                    }
                }
                me.margin = margin;
            },
            /**
             * 是否自动更新滚动面板，默认是自动更新，但有些panel不需要自动更新，需要设此值为false
             */
            autoUpdate: true,
            /**
             * 是否延时更新
             */
            updateTimeout: true,
            /**
             * 取得panel所需要body字符串
             * @private
             */
            getString: function() {
                var me = this,
                    str = baidu.string.format(me.tplDOM, {
                        id: me.getId('panel'),
                        'class': me.getClass('panel')
                    });
                str = baidu.string.format(me.tplDOM, {
                    id: me.getId(),
                    'class': me.getClass(),
                    body: str
                });
                return baidu.string.format(me.tplDOM, {
                    id: me.getId('main'),
                    'class': me.getClass('main'),
                    body: str
                });
            },

            /**
             * 渲染ScrollPanel到页面中
             * @param {String|HTMLElement} target ScrollPanel依附于target来渲染.
             */
            render: function(target) {
                if (window.isPrint) return; //打印页面时候无滚动条

                var me = this;
                baidu.ui.ScrollPanel.all.push(this);
                this._scrollPanelId = baidu.ui.ScrollPanel.all.length; //索引ID
                me.setMargin(); //初始化margin值
                me.target = target;
                if (!target || me.getMain()) {
                    return;
                }
                me.getTarget().style.overflow = 'hidden'; //隐藏默认的滚动条
                baidu.dom.insertHTML(me.getTarget(), 'afterEnd', me.getString());
                me.renderMain(me.getId('main'));
                me._renderUI();

                me._switchCssEvt(me.getMain()); //修改为滚动条的最外层节点       
            },
            /**
             * 设置滚动条获取或失去焦点样式变换监听函数, by wjp
             * @param {String|HTMLElement} target ScrollPanel依附于target来渲染.
             */
            _switchCssEvt: function(target) {
                var me = this;

                T.on(target, 'mouseover', function() {
                    me._focusScrollBar();
                });

                T.on(target, 'mouseout', function() {
                    me._blurScrollBar();
                });

            },
            /**
             * 设置滚动条获得焦点时候的样式, by wjp
             */
            _focusScrollBar: function() {
                var me = this;

                if (T.browser.ie == 6) {
                    document.execCommand('BackgroundImageCache', false, true);
                }
                //加粗黑色竖线
                var scrollBarY = me.getScrollBar('y').element.children[0];
                T.dom.setStyle(scrollBarY, 'background-position', '-3px center');


                //修改滑块样式，将其加粗
                var thumbBtn = me.getScrollBar('y')._thumbButton.getBody();
                var thumbPrev = thumbBtn.children[0];
                var thumbNext = thumbBtn.children[2];

                T.dom.setStyle(thumbBtn, 'background-position', '-24px center');
                T.dom.setStyle(thumbPrev, 'background-position', '-36px -11px');
                T.dom.setStyle(thumbNext, 'background-position', '-36px -15px');
            },
            /**
             * 设置滚动条失去焦点时候的样式, by wjp
             */
            _blurScrollBar: function() {
                var me = this;

                var scrollBarY = me.getScrollBar('y').element.children[0];
                T.dom.setStyle(scrollBarY, 'background-position', '3px 0');

                //修改滑块样式，将其加粗
                var thumbBtn = me.getScrollBar('y')._thumbButton.getBody();
                if (!thumbBtn) {
                    return;
                }
                var thumbPrev = thumbBtn.children[0];
                var thumbNext = thumbBtn.children[2];

                T.dom.setStyle(thumbBtn, 'background-position', '-12px center');
                T.dom.setStyle(thumbPrev, 'background-position', '-36px 0');
                T.dom.setStyle(thumbNext, 'background-position', '-36px -4px');
            },
            /**
             * 根据参数渲染ScrollBar到容器中
             * @private
             */
            _renderUI: function() {
                var me = this,
                    main = me.getMain(),
                    panel = me.getPanel(),
                    target = me.getTarget(),
                    skin = me.skin || '';
                main.style.width = target.offsetWidth + 'px';

                // 如果目录容器设置宽度为100%设置其宽度
                if (target.style.width == '100%') {
                    target.style.width = target.offsetWidth + 'px';
                }
                //main.style.height = target.offsetHeight + 'px';

                panel.appendChild(target);

                function getScrollbar(pos) {
                    var track = me.getId('overflow-' + pos),
                        axis = me._axis[pos],
                        panel = me.getPanel(),
                        bar;
                    baidu.dom.insertHTML(panel, (pos == 'y' ? 'afterEnd' : 'beforeEnd'),
                        baidu.string.format(me.tplDOM, {
                            id: track,
                            'class': me.getClass('overflow-' + pos)
                        }));
                    track = baidu.dom.g(track);
                    if ('y' == pos) {

                        baidu.dom.setStyle(panel, 'float', 'left');
                        baidu.dom.setStyle(track, 'float', 'left');
                        baidu.dom.setStyle(track, 'display', 'inline');
                    }
                    //
                    me['_' + pos + 'Visible'] = true;
                    bar = me['_' + pos + 'Scrollbar'] = new baidu.ui.ScrollBar({
                        skin: skin + 'scrollbar' + '-' + pos,
                        orientation: pos == 'y' ? 'vertical' : 'horizontal',
                        container: me.container,
                        element: track,
                        autoRender: true
                    });
                    track.style[axis.unSize] = bar.getSize()[axis.unSize] + 'px';

                    track.style['marginTop'] = me.margin[0] + 'px';
                    track.style['marginRight'] = me.margin[1] + 'px';
                    track.style['marginBottom'] = me.margin[2] + 'px';
                    track.style['marginLeft'] = me.margin[3] + 'px';

                    me._scrollBarSize = bar.getSize()[axis.unSize] + me.margin[1] + me.margin[3];
                    bar.setVisible(false);
                }
                if (me.overflow == 'overflow-y' || me.overflow == 'auto') {
                    getScrollbar('y');
                }
                if (me.overflow == 'overflow-x' || me.overflow == 'auto') {
                    getScrollbar('x');
                }
                me._smartVisible();
            },

            /**
             * 根据内容智能运算容器是需要显示滚动条还是隐藏滚动条
             * @private
             */
            _smartVisible: function() {
                var me = this,
                    size = {
                        yshow: false,
                        xshow: false
                    };
                if (!me.getContainer()) {
                    return
                }

                function getSize(orie) { //取得邦定容器的最小尺寸和内容尺寸
                    var axis = me._axis[orie],
                        bar = me['_' + orie + 'Scrollbar'],
                        container = me.getContainer(),
                        size = {};
                    if (!bar || !bar.isVisible()) {
                        if (container[axis.unClientSize] - me._scrollBarSize >= 0) {
                            container.style[axis.unSize] = container[axis.unClientSize] - me._scrollBarSize + 'px';
                        }
                    }
                    size[axis.unSize] = container[axis.unClientSize];
                    size['scroll' + axis.unSize] = container[axis.unScrollSize];
                    return size;
                }

                function setContainerSize(orie, size) { //根据是否显示滚动条设置邦定容器的尺寸
                    var axis = me._axis[orie],
                        container = me.getContainer();
                    if (!me['_' + orie + 'Visible'] || !size[orie + 'show'] || !me['_' + orie + 'Scrollbar']) {
                        container.style[axis.unSize] = container[axis.unClientSize] + me._scrollBarSize + 'px';
                    }
                }

                function setScrollBarVisible(orie, size) { //设置滚动条的显示或隐藏
                    var axis = me._axis[orie],
                        container = me.getContainer(),
                        scrollbar = me['_' + orie + 'Scrollbar'],
                        isShow = size[orie + 'show'];
                    if (scrollbar && scrollbar.getMain()) {
                        if (container[axis.offsetSize] - me.margin[0] - me.margin[2] >= 0) {
                            scrollbar.getMain().style[axis.size] = container[axis.offsetSize] - me.margin[0] - me.margin[2] + 'px';
                        }
                        scrollbar.setVisible(me['_' + orie + 'Visible'] ? isShow : false);
                        scrollbar.update();
                    }
                }
                baidu.object.extend(size, getSize('y'));
                baidu.object.extend(size, getSize('x'));
                if (size.scrollwidth <= size.width + me._scrollBarSize && size.scrollheight <= size.height + me._scrollBarSize) { //两个都不显示
                    size.yshow = size.xshow = false;
                } else if (size.scrollwidth <= size.width && size.scrollheight > size.height + me._scrollBarSize) { //只显示竖
                    size.yshow = true;
                    size.xshow = false;
                } else if (size.scrollwidth > size.width + me._scrollBarSize && size.scrollheight <= size.height) { //只显示横
                    size.yshow = false;
                    size.xshow = true;
                } else { //两个都显示
                    size.yshow = size.xshow = true;
                }
                setContainerSize('y', size);
                setContainerSize('x', size);
                setScrollBarVisible('y', size);
                setScrollBarVisible('x', size);
            },

            /**
             * 设置滚动条的隐藏或是显示状态
             * @param {Boolean} val 必选，true:显示, false:隐藏.
             * @param {String} pos 可选，当有两个滚动条时可以指定只隐藏其中之一，取值'x'或'y'，不传该参数隐藏或显示全部.
             */
            setVisible: function(val, pos) {
                var me = this;
                if (pos) {
                    me['_' + pos + 'Visible'] = val;
                } else {
                    me._yVisible = me._xVisible = val;
                }
                me._smartVisible();
            },

            /**
             * 取得滚动条的隐藏或显示状态
             * @param {String} pos 取值'x'或是'y'来选择要取得哪个滚动条的隐藏或是显示状态.
             * @return {Boolean} 返回布尔值来标示当前的隐藏或是显示状态.
             */
            isVisible: function(pos) {
                var me = this;
                return me['_' + pos + 'Visible'];
            },

            /**
             * 取得滚动条对象
             * @param {String} pos 取值'x'或是'y'来标示需取得哪个滚动条，当不传该参数则返回所有滚动条.
             * @return {ScrollBar|Array} 返回滚动条对象或数组.
             */
            getScrollBar: function(pos) {
                var me = this,
                    instance = pos ? me['_' + pos + 'Scrollbar'] : null;
                if (!instance) {
                    instance = (me._yScrollbar && me._xScrollbar) ? [me._yScrollbar, me._xScrollbar] : (me._yScrollbar || me._xScrollbar)
                }
                return instance;
            },

            /**
             * 更新所有滚动条的外观
             * @param {Object} options 参数请参考构造函数参数.
             */
            update: function(options) {
                if (window.isPrint) return; //打印页面时候无滚动条

                var me = this;

                if (!me.isVisible) return; //如果滚动条处于隐藏状态则 不执行 ；

                baidu.object.extend(me, options);
                if (me.getMain() && !me.getMain().offsetWidth) { // 如果没有宽度，不进行设置 by jason.zhou
                    return;
                }
                me._smartVisible();

                //设置外包div高度和container高度一致, by wjp
                var mainBox = me.getMain(),
                    mainCont = me.getContainer();
                if (mainBox && mainBox.style.display != 'none' && mainCont && mainCont.style) {
                    me.getMain().style.height = mainCont.style.height;
                    if (T.browser.ie && me.updateTimeout) {
                        if (me.scrollPanelTimerHandler) {
                            window.clearTimeout(me.scrollPanelTimerHandler);
                        }

                        me.scrollPanelTimerHandler = window.setTimeout(function() {
                            me._smartVisible(true)
                        }, 50); //解决滚动条ie6下不显示的情况，感谢林凌宇
                    }
                    //解决firefox resize时候的bug,重新滚动到指定位置bug消失, by wjp
                    var scrollBar = this.getScrollBar();
                    var value = scrollBar.value; //当前滚动值
                    scrollBar.scrollTo(value);
                }

            },

            /**
             * 取得panel的dom节点
             * @return {HTMLElement}
             */
            getPanel: function() {
                return baidu.dom.g(this.getId('panel'));
            },

            /**
             * 取得用户传入的目标对象
             * @return {HTMLElement}
             */
            getTarget: function() {
                return baidu.dom.g(this.target);
            },

            /**
             * 取得用户传入的container对象
             * @return {HTMLElement}
             */
            getContainer: function() {
                return baidu.dom.g(this.container);
            },

            /**
             * 销毁对象
             */
            dispose: function() {
                var me = this,
                    ybar = me._yScrollbar,
                    xbar = me._xScrollbar;
                me.dispatchEvent('dispose');
                me.getMain().parentNode.appendChild(me.getTarget());
                if (ybar) {
                    ybar.dispose();
                }
                if (xbar) {
                    xbar.dispose();
                }

                T.un(me.getMain(), "mouseover");
                T.un(me.getMain(), "mouseout");

                baidu.dom.remove(me.getMain());
                baidu.lang.Class.prototype.dispose.call(me);
            }
        });

    baidu.ui.ScrollPanel.all = [];

    T.on(window, 'resize', function() {
        setTimeout(function() {
            var panelArr = baidu.ui.ScrollPanel.all;

            for (var i = 0; i < panelArr.length; i++) {
                var pnl = panelArr[i];
                if (pnl && pnl.autoUpdate) {
                    pnl.update();
                }
            }
        }, 100)

    });

    /**
     * 操作日期的方法
     * @namespace baidu.date
     */
    baidu.date = baidu.date || {};

    /**
     * 操作number的方法
     * @namespace baidu.number
     */
    baidu.number = baidu.number || {};


    /**
     * 对目标数字进行0补齐处理
     * @name baidu.number.pad
     * @function
     * @grammar baidu.number.pad(source, length)
     * @param {number} source 需要处理的数字
     * @param {number} length 需要输出的长度
     *
     * @returns {string} 对目标数字进行0补齐处理后的结果
     */
    baidu.number.pad = function(source, length) {
        var pre = "",
            negative = (source < 0),
            string = String(Math.abs(source));

        if (string.length < length) {
            pre = (new Array(length - string.length + 1)).join('0');
        }

        return (negative ? "-" : "") + pre + string;
    };


    /**
     * 对目标日期对象进行格式化
     * @name baidu.date.format
     * @function
     * @grammar baidu.date.format(source, pattern)
     * @param {Date} source 目标日期对象
     * @param {string} pattern 日期格式化规则
     * @remark
     * 
    <b>格式表达式，变量含义：</b><br><br>
    hh: 带 0 补齐的两位 12 进制时表示<br>
    h: 不带 0 补齐的 12 进制时表示<br>
    HH: 带 0 补齐的两位 24 进制时表示<br>
    H: 不带 0 补齐的 24 进制时表示<br>
    mm: 带 0 补齐两位分表示<br>
    m: 不带 0 补齐分表示<br>
    ss: 带 0 补齐两位秒表示<br>
    s: 不带 0 补齐秒表示<br>
    yyyy: 带 0 补齐的四位年表示<br>
    yy: 带 0 补齐的两位年表示<br>
    MM: 带 0 补齐的两位月表示<br>
    M: 不带 0 补齐的月表示<br>
    dd: 带 0 补齐的两位日表示<br>
    d: 不带 0 补齐的日表示
        
     *             
     * @returns {string} 格式化后的字符串
     */

    baidu.date.format = function(source, pattern) {
        if ('string' != typeof pattern) {
            return source.toString();
        }

        function replacer(patternPart, result) {
            pattern = pattern.replace(patternPart, result);
        }

        var pad = baidu.number.pad,
            year = source.getFullYear(),
            month = source.getMonth() + 1,
            date2 = source.getDate(),
            hours = source.getHours(),
            minutes = source.getMinutes(),
            seconds = source.getSeconds();

        replacer(/yyyy/g, pad(year, 4));
        replacer(/yy/g, pad(parseInt(year.toString().slice(2), 10), 2));
        replacer(/MM/g, pad(month, 2));
        replacer(/M/g, month);
        replacer(/dd/g, pad(date2, 2));
        replacer(/d/g, date2);

        replacer(/HH/g, pad(hours, 2));
        replacer(/H/g, hours);
        replacer(/hh/g, pad(hours % 12, 2));
        replacer(/h/g, hours % 12);
        replacer(/mm/g, pad(minutes, 2));
        replacer(/m/g, minutes);
        replacer(/ss/g, pad(seconds, 2));
        replacer(/s/g, seconds);

        return pattern;
    };
    /**
     * 将目标字符串转换成日期对象
     * @name baidu.date.parse
     * @function
     * @grammar baidu.date.parse(source)
     * @param {string} source 目标字符串
     * @remark
     * 
    对于目标字符串，下面这些规则决定了 parse 方法能够成功地解析： <br>
    <ol>
    <li>短日期可以使用“/”或“-”作为日期分隔符，但是必须用月/日/年的格式来表示，例如"7/20/96"。</li>
    <li>以 "July 10 1995" 形式表示的长日期中的年、月、日可以按任何顺序排列，年份值可以用 2 位数字表示也可以用 4 位数字表示。如果使用 2 位数字来表示年份，那么该年份必须大于或等于 70。 </li>
    <li>括号中的任何文本都被视为注释。这些括号可以嵌套使用。 </li>
    <li>逗号和空格被视为分隔符。允许使用多个分隔符。 </li>
    <li>月和日的名称必须具有两个或两个以上的字符。如果两个字符所组成的名称不是独一无二的，那么该名称就被解析成最后一个符合条件的月或日。例如，"Ju" 被解释为七月而不是六月。 </li>
    <li>在所提供的日期中，如果所指定的星期几的值与按照该日期中剩余部分所确定的星期几的值不符合，那么该指定值就会被忽略。例如，尽管 1996 年 11 月 9 日实际上是星期五，"Tuesday November 9 1996" 也还是可以被接受并进行解析的。但是结果 date 对象中包含的是 "Friday November 9 1996"。 </li>
    <li>JScript 处理所有的标准时区，以及全球标准时间 (UTC) 和格林威治标准时间 (GMT)。</li> 
    <li>小时、分钟、和秒钟之间用冒号分隔，尽管不是这三项都需要指明。"10:"、"10:11"、和 "10:11:12" 都是有效的。 </li>
    <li>如果使用 24 小时计时的时钟，那么为中午 12 点之后的时间指定 "PM" 是错误的。例如 "23:15 PM" 就是错误的。</li> 
    <li>包含无效日期的字符串是错误的。例如，一个包含有两个年份或两个月份的字符串就是错误的。</li>
    </ol>
        
     *             
     * @returns {Date} 转换后的日期对象
     */

    baidu.date.parse = function(source) {
        var reg = new RegExp("^\\d+(\\-|\\/)\\d+(\\-|\\/)\\d+\x24");
        if ('string' == typeof source) {
            if (reg.test(source) || isNaN(Date.parse(source))) {
                var d = source.split(/ |T/),
                    d1 = d.length > 1 ? d[1].split(/[^\d]/) : [0, 0, 0],
                    d0 = d[0].split(/[^\d]/);
                return new Date(d0[0] - 0,
                    d0[1] - 1,
                    d0[2] - 0,
                    d1[0] - 0,
                    d1[1] - 0,
                    d1[2] - 0);
            } else {
                return new Date(source);
            }
        }

        return new Date();
    };
    /**
     * 获取目标元素指定标签的最近的祖先元素
     * @name baidu.dom.getAncestorByTag
     * @function
     * @grammar baidu.dom.getAncestorByTag(element, tagName)
     * @param {HTMLElement|string} element 目标元素或目标元素的id
     * @param {string} tagName 祖先元素的标签名
     * @see baidu.dom.getAncestorBy,baidu.dom.getAncestorByClass
     *
     * @returns {HTMLElement|null} 指定标签的最近的祖先元素，查找不到时返回null
     */
    baidu.dom.getAncestorByTag = function(element, tagName) {
        element = baidu.dom.g(element);
        tagName = tagName.toUpperCase();

        while ((element = element.parentNode) && element.nodeType == 1) {
            if (element.tagName == tagName) {
                return element;
            }
        }

        return null;
    };

    baidu.dom.offset = function(element) {
        var x = element.offsetLeft,
            y = element.offsetTop;
        while ((element = element.offsetParent)) {
            x += element.offsetLeft;
            y += element.offsetTop;
        }
        return {
            left: x,
            top: y
        }
    }

    /**
     * 添加height, width, prevAll方法
     * by songxin
     * date: 2014-8-12
     */
    baidu.dom.extend({
        height: function(value) {
            return baidu._util_.access(this, 'height', value, function(ele, key, val) {
                var hasValue = val !== undefined,
                    parseValue = hasValue && parseFloat(val),
                    type = ele != null && ele == ele.window ? 'window' : (ele.nodeType === 9 ? 'document' : false);
                if (hasValue && parseValue < 0 || isNaN(parseValue)) {
                    return;
                }
                hasValue && /^(?:\d*\.)?\d+$/.test(val += '') && (val += 'px');
                return type ? baidu._util_.getWindowOrDocumentWidthOrHeight(ele, type, key) : (hasValue ? ele.style.height = val : baidu._util_.getWidthOrHeight(ele, key));
            });
        },

        width: function(value) {
            return baidu._util_.access(this, 'width', value, function(ele, key, val) {
                var hasValue = val !== undefined,
                    parseValue = hasValue && parseFloat(val),
                    type = ele != null && ele == ele.window ? 'window' : (ele.nodeType === 9 ? 'document' : false);
                if (hasValue && parseValue < 0 || isNaN(parseValue)) {
                    return;
                }
                hasValue && /^(?:\d*\.)?\d+$/.test(val += '') && (val += 'px');
                return type ? baidu._util_.getWindowOrDocumentWidthOrHeight(ele, type, key) : (hasValue ? ele.style.width = val : baidu._util_.getWidthOrHeight(ele, key));
            });
        },

        prevAll: function(filter) {
            var array = baidu.array();

            baidu.forEach(this, function(dom) {
                var a = [];
                while (dom = dom.previousSibling) dom.nodeType == 1 && a.push(dom);

                baidu.merge(array, a.reverse());
            });

            return this.pushStack(typeof filter == "string" ? baidu.dom.match(array, filter) : array.unique());
        },

        position: function() {
            if (this.size() <= 0) {
                return 0;
            }
            var patrn = /^(?:body|html)$/i,
                coordinate = this.offset(),
                offsetParent = this.offsetParent(),
                parentCoor = patrn.test(offsetParent[0].nodeName) ? {
                    left: 0,
                    top: 0
                } : offsetParent.offset();
            coordinate.left -= parseFloat(this.getCurrentStyle('marginLeft')) || 0;
            coordinate.top -= parseFloat(this.getCurrentStyle('marginTop')) || 0;
            parentCoor.left += parseFloat(offsetParent.getCurrentStyle('borderLeftWidth')) || 0;
            parentCoor.top += parseFloat(offsetParent.getCurrentStyle('borderTopWidth')) || 0;
            return {
                left: coordinate.left - parentCoor.left,
                top: coordinate.top - parentCoor.top
            }
        },

        index: function(elem) {
            if (!elem) {
                return (this[0] && this[0].parentNode) ? this.prevAll().length : -1;
            }
        }
    });

    /*
     * 添加T.dom.animate 动画函数
     * by songxin
     * data: 2014-09-02
     */

    // 包装animate 开始
    // 一共300行 如果需要可以摘出来 async加载
    void

    function() {

        baidu.plugin = function(chainName, copy, fn, constructor) {
            var isCopy = baidu.isPlainObject(copy),
                chain;
            if (!isCopy) {
                constructor = fn;
                fn = copy;
            }
            baidu.type(fn) != 'function' && (fn = undefined);
            baidu.type(constructor) != 'function' && (constructor = undefined);
            chain = baidu.createChain(chainName, fn, constructor);
            isCopy && chain.extend(copy);
            return chain;
        };

        (function(undefined) {
            var data = baidu.dom.data,

                //baidu._util_.access中value不能是fn,所以这里重写一个
                wrapper = function(tang, value, fn, setter) {
                    var tmp;

                    if (!tang.size()) {
                        return tang;
                    }
                    //            return setter || value ? ( tang.each(fn), tang ): fn.call( tmp = tang[0], 0, tmp );
                    return setter || value ? tang.each(fn) : fn.call(tmp = tang[0], 0, tmp);
                };

            baidu._queueHooks = function(elem, type) {
                var key = type + "queueHooks",
                    ret;

                return data(elem, key) || (data(elem, key, ret = {
                    empty: baidu.Callbacks("once memory").add(function() {
                        //清理
                        data(elem, type + "queue", null);
                        data(elem, key, null);
                    })
                }), ret);
            }


            baidu.plugin("dom", {
                queue: function(type, value, dontstart) {
                    var key;

                    if (typeof type !== "string") {
                        value = type;
                        type = undefined;
                    }

                    type = type || "fx";
                    key = type + "queue";

                    return wrapper(this, value, function() {
                        var queue = data(this, key);
                        if (value) {
                            if (!queue || baidu.isArray(value)) {
                                data(this, key, queue = baidu.makeArray(value));
                            } else {
                                queue.push(value);
                            }

                            // 确保queue有hooks, 在promise调用之前必须要有hooks
                            baidu._queueHooks(this, type);

                            if (!dontstart && type === "fx" && queue[0] !== "inprogress") {
                                baidu.dequeue(this, type);
                            }
                        }
                        return queue || [];
                    }, arguments.length > 1 || value);
                },

                dequeue: function(type) {
                    type = type || "fx";

                    return wrapper(this, true, function() {
                        var elem = this,
                            queue = baidu.queue(elem, type),
                            remaining = queue.length,
                            fn = queue.shift(),
                            hooks = baidu._queueHooks(elem, type),
                            next = function() {
                                baidu.dequeue(elem, type);
                            };

                        if (fn === "inprogress") {
                            fn = queue.shift();
                            remaining--;
                        }

                        hooks.cur = fn;

                        if (fn) {
                            if (type === "fx") {
                                queue.unshift("inprogress");
                            }

                            delete hooks.stop;
                            fn.call(elem, next, hooks);
                        }

                        !remaining && hooks && hooks.empty.fire();
                    });
                }
            });

            //copy queue and dequeue to baidu namespace.
            baidu.queue = baidu.dom.queue;
            baidu.dequeue = baidu.dom.dequeue;

        })();



        baidu.plugin("dom", {

            clearQueue: function(type) {
                return this.queue(type || "fx", []);
            }
        });


        baidu.plugin("dom", {

            delay: function(duration, type) {
                type = type || "fx";
                return this.queue(type, function(next, hooks) {
                    var timer = setTimeout(next, duration || 0);
                    hooks.stop = function() {
                        clearTimeout(timer);
                    }
                });
            }
        });

        baidu.fx = baidu.fx || {};

        (function(undefined) {
            var fx = baidu.fx,

                //当animation frame不支持时有用
                interval = 13,

                //方法池子
                timers = [],

                getStrategy = (function() {
                    var strategies = {
                            _default: {
                                next: function(cb) {
                                    return setTimeout(cb, interval);
                                },

                                cancel: function(id) { //不包一层，在id里面报错
                                    return clearTimeout(id);
                                }
                            }
                        },

                        nextFrame = window.requestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        window.oRequestAnimationFrame ||
                        window.msRequestAnimationFrame,

                        cancelFrame = window.cancelAnimationFrame ||
                        window.webkitCancelAnimationFrame ||
                        window.mozCancelRequestAnimationFrame ||
                        window.oCancelRequestAnimationFrame ||
                        window.msCancelRequestAnimationFrame;

                    nextFrame && cancelFrame && (strategies.frame = {
                        next: nextFrame,
                        cancel: cancelFrame
                    });

                    return function(stra) {
                        return strategies[stra] || strategies._default;
                    };
                })(),

                now = function() {
                    return (new Date()).getTime();
                },

                createFxNow = function() {
                    setTimeout(function() {
                        fxNow = undefined;
                    }, 0);
                    return fxNow = now();
                },

                //统一调配
                tick = function() {
                    var timer,
                        i = 0;

                    fxNow = now(); //cache 当前时间
                    for (; i < timers.length; i++) {
                        timer = timers[i];
                        // Checks the timer has not already been removed
                        if (!timer() && timers[i] === timer) {
                            timers.splice(i--, 1);
                        }
                    }
                    if (!timers.length) {
                        stop();
                    } else {
                        start(true);
                    }
                    fxNow = undefined;
                },

                //开始定期执行
                start = function(force) {

                    //暴露到fx给测试用例用
                    strategy = strategy || (fx.strategy = getStrategy(fx.useAnimationFrame ? 'frame' : '_default'));

                    timerId = (force ? false : timerId) || strategy.next.call(null, tick); //必须使用call，否则会报错
                },

                //结束定期执行
                stop = function() {
                    strategy && strategy.cancel.call(null, timerId); //必须使用call，否则会报错
                    timerId = strategy = null;
                },

                //timer ID
                timerId,
                fxNow,
                strategy;


            baidu.extend(fx, {

                //添加方法到池子，如果fn有返回值，此方法将在下个tick再次执行。
                //获取池子
                timer: function(fn) {
                    if (fn === undefined) {
                        return timers;
                    }
                    fn() && timers.push(fn) && start();
                },

                //获取当前时间，有缓存机制
                now: function() {
                    return fxNow || createFxNow();
                },

                tick: tick,

                useAnimationFrame: true
            });
        })();

        baidu.plugin = baidu.plugin || {};
        baidu.plugin._util_ = baidu.plugin._util_ || {};

        void

        function() {
            var css = baidu.dom.css,
                cssNumber = baidu._util_.cssNumber;

            baidu.extend(baidu.plugin._util_.fx = {}, {
                cssUnit: function(prop) {
                    return cssNumber[prop] ? "" : "px";
                },

                getCss: function(elem, key) {
                    var val = css(elem, key),
                        num = parseFloat(val);

                    return !isNaN(num) && isFinite(num) ? num || 0 : val;
                },

                propExpand: (function() {
                    var hooks = {},
                        cssExpand = ["Top", "Right", "Bottom", "Left"];

                    baidu.forEach({
                        margin: "",
                        padding: "",
                        border: "Width"
                    }, function(suffix, prefix) {
                        hooks[prefix + suffix] = {
                            expand: function(value) {
                                var i = 0,
                                    expanded = {},

                                    // assumes a single number if not a string
                                    parts = typeof value === "string" ? value.split(" ") : [value];

                                for (; i < 4; i++) {
                                    expanded[prefix + cssExpand[i] + suffix] =
                                        parts[i] || parts[i - 2] || parts[0];
                                }

                                return expanded;
                            }
                        };
                    });

                    return function(prop, value) {
                        var hook = hooks[prop];
                        return hook ? hook.expand(value) : null;
                    }
                })(),

                getAllData: (function() {
                    var guid = baidu.key,
                        maps = baidu.global("_maps_HTMLElementData");

                    return function(elem) {
                        var key = elem[guid];
                        return key && maps[key] || [];
                    }
                })()
            });


        }();


        (function(undefined) {

            var fx = baidu.fx,
                helper = baidu.plugin._util_.fx,
                css = baidu.dom.css,
                cssUnit = helper.cssUnit,
                cssHooks = baidu._util_.cssHooks,
                getCss = helper.getCss,
                easing = {
                    linear: function(p) {
                        return p;
                    },
                    swing: function(p) {
                        return 0.5 - Math.cos(p * Math.PI) / 2;
                    }
                };

            function Tween(elem, options, prop, end, easing) {
                return new Tween.prototype.init(elem, options, prop, end, easing);
            }

            Tween.prototype = {
                constructor: Tween,
                init: function(elem, options, prop, end, easing, unit) {
                    this.elem = elem;
                    this.prop = prop;
                    this.easing = easing || "swing";
                    this.options = options;
                    this.start = this.now = this.cur();
                    this.end = end;
                    this.unit = unit || cssUnit(prop);
                },
                cur: function() {
                    var hooks = Tween.propHooks[this.prop];

                    return hooks && hooks.get ?
                        hooks.get(this) :
                        Tween.propHooks._default.get(this);
                },
                run: function(percent) {
                    var eased,
                        hooks = Tween.propHooks[this.prop];

                    if (this.options.duration) {
                        this.pos = eased = easing[this.easing](
                            percent, this.options.duration * percent, 0, 1, this.options.duration
                        );
                    } else {
                        this.pos = eased = percent;
                    }
                    this.now = (this.end - this.start) * eased + this.start;

                    if (this.options.step) {
                        this.options.step.call(this.elem, this.now, this);
                    }

                    if (hooks && hooks.set) {
                        hooks.set(this);
                    } else {
                        Tween.propHooks._default.set(this);
                    }
                    return this;
                }
            };

            Tween.prototype.init.prototype = Tween.prototype;

            Tween.propHooks = {
                _default: {
                    get: function(tween) {
                        var result,
                            elem = tween.elem,
                            style;

                        if (elem[tween.prop] != null &&
                            (!(style = elem.style) || style[tween.prop] == null)) {
                            return elem[tween.prop];
                        }
                        result = getCss(elem, tween.prop);
                        return !result || result === "auto" ? 0 : result;
                    },

                    set: function(tween) {
                        var elem = tween.elem,
                            style = elem.style;

                        if (style && (style[tween.prop] != null || cssHooks[tween.prop])) {
                            css(elem, tween.prop, tween.now + tween.unit);
                        } else {
                            elem[tween.prop] = tween.now;
                        }
                    }
                }
            };

            Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
                set: function(tween) {
                    var elem = tween.elem;
                    if (elem.nodeType && elem.parentNode) {
                        elem[tween.prop] = tween.now;
                    }
                }
            };


            //expose
            baidu.extend(fx, {
                Tween: Tween,
                easing: easing
            });
        })();

        (function(support) {
            var div = document.createElement("div");

            support.inlineBlockNeedsLayout = false;
            support.shrinkWrapBlocks = false;

            baidu(document).ready(function() {
                var body = document.body,
                    container = document.createElement("div");
                container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";

                body.appendChild(container).appendChild(div);

                if (typeof div.style.zoom !== "undefined") {
                    div.style.cssText = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;width:1px;padding:1px;display:inline;zoom:1";
                    support.inlineBlockNeedsLayout = (div.offsetWidth === 3);

                    // Support: IE6
                    // Check if elements with layout shrink-wrap their children
                    div.style.display = "block";
                    div.innerHTML = "<div></div>";
                    div.firstChild.style.width = "5px";
                    support.shrinkWrapBlocks = (div.offsetWidth !== 3);
                }

                body.removeChild(container);
                container = div = body = null;
            });
        })(baidu._util_.support);

        (function(undefined) {

            var fx = baidu.fx,
                helper = baidu.plugin._util_.fx,
                cssUnit = helper.cssUnit,
                css = baidu.dom.css,
                data = baidu.dom.data,
                isHidden = baidu._util_.isHidden,
                getCss = helper.getCss,
                propExpand = helper.propExpand,
                toCamelCase = baidu.string.toCamelCase,
                fxNow = fx.now,
                rfxtypes = /^(?:toggle|show|hide)$/i,
                rfxnum = /^(?:([+-])=|)([+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|))([a-z%]*)$/i,
                animationPrefilters = [defaultPrefilter],
                tweeners = {
                    "*": [
                        function(prop, value) {
                            var end, unit,
                                tween = this.createTween(prop, value),
                                elem = tween.elem,
                                parts = rfxnum.exec(value),
                                target = tween.cur(),
                                start = +target || 0,
                                scale = 1,
                                maxIterations = 20;

                            if (parts) {
                                end = +parts[2];
                                unit = parts[3] || cssUnit(prop);
                                // 统一单位
                                if (unit !== "px" && start) {
                                    start = getCss(elem, prop) || end || 1;
                                    do {
                                        scale = scale || ".5";
                                        start = start / scale;
                                        css(elem, prop, start + unit);
                                    } while (scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations);
                                }

                                tween.unit = unit;
                                tween.start = start;
                                tween.end = parts[1] ? start + (parts[1] + 1) * end : end;
                            }
                            return tween;
                        }
                    ]
                };

            function createTweens(animation, props) {
                baidu.forEach(props, function(value, prop) {
                    var collection = (tweeners[prop] || []).concat(tweeners["*"]),
                        index = 0,
                        length = collection.length;
                    for (; index < length; index++) {
                        if (collection[index].call(animation, prop, value)) {

                            // we're done with this property
                            return;
                        }
                    }
                });
            }

            function Animation(elem, properties, options) {
                var result,
                    stopped,
                    index = 0,
                    length = animationPrefilters.length,
                    deferred = baidu.Deferred().always(function() {
                        // don't match elem in the :animated selector
                        delete tick.elem;
                    }),
                    tick = function() {
                        if (stopped) {
                            return false;
                        }
                        var currentTime = fxNow(),
                            remaining = Math.max(0, animation.startTime + animation.duration - currentTime),
                            // archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
                            temp = remaining / animation.duration || 0,
                            percent = 1 - temp,
                            index = 0,
                            length = animation.tweens.length;

                        for (; index < length; index++) {
                            animation.tweens[index].run(percent);
                        }

                        deferred.notifyWith(elem, [animation, percent, remaining]);

                        if (percent < 1 && length) {
                            return remaining;
                        } else {
                            deferred.resolveWith(elem, [animation]);
                            return false;
                        }
                    },
                    animation = deferred.promise({
                        elem: elem,
                        props: baidu.extend({}, properties),
                        opts: baidu.extend(true, {
                            specialEasing: {}
                        }, options),
                        originalProperties: properties,
                        originalOptions: options,
                        startTime: fxNow(),
                        duration: options.duration,
                        tweens: [],
                        createTween: function(prop, end) {
                            var tween = fx.Tween(elem, animation.opts, prop, end,
                                animation.opts.specialEasing[prop] || animation.opts.easing);
                            animation.tweens.push(tween);
                            return tween;
                        },
                        stop: function(gotoEnd) {
                            var index = 0,
                                // if we are going to the end, we want to run all the tweens
                                // otherwise we skip this part
                                length = gotoEnd ? animation.tweens.length : 0;
                            if (stopped) {
                                return this;
                            }
                            stopped = true;
                            for (; index < length; index++) {
                                animation.tweens[index].run(1);
                            }

                            deferred[gotoEnd ? 'resolveWith' : 'rejectWith'](elem, [animation, gotoEnd]);
                            return this;
                        }
                    }),
                    props = animation.props;

                propFilter(props, animation.opts.specialEasing);

                for (; index < length; index++) {
                    result = animationPrefilters[index].call(animation, elem, props, animation.opts);
                    if (result) {
                        return result;
                    }
                }

                createTweens(animation, props);

                if (baidu.isFunction(animation.opts.start)) {
                    animation.opts.start.call(elem, animation);
                }

                fx.timer(
                    baidu.extend(tick, {
                        elem: elem,
                        anim: animation,
                        queue: animation.opts.queue
                    })
                );

                // attach callbacks from options
                return animation.progress(animation.opts.progress)
                    .done(animation.opts.done, animation.opts.complete)
                    .fail(animation.opts.fail)
                    .always(animation.opts.always);
            }

            //驼峰化属性名，扩展特殊属性比如padding, borderWidth...
            function propFilter(props, specialEasing) {
                var value, name, index, easing, expanded;

                for (index in props) {
                    name = toCamelCase(index);
                    easing = specialEasing[name];
                    value = props[index];
                    if (baidu.isArray(value)) {
                        easing = value[1];
                        value = props[index] = value[0];
                    }

                    if (index !== name) {
                        props[name] = value;
                        delete props[index];
                    }

                    expanded = propExpand(name, value);
                    if (expanded) {
                        value = expanded;
                        delete props[name];
                        for (index in value) {
                            if (!(index in props)) {
                                props[index] = value[index];
                                specialEasing[index] = easing;
                            }
                        }
                    } else {
                        specialEasing[name] = easing;
                    }
                }
            }

            fx.Animation = baidu.extend(Animation, {

                tweener: function(props, callback) {
                    if (baidu.isFunction(props)) {
                        callback = props;
                        props = ["*"];
                    } else {
                        props = props.split(" ");
                    }

                    var prop,
                        index = 0,
                        length = props.length;

                    for (; index < length; index++) {
                        prop = props[index];
                        tweeners[prop] = tweeners[prop] || [];
                        tweeners[prop].unshift(callback);
                    }
                },

                prefilter: function(callback, prepend) {
                    if (prepend) {
                        animationPrefilters.unshift(callback);
                    } else {
                        animationPrefilters.push(callback);
                    }
                }
            });


            function defaultPrefilter(elem, props, opts) {

                var prop, index, length,
                    value, dataShow, toggle,
                    tween, hooks, oldfire,
                    anim = this,
                    style = elem.style,
                    orig = {},
                    handled = [],
                    hidden = elem.nodeType && isHidden(elem),
                    support = baidu._util_.support;

                // handle queue: false promises
                if (!opts.queue) {
                    hooks = baidu._queueHooks(elem, "fx");
                    if (hooks.unqueued == null) {
                        hooks.unqueued = 0;
                        oldfire = hooks.empty.fire;
                        hooks.empty.fire = function() {
                            if (!hooks.unqueued) {
                                oldfire();
                            }
                        };
                    }
                    hooks.unqueued++;

                    anim.always(function() {
                        // doing this makes sure that the complete handler will be called
                        // before this completes
                        anim.always(function() {
                            hooks.unqueued--;
                            if (!baidu.queue(elem, "fx").length) {
                                hooks.empty.fire();
                            }
                        });
                    });
                }

                // height/width overflow pass
                if (elem.nodeType === 1 && ("height" in props || "width" in props)) {
                    // Make sure that nothing sneaks out
                    // Record all 3 overflow attributes because IE does not
                    // change the overflow attribute when overflowX and
                    // overflowY are set to the same value
                    opts.overflow = [style.overflow, style.overflowX, style.overflowY];

                    // Set display property to inline-block for height/width
                    // animations on inline elements that are having width/height animated
                    if (css(elem, "display") === "inline" &&
                        css(elem, "float") === "none") {

                        style.display = "inline-block";

                        // inline-level elements accept inline-block;
                        // block-level elements need to be inline with layout
                        if (!support.inlineBlockNeedsLayout) {
                            style.display = "inline-block";
                        } else {
                            style.zoom = 1;
                        }
                    }
                }


                if (opts.overflow) {
                    style.overflow = "hidden";
                    if (!support.shrinkWrapBlocks) {
                        anim.always(function() {
                            style.overflow = opts.overflow[0];
                            style.overflowX = opts.overflow[1];
                            style.overflowY = opts.overflow[2];
                        });
                    }
                }
                // show/hide pass
                for (index in props) {
                    value = props[index];
                    if (rfxtypes.exec(value)) {
                        delete props[index];
                        toggle = toggle || value === "toggle";
                        if (value === (hidden ? "hide" : "show")) {
                            continue;
                        }
                        handled.push(index);
                    }
                }

                length = handled.length;
                if (length) {
                    dataShow = data(elem, "fxshow");
                    dataShow || data(elem, "fxshow", dataShow = {});
                    if ("hidden" in dataShow) {
                        hidden = dataShow.hidden;
                    }

                    // store state if its toggle - enables .stop().toggle() to "reverse"
                    if (toggle) {
                        dataShow.hidden = !hidden;
                    }
                    if (hidden) {
                        baidu.dom(elem).show();
                    } else {
                        anim.done(function() {
                            baidu.dom(elem).hide();
                        });
                    }
                    anim.done(function() {
                        var prop;
                        data(elem, "fxshow", null);
                        for (prop in orig) {
                            css(elem, prop, orig[prop]);
                        }
                    });
                    for (index = 0; index < length; index++) {
                        prop = handled[index];
                        tween = anim.createTween(prop, hidden ? dataShow[prop] : 0);
                        orig[prop] = dataShow[prop] || css(elem, prop);

                        if (!(prop in dataShow)) {
                            dataShow[prop] = tween.start;
                            if (hidden) {
                                tween.end = tween.start;
                                tween.start = prop === "width" || prop === "height" ? 1 : 0;
                            }
                        }
                    }
                }
            }

        })();


        (function() {
            var fx = baidu.fx,
                Animation = fx.Animation,
                data = baidu.dom.data,
                speeds = {
                    slow: 600,
                    fast: 200,
                    // Default speed
                    _default: 400
                };

            function isEmptyObject(obj) {
                var name;
                for (name in obj) {
                    return false;
                }
                return true;
            }

            function parseOpt(speed, easing, fn) {
                var opt = speed && typeof speed === "object" ? baidu.extend({}, speed) : {
                    complete: fn || !fn && easing ||
                        baidu.isFunction(speed) && speed,
                    duration: speed,
                    easing: fn && easing || easing && !baidu.isFunction(easing) && easing
                };

                opt.duration = fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
                    opt.duration in speeds ? speeds[opt.duration] : speeds._default;

                // normalize opt.queue - true/undefined/null -> "fx"
                if (opt.queue == null || opt.queue === true) {
                    opt.queue = "fx";
                }

                // Queueing
                opt.old = opt.complete;

                opt.complete = function() {
                    if (baidu.isFunction(opt.old)) {
                        opt.old.call(this);
                    }

                    if (opt.queue) {
                        baidu.dequeue(this, opt.queue);
                    }
                };

                return opt;
            };

            baidu.plugin('dom', {
                animate: function(prop, speed, easing, callback) {
                    var empty = isEmptyObject(prop),
                        opt = parseOpt(speed, easing, callback),
                        doAnimation = function() {
                            // Operate on a copy of prop so per-property easing won't be lost
                            var anim = Animation(this, baidu.extend({}, prop), opt);
                            doAnimation.finish = function() {
                                anim.stop(true);
                            };
                            // Empty animations, or finishing resolves immediately
                            if (empty || data(this, "finish")) {
                                anim.stop(true);
                            }
                        };
                    doAnimation.finish = doAnimation;

                    return empty || opt.queue === false ?
                        this.each(doAnimation) :
                        this.queue(opt.queue, doAnimation);
                }
            });

            //expose
            baidu.extend(fx, {
                speeds: speeds,
                off: false
            })
        })();

        (function() {
            var fx = baidu.fx,
                helper = baidu.plugin._util_.fx,
                rrun = /queueHooks$/,
                getAllData = helper.getAllData;

            baidu.plugin("dom", {
                stop: function(type, clearQueue, gotoEnd) {
                    var stopQueue = function(hooks) {
                        var stop = hooks.stop;
                        delete hooks.stop;
                        stop(gotoEnd);
                    };

                    if (typeof type !== "string") {
                        gotoEnd = clearQueue;
                        clearQueue = type;
                        type = undefined;
                    }
                    if (clearQueue && type !== false) {
                        this.queue(type || "fx", []);
                    }

                    return this.each(function() {
                        var dequeue = true,
                            index = type != null && type + "queueHooks",
                            timers = fx.timer(),
                            data = getAllData(this);

                        if (index) {
                            if (data[index] && data[index].stop) {
                                stopQueue(data[index]);
                            }
                        } else {
                            for (index in data) {
                                if (data[index] && data[index].stop && rrun.test(index)) {
                                    stopQueue(data[index]);
                                }
                            }
                        }

                        for (index = timers.length; index--;) {
                            if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
                                timers[index].anim.stop(gotoEnd);
                                dequeue = false;
                                timers.splice(index, 1);
                            }
                        }

                        // start the next in the queue if the last step wasn't forced
                        // timers currently will call their complete callbacks, which will dequeue
                        // but only if they were gotoEnd
                        if (dequeue || !gotoEnd) {
                            baidu.dequeue(this, type);
                        }
                    });
                }
            });
        })();

        // 包装animate 模块结束
    }()

    /*
     * 使用sizzle选择器
     * by songxin
     * date: 2014-09-02
     */

    void

    function(window, undefined) {


        //在用户选择使用 Sizzle 时会被覆盖原有简化版本的baidu.query方法

        baidu.query = function(selector, context, results) {
            return baidu.merge(results || [], baidu.sizzle(selector, context));
        };

        var document = window.document,
            docElem = document.documentElement,

            expando = "sizcache" + (Math.random() + '').replace('.', ''),
            done = 0,

            toString = Object.prototype.toString,
            strundefined = "undefined",

            hasDuplicate = false,
            baseHasDuplicate = true,

            // Regex
            rquickExpr = /^#([\w\-]+$)|^(\w+$)|^\.([\w\-]+$)/,
            chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,

            rbackslash = /\\/g,
            rnonWord = /\W/,
            rstartsWithWord = /^\w/,
            rnonDigit = /\D/,
            rnth = /(-?)(\d*)(?:n([+\-]?\d*))?/,
            radjacent = /^\+|\s*/g,
            rheader = /h\d/i,
            rinputs = /input|select|textarea|button/i,
            rtnfr = /[\t\n\f\r]/g,

            characterEncoding = "(?:[-\\w]|[^\\x00-\\xa0]|\\\\.)",
            matchExpr = {
                ID: new RegExp("#(" + characterEncoding + "+)"),
                CLASS: new RegExp("\\.(" + characterEncoding + "+)"),
                NAME: new RegExp("\\[name=['\"]*(" + characterEncoding + "+)['\"]*\\]"),
                TAG: new RegExp("^(" + characterEncoding.replace("[-", "[-\\*") + "+)"),
                ATTR: new RegExp("\\[\\s*(" + characterEncoding + "+)\\s*(?:(\\S?=)\\s*(?:(['\"])(.*?)\\3|(#?" + characterEncoding + "*)|)|)\\s*\\]"),
                PSEUDO: new RegExp(":(" + characterEncoding + "+)(?:\\((['\"]?)((?:\\([^\\)]+\\)|[^\\(\\)]*)+)\\2\\))?"),
                CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
                POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/
            },

            origPOS = matchExpr.POS,

            leftMatchExpr = (function() {
                var type,
                    // Increments parenthetical references
                    // for leftMatch creation
                    fescape = function(all, num) {
                        return "\\" + (num - 0 + 1);
                    },
                    leftMatch = {};

                for (type in matchExpr) {
                    // Modify the regexes ensuring the matches do not end in brackets/parens
                    matchExpr[type] = new RegExp(matchExpr[type].source + (/(?![^\[]*\])(?![^\(]*\))/.source));
                    // Adds a capture group for characters left of the match
                    leftMatch[type] = new RegExp(/(^(?:.|\r|\n)*?)/.source + matchExpr[type].source.replace(/\\(\d+)/g, fescape));
                }

                // Expose origPOS
                // "global" as in regardless of relation to brackets/parens
                matchExpr.globalPOS = origPOS;

                return leftMatch;
            })(),

            // Used for testing something on an element
            assert = function(fn) {
                var pass = false,
                    div = document.createElement("div");
                try {
                    pass = fn(div);
                } catch (e) {}
                // release memory in IE
                div = null;
                return pass;
            },

            // Check to see if the browser returns elements by name when
            // querying by getElementById (and provide a workaround)
            assertGetIdNotName = assert(function(div) {
                var pass = true,
                    id = "script" + (new Date()).getTime();
                div.innerHTML = "<a name ='" + id + "'/>";

                // Inject it into the root element, check its status, and remove it quickly
                docElem.insertBefore(div, docElem.firstChild);

                if (document.getElementById(id)) {
                    pass = false;
                }
                docElem.removeChild(div);
                return pass;
            }),

            // Check to see if the browser returns only elements
            // when doing getElementsByTagName("*")
            assertTagNameNoComments = assert(function(div) {
                div.appendChild(document.createComment(""));
                return div.getElementsByTagName("*").length === 0;
            }),

            // Check to see if an attribute returns normalized href attributes
            assertHrefNotNormalized = assert(function(div) {
                div.innerHTML = "<a href='#'></a>";
                return div.firstChild && typeof div.firstChild.getAttribute !== strundefined &&
                    div.firstChild.getAttribute("href") === "#";
            }),

            // Determines a buggy getElementsByClassName
            assertUsableClassName = assert(function(div) {
                // Opera can't find a second classname (in 9.6)
                div.innerHTML = "<div class='test e'></div><div class='test'></div>";
                if (!div.getElementsByClassName || div.getElementsByClassName("e").length === 0) {
                    return false;
                }

                // Safari caches class attributes, doesn't catch changes (in 3.2)
                div.lastChild.className = "e";
                return div.getElementsByClassName("e").length !== 1;
            });


        // Check if the JavaScript engine is using some sort of
        // optimization where it does not always call our comparision
        // function. If that is the case, discard the hasDuplicate value.
        //   Thus far that includes Google Chrome.
        [0, 0].sort(function() {
            baseHasDuplicate = false;
            return 0;
        });

        var Sizzle = function(selector, context, results) {
            results = results || [];
            context = context || document;
            var match, elem, contextXML,
                nodeType = context.nodeType;

            if (nodeType !== 1 && nodeType !== 9) {
                return [];
            }

            if (!selector || typeof selector !== "string") {
                return results;
            } else {
                selector = baidu.string(selector).trim();
                if (!selector) {
                    return results;
                };
            }

            contextXML = isXML(context);

            if (!contextXML) {
                if ((match = rquickExpr.exec(selector))) {
                    // Speed-up: Sizzle("#ID")
                    if (match[1]) {
                        if (nodeType === 9) {
                            elem = context.getElementById(match[1]);
                            // Check parentNode to catch when Blackberry 4.6 returns
                            // nodes that are no longer in the document #6963
                            if (elem && elem.parentNode) {
                                // Handle the case where IE, Opera, and Webkit return items
                                // by name instead of ID
                                if (elem.id === match[1]) {
                                    return makeArray([elem], results);
                                }
                            } else {
                                return makeArray([], results);
                            }
                        } else {
                            // Context is not a document
                            if (context.ownerDocument && (elem = context.ownerDocument.getElementById(match[1])) &&
                                contains(context, elem) && elem.id === match[1]) {
                                return makeArray([elem], results);
                            }
                        }

                        // Speed-up: Sizzle("TAG")
                    } else if (match[2]) {
                        // Speed-up: Sizzle("body")
                        if (selector === "body" && context.body) {
                            return makeArray([context.body], results);
                        }
                        return makeArray(context.getElementsByTagName(selector), results);
                        // Speed-up: Sizzle(".CLASS")
                    } else if (assertUsableClassName && match[3] && context.getElementsByClassName) {
                        return makeArray(context.getElementsByClassName(match[3]), results);
                    }
                }
            }

            // All others
            return select(selector, context, results, undefined, contextXML);
        };

        var select = function(selector, context, results, seed, contextXML) {
            var m, set, checkSet, extra, ret, cur, pop, i,
                origContext = context,
                prune = true,
                parts = [],
                soFar = selector;

            do {
                // Reset the position of the chunker regexp (start from head)
                chunker.exec("");
                m = chunker.exec(soFar);

                if (m) {
                    soFar = m[3];

                    parts.push(m[1]);

                    if (m[2]) {
                        extra = m[3];
                        break;
                    }
                }
            } while (m);

            if (parts.length > 1 && origPOS.exec(selector)) {

                if (parts.length === 2 && Expr.relative[parts[0]]) {
                    set = posProcess(parts[0] + parts[1], context, seed, contextXML);

                } else {
                    set = Expr.relative[parts[0]] ? [context] :
                        Sizzle(parts.shift(), context);

                    while (parts.length) {
                        selector = parts.shift();

                        if (Expr.relative[selector]) {
                            selector += parts.shift();
                        }

                        set = posProcess(selector, set, seed, contextXML);
                    }
                }

            } else {
                // Take a shortcut and set the context if the root selector is an ID
                // (but not if it'll be faster if the inner selector is an ID)
                if (!seed && parts.length > 1 && context.nodeType === 9 && !contextXML &&
                    matchExpr.ID.test(parts[0]) && !matchExpr.ID.test(parts[parts.length - 1])) {

                    ret = find(parts.shift(), context, contextXML);
                    context = ret.expr ?
                        filter(ret.expr, ret.set)[0] :
                        ret.set[0];
                }

                if (context) {
                    ret = seed ? {
                            expr: parts.pop(),
                            set: makeArray(seed)
                        } :
                        find(parts.pop(), (parts.length >= 1 && (parts[0] === "~" || parts[0] === "+") && context.parentNode) || context, contextXML);

                    set = ret.expr ?
                        filter(ret.expr, ret.set) :
                        ret.set;

                    if (parts.length > 0) {
                        checkSet = makeArray(set);

                    } else {
                        prune = false;
                    }

                    while (parts.length) {
                        cur = parts.pop();
                        pop = cur;

                        if (!Expr.relative[cur]) {
                            cur = "";
                        } else {
                            pop = parts.pop();
                        }

                        if (pop == null) {
                            pop = context;
                        }

                        Expr.relative[cur](checkSet, pop, contextXML);
                    }

                } else {
                    checkSet = parts = [];
                }
            }

            if (!checkSet) {
                checkSet = set;
            }

            if (!checkSet) {
                error(cur || selector);
            }

            if (toString.call(checkSet) === "[object Array]") {
                if (!prune) {
                    results.push.apply(results, checkSet);

                } else if (context && context.nodeType === 1) {
                    for (i = 0; checkSet[i] != null; i++) {
                        if (checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && contains(context, checkSet[i]))) {
                            results.push(set[i]);
                        }
                    }

                } else {
                    for (i = 0; checkSet[i] != null; i++) {
                        if (checkSet[i] && checkSet[i].nodeType === 1) {
                            results.push(set[i]);
                        }
                    }
                }

            } else {
                makeArray(checkSet, results);
            }

            if (extra) {
                select(extra, origContext, results, seed, contextXML);
                uniqueSort(results);
            }

            return results;
        };

        var isXML = baidu._util_.isXML;
        //var isXML = Sizzle.isXML = function( elem ) {
        //    // documentElement is verified for cases where it doesn't yet exist
        //    // (such as loading iframes in IE - #4833)
        //    var documentElement = (elem ? elem.ownerDocument || elem : 0).documentElement;
        //    return documentElement ? documentElement.nodeName !== "HTML" : false;
        //};

        // Slice is no longer used
        // It is not actually faster
        // Results is expected to be an array or undefined
        // typeof len is checked for if array is a form nodelist containing an element with name "length" (wow)
        //var makeArray = function( array, results ) {
        //    results = results || [];
        //    var i = 0,
        //        len = array.length;
        //    if ( typeof len === "number" ) {
        //        for ( ; i < len; i++ ) {
        //            results.push( array[i] );
        //        }
        //    } else {
        //        for ( ; array[i]; i++ ) {
        //            results.push( array[i] );
        //        }
        //    }
        //    return results;
        //};
        var makeArray = baidu.makeArray;

        var uniqueSort = function(results) {
            if (sortOrder) {
                hasDuplicate = baseHasDuplicate;
                results.sort(sortOrder);

                if (hasDuplicate) {
                    for (var i = 1; i < results.length; i++) {
                        if (results[i] === results[i - 1]) {
                            results.splice(i--, 1);
                        }
                    }
                }
            }

            return results;
        };

        // Element contains another
        //var contains = Sizzle.contains = docElem.compareDocumentPosition ?
        //    function( a, b ) {
        //        return !!(a.compareDocumentPosition( b ) & 16);
        //    } :
        //    docElem.contains ?
        //    function( a, b ) {
        //        return a !== b && ( a.contains ? a.contains( b ) : false );
        //    } :
        //    function( a, b ) {
        //        while ( (b = b.parentNode) ) {
        //            if ( b === a ) {
        //                return true;
        //            }
        //        }
        //        return false;
        //    };
        var contains = baidu._util_.contains;


        // Sizzle.matchesSelector = function( node, expr ) {
        //     return select( expr, document, [], [ node ], isXML( document ) ).length > 0;
        // };

        var find = function(expr, context, contextXML) {
            var set, i, len, match, type, left;

            if (!expr) {
                return [];
            }

            for (i = 0, len = Expr.order.length; i < len; i++) {
                type = Expr.order[i];

                if ((match = leftMatchExpr[type].exec(expr))) {
                    left = match[1];
                    match.splice(1, 1);

                    if (left.substr(left.length - 1) !== "\\") {
                        match[1] = (match[1] || "").replace(rbackslash, "");
                        set = Expr.find[type](match, context, contextXML);

                        if (set != null) {
                            expr = expr.replace(matchExpr[type], "");
                            break;
                        }
                    }
                }
            }

            if (!set) {
                set = typeof context.getElementsByTagName !== strundefined ?
                    context.getElementsByTagName("*") : [];
            }

            return {
                set: set,
                expr: expr
            };
        };

        var filter = function(expr, set, inplace, not) {
            var match, anyFound,
                type, found, item, filter, left,
                i, pass,
                old = expr,
                result = [],
                curLoop = set,
                isXMLFilter = set && set[0] && isXML(set[0]);

            while (expr && set.length) {
                for (type in Expr.filter) {
                    if ((match = leftMatchExpr[type].exec(expr)) != null && match[2]) {
                        filter = Expr.filter[type];
                        left = match[1];

                        anyFound = false;

                        match.splice(1, 1);

                        if (left.substr(left.length - 1) === "\\") {
                            continue;
                        }

                        if (curLoop === result) {
                            result = [];
                        }

                        if (Expr.preFilter[type]) {
                            match = Expr.preFilter[type](match, curLoop, inplace, result, not, isXMLFilter);

                            if (!match) {
                                anyFound = found = true;

                            } else if (match === true) {
                                continue;
                            }
                        }

                        if (match) {
                            for (i = 0;
                                (item = curLoop[i]) != null; i++) {
                                if (item) {
                                    found = filter(item, match, i, curLoop);
                                    pass = not ^ found;

                                    if (inplace && found != null) {
                                        if (pass) {
                                            anyFound = true;

                                        } else {
                                            curLoop[i] = false;
                                        }

                                    } else if (pass) {
                                        result.push(item);
                                        anyFound = true;
                                    }
                                }
                            }
                        }

                        if (found !== undefined) {
                            if (!inplace) {
                                curLoop = result;
                            }

                            expr = expr.replace(matchExpr[type], "");

                            if (!anyFound) {
                                return [];
                            }

                            break;
                        }
                    }
                }

                // Improper expression
                if (expr === old) {
                    if (anyFound == null) {
                        error(expr);

                    } else {
                        break;
                    }
                }

                old = expr;
            }

            return curLoop;
        };

        var error = function(msg) {
            throw new Error(msg);
        };


        var getText = function(elem) {
            var i, node,
                nodeType = elem.nodeType,
                ret = "";

            if (nodeType) {
                if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
                    // Use textContent for elements
                    // innerText usage removed for consistency of new lines (see #11153)
                    if (typeof elem.textContent === "string") {
                        return elem.textContent;
                    } else {
                        // Traverse it's children
                        for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                            ret += getText(elem);
                        }
                    }
                } else if (nodeType === 3 || nodeType === 4) {
                    return elem.nodeValue;
                }
            } else {

                // If no nodeType, this is expected to be an array
                for (i = 0;
                    (node = elem[i]); i++) {
                    // Do not traverse comment nodes
                    if (node.nodeType !== 8) {
                        ret += getText(node);
                    }
                }
            }
            return ret;
        };

        var Expr = {

            match: matchExpr,
            leftMatch: leftMatchExpr,

            order: ["ID", "NAME", "TAG"],

            attrMap: {
                "class": "className",
                "for": "htmlFor"
            },

            attrHandle: {
                href: assertHrefNotNormalized ?
                    function(elem) {
                        return elem.getAttribute("href");
                    } : function(elem) {
                        return elem.getAttribute("href", 2);
                    },
                type: function(elem) {
                    return elem.getAttribute("type");
                }
            },

            relative: {
                "+": function(checkSet, part) {
                    var isPartStr = typeof part === "string",
                        isTag = isPartStr && !rnonWord.test(part),
                        isPartStrNotTag = isPartStr && !isTag;

                    if (isTag) {
                        part = part.toLowerCase();
                    }

                    for (var i = 0, l = checkSet.length, elem; i < l; i++) {
                        if ((elem = checkSet[i])) {
                            while ((elem = elem.previousSibling) && elem.nodeType !== 1) {}

                            checkSet[i] = isPartStrNotTag || elem && elem.nodeName.toLowerCase() === part ?
                                elem || false :
                                elem === part;
                        }
                    }

                    if (isPartStrNotTag) {
                        filter(part, checkSet, true);
                    }
                },

                ">": function(checkSet, part) {
                    var elem,
                        isPartStr = typeof part === "string",
                        i = 0,
                        l = checkSet.length;

                    if (isPartStr && !rnonWord.test(part)) {
                        part = part.toLowerCase();

                        for (; i < l; i++) {
                            elem = checkSet[i];

                            if (elem) {
                                var parent = elem.parentNode;
                                checkSet[i] = parent.nodeName.toLowerCase() === part ? parent : false;
                            }
                        }

                    } else {
                        for (; i < l; i++) {
                            elem = checkSet[i];

                            if (elem) {
                                checkSet[i] = isPartStr ?
                                    elem.parentNode :
                                    elem.parentNode === part;
                            }
                        }

                        if (isPartStr) {
                            filter(part, checkSet, true);
                        }
                    }
                },

                "": function(checkSet, part, xml) {
                    dirCheck("parentNode", checkSet, part, xml);
                },

                "~": function(checkSet, part, xml) {
                    dirCheck("previousSibling", checkSet, part, xml);
                }
            },

            find: {
                ID: assertGetIdNotName ?
                    function(match, context, xml) {
                        if (typeof context.getElementById !== strundefined && !xml) {
                            var m = context.getElementById(match[1]);
                            // Check parentNode to catch when Blackberry 4.6 returns
                            // nodes that are no longer in the document #6963
                            return m && m.parentNode ? [m] : [];
                        }
                    } : function(match, context, xml) {
                        if (typeof context.getElementById !== strundefined && !xml) {
                            var m = context.getElementById(match[1]);

                            return m ?
                                m.id === match[1] || typeof m.getAttributeNode !== strundefined && m.getAttributeNode("id").nodeValue === match[1] ? [m] :
                                undefined : [];
                        }
                    },

                NAME: function(match, context) {
                    if (typeof context.getElementsByName !== strundefined) {
                        var ret = [],
                            results = context.getElementsByName(match[1]),
                            i = 0,
                            len = results.length;

                        for (; i < len; i++) {
                            if (results[i].getAttribute("name") === match[1]) {
                                ret.push(results[i]);
                            }
                        }

                        return ret.length === 0 ? null : ret;
                    }
                },

                TAG: assertTagNameNoComments ?
                    function(match, context) {
                        if (typeof context.getElementsByTagName !== strundefined) {
                            return context.getElementsByTagName(match[1]);
                        }
                    } : function(match, context) {
                        var results = context.getElementsByTagName(match[1]);

                        // Filter out possible comments
                        if (match[1] === "*") {
                            var tmp = [],
                                i = 0;

                            for (; results[i]; i++) {
                                if (results[i].nodeType === 1) {
                                    tmp.push(results[i]);
                                }
                            }

                            results = tmp;
                        }
                        return results;
                    }
            },

            preFilter: {
                CLASS: function(match, curLoop, inplace, result, not, xml) {
                    match = " " + match[1].replace(rbackslash, "") + " ";

                    if (xml) {
                        return match;
                    }

                    for (var i = 0, elem;
                        (elem = curLoop[i]) != null; i++) {
                        if (elem) {
                            if (not ^ (elem.className && ~(" " + elem.className + " ").replace(rtnfr, " ").indexOf(match))) {
                                if (!inplace) {
                                    result.push(elem);
                                }

                            } else if (inplace) {
                                curLoop[i] = false;
                            }
                        }
                    }

                    return false;
                },

                ID: function(match) {
                    return match[1].replace(rbackslash, "");
                },

                TAG: function(match, curLoop) {
                    return match[1].replace(rbackslash, "").toLowerCase();
                },

                CHILD: function(match) {
                    if (match[1] === "nth") {
                        if (!match[2]) {
                            error(match[0]);
                        }

                        match[2] = match[2].replace(radjacent, "");

                        // parse equations like 'even', 'odd', '5', '2n', '3n+2', '4n-1', '-n+6'
                        var test = rnth.exec(
                            match[2] === "even" && "2n" || match[2] === "odd" && "2n+1" ||
                            !rnonDigit.test(match[2]) && "0n+" + match[2] || match[2]);

                        // calculate the numbers (first)n+(last) including if they are negative
                        match[2] = (test[1] + (test[2] || 1)) - 0;
                        match[3] = test[3] - 0;
                    } else if (match[2]) {
                        error(match[0]);
                    }

                    // TODO: Move to normal caching system
                    match[0] = done++;

                    return match;
                },

                ATTR: function(match, curLoop, inplace, result, not, xml) {
                    var name = match[1] = match[1].replace(rbackslash, "");

                    if (!xml && Expr.attrMap[name]) {
                        match[1] = Expr.attrMap[name];
                    }

                    // Handle if an un-quoted value was used
                    match[4] = (match[4] || match[5] || "").replace(rbackslash, "");

                    if (match[2] === "~=") {
                        match[4] = " " + match[4] + " ";
                    }

                    return match;
                },

                PSEUDO: function(match, curLoop, inplace, result, not, xml) {
                    if (match[1] === "not") {
                        // If we're dealing with a complex expression, or a simple one
                        if ((chunker.exec(match[3]) || "").length > 1 || rstartsWithWord.test(match[3])) {
                            match[3] = select(match[3], document, [], curLoop, xml);

                        } else {
                            var ret = filter(match[3], curLoop, inplace, !not);

                            if (!inplace) {
                                result.push.apply(result, ret);
                            }

                            return false;
                        }

                    } else if (matchExpr.POS.test(match[0]) || matchExpr.CHILD.test(match[0])) {
                        return true;
                    }

                    return match;
                },

                POS: function(match) {
                    match.unshift(true);

                    return match;
                }
            },

            filters: {
                enabled: function(elem) {
                    return elem.disabled === false;
                },

                disabled: function(elem) {
                    return elem.disabled === true;
                },

                checked: function(elem) {
                    // In CSS3, :checked should return both checked and selected elements
                    // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                    var nodeName = elem.nodeName.toLowerCase();
                    return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
                },

                selected: function(elem) {
                    // Accessing this property makes selected-by-default
                    // options in Safari work properly
                    if (elem.parentNode) {
                        elem.parentNode.selectedIndex;
                    }

                    return elem.selected === true;
                },

                parent: function(elem) {
                    return !!elem.firstChild;
                },

                empty: function(elem) {
                    return !elem.firstChild;
                },

                has: function(elem, i, match) {
                    return !!Sizzle(match[3], elem).length;
                },

                header: function(elem) {
                    return rheader.test(elem.nodeName);
                },

                text: function(elem) {
                    var attr = elem.getAttribute("type"),
                        type = elem.type;
                    // IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
                    // use getAttribute instead to test this case
                    return elem.nodeName.toLowerCase() === "input" && "text" === type && (attr === null || attr.toLowerCase() === type);
                },

                radio: function(elem) {
                    return elem.nodeName.toLowerCase() === "input" && "radio" === elem.type;
                },

                checkbox: function(elem) {
                    return elem.nodeName.toLowerCase() === "input" && "checkbox" === elem.type;
                },

                file: function(elem) {
                    return elem.nodeName.toLowerCase() === "input" && "file" === elem.type;
                },

                password: function(elem) {
                    return elem.nodeName.toLowerCase() === "input" && "password" === elem.type;
                },

                submit: function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return (name === "input" || name === "button") && "submit" === elem.type;
                },

                image: function(elem) {
                    return elem.nodeName.toLowerCase() === "input" && "image" === elem.type;
                },

                reset: function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return (name === "input" || name === "button") && "reset" === elem.type;
                },

                button: function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return name === "input" && "button" === elem.type || name === "button";
                },

                input: function(elem) {
                    return rinputs.test(elem.nodeName);
                },

                focus: function(elem) {
                    var doc = elem.ownerDocument;
                    return elem === doc.activeElement && (!doc.hasFocus || doc.hasFocus()) && !!(elem.type || elem.href);
                },

                active: function(elem) {
                    return elem === elem.ownerDocument.activeElement;
                },

                contains: function(elem, i, match) {
                    return (elem.textContent || elem.innerText || getText(elem)).indexOf(match[3]) >= 0;
                }
            },

            setFilters: {
                first: function(elem, i) {
                    return i === 0;
                },

                last: function(elem, i, match, array) {
                    return i === array.length - 1;
                },

                even: function(elem, i) {
                    return i % 2 === 0;
                },

                odd: function(elem, i) {
                    return i % 2 === 1;
                },

                lt: function(elem, i, match) {
                    return i < match[3] - 0;
                },

                gt: function(elem, i, match) {
                    return i > match[3] - 0;
                },

                nth: function(elem, i, match) {
                    return match[3] - 0 === i;
                },

                eq: function(elem, i, match) {
                    return match[3] - 0 === i;
                }
            },

            filter: {
                PSEUDO: function(elem, match, i, array) {
                    var name = match[1],
                        filter = Expr.filters[name];

                    if (filter) {
                        return filter(elem, i, match, array);

                    } else if (name === "not") {
                        var not = match[3],
                            j = 0,
                            len = not.length;

                        for (; j < len; j++) {
                            if (not[j] === elem) {
                                return false;
                            }
                        }

                        return true;

                    } else {
                        error(name);
                    }
                },

                CHILD: function(elem, match) {
                    var first, last,
                        doneName, parent, cache,
                        count, diff,
                        type = match[1],
                        node = elem;

                    switch (type) {
                        case "only":
                        case "first":
                            while ((node = node.previousSibling)) {
                                if (node.nodeType === 1) {
                                    return false;
                                }
                            }

                            if (type === "first") {
                                return true;
                            }

                            node = elem;


                        case "last":
                            while ((node = node.nextSibling)) {
                                if (node.nodeType === 1) {
                                    return false;
                                }
                            }

                            return true;

                        case "nth":
                            first = match[2];
                            last = match[3];

                            if (first === 1 && last === 0) {
                                return true;
                            }

                            doneName = match[0];
                            parent = elem.parentNode;

                            if (parent && (parent[expando] !== doneName || !elem.nodeIndex)) {
                                count = 0;

                                for (node = parent.firstChild; node; node = node.nextSibling) {
                                    if (node.nodeType === 1) {
                                        node.nodeIndex = ++count;
                                    }
                                }

                                parent[expando] = doneName;
                            }

                            diff = elem.nodeIndex - last;

                            if (first === 0) {
                                return diff === 0;

                            } else {
                                return (diff % first === 0 && diff / first >= 0);
                            }
                    }
                },

                ID: assertGetIdNotName ?
                    function(elem, match) {
                        return elem.nodeType === 1 && elem.getAttribute("id") === match;
                    } : function(elem, match) {
                        var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
                        return elem.nodeType === 1 && node && node.nodeValue === match;
                    },

                TAG: function(elem, match) {
                    return (match === "*" && elem.nodeType === 1) || !!elem.nodeName && elem.nodeName.toLowerCase() === match;
                },

                CLASS: function(elem, match) {
                    return (" " + (elem.className || elem.getAttribute("class")) + " ").indexOf(match) > -1;
                },

                ATTR: function(elem, match) {
                    var name = match[1],
                        result = Expr.attrHandle[name] ?
                        Expr.attrHandle[name](elem) :
                        elem[name] != null ?
                        elem[name] :
                        elem.getAttribute(name),
                        value = result + "",
                        type = match[2],
                        check = match[4];

                    return result == null ?
                        type === "!=" :
                        // !type && Sizzle.attr ?
                        // result != null :
                        type === "=" ?
                        value === check :
                        type === "*=" ?
                        value.indexOf(check) >= 0 :
                        type === "~=" ?
                        (" " + value + " ").indexOf(check) >= 0 :
                        !check ?
                        value && result !== false :
                        type === "!=" ?
                        value !== check :
                        type === "^=" ?
                        value.indexOf(check) === 0 :
                        type === "$=" ?
                        value.substr(value.length - check.length) === check :
                        type === "|=" ?
                        value === check || value.substr(0, check.length + 1) === check + "-" :
                        false;
                },

                POS: function(elem, match, i, array) {
                    var name = match[2],
                        filter = Expr.setFilters[name];

                    if (filter) {
                        return filter(elem, i, match, array);
                    }
                }
            }
        };

        // Add getElementsByClassName if usable
        if (assertUsableClassName) {
            Expr.order.splice(1, 0, "CLASS");
            Expr.find.CLASS = function(match, context, xml) {
                if (typeof context.getElementsByClassName !== strundefined && !xml) {
                    return context.getElementsByClassName(match[1]);
                }
            };
        }

        var sortOrder, siblingCheck;

        if (docElem.compareDocumentPosition) {
            sortOrder = function(a, b) {
                if (a === b) {
                    hasDuplicate = true;
                    return 0;
                }

                if (!a.compareDocumentPosition || !b.compareDocumentPosition) {
                    return a.compareDocumentPosition ? -1 : 1;
                }

                return a.compareDocumentPosition(b) & 4 ? -1 : 1;
            };

        } else {
            sortOrder = function(a, b) {
                // The nodes are identical, we can exit early
                if (a === b) {
                    hasDuplicate = true;
                    return 0;

                    // Fallback to using sourceIndex (in IE) if it's available on both nodes
                } else if (a.sourceIndex && b.sourceIndex) {
                    return a.sourceIndex - b.sourceIndex;
                }

                var al, bl,
                    ap = [],
                    bp = [],
                    aup = a.parentNode,
                    bup = b.parentNode,
                    cur = aup;

                // If the nodes are siblings (or identical) we can do a quick check
                if (aup === bup) {
                    return siblingCheck(a, b);

                    // If no parents were found then the nodes are disconnected
                } else if (!aup) {
                    return -1;

                } else if (!bup) {
                    return 1;
                }

                // Otherwise they're somewhere else in the tree so we need
                // to build up a full list of the parentNodes for comparison
                while (cur) {
                    ap.unshift(cur);
                    cur = cur.parentNode;
                }

                cur = bup;

                while (cur) {
                    bp.unshift(cur);
                    cur = cur.parentNode;
                }

                al = ap.length;
                bl = bp.length;

                // Start walking down the tree looking for a discrepancy
                for (var i = 0; i < al && i < bl; i++) {
                    if (ap[i] !== bp[i]) {
                        return siblingCheck(ap[i], bp[i]);
                    }
                }

                // We ended someplace up the tree so do a sibling check
                return i === al ?
                    siblingCheck(a, bp[i], -1) :
                    siblingCheck(ap[i], b, 1);
            };

            siblingCheck = function(a, b, ret) {
                if (a === b) {
                    return ret;
                }

                var cur = a.nextSibling;

                while (cur) {
                    if (cur === b) {
                        return -1;
                    }

                    cur = cur.nextSibling;
                }

                return 1;
            };
        }

        if (document.querySelectorAll) {
            (function() {
                var oldSelect = select,
                    id = "__sizzle__",
                    rrelativeHierarchy = /^\s*[+~]/,
                    rapostrophe = /'/g,
                    // Build QSA regex
                    // Regex strategy adopted from Diego Perini
                    rbuggyQSA = [];

                assert(function(div) {
                    div.innerHTML = "<select><option selected></option></select>";

                    // IE8 - Some boolean attributes are not treated correctly
                    if (!div.querySelectorAll("[selected]").length) {
                        rbuggyQSA.push("\\[[\\x20\\t\\n\\r\\f]*(?:checked|disabled|ismap|multiple|readonly|selected|value)");
                    }

                    // Webkit/Opera - :checked should return selected option elements
                    // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                    // IE8 throws error here (do not put tests after this one)
                    if (!div.querySelectorAll(":checked").length) {
                        rbuggyQSA.push(":checked");
                    }
                });

                assert(function(div) {

                    // Opera 10/IE - ^= $= *= and empty values
                    div.innerHTML = "<p class=''></p>";
                    // Should not select anything
                    if (div.querySelectorAll("[class^='']").length) {
                        rbuggyQSA.push("[*^$]=[\\x20\\t\\n\\r\\f]*(?:\"\"|'')");
                    }

                    // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
                    // IE8 throws error here (do not put tests after this one)
                    div.innerHTML = "<input type='hidden'>";
                    if (!div.querySelectorAll(":enabled").length) {
                        rbuggyQSA.push(":enabled", ":disabled");
                    }
                });

                rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));

                select = function(selector, context, results, seed, contextXML) {
                    // Only use querySelectorAll when not filtering,
                    // when this is not xml,
                    // and when no QSA bugs apply
                    if (!seed && !contextXML && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
                        if (context.nodeType === 9) {
                            try {
                                return makeArray(context.querySelectorAll(selector), results);
                            } catch (qsaError) {}
                            // qSA works strangely on Element-rooted queries
                            // We can work around this by specifying an extra ID on the root
                            // and working up from there (Thanks to Andrew Dupont for the technique)
                            // IE 8 doesn't work on object elements
                        } else if (context.nodeType === 1 && context.nodeName.toLowerCase() !== "object") {
                            var oldContext = context,
                                old = context.getAttribute("id"),
                                nid = old || id,
                                parent = context.parentNode,
                                relativeHierarchySelector = rrelativeHierarchy.test(selector);

                            if (!old) {
                                context.setAttribute("id", nid);
                            } else {
                                nid = nid.replace(rapostrophe, "\\$&");
                            }
                            if (relativeHierarchySelector && parent) {
                                context = parent;
                            }

                            try {
                                if (!relativeHierarchySelector || parent) {
                                    return makeArray(context.querySelectorAll("[id='" + nid + "'] " + selector), results);
                                }
                            } catch (qsaError) {} finally {
                                if (!old) {
                                    oldContext.removeAttribute("id");
                                }
                            }
                        }
                    }

                    return oldSelect(selector, context, results, seed, contextXML);
                };
            })();
        }

        function dirCheck(dir, checkSet, part, xml) {
            var elem, match, isElem, nodeCheck,
                doneName = done++,
                i = 0,
                len = checkSet.length;

            if (typeof part === "string" && !rnonWord.test(part)) {
                part = part.toLowerCase();
                nodeCheck = part;
            }

            for (; i < len; i++) {
                elem = checkSet[i];

                if (elem) {
                    match = false;
                    elem = elem[dir];

                    while (elem) {
                        if (elem[expando] === doneName) {
                            match = checkSet[elem.sizset];
                            break;
                        }

                        isElem = elem.nodeType === 1;
                        if (isElem && !xml) {
                            elem[expando] = doneName;
                            elem.sizset = i;
                        }

                        if (nodeCheck) {
                            if (elem.nodeName.toLowerCase() === part) {
                                match = elem;
                                break;
                            }
                        } else if (isElem) {
                            if (typeof part !== "string") {
                                if (elem === part) {
                                    match = true;
                                    break;
                                }

                            } else if (filter(part, [elem]).length > 0) {
                                match = elem;
                                break;
                            }
                        }

                        elem = elem[dir];
                    }

                    checkSet[i] = match;
                }
            }
        }

        var posProcess = function(selector, context, seed, contextXML) {
            var match,
                tmpSet = [],
                later = "",
                root = context.nodeType ? [context] : context,
                i = 0,
                len = root.length;

            // Position selectors must be done after the filter
            // And so must :not(positional) so we move all PSEUDOs to the end
            while ((match = matchExpr.PSEUDO.exec(selector))) {
                later += match[0];
                selector = selector.replace(matchExpr.PSEUDO, "");
            }

            if (Expr.relative[selector]) {
                selector += "*";
            }

            for (; i < len; i++) {
                select(selector, root[i], tmpSet, seed, contextXML);
            }

            return filter(later, tmpSet);
        };

        // EXPOSE

        window.Sizzle = baidu.sizzle = Sizzle;
        baidu.query.matches = function(expr, set) {
            return select(expr, document, [], set, isXML(document));
        };

    }(window);

    /************************* patch end *****************/

    window.T = window.$ = window.baidu = baidu;

    // window.baidu = window.baidu || {};
    baidu.template = baidu.template || {};

    //HTML转义
    baidu.template._encodeHTML = function(source) {
        return String(source)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\\/g, '&#92;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    };

    //转义UI UI变量使用在HTML页面标签onclick等事件函数参数中
    baidu.template._encodeEventHTML = function(source) {
        return String(source)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/\\\\/g, '\\')
            .replace(/\\\//g, '\/')
            .replace(/\\n/g, '\n')
            .replace(/\\r/g, '\r');
    };

    T.supportCss3 = function(style) {
        var prefix = ['webkit', 'Moz', 'ms', 'o'],
            i,
            humpString = [],
            htmlStyle = document.documentElement.style,
            _toHumb = function(string) {
                return string.replace(/-(\w)/g, function($0, $1) {
                    return $1.toUpperCase();
                });
            };

        for (i in prefix)
            humpString.push(_toHumb(prefix[i] + '-' + style));

        humpString.push(_toHumb(style));

        for (i in humpString)
            if (humpString[i] in htmlStyle) return true;

        return false;
    };

    T.whichTransitionEvent = function() {
        var t;
        var el = document.createElement('fakeelement');
        var transitions = {
            'transition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'MozTransition': 'transitionend',
            'WebkitTransition': 'webkitTransitionEnd',
            'MsTransition': 'msTransitionEnd'
        }

        for (t in transitions) {
            if (el.style[t] !== undefined) {
                return transitions[t];
            }
        }
    };

    T.check_os = function() {
        windows = (navigator.userAgent.indexOf("Windows", 0) != -1) ? 1 : 0;
        mac = (navigator.userAgent.indexOf("mac", 0) != -1) ? 1 : 0;
        linux = (navigator.userAgent.indexOf("Linux", 0) != -1) ? 1 : 0;
        unix = (navigator.userAgent.indexOf("X11", 0) != -1) ? 1 : 0;

        if (windows) os_type = "MS Windows";
        else if (mac) os_type = "Apple mac";
        else if (linux) os_type = "Lunix";
        else if (unix) os_type = "Unix";

        return os_type;
    };

    // 兼容详情页中，加载三端统一数据源组件使用的zepto库
    // 将zepto库映射为tangram
    if (typeof define === 'function' && define.amd) {
        define('zepto', [], function() {
            return baidu;
        });
    }
    window.Zepto = baidu;

    module.exports = baidu;

});;
define("common:widget/ui/stat/statCode.js", function(_, T, A) {
    var S = {
        STAT_PANEL_SELECT: 30,
        STAT_MAP_SELECT: 31,
        STAT_GR_ITEM_CLICK: 65,
        STAT_GR_MARKER_CLICK: 66,
        STAT_STRONG_ALL: 222,
        STAT_USER_BEHAVIOUR_MINMING: 553,
        STAT_POI_ONXQ: 743,
        STAT_FAV_IW_BTN: 6029,
        STAT_FAV_LIST_BTN: 6030,
        STAT_SHOUJI_SEND: 7505,
        STAT_PANO_DAY_PV: 1e4,
        STAT_PANO_LIST_CLICK: 10001,
        STAT_PANO_INFO_CLICK: 10002,
        STAT_PANO_LABEL_CLICK: 10003,
        STAT_PANO_PRE_SWITCH: 10004,
        STAT_PANO_PRE_CLOSE: 10005,
        STAT_PANO_PRE_OPEN: 10006,
        STAT_PANO_FULL_SCREEN: 10007,
        STAT_PANO_PRE_DRAG: 10008,
        STAT_PANO_PRE_ZOOM: 10009,
        STAT_PANO_PARTNER_CLICK: 10010,
        STAT_PANO_TOP_BANNER_CLICK: 10011,
        STAT_PANO_TOP_BANNER_OPEN: 10012,
        STAT_PANO_SELECT_CITY: 10013,
        STAT_STREETVIEW: 10070,
        STAT_PANORAMA: 10071,
        STAT_FATHERSON_CLICK: 10081
    };
    window.STAT_CODE = S, A.exports = S
});;
define("common:widget/ui/init/init.js", function(e, i, t) {
    function n() {
        h.addEventListener("click", function() {
            M.blur()
        })
    }
    var a = e("common:widget/ui/config/config.js"),
        o = e("common:widget/ui/indexUtil/IndexUtil.js"),
        r = e("common:widget/ui/mapRevert/MapRevert.js"),
        d = e("common:widget/ui/card/cardMgr.js"),
        s = e("common:widget/ui/userMgr/userMgr.js"),
        c = e("common:widget/ui/urlManager/urlManager.js"),
        m = e("common:widget/ui/urlQueryProcessor/UrlQueryProcessor.js"),
        f = e("common:widget/ui/util/util.js"),
        u = e("common:widget/ui/userCenter/userCenterMgr.js"),
        g = e("common:widget/ui/messageCenter/messageCenter.js"),
        l = e("common:widget/ui/operateMediator/operateMediator.js"),
        p = e("common:widget/ui/poiListMgr/poiListMgr.js"),
        w = a.modelConfig,
        h = window.map,
        v = e("common:widget/ui/ui3Tools/ui3Tools.js"),
        M = e("common:widget/ui/searchBox/searchBox.js"),
        x = e("common:widget/route/setMyPlace/ui3SetMyPlacePop.js"),
        y = e("common:widget/ui/fav/favMgr.js"),
        S = e("common:widget/ui/searchHistory/hisMgr.js"),
        b = {
            init: function() {
                if (n(), this.setConfig(), this.setStatus(), this.initOpMediator(), addStat("index.index.uv", "show"), addStat("index.index.uvonline", "show"), MapLogReport && "function" == typeof MapLogReport.send && MapLogReport.send({
                        da_src: "pcmapIndexPG.PGshow"
                    }), addStat("map." + h.getRenderType() + ".display", "show", {
                        da_e_name: "pcmapearth"
                    }), !T.browser.ie) {
                    var e = this.checkPageZoom();
                    e();
                    window.addEventListener("resize", function() {
                        e()
                    })
                }
            },
            checkPageZoom: function() {
                function e() {
                    i.removeClass("active"), setTimeout(function() {
                        i.css("zoom", "1")
                    }, 400)
                }
                var i = $("#map-bottom-tip"),
                    t = i.find("span");
                t.text(/macintosh/gi.test(navigator.userAgent) ? "享受最佳体验，请将浏览器设置为默认缩放级别。（command+0）" : "享受最佳体验，请将浏览器设置为默认缩放级别。（Ctrl+0）");
                var n;
                return i.find(".map-tip-close").click(function() {
                        e()
                    }),
                    function() {
                        var t = window.outerWidth / window.innerWidth;
                        if (clearTimeout(n), .85 > t || window.devicePixelRatio < .85) {
                            var a = Math.min(t, window.devicePixelRatio),
                                o = 1 / a;
                            i.css("zoom", o).addClass("active"), n = setTimeout(function() {
                                e()
                            }, 5e3)
                        } else e()
                    }
            },
            initOpMediator: function() {
                l.init()
            },
            setStatus: function() {
                s.init(function() {
                    var e = Math.round(1e5 * Math.random());
                    T.cookie.set("validate", e, {
                        path: "/"
                    }), y.init(), x.bundle().sync(), S.init(), addStat("index.index.login", "show");
                    var i = {
                        qt: "deviceInfoNew",
                        t: +new Date
                    };
                    T.ajax("/?" + T.ajax.param(i), {
                        cache: !1,
                        dataType: "json",
                        success: function(e) {
                            0 === e.status && e && e.data && e.data.devices && e.data.devices.length && addStat("index.index.hasdevice", "show")
                        }
                    })
                }, function() {
                    y.offline(), x.bundle().addAllPlace(), S.offline()
                }), g.init(!0), d.initialize(), u.init(), M.initialize(), v.init(), r.init(), m.processUrlQuery(), m.handleUrlExt(), c.init(), e.async(["common:widget/ui/loadCtrls/LoadCtrls.js"], function(e) {
                    e.init()
                }), p.init()
            },
            setConfig: function() {
                if (null != window._OLR) {
                    var e = baidu.json.parse(window._OLR.index) || {},
                        i = e.content;
                    1 !== i.city_type && "" !== i.city_type && (w.cityType = i.city_type), w.cityCode = i.code, w.cityName = i.cname, w.defalutCityCode = i.code, w.defalutCityName = i.cname, w.sup = i.sup;
                    var t = w.cityCode;
                    o.isSupportStreetView(t) && addStat(STAT_CODE.STAT_PANORAMA, {
                        catalog: "pano-city-visit",
                        from: t
                    }), addStat(STAT_CODE.STAT_PANORAMA, {
                        catalog: "city-visit",
                        from: t
                    })
                }
                new BMap.Label("shadow");
                h.temp.toolsElement = []
            },
            createScenic3dMarker: function() {
                function i(e) {
                    return e = e.toLowerCase(), d.indexOf(e) >= 0 ? !0 : e.indexOf("mobile") >= 0 ? !0 : !1
                }

                function t(e) {
                    e = e.toLowerCase();
                    for (var i = 0; i < s.length; i++)
                        if (e.indexOf(s[i]) >= 0) return !0;
                    return !1
                }

                function n(e) {
                    return e ? i(e) ? !1 : t(e) ? !0 : !1 : !1
                }

                function a() {
                    if (!window.WebGLRenderingContext) return !1;
                    window.navigator.userAgent;
                    if (T.browser.ie) return !1;
                    var e = document.createElement("canvas");
                    e.width = 300, e.height = 150;
                    var i = null,
                        t = {
                            alpha: !1,
                            antialias: !1,
                            failIfMajorPerformanceCaveat: !0,
                            preserveDrawingBuffer: !1,
                            stencil: !1
                        };
                    try {
                        i = e.getContext("webgl", t) || e.getContext("experimental-webgl", t)
                    } catch (o) {
                        return !1
                    }
                    if (null === i) return !1;
                    var r = !1,
                        d = i.getExtension("WEBGL_debug_renderer_info");
                    if (d) {
                        var s = i.getParameter(d.UNMASKED_RENDERER_WEBGL);
                        n(s) === !0 && (r = !0);
                        var c = i.getParameter(d.UNMASKED_VENDOR_WEBGL);
                        a._renderer = s, a._vendor = c
                    }!d && T.browser.firefox && (r = !0);
                    var m = /macintosh/i.test(window.navigator.userAgent);
                    return !d && m && (r = !0), (i.drawingBufferWidth !== e.width || i.drawingBufferHeight !== e.height) && (r = !1), i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS) < 4 && (r = !1), i.getParameter(i.MAX_TEXTURE_SIZE) < 4096 && (r = !1), (!i.getShaderPrecisionFormat || i.getShaderPrecisionFormat(i.FRAGMENT_SHADER, i.HIGH_FLOAT).precision < 23) && (r = !1), r
                }

                function o() {
                    for (var i = h.temp.scenic3dPoints, t = [55, 132], n = 0; n < i.length; n++) {
                        var a = i[n],
                            o = window.devicePixelRatio || 1,
                            r = o >= 1.5 ? "//webmap1.bdimg.com/wolfman/static/common/images/scenic3d/poi-marker-2x_b474bb0.png" : "//webmap0.bdimg.com/wolfman/static/common/images/scenic3d/poi-marker-1x_6c0d381.png",
                            d = new BMap.Icon(r, new BMap.Size(a.width, a.height), {
                                imageSize: new BMap.Size(t[0], t[1]),
                                imageOffset: new BMap.Size(a.imageOffsetX, a.imageOffsetY),
                                anchor: new BMap.Size(a.offsetX, a.offsetY),
                                infoWindowOffset: new BMap.Size(a.width / 2, 3)
                            }),
                            s = new BMap.Point(a.lng, a.lat),
                            m = new BMap.Marker(s, {
                                enableMassClear: !1
                            });
                        m.setIcon(d), m.markerInfo = a, m.addEventListener("click", function() {
                            var i = e("poidetail:widget/libs/poiDetailMgr/poiDetailMgr.js"),
                                t = this,
                                n = this.markerInfo;
                            i.create({
                                uid: n.uid,
                                info_merge: 1
                            }).then(function(e) {
                                {
                                    var i = e.poiDetailCard;
                                    e.data
                                }
                                f.loadSearchSimpleInfo(function(e) {
                                    var a = {
                                            name: n.name
                                        },
                                        o = e.createCommonInfoWindow(a, {
                                            x: n.lng,
                                            y: n.lat,
                                            uid: n.uid
                                        });
                                    e.openSearchInfoWndPOI(o, t), o && i.setInfoWindow(o)
                                })
                            }, function() {})
                        }), c.push(m)
                    }
                    return c
                }

                function r() {
                    var e = h.getZoom();
                    if (e >= 14)
                        for (var i = 0; i < c.length; i++) c[i].isHideZoomend || h.addOverlay(c[i]);
                    else
                        for (var i = 0; i < c.length; i++) h.removeOverlay(c[i])
                }
                var d = ["swiftshader", "microsoft basic render driver"],
                    s = ["intel", "nvidia", "amd", "apple", "geforce"],
                    c = [];
                h.temp.ifSupportWebGL = a(), h.temp.ifSupportWebGL && (h.temp.scenic3dPoints = [{
                    name: "清晖园",
                    className: "qinghuiyuan",
                    uid: "546f387ceea8a352902ca346",
                    height: 38,
                    width: 51,
                    imageOffsetX: -2,
                    imageOffsetY: -3,
                    offsetX: 33,
                    offsetY: 19,
                    lng: 12608402.38,
                    lat: 2596154.89,
                    href: "/scenic3d/index.html?id=qinghuiyuan"
                }, {
                    name: "华桂园",
                    className: "huaguiyuan",
                    uid: "251374c95b65c526a11de91e",
                    height: 37,
                    width: 47,
                    imageOffsetX: -4,
                    imageOffsetY: -47,
                    offsetX: 36,
                    offsetY: 18,
                    lng: 12612015.61,
                    lat: 2593664.67,
                    href: "/scenic3d/index.html?id=huaguiyuan"
                }, {
                    name: "世纪莲体育馆",
                    className: "shijilian",
                    uid: "666e6f3a2b15ba1c8a36ee5b",
                    height: 35,
                    width: 47,
                    imageOffsetX: -4,
                    imageOffsetY: -92,
                    offsetX: 34,
                    offsetY: 17,
                    lng: 12593290.86,
                    lat: 2611923.92,
                    href: "/scenic3d/index.html?id=shijiliantiyuzhongxin"
                }], h.temp.scenic3dMarkers = o(), r(), h.addEventListener("zoomend", function() {
                    r()
                }), h.addEventListener("load", function() {
                    r()
                }), h.addEventListener("onmaptypechange", function(e) {
                    for (var i = 0; i < c.length; i++) "B_EARTH_MAP" === e.mapType ? c[i].hide() : c[i].show()
                }), listener.on("toScenic3DPage", "click", function(e, i) {
                    for (var t = i.uid, n = "", a = h.temp.scenic3dPoints, o = 0; o < a.length; o++)
                        if (t === a[o].uid) {
                            n = a[o].href;
                            break
                        }
                    "" !== n && ($("iframe#scenic3d-iframe").size() && $("iframe#scenic3d-iframe").remove(), n += "&frommap=1", $(document.body).append('<iframe src="' + n + '"id="scenic3d-iframe" width="100%" height="100%"style="border: none;position: absolute; top: 0px; z-index: 1000001;"/>'))
                }))
            }
        };
    t.exports = b
});;
var QRCode;
! function() {
    function t(t) {
        this.mode = u.MODE_8BIT_BYTE, this.data = t, this.parsedData = [];
        for (var e = [], r = 0, o = this.data.length; o > r; r++) {
            var n = this.data.charCodeAt(r);
            n > 65536 ? (e[0] = 240 | (1835008 & n) >>> 18, e[1] = 128 | (258048 & n) >>> 12, e[2] = 128 | (4032 & n) >>> 6, e[3] = 128 | 63 & n) : n > 2048 ? (e[0] = 224 | (61440 & n) >>> 12, e[1] = 128 | (4032 & n) >>> 6, e[2] = 128 | 63 & n) : n > 128 ? (e[0] = 192 | (1984 & n) >>> 6, e[1] = 128 | 63 & n) : e[0] = n, this.parsedData = this.parsedData.concat(e)
        }
        this.parsedData.length != this.data.length && (this.parsedData.unshift(191), this.parsedData.unshift(187), this.parsedData.unshift(239))
    }

    function e(t, e) {
        this.typeNumber = t, this.errorCorrectLevel = e, this.modules = null, this.moduleCount = 0, this.dataCache = null, this.dataList = []
    }

    function r(t, e) {
        if (void 0 == t.length) throw new Error(t.length + "/" + e);
        for (var r = 0; r < t.length && 0 == t[r];) r++;
        this.num = new Array(t.length - r + e);
        for (var o = 0; o < t.length - r; o++) this.num[o] = t[o + r]
    }

    function o(t, e) {
        this.totalCount = t, this.dataCount = e
    }

    function n() {
        this.buffer = [], this.length = 0
    }

    function i() {
        return "undefined" != typeof CanvasRenderingContext2D
    }

    function a() {
        var t = !1,
            e = navigator.userAgent;
        return /android/i.test(e) && (t = !0, aMat = e.toString().match(/android ([0-9]\.[0-9])/i), aMat && aMat[1] && (t = parseFloat(aMat[1]))), t
    }

    function s(t, e) {
        for (var r = 1, o = h(t), n = 0, i = p.length; i >= n; n++) {
            var a = 0;
            switch (e) {
                case l.L:
                    a = p[n][0];
                    break;
                case l.M:
                    a = p[n][1];
                    break;
                case l.Q:
                    a = p[n][2];
                    break;
                case l.H:
                    a = p[n][3]
            }
            if (a >= o) break;
            r++
        }
        if (r > p.length) throw new Error("Too long data");
        return r
    }

    function h(t) {
        var e = encodeURI(t).toString().replace(/\%[0-9a-fA-F]{2}/g, "a");
        return e.length + (e.length != t ? 3 : 0)
    }
    try {
        t.prototype = {
            getLength: function() {
                return this.parsedData.length
            },
            write: function(t) {
                for (var e = 0, r = this.parsedData.length; r > e; e++) t.put(this.parsedData[e], 8)
            }
        }, e.prototype = {
            addData: function(e) {
                var r = new t(e);
                this.dataList.push(r), this.dataCache = null
            },
            isDark: function(t, e) {
                if (0 > t || this.moduleCount <= t || 0 > e || this.moduleCount <= e) throw new Error(t + "," + e);
                return this.modules[t][e]
            },
            getModuleCount: function() {
                return this.moduleCount
            },
            make: function() {
                this.makeImpl(!1, this.getBestMaskPattern())
            },
            makeImpl: function(t, r) {
                this.moduleCount = 4 * this.typeNumber + 17, this.modules = new Array(this.moduleCount);
                for (var o = 0; o < this.moduleCount; o++) {
                    this.modules[o] = new Array(this.moduleCount);
                    for (var n = 0; n < this.moduleCount; n++) this.modules[o][n] = null
                }
                this.setupPositionProbePattern(0, 0), this.setupPositionProbePattern(this.moduleCount - 7, 0), this.setupPositionProbePattern(0, this.moduleCount - 7), this.setupPositionAdjustPattern(), this.setupTimingPattern(), this.setupTypeInfo(t, r), this.typeNumber >= 7 && this.setupTypeNumber(t), null == this.dataCache && (this.dataCache = e.createData(this.typeNumber, this.errorCorrectLevel, this.dataList)), this.mapData(this.dataCache, r)
            },
            setupPositionProbePattern: function(t, e) {
                for (var r = -1; 7 >= r; r++)
                    if (!(-1 >= t + r || this.moduleCount <= t + r))
                        for (var o = -1; 7 >= o; o++) - 1 >= e + o || this.moduleCount <= e + o || (this.modules[t + r][e + o] = r >= 0 && 6 >= r && (0 == o || 6 == o) || o >= 0 && 6 >= o && (0 == r || 6 == r) || r >= 2 && 4 >= r && o >= 2 && 4 >= o ? !0 : !1)
            },
            getBestMaskPattern: function() {
                for (var t = 0, e = 0, r = 0; 8 > r; r++) {
                    this.makeImpl(!0, r);
                    var o = f.getLostPoint(this);
                    (0 == r || t > o) && (t = o, e = r)
                }
                return e
            },
            createMovieClip: function(t, e, r) {
                var o = t.createEmptyMovieClip(e, r),
                    n = 1;
                this.make();
                for (var i = 0; i < this.modules.length; i++)
                    for (var a = i * n, s = 0; s < this.modules[i].length; s++) {
                        var h = s * n,
                            u = this.modules[i][s];
                        u && (o.beginFill(0, 100), o.moveTo(h, a), o.lineTo(h + n, a), o.lineTo(h + n, a + n), o.lineTo(h, a + n), o.endFill())
                    }
                return o
            },
            setupTimingPattern: function() {
                for (var t = 8; t < this.moduleCount - 8; t++) null == this.modules[t][6] && (this.modules[t][6] = 0 == t % 2);
                for (var e = 8; e < this.moduleCount - 8; e++) null == this.modules[6][e] && (this.modules[6][e] = 0 == e % 2)
            },
            setupPositionAdjustPattern: function() {
                for (var t = f.getPatternPosition(this.typeNumber), e = 0; e < t.length; e++)
                    for (var r = 0; r < t.length; r++) {
                        var o = t[e],
                            n = t[r];
                        if (null == this.modules[o][n])
                            for (var i = -2; 2 >= i; i++)
                                for (var a = -2; 2 >= a; a++) this.modules[o + i][n + a] = -2 == i || 2 == i || -2 == a || 2 == a || 0 == i && 0 == a ? !0 : !1
                    }
            },
            setupTypeNumber: function(t) {
                for (var e = f.getBCHTypeNumber(this.typeNumber), r = 0; 18 > r; r++) {
                    var o = !t && 1 == (1 & e >> r);
                    this.modules[Math.floor(r / 3)][r % 3 + this.moduleCount - 8 - 3] = o
                }
                for (var r = 0; 18 > r; r++) {
                    var o = !t && 1 == (1 & e >> r);
                    this.modules[r % 3 + this.moduleCount - 8 - 3][Math.floor(r / 3)] = o
                }
            },
            setupTypeInfo: function(t, e) {
                for (var r = this.errorCorrectLevel << 3 | e, o = f.getBCHTypeInfo(r), n = 0; 15 > n; n++) {
                    var i = !t && 1 == (1 & o >> n);
                    6 > n ? this.modules[n][8] = i : 8 > n ? this.modules[n + 1][8] = i : this.modules[this.moduleCount - 15 + n][8] = i
                }
                for (var n = 0; 15 > n; n++) {
                    var i = !t && 1 == (1 & o >> n);
                    8 > n ? this.modules[8][this.moduleCount - n - 1] = i : 9 > n ? this.modules[8][15 - n - 1 + 1] = i : this.modules[8][15 - n - 1] = i
                }
                this.modules[this.moduleCount - 8][8] = !t
            },
            mapData: function(t, e) {
                for (var r = -1, o = this.moduleCount - 1, n = 7, i = 0, a = this.moduleCount - 1; a > 0; a -= 2)
                    for (6 == a && a--;;) {
                        for (var s = 0; 2 > s; s++)
                            if (null == this.modules[o][a - s]) {
                                var h = !1;
                                i < t.length && (h = 1 == (1 & t[i] >>> n));
                                var u = f.getMask(e, o, a - s);
                                u && (h = !h), this.modules[o][a - s] = h, n--, -1 == n && (i++, n = 7)
                            }
                        if (o += r, 0 > o || this.moduleCount <= o) {
                            o -= r, r = -r;
                            break
                        }
                    }
            }
        }, e.PAD0 = 236, e.PAD1 = 17, e.createData = function(t, r, i) {
            for (var a = o.getRSBlocks(t, r), s = new n, h = 0; h < i.length; h++) {
                var u = i[h];
                s.put(u.mode, 4), s.put(u.getLength(), f.getLengthInBits(u.mode, t)), u.write(s)
            }
            for (var l = 0, h = 0; h < a.length; h++) l += a[h].dataCount;
            if (s.getLengthInBits() > 8 * l) throw new Error("code length overflow. (" + s.getLengthInBits() + ">" + 8 * l + ")");
            for (s.getLengthInBits() + 4 <= 8 * l && s.put(0, 4); 0 != s.getLengthInBits() % 8;) s.putBit(!1);
            for (; !(s.getLengthInBits() >= 8 * l) && (s.put(e.PAD0, 8), !(s.getLengthInBits() >= 8 * l));) s.put(e.PAD1, 8);
            return e.createBytes(s, a)
        }, e.createBytes = function(t, e) {
            for (var o = 0, n = 0, i = 0, a = new Array(e.length), s = new Array(e.length), h = 0; h < e.length; h++) {
                var u = e[h].dataCount,
                    l = e[h].totalCount - u;
                n = Math.max(n, u), i = Math.max(i, l), a[h] = new Array(u);
                for (var g = 0; g < a[h].length; g++) a[h][g] = 255 & t.buffer[g + o];
                o += u;
                var d = f.getErrorCorrectPolynomial(l),
                    c = new r(a[h], d.getLength() - 1),
                    p = c.mod(d);
                s[h] = new Array(d.getLength() - 1);
                for (var g = 0; g < s[h].length; g++) {
                    var m = g + p.getLength() - s[h].length;
                    s[h][g] = m >= 0 ? p.get(m) : 0
                }
            }
            for (var v = 0, g = 0; g < e.length; g++) v += e[g].totalCount;
            for (var _ = new Array(v), C = 0, g = 0; n > g; g++)
                for (var h = 0; h < e.length; h++) g < a[h].length && (_[C++] = a[h][g]);
            for (var g = 0; i > g; g++)
                for (var h = 0; h < e.length; h++) g < s[h].length && (_[C++] = s[h][g]);
            return _
        };
        for (var u = {
                MODE_NUMBER: 1,
                MODE_ALPHA_NUM: 2,
                MODE_8BIT_BYTE: 4,
                MODE_KANJI: 8
            }, l = {
                L: 1,
                M: 0,
                Q: 3,
                H: 2
            }, g = {
                PATTERN000: 0,
                PATTERN001: 1,
                PATTERN010: 2,
                PATTERN011: 3,
                PATTERN100: 4,
                PATTERN101: 5,
                PATTERN110: 6,
                PATTERN111: 7
            }, f = {
                PATTERN_POSITION_TABLE: [
                    [],
                    [6, 18],
                    [6, 22],
                    [6, 26],
                    [6, 30],
                    [6, 34],
                    [6, 22, 38],
                    [6, 24, 42],
                    [6, 26, 46],
                    [6, 28, 50],
                    [6, 30, 54],
                    [6, 32, 58],
                    [6, 34, 62],
                    [6, 26, 46, 66],
                    [6, 26, 48, 70],
                    [6, 26, 50, 74],
                    [6, 30, 54, 78],
                    [6, 30, 56, 82],
                    [6, 30, 58, 86],
                    [6, 34, 62, 90],
                    [6, 28, 50, 72, 94],
                    [6, 26, 50, 74, 98],
                    [6, 30, 54, 78, 102],
                    [6, 28, 54, 80, 106],
                    [6, 32, 58, 84, 110],
                    [6, 30, 58, 86, 114],
                    [6, 34, 62, 90, 118],
                    [6, 26, 50, 74, 98, 122],
                    [6, 30, 54, 78, 102, 126],
                    [6, 26, 52, 78, 104, 130],
                    [6, 30, 56, 82, 108, 134],
                    [6, 34, 60, 86, 112, 138],
                    [6, 30, 58, 86, 114, 142],
                    [6, 34, 62, 90, 118, 146],
                    [6, 30, 54, 78, 102, 126, 150],
                    [6, 24, 50, 76, 102, 128, 154],
                    [6, 28, 54, 80, 106, 132, 158],
                    [6, 32, 58, 84, 110, 136, 162],
                    [6, 26, 54, 82, 110, 138, 166],
                    [6, 30, 58, 86, 114, 142, 170]
                ],
                G15: 1335,
                G18: 7973,
                G15_MASK: 21522,
                getBCHTypeInfo: function(t) {
                    for (var e = t << 10; f.getBCHDigit(e) - f.getBCHDigit(f.G15) >= 0;) e ^= f.G15 << f.getBCHDigit(e) - f.getBCHDigit(f.G15);
                    return (t << 10 | e) ^ f.G15_MASK
                },
                getBCHTypeNumber: function(t) {
                    for (var e = t << 12; f.getBCHDigit(e) - f.getBCHDigit(f.G18) >= 0;) e ^= f.G18 << f.getBCHDigit(e) - f.getBCHDigit(f.G18);
                    return t << 12 | e
                },
                getBCHDigit: function(t) {
                    for (var e = 0; 0 != t;) e++, t >>>= 1;
                    return e
                },
                getPatternPosition: function(t) {
                    return f.PATTERN_POSITION_TABLE[t - 1]
                },
                getMask: function(t, e, r) {
                    switch (t) {
                        case g.PATTERN000:
                            return 0 == (e + r) % 2;
                        case g.PATTERN001:
                            return 0 == e % 2;
                        case g.PATTERN010:
                            return 0 == r % 3;
                        case g.PATTERN011:
                            return 0 == (e + r) % 3;
                        case g.PATTERN100:
                            return 0 == (Math.floor(e / 2) + Math.floor(r / 3)) % 2;
                        case g.PATTERN101:
                            return 0 == e * r % 2 + e * r % 3;
                        case g.PATTERN110:
                            return 0 == (e * r % 2 + e * r % 3) % 2;
                        case g.PATTERN111:
                            return 0 == (e * r % 3 + (e + r) % 2) % 2;
                        default:
                            throw new Error("bad maskPattern:" + t)
                    }
                },
                getErrorCorrectPolynomial: function(t) {
                    for (var e = new r([1], 0), o = 0; t > o; o++) e = e.multiply(new r([1, d.gexp(o)], 0));
                    return e
                },
                getLengthInBits: function(t, e) {
                    if (e >= 1 && 10 > e) switch (t) {
                        case u.MODE_NUMBER:
                            return 10;
                        case u.MODE_ALPHA_NUM:
                            return 9;
                        case u.MODE_8BIT_BYTE:
                            return 8;
                        case u.MODE_KANJI:
                            return 8;
                        default:
                            throw new Error("mode:" + t)
                    } else if (27 > e) switch (t) {
                        case u.MODE_NUMBER:
                            return 12;
                        case u.MODE_ALPHA_NUM:
                            return 11;
                        case u.MODE_8BIT_BYTE:
                            return 16;
                        case u.MODE_KANJI:
                            return 10;
                        default:
                            throw new Error("mode:" + t)
                    } else {
                        if (!(41 > e)) throw new Error("type:" + e);
                        switch (t) {
                            case u.MODE_NUMBER:
                                return 14;
                            case u.MODE_ALPHA_NUM:
                                return 13;
                            case u.MODE_8BIT_BYTE:
                                return 16;
                            case u.MODE_KANJI:
                                return 12;
                            default:
                                throw new Error("mode:" + t)
                        }
                    }
                },
                getLostPoint: function(t) {
                    for (var e = t.getModuleCount(), r = 0, o = 0; e > o; o++)
                        for (var n = 0; e > n; n++) {
                            for (var i = 0, a = t.isDark(o, n), s = -1; 1 >= s; s++)
                                if (!(0 > o + s || o + s >= e))
                                    for (var h = -1; 1 >= h; h++) 0 > n + h || n + h >= e || (0 != s || 0 != h) && a == t.isDark(o + s, n + h) && i++;
                            i > 5 && (r += 3 + i - 5)
                        }
                    for (var o = 0; e - 1 > o; o++)
                        for (var n = 0; e - 1 > n; n++) {
                            var u = 0;
                            t.isDark(o, n) && u++, t.isDark(o + 1, n) && u++, t.isDark(o, n + 1) && u++, t.isDark(o + 1, n + 1) && u++, (0 == u || 4 == u) && (r += 3)
                        }
                    for (var o = 0; e > o; o++)
                        for (var n = 0; e - 6 > n; n++) t.isDark(o, n) && !t.isDark(o, n + 1) && t.isDark(o, n + 2) && t.isDark(o, n + 3) && t.isDark(o, n + 4) && !t.isDark(o, n + 5) && t.isDark(o, n + 6) && (r += 40);
                    for (var n = 0; e > n; n++)
                        for (var o = 0; e - 6 > o; o++) t.isDark(o, n) && !t.isDark(o + 1, n) && t.isDark(o + 2, n) && t.isDark(o + 3, n) && t.isDark(o + 4, n) && !t.isDark(o + 5, n) && t.isDark(o + 6, n) && (r += 40);
                    for (var l = 0, n = 0; e > n; n++)
                        for (var o = 0; e > o; o++) t.isDark(o, n) && l++;
                    var g = Math.abs(100 * l / e / e - 50) / 5;
                    return r += 10 * g
                }
            }, d = {
                glog: function(t) {
                    if (1 > t) throw new Error("glog(" + t + ")");
                    return d.LOG_TABLE[t]
                },
                gexp: function(t) {
                    for (; 0 > t;) t += 255;
                    for (; t >= 256;) t -= 255;
                    return d.EXP_TABLE[t]
                },
                EXP_TABLE: new Array(256),
                LOG_TABLE: new Array(256)
            }, c = 0; 8 > c; c++) d.EXP_TABLE[c] = 1 << c;
        for (var c = 8; 256 > c; c++) d.EXP_TABLE[c] = d.EXP_TABLE[c - 4] ^ d.EXP_TABLE[c - 5] ^ d.EXP_TABLE[c - 6] ^ d.EXP_TABLE[c - 8];
        for (var c = 0; 255 > c; c++) d.LOG_TABLE[d.EXP_TABLE[c]] = c;
        r.prototype = {
            get: function(t) {
                return this.num[t]
            },
            getLength: function() {
                return this.num.length
            },
            multiply: function(t) {
                for (var e = new Array(this.getLength() + t.getLength() - 1), o = 0; o < this.getLength(); o++)
                    for (var n = 0; n < t.getLength(); n++) e[o + n] ^= d.gexp(d.glog(this.get(o)) + d.glog(t.get(n)));
                return new r(e, 0)
            },
            mod: function(t) {
                if (this.getLength() - t.getLength() < 0) return this;
                for (var e = d.glog(this.get(0)) - d.glog(t.get(0)), o = new Array(this.getLength()), n = 0; n < this.getLength(); n++) o[n] = this.get(n);
                for (var n = 0; n < t.getLength(); n++) o[n] ^= d.gexp(d.glog(t.get(n)) + e);
                return new r(o, 0).mod(t)
            }
        }, o.RS_BLOCK_TABLE = [
            [1, 26, 19],
            [1, 26, 16],
            [1, 26, 13],
            [1, 26, 9],
            [1, 44, 34],
            [1, 44, 28],
            [1, 44, 22],
            [1, 44, 16],
            [1, 70, 55],
            [1, 70, 44],
            [2, 35, 17],
            [2, 35, 13],
            [1, 100, 80],
            [2, 50, 32],
            [2, 50, 24],
            [4, 25, 9],
            [1, 134, 108],
            [2, 67, 43],
            [2, 33, 15, 2, 34, 16],
            [2, 33, 11, 2, 34, 12],
            [2, 86, 68],
            [4, 43, 27],
            [4, 43, 19],
            [4, 43, 15],
            [2, 98, 78],
            [4, 49, 31],
            [2, 32, 14, 4, 33, 15],
            [4, 39, 13, 1, 40, 14],
            [2, 121, 97],
            [2, 60, 38, 2, 61, 39],
            [4, 40, 18, 2, 41, 19],
            [4, 40, 14, 2, 41, 15],
            [2, 146, 116],
            [3, 58, 36, 2, 59, 37],
            [4, 36, 16, 4, 37, 17],
            [4, 36, 12, 4, 37, 13],
            [2, 86, 68, 2, 87, 69],
            [4, 69, 43, 1, 70, 44],
            [6, 43, 19, 2, 44, 20],
            [6, 43, 15, 2, 44, 16],
            [4, 101, 81],
            [1, 80, 50, 4, 81, 51],
            [4, 50, 22, 4, 51, 23],
            [3, 36, 12, 8, 37, 13],
            [2, 116, 92, 2, 117, 93],
            [6, 58, 36, 2, 59, 37],
            [4, 46, 20, 6, 47, 21],
            [7, 42, 14, 4, 43, 15],
            [4, 133, 107],
            [8, 59, 37, 1, 60, 38],
            [8, 44, 20, 4, 45, 21],
            [12, 33, 11, 4, 34, 12],
            [3, 145, 115, 1, 146, 116],
            [4, 64, 40, 5, 65, 41],
            [11, 36, 16, 5, 37, 17],
            [11, 36, 12, 5, 37, 13],
            [5, 109, 87, 1, 110, 88],
            [5, 65, 41, 5, 66, 42],
            [5, 54, 24, 7, 55, 25],
            [11, 36, 12],
            [5, 122, 98, 1, 123, 99],
            [7, 73, 45, 3, 74, 46],
            [15, 43, 19, 2, 44, 20],
            [3, 45, 15, 13, 46, 16],
            [1, 135, 107, 5, 136, 108],
            [10, 74, 46, 1, 75, 47],
            [1, 50, 22, 15, 51, 23],
            [2, 42, 14, 17, 43, 15],
            [5, 150, 120, 1, 151, 121],
            [9, 69, 43, 4, 70, 44],
            [17, 50, 22, 1, 51, 23],
            [2, 42, 14, 19, 43, 15],
            [3, 141, 113, 4, 142, 114],
            [3, 70, 44, 11, 71, 45],
            [17, 47, 21, 4, 48, 22],
            [9, 39, 13, 16, 40, 14],
            [3, 135, 107, 5, 136, 108],
            [3, 67, 41, 13, 68, 42],
            [15, 54, 24, 5, 55, 25],
            [15, 43, 15, 10, 44, 16],
            [4, 144, 116, 4, 145, 117],
            [17, 68, 42],
            [17, 50, 22, 6, 51, 23],
            [19, 46, 16, 6, 47, 17],
            [2, 139, 111, 7, 140, 112],
            [17, 74, 46],
            [7, 54, 24, 16, 55, 25],
            [34, 37, 13],
            [4, 151, 121, 5, 152, 122],
            [4, 75, 47, 14, 76, 48],
            [11, 54, 24, 14, 55, 25],
            [16, 45, 15, 14, 46, 16],
            [6, 147, 117, 4, 148, 118],
            [6, 73, 45, 14, 74, 46],
            [11, 54, 24, 16, 55, 25],
            [30, 46, 16, 2, 47, 17],
            [8, 132, 106, 4, 133, 107],
            [8, 75, 47, 13, 76, 48],
            [7, 54, 24, 22, 55, 25],
            [22, 45, 15, 13, 46, 16],
            [10, 142, 114, 2, 143, 115],
            [19, 74, 46, 4, 75, 47],
            [28, 50, 22, 6, 51, 23],
            [33, 46, 16, 4, 47, 17],
            [8, 152, 122, 4, 153, 123],
            [22, 73, 45, 3, 74, 46],
            [8, 53, 23, 26, 54, 24],
            [12, 45, 15, 28, 46, 16],
            [3, 147, 117, 10, 148, 118],
            [3, 73, 45, 23, 74, 46],
            [4, 54, 24, 31, 55, 25],
            [11, 45, 15, 31, 46, 16],
            [7, 146, 116, 7, 147, 117],
            [21, 73, 45, 7, 74, 46],
            [1, 53, 23, 37, 54, 24],
            [19, 45, 15, 26, 46, 16],
            [5, 145, 115, 10, 146, 116],
            [19, 75, 47, 10, 76, 48],
            [15, 54, 24, 25, 55, 25],
            [23, 45, 15, 25, 46, 16],
            [13, 145, 115, 3, 146, 116],
            [2, 74, 46, 29, 75, 47],
            [42, 54, 24, 1, 55, 25],
            [23, 45, 15, 28, 46, 16],
            [17, 145, 115],
            [10, 74, 46, 23, 75, 47],
            [10, 54, 24, 35, 55, 25],
            [19, 45, 15, 35, 46, 16],
            [17, 145, 115, 1, 146, 116],
            [14, 74, 46, 21, 75, 47],
            [29, 54, 24, 19, 55, 25],
            [11, 45, 15, 46, 46, 16],
            [13, 145, 115, 6, 146, 116],
            [14, 74, 46, 23, 75, 47],
            [44, 54, 24, 7, 55, 25],
            [59, 46, 16, 1, 47, 17],
            [12, 151, 121, 7, 152, 122],
            [12, 75, 47, 26, 76, 48],
            [39, 54, 24, 14, 55, 25],
            [22, 45, 15, 41, 46, 16],
            [6, 151, 121, 14, 152, 122],
            [6, 75, 47, 34, 76, 48],
            [46, 54, 24, 10, 55, 25],
            [2, 45, 15, 64, 46, 16],
            [17, 152, 122, 4, 153, 123],
            [29, 74, 46, 14, 75, 47],
            [49, 54, 24, 10, 55, 25],
            [24, 45, 15, 46, 46, 16],
            [4, 152, 122, 18, 153, 123],
            [13, 74, 46, 32, 75, 47],
            [48, 54, 24, 14, 55, 25],
            [42, 45, 15, 32, 46, 16],
            [20, 147, 117, 4, 148, 118],
            [40, 75, 47, 7, 76, 48],
            [43, 54, 24, 22, 55, 25],
            [10, 45, 15, 67, 46, 16],
            [19, 148, 118, 6, 149, 119],
            [18, 75, 47, 31, 76, 48],
            [34, 54, 24, 34, 55, 25],
            [20, 45, 15, 61, 46, 16]
        ], o.getRSBlocks = function(t, e) {
            var r = o.getRsBlockTable(t, e);
            if (void 0 == r) throw new Error("bad rs block @ typeNumber:" + t + "/errorCorrectLevel:" + e);
            for (var n = r.length / 3, i = [], a = 0; n > a; a++)
                for (var s = r[3 * a + 0], h = r[3 * a + 1], u = r[3 * a + 2], l = 0; s > l; l++) i.push(new o(h, u));
            return i
        }, o.getRsBlockTable = function(t, e) {
            switch (e) {
                case l.L:
                    return o.RS_BLOCK_TABLE[4 * (t - 1) + 0];
                case l.M:
                    return o.RS_BLOCK_TABLE[4 * (t - 1) + 1];
                case l.Q:
                    return o.RS_BLOCK_TABLE[4 * (t - 1) + 2];
                case l.H:
                    return o.RS_BLOCK_TABLE[4 * (t - 1) + 3];
                default:
                    return void 0
            }
        }, n.prototype = {
            get: function(t) {
                var e = Math.floor(t / 8);
                return 1 == (1 & this.buffer[e] >>> 7 - t % 8)
            },
            put: function(t, e) {
                for (var r = 0; e > r; r++) this.putBit(1 == (1 & t >>> e - r - 1))
            },
            getLengthInBits: function() {
                return this.length
            },
            putBit: function(t) {
                var e = Math.floor(this.length / 8);
                this.buffer.length <= e && this.buffer.push(0), t && (this.buffer[e] |= 128 >>> this.length % 8), this.length++
            }
        };
        var p = [
                [17, 14, 11, 7],
                [32, 26, 20, 14],
                [53, 42, 32, 24],
                [78, 62, 46, 34],
                [106, 84, 60, 44],
                [134, 106, 74, 58],
                [154, 122, 86, 64],
                [192, 152, 108, 84],
                [230, 180, 130, 98],
                [271, 213, 151, 119],
                [321, 251, 177, 137],
                [367, 287, 203, 155],
                [425, 331, 241, 177],
                [458, 362, 258, 194],
                [520, 412, 292, 220],
                [586, 450, 322, 250],
                [644, 504, 364, 280],
                [718, 560, 394, 310],
                [792, 624, 442, 338],
                [858, 666, 482, 382],
                [929, 711, 509, 403],
                [1003, 779, 565, 439],
                [1091, 857, 611, 461],
                [1171, 911, 661, 511],
                [1273, 997, 715, 535],
                [1367, 1059, 751, 593],
                [1465, 1125, 805, 625],
                [1528, 1190, 868, 658],
                [1628, 1264, 908, 698],
                [1732, 1370, 982, 742],
                [1840, 1452, 1030, 790],
                [1952, 1538, 1112, 842],
                [2068, 1628, 1168, 898],
                [2188, 1722, 1228, 958],
                [2303, 1809, 1283, 983],
                [2431, 1911, 1351, 1051],
                [2563, 1989, 1423, 1093],
                [2699, 2099, 1499, 1139],
                [2809, 2213, 1579, 1219],
                [2953, 2331, 1663, 1273]
            ],
            m = function() {
                var t = function(t, e) {
                    this._el = t, this._htOption = e
                };
                return t.prototype.draw = function(t) {
                    function e(t, e) {
                        var r = document.createElementNS("http://www.w3.org/2000/svg", t);
                        for (var o in e) e.hasOwnProperty(o) && r.setAttribute(o, e[o]);
                        return r
                    }
                    var r = this._htOption,
                        o = this._el,
                        n = t.getModuleCount();
                    Math.floor(r.width / n), Math.floor(r.height / n), this.clear();
                    var i = e("svg", {
                        viewBox: "0 0 " + String(n) + " " + String(n),
                        width: "100%",
                        height: "100%",
                        fill: r.colorLight
                    });
                    i.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink"), o.appendChild(i), i.appendChild(e("rect", {
                        fill: r.colorDark,
                        width: "1",
                        height: "1",
                        id: "template"
                    }));
                    for (var a = 0; n > a; a++)
                        for (var s = 0; n > s; s++)
                            if (t.isDark(a, s)) {
                                var h = e("use", {
                                    x: String(a),
                                    y: String(s)
                                });
                                h.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#template"), i.appendChild(h)
                            }
                }, t.prototype.clear = function() {
                    for (; this._el.hasChildNodes();) this._el.removeChild(this._el.lastChild)
                }, t
            }(),
            v = "svg" === document.documentElement.tagName.toLowerCase(),
            _ = v ? m : i() ? function() {
                function t() {
                    this._elImage.src = this._elCanvas.toDataURL("image/png"), this._elImage.style.display = "block", this._elCanvas.style.display = "none"
                }

                function e(t, e) {
                    var r = this;
                    if (r._fFail = e, r._fSuccess = t, null === r._bSupportDataURI) {
                        var o = document.createElement("img"),
                            n = function() {
                                r._bSupportDataURI = !1, r._fFail && _fFail.call(r)
                            },
                            i = function() {
                                r._bSupportDataURI = !0, r._fSuccess && r._fSuccess.call(r)
                            };
                        return o.onabort = n, o.onerror = n, o.onload = i, void(o.src = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==")
                    }
                    r._bSupportDataURI === !0 && r._fSuccess ? r._fSuccess.call(r) : r._bSupportDataURI === !1 && r._fFail && r._fFail.call(r)
                }
                if (this._android && this._android <= 2.1) {
                    var r = 1 / window.devicePixelRatio,
                        o = CanvasRenderingContext2D.prototype.drawImage;
                    CanvasRenderingContext2D.prototype.drawImage = function(t, e, n, i, a, s, h, u) {
                        if ("nodeName" in t && /img/i.test(t.nodeName))
                            for (var l = arguments.length - 1; l >= 1; l--) arguments[l] = arguments[l] * r;
                        else "undefined" == typeof u && (arguments[1] *= r, arguments[2] *= r, arguments[3] *= r, arguments[4] *= r);
                        o.apply(this, arguments)
                    }
                }
                var n = function(t, e) {
                    this._bIsPainted = !1, this._android = a(), this._htOption = e, this._elCanvas = document.createElement("canvas"), this._elCanvas.width = e.width, this._elCanvas.height = e.height, t.appendChild(this._elCanvas), this._el = t, this._oContext = this._elCanvas.getContext("2d"), this._bIsPainted = !1, this._elImage = document.createElement("img"), this._elImage.style.display = "none", this._el.appendChild(this._elImage), this._bSupportDataURI = null
                };
                return n.prototype.draw = function(t) {
                    var e = this._elImage,
                        r = this._oContext,
                        o = this._htOption,
                        n = t.getModuleCount(),
                        i = o.width / n,
                        a = o.height / n,
                        s = Math.round(i),
                        h = Math.round(a);
                    e.style.display = "none", this.clear();
                    for (var u = 0; n > u; u++)
                        for (var l = 0; n > l; l++) {
                            var g = t.isDark(u, l),
                                f = l * i,
                                d = u * a;
                            r.strokeStyle = g ? o.colorDark : o.colorLight, r.lineWidth = 1, r.fillStyle = g ? o.colorDark : o.colorLight, r.fillRect(f, d, i, a), r.strokeRect(Math.floor(f) + .5, Math.floor(d) + .5, s, h), r.strokeRect(Math.ceil(f) - .5, Math.ceil(d) - .5, s, h)
                        }
                    this._bIsPainted = !0
                }, n.prototype.makeImage = function() {
                    this._bIsPainted && e.call(this, t)
                }, n.prototype.isPainted = function() {
                    return this._bIsPainted
                }, n.prototype.clear = function() {
                    this._oContext.clearRect(0, 0, this._elCanvas.width, this._elCanvas.height), this._bIsPainted = !1
                }, n.prototype.round = function(t) {
                    return t ? Math.floor(1e3 * t) / 1e3 : t
                }, n
            }() : function() {
                var t = function(t, e) {
                    this._el = t, this._htOption = e
                };
                return t.prototype.draw = function(t) {
                    for (var e = this._htOption, r = this._el, o = t.getModuleCount(), n = Math.floor(e.width / o), i = Math.floor(e.height / o), a = ['<table style="border:0;border-collapse:collapse;">'], s = 0; o > s; s++) {
                        a.push("<tr>");
                        for (var h = 0; o > h; h++) a.push('<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:' + n + "px;height:" + i + "px;background-color:" + (t.isDark(s, h) ? e.colorDark : e.colorLight) + ';"></td>');
                        a.push("</tr>")
                    }
                    a.push("</table>"), r.innerHTML = a.join("");
                    var u = r.childNodes[0],
                        l = (e.width - u.offsetWidth) / 2,
                        g = (e.height - u.offsetHeight) / 2;
                    l > 0 && g > 0 && (u.style.margin = g + "px " + l + "px")
                }, t.prototype.clear = function() {
                    this._el.innerHTML = ""
                }, t
            }();
        QRCode = function(t, e) {
            if (this._htOption = {
                    width: 256,
                    height: 256,
                    typeNumber: 4,
                    colorDark: "#000000",
                    colorLight: "#ffffff",
                    correctLevel: l.H
                }, "string" == typeof e && (e = {
                    text: e
                }), e)
                for (var r in e) this._htOption[r] = e[r];
            "string" == typeof t && (t = document.getElementById(t)), this._android = a(), this._el = t, this._oQRCode = null, this._oDrawing = new _(this._el, this._htOption), this._htOption.text && this.makeCode(this._htOption.text)
        }, QRCode.prototype.makeCode = function(t) {
            this._oQRCode = new e(s(t, this._htOption.correctLevel), this._htOption.correctLevel), this._oQRCode.addData(t), this._oQRCode.make(), this._el.title = t, this._oDrawing.draw(this._oQRCode), this.makeImage()
        }, QRCode.prototype.makeImage = function() {
            "function" == typeof this._oDrawing.makeImage && (!this._android || this._android >= 3) && this._oDrawing.makeImage()
        }, QRCode.prototype.clear = function() {
            this._oDrawing.clear()
        }, QRCode.CorrectLevel = l
    } catch (g) {
        "undefined" != typeof alog && alog("exception.fire", "catch", {
            msg: g.message || g.description,
            path: "common:static/js/util/qrcode.min.js",
            ln: 1
        })
    }
}();