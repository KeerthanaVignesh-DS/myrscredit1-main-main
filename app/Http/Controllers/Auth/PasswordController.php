<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use App\Models\User;

class PasswordController extends Controller
{
    /**
     * Update the user's password.
     */
    public function update(Request $request)
    {
        // $validated = $request->validate([
        //     'current_password' => ['required', 'current_password'],
        //     'password' => ['required', 'confirmed'],
        // ]);
        $user = User::where('id',$request->id)->first();
        
        // dd(Hash::check($request->current_password,$user->password));
        if(Hash::check($request->current_password,$user->password)){
            $request->user()->update([
                'password' => Hash::make($request->password),
                'security_question' => $request->security_question,
                'security_answer'   => $request->security_answer
            ]);
            return back()->with(['message'=>"password changed Successfully"]);
        }else{
            return back()->withErrors(['password' => 'Invalid old Password']);
        }
        

        
    }
}
