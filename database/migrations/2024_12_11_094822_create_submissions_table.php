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
        Schema::create('submissions', function (Blueprint $table) {
            $table->id(); // Primary Key
            $table->unsignedBigInteger('user_id'); 
            $table->string('name');
            $table->string('address1');
            $table->string('address2')->nullable(); // Nullable if optional
            $table->string('city');
            $table->string('state');
            $table->string('zip');
            $table->string('country');
            $table->string('phone');
            $table->string('myrs_product');
            $table->string('express_service');
            $table->decimal('order_amount', 10, 2); // Amount with two decimal precision
            $table->boolean('chk_previous14')->default(false); // Boolean value
            $table->text('comments')->nullable(); // Nullable for optional text
            $table->string('lbl_doc_name1')->nullable();
            $table->string('file_upload_controls1')->nullable(); // File uploads might be nullable
            $table->string('doc_name1')->nullable();
            $table->string('lbl_doc_name2')->nullable();
            $table->string('file_upload_controls2')->nullable();
            $table->string('doc_name2')->nullable();
            $table->timestamps(); // Adds created_at and updated_at columns
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('submissions');
    }
};
