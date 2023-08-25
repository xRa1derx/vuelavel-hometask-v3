<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\Tag;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('post_images')->truncate();
        DB::table('categories')->truncate();
        DB::table('posts')->truncate();
        DB::table('post_tags')->truncate();
        DB::table('post_tags')->truncate();
        DB::table('tags')->truncate();
        $this->call([
            CategorySeeder::class,
            TagSeeder::class,
            PostSeeder::class,
            PostImageSeeder::class
        ]);
        // DB::table('post_tags')->insert(
        //     [
        //         'post_id' => Post::select('id')->orderByRaw("RAND()")->first()->id,
        //         'tag_id' => Tag::select('id')->orderByRaw("RAND()")->first()->id,
        //     ]
        // );
        // DB::table('users')->insert([
        //     [
        //         'name' => 'Guest',
        //         'email' => 'guest@gmail.com',
        //         'password' => bcrypt('123')
        //     ],
        //     [
        //         'name' => 'Alyona',
        //         'email' => 'alyonaozhered@gmail.com',
        //         'password' => bcrypt('123'),
        //     ],
        //     [
        //         'name' => 'Varya',
        //         'email' => 'varvara@gmail.com',
        //         'password' => bcrypt('123'),
        //     ],
        // ]);
    }
}
