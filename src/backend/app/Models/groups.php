<?php
/*
Author: Tomas Valik (xvalik04)
*/

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class groups extends Model
{
    use HasFactory;

    protected $table = 'AGroup';
    protected $primaryKey = 'group_id';
    protected $fillable = [   
    'group_name',
    'group_label', 
    'group_link',  
    'group_photo', 
    ];

    public function users()
    {
        return $this->belongsToMany(userMy::class, 'GroupUser', 'group_id', 'user_id');
    }

}
