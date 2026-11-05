'use client'

import { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import 'highcharts/esm/highcharts-3d';
import 'highcharts/esm/modules/drilldown';

function Chart({ options }) {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartContainerRef.current) {
      return undefined;
    }

    chartRef.current = Highcharts.chart(chartContainerRef.current, options);

    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, [options]);

  return <div className="Chart" ref={chartContainerRef} />;
}

export default Chart;
