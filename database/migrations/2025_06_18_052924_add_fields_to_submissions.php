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
                $table->string('recent_inquiries2', 500)->change();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('submissions', function (Blueprint $table) {
                $table->string('recent_inquiries2', 255)->change();
                //  $table->string('recent_inquiries2', 255)->change();

            // Drop the file_upload_controls2 column
             $table->dropColumn('file_upload_controls2');
        });
    }
};
