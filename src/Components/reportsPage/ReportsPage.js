import Balance from '../balance/Balance';
import ReportsList from '../reportsList/ReportsList';
import { lazy, useState, useEffect } from 'react';
import { getLoadingStatus } from '../../redux/reports/reports-selectors';
import Loader from '../loader1/Loader';
import {
  Link,
  useHistory,
  useRouteMatch,
  useLocation,
  Route,
} from 'react-router-dom';
import s from './_reportsPage.module.scss';
import { connect } from 'react-redux';
import SvgGenerator from '../svg-generator/SvgGenerator';
import TotalAmounts from '../reportsTotalAmounts/TotalAmounts';
import useLocalStorage from '../../helpers/useLocalStorage';
import DateSelector from '../dateSelector/DateSelector';
import monthsList from '../../helpers/monthsList';

//...........................................................................

const ReportsChart = lazy(() => import('../reportsChart/ReportsChart'));
const TransactionType = ['EXPENSES', 'INCOMES'];
let selectedIndexOfTransactionType = 0;

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function ReportsPage({ loading }) {
  const [currentTransactionsType, setCurrentTransactionsType] = useLocalStorage(
    'currentTransactionsType',
    'EXPENSES'
  );

  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(
    monthsList[new Date().getMonth()]
  );
  const [category, setCategory] = useState('');

  const { url } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  //...........................................................................

  useEffect(() => {
    localStorage.setItem('lastTab', `${location.pathname}${location.search}`);
  }, [location]);

  //...........................................................................

  useEffect(() => {
    history.push({
      pathname: `${url}/${currentTransactionsType.toLowerCase()}`,
      search: `year=${currentYear}&month=${currentMonth.toLowerCase()}`,
    });
    setCategory('');
    /*eslint-disable */
  }, [currentTransactionsType, currentMonth, currentYear]);

  //.........    Transaction type navigation    ..........

  const buttonLeft = async () => {
    selectedIndexOfTransactionType =
      (await selectedIndexOfTransactionType) === 0
        ? TransactionType.length - 1
        : selectedIndexOfTransactionType - 1;
    await setCurrentTransactionsType(
      TransactionType[selectedIndexOfTransactionType]
    );
    return;
  };

  const buttonRight = async () => {
    selectedIndexOfTransactionType =
      (await selectedIndexOfTransactionType) === TransactionType.length - 1
        ? 0
        : selectedIndexOfTransactionType + 1;
    await setCurrentTransactionsType(
      TransactionType[selectedIndexOfTransactionType]
    );
    return;
  };

  //...........................................................................

  const chooseCategory = (value) => {
    return setCategory(value);
  };

  const handleChangeCurrentYear = (value) => {
    return setCurrentYear(value);
  };

  const handleChangeCurrentMonth = (value) => {
    return setCurrentMonth(value);
  };

  //...........................................................................

  return (
    <section className={s.section}>
      <div className={s.div1}>
        <Link to="/transactions" className={s.link}>
          <SvgGenerator name="arrow go back" /> Transactions
        </Link>
        <Balance />
        <DateSelector
          handleChangeCurrentYear={handleChangeCurrentYear}
          handleChangeCurrentMonth={handleChangeCurrentMonth}
        />
      </div>

      <TotalAmounts currentYear={Number(currentYear)} />

      {loading ? (
        <div className={s.loaderBox}>
          <Loader />
        </div>
      ) : (
        <>
          <div className={s.reportsBox}>
            <div className={s.transactionTypeBox}>
              <button className={s.btnNext} onClick={buttonLeft}>
                <SvgGenerator name="Vector left" />
              </button>

              <p className={s.transactionName}>{currentTransactionsType}</p>
              <button className={s.btnNext} onClick={buttonRight}>
                <SvgGenerator name="Vector right" />
              </button>
            </div>

            <ReportsList
              year={Number(currentYear)}
              month={currentMonth}
              transactionType={currentTransactionsType}
              chooseCategory={chooseCategory}
            />
          </div>
        </>
      )}

      {category === '' ? null : (
        <Route
          path={{
            pathname: location.pathname,
            search: `year=${currentYear}&month=${currentMonth}&type=${category}`,
          }}
        >
          <ReportsChart />
        </Route>
      )}
    </section>
  );
}

const mapStateToProps = (state) => ({
  loading: getLoadingStatus(state),
});

export default connect(mapStateToProps)(ReportsPage);
