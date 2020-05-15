
function review(id, sort) {
  StoreAPI.getReview('product', id, sort, function(json) {
    var stars = $('.prod-detail-page').data('stars');
    var reviews = $('.ratings-reviews').data('reviewss');
    // $('.ratings-reviews .avg').html(`<span class="rating-icon rating-icon-off">★★★★★</span>
    // <span class="rating-icon rating-icon-on" style="width:`+json.avg*20+`%">★★★★★</span>`);
    $('.ratings-reviews .ratings .rating.without-caption').html(`<input type="text" class="kv-fa rating-loading" value="`+json.avg+`" title="" readonly="readonly">`);
    $('.info-header .rating.without-caption').html(`<input type="text" class="kv-fa rating-loading" value="`+json.avg+`" title="" readonly="readonly">`);
    $('.info-header-mobile .rating.without-caption').html(`<input type="text" class="kv-fa rating-loading" value="`+json.avg+`" title="" readonly="readonly">`);
    $('.ratings-reviews .rating-number').html(json.data.length + ' ' + reviews + $('.page-content').data('review'));

    $('#review-total-product').html( '(' + json.data.length + ')');
    if (json.avg) {
      $('.info-header .rating').removeClass('disable');
      $('.info-header-mobile .rating').removeClass('disable');
      $('.ratings-reviews .rating').removeClass('disable');
    }
    $('.ratings-reviews .other .rating').html(``+Math.round(json.avg*10)/10+` / 5 ` + stars);
    var html = '';
    var like = 0;
    var dislike = 0;
    var d = new Date();
    $.each(json.data, function(i, val) {
      var year = val.customer.birthday.split('-');
      if (val.customer.avatar) {
        var src_avatar = '/uploads/' + val.customer.avatar;
      }
      else {
        var src_avatar = $('.prod-detail-page').data('uri')+'/images/user-default.png';
      }
      var age = $('.prod-detail-page').data('age');
      var skin = $('.prod-detail-page').data('skin');
      var concerns = $('.prod-detail-page').data('concerns');
      var helpful = $('.prod-detail-page').data('helpful');
      var from = $('.prod-detail-page').data('from');
      var text_recommend = $('.prod-detail-page').data('friend');

      html += `<div class="show-reviews" data-customer="`+val.customer.id+`" data-review="`+val.id+`">
        <div class="row">
          <div class="col-sm-3">
            <div class="user-info-top">
              <div class="user-img">
                <img src="`+src_avatar+`" alt="">
              </div>
              <p class="user-name">
                <span>`+val.customer.name+`</span>
                <span class="verified-user">
                  <img src="`+$('.prod-detail-page').data('uri')+`/images/checked.png" alt="checked">
                </span>
              </p>
            </div>
            <div class="user-info-bottom">
              <p>
                <span>`+age+`
                </span>`+(d.getFullYear() - year[0])+`</p>
              <p>
                <span>`+from+`
                </span>`+val.city +`</p>
              <p class="skin-type">
                <span>`+skin+`
                </span>
              </p>
              <p class="skin-concern">
                <span>`+concerns+`
                </span></p>
            </div>
          </div>
          <div class="col-sm-9">
            <div class="user-reviews">
            <span class="review-date">`+moment(val.created_at).format('DD.MM.YYYY') +`</span>
            <div class="box-rating">
                <div class="rating without-caption text-left">
                    <input type="text" class="kv-fa rating-loading" value="`+val.rating+`" title="" readonly="readonly">
                </div>
            </div>
              <p class="review-title">` +
          val.title + `</p>
              <p class="review-content">` + val.content +
          `</p>
              <b class="recommend">${text_recommend}</b>
              <p class="question-vote">`+helpful+`</p>
              <div class="vote-reviews">
                <form action="">
                  <div class="input-group">
                    <span class="input-group-btn">
                        <button type="button" id="increaseButton" class="btn increaseButton btn-success ${val.statusLike == 'like' ? 'active' : ''}" data-id="`+val.id+`">
                        <i class="fa fa-angle-up" aria-hidden="true"></i>
                      </button>
                    </span>
                    <input type="text" class="form-control voteup" value="`+val.like+`" disabled="disabled"/>
                    <span class="input-group-btn">
                      <button type="button" id="decreaseButton" class="decreaseButton btn btn-danger ${val.statusLike == 'dislike' ? 'active' : ''}" data-id="`+val.id+`">
                        <i class="fa fa-angle-down" aria-hidden="true"></i>
                      </button>
                    </span>
                    <input type="text" class="form-control votedown" value="`+val.dislike+`" disabled="disabled"/>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>`;

      like = val.like ? val.like : 0;
      dislike = val.dislike ? val.dislike : 0;
    });

    $(document).on('click', '.increaseButton', function (e) {
      $(this).addClass('active');
      $(this).closest('.input-group').find('.decreaseButton').removeClass('active');
      var self = $(this);
      var form = self.closest('form');
      e.preventDefault(e);
      var data = {}
      data.id = $(this).attr("data-id");
      StoreAPI.likeReview(data.id, function(json) {
        if (!json.code) {
          form.find('.voteup').val(json.like);
          form.find('.votedown').val(json.dislike);
        } else {
          toastr.remove();
          toastr.error(json.message);
        }
      });
    });

    $(document).on('click', '.decreaseButton', function (e) {
      $(this).addClass('active');
      $(this).closest('.input-group').find('.increaseButton').removeClass('active');
      var self = $(this);
      var form = self.closest('form');
      e.preventDefault(e);
      var data = {}
      data.id = $(this).attr("data-id");
      StoreAPI.dislikeReview(data.id, function(json) {
        if (!json.code) {
          form.find('.votedown').val(json.dislike);
          form.find('.voteup').val(json.like);
        } else {
           toastr.remove();
          toastr.error(json.message);
        }
      });
    });

    $('#review_loop').append(html);
    skin();
    initRating();
  })
}
$(document).ready(function(){
  var modal = $('#firstModal');
  var timeShowPopup = 43200;
  if (localStorage.getItem('timePopup')) {
    var d = new Date();
    var timeAfter = d.getTime();
    var timeBefore = localStorage.getItem('timePopup');
    var dif = timeAfter - timeBefore;
    var second = dif / 1000;
    if (second > timeShowPopup) {
      modal.modal('show');
      localStorage.removeItem('timePopup');
    }
    else {
      modal.modal('hide');
    }
  } else {
    var d = new Date();
    var n = d.getTime();
    localStorage.setItem('timePopup', n);
    modal.modal('show');
  }
})


$('#firstModal').on('hidden.bs.modal', function () {
  var d = new Date();
  var n = d.getTime();
  localStorage.setItem('timePopup', n);
})

function initSession(url) {
  $.ajax({
    url: '/api/setSession',
    type: 'post',
    data: {
      key: 'urlLogin',
      value: url
    },
    success: function(data) {
      if (!data.code) {
        console.log(data);
      }
    }
  })
}
$(document).on('click','.c-box-btn .continue-btn', function(){
  if($( window ).width() > 767) {
      $('.header-add-to-cart').removeClass('active');
    }
  else {
      $('#addcartModal').modal('hide');
  }
})
