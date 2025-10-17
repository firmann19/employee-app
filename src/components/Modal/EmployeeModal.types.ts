export interface EmployeeFormData {
  name: string;
  gender: string;
  age: number | "";
  hobby: string;
  department: string;
}

export interface EmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEmployeeCreated: () => void;
}
