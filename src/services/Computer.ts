import { IComputerStore } from "@/models/Computer";
import { apiRequest } from "@/utils/api";
import Cookies from "js-cookie";
import { toast } from "sonner";

export async function CreateComputer(data: IComputerStore) {
  const token = Cookies.get("nextauth.token");

  try {
    const res = await apiRequest("/computers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    return res;
  } catch (error) {
    toast.error("Erro ao criar o computador.");
  }
}

export async function FindAllComputers(
  page?: number,
  limit?: number,
  sort: string = "createdAt,desc",
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
        ? `/computers?${queryParams.toString()}`
        : "/computers";

    const res = await apiRequest(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res;
  } catch (error) {
    toast.error("Erro ao buscar os computadores.");
  }
}

export async function FindOneComputer(id: number) {
  const token = Cookies.get("nextauth.token");
  try {
    const res = await apiRequest(`/computers/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res;
  } catch (error) {
    toast.error("Erro ao buscar o computador.");
  }
}

export async function UpdateComputer(id: number, data: IComputerStore) {
  const token = Cookies.get("nextauth.token");

  try {
    const res = await apiRequest(`/computers/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    return res;
  } catch (error) {
    toast.error("Erro ao atualizar o computador.");
  }
}

export async function RemoveComputer(id: number) {
  const token = Cookies.get("nextauth.token");
  try {
    await apiRequest(`/computers/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    toast.error("Erro ao remover computador.");
  }
}
