import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';
import { useAuth } from '../utils/AuthContext';
import { useNavigate } from 'react-router-dom';
import Datepicker from "tailwind-datepicker-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
const options = {
	title: "Select Date",
	autoHide: true,
	todayBtn: false,
	clearBtn: true,
	clearBtnText: "Clear",
	maxDate: new Date("2030-01-01"),
	minDate: new Date("2000-01-01"),
	theme: {
		background: "bg-blue-500",
		todayBtn: "",
		clearBtn: "",
		icons: "",
		text: "",
		disabledText: "bg-gray-300",
		input: "",
		inputIcon: "",
		selected: "",
	},
	icons: {
		prev: () => <span>Previous</span>,
		next: () => <span>Next</span>,
	},
	datepickerClassNames: "top-1/2 absolute -translate-y-1/2 z-100",
	defaultDate: new Date(),
	language: "en",
	disabledDates: [],
	weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
	inputNameProp: "date",
	inputIdProp: "date",
	inputPlaceholderProp: "Select Date",
	inputDateFormatProp: {
		day: "numeric",
		month: "long",
		year: "numeric"
	}
}

function Create() {
	const navigate = useNavigate();
	const [user, setUser] = useState(null);
	const [studentId, setStudentId] = useState('');
	const [status, setStatus] = useState('present');
	const [loading, setLoading] = useState(false);
	const [selectedDate, setSelectedDate] = useState('');
	const [show, setShow] = useState(false);
	useEffect(() => {
		try {
			const storedUser = JSON.parse(localStorage.getItem('user'));
			if (!storedUser) {
				navigate('/');
			} else {
				setUser(storedUser);
			}
		} catch (error) {
			console.error('Error retrieving user data:', error);
			navigate('/');
		}
	}, []);

	const submitValue = async () => {
		const url ='https://attendance-portal-backend-three.vercel.app/user/attendance';
		 const token = localStorage.getItem('token');
		try {
			setLoading(true);
			const formData = {
				status: status,
				date: selectedDate.toISOString(),
				studentId: studentId,
			};
			const response = axios.post(url, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                }).then((res) => {
                toast(res.data.message)
                setLoading(false);
                navigate('/dashboard')
            })

		} catch (error) {
			console.error('Error submitting data:', error);
			seterrMessage('Error submitting data');
		} finally {
			setLoading(false);
		}
	};

	const handleChange = (selectedDate) => {
		setSelectedDate(selectedDate);
	};

	const handleClose = (state) => {
		setShow(state);
	}

	return (
		<>
			<div className="dashboard">
				{user ? <Navbar userData={user} /> : null}
				<ToastContainer />
				<div className="rounded-lg bg-white p-3 shadow w-1/3">
					<h2 className="text-blue-700 mb-4 text-center text-2xl uppercase">Mark Attendance</h2>
					<div className="max-w-md mx-auto">
					 <div class="mb-5">
					    <label for="studentId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student ID</label>
					    <input type="text" id="studentId" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={studentId} onChange={(e)=>setStudentId(e.target.value)} placeholder="student ID" required />
					  </div>
						<div className="relative z-0 w-full mb-5 group">
							<label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select your Attendees</label>
							 <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="present">present</option>
                                <option value="absent">absent</option>
                            </select>
						</div>

						<div className="relative z-0 w-full mb-5 group">
							<Datepicker options={options} onChange={handleChange} show={show} setShow={handleClose}>
								<div className="relative">
									<div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
								     <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
								        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
								      </svg>
 								 </div>
									<input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full" placeholder="Select date" value={selectedDate} onFocus={() => setShow(true)} readOnly />
								</div>
							</Datepicker>
						</div>

						<button type="submit" onClick={submitValue} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
							 {loading ? 'Creating...' : 'Create'}
						</button>
					</div>
				</div>
			</div> 
		</>
	)
}

export default Create;
