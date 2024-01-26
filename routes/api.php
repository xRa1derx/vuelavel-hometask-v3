<?php

use App\Http\Controllers\Admin\User\UserController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MailSenderController;
use App\Http\Controllers\Post\PostController;
use App\Http\Controllers\Admin\Post\AdminPostController;
use App\Http\Controllers\Chat\ChatController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index']);
Route::post('/sendMail', [MailSenderController::class, 'sendMail']);

Route::resource('/posts', PostController::class);


Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::resources([
        'admin/users' => UserController::class,
        'admin/user' => UserController::class,
    ]);
    Route::resources([
        '/chat' => ChatController::class
    ]);
});


Route::group(['prefix' => 'admin'], function () {
    Route::resource('/post', AdminPostController::class);
});
