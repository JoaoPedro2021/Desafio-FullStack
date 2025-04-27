<?php

use App\Http\Controllers\Api\LevelController;
use App\Http\Controllers\Api\DeveloperController;
use Illuminate\Support\Facades\Route;

// Rotas de Niveis
Route::get('/niveis/paginado', [LevelController::class, 'indexPaginado']);
Route::get('/niveis', [LevelController::class, 'index']);
Route::get('/niveis/{nivel}', [LevelController::class, 'show']);
Route::post('/niveis', [LevelController::class, 'store']);
Route::put('/niveis/{nivel}', [LevelController::class, 'update']);
Route::delete('/niveis/{nivel}', [LevelController::class, 'destroy']);

// Rotas de Desenvolvedores
Route::get('/desenvolvedores/paginado', [DeveloperController::class, 'indexPaginado']);
Route::get('/desenvolvedores', [DeveloperController::class, 'index']);
Route::get('/desenvolvedores/{desenvolvedor}', [DeveloperController::class, 'show']);
Route::post('/desenvolvedores', [DeveloperController::class, 'store']);
Route::put('/desenvolvedores/{desenvolvedor}', [DeveloperController::class, 'update']);
Route::delete('/desenvolvedores/{desenvolvedor}', [DeveloperController::class, 'destroy']);
