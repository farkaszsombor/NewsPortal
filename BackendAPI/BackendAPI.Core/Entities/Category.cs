using System;
using System.Collections.Generic;

namespace BackendAPI.Core.Entities
{
    public class Category : BaseEntity
    {
        public string Name { get; set; }
        public List<Article> Article { get; set; } // EF 1 - N convention
        public Category()
        {
            CreatedDateTime = DateTime.Now.Date;
        }
    }
}
