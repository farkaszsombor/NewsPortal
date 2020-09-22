using BackendAPI.Core.Entities;
using BackendAPI.Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Infrastructure.Data
{
    public class GenericRepository<TEntity> : IGenericRepository<TEntity>
        where TEntity : BaseEntity
    {
        private readonly NewsFeedContext _context;
        private readonly ILoggerFactory _loggerFactory;

        public GenericRepository(NewsFeedContext context, ILoggerFactory loggerFactory)
        {
            _context = context;
            _loggerFactory = loggerFactory;
        }

        public async Task<TEntity> CreateAsync(TEntity entity)
        {
            try
            {
                await _context.Set<TEntity>().AddAsync(entity);
                await _context.SaveChangesAsync();
                return entity;
            }catch(Exception exception)
            {
                ILogger<GenericRepository<TEntity>> logger = _loggerFactory.CreateLogger<GenericRepository<TEntity>>();
                logger.LogError(exception, "Generic reposiotry failed to add entity");
                return await Task.FromResult<TEntity>(null);
            }
        }

        public async Task<bool> DeleteAsync(TEntity entity)
        {
            try
            {
                _context.Set<TEntity>().Remove(entity);
                _context.Entry(entity).State = EntityState.Deleted;
                await _context.SaveChangesAsync();
                return await Task.FromResult(true);
            } catch(Exception exception)
            {
                ILogger<GenericRepository<TEntity>> logger = _loggerFactory.CreateLogger<GenericRepository<TEntity>>();
                logger.LogError(exception, "Generic reposiotry failed to delete entity");
                return await Task.FromResult(false);
            }
        }

        public async Task<IReadOnlyList<TEntity>> GetAllAsync(ISpecification<TEntity> specification)
        {
            return await ApplySpecification(specification).ToListAsync();
        }

        public async Task<IReadOnlyList<TEntity>> GetAllAsync()
        {
            return await _context.Set<TEntity>().ToListAsync();
        }

        public async Task<TEntity> GetByIdAsync(int id)
        {
            return await _context.Set<TEntity>().FindAsync(id);
        }

        public async Task<TEntity> GetEntityWithSpecificationAsync(ISpecification<TEntity> specification)
        {
            return await ApplySpecification(specification).FirstOrDefaultAsync();
        }

        public async Task<TEntity> UpdateAsync(TEntity entity)
        {
            try
            {
                _context.Set<TEntity>().Attach(entity);
                _context.Entry(entity).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return entity;
            }catch(Exception exception)
            {
                ILogger<GenericRepository<TEntity>> logger = _loggerFactory.CreateLogger<GenericRepository<TEntity>>();
                logger.LogError(exception, "Generic reposiotry failed to update entity");
                return await Task.FromResult<TEntity>(null);
            }
        }

        private IQueryable<TEntity> ApplySpecification(ISpecification<TEntity> specification)
        {
            return SpecificationEvaluator<TEntity>.GetQuery(_context.Set<TEntity>().AsQueryable(), specification);
        }

        public async Task<int> CountAsync(ISpecification<TEntity> specification)
        {
            return await ApplySpecification(specification).CountAsync();
        }
    }
}
