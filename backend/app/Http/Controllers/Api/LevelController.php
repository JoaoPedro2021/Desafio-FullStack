<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreLevelRequest;
use App\Http\Resources\LevelResource;
use App\Services\LevelService;
use Exception;
use Illuminate\Http\JsonResponse;

class LevelController extends Controller
{
    protected $levelsService;

    public function __construct(LevelService $levelsService)
    {
        $this->levelsService = $levelsService;
    }

    public function index(): JsonResponse
    {
        $levels = $this->levelsService->getAllLevels();
        if ($levels->isEmpty()) {
            return response()->json(['message' => 'Nenhum Nível encontrado'], 404);
        }
        return response()->json(LevelResource::collection($levels), 200);
    }

    public function store(StoreLevelRequest $request): JsonResponse
    {
        $level = $this->levelsService->createLevel($request->validated());

        if (!$level) {
            return response()->json(['message' => 'Erro ao criar nível'], 500);
        }

        return response()->json([
            'data' => new LevelResource($level)
        ], 201);
    }

    public function show($id): JsonResponse
    {
        $level = $this->levelsService->getLevelById($id);

        if (!$level) {
            return response()->json(['message' => 'Nível não encontrado'], 404);
        }

        return response()->json(new LevelResource($level), 200);
    }

    public function update(StoreLevelRequest $request, $id): JsonResponse
    {
        $level = $this->levelsService->getLevelById($id);

        if (!$level) {
            return response()->json(['message' => 'Nível não encontrado'], 404);
        }

        $updatedLevel = $this->levelsService->updateLevel($level, $request->validated());

        return response()->json([
            'data' => new LevelResource($updatedLevel)
        ], 200);
    }

    public function destroy($id): JsonResponse
    {
        try {
            $level = $this->levelsService->getLevelById($id);

            if (!$level) {
                return response()->json(['message' => 'Nível não encontrado'], 404);
            }

            $deleted = $this->levelsService->deleteLevel($level);

            if (!$deleted) {
                return response()->json([
                    'message' => "Não é possível remover este nível, pois ele está associado a desenvolvedores."
                ], 400);
            }

            return response()->json([
                'message' => "Nível removido com sucesso!"
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'message' => "Nível não removido!",
                'error' => $e->getMessage()
            ], 400);
        }
    }

    public function indexPaginado(): JsonResponse
    {
        try {
            $perPage = request()->query('per_page', 10);
            $page = request()->query('page', 1);

            $levels = $this->levelsService->getPaginatedLevels($perPage, $page);

            if ($levels->isEmpty()) {
                return response()->json(['message' => 'Nenhum nível encontrado'], 404);
            }

            return response()->json([
                'data' => LevelResource::collection($levels),
                'meta' => [
                    'total' => $levels->total(),
                    'per_page' => $levels->perPage(),
                    'current_page' => $levels->currentPage(),
                    'last_page' => $levels->lastPage(),
                ]
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Erro ao buscar os níveis',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}

