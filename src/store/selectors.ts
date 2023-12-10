import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '.';

const selectRequests = (state: RootState) => state.userRequests.data;
const selectUserIdv = (state: RootState) => state.auth.id;

const selectUserRequests = createSelector(
  [selectRequests, selectUserIdv],
  (requests, userId) => {
    return requests.filter((req) => req.owner === userId);
  }
);

export default selectUserRequests;
