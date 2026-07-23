@extends('layouts.app')

@section('title', 'Users')

@section('content')
    <h1>Users</h1>

    @include('partials.nav')

    <ul>
        @foreach ($users as $user)
            <li>
                {{ $user }}
                <a href="{{ route('users.show', ['id' => $loop->index + 1]) }}">View</a>
            </li>
        @endforeach
    </ul>
@endsection