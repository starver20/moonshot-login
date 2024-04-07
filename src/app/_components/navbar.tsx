"use client";
import React from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useUser } from "../_context/user-context";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const router = useRouter();
  const {state, dispatch} = useUser();
  return (
    <div className=" left-0 top-0 z-10 flex flex-col justify-center w-full gap-0">
        
    <div className="flex flex-col items-end justify-between bg-white p-4 gap-4">
        <div className="flex flex-row gap-4 font-light">
          <p>Help</p>
          <p>Orders & Returns</p>
          {state.isLoggedIn ? <p>{`Hi, ${state.user.name}`}</p> : ''}
        </div>

        <div className="flex flex-row justify-between items-center w-full">
      <div>
        <h1 className="text-3xl font-bold">ECOMMERCE</h1>
      </div>
      <div className="flex flex-row gap-6 font-normal mr-40">
        <h5>Categories</h5>
        <h5>Sale</h5>
        <h5>Clearance</h5>
        <h5>New Stock</h5>
        <h5>Trending</h5>
      </div>
      <div className="flex flex-row gap-4" >
          <SearchIcon />
          <ShoppingCartOutlinedIcon />
          {state.isLoggedIn && <ExitToAppIcon onClick={() =>{
            dispatch({type: 'removeUser'})
            localStorage.removeItem("userId")
            router.refresh();
        }
        }
           />}
      </div>
    </div>

    </div>

    <div className="bg-gray-200 flex justify-center items-center p-1 gap-4">
        <p className="text-2xl font-extralight">{`<`}</p>
        <p className="font-light">Get 10% off on business signup</p>
         <p className="text-2xl font-extralight">{`>`}</p>
    </div>

    </div>
  );
};

export default Navbar;
