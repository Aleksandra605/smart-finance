import { useState } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getCurrentUser } from '../../redux/auth/auth-operations';
import {
  addTransactionExpense,
  addTransactionIncome,
} from '../../redux/transactions/transaction-operations';
import s from './_newTransaction.module.scss';
import Box from '@mui/material/Box';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

//........................................................................

function NewTransaction({ sendDataExpense, sendDataIncome, onGetCurrentUser }) {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(null);

  const location = useLocation();

  const handleChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case 'description':
        setDescription(value);
        break;
      case 'category':
        setCategory(value);
        break;
      case 'amount':
        setAmount(value);
        break;

      default:
        return;
    }
  };

  const submitForm = async (event) => {
    event.preventDefault();

    const data = await {
      category,
      description,
      amount,
      date,
    };

    if (location.pathname === '/transactions/expenses') {
      await sendDataExpense(data);
    } else await sendDataIncome(data);

    clearForm();
    return onGetCurrentUser();
  };

  const clearForm = () => {
    setDescription('');
    setCategory('');
    setAmount('');
    setDate(null);
    return;
  };

  return (
    <form onSubmit={submitForm} className={s.form}>
      <div className={s.inputsBox}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Custom input"
            value={date}
            onChange={(newValue) => {
              setDate(newValue);
            }}
            renderInput={({ inputRef, inputProps, InputProps }) => (
              <Box
                className={s.date}
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <input
                  ref={inputRef}
                  {...inputProps}
                  className={s.dateInput}
                  required
                />
                {InputProps?.endAdornment}
              </Box>
            )}
          />
        </LocalizationProvider>

        <input
          type="text"
          className={s.description}
          label="Description"
          placeholder="Description"
          value={description}
          onChange={handleChange}
          name="description"
          autoComplete="none"
        />
        <input
          type="text"
          name="category"
          value={category}
          label="Category"
          onChange={handleChange}
          className={s.category}
          placeholder="Category"
          autoComplete="false"
          list={
            location.pathname === '/transactions/expenses'
              ? 'expensesList'
              : 'incomesList'
          }
          required
        />
        <datalist className={s.datalist} id="expensesList">
          <option>Products</option>
          <option>Transport</option>
          <option>Health</option>
          <option>Alcohol</option>
          <option>Home</option>
          <option>Entertainment</option>
          <option>Technics</option>
          <option>Public Utilities, connection</option>
          <option>Sports, hobbies</option>
          <option>Education</option>
          <option>Other</option>
        </datalist>

        <datalist className={s.datalist} id="incomesList">
          <option>Salary</option>
          <option>Additional income</option>
        </datalist>

        <input
          required
          step="any"
          type="number"
          name="amount"
          placeholder="Amount"
          label="Amount"
          value={amount}
          onChange={handleChange}
          className={s.amount}
        />
      </div>

      <div className={s.btnContainer}>
        <button type="submit" className={s.btn}>
          <span>ENTER</span>
        </button>
        <button type="button" onClick={() => clearForm()} className={s.btn}>
          <span>CLEAR</span>
        </button>
      </div>
    </form>
  );
}

const mapDispatchToProps = (dispatch) => ({
  sendDataExpense: (data) => {
    return dispatch(addTransactionExpense(data));
  },
  sendDataIncome: (data) => {
    return dispatch(addTransactionIncome(data));
  },
  onGetCurrentUser: () => {
    return dispatch(getCurrentUser());
  },
});

export default connect(null, mapDispatchToProps)(NewTransaction);
