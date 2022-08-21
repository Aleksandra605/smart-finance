import axios from 'axios';
import {
  addExpenseRequest,
  addExpenseSuccess,
  addExpenseError,
  addIncomeRequest,
  addIncomeSuccess,
  addIncomeError,
  fetchTransactionsRequest,
  fetchTransactionsSuccess,
  fetchTransactionsError,
  deleteExpenseRequest,
  deleteExpenseSuccess,
  deleteExpenseError,
  deleteIncomeRequest,
  deleteIncomeSuccess,
  deleteIncomeError,
  fetchSummaryRequest,
  fetchSummarySuccess,
  fetchSummaryError,
} from './transaction-actions';

axios.defaults.baseURL = 'https://smart1finance.herokuapp.com/api';

const addTransactionExpense = (data) => (dispatch) => {
  dispatch(addExpenseRequest());

  const transaction = {
    description: data.description,
    category: data.category,
    amount: data.amount,
    date: data.date,
  };

  return axios
    .post('/transactions/expense', transaction)
    .then(({ data }) => {
      return dispatch(addExpenseSuccess(data));
    })
    .catch((error) => dispatch(addExpenseError(error)));
};

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const addTransactionIncome = (data) => (dispatch) => {
  dispatch(addIncomeRequest());

  const transaction = {
    description: data.description,
    category: data.category,
    amount: data.amount,
    date: data.date,
  };

  return axios
    .post('/transactions/income', transaction)
    .then(({ data }) => {
      return dispatch(addIncomeSuccess(data));
    }) //Это диспач экшена, а data это payload.
    .catch((error) => dispatch(addIncomeError(error)));
};

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const fetchTransactions = () => async (dispatch) => {
  dispatch(fetchTransactionsRequest());

  await axios
    .get('/transactions/')
    .then(({ data }) => dispatch(fetchTransactionsSuccess(data)))
    .catch((error) => dispatch(fetchTransactionsError(error)));
};

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const fetchSummaryList = () => async (dispatch) => {
  dispatch(fetchSummaryRequest());

  await axios
    .get('/transactions/summary')
    .then(({ data }) => dispatch(fetchSummarySuccess(data)))
    .catch((error) => dispatch(fetchSummaryError(error)));
};

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const deleteExpense = (id) => (dispatch) => {
  dispatch(deleteExpenseRequest());

  axios
    .delete(`/transactions/${id}`)
    .then(({ data }) => dispatch(deleteExpenseSuccess(data)))
    .catch((error) => dispatch(deleteExpenseError(error)));
};

const deleteIncome = (id) => (dispatch) => {
  dispatch(deleteIncomeRequest());

  axios
    .delete(`/transactions/${id}`)
    .then(({ data }) => dispatch(deleteIncomeSuccess(data)))
    .catch((error) => dispatch(deleteIncomeError(error)));
};

export {
  addTransactionExpense,
  addTransactionIncome,
  fetchTransactions,
  deleteExpense,
  deleteIncome,
  fetchSummaryList,
};
