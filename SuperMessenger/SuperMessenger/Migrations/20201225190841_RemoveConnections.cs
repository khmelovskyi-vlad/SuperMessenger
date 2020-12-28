using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SuperMessenger.Migrations
{
    public partial class RemoveConnections : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Connections");

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("01b83bcb-095d-4cd0-82da-7b75f3d4cf71"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("05452cfc-c70e-40ed-bfa3-cb0c60b814dc"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("06654387-9e63-44b9-a16c-725e0b2ce11e"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("07ce6e3e-00db-410b-a557-430763bf79ac"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("08582a13-16ef-4fa3-a5f9-999ca032a9ce"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("0e657b09-e6a9-4317-ba69-6648a28f5524"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("0edaca5a-502b-46c3-8dd6-217581dd19c9"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("0f6026de-8c92-4b7f-b933-58d6257e7774"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("1041776e-097d-4750-8e6d-99ca5ac50902"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("166b328b-5961-4015-b089-d043e5b62ea7"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("1a0157ea-6661-40b5-bd6f-3ee287550689"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("1a93c55f-2a0a-4b4a-b3a0-a56b5f226b42"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("2114b35e-5ebf-452e-b740-eba077765c47"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("223579ed-4a50-4ecc-9ade-2a5d60126574"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("22cd85c6-6634-4132-9067-aaa27e0396df"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("24fba5ce-7075-42dc-aa18-1928a7b626f9"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("278b4640-387b-4d79-81bb-14545aaf6410"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("27986516-3efc-492a-8a75-fff8fc0e24db"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("2aad8539-d85c-408b-8dd6-df2990d2a717"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("2c123cb5-206f-4bae-87bd-27eaaeab03f5"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("30e284e7-5a5a-42e7-abe0-c768c4b2ab2e"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("32aaf3ec-f119-4eac-acd0-16a22379f9ac"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("3c74ce75-4746-4adc-9924-1c8acd2b8953"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("43f234e8-c4ca-4685-bedc-c1713eb9bc0b"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("44326c23-2ae7-485c-84bd-fbafb9352ba7"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("44f16ccb-1906-4990-be9e-c1f74f805438"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("456eb339-c8f8-4504-8ccb-f00c35568bc0"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("469f200e-c0d9-4476-a2bb-8eeda44a7a98"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("48959c64-ba97-4850-90d1-78aced63f20f"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("4b58d3f6-1d68-4649-a7a6-1e0e9b041481"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("4b6d35b9-35a4-45c2-9ee8-e87bbd5b6fc6"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("4bad1d8d-1669-470f-b445-f58e7049a420"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("4e1b8b8d-8f5d-4bb9-9c96-f9d385e09959"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("4fe0aa7d-b3bd-4b3a-a75d-a40f0d6890d5"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("4fe33da3-b6d2-4cba-a99b-cd5fe6764555"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("52c0f52e-831c-4c4c-adb4-8e96f266e19d"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("52dc9970-4a49-4104-8038-0191819e2653"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("5508815f-2409-4247-9b15-b4b249befd43"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("56e063f1-b496-4a0d-8780-3537eda5df22"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("56ea6d6d-173b-4e3f-86e1-6dc888b54802"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("57b24a19-190d-4d86-bf6a-52a2387fa35c"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("5ac0ff4b-d4e9-4b1c-b7b4-5c4e220c3b89"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("5baa4cdb-204a-448c-a14c-15f1e3651738"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("5bfd0815-fcfc-4a3e-be0e-b65d819e0800"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("5c525231-9c5d-42f4-9114-71f7f996ddcd"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("5d91e2bb-622f-45d4-bc65-8a07284daa1f"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("604be7c4-8cc7-498b-bc7c-87e1198da527"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("651e01a6-4cca-49ec-9a19-9a085da11a3f"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("659104ac-1800-41f1-b9f6-b2b3ae77b78f"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("661b904c-132b-4147-8385-18f1c8e669df"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("68360df4-ad82-4bf5-b6b5-f0be18fb6ebc"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("6f89bb5b-0091-4ed7-8e66-24fe8c336858"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("707a4b3a-a5cd-4256-ac2a-4719ec1285c7"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("7780f43d-80f9-4a02-97fc-d33dbadbba33"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("7c2c5403-bb5d-4e05-84fd-e3c3ddc22306"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("7da40091-5383-4b2a-9655-c05ffed83aac"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("8413b47c-2c13-4030-8fc1-ffbb67a944b5"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("85e3100a-08a5-4dd2-907c-2505e2ca5d6c"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("90807d44-287c-4ccf-aab3-1ece982b3d9a"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("92061224-64fc-495f-9ff6-701d8c05ff51"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("955b6f02-9277-44fb-ab1e-43c7c0d63907"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("96a9072c-f921-49e5-88e1-2080df1ddc9e"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("9b902fd0-94f1-4c9f-93e5-5822d8eb4c56"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("9de9177f-2375-4daf-a439-850360cd314d"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("a0202ddb-8804-4744-b0ca-3c2f869aa747"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("acd01ded-1f49-420d-bf68-7757e280df1f"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("b5938fc1-55c9-4658-8916-bd97a0841609"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("b64e1d3f-79b2-45fa-a786-d98135fea95b"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("baf6dab9-9f09-4ce6-afe1-a04d2167ae1e"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("bb31bd4b-0c23-44ee-9e0a-6591b79a6b31"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("bd3fb0ba-1d17-4114-aa08-8d76c8ce9bfc"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("c8e2ca41-e4e2-492c-b1f5-63e793215d01"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("ca5d84db-33ad-44ec-baeb-c281db3d87d8"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("ccf96452-9f70-4f93-8d0c-9f3021041472"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("cead64b0-fa68-49e1-8daf-ccd9f0055e95"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("cf4ff42d-b3d6-4116-a77f-992f27b71452"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("d14fb354-e265-4dfa-812d-497f387c1de2"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("d51badb6-e5cb-4517-a197-a9710c20cfcd"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("d7911d80-349c-4fcd-a215-b7387872602e"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("d7cebe92-e5bf-41ba-a66c-2496cd10eeb7"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("d8402c78-6524-43d2-8e55-1056289aad6c"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("d9449dd2-dc98-4905-a9a5-d76eae31acf1"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("dc7c5fde-0871-45a9-a61a-bb111d891f1e"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("e2411b55-4060-42d5-8b10-5a9f946c427e"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("e75b1a92-9db6-4dd5-83a9-f10114ca35c3"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("e880e54f-76fc-4685-be3f-ad5f8ca30131"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("ea374f75-f990-4b9c-b0fe-0bd8a3c7a092"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("eb13ad00-40c4-4322-a5d9-e3acdbb7911a"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("ebe2673f-a89d-4e76-8fae-0d12b5d9f3d9"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("ed091c49-ae8a-4ff3-9d1b-8b078364e3cb"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("eed85e93-eaf3-42b8-806f-05a85b598768"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("f028ba97-d110-499f-91e4-18e9cd64cb64"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("f2a0deba-d70a-48b7-9234-0c351ac32d8c"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("f2b0d140-22bb-4943-9526-0ada5970ef0c"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("f4cd1560-d9e7-406d-8be4-b871df8708b5"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("f5a7507d-f0d8-4bcc-b777-ebffcb90d60d"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("f5f585e4-83db-45be-b68c-7e4bcf1a445e"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("fb5b8df7-e93b-477a-9241-da2987244e59"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("fb7af65d-d91c-483f-bf9d-35ea98f0babd"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("fe08a517-6a05-4fdf-9c77-ee83fe631d00"));

            migrationBuilder.InsertData(
                table: "Countries",
                columns: new[] { "Id", "Value" },
                values: new object[,]
                {
                    { new Guid("7487ec6b-758c-4c3e-9e68-c1ebcf28cc15"), "tjcdveceywyor" },
                    { new Guid("e21a2fc4-2544-41c6-871e-16d708e6ee49"), "fdkgpxawkldb" },
                    { new Guid("954d31ac-ca1b-4ae6-a51a-2c38d51bf3e3"), "pgmrubmrvoql" },
                    { new Guid("73954f12-e565-4ac1-8494-03e13f332fed"), "pladmszkqtbuxr" },
                    { new Guid("ecfe4fc9-eace-449e-ab30-3cfc66998a06"), "pmzpsoztsmjvu" },
                    { new Guid("a43d9ab7-2ebf-48c3-bd00-a99e5e68253c"), "zmkzmlpxagz" },
                    { new Guid("82308b92-1e94-4bf6-86b1-8de70e18ce52"), "tznmydyvbtxuayqs" },
                    { new Guid("4c02bd92-346f-4948-89ca-c1f59ad65228"), "jhlfiwggywrgll" },
                    { new Guid("40882dd5-7127-433b-aa18-bddb611b7641"), "coarhnwuvnslil" },
                    { new Guid("f80bfa29-7bf7-4553-a235-ec40d763d37e"), "sqfuqebxryfomxofgtyge" },
                    { new Guid("e7271991-a50e-423f-8826-e6bd2c0a5d48"), "hmomzbvdhjl" },
                    { new Guid("c27d050c-f7cd-4115-b491-ec53c6a4acc0"), "sgxuzdwqblysnog" },
                    { new Guid("46fd3cd2-fd8b-477b-a79d-64827f1e5677"), "tifmryngkzm" },
                    { new Guid("c77c9a71-5bf7-48c1-aedd-751bdfd66796"), "kmvvzunkosb" },
                    { new Guid("fe062653-5816-4aed-aca3-372ee66aec27"), "jycoipuxvfrmn" },
                    { new Guid("02807856-99f5-4db8-b193-906d4793f0e6"), "hejvrprrzktxazpn" },
                    { new Guid("8cdd6100-6b63-4d4e-b624-99bbda13c75d"), "ehdvlujgjfijgyoyxoo" },
                    { new Guid("aeb60c0c-2d48-4f4d-adda-2d2816b7cbd3"), "ywuwbtwajpdload" },
                    { new Guid("6d299ef1-245a-496d-963f-2dd35c9f5465"), "xzpadxzmhvu" },
                    { new Guid("ee368ec6-87dc-4b2d-aebf-423e5263d98a"), "xuxjhcmmqjtqytgz" },
                    { new Guid("5cae8869-edac-4120-9ac9-b5444927e1cb"), "pqkpnhfufizpiiwc" },
                    { new Guid("3101ea98-05a0-4b01-8ede-337c0edbdc90"), "tekysozkvxw" },
                    { new Guid("84601cc1-8efc-496d-91ad-2caab13cac35"), "cdqpwsjcsjoafjiq" },
                    { new Guid("8835d599-1364-40de-a96d-4054d84b431e"), "jmamgfglxrihll" },
                    { new Guid("93177a01-202d-4469-993c-9fb1c8f0d624"), "wplbqymrneqook" },
                    { new Guid("9f39611f-3098-49e8-b327-6738ffaf0e8b"), "snsgsbtsurfxelqsz" },
                    { new Guid("07c7baa7-89c7-4e11-b3b7-fc2b855a36a6"), "fvtfhwqlialoc" },
                    { new Guid("71bcb7ad-6acc-4f5b-a069-48394ffacb2f"), "bygkjyturighn" },
                    { new Guid("c846bd8c-503a-4f8c-865b-4d205b5e08be"), "bwxmxmfeoresyhfl" },
                    { new Guid("9602e5a9-459f-4a67-afa6-76884d295353"), "nwxjeykwjucfyb" },
                    { new Guid("dbd4c495-d56a-402c-94fb-98f0ff145cd4"), "rnuwurzkebxcuoxnscc" },
                    { new Guid("10d06caf-0f44-4183-a71e-d9fc8330f593"), "vuqeqfylxlz" },
                    { new Guid("53467797-9c09-4213-b534-6ecc9fc28232"), "oczrieqypnwnrdph" },
                    { new Guid("7f3ef187-ee6d-4914-86ae-8491fcedbb7f"), "txlyaykedzszuhmg" },
                    { new Guid("e8ef7467-4919-4d50-b66d-7d89c6cc7641"), "xwzzckkbfgplh" },
                    { new Guid("53ac8ed5-7150-4561-a9ba-e9834c618270"), "jlzlfityynoilo" },
                    { new Guid("3183d7b7-acbb-45e8-b181-b9dcc2cbf8d8"), "ksvmynrcel" },
                    { new Guid("4f65e3a5-a8b4-453a-b8d6-49513e5415bc"), "urmuxlsiwyexje" },
                    { new Guid("0364cbad-7f38-417a-81de-c7d72898b517"), "nkzqdqwvbccxta" },
                    { new Guid("4278c254-a59a-429d-a74b-ec6897cdc1d2"), "yywkzrnhnnfveqq" },
                    { new Guid("6ec5fa33-7a67-449c-8b4e-1c2af1faae36"), "xsfsizcnbkgxr" },
                    { new Guid("990b1c88-404e-4ae0-a4eb-120478a67110"), "uhxpsxxxnwindetzd" },
                    { new Guid("1f5add36-c2bd-4862-9140-6421591a29f4"), "lfwepfcsytqodj" },
                    { new Guid("9a12f8ff-05ac-4cfa-ae27-8def80cd8991"), "tpsolqxteuczjmd" },
                    { new Guid("a0814bb1-2a96-41e8-9f03-bc2765a63f25"), "tvrpjpbgnaizdb" },
                    { new Guid("c26bfc52-b52c-49e6-ae7f-662768302fe7"), "amxrhsmaglosngxdg" },
                    { new Guid("9048085b-f912-41cd-904e-d150d5f64583"), "khjceddblcwwi" },
                    { new Guid("326650da-51ad-4444-a2ae-9b4d68920ebb"), "omyeemefwluhtyw" },
                    { new Guid("10282966-beb0-465c-a2d9-e8bbc2c0880d"), "ykilxubkrouorjxopffn" },
                    { new Guid("ef02af59-a311-420c-9641-21735f3d440b"), "zvowmaasucckcx" },
                    { new Guid("95f84a7d-6eae-484e-866a-684c6ae20df6"), "qjotvkzchntz" },
                    { new Guid("84c34724-af7f-4ff7-a5c2-03cb11496c1d"), "kcliswgsjyknesw" },
                    { new Guid("ede3039c-dbcc-48f5-ac93-894cb01cc0d1"), "vwjumeskkgkj" },
                    { new Guid("f3cda531-f508-4771-a3b2-0b90c75c3465"), "tolzlahtgn" },
                    { new Guid("ad6e451e-7ca2-4af5-87e3-c7a114b2adf9"), "iwzglutbgcxvrd" },
                    { new Guid("487f577e-eca6-4fb2-b475-7fef97e2be8c"), "xfjrnzeeccy" },
                    { new Guid("27518482-c670-42b1-b954-b28336b7ba12"), "cldjisfhlbgv" },
                    { new Guid("b3ae758e-40f5-4bed-bd1a-37d020e6d955"), "xlznpbzwhphb" },
                    { new Guid("8040bf6a-47fc-4314-969d-0c7f1587c31e"), "fsmaeettwtmtwnyfu" },
                    { new Guid("9529abcf-c1e8-44d2-a2e9-cff9ef4e1fe1"), "nftxxkngrumrgt" },
                    { new Guid("d4e711af-0fd5-4a1e-8c51-9d7a77810595"), "iodksdepbcwvuupl" },
                    { new Guid("57f66411-42d7-41e2-a822-a257704aac32"), "xokfmowvtrpnroumai" },
                    { new Guid("99d24d13-1a24-4297-b3a5-b1d323a64525"), "dxucdikdglmnjjasdz" },
                    { new Guid("42e5c75f-fae1-4c32-b8ce-90592b35bb2a"), "mxqxninddgkbmhvsv" },
                    { new Guid("8f71fb74-1ca1-4120-9f30-988aa4992d76"), "xhmvzcmjcub" },
                    { new Guid("28f08170-74ea-48b4-8a96-417624c3ea26"), "gzfxqbwqqh" },
                    { new Guid("33a9ffbd-ac02-4be2-a416-60c885dbae45"), "dyjzmwhhpphisxccfsnthou" },
                    { new Guid("c1a854cb-ff9c-4650-a7b2-2485ec23a258"), "guxpfvmchaqhhjk" },
                    { new Guid("5c6dd056-4157-4987-a3ff-ae137f566988"), "mdzpglvklllhjko" },
                    { new Guid("87906ca8-b50d-4ed1-8082-ba62306e8077"), "zxdjzdeqvvgy" },
                    { new Guid("b2924af4-03ef-4091-bf91-eae41289bdc8"), "ghmuylbubvzjkko" },
                    { new Guid("cd5b1303-9093-4db1-8b3f-62c8167a6f11"), "tpgihxkmihsvh" },
                    { new Guid("c33e0d80-8e48-4cfe-99db-7ac65fe9be1e"), "fmxgxfrunkox" },
                    { new Guid("2c57ff9b-74c6-422c-a6eb-a2b244221d92"), "pbkpcwlxypevcdzzvu" },
                    { new Guid("26ed1e1f-9b37-4855-8822-57481583209a"), "rpyuofvxearoi" },
                    { new Guid("025dc8a8-aae6-418b-9cc2-3005ff612f42"), "ywinvizvxyw" },
                    { new Guid("1d3c5462-4707-4968-b268-a7b41fa67bb3"), "qtanfvklsfua" },
                    { new Guid("0ad4c567-9535-4d07-a6b7-df36a41b1c06"), "gjpksuzsvnx" },
                    { new Guid("ef5cb640-a28f-49ad-be30-c260b7375e6d"), "egmlwitvlkgxbytcyjrrs" },
                    { new Guid("3fdf7d78-8abf-4239-a232-06891df53cfc"), "gudoyedfqrknz" },
                    { new Guid("abd52693-baf6-4e1a-8363-def891121d65"), "vymabeokei" },
                    { new Guid("5ecc17ad-097e-404a-a180-759d2375a6d4"), "atjecowtplv" },
                    { new Guid("0b67c0d1-a4d9-4e4c-b5eb-f45a13373447"), "obqakxrydvrwdj" },
                    { new Guid("45c7c03e-6771-424a-83e0-23b32b3b6a18"), "txnqvlkhltkpqeq" },
                    { new Guid("b7d3f529-0c9e-42bb-b25f-18f3966614c1"), "olhjxircvmcgia" },
                    { new Guid("938aa792-4ce7-4134-9970-6115083279e3"), "vtvhwehsgla" },
                    { new Guid("82d2d743-54f1-4e74-bb89-10537834af2f"), "bfykwqjdyhocjif" },
                    { new Guid("93182ac5-9f3a-4354-8d99-2eb4cd7daf28"), "lxupdcezdtlsgsm" },
                    { new Guid("bb9278bc-233d-4e63-aa6f-85810c275fc9"), "ykfqqystxtvgj" },
                    { new Guid("64fa355a-7873-412d-ae8a-fcef1e716c12"), "cpqjulnlicnfr" },
                    { new Guid("1f4b42e8-4574-4de8-89aa-6bbbf41056e4"), "yazkuwxeizfaxkgdr" },
                    { new Guid("f243fad7-7f82-4830-a02f-5d609608d7ae"), "crjlptelgeuc" },
                    { new Guid("8e09c7c7-da39-4216-abe4-a192bca5b037"), "mldljugrpgor" },
                    { new Guid("e928dfb5-9b02-4fd7-813a-47a5cab33f50"), "gjdxaqgypwofsnh" },
                    { new Guid("fac06dc8-6d43-4157-9c1f-79b5618e8551"), "bofkxlejhgdeuhuru" },
                    { new Guid("0bc6ae98-2012-452f-b054-ac7f762febb3"), "rnedxpwqhqozrsp" },
                    { new Guid("c79ea574-d973-4b27-b610-9ad3b6e0e838"), "wnvikgfetuucdqimod" },
                    { new Guid("d4ff0b62-002c-4f0d-9270-3039508a417d"), "skrvuzkiwtuxmee" },
                    { new Guid("e211b6a8-e39a-4d12-995a-b2f0251bd11d"), "wqkxfthjtldxbuz" },
                    { new Guid("3cf4a366-7420-4dcc-ab14-980a01257af2"), "excoxbpahyldwmd" }
                });

            migrationBuilder.UpdateData(
                table: "FileInformations",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000000"),
                column: "SendDate",
                value: new DateTime(2020, 12, 25, 21, 8, 40, 230, DateTimeKind.Local).AddTicks(1788));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("025dc8a8-aae6-418b-9cc2-3005ff612f42"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("02807856-99f5-4db8-b193-906d4793f0e6"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("0364cbad-7f38-417a-81de-c7d72898b517"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("07c7baa7-89c7-4e11-b3b7-fc2b855a36a6"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("0ad4c567-9535-4d07-a6b7-df36a41b1c06"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("0b67c0d1-a4d9-4e4c-b5eb-f45a13373447"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("0bc6ae98-2012-452f-b054-ac7f762febb3"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("10282966-beb0-465c-a2d9-e8bbc2c0880d"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("10d06caf-0f44-4183-a71e-d9fc8330f593"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("1d3c5462-4707-4968-b268-a7b41fa67bb3"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("1f4b42e8-4574-4de8-89aa-6bbbf41056e4"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("1f5add36-c2bd-4862-9140-6421591a29f4"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("26ed1e1f-9b37-4855-8822-57481583209a"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("27518482-c670-42b1-b954-b28336b7ba12"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("28f08170-74ea-48b4-8a96-417624c3ea26"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("2c57ff9b-74c6-422c-a6eb-a2b244221d92"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("3101ea98-05a0-4b01-8ede-337c0edbdc90"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("3183d7b7-acbb-45e8-b181-b9dcc2cbf8d8"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("326650da-51ad-4444-a2ae-9b4d68920ebb"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("33a9ffbd-ac02-4be2-a416-60c885dbae45"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("3cf4a366-7420-4dcc-ab14-980a01257af2"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("3fdf7d78-8abf-4239-a232-06891df53cfc"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("40882dd5-7127-433b-aa18-bddb611b7641"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("4278c254-a59a-429d-a74b-ec6897cdc1d2"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("42e5c75f-fae1-4c32-b8ce-90592b35bb2a"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("45c7c03e-6771-424a-83e0-23b32b3b6a18"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("46fd3cd2-fd8b-477b-a79d-64827f1e5677"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("487f577e-eca6-4fb2-b475-7fef97e2be8c"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("4c02bd92-346f-4948-89ca-c1f59ad65228"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("4f65e3a5-a8b4-453a-b8d6-49513e5415bc"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("53467797-9c09-4213-b534-6ecc9fc28232"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("53ac8ed5-7150-4561-a9ba-e9834c618270"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("57f66411-42d7-41e2-a822-a257704aac32"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("5c6dd056-4157-4987-a3ff-ae137f566988"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("5cae8869-edac-4120-9ac9-b5444927e1cb"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("5ecc17ad-097e-404a-a180-759d2375a6d4"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("64fa355a-7873-412d-ae8a-fcef1e716c12"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("6d299ef1-245a-496d-963f-2dd35c9f5465"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("6ec5fa33-7a67-449c-8b4e-1c2af1faae36"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("71bcb7ad-6acc-4f5b-a069-48394ffacb2f"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("73954f12-e565-4ac1-8494-03e13f332fed"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("7487ec6b-758c-4c3e-9e68-c1ebcf28cc15"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("7f3ef187-ee6d-4914-86ae-8491fcedbb7f"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("8040bf6a-47fc-4314-969d-0c7f1587c31e"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("82308b92-1e94-4bf6-86b1-8de70e18ce52"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("82d2d743-54f1-4e74-bb89-10537834af2f"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("84601cc1-8efc-496d-91ad-2caab13cac35"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("84c34724-af7f-4ff7-a5c2-03cb11496c1d"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("87906ca8-b50d-4ed1-8082-ba62306e8077"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("8835d599-1364-40de-a96d-4054d84b431e"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("8cdd6100-6b63-4d4e-b624-99bbda13c75d"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("8e09c7c7-da39-4216-abe4-a192bca5b037"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("8f71fb74-1ca1-4120-9f30-988aa4992d76"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("9048085b-f912-41cd-904e-d150d5f64583"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("93177a01-202d-4469-993c-9fb1c8f0d624"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("93182ac5-9f3a-4354-8d99-2eb4cd7daf28"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("938aa792-4ce7-4134-9970-6115083279e3"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("9529abcf-c1e8-44d2-a2e9-cff9ef4e1fe1"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("954d31ac-ca1b-4ae6-a51a-2c38d51bf3e3"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("95f84a7d-6eae-484e-866a-684c6ae20df6"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("9602e5a9-459f-4a67-afa6-76884d295353"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("990b1c88-404e-4ae0-a4eb-120478a67110"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("99d24d13-1a24-4297-b3a5-b1d323a64525"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("9a12f8ff-05ac-4cfa-ae27-8def80cd8991"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("9f39611f-3098-49e8-b327-6738ffaf0e8b"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("a0814bb1-2a96-41e8-9f03-bc2765a63f25"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("a43d9ab7-2ebf-48c3-bd00-a99e5e68253c"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("abd52693-baf6-4e1a-8363-def891121d65"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("ad6e451e-7ca2-4af5-87e3-c7a114b2adf9"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("aeb60c0c-2d48-4f4d-adda-2d2816b7cbd3"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("b2924af4-03ef-4091-bf91-eae41289bdc8"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("b3ae758e-40f5-4bed-bd1a-37d020e6d955"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("b7d3f529-0c9e-42bb-b25f-18f3966614c1"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("bb9278bc-233d-4e63-aa6f-85810c275fc9"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("c1a854cb-ff9c-4650-a7b2-2485ec23a258"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("c26bfc52-b52c-49e6-ae7f-662768302fe7"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("c27d050c-f7cd-4115-b491-ec53c6a4acc0"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("c33e0d80-8e48-4cfe-99db-7ac65fe9be1e"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("c77c9a71-5bf7-48c1-aedd-751bdfd66796"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("c79ea574-d973-4b27-b610-9ad3b6e0e838"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("c846bd8c-503a-4f8c-865b-4d205b5e08be"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("cd5b1303-9093-4db1-8b3f-62c8167a6f11"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("d4e711af-0fd5-4a1e-8c51-9d7a77810595"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("d4ff0b62-002c-4f0d-9270-3039508a417d"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("dbd4c495-d56a-402c-94fb-98f0ff145cd4"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("e211b6a8-e39a-4d12-995a-b2f0251bd11d"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("e21a2fc4-2544-41c6-871e-16d708e6ee49"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("e7271991-a50e-423f-8826-e6bd2c0a5d48"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("e8ef7467-4919-4d50-b66d-7d89c6cc7641"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("e928dfb5-9b02-4fd7-813a-47a5cab33f50"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("ecfe4fc9-eace-449e-ab30-3cfc66998a06"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("ede3039c-dbcc-48f5-ac93-894cb01cc0d1"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("ee368ec6-87dc-4b2d-aebf-423e5263d98a"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("ef02af59-a311-420c-9641-21735f3d440b"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("ef5cb640-a28f-49ad-be30-c260b7375e6d"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("f243fad7-7f82-4830-a02f-5d609608d7ae"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("f3cda531-f508-4771-a3b2-0b90c75c3465"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("f80bfa29-7bf7-4553-a235-ec40d763d37e"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("fac06dc8-6d43-4157-9c1f-79b5618e8551"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("fe062653-5816-4aed-aca3-372ee66aec27"));

            migrationBuilder.CreateTable(
                name: "Connections",
                columns: table => new
                {
                    ConnectionId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    IsConnected = table.Column<bool>(type: "bit", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Connections", x => x.ConnectionId);
                    table.ForeignKey(
                        name: "FK_Connections_AspNetUsers_UserId",
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
                    { new Guid("2c123cb5-206f-4bae-87bd-27eaaeab03f5"), "bjbybuzqzwgztw" },
                    { new Guid("07ce6e3e-00db-410b-a557-430763bf79ac"), "evulsrunaxaohv" },
                    { new Guid("2aad8539-d85c-408b-8dd6-df2990d2a717"), "kffnyrjdoxsoeuztf" },
                    { new Guid("fe08a517-6a05-4fdf-9c77-ee83fe631d00"), "vvffoqpstmsjwscgqnge" },
                    { new Guid("6f89bb5b-0091-4ed7-8e66-24fe8c336858"), "ysibkrcbdtzg" },
                    { new Guid("eb13ad00-40c4-4322-a5d9-e3acdbb7911a"), "hbllovgodkkuikg" },
                    { new Guid("56e063f1-b496-4a0d-8780-3537eda5df22"), "nuvjhulyzgcc" },
                    { new Guid("651e01a6-4cca-49ec-9a19-9a085da11a3f"), "zxhobeykwpakoq" },
                    { new Guid("5baa4cdb-204a-448c-a14c-15f1e3651738"), "xchsrqeelr" },
                    { new Guid("08582a13-16ef-4fa3-a5f9-999ca032a9ce"), "oqzmikokkrgajvgzm" },
                    { new Guid("4bad1d8d-1669-470f-b445-f58e7049a420"), "qrpslijnfydve" },
                    { new Guid("d7cebe92-e5bf-41ba-a66c-2496cd10eeb7"), "ztxflsgurnvtkx" },
                    { new Guid("d7911d80-349c-4fcd-a215-b7387872602e"), "tvzbykrgoylnbcf" },
                    { new Guid("96a9072c-f921-49e5-88e1-2080df1ddc9e"), "iurzvajzaqr" },
                    { new Guid("22cd85c6-6634-4132-9067-aaa27e0396df"), "atshiwjcjimqw" },
                    { new Guid("f5f585e4-83db-45be-b68c-7e4bcf1a445e"), "nkejncnoodcd" },
                    { new Guid("fb7af65d-d91c-483f-bf9d-35ea98f0babd"), "krvihjvzulsl" },
                    { new Guid("e2411b55-4060-42d5-8b10-5a9f946c427e"), "eeszezugexbnhavf" },
                    { new Guid("43f234e8-c4ca-4685-bedc-c1713eb9bc0b"), "vjxoyjkutenheh" },
                    { new Guid("f5a7507d-f0d8-4bcc-b777-ebffcb90d60d"), "uzyubvgjmmudrenl" },
                    { new Guid("955b6f02-9277-44fb-ab1e-43c7c0d63907"), "eshbnovkpimarkg" },
                    { new Guid("9de9177f-2375-4daf-a439-850360cd314d"), "unzzqqiwxfw" },
                    { new Guid("bb31bd4b-0c23-44ee-9e0a-6591b79a6b31"), "mosbhefbqidoofpbj" },
                    { new Guid("d14fb354-e265-4dfa-812d-497f387c1de2"), "tfjydlcssptgkm" },
                    { new Guid("4b58d3f6-1d68-4649-a7a6-1e0e9b041481"), "bxpjxbbonbswbmspucnn" },
                    { new Guid("30e284e7-5a5a-42e7-abe0-c768c4b2ab2e"), "gotwjsfsecnfchoyvli" },
                    { new Guid("5bfd0815-fcfc-4a3e-be0e-b65d819e0800"), "oeoqvbjwvlhmn" },
                    { new Guid("223579ed-4a50-4ecc-9ade-2a5d60126574"), "hslfjtkqvwgiyoc" },
                    { new Guid("f4cd1560-d9e7-406d-8be4-b871df8708b5"), "msqrxsuertzofhnyor" },
                    { new Guid("ca5d84db-33ad-44ec-baeb-c281db3d87d8"), "jhzqqeqdisctbey" },
                    { new Guid("ea374f75-f990-4b9c-b0fe-0bd8a3c7a092"), "fmljcmykksfph" },
                    { new Guid("32aaf3ec-f119-4eac-acd0-16a22379f9ac"), "klxzsstvdrqllnke" },
                    { new Guid("baf6dab9-9f09-4ce6-afe1-a04d2167ae1e"), "xgsvzdfftgezyzq" },
                    { new Guid("661b904c-132b-4147-8385-18f1c8e669df"), "milkckzmlddrb" },
                    { new Guid("f028ba97-d110-499f-91e4-18e9cd64cb64"), "dpgxyflzglhjifqyfm" },
                    { new Guid("5508815f-2409-4247-9b15-b4b249befd43"), "egqjajtmhoth" },
                    { new Guid("44326c23-2ae7-485c-84bd-fbafb9352ba7"), "zxmwuuppdvqnj" },
                    { new Guid("604be7c4-8cc7-498b-bc7c-87e1198da527"), "akxaruytzsyxk" },
                    { new Guid("e880e54f-76fc-4685-be3f-ad5f8ca30131"), "kukdzcptnwbeq" },
                    { new Guid("06654387-9e63-44b9-a16c-725e0b2ce11e"), "ffvyzyefommxhehlyx" },
                    { new Guid("1a93c55f-2a0a-4b4a-b3a0-a56b5f226b42"), "vqbbdijmcwmbmc" },
                    { new Guid("56ea6d6d-173b-4e3f-86e1-6dc888b54802"), "mysmzhyqbhbmb" },
                    { new Guid("4fe33da3-b6d2-4cba-a99b-cd5fe6764555"), "ukxpyrqvhly" },
                    { new Guid("52dc9970-4a49-4104-8038-0191819e2653"), "pxszpmnccwwxzcc" },
                    { new Guid("c8e2ca41-e4e2-492c-b1f5-63e793215d01"), "pikmbuabcjbx" },
                    { new Guid("68360df4-ad82-4bf5-b6b5-f0be18fb6ebc"), "lhysrlfwmxdsrxsvz" },
                    { new Guid("92061224-64fc-495f-9ff6-701d8c05ff51"), "hlvyfetyslzyyvmq" },
                    { new Guid("4e1b8b8d-8f5d-4bb9-9c96-f9d385e09959"), "vdwopcmlpfjntdrdzg" },
                    { new Guid("0f6026de-8c92-4b7f-b933-58d6257e7774"), "uzprjbgfjmyaw" },
                    { new Guid("ccf96452-9f70-4f93-8d0c-9f3021041472"), "sfhabedzmyz" },
                    { new Guid("456eb339-c8f8-4504-8ccb-f00c35568bc0"), "axxbehobasin" },
                    { new Guid("166b328b-5961-4015-b089-d043e5b62ea7"), "irthpawznbvjkfjmi" },
                    { new Guid("f2a0deba-d70a-48b7-9234-0c351ac32d8c"), "dckuvkswtwlgobvz" },
                    { new Guid("d51badb6-e5cb-4517-a197-a9710c20cfcd"), "fxolyoquvdjvfry" },
                    { new Guid("0e657b09-e6a9-4317-ba69-6648a28f5524"), "jvjzfuahrvkcxsuuih" },
                    { new Guid("48959c64-ba97-4850-90d1-78aced63f20f"), "kquplpuwemu" },
                    { new Guid("a0202ddb-8804-4744-b0ca-3c2f869aa747"), "zwbbywhanycwgrvfkya" },
                    { new Guid("7c2c5403-bb5d-4e05-84fd-e3c3ddc22306"), "rllyxselptdfj" },
                    { new Guid("278b4640-387b-4d79-81bb-14545aaf6410"), "gjuvmfwedjgza" },
                    { new Guid("cf4ff42d-b3d6-4116-a77f-992f27b71452"), "vijyqhpfajk" },
                    { new Guid("dc7c5fde-0871-45a9-a61a-bb111d891f1e"), "xntvxlxbozggsv" },
                    { new Guid("2114b35e-5ebf-452e-b740-eba077765c47"), "vsjebtrqnof" },
                    { new Guid("27986516-3efc-492a-8a75-fff8fc0e24db"), "trovgpmktk" },
                    { new Guid("4fe0aa7d-b3bd-4b3a-a75d-a40f0d6890d5"), "egszdsimadoh" },
                    { new Guid("90807d44-287c-4ccf-aab3-1ece982b3d9a"), "gmmfpcskdpsdfjh" },
                    { new Guid("5d91e2bb-622f-45d4-bc65-8a07284daa1f"), "wabniqeqoc" },
                    { new Guid("5ac0ff4b-d4e9-4b1c-b7b4-5c4e220c3b89"), "fgjnirzyigqfqcpg" },
                    { new Guid("eed85e93-eaf3-42b8-806f-05a85b598768"), "dfnteyivdkjmuczeg" },
                    { new Guid("85e3100a-08a5-4dd2-907c-2505e2ca5d6c"), "kuuqrhzxrajhaveb" },
                    { new Guid("7da40091-5383-4b2a-9655-c05ffed83aac"), "opskdeyizhpspwv" },
                    { new Guid("469f200e-c0d9-4476-a2bb-8eeda44a7a98"), "zdeimcldjdigwf" },
                    { new Guid("57b24a19-190d-4d86-bf6a-52a2387fa35c"), "giaevxjkwxy" },
                    { new Guid("44f16ccb-1906-4990-be9e-c1f74f805438"), "thdifefaqswm" },
                    { new Guid("52c0f52e-831c-4c4c-adb4-8e96f266e19d"), "jxjbhkrsplsznan" },
                    { new Guid("f2b0d140-22bb-4943-9526-0ada5970ef0c"), "rfspplvqgyua" },
                    { new Guid("ebe2673f-a89d-4e76-8fae-0d12b5d9f3d9"), "lajnfpvjogvvzovd" },
                    { new Guid("4b6d35b9-35a4-45c2-9ee8-e87bbd5b6fc6"), "ytxpydmhfruhdqzwh" },
                    { new Guid("d8402c78-6524-43d2-8e55-1056289aad6c"), "uqbllhnawwnonak" },
                    { new Guid("3c74ce75-4746-4adc-9924-1c8acd2b8953"), "jtrrdhjrjare" },
                    { new Guid("e75b1a92-9db6-4dd5-83a9-f10114ca35c3"), "btahezubba" },
                    { new Guid("ed091c49-ae8a-4ff3-9d1b-8b078364e3cb"), "aybqtyybcprdm" },
                    { new Guid("01b83bcb-095d-4cd0-82da-7b75f3d4cf71"), "qkarcbgdptgwzlvg" },
                    { new Guid("05452cfc-c70e-40ed-bfa3-cb0c60b814dc"), "nyrgoxerdozfmba" },
                    { new Guid("1a0157ea-6661-40b5-bd6f-3ee287550689"), "twlqolhofixcrb" },
                    { new Guid("707a4b3a-a5cd-4256-ac2a-4719ec1285c7"), "hkuahcqoptuv" },
                    { new Guid("cead64b0-fa68-49e1-8daf-ccd9f0055e95"), "vslmhjyglsikew" },
                    { new Guid("b64e1d3f-79b2-45fa-a786-d98135fea95b"), "uemnuoqeebaznpltu" },
                    { new Guid("659104ac-1800-41f1-b9f6-b2b3ae77b78f"), "imozxnawyiaherxkrqam" },
                    { new Guid("24fba5ce-7075-42dc-aa18-1928a7b626f9"), "ibjzdcwmczrtibwz" },
                    { new Guid("5c525231-9c5d-42f4-9114-71f7f996ddcd"), "mjqfqjopoumi" },
                    { new Guid("1041776e-097d-4750-8e6d-99ca5ac50902"), "zhrryhlrnynjnlrwv" },
                    { new Guid("8413b47c-2c13-4030-8fc1-ffbb67a944b5"), "qddvwperumrvia" },
                    { new Guid("0edaca5a-502b-46c3-8dd6-217581dd19c9"), "koctzebpzjbalmxxil" },
                    { new Guid("7780f43d-80f9-4a02-97fc-d33dbadbba33"), "wntbpqrnyv" },
                    { new Guid("9b902fd0-94f1-4c9f-93e5-5822d8eb4c56"), "rehxhgtwvrodbionyyxv" },
                    { new Guid("acd01ded-1f49-420d-bf68-7757e280df1f"), "acdpbdkwnvdpv" },
                    { new Guid("d9449dd2-dc98-4905-a9a5-d76eae31acf1"), "hswkzeehycybth" },
                    { new Guid("b5938fc1-55c9-4658-8916-bd97a0841609"), "odsrzkudvuzakr" },
                    { new Guid("bd3fb0ba-1d17-4114-aa08-8d76c8ce9bfc"), "tkqjmwhydnjjkynnfn" },
                    { new Guid("fb5b8df7-e93b-477a-9241-da2987244e59"), "wobjtoegsuap" }
                });

            migrationBuilder.UpdateData(
                table: "FileInformations",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000000"),
                column: "SendDate",
                value: new DateTime(2020, 12, 13, 21, 23, 41, 263, DateTimeKind.Local).AddTicks(4232));

            migrationBuilder.CreateIndex(
                name: "IX_Connections_UserId",
                table: "Connections",
                column: "UserId");
        }
    }
}
