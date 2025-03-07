<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Requests\Auth\UserRegistrationRequest;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;


class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        $captcha = $this->generateCaptcha();
        return Inertia::render('Auth/Register', [
            'captcha' => $captcha, // Pass CAPTCHA as a prop
        ]);
    }

    public function returnSuccess(): Response
    {
        
        return Inertia::render('Auth/RegisterSuccess');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        // dd($request->data['name']);
        
        // $request->validate([
        //     $validator = Validator::make($request->all(), [
        //     // 'name' => 'required|string|max:255',
        //     // 'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
        //     // 'password' => ['required', 'confirmed', Rules\Password::defaults()],
        //     'name' => 'required|string|max:255',
        //     'company' => 'required|string|max:255',
        //     'address1' => 'required|string|max:255',
        //     'address2' => 'nullable|string|max:255',
        //     'city' => 'required|string|max:255',
        //     'state_province' => 'required|string|max:255',
        //     'zip' => 'required|string|max:10',
        //     'country' => 'required|string|max:255',
        //     'ap_email' => 'required|email',
        //     'email' => 'required|email|unique:users',
        //     'username' => 'required|string|max:255|unique:users',
        //     'password' => 'required|string|confirmed',
        //     'security_question' => 'required|string',
        //     'security_answer' => 'required|string',
        // ]);
        // dd($validator->name);

        //   // Check for validation errors
        //   if ($validator->fails()) {
        //     return redirect()->back()->withErrors($validator)->withInput();
        // }

        // Verify CAPTCHA
        // if (strtoupper($request->captcha) != session('captcha')) {
        //     return redirect()->back()->withErrors(['captcha' => 'Incorrect CAPTCHA'])->withInput();
        // }
        // dd($request);
        // Check if company already exists
        if($request->data['edit'] == 0){
            if (User::where('company', $request->data['company'])->exists()) {
                return back()->withErrors(['company' => 'Company is already registered.']);
            }
            if (User::where('username', $request->data['username'])->exists()) {
                return back()->withErrors(['username' => 'username is already registered.']);
            }
            if (User::where('email', $request->data['submissionemail'])->exists()) {
                return back()->withErrors(['submissionemail' => 'email is already registered.']);
            }

    
            $user = User::create([
                // 'name' => $request->name,
                // 'email' => $request->email,
                // 'password' => Hash::make($request->password),
                'name' => $request->data['name'],
                'username' => $request->data['username'],
                'email' => $request->data['submissionemail'],
                'password' => Hash::make($request->data['password']),
                'security_question' => $request->data['security_question'],
                'security_answer' => $request->data['security_answer'],
                'company' => $request->data['company'],
                'title' => $request->data['title'],
                'address1' => $request->data['address1'],
                'address2' => $request->data['address2'],
                'city' => $request->data['city'],
                'state' => $request->data['state_province'],
                'zip' => $request->data['zip'],
                'country' => $request->data['country'],
                'ap_email' => $request->data['apemail'],
                'phone' => $request->data['phone'],
                'fax' => $request->data['fax'],
                'is_admin' =>0,
                'is_active' =>0,
                'status' =>0,
                'is_copy' => $request->data['copy'],
                'show_password' => $request->data['password']
            ]);
            return Inertia::render('Auth/RegisterSuccess');
        }else{
        // $user = User::where('id',$request->data['id'])->update([
        //     'name' => $request->data['name'],
        //         'username' => $request->data['username'],
        //         'email' => $request->data['submissionemail'],
        //         // 'password' => Hash::make($request->data['password']),
        //         'security_question' => $request->data['security_question'],
        //         'security_answer' => $request->data['security_answer'],
        //         'company' => $request->data['company'],
        //         'title' => $request->data['title'],
        //         'address1' => $request->data['address1'],
        //         'address2' => $request->data['address2'],
        //         'city' => $request->data['city'],
        //         'state' => $request->data['state_province'],
        //         'zip' => $request->data['zip'],
        //         'country' => $request->data['country'],
        //         'ap_email' => $request->data['apemail'],
        //         'phone' => $request->data['phone'],
        //         'fax' => $request->data['fax'],
        //         // 'is_admin' =>0,
        //         // 'is_active' =>0,
        //         // 'status' =>0,
        //         'is_copy' => $request->data['copy'],
        //         'account_number' => $request->data['account_number'],
        //         // 'show_password' => $request->data['password']
        // ]);
        $user = User::find($request->data['id']);
        dd($user);
        return Inertia::render('Admin/Client',[
            'message' => "Client updated successfully"
        ]);

        }
        

        // event(new Registered($user));

        // Send email to admin
        // $this->sendRegistrationMailToAdmin($request);

        // // Log the user in and redirect to a success page
        // auth()->login($user);
        // return redirect()->route('registration.success');
    

        // Auth::login($user);
        

        // return redirect()->intended(route('returnSuccess', absolute: false));  
        // return back()->with(['message' => 'Client Registered successfully!']); 
       
    }
    
    
    private function sendRegistrationMailToAdmin($request)
    {
        
        $adminEmail = env('MAIL_ADMIN_ADDRESS');
        $fromEmail = env('MAIL_FROM_ADDRESS');
        $subject = "New Client Registration Request";

        $data = [
            'name' => $request->data['name'],
            'title' => $request->data['title'],
            'company' => $request->data['company'],
            'address1' => $request->data['address1'],
            'address2' => $request->data['address2'],
            'city' => $request->data['city'],
            'state_province' => $request->data['state_province'],
            'country' => $request->data['country'],
            'zip' => $request->data['zip'],
            'email' => $request->data['submissionemail'],
            'phone' => $request->data['phone'],
            'fax' => $request->data['fax'],
        ];

        Mail::send('emails.registration_admin', $data, function ($message) use ($adminEmail, $fromEmail, $subject) {
            $message->from($fromEmail);
            $message->to($adminEmail)->subject($subject);
        });
    }

    public function getGenerateCaptcha()
    {
        $captcha = $this->generateCaptcha();
        return back()->with(['captcha' => $captcha]);
    }
    
    
    private function generateCaptcha()
    {
        $captcha = strtoupper(Str::random(4));
        session(['captcha' => $captcha]);
        return $captcha;
    }



}
