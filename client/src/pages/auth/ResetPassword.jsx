import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { resetPassword } from '../../redux/reducers/AuthSlice';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const { token } = useParams();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword({ token, newPassword }));
  };

  return (
    <div className='max-w-[300px] h-screen m-auto'>
      <h2 className='py-3 text-center'>Reset Password</h2>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className='border px-2 rounded-md'
        />
        <button type="submit" disabled={loading} className='bg-gray-300 p-1 px-4 rounded hover:bg-gray-200'>Submit</button>
      </form>
      {error && <p  className='text-red-500 text-sm'>{error}</p>}
    </div>
  );
};

export default ResetPassword;
