import s from './_transactionsList.module.scss';
import SvgGenerator from '../svg-generator/SvgGenerator';
import { useLocation } from 'react-router-dom';

function TransactionsList({ data, onDelete }) {
  const location = useLocation();

  return (
    <>
      <ul className={s.transactionsList}>
        {data.map(item => {
          const { amount, category, description, _id, date } = item;
          return (
            <li key={_id} className={s.transactionCard}>
              <div className={s.groupedDateDescr}>
                <span className={s.spanDate}>{date}</span>
                <span className={s.spanDescr}>{description}</span>
              </div>
              <span className={s.spanCategory}>{category}</span>
              {location.pathname === '/transactions/expenses' ? (
                <span className={s.spanAmount}>- {amount} USD</span>
              ) : (
                <span className={s.spanAmount}>+ {amount} USD</span>
              )}
              <button className={s.deleteBtn} onClick={() => onDelete(_id)}>
                <SvgGenerator name="delete icon" />
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default TransactionsList;
