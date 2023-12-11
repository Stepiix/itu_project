<?php

namespace App\Http\Controllers;


use App\Models\groups;
use Illuminate\Http\Request;

class GroupsController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->input('userId', null);

        if (!$userId) {
            return response()->json(['message' => 'User ID is required.'], 400);
        }

        // Získání skupin pro konkrétního uživatele
        $groups = Groups::whereHas('users', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })->get();

        return response()->json($groups);
    }
    
    public function createGroup(Request $request)
    {
        $request->validate([
            'group_name' => 'required|string|max:32',
            'group_label' => 'nullable|string|max:64',
        ]);

        $group = groups::create([
            'group_name' => $request->input('group_name'),
            'group_label' => $request->input('group_label'),
        ]);

        // $userId = $request->input('user_id'); // Předpokládáme, že máte nějaký způsob získání user_id
        // GroupUser::create([
        //     'group_id' => $group->group_id,
        //     'user_id' => $userId,
        // ]);

        return response()->json(['group' => $group, 'message' => 'Group created successfully']);
    }

}
