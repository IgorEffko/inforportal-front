const btnCurtir = document.getElementById("btnCurtir");
const contadorCurtidas = document.getElementById("contadorCurtidas");
const comentarioForm = document.getElementById("comentarioForm");
const comentarioInput = document.getElementById("comentario");
const comentarios = document.getElementById("comentarios");
const mensagem = document.getElementById("mensagem");

let curtidas = 0;
let curtidaAtiva = false;

const comentariosExemplo = [
    {
        autor: "Maria Silva",
        texto: "Ótima notícia. Informação muito importante."
    },
    {
        autor: "João Santos",
        texto: "Gostei do conteúdo e da explicação."
    }
];

function atualizarCurtidas() {
    contadorCurtidas.textContent =
        `${curtidas} curtida${curtidas !== 1 ? "s" : ""}`;
}

function alternarCurtida() {
    curtidaAtiva = !curtidaAtiva;

    if (curtidaAtiva) {
        curtidas++;
        btnCurtir.textContent = "♥ Curtido";
        btnCurtir.classList.add("ativo");
    } else {
        curtidas--;
        btnCurtir.textContent = "♡ Curtir";
        btnCurtir.classList.remove("ativo");
    }

    atualizarCurtidas();
}

function exibirComentarios() {
    comentarios.innerHTML = "";

    comentariosExemplo.forEach(function(comentario) {
        const elemento = document.createElement("div");

        elemento.className = "comentario";

        elemento.innerHTML = `
            <div class="comentario-autor">
                ${comentario.autor}
            </div>

            <div class="comentario-texto">
                ${comentario.texto}
            </div>
        `;

        comentarios.appendChild(elemento);
    });
}

function adicionarComentario() {
    const texto = comentarioInput.value.trim();

    if (!texto) {
        return;
    }

    const novoComentario = {
        autor: "Usuário",
        texto: texto
    };

    comentariosExemplo.unshift(novoComentario);

    exibirComentarios();

    comentarioInput.value = "";

    mensagem.textContent = "Comentário enviado com sucesso.";
    mensagem.style.display = "block";
}

btnCurtir.addEventListener("click", alternarCurtida);

comentarioForm.addEventListener("submit", function(event) {
    event.preventDefault();
    adicionarComentario();
});

atualizarCurtidas();
exibirComentarios();