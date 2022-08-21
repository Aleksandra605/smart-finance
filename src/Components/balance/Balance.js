import { useState, useEffect } from 'react';
import s from './_balance.module.scss';
import { connect } from 'react-redux';
import { getUserId, getBalance } from '../../redux/auth/auth-selectors';
import {
  updateBalance,
  getCurrentUser,
} from '../../redux/auth/auth-operations';
import {
  getExpenses,
  getIncomes,
} from '../../redux/transactions/transaction-selectors';

function Balance({
  userId,
  sendData,
  currentBalance,
  onGetCurrentUser,
  expenses,
  incomes,
}) {
  const [balance, setBalance] = useState(() => currentBalance);

  const handleChange = (event) => {
    setBalance(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await { id: userId, balance: balance };
    await sendData(data);
  };

  useEffect(() => {
    setBalance(currentBalance);
  }, [currentBalance]);

  useEffect(() => {
    return onGetCurrentUser(); /*eslint-disable */
  }, [expenses, incomes]);

  return (
    <form className={s.formBalance} onSubmit={handleSubmit}>
      <label className={s.label}>Balance:</label>
      <div className={s.inputBox}>
        <input
          className={s.input}
          name="balance"
          value={balance}
          placeholder="Balance"
          onChange={handleChange}
        />
        <button className={s.btn}>CONFIRM</button>
      </div>
    </form>
  );
}

const mapStateToProps = (state) => ({
  userId: getUserId(state),
  currentBalance: getBalance(state),
  expenses: getExpenses(state),
  incomes: getIncomes(state),
});

const mapDispatchToProps = (dispatch) => ({
  sendData: (data) => {
    return dispatch(updateBalance(data));
  },
  onGetCurrentUser: () => {
    return dispatch(getCurrentUser());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Balance);
