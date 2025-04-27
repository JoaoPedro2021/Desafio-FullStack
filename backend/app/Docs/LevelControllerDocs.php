<?php

namespace App\Docs;

trait LevelControllerDocs
{
    /**
     * @OA\Get(
     *     path="/api/niveis",
     *     summary="Listar todos os níveis",
     *     tags={"Níveis"},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de níveis retornada com sucesso"
     *     )
     * )
     */
    public function docsIndex() {}

      /**
     * @OA\Post(
     *     path="/api/niveis",
     *     summary="Criar um novo nível",
     *     tags={"Níveis"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"nivel"},
     *             @OA\Property(property="nivel", type="string", example="Júnior")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Nível criado com sucesso",
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Erro na criação do nível",
     *     )
     * )
     */
    public function docsStore() {}

    /**
     * @OA\Get(
     *     path="/api/niveis/{id}",
     *     summary="Exibir um nível específico",
     *     tags={"Níveis"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID do nível",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Detalhes do nível",
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Nível não encontrado"
     *     )
     * )
     */
    public function docsShow() {}

    /**
     * @OA\Put(
     *     path="/api/niveis/{id}",
     *     summary="Atualizar um nível específico",
     *     tags={"Níveis"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID do nível",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"nivel"},
     *             @OA\Property(property="nivel", type="string", example="Sênior")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Nível atualizado com sucesso",
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Erro na atualização do nível"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Nível não encontrado"
     *     )
     * )
     */
    public function docsUpdate() {}

      /**
     * @OA\Delete(
     *     path="/api/niveis/{id}",
     *     summary="Remover um nível",
     *     tags={"Níveis"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID do nível",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Nível removido com sucesso"
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Não é possível remover o nível | Não é possível remover este nível, pois ele está associado a um ou mais desenvolvedores."
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Nível não encontrado"
     *     )
     * )
     */
    public function docsDelete() {}

     /**
     * @OA\Get(
     *     path="/api/niveis/paginado",
     *     summary="Listar Níveis paginados (formato 'data' e 'meta')",
     *     tags={"Níveis"},
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
     *         description="Lista de Níveis paginada retornada com sucesso (formato 'data' e 'meta')",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="data",
     *                 type="array",
     *                 @OA\Items(
     *                     type="object",
     *                     @OA\Property(property="id", type="integer", example=1),
     *                     @OA\Property(property="nivel", type="string", example="Avançado"),
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
     *         description="Nenhum Nível encontrado"
     *     )
     * )
     */
    public function docsPaginated() {}
}
