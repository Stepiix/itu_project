<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GroupUser extends Model
{
    use HasFactory;

    protected $table = 'GroupUser';

    protected $fillable = [
        'group_id',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(userMy::class, 'user_id', 'user_id');
    }

    public function group()
    {
        return $this->belongsTo(groups::class, 'group_id', 'group_id');
    }

}
