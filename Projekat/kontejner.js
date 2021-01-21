export class Kontejner{
    
    constructor(ime, ID, tezina, oznaka, boja){
        this.ime = ime;
        this.ID = ID;
        this.tezina = tezina;
        this.oznaka = oznaka;
        this.miniKontejner = null;
        this.boja = boja;
    }

    crtajKontejner(host, nesto, oznaka, boja){
        this.miniKontejner = document.createElement("div");
        this.miniKontejner.className = "kontejner";
        if(nesto == true){
            if(oznaka == "" || oznaka == "U"){
                this.oznaka = "U";
                this.boja = "green";
            }
            else if(boja == null){
                this.boja = this.vratiBoju(oznaka);
            }
        }
        else{
            this.oznaka = "N";
            this.boja = "red";
        }

        this.miniKontejner.style.backgroundColor = this.boja
        this.miniKontejner.innerHTML = this.oznaka;

        host.appendChild(this.miniKontejner);
    }

    azurirajKontejner(ime, ID, tezina, oznaka, boja){
        this.ime = ime;
        this.ID = ID;
        this.tezina = tezina;
        this.oznaka = oznaka;
        this.boja = this.vratiBoju(oznaka);

        this.miniKontejner.innerHTML = this.oznaka;
        this.miniKontejner.style.backgroundColor = this.boja;
    }

    vratiBoju(oznaka){
        let boja;
        switch(oznaka){
            case "H":{
                boja = "yellow";
                break;
            }
            case "G":{
                boja = "brown";
                break;
            }
            case "V":{
                boja = "blue";
                break;
            }
            case "N":{
                boja = "red";
                break;
            }
            default:{
                boja = "orange";
            }
        }
        return boja;
    }

    
}