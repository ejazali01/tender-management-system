import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../redux/reducers/AuthSlice';


const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  return (
    <div className='max-w-[300px] h-screen m-auto'>
      <h2  className='py-3 text-center'>Forgot Password</h2>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className='border px-2 rounded-md'
        />
        <button type="submit" disabled={loading}  className='bg-gray-300 p-1 px-4 rounded hover:bg-gray-200'>Submit</button>
      </form>
      {error && <p  className='text-red-500 text-sm'>{error}</p>}
    </div>
  );
};

export default ForgotPassword;
