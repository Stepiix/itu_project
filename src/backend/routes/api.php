<?php

/*
Authors: Tomas Valik (xvalik04)
         Stepan Barta (xbarta50)
         Milan Takac (xtakac09)
*/

use App\Http\Controllers\ChatController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\GroupsController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);

Route::get('/groups', [GroupsController::class, 'index']);

Route::post('/create-group', [GroupsController::class, 'createGroup']);

Route::get('/group', [GroupsController::class, 'getUsersInGroup']);

Route::post('/create-transactions', [TransactionController::class, 'createTransaction']); 

Route::get('/getall-transactions', [TransactionController::class, 'getTransactionsByGroup']);

Route::post('/update-user', [UserController::class, 'updateUser']); 

Route::get('/get-user', [UserController::class, 'getUser']);

Route::post('/update-group', [GroupsController::class, 'updateGroup']);

Route::get('/group-invite/{code}', [GroupsController::class, 'invite']);

Route::delete('/group-remove-user', [GroupsController::class, 'removeUserFromGroup']);

Route::get('/group-balance', [TransactionController::class, 'calculateUserBalances']);

Route::get('/group-depts', [TransactionController::class, 'calculateDebts']);

Route::get('/group-leader', [GroupsController::class, 'getGroupLeader']);

Route::delete('/remove-transaction/{id}', [TransactionController::class, 'removeTransaction']); 

Route::get('/user-balance', [TransactionController::class, 'calculateUserBalance']);

Route::get('/getall-transactions-user', [TransactionController::class, 'getTransactionsByUser']);

Route::get('/all-messages/{id}', [ChatController::class, 'index']);

Route::post('/add-message', [ChatController::class, 'addMessage']);

Route::delete('/remove-message/{id}', [ChatController::class, 'removeMessage']);
