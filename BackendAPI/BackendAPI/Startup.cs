using AutoMapper;
using BackendAPI.Core.Interfaces;
using BackendAPI.Infrastructure;
using BackendAPI.Infrastructure.Data;
using BackendAPI.Options;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using BackendAPI.Helpers;
using Microsoft.Extensions.Logging;

namespace BackendAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        private readonly string CorsPolicy = "DefaultCorsPolicyXYZ";

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));

            services.Configure<ConnectionStringOption>(Configuration.GetSection(ConnectionStringOption.ConnectionStringConfig));

            services.AddAutoMapper(typeof(MappingProfiles));

            services.AddControllers().AddNewtonsoftJson(options => 
            {
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            });

            services.AddDbContext<NewsFeedContext>((provider, options) =>
            {
                var service = provider.GetService<IOptions<ConnectionStringOption>>();
                options.UseSqlServer(service.Value.DefaultConnection, options => options.MigrationsAssembly("BackendAPI.Infrastructure"));
            });

            services.AddCors(options =>
            {
                options.AddPolicy(CorsPolicy, builder =>
                {
                    builder.WithOrigins(new string[] { "http://localhost:3000" })
                             .AllowAnyHeader()
                             .WithMethods(new string[] { "GET", "POST", "PUT", "DELETE" });
                });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(CorsPolicy);

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
