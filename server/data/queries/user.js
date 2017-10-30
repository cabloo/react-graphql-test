/* @flow */

import { UserType } from '../types/userType';

const user = {
  type: UserType,
  resolve: async () => {
    return {
      id: 1,
    };
  },
};

export default {
  user,
};