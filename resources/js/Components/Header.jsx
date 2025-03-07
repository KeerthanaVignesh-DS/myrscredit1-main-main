import { useState} from "react";
// import { a } from "react-router-dom";
import { CiPhone } from "react-icons/ci";
import { FaRegEnvelope } from "react-icons/fa";
import { MdOutlineMenu } from "react-icons/md";
import { Link,usePage,router } from '@inertiajs/react';


export default function Header(){

    const user = usePage().props.auth.user;
    // console.log(user,"gusetlasdad")

	const  [mobileMenu, setMobileMenu] = useState(true);
    const { url } = usePage(); 

    const handelMenu = () => {
      
        setMobileMenu(!mobileMenu);
    } 

    const onLogout = () =>{
        router.post('/logout');
    }
    return(
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
                        <Link href="/" className={url === "/" ? "nav-item nav-link active" :"nav-item nav-link"}>Home Page</Link>
						<Link href="/explanation-services" className={url === "/explanation-services" ? "nav-item nav-link active" :"nav-item nav-link"}>Explanation of Services</Link>
						<Link href="/recommendation-submission" className={url === "/recommendation-submission" ? "nav-item nav-link active" :"nav-item nav-link"}>Recommendation Submission</Link>
						{/* <Link href="/demand-letter-submission" className={url === "/demand-letter-submission" ? "nav-item nav-link active" :"nav-item nav-link"}>Demand Letter Submission</Link> */}
                        {/* <Link href="/contact-us" className={url === "/contact-us" ? "nav-item nav-link active" :"nav-item nav-link"}>Contact Us</Link> */}
                    </div>
                    {user === null &&  <Link href="/login"  className="btn login-btn border-secondary rounded-pill py-2 px-4 px-lg-3 mb-3 mb-md-3 mb-lg-0">Client Login</Link>}
                    {user !== null &&  <button onClick={onLogout}  className="btn login-btn border-secondary rounded-pill py-2 px-4 px-lg-3 mb-3 mb-md-3 mb-lg-0">Logout</button>}
                </div>
            </nav>
        </header>
    )
}