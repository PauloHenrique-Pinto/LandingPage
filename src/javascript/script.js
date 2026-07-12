$(document).ready(function(){
    
    // 1. Botão do Menu Mobile
    $('#mobile_btn').on('click', function(){
        $('#mobile_pictures').toggleClass('active');
        $('#mobile_btn').find('i').toggleClass('fa-x');
    }); // <-- Corrigido ponto e vírgula aqui

    const sections = $('section');
    const navItems = $('.nav-item');

    // 2. Lógica de Scroll (Header e Menu Ativo)
    $(window).on('scroll', function(){
        const header = $('header');
        const scrollPosition = $(window).scrollTop() - header.outerHeight();

        let activeSectionIndex = 0; // <-- Corrigido: digitação de "activeSecctionIndex"
        
        if(scrollPosition <= 0){
            header.css('box-shadow', 'none');
        } else {
            header.css('box-shadow', '5px 1px 5px rgba(0,0,0,0.1)'); // <-- Corrigido: Fechamento do parênteses do rgba
        }

        sections.each(function(i){
            const section = $(this);
            const sectionTop = section.offset().top - 96;
            const sectionBottom = sectionTop + section.outerHeight();

            if(scrollPosition >= sectionTop && scrollPosition < sectionBottom){
                activeSectionIndex = i;
                return false;
            }
        });

        // REMOVIDO O ERRO DAQUI:
        // Antes: $(navItems[activeSecctionIndex].addClass('active'));
        
        // CORRIGIDO: Remove o ativo dos outros e adiciona no item atual usando .eq()
        navItems.removeClass('active');
        navItems.eq(activeSectionIndex).addClass('active'); 
    });

    ScrollReveal().reveal('#cta', {
      origin: 'left',
      duration: 2000,
      distance: '20%'
    })
    ScrollReveal().reveal('.dish', {
      origin: 'left',
      duration: 2000,
      distance: '20%'
    })
    ScrollReveal().reveal('#testimonial_chef', {
      origin: 'left',
      duration: 1000,
      distance: '20%'
    })
    ScrollReveal().reveal('.feedback', {
      origin: 'right',
      duration: 1000,

    })

    const music = document.getElementById('background-music');
const $musicBtn = $('#music-toggle');

// Tenta tocar a música assim que o usuário clicar em QUALQUER lugar da página
$(document).one('click', function() {
    music.play().then(() => {
        $musicBtn.addClass('playing').find('i').attr('class', 'fa-solid fa-compact-disc');
    }).catch(error => {
        console.log("Autoplay bloqueado pelo navegador. Aguardando clique no botão de música.");
    });
});

// Controle manual de Play/Pause ao clicar no botão flutuante
$musicBtn.on('click', function(e) {
    e.stopPropagation(); // Impede o clique de ativar o evento de cima
    
    if (music.paused) {
        music.play();
        $musicBtn.addClass('playing').find('i').attr('class', 'fa-solid fa-compact-disc');
    } else {
        music.pause();
        $musicBtn.removeClass('playing').find('i').attr('class', 'fa-solid fa-music');
    }
});

    // 3. Lógica do Quiz das Memórias
    $('.quiz-btn').on('click', function() {
        const $dish = $(this).closest('.dish');
        const $allButtons = $dish.find('.quiz-btn');
        
        const clickedIndex = $allButtons.index(this);
        const correctIndex = parseInt($dish.attr('data-correct'));
        
        $allButtons.removeClass('correct wrong');
        
        if (clickedIndex === correctIndex) {
            $(this).addClass('correct');
        } else {
            $(this).addClass('wrong');
        }
    });

}); // <-- Fechamento único e correto do $(document).ready