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
            $table->string('secondary_phone')->nullable();
            $table->string('additional_address')->nullable();
            $table->string('web')->nullable();
            $table->integer('account_status')->nullable();
            $table->integer('no_of_records')->nullable();
            $table->integer('no_of_payment_records')->nullable();
            $table->integer('recent_inquiries1')->nullable();
            $table->string('recent_inquiries2')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('submissions', function (Blueprint $table) {
           
        });
    }
};
