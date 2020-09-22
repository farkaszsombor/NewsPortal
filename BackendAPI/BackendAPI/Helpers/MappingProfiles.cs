using AutoMapper;
using BackendAPI.Core.Entities;
using BackendAPI.DTOs;

namespace BackendAPI.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Category, CategoryDTO>()
                .ForMember(m => m.CreatedDateTime, opts => opts.ConvertUsing(new DateTimeValueConverter())); ;
            CreateMap<CategoryDTO, Category>();
            CreateMap<Article, ArticleDTO>()
                .ForMember(m => m.CreatedDateTime, opts => opts.ConvertUsing(new DateTimeValueConverter()));
            CreateMap<ArticleDTO, Article>()
                .ForMember(m => m.CategoryId, opts => opts.MapFrom(mf => mf.Category.Id))
                .ForMember(m => m.Category, opts => opts.Ignore());

        }
    }
}
