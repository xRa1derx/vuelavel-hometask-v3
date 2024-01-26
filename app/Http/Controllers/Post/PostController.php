<?php

namespace App\Http\Controllers\Post;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::with('tags', 'category', 'images', 'commentsQuantity')->latest()->paginate(3);
        return $posts;
        // return new PostResource(Post::with('tags', 'category', 'images', 'commentsQuantity')->latest()->paginate(3));
    }
}
