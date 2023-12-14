<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;

class TransactionController extends Controller
{
    public function createTransaction(Request $request)
    {
        // Validace vstupních dat
        $request->validate([
            't_group_id' => 'required|integer',
            't_user_payer_id' => 'required|integer',
            't_user_debtor_id' => 'required|integer',
            't_amount' => 'required|integer',
            't_currency' => 'required|string|max:10',
            't_exchange_rate' => 'required|integer',
            't_label' => 'nullable|string|max:64',
        ]);

        // Vytvoření nové transakce
        $transaction = Transaction::create([
            't_group_id' => $request->input('t_group_id'),
            't_user_payer_id' => $request->input('t_user_payer_id'),
            't_user_debtor_id' => $request->input('t_user_debtor_id'),
            't_amount' => $request->input('t_amount'),
            't_currency' => $request->input('t_currency'),
            't_exchange_rate' => $request->input('t_exchange_rate'),
            't_label' => $request->input('t_label'),
        ]);

        return response()->json(['transaction' => $transaction, 'message' => 'Transaction created successfully']);
    }

    public function getTransactionsByGroup(Request $request)
    {

        $groupId = $request->input('t_group_id', null);

        if (!$groupId) {
            return response()->json(['message' => 'Group ID is required.'], 400);
        }
        // Získání všech transakcí a jmen uživatelů ze skupiny
        $transactions = Transaction::where('t_group_id', $groupId)
            ->with(['payer', 'debtor'])
            ->get();

        // Můžete přizpůsobit návratový formát podle potřeby
        $result = [
            'transactions' => $transactions,
        ];

        return response()->json($result, 200);
    }
}