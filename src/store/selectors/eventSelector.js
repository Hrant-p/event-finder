const eventSelector = state => state.get("eventReducer");

export const findedEventsSelector = state => eventSelector(state).get("findedEvents");
export const isLoadingEventsSelector = state => eventSelector(state).get("isLoading");

