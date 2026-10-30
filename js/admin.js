
const API = "http://127.0.0.1:3000/api";

axios.defaults.withCredentials = true;

const usuario = JSON.parse(localStorage.getItem("usuarioLogado") || "null");

const nomeUsuario = document.getElementById("nomeUsuario");
const mensagem = document.getElementById("mensagem");

if (!usuario || usuario.perfil !== "administrador") {
    window.location.href = "login.html";
} else {
    if (nomeUsuario) {
        nomeUsuario.textContent = usuario.nome;
    }

    carregarResumo();
    carregarUsuarios();
    carregarNoticias();
}

function mostrarMensagem(texto, tipo = "erro") {
    if (!mensagem) return;

    mensagem.textContent = texto;
    mensagem.className = `mensagem ${tipo}`;
}

function formatarData(data) {
    if (!data) return "—";

    const dataConvertida = new Date(data);

    if (Number.isNaN(dataConvertida.getTime())) {
        return "—";
    }

    return dataConvertida.toLocaleDateString("pt-BR");
}

function criarBadge(valor) {
    const badge = document.createElement("span");
    badge.className = `badge badge-${String(valor).toLowerCase()}`;
    badge.textContent = valor || "—";
    return badge;
}

// RESUMO DO PAINEL
async function carregarResumo() {
    try {
        const resposta = await axios.get(`${API}/admin/resumo`);
        const dados = resposta.data;

        document.getElementById("totalUsuarios").textContent =
            dados.usuarios ?? 0;

        document.getElementById("totalNoticias").textContent =
            dados.noticias ?? 0;

        document.getElementById("totalRevisao").textContent =
            dados.revisao ?? 0;

        document.getElementById("totalPublicadas").textContent =
            dados.publicadas ?? 0;

    } catch (erro) {
        console.error("Erro ao carregar resumo:", erro);
        mostrarMensagem("Não foi possível carregar os dados do painel.");
    }
}

// LISTA DE USUÁRIOS
async function carregarUsuarios() {
    const lista = document.getElementById("listaUsuarios");

    try {
        const resposta = await axios.get(`${API}/admin/usuarios`);
        const usuarios = resposta.data;

        lista.innerHTML = "";

        if (!usuarios.length) {
            lista.innerHTML = `
                <tr>
                    <td colspan="5">Nenhum usuário cadastrado.</td>
                </tr>
            `;
            return;
        }

        usuarios.forEach(usuario => {
            const linha = document.createElement("tr");

            const valores = [
                usuario.id,
                usuario.nome,
                usuario.email,
                usuario.perfil,
                formatarData(usuario.data_cadastro)
            ];

            valores.forEach((valor, indice) => {
                const coluna = document.createElement("td");

                if (indice === 3) {
                    coluna.appendChild(criarBadge(valor));
                } else {
                    coluna.textContent = valor ?? "—";
                }

                linha.appendChild(coluna);
            });

            lista.appendChild(linha);
        });

    } catch (erro) {
        console.error("Erro ao carregar usuários:", erro);
        lista.innerHTML = `
            <tr>
                <td colspan="5">Erro ao carregar usuários.</td>
            </tr>
        `;
    }
}

// LISTA DE NOTÍCIAS
async function carregarNoticias() {
    const lista = document.getElementById("listaNoticias");

    try {
        const resposta = await axios.get(`${API}/admin/noticias`);
        const noticias = resposta.data;

        lista.innerHTML = "";

        if (!noticias.length) {
            lista.innerHTML = `
                <tr>
                    <td colspan="6">Nenhuma notícia cadastrada.</td>
                </tr>
            `;
            return;
        }

        noticias.forEach(noticia => {
            const linha = document.createElement("tr");

            const valores = [
                noticia.id,
                noticia.titulo,
                noticia.categoria,
                noticia.autor_nome,
                noticia.status,
                formatarData(noticia.data_criacao)
            ];

            valores.forEach((valor, indice) => {
                const coluna = document.createElement("td");

                if (indice === 4) {
                    coluna.appendChild(criarBadge(valor));
                } else {
                    coluna.textContent = valor ?? "—";
                }

                linha.appendChild(coluna);
            });

            lista.appendChild(linha);
        });

    } catch (erro) {
        console.error("Erro ao carregar notícias:", erro);
        lista.innerHTML = `
            <tr>
                <td colspan="6">Erro ao carregar notícias.</td>
            </tr>
        `;
    }
}

// ATUALIZAR USUÁRIOS
document.getElementById("btnAtualizarUsuarios")
    ?.addEventListener("click", carregarUsuarios);

// ATUALIZAR NOTÍCIAS
document.getElementById("btnAtualizarNoticias")
    ?.addEventListener("click", carregarNoticias);

// SAIR DO SISTEMA
document.getElementById("btnSair")
    ?.addEventListener("click", async () => {
        try {
            await axios.post(`${API}/logout`);
        } catch (erro) {
            console.error("Erro ao sair:", erro);
        }

        localStorage.removeItem("usuarioLogado");
        window.location.href = "login.html";
    });
