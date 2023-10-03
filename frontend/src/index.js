import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppLayout from './AppLayout';
import {
	RouterProvider,
	createBrowserRouter,
} from 'react-router-dom';

// pages
import HomePage from './pages/Home/HomePage';
import RegisterPage from './pages/Register/RegisterPage';
import axios from 'axios';
import LoginPage from './pages/Login/LoginPage';
import ErrorPage from './pages/Error/ErrorPage';
import UserProfilePage from './pages/UserProfile/UserProfilePage';
import PostsPage from './pages/Posts/PostsPage';

// notifications
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from './store/store';
import { Provider } from 'react-redux';
import AdsPage from './pages/Ads/AdsPage';
import AuthGuarding from './utils/AuthGuarding';
import DetailPost from './pages/DetailPost/DetailPost';

// example for build BE
// if (process.env.NODE_ENV === 'development') {
// 	axios.defaults.baseURL = 'http://localhost:4000/api';
// } else {
// axios.defaults.baseURL = 'https://selectit-social.vercel.app/api';
// }

axios.defaults.baseURL = 'http://localhost:4000/api';

// For all request for BE!
axios.interceptors.request.use((config) => {
	if (localStorage.hasOwnProperty('sm_token')) {
		config.headers.authorization = localStorage.getItem('sm_token');
	}

	return config;
});

const router = createBrowserRouter([
	{
		path: '/',
		element: <AppLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '/',
				element: <HomePage />,
			},
			{
				path: '/posts',
				element: (
					<AuthGuarding>
						<PostsPage />
					</AuthGuarding>
				),
			},
			{
				path: '/ads',
				element: <AdsPage />,
			},
			{
				path: '/register',
				element: <RegisterPage />,
			},
			{
				path: '/login',
				element: <LoginPage />,
			},
			{
				path: '/userProfile',
				element: <UserProfilePage />,
			},
			{
				path: '/detailPost/:id',
				element: <DetailPost />,
			},
		],
	},
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} position='bottom-right' />
			<ToastContainer />
		</Provider>
	</React.StrictMode>
);
