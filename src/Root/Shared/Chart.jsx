import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, LinearScale, CategoryScale, LineController, PointElement, LineElement, Tooltip } from 'chart.js';

ChartJS.register(LinearScale, CategoryScale, LineController, PointElement, LineElement, Tooltip);

const Chart = ({data}) => {
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  const chartData = {
    labels: data.map(item => item.timestamp),
    datasets: [
      {
        label: 'Stock Prices',
        data: data.map(item => item.closingPrice),
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      {data.length > 0 ? (
        <div className='w-[550px] h-[550px]'>
          <Line data={chartData} />
        </div>
      ) : (
        <div>No Data Available</div>
      )}
    </>
  )
}

export default Chart