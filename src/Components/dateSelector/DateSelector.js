import { useEffect } from 'react';
import s from './_dateSelector.module.scss';
import monthsList from '../../helpers/monthsList';
import useLocalStorage from '../../helpers/useLocalStorage';

function DateSelector({ handleChangeCurrentYear, handleChangeCurrentMonth }) {
  const [year, setYear] = useLocalStorage(
    'reportsCurrentYear',
    new Date().getFullYear()
  );
  const [month, setMonth] = useLocalStorage(
    'reportsCurrentMonth',
    monthsList[new Date().getMonth()]
  );

  useEffect(() => {
    handleChangeCurrentYear(year); /*eslint-disable */
  }, [year]);

  useEffect(() => {
    handleChangeCurrentMonth(month); /*eslint-disable */
  }, [month]);

  const handleChangeYear = (event) => {
    setYear(event.target.value);
  };

  const handleChangeMonth = (event) => {
    setMonth(event.target.value);
  };

  return (
    <form className={s.form}>
      <input
        type="text"
        name="year"
        value={year}
        onChange={handleChangeYear}
        className={s.year}
        placeholder="Year"
        list="years"
        required
      />
      <datalist id="years">
        <option>2021</option>
        <option>2022</option>
        <option>2023</option>
      </datalist>
      <input
        type="text"
        name="month"
        value={month}
        onChange={handleChangeMonth}
        className={s.month}
        placeholder="Month"
        list="months"
        required
      />
      <datalist id="months">
        <option>January</option>
        <option>February</option>
        <option>March</option>
        <option>April</option>
        <option>May</option>
        <option>June</option>
        <option>July</option>
        <option>August</option>
        <option>September</option>
        <option>October</option>
        <option>November</option>
        <option>December</option>
      </datalist>
    </form>
  );
}

export default DateSelector;
