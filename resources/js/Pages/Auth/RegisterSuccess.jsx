import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function RegisterSuccess() {
    

    return (
        <GuestLayout>
            <div className="login">
                
                <div className="container py-5">
                    <div className="container py-5">
                        <h2 className="primary-text-color text-center mb-5">
                            Registration Successful
                            </h2>
                            <div className="col-12 col-lg-6 col-xl-5 bg-light mx-auto">
                                <div className="p-4 p-md-5">
                                    <div className="text-center"><h3><small>Thanks!!</small></h3></div>
                                    <h4><small >Your application has been sent to Myrs. We will activate your registration shortly... 
                                    </small></h4>
                                </div>
                            </div>

                    </div>           
               
                </div>
                

                {/* <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route('login')}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Already registered?
                    </Link>

                    
                </div> */}
            </div>
        </GuestLayout>
    );
}

