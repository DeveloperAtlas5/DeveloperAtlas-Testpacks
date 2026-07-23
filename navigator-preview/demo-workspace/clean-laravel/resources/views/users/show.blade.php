@extends('layouts.app')

@section('title', 'User Profile')

@section('content')
    <h1>User #{{ $id }}</h1>
    @include('partials.nav')
    <a href="{{ route('users.index') }}">Back to list</a>
@endsection