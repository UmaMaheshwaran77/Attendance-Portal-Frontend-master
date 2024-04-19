import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useAuth } from '../utils/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [errMessage, setErrMessage] = useState('');
    const password = useRef();
    const toggle = useRef();
    const i = useRef();
    const navigate = useNavigate();
    const url = 'https://attendance-portal-backend-three.vercel.app/user/login';

    const showHide = () => {
        if (password.current.type === 'password') {
            password.current.setAttribute('type', 'text');
            toggle.current.className = 'hide';
            i.current.className = 'fa fa-eye-slash';
        } else {
            password.current.setAttribute('type', 'password');
            i.current.className = 'fa fa-eye';
            toggle.current.className = '';
        }
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async (values) => {
            try {
                setLoading(true);
                const response = await axios.post(url, values);
                toast(response.data.message);
                localStorage.setItem('token', response.data.token);
                navigate('/dashboard');
                setLoading(false);
                const token = response.data.token; 
                login(token);
            } catch (error) {
                console.error('Login failed:', error);
                setLoading(false);
            }
        },
        validationSchema: yup.object({
            email: yup.string().email('Must be a valid email').required('Email is required'),
            password: yup.string().required('Password is required').min(5, 'Password must be at least 5 characters'),
        }),
    });

    return (
        <div className="body">
            <div className="popup" id="popup-1">
                <form onSubmit={formik.handleSubmit}>
                    <div className="content">
                       <ToastContainer />
                        <h1 className="font-bold text-2xl uppercase my-4">Sign in</h1>
                        <div className="input-field">
                            <input
                                type="email"
                                name="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                placeholder="Email Address"
                                className={formik.touched.email && formik.errors.email ? 'validate is-invalid' : 'validate'}
                            />
                            {formik.touched.email && formik.errors.email && <span className="text-danger">{formik.errors.email}</span>}
                        </div>

                        <div className="input-field">
                            <input
                                type="password"
                                name="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                placeholder="Password"
                                className={formik.touched.password && formik.errors.password ? 'validate is-invalid' : 'validate'}
                                ref={password}
                            />
                            <div id="toggle" onClick={showHide} ref={toggle}>
                                <i ref={i} className="fa fa-eye" aria-hidden="true"></i>
                            </div>
                            {formik.touched.password && formik.errors.password && <span className="text-danger">{formik.errors.password}</span>}
                        </div>
                        <button className="second-btn" type="submit" disabled={loading}>
                            {loading ? 'Signing in...' : 'Sign in'}
                        </button>
                        <p>
                            Don't have an account? <Link to="/register">Sign up</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
