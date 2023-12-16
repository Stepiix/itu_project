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

Route::post('/update-user', [UserController::class, 'updateUser']); //done

Route::get('/get-user', [UserController::class, 'getUser']);//neni potreba vsechno ukladam do session (updatuju moji session)

Route::put('/update-group', [GroupsController::class, 'updateGroup']);//done

Route::get('/group-invite/{code}', [GroupsController::class, 'invite']);//done

Route::delete('/group-remove-user', [GroupsController::class, 'removeUserFromGroup']);//nefunguje ti to Valiku??

Route::get('/group-balance', [TransactionController::class, 'calculateUserBalances']);//done

Route::get('/group-depts', [TransactionController::class, 'calculateDebts']);//coto kurva je?

Route::get('/group-leader', [GroupsController::class, 'getGroupLeader']);
