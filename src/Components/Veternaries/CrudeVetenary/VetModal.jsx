/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import provinces from "./province";
import distr from "./district";
import axios from "axios";

const Modal = ({ matchModal }) => {
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  
  const [mccName, setMccName] = useState("")
    const [mccEmail, setMccEmail] = useState("")
    const [sector, setSector] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("") // reka nkore undi mu mcc ahari ndi gukoresha credential zitari zo. o
    const [nationalId, setNationalId] = useState("")

    const formData = new FormData()
    formData.append("mccName", mccName)
    formData.append("email", mccEmail)
    formData.append("sector", sector)
    formData.append("phoneNumber", phoneNumber)
    formData.append("nationalId", nationalId)

  let token = localStorage.getItem("token")
  console.log("form data: ",formData)
  const addMcc = (e) =>{
    e.preventDefault()
    axios({
      method: "POST",
      url: "http://localhost:5678/mpas/mcc/addMcc",
      data :formData ,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
    .then((response) =>{
      console.log(response)
    })
    .catch((error)=>{
      console.log(error)
      console.log("fom", formData)
    })
  }

  return (
    <div className="mt-20 ml-10 text-[1rem] flex items-center justify-center w-full absolute inset-0 backdrop-filter backdrop-blur-sm top-[2rem] md:top-[-1rem] left-[-2.3rem] h-full ">
      <div
        className="mt-20 ml-10 text-[1rem] flex items-center justify-center  w-full absolute  top-[-1rem] left-[-2.3rem] h-screen "
        onClick={matchModal}
      ></div>
      <div className="md-[90%] md:w-[50%] bg-white p-10 rounded-lg shadow z-10">
        <h1 className="text-2xl relative bottom-4 left-[-1rem]">Register</h1>
        <form className=" w-full " onSubmit={addMcc}>
          <div className="md:grid grid-cols-2">
            <div className="flex flex-col py-1">
              <label>MccName</label>
              <input
              value={mccName}
              onChange={(e) => setMccName(e.target.value)}
                required
                type="text"
                placeholder="MccName"
                className="border border-green-700 px-4 py-1 rounded mt-2"
              />
            </div>
            <div className="flex flex-col py-1 md:ml-4">
              <label>Email address</label>
              <input
              value={mccEmail}
              onChange={(e) => setMccEmail(e.target.value)}
                required
                type="text"
                placeholder="email"
                className="border border-green-700 px-4 py-1 rounded mt-2"
              />
            </div>
            <div className="flex flex-col py-1">
              <label>Phone number</label>
              <input
              value={phoneNumber}
              onChange={(e)=>setPhoneNumber(e.target.value)}
                required
                type="number"
                placeholder="phone"
                className="border border-green-700 px-4 py-1 rounded mt-1"
              />
            </div>
            {/* <div className="flex flex-col py-1 ml-4">
              <label>National ID</label>
              <input
                required
                type="number"
                placeholder="national ID"
                className="border border-green-700 px-4 py-1 rounded mt-1"
              />
            </div> */}
            <div className="flex flex-col py-1 md:ml-4">
              <label>Sector</label>
              <input
              value={sector}
              onChange={(e) => setSector(e.target.value)}
                required
                type="text"
                placeholder="sector"
                className="border border-green-700 px-4 py-1 rounded mt-1"
              />
            </div>
            <div className="flex flex-col py-1 md:ml-4">
              <label>National Id</label>
              <input
              value={nationalId}
              onChange={(e) => setNationalId(e.target.value)}
                required
                type="number"
                placeholder="sector"
                className="border border-green-700 px-4 py-1 rounded mt-1"
              />
            </div>
            {/* <div className="flex flex-col py-3 ">
              <label>Select Province</label>
              <select
                onChange={handleProvinceChange}
                className="border border-green-700 px-4 py-1 rounded mt-1"
              >
                {provinces.map((item, idx) => (
                  <option key={idx}>{item}</option>
                ))}
              </select>
            </div> */}
            {/* <div className="flex flex-col py-3 md:ml-4">
              <label>Select District</label>
              <select className="border border-green-700 px-4 py-1 rounded mt-1">
                {filteredDistricts.map((item, idx) => (
                  <option key={idx}>{item}</option>
                ))}
              </select>
            </div> */}
          </div>
          <div className="">
            <button className="bg-[#1a8cff] rounded uppercase text-white font-semibold w-full py-1" onClick={addMcc}>
              {load ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
