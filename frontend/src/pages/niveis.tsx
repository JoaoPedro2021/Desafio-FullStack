import { columnsLevels } from "@/components/columns/columnsLevels";
import { FormCreateLevel } from "@/components/forms/level/levelCreateForm";
import { LevelsTable } from "@/components/tables/levelsTable";
import { Button } from "@/components/ui/button";
import { useGetLevelPaginated } from "@/services/levels.service";
import { ArrowLeft, PlusIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

const Niveis = () => {
  const { data } = useGetLevelPaginated();

  return (
    <main className="min-h-screen bg-[#1d1f27] p-4 md:p-8 w-screen">
      <NavLink to="/home">
        <Button variant="default">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Voltar
        </Button>
      </NavLink>
      <div className="container mx-auto mt-3">
        <div className="flex flex-col gap-2 md:flex-row items-center justify-between rounded-md p-2">
          <h1 className="text-3xl font-bold text-white">Níveis</h1>
          <div className="flex flex-row items-center gap-2">
            <FormCreateLevel>
              <Button variant="default">
                <PlusIcon className="w-4 h-4 mr-3 hidden md:block" />
                Adicionar Níveis
              </Button>
            </FormCreateLevel>
          </div>
        </div>
        <LevelsTable levels={data?.data ?? []} columns={columnsLevels} />
      </div>
    </main>
  );
}

export default Niveis;
