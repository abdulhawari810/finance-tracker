import { useState } from "react";
import Button from "@mui/material/Button";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import AirplanemodeActiveRoundedIcon from "@mui/icons-material/AirplanemodeActiveRounded";

import NorthEastRoundedIcon from "@mui/icons-material/NorthEastRounded";
import SouthWestRoundedIcon from "@mui/icons-material/SouthWestRounded";

import { rupiah } from "../utils/rupiah";
import { isToday, isYesterday } from "../utils/getDate";

export default function Transaksi() {
  const [Transaksi, setTransaksi] = useState(() => {
    return JSON.parse(localStorage.getItem("transaksi")) || [];
  });

  const today = new Date().toISOString().split("T")[0];

  const dailyTransactions = Transaksi.filter((t) => t.tanggal === today);

  const groupedTransactions = Transaksi.reduce((acc, t) => {
    const date = t.tanggal.split("T")[0];

    if (!acc[date]) {
      acc[date] = {
        items: [],
        total: 0,
      };
    }

    acc[date].items.push(t);
    acc[date].total += t.amount;

    return acc;
  }, {});

  const sortedGrouped = Object.entries(groupedTransactions).sort(
    (a, b) => new Date(b[0]) - new Date(a[0]),
  );

  console.log(groupedTransactions);
  return (
    <>
      <main>
        <header className="flex sticky top-0 z-20 p-5 bg-secondary flex-col w-full">
          <div className="flex items-center justify-between gap-5">
            <form className="flex items-center justify-center relative w-64.75 rounded-full">
              <input
                type="search"
                placeholder="Cari Transaksi"
                className="w-full h-12 pl-10 pr-5 outline text-white focus:outline-slate-100 not-placeholder-shown:outline-slate-100 outline-slate-600 rounded-full"
              />
              <button type="submit" className="absolute text-white left-2.5">
                <SearchRoundedIcon />
              </button>
            </form>
            <Button className="p-2.5! capitalize! text-slate-300! border! rounded-lg! border-slate-600!">
              Filter
            </Button>
          </div>
        </header>
        <section className="p-5 flex flex-col gap-5">
          {sortedGrouped.map(([date, data]) => (
            <div key={date} className="flex flex-col gap-4">
              {/* Label tanggal */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-slate-600" />
                <span className="text-sm text-secindary font-bold">{date}</span>
                <div className="flex-1 h-px bg-slate-600" />
              </div>

              {/* Cards */}
              {data.items.map((t) => (
                <div
                  className="flex bg-secondary p-5 text-white rounded-2xl w-full items-center justify-between"
                  key={t.id}
                >
                  <div className="flex items-center gap-2.5">
                    {t.type === "income" ? (
                      <SouthWestRoundedIcon className="text-[24px]! text-green-400!" />
                    ) : (
                      <NorthEastRoundedIcon className="text-[24px]! text-red-400!" />
                    )}
                    <div className="flex flex-col">
                      <h4 className="font-bold text-slate-100 truncate">
                        {t.catatan || t.type === "income"
                          ? "Uang Masuk"
                          : "Uang Keluar"}
                      </h4>
                      <span className="font-medium text-slate-400">
                        {t.kategori} - {t.waktu}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`flex justify-center items-center ${t.type === "income" ? "text-green-400" : "text-red-400"} gap-2`}
                  >
                    <span className="font-bold">{rupiah(t.amount)}</span>
                  </div>
                </div>
              ))}

              {/* Total */}
              <div className="flex justify-between text-white bg-secondary p-4 rounded-xl">
                <span className="text-slate-400 text-sm">Total</span>
                <span className="font-bold">{rupiah(data.total)}</span>
              </div>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
