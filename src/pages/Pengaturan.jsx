import { getImagesProfile } from "../utils/imageLoader";
import { getImagesWallet } from "../utils/imageLoader";
import { getImagesBank } from "../utils/imageLoader";

import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import TranslateRoundedIcon from "@mui/icons-material/TranslateRounded";
import NightlightRoundedIcon from "@mui/icons-material/NightlightRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import QuizRoundedIcon from "@mui/icons-material/QuizRounded";
import FolderDeleteRoundedIcon from "@mui/icons-material/FolderDeleteRounded";

import Button from "@mui/material/Button";

import Modal from "../components/modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

export default function Pengaturan() {
  const [ModalOpen, setModalOpen] = useState(false);
  const [ModalType, setModalType] = useState("");

  const nav = useNavigate();

  return (
    <>
      <section className="flex items-center rounded-xl justify-between w-full bg-slate-700 p-5">
        <div className="flex items-center gap-2.5">
          <img
            src={getImagesProfile("default.png")}
            alt="Default Profile Picture"
            className="w-12.5 h-12.5 rounded-full"
          />
          <div className="flex flex-col">
            <h1 className="font-medium text-xl">Abdulhawari</h1>
            <span className="text-sm">Fullstack Developer</span>
          </div>
        </div>
        {/* <ArrowForwardIosRoundedIcon className="text-xl!" /> */}
      </section>
      <h1 className="my-8 font-bold text-lg">Pengaturan Lainnya</h1>
      <section className="flex flex-col w-full bg-slate-700 divide-y rounded-xl divide-primary/40">
        <Button
          className="flex! items-center! justify-between! w-full! text-white! normal-case! p-5!"
          onClick={() => nav("/Rekening")}
        >
          <div className="flex items-center gap-2.5">
            <AccountBalanceRoundedIcon className="text-4xl!" />
            <h1 className="font-medium text-lg">Atur Rekening</h1>
          </div>
          {/* <ArrowForwardIosRoundedIcon className="text-xl!" /> */}
        </Button>
        <Button className="flex! items-center! justify-between! w-full! text-white! normal-case! p-5!">
          <div className="flex items-center gap-2.5">
            <NotificationsRoundedIcon className="text-4xl!" />
            <h1 className="font-medium text-lg">Notifikasi</h1>
          </div>

          {/* <ArrowForwardIosRoundedIcon className="text-xl!" /> */}
        </Button>
        <Button className="flex! items-center! justify-between! w-full! text-white! normal-case! p-5!">
          <div className="flex items-center gap-2.5">
            <TranslateRoundedIcon className="text-4xl!" />
            <h1 className="font-medium text-lg">Bahasa</h1>
          </div>

          {/* <ArrowForwardIosRoundedIcon className="text-xl!" /> */}
        </Button>
        <Button className="flex! items-center! justify-between! w-full! text-white! normal-case! p-5!">
          <div className="flex items-center gap-2.5">
            <NightlightRoundedIcon className="text-4xl!" />
            <h1 className="font-medium text-lg">Dark Mode</h1>
          </div>

          {/* <ArrowForwardIosRoundedIcon className="text-xl!" /> */}
        </Button>
      </section>
      <section className="flex  mt-10 flex-col w-full bg-slate-700 divide-y rounded-xl divide-primary/40">
        <Button className="flex! items-center! justify-between! w-full! text-white! normal-case! p-5!">
          <div className="flex items-center gap-2.5">
            <InfoRoundedIcon className="text-4xl!" />
            <h1 className="font-medium text-lg">Tentang Aplikasi</h1>
          </div>

          {/* <ArrowForwardIosRoundedIcon className="text-xl!" /> */}
        </Button>
        <Button className="flex! items-center! justify-between! w-full! text-white! normal-case! p-5!">
          <div className="flex items-center gap-2.5">
            <QuizRoundedIcon className="text-4xl!" />
            <h1 className="font-medium text-lg">FAQ</h1>
          </div>

          {/* <ArrowForwardIosRoundedIcon className="text-xl!" /> */}
        </Button>
        <Button className="flex! items-center! justify-between! w-full! text-white! normal-case! p-5!">
          <div className="flex items-center gap-2.5">
            <FolderDeleteRoundedIcon className="text-4xl! text-red-500" />
            <h1 className="font-medium text-red-500 text-lg">Hapus Data</h1>
          </div>

          {/* <ArrowForwardIosRoundedIcon className="text-xl!" /> */}
        </Button>
      </section>
    </>
  );
}
