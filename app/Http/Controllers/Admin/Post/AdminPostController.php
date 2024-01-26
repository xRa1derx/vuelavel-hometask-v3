<?php

namespace App\Http\Controllers\Admin\Post;

use App\Http\Controllers\Controller;
use App\Http\Requests\Post\PostUpdateRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class AdminPostController extends Controller
{
    public function show($id)
    {
        $post = new PostResource(Post::with('tags', 'images', 'category', 'verifiedComments.author', 'verifiedComments.replies.author')->findOrFail($id));
        return $post;
    }

    public function update(PostUpdateRequest $request, $id)
    {
        $data = $request->validated();
        $post = Post::find($id);
        $post->edit($request->all());

        $images = isset($data['images']) ? $data['images'] : null;

        $imageForDelete = isset($data['image_ids_for_delete']) ? $data['image_ids_for_delete'] : null;

        $currentImages = $post->images;
        if ($imageForDelete) {
            foreach ($currentImages as $currentImage) {
                if (in_array($currentImage->id, $imageForDelete)) {
                    File::delete('assets/images/posts/' . $currentImage->name);
                    File::delete('assets/images/posts/' . $currentImage->preview);
                    $currentImage->delete();
                }
            }
        }
        if ($images) {
            foreach ($images as $image) {
                $post->uploadImage($image);
            }
        }
        $post->setCategory($request->get('category_id'));
        $post->setTags($request->get('tags'));
        $post->save();
        return $post;
    }
}
