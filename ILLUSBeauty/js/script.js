
// Feedback 09/07/2018 - Opacity slider - Prod Detail
$(document).ready(function(){
    // $('.slides-mobile .slick-active').css('opacity', '1');
    // $('.slides-mobile .slick-slide').not('.slides-mobile .slick-active').css("opacity", "0.5");
    // $('.slides-mobile').on('afterChange', function(event, slick, currentSlide){
    //     $('.slides-mobile .slick-active').css('opacity', '1');
    //     $('.slides-mobile .slick-slide').not('.slides-mobile .slick-active').css("opacity", "0.5");
    // });

    var urlSurvey = '/api/search?type=product&view=snippet/product-user&metafield_post_type=product_attribute&filter=product.title**%20&metafield=';
    var metafield = '';
    $('#skin-survey select').each(function(index, el) {
      var self = $(this);
      var name = self.attr('name');
      var value = self.val();
      if (metafield) {
        metafield += encodeURIComponent('&&') + name + '**' + value;
      } else {
        metafield += name + '**' + value;
      }
    });
    if (metafield) {
      urlSurvey += metafield;
      $.get(urlSurvey, function(html){
        $('.prod-by-info .row').html(html);
      })
    }

})

// Shop page: Click show menu slidebar
$('.shop-page .sidebar .btn-show-sidebar').click(function() {
  $(this).parents('.sidebar').find('.box-slidebar').slideToggle(300);
});

// Hover show children menu
// $('#navbar-expand .navbar-nav .dropdown').hover(function (){
//     $(this).find('.dropdown-menu').slideDown(300);
// }, function() {
//     $(this).find('.dropdown-menu').slideUp(300);
// })

// rating star
$('.kv-fa').on('change', function () {
    console.log('Rating selected: ' + $(this).val());
});
initRating();

function initRating(){
  if ($('.kv-fa').length > 0) {
    $('.kv-fa').rating({
      theme: 'krajee-fa',
      filledStar: '<i class="fa fa-star"></i>',
      emptyStar: '<i class="fa fa-star-o"></i>',

    });
  }
}


