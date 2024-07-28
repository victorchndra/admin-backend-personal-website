<?php

namespace App\Models;

use App\Models\Blog;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    public function blogs(): BelongsToMany {
        return $this->belongsToMany(Blog::class, 'category_post');
    }

    public function blog(): HasMany {
        return $this->hasMany(Blog::class);
    }
}
