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
        Schema::table('fund_raisings', function (Blueprint $table) {
            $table->string('account_name')->nullable()->after('end_date');
            $table->string('account_number')->nullable()->after('account_name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('fund_raisings', function (Blueprint $table) {
            $table->dropColumn(['account_name', 'account_number']);
        });
    }
};
