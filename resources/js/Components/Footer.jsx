
import { NavLink } from "react-router-dom";
import { CiPhone } from "react-icons/ci";
import { FaRegEnvelope } from "react-icons/fa";
import { LiaFaxSolid } from "react-icons/lia";

export default function Footer(){
	
    return(
        <footer className="py-3">
            <div className="container">
                <div className="row flex-column-reverse flex-md-row">
                    <div className="col-12 col-md-4 text-white d-flex text justify-content-md-start justify-content-center">
                        {/* <span>Copyright © myrscredit.com 2025</span> */}
                        <span className="text">1319 Hickory St., Kansas City, Missouri 64102 U.S.A.</span>

                    </div>
                    <div className="col-12 col-md-8 text-white">
                        <div className="d-flex justify-content-md-end justify-content-center flex-wrap gap-md-3">
                                <div className="d-flex align-items-center gap-2">
                                    <CiPhone className="phone-icon"/>
                                    <span className="text">816-421-1919</span>
                                </div>
                                {/* <div className="d-flex align-items-center gap-1">
                                    <LiaFaxSolid className="phone-icon"/>
                                    <span className="text">816-421-4880</span>
                                </div> */}
                                <div className="d-flex align-items-center gap-1 py-md-0 py-2">
                                     <FaRegEnvelope  className="email-icon"/>
                                      <span className="text"><a href="mailto:CentralEmail@MyrsCredit.com" className="mail">CentralEmail@MyrsCredit.com</a></span>
                                </div>
                        </div>
                       
                    </div>
                </div>
            </div>
            
        </footer>
    )
}