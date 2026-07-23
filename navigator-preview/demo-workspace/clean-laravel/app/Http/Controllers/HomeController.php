<?php

namespace App\Http\Controllers;

class HomeController extends Controller
{
    /**
     * Landing page — returns the welcome view.
     */
    public function index()
    {
        return view('welcome');
    }
}