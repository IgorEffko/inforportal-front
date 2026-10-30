
const API = "http://127.0.0.1:3000/api";

axios.defaults.withCredentials = true;

// ========================================
// ELEMENTOS DA PÁGINA
// ========================================

const nomeUsuario = document.getElementById("nomeUsuario");
const btnSair = document.getElementById("btnSair");
const btnAtualizar = document.getElementById("btnAtualizar");

const totalRevisao = document.getElementById("totalRevisao");
const totalAprovadas = document.getElementById("totalAprovadas");
const totalRejeitadas = document.getElementById("totalRejeitadas");

const listaNoticias = document.getElementById("listaNoticias");
const mensagem = document.getElementById("mensagem");

// ========================================
// VERIFICAR USUÁRIO
// ========================================

const usuarioSalvo = localStorage.getItem("usuarioLogado");

if (!usuarioSalvo) {
    window.location.href = "login.html";
}

let usuario;

try {
    usuario = JSON.parse(usuarioSalvo);
} catch (erro) {
    localStorage.removeItem("usuarioLogado");
    window.location.href = "login.html";
}

if (usuario && usuario.perfil !== "editor") {
    alert("Você não tem permissão para acessar o painel do editor.");
    window.location.href = "index.html";
}

// ========================================
// MOSTRAR NOME DO EDITOR
// ========================================

if (usuario && nomeUsuario) {
    nomeUsuario.textContent = usuario.nome;
}

// ========================================
// MENSAGENS
// ========================================

function mostrarMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = `mensagem ${tipo}`;
}

function limparMensagem() {
    mensagem.textContent = "";
    mensagem.className = "mensagem";
}

// ========================================
// CARREGAR INDICADORES
// ========================================

async function carregarResumo() {
    try {
        const resposta = await axios.get(
            `${API}/editor/resumo`
        );

        const resumo = resposta.data.resumo;

        totalRevisao.textContent = resumo.revisao;
        totalAprovadas.textContent = resumo.aprovadas;
        totalRejeitadas.textContent = resumo.rejeitadas;

    } catch (erro) {
        console.error("Erro ao carregar indicadores:", erro);

        if (erro.response?.status === 401) {
            localStorage.removeItem("usuarioLogado");
            window.location.href = "login.html";
            return;
        }

        if (erro.response?.status === 403) {
            alert("Você não tem permissão para acessar o painel.");
            window.location.href = "index.html";
        }
    }
}

// ========================================
// FORMATAR DATA
// ========================================

function formatarData(data) {
    if (!data) {
        return "Data não disponível";
    }

    return new Date(data).toLocaleString("pt-BR");
}

// ========================================
// CARREGAR NOTÍCIAS PARA REVISÃO
// ========================================

async function carregarNoticias() {
    listaNoticias.innerHTML = `
        <p class="carregando">Carregando notícias...</p>
    `;

    limparMensagem();

    try {
        const resposta = await axios.get(
            `${API}/editor/noticias`
        );

        const noticias = resposta.data.noticias;

        if (!noticias || noticias.length === 0) {
            listaNoticias.innerHTML = `
                <p class="carregando">
                    Nenhuma notícia aguardando revisão.
                </p>
            `;

            return;
        }

        listaNoticias.innerHTML = "";

        noticias.forEach(function(noticia) {
            const card = document.createElement("article");
            card.className = "noticia-card";

            const informacoes = document.createElement("div");
            informacoes.className = "noticia-info";

            const titulo = document.createElement("h3");
            titulo.textContent = noticia.titulo;

            const autor = document.createElement("p");
            autor.textContent = `Autor: ${noticia.autor_nome}`;

            const categoria = document.createElement("p");
            categoria.textContent = `Categoria: ${noticia.categoria}`;

            const data = document.createElement("p");
            data.textContent = `Enviada em: ${formatarData(noticia.data_criacao)}`;

            const resumo = document.createElement("p");
            resumo.className = "noticia-resumo";
            resumo.textContent = noticia.resumo;

            informacoes.append(
                titulo,
                autor,
                categoria,
                data,
                resumo
            );

            const acoes = document.createElement("div");
            acoes.className = "noticia-acoes";

            const btnVisualizar = document.createElement("button");
            btnVisualizar.className = "btn-visualizar";
            btnVisualizar.textContent = "Visualizar";

            btnVisualizar.addEventListener("click", function() {
                visualizarNoticia(noticia);
            });

            const btnAprovar = document.createElement("button");
            btnAprovar.className = "btn-aprovar";
            btnAprovar.textContent = "Aprovar";

            btnAprovar.addEventListener("click", function() {
                aprovarNoticia(noticia.id);
            });

            const btnRejeitar = document.createElement("button");
            btnRejeitar.className = "btn-rejeitar";
            btnRejeitar.textContent = "Rejeitar";

            btnRejeitar.addEventListener("click", function() {
                rejeitarNoticia(noticia.id);
            });

            acoes.append(
                btnVisualizar,
                btnAprovar,
                btnRejeitar
            );

            card.append(informacoes, acoes);
            listaNoticias.appendChild(card);
        });

    } catch (erro) {
        console.error("Erro ao carregar notícias:", erro);

        if (erro.response?.status === 401) {
            localStorage.removeItem("usuarioLogado");
            window.location.href = "login.html";
            return;
        }

        if (erro.response?.status === 403) {
            alert("Acesso permitido somente para editores.");
            window.location.href = "index.html";
            return;
        }

        listaNoticias.innerHTML = `
            <p class="carregando">
                Não foi possível carregar as notícias.
            </p>
        `;
    }
}

