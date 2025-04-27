import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLevelCreateForm } from "./useLevelCreateForm";

interface FormLevelProps {
  children?: React.ReactNode;
};

export const FormCreateLevel = ({ children }: FormLevelProps) => {
  const { form, ref, onSubmit, isPending } = useLevelCreateForm();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div ref={ref}>{children}</div>
      </DialogTrigger>
      <DialogContent className="w-5/6 rounded-lg sm:max-w-2/4">
        <DialogHeader>
          <DialogTitle className="text-center">Adicione um Nível</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col w-full">
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-8">
              <FormField
                control={form.control}
                name="nivel"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-sm md:text-base font-bold">
                      Digite um nível
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Iniciante" {...field} />
                    </FormControl>
                    <FormMessage className="text-sm md:text-base font-bold" />
                  </FormItem>
                )}
              />
              <Button variant={isPending ? "disabled" : "brand"} type="submit">{isPending ? "Carregando..." : "Criar Nível"}</Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
