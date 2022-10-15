import {
  useRouteMatch,
  useHistory,
  Route,
  NavLink,
  Switch,
} from 'react-router-dom';
import { lazy, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  deleteExpense,
  deleteIncome,
} from '../../redux/transactions/transaction-operations';
import {
  getExpenses,
  getIncomes,
  getSummaryExpenses,
  getSummaryIncomes,
} from '../../redux/transactions/transaction-selectors';
import NewTransaction from '../newTransaction/NewTransaction';
import Summary from '../summary/Summary1';
import s from './_transactionsView.module.scss';
import useLocalStorage from '../../helpers/useLocalStorage';

//....................................................................

const TransactionsList = lazy(() =>
  import('../transactionsList/TransactionsList'),
);

//.....................................................................

function TransactionsView({
  expenses,
  incomes,
  onDeleteExpense,
  onDeleteIncome,
  summaryExpenses,
  summaryIncomes,
}) {
  const [transactionCurrentTab, setCurrentTab] = useLocalStorage(
    'transactionCurrentTab',
    'expenses',
  );

  const { url } = useRouteMatch();
  const history = useHistory();
  const viewportWidth = window.innerWidth;

  useEffect(() => {
    history.push(`${url}/${transactionCurrentTab}`); /*eslint-disable */
  }, []);

  return (
    <>
      <nav className={s.navigation}>
        <NavLink
          to={{
            pathname: `${url}/expenses`,
            state: `${url}/expenses`,
          }}
          onClick={() => setCurrentTab('expenses')}
          className={s.navLink}
          style={isActive =>
            viewportWidth > 767
              ? {
                  boxShadow: isActive
                    ? 'inset 1px 1px 2px #bababa, inset -1px -1px 2px #ffffff'
                    : 'none',
                  color: isActive ? '#886aff' : '#79819c',
                }
              : {
                  boxShadow: isActive
                    ? 'inset 1px 1px 2px #bababa, inset -1px -1px 2px #ffffff'
                    : 'none',
                  color: isActive ? '#886aff' : '#79819c',
                }
          }
        >
          EXPENSES
        </NavLink>
        <NavLink
          to={{
            pathname: `${url}/incomes`,
            state: `${url}/incomes`,
          }}
          className={s.navLink}
          onClick={() => setCurrentTab('incomes')}
          style={isActive =>
            viewportWidth > 767
              ? {
                  boxShadow: isActive
                    ? 'inset 1px 1px 2px #bababa, inset -1px -1px 2px #ffffff'
                    : 'none',
                  color: isActive ? '#886aff' : '#79819c',
                }
              : {
                  boxShadow: isActive
                    ? 'inset 1px 1px 2px #bababa, inset -1px -1px 2px #ffffff'
                    : 'none',
                  color: isActive ? '#886aff' : '#79819c',
                }
          }
        >
          INCOMES
        </NavLink>
        {/* <div className={s.indicator}></div> */}
      </nav>

      <section className={s.transactionsSection}>
        <NewTransaction />
        <div className={s.transactionsContainer}>
          <Switch>
            <Route path={`${url}/expenses`} exact>
              <TransactionsList data={expenses} onDelete={onDeleteExpense} />
              {summaryExpenses.length > 0 ? (
                <Summary data={summaryExpenses} />
              ) : null}
            </Route>

            <Route path={`${url}/incomes`} exact>
              <TransactionsList data={incomes} onDelete={onDeleteIncome} />
              {summaryIncomes.length > 0 ? (
                <Summary data={summaryIncomes} />
              ) : null}
            </Route>
          </Switch>
        </div>
      </section>
    </>
  );
}

const mapStateToProps = state => ({
  expenses: getExpenses(state),
  incomes: getIncomes(state),
  summaryExpenses: getSummaryExpenses(state),
  summaryIncomes: getSummaryIncomes(state),
});

const mapDispatchToProps = dispatch => ({
  onDeleteExpense: data => {
    return dispatch(deleteExpense(data));
  },
  onDeleteIncome: data => {
    return dispatch(deleteIncome(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsView);
