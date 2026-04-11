const STATUS = {
  completed: { class: "text-bg-success", message: "completed" },
  pending: { class: "text-bg-warning", message: "pending" },
  overdue: { class: "text-bg-danger", message: "overdue" },
  inProgress: { class: "text-bg-primary", message: "in-progress" },
};

export default function getStatus(task) {
  return task.completed ? STATUS.completed
        : !task.dueDate ? STATUS.pending
        : Date.parse(task.dueDate) < Date.now() ? STATUS.overdue
        : STATUS.inProgress;  
}