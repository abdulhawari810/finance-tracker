import { Outlet, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Navbar from "../navbar";

import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";

export default function SettingLayout() {
  const nav = useNavigate();
  return (
    <main className="bg-secondary w-full px-5 pt-24 pb-14 text-white">
      <Navbar
        icon={
          <button
            type="button"
            onClick={() => nav(-1)}
            className={"absolute left-5"}
          >
            <KeyboardBackspaceRoundedIcon className="text-white text-3xl!" />
          </button>
        }
        position="left"
        title="Pengaturan"
        navHide={true}
        type="arrow"
      />
      <Outlet />
    </main>
  );
}
