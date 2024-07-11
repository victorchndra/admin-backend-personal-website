<?php

namespace Database\Factories;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Blog>
 */
class BlogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(),
            'slug' => Str::slug(fake()->sentence()),
            'summary' => fake()->text(50),
            'body' => fake()->text(500),
            'cover_img_name' => fake()->sentence(2), //temporary instance
            'cover_img_path' => fake()->sentence(1), //temporary instance
            'upvote' => fake()->randomNumber(2, false),
            'is_archive' => false,
            'user_id' => 1,
            'published_at' => fake()->dateTime()
        ];
    }
}
