// Include the react-fusioncharts component
import ReactFC from 'react-fusioncharts';

// Include the fusioncharts library
import FusionCharts from 'fusioncharts';

// Include the chart type
import doughnut2d from 'fusioncharts/fusioncharts.charts';

// Include the theme as fusion
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

import { useContext } from 'react';
import { balanceContext } from 'hooks/useBalance';

ReactFC.fcRoot(FusionCharts, doughnut2d, FusionTheme);

let chartData = [];

const chartConfigs = {
  type: 'doughnut2d', // The chart type
  width: '100%', // Width of the chart
  height: '100%', // Height of the chart
  dataFormat: 'json', // Data type
  dataSource: {
    // Chart Configuration
    chart: {
      defaultCenterLabel: 'Total: 1000€',
      centerLabel: 'Revenue from $label: $value',
      caption: 'BALANCE', // Set the chart caption
      captionFontSize: '28',
      captionFontColor: '#000000',
      captionFontBold: '1',
      subCaption: '', // Set the chart subcaption
      xAxisName: 'Currency', // Set the x-axis name
      yAxisName: 'Amount', // Set the y-axis name
      numberSuffix: '€',
      theme: 'fusion', // Set the theme for your chart
    },
    // Chart Data - from step 2
    data: chartData,
  },
};

export default function chart() {
  const { balance } = useContext(balanceContext);
  let total = 0;

  const createChartData = () => {
    chartData = [];
    balance.map((value, key) => {
      value.code = value.code.startsWith('LD')
        ? `${value.code.substring(2)} (Lending)`
        : value.code;
      chartData.push({
        label: value.code,
        value: value.totalInEur,
      });
      chartConfigs.dataSource.data = chartData;
      total += value.totalInEur;
      chartConfigs.dataSource.chart.defaultCenterLabel = `Total: ${total.toFixed(
        2
      )} €`;
    });
    return <></>;
  };

  return (
    <div>
      {balance.length ? (
        createChartData() && <ReactFC {...chartConfigs} />
      ) : (
        <div></div>
      )}
    </div>
  );
}
