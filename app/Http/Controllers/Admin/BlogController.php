<?php

namespace App\Http\Controllers\Admin;

use App\Models\Blog;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $posts = Blog::with('categories')->get();
        $posts = Blog::latest()->with('categories')->get();
        // dd($posts);
        return inertia('Admin/Blog/Blog', [
            'posts' => $posts,
            'navActive' => 'Blogs'
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Admin/Blog/Create', [
            'navActive' => 'Blogs'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'title' => 'required',
            'summary' => 'required', //|min:10
            'body' => 'required', //|min:50
            'cover_img' => 'nullable',
            'is_archive' => 'boolean',
        ]);

        $fields = [
            'title' => $request['title'],
            'summary' => $request['summary'],
            'body' => $request['body'],
            'cover_img' => $request['cover_img'],
            'is_archive' => $request['is_archive'],
            'upvote' => 0,
            'created_by' => Auth::user()->id,
            'slug' => Str::slug($request['title']),
        ];

        if(!$request['is_archive']) {
            $fields['published_at'] = now();
        }

        Blog::create($fields);

        return redirect()->route('blogs.index')->with([
            'success' => 'New post has been added!'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Blog $blog)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Blog $blog)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Blog $blog)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Blog $blog)
    {
        //
    }
}
