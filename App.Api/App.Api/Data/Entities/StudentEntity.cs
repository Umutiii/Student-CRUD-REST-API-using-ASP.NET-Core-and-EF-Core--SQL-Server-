using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace App.Api.Data.Entities
{
    public class StudentEntity
    {
        [Key, DatabaseGenerated
           (DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required, StringLength(50, MinimumLength = 1)]
        public string FirstName { get; set; } = string.Empty;

        [Required, StringLength(50, MinimumLength = 1)]
        public string LastName { get; set; } = string.Empty;

        public int No { get; set; }
        [Required]
        public string Class { get; set; }

    }
}
