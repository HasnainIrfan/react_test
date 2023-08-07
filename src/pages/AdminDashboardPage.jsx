import React, { useContext, useEffect, useState } from "react";
import MkdSDK from "../utils/MkdSDK";
import { AuthContext } from "../authContext";
import { useNavigate } from "react-router";

const AdminDashboardPage = () => {
  const sdk = new MkdSDK();

  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    const data = {
      payload: {},
      page: 1,
      limit: 10,
    };

    async function fetchData() {
      try {
        const res = await sdk.callRestAPI(data, "PAGINATE");
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  const onLogOut = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/admin/login");
  };

  return (
    <>
      <div className="w-full mx-auto bg-[#111111] text-white px-32">
        <div className="flex justify-between items-center mb-20 h-[96px] ">
          <h1 className="font-bold text-[48px]">APP</h1>
          <div
            onClick={onLogOut}
            className="flex justify-center items-center gap-1 bg-[#9BFF00] text-black py-2 px-4 rounded-full"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 20C5 17.544 6.991 15.553 9.447 15.553H14.553C17.009 15.553 19 17.544 19 20"
                stroke="#696969"
                stroke-width="1.4824"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15.0052 5.2448C16.6649 6.90453 16.6649 9.59548 15.0052 11.2552C13.3455 12.9149 10.6545 12.9149 8.9948 11.2552C7.33507 9.59548 7.33507 6.90453 8.9948 5.2448C10.6545 3.58507 13.3455 3.58507 15.0052 5.2448"
                stroke="#696969"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <button className="text-[#050505] text-base font-thin">
              Logout
            </button>
          </div>
        </div>
        <div className="mt-10">
          <div className="flex justify-between items-center">
            <h2 className="text-[40px] text-[#FFFFFF] font-thin">
              Today’s leaderboard
            </h2>
            <p className="bg-[#1D1D1D] py-2 px-6 h-[56px] flex items-center justify-center gap-3 rounded-lg text-[#fff] font-thin">
              30 May 2022 •{" "}
              <span className="bg-[#9BFF00] text-[#000000] text-sm  py-1 px-3 rounded-lg ">
                Submissions OPEN
              </span>{" "}
              • 11:34
            </p>
          </div>
          <div className="mt-12">
            <div className="font-thin text-[#acabab] flex justify-between items-center text-md">
              <p className="flex items-center gap-6 pl-6">
                <span>#</span> Title
              </p>
              <p>Author</p>
              <p>Most Liked</p>
            </div>
            <div className="mt-5">
              <div className="grid grid-cols-4 place-items-center border-2 p-4 rounded-3xl border-[#1D1D1D]">
                <div>
                  <p>01</p>
                </div>
                <div>
                  <p>Image</p>
                </div>
                <div>
                  <p>
                    Rune raises $100,000 for marketing through NFT butterflies
                    sale
                  </p>
                </div>
                <div>
                  <p>254</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center gap-4 mt-12 pb-40">
            <button className="flex justify-center items-center gap-3 bg-[#9BFF00] text-black py-2 px-4 rounded-2xl">
              Back
            </button>
            <button className="flex justify-center items-center gap-3 bg-[#9BFF00] text-black py-2 px-4 rounded-2xl">
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardPage;
