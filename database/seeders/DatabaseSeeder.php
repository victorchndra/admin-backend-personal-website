<?php

namespace Database\Seeders;

use App\Models\Blog;
use App\Models\Category;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Victor Chandra',
            'email' => 'v@gmail.com',
            'username' => 'victor',
            'password' => '123',
            'role' => 'admin',
        ]);

        User::factory()->create([
            'name' => 'Guest User',
            'email' => 'guest@gmail.com',
            'username' => 'guest',
            'password' => 'guest',
            'role' => 'guest',
        ]);

        Blog::factory(20)->create();

        Category::factory()->create([
            'name' => 'Technology'
        ]);
        Category::factory()->create([
            'name' => 'Blockchain'
        ]);
        Category::factory()->create([
            'name' => 'Web3'
        ]);
        Category::factory()->create([
            'name' => 'Artificial Intelligent'
        ]);
        Category::factory()->create([
            'name' => 'Stack'
        ]);
    }
}
