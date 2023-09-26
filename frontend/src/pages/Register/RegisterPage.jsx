import React from 'react';
import { useFormik } from 'formik';

import * as Yup from 'yup';
import { FileParse } from '../../utils/FileParse';
import UserService from '../../services/UserService';

import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function RegisterPage() {
	const VALID_TYPE = ['image/jpg', 'image/jpeg', 'image/png'];
	let KB = 1024;
	let MB = KB * 1024;

	const navigate = useNavigate();

	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			gender: '',
			image: '',
			birthDate: '',
		},
		validationSchema: Yup.object({
			firstName: Yup.string().required('Field is required'),
			lastName: Yup.string().required('Field is required'),
			email: Yup.string().required('Field is required'),
			password: Yup.string().required('Field is required'),
			gender: Yup.string().required('Field is required'),
			birthDate: Yup.string().required('Field is required'),
			image: Yup.mixed()
				.required('Field is required')
				.test('fileType', 'Wrong file type', (value) =>
					VALID_TYPE.includes(value.type)
				)
				.test(
					'fileSize',
					'Wrong file size',
					(value) => value.size < MB * 2
				),
		}),
		onSubmit: (values) => {
			FileParse(values.image)
				.then((res) => {
					UserService.registerUser({ ...values, image: res })
						.then((res) => {
							if (res.status === 200) {
								toast.success('User registration successful', { position: 'bottom-right' });
								setTimeout(() => navigate('/login'));
							} else {
								toast.error('User already exists', { position: 'bottom-right' });
							}
						})
						.catch((err) => console.log(err));
				})
				.catch((err) => console.log(err));

			formik.resetForm();
		},
	});

	// FN for errors input
	const showError = (name) =>
		formik.errors[name] &&
		formik.touched[name] &&
		formik.errors[name];

	// toggle password visibility
	const [showPassword, setShowPassword] = React.useState(false);
	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (

		<main className='w-[90%] mx-auto my-10 gap-8 flex flex-col sm:w-[30rem]'>
			<h2 className='text-2xl font-semibold text-primary text-center bg-white py-6 border-1 border-blue-300 rounded-5 drop-shadow-lg'>REGISTER</h2>

			<form onSubmit={formik.handleSubmit} className='flex flex-col gap-2 bg-white py-3 px-6 drop-shadow-lg border-1 border-blue-300 rounded-5 '>
				<label className='mt-1'>
					First Name:{' '}
					<span className='text-red-600 text-[14px]'>
						{showError('firstName')}
					</span>{' '}
				</label >
				<input
					className='border-1 border-slate-300 py-2 px-7 rounded-5'
					type='text'
					placeholder='Insert First Name'
					name='firstName'
					value={formik.values.firstName}
					onChange={formik.handleChange}
				/>

				<label className='mt-1'>
					Last Name:{' '}
					<span className='text-red-600 text-[14px]'>
						{showError('lastName')}
					</span>{' '}
				</label>
				<input
					className='border-1 border-slate-300 py-2 px-7 rounded-5'
					type='text'
					placeholder='Insert Last Name'
					name='lastName'
					value={formik.values.lastName}
					onChange={formik.handleChange}
				/>

				<label className='mt-1'>
					Email:{' '}
					<span className='text-red-600 text-[14px]'>
						{showError('email')}
					</span>{' '}
				</label>
				<input
					className='border-1 border-slate-300 py-2 px-7 rounded-5'
					type='email'
					placeholder='Insert Email'
					name='email'
					value={formik.values.email}
					onChange={formik.handleChange}
				/>

				<label className='mt-1 flex'>
					Password:{' '}
					<span className='text-red-600 text-[14px]'>
						{showError('password')}
					</span>{' '}
					<span
						className='ml-auto hover:underline cursor-pointer px-1'
						onClick={togglePasswordVisibility}
					>
						{showPassword ? "Hide" : "Show"}
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

				<label className='mt-1'>
					Gender:{' '}
					<span className='text-red-600 text-[14px]'>
						{showError('gender')}
					</span>{' '}
				</label >
				<select className='border-1 border-slate-300 py-2 px-7 rounded-5'
					name='gender'
					value={formik.values.gender}
					onChange={formik.handleChange}>
					<option value='' defaultChecked>
						Gender
					</option>
					<option value='male'>Male</option>
					<option value='female'>Female</option>
				</select>

				<label className='mt-1'>
					Image:{' '}
					<span className='text-red-600 text-[14px]'>
						{showError('image')}
					</span>{' '}
				</label>
				<input
					className='border-1 border-slate-300 py-2 px-7 rounded-5'
					type='file'
					name='image'
					onChange={(e) => {
						formik.setFieldValue(e.target.name, e.target.files[0]);
					}}
				/>