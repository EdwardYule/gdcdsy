/*ljcong 2018.06.07*/
$(function($) {
    $.fn.menu = function(options) {
        $.fn.menu.defaults = {
            speed: 350,
            menu_index: undefined,
            a_type: true,
            b_type: true,
            d_type: true,
            e_type: false,
            f_type: false,
            p_type: true,
            f_class: '',
        };
        return this.each(function() {
            var settings = $.extend({}, $.fn.menu.defaults, options);
            var I = settings.menu_index;
            var A = settings.a_type;
            var B = settings.b_type;
            var D = settings.d_type;
            var E = settings.e_type;
            var F = settings.f_type;
            var P = settings.p_type;
            var F_C = settings.f_class;
            var Speed = settings.speed;
            var $this = $(this);
            var sd_sign, all_sign;
            C = ['on', '>ul>li>:first-child', '>ul>li>:nth-child(2)', 'body', '>ul>li', '>ul>li:not(:first-child)>:first-child', ':nth-child(2)', '>:last-child', ':first-child'];
            Z = ['<div class="menu-i"><div class="menu-icon"><span></span></div></div>'];
            Y = ['<div></div>', 'public-bg', 'menu-slide', 'menu-fix', 'swiper-container', 'swiper-wrapper', 'swiper-slide', 'swiper-no-swiping', 'slide-menu', 'public-bg', 'menu-i', 'swiper', 'menu-fix-down'];
            S = ['click', 'onclick', 'style', 'return false'];
            L = ['ul', 'li', 'a'];
            var menu_index = $(this).find(C[1] + '.on').parent().index();
            menu_index = I > menu_index ? I : menu_index;
            $(this).addClass('default-style').find(C[1]).parents($(this)).find(C[2]).prev().addClass('icon');
            var bg_move = function() {
                $('#' + $this.attr('id') + '_' + Y[10]).removeClass(C[0]);
                $(C[3]).removeClass(C[0]);
                $('#' + $this.attr('id') + '_' + Y[1]).hide().removeAttr(S[2]);
                $this.removeClass(C[0]).find(C[1]).removeClass(C[0]).eq(menu_index).addClass(C[0])
            };
            var menu_slide = function() {
                s_width = $this.find(C[1]).eq(menu_index).innerWidth();
                s_height = $this.find(C[1]).eq(menu_index).innerHeight();
                s_left = $this.find(C[1]).eq(menu_index).position().left;
                s_top = $this.find(C[1]).eq(menu_index).position().top
            };
            var reset_all = function() {
                $this.show().removeClass(C[0]).removeAttr(S[2]).find(C[1]).removeClass(C[0]).eq(menu_index).addClass(C[0]);
                $('[id*=' + Y[1] + ']').hide().removeAttr(S[2]);
                $('[id*=' + Y[10] + ']').removeClass(C[0]);
                $(C[3]).removeClass(C[0])
            };
            if (window.innerWidth > 1024) {
                sd_sign = true;
                all_sign = true
            } else {
                sd_sign = false;
                all_sign = false
            }
            $(C[3]).on(S[0], '#' + $this.attr('id') + '_' + Y[10], function() {
                $this.find(C[1]).removeClass(C[0]).eq(menu_index).addClass(C[0]);
                $(this).toggleClass(C[0]).next().fadeToggle(0);
                if (B == true) {
                    $this.slideToggle(Speed)
                } else {
                    $(C[3]).toggleClass(C[0]);
                    $this.toggleClass(C[0])
                }
                if (D == true) {
                    $this.find(C[2]).hide();
                    $this.find(C[1] + '[class~=' + C[0] + ']').next().show()
                } else {
                    $this.find(C[2]).removeClass(C[0])
                }
            });
            $(C[3]).on(S[0], '#' + $this.attr('id') + '_' + Y[1], function() {
                bg_move();
                if (B == true) {
                    $this.slideUp(Speed).find(C[2]).removeAttr(S[2]).removeClass(C[0])
                }
            });
            switch (A) {
                case 'slide':
                    $this.addClass(Y[8]).append(Y[0]).find(C[7]).append('<i></i>').attr({
                        'id': $this.attr('id') + '_' + Y[2],
                        'class': Y[2]
                    });
                    break;
                case false:
                    break
            }
            switch (P) {
                case true:
                    $this.before(Z[0]).prev().attr({
                        'id': $this.attr('id') + '_' + Y[10]
                    }).after(Y[0]).next().attr({
                        'id': $this.attr('id') + '_' + Y[1],
                        'class': Y[1]
                    });
                    break;
                case false:
                    break
            }
            switch (F) {
                case true:
                    $this.addClass(Y[4] + ' ' + Y[11]).children(L[0]).addClass(Y[5]).children(L[1]).addClass(Y[6]);
                    $.getScript('https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.2.0/js/swiper.min.js', function() {
                        var ljc_swiper = new Swiper($this, {
                            slidesPerView: 'auto',
                            freeMode: true,
                            freeModeSticky: true,
                        });
                        ljc_swiper.slideTo(menu_index, 0, false);
                        $(window).resize(function() {
                            ljc_swiper.slideTo(menu_index, 0, false)
                        })
                    });
                    break;
                case 'mob_js':
                    $this.addClass(Y[4]).children(L[0]).addClass(Y[5]).children(L[1]).addClass(Y[6] + ' ' + Y[7]);
                    $.getScript('https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.2.0/js/swiper.min.js', function() {
                        var ljc_swiper = new Swiper($this, {
                            noSwiping: true,
                            slidesPerView: 'auto',
                            freeMode: true,
                            freeModeSticky: true,
                            breakpoints: {
                                1024: {
                                    noSwiping: false,
                                },
                            }
                        });
                        ljc_swiper.slideTo((window.innerWidth > 1024) ? 0 : menu_index, 0, false);
                        $(window).resize(function() {
                            window.innerWidth > 1024 ? $this.removeClass(Y[11]) : $this.addClass(Y[11]);
                            ljc_swiper.slideTo((window.innerWidth > 1024) ? 0 : menu_index, 0, false)
                        })
                    });
                    break;
                case false:
                    break
            }
            switch (D) {
                case 'mob_js':
                    $this.find(C[2]).wrap(Y[0]).parent().addClass(Y[4] + ' ' + Y[11]).children().addClass(Y[5]).children().addClass(Y[6] + ' ' + Y[7]);
                    $.getScript('https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.2.0/js/swiper.min.js', function() {
                        var ljc_swiper = new Swiper($this.find(C[2]), {
                            noSwiping: true,
                            slidesPerView: 'auto',
                            freeMode: true,
                            freeModeSticky: true,
                            breakpoints: {
                                1024: {
                                    noSwiping: false,
                                },
                            }
                        })
                    });
                    break
            }
            var m_ot;
            var scroll_loca = 0;

            function public_scroll() {
                scroll_top = $(window).scrollTop();
                if ($(window).scrollTop() > m_ot) {
                    $(F_C).addClass(Y[3])
                } else {
                    $(F_C).removeClass(Y[3])
                }
            };
            if (F_C != '' && window.innerWidth > 1024) {
                $('img').each(function(index, element) {
                    var img = new Image();
                    img.src = $(this).attr('src');
                    var img_set = setInterval(function() {
                        if (img.width > 0 || img.height > 0) {
                            m_ot = $(F_C).offset().top;
                            public_scroll();
                            clearInterval(img_set)
                        } else {}
                    })
                });
                $(window).scroll(function() {
                    public_scroll();
                    if (scroll_top > scroll_loca && scroll_top > 100) {
                        $(F_C).addClass(Y[12])
                    } else {
                        $(F_C).removeClass(Y[12])
                    }
                    setTimeout(function() {
                        scroll_loca = scroll_top;
                        console.log(scroll_loca)
                    }, 0)
                })
            }

            function init() {
                w_width = window.innerWidth;
                reset_all();
                switch (A) {
                    case 'slide':
                        if (F != true) {
                            menu_slide();
                            $this.find('[id*=' + Y[2] + ']').width(s_width).height(s_height).css({
                                'left': s_left,
                                'top': s_top
                            });
                            $this.find(C[4]).hover(function() {
                                menu_slide();
                                $this.find(C[1]).removeClass(C[0]);
                                $this.find('[id*=' + Y[2] + ']').width($(this).children(C[8]).innerWidth()).height($(this).children(C[8]).innerHeight()).css({
                                    'left': $(this).children(C[8]).position().left,
                                    'top': $(this).children(C[8]).position().top
                                })
                            }, function() {
                                $this.find(C[1]).eq(menu_index).addClass(C[0]);
                                $this.find('[id*=' + Y[2] + ']').width(s_width).height(s_height).css({
                                    'left': s_left,
                                    'top': s_top
                                })
                            })
                        }
                        break;
                    case true:
                        $this.find(C[4]).hover(function() {
                            if (w_width > 1024) {
                                $this.find(C[1]).removeClass(C[0])
                            }
                        }, function() {
                            if (w_width > 1024) {
                                $this.find(C[1]).eq(menu_index).addClass(C[0])
                            }
                        });
                        break
                }
                switch (D) {
                    case true:
                        if (w_width > 1024 && sd_sign == true) {
                            $this.find(C[1]).off(S[0]).next().removeAttr(S[2]);
                            sd_sign = false
                        } else if (w_width <= 1024 && sd_sign == false) {
                            $this.find(C[1]).click(function() {
                                $(this).toggleClass(C[0]).next().slideToggle(Speed).parent().siblings().children(C[8]).removeClass(C[0]).next().slideUp(Speed)
                            });
                            sd_sign = true
                        }
                        break;
                    case false:
                        if (w_width > 1024 && sd_sign == true) {
                            $this.find(C[2]).removeClass(C[0]);
                            sd_sign = false
                        } else if (w_width <= 1024 && sd_sign == false) {
                            $this.find(C[5]).click(function() {
                                $(this).toggleClass(C[0]).next().toggleClass(C[0]).parent().siblings().children(C[8]).removeClass(C[0]).next().removeClass(C[0])
                            });
                            sd_sign = true
                        }
                        break
                }
                switch (E) {
                    case true:
                        break;
                    case false:
                        if (w_width > 1024 && all_sign == true) {
                            $this.find(C[2]).prev(L[2]).removeAttr(S[1]);
                            $this.find(C[2]).prev().find(L[2]).removeAttr(S[1]);
                            all_sign = false
                        } else if (w_width <= 1024 && all_sign == false) {
                            $this.find(C[2]).prev(L[2]).attr(S[1], S[3]);
                            $this.find(C[2]).prev().find(L[2]).attr(S[1], S[3]);
                            all_sign = true
                        }
                        break
                }
            };
            init();
            $(window).resize(function() {
                init()
            })
        })
    }
});