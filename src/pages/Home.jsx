import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import MovingRoundedIcon from "@mui/icons-material/MovingRounded";
import SyncAltRoundedIcon from "@mui/icons-material/SyncAltRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";

import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import SouthWestRoundedIcon from "@mui/icons-material/SouthWestRounded";
import { useEffect, useState } from "react";

import Radio from "@mui/material/Radio";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";

import { BarChart } from "@mui/x-charts/BarChart";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

import Modal from "../components/modal";
import InputField from "../components/InputField";
import Numpad from "../components/Numpad";

import { ProviderIcons } from "../utils/providerIcons";
import { rupiah } from "../utils/rupiah";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { v4 as uuidv4 } from "uuid";

function addTransaction(newTransaction) {
  const transaction = JSON.parse(localStorage.getItem("transaksi")) || [];

  const updated = [...transaction, newTransaction];

  localStorage.setItem("transaksi", JSON.stringify(updated));

  return updated; // ← INI YANG KURANG
}

export default function Home() {
  const [age, setAge] = useState(2026);
  const [visible, setVisible] = useState(false);
  const [ModalOpen, setModalOpen] = useState(false);
  const [ModalType, setModalType] = useState("");
  const [SubModalOpen, setSubModalOpen] = useState(false);
  const [SubModalType, setSubModalType] = useState("");
  const [number, setNumber] = useState("");
  const [rekening, setRekening] = useState(
    JSON.parse(localStorage.getItem("rekening")) || [],
  );
  const [topup, setTopup] = useState(
    JSON.parse(localStorage.getItem("rekening"))?.find(
      (item) => item.isDefault,
    ) || [],
  );
  const [saldo, setSaldo] = useState(
    rekening.reduce((acc, item) => acc + item.balance, 0),
  );
  const [totalIncome, setTotalIncome] = useState(() => {
    const transaksi = JSON.parse(localStorage.getItem("transaksi")) || [];
    return transaksi
      .filter((t) => t.type === "income")
      .reduce((acc, t) => acc + t.amount, 0);
  });

  const [totalExpense, setTotalExpense] = useState(() => {
    const transaksi = JSON.parse(localStorage.getItem("transaksi")) || [];
    return transaksi
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => acc + t.amount, 0);
  });

  const [form, setForm] = useState({
    type: "",
    kategori: "",
    fromAccountId: topup.id,
    toAccountId: "",
    amount: 0,
    catatan: "",
    tanggal: new Date().toISOString().split("T")[0],
    accountId: topup?.id,
  });

  const handleChangeType = (event) => {
    setForm((prev) => ({
      ...prev,
      kategori: "",
    }));
    const selectedType = event.target.value;

    setForm((prev) => ({
      ...prev,
      kategori: selectedType,
    }));
  };

  const handleChangeFrom = (event) => {
    const selectedType = event.target.value;

    setTopup(null);
    const existing = JSON.parse(localStorage.getItem("rekening")) || [];

    const updateData = existing.map((item) => ({
      ...item,
      isDefault: item.id === selectedType,
    }));

    const topupData = updateData?.find((item) => item.isDefault === true);

    setForm((prev) => ({
      ...prev,
      fromAccountId: selectedType,
    }));

    localStorage.setItem("rekening", JSON.stringify(updateData));
    setRekening(updateData);
    setTopup(topupData);
  };

  const handleChangeTo = (event) => {
    const selectedType = event.target.value;

    setForm((prev) => ({
      ...prev,
      toAccountId: selectedType,
    }));
  };

  const handleChangeDefault = (id) => {
    setTopup(null);
    const existing = JSON.parse(localStorage.getItem("rekening")) || [];

    const updateData = existing.map((item) => ({
      ...item,
      isDefault: item.id === id,
    }));

    const topupData = updateData?.find((item) => item.isDefault === true);

    localStorage.setItem("rekening", JSON.stringify(updateData));
    setRekening(updateData);
    setTopup(topupData);
  };

  const processIncome = (accounts, amount, accountId) => {
    return accounts.map((acc) =>
      acc.id === accountId ? { ...acc, balance: acc.balance + amount } : acc,
    );
  };

  const processExpense = (accounst, amount, accountId) => {
    return accounst.map((acc) =>
      acc.id === accountId ? { ...acc, balance: acc.balance - amount } : acc,
    );
  };

  const processTransfer = (accounts, amount, fromId, toId) => {
    return accounts.map((acc) => {
      if (acc.id === fromId) {
        return { ...acc, balance: acc.balance - amount };
      }
      if (acc.id === toId) {
        return { ...acc, balance: acc.balance + amount };
      }
      return acc;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setForm({
      type: "",
      kategori: "",
      fromAccountId: topup?.id,
      toAccountId: "",
      amount: "",
      catatan: "",
      tanggal: new Date().toISOString().split("T")[0],
      accountId: topup?.id,
    });

    const accounts = JSON.parse(localStorage.getItem("rekening")) || [];
    const amount = Number(number);

    if (accounts?.length === 0)
      return toast.error("Tambahkan rekening terlebih dahulu");

    if (amount <= 0) return toast.error("Masukkan jumlah saldo");

    let updateAccounts;

    if (ModalType === "income") {
      updateAccounts = processIncome(accounts, amount, form.accountId);
    }

    if (ModalType === "expense") {
      const fromAccount = accounts.find((acc) => acc.id === topup.id);

      if (!fromAccount) return toast.error("Rekening sumber tidak ditemukan!");

      if (amount > fromAccount.balance)
        return toast.error("Saldo anda kurang!");
      updateAccounts = processExpense(accounts, amount, form.accountId);
    }

    if (ModalType === "transfer") {
      if (form.fromAccountId === form.toAccountId)
        return toast.error("Tidak bisa transfer ke rekening yang sama");

      const fromAccount = accounts.find((acc) => acc.id === topup.id);

      if (!fromAccount) return toast.error("Rekening sumber tidak ditemukan!");

      if (amount > fromAccount.balance)
        return toast.error("Saldo anda kurang!");

      updateAccounts = processTransfer(
        accounts,
        amount,
        form.fromAccountId,
        form.toAccountId,
      );
    }
    const now = new Date();

    const newTransaction = {
      id: uuidv4(),
      type: ModalType,
      accountId: form.accountId,
      fromAccountId: form.fromAccountId || null,
      toAccountId: form.toAccountId || null,
      amount,
      kategori: form.kategori,
      tanggal: form.tanggal,
      waktu: now.toTimeString().slice(0, 5),
      createdAt: now.toISOString(),
      catatan: form.catatan,
    };

    const topupData = updateAccounts?.find((item) => item.isDefault === true);

    localStorage.setItem("rekening", JSON.stringify(updateAccounts));
    const updatedTransactions = addTransaction(newTransaction);
    const totalIncomeUpdate = updatedTransactions
      ?.filter((t) => t.type === "income")
      .reduce((acc, t) => acc + t.amount, 0);
    const totalExpenseUpdate = updatedTransactions
      ?.filter((t) => t.type === "expense")
      .reduce((acc, t) => acc + t.amount, 0);
    setRekening(updateAccounts);
    setSaldo(updateAccounts.reduce((acc, item) => acc + item.balance, 0));
    setTopup(topupData);
    setTotalIncome(totalIncomeUpdate);
    setTotalExpense(totalExpenseUpdate);

    toast.success("Pemasukkan berhasil ditambahkan!");
    setModalOpen(false);
    setModalType("");
    setNumber("");
    setForm({
      type: "",
      kategori: "",
      fromAccountId: topup?.id,
      toAccountId: "",
      amount: "",
      catatan: "",
      tanggal: new Date().toISOString().split("T")[0],
      accountId: topup?.id,
    });
  };

  console.log(topup);
  // console.log(rekening);

  useEffect(() => {
    if (!ModalOpen) return;

    if (ModalOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [ModalOpen]);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <>
      <main className="px-5 pt-5">
        <section className="grid grid-cols-1 gap-2.5">
          <div className="flex flex-col gap-2 bg-secondary shadow-lg p-4 rounded-xl">
            <div className="flex items-center gap-2">
              <AccountBalanceWalletRoundedIcon className="text-slate-300!" />
              <h1 className="text-lg text-slate-300 font-medium">Saldo</h1>
            </div>
            <div className="flex items-center gap-1">
              {visible ? (
                <span className="text-slate-300 text-2xl font-bold">
                  {rupiah(saldo)}
                </span>
              ) : (
                <span className="text-slate-300 text-2xl font-bold">
                  Rp *********
                </span>
              )}
              <VisibilityRoundedIcon
                onClick={() => setVisible(!visible)}
                className={visible ? "text-slate-300" : "text-primary"}
              />
            </div>
            <div className="grid mt-2.5 grid-cols-3 gap-5">
              <div
                className="flex flex-col items-center text-slate-300! justify-center gap-1"
                onClick={() => {
                  setModalOpen(true);
                  setModalType("income");
                }}
              >
                <SouthWestRoundedIcon />
                <span>Masuk</span>
              </div>
              <div
                className="flex flex-col items-center justify-center text-slate-300! gap-1"
                onClick={() => {
                  setModalOpen(true);
                  setModalType("expense");
                }}
              >
                <ArrowOutwardRoundedIcon />
                <span>Keluar</span>
              </div>
              <div
                className="flex flex-col items-center justify-center gap-1 text-slate-300!"
                onClick={() => {
                  setModalOpen(true);
                  setModalType("transfer");
                }}
              >
                <SyncAltRoundedIcon />
                <span>Transfer</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-2 bg-secondary p-2.5 rounded-xl">
              <div className="flex items-center gap-2">
                <MovingRoundedIcon className="text-green-400 -rotate-180 text-md!" />
                <h1 className="text-slate-300 text-sm">Uang Masuk</h1>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-green-400 text-xl font-bold">
                  {rupiah(totalIncome)}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2 bg-secondary p-2.5 rounded-xl">
              <div className="flex items-center gap-2">
                <TrendingUpRoundedIcon className="text-red-400 text-md!" />
                <h1 className="text-slate-300 text-sm">Uang Keluar</h1>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-red-400 text-xl font-bold">
                  {rupiah(totalExpense)}
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
              series={[{ data: [2, 5, 6, 5, 2, 5, 6, 5, 2, 5, 6, 5] }]}
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
              series={[{ data: [2, 5, 6, 5, 2, 5, 6, 5, 2, 5, 6, 5] }]}
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

      <Modal
        styles={`flex items-center justify-center 
         fixed top-0 left-0 z-50 w-full ${ModalOpen && ModalType === "income" ? "animation-menu-in scale-100" : "scale-0 animation-menu-out"} `}
      >
        <form
          className="flex flex-col w-full pb-10 overflow-y-scroll h-screen bg-slate-200"
          onSubmit={handleSubmit}
        >
          <header className="flex items-center sticky top-0 left-0 z-50 justify-center  bg-secondary text-slate-100  p-5">
            <KeyboardBackspaceRoundedIcon
              className="absolute text-3xl! left-5"
              onClick={() => {
                setModalOpen(false);
                setModalType("");
                setSubModalOpen(false);
                setSubModalType("");
                setNumber("");
                setForm({
                  type: "",
                  kategori: "",
                  fromAccountId: topup?.id,
                  toAccountId: "",
                  amount: "",
                  catatan: "",
                  tanggal: new Date().toISOString().split("T")[0],
                  accountId: topup?.id,
                });
              }}
            />
            <h1 className="font-bold text-lg">Uang Masuk</h1>
          </header>
          {topup?.length !== 0 && (
            <div className="flex bg-slate-100 w-full items-center p-5 justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={ProviderIcons[topup.provider]}
                  alt="Dana E-Wallet"
                  className="object-contain w-12 h-12 rounded-full"
                />
                <div className="flex flex-col">
                  <h4 className="font-bold">{topup.label}</h4>
                  <h4 className="font-medium text-sm">{topup.fullname}</h4>
                  <span className="font-medium text-sm">
                    {topup.cardNumber}
                  </span>
                </div>
              </div>
              <Button
                className={`capitalize! text-md! p-2.5! rounded-lg!  font-medium!   ${SubModalOpen && SubModalType === "change" ? "bg-secondary! text-white!" : "bg-slate-100! text-slate-600!"} `}
                onClick={() => {
                  setSubModalOpen(!SubModalOpen);
                  setSubModalType("change");
                }}
              >
                Ganti
              </Button>
            </div>
          )}

          <div className="px-5 flex flex-col gap-5 my-5 w-full">
            <FormControl fullWidth>
              <InputLabel
                id="type-label"
                sx={{
                  backgroundColor:
                    form.kategori !== "" ? "#cad5e2" : "transparent",
                  color: form.kategori !== "" ? "#314158" : "#314158",
                  "&:hover": {
                    backgroundColor: "#cad5e2",
                    color: "#314158",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "#cad5e2",
                    color: "#314158",
                  },
                  px: 1,
                }}
                className="text-lg! font-medium!"
              >
                Jenis Pemasukkan
              </InputLabel>

              <Select
                labelId="kategori-label"
                id="simple-select"
                value={form.kategori}
                label="Jenis Rekening"
                onChange={handleChangeType}
                className="text-secondary! font-bold! rounded-lg!"
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: form.kategori ? "#314158" : "#314158", // hijau kalau ada value
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#cad5e2",
                  },
                  "& .MuiSelect-icon": {
                    color: "#314158",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#314158",
                  },
                }}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value={"gaji"}>Gaji</MenuItem>
                <MenuItem value={"dapat_transfer"}>Dapat Transfer</MenuItem>
                <MenuItem value={"jual_barang"}>Jual Barang</MenuItem>
              </Select>
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                onChange={(value) =>
                  setForm({
                    ...form,
                    tanggal: value ? value.format("YYYY-MM-DD") : "",
                  })
                }
              />
            </LocalizationProvider>

            <div className="flex items-center justify-center relative">
              <textarea
                value={form.catatan}
                id="catatan"
                autoComplete="off"
                placeholder=" "
                onChange={(e) => setForm({ ...form, catatan: e.target.value })}
                className=" peer text-lg! font-medium! outline-2 outline-primary focus:outline-secondary not-placeholder-shown:outline-secondary rounded-lg w-full h-37.5 p-5"
              ></textarea>
              <label
                htmlFor="catatan"
                className="absolute top-5 left-5 px-2 text-lg peer-focus:bg-slate-300 peer-focus:left-2.5 peer-focus:text-xs peer-focus:-translate-y-7.5 peer-not-placeholder-shown:bg-slate-300 peer-not-placeholder-shown:left-2.5 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-7.5 font-medium!"
              >
                Catatan
              </label>
            </div>
          </div>

          <section className="w-full bg-red-500  flex-col flex items-center">
            <div className="relative w-full">
              <label
                htmlFor="input-number"
                className="absolute font-bold text-3xl top-[50%] left-12.5 -translate-y-[50%]"
              >
                Rp
              </label>
              <InputField
                id={"input-number"}
                styles={
                  "bg-slate-200 w-full h-[150px] border-none outline-none flex pl-[100px] pr-[30px] font-bold text-3xl"
                }
                value={number}
              />
            </div>
            <Numpad
              value={number}
              onChange={(va) => {
                setNumber(va);
                setSubModalOpen(false);
                setSubModalType("");
              }}
            />
          </section>
          <div className="flex items-center justify-center w-full px-5">
            <button
              className="w-full text-white font-bold text-lg rounded-full bg-secondary h-16"
              type="submit"
            >
              Tambahkan Pemasukkan
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        styles={`flex items-center justify-center 
         fixed top-0 left-0 z-50 w-full ${ModalOpen && ModalType === "expense" ? "animation-menu-in scale-100" : "scale-0 animation-menu-out"} `}
      >
        <form
          className="flex flex-col w-full pb-10 overflow-y-scroll h-screen bg-slate-200"
          onSubmit={handleSubmit}
        >
          <header className="flex items-center sticky top-0 left-0 z-50 justify-center  bg-secondary text-slate-100  p-5">
            <KeyboardBackspaceRoundedIcon
              className="absolute text-3xl! left-5"
              onClick={() => {
                setModalOpen(false);
                setModalType("");
                setSubModalOpen(false);
                setSubModalType("");
                setNumber("");
                setForm({
                  type: "",
                  kategori: "",
                  fromAccountId: topup?.id,
                  toAccountId: "",
                  amount: "",
                  catatan: "",
                  tanggal: new Date().toISOString().split("T")[0],
                  accountId: topup?.id,
                });
              }}
            />
            <h1 className="font-bold text-lg">Uang Keluar</h1>
          </header>
          {topup?.length !== 0 && (
            <div className="flex bg-slate-100 w-full items-center p-5 justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={ProviderIcons[topup.provider]}
                  alt="Dana E-Wallet"
                  className="object-contain w-12 h-12 rounded-full"
                />
                <div className="flex flex-col">
                  <h4 className="font-bold">{topup.label}</h4>
                  <h4 className="font-medium text-sm">{topup.fullname}</h4>
                  <span className="font-medium text-sm">
                    {topup.cardNumber}
                  </span>
                </div>
              </div>
              <Button
                className={`capitalize! text-md! p-2.5! rounded-lg!  font-medium!   ${SubModalOpen && SubModalType === "change" ? "bg-secondary! text-white!" : "bg-slate-100! text-slate-600!"} `}
                onClick={() => {
                  setSubModalOpen(!SubModalOpen);
                  setSubModalType("change");
                }}
              >
                Ganti
              </Button>
            </div>
          )}

          <div className="px-5 flex flex-col gap-5 my-5 w-full">
            <FormControl fullWidth>
              <InputLabel
                id="type-label"
                sx={{
                  backgroundColor:
                    form.kategori !== "" ? "#cad5e2" : "transparent",
                  color: form.kategori !== "" ? "#314158" : "#314158",
                  "&:hover": {
                    backgroundColor: "#cad5e2",
                    color: "#314158",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "#cad5e2",
                    color: "#314158",
                  },
                  px: 1,
                }}
                className="text-lg! font-medium!"
              >
                Jenis Pengeluaran
              </InputLabel>

              <Select
                labelId="kategori-label"
                id="simple-select"
                value={form.kategori}
                label="Jenis Rekening"
                onChange={handleChangeType}
                className="text-secondary! font-bold! rounded-lg!"
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: form.kategori ? "#314158" : "#314158", // hijau kalau ada value
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#cad5e2",
                  },
                  "& .MuiSelect-icon": {
                    color: "#314158",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#314158",
                  },
                }}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value={"beli_kopi"}>Beli Kopi</MenuItem>
                <MenuItem value={"bayar_listrik"}>Bayar Listrik</MenuItem>
                <MenuItem value={"transfer_ke_teman"}>
                  Transfer Ke Teman
                </MenuItem>
              </Select>
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker />
            </LocalizationProvider>

            <div className="flex items-center justify-center relative">
              <textarea
                value={form.catatan}
                id="catatan"
                autoComplete="off"
                placeholder=" "
                onChange={(e) => setForm({ ...form, catatan: e.target.value })}
                className=" peer text-lg! font-medium! outline-2 outline-primary focus:outline-secondary not-placeholder-shown:outline-secondary rounded-lg w-full h-37.5 p-5"
              ></textarea>
              <label
                htmlFor="catatan"
                className="absolute top-5 left-5 px-2 text-lg peer-focus:bg-slate-300 peer-focus:left-2.5 peer-focus:text-xs peer-focus:-translate-y-7.5 peer-not-placeholder-shown:bg-slate-300 peer-not-placeholder-shown:left-2.5 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-7.5 font-medium!"
              >
                Catatan
              </label>
            </div>
          </div>

          <section className="w-full bg-red-500  flex-col flex items-center">
            <div className="relative w-full">
              <label
                htmlFor="input-number"
                className="absolute font-bold text-3xl top-[50%] left-12.5 -translate-y-[50%]"
              >
                Rp
              </label>
              <InputField
                id={"input-number"}
                styles={
                  "bg-slate-200 w-full h-[150px] border-none outline-none flex pl-[100px] pr-[30px] font-bold text-3xl"
                }
                value={number}
              />
            </div>
            <Numpad
              value={number}
              onChange={(va) => {
                setNumber(va);
                setSubModalOpen(false);
                setSubModalType("");
              }}
            />
          </section>
          <div className="flex items-center justify-center w-full px-5">
            <button
              className="w-full text-white font-bold text-lg rounded-full bg-secondary h-16"
              type="submit"
            >
              Tambahkan Pengeluaran
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        styles={`flex items-center justify-center 
         fixed top-0 left-0 z-50 w-full ${ModalOpen && ModalType === "transfer" ? "animation-menu-in scale-100" : "scale-0 animation-menu-out"} `}
      >
        <form
          className="flex flex-col w-full pb-10 overflow-y-scroll h-screen bg-slate-200"
          onSubmit={handleSubmit}
        >
          <header className="flex items-center sticky top-0 left-0 z-50 justify-center  bg-secondary text-slate-100  p-5">
            <KeyboardBackspaceRoundedIcon
              className="absolute text-3xl! left-5"
              onClick={() => {
                setModalOpen(false);
                setModalType("");
                setSubModalOpen(false);
                setSubModalType("");
                setNumber("");
                setForm({
                  type: "",
                  kategori: "",
                  fromAccountId: topup?.id,
                  toAccountId: "",
                  amount: "",
                  catatan: "",
                  tanggal: new Date().toISOString().split("T")[0],
                  accountId: topup?.id,
                });
              }}
            />
            <h1 className="font-bold text-lg">Transfer Uang</h1>
          </header>

          <div className="px-5 flex flex-col gap-5 my-5 w-full">
            <FormControl fullWidth>
              <InputLabel
                id="type-label"
                sx={{
                  backgroundColor:
                    form.fromAccountId !== "" ? "#cad5e2" : "transparent",
                  color: form.fromAccountId !== "" ? "#314158" : "#314158",
                  "&:hover": {
                    backgroundColor: "#cad5e2",
                    color: "#314158",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "#cad5e2",
                    color: "#314158",
                  },
                  px: 1,
                }}
                className="text-lg! font-medium!"
              >
                Dari Rekening
              </InputLabel>

              <Select
                labelId="fromAccountId-label"
                id="simple-select"
                value={form.fromAccountId || topup.id}
                label="Jenis Rekening"
                onChange={handleChangeFrom}
                className="text-secondary! font-bold! rounded-lg!"
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: form.fromAccountId ? "#314158" : "#314158", // hijau kalau ada value
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#cad5e2",
                  },
                  "& .MuiSelect-icon": {
                    color: "#314158",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#314158",
                  },
                }}
              >
                <MenuItem value="">None</MenuItem>
                {Array.isArray(rekening) &&
                  rekening.map((rek, id) => (
                    <MenuItem value={rek.id} key={rek.id}>
                      {rek.label}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel
                id="type-label"
                sx={{
                  backgroundColor:
                    form.toAccountId !== "" ? "#cad5e2" : "transparent",
                  color: form.toAccountId !== "" ? "#314158" : "#314158",
                  "&:hover": {
                    backgroundColor: "#cad5e2",
                    color: "#314158",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "#cad5e2",
                    color: "#314158",
                  },
                  px: 1,
                }}
                className="text-lg! font-medium!"
              >
                Ke Rekening
              </InputLabel>

              <Select
                labelId="toAccountId-label"
                id="simple-select"
                value={form.toAccountId}
                label="Jenis Rekening"
                onChange={handleChangeTo}
                className="text-secondary! font-bold! rounded-lg!"
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: form.toAccountId ? "#314158" : "#314158", // hijau kalau ada value
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#cad5e2",
                  },
                  "& .MuiSelect-icon": {
                    color: "#314158",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#314158",
                  },
                }}
              >
                <MenuItem value="">None</MenuItem>
                {Array.isArray(rekening) &&
                  rekening.map((rek, id) => (
                    <MenuItem value={rek.id} key={rek.id}>
                      {rek.label}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker />
            </LocalizationProvider>

            <div className="flex items-center justify-center relative">
              <textarea
                value={form.catatan}
                id="catatan"
                autoComplete="off"
                placeholder=" "
                onChange={(e) => setForm({ ...form, catatan: e.target.value })}
                className=" peer text-lg! font-medium! outline-2 outline-primary focus:outline-secondary not-placeholder-shown:outline-secondary rounded-lg w-full h-37.5 p-5"
              ></textarea>
              <label
                htmlFor="catatan"
                className="absolute top-5 left-5 px-2 text-lg peer-focus:bg-slate-300 peer-focus:left-2.5 peer-focus:text-xs peer-focus:-translate-y-7.5 peer-not-placeholder-shown:bg-slate-300 peer-not-placeholder-shown:left-2.5 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-7.5 font-medium!"
              >
                Catatan
              </label>
            </div>
          </div>

          <section className="w-full  flex-col flex items-center">
            <div className="relative w-full">
              <label
                htmlFor="input-number"
                className="absolute font-bold text-3xl top-[50%] left-12.5 -translate-y-[50%]"
              >
                Rp
              </label>
              <span className="absolute font-medium text-secondary/80 text-md w-full flex items-center justify-center text-center left-[50%] -translate-x-2/4 top-[70%]">
                Saldo Tersedia: {rupiah(topup.balance)}
              </span>
              <InputField
                id={"input-number"}
                styles={
                  "bg-slate-200 w-full h-[150px] border-none outline-none flex pl-[100px] pr-[30px] font-bold text-3xl"
                }
                value={number}
              />
            </div>
            <Numpad
              value={number}
              onChange={(va) => {
                setNumber(va);
                setSubModalOpen(false);
                setSubModalType("");
              }}
            />
          </section>
          <div className="flex items-center justify-center w-full px-5">
            <button
              className="w-full text-white font-bold text-lg rounded-full bg-secondary h-16"
              type="submit"
            >
              Transfer Saldo
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        styles={`w-full z-500 px-10 fixed top-40 ${SubModalOpen && SubModalType === "change" ? "animaion-menu-in scale-100" : "animation-menu-out scale-0"}`}
      >
        <main className="w-full bg-white rounded-2xl p-5">
          <FormControl className="gap-y-2! w-full">
            <FormLabel id="demo-radio-buttons-group-label">
              Pilih Alamat Rekening
            </FormLabel>
            {Array.isArray(rekening) &&
              rekening.map((rek, i) => (
                <FormGroup
                  key={rek.id}
                  className=" flex! items-center! relative! flex-row! w-full!"
                >
                  <FormControlLabel
                    value={rek.provider}
                    control={<Radio checked={rek.isDefault} />}
                    onChange={() => handleChangeDefault(rek.id)}
                    label={rek.label}
                    className="w-full! z-20"
                  ></FormControlLabel>
                  <span className="font-bold absolute top-0 left-20">
                    {rek.fullname}
                  </span>
                  <span className="absolute left-20 top-0 translate-y-5">
                    {rek.cardNumber}
                  </span>
                </FormGroup>
              ))}
          </FormControl>
        </main>
      </Modal>
    </>
  );
}
