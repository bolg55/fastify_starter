import { createUserAndProfile } from 'services/userServices';
import { RecipeInterface } from 'supertokens-node/recipe/thirdpartypasswordless/types';

const consumeCodeOverride =
  (originalImplementation: RecipeInterface) =>
  async (input: Parameters<RecipeInterface['consumeCode']>[0]) => {
    const response = await originalImplementation.consumeCode(input);

    // Post sign up response, we check if it was successful
    if (response.status === 'OK') {
      const { id, emails } = response.user;
      console.log('SOMETHING? NEW USER', response.user.id);

      await createUserAndProfile(id, emails[0]);

      if (
        response.createdNewRecipeUser &&
        response.user.loginMethods.length === 1
      ) {
        // TODO: post sign up logic
      } else {
        // TODO: post sign in logic
      }
    }
    return response;
  };

export default consumeCodeOverride;
