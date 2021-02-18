class Controller{
    constructor(){
        this.model = new FilmModel();
        this.view = new View();
    }
    loadPage(){
        this.view.appendPoster(this.model);
        this.view.appendInfo(this.model);
    }
}

class FilmModel{
    constructor(){
        this.film = JSON.parse(localStorage.getItem("film"));
        this.info = this.receiveData();
    }

    receiveData(){
        let result;
        let request = new XMLHttpRequest();
        request.open("GET", `http://www.omdbapi.com/?apikey=9c2c1474&i=${this.film.imdbID}`, false);
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

class View{
    constructor(){
        this.posterContainer = document.getElementById("posterContainer");
        this.infoContainer = document.getElementById("posterInfoContainer");
    }
    appendPoster(model){
        let img = document.createElement("img");
        img.src = model.film.Poster;
        img.setAttribute("class", "poster");
        this.posterContainer.append(img);
    }
    appendInfo(model){
        let title = document.createElement("h3");
        title.textContent = model.film.Title;
        this.infoContainer.append(title);

        let year = document.createElement("h4");
        year.textContent = model.film.Year;
        this.infoContainer.append(year);

        let info = document.createElement("p");
        info.textContent = model.info.Plot;
        this.infoContainer.append(info);
    }
}

let c = new Controller;
c.loadPage();