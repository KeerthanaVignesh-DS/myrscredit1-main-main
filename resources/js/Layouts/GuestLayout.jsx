import ApplicationLogo from '@/Components/ApplicationLogo';
import Footer from '@/Components/Footer';
import Header from '@/Components/Header';
import { Link, usePage } from '@inertiajs/react';
import AdminLayout from './AdminLayout';
import { Children, useState } from 'react';
import { MdOutlineMenu } from "react-icons/md";
import { Inertia } from '@inertiajs/inertia';
import InnerMenu from '@/Components/InnerMenu';


export default function GuestLayout({ children,edit }) {
    const admin = usePage().props.auth.user?.is_admin;
    console.log(admin)
    const  [mobileMenu, setMobileMenu] = useState(true);
            const { url } = usePage(); 
            const user = usePage().props.auth.user;
    
            const handelMenu = () => {
              
                setMobileMenu(!mobileMenu);
            } 
    
            const onLogout =()=>{
                Inertia.post('logout');
            }

    return (
        <>
        {admin!== 1 ? (
            <>
            {edit!==0  ? ( 
                <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
                {/* <div>
                    <Link href="/">
                        <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
                    </Link>
                </div> */}
                <Header/>
                {user?.id && 
                <InnerMenu></InnerMenu>
    
                }
                
                <div className="mt-6 w-full overflow-hidden bg-white px-6  shadow-md sm:max-w-md sm:rounded-lg">
                    {children}
                </div>
    
                <Footer/>
            </div>
           ) : (
               <div className="mt-6 w-full overflow-hidden bg-white px-6  shadow-md sm:max-w-md sm:rounded-lg">
                    {children}
                </div>
           )
       }
       </>
        ) : (
            <>
            {edit!==0  ? ( 
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
                                <Link href="/admin-home" className={url === "admin-home" ? "nav-item nav-link active" :"nav-item nav-link"}>Home Page</Link>
                                <Link href="/admin-submissions" className={url === "admin-submissions" ? "nav-item nav-link active" :"nav-item nav-link"}>Submissions</Link>
                                <Link href="/admin-summary" className={url === "admin-summary" ? "nav-item nav-link active" :"nav-item nav-link"}>Summary Report</Link>
                                <Link href="/admin-client" className={url === "admin-client" ? "nav-item nav-link active" :"nav-item nav-link"}>Clients</Link>
                                <Link href="/admin-billing" className={url === "/admin-billing" ? "nav-item nav-link active" :"nav-item nav-link"}>Billing</Link>
                                {/* <Link href="/my-profile" className={url === "/my-profile" ? "nav-item nav-link active" :"nav-item nav-link"}>My Profile</Link> */}
                                <Link href="/change-password" className={url === "/change-password" ? "nav-item nav-link active" :"nav-item nav-link"}>Change Password</Link>
                            </div>
                            <button onClick={onLogout} className="btn login-btn border-secondary rounded-pill py-2 px-4 px-lg-3 mb-3 mb-md-3 mb-lg-0">Logout</button>
                        </div>
                    </nav>
                </header>
                <h3 className="mb-0 mt-3 text-primary">Welcome: {user.name} </h3>
        
                <div className="mt-2 w-full overflow-hidden bg-white px-6  shadow-md sm:max-w-md sm:rounded-lg">
                    {children}
                </div>
                
                <Footer/>
            </div>
             ) : (
                <div className="mt-6 w-full overflow-hidden bg-white px-6  shadow-md sm:max-w-md sm:rounded-lg">
                     {children}
                 </div>
            )
        }
            </>
        )}
        
    
        </>
       
    );
}
