    $(document).ready(function($) {
        var windowEl = $(window);
        var windowW = windowEl.width();
        var beforeWidth = $(this).width();

        // обновление страницы при масштабировании
        $(window).resize(function() {
            var afterWidth = $(this).width();
            if (afterWidth != beforeWidth) {
                location.reload()
            }
        })

        //fix menu
        if (windowW > 991) {
            var lastScrollTop = 0;
            $(window).scroll(function() {
                var st = $(this).scrollTop();
                if (st > lastScrollTop) {
                    $('#header').addClass('header-fix');
                } else {
                    $('#header').removeClass('header-fix');
                }
            });
        };

        //smooth anchor

        $(".header-menu, .header-logo, .footer-logo").on("click", "a", function(event) {
            event.preventDefault();
            var id = $(this).attr('href'),
                top = $(id).offset().top;
            $('body,html').animate({ scrollTop: top }, 500);
            $('.header-menu-wrapp').removeClass('open-menu');
            $('.hamburger').removeClass('close-menu');
            return false;

        });

        /*Динамическая подсветка пунктов меню*/

        $(window).scroll(function() {
            if (windowW > 991) {
                $('.magic').each(function() {
                    var window_top = $(window).scrollTop();
                    var div_top = $(this).offset().top;
                    var div_1 = $(this).attr('id');
                    if (window_top > div_top - 120) {
                        $('.header-menu').find('li').removeClass('menu-active');
                        $('.header-menu').find('li[class="' + div_1 + '"]').addClass('menu-active');
                    } else {
                        $('.header-menu').find('li[class="' + div_1 + '"]').removeClass('menu-active');
                    };
                });
            }

        });

        //open and close menu

        $('.hamburger').on('click', function() {
            $('.header-menu-wrapp').toggleClass('open-menu');
            return false;
        });

        $('.header-cross').on('click', function() {
            $('.header-menu-wrapp').removeClass('open-menu');
            return false;
        });

        $('.home-form-button, .prices-item-button, .prices-button').on('click', function() {
            $('.pop-up-form-wrapp').addClass('open-popup');
            return false;
        });

        $('.pop-up-cross, .pop-up-button').on('click', function() {
            $('.pop-up-form-wrapp').removeClass('open-popup');
            $('.pop-up-succes-wrapp').removeClass('open-popup');
            return false;
        });

        //form

        $('form').submit(function(e) {
            var thisForm = $(this);
            var form = $('form');
            var submitBtn = thisForm.find('input[type="submit"]');
            var data = new FormData(thisForm[0]);
            submitBtn.prop("disabled", true);
            $.ajax({
                url: '/mail.php',
                data: data,
                processData: false,
                contentType: false,
                cache: false,
                type: 'POST',
                success: function(data) {
                    thisForm[0].reset();
                    form[0].reset();
                    submitBtn.prop("disabled", false);
                    $('.pop-up-succes-wrapp').addClass('open-popup');
                    $(dataLayer.push({ 'event': 'event_lendos' }));
                },
                error: function() {
                    $('.pop-up-error-wrapp').addClass('open-popup');
                    submitBtn.prop("disabled", false);
                }
            });
            e.preventDefault();
        });


        /*передает данные в форму*/
        $('.btn').on('click', function() {
            var oneVal = $(this).attr('name');
            $('.form-id').val(oneVal);
        });


        /*slider*/

        $('.reviews-slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.reviews-slider-dots',
            adaptiveHeight: true,
            responsive: [{
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: true,
                    asNavFor: '.reviews-slider-dots',
                    adaptiveHeight: true,
                }
            }]

        });


        $('.reviews-slider-dots').slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            arrows: true,
            dots: false,
            centerMode: true,
            focusOnSelect: true,
            centerPadding: '10px',
            asNavFor: '.reviews-slider',
            responsive: [{
                    breakpoint: 991,
                    settings: {
                        arrows: true,
                        centerMode: true,
                        centerPadding: '20px',
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        arrows: true,
                        centerMode: true,
                        centerPadding: '0px',
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: '0px',
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 500,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: '0px',
                        slidesToShow: 1
                    }
                }


            ]
        });

        if (windowW < 767) {

            $('.about-items').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                dots: true,
                adaptiveHeight: true
            });

            $('.services-items').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                dots: true,
                adaptiveHeight: true
            });


        }


        /*передает данные о локации, услугах и дате в форму*/
        $('.home-form-button').on("click", function(event) {
            var home_from = $(".home-from").val();
            var home_to = $(".home-to").val();
            var size_of_move = $(".size-of-move :selected").val();
            var pop_up_moving_from = $(".pop-up-moving-from");
            var pop_up_moving_to = $(".pop-up-moving-to");
            var pop_up_size_of_move = $(".pop-up-size-of-move");
            pop_up_moving_from.val(home_from);
            pop_up_moving_to.val(home_to);
            pop_up_size_of_move.val(size_of_move);
        });

        $('.prices-item-button a').on('click', function() {
            var oneVal = $(this).attr('name');
            $('.form-id').val(oneVal);
        });

        // fix
        if (windowW > 767) {
            var about_item_one = $('.about-item-one');
            var about_item_two = $('.about-item-two');
            var about_item_three = $('.about-item-three');
            var about_descr_one_hov = $('.about-descr-one-hov');
            var about_descr_two_hov = $('.about-descr-two-hov');
            var about_descr_three_hov = $('.about-descr-three-hov');

            about_item_one.on('click', function() {
                $(this).addClass('about-item-active');
                about_item_two.removeClass('about-item-active');
                about_item_three.removeClass('about-item-active');
                about_descr_one_hov.addClass('about-descr-hov-active');
                about_descr_two_hov.removeClass('about-descr-hov-active');
                about_descr_three_hov.removeClass('about-descr-hov-active');
            });
            about_item_two.on('click', function() {
                $(this).addClass('about-item-active');
                about_item_one.removeClass('about-item-active');
                about_item_three.removeClass('about-item-active');
                about_descr_one_hov.removeClass('about-descr-hov-active');
                about_descr_two_hov.addClass('about-descr-hov-active');
                about_descr_three_hov.removeClass('about-descr-hov-active');
            });
            about_item_three.on('click', function() {
                $(this).addClass('about-item-active');
                about_item_one.removeClass('about-item-active');
                about_item_two.removeClass('about-item-active');
                about_descr_one_hov.removeClass('about-descr-hov-active');
                about_descr_two_hov.removeClass('about-descr-hov-active');
                about_descr_three_hov.addClass('about-descr-hov-active');
            });
        }

        /*цвет гамбургера при скролле*/
        $(window).scroll(function() {
            var scr = $(this).scrollTop();
            var about = $('#about').offset();
            var prices = $('#prices').offset();
            var services = $('#services').offset();
            var partners = $('#partners').offset();
            var reviews = $('#reviews').offset();
            var contacts = $('#contacts').offset();
            var hamburger = $('.hamburger');

            if (scr >= about['top']) {
                hamburger.addClass('hamburger-fix', 300);
            } else {
                hamburger.removeClass('hamburger-fix', 300);
            }
            if (scr >= prices['top']) {
                hamburger.removeClass('hamburger-fix', 300);
            }
            if (scr >= services['top']) {
                hamburger.addClass('hamburger-fix', 300);
            }
            if (scr >= partners['top']) {
                hamburger.removeClass('hamburger-fix', 300);
            }
            if (scr >= reviews['top']) {
                hamburger.addClass('hamburger-fix', 300);
            }
            if (scr >= contacts['top']) {
                hamburger.removeClass('hamburger-fix', 300);
            }
        });

    });