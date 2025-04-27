<?php

namespace App\Services;

use App\Models\Level;
use Illuminate\Support\Collection;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class LevelService
{
    public function getAllLevels(): Collection
    {
        return Level::all();
    }

    public function getPaginatedLevels(int $perPage = 10, int $page = 1): LengthAwarePaginator
    {
        return Level::withCount('developers')
        ->orderBy('id', 'desc')
        ->paginate($perPage, ['*'], 'page', $page);
    }

    public function getLevelById(int $id): ?Level
    {
        return Level::find($id);
    }

    public function createLevel(array $data): ?Level
    {
        return Level::create($data);
    }

    public function updateLevel(Level $level, array $data): Level
    {
        $level->update($data);
        return $level;
    }

    public function deleteLevel(Level $level): bool
    {
        if ($level->hasDeveloper()) {
            return false;
        }

        $level->delete();
        return true;
    }
}
