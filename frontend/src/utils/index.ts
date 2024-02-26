export const getMe = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_DOMAIN}/me`, {
    method: 'GET',
    credentials: 'include',
  });
  return response.json(); // Return the parsed data directly
};

export const getCustomerPortalUrl = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_DOMAIN}/stripe/customer-portal`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers required for authentication
      },
    }
  );
  return response.json();
};
