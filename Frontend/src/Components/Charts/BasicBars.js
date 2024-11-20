import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function BasicBars() {
  return (
    <div style={{ width: '100%' }}> {/* Responsive container */}
      <BarChart
        xAxis={[{ scaleType: 'band', data: ['Group A', 'Group B', 'Group C'] }]}
        series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
        height={300} /* Set only height for responsiveness */
      />
    </div>
  );
}
