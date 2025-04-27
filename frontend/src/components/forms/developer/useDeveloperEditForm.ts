import { useToast } from "@/hooks/use-toast";
import { FormDeveloperSchema, FormDeveloperSchemaProps } from "@/schemas/developer";
import { updateDeveloper } from "@/services/developers.service";
import { useGetLevels } from "@/services/levels.service";
import { Developer } from "@/types/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { useForm } from "react-hook-form";

interface UseDeveloperEditFormProps {
  dev: Developer;
};


export const useDeveloperEditForm = ({dev}: UseDeveloperEditFormProps) => {

  const queryClient = useQueryClient();
  const ref = useRef<HTMLDivElement>(null);
  const form = useForm<FormDeveloperSchemaProps>({
    resolver: zodResolver(FormDeveloperSchema),
    defaultValues: {
      nome: dev.nome,
      hobby: dev.hobby,
      data_nascimento: new Date(dev.data_nascimento),
      sexo: dev.sexo as "M" | "F" | "O",
      nivel_id: dev.nivel.id,
    },
  });

  const { toast } = useToast()
  const { errors } = form.formState;
  const { data: levels } = useGetLevels();

  const { mutateAsync: updateDev, isPending } = useMutation({
    mutationKey: ["developers.updateDev"],
    mutationFn: (data: FormDeveloperSchemaProps) => updateDeveloper(data, dev.id),
    onSuccess: () => {
      toast({
        title: "Desenvolvedor editado com sucesso",
        description: "O desenvolvedor foi editado com sucesso",
        duration: 3000,
      })
      queryClient.invalidateQueries({
        queryKey: ["developers.useGetDevelopersPaginated"],
        exact: false,
      });
    },
    onError: () => {
      toast({
        title: "Não foi possível editar o desenvolvedor",
        description: "Verifique os dados e tente novamente",
        variant: "destructive",
        duration: 2000,
      })
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    await updateDev(data);
    ref.current?.click();
  });

  return {
    ref,
    form,
    onSubmit,
    levels,
    isPending,
    errors,
  }
}
