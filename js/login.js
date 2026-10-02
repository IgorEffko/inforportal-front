const form = document.getElementById("loginForm");
const mensagem = document.getElementById("mensagem");

function obterUsuarios() {
    const dados = localStorage.getItem("usuariosInfoPortal");

    if (!dados) {
        return [];
    }

    try {
        return JSON.parse(dados);
    } catch {
        return [];
    }
}

function mostrarMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = `mensagem ${tipo}`;
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document
        .getElementById("email")
        .value
        .trim()
        .toLowerCase();

    const senha = document
        .getElementById("senha")
        .value;

    const usuarios = obterUsuarios();

    const usuario = usuarios.find(
        item => item.email === email && item.senha === senha
    );

    if (!usuario) {
        mostrarMensagem(
            "E-mail ou senha incorretos.",
            "erro"
        );

        return;
    }

    const sessao = {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        perfil: usuario.perfil
    };

    localStorage.setItem(
        "usuarioLogado",
        JSON.stringify(sessao)
    );

    mostrarMensagem(
        `Login realizado com sucesso! Bem-vindo, ${usuario.nome}.`,
        "sucesso"
    );

    setTimeout(function() {
        window.location.href = "index.html";
    }, 1000);
});