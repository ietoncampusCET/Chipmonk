async function isUserAdmin(user) {
  const token = await user.getIdTokenResult();
  return token.claims.admin;
}