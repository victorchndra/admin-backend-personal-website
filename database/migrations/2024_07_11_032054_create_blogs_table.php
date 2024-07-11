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
        Schema::create('blogs', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('summary');
            $table->text('body');
            $table->string('cover_img_name')->nullable();
            $table->string('cover_img_path')->nullable();
            $table->integer('upvote');
            $table->boolean('is_archive');
            $table->foreignId('user_id'); // setiap satu user punya banyak post, setiap satu post hanya bisa dimiliki satu user
            // $table->foreignId('category_id'); // setiap satu post punya banyak kategori, setiap satu kategori bisa dimiliki banyak post
            // $table->foreignId('comment_id'); //setiap satu post punya bnyak komen, setiap satu komen hanya bisa ke satu post
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blogs');
    }
};
