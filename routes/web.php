<?php

use App\Http\Controllers\ResidentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('residents', [ResidentController::class, 'index'])
    ->name('residents.index')
    ->middleware('auth');

Route::get('residents/create', [ResidentController::class, 'create'])
    ->name('residents.create')
    ->middleware('auth');

Route::post('residents/store', [ResidentController::class, 'store'])
    ->name('residents.store')
    ->middleware('auth');

Route::get('residents/{resident}/edit', [ResidentController::class, 'edit'])
    ->name('residents.edit')
    ->middleware('auth');

Route::put('residents/{resident}/update', [ResidentController::class, 'update'])
    ->name('residents.update')
    ->middleware('auth');

Route::delete('residents/{resident}/delete', [ResidentController::class, 'destroy'])
    ->name('residents.delete')
    ->middleware('auth');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
