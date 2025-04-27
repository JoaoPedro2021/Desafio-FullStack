<?php

use App\Http\Controllers\Api\LevelController;
use Illuminate\Support\Facades\Route;

// Rotas de Niveis
Route::get('/niveis/paginado', [LevelController::class, 'indexPaginado']);
Route::get('/niveis', [LevelController::class, 'index']);
Route::get('/niveis/{nivel}', [LevelController::class, 'show']);
Route::post('/niveis', [LevelController::class, 'store']);
Route::put('/niveis/{nivel}', [LevelController::class, 'update']);
Route::delete('/niveis/{nivel}', [LevelController::class, 'destroy']);

