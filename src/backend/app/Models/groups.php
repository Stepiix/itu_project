<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class groups extends Model
{
    use HasFactory;

    protected $table = 'AGroup';
    protected $primaryKey = 'group_id';
    protected $fillable = [   
    'group_name', // upraveno z 'name' na 'user_firstname'
    'group_label',  // upraveno z 'name' na 'user_lastname'
    'group_link',     // upraveno z 'email' na 'user_email'
    'group_photo', 
    ];

    public function users()
    {
        return $this->belongsToMany(userMy::class, 'GroupUser', 'group_id', 'user_id');
    }

}
