using BackendAPI.Core.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BackendAPI.Core.Interfaces
{
    public interface IGenericRepository<TEntity> where TEntity : BaseEntity
    {
        Task<TEntity> GetByIdAsync(int id);
        Task<TEntity> GetEntityWithSpecificationAsync(ISpecification<TEntity> specification);
        Task<IReadOnlyList<TEntity>> GetAllAsync();
        Task<IReadOnlyList<TEntity>> GetAllAsync(ISpecification<TEntity> specification);
        Task<int> CountAsync(ISpecification<TEntity> specification);
        Task<TEntity> CreateAsync(TEntity entity);
        Task<TEntity> UpdateAsync(TEntity entity);
        Task<bool> DeleteAsync(TEntity entity);
    }
}
