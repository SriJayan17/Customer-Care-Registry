import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import DashBoard from "./components/Dashboard";
import AdminDashboard from "./components/AdminDashboard";
import AgentDashboard from "./components/Agent";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<DashBoard />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/agent" element={<AgentDashboard />} />
    </Route>
  )
);

const App = () => {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
