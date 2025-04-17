$(document).ready(function () {
    // Swiper Banner
    var swiperBanner = new Swiper('.swiper-banner', {
        grabCursor: true,
        loop: false,
        autoplay: {
            delay: 8000,
        },
        pagination: {
            el: '.swiper-banner .swiper-pagination',
            clickable: true,
        },
        keyboard: {
            enabled: true,
            onlyInViewport: false
        }
    });

    // Swiper AD
    var swiperAd = new Swiper('.swiper-ad', {
        loop: false,
        spaceBetween: 20,
        autoplay: {
            delay: 7000,
        },
        pagination: {
            el: '.swiper-ad .swiper-pagination',
            clickable: true,
        },
        keyboard: {
            enabled: true,
            onlyInViewport: false
        }
    });

    // Swiper Testimony
    var swiperTestimony = new Swiper('.swiper-testimony', {
        loop: false,
        spaceBetween: 20,
        // autoplay: {
        //     delay: 6500,
        // },
        slidesPerView: 1,
        navigation: {
            nextEl: '.swiper-button-next-testimony',
            prevEl: '.swiper-button-prev-testimony',
        }
    });

    // Contador de números animado
    var contador = false;
    var sectionInfo = $('#info').offset().top - $(window).height();
    $(window).scroll(function () {
        if ($(window).scrollTop() > sectionInfo && contador == false) {
            $('.count').each(function () {
                $(this).prop('Counter', 0).animate({
                    Counter: $(this).text()
                }, {
                    duration: 5000,
                    easing: 'swing',
                    step: function (now) {
                        $(this).text(Math.ceil(now));
                    }
                });
            });

            contador = true;
        }
    });

    // Adiciona rolagem suave para os botões simular consórcio
    $(function () {
        $('.btn-simular-agora').on('click', function (e) {
            var hash = this.hash;
            e.preventDefault();
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 400);
        });
    });

    // Add classe active ao elemento pai do input radio selecionado do formulário de simular consórcio
    $('.form-check-modalities .form-check-input').on('click', function () {
        $('.form-check-modalities .form-check-input').each(function () {
            if ($(this).prop('checked')) {
                $(this).parent().addClass('active');
            } else {
                $(this).parent().removeClass('active');
            }
        });
    });

    // Marca o input radio do formulário do banner principal através do botão simular agora
    $('.useful-links .btn-simulate').on('click', function () {
        var idTipoConsorcio = $(this).attr('data-id-simulacao-tipo');
        $('.form-check-modalities .form-check-input').each(function () {
            if ($(this).val() == idTipoConsorcio) {
                $(this).parent().addClass('active');
                $(this).prop('checked', true);
            } else {
                $(this).parent().removeClass('active');
                $(this).prop('checked', false);
            }
        });
    });

    // Abrir video do Youtube em Popup
    $(".btn-open-youtube").YouTubePopUp();

    $(document).ready(function () {
        // Verificar o estado do checkbox quando a página carregar
        if (!$('#aceite_termos').is(':checked')) {
            $('#aceite_termos').parent().append("<span class='erro-form' style='font-size: 12px; font-weight: 600; color: #ed1c24;'>Por favor, marque o checkbox de aceite para prosseguir.</span>");
        }
    
        // Monitorar o estado do checkbox
        $('#aceite_termos').on('change', function() {
            if ($(this).is(':checked')) {
                $(this).parent().find('.erro-form').remove();
            } else {
                if ($(this).parent().find('.erro-form').length === 0) {
                    $(this).parent().append("<span class='erro-form' style='font-size: 12px; font-weight: 600; color: #ed1c24;'>Por favor, marque o checkbox de aceite para prosseguir.</span>");
                }
            }
        });
    
        // Envio formulário Simular Consórcio
        $('#formSimularConsorcio').submit(function(e) {
            e.preventDefault();
            var form = $(this);
            var formData = form.serializeArray();
            formData.push({name: 'acao', value:'addSolicitacao'});
    
            // Verificação do checkbox antes de enviar
            if (!$('#aceite_termos').is(':checked')) {
                if ($('#aceite_termos').parent().find('.erro-form').length === 0) {
                    $('#aceite_termos').parent().append("<span class='erro-form' style='font-size: 12px; font-weight: 600; color: #ed1c24;'>Por favor, marque o checkbox de aceite para prosseguir.</span>");
                }
                return false; // Impede o envio do formulário
            }
    
            if (validaFormulario("#formSimularConsorcio")) {
                let tokenLead = '';
                let labelLead = '';
                let tipo = $('input[name="id_simulacao_tipo"]:checked').val();
                if (tipo == 1) {
                    //CARROS
                    labelLead = 'Ancora Consorcios: Carros'
                    tokenLead = '';
                } else if (tipo == 2) {
                    //MOTOS
                    labelLead = 'Ancora Consorcios: Motos'
                    tokenLead = '';
                } else if (tipo == 3) {
                    //PESADOS
                    labelLead = 'Ancora Consorcios: Pesados'
                    tokenLead = '';
                } else if (tipo == 4) {
                    //IMÓVEIS
                    labelLead = 'Ancora Consorcios: Imoveis'
                    tokenLead = '';
                } else if (tipo == 5) {
                    //SERVIÇOS
                    labelLead = 'Ancora Consorcios: Servicos'
                    tokenLead = '';
                }
                if (tokenLead != '') {
                    //Submete para API da Ancora
                    postData('https://cc.swr.work/lead', {
                        nome: $('#nome').val(),
                        email: $('#email').val(),
                        telefone: $('#telefone').val(),
                        cidade: $('#localizacao').val(),
                        token: tokenLead,
                        utm_source: labelLead
                    }).then(data => {
                        console.log(data);
                    });
                }
                $.ajax({
                    // url: "https://api.swr.work/cc/lead",
                    method: "post",
                    data: formData,
                    dataType: 'json',
                    success: function (data) {
                        if (data.retorno == 'sucesso') {
                            $('#modalSuccess').modal('show');
                            $('#formSimularConsorcio').each(function () {
                                $('input[type=radio]').prop("checked", false);
                                $('input[type=radio]').parent().removeClass('active');
                                this.reset();
                            });
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
    });
    
    
    
});
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
            if ($(this).val() == "" && !$(this).hasClass("opcional") && $(this).attr("type") != "hidden" && $(this).attr("type") != "email" && $(this).attr("type") != "radio") {
                var erros = {
                    'campo': $(this).attr("id"),
                    'msg': "Este campo está vázio."
                };
                camposVazios.push(erros);
            }
            else {
                $(this).next(".erro-form").remove();
            }

            if ($(this).attr("type") == "email" && !checkMail($(this).val())) {
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
            }
            else {
                $(this).next(".erro-form").remove();
            }

            if ($(this).attr("type") == "radio") {
                if ($(".form-check-modalities .form-check-input").is(":checked")) {
                    $(this).next(".erro-form").remove();
                }
                else {
                    var erros = {
                        'campo': $(this).attr("id"),
                        'msg': "Marque uma opção acima."
                    };
                    camposVazios.push(erros);
                }
            }
        }
    });
    if (camposVazios.length > 0) {
        // Inputs
        for (var i = 0; i < camposVazios.length; i++) {
            $(form + " input:not([type=radio])" + "#" + camposVazios[i].campo).parent().append("<span style='font-size: 12px; font-weight: 600; color: #ed1c24;' class='erro-form'>" + camposVazios[i].msg + "</span>");
        }
        // Input Radio
        for (var r = 0; r < camposVazios.length; r++) {
            $(form + " input[type=radio]" + "#" + camposVazios[r].campo).parent().parent().append("<span style='position: absolute; bottom: -16px; font-size: 12px; font-weight: 600; color: #ed1c24;' class='erro-form'>" + camposVazios[r].msg + "</span>");
        }
        // Selects
        for (var j = 0; j < camposVazios.length; j++) {
            $(form + " select" + "#" + camposVazios[j].campo).parent().parent().append("<span style='font-size: 12px; font-weight: 600; color: #ed1c24;' class='erro-form'>" + camposVazios[j].msg + "</span>");
        }
        // Textarea
        for (var j = 0; j < camposVazios.length; j++) {
            $(form + " textarea" + "#" + camposVazios[j].campo).parent().append("<span style='font-size: 12px; font-weight: 600; color: #ed1c24;' class='erro-form'>" + camposVazios[j].msg + "</span>");
        }
        return false;
    }
    return true;
}

function checkMail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}


async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': '',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    return response.json();
}