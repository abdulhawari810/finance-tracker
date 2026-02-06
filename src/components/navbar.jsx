import { useState } from "react"
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import { NavLink } from "react-router-dom"
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import LocalOfferRoundedIcon from '@mui/icons-material/LocalOfferRounded';
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import ReceiptRoundedIcon from '@mui/icons-material/ReceiptRounded';

export default function Navbar(){
  const [toggle, setToggle] = useState(false);
  return(
      <>
        <navbar className="w-full h-20 flex items-center justify-between p-5
        bg-secondary fixed top-0 left-0 z-50">
          <section className="flex items-center justify-center gap-5">
            <h1 className="text-white font-bold text-lg">Catatan Keuangan</h1>
          </section>
          <MoreVertRoundedIcon className="text-white text-3xl!"/>
        </navbar>
        <navbar className="w-full h-[80px] fixed bottom-0 left-0 z-50 bg-secondary text-white flex items-center justify-between p-5">
          <NavLink className={({isActive}) => isActive ? `text-white flex
          flex-col items-center justify-center gap-1` :
          `text-primary flex
          flex-col items-center justify-center gap-1`} to={"/"}>
            <DashboardRoundedIcon className="text-3xl!"/>
            <span className="text-sm">Dashboard</span>
          </NavLink>
          <NavLink className={({isActive}) => isActive ? `text-white flex
          flex-col items-center justify-center gap-1` :
          `text-primary flex
          flex-col items-center justify-center gap-1`} to={"/Transaksi"}>
            <ReceiptRoundedIcon className="text-3xl!"/>
            <span className="text-sm">Transaksi</span>
          </NavLink>
          <NavLink className={({isActive}) => isActive ? `text-white flex
          flex-col items-center justify-center gap-1` :
          `text-primary flex
          flex-col items-center justify-center gap-1`} to={"/Laporan"}>
            <AssessmentRoundedIcon className="text-3xl!"/>
            <span className="text-sm">Laporan</span>
          </NavLink>
          <NavLink className={({isActive}) => isActive ? `text-white flex
          flex-col items-center justify-center gap-1` :
          `text-primary flex
          flex-col items-center justify-center gap-1`} to={"/Pengaturan"}>
            <SettingsRoundedIcon className="text-3xl!"/>
            <span className="text-sm">Pengaturan</span>
          </NavLink>
        </navbar>
      </>
    )
}