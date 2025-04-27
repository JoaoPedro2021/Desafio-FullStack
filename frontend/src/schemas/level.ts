import { z } from "zod";

export const FormLevelSchema = z.object({
  nivel:z.string().min(1, "Nível é obrigatório"),
})

export type FormLevelSchemaProps = z.infer<
  typeof FormLevelSchema
>;
