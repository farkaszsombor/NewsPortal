namespace BackendAPI.DTOs
{
    public class ArticleDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public CategoryDTO Category { get; set; }
        public string CreatedDateTime { get; set; }
    }
}
