<?php
/*
Author: Tomas Valik (xvalik04)
*/
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\userMy;

class UserController extends Controller
{

    private function getBase64Image($imageData)
    {
        if ($imageData) {
            return base64_encode($imageData);
        } else {
            return null;
        }
    }


    public function getUser(Request $request)
    {

        $user_id = $request->user_id;

        $user = userMy::find($user_id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        $user->user_photo = $this->getBase64Image($user->user_photo);

        return response()->json($user, 200);
    }

    public function updateUser(Request $request)
    {

        $user_id = $request->input('user_id');

        $request->validate([
            'user_firstname' => 'required|string|max:32',
            'user_lastname' => 'required|string|max:32',
            'user_email' => 'required|string|email|max:32|unique:User,user_email,' . $user_id . ',user_id',
            'user_photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('group_photo')) {
            $imageData = $request->file('group_photo')->get();
        }else{
            $imageData = null;
        }

        $user = userMy::find($user_id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->user_firstname = $request->input('user_firstname');
        $user->user_lastname = $request->input('user_lastname');
        $user->user_email = $request->input('user_email');
        $user->user_photo = $imageData;

        $user->save();

        return response()->json(['message' => 'User updated succesfully'], 200);
    }
}