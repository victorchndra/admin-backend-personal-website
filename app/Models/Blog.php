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
        'cover_img_name',
        'cover_img_path',
        'upvote',
        'is_archive',
        'user_id',
        'category_id',
        'published_at',
    ];

    public function categories(): BelongsToMany {
        return $this->belongsToMany(Category::class, 'category_post');
    }
}
