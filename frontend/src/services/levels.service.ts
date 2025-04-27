import { url } from "@/lib/utils";
import { FormLevelSchemaProps } from "@/schemas/level";
import { Nivel, Page } from "@/types/type";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const base = "niveis";

export const useGetLevels = () =>
  useQuery({
    queryKey: ["levels.useGetLevels"],
    queryFn: async (): Promise<Nivel[]> => {
       const { data } = await axios.get<Nivel[]>(`${url}${base}`)
      return data;
    },
  });

  export const useGetLevelPaginated = () =>
    useQuery({
      queryKey: ["levels.useGetLevelPaginated"],
      queryFn: async (): Promise<Page<Nivel>> => {
         const { data } = await axios.get<Page<Nivel>>(`${url}${base}/paginado`);
        return data;
      },
    });

export const createLevel = async (level: FormLevelSchemaProps) => {
  const { data } = await axios.post<Nivel>(`${url}${base}`, level);
  return data;
}

export const deleteLevel = async (id: number) => {
  const { data } = await axios.delete<Nivel>(`${url}${base}/${id}`);
  return data;
}

export const updateLevel = async (level: FormLevelSchemaProps, id: number) => {
  const { data } = await axios.put<Nivel>(`${url}${base}/${id}`, level);
  return data;
}
