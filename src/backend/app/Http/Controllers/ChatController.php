<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Chat;

class ChatController extends Controller
{

    public function index($group)
    {
        $groupId = $group;

        if (!$groupId) {
            return response()->json(['message' => 'Group ID is required.'], 400);
        }

        $chats = Chat::where('message_group_id', $groupId)->get();
        return response()->json($chats);
    }

    public function addMessage(Request $request)
    {
        $userId = $request->input('message_user_id');

        if (!$userId) {
            return response()->json(['message' => 'User ID is required.'], 400);
        }

        $chat = Chat::create([
            'message_user_id'=> $request->input('message_user_id'),
            'message_group_id'=> $request->input('message_group_id'),
            'message_text'=> $request->input('message_text'),
        ]);

        $chat->save();

        return response()->json($chat);

    }

    public function removeMessage($id)
    {
        $chatId = $id;

        if (!$chatId) {
            return response()->json(['message' => 'message_id is required.'], 400);
        }

        $chat = Chat::where('message_id', $chatId)->first();

        $chat->delete();

        return response()->json($chat);
    }
}
