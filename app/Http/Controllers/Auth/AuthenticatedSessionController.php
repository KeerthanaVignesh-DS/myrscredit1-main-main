<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

   

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request)
    {
        // dd($request);
        $user = User::where('username', $request->username)->first();
        
        if($user && $request->user == "client" && $user->is_admin == 1){
            return back()->withErrors(['username' => 'Invalid credentials']);
        }elseif($user && $request->user == "admin" && $user->is_admin == 0){
            return back()->withErrors(['username' => 'Invalid credentials']);
        }
        
        if($user && $user->is_active == 0){
            return back()->withErrors(['username' => 'Your account is not active. Please contact Admin']);
        }

        $request->authenticate();

        $request->session()->regenerate();
        

        if( $user->is_admin == 1){
            return redirect()->route('adminHome');

        }
        

        return redirect()->route('recommendation-submission');
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request)
    {
        // dd($request->user()->is_admin);
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();
        // if($request->user() && $request->user()->is_admin == 0){
        //     // return redirect()->intended(route('recommendation-submission'));
        //     return redirect()->route('home');

        // }else{
        //     // return Inertia::render('Admin/Login');
        //     return redirect()->route('home');
        // }
        return redirect()->route('login');

    }
}
