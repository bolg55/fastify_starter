export const getMe = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_DOMAIN}/me`, {
    method: 'GET',
    credentials: 'include',
  });
  return response.json(); // Return the parsed data directly
};
