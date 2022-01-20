export async function getUsers(page) {
  const userRes = await fetch(`https://randomuser.me/api/?page=${page}`);
  return await userRes.json();
}
