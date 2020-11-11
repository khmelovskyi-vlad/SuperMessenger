using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SuperMessenger.Migrations
{
    public partial class FixSentFileAndMessageKeys : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Applications_AspNetUsers_UserId",
                table: "Applications");

            migrationBuilder.DropForeignKey(
                name: "FK_SentFiles_AspNetUsers_UserId",
                table: "SentFiles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SentFiles",
                table: "SentFiles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Messages",
                table: "Messages");

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("0294acea-939f-4374-9688-83b7f6575c69"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("070b3b25-9adc-4e61-a32f-3447cc9e8c67"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("097b83a5-9891-4e33-b14d-e6867958329d"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("0de89b35-4ac1-4acf-b4b0-a4a7f328d2f1"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("0f25bb76-9c63-46d6-8adc-1863fc6e09aa"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("14e15020-8ab1-4284-9b22-c65d50badc87"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("14f312f2-452c-4cef-96d4-2359e46e57cb"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("16013ff8-f42e-419a-aa94-2c890cf2372e"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("167c5020-eebe-425a-8fb7-24de12cc954d"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("1779383e-4e24-431e-b87f-9a05f17bdddb"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("179b83b8-6f68-4c87-97dd-8b45d8d87952"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("18ab75cc-d4f8-4b85-9b2a-d4ecd33dcbf3"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("19784330-adc5-4bee-ac94-2a2175286d08"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("1a909083-cccf-47b8-a077-1acc97997bde"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("1b4d7b55-8677-463f-80b7-8f8fab5acadd"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("207fa4c9-b6e5-42e2-b450-5bb745a78c6e"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("2086247c-bb78-4644-9270-2d5589ee67f2"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("23d1b6f8-d7f5-4a6d-96e5-e5c530c5f8fc"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("254684c9-a540-47b8-ad1c-ecf6b4e20067"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("2bd22832-f40c-4557-8b01-11aa92774c8a"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("309d4a3a-f7d4-4d5d-a16f-4c5e416a5942"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("31c3cc9e-fcfd-4051-b7a2-0ef62e6e6dde"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("358b5ee9-4ccb-44fb-b8de-9924d66199ab"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("3dfb3b5d-8ed8-418a-be51-d67ac3667c7e"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("44a068ac-8aee-4d83-8467-99b66797f172"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("4581e5b2-d2a9-4b02-9060-9299470e9dbb"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("4663d098-8120-4f53-9062-77fb45844119"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("49d560b3-eab9-4778-a887-3c3e23f296d9"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("4a7fa47c-29cc-4a67-b025-a70438bc4d70"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("4d0a5a35-b319-44c0-9709-152b09c76265"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("4dfee626-fbc8-4d01-95cb-0b611e3005fe"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("4e08c438-6645-4193-aca4-e1be51cd06d3"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("51b7cb41-0fee-49db-9b1c-5552ec6d4f79"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("53722c9c-b193-45f5-ba4f-765240c720e7"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("5af7d5b6-6919-4b8d-8547-c6c4bdba0757"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("5b8b6100-f7eb-4c91-9dac-bffc704e635d"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("601de194-f3a3-4962-9511-894eb0a09d51"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("6135a66f-d4fb-4510-9330-96b4437c6908"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("617104bf-67e6-4e2a-a70d-f0f7a2a982db"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("61e33bcb-266b-44fd-a6ab-c18384811434"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("656ce00f-2865-485f-bf77-0971a1b45be6"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("66942b5b-8b90-4711-acb0-bfbc87c7b2a0"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("6c4ae38c-a052-4e11-bd7f-37790a4ee180"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("6e57145c-dc4a-4fb4-aca3-c956062dbb29"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("6e9fc326-2c99-4cb3-a97d-49695a1b9386"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("7bc4d90e-2b86-4243-aaec-6679279f9c8b"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("7d9558be-b922-4b9d-b983-5d235421a8aa"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("7e326017-6937-4e4f-975a-b171b8e0ccf9"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("7e8643b5-f662-4c41-9d88-0364856e9a46"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("7f49db09-8540-44f6-a769-258099c122e5"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("811776d4-6ed0-4d13-a1fa-4813e89c5c0b"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("8a487ce7-f9c1-4cd6-8cba-1cbe84e142e6"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("8baf9240-2d55-4c17-af5b-62926512f75b"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("8fdf7274-3ec0-48e7-a290-d408037bb5b7"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("90467dc2-14bf-4e66-81f4-65b94f3ef6fb"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("90b2b23b-7714-476a-ada4-38defad6112f"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("9155d257-8b06-40b1-ba8f-a672ef7636f5"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("93604537-f5e9-4737-9e06-dfcd97d5ea76"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("9364a250-0a85-404d-98f2-bc1f8af92d1b"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("94883d6d-ad01-4c25-91ac-939fb82c84fc"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("9763d4a7-ebc9-45f2-a1c2-fcd47ffb5fbb"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("9c6c16f1-74e8-4a3b-8d1c-1fd9fbab3450"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("9cb2640e-d390-4744-a86c-28e5bf6a3944"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("a448a4df-29af-4fbc-98b0-320e5ce7c5e0"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("a4f13340-dabe-48f6-8db3-9cdd86a9ef53"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("a6a66f55-4aab-499f-88d8-c0a6f253683d"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("a6e9ae28-a99f-4dab-b535-3f078280532f"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("a7f4acaa-70a0-4f35-ae1f-dd0679811456"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("a9af0b3d-fbe7-408b-9dd9-0797e8145f39"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("ade69ead-4cea-4665-80b1-978fe2381b8e"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("ae96e958-e5d3-47c1-9fdf-cfad9f6ef83b"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("b405d069-c7f4-466a-9810-77f375261640"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("b63673ef-7e16-495c-ad5d-3a66c299a9cd"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("b7e599a2-d60f-4907-a964-8b37a2f80f0d"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("b886e2c1-cfe2-4436-b37c-59c4f1b74641"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("ba754f2d-7436-44b2-b910-d890a264d2da"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("bd0d89bb-9ec9-4215-8900-bd958aac5485"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("c06d4880-b826-4c78-b6bf-f9c6ed2af73e"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("c2c7db54-d7a0-4bf0-a82a-45a3922ecb5a"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("c444722d-aa5c-4419-a4a9-331ddff1dac7"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("c5435f8f-9911-4619-9ab3-e6e1055e31b3"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("cf6aa2f7-ab37-4f14-82de-2d1dab714355"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("cfa50a51-4a2d-4b08-a56c-ca8a91085664"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("d2c32e27-2c86-40b5-a744-eed48640f5ca"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("d89fe5ab-9a01-42ac-9f90-be48853b4757"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("d9012a0a-8741-4df7-a42d-bb8d0871ea30"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("d94465b6-a004-4171-b872-50d133f8dcff"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("db66512c-b2ff-4f69-870f-ee3a1bd96df3"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("de691b7d-32c6-4971-b7a5-77746c73ded2"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("e1d10742-4089-49cf-9fb6-15fa3ba36427"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("e2d4d396-b0b4-47c8-9888-86f3ee4cbd14"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("e89dc916-f6ba-418e-9e0f-b3f05292abc3"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("ebd9654f-336e-4dff-b24f-3cfd99759217"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("ecfaaf8b-1f3a-41fb-8746-0a7c57ed1fa7"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("ecfd39a0-5b48-481f-b5c6-024c130bddd9"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("ee686e20-0906-4b54-8cfb-88fb7e1ffdc3"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("f264e611-b563-49d6-8df6-44992011e7a7"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("f7f7a880-4351-4129-b3cc-e9049f93aa98"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("fca80b0c-3d7e-47e4-9da5-6c95dfcdc0fc"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("fede565c-6970-4d6c-b8b1-cf20af899550"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_SentFiles",
                table: "SentFiles",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Messages",
                table: "Messages",
                column: "Id");

            migrationBuilder.InsertData(
                table: "Countries",
                columns: new[] { "Id", "Value" },
                values: new object[,]
                {
                    { new Guid("0b4b3669-6089-4e8d-95dc-5226eab52a65"), "ywlcmyqgjcudso" },
                    { new Guid("8e2d39b8-03da-4db7-82fa-0ddda297b5a5"), "caftrryhdupgnn" },
                    { new Guid("9412d272-f19d-4a4f-a68f-5496c3fcbeb1"), "aucsmaswvrxb" },
                    { new Guid("63547038-fb1d-4fbb-bbc3-5a206ef0bdba"), "jxfvwqetqbzasqx" },
                    { new Guid("5c4a980d-8a25-4a0d-b706-90cdcc7435f2"), "bkczcwzkilwjo" },
                    { new Guid("1931ba50-2e23-4123-8655-3b983c73a91d"), "cwsuwooryoff" },
                    { new Guid("0c238155-1e0c-4089-9e21-c7df142f2f5d"), "hltqiclmkoekwmzrkzy" },
                    { new Guid("6a7dfaf7-9b01-4b67-ba07-920d44a1387d"), "xkllmkgjxcqorlir" },
                    { new Guid("a7269b32-0148-4684-808a-282f89bfe4f8"), "wnsxepzkgmfeihdk" },
                    { new Guid("bdb6443e-af20-4116-b8dd-d62128f8fac4"), "unzzchsoajatoej" },
                    { new Guid("2f284c26-7e57-4544-b961-6e71e021861e"), "itbhxkidqbmr" },
                    { new Guid("8cb80bcf-f17c-4567-811c-7c0ecc619586"), "tmxxtnhgvjmr" },
                    { new Guid("09f55dae-8b31-4ab0-9d30-ef4a67565777"), "jkzeommmrewgqw" },
                    { new Guid("00a4f9dd-b5da-4818-99dc-04b9b09be168"), "tqsenffuovotf" },
                    { new Guid("97737fde-7a6d-489f-91bc-22ab5c2bc27b"), "socidsschosqnd" },
                    { new Guid("c2a773aa-1024-43cf-9e6a-c2df1e7f483b"), "osjuvlnatankon" },
                    { new Guid("9ed681f0-5c6f-461d-bbc6-eabccf99cb26"), "xrshkqnerslzlvpwho" },
                    { new Guid("71fddf0b-cf1b-444a-8d02-1dcdea5a4f4f"), "fgrhkeunlphqocspzw" },
                    { new Guid("ed9a1c29-beec-43dc-a630-91f2389c5639"), "sbcokefqtnoq" },
                    { new Guid("ed61b58b-3ad9-4804-8b69-869ebf9e793d"), "egfrzzxujjpslmk" },
                    { new Guid("3f50e506-e226-4cec-85b0-e4352ed339ec"), "rlkinnprpedsm" },
                    { new Guid("0534a77f-d2a7-40ab-970a-f2eb146d5898"), "jdhjzuhhhdquz" },
                    { new Guid("9b7a0b20-0152-45a8-ba30-86f6115ccdf5"), "uakegzxawnuxaueln" },
                    { new Guid("bcd9bcb9-0243-419c-975d-0c886e0234b5"), "nwkjvfsvzpqh" },
                    { new Guid("ea26252e-a47b-4591-9c3e-1f30a200bd7f"), "cppfishrxwautkiht" },
                    { new Guid("ae91b025-b388-4926-ade7-e0790779193d"), "kbcaktahchsnnh" },
                    { new Guid("592617d6-c46c-406a-b7ad-2bfc3705dc4d"), "tzfsbnwjhmgjt" },
                    { new Guid("cd2475b2-e934-4d56-9254-06c6fb9662a8"), "cvqhwgyemtsxlnunus" },
                    { new Guid("1697da2d-854b-4a1e-83e0-004d10aab9a7"), "kthzulmxwijowe" },
                    { new Guid("7173a404-7c89-43f0-91aa-7b8f8ca7169a"), "uizepgmsomenxumy" },
                    { new Guid("f4341425-3087-4111-9b35-af2627467f82"), "lerwpqwrhnwnb" },
                    { new Guid("aa2ddd1b-d927-49c0-b2f0-976dc0956b57"), "mqgicayyhsmnxth" },
                    { new Guid("8796e25c-df23-4acb-b3e8-69be07865ab5"), "wkjioitnloclibjesps" },
                    { new Guid("32845359-b2bb-44e5-a7bb-8b6869bdb40b"), "wozxldcxgkaklw" },
                    { new Guid("27e25b07-6ead-481a-a9e7-20fcb941642f"), "vkryxkmxgdhydvc" },
                    { new Guid("4508d81b-6104-4e60-869c-77f9be154825"), "fxxeawkbbyy" },
                    { new Guid("69444db1-c923-42cc-b190-c2cbcde5a744"), "jbxivjsnsjphysrz" },
                    { new Guid("f396b82e-51d5-4c8d-9d39-42070b0b5839"), "ogikbjtdllsdjyo" },
                    { new Guid("cb3adb03-ea80-44e4-970e-95ef3fbe4d95"), "xrxhhvjqsi" },
                    { new Guid("bf9a4e6d-58c3-4457-813a-5b323de7b357"), "dqeegnaxkbbxs" },
                    { new Guid("27078bb0-5d25-49e4-bbbc-e88caad0bb41"), "hgklovzggefrdesblrj" },
                    { new Guid("6fb10313-dd31-4da8-b3c7-3fe67e8e8c07"), "qtnvpyqwkqqscux" },
                    { new Guid("549d895d-c36e-4974-841b-4a1139151119"), "vfwgprkbayhyqqn" },
                    { new Guid("26931c68-921d-40ed-bb1e-cfc06d615895"), "ckxoobvffkm" },
                    { new Guid("5bf63e95-da9d-408d-8d5e-6357d4b13bf8"), "domebvugeok" },
                    { new Guid("b2f4417e-8118-4000-9a0a-25a2d1f1cdfe"), "bxmspfyxxxbfwpmbv" },
                    { new Guid("52f4a6f0-6766-4bde-acda-77081ab5139f"), "kjkxbrnawnzqwa" },
                    { new Guid("132821a7-42dc-4e1f-90f7-fd7ebcb5034a"), "oigwkzogsmnwisnyd" },
                    { new Guid("a5f5d240-f959-4c19-a7bf-7d8157868296"), "usrmfasregdg" },
                    { new Guid("477b7286-4e50-45b8-b461-ccc659bc98ff"), "uqcliejbuok" },
                    { new Guid("ebb2566c-5369-4b35-b377-540dd7988e7d"), "inyyjwlkcvpczdsjoqy" },
                    { new Guid("01c9d714-960a-4750-aecd-d2b2c994f0d2"), "ggbxitjjpabdfzysor" },
                    { new Guid("83a79319-2ddd-4688-a572-b21f3b90b4d9"), "lnbnzissxvlpduqemf" },
                    { new Guid("11557529-3e19-415f-84f6-6076a54ad779"), "phuqgeurgmoqcowzm" },
                    { new Guid("9b4c400b-b70b-42da-b75f-b89c53d27585"), "gphxetqfsjsizcsmc" },
                    { new Guid("935b15ea-2939-4de8-a790-a9a9de6476ec"), "kxvcmqwjisnvhf" },
                    { new Guid("770339ba-d2c1-4045-863d-9db5eaf17256"), "kjcadycxelxezdzxar" },
                    { new Guid("7d156ba7-2217-4129-837d-5c80a95887dd"), "wieccgqbdexsp" },
                    { new Guid("35a367f2-e025-4019-aaec-3df993794829"), "ifgljdiltzl" },
                    { new Guid("cfbb2194-eee5-4b5f-9fee-ff7b448aeffe"), "etcesokgegatoej" },
                    { new Guid("7ab9388f-0c76-408b-97e5-6a6d0ed0b2ce"), "txcryfbsofmkxh" },
                    { new Guid("9e7bfdcb-e337-419f-9310-fc9028353893"), "yfdoxzzjxytudddl" },
                    { new Guid("3a38e0cb-16e5-47a5-aa8a-608cefd5d56e"), "ahvtydurfdpzaq" },
                    { new Guid("b53f25d4-f8a1-4cb4-b7d5-16219a21a505"), "ntfpbpctyftl" },
                    { new Guid("f240116c-b58a-452a-a645-9d7cab78cbaf"), "sldenhlunbvmnzyif" },
                    { new Guid("0ddd6f27-57a6-4b8f-b63f-3b2d65370fd8"), "slqgkctigdnkdw" },
                    { new Guid("d9865a2e-695c-4b76-8e5b-5cc26960d7f6"), "kzenjrtrufzwcdgc" },
                    { new Guid("06912748-5e51-49cb-8dc1-5de5785c63ef"), "qvvikumsozznau" },
                    { new Guid("9c4ed64b-fb12-460d-9a4b-0358f6346ede"), "zwkawpvtjrpcahnu" },
                    { new Guid("0208f61a-b0cf-4c33-aa19-09846996f277"), "ilephlrrfbzt" },
                    { new Guid("e8e44d3c-9cef-4c60-a517-e353c7f3e50d"), "euiwdziscbcywrvpenvk" },
                    { new Guid("cf7e0609-6d45-4695-8a48-a96bbfc3542a"), "fqhmfspsjbtugvj" },
                    { new Guid("7d8c655c-5a02-422f-949e-ffb651385004"), "rusbexsvityqgm" },
                    { new Guid("00ca87e1-fa2a-47e9-8b67-5d32f78b09cb"), "pkctesgevzrvxxdx" },
                    { new Guid("49e152c7-7ae8-46c4-8e4a-fa42e31e6325"), "dkryyigsopgi" },
                    { new Guid("de5419f8-e3da-430d-a9b4-ce35c9019106"), "fbdmcnppvcvyizux" },
                    { new Guid("6620bc8f-3460-46ec-bfc8-820f33d90f70"), "nozlsegrstpn" },
                    { new Guid("86e3cef9-3052-4aa7-955f-60dc90e5962c"), "nhpggunqudpmduqgg" },
                    { new Guid("7ef2bdc0-1d07-48ad-919b-86c2e05d225a"), "iwokebtqvmp" },
                    { new Guid("7f2e6016-b116-4651-b9e0-8e9c56a6bb0e"), "aqvolnpsqmznidd" },
                    { new Guid("9618745b-ff03-46c6-ac50-9344300e9a1a"), "azdjycixompo" },
                    { new Guid("4a4d3bca-299d-4b5f-a242-140af28c2fd6"), "hcmakxwdhskhx" },
                    { new Guid("1336e0e1-f456-473a-8d1d-29978bed1bf8"), "kprwtmmwyjs" },
                    { new Guid("ebbc89ba-12e6-4236-9e50-f7d217ea891e"), "dfzvxxrafmotgaveyzj" },
                    { new Guid("69776bc5-2053-40f6-983f-8d3ad6b41b7e"), "lcdowfzmgjsa" },
                    { new Guid("c290b8ba-6f5a-42d6-810e-b3cb145bd2e6"), "svftndiqndind" },
                    { new Guid("b2e7328b-affa-40ea-971e-16f9dba6d680"), "ttrmogqmvdazylykby" },
                    { new Guid("f918dcfc-89fd-45e3-b82e-a3f6d90ae58a"), "zmulabdhzsuxpwqh" },
                    { new Guid("c4ac8934-143b-4dfd-9c0c-e002195796ff"), "qxafejerfaftxqos" },
                    { new Guid("e22201ac-e75f-4509-b0ca-1b36c10586ab"), "tzydzsmspgg" },
                    { new Guid("7b798cff-98d6-43a9-8e10-b8cd380f0669"), "fpzmvtsuirnma" },
                    { new Guid("2eb77a22-5b66-4980-a063-b0c3788ae0a0"), "bruwloscsdvyp" },
                    { new Guid("4b8a5e55-95f6-4b7c-8fd4-926acbbea407"), "qlukotnnwvzgf" },
                    { new Guid("62d00ddd-690c-43c3-9b0e-b8a44bb785cc"), "twdwvhkxmazlijv" },
                    { new Guid("915baf75-0682-4685-bccd-b6792751242b"), "xchhrjzdakbazxxdftqrbz" },
                    { new Guid("fcc28f7a-afb7-4575-b7f6-d44f791f5722"), "frsyjqqpnca" },
                    { new Guid("73075cc9-917d-40d9-8b72-17838426d1fc"), "lrdyrozogizis" },
                    { new Guid("191c83e7-dc92-49e4-a29b-aa274051281a"), "zfbkrorilloowpek" },
                    { new Guid("71af3237-a3a5-4499-9d35-44803bb179a8"), "lawiurnlevgasfik" },
                    { new Guid("0ab2a86f-16f6-4195-a3b2-dafd197aca69"), "znrsarjofqhlcckb" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_SentFiles_UserId",
                table: "SentFiles",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_UserId",
                table: "Messages",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Applications_AspNetUsers_UserId",
                table: "Applications",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SentFiles_AspNetUsers_UserId",
                table: "SentFiles",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Applications_AspNetUsers_UserId",
                table: "Applications");

            migrationBuilder.DropForeignKey(
                name: "FK_SentFiles_AspNetUsers_UserId",
                table: "SentFiles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SentFiles",
                table: "SentFiles");

            migrationBuilder.DropIndex(
                name: "IX_SentFiles_UserId",
                table: "SentFiles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Messages",
                table: "Messages");

            migrationBuilder.DropIndex(
                name: "IX_Messages_UserId",
                table: "Messages");

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("00a4f9dd-b5da-4818-99dc-04b9b09be168"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("00ca87e1-fa2a-47e9-8b67-5d32f78b09cb"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("01c9d714-960a-4750-aecd-d2b2c994f0d2"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("0208f61a-b0cf-4c33-aa19-09846996f277"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("0534a77f-d2a7-40ab-970a-f2eb146d5898"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("06912748-5e51-49cb-8dc1-5de5785c63ef"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("09f55dae-8b31-4ab0-9d30-ef4a67565777"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("0ab2a86f-16f6-4195-a3b2-dafd197aca69"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("0b4b3669-6089-4e8d-95dc-5226eab52a65"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("0c238155-1e0c-4089-9e21-c7df142f2f5d"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("0ddd6f27-57a6-4b8f-b63f-3b2d65370fd8"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("11557529-3e19-415f-84f6-6076a54ad779"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("132821a7-42dc-4e1f-90f7-fd7ebcb5034a"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("1336e0e1-f456-473a-8d1d-29978bed1bf8"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("1697da2d-854b-4a1e-83e0-004d10aab9a7"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("191c83e7-dc92-49e4-a29b-aa274051281a"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("1931ba50-2e23-4123-8655-3b983c73a91d"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("26931c68-921d-40ed-bb1e-cfc06d615895"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("27078bb0-5d25-49e4-bbbc-e88caad0bb41"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("27e25b07-6ead-481a-a9e7-20fcb941642f"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("2eb77a22-5b66-4980-a063-b0c3788ae0a0"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("2f284c26-7e57-4544-b961-6e71e021861e"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("32845359-b2bb-44e5-a7bb-8b6869bdb40b"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("35a367f2-e025-4019-aaec-3df993794829"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("3a38e0cb-16e5-47a5-aa8a-608cefd5d56e"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("3f50e506-e226-4cec-85b0-e4352ed339ec"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("4508d81b-6104-4e60-869c-77f9be154825"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("477b7286-4e50-45b8-b461-ccc659bc98ff"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("49e152c7-7ae8-46c4-8e4a-fa42e31e6325"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("4a4d3bca-299d-4b5f-a242-140af28c2fd6"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("4b8a5e55-95f6-4b7c-8fd4-926acbbea407"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("52f4a6f0-6766-4bde-acda-77081ab5139f"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("549d895d-c36e-4974-841b-4a1139151119"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("592617d6-c46c-406a-b7ad-2bfc3705dc4d"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("5bf63e95-da9d-408d-8d5e-6357d4b13bf8"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("5c4a980d-8a25-4a0d-b706-90cdcc7435f2"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("62d00ddd-690c-43c3-9b0e-b8a44bb785cc"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("63547038-fb1d-4fbb-bbc3-5a206ef0bdba"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("6620bc8f-3460-46ec-bfc8-820f33d90f70"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("69444db1-c923-42cc-b190-c2cbcde5a744"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("69776bc5-2053-40f6-983f-8d3ad6b41b7e"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("6a7dfaf7-9b01-4b67-ba07-920d44a1387d"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("6fb10313-dd31-4da8-b3c7-3fe67e8e8c07"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("7173a404-7c89-43f0-91aa-7b8f8ca7169a"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("71af3237-a3a5-4499-9d35-44803bb179a8"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("71fddf0b-cf1b-444a-8d02-1dcdea5a4f4f"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("73075cc9-917d-40d9-8b72-17838426d1fc"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("770339ba-d2c1-4045-863d-9db5eaf17256"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("7ab9388f-0c76-408b-97e5-6a6d0ed0b2ce"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("7b798cff-98d6-43a9-8e10-b8cd380f0669"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("7d156ba7-2217-4129-837d-5c80a95887dd"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("7d8c655c-5a02-422f-949e-ffb651385004"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("7ef2bdc0-1d07-48ad-919b-86c2e05d225a"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("7f2e6016-b116-4651-b9e0-8e9c56a6bb0e"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("83a79319-2ddd-4688-a572-b21f3b90b4d9"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("86e3cef9-3052-4aa7-955f-60dc90e5962c"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("8796e25c-df23-4acb-b3e8-69be07865ab5"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("8cb80bcf-f17c-4567-811c-7c0ecc619586"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("8e2d39b8-03da-4db7-82fa-0ddda297b5a5"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("915baf75-0682-4685-bccd-b6792751242b"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("935b15ea-2939-4de8-a790-a9a9de6476ec"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("9412d272-f19d-4a4f-a68f-5496c3fcbeb1"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("9618745b-ff03-46c6-ac50-9344300e9a1a"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("97737fde-7a6d-489f-91bc-22ab5c2bc27b"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("9b4c400b-b70b-42da-b75f-b89c53d27585"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("9b7a0b20-0152-45a8-ba30-86f6115ccdf5"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("9c4ed64b-fb12-460d-9a4b-0358f6346ede"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("9e7bfdcb-e337-419f-9310-fc9028353893"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("9ed681f0-5c6f-461d-bbc6-eabccf99cb26"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("a5f5d240-f959-4c19-a7bf-7d8157868296"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("a7269b32-0148-4684-808a-282f89bfe4f8"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("aa2ddd1b-d927-49c0-b2f0-976dc0956b57"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("ae91b025-b388-4926-ade7-e0790779193d"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("b2e7328b-affa-40ea-971e-16f9dba6d680"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("b2f4417e-8118-4000-9a0a-25a2d1f1cdfe"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("b53f25d4-f8a1-4cb4-b7d5-16219a21a505"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("bcd9bcb9-0243-419c-975d-0c886e0234b5"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("bdb6443e-af20-4116-b8dd-d62128f8fac4"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("bf9a4e6d-58c3-4457-813a-5b323de7b357"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("c290b8ba-6f5a-42d6-810e-b3cb145bd2e6"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("c2a773aa-1024-43cf-9e6a-c2df1e7f483b"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("c4ac8934-143b-4dfd-9c0c-e002195796ff"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("cb3adb03-ea80-44e4-970e-95ef3fbe4d95"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("cd2475b2-e934-4d56-9254-06c6fb9662a8"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("cf7e0609-6d45-4695-8a48-a96bbfc3542a"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("cfbb2194-eee5-4b5f-9fee-ff7b448aeffe"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("d9865a2e-695c-4b76-8e5b-5cc26960d7f6"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("de5419f8-e3da-430d-a9b4-ce35c9019106"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("e22201ac-e75f-4509-b0ca-1b36c10586ab"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("e8e44d3c-9cef-4c60-a517-e353c7f3e50d"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("ea26252e-a47b-4591-9c3e-1f30a200bd7f"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("ebb2566c-5369-4b35-b377-540dd7988e7d"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("ebbc89ba-12e6-4236-9e50-f7d217ea891e"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("ed61b58b-3ad9-4804-8b69-869ebf9e793d"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("ed9a1c29-beec-43dc-a630-91f2389c5639"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("f240116c-b58a-452a-a645-9d7cab78cbaf"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("f396b82e-51d5-4c8d-9d39-42070b0b5839"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("f4341425-3087-4111-9b35-af2627467f82"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("f918dcfc-89fd-45e3-b82e-a3f6d90ae58a"));

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: new Guid("fcc28f7a-afb7-4575-b7f6-d44f791f5722"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_SentFiles",
                table: "SentFiles",
                columns: new[] { "UserId", "GroupId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Messages",
                table: "Messages",
                columns: new[] { "UserId", "GroupId" });

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

            migrationBuilder.AddForeignKey(
                name: "FK_Applications_AspNetUsers_UserId",
                table: "Applications",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SentFiles_AspNetUsers_UserId",
                table: "SentFiles",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
