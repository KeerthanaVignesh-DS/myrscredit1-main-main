import GuestLayout from "@/Layouts/GuestLayout"

const ContactUs = () =>{
    return(
        <GuestLayout>
        <div className="container py-5">
          <h2 className="primary-text-color text-center mb-4">
           Contact Us
          </h2>
          <div className="row pt-5  mt-5 align-items-cente">
             <h5 className="text-center">1319 Hickory St., Kansas City, Missouri 64102 U.S.A. </h5>
             <h6 className="text-center">Phone: 816-421-1919 • Fax: 816-421-4880</h6>
             <h6 className="text-center">Email: <a href="mailto:CentralEmail@MyrsCredit.com" className="primary-text-color text-decoration-none">CentralEmail@MyrsCredit.com</a></h6>
            
          </div>
        
        </div>
        </GuestLayout>
    )
}

export default ContactUs;