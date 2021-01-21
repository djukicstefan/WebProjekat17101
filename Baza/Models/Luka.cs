using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Baza.Models
{
    [Table("Luka")]
    public class Luka
    {
        [Key]
        [Column("ID")]

        public int ID { get; set; }
        public  virtual List<Brod> Brodovi { get; set; }
    }
}