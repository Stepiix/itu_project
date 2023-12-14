<?php

namespace App\Http\Controllers;


use App\Models\groups;
use App\Models\GroupUser;
use Illuminate\Http\Request;

class GroupsController extends Controller
{
    // Funkce pro získání base64 kódovaného obrázku z binárních dat
    private function getBase64Image($imageData)
    {
        if ($imageData) {
            return base64_encode($imageData);
        } else {
            return null;
        }
    }

    public function index(Request $request)
    {
        $userId = $request->input('userId', null);

        if (!$userId) {
            return response()->json(['message' => 'User ID is required.'], 400);
        }

        // Získání skupin pro konkrétního uživatele
        $groups = Groups::whereHas('users', function ($query) use ($userId) {
            $query->where('GroupUser.user_id', $userId);
        })->get();

        foreach ($groups as $group) {
            $group->group_photo = $this->getBase64Image($group->group_photo);
        }

        return response()->json($groups);
    }
    
    public function createGroup(Request $request)
    {
        $request->validate([
            'group_name' => 'required|string|max:32',
            'group_label' => 'nullable|string|max:64',
            'group_photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);


        // Získání base64 kódované fotky z requestu
        $base64Image = $request->input('group_photo');
        
        // Dekódování base64 kódu do binární podoby
        $imageData = base64_decode($base64Image);

        $group = groups::create([
            'group_name' => $request->input('group_name'),
            'group_label' => $request->input('group_label'),
            'group_photo' => $imageData,
        ]);

        $userId = $request->input('user_id'); // Předpokládáme, že máte nějaký způsob získání user_id
        GroupUser::create([
            'group_id' => $group->group_id,
            'user_id' => $userId,
        ]);

        return response()->json(['group' => $group, 'message' => 'Group created successfully']);
    }

    public function getUsersInGroup(Request $request)
    {
        $groupId = $request->input('group_id', null);

        if (!$groupId) {
            return response()->json(['message' => 'Group ID is required.'], 400);
        }
    
        // Získání informací o skupině
        $group = groups::find($groupId);
    
        if (!$group) {
            return response()->json(['message' => 'Group not found.'], 404);
        }
    
        // Získání všech uživatelů této skupiny
        $users = $group->users;
    
        return response()->json(['group' => $group]);
    }

}
