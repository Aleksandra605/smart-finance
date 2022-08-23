import React, { lazy, Suspense, useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { useHistory, useRouteMatch, useLocation } from 'react-router-dom';
import { getCurrentUser } from './redux/auth/auth-operations';
import { getIsAuthenticated } from './redux/auth/auth-selectors';
import { connect } from 'react-redux';
import Header from './Components/header/Header';
import './App.css';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import {
  fetchTransactions,
  fetchSummaryList,
} from './redux/transactions/transaction-operations';
import { fetchReports } from './redux/reports/reports-operations';
import {
  getExpenses,
  getIncomes,
} from './redux/transactions/transaction-selectors';
import Loader from './Components/loader1/Loader';

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const SignUp = lazy(() => import('./views/signup/SignUpView'));
const Login = lazy(() => import('./views/login/LoginView'));
const TransactionsPage = lazy(() =>
  import('./Components/transactionsPage/TransactionsPage'),
);
const ReportsPage = lazy(() => import('./Components/reportsPage/ReportsPage'));

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function App({
  isAuthenticated,
  onGetCurretnUser,
  fetchReports,
  transactionsItems,
  fetchSummaryList,
  expenses,
  incomes,
}) {
  const lastTab = localStorage.getItem('lastTab');
    const history = useHistory();
  const { url } = useRouteMatch();
  const location = useLocation();
  
    useEffect(() => {
      console.log('history', history);
     console.log('url >>>', url);
  console.log(location);
  });

 

  useEffect(() => {
    onGetCurretnUser();
  }, []);

   useEffect(() => {
    
     if (isAuthenticated) {
       history.push(lastTab);
     }
     history.push('/login');
     /*eslint-disable */
   }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchSummaryList();
      transactionsItems();
      fetchReports();
    }
    return; /*eslint-disable */
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchReports();
      fetchSummaryList();
    }
  }, [expenses, incomes]);

  return (
    <>
      <Header />
      <Suspense
        fallback={
          <div className="loaderBox">
            <Loader />
          </div>
        }
      >
        <Switch>
          <PublicRoute
            exact
            path="/"
            restricted
            redirectTo={isAuthenticated ? lastTab : '/login'}
            component={Login}
          />
          <PublicRoute
            path="/signup"
            restricted
            redirectTo="/login"
            component={SignUp}
          />
          <PublicRoute
            path="/login"
            restricted
            redirectTo={lastTab ? lastTab : '/transactions'}
            component={Login}
          />

          <PrivateRoute
            path="/transactions"
            redirectTo="/login"
            component={TransactionsPage}
          />
          <PrivateRoute
            path="/reports"
            redirectTo="/login"
            component={ReportsPage}
          />
        </Switch>
      </Suspense>
    </>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: getIsAuthenticated(state),
  expenses: getExpenses(state),
  incomes: getIncomes(state),
});

const mapDispatchToProps = dispatch => ({
  onGetCurretnUser: () => {
    return dispatch(getCurrentUser());
  },
  transactionsItems: () => {
    return dispatch(fetchTransactions());
  },
  fetchReports: () => {
    return dispatch(fetchReports());
  },
  fetchSummaryList: () => {
    return dispatch(fetchSummaryList());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
