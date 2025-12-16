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
        Schema::table('users', function (Blueprint $table) {
            $table->string('phone')->nullable()->after('email');
            $table->integer('year')->nullable()->after('phone');
            $table->string('course')->nullable()->after('year');
            $table->string('current_work')->nullable()->after('course');
            $table->foreignId('department_id')->nullable()->after('current_work')->constrained()->onDelete('set null');
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending')->after('department_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['department_id']);
            $table->dropColumn(['phone', 'year', 'course', 'current_work', 'department_id', 'status']);
        });
    }
};
