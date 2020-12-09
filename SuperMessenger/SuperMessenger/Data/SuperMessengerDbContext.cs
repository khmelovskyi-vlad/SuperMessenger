using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SuperMessenger.Data.Initializers;
using SuperMessenger.Models.EntityFramework;

namespace SuperMessenger.Data
{
    public class SuperMessengerDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, Guid>
    {
        public SuperMessengerDbContext(DbContextOptions<SuperMessengerDbContext> options)
            : base(options)
        {
        }
        public DbSet<Group> Groups { get; set; }
        public DbSet<UserGroup> UserGroups { get; set; }
        public DbSet<Invitation> Invitations { get; set; }
        public DbSet<Application> Applications { get; set; }
        public DbSet<SentFile> SentFiles { get; set; }
        public DbSet<Message> Messages { get; set; }
        //public DbSet<ApplicationUser> AspNetUser { get; set; }
        public DbSet<UserIp> UserIps { get; set; }
        public DbSet<Ip> Ips { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<UserCountry> UserCountries { get; set; }
        public DbSet<Connection> Connections { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            //modelBuilder.Entity<InvitationToUser>()
            //    .HasOne(iu => iu.Inviter)
            //    .WithMany(i => i.IInvited);
            //modelBuilder.Entity<InvitationToUser>()
            //    .HasOne(iu => iu.InvitedUser)
            //    .WithMany(i => i.InvitationToUsers);
            modelBuilder.Entity<UserGroup>()
                .HasKey(ug => new { ug.UserId, ug.GroupId });
            modelBuilder.Entity<Invitation>()
                .HasKey(iu => new { iu.GroupId, iu.InvitedUserId, iu.InviterId });
            modelBuilder.Entity<Application>()
                .HasKey(ag => new { ag.UserId, ag.GroupId });
            //modelBuilder.Entity<SentFile>()
            //    .HasKey(sf => new { sf.UserId, sf.GroupId });
            //modelBuilder.Entity<Message>()
            //    .HasKey(m => new { m.UserId, m.GroupId });
            modelBuilder.Entity<UserIp>()
                .HasKey(ui => new { ui.UserId, ui.IpId });
            modelBuilder.Entity<UserCountry>()
                .HasKey(uc => new { uc.UserId, uc.CountryId });

            //modelBuilder.Entity<Application>()
            //    .HasOne(ag => ag.User)
            //    .WithMany(au => au.Applications)
            //    .HasForeignKey(ag => ag.UserId)
            //    .OnDelete(DeleteBehavior.NoAction);
            modelBuilder.Entity<Invitation>()
                .HasOne(iu => iu.InvitedUser)
                .WithMany(au => au.InvitationsForMe)
                .HasForeignKey(iu => iu.InvitedUserId)
                .OnDelete(DeleteBehavior.NoAction);
            modelBuilder.Entity<Invitation>()
                .HasOne(iu => iu.Inviter)
                .WithMany(au => au.InvitationsFromMe)
                .HasForeignKey(iu => iu.InviterId)
                .OnDelete(DeleteBehavior.NoAction);
            //modelBuilder.Entity<SentFile>()
            //    .HasOne(sf => sf.User)
            //    .WithMany(au => au.SentFiles)
            //    .HasForeignKey(sf => sf.UserId)
            //    .OnDelete(DeleteBehavior.NoAction);
            //modelBuilder.Entity<Message>()
            //    .HasOne(m => m.User)
            //    .WithMany(au => au.Messages)
            //    .HasForeignKey(m => m.UserId)
            //    .OnDelete(DeleteBehavior.NoAction);
            modelBuilder.Entity<UserGroup>()
                .HasOne(ug => ug.User)
                .WithMany(au => au.UserGroups)
                .HasForeignKey(ug => ug.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            var converter = new EnumToStringConverter<GroupType>();
            modelBuilder
                .Entity<Group>()
                .Property(g => g.Type)
                .HasConversion(converter);

            modelBuilder.Seed(new FirstInitializer());
        }
    }
}
