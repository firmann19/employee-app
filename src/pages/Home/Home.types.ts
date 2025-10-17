import type { Employee } from "../../components/Table/EmployeeTable.types";

export interface HomeState {
  employees: Employee[];
  isModalOpen: boolean;
  loading: boolean;
}
