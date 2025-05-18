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
        'historical_pdf',
        'Account_MostCommonTermsOfSale',
    'Account_PaymentWithinTerms',
    'Account_PaymentsOutsideOfTerms',
    'Account_90120Payment',
    'Account_120BeyondPayment',
    'Account_AverageDayToPay',
    'Account_PaymentTrend',
    'Account_UnpaidDebts',
    'Account_HighCreditAverages',
    'Account_HighestCreditOfRecords',
    'Account_DateOfMostRecentPaymentTransaction',
    'Account_DateOfOldestPaymentTransaction',
    'Account_UnauthorizedDeductionsOfRecords',
    'Account_CollectionRecords',
    'Account_CollectionRecordsText',
    'Account_DemandLetterRecords',
    'Account_DemandLetterRecordsText',
    'Account_PublicRecords',
    'Account_PublicRecordsText',
    'Account_INSFRecords',
    'Account_MyrsNegativeAgentNotes',
    'Account_MyrsNegativeAgentNotesText',
    'Account_RegisteredSecretaryOfState',
    'Account_SecOfStateRegistrationDate',
    'Account_GoodStandingStatus',
    'Account_IfNoWhy',
    'Account_TypeOfEntity',
    'Account_OwnerName',
    'Account_OfficerName',
    'Account_SingleLocation',
    'Account_TypeOfBusiness',
    'Account_DateBusinessStarted',
    'Account_RatingRateLeft1',
    'Account_RatingRateLeft2',
    'Account_RatingRateLeft3',
    'Account_RatingRateLeft4',
    'Account_RatingRateRight1',
    'Account_RatingRateRight2',
    'Account_RatingRateRight3',
    'Account_RatingRateRight4',
    'Account_MyrsAgentNotesToClient',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