$(document).ready(function() {
  $('#close-search-btn').on('click', function(e) {
    e.preventDefault();
    $('#navbar-search-form').removeClass('active');
  });
});
$(document).ready(function() {
  $('#open-search-btn').on('click', function(e) {
    e.stopPropagation();
    $('#navbar-search-form').toggleClass('active');
  });
  $('#open-search-btn-mobile').on('click', function(e) {
    e.stopPropagation();
    $('#navbar-search-form').toggleClass('active');
  });
  $('.navbar-toggle').click(function() {
    $('#navbar-search-form').removeClass("active");
  });
  $('.navbar').click(function() {
    $('#navbar-search-form').removeClass("active");
  });
  $('.page-content').click(function() {
    $('#navbar-search-form').removeClass("active");
  });
  $('footer').click(function() {
    $('#navbar-search-form').removeClass("active");
  });
});
// fixed search-form on scrolling
$(window).scroll(function(e) {
    if($(this).scrollTop() > 82) {
        $('.search-form').addClass('fixed-top-scroll');
        $('.navbar').css('top','-25px');
        $('#top-header-right-section').css('top','64px');
        $('#top-header-left-section').css('top','64px');
        $('#search-label').html(' ');
        $('.navbar').css('box-shadow','0px -4px 10px 0px #333');
    }
    else {
        $('.search-form').removeClass('fixed-top-scroll');
        $('.navbar').css('top','0');
        $('#top-header-right-section').css('top','9px');
        $('#top-header-left-section').css('top','9px');
        $('#search-label').html($('#search-label').data('search'));
        $('.navbar').css('box-shadow','none');
    }
});
//
$(document).ready(function() {
  if ($('.navbar').hasClass('is-guest')) {
    $('.user-menu-mobile').css('display', 'block');
  } else {
    $('.user-menu-mobile-logged-in').css('display', 'flex');
  }
});
$(document).ready(function() {
  $("#change-password-toggle").click(function() {
    $('#change-password-form').toggleClass('show');
    if ($('#change-password-form').hasClass('show')) {
      $('#password-form').addClass('hidden');
    } else {
      $('#password-form').removeClass('hidden');
    }
  });
  $('.one-time-skin-survey select').each(function(index, el) {
    var self = $(this);
    var value = self.attr('data-value');
    // console.log(value);
    self.val(value);
  });
});
$('.btn-submit-meta-user').on('click', function(event) {
  event.preventDefault();
  var form = $(this).closest('form');
  var customer_id = form.attr('data-id');
  var item = form.find('select');
  var check = 0;
  item.each(function(index, el) {
    var self = $(this);
    var data = {};
    data.title = self.attr('title');
    data.post_id = customer_id;
    data.post_type = 'customer';
    data.value = self.val();
    StoreAPI.updateMetafield(data,function(json){
      if (json.code) {
        check = 1;
      }
    });
  });
  if (!check) {
    $.get('/api/sendEmailCoupon', function(json){
      if (!json.code) {
        toastr.success('Thank you so much for sharing with us. A coupon code has been sent to your mail box.<3');
        setTimeout(function(){
          location.reload();
        }, 100)
      }
      else {
        toastr.error(json.message);
      }
    });
    $('.survey-completed').removeClass('hidden');

  } else {
    toastr.error('Có lỗi xảy ra!');
  }
});
$(document).ready(function() {
  var form = $('.btn-update-meta-user').closest('form');
  var customer_id = form.attr('data-id');
  var item = form.find('select');
  var check = 0;
  var url = '/api/search?type=product&view=snippet/product-user&metafield_post_type=product_attribute&filter=product.title**%20&metafield='
  var metafield = ''
  item.each(function(index, el) {
    var self = $(this);
    var data = {};
    var name = self.attr('name');
    data.title = self.attr('title');
    data.post_id = customer_id;
    data.post_type = 'customer';
    data.value = self.val();
    if (metafield) {
      metafield += encodeURIComponent('&&') + name + '**' + data.value;
    } else {
      metafield += name + '**' + data.value;
    }
    StoreAPI.updateMetafield(data,function(json){
      if (json.code) {
        check = 1;
      }
    });
  });
  if (metafield) {
    url += metafield;
    $.get(url, function(html){
      $('.prod-by-info .row').html(html);
      $('.prod-item').each(function(index, elem) {
        var post_id = $(this).data('id');
        var ref = this;
        StoreAPI.getReview('product', post_id, 'created_at-asc', function(json) {
          if (json.data.length > 0) {
            $(ref).find('.rating-number').html(`(` + json.data.length + `)`);
            $(ref).find('.rating.without-caption').html(`<input type="text" class="kv-fa rating-loading" value="`+json.avg+`" title="" readonly="readonly">`);
          } else {
            $(ref).find('.rating-number').html('');
          }
          initRating();
        })
      });
    })
  }
});
$(document).on('click','.btn-update-meta-user', function(event) {
  event.preventDefault();
  var form = $(this).closest('form');
  var customer_id = form.attr('data-id');
  var item = form.find('select');
  var check = 0;
  var url = '/api/search?type=product&view=snippet/product-user&metafield_post_type=product_attribute&filter=product.title**%20&metafield='
  var metafield = ''
  item.each(function(index, el) {
    var self = $(this);
    var data = {};
    var name = self.attr('name');
    data.title = self.attr('title');
    data.post_id = customer_id;
    data.post_type = 'customer';
    data.value = self.val();
    if (metafield) {
      metafield += encodeURIComponent('||') + name + '**' + data.value;
    } else {
      metafield += name + '**' + data.value;
    }
    StoreAPI.updateMetafield(data,function(json){
      if (json.code) {
        check = 1;
      }
    });
  });
  if (metafield) {
    url += metafield;
    $.get(url, function(html){
      $('.prod-by-info .row').html(html);
      $('.prod-item').each(function(index, elem) {
        var post_id = $(this).data('id');
        var ref = this;
        StoreAPI.getReview('product', post_id, 'created_at-asc', function(json) {
          if (json.data.length > 0) {
            $(ref).find('.rating-number').html(`(` + json.data.length + `)`);
            $(ref).find('.rating.without-caption').html(`<input type="text" class="kv-fa rating-loading" value="`+json.avg+`" title="" readonly="readonly">`);
          } else {
            $(ref).find('.rating-number').html('');
          }
          initRating();
        })
      });
    })
  }

  if (!check) {
    toastr.remove();
    toastr.success('Cập nhật thành công!')
  } else {
    toastr.error('Có lỗi xảy ra!');
  }
});

$(document).on('click', '.item-filter', function(event) {
  event.preventDefault();
  var self = $(this);
  var mainContent = $('.main-content');
  var parent = self.attr('data-parent');
  var value = self.attr('data-value');
  $.get('/api/search?type=product&metafield=' + parent + '**' + value + '&view=snippet%2Ffilter_product', function(html){
    mainContent.html(html);
  });
});

