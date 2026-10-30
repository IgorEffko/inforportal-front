
const usuario = JSON.parse(
    localStorage.getItem("usuarioLogado") || "null"
);

const form = document.getElementById("noticiaForm");
const mensagem = document.getElementById("mensagem");
const nomeUsuario = document.getElementById("nomeUsuario");
const statusServidor = document.getElementById("statusServidor");
const btnRascunho = document.getElementById("btnRascunho");
const btnSair = document.getElementById("btnSair");

const API = "http://127.0.0.1:3000/api";

axios.defaults.withCredentials = true;

if (!usuario) {
    window.location.href = "login.html";
} else if (usuario.perfil !== "jornalista") {
    window.location.href = "index.html";
} else {
    nomeUsuario.textContent = usuario.nome;
}

function mostrarMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = `mensagem ${tipo}`;
}

async function verificarServidor() {
    try {
        await axios.get(`${API}/status`);

        statusServidor.textContent = "Servidor conectado";
        statusServidor.className = "conectado";

    } catch (erro) {
        statusServidor.textContent = "Servidor desconectado";
        statusServidor.className = "desconectado";
    }
}

verificarServidor();

async function salvarNoticia(acao) {
    const dados = {
        titulo: document.getElementById("titulo").value.trim(),
        categoria: document.getElementById("categoria").value,
        tags: document.getElementById("tags").value.trim(),
        imagem: document.getElementById("imagem").value.trim(),
        resumo: document.getElementById("resumo").value.trim(),
        conteudo: document.getElementById("conteudo").value.trim(),
        acao: acao
    };

    if (!dados.titulo || !dados.categoria ||
        !dados.resumo || !dados.conteudo) {
        mostrarMensagem("Preencha todos os campos obrigatórios.", "erro");
        return;
    }

    try {
        const resposta = await axios.post(
            `${API}/noticias`,
            dados
        );

        mostrarMensagem(resposta.data.mensagem, "sucesso");

        if (acao === "revisao") {
            form.reset();
        }

    } catch (erro) {
        console.error("Erro ao salvar notícia:", erro);

        mostrarMensagem(
            erro.response?.data?.mensagem ||
            "Não foi possível salvar a notícia.",
            "erro"
        );
    }
}

form.addEventListener("submit", function(event) {
    event.preventDefault();
    salvarNoticia("revisao");
});

btnRascunho.addEventListener("click", function() {
    salvarNoticia("rascunho");
});

btnSair.addEventListener("click", async function() {
    try {
        await axios.post(`${API}/logout`);
    } catch (erro) {
        console.error("Erro ao sair:", erro);
    }

    localStorage.removeItem("usuarioLogado");
    window.location.href = "login.html";
});
