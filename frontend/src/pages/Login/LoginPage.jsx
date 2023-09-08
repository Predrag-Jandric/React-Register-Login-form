import { useFormik } from 'formik';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import * as Yup from 'yup';
import UserService from '../../services/UserService';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/userSlice';
import spinnerLogin from '../../assets/spinnerLogin.svg'

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Field is required'),
      password: Yup.string().required('Field is required'),
    }),
    onSubmit: (values) => {
      setLoading(true);

      UserService.loginUser(values)
        .then((res) => {
          setLoading(false);

          if (res.status === 200) {
            toast.success('Successfully logged in', { position: 'bottom-right' });
            localStorage.setItem('sm_token', res.data.token);

            dispatch(loginUser(res.data.user));

            setTimeout(() => navigate('/'));
          } else {
            toast.error('Wrong email or password', { position: 'bottom-right' });
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });

      formik.resetForm();
    },
  });

  const showError = (name) => formik.errors[name] && formik.touched[name] && formik.errors[name];
  const [showPassword, setShowPassword] = React.useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main className='h-[76vh] w-[90%] mx-auto my-10 gap-8 flex flex-col sm:w-[30rem]'>
      <h2 className='text-2xl font-semibold text-primary text-center bg-white py-6 border-1 border-blue-300 rounded-5 drop-shadow-lg'>
        LOG IN
      </h2>

      <form
        onSubmit={formik.handleSubmit}
        className='flex flex-col gap-2 bg-white py-3 px-6 drop-shadow-lg border-1 border-blue-300 rounded-5'
      >
        <label className='mt-1'>
          Email:{' '}
          <span className='text-red-600 text-[14px]'>{showError('email')}</span>{' '}
        </label>
        <input
          className='border-1 border-slate-300 py-2 px-7 rounded-5'
          type='text'
          placeholder='Insert Username'
          name='email'
          value={formik.values.email}
          onChange={formik.handleChange}
        />

        <label className='mt-1 flex'>
          Password:{' '}
          <span className='text-red-600 text-[14px]'>{showError('password')}</span>{' '}
          <span className='ml-auto hover:underline cursor-pointer px-1' onClick={togglePasswordVisibility}>
            {showPassword ? 'Hide' : 'Show'}
          </span>
        </label>

        <input
          className='border-1 border-slate-300 py-2 px-7 rounded-5'
          type={showPassword ? 'text' : 'password'}
          placeholder='Insert Password'
          name='password'
          value={formik.values.password}
          onChange={formik.handleChange}
        />

        <button
          className='bg-primary text-white py-2 rounded-5 mt-5 mb-2 hover:bg-primary_hover transition-colors flex justify-center gap-5'
          type='submit'
          disabled={loading}
        >


          {loading ? (
            <>
              <p>Loading...</p>
              <img src={spinnerLogin} alt='spinner representation' />
            </>
          ) : (
            'Login'
          )}

        </button>
      </form>

      <div className='text-center bg-white py-4 border-1 border-blue-300 rounded-5 drop-shadow-lg'>
        <p className='font-normal'>Don't have an account?</p>
        <Link to='/register' className='font-bold text-primary hover:text-primary_hover'>
          Click here to Register
        </Link>
      </div>

    </main>
  );
}

export default LoginPage;
