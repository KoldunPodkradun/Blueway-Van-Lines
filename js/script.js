    $(document).ready(function($) {
        var windowEl = $(window);
        var windowW = windowEl.width();
        var beforeWidth = $(this).width();

        //fix menu
        var lastScrollTop = 0;
        $(window).scroll(function() {
            var st = $(this).scrollTop();
            if (st > lastScrollTop) {
                $('#header').addClass('header-fix');
            } else {
                $('#header').removeClass('header-fix');
            }
        });

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

        $('.reviews-slider').not('.slick-initialized').slick({
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


        $('.reviews-slider-dots').not('.slick-initialized').slick({
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

        function sliderResize() {
            $('.about-items').not('.slick-initialized').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                dots: true,
                adaptiveHeight: true
            });

            $('.services-items').not('.slick-initialized').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                dots: true,
                adaptiveHeight: true
            });

        };

        if (windowW < 767) {
            sliderResize();
        }

        // resize slider
        var counter = 0;
        var i = 0;

        $(window).on('resize orientationchange', function(event) {
            var windowEl = $('body');
            var windowW = windowEl.width();

            if (windowW < 767) {
                counter++
                if (counter == 1) {
                    sliderResize();
                    $('.about-item-wrapp').on('click', function() {
                        $(this).removeClass('about-item-wrapp-active');
                    });
                    i = 1;
                    counter = 0;
                }
            } else if (windowW >= 767 && i == 1) {
                $('.about-item-wrapp, .works-item').removeAttr('id aria-describedby tabindex role');
                $('.about-item-wrapp').on('click', function() {
                    $(this).addClass('about-item-wrapp-active').siblings().removeClass('about-item-wrapp-active');
                });
                setTimeout(function() {
                    $('.about-items, .services-items').slick('unslick');
                }, 500);
                counter = 0;
                i = 0;
            };

        });


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
            $('.about-item-wrapp').on('click', function() {
                $(this).addClass('about-item-wrapp-active').siblings().removeClass('about-item-wrapp-active');
            });
        }

    });