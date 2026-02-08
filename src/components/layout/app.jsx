import { Outlet } from "react-router-dom";
import Navbar from "../navbar";

export default function App() {
  return (
    <main className="py-20">
      <Navbar navHide={false} />
      <Outlet />
    </main>
  );
}
