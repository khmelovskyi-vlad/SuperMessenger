using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using Messenger.Data;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;

namespace Messenger
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();
            services.AddDbContext<MessengerContext>(options => options.UseSqlServer(GetSqlConnectionStringBuilder().ConnectionString));

            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

            services.AddAuthentication(options =>
            {
                options.DefaultScheme = "Cookies";
                options.DefaultChallengeScheme = "oidc";
            })
            .AddCookie("Cookies")
            .AddOpenIdConnect("oidc", options =>
            {
                options.SignInScheme = "Cookies";

                options.Authority = "https://localhost:5001";
                //options.RequireHttpsMetadata = false;

                options.ClientId = "mvc";
                options.ClientSecret = "secret";
                options.ResponseType = "code id_token";

                options.Scope.Add("roles");
                options.ClaimActions.MapJsonKey("role", "role");
                options.Scope.Add("permissions");
                options.ClaimActions.MapJsonKey("Permission", "Permission");
                options.SaveTokens = true;
                options.GetClaimsFromUserInfoEndpoint = true; // give claims from user info endpoint claims
                //options.Scope.Add("api1"); // give api1
                options.Scope.Add("offline_access"); //give refresh token
                options.ClaimActions.MapJsonKey("website", "website"); //give website claim
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    NameClaimType = "name",
                    RoleClaimType = "role"
                };
            });
            AddPolicyPermissions(services);
        }
        public void AddPolicyPermissions(IServiceCollection services)
        {
            //services.AddAuthorization(opts => {
            //    opts.AddPolicy(Permission.AddArticles.ToString(), policy => {
            //        policy.RequireClaim("Permission", Permission.AddArticles.ToString());
            //    });
            //});
            //services.AddAuthorization(opts =>
            //{
            //    opts.AddPolicy(Permission.EditAnyArticles.ToString(), policy =>
            //    {
            //        policy.RequireClaim("Permission", Permission.EditAnyArticles.ToString());
            //    });
            //});
            //services.AddAuthorization(opts => {
            //    opts.AddPolicy(Permission.EditOwnArticles.ToString(), policy => {
            //        policy.RequireClaim("Permission", Permission.EditOwnArticles.ToString());
            //    });
            //});
            //services.AddAuthorization(opts => {
            //    opts.AddPolicy(Permission.ManageAllRoles.ToString(), policy => {
            //        policy.RequireRole("MainAdmin");
            //        policy.RequireClaim("Permission", Permission.ManageAllRoles.ToString());
            //    });
            //});
            //services.AddAuthorization(opts => {
            //    opts.AddPolicy(Permission.ManageManagers.ToString(), policy => {
            //        policy.RequireClaim("Permission", Permission.ManageManagers.ToString());
            //    });
            //});
            //services.AddAuthorization(opts => {
            //    opts.AddPolicy(Permission.ManageUsers.ToString(), policy => {
            //        policy.RequireClaim("Permission", Permission.ManageUsers.ToString());
            //    });
            //});
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }
        private SqlConnectionStringBuilder GetSqlConnectionStringBuilder()
        {
            SqlConnectionStringBuilder sqlConnectionStringBuilder = new SqlConnectionStringBuilder();
            sqlConnectionStringBuilder.DataSource = "WIN-DHV0BQSLTCR";
            sqlConnectionStringBuilder.UserID = "SQLFirst";
            sqlConnectionStringBuilder.Password = "Test1234";
            sqlConnectionStringBuilder.InitialCatalog = "Messenger";
            return sqlConnectionStringBuilder;
        }
    }
}
