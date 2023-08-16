<?php

use App\Http\Controllers\Admin\IndexController;
use App\Http\Controllers\GetController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MailSenderController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('/', [HomeController::class, 'index']);
Route::post('/sendMail', [MailSenderController::class, 'sendMail']);


Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('admin', [IndexController::class, 'index']);
    Route::get('dashboard', [GetController::class, 'get']);
});
