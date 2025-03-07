<?php

namespace App\Http\Controllers;

use App\Models\Submission;
use App\Models\User;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
// use Barryvdh\DomPDF\Facade\Pdf;




class SubmissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user()->id;
        
        // $submissions = Submission::where('user_id',$user)->get();
        $query = Submission::query();
        if ($request->has('name') && $request->name !== '--All--') {
            $query->where('id', $request->name); // Adjust column name as necessary
        }

        // Filter by "Month to Date" option
        if ($request->has('month_to_date')) {
            if($request->month_to_date == "1"){
                $query->whereMonth('submitted_date', now()->month)
                  ->whereYear('submitted_date', now()->year);

            }elseif ($request->month_to_date == "2") {
                // Last month
                $query->whereMonth('submitted_date', now()->subMonth()->month)
                      ->whereYear('submitted_date', now()->subMonth()->year);
            } elseif ($request->month_to_date == "3") {
                // Current year to date
                $query->whereYear('submitted_date', now()->year);
            }
            
        }
    
        // Filter by submission status
        if ($request->has('status') && $request->status !== '--All--') {
            $query->where('status', $request->status);
        }else{
            $query->where('status', 0);
        }
    
        // Filter by date range
        if ($request->has('date_from') && $request->has('date_to')) {
            if($request->has('dateFilter')){
                if($request->dateFilter == 'completed_date'){
                    $query->whereBetween('completed_date', [Carbon::parse($request->date_from),  Carbon::parse($request->date_to)]);
                }else{
                    $query->whereBetween('submitted_date', [Carbon::parse($request->date_from),  Carbon::parse($request->date_to)]);
                }
            
            }else{
                $query->whereBetween('submitted_date', [ Carbon::parse($request->date_from),  Carbon::parse($request->date_to)]);


            }
            
        }else{
            $query->whereBetween('submitted_date', [carbon::now()->toDateString(), carbon::now()->toDateString()]);
        }
    
        

        
        // Get the results
        $submissions = $query->where('user_id',$user)->get();
        return Inertia::render('MySubmissions/MySubmissions', [
            'submissions' => $submissions
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // $fields = json_decode($request->fields);
        // dd(  $request->fields[0]['myrsProduct']);
        // $validated = $request->validate([
        //     'fields' => 'required|array',
        //     'fields.*.name' => 'required|string|max:255',
        //     'fields.*.value' => 'required|string|max:255',
        //     'fields.*.option' => 'required|string|max:255',
        // ]);
        if($request->id !== 0){
            $submission = Submission::find($request->id);
            if ($submission) {
                // Update specific fields using the model
                $submission->myrs_product = $request->fields[0]['myrsProduct'];
                $submission->order_amount = $request->fields[0]['orderAmount'];
                $submission->save(); // Save changes to the database
            }
            return back()->with(['message' => 'Submitted successfully!']);
            

        }else{
            foreach ($request->fields as $field) {
                Submission::create([
                    // '' => $request->lblSrNo;
                    'name' => $field['account_name'],
                    'user_id' => $field['user_id'],
                    'address1' => $field['account_address1'],
                    'address2' => $field['account_address2'],
                    'city' => $field['account_city'],
                    'state' => $field['account_state'],
                    'zip' => $field['account_zip'],
                    'country' => $field['account_country'],
                    'phone' => $field['account_phone'],
                    'myrs_product' => $field['myrsProduct'],
                    'express_service' => $field['expressService'],
                    'order_amount' => $field['orderAmount'],
                    'chk_previous14' => $field['chk_previous14'],
                    'comments' => $field['comments'],
                    'lbl_doc_name1' => $field['lbl_doc_name1'],
                    'file_upload_controls1' => $field['file_upload_controls1'],
                    'doc_name1' => $field['doc_name1'],
                    'lbl_doc_name2' => $field['lbl_doc_name2'],
                    'file_upload_controls2' => $field['file_upload_controls2'],
                    'doc_name2' => $field['doc_name2'],
                    'submitted_date' => Carbon::now()
                ]);
            }
        }
        
        return back()->with(['message' => 'Submitted successfully!']); 

    }

    /**
     * Display the specified resource.
     */
    public function show(Submission $submission)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Submission $submission)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Submission $submission)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Submission $submission)
    {
        //
    }

    public function adminIndex(Request $request){
        $clients = User::orderBy('company')->get();
        $query = Submission::query();
        $today = Carbon::today();


        if ($request->has('client') && $request->client !== '--All--') {
            $query->where('user_id', $request->client);
        }

        // Filter by submission status
        if ($request->has('status') && $request->status !== '--All--') {
            $query->where('status', $request->status);
        }else{
            $query->where('status', 0);
        }
    
        // Filter by date range
        if ($request->has('date_from') && $request->has('date_to')) {
            if($request->has('dateFilter')){
                if($request->dateFilter == 'completed_date'){
                    $query->whereBetween('completed_date', [Carbon::parse($request->date_from),  Carbon::parse($request->date_to)]);
                }else{
                    $query->whereBetween('submitted_date', [Carbon::parse($request->date_from),  Carbon::parse($request->date_to)]);
                }
            
            }else{
                $query->whereBetween('submitted_date', [ Carbon::parse($request->date_from),  Carbon::parse($request->date_to)]);


            }
            
        }else{
            // $query->whereBetween('submitted_date', [carbon::now()->toDateString(), carbon::now()->toDateString()]);
            $query->whereDate('submitted_date', $today);

            // dd($query->get());

            
        }
        if ($request->has('serviceLevel') && $request->serviceLevel !== 0) {
            $query->where('express_service', $request->serviceLevel);
        }
    
        $submissions = $query->with('user')->get();

        return Inertia::render('Admin/SubmissionsList', [
            'Submissions' => $submissions,
            'Clients'     => $clients,
        ]);
    }
    public function updatepdf(Request $request){
        // dd($request);
        $submission = Submission::find($request->id);
        $submission->charge_amt = $request->charge_amt;
        $submission->completed_date = $request->completed_date;
        $submission->secondary_phone = $request->secondary_phone;
        $submission->additional_address = $request->additional_address;
        $submission->web = $request->web;
        $submission->account_status = $request->account_status;
        $submission->no_of_records = $request->no_of_records;
        $submission->no_of_payment_records = $request->no_of_payment_records;
        $submission->recent_inquiries1 = $request->recent_inquiries1;
        $submission->recent_inquiries2 = $request->recent_inquiries2;
        $submission->submit_type = $request->submit_type;
        $submission->myrs_rating = $request->myrs_rating;
        $submission->amount = $request->amount;

        $submission->save();

        return back()->with(['message' => 'Submitted successfully!']); 

    }
    public function downloadPdf()
        {
            // $pdf = Pdf::loadView('pdf.invoice', ['data' => $data]);
            // return $pdf->download('invoice.pdf');
        }
}
