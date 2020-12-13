using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SuperMessenger.Migrations
{
    public partial class ChangeMessageFileFileInformationForeignKey : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FileInformations_MessageFiles_MessageFileId",
                table: "FileInformations");

            migrationBuilder.DropIndex(
                name: "IX_FileInformations_MessageFileId",
                table: "FileInformations");

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("022a718b-1ce6-4a13-9865-fbbafdd051ea"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("03172192-c1f7-43a1-bc30-ed0c460f0334"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("034c759b-5911-4927-abad-158afeacbba2"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("037aabbb-963b-4a2d-9be1-ac2945884a1a"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("09381029-ba9a-4373-8e22-480ab32b9408"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("0cb8d11c-164a-4757-b3cf-4cddf609b91a"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("0d929ae5-51f8-45ab-a345-4f5ec709ced2"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("0e1c8f1d-b365-4db1-a720-afc1b50afa91"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("0ec67d77-92a2-49ea-b566-6fe64ccf875d"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("0efa755f-655f-4b2e-9d32-be73d768411e"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("1264ab4b-faac-4f69-9f35-3e054c2433b6"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("1658717b-798b-4baf-bdd4-799cc8777a21"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("1c4bdf51-c700-4ffe-aaf3-2fa4ff6d21aa"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("1d03f10d-01de-45e2-9bbc-88245445cb31"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("1db6eadf-8650-4b8e-a4a9-73c332f14172"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("2430df14-778c-4606-accd-7fa12497b5e7"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("2a40bb46-931b-406a-ae33-f3c63e56d0d5"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("2c268d69-2f27-4132-bd92-972d6da16200"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("2edb50ae-a6db-4544-be18-f9ae0a2bf0c3"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("2fd94cb4-fcd0-4124-bc54-5a1d8bdb6516"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("3292d12d-c90a-46bb-a0e3-84a29b10e83b"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("33945806-9cd0-4567-a895-a515859afbc9"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("34ee2d28-c6e9-41c1-8cd0-d8242095b7ff"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("3749f51b-2681-4522-9ae1-ff0ec5f24c42"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("37ea5a00-bdc9-46fb-a03f-ea02c5b289d6"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("3c70065f-0608-41a9-bfa6-8d51a977e5ae"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("3f1e28dc-51eb-44e7-8df4-0882f7ef7985"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("440c3446-8170-45f0-87c0-4933b88cbc2a"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("449f3960-6372-449f-aa3b-062b82e215fe"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("469306b1-ea6e-4504-a512-3b22bb9ce3e7"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("47267742-2b96-4146-92ed-e6f71ca5aae7"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("47a22f28-1abf-499d-87ab-35a7d58242c8"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("4adf318c-236f-45e0-a354-8abcfd80508f"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("4bbca238-5131-4387-a888-1d79af0ba95f"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("4bc177b7-d5ac-420f-8906-c9efe6df4b9d"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("4f284b11-9975-41c2-87af-22c7b9fa5e4d"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("509c82fe-c864-4bb0-91f7-1e36b2ade42d"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("55c976cb-cbe2-4cda-86e8-1c13e3efd8c7"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("5a520bb1-9324-4cd3-91ac-76f4762784a9"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("620214f2-6c69-48dd-8ded-dca2645eb499"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("6358af92-e335-4457-b1ad-b415f4aca0ab"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("65c6bb46-49ac-4f78-a30b-35fbf6d65f1c"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("669be484-fb32-415a-b51f-366b4de058de"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("674807ba-14c2-4f0e-a6d8-f67a3b171d91"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("676e5b26-3191-4e6b-8a79-518b06b689ac"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("684f49f1-97bd-4af7-b3a6-6c3a1d534d25"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("694f5fb0-9925-4860-8297-447b1ea76979"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("6e45ef48-375e-4d32-8a0e-bef717c907ca"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("73b6b2f8-90b3-4575-986d-8845615022a8"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("76067476-40b1-404a-9c17-07e020020d2d"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("7807796e-eed8-477b-bc5c-ef51c34ff11a"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("7f28e042-5e06-4035-ac47-da5c70aa595d"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("80a4652c-c256-48be-b3e7-b4bb58b5f9fc"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("824a4d8b-5995-43ab-9c6b-c9220f77b319"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("86d635cc-51d9-4cf0-9bdc-f8b3349fed57"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("87cf713c-79c4-4513-b461-f058903b29ee"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("8fd099d6-b86b-413c-875d-d6253881d2f4"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("923ec13e-bb5d-4f0c-87a0-c5bf62dcb6bb"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("93763b87-cc6b-4f6c-bc90-7a811d9c8b86"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("95afe103-537b-45bd-93fc-70d4a57615e9"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("95c296e1-0e4b-45e9-b98c-fe3cf41fed86"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("975ea7c6-d680-4578-a39b-45d059d9cbb2"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("9b02ad07-6e45-4b61-bcb3-4284d47e2122"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("9c8fbc38-be8e-4e9b-8809-6cb9437a1658"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("a1dfd0e4-af35-4c92-901e-5b8f3f12dd79"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("a76066f5-2207-49ef-a610-fc63c68e8f19"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("ab7031eb-87c3-4bf5-b0da-199a6562248a"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("af4b5b7b-7e67-4099-879b-af0d45072bf1"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("b0002faa-0630-446d-9330-c47e31b2f198"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("b0fbb614-e5d9-4432-a85a-dd66b1f13a41"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("b3e42672-056b-4b10-a098-90a032560fe9"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("b3f60a68-8ab4-41a6-bb02-905625e5a024"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("b5c95e22-10d2-4b84-8a05-df0dab692466"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("b5dc3938-8179-4d28-8ce7-5731ad7836a4"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("c20592a6-0a57-4df5-8afd-2825d4611f18"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("c231bfbf-156e-40a5-a398-55160a5b18e5"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("c5546e6f-d4df-407f-8cf2-1c27a63fd824"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("c91ca441-b9fc-466f-93f2-a0d9fef4e76a"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("caf7d6e3-f846-479d-8776-e246563a418f"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("cd26e2ba-4518-46c9-b862-6b9f8404d5b9"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("d102bb60-0193-40f9-89e1-e48357c99657"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("d2ce17bf-da9c-452f-89cc-e85bd1358905"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("d411288b-de45-4960-9f62-1f9055074bff"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("d5564ba9-2572-4ea6-9772-b2b6186c305a"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("d66a7ad3-19b4-4b23-a82d-1dbd22c03296"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("d7a10649-e4b0-465c-9d49-9aba188b809c"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("d9eedd5c-adde-4fd1-9331-d9f8cff65993"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("da10a082-76f7-4909-9179-2f3876212dc2"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("dabcb0b6-f560-4517-8b32-6e584cf35638"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("db46f258-7c48-4ca8-9792-75d60587548f"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("de7b0cf5-3c90-4cac-b3f8-2c049d059535"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("e07afdc9-9b57-4e7e-9207-6d33685fc439"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("e0972cc2-138f-4f34-8244-b3ce63ebefde"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("e5a3402c-dd7d-43b5-96af-bc90cc405552"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("f0dd5f34-3832-44e8-b42b-be9d06e8a9d2"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("f36b01e9-9db6-4983-92bd-29abd4eb16bc"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("f46d550f-d904-4dd9-ad39-582f4f7f376e"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("fcdab5cc-5342-4f20-b001-158ea2644795"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("fec0009f-c156-4ee9-b87a-83ec0aed64bb"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("ff23a007-4957-4711-a10f-b02d5a32d52b"));

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
                name: "IX_MessageFiles_FileInformationId",
                table: "MessageFiles",
                column: "FileInformationId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_MessageFiles_FileInformations_FileInformationId",
                table: "MessageFiles",
                column: "FileInformationId",
                principalTable: "FileInformations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MessageFiles_FileInformations_FileInformationId",
                table: "MessageFiles");

            migrationBuilder.DropIndex(
                name: "IX_MessageFiles_FileInformationId",
                table: "MessageFiles");

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
                    { new Guid("674807ba-14c2-4f0e-a6d8-f67a3b171d91"), "lehgscrxphwfhx" },
                    { new Guid("d411288b-de45-4960-9f62-1f9055074bff"), "mvotmcsjnvuwo" },
                    { new Guid("a1dfd0e4-af35-4c92-901e-5b8f3f12dd79"), "yinxpvpychmtk" },
                    { new Guid("b0fbb614-e5d9-4432-a85a-dd66b1f13a41"), "odwqpshqchmztyi" },
                    { new Guid("e5a3402c-dd7d-43b5-96af-bc90cc405552"), "ujsgyfddnlyrtrpr" },
                    { new Guid("824a4d8b-5995-43ab-9c6b-c9220f77b319"), "xvixvomecwuuot" },
                    { new Guid("509c82fe-c864-4bb0-91f7-1e36b2ade42d"), "ilcenzylrvxxm" },
                    { new Guid("ab7031eb-87c3-4bf5-b0da-199a6562248a"), "xaaacuhgrxm" },
                    { new Guid("4adf318c-236f-45e0-a354-8abcfd80508f"), "aywslkahhps" },
                    { new Guid("1db6eadf-8650-4b8e-a4a9-73c332f14172"), "fogidwmfkmjsku" },
                    { new Guid("e07afdc9-9b57-4e7e-9207-6d33685fc439"), "ytbfqwjdgrklk" },
                    { new Guid("0d929ae5-51f8-45ab-a345-4f5ec709ced2"), "xywfwqzmvld" },
                    { new Guid("6e45ef48-375e-4d32-8a0e-bef717c907ca"), "mbjceahrdixqba" },
                    { new Guid("47267742-2b96-4146-92ed-e6f71ca5aae7"), "krxwpvruajxlkneg" },
                    { new Guid("d2ce17bf-da9c-452f-89cc-e85bd1358905"), "qgcmwucyocxodecc" },
                    { new Guid("3292d12d-c90a-46bb-a0e3-84a29b10e83b"), "vhgwowocibcvi" },
                    { new Guid("2430df14-778c-4606-accd-7fa12497b5e7"), "xhzawkyppuefrvidq" },
                    { new Guid("7807796e-eed8-477b-bc5c-ef51c34ff11a"), "adhhtrxitkdshmasa" },
                    { new Guid("676e5b26-3191-4e6b-8a79-518b06b689ac"), "zcyinchaeisbqfcq" },
                    { new Guid("0cb8d11c-164a-4757-b3cf-4cddf609b91a"), "rhywexydvlwcrymvtjo" },
                    { new Guid("0efa755f-655f-4b2e-9d32-be73d768411e"), "qgicqesvbwnvkplhlv" },
                    { new Guid("b0002faa-0630-446d-9330-c47e31b2f198"), "vpaddumencwmawfm" },
                    { new Guid("73b6b2f8-90b3-4575-986d-8845615022a8"), "ylepcuxfmygrqsqznu" },
                    { new Guid("d102bb60-0193-40f9-89e1-e48357c99657"), "xquyjnjwlwfpakhc" },
                    { new Guid("a76066f5-2207-49ef-a610-fc63c68e8f19"), "lbmvlqzixlimx" },
                    { new Guid("4bbca238-5131-4387-a888-1d79af0ba95f"), "wmvpvhyeeo" },
                    { new Guid("b5c95e22-10d2-4b84-8a05-df0dab692466"), "pckwgrzqhxnuge" },
                    { new Guid("0e1c8f1d-b365-4db1-a720-afc1b50afa91"), "nmsydxkehlba" },
                    { new Guid("fec0009f-c156-4ee9-b87a-83ec0aed64bb"), "ifcpodmoqusdwrqq" },
                    { new Guid("022a718b-1ce6-4a13-9865-fbbafdd051ea"), "hojypxgzxxbhz" },
                    { new Guid("684f49f1-97bd-4af7-b3a6-6c3a1d534d25"), "mstixhbzgzified" },
                    { new Guid("034c759b-5911-4927-abad-158afeacbba2"), "nxbgvckmqmmzsq" },
                    { new Guid("c91ca441-b9fc-466f-93f2-a0d9fef4e76a"), "rxdlyhyqhdj" },
                    { new Guid("469306b1-ea6e-4504-a512-3b22bb9ce3e7"), "ikjnjthxgcqqrxjq" },
                    { new Guid("3f1e28dc-51eb-44e7-8df4-0882f7ef7985"), "ecodteicxry" },
                    { new Guid("c5546e6f-d4df-407f-8cf2-1c27a63fd824"), "rypjgenllxqmh" },
                    { new Guid("2edb50ae-a6db-4544-be18-f9ae0a2bf0c3"), "mkvsrwegtnpvguzxfp" },
                    { new Guid("2a40bb46-931b-406a-ae33-f3c63e56d0d5"), "jjwngpbcnjmbcbnui" },
                    { new Guid("65c6bb46-49ac-4f78-a30b-35fbf6d65f1c"), "xgocjlpkpbq" },
                    { new Guid("1264ab4b-faac-4f69-9f35-3e054c2433b6"), "efdnixsmahghrnztmo" },
                    { new Guid("037aabbb-963b-4a2d-9be1-ac2945884a1a"), "enbviouscyhwtxbel" },
                    { new Guid("8fd099d6-b86b-413c-875d-d6253881d2f4"), "wqwsgrlzwxdovtsrvovi" },
                    { new Guid("2c268d69-2f27-4132-bd92-972d6da16200"), "cldjzllftgafxyy" },
                    { new Guid("1658717b-798b-4baf-bdd4-799cc8777a21"), "xzojuieipick" },
                    { new Guid("d5564ba9-2572-4ea6-9772-b2b6186c305a"), "jdiblxtsqulaba" },
                    { new Guid("694f5fb0-9925-4860-8297-447b1ea76979"), "iodokjfxpluuzou" },
                    { new Guid("440c3446-8170-45f0-87c0-4933b88cbc2a"), "hionyjibobuer" },
                    { new Guid("5a520bb1-9324-4cd3-91ac-76f4762784a9"), "ckqrclknrtjicy" },
                    { new Guid("af4b5b7b-7e67-4099-879b-af0d45072bf1"), "jkjohwoapts" },
                    { new Guid("975ea7c6-d680-4578-a39b-45d059d9cbb2"), "hqlxvszlksjo" },
                    { new Guid("b5dc3938-8179-4d28-8ce7-5731ad7836a4"), "ehbkryztifsd" },
                    { new Guid("7f28e042-5e06-4035-ac47-da5c70aa595d"), "aqtuyanotfaou" },
                    { new Guid("dabcb0b6-f560-4517-8b32-6e584cf35638"), "glvlraqwbdovjofs" },
                    { new Guid("80a4652c-c256-48be-b3e7-b4bb58b5f9fc"), "kzilkatkgvmb" },
                    { new Guid("3749f51b-2681-4522-9ae1-ff0ec5f24c42"), "wmdbmwrhrzlxom" },
                    { new Guid("b3e42672-056b-4b10-a098-90a032560fe9"), "oesprxjkjfuangjc" },
                    { new Guid("c20592a6-0a57-4df5-8afd-2825d4611f18"), "swoqkyhukty" },
                    { new Guid("620214f2-6c69-48dd-8ded-dca2645eb499"), "tqduqioypyaxf" },
                    { new Guid("4f284b11-9975-41c2-87af-22c7b9fa5e4d"), "arlutmifwcnrumydc" },
                    { new Guid("1c4bdf51-c700-4ffe-aaf3-2fa4ff6d21aa"), "htluokteiwywuyxc" },
                    { new Guid("da10a082-76f7-4909-9179-2f3876212dc2"), "uuhkxlnbebdf" },
                    { new Guid("55c976cb-cbe2-4cda-86e8-1c13e3efd8c7"), "nykwaqnydadw" },
                    { new Guid("33945806-9cd0-4567-a895-a515859afbc9"), "vzyjmzkwpxpmfytfylu" },
                    { new Guid("47a22f28-1abf-499d-87ab-35a7d58242c8"), "zgtnbqwbije" },
                    { new Guid("923ec13e-bb5d-4f0c-87a0-c5bf62dcb6bb"), "cnmngenkesyyzehuwvh" },
                    { new Guid("0ec67d77-92a2-49ea-b566-6fe64ccf875d"), "mhkrhaxudeetxdpi" },
                    { new Guid("669be484-fb32-415a-b51f-366b4de058de"), "wbtyxgzhgqubwcoug" },
                    { new Guid("37ea5a00-bdc9-46fb-a03f-ea02c5b289d6"), "buokvyyjijirjv" },
                    { new Guid("db46f258-7c48-4ca8-9792-75d60587548f"), "cfoemkuvuxjoiar" },
                    { new Guid("76067476-40b1-404a-9c17-07e020020d2d"), "mcxcymuaagyekkfw" },
                    { new Guid("e0972cc2-138f-4f34-8244-b3ce63ebefde"), "wmruouvywiako" },
                    { new Guid("2fd94cb4-fcd0-4124-bc54-5a1d8bdb6516"), "pblejkcrlmnvqf" },
                    { new Guid("6358af92-e335-4457-b1ad-b415f4aca0ab"), "fzpjvwkithkcc" },
                    { new Guid("95afe103-537b-45bd-93fc-70d4a57615e9"), "hvzohggndkeoyn" },
                    { new Guid("3c70065f-0608-41a9-bfa6-8d51a977e5ae"), "rjaguskrdr" },
                    { new Guid("caf7d6e3-f846-479d-8776-e246563a418f"), "chrncbvzmgwiipinb" },
                    { new Guid("cd26e2ba-4518-46c9-b862-6b9f8404d5b9"), "wpydtdrqwttoxrifu" },
                    { new Guid("03172192-c1f7-43a1-bc30-ed0c460f0334"), "lvphryqpzcczhi" },
                    { new Guid("9b02ad07-6e45-4b61-bcb3-4284d47e2122"), "raotxtekeoacmdptdep" },
                    { new Guid("09381029-ba9a-4373-8e22-480ab32b9408"), "uhewqtlqrdqbt" },
                    { new Guid("86d635cc-51d9-4cf0-9bdc-f8b3349fed57"), "zysajbwrwhpp" },
                    { new Guid("de7b0cf5-3c90-4cac-b3f8-2c049d059535"), "oknexbfuufihljvybfxz" },
                    { new Guid("f46d550f-d904-4dd9-ad39-582f4f7f376e"), "xgveuimvaevszh" },
                    { new Guid("ff23a007-4957-4711-a10f-b02d5a32d52b"), "gsbuahkibxs" },
                    { new Guid("9c8fbc38-be8e-4e9b-8809-6cb9437a1658"), "dalocwgehaxrpvvffm" },
                    { new Guid("449f3960-6372-449f-aa3b-062b82e215fe"), "mzjspnpdazgyutdo" },
                    { new Guid("b3f60a68-8ab4-41a6-bb02-905625e5a024"), "dhabjpcuqwvqcf" },
                    { new Guid("d66a7ad3-19b4-4b23-a82d-1dbd22c03296"), "rlotjacumihrx" },
                    { new Guid("4bc177b7-d5ac-420f-8906-c9efe6df4b9d"), "fflzoloylh" },
                    { new Guid("95c296e1-0e4b-45e9-b98c-fe3cf41fed86"), "masiilylkmwebx" },
                    { new Guid("1d03f10d-01de-45e2-9bbc-88245445cb31"), "xjivrcfkxdff" },
                    { new Guid("f36b01e9-9db6-4983-92bd-29abd4eb16bc"), "irtsafudywyfrepgkskj" },
                    { new Guid("93763b87-cc6b-4f6c-bc90-7a811d9c8b86"), "bkbbdfmayfha" },
                    { new Guid("d9eedd5c-adde-4fd1-9331-d9f8cff65993"), "heswnymgxlgudvbluos" },
                    { new Guid("f0dd5f34-3832-44e8-b42b-be9d06e8a9d2"), "dtqqgsabvwuxcuzgie" },
                    { new Guid("c231bfbf-156e-40a5-a398-55160a5b18e5"), "wuonifyoxtumci" },
                    { new Guid("87cf713c-79c4-4513-b461-f058903b29ee"), "fefrlgxrcszspeqfmozxpg" },
                    { new Guid("d7a10649-e4b0-465c-9d49-9aba188b809c"), "jluptdcgsxxebe" },
                    { new Guid("fcdab5cc-5342-4f20-b001-158ea2644795"), "wwoqbfedkeard" },
                    { new Guid("34ee2d28-c6e9-41c1-8cd0-d8242095b7ff"), "hhpuvfreypazyh" }
                });

            migrationBuilder.UpdateData(
                table: "FileInformations",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000000"),
                column: "SendDate",
                value: new DateTime(2020, 12, 12, 19, 56, 57, 246, DateTimeKind.Local).AddTicks(1218));

            migrationBuilder.CreateIndex(
                name: "IX_FileInformations_MessageFileId",
                table: "FileInformations",
                column: "MessageFileId",
                unique: true,
                filter: "[MessageFileId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_FileInformations_MessageFiles_MessageFileId",
                table: "FileInformations",
                column: "MessageFileId",
                principalTable: "MessageFiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
