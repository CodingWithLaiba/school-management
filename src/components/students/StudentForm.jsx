import { useState, useEffect } from "react";

const initialForm = {
  name: "",
  rollNumber: "",
  className: "",
  gender: "Male",
  dob: "",
  phone: "",
  status: "Active",
};

export default function StudentForm({ onSubmit, editingStudent, classes }) {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(editingStudent || initialForm);
  }, [editingStudent]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.rollNumber.trim())
      errs.rollNumber = "Roll number is required";
    if (!formData.className) errs.className = "Class is required";
    if (!formData.dob) errs.dob = "Date of birth is required";
    if (!/^\d{10,11}$/.test(formData.phone))
      errs.phone = "Enter a valid phone number";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1 dark:text-gray-200">
          Name
        </label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 dark:text-gray-200">
          Roll Number
        </label>
        <input
          name="rollNumber"
          value={formData.rollNumber}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white"
        />
        {errors.rollNumber && (
          <p className="text-red-500 text-sm">{errors.rollNumber}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 dark:text-gray-200">
          Class
        </label>
        <select
          name="className"
          value={formData.className}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white"
        >
          <option value="">Select class</option>
          {classes.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
        {errors.className && (
          <p className="text-red-500 text-sm">{errors.className}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 dark:text-gray-200">
          Gender
        </label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 dark:text-gray-200">
          Date of Birth
        </label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white"
        />
        {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 dark:text-gray-200">
          Phone Number
        </label>
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white"
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 dark:text-gray-200">
          Status
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg"
      >
        {editingStudent ? "Update Student" : "Add Student"}
      </button>
    </form>
  );
}
