import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { SlidingWindowVisualizer } from "@/components/SlidingWindowVisualizer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<div>Welcome to DSA Visualizer</div>} />
          <Route path="sliding-window" element={<SlidingWindowVisualizer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
