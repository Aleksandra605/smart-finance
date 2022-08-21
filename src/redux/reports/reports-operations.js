import {
  fetchReportsRequest,
  fetchReportsSuccess,
  fetchReportsError,
} from './reports-actions';
import axios from 'axios';

axios.defaults.baseURL = 'https://smart1finance.herokuapp.com/api';

const fetchReports = () => async (dispatch) => {
  dispatch(fetchReportsRequest());

  await axios
    .get('/transactions/reports')
    .then(({ data }) => dispatch(fetchReportsSuccess(data)))
    .catch((error) => dispatch(fetchReportsError(error)));
};

export { fetchReports };
