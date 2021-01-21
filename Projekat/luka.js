import {Brod} from "./brod.js"
import { Kontejner } from "./kontejner.js";

export class Luka{
    constructor(){
        this.brodovi = new Array();
        this.kontejner = null;
    }

    dodajBrod(brod){
        this.brodovi.push(brod);
    }

    crtajLuku(host){

        this.kontejner = document.createElement("div");
        this.kontejner.className = "luka";
        host.appendChild(this.kontejner);

        const roditelj = document.createElement("div");
        roditelj.className = "roditelj";
        host.appendChild(roditelj);

        this.crtajFormuZaBrodove(roditelj);
        this.crtajFormuZaKontejnere(roditelj);

    }

    crtajFormuZaBrodove(roditelj){
        const brodForma = document.createElement("div");
        brodForma.className = "brodForma";
        roditelj.appendChild(brodForma);

        let labela = document.createElement("h3");
        labela.innerHTML = "UNOS BRODOVA";
        brodForma.appendChild(labela);

        const divZaSelect = document.createElement("div");
        divZaSelect.className = "divZaSelect";
        brodForma.appendChild(divZaSelect);

        labela = document.createElement("label");
        labela.innerHTML = "Broj upotrebljivih kontejnera:";
        divZaSelect.appendChild(labela);
        
        const sel = document.createElement("select");
        divZaSelect.appendChild(sel);
        this.dodajOpcije(sel);

        labela = document.createElement("label");
        labela.innerHTML = "Maksimalni kapacitet:";
        brodForma.appendChild(labela);

        const maxKapacitet = document.createElement("input");
        maxKapacitet.className = "maxKapacitet";
        maxKapacitet.type = "number";
        maxKapacitet.value = "0";
        brodForma.appendChild(maxKapacitet);

        const dugme = document.createElement("button");
        dugme.innerHTML = "Dodaj brod";
        brodForma.appendChild(dugme);

        dugme.onclick = ev => {
            let upotKont = sel.value;
            const kapacitet = parseInt(brodForma.querySelector(".maxKapacitet").value);
            
            
            if(kapacitet == 0 && upotKont != 0)
                alert("Kapacitet broda ne sme biti 0!");
            else if(kapacitet == 0 && upotKont == 0){
                const brod = new Brod(upotKont, kapacitet);
                this.dodajBrod(brod);
                brod.crtajBrod(this.kontejner);
            }
            else{
                const brod = new Brod(upotKont, kapacitet); 
                this.dodajBrod(brod);
                brod.crtajBrod(this.kontejner);
            }

        }

    }

    crtajFormuZaKontejnere(roditelj){
        const kontejnerForma = document.createElement("div");
        kontejnerForma.className = "kontejnerForma";
        roditelj.appendChild(kontejnerForma);

        let labela = document.createElement("h3");
        labela.innerHTML = "UNOS KONTEJNERA"
        kontejnerForma.appendChild(labela);

        const divv = document.createElement("div");
        kontejnerForma.appendChild(divv);

        labela = document.createElement("label");
        labela.innerHTML = "ID:";
        divv.appendChild(labela);

        let polje = document.createElement("input");
        polje.type = "text";
        polje.className = "idPolje";
        divv.appendChild(polje);

        const niz = ["Hrana", "Gorivo", "Vakcine"];

        let labella = null;
        let divRb = null;
        let opcija = null

        niz.forEach((tip, index) => {
            divRb = document.createElement("div");
            kontejnerForma.appendChild(divRb);
            
            labella = document.createElement("label");
            labella.innerHTML = tip;
            divRb.appendChild(labella);

            opcija = document.createElement("input");
            opcija.type = "radio";
            opcija.value = niz[index];
            opcija.name = "vrsta";

            divRb.appendChild(opcija);
        })
        opcija.checked = true;

        divRb = document.createElement("div");
        divRb.classList.add("tezina");
        kontejnerForma.appendChild(divRb);

        labela = document.createElement("label");
        labela.innerHTML = "Tezina:";
        divRb.appendChild(labela);

        polje = document.createElement("input");
        polje.className = "poljeZaTezinu";
        polje.type = "number";
        divRb.appendChild(polje);

        const dugme = document.createElement("button");
        dugme.innerHTML = "Dodaj kontejner";
        kontejnerForma.appendChild(dugme);

        dugme.onclick = ev => {
            const id = kontejnerForma.querySelector(".idPolje").value;
            
            const ime = kontejnerForma.querySelector(`input[name=vrsta]:checked`).value;
            
            const tezina = parseInt(kontejnerForma.querySelector(".poljeZaTezinu").value);
            
            this.dodajKontejner(new Kontejner(ime, id, tezina, ime[0]));
            
        }

        const dugme1 = document.createElement("button");
        dugme1.innerHTML = "Obrisi kontejner";
        kontejnerForma.appendChild(dugme1);

        dugme1.onclick = ev => {
            const id = kontejnerForma.querySelector(".idPolje").value;
            this.obrisiKontejner(id);
        }
    }

    dodajKontejner(kontejner){
        if(this.brodovi.length == 0)
            throw new Error("Nema brodova za dodavanje kontejnera!");
        
        let brod = this.brodovi.find(brd => brd.trenutnaZauzetost + kontejner.tezina <= brd.maxKapacitet
        && brd.brojUpotrebljivihKontejnera > 0);

        if(brod == null){
            alert("Ne postoji ni jedan brod za dati kontejner!");
        }
        else{
            brod.dodajKontejner(kontejner);
            this.osveziLabelu(brod);
        }

        this.proveriBrod(brod);
    }

    proveriBrod(brod){
        if(brod.trenutnaZauzetost == brod.maxKapacitet){
            brod.nemaUpotrebljivih();
        }
        if(brod.brojUpotrebljivihKontejnera == 0){
            brod.trenutnaZauzetost == brod.maxKapacitet;
            this.osveziLabelu(brod);
        }
    }

    obrisiKontejner(idKontejnera){
        this.brodovi.forEach(brod => {
            if(brod.sadrziKontejner(idKontejnera)){
                brod.obrisiKontejner(idKontejnera)
                this.osveziLabelu(brod);
            }
        })
    }

    dodajOpcije(sel){
        let opcija = null;
        for(let i = 0; i < 10; i++){
            opcija = document.createElement("option");
            opcija.innerHTML = i;
            opcija.value = i;
            sel.appendChild(opcija);
        }
    }

    osveziLabelu(brod){
        let pomoc = brod.paluba.childNodes;
        pomoc[9].innerHTML = `${brod.maxKapacitet}, ${brod.trenutnaZauzetost}`;
    }
}