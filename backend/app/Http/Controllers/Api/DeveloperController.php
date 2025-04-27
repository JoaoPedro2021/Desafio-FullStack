<?php

namespace App\Http\Controllers\Api;

use App\Docs\DeveloperControllerDocs;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDeveloperRequest;
use App\Http\Resources\DeveloperResource;
use App\Http\Resources\LevelResource;
use App\Services\DeveloperService;
use Exception;
use Illuminate\Http\JsonResponse;

/**
 * @OA\Info(
 *     title="API de Desenvolvedores",
 *     version="0.1",
 *     description="Esta é a documentação da API de Desenvolvedores."
 * )
 */

class DeveloperController extends Controller
{
    use DeveloperControllerDocs;
    protected $developerService;

    public function __construct(DeveloperService $developerService)
    {
        $this->developerService = $developerService;
    }

    public function index(): JsonResponse
    {
        $developers = $this->developerService->getAllDevelopers();
        if ($developers->isEmpty()) return response()->json(['message' => 'Nenhum desenvolvedor encontrado'], 404);

        return response()->json(DeveloperResource::collection($developers), 200);
    }

    public function store(StoreDeveloperRequest $request): JsonResponse
    {
        try {
            $developer = $this->developerService->createDeveloper($request->validated());

            if (!$developer) {
                return response()->json(['message' => 'Erro ao criar desenvolvedor'], 500);
            }

            $developer->load('nivel');

            return response()->json([
                'data' => new DeveloperResource($developer)
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Erro ao criar o desenvolvedor',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id): JsonResponse
    {
        $developer = $this->developerService->getDeveloperById($id);
        if (!$developer) return response()->json(['message' => 'Desenvolvedor não encontrado'], 404);

        return response()->json(new DeveloperResource($developer), 200);
    }

    public function update(StoreDeveloperRequest $request, $id): JsonResponse
    {
        $developer = $this->developerService->getDeveloperById($id);
        if (!$developer) return response()->json(['message' => 'Desenvolvedor não encontrado'], 404);

        $updatedDeveloper = $this->developerService->updateDeveloper($developer, $request->validated());

        return response()->json(new DeveloperResource($updatedDeveloper->load('nivel')), 200);
    }

    public function destroy($id): JsonResponse
    {
        $developer = $this->developerService->getDeveloperById($id);
        if (!$developer) return response()->json(['message' => 'Desenvolvedor não encontrado'], 404);

        $this->developerService->deleteDeveloper($developer);

        return response()->json(['message' => 'Desenvolvedor apagado com sucesso!'], 200);
    }

    public function indexPaginado(): JsonResponse
    {
        try {
            $perPage = request()->query('per_page', 10);
            $page = request()->query('page', 1);

            $developers = $this->developerService->getPaginatedDevelopers($perPage, $page);

            if ($developers->isEmpty()) return response()->json(['message' => 'Nenhum desenvolvedor encontrado'], 404);

            return response()->json([
                'data' => DeveloperResource::collection($developers),
                'meta' => [
                    'total' => $developers->total(),
                    'per_page' => $developers->perPage(),
                    'current_page' => $developers->currentPage(),
                    'last_page' => $developers->lastPage(),
                ]
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Erro ao buscar desenvolvedores',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
