import { useState } from 'react';
import { useClasses } from '../hooks/useClasses';
import ClassForm from '../components/classess/ClassForm';
import Modal from '../components/common/Modal';
import ConfirmDialog from '../components/common/ConfirmDialog';
import toast from 'react-hot-toast';

export default function Classes() {
  const { classes, addClass, updateClass, deleteClass } = useClasses();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const handleSubmit = (data) => {
    if (editingClass) {
      updateClass(editingClass.id, data);
      toast.success('Class updated');
    } else {
      addClass(data);
      toast.success('Class added');
    }
    setIsFormOpen(false);
  };

  const confirmDelete = () => {
    deleteClass(deletingId);
    toast.success('Class deleted');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold dark:text-white">Classes</h1>
        <button
          onClick={() => { setEditingClass(null); setIsFormOpen(true); }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          + Add Class
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {classes.map((c) => (
          <div key={c.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
            <h3 className="font-semibold text-lg dark:text-white">{c.name} - {c.section}</h3>
            <p className="text-gray-500 dark:text-gray-400">Teacher: {c.teacher}</p>
            <div className="mt-3 space-x-3">
              <button onClick={() => { setEditingClass(c); setIsFormOpen(true); }} className="text-yellow-600">
                Edit
              </button>
              <button onClick={() => setDeletingId(c.id)} className="text-red-600">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingClass ? 'Edit Class' : 'Add Class'}
      >
        <ClassForm onSubmit={handleSubmit} editingClass={editingClass} />
      </Modal>

      <ConfirmDialog
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this class?"
      />
    </div>
  );
}