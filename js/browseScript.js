class Controller{
    constructor(){
        this.films = new FilmModel();
        this.view = new View(this.films);
    }
    loadPage(){
        this.view.appendPosters();
    }
}

class View{
    constructor(model){
        this.posters = [];
        this.films = [];
        this.main = document.getElementsByTagName("main")[0];
        for(let i = 0; i < model.films.length; i++){
            this.films[i] = model.films[i]
            this.posters[i] = model.films[i].Poster;
        }
    }
    appendPosters(){
        for(let poster in this.posters){
            let img = document.createElement("img");
            img.setAttribute("class", "poster");
            img.src = this.posters[poster];
            img.addEventListener('click', () => {
                localStorage.setItem("film", JSON.stringify(this.films[poster]));
                location.href = "http://127.0.0.1:5500/info.html";
            })
            this.main.append(img);
        }
    }
}

class FilmModel{
    constructor(){
        this.films = this.receiveData();
    }

    receiveData(){
        let filmsArray = [];
        let data = this.makeRequest(1);
        filmsArray = data.Search;
        data = this.makeRequest(2);
        filmsArray.push(data.Search[0]);
        filmsArray.push(data.Search[1]);

        return filmsArray;
    }

    makeRequest(page){
        let result;
        let request = new XMLHttpRequest();
        request.open("GET", `http://www.omdbapi.com/?apikey=9c2c1474&s=Batman&page=${page}`, false);
        request.addEventListener('load', () => {
            let e;
            try{
                if(request.status == 200){
                    result = JSON.parse(request.responseText);
                }
                else{
                    e = new Error("Unexpected return!");
                    throw e;
                }
            }
            catch{
                console.log(e);
            }
        })
        request.send();
        return result;
    }
}

let c = new Controller();
c.loadPage();