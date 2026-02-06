import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import MovingRoundedIcon from "@mui/icons-material/MovingRounded";
import { useState } from "react";

import { BarChart } from "@mui/x-charts/BarChart";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function Home() {
  const [age, setAge] = useState(2026);

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <>
      <main className="w-full p-5 flex bg-slate-400 flex-col">
        <section className="grid grid-cols-1 gap-2.5">
          <div className="flex flex-col gap-2 bg-slate-300 shadow-lg p-4 rounded-xl">
            <div className="flex items-center gap-2">
              <AccountBalanceWalletRoundedIcon className="text-secondaru" />
              <h1 className="text-lg text-secondary font-medium">Saldo</h1>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-secondary text-xl font-medium">Rp</span>
              <span className="text-secondary text-2xl font-bold">
                5.000.000
              </span>
            </div>
            <span className="text-sm font-medium">BCA M-Banking</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-2 bg-slate-300 p-2.5 rounded-xl">
              <div className="flex items-center gap-2">
                <MovingRoundedIcon className="text-green-700 -rotate-180 text-md!" />
                <h1 className=" text-text-green-900 text-sm">Uang Masuk</h1>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-secondary text-md font-medium">Rp</span>
                <span className="text-green-700 text-xl font-bold">
                  5.000.000
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2 bg-slate-300 p-2.5 rounded-xl">
              <div className="flex items-center gap-2">
                <TrendingUpRoundedIcon className="text-red-700 text-md!" />
                <h1 className=" text-text-red-900 text-sm">Uang Keluar</h1>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-secondary text-md font-medium">Rp</span>
                <span className="text-red-700 text-xl font-bold">
                  5.000.000
                </span>
              </div>
            </div>
          </div>
        </section>
        <section className="flex flex-col my-5 bg-slate-300 p-2.5 rounded-xl gap-2.5">
          <div className="flex items-center justify-between mb-5">
            <h1 className="text-secondary text-md font-medium">
              Pemasukkan Perbulan
            </h1>
            <Box sx={{ minWidth: 100 }}>
              <FormControl fullWidth>
                <Select
                  id="demo-simple-select"
                  value={age}
                  onChange={handleChange}
                  className="h-10"
                >
                  <MenuItem value={2026}>2026</MenuItem>
                  <MenuItem value={2025}>2025</MenuItem>
                  <MenuItem value={2024}>2024</MenuItem>
                  <MenuItem value={2023}>2023</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
          <div className="w-full">
            <BarChart
              className=" flex items-center justify-center"
              xAxis={[
                {
                  data: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "Mei",
                    "Jun",
                    "Jul",
                    "Agu",
                    "Sep",
                    "Okt",
                    "Nov",
                    "Des",
                  ],
                  type: "continuous",
                  color: ["green", "orange"],
                },
              ]}
              series={[{ data: [2, 5, 6, 5, 2, 5, 6, 5, 2, 5, 6, 5, 5] }]}
              height={200}
              yAxis={[
                {
                  width: 20,
                  colorMap: {
                    type: "continuous",
                    min: -20,
                    max: 5,
                    color: ["red", "green"],
                  },
                },
              ]}
            />
          </div>
        </section>
        <section className="flex flex-col mb-5 bg-slate-300 p-2.5 rounded-xl gap-2.5">
          <div className="flex items-center justify-between mb-5">
            <h1 className="text-secondary text-md font-medium">
              Pengeluaran Perbulan
            </h1>
            <Box sx={{ minWidth: 100 }}>
              <FormControl fullWidth>
                <Select
                  id="demo-simple-select"
                  value={age}
                  onChange={handleChange}
                  className="h-10"
                >
                  <MenuItem value={2026}>2026</MenuItem>
                  <MenuItem value={2025}>2025</MenuItem>
                  <MenuItem value={2024}>2024</MenuItem>
                  <MenuItem value={2023}>2023</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
          <div className="w-full">
            <BarChart
              className=" flex items-center justify-center"
              xAxis={[
                {
                  data: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "Mei",
                    "Jun",
                    "Jul",
                    "Agu",
                    "Sep",
                    "Okt",
                    "Nov",
                    "Des",
                  ],
                },
              ]}
              series={[{ data: [2, 5, 6, 5, 2, 5, 6, 5, 2, 5, 6, 5, 5] }]}
              height={200}
              yAxis={[
                {
                  width: 20,
                  colorMap: {
                    type: "continuous",
                    min: -20,
                    max: 50,
                    color: ["red", "green"],
                  },
                },
              ]}
            />
          </div>
        </section>
      </main>
    </>
  );
}
