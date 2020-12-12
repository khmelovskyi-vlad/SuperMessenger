using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SuperMessenger.Migrations
{
    public partial class AddFileInformation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SentFiles");

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("049a27e4-854e-4de2-b77d-106107630324"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("06f40fac-49a3-49fd-b434-98045ed20204"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("09c3a51f-f283-487b-b76e-54acf04495cb"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("0b491acc-f22a-479d-90d8-ffdffaf6e5e0"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("0d017f7e-04e8-4c23-b8a8-c8a07c161223"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("0e072fc5-9942-42a9-8509-e800f45931ad"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("0ecf8216-f1da-40b5-8aef-8047adfdcad6"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("116f60e6-af1b-4ee0-9778-9c66bbfea930"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("188045a0-6710-44d2-83cc-14c8bb17fa98"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("192fdf94-91f3-4964-a6b9-67aff4709ef5"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("1dd3bd6c-54c3-41d2-bd22-80f14b45be67"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("27cf36c2-52e4-4b61-a117-4f7cbf7ebd83"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("2d358f9c-73f8-4793-b0b4-9b9f05fd3235"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("2e776ace-a456-444e-a9b3-75b671cca0e4"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("304cb0af-44b7-4ccd-a7ef-83dbc14219dc"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("30b06c67-df1e-4055-a1ca-0cfdf802c82a"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("33c56248-0598-4d5a-8cdf-4415cb28d176"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("359a0ba6-5515-40f9-904a-703985985f30"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("36301f91-2a3a-4e79-b7bd-6a9eaf44f4b3"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("36835f0d-cdc9-4b5b-9a76-9adefb921d77"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("3c6fafdf-49d8-4e65-a30e-abc648503317"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("3e35f3f4-758b-497e-a5fa-b10148791ad9"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("3e9bb78d-3b49-4914-9422-f7c3a98fc97c"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("3f79e252-e6df-4173-8ae4-d53dd29a2cbf"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("426e66e3-4f56-4063-a95c-3acd7fe893a3"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("453cc42d-11ca-46f3-9a54-01c6731665a0"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("491028ed-282f-4c61-a459-066abee3ac0b"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("4bc676e3-b3e5-4bcd-9848-d1eb5c1ba498"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("4fd76960-0f76-4d55-84d2-48d985d465ad"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("5079bbec-26ca-430b-8e30-a22f2bab133b"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("548120d3-5bf1-4932-bc28-e0ea7ffbf156"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("5649b05e-5bd2-48a1-bf17-c7bbb2738b15"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("566a764b-3929-4a88-a14b-4a3a58a74c2c"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("5bb5d58d-9833-4c94-963d-0fc106e552aa"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("60d7afbb-3309-4805-9904-64148fef069d"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("62b00638-ad05-4c95-8c62-945475f1b5d0"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("677aae99-a861-4a97-950d-b679ee0565db"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("698127bb-25a3-42c4-8f6e-06f4a03b92b9"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("6a190a21-cb2d-4556-b2f0-07768dd379ab"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("6c61d500-0d0c-48f1-ab8e-1f32935861a2"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("6d9d60a8-8efd-4cc6-a82f-7b10b0c1dfc2"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("6f5cb34c-cc90-4e8b-8f8a-5c85c04bec76"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("755eadb4-4b47-4910-bac2-a51f067ae938"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("78f871a0-8ec1-4298-9b4b-e0b2fd0379f4"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("79de8199-b82e-4b87-9ce1-7c99e83563a1"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("7b9c27cf-9fd7-42db-883c-c8f4a85f38c3"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("7d1160a9-ea09-4775-8a80-632a94891b10"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("7d23a782-f7cf-44dd-bc46-0613fff5b91e"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("7dc08585-1f2a-42a2-97c1-7d9a84c96def"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("7f8580f9-e3b1-4083-bf8e-304b121e5fbd"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("848654ab-edee-4d90-a987-64e98aed3030"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("85f56ccb-d296-4421-92f8-57d9f8007c49"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("87b99219-3b2a-4016-ae18-5cfce7bd1598"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("8cd676f3-9f3e-4add-bec6-d10836b83759"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("8ece20af-5009-4277-b8a1-ad40f09ff806"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("920a3899-11ee-4ee6-bb1e-eaf6628f2a93"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("92a13efb-3995-46f4-af75-401388f190ce"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("93c4f5d0-b7be-433d-9bcf-7d76b773f3fb"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("9527794f-017f-4843-8f3c-48ffce09286b"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("961156dd-d2eb-4025-a4d5-c81b5b933fd7"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("9a1b8260-e9cc-407c-bd17-6990981cd511"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("9ec9ec01-a3e8-4856-b749-a7df427e7237"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("9edd1ddc-0f20-4412-b070-d5a24a3c17bf"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("a85a75e8-9a78-4ea3-9250-a1c6a3b134c2"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("ab82a02a-59ab-4525-b19b-f8a8b72b7228"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("ada082c3-b8b9-4b8a-ba2d-2b9e8462a427"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("b2194e00-0ee3-4016-b3aa-37a2b2ad72b9"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("b33d1092-ba86-48a4-8647-e42dc005a49c"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("b3a59e19-2f51-4cc2-9bdc-52713f7c06ba"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("b460f919-2323-4fd3-9ff4-c433f16cc55f"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("b62070f5-8842-4ff5-9ece-dc26c2ab2330"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("b6a3a2ac-ffc2-49ce-8aae-c7c4786b9b4a"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("c072b231-d89d-4861-8641-ead462a09fb6"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("c0ae5000-2117-4ddc-b80c-25ea4b366d97"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("c2ce0e74-3283-4e1d-9cc9-cc40573a8418"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("c2dfd887-1750-4d80-88ac-ee06daa1e835"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("c35ccf20-4282-4d4c-86c4-3506be05c2fb"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("c759c4a7-1b4f-45df-a7df-aeb5cc1df29c"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("ca0f1670-5f2f-474f-8aa2-8cd621f57efb"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("ca4bac62-55e9-4ebe-b8b4-476a1d89d738"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("cde288c5-926b-417c-bfc7-4cf75d509886"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("d12f8872-2199-4b97-8b1c-9c6cb53abef8"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("d342ebfb-c211-4623-861b-7ef1cee0c006"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("d9f796cd-4031-4455-b38c-3ffdb43fd6fc"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("df3cee5e-a0dc-4664-9712-dbacd8c96f4c"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("e2bf382d-7bdc-436a-aa4f-a4c819b91bb4"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("e418c19d-c7f4-4bb3-9d77-ea349fb72746"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("e5660633-6676-4bff-bdba-0656162bad6c"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("e58c80a4-d174-4bac-958d-490dbef077cd"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("e5d5d56f-89b0-420d-8165-24d946772cd5"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("ee5f2018-913c-4646-b9f3-a9beb725dff2"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("eeb60f28-88b2-4906-9a0f-1da50043019c"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("f2169420-aec5-4997-9cce-f10d61e72d93"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("f238cf6d-0cf0-4944-9192-f12fb23f5c36"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("f3153042-854d-4e9a-a71b-b373e83fa6f7"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("f3d71aef-1166-4dd6-9833-984c688d94f8"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("f753b3f7-0cc9-4c25-8ed0-636269ef6432"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("f86b63c1-fc7d-4216-8906-9eb8f53025e4"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("f8cc379e-582c-4f08-ab48-564f1a3da0da"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("fe0b81a8-329a-490b-825a-9b7bb6806b3d"));

            migrationBuilder.DropColumn(
                name: "ImageId",
                table: "Groups");

            migrationBuilder.DropColumn(
                name: "ImageId",
                table: "AspNetUsers");

            migrationBuilder.CreateTable(
                name: "MessageFiles",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    ContentId = table.Column<Guid>(nullable: false),
                    UserId = table.Column<Guid>(nullable: false),
                    GroupId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MessageFiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MessageFiles_Groups_GroupId",
                        column: x => x.GroupId,
                        principalTable: "Groups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MessageFiles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FileInformations",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    SendDate = table.Column<DateTime>(nullable: false),
                    MimeType = table.Column<string>(nullable: true),
                    Size = table.Column<long>(nullable: false),
                    GroupId = table.Column<Guid>(nullable: true),
                    UserId = table.Column<Guid>(nullable: true),
                    MessageFileId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FileInformations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FileInformations_Groups_GroupId",
                        column: x => x.GroupId,
                        principalTable: "Groups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FileInformations_MessageFiles_MessageFileId",
                        column: x => x.MessageFileId,
                        principalTable: "MessageFiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FileInformations_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Countries",
                columns: new[] { "Id", "Value" },
                values: new object[,]
                {
                    { new Guid("19475753-71d9-42b3-b8f6-54b2d7241f98"), "ynafvxgehjki" },
                    { new Guid("fba78cd1-d7ee-4092-9f1d-9ce2a5f7b39d"), "guaopcmvowqap" },
                    { new Guid("9c3ecb20-6c1c-4350-aaee-aeb37714e5b7"), "empkmhzdigofgrgjbl" },
                    { new Guid("ff7332ea-8bcc-4d64-855b-56bbefd3a37c"), "wougqfpggepcdc" },
                    { new Guid("1ee89547-9a45-4b18-a5df-8efafb80166f"), "fltbpwmxxntbexoa" },
                    { new Guid("ef42dddc-f084-4eac-94f1-de70e55b294b"), "umlkljcorqpvwgpj" },
                    { new Guid("e8037c54-6dd2-408a-a599-3fc071da8300"), "dcwfafbneydjexg" },
                    { new Guid("0bc8f2ec-bf0b-4eab-a336-84b19a28cca5"), "khrgjrvelwor" },
                    { new Guid("92099213-47a9-4f4d-9216-5698c293ccf3"), "ikhjeoiwykmzdbss" },
                    { new Guid("f8420da0-b511-4191-9040-2f35d2f0c9f2"), "kuviquxkibxf" },
                    { new Guid("205363d4-916c-4b4f-a74a-39de1e070d71"), "prxbrhmnimjojsj" },
                    { new Guid("a8e92287-b059-4c81-967a-5fb5a9ab0efb"), "ebwmqwaksf" },
                    { new Guid("6af98fb8-b5b9-4315-b701-2dde212f1911"), "ijhixlofbjugakrhvq" },
                    { new Guid("475ae4cb-1638-4ff8-b868-2a3fa55d76f9"), "eenyyyqaknxjlgr" },
                    { new Guid("5439a0bb-e290-4054-a622-9d5a802b5139"), "dvkufcimwlguq" },
                    { new Guid("dc31f74c-3313-4b64-90a9-c50059d3087e"), "naboipeqrg" },
                    { new Guid("dd7a39b2-7d80-472b-a46b-3b00a4bcfaf4"), "pxrfitwjuvgvvt" },
                    { new Guid("7e93db2f-ab98-4533-aefd-66921ad2dc25"), "izjzlsbwdkyr" },
                    { new Guid("badeb3c4-ee7c-4502-ab02-da6b0b695014"), "cfrtpiawoslp" },
                    { new Guid("c538d076-bf02-4011-8d1f-20b699183cd2"), "nqqzqtonqeaomzeq" },
                    { new Guid("20fb5bdd-3725-46c7-bb75-34cbffffc8c3"), "jopgilbofywcmm" },
                    { new Guid("83e58f7e-86a1-4336-836e-82070c0ed1af"), "vhcfuviigdc" },
                    { new Guid("db0d2242-5679-445d-9619-538b85a1c882"), "tfrcounzyvezwu" },
                    { new Guid("451dc86a-ded8-485f-b3f7-4aa2122e59a6"), "txhagejftikr" },
                    { new Guid("3d992cfa-0186-435d-a156-b6db1c3c9660"), "zghkbctkbvu" },
                    { new Guid("e90f19b1-5d40-4d1d-8871-565f59f6788b"), "krgcbeawwxchz" },
                    { new Guid("31190b67-58b5-478b-89b4-33ba8974eda1"), "ebhfpegamuvydkw" },
                    { new Guid("34a08b82-4222-400a-8372-bfa5881bf81a"), "rwntotbnsonm" },
                    { new Guid("b4229885-3bcd-4a57-8b57-b8fa93898cea"), "peyrclbpyazhl" },
                    { new Guid("664d59e5-b2e2-4480-acfd-caeef5033257"), "luvqhawpjakdrgjaf" },
                    { new Guid("b20ca431-76ca-46d1-b23c-69231178ae71"), "dwcbjonimwftrbjy" },
                    { new Guid("7663be1d-b2c7-438d-9fb4-90124fa0e6c5"), "eemekbghilxe" },
                    { new Guid("9b9b8262-4c14-4cea-977a-7d4dbd796ac9"), "ltpcphkqqufmfd" },
                    { new Guid("77f5b013-fb46-4121-a0d5-b37c8f6739f9"), "fmqhgbhymww" },
                    { new Guid("92c3c148-4b0b-453d-8562-39f13cb714c6"), "mbdiwvaupgznsb" },
                    { new Guid("e69600e5-6774-4789-955f-633452e45b32"), "yfrfiyrvpinrs" },
                    { new Guid("9c7b5f75-ac71-4ffb-9597-cb3dd5df1349"), "rjuexilwnizoanw" },
                    { new Guid("b5b43e1e-06c2-4e1a-9bac-e86cf9e5ff22"), "xmahgfyhodomdwsffqzpntf" },
                    { new Guid("11ccca18-4165-4372-9bfa-b8e1f173c0b9"), "nmpuzliabt" },
                    { new Guid("00be3fde-ec4a-481c-99b3-ffcb503ef9a9"), "dbtsbdcwqzqxltq" },
                    { new Guid("11dc9f2f-1525-42dd-bbb8-4892b5b162b9"), "eyxrbtbkknpnwekbxsw" },
                    { new Guid("680d2e58-d2cb-41c4-abd9-41b7bc6d3095"), "cfatezthwvaputxwzl" },
                    { new Guid("bd192a28-c45c-4602-8fc4-7a3df09a916b"), "zonxfqommuf" },
                    { new Guid("7dc4f2b8-5c52-4516-9bb2-3e85de86ce1f"), "rtbsrvsnafsvfezju" },
                    { new Guid("d04cac51-debb-4638-910a-e8711213d5f9"), "vmlqylbofhzadfy" },
                    { new Guid("6eaf036a-d3e3-4bc6-8a5c-c9abe6fdcb89"), "bmxdwlsxfbjot" },
                    { new Guid("769cd7ea-ce39-414e-bebf-941702fad3bf"), "gqmsauiammo" },
                    { new Guid("d4fd8f93-b8de-40ce-aece-ac2484b1e3d9"), "timrbhopwhfigsfmxmzyk" },
                    { new Guid("3978b679-e4a9-4467-af0f-3ed51417994c"), "opiccbsrgjxjqjoiy" },
                    { new Guid("41f67ba4-e319-4ee2-a576-2c5a8a03f40d"), "yenocfpnqzvemsy" },
                    { new Guid("1aa142b2-34fe-4aa5-b4d8-285e4b5d6217"), "ispubvqkjzhrkanc" },
                    { new Guid("b386ddb5-7f62-477c-ae33-549f10ee7f30"), "saspimwonjlx" },
                    { new Guid("bf993169-7eb9-4303-9057-887be7db4505"), "gcxnisuaalgeh" },
                    { new Guid("5e1cbcec-3d34-439c-adf3-d799f99efc71"), "atecktwnzzwqotkdf" },
                    { new Guid("87e601d8-0fa4-4a92-a90e-c0ef13553781"), "erduincjxpukamu" },
                    { new Guid("78906e3c-fb10-4949-ba8c-9d380197496f"), "kkaqlgzgqtapj" },
                    { new Guid("2dbdc2d0-5014-4960-b06a-3a0c296136ab"), "nqqwanefcwlwom" },
                    { new Guid("594e6518-3825-4749-a36e-e82c822407ec"), "cjogopcrdkmwttj" },
                    { new Guid("c232ca65-267a-44c7-ae5a-5112fd5c88e5"), "bnfizbhluyrap" },
                    { new Guid("a2faaf1a-2564-473b-b076-8b2bcc42bd30"), "lugmmnufpelsvdxaunozsu" },
                    { new Guid("3b71a6f9-a1db-4441-ab04-c4fccbda44c2"), "jcwlvzjfehtahai" },
                    { new Guid("246371bc-ce73-43ef-aaf6-f652c33b1fbc"), "mcyambrgilchgq" },
                    { new Guid("14ff0bf3-4aa8-4c81-84be-42713ffc9e40"), "bbhuoiqdpwk" },
                    { new Guid("99086f78-8e5c-4cb8-b627-72420684cbf5"), "fszjxnhgbsmoczlitkasg" },
                    { new Guid("735a6ac4-ff44-47d1-8702-8ace50963b59"), "puqsrqllkkcc" },
                    { new Guid("3f29c7f4-f6fa-4b2b-976e-698957902544"), "uoxseuggzzdrkizaux" },
                    { new Guid("e123c1f5-7943-4a03-8da0-9f1fbaa7b21e"), "wfynvselaifjtkg" },
                    { new Guid("c825fe1d-31f4-41fa-b59d-522c9e028bcd"), "yoopdgpzrnps" },
                    { new Guid("127f1891-2f83-41af-be5c-2f8d12047f52"), "fbbaphpjbatewtyscwqa" },
                    { new Guid("1cad8df2-edb8-4250-95a9-cbd14de1eb83"), "cscqdnruqm" },
                    { new Guid("61e964f0-bfac-4286-8c8d-d547b70d048d"), "qoipicfhrbjxffnc" },
                    { new Guid("aa717206-c034-4530-9afd-7b670bfdacbd"), "xqvqabwpjkqlspxzmc" },
                    { new Guid("7ac17b28-a7b5-457d-ab92-296c34444b6c"), "uhexrdcufprtzbbi" },
                    { new Guid("dfd270cf-e14d-40c2-a0c1-c36c61e2829a"), "wqisfnzwtrpeon" },
                    { new Guid("16fbb8ec-e9e4-49f6-a417-55ba1620408b"), "vmlbxnzkhfjmwmhinj" },
                    { new Guid("66b3c269-8402-4435-be48-5e6cdffd1026"), "lfkikxdaznvehevj" },
                    { new Guid("9cb671b2-5619-459e-a977-093f2ae19827"), "ojqjrccvcfmjhwgq" },
                    { new Guid("ff338100-0f50-4a4f-aa38-e6cbc5f9920e"), "rauxcimebss" },
                    { new Guid("bc1ce5fd-4f03-4e21-8cde-54378739e736"), "fomfnproderstxfltxh" },
                    { new Guid("66b9ea7d-b974-417e-8394-3c0735b12839"), "hnbzdvnewjgqrj" },
                    { new Guid("b311830c-37ec-450b-9896-a120c125a521"), "fkpghxjlurgaf" },
                    { new Guid("0ea43fa6-4e18-4e0e-a9bb-ce9f8b710089"), "vvjqtyzpykzxzqxcnqvcg" },
                    { new Guid("da9d6828-7d9e-4fb0-9bb8-5de756c9c5ab"), "yhztlrmxgftchm" },
                    { new Guid("cb6d4040-242e-417d-aec9-f94e6d955288"), "pjzkuaopdtcgrp" },
                    { new Guid("5f884a57-671c-48b7-9229-9cbab100130d"), "fqaznwimziwkc" },
                    { new Guid("1364d1b8-1cb3-4c4f-b8fe-84c788497f37"), "iboxjqirjfpya" },
                    { new Guid("009c9122-f436-4fbb-9f8d-4420556ad2fe"), "hxkpsfsvjx" },
                    { new Guid("43367541-fc30-4471-bd58-3b603c1f8f8e"), "mnfbejxtwjgnaqcamvoxk" },
                    { new Guid("ca33407c-62cc-46b0-ae75-7046c8151e2e"), "eqcwpgwrynn" },
                    { new Guid("2f4f9fc9-aece-4746-8ae9-09fe83465f38"), "buhbucscqunpaz" },
                    { new Guid("70d05338-67ac-454a-8b7f-b84af55bbcad"), "evjuuhxowsy" },
                    { new Guid("7d40cd9c-3f88-4897-a71f-1b0e10647416"), "xxduzqfstmezx" },
                    { new Guid("129f6cd9-913c-449c-b729-06f78cbf090e"), "wklveijlwwjqkjtug" },
                    { new Guid("592b512b-cb63-40de-92c4-22b513f1a17c"), "hmdnhwfuif" },
                    { new Guid("5fcfed86-eb52-4540-a8af-f8e3c6f91d6a"), "nvgeeyoicbzhtbdc" },
                    { new Guid("4733e61f-fe1a-4b8c-bc89-f8d371ed3ddc"), "sxuwueawvc" },
                    { new Guid("4d82cae8-5f1e-47e2-b186-48453814996a"), "ojgriretivfybvvejk" },
                    { new Guid("435745f0-da86-487a-abc3-4489807038ff"), "elimmqzmkzshlmsb" },
                    { new Guid("ddf0fc33-bbb0-4087-9fcd-e9513a4f5a87"), "etyohcdmjrwgzu" },
                    { new Guid("31c74f5f-07a6-4701-9b44-098a7ec837d4"), "stlhczclopu" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_FileInformations_GroupId",
                table: "FileInformations",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_FileInformations_MessageFileId",
                table: "FileInformations",
                column: "MessageFileId",
                unique: true,
                filter: "[MessageFileId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_FileInformations_UserId",
                table: "FileInformations",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_MessageFiles_GroupId",
                table: "MessageFiles",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_MessageFiles_UserId",
                table: "MessageFiles",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FileInformations");

            migrationBuilder.DropTable(
                name: "MessageFiles");

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("009c9122-f436-4fbb-9f8d-4420556ad2fe"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("00be3fde-ec4a-481c-99b3-ffcb503ef9a9"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("0bc8f2ec-bf0b-4eab-a336-84b19a28cca5"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("0ea43fa6-4e18-4e0e-a9bb-ce9f8b710089"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("11ccca18-4165-4372-9bfa-b8e1f173c0b9"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("11dc9f2f-1525-42dd-bbb8-4892b5b162b9"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("127f1891-2f83-41af-be5c-2f8d12047f52"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("129f6cd9-913c-449c-b729-06f78cbf090e"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("1364d1b8-1cb3-4c4f-b8fe-84c788497f37"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("14ff0bf3-4aa8-4c81-84be-42713ffc9e40"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("16fbb8ec-e9e4-49f6-a417-55ba1620408b"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("19475753-71d9-42b3-b8f6-54b2d7241f98"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("1aa142b2-34fe-4aa5-b4d8-285e4b5d6217"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("1cad8df2-edb8-4250-95a9-cbd14de1eb83"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("1ee89547-9a45-4b18-a5df-8efafb80166f"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("205363d4-916c-4b4f-a74a-39de1e070d71"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("20fb5bdd-3725-46c7-bb75-34cbffffc8c3"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("246371bc-ce73-43ef-aaf6-f652c33b1fbc"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("2dbdc2d0-5014-4960-b06a-3a0c296136ab"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("2f4f9fc9-aece-4746-8ae9-09fe83465f38"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("31190b67-58b5-478b-89b4-33ba8974eda1"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("31c74f5f-07a6-4701-9b44-098a7ec837d4"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("34a08b82-4222-400a-8372-bfa5881bf81a"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("3978b679-e4a9-4467-af0f-3ed51417994c"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("3b71a6f9-a1db-4441-ab04-c4fccbda44c2"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("3d992cfa-0186-435d-a156-b6db1c3c9660"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("3f29c7f4-f6fa-4b2b-976e-698957902544"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("41f67ba4-e319-4ee2-a576-2c5a8a03f40d"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("43367541-fc30-4471-bd58-3b603c1f8f8e"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("435745f0-da86-487a-abc3-4489807038ff"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("451dc86a-ded8-485f-b3f7-4aa2122e59a6"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("4733e61f-fe1a-4b8c-bc89-f8d371ed3ddc"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("475ae4cb-1638-4ff8-b868-2a3fa55d76f9"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("4d82cae8-5f1e-47e2-b186-48453814996a"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("5439a0bb-e290-4054-a622-9d5a802b5139"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("592b512b-cb63-40de-92c4-22b513f1a17c"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("594e6518-3825-4749-a36e-e82c822407ec"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("5e1cbcec-3d34-439c-adf3-d799f99efc71"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("5f884a57-671c-48b7-9229-9cbab100130d"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("5fcfed86-eb52-4540-a8af-f8e3c6f91d6a"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("61e964f0-bfac-4286-8c8d-d547b70d048d"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("664d59e5-b2e2-4480-acfd-caeef5033257"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("66b3c269-8402-4435-be48-5e6cdffd1026"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("66b9ea7d-b974-417e-8394-3c0735b12839"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("680d2e58-d2cb-41c4-abd9-41b7bc6d3095"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("6af98fb8-b5b9-4315-b701-2dde212f1911"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("6eaf036a-d3e3-4bc6-8a5c-c9abe6fdcb89"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("70d05338-67ac-454a-8b7f-b84af55bbcad"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("735a6ac4-ff44-47d1-8702-8ace50963b59"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("7663be1d-b2c7-438d-9fb4-90124fa0e6c5"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("769cd7ea-ce39-414e-bebf-941702fad3bf"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("77f5b013-fb46-4121-a0d5-b37c8f6739f9"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("78906e3c-fb10-4949-ba8c-9d380197496f"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("7ac17b28-a7b5-457d-ab92-296c34444b6c"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("7d40cd9c-3f88-4897-a71f-1b0e10647416"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("7dc4f2b8-5c52-4516-9bb2-3e85de86ce1f"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("7e93db2f-ab98-4533-aefd-66921ad2dc25"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("83e58f7e-86a1-4336-836e-82070c0ed1af"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("87e601d8-0fa4-4a92-a90e-c0ef13553781"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("92099213-47a9-4f4d-9216-5698c293ccf3"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("92c3c148-4b0b-453d-8562-39f13cb714c6"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("99086f78-8e5c-4cb8-b627-72420684cbf5"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("9b9b8262-4c14-4cea-977a-7d4dbd796ac9"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("9c3ecb20-6c1c-4350-aaee-aeb37714e5b7"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("9c7b5f75-ac71-4ffb-9597-cb3dd5df1349"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("9cb671b2-5619-459e-a977-093f2ae19827"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("a2faaf1a-2564-473b-b076-8b2bcc42bd30"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("a8e92287-b059-4c81-967a-5fb5a9ab0efb"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("aa717206-c034-4530-9afd-7b670bfdacbd"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("b20ca431-76ca-46d1-b23c-69231178ae71"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("b311830c-37ec-450b-9896-a120c125a521"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("b386ddb5-7f62-477c-ae33-549f10ee7f30"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("b4229885-3bcd-4a57-8b57-b8fa93898cea"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("b5b43e1e-06c2-4e1a-9bac-e86cf9e5ff22"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("badeb3c4-ee7c-4502-ab02-da6b0b695014"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("bc1ce5fd-4f03-4e21-8cde-54378739e736"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("bd192a28-c45c-4602-8fc4-7a3df09a916b"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("bf993169-7eb9-4303-9057-887be7db4505"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("c232ca65-267a-44c7-ae5a-5112fd5c88e5"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("c538d076-bf02-4011-8d1f-20b699183cd2"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("c825fe1d-31f4-41fa-b59d-522c9e028bcd"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("ca33407c-62cc-46b0-ae75-7046c8151e2e"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("cb6d4040-242e-417d-aec9-f94e6d955288"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("d04cac51-debb-4638-910a-e8711213d5f9"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("d4fd8f93-b8de-40ce-aece-ac2484b1e3d9"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("da9d6828-7d9e-4fb0-9bb8-5de756c9c5ab"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("db0d2242-5679-445d-9619-538b85a1c882"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("dc31f74c-3313-4b64-90a9-c50059d3087e"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("dd7a39b2-7d80-472b-a46b-3b00a4bcfaf4"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("ddf0fc33-bbb0-4087-9fcd-e9513a4f5a87"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("dfd270cf-e14d-40c2-a0c1-c36c61e2829a"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("e123c1f5-7943-4a03-8da0-9f1fbaa7b21e"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("e69600e5-6774-4789-955f-633452e45b32"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("e8037c54-6dd2-408a-a599-3fc071da8300"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("e90f19b1-5d40-4d1d-8871-565f59f6788b"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("ef42dddc-f084-4eac-94f1-de70e55b294b"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("f8420da0-b511-4191-9040-2f35d2f0c9f2"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("fba78cd1-d7ee-4092-9f1d-9ce2a5f7b39d"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("ff338100-0f50-4a4f-aa38-e6cbc5f9920e"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("ff7332ea-8bcc-4d64-855b-56bbefd3a37c"));

            migrationBuilder.AddColumn<Guid>(
                name: "ImageId",
                table: "Groups",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "ImageId",
                table: "AspNetUsers",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "SentFiles",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ContentId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    GroupId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    MimeType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SendDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SentFiles", x => x.Id);
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
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Countries",
                columns: new[] { "Id", "Value" },
                values: new object[,]
                {
                    { new Guid("f753b3f7-0cc9-4c25-8ed0-636269ef6432"), "dmjwdvrpvhccjdrf" },
                    { new Guid("b460f919-2323-4fd3-9ff4-c433f16cc55f"), "uapnjwovuzuyjm" },
                    { new Guid("06f40fac-49a3-49fd-b434-98045ed20204"), "dbabzykpmphdnq" },
                    { new Guid("5bb5d58d-9833-4c94-963d-0fc106e552aa"), "amjlngqkfh" },
                    { new Guid("548120d3-5bf1-4932-bc28-e0ea7ffbf156"), "xhzufrfmlceyzqah" },
                    { new Guid("961156dd-d2eb-4025-a4d5-c81b5b933fd7"), "ktdcvsyigkc" },
                    { new Guid("7f8580f9-e3b1-4083-bf8e-304b121e5fbd"), "mjeondfmuehtcoz" },
                    { new Guid("30b06c67-df1e-4055-a1ca-0cfdf802c82a"), "vfqjzsjbzoaatg" },
                    { new Guid("cde288c5-926b-417c-bfc7-4cf75d509886"), "ekoyynpulx" },
                    { new Guid("d9f796cd-4031-4455-b38c-3ffdb43fd6fc"), "sgsgjxijikvfszuxh" },
                    { new Guid("f3153042-854d-4e9a-a71b-b373e83fa6f7"), "gqtvnkifanohtnb" },
                    { new Guid("b33d1092-ba86-48a4-8647-e42dc005a49c"), "oiequbefxrnlnsjs" },
                    { new Guid("116f60e6-af1b-4ee0-9778-9c66bbfea930"), "qgioamlnscjtgnjan" },
                    { new Guid("0b491acc-f22a-479d-90d8-ffdffaf6e5e0"), "eqriuepxxfjj" },
                    { new Guid("f2169420-aec5-4997-9cce-f10d61e72d93"), "vymqdfdezbzpssrc" },
                    { new Guid("188045a0-6710-44d2-83cc-14c8bb17fa98"), "iggjhyebumtwtlz" },
                    { new Guid("f8cc379e-582c-4f08-ab48-564f1a3da0da"), "bfhhlixerfgaipwdry" },
                    { new Guid("192fdf94-91f3-4964-a6b9-67aff4709ef5"), "saxrxxqenrm" },
                    { new Guid("6d9d60a8-8efd-4cc6-a82f-7b10b0c1dfc2"), "nqumndlcpbr" },
                    { new Guid("7dc08585-1f2a-42a2-97c1-7d9a84c96def"), "tttivmhldnixj" },
                    { new Guid("453cc42d-11ca-46f3-9a54-01c6731665a0"), "nmsirdjuynwo" },
                    { new Guid("304cb0af-44b7-4ccd-a7ef-83dbc14219dc"), "jomzslxlnijqvvfaa" },
                    { new Guid("36301f91-2a3a-4e79-b7bd-6a9eaf44f4b3"), "ypybjgpsgclclbiei" },
                    { new Guid("2d358f9c-73f8-4793-b0b4-9b9f05fd3235"), "imuybwweabxuzpq" },
                    { new Guid("df3cee5e-a0dc-4664-9712-dbacd8c96f4c"), "qokjktqysxfzf" },
                    { new Guid("9edd1ddc-0f20-4412-b070-d5a24a3c17bf"), "gkjvyqclqwx" },
                    { new Guid("6f5cb34c-cc90-4e8b-8f8a-5c85c04bec76"), "tnitzbjrxqzipnj" },
                    { new Guid("7b9c27cf-9fd7-42db-883c-c8f4a85f38c3"), "hwfgprpncrk" },
                    { new Guid("b2194e00-0ee3-4016-b3aa-37a2b2ad72b9"), "tkgvarxoaivzlx" },
                    { new Guid("920a3899-11ee-4ee6-bb1e-eaf6628f2a93"), "vwerhlimjsyzgbzhvcb" },
                    { new Guid("9ec9ec01-a3e8-4856-b749-a7df427e7237"), "lptyyynzmicqco" },
                    { new Guid("1dd3bd6c-54c3-41d2-bd22-80f14b45be67"), "ckswiwbohw" },
                    { new Guid("c2dfd887-1750-4d80-88ac-ee06daa1e835"), "fknqzpslnrdt" },
                    { new Guid("d12f8872-2199-4b97-8b1c-9c6cb53abef8"), "tdcmgsyidacqwepeagp" },
                    { new Guid("09c3a51f-f283-487b-b76e-54acf04495cb"), "zteekqqfim" },
                    { new Guid("ee5f2018-913c-4646-b9f3-a9beb725dff2"), "eiomzfotpdpyxg" },
                    { new Guid("60d7afbb-3309-4805-9904-64148fef069d"), "tyklkjpygrtig" },
                    { new Guid("c759c4a7-1b4f-45df-a7df-aeb5cc1df29c"), "ncvailvtpvnbxy" },
                    { new Guid("9527794f-017f-4843-8f3c-48ffce09286b"), "lsjqndonsp" },
                    { new Guid("79de8199-b82e-4b87-9ce1-7c99e83563a1"), "fxcojiufomo" },
                    { new Guid("62b00638-ad05-4c95-8c62-945475f1b5d0"), "ggmdkragbjwwaou" },
                    { new Guid("6c61d500-0d0c-48f1-ab8e-1f32935861a2"), "gxzsneosbcfxk" },
                    { new Guid("9a1b8260-e9cc-407c-bd17-6990981cd511"), "hnalrnmpgrs" },
                    { new Guid("85f56ccb-d296-4421-92f8-57d9f8007c49"), "ryyybzwdybezjtny" },
                    { new Guid("049a27e4-854e-4de2-b77d-106107630324"), "fikgebzupts" },
                    { new Guid("33c56248-0598-4d5a-8cdf-4415cb28d176"), "lgempnnqmgxdjc" },
                    { new Guid("698127bb-25a3-42c4-8f6e-06f4a03b92b9"), "ryyslbmliysmx" },
                    { new Guid("ada082c3-b8b9-4b8a-ba2d-2b9e8462a427"), "prtrmcoixomqcd" },
                    { new Guid("3e35f3f4-758b-497e-a5fa-b10148791ad9"), "klfwmebusjeqeop" },
                    { new Guid("c0ae5000-2117-4ddc-b80c-25ea4b366d97"), "ungelmhbdw" },
                    { new Guid("3e9bb78d-3b49-4914-9422-f7c3a98fc97c"), "anjspdhtjxixree" },
                    { new Guid("491028ed-282f-4c61-a459-066abee3ac0b"), "uxkxrtqlbidwgvimm" },
                    { new Guid("d342ebfb-c211-4623-861b-7ef1cee0c006"), "hostdrmtidhkbkde" },
                    { new Guid("566a764b-3929-4a88-a14b-4a3a58a74c2c"), "aerkmrpophstiyssg" },
                    { new Guid("426e66e3-4f56-4063-a95c-3acd7fe893a3"), "vkszbmorocwm" },
                    { new Guid("4bc676e3-b3e5-4bcd-9848-d1eb5c1ba498"), "kctheuetwmhleb" },
                    { new Guid("ab82a02a-59ab-4525-b19b-f8a8b72b7228"), "xiuuihdrxdfzq" },
                    { new Guid("0d017f7e-04e8-4c23-b8a8-c8a07c161223"), "wkvpqzbuddsyib" },
                    { new Guid("ca4bac62-55e9-4ebe-b8b4-476a1d89d738"), "ppakzncxatowjwvvl" },
                    { new Guid("fe0b81a8-329a-490b-825a-9b7bb6806b3d"), "psrrmxkfsmydim" },
                    { new Guid("8cd676f3-9f3e-4add-bec6-d10836b83759"), "qglrklfbdhod" },
                    { new Guid("e2bf382d-7bdc-436a-aa4f-a4c819b91bb4"), "jvtvchxvdgtfyyzn" },
                    { new Guid("78f871a0-8ec1-4298-9b4b-e0b2fd0379f4"), "whcmqsvmcknk" },
                    { new Guid("848654ab-edee-4d90-a987-64e98aed3030"), "tdiivbytpsgarki" },
                    { new Guid("677aae99-a861-4a97-950d-b679ee0565db"), "ccpjrirwsulvb" },
                    { new Guid("a85a75e8-9a78-4ea3-9250-a1c6a3b134c2"), "gplxalhqnp" },
                    { new Guid("f86b63c1-fc7d-4216-8906-9eb8f53025e4"), "brllefkzcztoucijry" },
                    { new Guid("7d1160a9-ea09-4775-8a80-632a94891b10"), "ursvzbhkvkzmfj" },
                    { new Guid("92a13efb-3995-46f4-af75-401388f190ce"), "wvzzqmegdachb" },
                    { new Guid("87b99219-3b2a-4016-ae18-5cfce7bd1598"), "zvaibgcpctzenzmj" },
                    { new Guid("e418c19d-c7f4-4bb3-9d77-ea349fb72746"), "mhiovvypsjhm" },
                    { new Guid("359a0ba6-5515-40f9-904a-703985985f30"), "azwcljookqizsrkiq" },
                    { new Guid("755eadb4-4b47-4910-bac2-a51f067ae938"), "hhpwurklhckmcfs" },
                    { new Guid("0ecf8216-f1da-40b5-8aef-8047adfdcad6"), "etcmwtuxswzywow" },
                    { new Guid("5079bbec-26ca-430b-8e30-a22f2bab133b"), "ytdvideieiuytlt" },
                    { new Guid("c35ccf20-4282-4d4c-86c4-3506be05c2fb"), "wbjcunleqqpmbuv" },
                    { new Guid("2e776ace-a456-444e-a9b3-75b671cca0e4"), "epocaffcdfzincckh" },
                    { new Guid("e5660633-6676-4bff-bdba-0656162bad6c"), "nizsctipawdf" },
                    { new Guid("6a190a21-cb2d-4556-b2f0-07768dd379ab"), "pgfpykhcvweiwt" },
                    { new Guid("c072b231-d89d-4861-8641-ead462a09fb6"), "wfdraqweyx" },
                    { new Guid("3c6fafdf-49d8-4e65-a30e-abc648503317"), "rkfigukkoklf" },
                    { new Guid("b6a3a2ac-ffc2-49ce-8aae-c7c4786b9b4a"), "tekmptkpouaqta" },
                    { new Guid("7d23a782-f7cf-44dd-bc46-0613fff5b91e"), "fslnwyuyjuyw" },
                    { new Guid("b62070f5-8842-4ff5-9ece-dc26c2ab2330"), "serapleivguypey" },
                    { new Guid("36835f0d-cdc9-4b5b-9a76-9adefb921d77"), "ogltjunkbeqpv" },
                    { new Guid("eeb60f28-88b2-4906-9a0f-1da50043019c"), "pipzlmfemtgjx" },
                    { new Guid("e58c80a4-d174-4bac-958d-490dbef077cd"), "htpuzdtinraq" },
                    { new Guid("f3d71aef-1166-4dd6-9833-984c688d94f8"), "lorspbjlmbtdx" },
                    { new Guid("0e072fc5-9942-42a9-8509-e800f45931ad"), "rkbdjmphummpkgki" },
                    { new Guid("c2ce0e74-3283-4e1d-9cc9-cc40573a8418"), "ncccwuqvulfimjrs" },
                    { new Guid("ca0f1670-5f2f-474f-8aa2-8cd621f57efb"), "mmzjkxubivod" },
                    { new Guid("3f79e252-e6df-4173-8ae4-d53dd29a2cbf"), "swxtiwsvjvwbrmsufo" },
                    { new Guid("b3a59e19-2f51-4cc2-9bdc-52713f7c06ba"), "laihzgyjkbwst" },
                    { new Guid("5649b05e-5bd2-48a1-bf17-c7bbb2738b15"), "wuprxryzjtgsw" },
                    { new Guid("8ece20af-5009-4277-b8a1-ad40f09ff806"), "fmktsprqxfjospx" },
                    { new Guid("f238cf6d-0cf0-4944-9192-f12fb23f5c36"), "tgylitzidtacymzn" },
                    { new Guid("4fd76960-0f76-4d55-84d2-48d985d465ad"), "itgyjlorohzdge" },
                    { new Guid("93c4f5d0-b7be-433d-9bcf-7d76b773f3fb"), "pbkvrlqicotv" },
                    { new Guid("27cf36c2-52e4-4b61-a117-4f7cbf7ebd83"), "xklatblesunjcc" },
                    { new Guid("e5d5d56f-89b0-420d-8165-24d946772cd5"), "dobfxmsziozsiymnslf" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_SentFiles_GroupId",
                table: "SentFiles",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_SentFiles_UserId",
                table: "SentFiles",
                column: "UserId");
        }
    }
}
