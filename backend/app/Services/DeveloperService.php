<?php

namespace App\Services;

use App\Models\Developer;
use Illuminate\Pagination\LengthAwarePaginator;

class DeveloperService
{
    public function calculateAgeDeveloper($dateOfBirth): int
    {
        $dateOfBirth = new \DateTime($dateOfBirth);
        $today = new \DateTime();
        $age = $today->diff($dateOfBirth);
        return $age->y;
    }

    public function getAllDevelopers()
    {
        return Developer::with('nivel')->orderBy('id', 'desc')->get();
    }

    public function getDeveloperById($id)
    {
        return Developer::with('nivel')->find($id);
    }

    public function createDeveloper(array $data)
    {
        try {
            if (isset($data['data_nascimento'])) {
                $data['idade'] = $this->calculateAgeDeveloper($data['data_nascimento']);
            }
            return Developer::create($data);
        } catch (\Exception $e) {
            \Log::error('Erro ao criar desenvolvedor: ' . $e->getMessage());
            throw $e;
        }
    }

    public function updateDeveloper(Developer $dev, array $data)
    {
        if (isset($data['data_nascimento'])) {
            $data['idade'] = $this->calculateAgeDeveloper($data['data_nascimento']);
        }
        $dev->update($data);
        return $dev;
    }

    public function deleteDeveloper(Developer $dev)
    {
        return $dev->delete();
    }

    public function getPaginatedDevelopers($perPage = 10, $page = 1): LengthAwarePaginator
    {
        return Developer::with('nivel')->orderBy('id', 'desc')->paginate($perPage, ['*'], 'page', $page);
    }
}
