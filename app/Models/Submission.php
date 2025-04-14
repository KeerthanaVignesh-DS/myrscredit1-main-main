<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Submission extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $dates = ['deleted_at']; // Optional in newer Laravel versions

    protected $fillable = [
        'user_id',
        'name',
        'address1',
        'address2',
        'city',
        'state',
        'zip',
        'country',
        'phone',
        'myrs_product',
        'express_service',
        'order_amount',
        'chk_previous14',
        'comments',
        'lbl_doc_name1',
        'file_upload_controls1',
        'doc_name1',
        'lbl_doc_name2',
        'file_upload_controls2',
        'doc_name2',
        'submitted_date',
        'completed_date',
        'charge_amt',
        'myrs_rating',
        'secondary_phone',
        'additional_address',
        'web',
        'account_status',
        'no_of_records',
        'no_of_payment_records',
        'recent_inquiries1',
        'recent_inquiries2',
        'submit_type',
        'amount',
        'historical_pdf'
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
