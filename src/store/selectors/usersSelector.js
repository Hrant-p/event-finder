const usersSelector = state => state.get("userReducer");

export const allUsersSelector = state => usersSelector(state).get("allUsers");
export const isLoadingUserSelector = state => usersSelector(state).get("isLoading");

