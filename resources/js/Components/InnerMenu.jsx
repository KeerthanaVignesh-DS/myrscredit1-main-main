import {NavLink } from "react-router-dom";
import { Link, router, usePage } from '@inertiajs/react';


export default function InnerMenu() {

    const user = usePage().props.auth.user;
    const { url } = usePage(); 

    
  

    return(
        <>
            <div className="d-flex justify-content-between align-items-center flex-column flex-xl-row innerMenu  px-4 px-lg-5 pb-1 bg-light py-2">
                <h3 className="mb-0">Welcome: {user.name} </h3>
              
                    <div className="d-flex justify-content-end flex-column flex-md-row align-items-center gap-1 mt-3 mt-xl-0 my-2">
                        <Link href="/my-submissions" className={url === "/my-submissions" ? "tab-menu py-2 px-4 rounded-1 text-center active" :"tab-menu py-2 px-4 rounded-1 text-center"}>My Submissions</Link>
                        <Link href="/billing-login" className={url === "/billing-login" ? "tab-menu py-2 px-4 rounded-1 text-center active" :"tab-menu py-2 px-4 rounded-1 text-center"}>My Billing</Link>
                        <Link href="/my-profile" className={url === "/my-profile" ? "tab-menu py-2 px-4 rounded-1 text-center active" :"tab-menu py-2 px-4 rounded-1 text-center"}>My Profile</Link>
                        <Link href="/change-password" className={url === "/change-password" ? "tab-menu py-2 px-4 rounded-1 text-center active" :"tab-menu py-2 px-4 rounded-1 text-center"}>Change Password</Link>
                        {/* <button onClick={onLogout} className={url === "/my-submissions" ? "tab-menu py-2 px-4 rounded-1 text-center active" :"tab-menu py-2 px-4 rounded-1 text-center"}>Logout</button> */}

                    </div>
               
             </div>
        </>
    )
}