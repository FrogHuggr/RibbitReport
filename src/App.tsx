import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppShell } from './components/layout';
import { Home, Dispatches, MythBusters, WorldMap, Passport, Settings, Help } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppShell />}>
          {/* Home / Today */}
          <Route index element={<Home />} />

          {/* Field Dispatches */}
          <Route path="dispatches" element={<Dispatches />} />
          <Route path="dispatches/:dispatchId" element={<Dispatches />} />

          {/* Myth Busters */}
          <Route path="myths" element={<MythBusters />} />

          {/* Explorer's Map */}
          <Route path="map" element={<WorldMap />} />

          {/* My Passport */}
          <Route path="passport" element={<Passport />} />

          {/* Settings & Help */}
          <Route path="settings" element={<Settings />} />
          <Route path="help" element={<Help />} />

          {/* 404 fallback - redirect to home */}
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
