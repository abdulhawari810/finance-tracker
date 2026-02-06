import { Outlet } from "react-router-dom"
import Navbar from "../navbar"

export default function App(){
  return(
      <>
        <Navbar />
        <Outlet />
      </>
    )
}