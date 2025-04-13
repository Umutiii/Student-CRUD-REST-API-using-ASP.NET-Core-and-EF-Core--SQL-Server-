using App.Api.Data.Entities;
using Bogus;

namespace App.Api.Data
{
    public class BogusFakeData
    {
        public static void SeedStudents(AppDbContext context, int count = 20)
        {
            var faker = new Faker<StudentEntity>()
                .RuleFor(s => s.FirstName, f => f.Name.FirstName())
                .RuleFor(s => s.LastName, f => f.Name.LastName())
                .RuleFor(s => s.No, f => f.Random.Int(1000, 9999))
                .RuleFor(s => s.Class, f => $"{f.Random.ArrayElement(new[] { "A", "B", "C", "D", "E" })}{f.Random.Int(1, 12)}");

            var students = faker.Generate(count);

            context.Students.AddRange(students);
            context.SaveChanges();
        }
    }
}
