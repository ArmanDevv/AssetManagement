import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Context } from '../Contexts';



export default function SimpleBarChart() {

  const {count} = React.useContext(Context)
const pData = [count, 5, 2, 3, 4, 3, 4, 2, 1 , 3 , 5];
const xLabels = [
  'ASSETS',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
];
  return (
    <BarChart
      width={650}
      height={340}
      series={[
        { data: pData, id: 'pvId' },
      ]}
      xAxis={[{ data: xLabels, scaleType: 'band' }]}
      margin={{top:70, bottom:30}}
    />
  );
}
