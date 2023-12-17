import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '.';

const selectRequests = (state: RootState) => state.userRequests.data;
const selectUserId = (state: RootState) => state.auth.id;

const selectUserRequests = createSelector(
  [selectRequests, selectUserId],
  (requests, userId) => {
    return requests.filter((req) => req.owner === userId);
  }
);

export default selectUserRequests;
