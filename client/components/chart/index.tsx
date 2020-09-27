// Include the react-fusioncharts component
import ReactFC from 'react-fusioncharts';

// Include the fusioncharts library
import FusionCharts from 'fusioncharts';

// Include the chart type
import doughnut2d from 'fusioncharts/fusioncharts.charts';

// Include the theme as fusion
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

ReactFC.fcRoot(FusionCharts, doughnut2d, FusionTheme);

export default function chart(data) {
  /* TODO: Refactor for use global state
  if (balance && moreData) {
    balance.map((item) => {
      moreData.map((currency) => {
        return currency.id === item.currencyId
          ? chartData.push({
              value: item.value.toString(),
              label: currency.code,
            })
          : false;
      });
    });
  }
  */

  const chartData = [
    {
      label: 'Bitcoin',
      value: '3922.52',
    },
    {
      label: 'Bitcoin',
      value: '3922.52',
    },
    {
      label: 'Bitcoin',
      value: '3922.52',
    },
    {
      label: 'Bitcoin',
      value: '3922.52',
    },
    {
      label: 'Bitcoin',
      value: '3922.52',
    },
  ];

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

  return (
    <>
      <ReactFC {...chartConfigs} />
    </>
  );
}
