import React, { useEffect, useState } from "react";
import EmployeeTable from "../../components/Table/EmployeeTable";
import EmployeeModal from "../../components/Modal/EmployeeModal";
import Button from "../../components/Button/Button";
import { getEmployees } from "../../api/EmployeeApi/EmployeeApi";
import type { HomeState } from "./Home.types";
import { toast } from "react-toastify";

const Home: React.FC = () => {
  const [state, setState] = useState<HomeState>({
    employees: [],
    isModalOpen: false,
    loading: false,
  });

  const fetchEmployees = async () => {
    try {
      setState((prev) => ({ ...prev, loading: true }));
      const data = await getEmployees();
      setState((prev) => ({ ...prev, employees: data }));
    } catch (error) {
      console.error("Failed to fetch employees:", error);
      toast.error("Failed to fetch employees. Please try again later.");
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const openModal = () => setState((prev) => ({ ...prev, isModalOpen: true }));
  const closeModal = () =>
    setState((prev) => ({ ...prev, isModalOpen: false }));

  const handleEmployeeCreated = () => {
    fetchEmployees();
    closeModal();
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Employee Management
          </h1>
          <p className="text-sm text-gray-500">
            Manage and monitor all employees efficiently.
          </p>
        </div>

        <Button onClick={openModal} className="w-full sm:w-auto">
          + Add New Employee
        </Button>
      </header>

      <section>
        {state.loading ? (
          <p className="text-gray-500 text-center py-10 animate-pulse">
            Loading employees...
          </p>
        ) : (
          <EmployeeTable employees={state.employees} />
        )}
      </section>

      <EmployeeModal
        isOpen={state.isModalOpen}
        onClose={closeModal}
        onEmployeeCreated={handleEmployeeCreated}
      />
    </main>
  );
};

export default Home;
