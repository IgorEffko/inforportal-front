
const form = document.getElementById("loginForm");
const mensagem = document.getElementById("mensagem");

function mostrarMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = `mensagem ${tipo}`;
}

form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim().toLowerCase();
    const senha = document.getElementById("senha").value;

    if (!email || !senha) {
        mostrarMensagem("Preencha o e-mail e a senha.", "erro");
        return;
    }

    mostrarMensagem("Verificando seus dados...", "sucesso");

    try {
        const resposta = await axios.post(
            "http://127.0.0.1:3000/api/login",
            { email, senha },
            { withCredentials: true }
        );

        const retorno = resposta.data;

        if (retorno.sucesso && retorno.usuario) {
            const usuario = retorno.usuario;

            localStorage.setItem(
                "usuarioLogado",
                JSON.stringify(usuario)
            );

            mostrarMensagem(`Bem-vindo(a), ${usuario.nome}!`, "sucesso");

            setTimeout(function() {
                switch (usuario.perfil) {
                    case "jornalista":
                        window.location.href = "publicar.html";
                        break;
                    case "editor":
                        window.location.href = "editor.html";
                        break;
                    case "administrador":
                        window.location.href = "admin.html";
                        break;
                    default:
                        window.location.href = "index.html";
                }
            }, 1000);
        }

    } catch (erro) {
        console.error("Erro no login:", erro);

        mostrarMensagem(
            erro.response?.data?.mensagem ||
            "Não foi possível conectar ao servidor.",
            "erro"
        );
    }
});
