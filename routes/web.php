<?php

use App\Http\Controllers\SPAcontroller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/{any}', [SPAcontroller::class, 'index'])->where('any', '.*');
Auth::routes();