// ========================================
// VISUALIZAR NOTÍCIA
// ========================================

function visualizarNoticia(noticia) {
    const janela = window.open("", "_blank");

    if (!janela) {
        alert("Permita a abertura de novas janelas para visualizar a notícia.");
        return;
    }

    const titulo = escaparHTML(noticia.titulo);
    const autor = escaparHTML(noticia.autor_nome);
    const categoria = escaparHTML(noticia.categoria);
    const resumo = escaparHTML(noticia.resumo);
    const conteudo = escaparHTML(noticia.conteudo);
    const tags = escaparHTML(noticia.tags || "Sem tags");
    const imagem = escaparHTML(noticia.imagem || "");

    janela.document.write(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${titulo} • InfoPortal</title>
            <style>
                body {
                    margin: 0;
                    padding: 40px 20px;
                    background: #0b1120;
                    color: #eef2f7;
                    font-family: Arial, Helvetica, sans-serif;
                }

                main {
                    max-width: 850px;
                    margin: auto;
                    background: #151e2e;
                    padding: 30px;
                    border-radius: 12px;
                }

                h1 {
                    color: #ffffff;
                }

                .detalhes {
                    color: #9fa9b8;
                    margin-bottom: 25px;
                }

                .resumo {
                    color: #cbd5e1;
                    font-size: 18px;
                    margin-bottom: 25px;
                }

                .conteudo {
                    white-space: pre-wrap;
                    line-height: 1.8;
                }

                img {
                    max-width: 100%;
                    border-radius: 10px;
                    margin: 20px 0;
                }
            </style>
        </head>
        <body>
            <main>
                <h1>${titulo}</h1>
                <p class="detalhes">
                    Autor: ${autor}<br>
                    Categoria: ${categoria}<br>
                    Tags: ${tags}
                </p>
                ${imagem ? `<img src="${imagem}" alt="Imagem da notícia">` : ""}
                <p class="resumo">${resumo}</p>
                <div class="conteudo">${conteudo}</div>
            </main>
        </body>
        </html>
    `);

    janela.document.close();
}

// ========================================
// PROTEGER TEXTO EXIBIDO NA VISUALIZAÇÃO
// ========================================

function escaparHTML(texto) {
    return String(texto).replace(/[&<>"']/g, function(caractere) {
        const caracteres = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        };

        return caracteres[caractere];
    });
}

// ========================================
// APROVAR NOTÍCIA
// ========================================

async function aprovarNoticia(id) {
    const confirmar = confirm(
        "Tem certeza de que deseja aprovar esta notícia?"
    );

    if (!confirmar) {
        return;
    }

    try {
        const resposta = await axios.put(
            `${API}/editor/noticias/${id}/aprovar`
        );

        mostrarMensagem(
            resposta.data.mensagem,
            "sucesso"
        );

        await carregarNoticias();
        await carregarResumo();

    } catch (erro) {
        console.error("Erro ao aprovar notícia:", erro);

        mostrarMensagem(
            erro.response?.data?.mensagem ||
            "Não foi possível aprovar a notícia.",
            "erro"
        );
    }
}

// ========================================
// REJEITAR NOTÍCIA
// ========================================

async function rejeitarNoticia(id) {
    const justificativa = prompt(
        "Informe o motivo da rejeição desta notícia:"
    );

    if (justificativa === null) {
        return;
    }

    if (!justificativa.trim()) {
        alert("Você precisa informar o motivo da rejeição.");
        return;
    }

    try {
        const resposta = await axios.put(
            `${API}/editor/noticias/${id}/rejeitar`,
            {
                justificativa: justificativa.trim()
            }
        );

        mostrarMensagem(
            resposta.data.mensagem,
            "sucesso"
        );

        await carregarNoticias();
        await carregarResumo();

    } catch (erro) {
        console.error("Erro ao rejeitar notícia:", erro);

        mostrarMensagem(
            erro.response?.data?.mensagem ||
            "Não foi possível rejeitar a notícia.",
            "erro"
        );
    }
}

// ========================================
// ATUALIZAR LISTA
// ========================================

btnAtualizar.addEventListener("click", async function() {
    await carregarNoticias();
    await carregarResumo();
});

// ========================================
// SAIR DA CONTA
// ========================================

btnSair.addEventListener("click", async function() {
    try {
        await axios.post(`${API}/logout`);

    } catch (erro) {
        console.error("Erro ao sair:", erro);

    } finally {
        localStorage.removeItem("usuarioLogado");
        window.location.href = "login.html";
    }
});

// ========================================
// INICIALIZAR PAINEL
// ========================================

if (usuario && usuario.perfil === "editor") {
    carregarNoticias();
    carregarResumo();
}
