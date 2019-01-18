$(document).ready(function () {
    "use strict";

	/**
	 * Vars and Inits
	 */
    var header = $('.header');
    var ctrl = new ScrollMagic.Controller();

    $(window).on('resize', function () {
        setHeader();
        setTimeout(function () {
            $(window).trigger('resize.px.parallax');
        }, 375);
    });

    $(document).on('scroll', function () {
        setHeader();
    });

	/**
	 * Set Header
	 */
    function setHeader() {
        if ($(window).scrollTop() > 91) {
            header.addClass('scrolled');
        }
        else {
            header.removeClass('scrolled');
        }
    }

	/**
	 * Init Menu
	 */
    function initMenu() {
        var hamb = $('.hamburger');
        var menu = $('.menu');
        var menuOverlay = $('.menu_overlay');
        var menuClose = $('.menu_close_container');

        hamb.on('click', function () {
            menu.toggleClass('active');
            menuOverlay.toggleClass('active');
        });

        menuOverlay.on('click', function () {
            menuOverlay.toggleClass('active');
            menu.toggleClass('active');
        });

        menuClose.on('click', function () {
            menuOverlay.toggleClass('active');
            menu.toggleClass('active');
        });
    }

	/**
	 * Init Dropdown
	 */
    function initDropdown() 
    {
        if ($('.domain_search_dropdown').length) 
        {
            var dd = $('.fa.fa-chevron-down');
            var ddItems = $('.domain_search_dropdown ul li');
            var ddSelected = $('.domain_search_selected input');
            dd.on('click', function () {
                $('.domain_search_dropdown').toggleClass('active');
            });
            ddItems.on('click', function () {
                var selectedDomain = $(this).text();
                ddSelected.val(selectedDomain);
                $(".domain_search_dropdown").css("background", "#7836c6");
                $('.domain_search_dropdown').toggleClass('active');
            });
        }
    }

    $(".domain_search_selected input").val("80");

	/**
	 * Init SVG
	 */
    function initSvg() {
        jQuery('img.svg').each(function () {
            var $img = jQuery(this);
            var imgID = $img.attr('id');
            var imgClass = $img.attr('class');
            var imgURL = $img.attr('src');

            jQuery.get(imgURL, function (data) {
                // Get the SVG tag, ignore the rest
                var $svg = jQuery(data).find('svg');

                // Add replaced image's ID to the new SVG
                if (typeof imgID !== 'undefined') {
                    $svg = $svg.attr('id', imgID);
                }
                // Add replaced image's classes to the new SVG
                if (typeof imgClass !== 'undefined') {
                    $svg = $svg.attr('class', imgClass + ' replaced-svg');
                }

                // Remove any invalid XML tags as per http://validator.w3.org
                $svg = $svg.removeAttr('xmlns:a');

                // Replace image with new SVG
                $img.replaceWith($svg);
            }, 'xml');
        });
    }

	/**
	 * Init Magic
	 */
    function initMagic() {
        if ($('.magic_fade_in').length) {
            var magic = $('.magic_fade_in');
            magic.each(function () {
                var ele = this;
                var smScene = new ScrollMagic.Scene({
                    triggerElement: ele,
                    triggerHook: 'onEnter',
                    offset: 130,
                    reverse: false
                }).setTween(TweenMax.from(ele, 0.5, { autoAlpha: 0, ease: Power1.easeIn })).addTo(ctrl);
            });
        }
    }

    setHeader();
    initMenu();
    initDropdown();
    initSvg();
    initMagic();
});