$(document).ready(function() {

  $(".prod-detail .share-section .review-link").click(function() {
    $('html, body').animate({
        scrollTop: $(".prod-detail-page .ratings-reviews").offset().top - 100
    }, 700);
  });
  // Button add to cart
  if($( window ).width() > 767) {
    $('.prod-item .site-btn-white').click(function() {
      $('.header-add-to-cart').addClass('active');
    })
    $('.header-add-to-cart .btn-close-cart').click(function() {
      $(this).parents('.header-add-to-cart').removeClass('active');
    })
  } else {
    $('.prod-item .site-btn-white').click(function() {
      $('#addcartModal').modal('show');
    })
    $('.c-cart-mobile .c-right .c-box-btn .continue-btn').click(function() {
      $('#addcartModal').modal('hide');
    })
  }

  if($(window).width() < 992) {
    $(".shipping .box-btn").on("click", function(){
      setTimeout(function() {
        if($('.order-step-page .payment').hasClass('active')) {
          console.log("true");
          $("html, body").animate({ scrollTop: $(".order-step-page .payment").offset().top }, 600);
          return false;
        }
      },100);
    });
    $(".payment .box-btn").on("click", function(){
      setTimeout(function() {
        if($('.order-step-page .confirmation').hasClass('active')) {
          console.log("true");
          $("html, body").animate({ scrollTop: $(".order-step-page .confirmation").offset().top }, 600);
          return false;
        }
      },100);
    });
    $(".payment .back-box-btn").on("click", function(){
      setTimeout(function() {
        if($('.order-step-page .shipping').hasClass('active')) {
          console.log("true");
          $("html, body").animate({ scrollTop: $(".order-step-page .shipping").offset().top }, 600);
          return false;
        }
      },100);
    });
  }
});


// jquery.unveil.js
;(function($){$.fn.unveil=function(threshold,callback){var $w=$(window),th=threshold||0,retina=window.devicePixelRatio>1,attrib=retina?"data-src-retina":"data-src",images=this,loaded;this.one("unveil",function(){var source=this.getAttribute(attrib);source=source||this.getAttribute("data-src");if(source){this.setAttribute("src",source);if(typeof callback==="function")callback.call(this);}});function unveil(){var inview=images.filter(function(){var $e=$(this);if($e.is(":hidden"))return;var wt=$w.scrollTop(),wb=wt+$w.height(),et=$e.offset().top,eb=et+$e.height();return eb>=wt-th&&et<=wb+th;});loaded=inview.trigger("unveil");images=images.not(loaded);}$w.on("scroll.unveil resize.unveil lookup.unveil",unveil);unveil();return this;};})(window.jQuery||window.Zepto);


// Fix Zoom hover input,select in Iphone
/*
NOTE: This code overrides the viewport settings, an improvement would be
      to take the original value and only add or change the user-scalable value
*/

// optionally only activate for iOS (done because I havn't tested the effect under other OS/devices combinations such as Android)
var iOS = navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)
if (iOS)
  preventZoomOnFocus();

function preventZoomOnFocus()
{
  document.documentElement.addEventListener("touchstart", onTouchStart);
  document.documentElement.addEventListener("focusin", onFocusIn);
}

let dont_disable_for = ["checkbox", "radio", "file", "button", "image", "submit", "reset", "hidden"];
//let disable_for = ["text", "search", "password", "email", "tel", "url", "number", "date", "datetime-local", "month", "year", "color"];

function onTouchStart(evt)
{
  let tn = evt.target.tagName;

  // No need to do anything if the initial target isn't a known element
  // which will cause a zoom upon receiving focus
  if (    tn != "SELECT"
      &&  tn != "TEXTAREA"
      && (tn != "INPUT" || dont_disable_for.indexOf(evt.target.getAttribute("type")) > -1)
     )
    return;

  // disable zoom
  setViewport("width=device-width, initial-scale=1.0, user-scalable=0");
}

// NOTE: for now assuming this focusIn is caused by user interaction
function onFocusIn(evt)
{
  // reenable zoom
  setViewport("width=device-width, initial-scale=1.0, user-scalable=1");
}

// add or update the <meta name="viewport"> element
function setViewport(newvalue)
{
  let vpnode = document.documentElement.querySelector('head meta[name="viewport"]');
  if (vpnode)
    vpnode.setAttribute("content",newvalue);
  else
  {
    vpnode = document.createElement("meta");
    vpnode.setAttribute("name", "viewport");
    vpnode.setAttribute("content", newvalue);
  }
}