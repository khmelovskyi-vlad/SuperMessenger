export default async function Stop (connection) {
  await connection.stop().catch(function (e) { });
}