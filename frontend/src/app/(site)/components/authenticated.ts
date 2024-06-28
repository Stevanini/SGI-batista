export const authenticated = () => {
  const token = localStorage.getItem('@accessTokenTransp');

  return !!token;
};
