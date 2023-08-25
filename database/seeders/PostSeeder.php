<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\Tag;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Post::factory()->count(5)->hasAttached(
            Tag::class,
            function ($param) {
                return [
                    'post_id' =>  $param->id,
                    'tag_id' => Tag::select('id')->orderByRaw("RAND()")->first()->id
                ];
            },
        )->create();
    }
}
