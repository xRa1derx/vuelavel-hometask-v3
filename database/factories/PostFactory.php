<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $title = $this->faker->sentence;
        $slug = Str::slug($title, '-');
        $categories = Category::pluck('id')->toArray();

        return [
            'title' => $title,
            'slug' => $slug,
            'content' => $this->faker->paragraph,
            'category_id' => $this->faker->randomElement($categories)
        ];
    }
}
