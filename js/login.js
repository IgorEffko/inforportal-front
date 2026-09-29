const form =
    document.getElementById("loginForm");

const mensagem =
    document.getElementById("mensagem");


// ==========================================
// USUÁRIOS
// ==========================================

function obterUsuarios() {

    const dados =
        localStorage.getItem(
            "usuariosInfoPortal"
        );


    if (!dados) {

        return [];

    }


    try {

        return JSON.parse(dados);

    } catch {

        return [];

    }

}


// ==========================================
// MENSAGEM
// ==========================================

function mostrarMensagem(
    texto,
    tipo
) {

    mensagem.textContent =
        texto;

    mensagem.className =
        `mensagem ${tipo}`;

}


// ==========================================
// LOGIN
// ==========================================

form.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const email =
            document
                .getElementById("email")
                .value
                .trim()
                .toLowerCase();


        const senha =
            document
                .getElementById("senha")
                .value;


        const usuarios =
            obterUsuarios();


        // ==================================
        // PROCURAR USUÁRIO
        // ==================================

        const usuario =
            usuarios.find(

                item =>

                    item.email === email &&

                    item.senha === senha

            );


        // ==================================
        // LOGIN INVÁLIDO
        // ==================================

        if (!usuario) {

            mostrarMensagem(

                "E-mail ou senha incorretos.",

                "erro"

            );

            return;

        }


        // ==================================
        // CRIAR SESSÃO SIMULADA
        // ==================================

        const sessao = {

            id:
                usuario.id,

            nome:
                usuario.nome,

            email:
                usuario.email,

            perfil:
                usuario.perfil

        };


        localStorage.setItem(

            "usuarioLogado",

            JSON.stringify(sessao)

        );


        // ==================================
        // SUCESSO
        // ==================================

        mostrarMensagem(

            `Login realizado com sucesso! Bem-vindo, ${usuario.nome}.`,

            "sucesso"

        );


        // ==================================
        // REDIRECIONAMENTO
        // ==================================

        setTimeout(

            function() {

                /*
                 * Por enquanto não vamos mandar
                 * para outra tela do sistema.
                 *
                 * Assim que a página inicial
                 * estiver pronta, colocaremos
                 * index.html aqui.
                 */

                window.location.href =
                    "index.html";

            },

            1000

        );

    }
);