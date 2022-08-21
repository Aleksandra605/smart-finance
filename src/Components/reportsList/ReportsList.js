import { NavLink, useLocation } from 'react-router-dom';
import s from './_reportsList.module.scss';
import SvgGenerator from '../svg-generator/SvgGenerator';
import {
  getExpensesReports,
  getIncomesReports,
} from '../../redux/reports/reports-selectors';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';

function ReportsList({
  year,
  month,
  transactionType,
  expensesReports,
  incomesReports,
  chooseCategory,
}) {
  const [items, setItems] = useState(
    expensesReports
      .find((el) => el[0] === year)?.[1]
      ?.find((el) => el[0] === month)?.[1]
  );

  const location = useLocation();
  // ....................................................................

  useEffect(() => {
    if (transactionType === 'EXPENSES') {
      const itemsListExp = expensesReports
        .find((el) => el[0] === year)?.[1]
        ?.find((el) => el[0] === month)?.[1];
      return setItems(itemsListExp);
    }

    const itemsListInc = incomesReports
      .find((el) => el[0] === year)?.[1]
      ?.find((el) => el[0] === month)?.[1];
    return setItems(itemsListInc);

    /*eslint-disable */
  }, [year, month, transactionType]);

  //......................................................................

  return (
    <>
      <ul className={s.categoriesList}>
        {items !== undefined ? (
          Object.entries(items).map((el) => {
            return (
              <li
                id={el[0]}
                key={el[0]}
                className={s.item}
                onClick={() => chooseCategory(el[0])}
              >
                <NavLink
                  to={{
                    pathname: location.pathname,
                    search: `year=${year}&month=${month}&type=${el[0]}`,
                  }}
                  className={s.navLink}
                >
                  <span>{el[1]}</span>
                  <SvgGenerator name={el[0]} />
                  {el[0].toUpperCase()}
                </NavLink>
              </li>
            );
          })
        ) : (
          <p>{`You don't have ${transactionType.toLowerCase()} this month`}</p>
        )}
      </ul>
    </>
  );
}

const mapStateToProps = (state) => ({
  expensesReports: getExpensesReports(state),
  incomesReports: getIncomesReports(state),
});

export default connect(mapStateToProps)(ReportsList);
