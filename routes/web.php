<?php

use App\Http\Controllers\Admin\BlogController as AdminBlogController;
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
    Route::get('/dashboard', function () {
        return inertia('Admin/Dashboard');
    });
    // Admin blog resource controller
    Route::resource('/blogs', AdminBlogController::class);

    Route::get('/projects', function () {
        return inertia('Admin/Project');
    });
    Route::get('/login', function () {
        return inertia('Admin/Login');
    });
});
