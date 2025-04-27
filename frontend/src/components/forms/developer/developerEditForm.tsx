import { gender } from "@/lib/utils";
import { Developer } from "@/types/type";
import { Select } from "../../Select";
import { Button } from "../../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { Input } from "../../ui/input";
import { useDeveloperEditForm } from "./useDeveloperEditForm";

interface FormEditDeveloperProps {
  children?: React.ReactNode;
  dev: Developer;
};

export const FormEditDeveloper = ({ children, dev }: FormEditDeveloperProps) => {

  const {
    form,
    onSubmit,
    isPending,
    levels,
    errors,
    ref,
  } = useDeveloperEditForm({ dev })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div ref={ref}>{children}</div>
      </DialogTrigger>
      <DialogContent className="w-5/6 rounded-lg sm:max-w-2/4">
        <DialogHeader>
          <DialogTitle className="text-center text-sm md:text-base">Edite as informações de um Desenvolvedor</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col w-full">
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-8">
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-sm md:text-base font-bold">
                      Nome do Desenvolvedor
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: João" {...field} />
                    </FormControl>
                    <FormMessage className="text-sm md:text-base font-bold" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hobby"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-sm md:text-base font-bold">
                      Digite seu Hobby Favorito
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Correr" {...field} />
                    </FormControl>
                    <FormMessage className="text-sm md:text-base font-bold" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="data_nascimento"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-sm md:text-base font-bold">
                      Escolha a data de nascimento
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        onChange={(e) => {
                          field.onChange(new Date(e.target.value));
                        }}
                        value={form.getValues("data_nascimento")?.toISOString().split("T")[0] || ""}
                      />
                    </FormControl>
                    <FormMessage className="text-sm md:text-base font-bold" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nivel_id"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Select
                      field={field}
                      label="Selecione o nível do desenvolvedor"
                      form={form}
                      error={errors.nivel_id}
                      data={(levels || []).map((item) => ({
                        value: item.id.toString() || "",
                        label: item.nivel || "",
                      }))}
                      selectText="Selecione o mês referente a sua despesa"
                    />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sexo"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Select
                      field={field}
                      label="Selecione o sexo do desenvolvedor"
                      form={form}
                      error={errors.sexo}
                      data={(gender || []).map((item) => ({
                        value: item.value.toString() || "",
                        label: item.label || "",
                      }))}
                      selectText="Ex: Masculino"
                    />
                  </FormItem>
                )}
              />
              <Button variant={isPending ? "disabled" : "brand"} type="submit">{isPending ? "Carregando..." : "Editar Dev"}</Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
