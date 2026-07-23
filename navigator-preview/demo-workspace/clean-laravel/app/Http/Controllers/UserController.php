<?php

namespace App\Http\Controllers;

class UserController extends Controller
{
    /**
     * List all users.
     */
    public function index()
    {
        $users = ['Alice', 'Bob', 'Carol'];
        return view('users.index', compact('users'));
    }

    /**
     * Show a single user profile.
     */
    public function show(int $id)
    {
        return view('users.show', ['id' => $id]);
    }
}