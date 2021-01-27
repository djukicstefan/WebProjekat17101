import {Kontejner} from "./kontejner.js"

export class Brod{
    constructor(brojUpotrebljivihKontejnera, maxKapacitet){
        this.n = 3;
        this.m = 3;
        this.maxKapacitet = maxKapacitet;
        this.brojUpotrebljivihKontejnera = brojUpotrebljivihKontejnera;
        this.trenutnaZauzetost = 0;
        this.paluba = null;
        this.kontejneri = new Array(this.n);
    

        for(var i = 0; i < this.n; i++){
            this.kontejneri[i] = new Array(this.n);
            for(var j = 0; j < this.m; j++)
                this.kontejneri[i][j] = new Kontejner("", "", 0, "");
        }
    }

    crtajBrodServerski(host, broj){
        this.paluba = document.createElement("div");
        this.paluba.className = "paluba";
        host.appendChild(this.paluba);

        let brojac = this.brojUpotrebljivihKontejnera + broj;
        
        for(var i = 0; i < this.n; i++){
            for(var j = 0; j < this.m; j++){
                if(brojac > 0){
                    this.kontejneri[i][j].crtajKontejner(this.paluba, true, this.kontejneri[i][j].oznaka);
                }
                else{
                    this.kontejneri[i][j].crtajKontejner(this.paluba, false, this.kontejneri[i][j].oznaka);
                }
                brojac--;
            }
        }

        let labell = document.createElement("label");
        labell.innerHTML = `${this.maxKapacitet}, ${this.trenutnaZauzetost}`;
        this.paluba.appendChild(labell);
    }


    dodajKontejner(kontejner){
        let moze = false;
        let jeste = false;

        for(let i = 0; i < this.n; i++){
            for(let j = 0; j < this.m; j++){
                if(this.kontejneri[i][j].oznaka == "U"){
                    this.kontejneri[i][j].azurirajKontejner(kontejner.ime, kontejner.ID, kontejner.tezina,
                        kontejner.oznaka);
                    moze = true;
                    this.trenutnaZauzetost += kontejner.tezina;
                    this.brojUpotrebljivihKontejnera--;
                    jeste = true;
                }
                if(jeste)
                break;
            }
            if(jeste)
                break;
        }
        return moze;
    }

    obrisiKontejner(ID){ 
        let tezina = 0;

        for(let i = 0; i < this.n; i++){
            for(let j = 0; j < this.m; j++){
                if(this.kontejneri[i][j].ID == ID){
                    tezina = this.kontejneri[i][j].tezina;
                    this.kontejneri[i][j].azurirajKontejner("", "", 0, "U");
                }
            }
        }

        this.trenutnaZauzetost -= tezina;
        this.brojUpotrebljivihKontejnera++;
    }

    sadrziKontejner(ID){
        for(let i = 0; i < this.n; i++){
            for(let j = 0; j < this.m; j++){
                if(this.kontejneri[i][j].ID == ID){
                    return true;
                }
            }
        }
        return false;
    }

    nemaUpotrebljivih(){
        for(let i = 0; i < this.n; i++){
            for(let j = 0; j < this.m; j++){
                if(this.kontejneri[i][j].oznaka == "U"){
                    this.kontejneri[i][j].azurirajKontejner("", "", 0, "N");
                }
            }
        }
    }
}