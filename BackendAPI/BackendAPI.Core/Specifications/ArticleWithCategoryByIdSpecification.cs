using BackendAPI.Core.Entities;

namespace BackendAPI.Core.Specifications
{
    public class ArticleWithCategoryByIdSpecification : BaseSpecification<Article>
    {
        public ArticleWithCategoryByIdSpecification(int id) : base(x => x.Id == id)
        {
            AddIncludes(i => i.Category);
        }
    }
}
