<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class MyBilling extends Model
{

    use HasFactory;

    protected $fillable = [
        'user_id',        // Foreign key referencing the company
        'invoice_number',    // Invoice number
        'invoice_file_name', // Name of the uploaded PDF file
        'invoice_date',      // Date of the invoice
        'month',             // Month of the invoice
        'year',              // Year of the invoice
        'pdf_type'           // Type of PDF (if applicable)
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

}
