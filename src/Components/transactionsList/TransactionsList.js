import s from './_transactionsList.module.scss';
import SvgGenerator from '../svg-generator/SvgGenerator';
import { useLocation } from 'react-router-dom';

function TransactionsList({ data, onDelete }) {
  const location = useLocation();

  return (
    <>
      <ul className={s.transactionsList}>
        {data.map((item) => {
          const { amount, category, description, _id, date } = item;
          return (
            <li key={_id} className={s.transactionCard}>
              <span className={s.spanDate}>{date}</span>
              <span className={s.spanDescr}>{description}</span>
              <span className={s.spanCategory}>{category}</span>
              {location.pathname === '/transactions/expenses' ? (
                <span className={s.spanAmount} style={{ color: '#d6001d' }}>
                  - {amount} USD
                </span>
              ) : (
                <span className={s.spanAmount} style={{ color: '#2b824f' }}>
                  + {amount} USD
                </span>
              )}
              <span className={s.spanDelete}>
                <button className={s.deleteBtn} onClick={() => onDelete(_id)}>
                  <SvgGenerator name="delete icon" />
                </button>
              </span>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default TransactionsList;
