import { Navigate } from 'react-router-dom';

function AuthGuarding({ children }) {
	if (localStorage.hasOwnProperty('sm_user')) {
		return localStorage.getItem('sm_user') && children;
	} else {
		return <Navigate to={'/login'} />;
	}
}

export default AuthGuarding;
