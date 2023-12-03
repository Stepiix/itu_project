<?php

namespace App\Http\Controllers;


use App\Models\groups;
use Illuminate\Http\Request;

class GroupsController extends Controller
{
    public function index()
    {
        $groups = groups::all();
        return response()->json($groups);
    }
}
