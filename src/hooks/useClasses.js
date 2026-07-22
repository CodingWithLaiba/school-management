import { useLocalStorage } from './useLocalStorage';

const seedClasses = [
  { id: 1, name: '9th', section: 'A', teacher: 'Mr. Ahmed' },
  { id: 2, name: '10th', section: 'B', teacher: 'Ms. Sara' },
];

export function useClasses() {
  const [classes, setClasses] = useLocalStorage('classes', seedClasses);

  const addClass = (classItem) => {
    const newClass = { ...classItem, id: Date.now() };
    setClasses((prev) => [...prev, newClass]);
  };

  const updateClass = (id, updatedData) => {
    setClasses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updatedData } : c))
    );
  };

  const deleteClass = (id) => {
    setClasses((prev) => prev.filter((c) => c.id !== id));
  };

  return { classes, addClass, updateClass, deleteClass };
}