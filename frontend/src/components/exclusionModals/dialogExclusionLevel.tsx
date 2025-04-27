import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useDialogExclusionLevel } from "./useDialogExclusionLevel";

interface DialogExclusionLevelProps {
  children?: React.ReactNode;
  levelId: number;
};

export const DialogExclusionLevel = ({ children, levelId }: DialogExclusionLevelProps) => {

  const {
    handleDeleteLevel,
    isPending,
    ref,
  } = useDialogExclusionLevel({ levelId });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div ref={ref}>{children}</div>
      </DialogTrigger>
      <DialogContent className="w-5/6 rounded-lg sm:max-w-2/4">
        <DialogHeader>
          <DialogTitle className="text-sm md:text-base">Excluir um Nível?</DialogTitle>
          <DialogDescription className="text-destructive text-center font-semibold py-3 text-sm md:text-base">
            Você tem certeza que deseja excluir este Nível? <br></br> Esta ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end items-end">
          <Button variant={isPending ? "disabled" : "destructive"} onClick={handleDeleteLevel}>{isPending ? "Carregando..." : "Excluir Nível"}</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}


