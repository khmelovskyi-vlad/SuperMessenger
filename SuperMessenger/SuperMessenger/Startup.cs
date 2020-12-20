using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.EntityFrameworkCore;
using SuperMessenger.Data;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Data.SqlClient;
using SuperMessenger.Models.EntityFramework;
using AutoMapper;
using Microsoft.AspNetCore.Http.Connections;
using SuperMessenger.SignalRApp.Hubs;
using Microsoft.AspNetCore.SignalR;
using SuperMessenger.SignalRApp;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using SuperMessenger.Models;
using System.IO;
using SuperMessenger.Data.FileMaster;

namespace SuperMessenger
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public IConfiguration Configuration { get; }


        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<SuperMessengerDbContext>(options => options.UseSqlServer(GetSqlConnectionStringBuilder().ConnectionString));

            services.AddIdentity<ApplicationUser, ApplicationRole>()
                .AddEntityFrameworkStores<SuperMessengerDbContext>()
                .AddDefaultUI()
                .AddDefaultTokenProviders();

            services.AddControllersWithViews();



            services.Configure<ImageOptions>(Configuration.GetSection("ImagePathes"));
            //var imagePath = Configuration.GetSection("ImagePathes:ImagePath");
            //services.Configure<ImagePathesOptions>(Configuration.GetSection("ImagePathes:ImagePartPathes"));
            //services.Configure<ImagePathesOptions>(opts => 
            //        {
            //            opts.Avatars=Path.Combine(imagePath.Value, opts.Avatars);
            //            opts.GroupImages = Path.Combine(imagePath.Value, opts.GroupImages);
            //            opts.Files = Path.Combine(imagePath.Value, opts.Files);
            //        });


            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "react-client/build";
            });
            services.AddRazorPages();

            services.AddSingleton<IEmailSender, EmailSender>();
            services.AddSingleton<IFileMaster, FileMaster>();
            var builder = services.AddIdentityServer(options =>
            {
                options.Events.RaiseErrorEvents = true;
                options.Events.RaiseInformationEvents = true;
                options.Events.RaiseFailureEvents = true;
                options.Events.RaiseSuccessEvents = true;


                options.EmitStaticAudienceClaim = true;
            })
                .AddDeveloperSigningCredential()
                .AddInMemoryIdentityResources(Config.IdentityResources)
                .AddInMemoryApiScopes(Config.ApiScopes)
                .AddInMemoryClients(Config.Clients)
                .AddAspNetIdentity<ApplicationUser>();

            services.ConfigureApplicationCookie(options =>
            {
                options.LoginPath = $"/Identity/Account/Login";
                options.LogoutPath = $"/Identity/Account/Logout";
                options.AccessDeniedPath = $"/Identity/Account/AccessDenied";
            }); 
            services.AddAutoMapper(typeof(Startup));
            services.AddSingleton<IUserIdProvider, CustomUserIdProvider>();
            services.AddSignalR(hubOptions =>
            {
                //to-do must be false
                hubOptions.EnableDetailedErrors = true;
                hubOptions.KeepAliveInterval = TimeSpan.FromMinutes(20);
            })
            .AddJsonProtocol(options => {
                options.PayloadSerializerOptions.PropertyNamingPolicy = null;
            });
            AddPolicyPermissions(services);
        }
        public void AddPolicyPermissions(IServiceCollection services)
        {
        }
        public class EmailSender : IEmailSender
        {
            public Task SendEmailAsync(string email, string subject, string message)
            {
                return Task.CompletedTask;
            }
        }


        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseSpaStaticFiles();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseIdentityServer();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action}/{id?}");
                endpoints.MapRazorPages();
                endpoints.MapHub<SuperMessengerHub>("/superMessengerHub", options =>
                {
                    options.Transports =
                        HttpTransportType.WebSockets;
                });
                endpoints.MapHub<GroupHub>("/groupHub", options =>
                {
                    options.Transports =
                        HttpTransportType.WebSockets;
                });
                endpoints.MapHub<ApplicationHub>("/applicationHub", options =>
                {
                    options.Transports =
                        HttpTransportType.WebSockets;
                });
                endpoints.MapHub<InvitationHub>("/invitationHub", options =>
                {
                    options.Transports =
                        HttpTransportType.WebSockets;
                });
            });
            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "react-client";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });

        }
        private SqlConnectionStringBuilder GetSqlConnectionStringBuilder()
        {
            SqlConnectionStringBuilder sqlConnectionStringBuilder = new SqlConnectionStringBuilder();
            sqlConnectionStringBuilder.DataSource = "WIN-DHV0BQSLTCR";
            sqlConnectionStringBuilder.UserID = "SQLFirst";
            sqlConnectionStringBuilder.Password = "Test1234";
            sqlConnectionStringBuilder.InitialCatalog = "SuperMessenger";
            return sqlConnectionStringBuilder;
        }
    }
}
