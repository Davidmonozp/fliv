<?php

use App\Http\Controllers\ProductoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Lista todos los productos
Route::get('/productos', [ProductoController::class, 'index']);

// Crea una nuevo producto
Route::post('crear-productos', [ProductoController::class, 'store']);

// Obtiene un producto por ID
Route::get('/ver-productos/{id}', [ProductoController::class, 'show']);

// Actualiza un producto por ID
Route::put('/editar-productos/{id}', [ProductoController::class, 'update']);

// Elimina un producto por ID
Route::delete('/eliminar-productos/{id}', [ProductoController::class, 'destroy']);
