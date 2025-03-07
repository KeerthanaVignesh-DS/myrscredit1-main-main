// import { NavLink } from "react-router-dom";

import GuestLayout from "@/Layouts/GuestLayout";
import { Link } from '@inertiajs/react';

export default function Home(){
    return(
        <GuestLayout>
        <div className="home pt-5">
            <div className="container py-md-5">
             <div className="d-flex justify-content-center align-items-center text-center">
                 <div className="col-md-9">
                    <h2 className="service">
                      "Credit & Collection Services for the housewares, home furnishings, jewelry, gift, lighting, hardware,
                        floral, craft, apparel, toy, stationery, specialty food, and related industries." 
                    </h2>
                  </div>
              </div>
             </div>
             <div className="container py-5">
                <div className="text-center">
                   <h3 className="primary-text-color">“USA & Canada Commercial Credit Advisory Services” </h3>
                   <h3 className="primary-text-color">& </h3> 
                   <h3 className="primary-text-color"> “Collection Services for Distributors, Foreign Exporters, Importers, <br/>and Offshoring Industries around the Globe” </h3>
                 </div>
                 <div className="d-flex justify-content-center align-items-center flex-column flex-md-row gap-4 py-5">
                       <Link href="/explanation-services" className="Nav_home py-3 px-4 rounded-1 text-center">Explanation of Services</Link>
                       <Link href="/recommendation-submission" className="Nav_home py-3 px-4 rounded-1 text-center">Recommendation Submission</Link>
                       {/* <Link href="/demand-letter-submission" className="Nav_home py-3 px-4 rounded-1 text-center ">Demand Letter Submission</Link> */}
                 </div>
             </div>
        </div>
        </GuestLayout>
    )
}
