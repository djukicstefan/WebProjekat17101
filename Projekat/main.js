import {Luka} from "./luka.js"
import {Brod} from "./brod.js"
import {Kontejner} from "./kontejner.js"

fetch("https://localhost:5001/Luka/PreuzmiLuku").then(p => {p.json().then(data => {
    data.forEach(l => {
        const luka = new Luka();
        luka.crtajLuku(document.body);

        l.brodovi.forEach(brod => {
            let br = new Brod(brod.brojUpotrebljivihKontejnera, brod.maxKapacitet);
            br.brojUpotrebljivihKontejnera = brod.brojUpotrebljivihKontejnera;
            br.trenutnaZauzetost = brod.trenutnaZauzetost;
            
            let broj = 0;
            let pomoc = br.brojUpotrebljivihKontejnera;
            
            for(let i = 0; i < br.n; i++){
                for(let j = 0; j < br.m; j++){
                    if(broj < brod.kontejneri.length){
                        br.kontejneri[i][j] = new Kontejner(brod.kontejneri[broj].ime, brod.kontejneri[broj].id, 
                            brod.kontejneri[broj].tezina, brod.kontejneri[broj].oznaka);
                        luka.idevi.push(br.kontejneri[i][j].ID);
                        broj++;
                    }
                    else if(pomoc > 0){
                        br.kontejneri[i][j] = new Kontejner("", 0, 0, "U");
                        pomoc--;
                    }
                    else{
                        br.kontejneri[i][j] = new Kontejner("", 0, 0, "N");
                    }
                }
            }

            luka.dodajBrod(br);
            br.crtajBrodServerski(luka.kontejner, brod.kontejneri.length);
        })
        
    })
})})
