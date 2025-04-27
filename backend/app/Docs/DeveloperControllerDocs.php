<?php

namespace App\Docs;

trait DeveloperControllerDocs
{
    /**
     * @OA\Get(
     *     path="/api/desenvolvedores",
     *     summary="Listar todos os Desenvolvedores",
     *     tags={"Desenvolvedores"},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de Desenvolvedores retornada com sucesso"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Nenhum desenvolvedor encontrado"
     *     )
     * )
     */
    public function docsIndex() {}

    /**
     * @OA\Post(
     *     path="/api/desenvolvedores",
     *     summary="Criar um novo Desenvolvedor",
     *     tags={"Desenvolvedores"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"nivel_id", "nome", "sexo", "data_nascimento", "hobby"},
     *             @OA\Property(property="nivel_id", type="number", example="1"),
     *             @OA\Property(property="nome", type="string", example="João"),
     *             @OA\Property(property="sexo", type="string", example="M"),
     *             @OA\Property(property="data_nascimento", type="string", format="date", example="1990-01-01"),
     *             @OA\Property(property="hobby", type="string", example="Programar")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Desenvolvedor criado com sucesso"
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Erro ao criar desenvolvedor"
     *     )
     * )
     */
    public function docsStore() {}

    /**
     * @OA\Get(
     *     path="/api/desenvolvedores/{id}",
     *     summary="Mostrar um Desenvolvedor por ID",
     *     tags={"Desenvolvedores"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Desenvolvedor encontrado"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Desenvolvedor não encontrado"
     *     )
     * )
     */
    public function docsShow() {}

    /**
     * @OA\Put(
     *     path="/api/desenvolvedores/{id}",
     *     summary="Atualizar um Desenvolvedor",
     *     tags={"Desenvolvedores"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"nivel_id", "nome", "sexo", "data_nascimento", "hobby"},
     *             @OA\Property(property="nivel_id", type="number", example="1"),
     *             @OA\Property(property="nome", type="string", example="João"),
     *             @OA\Property(property="sexo", type="string", example="M"),
     *             @OA\Property(property="data_nascimento", type="string", format="date", example="1990-01-01"),
     *             @OA\Property(property="hobby", type="string", example="Programar")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Desenvolvedor atualizado com sucesso"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Desenvolvedor não encontrado"
     *     )
     * )
     */
    public function docsUpdate() {}

    /**
     * @OA\Delete(
     *     path="/api/desenvolvedores/{id}",
     *     summary="Deletar um Desenvolvedor",
     *     tags={"Desenvolvedores"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Desenvolvedor deletado com sucesso"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Desenvolvedor não encontrado"
     *     )
     * )
     */
    public function docsDelete() {}

    /**
     * @OA\Get(
     *     path="/api/desenvolvedores/paginado",
     *     summary="Listar Desenvolvedores paginados (formato 'data' e 'meta')",
     *     tags={"Desenvolvedores"},
     *     @OA\Parameter(
     *         name="per_page",
     *         in="query",
     *         description="Número de itens por página",
     *         @OA\Schema(type="integer", default=10)
     *     ),
     *     @OA\Parameter(
     *         name="page",
     *         in="query",
     *         description="Número da página",
     *         @OA\Schema(type="integer", default=1)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Lista de Desenvolvedores paginada retornada com sucesso (formato 'data' e 'meta')",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="data",
     *                 type="array",
     *                 @OA\Items(
     *                     type="object",
     *                     @OA\Property(property="id", type="integer", example=1),
     *                     @OA\Property(property="nome", type="string", example="João"),
     *                     @OA\Property(property="sexo", type="string", example="M"),
     *                     @OA\Property(property="data_nascimento", type="string", format="date", example="1990-01-01"),
     *                     @OA\Property(property="hobby", type="string", example="Programar"),
     *                     @OA\Property(property="idade", type="integer", example=33),
     *                     @OA\Property(property="nivel_id", type="integer", example=1),
     *                     @OA\Property(
     *                         property="nivel",
     *                         type="object",
     *                         @OA\Property(property="id", type="integer", example=1),
     *                         @OA\Property(property="nome", type="string", example="Sênior")
     *                     )
     *                 )
     *             ),
     *             @OA\Property(
     *                 property="meta",
     *                 type="object",
     *                 @OA\Property(property="total", type="integer", example=20),
     *                 @OA\Property(property="per_page", type="integer", example=10),
     *                 @OA\Property(property="current_page", type="integer", example=1),
     *                 @OA\Property(property="last_page", type="integer", example=2)
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Nenhum desenvolvedor encontrado"
     *     )
     * )
     */
    public function docsPaginated() {}
}
