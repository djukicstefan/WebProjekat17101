using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Baza.Models
{
    [Table("Kontejner")]
    public class Kontejner
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Ime")]
        public string Ime { get; set; }

        [Column("Tezina")]

        public int Tezina { get; set; }

        [Column("Oznaka")]

        public char Oznaka { get; set; }

        [JsonIgnore]
        public Brod Brod {get; set;}

    }
}