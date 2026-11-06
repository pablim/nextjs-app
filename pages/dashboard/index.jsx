import { useMemo, useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Dashboard from '../../components/Dashboard/Dashboard.jsx';
//import './App.css';

const widgetTypes = ['Line', 'Bar', 'Spline', '3D Columns', 'Drilldown'];

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0f766e',
    },
    secondary: {
      main: '#7c3aed',
    },
    background: {
      default: '#f4f7fb',
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: ['Inter', 'Roboto', 'Arial', 'sans-serif'].join(','),
  },
});

function App() {
  const [selectedWidget, setSelectedWidget] = useState('');
  const [widgets, setWidgets] = useState([]);

  const widgetCount = useMemo(() => widgets.length, [widgets]);

  const addWidget = () => {
    if (!selectedWidget) {
      return;
    }

    setWidgets((currentWidgets) => [
      ...currentWidgets,
      {
        id: `${selectedWidget}-${crypto.randomUUID()}`,
        type: selectedWidget,
      },
    ]);
  };

  const removeWidget = (widgetId) => {
    setWidgets((currentWidgets) =>
      currentWidgets.filter((widget) => widget.id !== widgetId)
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="App">
        <AppBar position="static" elevation={0}>
          <Toolbar className="App-header">
            <img
              src="https://viridis.energy/sites/default/files/logoViridisWhite.png"
              className="App-logo"
              alt="Viridis"
            />
            <Box>
              <Typography variant="h5" component="h1" className="App-title">
                Dashboard Dinamico
              </Typography>
              <Typography variant="body2" className="App-subtitle">
                {widgetCount} widget{widgetCount === 1 ? '' : 's'} no layout
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>

        <Container maxWidth={false} className="App-content">
          <Box className="Widget-toolbar">
            <FormControl size="small" className="Widget-select">
              <InputLabel id="widget-select-label">Widget</InputLabel>
              <Select
                labelId="widget-select-label"
                label="Widget"
                value={selectedWidget}
                onChange={(event) => setSelectedWidget(event.target.value)}
              >
                {widgetTypes.map((widgetType) => (
                  <MenuItem key={widgetType} value={widgetType}>
                    {widgetType}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={addWidget}
              disabled={!selectedWidget}
            >
              Adicionar
            </Button>
          </Box>

          <Dashboard widgets={widgets} onRemoveWidget={removeWidget} />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
