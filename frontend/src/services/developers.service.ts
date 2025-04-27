import { url } from "@/lib/utils";
import { FormDeveloperSchemaProps } from "@/schemas/developer";
import { Developer, Page } from "@/types/type";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const base = "desenvolvedores";

export const useGetDevelopersPaginated = () =>
  useQuery({
    queryKey: ["developers.useGetDevelopersPaginated"],
    queryFn: async (): Promise<Page<Developer>> => {
       const { data } = await axios.get<Page<Developer>>(`${url}${base}/paginado`);
      return data;
    },
  });

export const createDeveloper = async (developer: FormDeveloperSchemaProps) => {
  const { data } = await axios.post<Developer>(`${url}${base}`, developer);
  return data;
}

export const deleteDeveloper = async (id: number) => {
  const { data } = await axios.delete<Developer>(`${url}${base}/${id}`);
  return data;
}

export const updateDeveloper = async (developer: FormDeveloperSchemaProps, id: number) => {
  const { data } = await axios.put<Developer>(`${url}${base}/${id}`, developer);
  return data;
}
