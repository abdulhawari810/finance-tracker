import { Outlet } from "react-router-dom";
import Navbar from "../navbar";

export default function App() {
  return (
    <main className="h-screen flex flex-col bg-primary">
      <Navbar navHide={false} />
      <div className="w-full flex bg-primary flex-col overflow-y-auto pt-20 pb-20">
        <Outlet />
      </div>
    </main>
  );
}
