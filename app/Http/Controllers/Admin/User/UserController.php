<?php

namespace App\Http\Controllers\Admin\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        return User::where('is_admin', '!=', 1)->where('id', '!=', 0)->get();
    }

    public function show($id)
    {
        return User::findOrFail($id);
    }
}
