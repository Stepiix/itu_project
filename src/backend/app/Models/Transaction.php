<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $table = 'Transaction';
    protected $primaryKey = 't_id';

    protected $fillable = [
        't_group_id',
        't_user_payer_id',
        't_user_debtor_id',
        't_amount',
        't_currency',
        't_exchange_rate',
        't_label',
    ];


    public function group()
    {
        return $this->belongsTo(AGroup::class, 't_group_id');
    }

    public function payer()
    {
        return $this->belongsTo(userMy::class, 't_user_payer_id');
    }

    public function debtor()
    {
        return $this->belongsTo(userMy::class, 't_user_debtor_id');
    }
}