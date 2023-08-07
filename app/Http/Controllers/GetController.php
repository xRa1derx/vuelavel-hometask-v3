<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GetController extends Controller
{
    public function get(){
        return Auth::user()->id;
    }
}
