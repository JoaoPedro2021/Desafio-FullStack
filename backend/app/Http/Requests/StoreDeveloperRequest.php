<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreDeveloperRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Manipular falha de validação e retornar uma resposta JSON com os erros de validação.
     *
     * @param  \Illuminate\Contracts\Validation\Validator  $validator O objeto de validação que contém os erros de validação.
     * @throws \Illuminate\Http\Exceptions\HttpResponseException
     */
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'erros' => $validator->errors(),
        ], 400));
    }

    /**
     * Retorna as regras de validação para os dados do usuário.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nome' => 'required|string|max:255',
            'sexo' => 'required|string|in:M,F,O',
            'data_nascimento' => 'required|date',
            'nivel_id' => 'required|integer|exists:levels,id',
            'hobby' => 'required|string|max:255',
        ];
    }

    /**
     * Retorna as mensagens de erro personalizadas para as regras de validação.
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            'nivel_id' => 'Campo Nivel é obrigatório!',
            'nome.required' => 'Campo Nome é obrigatório!',
            'sexo.required' => 'Campo Sexo é obrigatório!',
            'sexo.in' => 'Campo Sexo deve ser um dos seguintes valores: M, F ou O!',
            'data_nascimento.required' => 'Campo Data de Nascimento é obrigatório!',
            'hobby.required' => 'Campo Hobby é obrigatório!',
            'nivel_id.required' => 'Campo Nivel é obrigatório!',
            'nome.string' => 'Campo Nome deve ser uma string!',
            'sexo.string' => 'Campo Sexo deve ser uma string!',
            'data_nascimento.date' => 'Campo Data de Nascimento deve ser uma data válida!',
            'hobby.string' => 'Campo Hobby deve ser uma string!',
            'nivel_id.integer' => 'Campo Nivel deve ser um número inteiro!',
            'nivel_id.exists' => 'Nivel não existe!',
        ];
    }
}
