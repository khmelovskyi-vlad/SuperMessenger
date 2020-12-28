export default async function Start (connection) {
  await connection.start().catch(function (e) {});
}