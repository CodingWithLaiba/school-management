import { useState, useEffect } from 'react';

const initialForm = { name: '', section: '', teacher: '' };

export default function ClassForm({ onSubmit, editingClass }) {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(editingClass || initialForm);
  }, [editingClass]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Class name is required';
    if (!formData.section.trim()) errs.section = 'Section is required';
    if (!formData.teacher.trim()) errs.teacher = 'Teacher name is required';
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
        <label className="block text-sm font-medium mb-1 dark:text-gray-200">Class Name</label>
        <input name="name" value={formData.name} onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white" />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 dark:text-gray-200">Section</label>
        <input name="section" value={formData.section} onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white" />
        {errors.section && <p className="text-red-500 text-sm">{errors.section}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 dark:text-gray-200">Class Teacher</label>
        <input name="teacher" value={formData.teacher} onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white" />
        {errors.teacher && <p className="text-red-500 text-sm">{errors.teacher}</p>}
      </div>

      <button type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg">
        {editingClass ? 'Update Class' : 'Add Class'}
      </button>
    </form>
  );
}