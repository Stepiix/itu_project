<?php

namespace App\Models;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class userMy extends Model
{
    use HasFactory;
//    use Authenticatable;
    protected $table='User';
    protected $primaryKey = 'user_id';
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_firstname', // upraveno z 'name' na 'user_firstname'
        'user_lastname',  // upraveno z 'name' na 'user_lastname'
        'user_email',     // upraveno z 'email' na 'user_email'
        'user_password',  // upraveno z 'password' na 'user_password'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'user_password',   // upraveno z 'password' na 'user_password'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'user_password' => 'hashed', // upraveno z 'password' na 'user_password'
    ];
}
