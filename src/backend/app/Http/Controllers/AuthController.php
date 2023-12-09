<?php

// app/Http/Controllers/AuthController.php

namespace App\Http\Controllers;

use App\Models\userMy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'user_firstname' => 'required|string|max:32',
            'user_lastname' => 'required|string|max:32',
            'user_email' => 'required|email|unique:User',
            'user_password' => 'required|string|min:6',
        ]);

        $user = userMy::create([
            'user_firstname' => $request->user_firstname,
            'user_lastname' => $request->user_lastname,
            'user_email' => $request->user_email,
            'user_password' => Hash::make($request->user_password),
        ]);

        return response()->json(['user' => $user, 'message' => 'User registered successfully']);
    }

        public function login(Request $request)
    {
        $request->validate([
            'user_email' => 'required|email',
            'user_password' => 'required|string|min:6',
        ]);

        // Attempt to authenticate the user
        if (Auth::attempt(['user_email' => $request->user_email, 'password' => $request->user_password])) {
            $user = Auth::user();
            $token = $user->createToken('authToken')->plainTextToken;

            return response()->json(['user' => $user, 'token' => $token, 'message' => 'Login successful']);
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }
}