import { useToast } from "@/hooks/use-toast";
import { FormDeveloperSchema, FormDeveloperSchemaProps } from "@/schemas/developer";
import { createDeveloper } from "@/services/developers.service";
import { useGetLevels } from "@/services/levels.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { useForm } from "react-hook-form";

export const useDeveloperForm = () => {
  const queryClient = useQueryClient();
  const ref = useRef<HTMLDivElement>(null);
  const form = useForm<FormDeveloperSchemaProps>({
    resolver: zodResolver(FormDeveloperSchema),
    defaultValues: {
      nome: "",
      hobby: "",
    },
  });

  const { toast } = useToast()
  const { errors } = form.formState;
  const { data: levels } = useGetLevels();

  const { mutateAsync: createDev, isPending } = useMutation({
    mutationKey: ["developers.createDev"],
    mutationFn: (data: FormDeveloperSchemaProps) => createDeveloper(data),
    onSuccess: () => {
      toast({
        title: "Desenvolvedor criado com sucesso",
        description: "O desenvolvedor foi criado com sucesso",
        duration: 3000,
      })
      form.reset();
      queryClient.invalidateQueries({
        queryKey: ["developers.useGetDevelopersPaginated"],
        exact: false,
      });
    },
    onError: () => {
      toast({
        title: "Não foi possível criar o desenvolvedor",
        description: "Verifique os dados e tente novamente",
        variant: "destructive",
        duration: 2000,
      })
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    await createDev(data);
    ref.current?.click();
  });
  return {
    ref,
    form,
    onSubmit,
    errors,
    levels,
    isPending,
  }
}
