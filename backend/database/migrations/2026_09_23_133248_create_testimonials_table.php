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
        Schema::create('testimonials', function (Blueprint $table) {
            $table->id();

            $table->string('client_name');
            $table->string('company');
            $table->string('designation')->nullable();
            $table->string('industry')->nullable();
            $table->text('testimonial');

            // Path on the "public" disk (storage/app/public), not a full
            // URL — the API resolves it to a URL at read time via
            // Storage::url() so the disk/host can change without touching
            // stored data.
            $table->string('photo_path')->nullable();

            // Free-form slug reference, not a foreign key — case studies
            // live in a static content file (frontend/app/content/case-studies.ts),
            // not a database table.
            $table->string('related_case_study')->nullable();

            // Plain string, not a MySQL ENUM — same convention as
            // inquiries.status. The admin portal publishes immediately on
            // upload, so new rows are created as 'approved' directly; the
            // full pending/approved/expired range is kept so a testimonial
            // can be unpublished later without a schema change.
            $table->string('permission_status')->default('approved')->index();

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('testimonials');
    }
};
