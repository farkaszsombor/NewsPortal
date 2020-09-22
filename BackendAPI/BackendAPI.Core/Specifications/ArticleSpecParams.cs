namespace BackendAPI.Core.Specifications
{
    public class ArticleSpecParams
    {
        private const int MaxPageSize = 50;
        public int PageIndex { get; set; } = 1;

        private int _pageSize = 5;
        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? _pageSize : value;
        }
        private string _search { get; set; }
        public string Search
        {
            get => _search;
            set => _search = value;
        }
    }
}
