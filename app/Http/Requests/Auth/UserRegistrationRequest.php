<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class UserRegistrationRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'company' => 'required|string|max:255|unique:clients',
            'city' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:clients',
            'password' => 'required|string|min:8|confirmed',
            'email' => 'required|email|max:255',
            'security_question' => 'required|string',
            'security_answer' => 'required|string',
        ];
    }
}
