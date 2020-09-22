using BackendAPI.Core.Entities;

namespace BackendAPI.Core.Specifications
{
    public class ArticleWithFiltersForCountSpecification : BaseSpecification<Article>
    {
        public ArticleWithFiltersForCountSpecification(ArticleSpecParams articleSpecParams) : base(x =>
            (string.IsNullOrEmpty(articleSpecParams.Search) || x.Title.ToLower().Contains(articleSpecParams.Search)) ||
            (string.IsNullOrEmpty(articleSpecParams.Search) || x.Description.ToLower().Contains(articleSpecParams.Search))
    )
        {
        }
    }
}
