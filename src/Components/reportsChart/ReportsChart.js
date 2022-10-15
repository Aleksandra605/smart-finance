import { Bar } from 'react-chartjs-2';
import s from './_reportsChart.module.scss';
import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import colors from '../../helpers/colors';
import axios from 'axios';
import Loader from '../loader1/Loader';
import { useLocation } from 'react-router-dom';

axios.defaults.baseURL = 'https://smart1finance.herokuapp.com/api';

function ReportsChart() {
  const [amounts, setAmounts] = useState(null);
  const [labels, setLabels] = useState(null);

  const location = useLocation();

  const year = new URLSearchParams(location.search).get('year');
  const month = new URLSearchParams(location.search).get('month');
  const category = new URLSearchParams(location.search).get('type');

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'top',
      },
      title: {
        display: true,
        text: category,
      },
    },
  };

  useEffect(() => {
    axios
      .post('/transactions/reports_by_category', { year, month, category })
      .then(({ data }) => {
        const y = data.reportByCategory.map(el => el[0]);

        setLabels(y);

        const x = data.reportByCategory.map(el => el[1]);

        return setAmounts(x);
      })
      .catch(err => console.log(err));

    return () => {
      setLabels(null);
      setAmounts(null);
    };
    // eslint-disable-next-line
  }, [category]);

  return (
    <>
      {amounts === null ? (
        <div className={s.loaderBox}>
          <Loader
            type="Oval"
            color="#09708aab"
            secondaryColor="#ffffff"
            height={100}
            width={100}
          />
        </div>
      ) : (
        <div className={s.chartBox}>
          <Bar
            options={options}
            data={{
              labels,
              datasets: [
                {
                  data: amounts,
                  backgroundColor: colors,
                  borderRadius: 10,
                },
              ],
            }}
          />
        </div>
      )}
    </>
  );
}

export default ReportsChart;
