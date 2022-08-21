import axios from 'axios';
import {
  signUpRequest,
  signUpSuccess,
  signUpError,
  logoutRequest,
  logoutSuccess,
  logoutError,
  loginRequest,
  loginSuccess,
  loginError,
  getCurrentUserRequest,
  getCurrentUserSuccess,
  getCurrentUserError,
  updateBalanceRequest,
  updateBalanceSuccess,
  updateBalanceError,
} from './auth-actions';

// axios.defaults.baseURL = 'http://localhost:3001/api';
axios.defaults.baseURL = 'https://smart1finance.herokuapp.com/api';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const signUp = (credentials) => async (dispatch) => {
  dispatch(signUpRequest());

  try {
    const response = await axios.post('/users/signup', credentials);

    token.set(response.data.token);

    dispatch(signUpSuccess(response.data));
  } catch (error) {
    dispatch(signUpError(error.message));
  }
};

const logIn = (credentials) => async (dispatch) => {
  dispatch(loginRequest());

  try {
    const response = await axios.post('/users/login', credentials);

    token.set(response.data.token);
    dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(loginError(error.message));
  }
};

const logOut = () => async (dispatch) => {
  dispatch(logoutRequest());

  try {
    await axios.get('/users/logout');

    token.unset();
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutError(error.message));
  }
};

const getCurrentUser = () => async (dispatch, getState) => {
  const {
    auth: { token: persistedToken },
  } = getState();

  if (!persistedToken) {
    return;
  }

  token.set(persistedToken);

  dispatch(getCurrentUserRequest());

  try {
    const response = await axios.get('/users/current');

    dispatch(getCurrentUserSuccess(response.data));
  } catch (error) {
    dispatch(getCurrentUserError(error.message));
  }
};

const updateBalance = (data) => (dispatch) => {
  dispatch(updateBalanceRequest());
  const balance = { balance: data.balance };

  axios
    .put(`/users/${data.id}`, balance)
    .then(({ data }) => dispatch(updateBalanceSuccess(data)))
    .catch((error) => dispatch(updateBalanceError(error)));
};

export { signUp, logOut, logIn, getCurrentUser, updateBalance };
