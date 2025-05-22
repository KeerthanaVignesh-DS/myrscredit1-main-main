<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Models\Submission;

use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;
use App\Mail\ApprovalMailToClientMail;
use Illuminate\Validation\ValidationException;




use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $users = User::query();
        if ($request->has('is_act') && $request->is_act != null) {
           $users->where('is_active', $request->is_act);
            $users->orderBy('company');
            $users = $users->with('latestSubmission')->get();
        }else if ($request->has('date_from') && $request->has('date_to')) {
            if($request->date_from != null && $request->date_to != null ){
                $users->whereBetween('created_at', [Carbon::parse($request->date_from)->startOfDay(),  Carbon::parse($request->date_to)->endOfDay()]);
                $users->orderBy('company');
                $users = $users->with('latestSubmission')->get();

            }
        }else{
            $users->whereDate('created_at', Carbon::today());
            $users->orderBy('company');
                $users = $users->with('latestSubmission')->get();
        }
        
        // dd($users);

        return Inertia::render('Admin/Client', [
            'users' => $users,
            'message' => 'Operation completed successfully.',
            
        ]);
    }

    public function index1()
    {
        $todayClients = User::whereDate('created_at', Carbon::today())->get();
        $todaySubmissions = Submission::whereDate('submitted_date', Carbon::today())->get();
        $pendingClients = User::whereDate('created_at', Carbon::yesterday())
                            ->where('is_active', 0)
                            ->get();

        // dd($pendingClients);
        return Inertia::render('Admin/HomePage',[
            'clients' => $todayClients,
            'submissions' =>$todaySubmissions,
            'pending' => $pendingClients
        ]);
    }
    public function updateUser(Request $request )
    {
        $user = User::where('id',$request->data['id'])->update([
            'name' => $request->data['name'],
                'username' => $request->data['username'],
                'email' => $request->data['submissionemail'],
                // 'password' => Hash::make($request->data['password']),
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
                // 'is_admin' =>0,
                // 'is_active' =>0,
                // 'status' =>0,
                'is_copy' => $request->data['copy'],
                'account_number' => $request->data['account_number'],
                // 'show_password' => $request->data['password']
        ]);
        
        // return Inertia::render('Admin/Client',[
        //     'message' => "Client updated successfully",
        //     'success' => 1
        // ]);
        return back();
    }
    public function makeActive(Request $request ){
        User::where('id',$request->data['id'])->update([
                'is_active' =>$request->data['is_active'],
                'status' =>$request->data['is_active'],
                
        ]);
        $user = User::find($request->data['id']);
        if($request->data['is_active']==1){
            try{
                     Mail::to($user->email)->send(new ApprovalMailToClientMail($user));
                      } catch (\Exception $e) {
                    throw ValidationException::withMessages([
                        'email' => ['Failed to send the email. Please try again later.'],
                    ]);
                }

        }
        
        return Inertia::render('Admin/Client',[
            'message' => "Client updated successfully",
            'success' => 1
        ]);

    }

}
