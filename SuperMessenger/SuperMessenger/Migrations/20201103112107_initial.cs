using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SuperMessenger.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    UserName = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(maxLength: 256, nullable: true),
                    Email = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(nullable: false),
                    PasswordHash = table.Column<string>(nullable: true),
                    SecurityStamp = table.Column<string>(nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<string>(nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(nullable: false),
                    TwoFactorEnabled = table.Column<bool>(nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(nullable: true),
                    LockoutEnabled = table.Column<bool>(nullable: false),
                    AccessFailedCount = table.Column<int>(nullable: false),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    IsInBan = table.Column<bool>(nullable: false),
                    ImageId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Countries",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Value = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Countries", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Groups",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    CreationDate = table.Column<DateTime>(nullable: false),
                    ImageId = table.Column<Guid>(nullable: false),
                    Type = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Groups", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Ips",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Value = table.Column<string>(nullable: true),
                    IsInBan = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ips", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<Guid>(nullable: false),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<Guid>(nullable: false),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(nullable: false),
                    ProviderKey = table.Column<string>(nullable: false),
                    ProviderDisplayName = table.Column<string>(nullable: true),
                    UserId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<Guid>(nullable: false),
                    RoleId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<Guid>(nullable: false),
                    LoginProvider = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Value = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserCountries",
                columns: table => new
                {
                    UserId = table.Column<Guid>(nullable: false),
                    CountryId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserCountries", x => new { x.UserId, x.CountryId });
                    table.ForeignKey(
                        name: "FK_UserCountries_Countries_CountryId",
                        column: x => x.CountryId,
                        principalTable: "Countries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserCountries_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Applications",
                columns: table => new
                {
                    GroupId = table.Column<Guid>(nullable: false),
                    UserId = table.Column<Guid>(nullable: false),
                    Value = table.Column<string>(nullable: true),
                    SendDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Applications", x => new { x.UserId, x.GroupId });
                    table.ForeignKey(
                        name: "FK_Applications_Groups_GroupId",
                        column: x => x.GroupId,
                        principalTable: "Groups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Applications_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Invitations",
                columns: table => new
                {
                    GroupId = table.Column<Guid>(nullable: false),
                    InvitedUserId = table.Column<Guid>(nullable: false),
                    InviterId = table.Column<Guid>(nullable: false),
                    Value = table.Column<string>(nullable: true),
                    SendDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Invitations", x => new { x.GroupId, x.InvitedUserId, x.InviterId });
                    table.ForeignKey(
                        name: "FK_Invitations_Groups_GroupId",
                        column: x => x.GroupId,
                        principalTable: "Groups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Invitations_AspNetUsers_InvitedUserId",
                        column: x => x.InvitedUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Invitations_AspNetUsers_InviterId",
                        column: x => x.InviterId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Messages",
                columns: table => new
                {
                    UserId = table.Column<Guid>(nullable: false),
                    GroupId = table.Column<Guid>(nullable: false),
                    Id = table.Column<Guid>(nullable: false),
                    Value = table.Column<string>(nullable: true),
                    OldValue = table.Column<string>(nullable: true),
                    SendDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Messages", x => new { x.UserId, x.GroupId });
                    table.ForeignKey(
                        name: "FK_Messages_Groups_GroupId",
                        column: x => x.GroupId,
                        principalTable: "Groups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Messages_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SentFiles",
                columns: table => new
                {
                    UserId = table.Column<Guid>(nullable: false),
                    GroupId = table.Column<Guid>(nullable: false),
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    ContentId = table.Column<Guid>(nullable: false),
                    SendDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SentFiles", x => new { x.UserId, x.GroupId });
                    table.ForeignKey(
                        name: "FK_SentFiles_Groups_GroupId",
                        column: x => x.GroupId,
                        principalTable: "Groups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SentFiles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "UserGroups",
                columns: table => new
                {
                    UserId = table.Column<Guid>(nullable: false),
                    GroupId = table.Column<Guid>(nullable: false),
                    IsLeaved = table.Column<bool>(nullable: false),
                    IsCreator = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserGroups", x => new { x.UserId, x.GroupId });
                    table.ForeignKey(
                        name: "FK_UserGroups_Groups_GroupId",
                        column: x => x.GroupId,
                        principalTable: "Groups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserGroups_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "UserIps",
                columns: table => new
                {
                    UserId = table.Column<Guid>(nullable: false),
                    IpId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserIps", x => new { x.UserId, x.IpId });
                    table.ForeignKey(
                        name: "FK_UserIps_Ips_IpId",
                        column: x => x.IpId,
                        principalTable: "Ips",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserIps_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Countries",
                columns: new[] { "Id", "Value" },
                values: new object[,]
                {
                    { new Guid("f264e611-b563-49d6-8df6-44992011e7a7"), "icjxbcancqgbd" },
                    { new Guid("d2c32e27-2c86-40b5-a744-eed48640f5ca"), "mhbhvfgrhfiahuksr" },
                    { new Guid("a4f13340-dabe-48f6-8db3-9cdd86a9ef53"), "hrojcdwowyemyltei" },
                    { new Guid("18ab75cc-d4f8-4b85-9b2a-d4ecd33dcbf3"), "nkkbgbsiqnunorpkt" },
                    { new Guid("14e15020-8ab1-4284-9b22-c65d50badc87"), "hsvaljyufffiezrlc" },
                    { new Guid("e89dc916-f6ba-418e-9e0f-b3f05292abc3"), "uydgfbzplcgni" },
                    { new Guid("4581e5b2-d2a9-4b02-9060-9299470e9dbb"), "dglawbqzyncqj" },
                    { new Guid("9cb2640e-d390-4744-a86c-28e5bf6a3944"), "vrrsjthizbsclo" },
                    { new Guid("de691b7d-32c6-4971-b7a5-77746c73ded2"), "hkmihjmhwlf" },
                    { new Guid("51b7cb41-0fee-49db-9b1c-5552ec6d4f79"), "sudsatnahprnzxlzptrxp" },
                    { new Guid("7e326017-6937-4e4f-975a-b171b8e0ccf9"), "yzwvvcxymlahmykhbw" },
                    { new Guid("7bc4d90e-2b86-4243-aaec-6679279f9c8b"), "vfpxhhyjxu" },
                    { new Guid("4d0a5a35-b319-44c0-9709-152b09c76265"), "lvbxkgxrayqqphevl" },
                    { new Guid("ade69ead-4cea-4665-80b1-978fe2381b8e"), "vtnokrbpuzkmcfnuhjj" },
                    { new Guid("0f25bb76-9c63-46d6-8adc-1863fc6e09aa"), "sutvlifcedzwbgij" },
                    { new Guid("90467dc2-14bf-4e66-81f4-65b94f3ef6fb"), "waeuecmtypdidxn" },
                    { new Guid("3dfb3b5d-8ed8-418a-be51-d67ac3667c7e"), "cqokhxvfhnyhofvw" },
                    { new Guid("5af7d5b6-6919-4b8d-8547-c6c4bdba0757"), "lxycczwhhyvy" },
                    { new Guid("6c4ae38c-a052-4e11-bd7f-37790a4ee180"), "beeaookcxruzv" },
                    { new Guid("fede565c-6970-4d6c-b8b1-cf20af899550"), "bcpcrolsrwprzt" },
                    { new Guid("a6e9ae28-a99f-4dab-b535-3f078280532f"), "xqfhrfakonssjk" },
                    { new Guid("6e57145c-dc4a-4fb4-aca3-c956062dbb29"), "oyqfwmdpsrhk" },
                    { new Guid("a7f4acaa-70a0-4f35-ae1f-dd0679811456"), "wptpgmoepdekizwg" },
                    { new Guid("e2d4d396-b0b4-47c8-9888-86f3ee4cbd14"), "iawxcqhydatkxepohukt" },
                    { new Guid("4e08c438-6645-4193-aca4-e1be51cd06d3"), "yyzgrdofbwqxycpoi" },
                    { new Guid("6135a66f-d4fb-4510-9330-96b4437c6908"), "fmrznrkytczbykl" },
                    { new Guid("1b4d7b55-8677-463f-80b7-8f8fab5acadd"), "nakbnavvtikjmfp" },
                    { new Guid("b7e599a2-d60f-4907-a964-8b37a2f80f0d"), "rvugwfeaczzjrp" },
                    { new Guid("fca80b0c-3d7e-47e4-9da5-6c95dfcdc0fc"), "isjjaelfzyliusnajlp" },
                    { new Guid("9c6c16f1-74e8-4a3b-8d1c-1fd9fbab3450"), "vmnjoqtijosxzjof" },
                    { new Guid("14f312f2-452c-4cef-96d4-2359e46e57cb"), "muzwggrcgcsytu" },
                    { new Guid("5b8b6100-f7eb-4c91-9dac-bffc704e635d"), "nlkwrtmemmrsv" },
                    { new Guid("cfa50a51-4a2d-4b08-a56c-ca8a91085664"), "tueoprngrh" },
                    { new Guid("66942b5b-8b90-4711-acb0-bfbc87c7b2a0"), "obtsmgvfnptlg" },
                    { new Guid("ecfd39a0-5b48-481f-b5c6-024c130bddd9"), "sdelwvfnjccwtzz" },
                    { new Guid("93604537-f5e9-4737-9e06-dfcd97d5ea76"), "cohrcclbtbdon" },
                    { new Guid("db66512c-b2ff-4f69-870f-ee3a1bd96df3"), "wvvezgsaiqidojl" },
                    { new Guid("7d9558be-b922-4b9d-b983-5d235421a8aa"), "afbakvyenjfrsynt" },
                    { new Guid("8baf9240-2d55-4c17-af5b-62926512f75b"), "hmnpvlvsuy" },
                    { new Guid("ba754f2d-7436-44b2-b910-d890a264d2da"), "vdnwcvkdhscnieb" },
                    { new Guid("c444722d-aa5c-4419-a4a9-331ddff1dac7"), "fyezqjrjhs" },
                    { new Guid("23d1b6f8-d7f5-4a6d-96e5-e5c530c5f8fc"), "hgdccuwvmjoz" },
                    { new Guid("179b83b8-6f68-4c87-97dd-8b45d8d87952"), "mewfovszzg" },
                    { new Guid("656ce00f-2865-485f-bf77-0971a1b45be6"), "upuntwueksjmxxxdf" },
                    { new Guid("53722c9c-b193-45f5-ba4f-765240c720e7"), "tuwmlcurchrolzd" },
                    { new Guid("7f49db09-8540-44f6-a769-258099c122e5"), "xstzbxvxsmguabk" },
                    { new Guid("c5435f8f-9911-4619-9ab3-e6e1055e31b3"), "nqpmxxeqfrsigtdmi" },
                    { new Guid("c2c7db54-d7a0-4bf0-a82a-45a3922ecb5a"), "hepyevktopbtlj" },
                    { new Guid("9763d4a7-ebc9-45f2-a1c2-fcd47ffb5fbb"), "iyswbbldkpgpydagh" },
                    { new Guid("19784330-adc5-4bee-ac94-2a2175286d08"), "ymspcrpoaq" },
                    { new Guid("1779383e-4e24-431e-b87f-9a05f17bdddb"), "xbaqwpeniprfkgmd" },
                    { new Guid("ee686e20-0906-4b54-8cfb-88fb7e1ffdc3"), "qriguuatvhok" },
                    { new Guid("7e8643b5-f662-4c41-9d88-0364856e9a46"), "mnemqcrmeiauu" },
                    { new Guid("a9af0b3d-fbe7-408b-9dd9-0797e8145f39"), "goakdljhiazfehv" },
                    { new Guid("cf6aa2f7-ab37-4f14-82de-2d1dab714355"), "bmkrxvjhgxfj" },
                    { new Guid("2bd22832-f40c-4557-8b01-11aa92774c8a"), "surikrsivnavrng" },
                    { new Guid("6e9fc326-2c99-4cb3-a97d-49695a1b9386"), "wawtfxxqzllge" },
                    { new Guid("61e33bcb-266b-44fd-a6ab-c18384811434"), "eptntoleexmovni" },
                    { new Guid("e1d10742-4089-49cf-9fb6-15fa3ba36427"), "cnkdgleagtvn" },
                    { new Guid("097b83a5-9891-4e33-b14d-e6867958329d"), "izodxtzflijdeeowz" },
                    { new Guid("4dfee626-fbc8-4d01-95cb-0b611e3005fe"), "tearzccoviikvofhwgaf" },
                    { new Guid("9364a250-0a85-404d-98f2-bc1f8af92d1b"), "pnlszzegtkhkskv" },
                    { new Guid("a6a66f55-4aab-499f-88d8-c0a6f253683d"), "onrslmdsdmfuoxvx" },
                    { new Guid("ebd9654f-336e-4dff-b24f-3cfd99759217"), "kyjgnesnymmtogdg" },
                    { new Guid("90b2b23b-7714-476a-ada4-38defad6112f"), "dnubdtreejxeei" },
                    { new Guid("4663d098-8120-4f53-9062-77fb45844119"), "uvpqafdgafrjataut" },
                    { new Guid("c06d4880-b826-4c78-b6bf-f9c6ed2af73e"), "ivdkkdfiqcxb" },
                    { new Guid("ecfaaf8b-1f3a-41fb-8746-0a7c57ed1fa7"), "nnvgsvdybj" },
                    { new Guid("8a487ce7-f9c1-4cd6-8cba-1cbe84e142e6"), "wjvmhwzegfxyura" },
                    { new Guid("1a909083-cccf-47b8-a077-1acc97997bde"), "myrbutdokggn" },
                    { new Guid("0de89b35-4ac1-4acf-b4b0-a4a7f328d2f1"), "ghaddvqcinhq" },
                    { new Guid("f7f7a880-4351-4129-b3cc-e9049f93aa98"), "ayzipwoobgriqyudfx" },
                    { new Guid("811776d4-6ed0-4d13-a1fa-4813e89c5c0b"), "mjrjyeidxbnbyqmy" },
                    { new Guid("8fdf7274-3ec0-48e7-a290-d408037bb5b7"), "iwuvzzkdcysfb" },
                    { new Guid("d89fe5ab-9a01-42ac-9f90-be48853b4757"), "jqxkyopzgtmjyzdspmica" },
                    { new Guid("9155d257-8b06-40b1-ba8f-a672ef7636f5"), "wncrcqvgxnitem" },
                    { new Guid("601de194-f3a3-4962-9511-894eb0a09d51"), "hibvpdpkohgfwmsmap" },
                    { new Guid("94883d6d-ad01-4c25-91ac-939fb82c84fc"), "wqexigyrsueiy" },
                    { new Guid("207fa4c9-b6e5-42e2-b450-5bb745a78c6e"), "qsjfigddvhxujiq" },
                    { new Guid("358b5ee9-4ccb-44fb-b8de-9924d66199ab"), "kgwchuogyghlptqfzil" },
                    { new Guid("31c3cc9e-fcfd-4051-b7a2-0ef62e6e6dde"), "knlfbfsrybzmgrea" },
                    { new Guid("bd0d89bb-9ec9-4215-8900-bd958aac5485"), "jsfoyksicxmqybzrd" },
                    { new Guid("b886e2c1-cfe2-4436-b37c-59c4f1b74641"), "gfmtjqhxekobwcyya" },
                    { new Guid("a448a4df-29af-4fbc-98b0-320e5ce7c5e0"), "lcsuinxdrvwl" },
                    { new Guid("2086247c-bb78-4644-9270-2d5589ee67f2"), "petozemmsssrsgn" },
                    { new Guid("254684c9-a540-47b8-ad1c-ecf6b4e20067"), "wbbdmlzpuiwgxze" },
                    { new Guid("49d560b3-eab9-4778-a887-3c3e23f296d9"), "cxldytnloxvsekl" },
                    { new Guid("309d4a3a-f7d4-4d5d-a16f-4c5e416a5942"), "kygcuuhtnprpkg" },
                    { new Guid("16013ff8-f42e-419a-aa94-2c890cf2372e"), "hsiqpcenuipwvq" },
                    { new Guid("167c5020-eebe-425a-8fb7-24de12cc954d"), "cqtzzowwkhiz" },
                    { new Guid("ae96e958-e5d3-47c1-9fdf-cfad9f6ef83b"), "wixqzaojzsifm" },
                    { new Guid("070b3b25-9adc-4e61-a32f-3447cc9e8c67"), "nosbsonrmvzsdfzba" },
                    { new Guid("44a068ac-8aee-4d83-8467-99b66797f172"), "skwvwsiodwubnliyi" },
                    { new Guid("4a7fa47c-29cc-4a67-b025-a70438bc4d70"), "defeqjwtteylbpqn" },
                    { new Guid("d9012a0a-8741-4df7-a42d-bb8d0871ea30"), "ygtlkbwlalcyyk" },
                    { new Guid("b405d069-c7f4-466a-9810-77f375261640"), "koalwdtxcengudb" },
                    { new Guid("d94465b6-a004-4171-b872-50d133f8dcff"), "gkhfaaakzoddubn" },
                    { new Guid("617104bf-67e6-4e2a-a70d-f0f7a2a982db"), "zojxrermgahvqha" },
                    { new Guid("b63673ef-7e16-495c-ad5d-3a66c299a9cd"), "uhompoetlwbgrk" },
                    { new Guid("0294acea-939f-4374-9688-83b7f6575c69"), "blknccksquibvr" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Applications_GroupId",
                table: "Applications",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true,
                filter: "[NormalizedName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true,
                filter: "[NormalizedUserName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Invitations_InvitedUserId",
                table: "Invitations",
                column: "InvitedUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Invitations_InviterId",
                table: "Invitations",
                column: "InviterId");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_GroupId",
                table: "Messages",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_SentFiles_GroupId",
                table: "SentFiles",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_UserCountries_CountryId",
                table: "UserCountries",
                column: "CountryId");

            migrationBuilder.CreateIndex(
                name: "IX_UserGroups_GroupId",
                table: "UserGroups",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_UserIps_IpId",
                table: "UserIps",
                column: "IpId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Applications");

            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "Invitations");

            migrationBuilder.DropTable(
                name: "Messages");

            migrationBuilder.DropTable(
                name: "SentFiles");

            migrationBuilder.DropTable(
                name: "UserCountries");

            migrationBuilder.DropTable(
                name: "UserGroups");

            migrationBuilder.DropTable(
                name: "UserIps");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "Countries");

            migrationBuilder.DropTable(
                name: "Groups");

            migrationBuilder.DropTable(
                name: "Ips");

            migrationBuilder.DropTable(
                name: "AspNetUsers");
        }
    }
}
