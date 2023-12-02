<?php

// app/Http/Controllers/AuthController.php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'user_firstname' => 'required|string|max:32',
            'user_lastname' => 'required|string|max:32',
            'user_email' => 'required|email|unique:users',
            'user_password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'user_firstname' => $request->user_firstname,
            'user_lastname' => $request->user_lastname,
            'user_email' => $request->user_email,
            'user_password' => Hash::make($request->user_password),
        ]);

        return response()->json(['user' => $user, 'message' => 'User registered successfully']);
    }
}