import { useToast } from "@/hooks/use-toast";
import { deleteDeveloper } from "@/services/developers.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";

interface UseDialogExclusionDeveloperProps {
  devId: number;
}

export const useDialogExclusionDeveloper = ({devId}: UseDialogExclusionDeveloperProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutateAsync: deleteDev, isPending } = useMutation({
    mutationKey: ["developers.deleteDev"],
    mutationFn: () => deleteDeveloper(devId),
    onSuccess: () => {
      toast({
        title: "Desenvolvedor Excluído com sucesso",
        description: "O desenvolvedor foi excluído com sucesso",
        duration: 3000,
      })
      queryClient.invalidateQueries({
        queryKey: ["developers.useGetDevelopersPaginated"],
        exact: false,
      });
    },
    onError: () => {
      toast({
        title: "Não foi possível excluir o desenvolvedor",
        description: "Verifique os dados e tente novamente",
        variant: "destructive",
        duration: 2000,
      })
    },
  });

  const handleDeleteDev = async () => {
    await deleteDev();
    ref.current?.click();
  };

  return { ref, handleDeleteDev, isPending };
}
