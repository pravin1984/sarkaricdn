/**** Dogcare Custom Js ****/
/* Deafult js */
(function ($) {
    $.fn.menumaker = function (options) {
        var cssmenu = $(this),
                settings = $.extend({
                    format: "dropdown",
                    sticky: false
                }, options);
        return this.each(function () {
            cssmenu.prepend('<div id="menu-button" class="button"></div>');
            $(this).find(".button").on('click', function () {
                $(this).toggleClass('menu-opened');
                var mainmenu = $(this).next('ul');
                if (mainmenu.hasClass('open')) {
                    mainmenu.slideToggle().removeClass('open');
                } else {
                    mainmenu.slideToggle().addClass('open');
                    if (settings.format === "dropdown") {
                        mainmenu.find('ul').show();
                    }
                }
            });
            cssmenu.find('li ul').parent().addClass('has-sub');
            multiTg = function () {
                cssmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');
                cssmenu.find('.submenu-button').on('click', function () {
                    $(this).toggleClass('submenu-opened');
                    if ($(this).siblings('ul').hasClass('open')) {
                        $(this).siblings('ul').removeClass('open').slideToggle();
                    } else {
                        $(this).siblings('ul').addClass('open').slideToggle();
                    }
                });
            };
            if (settings.format === 'multitoggle')
                multiTg();
            else
                cssmenu.addClass('dropdown');
            if (settings.sticky === true)
                cssmenu.css('position', 'fixed');
            resizeFix = function () {
                var mediasize = 1024;
                if ($(window).width() > mediasize) {
                    cssmenu.find('ul').show();
                }
                if ($(window).width() <= mediasize) {
                    cssmenu.find('ul').hide().removeClass('open');
                }
            };
            resizeFix();
            return $(window).on('resize', resizeFix);
        });
    };
})(jQuery);
/** Set Position of Sub-Menu **/
var wapoMainWindowWidth = jQuery(window).width();
jQuery('#cssmenu ul ul li').mouseenter(function () {
    var subMenuExist = jQuery(this).find('.sub-menu').length;
    if (subMenuExist > 0) {
        var subMenuWidth = jQuery(this).find('.sub-menu').width();
        var subMenuOffset = jQuery(this).find('.sub-menu').parent().offset().left + subMenuWidth;
        if ((subMenuWidth + subMenuOffset) > wapoMainWindowWidth) {
            jQuery(this).find('.sub-menu').removeClass('submenu-left');
            jQuery(this).find('.sub-menu').addClass('submenu-right');
        } else {
            jQuery(this).find('.sub-menu').removeClass('submenu-right');
            jQuery(this).find('.sub-menu').addClass('submenu-left');
        }
    }
});
jQuery(document).ready(function () {
    jQuery('.preloader-custom-gif').hide();
    jQuery('.preloader ').hide();
    jQuery("#cssmenu").menumaker({
        format: "multitoggle"
    });   
  
});