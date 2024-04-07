/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import { useEffect, useState } from "react";
// ----------------------------------------------------------------------
export default function Input({ ...others }) {
  const [type, setType] = useState(others?.type ?? "text");
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = (e: React.MouseEvent) =>{
    e.preventDefault()
    setShowPassword((showPassword) => !showPassword);
  } 
  
  useEffect(() => {
    if (!showPassword && others.type === "password") {
      setType("password");
    } else {
      setType("text");
    }
  }, [showPassword, others]);
  
  console.log(others, type)
  return (
    <div>
      <p className="mb-1">{others.label}</p>
      <div className="relative">
        <input
          {...others}
          type={type}
          className="border-slate-250 w-full rounded-md border px-4 py-2 text-black"
        />
        {others.type === "password" && (
          <button className="absolute right-0 top-0 px-2.5 py-2" onClick={togglePassword}>
            {showPassword ? (
              <VisibilityOffRoundedIcon  />
            ) : (
              <VisibilityRoundedIcon />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
