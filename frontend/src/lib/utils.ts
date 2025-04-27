import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const url = import.meta.env.VITE_API_URL;

export  const formatDate = (dateString: string) => {
  const data = new Date(dateString);
  const dia = data?.getUTCDate()?.toString()?.padStart(2, "0");
  const mes = (data?.getUTCMonth() + 1)?.toString()?.padStart(2, "0");
  const ano = data?.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

export const gender = [
  {
    value: "M",
    label: "Masculino",
  },
  {
    value: "F",
    label: "Feminino",
  },
  {
    value: "O",
    label: "Outros",
  }
]
