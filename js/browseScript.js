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
        this.main = document.getElementsByTagName("main")[0];
        for(let i = 0; i < model.films.length; i++){
            this.posters[i] = model.films[i].Poster;
        }
    }
    appendPosters(){
        for(let poster in this.posters){
            let img = document.createElement("img");
            img.setAttribute("class", "poster");
            img.src = this.posters[poster];
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
        let request = new XMLHttpRequest();
        request.open("GET", "http://www.omdbapi.com/?apikey=9c2c1474&s=Disney", false);
        request.addEventListener('load', () => {
            let e = new Error("Unexpected return!");
            try{
                if(request.status == 200){
                    let result = JSON.parse(request.responseText);
                    filmsArray = result.Search;
                    console.log(filmsArray);
                }
                else{
                    throw e;
                }
            }
            catch{
                console.log(e);
            }
        })
        request.send();
        return filmsArray;
    }
}

let c = new Controller();
c.loadPage();