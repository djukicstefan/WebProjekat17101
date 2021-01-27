using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Baza.Models;

namespace Baza.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LukaController : ControllerBase
    {  
        public LukaContext Context { get; set; }

        public LukaController(LukaContext context)
        {
            Context = context;
        }

        [Route("PreuzmiLuku")]
        [HttpGet]
        public async Task<List<Luka>> PreuzmiLuku()
        {
            return await Context.Luke.Include("Brodovi.Kontejneri")
                                     .ToListAsync();
        }

        [Route("UpisiLuku")]
        [HttpPost]
        public async Task UpisiLuku([FromBody] Luka luka)
        {
            Context.Luke.Add(luka);
            await Context.SaveChangesAsync();
        }

        [Route("UpisBrodaULuku")]
        [HttpPost]
        public async Task<IActionResult> UpisBrodaULuku(int idLuke, [FromBody] Brod brod)
        {
            if(brod.BrojUpotrebljivihKontejnera > 9)
            {
                return BadRequest(new {brod.BrojUpotrebljivihKontejnera});
            }
            else
            {
                var luka = await Context.Luke.FindAsync(idLuke);
                brod.Luka = luka;
                Context.Brodovi.Add(brod);
                await Context.SaveChangesAsync();
                return Ok();
            }
        }

        [Route("PosaljiBrodVanLuke")]
        [HttpDelete]
        public async Task PosaljiBrodVanLuke(int idBroda)
        {
            var brod = await Context.FindAsync<Brod>(idBroda);

            List<Kontejner> kontejneri = await Context.Kontejneri.ToListAsync(); 

            kontejneri.ForEach(kont => 
            {
                if(kont.Brod == brod)
                {
                    ObrisiKontejner(kont.ID);    
                }
            }
            );

            Context.Remove(brod);
            await Context.SaveChangesAsync();
        }

        [Route("DodajKontejner")]
        [HttpPost]
        public async Task<IActionResult> DodajKontejner([FromBody] Kontejner kontejner)
        {
            List<Brod> brodovi = await Context.Brodovi.ToListAsync();

            var brod = brodovi.Find(brd => brd.TrenutnaZauzetost + kontejner.Tezina <= brd.MaxKapacitet
                            && brd.BrojUpotrebljivihKontejnera > 0);

            if(brod == null)
            {
                return BadRequest("Ne postoji brod za zadati kontejner!");
            }
            else
            {
                kontejner.Brod = brod;
                Context.Kontejneri.Add(kontejner);
                brod.TrenutnaZauzetost += kontejner.Tezina;
                brod.BrojUpotrebljivihKontejnera --;
                if(brod.TrenutnaZauzetost == brod.MaxKapacitet)
                {
                    brod.BrojUpotrebljivihKontejnera = 0;
                }
                await Context.SaveChangesAsync();
                return Ok();
            }
        }

        [Route("VratiBrodove")]
        [HttpGet]
        public async Task<List<Brod>> VratiBrodove()
        {
            return await Context.Brodovi.Include(p => p.Kontejneri).ToListAsync();
        }

        [Route("ObrisiKontejner")]
        [HttpDelete]
        public async Task ObrisiKontejner(int idKontejnera)
        {
            var kontejner = await Context.FindAsync<Kontejner>(idKontejnera);
            
            List<Brod> brodovi = await Context.Brodovi.ToListAsync();

            var brod = kontejner.Brod;

            brod.TrenutnaZauzetost -= kontejner.Tezina;
            brod.BrojUpotrebljivihKontejnera++;
            
            Context.Remove(kontejner);
            await Context.SaveChangesAsync(); 
        }

        [Route("AzurirajKontejner")]
        [HttpPut]
        public async Task<IActionResult> AzurirajKontejner([FromBody] Kontejner kontejner)
        {
            var stariKontejner = await Context.Kontejneri.FindAsync(kontejner.ID);

            if(stariKontejner != null)
            {
                List<Brod> brodovi = await Context.Brodovi.ToListAsync();
                
                var brod = stariKontejner.Brod;
                brod.TrenutnaZauzetost -= stariKontejner.Tezina;

                if(brod.TrenutnaZauzetost + kontejner.Tezina > brod.MaxKapacitet)
                {
                     brod.TrenutnaZauzetost += stariKontejner.Tezina;
                    return BadRequest("Izmenjeni kontejner premasuje dozvoljenu tezinu broda!");
                }
                else
                {
                    brod.TrenutnaZauzetost += kontejner.Tezina;
                }


                stariKontejner.Ime = kontejner.Ime;
                stariKontejner.Tezina = kontejner.Tezina;
                stariKontejner.Oznaka = kontejner.Oznaka;

                Context.Update<Kontejner>(stariKontejner);
                await Context.SaveChangesAsync();

                return Ok();
            }
            else
            {
                return BadRequest("Kontejner koji zelite da azurirate ne postoji u bazi!");
            }

        }
    }
}
