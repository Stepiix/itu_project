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

    public function removeUserFromGroup(Request $request)
    {
        $request->validate([
            'group_id' => 'required|integer',
            'user_id' => 'required|integer',
        ]);

        $groupId = $request->input('group_id');
        $userId = $request->input('user_id');

        // Zkontrolujte, zda uživatel patří do skupiny
        $groupUser = GroupUser::where('group_id', $groupId)
            ->where('user_id', $userId)
            ->first();

        if (!$groupUser) {
            return response()->json(['message' => 'User is not part of this group.'], 404);
        }

        $groupUser->delete();

        return response()->json(['message' => 'User was removed succesfully']);
    }

    public function invite(Request $request, $code)
    {
        // Najdeme skupinu podle kódu
        $group = Groups::where('group_link', $code)->first();

        // Získáme ID uživatele z parametru URL
        $userId = $request->query('user_id');

        if (!$group || !$userId) {
            return response()->json(['message' => 'Invalid invitation link.'], 404);
        }

        // Zkontrolujeme, zda uživatel není již v této skupině
        $isUserInGroup = GroupUser::where('group_id', $group->group_id)
            ->where('user_id', $userId)
            ->exists();

        if ($isUserInGroup) {
            return response()->json(['message' => 'User is already in the group.'], 400);
        }

        // Přidáme uživatele do skupiny
        GroupUser::create([
            'group_id' => $group->group_id,
            'user_id' => $userId,
        ]);

        return response()->json(['message' => 'User added to the group successfully.']);
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

        $userId = $request->input('user_id'); // Předpokládáme, že máte nějaký způsob získání user_id
        if (!$userId) {
            return response()->json(['message' => 'User ID is required.'], 400);
        }
        // Získání base64 kódované fotky z requestu
        $base64Image = $request->input('group_photo');
        
        // Dekódování base64 kódu do binární podoby
        $imageData = base64_decode($base64Image);

        $group = groups::create([
            'group_name' => $request->input('group_name'),
            'group_label' => $request->input('group_label'),
            'group_photo' => $imageData,
        ]);

        GroupUser::create([
            'group_id' => $group->group_id,
            'user_id' => $userId,
        ]);

        // Vygenerování unikátního kódu (hash z ID skupiny)
        $invitationCode = hash('sha256', $group->group_id);

        // Přidání kódu do skupiny
        $group->group_link = $invitationCode;
        $group->save();
        // Vytvoření odkazu
        // $invitationLink = route('group.invite', ['code' => $invitationCode]);

        return response()->json(['group' => $group, 'invitationLink' => $invitationCode, 'message' => 'Group created successfully']);
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


    public function updateGroup(Request $request)
    {
        // Validace vstupních dat
        $request->validate([
            'group_id' => 'required|integer',
            'group_name' => 'required|string|max:32',
            'group_label' => 'nullable|string|max:64',
        ]);

        // Získání skupiny podle group_id
        $group = groups::find($request->input('group_id'));

        if (!$group) {
            return response()->json(['message' => 'Group not found'], 404);
        }

        // Aktualizace údajů skupiny
        $group->group_name = $request->input('group_name');
        $group->group_label = $request->input('group_label');

        $group->save();

        return response()->json(['message' => 'Group was updated succesfully'], 200);
    }


}
