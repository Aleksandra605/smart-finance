const getIsAuthenticated = (state) => state.auth.isAuthenticated;

const getUser = (state) => state.auth.user;

const getUserId = (state) => {
  return state.auth.user.userId;
};

const getBalance = (state) => {
  return state.auth.user.balance;
};

export { getIsAuthenticated, getUser, getUserId, getBalance };
