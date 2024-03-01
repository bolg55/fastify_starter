export const getMe = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_DOMAIN}/me`, {
    method: 'GET',
    credentials: 'include',
  });
  return response.json(); // Return the parsed data directly
};

export const updateMe = async (data: { userName: string }) => {
  const response = await fetch(`${import.meta.env.VITE_API_DOMAIN}/me`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
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

export const handleBillingPortal = async () => {
  const { url, status, message } = await getCustomerPortalUrl();
  if (status === 'success') {
    window.location.href = url;
  } else {
    console.error(message);
  }
};
