<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendPasswordToClient;


class PasswordResetLinkController extends Controller
{
    /**
     * Display the password reset link request view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/ForgotPassword', [
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming password reset link request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        // $request->validate([
        //     'email_address' => 'required|email',
        // ]);
        $user = User::where('email',$request->email)->first();
        if($user == null){
            return back()->withErrors(['email' => 'This Combination is not registered with Myrs']);
        }
        if ( $user->security_question != $request->security_ques ||$user->security_answer != $request->security_ans){
            return back()->withErrors(['email' => 'This Combination is not registered with Myrs']);
        }

        // We will send the password reset link to this user. Once we have attempted
        // to send the link, we will examine the response then see the message we
        // need to show to the user. Finally, we'll send out a proper response.
        // $status = Password::sendResetLink(
        //     $request->only('email')
        // );

        // if ($status == Password::RESET_LINK_SENT) {
        //     return back()->with('status', __($status));
        // }

        // throw ValidationException::withMessages([
        //     'email' => [trans($status)],
        // ]);
        // return back()->with('message','email sent successfully');\
        try{
        Mail::to($user->email)->send(new SendPasswordToClient($user->show_password,$user->username));

         } catch (\Exception $e) {
                    throw ValidationException::withMessages([
                        'email' => ['Failed to send the email. Please try again later.'],
                    ]);
                }
        return Inertia::render('Auth/ForgotPassword', [
            'message' => 'Your login details has been mailed to you.',
            'toast' => 1
        ]);
        // return back()->with('message','Your login details has been mailed to you.');
    }
    public function createUser(): Response
    {
        return Inertia::render('Auth/ForgotUsername', [
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming password reset link request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function storeUser(Request $request)
    {
        // $request->validate([
        //     'email_address' => 'required|email',
        // ]);
        $user = User::where('email',$request->email)->first();
        if($user == null){
            return back()->withErrors(['email' => 'This Combination is not registered with Myrs']);
        }
        if ( $user->security_question != $request->security_ques ||$user->security_answer != $request->security_ans){
            return back()->withErrors(['email' => 'This Combination is not registered with Myrs']);
        }

        // We will send the password reset link to this user. Once we have attempted
        // to send the link, we will examine the response then see the message we
        // need to show to the user. Finally, we'll send out a proper response.
        // Send email with the username
    Mail::raw("Dear user, your username is: " . $user->username, function ($message) use ($user) {
        $message->to($user->email)
                ->subject('Your Username Information');
    });
    return Inertia::render('Auth/Login', [
        'message' => 'email sent successfully',
    ]);
    // return back()->withMessage('Username has been sent to your email.');
    //     // return back()->with('message','email sent successfully');
    }
}
