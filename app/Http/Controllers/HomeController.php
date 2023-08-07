<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    public function index()
    {
        $isAuthenticated = auth()->check();
        if ($isAuthenticated) {
            return response()->json(Auth::user());
        } else {
            return 'false';
        }
    }
}
