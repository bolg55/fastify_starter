export const getMe = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_DOMAIN}/me`);
    if (response.ok) {
      return await response.json();
    } else if (response.status === 401) {
      // Return a specific object to indicate an unauthorized response
      return { unauthorized: true };
    } else {
      // Handle other non-OK responses
      throw new Error('Failed to fetch user data');
    }
  } catch (error) {
    // Handle errors other than 401
    console.error('Error fetching user data:', error);
    return { error };
  }
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
