import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />

            <form onSubmit={submit} lassName="container py-3">
              <h2 className="primary-text-color text-center mb-2">
                 Reset Password
              </h2>
            
              <div className="row px-2 px-md-5 justify-content-center mt-5">
                <div className="col-12 col-md-6 col-xl-5">
                  <div className="bg-light p-4">
                   
                    <div className="col-md-12 mb-2">
                      
                      <InputLabel className="form-label" htmlFor="email" value="Email" />
                      
                                          <TextInput
                                              id="email"
                                              type="email"
                                              name="email"
                                              value={data.email}
                                              className="form-control"
                                              autoComplete="username"
                                              onChange={(e) => setData('email', e.target.value)}
                                          />
                      
                        <InputError message={errors.email} className="mt-2 text-danger" />

                    </div>
                  
                    <div className="col-md-12 mb-2">
                        <InputLabel htmlFor="password" className="form-label" value="Password" />
                        
                                            <TextInput
                                                id="password"
                                                type="password"
                                                name="password"
                                                value={data.password}
                                                className="form-control"
                                                autoComplete="new-password"
                                                isFocused={true}
                                                onChange={(e) => setData('password', e.target.value)}
                                            />
                        
                        <InputError message={errors.password} className="mt-2 text-danger" />
                        
                      </div>
                      {/* {errors.security_Ques && <p className="text-danger mx-1">{errors.security_Ques.message}</p>} */}

                      
                      <div className="col-md-12 mb-2">
                       <InputLabel
                            htmlFor="password_confirmation"
                            value="Confirm Password"
                            className="form-label"
                        />

                        <TextInput
                            type="password"
                            id="password_confirmation"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="form-control"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                        />

                        <InputError
                            message={errors.password_confirmation}
                            className="mt-2 text-danger"
                        />
                     </div>
                     {/* {errors.security_ans && <p className="text-danger mx-1">{errors.security_ans.message}</p>} */}

                  </div>
                </div>
                
                {console.log(errors)}
                <div className="d-flex justify-content-center align-items-center gap-2 pt-5">
                    <PrimaryButton className="btn btn-primary text-uppercase" disabled={processing}>
                                            Reset Password
                                        </PrimaryButton>
                     
                     {/* <Link href to="/login" className="btn btn-primary text-uppercase">Cancel</Link> */}
                </div>
              </div>
            </form>
        </GuestLayout>
    );
}
