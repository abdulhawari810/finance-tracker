import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import MovingRoundedIcon from "@mui/icons-material/MovingRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import SyncAltRoundedIcon from "@mui/icons-material/SyncAltRounded";
import AddCardRoundedIcon from "@mui/icons-material/AddCardRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
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

import Modal from "../components/modal";
import InputField from "../components/InputField";
import Numpad from "../components/Numpad";

import { ProviderIcons } from "../utils/providerIcons";
import { rupiah } from "../utils/rupiah";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";

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

  console.log(saldo);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const existing = JSON.parse(localStorage.getItem("rekening")) || [];
    if (number === 0) return toast.error("Masukkan jumlah saldo!");

    if (existing?.length === 0)
      return toast.error("Tambah rekening terlebih dahulu!");

    const updateData = existing.map((item) => {
      if (item.id === topup.id) {
        return {
          ...item,
          balance: Number(item.balance) + Number(number),
        };
      }
      return item;
    });

    const rek = localStorage.setItem("rekening", JSON.stringify(updateData));
    setRekening(updateData);
    setSaldo(updateData.reduce((acc, item) => acc + item.balance, 0));

    toast.success("Topup Saldo Berhasil!");
    setModalOpen(false);
    setModalType("");
    setNumber("");
  };

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
      <main className="w-full p-5 flex bg-slate-400 flex-col">
        <section className="grid grid-cols-1 gap-2.5">
          <div className="flex flex-col gap-2 bg-slate-300 shadow-lg p-4 rounded-xl">
            <div className="flex items-center gap-2">
              <AccountBalanceWalletRoundedIcon className="text-secondaru" />
              <h1 className="text-lg text-secondary font-medium">Saldo</h1>
            </div>
            <div className="flex items-center gap-1">
              {visible ? (
                <span className="text-secondary text-2xl font-bold">
                  {rupiah(saldo)}
                </span>
              ) : (
                <span className="text-secondary text-2xl font-bold">
                  Rp *********
                </span>
              )}
              <VisibilityRoundedIcon
                onClick={() => setVisible(!visible)}
                className={visible ? "text-secondary" : "text-primary"}
              />
            </div>
            <div className="grid mt-2.5 grid-cols-3 gap-5">
              <div
                className="flex flex-col items-center justify-center gap-1"
                onClick={() => {
                  setModalOpen(true);
                  setModalType("topup");
                }}
              >
                <AddCircleRoundedIcon />
                <span>Topup</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1">
                <SyncAltRoundedIcon />
                <span>Transfer</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1">
                <AddCardRoundedIcon />
                <span>Terima</span>
              </div>
            </div>
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
         fixed top-0 left-0 z-50 w-full ${ModalOpen && ModalType === "topup" ? "animation-menu-in scale-100" : "scale-0 animation-menu-out"} `}
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
              }}
            />
            <h1 className="font-bold text-lg">Topup Saldo</h1>
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
              Tambahkan Saldo
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
