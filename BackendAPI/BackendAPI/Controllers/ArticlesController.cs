using AutoMapper;
using BackendAPI.Core.Entities;
using BackendAPI.Core.Interfaces;
using BackendAPI.Core.Specifications;
using BackendAPI.DTOs;
using BackendAPI.Helpers;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BackendAPI.Controllers
{
    public class ArticlesController : BaseApiController
    {
        private readonly IGenericRepository<Article> _repository;
        private readonly IMapper _mapper;

        public ArticlesController(IGenericRepository<Article> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ArticleDTO>> GetArticleByIdAsync(int id)
        {
            var specification = new ArticleWithCategoryByIdSpecification(id);
            var article = await _repository.GetEntityWithSpecificationAsync(specification);

            if(article == null)
            {
                return NotFound("Article not found.");
            }
            return Ok(_mapper.Map<Article, ArticleDTO>(article));
        }

        [HttpGet]
        public async Task<ActionResult<Pagination<ArticleDTO>>> GetAllArticleAsync([FromQuery]ArticleSpecParams articleSpecParams)
        {
            var specification = new ArticleWithCategorySpecification(articleSpecParams);
            var result = await _repository.GetAllAsync(specification);

            var countSpecification = new ArticleWithFiltersForCountSpecification(articleSpecParams);
            var count = await _repository.CountAsync(countSpecification);
            
            var data = _mapper.Map<IReadOnlyList<Article>, IReadOnlyList<ArticleDTO>>(result);
            return Ok(new Pagination<ArticleDTO>(articleSpecParams.PageIndex, articleSpecParams.PageSize, count, data));
        }

        [HttpPost]
        public async Task<ActionResult<ArticleDTO>> AddArticleAsync(ArticleDTO newArticle)
        {
            var mapped = _mapper.Map<ArticleDTO, Article>(newArticle);
            mapped.CreatedDateTime = DateTime.Now;
            var result = await _repository.CreateAsync(mapped);
            if (result != null)
            {
                var specification = new ArticleWithCategoryByIdSpecification(result.Id);
                var article = await _repository.GetEntityWithSpecificationAsync(specification);
                return Ok(_mapper.Map<Article, ArticleDTO>(article));
            }
            return BadRequest("Failed to add article.");
        }

        [HttpPut]
        public async Task<ActionResult<ArticleDTO>> UpdateArticleAsync(ArticleDTO article)
        {
            var result = await _repository.UpdateAsync(_mapper.Map<ArticleDTO, Article>(article));
            if (result != null)
            {
                var specification = new ArticleWithCategoryByIdSpecification(result.Id);
                var updatedArticle = await _repository.GetEntityWithSpecificationAsync(specification);
                return Ok(_mapper.Map<Article, ArticleDTO>(updatedArticle));
            }
            return BadRequest("Failed to update article.");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteArticleByIdAsync(int id)
        {
            var article = await _repository.GetByIdAsync(id);
            if(article != null)
            {
                var result = await _repository.DeleteAsync(article);
                if (result == true)
                {
                    return Ok("Success");
                }
                return BadRequest("Failed to delete article.");
            }

            return BadRequest("Article not found.");
        }
    }
}
