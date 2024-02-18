import { createUserAndProfile } from 'services/userServices';
import { RecipeInterface } from 'supertokens-node/recipe/thirdpartypasswordless/types';

const thirdPartySignInUpOverride =
  (originalImplementation: RecipeInterface) =>
  async (input: Parameters<RecipeInterface['thirdPartySignInUp']>[0]) => {
    let response = await originalImplementation.thirdPartySignInUp(input);

    if (response.status === 'OK') {
      let { id, emails } = response.user;
      console.log('USER SIGNED UP', id);
      await createUserAndProfile(id, emails[0]);

      // This is the response from the OAuth 2 provider that contains their tokens or user info.
      let providerAccessToken = response.oAuthTokens['access_token'];
      let firstName =
        response.rawUserInfoFromProvider.fromUserInfoAPI!['first_name'];

      if (
        response.createdNewRecipeUser &&
        response.user.loginMethods.length === 1
      ) {
        // TODO: Post sign up logic
      } else {
        // TODO: Post sign in logic
      }
    }
    return response;
  };

export default thirdPartySignInUpOverride;
