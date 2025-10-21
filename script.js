// ----------------------------------------------------------------------
// 1. Variáveis Globais
// ----------------------------------------------------------------------

// Procura pelos respectivos campos de "CEP" no documento HTML
const txt_cep = document.querySelector("#cep");
const txt_rua = document.querySelector("#rua");
const txt_num = document.querySelector("#numero");
const txt_cidade = document.querySelector("#cidade");
const txt_bairro = document.querySelector("#bairro");

// Procura pelo elemento de spinner 'Carregando' no documento HTML
const loadingOverlay = document.querySelector("#loadingOverlay");


// ----------------------------------------------------------------------
// 2. Funções de Lógica
// ----------------------------------------------------------------------

function consultaCEP() {
    // Lê o CEP digitado no campo "CEP" da página
    // para variável 'cep'
    let cep = txt_cep.value;

    // Verifica se o CEP digitado correponde ao padrão '00000-00'
    // ou seja, um CEP válido.
    if (txt_cep.value.match(/^\d{5}-\d{3}$/)) {
        // alert("CEP válido: "+cep);

        // Uma API permite que a gente obtenha informações
        // sem sair da página atual.
        // Nosso objetivo é obter as informações do cep dgitado.
        // A URL da API de CEP possui o seguinte formato:
        // https://viacep.com.br/ws/12345123/json/
        // Onde "12345123" é o CEP (sem traço, apenas números).

        // Remove o "-" (traço) da variável 'cep'.
        cep = cep.replace("-", "");

        // Exibe o spinner de 'Carregando'
        loadingOverlay.classList.add('d-flex');
        loadingOverlay.classList.remove('d-none');

        fetch('https://viacep.com.br/ws/'+cep+'/json/')
        .then(function(response) {
            // oculta o spinner 'Carregando'
            loadingOverlay.classList.add('d-none');
            loadingOverlay.classList.remove('d-flex');

            // Converte a resposta para JSON.
            return response.json();
        })
        .then (function(jsonResponse) {
            // Exibe a resposta convertida da API na console do navegador web.
            console.log(jsonResponse);

            // A API da ViaCEP retorna a chave 'erro' quando o CEP
            // digitado é inválido.
            if (jsonResponse.erro) {
                console.log("CEP inválido!");
                // Exibe a mensagem de "CEP inválido!" abaixo do campo de CEP.
                txt_cep.classList.add("is-invalid");
            } else { 
                // Remove a mensagem de "CEP inválido!" abaixo do campo de CEP (se existir)
                txt_cep.classList.remove("is-invalid");
                // Preenche os campos de texto com as informações retornadas pela API.
                txt_rua.value = jsonResponse.logradouro;
                txt_cidade.value = jsonResponse.localidade;
                txt_bairro.value = jsonResponse.bairro;
            }
        });
    }
}

// ----------------------------------------------------------------------
// 3. Escutadores de Eventos e Início
// ----------------------------------------------------------------------

// Executa função ao digitar qualquer tecla no campo "CEP"
txt_cep.addEventListener("keyup", consultaCEP);

// Adiciona máscara ao campo de CEP
jQuery(function($){
    $("#cep").mask("99999-999");
});
