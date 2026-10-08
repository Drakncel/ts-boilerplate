import "./App.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router";
import { Shortener } from "@/pages/Shortener";
import { Home } from "@/pages/Home";
import { Menu } from "./components/app/Menu";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/app">
            <Route element={<Menu />}>
              <Route index element={<Home />} />
              <Route path="shortener" element={<Shortener />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
