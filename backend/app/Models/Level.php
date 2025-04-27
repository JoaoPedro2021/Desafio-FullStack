<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;

class Level extends Model
{
    use HasFactory;
    protected $table = 'levels';
    protected $fillable = ["nivel"];

     // Relacionamento: um nível tem muitos desenvolvedores
     public function developers()
     {
         return $this->hasMany(Developer::class, 'nivel_id');
     }

     public function hasDeveloper(): bool
     {
         return $this->developers()->exists();
     }
}
