<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('developers', function (Blueprint $table) {
            $table->id(); // id auto-incrementável
            $table->string('nome');
            $table->enum('sexo', ['M', 'F', 'O']); // M: masculino, F: feminino, O: outro
            $table->date('data_nascimento');
            $table->integer('idade');
            $table->string('hobby');
            $table->unsignedBigInteger('nivel_id');
            $table->timestamps();

            // Chave estrangeira com relação à tabela 'levels'
            $table->foreign('nivel_id')->references('id')->on('levels')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('developers');
    }
};
