<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\MyBilling;
use App\Models\User;
use Smalot\PdfParser\Parser;
use setasign\Fpdi\Fpdi;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Mail;
use App\Mail\InvoiceMail;




class MyBillingController extends Controller
{
    public function index(Request $request)
    {
        $billing = MyBilling::query()->with('user');
        if ($request->filled('type')) {
            $billing->where('pdf_type', $request->type);
            
        }
        
        if ($request->filled('month')) {
            $billing->where('month', $request->month);
        }
        
        if ($request->filled('year')) {
            $billing->where('year', $request->year);
        }

        if ($request->filled('client')) {
            if($request->client !== "--All--"){
                $billing->where('user_id', $request->client);

            }
        }
        if($request->filled('type') || $request->filled('month') || ($request->filled('year')) ||  ($request->filled('client'))){
            $billing = $billing->get();
        }
        $clients = User::all();
        
        // if ($request->filled('client')) {
        //     $billing->where('client', $request->client);
        // }
        
        
       
        // dd($billing);

        return Inertia::render('Admin/BillingList', [
            'Billing' => $billing,
            'Clients' => $clients            
        ]);
    }

    public function uploadBilling(){
        return Inertia::render('Admin/UploadBilling');
    }

    public function upload(Request $request)
        {
            // dd($request);
            $request->validate([
                'user_id' => 'required',
                // 'invoice_file' => 'required|mimes:pdf|max:2048',
            ]);
            $month = \DateTime::createFromFormat('!m',$request->month)->format('F');
            $year = $request->year;

            $file = $request->file('invoice_file');

            $existingInvoice = MyBilling::where('month', $month)
            ->where('year', $year)
            ->where('pdf_type', $request->type)
            ->first();

            if ($existingInvoice) {
                return back()->withErrors('Invoice for this month, year, and type already exists!');
            }
            
            
            // $filePath = $file[0]->storeAs('uploads', $newFileName);
            $pdfPath = $file[0]->store('uploads');
            // dd(file_exists(storage_path("app\private/$pdfPath")));
            $parser = new Parser();
            $pdf = $parser->parseContent(file_get_contents(storage_path("app\private/$pdfPath")));
            // $textPages = explode("\f", $pdf->getText());
    
            $pdfReader = new \setasign\Fpdi\Fpdi();
            $pdfReader->setSourceFile(storage_path("app\private/$pdfPath"));
            $totalPages = $pdfReader->setSourceFile(storage_path("app\private/$pdfPath"));

            $textPages = [];

            for ($i = 1; $i <= $totalPages; $i++) {
                // Extract text page by page
                $textPages[] = $pdf->getPages()[$i - 1]->getText();
            }

            // dd($textPages);
            foreach ($textPages as $index => $text) {
                // Extract Account Number
                // dd($text);
                preg_match('/Account #\s*(\d+)/', $text, $matches);
                $accountNumber = $matches[1] ?? 'Unknown';
                preg_match('/\b\d{1,2}[-\/]\d{1,2}[-\/]\d{4}\b/', $text, $matches);
                $invoiceDate = $matches[1] ?? 'Unknown';
    
                // Save each page as a separate PDF
                $pdfWriter = new Fpdi();
                $pdfWriter->AddPage();
                $pdfWriter->setSourceFile(storage_path("app\private/$pdfPath"));
                $tplIdx = $pdfWriter->importPage($index + 1);
                $pdfWriter->useTemplate($tplIdx);
                
                $timestamp = now()->format('YmdHis'); // Current timestamp (e.g., 20240209123045)
                // $originalName = pathinfo($file[0]->getClientOriginalName(), PATHINFO_FILENAME);
                // $newFileName = $originalName . '_' . $timestamp . '.' . $file[0]->getClientOriginalExtension();
    
                $newPdfPath = "statements/_SpilittedPDFs_{$month}_{$year}_{$timestamp}_{$accountNumber}.pdf";
                Storage::put($newPdfPath, $pdfWriter->Output('S'));
                $user = User::where('account_number', $accountNumber)->first();
    
                // Save data in the database
                // Statement::create([
                //     'account_number' => $accountNumber,
                //     'file_path' => $newPdfPath,
                // ]);
                $invoice = MyBilling::create([
                    'user_id' => $user ? $user->id : $request->user_id,
                    'invoice_file_name' => $newPdfPath,
                    'invoice_number' => $accountNumber,
                    'invoice_date' => now(),
                    'month' => $month,
                    'year' => $year,
                    'pdf_type' => $request->type
                ]);
                // $invoice = new MyBilling();
                // $invoice->user_id = $user ? $user->id : $request->user_id;
                // $invoice->invoice_file_name = $newPdfPath;  // Store the new file name
                // $invoice->invoice_number = $accountNumber;
                // $invoice->invoice_date =now();
                // $invoice->month = $month;
                // $invoice->year = $year;
                // $invoice->pdf_type = $request->type;
                // $invoice->save();

                Mail::to($user ? $user->ap_email : 'recipient@example.com')->send(new InvoiceMail($invoice));

            }
            

            
            return Inertia::render('Admin/BillingList', [
                'message' => 'Upload and sent mail to clients successfully.',
                'toast1'  => true
                
            ]);        
        }

    public function downloadPdf(Request $request, )
    {
        
        $fileName = $request->query('fname'); // Get the file name from query string
        $filePath = storage_path("app/private/{$fileName}"); // Adjust if needed
    
        if (!file_exists($filePath)) {
            return response()->json([
                'error' => 'File not found',
                'path' => $filePath // Show the actual path Laravel is checking
            ], 404);
        }
    
        return response()->download($filePath);

    }
}
