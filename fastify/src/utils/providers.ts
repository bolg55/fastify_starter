const authProviders = [
  {
    config: {
      thirdPartyId: 'google',
      clients: [
        {
          clientId: 'TODO: GOOGLE_CLIENT_ID',
          clientSecret: 'TODO: GOOGLE_CLIENT_SECRET',
        },
      ],
    },
  },
  {
    config: {
      thirdPartyId: 'github',
      clients: [
        {
          clientId: 'TODO: GITHUB_CLIENT_ID',
          clientSecret: 'TODO: GITHUB_CLIENT_SECRET',
        },
      ],
    },
  },
  {
    config: {
      thirdPartyId: 'facebook',
      clients: [
        {
          clientId: 'TODO: FACEBOOK_CLIENT_ID',
          clientSecret: 'TODO: FACEBOOK_CLIENT_SECRET',
        },
      ],
    },
  },
];

export default authProviders;
