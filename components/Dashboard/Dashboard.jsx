import { memo } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Box, IconButton, Paper, Tooltip, Typography } from '@mui/material';
import { Responsive, WidthProvider } from 'react-grid-layout/legacy';

//import Chart from './graficos/Chart.jsx';
import dynamic from 'next/dynamic';
const Chart = dynamic(
  () => import('../graficos/Chart'),
  { ssr: false }
);

const ResponsiveGridLayout = WidthProvider(Responsive);

const gridBreakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
const gridColumns = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };

function Dashboard({ widgets, onRemoveWidget }) {
  if (!widgets.length) {
    return (
      <Box className="Dashboard-empty">
        <Typography variant="h6">Nenhum widget adicionado</Typography>
        <Typography variant="body2">
          Escolha um grafico e adicione ao dashboard.
        </Typography>
      </Box>
    );
  }

  return (
    <ResponsiveGridLayout
      className="layout"
      breakpoints={gridBreakpoints}
      cols={gridColumns}
      rowHeight={32}
      margin={[16, 16]}
      containerPadding={[0, 0]}
      isDraggable
      isResizable
      compactType="vertical"
    >
      {widgets.map((widget, index) => (
        <div
          key={widget.id}
          data-grid={{
            x: (index * 4) % 12,
            y: Math.floor(index / 3) * 10,
            w: 4,
            h: 10,
            minW: 3,
            minH: 8,
          }}
        >
          <Paper className="Dashboard-card" elevation={0}>
            <Box className="Dashboard-cardHeader">
              <Typography variant="subtitle1">{widget.type}</Typography>
              <Tooltip title="Remover widget">
                <IconButton
                  aria-label={`Remover ${widget.type}`}
                  size="small"
                  onClick={() => onRemoveWidget(widget.id)}
                >
                  <DeleteForeverIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
            <Chart options={getChartOptions(widget.type)} />
          </Paper>
        </div>
      ))}
    </ResponsiveGridLayout>
  );
}

function getChartOptions(type) {
  switch (type) {
    case 'Bar':
      return {
        chart: {
          type: 'bar',
          marginLeft: 150,
        },
        title: {
          text: 'Most popular ideas by April 2016',
        },
        subtitle: {
          text: 'Source: UserVoice',
        },
        xAxis: {
          type: 'category',
          title: {
            text: null,
          },
          min: 0,
          max: 4,
          scrollbar: {
            enabled: true,
          },
          tickLength: 0,
        },
        yAxis: {
          min: 0,
          max: 1200,
          title: {
            text: 'Votes',
            align: 'high',
          },
        },
        plotOptions: {
          bar: {
            dataLabels: {
              enabled: true,
            },
          },
        },
        legend: {
          enabled: false,
        },
        credits: {
          enabled: false,
        },
        series: [
          {
            name: 'Votes',
            data: [
              ['Gantt chart', 1000],
              ['Autocalculation and plotting of trend lines', 575],
              ['Allow navigator to have multiple data series', 523],
              ['Implement dynamic font size', 427],
              ['Multiple axis alignment control', 399],
              ['Stacked area in irregular datetime series', 309],
              ['Adapt chart height to legend height', 278],
              ['Export charts in excel sheet', 239],
              ['Toggle legend box', 235],
              ['Venn Diagram', 203],
            ],
          },
        ],
      };
    case 'Spline':
      return {
        chart: {
          type: 'spline',
        },
        title: {
          text: 'Spline',
        },
        legend: {
          symbolWidth: 80,
        },
        plotOptions: {
          series: {
            color: '#111827',
          },
        },
        series: [
          {
            data: [1, 3, 2, 4, 5, 4, 6, 2, 3, 5, 6],
            dashStyle: 'LongDash',
          },
          {
            data: [2, 4, 1, 3, 4, 2, 9, 1, 2, 3, 4, 5],
            dashStyle: 'ShortDot',
          },
        ],
      };
    case '3D Columns':
      return {
        chart: {
          type: 'column',
          margin: 75,
          options3d: {
            enabled: true,
            alpha: 15,
            beta: 15,
            depth: 50,
          },
        },
        title: {
          text: '3D Columns',
        },
        plotOptions: {
          column: {
            depth: 25,
          },
        },
        series: [
          {
            data: [
              29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4,
              194.1, 95.6, 54.4,
            ],
          },
        ],
      };
    case 'Drilldown':
      return {
        chart: {
          type: 'column',
        },
        title: {
          text: 'Basic drilldown',
        },
        xAxis: {
          type: 'category',
        },
        legend: {
          enabled: false,
        },
        plotOptions: {
          series: {
            borderWidth: 0,
            dataLabels: {
              enabled: true,
            },
          },
        },
        series: [
          {
            name: 'Things',
            colorByPoint: true,
            data: [
              {
                name: 'Animals',
                y: 5,
                drilldown: 'animals',
              },
              {
                name: 'Fruits',
                y: 2,
                drilldown: 'fruits',
              },
              {
                name: 'Cars',
                y: 4,
                drilldown: 'cars',
              },
            ],
          },
        ],
        drilldown: {
          series: [
            {
              id: 'animals',
              data: [
                ['Cats', 4],
                ['Dogs', 2],
                ['Cows', 1],
                ['Sheep', 2],
                ['Pigs', 1],
              ],
            },
            {
              id: 'fruits',
              data: [
                ['Apples', 4],
                ['Oranges', 2],
              ],
            },
            {
              id: 'cars',
              data: [
                ['Toyota', 4],
                ['Opel', 2],
                ['Volkswagen', 2],
              ],
            },
          ],
        },
      };
    case 'Line':
    default:
      return {
        title: {
          text: 'Fruit Consumption',
        },
        xAxis: {
          categories: ['Apples', 'Bananas', 'Oranges', 'Pineapples', 'Blueberries'],
        },
        yAxis: {
          title: {
            text: 'Fruit eaten',
          },
        },
        chart: {
          type: 'line',
        },
        series: [
          {
            name: 'Jane',
            data: [1, 0, 4, 0, 3],
          },
          {
            name: 'John',
            data: [5, 7, 3, 2, 4],
          },
          {
            name: 'Doe',
            data: [0, 0, 0, 1, 0],
          },
        ],
      };
  }
}

export default memo(Dashboard);
