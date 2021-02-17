let emialEnviado = false;
let texto = document.createElement("div");
let mensagem = false;
function confirma(){
  if(document.getElementById("exampleInputEmail1").value == "" || document.getElementById("exampleInputEmail1").value == " "){
    if(mensagem == false)
    document.body.appendChild(texto);
    texto.textContent = "insira um e-mail válido";
    texto.style.color = "red"
    document.getElementById("emailHelp").innerHTML = ""
    mensagem = true
    return false
  }

  if(emialEnviado == false){
    if(mensagem == true){
      document.body.removeChild(texto)
    }
 document.body.appendChild(texto);
 texto.textContent = "formulário de e-mail enviado ✔️";
 emialEnviado = true
 texto.style.color = "green"
 document.getElementById("emailHelp").innerHTML = ""
  }
}
