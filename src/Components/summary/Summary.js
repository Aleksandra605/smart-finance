import s from './_summaryTable.module.scss';
import { useLocation } from 'react-router-dom';
import SvgGenerator from '../svg-generator/SvgGenerator';
import { useState, useEffect } from 'react';

let selectedIndex = 0;

function Summary({ data }) {
  const [yearsList, setYearsList] = useState(data.map((el) => el[0]));
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const location = useLocation();

  const buttonLeft = async () => {
    selectedIndex =
      (await selectedIndex) === 0 ? yearsList.length - 1 : selectedIndex - 1;
    await setCurrentYear(yearsList[selectedIndex]);
    return;
  };

  const buttonRight = async () => {
    selectedIndex =
      (await selectedIndex) === yearsList.length - 1 ? 0 : selectedIndex + 1;
    await setCurrentYear(yearsList[selectedIndex]);
    return;
  };

  return (
    <div className={s.summaryContainer}>
      <table className={s.summaryTable}>
        <thead>
          <tr className={s.tr}>
            <th className={s.summaryTitle}>
              <div className={s.transactionTypeBox}>
                <button className={s.btnNext} onClick={buttonLeft}>
                  <SvgGenerator name="Vector left" />
                </button>

                <p className={s.textYear}>{currentYear}</p>
                <button className={s.btnNext} onClick={buttonRight}>
                  <SvgGenerator name="Vector right" />
                </button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item[0]}>
              <td>{item[0]}</td>
              {location.pathname === '/transactions/expenses' ? (
                <td style={{ color: '#d6001d' }}>-{item[1]}</td>
              ) : (
                <td style={{ color: '#2b824f' }}>+{item[1]}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Summary;
