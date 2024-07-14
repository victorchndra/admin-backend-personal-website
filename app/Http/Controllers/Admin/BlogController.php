<?php

namespace App\Http\Controllers\Admin;

use App\Models\Blog;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Category;
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
        $categories = Category::all();

        return inertia('Admin/Blog/Create', [
            'navActive' => 'Blogs',
            'categories' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'title' => 'required|unique:blogs,title',
            'summary' => 'required', //|min:10
            'body' => 'required', //|min:50
            'cover_img' => 'nullable',
            'is_archive' => 'boolean',
            'categories_id' => 'required',
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
// dd($request['categories_id']);
        Blog::create($fields)->categories()->sync($request['categories_id']);

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
        return inertia('Admin/Blog/Edit', [
            'navActive' => 'Blogs',
            'blog' => $blog->load('categories'),
            'categories' => Category::all()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Blog $blog)
    {
        $fields = $request->validate([
            'title' => 'required',
            'summary' => 'required', //|min:10
            'body' => 'required', //|min:50
            'cover_img' => 'nullable',
            'is_archive' => 'boolean',
            'categories_id' => 'required',
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

        // dd($request['categories_id']);
        $categoryIds = array_map(function ($category) {
            return $category['category_id']; // Asumsikan 'id' adalah key untuk ID dalam data request
        }, $request['categories_id']);

        // dd($categoryIds);
        $blog->update($fields);
        $blog->categories()->sync($categoryIds);

        return redirect()->route('blogs.index')->with([
            'success' => 'Post has been updated!'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Blog $blog)
    {
        $blog->delete();
        return redirect()->route('blogs.index')->with([
            'success' => 'Post has been deleted!'
        ]);
    }
}
