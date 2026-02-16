import { useState } from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";

import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import AddCardRoundedIcon from "@mui/icons-material/AddCardRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { getImagesProfile } from "../utils/imageLoader";
import { getImagesWallet } from "../utils/imageLoader";
import { getImagesBank } from "../utils/imageLoader";

import Navbar from "../components/navbar";

export default function Rekening() {
  const nav = useNavigate();
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("rekening")),
  );
  const [form, setForm] = useState({
    fullname: "",
    cardNumber: "",
    balance: "",
    type: "",
    label: "",
    provider: "",
    isActive: true,
    isDefault: false,
  });
  const providerOptions = {
    bank: [
      { value: "bri", label: "Bank BRI" },
      { value: "bca", label: "Bank BCA" },
      { value: "jago", label: "Bank Jago" },
      { value: "jenius", label: "Bank Jenius" },
      { value: "seabank", label: "Seabank" },
      { value: "mandiri", label: "Bank Mandiri" },
      { value: "neobank", label: "Neobank" },
    ],
    "e-wallet": [
      { value: "dana", label: "Dana" },
      { value: "ovo", label: "Ovo" },
      { value: "gopay", label: "Gopay" },
      { value: "shopeepay", label: "ShopeePay" },
      { value: "linkaja", label: "LinkAja" },
    ],
    debit: [
      { value: "visa", label: "Visa" },
      { value: "master_card", label: "Master Card" },
    ],
  };

  const handleChangeActive = (id) => {
    const existing = JSON.parse(localStorage.getItem("rekening")) || [];

    const updateData = existing.map((item) =>
      item.id === id
        ? {
            ...item,
            isActive: !item.isActive,
          }
        : item,
    );

    localStorage.setItem("rekening", JSON.stringify(updateData));
    setData(updateData);
  };

  const handleChangeDefault = (id) => {
    const existing = JSON.parse(localStorage.getItem("rekening")) || [];

    const updateData = existing.map((item) => ({
      ...item,
      isDefault: item.id === id,
    }));

    localStorage.setItem("rekening", JSON.stringify(updateData));
    setData(updateData);
  };

  const handleChangeType = (event) => {
    const selectedType = event.target.value;

    setForm((prev) => ({
      ...prev,
      type: selectedType,
      provider: "",
    }));
  };
  const handleChangeProvider = (event) => {
    const selectedValue = event.target.value;

    const selectedProvider = providerOptions[form.type]?.find(
      (item) => item.value === selectedValue,
    );
    setForm({
      ...form,
      provider: selectedValue,
      label: selectedProvider?.label || "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.fullname === "") return toast.error("Nama Rekening Wajib Diisi!");
    if (form.cardNumber === 0)
      return toast.error("Nomor Rekening Wajib Diisi!");
    if (form.type === "") return toast.error("Jenis Rekening Wajib Diisi!");

    const existingData = JSON.parse(localStorage.getItem("rekening")) || [];

    const isDefault = existingData?.length === 0 ? true : false;

    const existing = existingData?.find(
      (item) =>
        item.fullname === form.fullname &&
        item.provider === form.provider &&
        item.cardNumber === form.cardNumber,
    );

    if (existing) return toast.error("Nomor rekening sudah ditambahkan!");

    const newData = {
      id: Date.now(),
      fullname: form.fullname,
      cardNumber: Number(form.cardNumber),
      type: form.type,
      balance: Number(form.balance),
      label: form.label,
      provider: form.provider,
      isActive: form.isActive,
      isDefault,
    };

    const addData = [...existingData, newData];

    localStorage.setItem("rekening", JSON.stringify(addData));
    setForm({
      fullname: "",
      cardNumber: 0,
      type: "",
      balance: 0,
      label: "",
      provider: "",
      isActive: true,
      isDefault: false,
    });
    toast.success("Rekening Berhasil Ditambahkan!");
    setData(addData);
  };

  const handleDelete = (id) => {
    const existingData = JSON.parse(localStorage.getItem("rekening")) || [];

    const filtered = existingData.filter((item) => item.id != id);

    localStorage.setItem("rekening", JSON.stringify(filtered));
    toast.success("Rekening Berhasil Dihapus!");
    setData(filtered);
  };

  return (
    <main className="relative pb-12.5 w-full z-500 overflow-y-scroll h-screen bg-slate-400 ">
      <header className="sticky top-0 text-white left-0 z-500 mb-10 p-5 w-full h-20 bg-secondary flex items-center justify-center">
        <button className=" absolute left-5" onClick={() => nav(-1)}>
          <KeyboardBackspaceRoundedIcon className="text-3xl!" />
        </button>
        <h2 className="font-bold text-lg">Atur Rekening</h2>
      </header>
      <main className="w-full flex flex-col gap-5 px-5">
        <Accordion className="bg-slate-300! rounded-lg! text-secondary!">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon className="text-secondary" />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <div className="flex  items-center gap-2.5">
              <AddCardRoundedIcon className="text-4xl!" />
              <h1 className="font-medium text-lg">Tambah Rekening</h1>
            </div>
          </AccordionSummary>
          <form onSubmit={handleSubmit}>
            <AccordionDetails className={`flex flex-col gap-5`}>
              <div className="flex items-center justify-center relative">
                <input
                  type="text"
                  id="name"
                  placeholder=" "
                  value={form.fullname}
                  autoComplete="off"
                  onChange={(e) =>
                    setForm({ ...form, fullname: e.target.value })
                  }
                  className=" peer text-lg! font-medium! outline-2 outline-primary focus:outline-secondary not-placeholder-shown:outline-secondary rounded-lg w-full h-12 px-5"
                />
                <label
                  htmlFor="name"
                  className="absolute left-5 px-2 text-lg peer-focus:bg-slate-300 peer-focus:left-2.5 peer-focus:text-xs peer-focus:-translate-y-6.25 peer-not-placeholder-shown:bg-slate-300 peer-not-placeholder-shown:left-2.5 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-6.25 font-medium!"
                >
                  Nama Rekening
                </label>
              </div>

              <FormControl fullWidth>
                <InputLabel
                  id="type-label"
                  sx={{
                    backgroundColor:
                      form.type !== "" ? "#cad5e2" : "transparent",
                    color: form.type !== "" ? "#314158" : "#314158",
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
                  Jenis Rekening
                </InputLabel>

                <Select
                  labelId="type-label"
                  id="simple-select"
                  value={form.type}
                  label="Jenis Rekening"
                  onChange={handleChangeType}
                  className="text-secondary! font-bold! rounded-lg!"
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: form.type ? "#314158" : "#314158", // hijau kalau ada value
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
                  <MenuItem value={"bank"}>Bank Indonesia</MenuItem>
                  <MenuItem value={"e-wallet"}>E-wallet</MenuItem>
                  <MenuItem value={"debit"}>Debit / Kartu Kredit</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel
                  id="provider-label"
                  sx={{
                    backgroundColor:
                      form.provider !== "" ? "#cad5e2" : "transparent",
                    color: form.provider !== "" ? "#314158" : "#314158",
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
                  Jenis Provider
                </InputLabel>

                <Select
                  labelId="provider-label"
                  value={form.provider || ""}
                  onChange={handleChangeProvider}
                  disabled={!form.type}
                  className="text-secondary! font-bold! rounded-lg!"
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: form.provider ? "#314158" : "#314158", // hijau kalau ada value
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

                  {(providerOptions[form.type] || []).map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <div className="flex items-center justify-center relative">
                <input
                  type="number"
                  value={form.cardNumber}
                  id="number"
                  autoComplete="off"
                  placeholder=" "
                  onChange={(e) =>
                    setForm({ ...form, cardNumber: e.target.value })
                  }
                  className=" peer text-lg! font-medium! outline-2 outline-primary focus:outline-secondary not-placeholder-shown:outline-secondary rounded-lg w-full h-12 px-5"
                />
                <label
                  htmlFor="number"
                  className="absolute left-5 px-2 text-lg peer-focus:bg-slate-300 peer-focus:left-2.5 peer-focus:text-xs peer-focus:-translate-y-6.25 peer-not-placeholder-shown:bg-slate-300 peer-not-placeholder-shown:left-2.5 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-6.25 font-medium!"
                >
                  Nomor Rekening
                </label>
              </div>
              <div className="flex items-center justify-center relative">
                <input
                  type="number"
                  value={form.balance}
                  id="balance"
                  autoComplete="off"
                  placeholder=" "
                  onChange={(e) =>
                    setForm({ ...form, balance: e.target.value })
                  }
                  className=" peer text-lg! font-medium! outline-2 outline-primary focus:outline-secondary not-placeholder-shown:outline-secondary rounded-lg w-full h-12 px-5"
                />
                <label
                  htmlFor="balance"
                  className="absolute left-5 px-2 text-lg peer-focus:bg-slate-300 peer-focus:left-2.5 peer-focus:text-xs peer-focus:-translate-y-6.25 peer-not-placeholder-shown:bg-slate-300 peer-not-placeholder-shown:left-2.5 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-6.25 font-medium!"
                >
                  Saldo Rekening
                </label>
              </div>
            </AccordionDetails>
            <AccordionActions>
              <Button
                type="submit"
                className="text-white! bg-secondary! w-37.5! h-12! rounded-md! font-bold!"
              >
                Tambah
              </Button>
            </AccordionActions>
          </form>
        </Accordion>
        {Array.isArray(data) &&
          data.map((rek, i) => {
            return (
              <Accordion
                className="bg-slate-300! rounded-lg! text-secondary!"
                key={i}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon className="text-secondary" />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <div className="flex  items-center gap-2.5">
                    <img
                      src={getImagesWallet("dana-ewallet.webp")}
                      alt="Dana E-wallet"
                      className="w-12.5 h-12.5 object-cover rounded-full"
                    />
                    <div className="flex flex-col">
                      <h1 className="font-bold text-lg capitalize">
                        {rek.label}
                      </h1>
                      <span className="text-md font-medium">
                        {rek.fullname}
                      </span>
                      <span className="text-md font-medium">
                        {rek.cardNumber}
                      </span>
                    </div>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox checked={rek.isActive} />}
                      onChange={() => handleChangeActive(rek.id)}
                      label="Aktif"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={rek.isDefault} />}
                      onChange={() => handleChangeDefault(rek.id)}
                      label="Jadikan sebagai default"
                    />
                  </FormGroup>
                  <Button
                    className="flex items-center bg-red-500/10! capitalize! text-red-500! p-2.5!"
                    onClick={() => handleDelete(rek.id)}
                  >
                    <DeleteRoundedIcon />
                    <span>Hapus</span>
                  </Button>
                </AccordionDetails>
              </Accordion>
            );
          })}
      </main>
    </main>
  );
}
