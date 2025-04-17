$(document).ready(function() {
  // Seta altura do HEADER para o top css do navbar-collapse
  if (window.innerWidth < 992) {
    const headerHeight = $('.header')[0].getBoundingClientRect().height;
    $('.header .navbar .navbar-collapse').css("top", headerHeight);
  }

  // Exibi/Oculta o botão de voltar ao topo ao carregar a página em qualquer posição da DOM
  if ($(document).scrollTop() > 700) {
    $('.buttons-floating .btn-arrow-up').show();
  } else {
    $('.buttons-floating .btn-arrow-up').hide();
  }

  // Botão Hamburguer Animado
  $('.navbar .menu-hamburger').on('click', function() {
    $(this).toggleClass('active');
    $('body').toggleClass('overflow-hidden');
  });

  // Fechar Navbar Collapse ao clicar no ancora no Menu
  // Se o ancora tiver a classe dropdown-toggle nao fecha o collapse ao clicar no link
  $('.navbar .navbar-collapse .nav-link').on('click', function() {
    if(!$(this).hasClass('dropdown-toggle')) {
      $('.navbar .navbar-collapse').collapse('hide');
      $('.navbar .menu-hamburger').toggleClass('active');
      $('body').toggleClass('overflow-hidden');
    }
  });

  // Botão voltar ao topo
  var backToTop = document.querySelector("#back-to-top");
  backToTop.addEventListener("click", function(e) {
    e.preventDefault();
    window.scrollTo(0, 0);
  });

  // Swiper Brands
  var swiperBrands = new Swiper('.swiper-brands', {
    grabCursor: true,
    loop: true,
    slidesPerView: 2,
    autoplay: {
      delay: 8000,
    },
    navigation: {
      nextEl: '.brands .swiper-button-next',
      prevEl: '.brands .swiper-button-prev',
    },
    keyboard: {
      enabled: true,
      onlyInViewport: false
    },
    breakpoints: {
      576: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 4,
      },
      992: {
        slidesPerView: 5,
      },
      1200: {
        slidesPerView: 6,
      },
      1400: {
        slidesPerView: 7,
      }
    }
  });

  // Máscara de telefone
  var SPMaskBehavior = function (val) {
    return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
  },
  spOptions = {
    onKeyPress: function(val, e, field, options) {
      field.mask(SPMaskBehavior.apply({}, arguments), options);
    },
    clearIfNotMatch: true
  };
  $('.sp_celphones').mask(SPMaskBehavior, spOptions);

  // Show | Hide Dropdown Menu
  function toggleDropdown (e) {
    const _d = $(e.target).closest('.dropdown'),
        _m = $('.dropdown-menu', _d);
    setTimeout(function() {
      const shouldOpen = e.type !== 'click' && _d.is(':hover');
      _m.toggleClass('show', shouldOpen);
      _d.toggleClass('show', shouldOpen);
      $('[data-bs-toggle="dropdown"]', _d).attr('aria-expanded', shouldOpen);
    }, e.type === 'mouseleave' ? 100 : 0);
  }
  $('body').on('mouseenter mouseleave', '.dropdown', toggleDropdown).on('click', '.dropdown-menu a:not(.dropdown-toggle)', toggleDropdown);

  // Inicia AOS Animate On Scroll
  AOS.init({
    once: true,
  });

  // Toast BS Cookies
  $('.toast').show();
  $('.toast .toast-body .btn').click(function (){
    $('.toast').hide();
  });

  // Aceitar Cookies
  $('#aceiteCookies').click(function(e){
    e.preventDefault();
    $.ajax({
      method: "post",
      url: site_url + "?aceite_cookie=true",
      success: function (data) {}
    });
    return false;
  });

  window.addEventListener("resize", resizeListener);
  window.addEventListener("scroll", scrollListener);

});

function resizeListener() {
  // Seta altura do HEADER para o top css do navbar-collapse
  if (window.innerWidth < 992) {
    const headerHeight = $('.header')[0].getBoundingClientRect().height;
    $('.header .navbar .navbar-collapse').css("top", headerHeight);
  } else {
    $('.header .navbar .navbar-collapse').css('top', 'inherit');
  }

  scrollListener();
}

function scrollListener() {
  var scrollTop = $(document).scrollTop();

  if (scrollTop > 700) {
    $('.buttons-floating .btn-arrow-up').show();
  } else {
    $('.buttons-floating .btn-arrow-up').hide();
  }
}