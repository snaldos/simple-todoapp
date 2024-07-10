"use client";

import { ITask } from "@/types/tasks";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";
import { deleteTodo, editTodo } from "@/api";

interface taskProps {
  task: ITask;
}

export default function Task({ task }: taskProps) {
  const router = useRouter();
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({ id: task.id, text: taskToEdit });
    setEditModalOpen(false);
    router.refresh();
  };

  const handleDeleteTodo = async (id: string) => {
    await deleteTodo(id);
    setDeleteModalOpen(false);
    router.refresh();
  };

  return (
    <tr key={task.id}>
      <td className="w-full">{task.text}</td>
      <td className="flex gap-5">
        <FiEdit
          onClick={() => setEditModalOpen(true)}
          cursor="pointer"
          className="text-blue-500 dark:text-blue-700"
          size={20}
        />
        <Modal modalOpen={editModalOpen} setModalOpen={setEditModalOpen}>
          <form onSubmit={handleSubmitEditTodo}>
            <h3 className="font-bold text-lg">Edit task</h3>
            <div className="modal-action">
              <input
                value={taskToEdit}
                onChange={(e) => setTaskToEdit(e.target.value)}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
              <button type="submit" className="btn">
                Submit
              </button>
            </div>
          </form>
        </Modal>
        <FiTrash2
          onClick={() => setDeleteModalOpen(true)}
          cursor="pointer"
          className="text-red-500 dark:text-red-700"
          size={20}
        />
        <Modal modalOpen={deleteModalOpen} setModalOpen={setDeleteModalOpen}>
          <h3 className="text-lg">Are you sure, you want to delete this task?</h3>
          <div className="modal-action">
            <button onClick={() => handleDeleteTodo(task.id)} className="btn">
              Yes
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
}
