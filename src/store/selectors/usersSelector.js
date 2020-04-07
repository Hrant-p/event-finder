const usersSelector = state => state.get("userReducer");

export const userSelector = state => usersSelector(state).get("user");
export const errorSelector = state => usersSelector(state).get("error");
export const isLoadingUserSelector = state => usersSelector(state).get("isLoading");
