import Footer from "@/Components/Footer";
import { Inertia } from "@inertiajs/inertia";
import { Link, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import { MdOutlineMenu } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useLocation } from 'react-router-dom';

export default function AdminLayout ({children}) {
    
    const  [mobileMenu, setMobileMenu] = useState(true);
    const { url } = usePage(); 
    const baseUrl = new URL(url, window.location.origin).pathname;
        
    const user = usePage().props.auth.user;

    const handelMenu = () => {   
            setMobileMenu(!mobileMenu);
    } 

    const onLogout =()=>{
        router.post('logout');
            
    }

    
    return(
        <>
        <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
            <header className="container-fluid nav-bar p-0  primary-bg-color">
                <nav className="navbar navbar-expand-lg navbar-light  px-4 px-lg-5 py-3 py-lg-0 d-lg-flex flex-lg-column flex-xl-row">
                    <Link href="/" className="navbar-brand p-0 mt-lg-3 mt-xl-0">
                            <h1 className="display-5 text-white logo m-0">Myrs Credit Advisors, Inc.</h1>
                        
                    </Link>
                    <button className="navbar-toggler" type="button" onClick={() => handelMenu (true)}>
                        <MdOutlineMenu />
                    </button>
                        
                    <div onClick={() => handelMenu (false)} id="navbarCollapse" className={`${mobileMenu === true ? ""  :"open"} navbar collapse navbar-collapse`}>
                        <div className="navbar-nav ms-auto py-0">
                            <Link href="/admin-home" className={baseUrl === "/admin-home" ? "nav-item nav-link active" :"nav-item nav-link"}>Home Page</Link>
                            <Link href="/admin-submissions" className={baseUrl === "/admin-submissions" ? "nav-item nav-link active" :"nav-item nav-link"}>Submissions</Link>
                            <Link href="/admin-summary" className={baseUrl === "/admin-summary" ? "nav-item nav-link active" :"nav-item nav-link"}>Summary Report</Link>
                            <Link href="/admin-client" className={baseUrl === "/admin-client" ? "nav-item nav-link active" :"nav-item nav-link"}>Clients</Link>
                            <Link href="/admin-billing" className={baseUrl === "/admin-billing" ? "nav-item nav-link active" :"nav-item nav-link"}>Billing</Link>
                            {/* <Link href="/my-profile" className={baseUrl === "/my-profile" ? "nav-item nav-link active" :"nav-item nav-link"}>My Profile</Link> */}
                            <Link href="/change-password" className={baseUrl === "/change-password" ? "nav-item nav-link active" :"nav-item nav-link"}>Change Password</Link>
                        </div>
                        <button onClick={onLogout} className="btn login-btn border-secondary rounded-pill py-2 px-4 px-lg-3 mb-3 mb-md-3 mb-lg-0">Logout</button>
                        </div>
                </nav>
            </header>
            {/* <h3 className="mb-0 mt-3 text-primary">Welcome: {user.name} </h3> */}
            <h3 className="mb-0 mt-3">
            <span className="text-primary text-lg">Welcome:</span>  
            <span className="text-danger text-xl font-bold"> {user?.name || "Guest"}</span>
            </h3>

            <div className="mt-2 w-full overflow-hidden bg-white px-6  shadow-md sm:max-w-md sm:rounded-lg">
                {children}
            </div>
            
            <Footer/>
        </div>
        </>
    )
}