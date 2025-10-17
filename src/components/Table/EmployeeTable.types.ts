export interface Employee {
  name: string;
  gender: string;
  age: number;
  hobby: string;
  department: string;
  photo?: string;
}

export interface EmployeeTableProps {
  employees: Employee[];
  onRefresh?: () => void;
}
