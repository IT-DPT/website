// src/components/Sidebar.js
import logo from '../../Images/GPM-LOGO.png'
import img1 from '../../Images/logo_try.jpg'
import React, { useState, useEffect } from "react";
import { Link, useNavigate, Outlet, useLocation } from "react-router-dom";
// import { TailSpin } from 'react-loader-spinner'
import { ClipLoader } from 'react-spinners'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { BiSolidDashboard, BiMenuAltRight, BiUpArrow, BiDownArrow, BiUserCircle } from 'react-icons/bi'
import { FaUserTie, FaUserGraduate } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import { AiOutlineClose } from 'react-icons/ai'
import { CgNotes, CgCloseR } from 'react-icons/cg'
import { BsTable } from 'react-icons/bs'
import { PiNotePencil } from 'react-icons/pi'
import { GiAchievement } from 'react-icons/gi'
import themeHook from './ContextP';
import {toast} from 'react-hot-toast'
const Sidebar = () => {
    const { auth,setAuth, setFindForm }=themeHook()
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);
    const [nav, setNav] = useState(false)
    const [stDrop, setStDrop] = useState(false)
    const [notesQP, setNotesQP] = useState(false)
    const [TT, setTT] = useState(false)
    const [notice, setNotice] = useState(false)
    const [achievement, setAchievement] = useState(false)
    const [loader, setLoader] = useState(true)
    const [showTop, setShowTop]=useState(false)
    const handleNav = () => {
        setNav(!nav)
    }
    const handleShowTop=()=>{
        setShowTop(!showTop)
    }

    const location = useLocation()
    const changeLocation = (newLocation) => {
        const replacedString = newLocation.replace(/\//g, ' > ')
        return replacedString + ' >';
    }
    const clearLocalStorage = () => {
        localStorage.clear();
        setAuth({})
        handleNav()
    };
  
    useEffect(() => {
               
        if(auth?.user?.role !==2){
            setFindForm('A')
            toast.error('Please Login as Admin',{
                autoClose:1000
            })
            navigate('/Login')
        }
        setInterval(() => {
            setLoader(false)          
        }, 2000);
    }, [])
    return (
        <>{   
            loader ?
            <div className='absolute w-[100%] h-[100%]  z-50 flex justify-center items-center bg-white' >

                <ClipLoader
                    color="hsla(231, 100%, 47%, 1)"
                    cssOverride={{
                        border: '5px solid'
                    }}
                    size={100}
                    speedMultiplier={0.4}
                />
            </div>

            :
            <>

                <div className='flex flex-rows-1 w-[100%] top-0 left-0 fixed '>
                    <div className={nav ? "bg-slate-900 text-white shadow-2xl h-screen w-[300px] max-md:w-[100%] flex flex-col overflow-hidden  max-md:top-0 max-md:absolute ease-in-out duration-700 z-20 list_direction top-0 left-0 overflow-y-scroll  " : "w-[300px] max-md:hidden ease-in-out duration-700 bg-slate-900 text-white shadow-2xl h-screen  flex flex-col overflow-hidden  z-20 list_direction top-0  left-0 overflow-y-scroll  "} >
                        <div className="flex flex-row  items-center justify-between gap-2 p-2 item_direction">
                            <div className='flex flex-row items-center gap-2'>
                            <img src={img1} onClick={() => navigate('/')} className='h-[50px] md:h-[50px] p-0 md:w-[50px] rounded-[50%] cursor-pointer ' />
                            <h1 className='text-2xl font-mono'>IT-DEPT</h1>
                            </div>
                            <div onClick={handleNav} className='cursor-pointer md:hidden'>{
                                nav ?
                                    <CgCloseR size={26} />:''}

                            </div>
                        </div>
                        <nav className="flex-grow p-2 text-lg item_direction ">

                            <Link to="/Admin/Dashboard" className="flex flex-row py-2 gap-2 items-center" onClick={handleNav}>

                                <BiSolidDashboard size={22} />
                                <h1>
                                    Dashboard
                                </h1>
                            </Link>

                            <hr />
                            {/* Student */}
                            <div
                                onClick={() => setStDrop(!stDrop)}
                                className=" w-full pt-5 flex flex-row cursor-pointer gap-x-2 pl-2 items-center justify-between pr-5"
                            > <div className='flex flex-row items-center gap-x-2'><FaUserGraduate size={21} />
                                    Student
                                </div>

                                {stDrop ? <MdKeyboardArrowUp size={29} /> :
                                    <MdKeyboardArrowDown size={29} />
                                }

                            </div>


                            {stDrop && (
                                <div className="block left-0 mt-2 pl-5  w-full " onClick={handleNav}>
                                    <Link to="/Admin/AddStudent" className="block w-max px-4 py-1   border-none  hover:text-blue-600 hover:rounded-md">
                                        Add Student
                                    </Link>
                                    <Link to="/Admin/ManageStudent" className="block w-max px-4 py-1    border-none  hover:text-blue-600 hover:rounded-md">
                                        Manage Student
                                    </Link>
                                </div>
                            )}

                            {/* Faculty */}
                            <div
                                onClick={() => setIsOpen(!isOpen)}
                                className=" w-full pt-2 flex flex-row cursor-pointer gap-x-2 pl-2 items-center justify-between pr-5"
                            > <div className='flex flex-row items-center gap-x-2'><FaUserTie size={21} />
                                    Faculty
                                </div>

                                {isOpen ? <MdKeyboardArrowUp size={29} /> :
                                    <MdKeyboardArrowDown size={29} />
                                }

                            </div>


                            {isOpen && (
                                <div className="block left-0 mt-2 pl-5  w-full " onClick={handleNav}>
                                    <Link to="/Admin/AddFaculty" className="block w-max px-4 py-1   border-none  hover:text-blue-600 hover:rounded-md">
                                        Add Faculty
                                    </Link>
                                    <Link to="/Admin/ManageFaculty" className="block w-max px-4 py-1    border-none  hover:text-blue-600 hover:rounded-md">
                                        Manage Faculty
                                    </Link>
                                </div>
                            )}


                            {/* Notes & QP */}
                            <div
                                onClick={() => setNotesQP(!notesQP)}
                                className=" w-full pt-2 flex flex-row cursor-pointer gap-x-2 pl-2 items-center justify-between pr-5"
                            > <div className='flex flex-row items-center gap-x-2'><CgNotes size={21} />
                                    Notes & QP
                                </div>

                                {notesQP ? <MdKeyboardArrowUp size={29} /> :
                                    <MdKeyboardArrowDown size={29} />
                                }

                            </div>


                            {notesQP && (
                                <div className="block left-0 mt-2 pl-5  w-full " onClick={handleNav}>
                                    <Link to="/Admin/AddNotes" className="block w-max px-4 py-1   border-none  hover:text-blue-600 hover:rounded-md">
                                        Add Notes
                                    </Link>
                                    <Link to="/Admin/ManageNotes" className="block w-max px-4 py-1    border-none  hover:text-blue-600 hover:rounded-md">
                                        Manage Notes
                                    </Link>
                                    <Link to="/Admin/AddQP" className="block w-max px-4 py-1   border-none  hover:text-blue-600 hover:rounded-md">
                                        Add QP
                                    </Link>
                                    <Link to="/Admin/ManageQP" className="block w-max px-4 py-1    border-none  hover:text-blue-600 hover:rounded-md">
                                        Manage QP
                                    </Link>
                                </div>
                            )}
                            {/* Time Table */}
                            <div
                                onClick={() => setTT(!TT)}
                                className=" w-full pt-2 flex flex-row cursor-pointer gap-x-2 pl-2 items-center justify-between pr-5"
                            >

                                <div className='flex flex-row items-center gap-x-2 text-white'><BsTable size={21} />
                                    Time Table
                                </div>


                                {TT ? <MdKeyboardArrowUp size={29} /> :
                                    <MdKeyboardArrowDown size={29} />
                                }

                            </div>

                            {TT && (
                                <div className="block left-0 mt-2 pl-5  w-full " onClick={handleNav}>
                                    <Link to="/Admin/AddTimeTable" className="block w-max px-4 py-1   border-none  hover:text-blue-600 hover:rounded-md">
                                        Add Time Table
                                    </Link>
                                    <Link to="/Admin/ManageTimeTable" className="block w-max px-4 py-1    border-none  hover:text-blue-600 hover:rounded-md">
                                        Manage Time Table
                                    </Link>

                                </div>
                            )}

                            {/* Notice */}
                            <div
                                onClick={() => setNotice(!notice)}
                                className=" w-full pt-2 flex flex-row cursor-pointer gap-x-2 pl-2 items-center justify-between pr-5"
                            >

                                <div className='flex flex-row items-center gap-x-2 text-white'><PiNotePencil size={22} />
                                    Notice
                                </div>


                                {notice ? <MdKeyboardArrowUp size={29} /> :
                                    <MdKeyboardArrowDown size={29} />
                                }

                            </div>

                            {notice && (
                                <div className="block left-0 mt-2 pl-5  w-full " onClick={handleNav}>
                                    <Link to="/Admin/AddNotice" className="block w-max px-4 py-1   border-none  hover:text-blue-600 hover:rounded-md">
                                        Add Notice
                                    </Link>
                                    <Link to="/Admin/ManageNotice" className="block w-max px-4 py-1    border-none  hover:text-blue-600 hover:rounded-md">
                                        Manage Notice
                                    </Link>

                                </div>
                            )}
                            {/* Achievements */}
                            <div
                                onClick={() => setAchievement(!achievement)}
                                className=" w-full pt-2 flex flex-row cursor-pointer gap-x-2 pl-2 items-center justify-between pr-5"
                            >

                                <div className='flex flex-row items-center gap-x-2 text-white'><GiAchievement size={22} />
                                    Achievement
                                </div>


                                {achievement ? <MdKeyboardArrowUp size={29} /> :
                                    <MdKeyboardArrowDown size={29} />
                                }

                            </div>

                            {achievement && (
                                <div className="block left-0 mt-2 pl-5  w-full " onClick={handleNav}>
                                    <Link to="/Admin/AddAchievement" className="block w-max px-4 py-1   border-none  hover:text-blue-600 hover:rounded-md">
                                        Add Achievement
                                    </Link>
                                    <Link to="/Admin/ManageAchievements" className="block w-max px-4 py-1    border-none  hover:text-blue-600 hover:rounded-md">
                                        Manage Achievement
                                    </Link>
                                    <Link to="/Admin/PhotoGallery" className="block w-max px-4 py-1   border-none  hover:text-blue-600 hover:rounded-md">
                                            Photo Gallery
                                    </Link>
                                        <Link to="/Admin/AcademicAchievements" className="block w-max px-4 py-1   border-none  hover:text-blue-600 hover:rounded-md">
                                            Academic
                                    </Link>

                                </div>
                            )}

                            {/* LogOut */}
                                <div className='mt-5' onClick={handleNav}>
                                <hr />
                                    <Link to='/Admin/Profile' className="flex flex-row py-2 gap-2 items-center" onClick={handleNav}>

                                        <BiUserCircle size={28} />
                                        <h1 onClick={handleNav}>
                                        Admin
                                    </h1>
                                </Link>
                            </div>
                            <div className='mt-10'>
                                    <Link to='/' className="flex flex-row py-2 gap-2 items-center" onClick={clearLocalStorage}>

                                    <FiLogOut size={22} />
                                    <h1>
                                        LogOut
                                    </h1>
                                </Link>
                            </div>


                        </nav>
                    </div>
                    <div className='flex flex-col w-[100%]  min-h-screen h-max overflow-x-auto bg-blue-50'>
                        <div className={showTop ? 'w-full  flex flex-col max-md:justify-between justify-center max-md:pl-4 items-center text-2xl  md:sticky md:top-0 bg-blue-50 z-10  border-b-2 border-t-4 h-max':'max-md:hidden'}>
                            <div className='flex flex-row max-md:flex-col gap-x-4 justify-center items-center cursor-pointer p-2' >
                                <img src={logo} className='h-[60px] md:h-[80px] p-0 md:w-[80px] rounded-[50%] cursor-pointer ' />
                                <div className='flex flex-col items-center justify-center gap-y-0'>
                                    <h1 className='font-mono text-black text-[22px] max-md:text-[16px] font-bold' >Government Polytechnic Mumbai</h1>
                                    <p className='font-inherit text-gray-700 text-[16px] max-md:text-[12px] ' style={{letterSpacing:'1.4px'}} >(An Autonomous Institute of Government of Maharashtra)</p>
                                    <h2 className='text-black tex-[18px] max-md:text-[14px]' >Department of Information Technology</h2>                                    
                                </div>

                            </div>
                           
                        </div>
                        <div className='overflow-x-auto pb-24'>
                            <div className='flex flex-row justify-between bg-white px-2 max-md:py-2 max-md:sticky  top-0'>
                                <h1 className='font-mono text-xl max-md:text-[16px] text-blue-500  '>
                                    {
                                        changeLocation(location.pathname)
                                    }
                                </h1>
                                <div  className='md:hidden cursor-pointer flex flex-row gap-x-2'>
                                    <div onClick={handleShowTop} className='text-blue-700'>
                                    {
                                        showTop ? <BiDownArrow size={24} /> : <BiUpArrow size={24}/>
                                    }
                                    </div>
                                    <div onClick={handleNav}>
                                    {!nav ?
                                        <BiMenuAltRight size={28} />
                                        :
                                        ''
                                    }
                                    </div>
                                </div>
                            </div>                           
                            <Outlet />                           
                        </div>
                    </div>
                </div>
            </>
        }
        </>
    );
};

export default Sidebar;
