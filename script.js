// ----------------------------------------------------------------------
// 1. Variáveis Globais
// ----------------------------------------------------------------------

// Procura pelo campo de "CEP" no documento HTML
const txt_cep = document.querySelector("#cep");

// ----------------------------------------------------------------------
// 2. Funções de Lógica
// ----------------------------------------------------------------------

function consultaCEP() {
    alert("Olá mundo!");
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
