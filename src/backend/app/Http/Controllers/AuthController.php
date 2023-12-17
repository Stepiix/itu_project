<?php
/*
Author: Tomas Valik (xvalik04)
*/


namespace App\Http\Controllers;

use App\Models\userMy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{

    private function getBase64Image($imageData)
    {
        if ($imageData) {
            return base64_encode($imageData);
        } else {
            return null;
        }
    }

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

        $user = UserMy::where('user_email', $request->user_email)->first();


        $credentials = $request->only('user_email', 'user_password');

        if ($user && Hash::check($request->user_password, $user->user_password)) {
            $user->user_photo = $this->getBase64Image($user->user_photo);
            return response()->json(['user' => $user, 'message' => 'Login successful']);
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    public function logout()
    {
        Auth::logout();

        return response()->json(['message' => 'Logout successful']);
    }


}