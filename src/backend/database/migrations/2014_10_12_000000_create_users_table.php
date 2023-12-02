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
        Schema::create('User', function (Blueprint $table) {
            $table->id();
            $table->string('user_firstname'); // Upraveno z 'name' na 'user_firstname'
            $table->string('user_lastname');  // Přidáno pole pro příjmení
            $table->string('user_email')->unique(); // Upraveno z 'email' na 'user_email'
            $table->timestamp('email_verified_at')->nullable();
            $table->string('user_password'); // Upraveno z 'password' na 'user_password'
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('User');
    }
};