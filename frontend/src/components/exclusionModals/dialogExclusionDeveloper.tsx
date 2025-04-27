import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useDialogExclusionDeveloper } from "./useDialogExclusionDeveloper";

interface DialogExclusionProps {
  children?: React.ReactNode;
  devId: number;
};

export const DialogExclusionDeveloper = ({ children, devId }: DialogExclusionProps) => {

  const {
    ref,
    handleDeleteDev,
    isPending,
  } = useDialogExclusionDeveloper({ devId });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div ref={ref}>{children}</div>
      </DialogTrigger>
      <DialogContent className="w-5/6 rounded-lg sm:max-w-2/4">
        <DialogHeader>
          <DialogTitle className="text-sm md:text-base">Excluir um Desenvolvedor?</DialogTitle>
          <DialogDescription className="text-destructive text-center font-semibold py-3 text-sm md:text-base">
            Você tem certeza que deseja excluir este desenvolvedor? <br></br> Esta ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end items-end">
          <Button variant={isPending ? "disabled" : "destructive"} onClick={handleDeleteDev}>{isPending ? "Carregando..." : "Excluir dev"}</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
