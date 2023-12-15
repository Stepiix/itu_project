<?php

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

Route::post('/create-transactions', [TransactionController::class, 'createTransaction']); //done

Route::get('/getall-transactions', [TransactionController::class, 'getTransactionsByGroup']);//done

Route::put('/update-user', [UserController::class, 'updateUser']);

Route::get('/get-user', [UserController::class, 'getUser']);

Route::put('/update-group', [GroupsController::class, 'updateGroup']);

Route::get('/group-invite/{code}', [GroupsController::class, 'invite']);

Route::delete('/group-remove-user', [GroupsController::class, 'removeUserFromGroup']);

Route::get('/group-balance', [TransactionController::class, 'calculateUserBalances']);

Route::get('/group-depts', [TransactionController::class, 'calculateDebts']);