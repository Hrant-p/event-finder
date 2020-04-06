const usersSelector = state => state.get("userReducer");

export const userSelector = state => usersSelector(state).get("user");
export const isAuthSelector = state => usersSelector(state).get("isAuth");
export const isLoadingUserSelector = state => usersSelector(state).get("isLoading");
