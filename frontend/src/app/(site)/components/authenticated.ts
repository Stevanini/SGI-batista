export const authenticated = () => {
  const token = localStorage.getItem('@accessToken');

  return !!token;
};
