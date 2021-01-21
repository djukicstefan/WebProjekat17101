using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Baza.Models
{
    [Table("Brod")]
    public class Brod{
        
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("MaxKapacitet")]
        public int MaxKapacitet { get; set; }

        [Column("BrojUpotrebljivihKontejnera")]
        public int BrojUpotrebljivihKontejnera { get; set; }

        [Column("TrenutnaZauzetost")]
        public int TrenutnaZauzetost { get; set; }

        public virtual List<Kontejner> Kontejneri { get; set;}

        [JsonIgnore]
        public Luka Luka { get; set; }

    }
}