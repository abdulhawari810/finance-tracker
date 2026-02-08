import { useState } from "react";

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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { getImagesProfile } from "../utils/imageLoader";
import { getImagesWallet } from "../utils/imageLoader";
import { getImagesBank } from "../utils/imageLoader";

import Navbar from "../components/navbar";

export default function Rekening() {
  const data = JSON.parse(localStorage.getItem("rekening"));
  const [form, setForm] = useState({
    fullname: "",
    cardNumber: 0,
    type: "",
    provider: "",
    isActive: true,
    isDefault: false,
  });

  const handleChangeType = (event) => {
    const selectedType = event.target.value;

    setForm((prev) => ({
      ...prev,
      type: selectedType,
      provider: "",
    }));
  };
  const handleChangeProvider = (event) => {
    setForm({ ...form, provider: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.fullname === "") return toast.error("Nama Rekening Wajib Diisi!");
    if (form.cardNumber === 0)
      return toast.error("Nomor Rekening Wajib Diisi!");
    if (form.type === "") return toast.error("Jenis Rekening Wajib Diisi!");

    const existingData = JSON.parse(localStorage.getItem("rekening")) || [];

    const addData = [...existingData, form];

    localStorage.setItem("rekening", JSON.stringify(addData));
    setForm({
      fullname: "",
      cardNumber: 0,
      type: "",
      provider: "",
      isActive: true,
      isDefault: false,
    });
    toast.success("Rekening Berhasil Ditambahkan!");
  };

  const providerOptions = {
    bank: [
      { value: "BRI", label: "Bank BRI" },
      { value: "BCA", label: "Bank BCA" },
      { value: "Jago", label: "Bank Jago" },
      { value: "Jenius", label: "Bank Jenius" },
      { value: "Seabank", label: "Seabank" },
    ],
    "e-wallet": [
      { value: "Dana", label: "Dana" },
      { value: "Ovo", label: "Ovo" },
      { value: "Gopay", label: "Gopay" },
      { value: "ShopeePay", label: "ShopeePay" },
      { value: "LinkAja", label: "LinkAja" },
    ],
    debit: [
      { value: "Visa", label: "Visa" },
      { value: "Master Card", label: "Master Card" },
    ],
  };
  return (
    <main className="relative pb-[50px] w-full z-500 overflow-y-scroll bg-slate-400 ">
      <header className="sticky top-0 text-white left-0 z-500 mb-10 p-5 w-full h-20 bg-secondary flex items-center justify-center">
        <button
          className=" absolute left-5"
          onClick={() => {
            setModalOpen(false);
            setModalType("");
          }}
        >
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
                        {rek.provider} {rek.type}
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
                      control={<Checkbox defaultChecked />}
                      label="Aktif"
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Jadikan sebagai default"
                    />
                  </FormGroup>
                </AccordionDetails>
              </Accordion>
            );
          })}
      </main>
    </main>
  );
}
