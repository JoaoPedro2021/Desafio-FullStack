<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreLevelRequest;
use App\Http\Resources\LevelRosource;
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
        return response()->json(LevelRosource::collection($levels), 200);
    }

    public function store(StoreLevelRequest $request): JsonResponse
    {
        $level = $this->levelsService->createLevel($request->validated());

        if (!$level) {
            return response()->json(['message' => 'Erro ao criar nível'], 500);
        }

        return response()->json([
            'data' => new LevelRosource($level)
        ], 201);
    }

    public function show($id): JsonResponse
    {
        $level = $this->levelsService->getLevelById($id);

        if (!$level) {
            return response()->json(['message' => 'Nível não encontrado'], 404);
        }

        return response()->json(new LevelRosource($level), 200);
    }

    public function update(StoreLevelRequest $request, $id): JsonResponse
    {
        $level = $this->levelsService->getLevelById($id);

        if (!$level) {
            return response()->json(['message' => 'Nível não encontrado'], 404);
        }

        $updatedLevel = $this->levelsService->updateLevel($level, $request->validated());

        return response()->json([
            'data' => new LevelRosource($updatedLevel)
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

            $niveis = $this->levelsService->getPaginatedLevels($perPage, $page);

            if ($niveis->isEmpty()) {
                return response()->json(['message' => 'Nenhum nível encontrado'], 404);
            }

            return response()->json([
                'data' => LevelRosource::collection($niveis),
                'meta' => [
                    'total' => $niveis->total(),
                    'per_page' => $niveis->perPage(),
                    'current_page' => $niveis->currentPage(),
                    'last_page' => $niveis->lastPage(),
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

