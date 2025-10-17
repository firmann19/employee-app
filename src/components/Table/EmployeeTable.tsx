import React, { useState } from "react";
import type { EmployeeTableProps } from "./EmployeeTable.types";
import Pagination from "../Pagination/Pagination";

const ITEMS_PER_PAGE = 5;

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentEmployees = employees.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-gray-200 shadow-md bg-white">
      <table className="min-w-full text-sm text-left text-gray-700">
        <thead className="bg-indigo-100 text-indigo-700 uppercase text-xs font-semibold tracking-wider">
          <tr>
            <th className="px-4 py-3">Photo</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Gender</th>
            <th className="px-4 py-3">Age</th>
            <th className="px-4 py-3">Hobby</th>
            <th className="px-4 py-3">Department</th>
          </tr>
        </thead>

        <tbody>
          {currentEmployees.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="py-6 text-center text-gray-400 font-medium"
              >
                No employees found.
              </td>
            </tr>
          ) : (
            currentEmployees.map((emp, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 hover:bg-indigo-50 transition-colors duration-200"
              >
                <td className="px-4 py-3">
                  <img
                    src={emp.photo || `https://i.pravatar.cc/40?u=${emp.name}`}
                    alt={emp.name}
                    className="w-12 h-12 rounded-full object-cover mx-auto md:mx-0"
                  />
                </td>

                <td className="px-4 py-3 font-medium text-gray-900 break-words">
                  {emp.name}
                </td>

                <td className="px-4 py-3 capitalize">{emp.gender}</td>

                <td className="px-4 py-3">{emp.age}</td>

                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    {emp.hobby?.split(",").map((hobby, i) => (
                      <span
                        key={i}
                        className="bg-indigo-50 text-indigo-700 text-xs font-medium px-3 py-1 rounded-full border border-indigo-100 shadow-sm"
                      >
                        {hobby.trim()}
                      </span>
                    ))}
                  </div>
                </td>

                <td className="px-4 py-3 text-gray-800 capitalize">
                  {emp.department}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="flex justify-center md:justify-end px-4 py-4 bg-gray-50 border-t border-gray-200">
        <Pagination
          currentPage={currentPage}
          totalItems={employees.length}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default EmployeeTable;
