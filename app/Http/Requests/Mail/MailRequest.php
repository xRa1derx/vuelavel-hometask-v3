<?php

namespace App\Http\Requests\Mail;

use Illuminate\Foundation\Http\FormRequest;

class MailRequest extends FormRequest
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
            'name' => 'required|string',
            'phone' => 'required|string|min:10',
            'city' => 'string|nullable',
            'time' => 'string'
        ];
    }
    public function messages()
    {
        return [
            'name.required' => 'Пожалуйста, укажите как к Вам обращаться',
            'phone.required' => 'Необходимо указать номер телефона',
            'phone.min' => 'Введите корректный номер телефона'
        ];
    }
}
