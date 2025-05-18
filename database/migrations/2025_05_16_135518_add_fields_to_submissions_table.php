<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('submissions', function (Blueprint $table) {
            // $table->string('Account_HasReceived')->nullable();
            // $table->string('Account_CompanyInfo')->nullable();
            // $table->string('Account_MyrsRating')->nullable();
            $table->string('Account_MostCommonTermsOfSale')->nullable();
            $table->string('Account_PaymentWithinTerms')->nullable();
            $table->string('Account_PaymentsOutsideOfTerms')->nullable();
            $table->string('Account_90120Payment')->nullable();
            $table->string('Account_120BeyondPayment')->nullable();
            $table->string('Account_AverageDayToPay')->nullable();
            $table->string('Account_PaymentTrend')->nullable();
            $table->string('Account_UnpaidDebts')->nullable();
            $table->string('Account_HighCreditAverages')->nullable();
            $table->string('Account_HighestCreditOfRecords')->nullable();
            $table->string('Account_DateOfMostRecentPaymentTransaction')->nullable();
            $table->string('Account_DateOfOldestPaymentTransaction')->nullable();
            $table->string('Account_UnauthorizedDeductionsOfRecords')->nullable();
            $table->string('Account_CollectionRecords')->nullable();
            $table->string('Account_CollectionRecordsText')->nullable();
            $table->string('Account_DemandLetterRecords')->nullable();
            $table->string('Account_DemandLetterRecordsText')->nullable();
            $table->string('Account_PublicRecords')->nullable();
            $table->string('Account_PublicRecordsText')->nullable();
            $table->string('Account_INSFRecords')->nullable();
            $table->string('Account_MyrsNegativeAgentNotes')->nullable();
            $table->string('Account_MyrsNegativeAgentNotesText')->nullable();
            $table->string('Account_RegisteredSecretaryOfState')->nullable();
            $table->string('Account_SecOfStateRegistrationDate')->nullable();
            $table->string('Account_GoodStandingStatus')->nullable();
            $table->string('Account_IfNoWhy')->nullable();
            $table->string('Account_TypeOfEntity')->nullable();
            $table->string('Account_OwnerName')->nullable();
            $table->string('Account_OfficerName')->nullable();
            $table->string('Account_SingleLocation')->nullable();
            $table->string('Account_TypeOfBusiness')->nullable();
            $table->string('Account_DateBusinessStarted')->nullable();
            $table->string('Account_RatingRateLeft1')->nullable();
            $table->string('Account_RatingRateLeft2')->nullable();
            $table->string('Account_RatingRateLeft3')->nullable();
            $table->string('Account_RatingRateLeft4')->nullable();
            $table->string('Account_RatingRateRight1')->nullable();
            $table->string('Account_RatingRateRight2')->nullable();
            $table->string('Account_RatingRateRight3')->nullable();
            $table->string('Account_RatingRateRight4')->nullable();
            $table->string('Account_MyrsAgentNotesToClient')->nullable();
            // $table->string('Account_IPAddress')->nullable();
            // $table->string('Account_DocumentName')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('submissions', function (Blueprint $table) {
            //
        });
    }
};
