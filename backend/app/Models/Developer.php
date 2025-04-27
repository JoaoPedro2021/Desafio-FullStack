<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Developer extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'sexo',
        'data_nascimento',
        'idade',
        'hobby',
        'nivel_id',
    ];

    public function nivel()
    {
        return $this->belongsTo(Level::class, 'nivel_id');
    }
}
