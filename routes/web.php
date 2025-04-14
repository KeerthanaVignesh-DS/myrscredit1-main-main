<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SubmissionController;
use App\Http\Controllers\MyBillingController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// Route::get('/',function(){
//     return Inertia::render('Layouts/Layout');
// });

Route::get('/',function(){
    return Inertia::render('Home/Home');
});


Route::get('/explanation-services',function(){
    return Inertia::render('ExplanationServices/ExplanationServices');
});


Route::get('/login-client',function(){
    return Inertia::render('Login/Login');
});


Route::get('/contact-us',function(){
    return Inertia::render('ContactUs/Contact');
});


Route::get('/registration-client',function(){
    return Inertia::render('Auth/Register');
});


Route::get('/admin-login',function(){
    return Inertia::render('Admin/Login');
});




Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/recommendation-submission',[SubmissionController::class,'create'])->name('recommendation-submission');
    Route::post('/recommendation-submission',[SubmissionController::class,'store'])->name('submission.store');
    Route::get('/demand-letter-submission',function(){
        return Inertia::render('Demand-Letter-Submission/DemandLetterSubmission');
    });

    Route::get('/dashboard', function () {
        // return Inertia::render('Auth/Login');
        $user = Auth::user();
        if( $user->is_admin == 1){
            return redirect()->route('adminHome');

        }
        

        return redirect()->route('recommendation-submission');
    })->name('dashboard');


    Route::get('/my-submissions', [SubmissionController::class, 'index'])->name("submission");


    Route::get('/my-billing',[MyBillingController::class, 'myBilling']);


    Route::get('/my-profile',function(){
        return Inertia::render('MyProfile/MyProfile');
    })->name('my_profile');


    Route ::get('/change-password',function(){
        return Inertia::render('ChangePassword/ChangePassword'); 
    });


    // Route::get('/admin-billing',function(){
    //     return Inertia::render('Admin/BillingList');
    // })->name("adminBilling");

    Route::get('/admin-billing', [MyBillingController::class, 'index']);

    Route::post('/upload-invoice', [MyBillingController::class, 'upload']);
    Route::get('/upload-invoice', [MyBillingController::class, 'uploadBilling']);
    Route::get('/download-pdf', [MyBillingController::class, 'downloadPdf'])->name('pdf.download');



    Route::get('/admin-client', [UserController::class, 'index'])->name("adminClient");


    Route::get('/admin-home', [UserController ::class, 'index1'])->name("adminHome");
    Route::post('/updateUser', [UserController ::class, 'updateUser'])->name("update.user");
    Route::post('/makeActive', [UserController ::class, 'makeActive'])->name("active.user"); 


    Route::get('/admin-submissions',[SubmissionController::class, 'adminIndex'])->name("adminSubmissions");
    Route::post('/admin-submissions-updatepdf',[SubmissionController::class, 'updatepdf'])->name("updatepdf");
    Route::get('/admin-submissions-download-pdf',[SubmissionController::class, 'download-pdf'])->name("download-pdf");
    Route::get('/admin-historical-submissions',[SubmissionController::class, 'showHistorical'])->name("showHistorical");
    Route::post('/upload',[SubmissionController::class, 'upload'])->name("upload");
    Route::post('/deleteSubmission',[SubmissionController::class, 'deleteSubmission'])->name("submission.delete");
    Route::get('/download-previous', [SubmissionController::class, 'downloadPrevious'])->name('previous.download');
    Route::post('/charge-update',[SubmissionController::class, 'chargeUpdate'])->name("charge.update");









    Route::get('/admin-summary',[SubmissionController::class, 'summaryReport'])->name("adminSummary");

    // Route::post('/users', [UserController::class, 'index'])
    // ->name('user.index');
    



    
    // Route::get('/registration-client', function () {
    //     return Inertia::render('Registration');
    // });
    
});

require __DIR__.'/auth.php';
