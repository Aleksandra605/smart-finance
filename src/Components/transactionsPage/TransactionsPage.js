import Balance from '../balance/Balance';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import TransactionsView from '../transactionsView/TransactionsView';
import s from './_transactionsPage.module.scss';
import SvgGenerator from '../svg-generator/SvgGenerator';

function TransactionsPage() {
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem('lastTab', location.pathname);
  }, [location]);

  return (
    <section className={s.transactions__section}>
      <div className={s.balance__container}>
        <Balance />
        <Link to="/reports" className={s.linkToReports}>
          Reports
          <SvgGenerator name="reports icon" />
        </Link>
      </div>

      <div className={s.transactionsView__container}>
        <TransactionsView />
      </div>
    </section>
  );
}

export default TransactionsPage;
