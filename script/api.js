$(document).ready(function(){
	$("#cep").mask("99999999");
});
/*addEventListener("input", function()
{
    console.log(`carregarcpf sendo chamado no caractere ${endereco.value.length}`);
    if(document.getElementById("cep").value.length ==  8)
    {
        let request = new XMLHttpRequest();
        request.open("GET",`https://viacep.com.br/ws/${endereco.value}`);
        request.addEventListener("load",function()
        {
            var usuario = JSON.parse(request.responseText);
            console.log(usuario);
        });
        request.send();
    }
});*/

function limpa_formulário_cep() {
    document.getElementById('rua').value=("");
    document.getElementById('bairro').value=("");
    document.getElementById('cidade').value=("");
}

function meu_callback(conteudo) {
if (!("erro" in conteudo)) {
    //Atualiza os campos com os valores.
    document.getElementById('rua').value=(conteudo.logradouro);
    document.getElementById('bairro').value=(conteudo.bairro);
    document.getElementById('cidade').value=(conteudo.localidade);
} //end if.
else {
    limpa_formulário_cep();
    alert("CEP não encontrado."); //COLOCAR MENSAGEM DE CEP NÃO ENCONTRADO.
}
}

function pesquisacep(valor) {

//Nova variável "cep" somente com dígitos.
var cep = valor.replace(/\D/g, '');

//Verifica se campo cep possui valor informado.
if (cep != "") {

    //Expressão regular para validar o CEP.
    var validacep = /^[0-9]{8}$/;

    //Valida o formato do CEP.
    if(validacep.test(cep)) {

        //Preenche os campos com "..." enquanto consulta webservice.
        document.getElementById('rua').value="...";
        document.getElementById('bairro').value="...";
        document.getElementById('cidade').value="...";

        //Cria um elemento javascript.
        var script = document.createElement('script');

        //Sincroniza com o callback.
        script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

        //Insere script no documento e carrega o conteúdo.
        document.body.appendChild(script);

    } //end if.
    else {
        //cep é inválido.
        limpa_formulário_cep();
        alert("Formato de CEP inválido.");
    }
} //end if.
else {
    //cep sem valor, limpa formulário.
    limpa_formulário_cep();
}
};
function cadastro()
{
    window.href="index.html"
}