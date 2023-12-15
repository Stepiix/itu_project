<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;
use App\Models\userMy;
use App\Models\GroupUser;

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

    public function calculateUserBalances(Request $request)
    {
        $request->validate([
            'group_id' => 'required|integer',
        ]);

        $groupId = $request->input('group_id');

        // Načtení všech transakcí pro danou skupinu
        $transactions = Transaction::where('t_group_id', $groupId)->get();

        // Načtení informací o uživatelích ve skupině pomocí relace
        $users = GroupUser::where('group_id', $groupId)->with('user')->get()->pluck('user');

        // Vytvoření asociativního pole pro udržení salda každého uživatele
        $userBalances = [];

        // Procházení každé transakce
        foreach ($transactions as $transaction) {
            // Přidání částky od payera
            $userBalances[$transaction->t_user_payer_id] = 
                ($userBalances[$transaction->t_user_payer_id] ?? 0) + $transaction->t_amount;

            // Odčítání částky od debtorů
            $userBalances[$transaction->t_user_debtor_id] = 
                ($userBalances[$transaction->t_user_debtor_id] ?? 0) - $transaction->t_amount;
        }


        // Přidání informací o saldu do asociativního pole
        foreach ($users as $user) {
            $user->balance = $userBalances[$user->user_id] ?? 0;
        }

        return response()->json(['users' => $users]);
    }
}