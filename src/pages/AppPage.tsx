import React, { ReactElement, useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { generateURL } from "../utils/pictureUtils";
import DivisionService from "../services/DivisionService";

export function AppPage(): ReactElement {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [division, setDivision] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setName(sessionStorage.getItem("name") as string)
    setAvatar(
      generateURL(sessionStorage.getItem("name") as string));

    DivisionService.getDivision(sessionStorage.getItem('divisionId') as string)
      .then((resolve) => { setDivision(resolve.name); })
      .catch(reject => { setError(reject?.message) });
  }, [])

  if (error) {
    return (
      <>
        <div className="container-fluid d-flex flex-column
      justify-content-between vh-100 p-2">
          <div></div>
          <div className="card card-body bg-danger">{error}</div>
          <div></div>
        </div>
      </>
    )
  }

  return (


    <>

      <div className="container-fluid d-flex flex-column
      justify-content-between vh-100 p-2">

        <div className="d-flex flex-row justify-content-center align-items-center gap-4" id="header">

          <div className="d-flex gap-4 p-2 rounded bg-body-secondary w-fit">
            <img src={avatar} alt="Profile" className="img-fluid rounded" style={{ width: "3rem" }} />

            <div className="d-flex flex-column text-left">
              <span>{name}</span>
              <small><span className="text-secondary">Department </span>{division}</small>
            </div>
          </div>
        </div>


        <div className="" id="content">
          <Outlet />
        </div>


        <div className="d-flex flex-row justify-content-around align-items-center 
          " id="footer">

          <div className="d-flex flex-column justify-content-between align-items-center gap-2">
            <NavLink to="/app/home" className={({ isActive }) => `
px-4 py-1 rounded-pill ${isActive ? 'bg-primary' : 'bg-transparent'}
`}>
              <span className="material-symbols-outlined">home</span>
            </NavLink>

            <small className="">Home</small>
          </div>


          <div className="d-flex flex-column justify-content-between align-items-center gap-2">
            <NavLink to="/app/tasks" className={({ isActive }) => `
px-4 py-1 rounded-pill ${isActive ? 'bg-primary' : 'bg-transparent'}
`}>
              <span className="material-symbols-outlined">task</span>
            </NavLink>

            <small>Tasks</small>
          </div>

          <div className="d-flex flex-column justify-content-between align-items-center gap-2">
            <NavLink to="/app/settings" className={({ isActive }) => `
px-4 py-1 rounded-pill ${isActive ? 'bg-primary' : 'bg-transparent'}
`}>
              <span className="material-symbols-outlined">settings</span>
            </NavLink>

            <small>Settings</small>
          </div>

        </div>

      </div>

    </>

  )
}
