//Mock user
const mockUsername = "admin";
const mockPassword = "";

class UserModel{
    constructor(){
        this._username = undefined;
        this._password = undefined;
        this.cep = undefined;
    }

    get username(){
        return this._username;
    }

    get password(){
        return this._password
    }

    set username(input){
        this._username = input;
    }

    set password(input){
        this._password = input;
    }
};

class Controller{
    constructor(){
        this.user = new UserModel();
        this.view = new LoginView();
        this.eventListeners();
    }

    eventListeners(){
        this.view.loginBtn.addEventListener('click', this.loginCheck.bind(this));
    }

    loginCheck(){
        this.user.username = this.view.usernameBtn.value;
        this.user.password = this.view.passwordBtn.value;
        if(this.user.username != mockUsername || this.user.password != mockPassword){
            this.view.invalidLogin();
            return;
        }
        else{
            this.view.nextPage();
        }
    }
}

class LoginView{
    constructor(){
        //Buttons
        this.usernameBtn = document.getElementById("inputUsername");
        this.passwordBtn = document.getElementById("inputPassword");
        this.loginBtn = document.getElementById("loginBtn");
        this.rememberBtn = document.getElementById("rememberBtn");

        //Tags
        this.main = document.getElementsByTagName("main")[0];
        this.form = document.getElementsByTagName("form")[0];
        this.header = document.getElementsByTagName("header")[0];
        this.footer = document.getElementsByTagName("footer")[0];
    }

    invalidLogin(){
        let p = document.createElement("p");
        p.textContent = "Credenciais inválidos."
        p.setAttribute("id", "wrongPassword");
        if(document.getElementById("wrongPassword") != null) return;
        this.form.append(p);
    }

    nextPage(){
        console.log("do it");
        location.href = "https://gabrielladiasa.github.io/browse.html";
    }
}

let c = new Controller();