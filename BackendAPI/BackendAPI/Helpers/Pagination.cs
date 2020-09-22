using System.Collections.Generic;

namespace BackendAPI.Helpers
{
    public class Pagination<TEntity> where TEntity: class
    {
        public Pagination(int pageIndex, int pageSize, int count, IReadOnlyList<TEntity> data)
        {
            PageIndex = pageIndex;
            PageSize = pageSize;
            Count = count;
            Data = data;
        }

        public int PageIndex { get; }
        public int PageSize { get; }
        public int Count { get; }
        public IReadOnlyList<TEntity> Data { get; }
    }
}
