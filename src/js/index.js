import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import $ from 'jquery';
import WOW from 'wow.js';
import '@popperjs/core/dist/umd/popper.min.js';
import '@fortawesome/fontawesome-free/js/all.min.js';
import 'wow.js/dist/wow.min.js';
import 'animate.css/animate.min.css';
import '../sass/style.scss';

$(function () {
  $('.thumbnail').hover(function () {
    $(this).find('.project-category').toggle();
    $(this).find('.caption').slideToggle(250);
  });

  let modalId = $('#image-gallery');
  loadGallery(true, 'a.thumbnail');

  //This function disables buttons when needed
  function disableButtons(counter_max, counter_current) {
    $('#show-previous-image, #show-next-image').show();
    if (counter_max === counter_current) {
      $('#show-next-image').hide();
    } else if (counter_current === 1) {
      $('#show-previous-image').hide();
    }
  }

  function loadGallery(setIDs, setClickAttr) {
    let current_image,
      selector,
      counter = 0;

    $('#show-next-image, #show-previous-image').click(function () {
      if ($(this).attr('id') === 'show-previous-image') {
        current_image--;
      } else {
        current_image++;
      }

      selector = $('[data-image-id="' + current_image + '"]');
      updateGallery(selector);
    });

    function updateGallery(selector) {
      let $sel = selector;
      current_image = $sel.data('image-id');
      $('#image-gallery-title').text($sel.data('title'));
      $('#image-gallery-image').attr('src', $sel.data('image'));
      disableButtons(counter, $sel.data('image-id'));
    }

    if (setIDs == true) {
      $('[data-image-id]').each(function () {
        counter++;
        $(this).attr('data-image-id', counter);
      });
    }
    $(setClickAttr).on('click', function () {
      updateGallery($(this));
    });
  }

  $('.copyright').prepend(
    `All Rights Reserved To <a href="https://twitter.com/m_abdalaziz_">Mo Abdalaziz</a> ${new Date().getFullYear()}`
  );

  $(".custom-file-input").on("change", function() {
    var fileName = $(this).val().split("\\").pop();
    $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
  });

  new WOW().init();
});
