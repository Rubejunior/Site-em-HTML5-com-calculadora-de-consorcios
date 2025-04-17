$(document).ready(function (){
    // Envia formulário Seja um Representante
    $('#formSejaUmRepresentante').submit(function(e) {
        e.preventDefault();
        var form = $(this);
        var formData = form.serializeArray();
        formData.push({name: 'acao', value:'addSolicitacao'});
        if (validaFormulario("#formSejaUmRepresentante")) {

            //Submete para API da Ancora
            postData('https://cc.swr.work/lead', {
                nome: $('#nome').val(),
                email: $('#email').val(),
                telefone: $('#telefone').val(),
                cidade: $('#cidade').val(),
                cnpj: $('#cnpj').val(),
                token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjbGllbnRlc19pZCI6NDUsImlhdCI6MTcwMDY1NzkzM30.51mbWq-dbz8cVEIJwxx3Xv9LWWAG5CIwn_ojjjDdijU',
                utm_source: 'Seja um Representante'
            }).then(data => {
                console.log(data);
            });

            $.ajax({
                method: "post",
                url: site_url + "/seja-um-representante",
                data: formData,
                dataType: 'json',
                success: function (data) {
                    if (data.retorno == 'sucesso') {
                        $('#modalSuccess').modal('show');
                        $('#formSejaUmRepresentante').each(function () {
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

    // Mascara CNPJ
    $('.cnpj').mask('00.000.000/0000-00');

    // Swiper Timeline
    var swiperEvento = new Swiper('.swiper-eventos-representantes', {
        slidesPerView: 1,
        spaceBetween: 1,
        autoplay: {
            delay: 7500,
        },
        navigation: {
            prevEl: '.eventos .swiper-button-prev',
            nextEl: '.eventos .swiper-button-next',
        },
        keyboard: {
            enabled: true,
            onlyInViewport: false
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 1,
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 1,
            },
            1200: {
                slidesPerView: 4,
                spaceBetween: 1,
            }
        }
    });

    // Swiper Depimentos Representantes
    var swiperEvento = new Swiper('.swiper-depoimentos-representantes', {
        slidesPerView: 1,
        spaceBetween: 1,
        autoplay: {
            delay: 7500,
        },
        navigation: {
            prevEl: '.depoimentos .swiper-button-prev',
            nextEl: '.depoimentos .swiper-button-next',
        },
        keyboard: {
            enabled: true,
            onlyInViewport: false
        },
        breakpoints: {
            768: {
                slidesPerView: 1,
                spaceBetween: 30,
            },
            992: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 30,
            }
        }
    });

    if ($('.swiper-eventos-representantes').length) {
        let alturaEvRepr = 0;
        $('.swiper-eventos-representantes .swiper-slide').each(function(){
            if ($(this).height() > alturaEvRepr)
                alturaEvRepr = $(this).height();
        });
        $('.swiper-eventos-representantes .swiper-slide').each(function() {
            $(this).css('height', alturaEvRepr + 'px');
        });
    }

    if ($('.swiper-depoimentos-representantes').length) {
        let alturaDepRepr = 0;
        $('.swiper-depoimentos-representantes .swiper-slide').each(function(){
            if ($(this).height() > alturaDepRepr)
                alturaDepRepr = $(this).height();
        });
        $('.swiper-depoimentos-representantes .swiper-slide').each(function() {
            $(this).css('height', alturaDepRepr + 'px');
        });
    }

    $('.btn_seja_representante').click(function(e){
        e.preventDefault();
        $('#modalForm').modal('show');
        return false;
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
            if ($(this).val() == "" && !$(this).hasClass("opcional") && $(this).attr("type") != "hidden" && $(this).attr("type") != "email") {
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
        }
    });
    if (camposVazios.length > 0) {
        // Inputs
        for (var i = 0; i < camposVazios.length; i++) {
            $(form + " input" + "#" + camposVazios[i].campo).parent().append("<span style='position: absolute; font-size: 12px; font-weight: 600; color: #ed1c24;' class='erro-form'>" + camposVazios[i].msg + "</span>");
        }
        // Selects
        for (var j = 0; j < camposVazios.length; j++) {
            $(form + " select" + "#" + camposVazios[j].campo).parent().parent().append("<span style='color: #ed1c24;font-size: 12px;display: block;line-height: 20px;' class='erro-form'>" + camposVazios[j].msg + "</span>");
        }
        // Textarea
        for (var j = 0; j < camposVazios.length; j++) {
            $(form + " textarea" + "#" + camposVazios[j].campo).parent().append("<span style='position: absolute;left: 0.75rem;bottom: -1.25rem;font-size: 12px;color: #ed1c24;' class='erro-form'>" + camposVazios[j].msg + "</span>");
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
            'x-api-key' : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjbGllbnRlc19pZCI6MjksImlhdCI6MTY2NDQ1NTY1NH0.boC2budOsSqWvppDtvFGGYtM92pSzd1SHs7eXk6p6-w',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    return response.json();
}