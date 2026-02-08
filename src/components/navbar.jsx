import { useState } from "react";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import { NavLink } from "react-router-dom";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";

export default function Navbar({
  title = "Catatan Keuangan",
  icon,
  type = "filter",
  position = "right",
  navHide,
}) {
  return (
    <>
      <section
        className={`w-full h-20 flex items-center gap-5 ${position === "left" ? "justify-center" : "justify-between"} p-5
        bg-secondary fixed top-0 left-0 z-50`}
      >
        {position === "left" &&
          (type === "filter" ? (
            <MoreVertRoundedIcon className="text-white text-3xl!" />
          ) : (
            icon
          ))}
        <section className="flex items-center justify-center gap-5">
          <h1 className="text-white font-bold text-lg">{title}</h1>
        </section>
        {position === "right" &&
          (type === "filter" ? (
            <MoreVertRoundedIcon className="text-white text-3xl!" />
          ) : (
            icon
          ))}
      </section>
      {!navHide && (
        <section className="w-full h-20 fixed bottom-0 left-0 z-50 bg-secondary text-white flex items-center justify-between p-5">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `text-white flex
          flex-col items-center justify-center gap-1`
                : `text-primary flex
          flex-col items-center justify-center gap-1`
            }
            to={"/"}
          >
            <DashboardRoundedIcon className="text-3xl!" />
            <span className="text-sm">Dashboard</span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `text-white flex
          flex-col items-center justify-center gap-1`
                : `text-primary flex
          flex-col items-center justify-center gap-1`
            }
            to={"/Transaksi"}
          >
            <ReceiptRoundedIcon className="text-3xl!" />
            <span className="text-sm">Transaksi</span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `text-white flex
          flex-col items-center justify-center gap-1`
                : `text-primary flex
          flex-col items-center justify-center gap-1`
            }
            to={"/Laporan"}
          >
            <AssessmentRoundedIcon className="text-3xl!" />
            <span className="text-sm">Laporan</span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `text-white flex
          flex-col items-center justify-center gap-1`
                : `text-primary flex
          flex-col items-center justify-center gap-1`
            }
            to={"/Pengaturan"}
          >
            <SettingsRoundedIcon className="text-3xl!" />
            <span className="text-sm">Pengaturan</span>
          </NavLink>
        </section>
      )}
    </>
  );
}
