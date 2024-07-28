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
            'summary' => fake()->text(500),
            'body' => fake()->text(2000),
            'cover_img' => fake()->word(), //temporary instance
            'upvote' => fake()->randomNumber(2, false),
            'is_archive' => false,
            'category_id' => fake()->numberBetween(1, 3),
            'created_by' => 1,
            'published_at' => fake()->dateTime()
        ];
    }
}
