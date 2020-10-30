using Messenger.Data.Initializers;
using Messenger.Models.EntityFramework;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Messenger.Data
{
    public class MessengerContext : DbContext
    {
        public MessengerContext(DbContextOptions<MessengerContext> options)
            : base(options)
        {

        }
        public DbSet<Group> Group { get; set; }
        public DbSet<UserGroup> UserGroup { get; set; }
        public DbSet<InvitationToUser> InvitationToUser { get; set; }
        public DbSet<ApplicationToGroup> ApplicationToGroup { get; set; }
        public DbSet<SentFile> SentFile { get; set; }
        public DbSet<Message> Message { get; set; }
        public DbSet<AspNetUser> AspNetUser { get; set; }
        public DbSet<UserIp> UserIp { get; set; }
        public DbSet<Ip> Ip { get; set; }
        public DbSet<Country> Country { get; set; }
        public DbSet<UserCountry> UserCountry { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<InvitationToUser>()
                .HasOne(iu => iu.Inviter)
                .WithMany(i => i.IInvited);
            modelBuilder.Entity<InvitationToUser>()
                .HasOne(iu => iu.InvitedUser)
                .WithMany(i => i.InvitationToUsers);
            modelBuilder.Entity<UserGroup>()
                .HasKey(ug => new { ug.UserId, ug.GroupId });
            modelBuilder.Entity<InvitationToUser>()
                .HasKey(iu => new { iu.GroupId, iu.InvitedUserId, iu.InviterId });
            modelBuilder.Entity<ApplicationToGroup>()
                .HasKey(ag => new { ag.UserId, ag.GroupId });
            modelBuilder.Entity<SentFile>()
                .HasKey(sf => new { sf.UserId, sf.GroupId });
            modelBuilder.Entity<Message>()
                .HasKey(m => new { m.UserId, m.GroupId });
            modelBuilder.Entity<UserIp>()
                .HasKey(ui => new { ui.UserId, ui.IpId });
            modelBuilder.Entity<UserCountry>()
                .HasKey(uc => new { uc.UserId, uc.CountryId });

            //modelBuilder.Entity<Article>()
            //    .HasOne(a => a.User)
            //    .WithMany(u => u.Articles)
            //    .HasForeignKey(a => a.UserId)
            //    .OnDelete(DeleteBehavior.NoAction);

            var converter = new EnumToStringConverter<GroupType>();
            modelBuilder
                .Entity<Group>()
                .Property(g => g.Type)
                .HasConversion(converter);

            modelBuilder.Seed(new FirstInitializer());
        }
    }
}
