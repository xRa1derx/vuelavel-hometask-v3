<?php

namespace App\Http\Requests\Post;

use Illuminate\Foundation\Http\FormRequest;

class PostUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'required',
            'content' => 'required',
            'tags' => 'required',
            'category_id' => 'required',
            'images' => 'nullable|array',
            'image_ids_for_delete' => 'nullable|array'
        ];
    }
    public function messages()
    {
        return [
            'title.required' => 'Добавьте заголовок!',
            'content.required' => 'Добавьте основной текст',
        ];
    }
}
