<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;
use App\Models\userMy;
use App\Models\GroupUser;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{

    public function removeTransaction($id)
    {
        $transaction_id = $id;

        $transaction = Transaction::where('t_id', $transaction_id)
        ->first();

        if (!$transaction) {
            return response()->json(['message' => 'Invalid id of transaction'], 404);
        }

        $transaction->delete();


        return response()->json(['message' => 'Transaction deleted successfully']);
    }

    public function createTransaction(Request $request)
    {

        $request->validate([
            't_group_id' => 'required|integer',
            't_user_payer_id' => 'required|integer',
            't_user_debtor_id' => 'required|integer',
            't_amount' => 'required|integer',
            't_currency' => 'required|string|max:10',
            't_exchange_rate' => 'required|integer',
            't_label' => 'nullable|string|max:64',
        ]);


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


        foreach ($transactions as $transaction) {
            // Dekodovat payerův obrázek
            $transaction->payer->user_photo = null;
    
            // Dekodovat debtorův obrázek
            $transaction->debtor->user_photo = null;
        }
        
            // Můžete přizpůsobit návratový formát podle potřeby
        $result = [
            'transactions' => $transactions,
        ];

        return response()->json($result, 200);
    }

    public function getTransactionsByUser(Request $request)
    {
        $request->validate([
            'user_id' => 'required|integer',
        ]);

        $userId = $request->input('user_id');

        // Získání všech transakcí, kde je uživatel buď platcem nebo dlužníkem
        $transactions = Transaction::where('t_user_payer_id', $userId)
            ->orWhere('t_user_debtor_id', $userId)
            ->with(['debtor'])
            ->get();

        // Dekódování fotek uživatelů
        foreach ($transactions as $transaction) {
            $transaction->debtor->user_photo = null;
        }

        $result = [
            'user_id' => $userId,
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
        foreach ($users as $user) {
            $user->user_photo = null;
        }

        return response()->json(['users' => $users]);
    }

    public function calculateUserBalance(Request $request)
    {
        $request->validate([
            'user_id' => 'required|integer',
        ]);

        $userId = $request->input('user_id');

        if (!$userId) {
            return response()->json(['message' => 'User ID is required.'], 400);
        }
        // Načtení všech transakcí pro daného uživatele (jako platce nebo dlužníka)
        $transactions = Transaction::where('t_user_payer_id', $userId)
            ->orWhere('t_user_debtor_id', $userId)
            ->get();

        // Vytvoření asociativního pole pro udržení salda uživatele
        $userBalance = 0;

        // Procházení každé transakce
        foreach ($transactions as $transaction) {
            // Přidání částky od platce
            if ($transaction->t_user_payer_id == $userId) {
                $userBalance += $transaction->t_amount;
            }

            // Odčítání částky od dlužníka
            if ($transaction->t_user_debtor_id == $userId) {
                $userBalance -= $transaction->t_amount;
            }
        }

        return response()->json(['user_id' => $userId, 'balance' => $userBalance]);
    }

    public function calculateDebts(Request $request)
    {
        $request->validate([
            'group_id' => 'required|integer',
        ]);

        $groupId = $request->input('group_id');

        // Načtení všech transakcí pro danou skupinu
        $transactions = DB::table('Transaction')
            ->where('t_group_id', $groupId)
            ->select(
                't_user_payer_id',
                't_user_debtor_id',
                DB::raw('SUM(t_amount) as total_amount')
            )
            ->groupBy('t_user_payer_id', 't_user_debtor_id')
            ->get();

        // Vytvoření asociativního pole pro udržení dluhů
        $debts = [];

        // Procházení každé transakce
        foreach ($transactions as $transaction) {
            $payerId = $transaction->t_user_payer_id;
            $debtorId = $transaction->t_user_debtor_id;
            $amount = $transaction->total_amount;

            // Přidání dluhu k příslušným účastníkům
            $debts[$debtorId][$payerId] = ($debts[$debtorId][$payerId] ?? 0) + $amount;
            $debts[$payerId][$debtorId] = ($debts[$payerId][$debtorId] ?? 0) - $amount;
        }

        // Vyfiltrování pouze těch, kteří něco dluží
        $filteredDebts = array_filter($debts, function ($userDebts) {
            return array_sum($userDebts) > 0;
        });

        // Odstranění záporných hodnot z každého záznamu
        $filteredDebts = array_map(function ($userDebts) {
            return array_filter($userDebts, function ($debt) {
                return $debt > 0;
            });
        }, $filteredDebts);

        return response()->json(['debts' => $filteredDebts]);
    }

}