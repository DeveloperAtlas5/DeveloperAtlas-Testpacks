@extends('layouts.app')

@section('title', 'Welcome')

@section('content')
    <h1>Welcome to Atlas Demo</h1>
    <p>This page demonstrates the full Laravel flow chain.</p>

    @include('partials.nav')

    <x-alert type="success" message="Flow Navigator is working!" />

    <a href="{{ route('users.index') }}">View Users</a>
    <a href="{{ route('about') }}">About</a>
    <a href="/js/app.js">App Script</a>
@endsection