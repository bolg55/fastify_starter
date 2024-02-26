import { createStripeCustomerAndUpdateSubscription } from 'services/stripeServices';
import { createUser } from 'services/userServices';
import { RecipeInterface } from 'supertokens-node/recipe/thirdpartypasswordless/types';

const consumeCodeOverride =
  (originalImplementation: RecipeInterface) =>
  async (input: Parameters<RecipeInterface['consumeCode']>[0]) => {
    const response = await originalImplementation.consumeCode(input);

    if (response.status === 'OK') {
      const { id, emails } = response.user;

      await createUser(id, emails[0]);

      if (
        response.createdNewRecipeUser &&
        response.user.loginMethods.length === 1
      ) {
        await createStripeCustomerAndUpdateSubscription(id, emails[0]);
      } else {
        // TODO: post sign in logic
      }
    }
    return response;
  };

export default consumeCodeOverride;
