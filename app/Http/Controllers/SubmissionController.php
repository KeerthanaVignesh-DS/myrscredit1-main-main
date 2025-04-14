<?php

namespace App\Http\Controllers;

use App\Models\Submission;
use App\Models\User;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;


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
        $today = Carbon::today();

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
            // $query->where('status', 0);
        }
    
        // Filter by date range
        if ($request->has('date_from') && $request->has('date_to')) {
            if($request->has('dateFilter')){

                if($request->dateFilter == 'completed_date'){
                    // dd($query->get());
                    
                    $dateFrom = Carbon::createFromFormat('d-m-Y', $request->date_from)->format('Y-m-d');
                    $dateTo = Carbon::createFromFormat('d-m-Y', $request->date_to)->format('Y-m-d');
                    
                    $query->whereBetween(\DB::raw('DATE(completed_date)'), [Carbon::parse($request->date_from)->startOfDay(),  Carbon::parse($request->date_to)->endOfDay()]);



                }else{
                    $query->whereBetween('submitted_date', [Carbon::parse($request->date_from)->startOfDay(),  Carbon::parse($request->date_to)->endOfDay()]);
                    $query->whereNull('completed_date');


                }
            
            }else{
                $query->whereBetween('submitted_date', [ Carbon::parse($request->date_from)->startOfDay(),  Carbon::parse($request->date_to)->endOfDay()]);
                $query->whereNull('completed_date');


            }
            
        }else{
            // $query->whereBetween('submitted_date', [carbon::now()->toDateString(), carbon::now()->toDateString()]);
            $query->whereDate('submitted_date', $today);
            $query->whereNull('completed_date');



            // dd($query->get());

            
        }
    
        

        $account = Submission::where('user_id', $user)
                    ->select('id', 'name')->get();

        // Get the results
        $submissions = $query->where('user_id',$user)->get();
        $total = $submissions->sum('charge_amt');

        return Inertia::render('MySubmissions/MySubmissions', [
            'submissions' => $submissions,
            'account_name'     => $account,
            'total'           => $total
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Recommendation Submission/RecommendationSubmission');
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
        
        function generateFilename($file)
        {
            return time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
        }

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
        
        return Inertia::render('Recommendation Submission/RecommendationSubmission', [
           
            'toast1'  => true
            
        ]);    

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
        $total = 0;


        if ($request->has('client') && $request->client !== '--All--') {
            $query->where('user_id', $request->client);
        }

        // Filter by submission status
        if ($request->has('status') && $request->status !== '--All--') {
            $query->where('status', $request->status);
        }else{
            // $query->where('status', 0);
        }
    
        // Filter by date range
        if ($request->has('date_from') && $request->has('date_to')) {
            if($request->has('dateFilter')){

                if($request->dateFilter == 'completed_date'){
                    // dd($query->get());
                    
                    $dateFrom = Carbon::createFromFormat('d-m-Y', $request->date_from)->format('Y-m-d');
                    $dateTo = Carbon::createFromFormat('d-m-Y', $request->date_to)->format('Y-m-d');
                    
                    $query->whereBetween(\DB::raw('DATE(completed_date)'), [Carbon::parse($request->date_from)->startOfDay(),  Carbon::parse($request->date_to)->endOfDay()]);



                }else{
                    $query->whereBetween('submitted_date', [Carbon::parse($request->date_from)->startOfDay(),  Carbon::parse($request->date_to)->endOfDay()]);
                    $query->whereNull('completed_date');


                }
            
            }else{
                $query->whereBetween('submitted_date', [ Carbon::parse($request->date_from)->startOfDay(),  Carbon::parse($request->date_to)->endOfDay()]);
                $query->whereNull('completed_date');


            }
            
        }else{
            // $query->whereBetween('submitted_date', [carbon::now()->toDateString(), carbon::now()->toDateString()]);
            $query->whereDate('submitted_date', $today);
            $query->whereNull('completed_date');



            // dd($query->get());

            
        }
        if ($request->has('serviceLevel') && $request->serviceLevel !== 0) {
            $query->where('express_service', $request->serviceLevel);
        }
    
        $submissions = $query->with('user')->get();
        $total = $submissions->sum('charge_amt');
        $allSubmissions = Submission::all();

        // Filter completed submissions where name matches submission_name
        $completedSubmissions = $allSubmissions->filter(function ($submission) {
            return $submission->name === $submission->name;
        })->map(function ($submission) {
            $submission->account_status = 2;
            return $submission;
        });

        // dd($completedSubmissions);
        

        return Inertia::render('Admin/SubmissionsList', [
            'Submissions' => $submissions,
            'Clients'     => $clients,
            'Total'       => $total,
            // 'historicalSubmissions'  => $completedSubmissions
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
        $submission->account_status = 2;
        $submission->no_of_records = $request->no_of_records;
        $submission->no_of_payment_records = $request->no_of_payment_records;
        $submission->recent_inquiries1 = $request->recent_inquiries1;
        $submission->recent_inquiries2 = $request->recent_inquiries2;
        $submission->submit_type = $request->submit_type;
        $submission->myrs_rating = $request->myrs_rating;
        $submission->amount = $request->amount;
        $submission->historical_pdf = $request->historical_pdf; 
        $submission->status = 1;


        $submission->save();

        return back()->with(['message' => 'Submitted successfully!']); 

    }
    public function downloadPdf()
        {
            // $pdf = Pdf::loadView('pdf.invoice', ['data' => $data]);bhm
            // return $pdf->download('invoice.pdf');
        }
        
    
    public function summaryReport(Request $request)
    {
        $clients = User::orderBy('company')->get();
        // $submissions = DB::table('submissions')
        //             ->join('users', 'submissions.user_id', '=', 'users.id') // Join users table

        //             ->select(
        //                 'submissions.user_id',
        //                 'users.company',
        //                 DB::raw("DATE_FORMAT(MAX(submissions.completed_date), '%b-%Y') as completed_month_year"),
        //                 DB::raw('SUM(submissions.charge_amt) as client_sub_total') // Summing charge_amt for each user_id
        //             )
        //             ->whereNotNull('submissions.completed_date')
        //             ->groupBy('submissions.user_id','users.company') // Grouping only by user_id and name
        //             ->orderByRaw('MAX(submissions.completed_date) DESC') // Sort by highest total if needed
        //             ->get();
        $query = Submission::query()
            ->join('users', 'submissions.user_id', '=', 'users.id') // Join users table
            ->select(
                'submissions.user_id',
                'users.company',
                DB::raw("DATE_FORMAT(MAX(submissions.completed_date), '%b-%Y') as completed_month_year"),
                DB::raw("MAX(submissions.submitted_date) as submitted_date"),
                DB::raw('SUM(submissions.charge_amt) as client_sub_total') // Summing charge_amt for each user_id
            )
            ->whereNotNull('submissions.completed_date');

        $today = Carbon::today();

        // **Filter by Client**
        if ($request->has('client') && $request->client !== '--All--') {
            $query->where('submissions.user_id', $request->client);
        }

        // **Filter by Date Range**
        if ($request->has('date_from') && $request->has('date_to')) {
            $query->whereBetween('submissions.completed_date', [
                Carbon::parse($request->date_from),
                Carbon::parse($request->date_to)
            ]);
        } else {
            $query->whereDate('submissions.completed_date', $today);
        }

        // **Group and Order by Latest Completed Date**
        $query->groupBy('submissions.user_id', 'users.company')
            ->orderByRaw('MAX(submissions.completed_date) DESC');

        // **Get Data**
        $submissions = $query->get();
                // Calculating the grand total
                $grandTotal = $submissions->sum('client_sub_total');
                // $historicalSubmissions = Submission::where('name', $value)
                // ->whereNotNull('completed_date')
                // ->get();
                // dd($submissions);

                    return Inertia::render('Admin/SummaryReport', [
                        'submissions' => $submissions,
                        'grandTotal' => $grandTotal,
                        'clients'    => $clients,
                        // 'historicalSubmissions' => $historicalSubmissions

                    ]);
    }
    public function showHistorical(Request $request)
    {
        

        $column = $request->type;
        $value = $request->histValue;
        $historicalSubmissions = Submission::where($column, 'like', '%' . $value . '%')
                                            ->whereNotNull('completed_date')
                                            ->with('user')
                                            ->get();

        return response()->json([
            'historicalSubmissions' => $historicalSubmissions,
        ]);        // with(['historicalSubmissions' => $historicalSubmissions]);
        
 
        // return Inertia::render('Admin/SubmissionsList', [
        //     'historicalSubmissions' => $historicalSubmissions,
        // ]);
    }

    public function upload(Request $request)
        {
            try {
                $request->validate([
                    'file' => 'required|file|max:5120'
                ]);

                if ($request->hasFile('file')) {
                    $path = $request->file('file')->store('uploads', 'public');

                    return response()->json([
                        'message' => 'File uploaded successfully',
                        'path' => $path,
                        'url' => asset('storage/' . $path)
                    ]);
                }

                return response()->json(['error' => 'No file uploaded'], 400);

            } catch (\Exception $e) {
                Log::error($e);
                return response()->json(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
            }
        }
    
        public function deleteSubmission(Request $request)
        {
            try {
                
                $submission = Submission::where('id',$request->id)->first();
                
                $submission->delete(); // Sets deleted_at instead of removing it

                    // return response()->json([
                    //     'message' => 'submission deleted successfully',
                       
                    // ]);
                    return back()->with('message', 'Submission deleted successfully');
                

            } catch (\Exception $e) {
                // Log::error($e);
                return back()->with(['error' => 'Server Error', 'message' => $e->getMessage()], 500);
                // return Inertia::render('Admin/SubmissionList', [
                //     'error' => 'Server Error', 'message' => $e->getMessage()

                // ]);
            }
        }

        public function downloadPrevious(Request $request, )
    {
        
        $fileName = $request->query('fname'); // Get the file name from query string
        $filePath = storage_path("app/public/{$fileName}"); // Adjust if needed
    
        if (!file_exists($filePath)) {
            return response()->json([
                'error' => 'File not found',
                'path' => $filePath // Show the actual path Laravel is checking
            ], 404);
        }
    
        return response()->download($filePath);

    }

    public function chargeUpdate (Request $request){
        $submission = Submission::where('id',$request->data['id'])->first();
        $submission->charge_amt = $request->data['charge_amt'];
        $submission->save();

        return redirect()->back();
    }
}
          