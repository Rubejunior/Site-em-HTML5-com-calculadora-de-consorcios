$(document).ready(function () {
    $(".content-testimonials").slick({
        infinite: false,
        slidesToShow: 3,
        arrows: true,
        slidesToScroll: 1,
        dots: true,
        responsive: [
            {breakpoint: 990, settings: {slidesToShow: 2}},
            {breakpoint: 768, settings: {slidesToShow: 1}}
        ]
    });

    // Menu mobile
    $('#icon-menu').on('click', function () {
        $('.nav-bar').toggleClass('active'); // Alterna a classe 'active' no menu principal
    });

    $('#file-input').on('change', function () {
        var fileName = $(this).val().split('\\').pop();
        if (fileName) {
            $('.custom-file-upload span').text(fileName);
        } else {
            $('.custom-file-upload span').text('Selecionar arquivo');
        }
    });

    const $form = $('#form');
    const $products = $('.products-single');

    $products.on('click', function () {
        $products.removeClass('selected');
        $(this).addClass('selected');
        $(this).find('input[type="radio"]').prop('checked', true);
        $('#product-error').hide();
    });


    $('#tel').on('input', function () {
        let value = $(this).val().replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        $(this).val(value
            .replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
            .replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
        );
        validateTelefone();
    });

    function validateNome() {
        const nome = $('#nome').val().trim();
        if (!nome || /\d/.test(nome)) {
            $('#nome-error').show();
            return false;
        } else {
            $('#nome-error').hide();
            return true;
        }
    }

    function validateEmail() {
        const email = $('#email').val().trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            $('#email-error').show();
            return false;
        } else {
            $('#email-error').hide();
            return true;
        }
    }

    function validateTelefone() {
        const telefone = $('#tel').val().trim();
        const telefoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
        if (!telefone || !telefoneRegex.test(telefone)) {
            $('#telefone-error').show();
            return false;
        } else {
            $('#telefone-error').hide();
            return true;
        }
    }

    function validateCidade() {
        const cidade = $('#cidade').val().trim();
        if (!cidade) {
            $('#cidade-error').show();
            return false;
        } else {
            $('#cidade-error').hide();
            return true;
        }
    }

    function validateTermos() {
        if (!$('#termos').is(':checked')) {
            $('#termos-error').show();
            return false;
        } else {
            $('#termos-error').hide();
            return true;
        }
    }

    $('#nome').on('input', validateNome);
    $('#email').on('input', validateEmail);
    $('#tel').on('input', validateTelefone);
    $('#cidade').on('input', validateCidade);
    $('#termos').on('change', validateTermos);

    $form.on('submit', function (e) {
        e.preventDefault();
        let isValid = true;

        if (!$('input[name="products"]:checked').length) {
            $('#product-error').show();
            isValid = false;
        } else {
            $('#product-error').hide();
        }

        isValid &= validateNome();
        isValid &= validateEmail();
        isValid &= validateTelefone();
        isValid &= validateCidade();
        isValid &= validateTermos();

        if (isValid) {
            console.log("Formulário enviado com sucesso!");
            // $form.off('submit').submit(); // Enviar o formulário se desejar usar o envio padrão
        }
    });

    // Enviar formulário de contato
    $('#formSimulate').submit(function(e) {
        e.preventDefault();
        var form = $(this);
        var formData = form.serializeArray();
        formData.push({name: 'acao', value:'submit'});
        if (validaFormulario("#formSimulate")) {
            $.ajax({
                method: "post",
                url: site_url + '/motos',
                data: formData,
                dataType: 'json',
                success: function (data) {
                    if (data.retorno == 'sucesso') {
                        // $('#modalSuccess').modal('show');
                        // $('#formSimulate').each(function () {
                        //     this.reset();
                        // });

                        $('#formSimulate').each(function () {
                            this.reset();
                        });
                        $('#modalSuccess').modal('show');
                    } else {
                        $('#modalFail').modal('show');
                    }
                },
                error: function (err) {
                    $('#modalFail').modal('show');
                }
            });
        }
    });

    $(window).scroll(function () {
        var scrollThreshold = $(document).height() * 0.2;
        if ($(window).scrollTop() > scrollThreshold) {

            $('.icon-top').fadeIn();
        } else {

            $('.icon-top').fadeOut();
        }
    });

    /*Icone voltar ao topo*/
    $('.icon-top').click(function (e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: 0}, '300');
    });


    /*Animações*/
    $(window).on('scroll', function () {
        $('.element-to-animate').each(function () {
            var elementTop = $(this).offset().top;
            var windowBottom = $(window).scrollTop() + $(window).height();


            if (elementTop < windowBottom) {
                $(this).addClass('visible');
            }
        });
    });

    $('.animate-initial').each(function () {
        var elementTop = $(this).offset().top;
        var windowBottom = $(window).scrollTop() + $(window).height();


        if (elementTop < windowBottom) {
            $(this).addClass('visible-initial');
        }
    });

    /**Cookies**/
    $('.btn-cookies').on('click', function () {
        $('.cookies').hide();
    });

    $(".btn-credito").on("click", function () {
        // Tornar o botão "Crédito Total" ativo e o "Valor da parcela" inativo
        $(this).removeClass("inativo").addClass("ativo");
        $(".btn-parcela").removeClass("ativo").addClass("inativo");

        // Mostrar o campo de crédito e esconder o de parcela
        $(".input-credito").fadeIn();
        $(".input-parcela").hide();

        // Limpar o campo de parcela
        $("#parcela").val("");
    });

    // Clique no botão "Valor da parcela"
    $(".btn-parcela").on("click", function () {
        // Tornar o botão "Valor da parcela" ativo e o "Crédito Total" inativo
        $(this).removeClass("inativo").addClass("ativo");
        $(".btn-credito").removeClass("ativo").addClass("inativo");

        // Mostrar o campo de parcela e esconder o de crédito
        $(".input-parcela").fadeIn();
        $(".input-credito").hide();

        // Limpar o campo de crédito
        $("#credito").val("");
    });

    $(".content-products").slick({
        infinite: false,
        slidesToShow: 4,
        arrows: true,
        dots: true,
        slidesToScroll: 1,
        responsive: [
            {breakpoint: 1240, settings: {slidesToShow: 3}},
            {breakpoint: 874, settings: {slidesToShow: 2}},
            {breakpoint: 530, settings: {slidesToShow: 1}}
        ]
    });

    $('#credito, #parcela').on('input', function () {
        // Remover caracteres não numéricos
        let valor = $(this).val().replace(/\D/g, '');

        // Converter para formato de moeda
        valor = (valor / 100).toFixed(2).replace('.', ',');

        // Adicionar separador de milhar
        valor = valor.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

        // Atualizar o valor do campo
        $(this).val(valor);
    });

    // Modal video
    $(".open-modal").click(function (e) {
        e.preventDefault();
        const videoSrc = $(this).data("video");
        $("#modalVideo").attr("src", videoSrc); // Define o vídeo no iframe
        $("#videoModal").fadeIn(); // Exibe a modal
    });

    // Fechar modal
    $(".close-modal").click(function () {
        $("#modalVideo").attr("src", ""); // Limpa o vídeo
        $("#videoModal").fadeOut(); // Oculta a modal
    });

    // Fechar modal ao clicar fora
    $(window).click(function (e) {
        if ($(e.target).is("#videoModal")) {
            $("#modalVideo").attr("src", ""); // Limpa o vídeo
            $("#videoModal").fadeOut(); // Oculta a modal
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

});

// Valida Formulario
function validaFormulario(form) {

    var error = false;
    var camposVazios = [];

    // faz a validacao
    $(form).find("input , select, textarea").each(function () {
        if (typeof $(this).attr('required') != "undefined") {
            // Remove msg de erro para INPUT
            $(this).parent().find(".erro-form").remove();
            // Remove msg de erro para SELECT
            $(this).parent().parent().find(".erro-form").remove();

            // campos vázios
            if ($(this).val() == "" && !$(this).hasClass("opcional") && $(this).attr("type") != "hidden" && $(this).attr("type") != "email") {
                var erros = {
                    'campo': $(this).attr("id"),
                    'msg': "Este campo está vázio."
                };
                camposVazios.push(erros);
            } else {
                $(this).next(".erro-form").remove();
            }

            if ($(this).attr("type") == "email" && !validaEmail($(this).val())) {
                if ($(this).val() == "") {
                    var erros = {
                        'campo': $(this).attr("id"),
                        'msg': "Este campo está vázio."
                    };
                } else {
                    var erros = {
                        'campo': $(this).attr("id"),
                        'msg': "O valor digitado não é um email."
                    };
                }
                camposVazios.push(erros);
            } else {
                $(this).next(".erro-form").remove();
            }
        }
    });
    if (camposVazios.length > 0) {
        // inputs
        for (var i = 0; i < camposVazios.length; i++) {
            $(form + " input" + "#" + camposVazios[i].campo).parent().append("<span style='font-size: 12px; font-weight: 600; line-height: 14px; color: #ed1c24;'" + " class='erro-form'>" + camposVazios[i].msg + "</span>");
        }
        // selects
        // for (var j = 0; j < camposVazios.length; j++) {
        //     $(form + " select" + "#" + camposVazios[j].campo).parent().append("<span style='color: #ed1c24;font-size: 12px;display: block;line-height: 20px;' class='erro-form'>" + camposVazios[j].msg + "</span>");
        // }
        // textarea
        // for (var j = 0; j < camposVazios.length; j++) {
        //     $(form + " textarea" + "#" + camposVazios[j].campo).parent().append("<span style='color: #ed1c24;font-size: 12px;display: block;line-height: 20px;' class='erro-form'>" + camposVazios[j].msg + "</span>");
        // }
        $('.erro-form').first().siblings('input, select, textarea').focus();
        return false;
    }
    return true;
}

function validaEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}
