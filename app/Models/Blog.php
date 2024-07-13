<?php

namespace App\Models;

use App\Models\Category;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Blog extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'summary',
        'body',
        'cover_img',
        'upvote',
        'is_archive',
        'created_by',
        'published_at',
    ];

    public function categories(): BelongsToMany {
        return $this->belongsToMany(Category::class, 'category_post');
    }
}
