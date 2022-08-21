const getExpenses = (state) => state.transactions.expenses;
const getIncomes = (state) => state.transactions.incomes;
const getSummaryExpenses = (state) => state.transactions.summaryExpenses;
const getSummaryIncomes = (state) => state.transactions.summaryIncomes;

const getLoadingStatus = (state) => state.transactions.loading;

export {
  getExpenses,
  getIncomes,
  getSummaryExpenses,
  getSummaryIncomes,
  getLoadingStatus,
};
