using BackendAPI.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BackendAPI.Infrastructure.Cinfiguration
{
    public class ArticleConfiguration : IEntityTypeConfiguration<Article>
    {
        public void Configure(EntityTypeBuilder<Article> builder)
        {
            builder.HasOne(o => o.Category)
                .WithMany(wm => wm.Article)
                .HasForeignKey(fk => fk.CategoryId);
            builder.Property(p => p.CreatedDateTime).ValueGeneratedOnAdd();
        }
    }
}
