// ----------------------------------------------------------------------
// 1. Variáveis Globais
// ----------------------------------------------------------------------

// Procura pelos respectivos campos de "CEP" no documento HTML
const txt_cep = document.querySelector("#cep");
const txt_rua = document.querySelector("#rua");
const txt_num = document.querySelector("#numero");
const txt_cidade = document.querySelector("#cidade");
const txt_bairro = document.querySelector("#bairro");
const slt_estado = document.querySelector("#estado");

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

        /* Limpa os campos casdo tenham sido desabilitados.
        Exemplo: Usuário digitou um CEP de uma cidade e depois o CEP de Dois Irmãos/RS.
        Sem esta função, os campos não preenchidos (Rua, etc) continuam preenchidos com os dados anteriores. */
        limpaCampos();
        
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
                // Preenche e desabilita os campos de texto com as informações retornadas pela API.
                if (jsonResponse.logradouro !=="") {
                    txt_rua.value = jsonResponse.logradouro;
                    txt_rua.disabled = true;
                }
                
                if (jsonResponse.localidade !=="") {
                    txt_cidade.value = jsonResponse.localidade;
                    txt_cidade.disabled = true;
                }
                
                if (jsonResponse.bairro !=="") {
                    txt_bairro.value = jsonResponse.bairro;
                    txt_bairro.disabled = true;
                }
                
                if (jsonResponse.uf !=="") {
                    slt_estado.value = jsonResponse.uf;
                    slt_estado.disabled = true;
                }
                
            }
        });
    }
}

function limpaCampos() {
    /* Limpa os valores atuais dos campos*/
      txt_rua.value = "";
      txt_cidade.value = "";
      txt_bairro.value = "";
      txt_num.value = "";
      slt_estado.value = "";

      /* Reabilita os campos que por ventura possam ter sido desabilitados */
      txt_rua.disabled = false;
      txt_cidade.disabled = false;
      txt_bairro.disabled = false;
      slt_estado.disabled = false;
}

// ----------------------------------------------------------------------
// 3. Escutadores de Eventos e Início
// ----------------------------------------------------------------------

// Executa função ao digitar qualquer tecla no campo "CEP"
txt_cep.addEventListener("keyup", consultaCEP);

// Adiciona máscara ao campo de CEP
jQuery(function($){
    $("#cep").mask("99999-999");
    // Formata o campo de número para aceitar somente números.
    $('#numero').mask('0#', {
        translation: {
            '0': {pattern: /[0-9]/, recursive: true}
        }
    });
});
