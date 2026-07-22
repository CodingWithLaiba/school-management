import { useLocalStorage } from './useLocalStorage';

const seedData = [
  {
    id: 1,
    name: 'Ali Raza',
    rollNumber: 'S-101',
    className: '10th',
    gender: 'Male',
    dob: '2009-05-14',
    phone: '03001234567',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Ayesha Khan',
    rollNumber: 'S-102',
    className: '9th',
    gender: 'Female',
    dob: '2010-02-20',
    phone: '03007654321',
    status: 'Inactive',
  },
];

export function useStudents() {
  const [students, setStudents] = useLocalStorage('students', seedData);

  const addStudent = (student) => {
    const newStudent = { ...student, id: Date.now() };
    setStudents((prev) => [...prev, newStudent]);
  };

  const updateStudent = (id, updatedData) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updatedData } : s))
    );
  };

  const deleteStudent = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  return { students, addStudent, updateStudent, deleteStudent };
}