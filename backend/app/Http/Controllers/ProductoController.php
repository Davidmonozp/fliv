<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class ProductoController extends Controller
{
    public function index()
    {
        try {
            $productos = Producto::all();
            return response()->json($productos, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al obtener los productos', 'details' => $e->getMessage()], 500);
        }
    }


    /**
     * Registrar prodcuto
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'nombre'   => 'required|string|max:255',
                'precio'   => 'required|numeric|min:0',
                'cantidad' => 'required|integer|min:0',
                'imagen'   => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            ]);

            $data = $request->only(['nombre', 'precio', 'cantidad']);

            if ($request->hasFile('imagen')) {
                $data['imagen'] = $request->file('imagen')->store('productos', 'public');
            }

            $producto = Producto::create($data);

            return response()->json([
                'message'  => 'Producto creado correctamente',
                'producto' => $producto
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'error'   => 'Error al crear el producto',
                'details' => $e->getMessage()
            ], 500);
        }
    }


    /**
     * Ver producto
     */
    public function show($id)
    {
        try {
            $producto = Producto::findOrFail($id);

            return response()->json($producto, 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {

            return response()->json([
                'error' => 'Producto no encontrado'
            ], 404);
        } catch (\Exception $e) {

            return response()->json([
                'error'   => 'Error al obtener el producto',
                'details' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Editar o actualizar producto
     */


    public function update(Request $request, $id)
    {
        try {
            $request->validate([
                'nombre'   => 'required|string|max:255',
                'precio'   => 'required|numeric|min:0',
                'cantidad' => 'required|integer|min:0',
                'imagen'   => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            ]);

            $producto = Producto::findOrFail($id);

            $data = $request->only(['nombre', 'precio', 'cantidad']);

            if ($request->hasFile('imagen')) {

                // eliminar imagen anterior si existe
                if ($producto->imagen) {
                    Storage::disk('public')->delete($producto->imagen);
                }

                // guardar nueva imagen
                $data['imagen'] = $request->file('imagen')->store('productos', 'public');
            }

            $producto->update($data);

            return response()->json([
                'message'  => 'Producto actualizado correctamente',
                'producto' => $producto
            ], 200);
        } catch (ModelNotFoundException $e) {

            return response()->json([
                'error' => 'Producto no encontrado'
            ], 404);
        } catch (\Exception $e) {

            return response()->json([
                'error'   => 'Error al actualizar el producto',
                'details' => $e->getMessage()
            ], 500);
        }
    }


    /**
     * Eliminar producto
     */
    public function destroy($id)
    {
        try {
            $producto = Producto::findOrFail($id);

            // eliminar imagen asociada si existe
            if ($producto->imagen) {
                Storage::disk('public')->delete($producto->imagen);
            }

            $producto->delete();

            return response()->json([
                'message' => 'Producto eliminado correctamente'
            ], 200);
        } catch (ModelNotFoundException $e) {

            return response()->json([
                'error' => 'Producto no encontrado'
            ], 404);
        } catch (\Exception $e) {

            return response()->json([
                'error'   => 'Error al eliminar el producto',
                'details' => $e->getMessage()
            ], 500);
        }
    }
}
