<?php

namespace Database\Factories;

use App\Models\Post;
use Illuminate\Database\Eloquent\Factories\Factory;

class PostImageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $name = $this->faker->imageUrl(640, 480, 'animals', true);
        static $id = 1;
        return [
            'post_id' => $id++,
            'name' => $name,
            'preview' => 'prev_' . $name,
            'path' => $name
        ];
    }
}
