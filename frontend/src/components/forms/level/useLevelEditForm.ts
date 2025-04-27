import { useToast } from "@/hooks/use-toast";
import { FormLevelSchema, FormLevelSchemaProps } from "@/schemas/level";
import { updateLevel } from "@/services/levels.service";
import { Nivel } from "@/types/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { useForm } from "react-hook-form";

interface UseLevelEditFormlProps {
  level: Nivel;
};

export const useLevelEditForm = ({level}: UseLevelEditFormlProps) => {
  const queryClient = useQueryClient();
  const ref = useRef<HTMLDivElement>(null);
  const form = useForm<FormLevelSchemaProps>({
    resolver: zodResolver(FormLevelSchema),
    defaultValues: {
      nivel: level.nivel,
    },
  });

  const { toast } = useToast()

  const { mutateAsync: updatedLevel, isPending } = useMutation({
    mutationKey: ["level.updatedLevel"],
    mutationFn: (data: FormLevelSchemaProps) => updateLevel(data, level.id),
    onSuccess: () => {
      toast({
        title: "Nível editado com sucesso",
        description: "Nível foi editado com sucesso",
        duration: 3000,
      })
      queryClient.invalidateQueries({
        queryKey: ["levels.useGetLevelPaginated"],
        exact: false,
      });
    },
    onError: () => {
      toast({
        title: "Não foi possível editar o Nível",
        description: "Verifique os dados e tente novamente",
        variant: "destructive",
        duration: 2000,
      })
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    await updatedLevel(data);
    ref.current?.click();
  });

  return {
    form,
    ref,
    onSubmit,
    isPending,
  }
}
