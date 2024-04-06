/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import { useEffect, useState } from 'react';
// ----------------------------------------------------------------------
export default function Input({ ...others }) {
  const [type, setType] = useState(others.type ?? 'text');
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(showPassword => !showPassword);

  useEffect(() => {
    if (showPassword) {
      setType('text');
    } else {
      setType('password');
    }
  },[showPassword])

  return (
    <div>
      <p className="mb-1">{others.label}</p>
      <div className='relative'>
      <input
        {...others}
        type={type}
        className="border border-slate-250 w-full rounded-md px-4 py-2 text-black"
      />
      {others.type === 'password' && <button className="absolute top-0 end-0 p-2.5">
        {showPassword ? <VisibilityOffRoundedIcon onClick={togglePassword} /> : <VisibilityRoundedIcon onClick={togglePassword} />}
        </button>}
        </div>
    </div>
  );
}
