
'use strict';

(function ($) {
  $['loadStuff'] = function () {

    // Form selection
    $('.role-selection .role').on('click', function (e) {
      var p = $(this).parent();
      p.find('.role').removeClass('active');
      $(this).addClass('active');
      //Set input hidden
      $('#role').val('');
    });

    $('ul.navbar-nav>li>a>i').on('click', function (e) {
      e.preventDefault();
      var parent = $(this).closest('li');
      parent.find('>ul').toggleClass('active');
    });

    $('.close-filter').on('click', function (e) {
      e.preventDefault();
      $('.toggle-filter').trigger('click');
    });

    $('.kin-range-slider').ionRangeSlider({
      min: 0,
      max: 100,
      postfix: "%"
    });

    $('.kin-switch input[type=checkbox]').on('change', function () {
      $(this).closest('.kin-switch').find('.val').toggleClass('checked');
    });

    $('.kin-switch input[type=radio]').on('change', function () {
      $(this).closest('.form-group').find('.val').removeClass('checked');
      $(this).closest('.kin-switch').find('.val').addClass('checked');
      $('.radio-group .radio-item').removeClass('active');
      $(this).closest('.radio-item').addClass('active');
    });

    $('.contact-account-type').on('click', function () {
      $(this).toggleClass('requester-on');
      $('.menu-requester').toggleClass('hide');
      $('.menu-supplier').toggleClass('hide');
    });

    if (typeof $(".date-input-control").datepicker == 'function') {
      $(".date-input-control").datepicker({
        dateFormat: 'dd/mm/yy'
      });
    }

    $('[data-toggle="tooltip"]').tooltip();

    $('.btn-next').on('click', function (e) {
      e.preventDefault();
      var data_next = $(this).attr('data-next');
      $(this).closest('.process-item').removeClass('active');
      $(this).closest('.process-item').addClass('done');
      $('.process-item.' + data_next).addClass('active');
    });

    $('.search-group input').on('keyup', function () {
      if ($(this).val().length >= 1) {
        if (!$(this).closest('.search-group').hasClass('is-input')) {
          $(this).closest('.search-group').addClass('is-input');
        }
      } else {
        $(this).closest('.search-group').removeClass('is-input');
      }
    });
  };

})(jQuery);
