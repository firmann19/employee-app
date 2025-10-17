import type { Employee } from "./EmployeeApi.types";
import { toast } from "react-toastify";

const SIGNATURE = "fairatmos-firman-ramadhan";
const API_BASE = "https://api.fairatmos.dev/api/v1/trial-test/frontend";

export const createEmployee = async (employee: Employee) => {
  try {
    const response = await fetch(API_BASE, {
      method: "POST",
      headers: {
        Signature: SIGNATURE,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    });

    if (response.status === 201) {
      return await response.json();
    } else {
      const errorData = await response.json().catch(() => null);
      const message =
        errorData?.message ||
        (response.status === 401
          ? "Unauthorized: Invalid Signature"
          : `Error status: ${response.status}`);
      throw new Error(message);
    }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";
    toast.error(errorMessage);
    throw error;
  }
};

export const getEmployees = async (): Promise<Employee[]> => {
  try {
    const response = await fetch(API_BASE, {
      method: "GET",
      headers: {
        Signature: SIGNATURE,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      return data.data || [];
    } else if (response.status === 204) {
      return [];
    } else {
      const errorData = await response.json().catch(() => null);
      const message =
        errorData?.message ||
        (response.status === 401
          ? "Unauthorized: Invalid Signature"
          : `Error status: ${response.status}`);
      throw new Error(message);
    }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch employees";
    toast.error(errorMessage);
    throw error;
  }
};
