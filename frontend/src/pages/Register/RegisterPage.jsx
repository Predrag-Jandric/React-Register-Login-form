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
