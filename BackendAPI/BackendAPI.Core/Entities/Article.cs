namespace BackendAPI.Core.Entities
{
    public class Article : BaseEntity
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; } // EF 1 - 1 convention
    }
}
