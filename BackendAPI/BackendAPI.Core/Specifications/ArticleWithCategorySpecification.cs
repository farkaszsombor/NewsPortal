using BackendAPI.Core.Entities;

namespace BackendAPI.Core.Specifications
{
    public class ArticleWithCategorySpecification : BaseSpecification<Article>
    {
        public ArticleWithCategorySpecification(ArticleSpecParams articleSpecParams) : base( x =>
            (string.IsNullOrEmpty(articleSpecParams.Search) || x.Title.ToLower().Contains(articleSpecParams.Search)) ||
            (string.IsNullOrEmpty(articleSpecParams.Search) || x.Description.ToLower().Contains(articleSpecParams.Search))
            )
        {
            AddIncludes(i => i.Category);
            AddOrderDescendingBy(o => o.CreatedDateTime);
            ApplyPaging(articleSpecParams.PageSize * (articleSpecParams.PageIndex - 1), articleSpecParams.PageSize);
        }
    }
}
