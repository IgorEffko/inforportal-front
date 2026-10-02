const buscaForm = document.getElementById("buscaForm");
const resultados = document.getElementById("resultados");
const mensagem = document.getElementById("mensagem");
const contadorResultados = document.getElementById("contadorResultados");

const noticias = [
    {
        titulo: "Nova tecnologia transforma o jornalismo",
        descricao: "Novas ferramentas digitais estão mudando a forma como as notícias são produzidas e consumidas.",
        categoria: "tecnologia",
        autor: "Equipe InfoPortal",
        data: "2026-10-01"
    },
    {
        titulo: "Debate sobre educação ganha destaque",
        descricao: "Especialistas discutem os principais desafios da educação no cenário atual.",
        categoria: "politica",
        autor: "Equipe InfoPortal",
        data: "2026-09-30"
    },
    {
        titulo: "Economia brasileira apresenta novas perspectivas",
        descricao: "Especialistas analisam as novas perspectivas para a economia brasileira.",
        categoria: "economia",
        autor: "Equipe InfoPortal",
        data: "2026-09-29"
    }
];

function obterFiltros() {
    return {
        termo: document.getElementById("termo").value.trim().toLowerCase(),
        categoria: document.getElementById("categoria").value,
        autor: document.getElementById("autor").value.trim().toLowerCase(),
        data: document.getElementById("data").value
    };
}

function filtrarNoticias(filtros) {
    return noticias.filter(function(noticia) {
        const correspondeTermo =
            !filtros.termo ||
            noticia.titulo.toLowerCase().includes(filtros.termo) ||
            noticia.descricao.toLowerCase().includes(filtros.termo);

        const correspondeCategoria =
            !filtros.categoria ||
            noticia.categoria === filtros.categoria;

        const correspondeAutor =
            !filtros.autor ||
            noticia.autor.toLowerCase().includes(filtros.autor);

        const correspondeData =
            !filtros.data ||
            noticia.data === filtros.data;

        return (
            correspondeTermo &&
            correspondeCategoria &&
            correspondeAutor &&
            correspondeData
        );
    });
}

function exibirNoticias(lista) {
    resultados.innerHTML = "";

    contadorResultados.textContent =
        `${lista.length} resultado${lista.length !== 1 ? "s" : ""}`;

    if (lista.length === 0) {
        mensagem.textContent =
            "Nenhum resultado encontrado.";

        mensagem.style.display = "block";
        return;
    }

    mensagem.style.display = "none";

    lista.forEach(function(noticia) {
        const card = document.createElement("article");

        card.className = "noticia-card";

        card.innerHTML = `
            <h3>${noticia.titulo}</h3>
            <p>${noticia.descricao}</p>

            <div class="noticia-info">
                <span>${noticia.categoria}</span>
                <span>${noticia.autor}</span>
                <span>${noticia.data}</span>
            </div>
        `;

        resultados.appendChild(card);
    });
}

function buscarNoticias() {
    const filtros = obterFiltros();
    const noticiasFiltradas = filtrarNoticias(filtros);

    exibirNoticias(noticiasFiltradas);
}

buscaForm.addEventListener("submit", function(event) {
    event.preventDefault();
    buscarNoticias();
});

exibirNoticias(noticias);