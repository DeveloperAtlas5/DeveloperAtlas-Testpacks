@extends('layouts.app')

@section('title', 'About')

@section('content')
    <h1>About This Demo</h1>
    @include('partials.nav')
    <p>Hover over <code>route('home')</code> or <code>view('pages.about')</code> to see Atlas flows.</p>
@endsection