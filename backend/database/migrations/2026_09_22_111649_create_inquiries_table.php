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
        Schema::create('inquiries', function (Blueprint $table) {
            $table->id();

            // Plain string, not a MySQL ENUM — new inquiry types can be
            // added at the application layer without a schema migration.
            // Expected values: contact, consultation, demo_request.
            $table->string('type')->index();

            $table->string('name');
            $table->string('email')->index();
            $table->string('phone')->nullable();
            $table->string('company')->nullable();
            $table->text('message')->nullable();

            // Internal triage state: new, in_progress, resolved, archived.
            $table->string('status')->default('new')->index();

            // Which page/form this came from, for future attribution.
            $table->string('source')->nullable();

            // Spam/abuse triage aid — see docs/DATABASE_ARCHITECTURE.md §9.
            $table->string('ip_address', 45)->nullable();
            $table->string('user_agent')->nullable();

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inquiries');
    }
};
