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
        Schema::create('school_infos', function (Blueprint $table) {
            $table->id();
            $table->integer('total_teachers')->default(0);
            $table->integer('total_departments')->default(0);
            $table->integer('total_branches')->default(0);
            $table->integer('years_established')->default(0);
            $table->text('mission')->nullable();
            $table->text('vision')->nullable();
            $table->string('logo')->nullable();
            $table->string('hero_image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('school_infos');
    }
};
