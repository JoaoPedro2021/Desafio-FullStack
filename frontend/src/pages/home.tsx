import { columnsDevelopers } from "@/components/columns/columnsDevelopers";
import { FormCreateDeveloper } from "@/components/forms/developer/developerCreateForm";
import { DevelopersTable } from "@/components/tables/developersTable";
import { Button } from "@/components/ui/button";
import { useGetDevelopersPaginated } from "@/services/developers.service";
import { PlusIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

const Home = () => {

  const { data } = useGetDevelopersPaginated();

  return (
    <main className="min-h-screen bg-[#1d1f27] p-4 md:p-8 w-screen">
      <div className="container mx-auto">
        <div className="flex flex-col gap-2 md:flex-row items-center justify-between rounded-md p-2">
          <h1 className="text-3xl font-bold text-white">Desenvolvedores</h1>
          <div className="flex flex-row items-center gap-2">
            <FormCreateDeveloper>
              <Button className="text-xs" variant="default">
                <PlusIcon className="w-4 h-4 mr-3 hidden md:block" />
                Adicionar Desenvolvedor
              </Button>
            </FormCreateDeveloper>
            <NavLink to="/niveis">
              <Button variant="default" className="text-xs">
                <PlusIcon className="w-4 h-4 mr-3 hidden md:block" />
                Ir para Níveis
              </Button>
            </NavLink>
          </div>
        </div>
        <DevelopersTable devs={data?.data ?? []} columns={columnsDevelopers} />
      </div>
    </main>
  )
}

export default Home;
