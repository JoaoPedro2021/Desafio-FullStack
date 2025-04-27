import { z } from "zod";

export const FormDeveloperSchema = z.object({
  nome:z.string().min(1, "Nome é obrigatório"),
  sexo: z.enum(["M", "F", "O"], {
    errorMap: () => ({ message: "Selecione um sexo" }),
  }),
  data_nascimento: z.date({
    invalid_type_error: "Data de nascimento é obrigatória",
    required_error: "Data de nascimento é obrigatória",
  }).refine((date) => date <= new Date(), {
    message: "Data de nascimento deve ser menor ou igual a data atual",
  }),
  nivel_id: z.coerce.number({
    required_error: "Selecione um nível",
    invalid_type_error: "Selecione um nível",
  }),
  hobby:z.string().min(1, "Hobby é obrigatório"),
})

export type FormDeveloperSchemaProps = z.infer<
  typeof FormDeveloperSchema
>;