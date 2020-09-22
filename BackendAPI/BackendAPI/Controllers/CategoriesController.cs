using AutoMapper;
using BackendAPI.Core.Entities;
using BackendAPI.Core.Interfaces;
using BackendAPI.DTOs;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BackendAPI.Controllers
{
    public class CategoriesController : BaseApiController
    {
        private readonly IGenericRepository<Category> _repository;
        private readonly IMapper _mapper;

        public CategoriesController(IGenericRepository<Category> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryDTO>> GetByIdAsync(int id)
        {
            var result = await _repository.GetByIdAsync(id);
            return Ok(_mapper.Map<Category, CategoryDTO>(result));
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<CategoryDTO>>> GetAllAsync()
        {
            var result = await _repository.GetAllAsync();

            return Ok(_mapper.Map<IReadOnlyList<Category>, IReadOnlyList<CategoryDTO>>(result));
        }

        [HttpPost]
        public async Task<ActionResult<CategoryDTO>> AddCategoryAsync(CategoryDTO category)
        {
            var mapped = _mapper.Map<CategoryDTO, Category>(category);
            mapped.CreatedDateTime = DateTime.Now;
            var result = await _repository.CreateAsync(mapped);
            if(result != null)
            {
                return Ok(_mapper.Map<Category, CategoryDTO>(result));
            }
            return BadRequest("Failed to add category.");
        }

        [HttpPut]
        public async Task<ActionResult<CategoryDTO>> UpdateCategoryAsync(CategoryDTO category)
        {
            var result = await _repository.UpdateAsync(_mapper.Map<CategoryDTO, Category>(category));
            if (result != null)
            {
                return Ok(_mapper.Map<Category, CategoryDTO>(result));
            }
            return BadRequest("Failed to update category");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<CategoryDTO>> DeleteCategoryAsync(int id)
        {
            var category = await _repository.GetByIdAsync(id);
            if(category != null)
            {
                var result = await _repository.DeleteAsync(category);
                if (result == true)
                {
                    return Ok("Success");
                }
                return BadRequest("Failed to delete category.");
            }

            return BadRequest("Category not found.");
        }
    }
}
