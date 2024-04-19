import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../utils/AuthContext';
import Navbar from '../components/Navbar';
import { Button, Modal } from 'flowbite-react'; // Removed unnecessary imports
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Datepicker from "tailwind-datepicker-react";

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
};

function Dashboard() {
    const [user, setUser] = useState(null);
    const [recordID, setRecordID] = useState('');
    const [attendance, setAttendance] = useState([]);
    const [editValue, setEditValue] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const [editOpenModal, setEditOpenModal] = useState(false);
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [studentId, setStudentId] = useState('');
    const [status, setStatus] = useState('present');
    const [loadingBtn, setLoadingBtn] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [show, setShow] = useState(false);
    const token = localStorage.getItem('token');

    const fetchAttendanceData = async () => {
        try {
            const response = await axios.get('https://attendance-portal-backend-three.vercel.app/user/attendance', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });
            setAttendance(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch attendance data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
            return;
        }

        const fetchUserData = async () => {
            try {
                const response = await axios.get('https://attendance-portal-backend-three.vercel.app/user/dashboard', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                });
                setUser(response.data);
                localStorage.setItem('user', JSON.stringify(response.data));
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
                setLoading(false);
            }
        };

        fetchUserData();
        fetchAttendanceData();

    }, []); // Empty dependency array ensures useEffect runs only once

    const handleChange = (selectedDate) => {
        setSelectedDate(selectedDate);
    };

    const handleClose = (state) => {
        setShow(state);
    }

    const editAttendance = async (id) => {
        try {
            const url = `https://attendance-portal-backend-three.vercel.app/user/attendance/${id}`;
            const res = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });
            setEditValue(res.data);
            setStudentId(res.data.studentId);
        } catch (error) {
            console.error('Failed to update attendance data:', error);
            // Handle errors here
        }
    };

    const updateAttendance = async (id) => {
        try {
            const url = `https://attendance-portal-backend-three.vercel.app/user/attendance/${id}`;
            setLoadingBtn(true);
            const formData = {
                status: status,
                date: selectedDate.toISOString(),
                studentId: studentId,
            };
            const res = await axios.post(url, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });
            toast(res.data.message);
            fetchAttendanceData();
            setEditOpenModal(false); 
        } catch (error) {
            console.error('Failed to update attendance data:', error);
            // Handle errors here
        }
    };

    const deleteAttendance = async (id) => {
        try {
            const url = `https://attendance-portal-backend-three.vercel.app/user/attendance/${id}`;
            const res = await axios.delete(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });
            toast(res.data.message);
            fetchAttendanceData();
            setOpenModal(false); // Close the modal after deletion
        } catch (error) {
            console.error('Failed to delete attendance data:', error);
            // Handle errors here
        }
    };

    if (loading) {
        return (
        <div className="dashboard">
            <div role="status">
                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
        );
    }

    return (
        <div className="dashboard">
            {user && <Navbar userData={user} />}
            <ToastContainer />
            <div className="flex justify-center items-center shadow-md">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    {attendance.length > 0 ? (
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Serial Number
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Date
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Student ID
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {attendance.map((record, index) => (
                                    <tr
                                        key={index}
                                        className={
                                            index % 2 === 0
                                                ? 'odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'
                                                : 'odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'
                                        }
                                    >
                                        <td className="px-6 py-4 font-medium text-gray-900 text-center whitespace-nowrap dark:text-white">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-4">{record.date}</td>
                                        <td className="px-6 py-4">{record.studentId}</td>
                                        <td className="px-6 py-4">{record.status}</td>
                                        <td className="flex items-center px-6 py-4">
                                            <a
                                                href="#"
                                                onClick={() => {
                                                    setEditOpenModal(true);
                                                    editAttendance(record._id);
                                                }}
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                            >
                                                Edit
                                            </a>
                                            <a
                                                href="#"
                                                onClick={() => {
                                                    setOpenModal(true);
                                                    setRecordID(record._id);
                                                }}
                                                className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                                            >
                                                Remove
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="p-8 bg-white text-2xl shadow text-blue-500">
                            No attendance available <a href="/create" className="text-blue-500 underline">Create one</a>
                        </div>
                    )}
                </div>
                <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                    <Modal.Header />
                    <Modal.Body>
                        <div className="text-center">
                            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                Are you sure you want to delete this attendance?
                            </h3>
                            <div className="flex justify-center gap-4">
                                <Button color="failure" onClick={() => deleteAttendance(recordID)}>
                                    {"Yes, I'm sure"}
                                </Button>
                                <Button color="gray" onClick={() => setOpenModal(false)}>
                                    No, cancel
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
                <Modal show={editOpenModal} size="md" onClose={() => setEditOpenModal(false)} popup>
                    <Modal.Header />
                    <Modal.Body>
                        <div className="space-y-6">
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Edit the attendance</h3>
                            <div className="mb-5">
                                <label htmlFor="studentId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student ID</label>
                                <input type="text" id="studentId" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={editValue.studentId} onChange={(e) => setStudentId(e.target.value)} placeholder="student ID" required />
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Status</label>
                                <select id="status" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={editValue.status} onChange={(e) => setStatus(e.target.value)}>
                                    <option value="present">Present</option>
                                    <option value="absent">Absent</option>
                                </select>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <Datepicker options={options} onChange={handleChange} show={show} setShow={handleClose}>
                                    <div className="relative">
                                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full" placeholder="Select date" value={selectedDate} onFocus={() => setShow(true)} readOnly />
                                    </div>
                                </Datepicker>
                            </div>
                            <button type="submit" onClick={() => updateAttendance(editValue._id)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                {loadingBtn ? 'Updating...' : 'Update'}
                            </button>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
}

export default Dashboard;
