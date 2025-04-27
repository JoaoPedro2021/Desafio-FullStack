import { useToast } from "@/hooks/use-toast";
import { FormLevelSchema, FormLevelSchemaProps } from "@/schemas/level";
import { createLevel } from "@/services/levels.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { useForm } from "react-hook-form";

export const useLevelCreateForm = () => {
  const queryClient = useQueryClient();
  const ref = useRef<HTMLDivElement>(null);
  const form = useForm<FormLevelSchemaProps>({
    resolver: zodResolver(FormLevelSchema),
    defaultValues: {
      nivel: "",
    },
  });

  const { toast } = useToast()

  const { mutateAsync: createdLevel, isPending } = useMutation({
    mutationKey: ["level.createdLevel"],
    mutationFn: (data: FormLevelSchemaProps) => createLevel(data),
    onSuccess: () => {
      toast({
        title: "Nível criado com sucesso",
        description: "O Nível foi criado com sucesso",
        duration: 3000,
      })
      form.reset();
      queryClient.invalidateQueries({
        queryKey: ["levels.useGetLevelPaginated"],
        exact: false,
      });
    },
    onError: () => {
      toast({
        title: "Não foi possível criar o Nível",
        description: "Verifique os dados e tente novamente",
        variant: "destructive",
        duration: 2000,
      })
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    await createdLevel(data);
    ref.current?.click();
  });

  return { form, ref, onSubmit, isPending };
}
