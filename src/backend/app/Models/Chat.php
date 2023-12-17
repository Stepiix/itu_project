<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
// Author: Milan Takac (xtakac09)

class Chat extends Model
{
    protected $table = 'Chat';
    protected $primaryKey = 'message_id';

    protected $fillable = [
        'message_user_id',
        'message_group_id',
        'message_text',
    ];

    // Vztahy
    public function group()
    {
        return $this->belongsTo(groups::class, 'message_group_id');
    }

    public function user()
    {
        return $this->belongsTo(userMy::class, 'message_user_id');
    }
}