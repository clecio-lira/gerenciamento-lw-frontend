import { ICleanStore } from "@/models/Clean";
import { apiRequest } from "@/utils/api";
import Cookies from "js-cookie";
import { toast } from "sonner";

export async function CreateClean(data: ICleanStore) {
  const token = Cookies.get("nextauth.token");

  try {
    const res = await apiRequest("/cleaning", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    return res;
  } catch (error) {
    toast.error("Erro ao criar a limpeza.");
  }
}

export async function FindAllCleaning(
  page?: number,
  limit?: number,
  sort?: string,
  search?: string
) {
  const token = Cookies.get("nextauth.token");
  try {
    const queryParams = new URLSearchParams();

    if (page !== undefined) queryParams.append("page", page.toString());
    if (limit !== undefined) queryParams.append("limit", limit.toString());
    if (sort) queryParams.append("sort", sort);
    if (search) queryParams.append("search", search);

    const url =
      queryParams.toString().length > 0
        ? `/cleaning?${queryParams.toString()}`
        : "/cleaning";

    const res = await apiRequest(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res;
  } catch (error) {
    toast.error("Erro ao buscar as limpezas.");
  }
}

export async function FindOneClean(id: number) {
  const token = Cookies.get("nextauth.token");
  try {
    const res = await apiRequest(`/cleaning/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res;
  } catch (error) {
    toast.error("Erro ao buscar a limpeza.");
  }
}

export async function UpdateClean(id: number, data: ICleanStore) {
  const token = Cookies.get("nextauth.token");

  try {
    const res = await apiRequest(`/cleaning/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    return res;
  } catch (error) {
    toast.error("Erro ao atualizar a limpeza.");
  }
}

export async function RemoveClean(id: number) {
  const token = Cookies.get("nextauth.token");
  try {
    await apiRequest(`/cleaning/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    toast.error("Erro ao remover a limpeza.");
  }
}
