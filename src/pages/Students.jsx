import { useState, useMemo } from 'react';
import { useStudents } from '../hooks/useStudents';
import { useClasses } from '../hooks/useClasses';
import StudentForm from '../components/students/StudentForm';
import Modal from '../components/common/Modal';
import ConfirmDialog from '../components/common/ConfirmDialog';
import toast from 'react-hot-toast';

const PAGE_SIZE = 5;

export default function Students() {
  const { students, addStudent, updateStudent, deleteStudent } = useStudents();
  const { classes } = useClasses();

  const [search, setSearch] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [viewingStudent, setViewingStudent] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchesSearch =
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.rollNumber.toLowerCase().includes(search.toLowerCase());
      const matchesClass = classFilter ? s.className === classFilter : true;
      const matchesStatus = statusFilter ? s.status === statusFilter : true;
      return matchesSearch && matchesClass && matchesStatus;
    });
  }, [students, search, classFilter, statusFilter]);

  const totalPages = Math.ceil(filteredStudents.length / PAGE_SIZE) || 1;
  const paginatedStudents = filteredStudents.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const openAddForm = () => {
    setEditingStudent(null);
    setIsFormOpen(true);
  };

  const openEditForm = (student) => {
    setEditingStudent(student);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (data) => {
    if (editingStudent) {
      updateStudent(editingStudent.id, data);
      toast.success('Student updated');
    } else {
      addStudent(data);
      toast.success('Student added');
    }
    setIsFormOpen(false);
  };

  const confirmDelete = () => {
    deleteStudent(deletingId);
    toast.success('Student deleted');
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold dark:text-white">Students</h1>
        <button onClick={openAddForm}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          + Add Student
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          placeholder="Search by name or roll number..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="border rounded-lg px-3 py-2 flex-1 dark:bg-gray-700 dark:text-white"
        />
        <select value={classFilter}
          onChange={(e) => { setClassFilter(e.target.value); setPage(1); }}
          className="border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white">
          <option value="">All Classes</option>
          {classes.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
        </select>
        <select value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          className="border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white">
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b dark:border-gray-700 dark:text-gray-300">
              <th className="p-3">Name</th>
              <th className="p-3">Roll No.</th>
              <th className="p-3">Class</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedStudents.length === 0 ? (
              <tr><td colSpan="5" className="p-4 text-center text-gray-400">No students found</td></tr>
            ) : (
              paginatedStudents.map((s) => (
                <tr key={s.id} className="border-b dark:border-gray-700 dark:text-gray-200">
                  <td className="p-3">{s.name}</td>
                  <td className="p-3">{s.rollNumber}</td>
                  <td className="p-3">{s.className}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      s.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="p-3 space-x-2">
                    <button onClick={() => setViewingStudent(s)} className="text-blue-600">View</button>
                    <button onClick={() => openEditForm(s)} className="text-yellow-600">Edit</button>
                    <button onClick={() => setDeletingId(s.id)} className="text-red-600">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button key={p} onClick={() => setPage(p)}
            className={`px-3 py-1 rounded-lg ${
              page === p ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-white'
            }`}>
            {p}
          </button>
        ))}
      </div>

      <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)}
        title={editingStudent ? 'Edit Student' : 'Add Student'}>
        <StudentForm onSubmit={handleFormSubmit} editingStudent={editingStudent} classes={classes} />
      </Modal>

      <Modal isOpen={!!viewingStudent} onClose={() => setViewingStudent(null)} title="Student Details">
        {viewingStudent && (
          <div className="space-y-2 dark:text-gray-200">
            <p><b>Name:</b> {viewingStudent.name}</p>
            <p><b>Roll Number:</b> {viewingStudent.rollNumber}</p>
            <p><b>Class:</b> {viewingStudent.className}</p>
            <p><b>Gender:</b> {viewingStudent.gender}</p>
            <p><b>Date of Birth:</b> {viewingStudent.dob}</p>
            <p><b>Phone:</b> {viewingStudent.phone}</p>
            <p><b>Status:</b> {viewingStudent.status}</p>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this student?"
      />
    </div>
  );
}