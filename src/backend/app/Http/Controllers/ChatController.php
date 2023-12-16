<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Chat;

class ChatController extends Controller
{

    public function index()
    {
        $chats = Chat::all();
        return response()->json($chats);
    }

    public function addMessage(Request $request)
    {
        $userId = $request->input('message_user_id');

        if (!$userId) {
            return response()->json(['message' => 'User ID is required.'], 400);
        }

        // Validace netreba
        $chat = Chat::create([
            'message_user_id'=> $request->input('message_user_id'),
            'message_group_id'=> $request->input('message_group_id'),
            'message_text'=> $request->input('message_text'),
        ]);

        $chat->save();

        return response()->json($chat);

    }

    // mazat zpeavy
    public function removeMessage(Request $request)
    {
        $chatId = $request->input('message_id');

        if (!$chatId) {
            return response()->json(['message' => 'Chat ID is required.'], 400);
        }

        $chat = Chat::where('message_id', $chatId)->first();

        $chat->delete();

        return response()->json($chat);
    }
}
