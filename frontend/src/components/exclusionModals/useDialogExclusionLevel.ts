import { useToast } from "@/hooks/use-toast";
import { CustomError } from "@/lib/error";
import { deleteLevel } from "@/services/levels.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";

interface UseDialogExclusionLevelProps {
  levelId: number;
};

export const useDialogExclusionLevel = ({levelId}: UseDialogExclusionLevelProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutateAsync: deletedLevel, isPending } = useMutation({
    mutationKey: ["levels.deletedLevel"],
    mutationFn: () => deleteLevel(levelId),
    onSuccess: () => {
      toast({
        title: "Nível Excluído com sucesso",
        description: "Nível foi excluído com sucesso",
        duration: 3000,
      })
      queryClient.invalidateQueries({
        queryKey: ["levels.useGetLevelPaginated"],
        exact: false,
      });
    },
    onError: (error) => {
      const customError = error as CustomError;
      const errorMessage = customError.response?.data.message;

      toast({
        title: "Não foi possível excluir o Nível",
        description: errorMessage || "Verifique os dados e tente novamente",
        variant: "destructive",
        duration: 4000,
      })
    },
  });

  const handleDeleteLevel = async () => {
    await deletedLevel();
    ref.current?.click();
  };

  return { handleDeleteLevel, isPending, ref };
}
