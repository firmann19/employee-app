import React, { useState } from "react";
import type { KeyboardEvent } from "react";
import type {
  EmployeeModalProps,
  EmployeeFormData,
} from "./EmployeeModal.types";
import {
  validateRequiredString,
  validateAge,
  validateHobby,
} from "../../utils/Validation/Validation";
import { createEmployee } from "../../api/EmployeeApi/EmployeeApi";
import { toast } from "react-toastify";

const initialFormState: EmployeeFormData = {
  name: "",
  gender: "",
  age: "",
  hobby: "",
  department: "",
};

const departmentOptions = [
  "IT Development",
  "Human Resources",
  "Marketing",
  "Finance",
  "Sales",
  "Customer Support",
  "Design",
  "Operations",
];

const EmployeeModal: React.FC<EmployeeModalProps> = ({
  isOpen,
  onClose,
  onEmployeeCreated,
}) => {
  const [formData, setFormData] = useState<EmployeeFormData>(initialFormState);
  const [hobbyList, setHobbyList] = useState<string[]>([]);
  const [hobbyInput, setHobbyInput] = useState("");
  const [errors, setErrors] = useState<
    Partial<Record<keyof EmployeeFormData, string>>
  >({});
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (
    field: keyof EmployeeFormData,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleHobbyKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || !hobbyInput.trim()) return;
    e.preventDefault();

    if (hobbyList.length >= 5) {
      setErrors((prev) => ({ ...prev, hobby: "Maximum 5 hobbies allowed" }));
      return;
    }

    if (!hobbyList.includes(hobbyInput.trim())) {
      const updated = [...hobbyList, hobbyInput.trim()];
      setHobbyList(updated);
      setFormData((prev) => ({ ...prev, hobby: updated.join(",") }));
      setHobbyInput("");
    }
  };

  const removeHobby = (hobby: string) => {
    const updated = hobbyList.filter((h) => h !== hobby);
    setHobbyList(updated);
    setFormData((prev) => ({ ...prev, hobby: updated.join(",") }));
  };

  const handleSubmit = async () => {
    const newErrors: Partial<Record<keyof EmployeeFormData, string>> = {};

    const validations = {
      name: validateRequiredString(formData.name, "Name"),
      gender: validateRequiredString(formData.gender, "Gender"),
      age: validateAge(Number(formData.age)),
      hobby: validateHobby(formData.hobby),
      department: validateRequiredString(formData.department, "Department"),
    };

    for (const key in validations) {
      const k = key as keyof EmployeeFormData;
      if (!validations[k].isValid) newErrors[k] = validations[k].message;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      await createEmployee({
        name: formData.name,
        gender: formData.gender,
        age: Number(formData.age),
        hobby: formData.hobby,
        department: formData.department,
      });

      toast.success("Employee created successfully!");

      setFormData(initialFormState);
      setHobbyList([]);
      setHobbyInput("");
      onEmployeeCreated();
      onClose();
    } catch (error) {
      console.error("Failed to create employee:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Add New Employee
        </h2>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Example: Kira Takada"
              className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Gender</label>
            <div className="flex gap-6 mt-1">
              {["male", "female"].map((g) => (
                <label key={g} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={formData.gender === g}
                    onChange={(e) => handleChange("gender", e.target.value)}
                  />
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </label>
              ))}
            </div>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Age (Years)
            </label>
            <input
              type="number"
              placeholder="Example: 32"
              className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.age}
              onChange={(e) => handleChange("age", e.target.value)}
            />
            {errors.age && (
              <p className="text-red-500 text-sm mt-1">{errors.age}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Hobby</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {hobbyList.map((hobby) => (
                <span
                  key={hobby}
                  className="flex items-center gap-2 bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm"
                >
                  {hobby}
                  <button
                    type="button"
                    onClick={() => removeHobby(hobby)}
                    className="text-indigo-600 hover:text-red-600"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              placeholder="Type interest and press Enter..."
              className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={hobbyInput}
              onChange={(e) => setHobbyInput(e.target.value)}
              onKeyDown={handleHobbyKeyDown}
            />
            {errors.hobby && (
              <p className="text-red-500 text-sm mt-1">{errors.hobby}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Department</label>
            <select
              className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.department}
              onChange={(e) => handleChange("department", e.target.value)}
            >
              <option value="">-- Select Department --</option>
              {departmentOptions.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            {errors.department && (
              <p className="text-red-500 text-sm mt-1">{errors.department}</p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeModal;
