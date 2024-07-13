<?php

use App\Http\Controllers\Admin\BlogController as AdminBlogController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Guest Area
Route::get('/', function () {
    return inertia('Home');
});

Route::get('/blog', function() {
    return inertia('Blog/Blog');
});

Route::get('/project', function() {
    return inertia('Project/Project');
});


// Admin Area
Route::prefix('/admin')->group(function () {

    // Authenticated area
    Route::middleware('auth')->group(function() {

        // Admin Menu: Dashboard
        Route::get('/dashboard', function () {
            return inertia('Admin/Dashboard', [
                'navActive' => 'Dashboard',
            ]);
        })->name('dashboard.index');

        // Admin Menu: Blogs
        Route::resource('/blogs', AdminBlogController::class);

        // Admin Menu: Projects
        Route::get('/projects', function () {
            return inertia('Admin/Project/Project', [
                'navActive' => 'Projects',
            ]);
        });

        // Logout
        Route::post('/logout', [AuthController::class, 'logout'])->name('auth.logout');
    });

    // Login
    Route::inertia('/', 'Admin/Login')->middleware('guest')->name('login');
    Route::post('/login', [AuthController::class, 'login'])->name('auth.login');
});
