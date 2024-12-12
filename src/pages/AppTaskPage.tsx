import { ReactElement, useEffect, useState } from "react";
import { SubTask } from "../types/SubTask";
import SubTaskService from "../services/SubTaskService";
import { convertUnixToDate } from "../utils/dateUtils";
import { Task } from "../types/Task";
import TaskService from "../services/TaskService";

const status = {
  0: "Not Started",
  1: "Progress",
  2: "Completed"
}

const statusStyle = {
  0: "secondary",
  1: "primary",
  2: "success"
}


export function AppTaskPage(): ReactElement {
  const [tasks, setTasks] = useState<SubTask[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [dueTasks, setDueTasks] = useState<SubTask[]>([]);
  const [parentTask, setParentTask] = useState<Task[]>([]);

  const [formStatus, setFormStatus] = useState<number>(0);

  useEffect(() => {


    const userId = sessionStorage.getItem('userId') as string;
    SubTaskService.getSubtasks(userId)
      .then((resolve) => {
        setTasks(resolve);
      })
      .catch(reject => { setError(reject?.message) });
    SubTaskService.getSubtasksBeforeDue(userId, 14)
      .then((resolve) => {
        setDueTasks(resolve);
      })
      .catch(reject => { setError(reject.message) });


  }, []);

  const getTask = (subtaskId: string) => {
    TaskService.getTaskBySubtask(subtaskId)
      .then(value => {
        return value
      }).catch(reject => { setError(reject?.message) })
  }


  const handleStatus = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    console.log(target.getAttribute('data-id'), target.getAttribute('data-value'))
    const index = Number.parseInt(target.getAttribute('data-id') as string)
    const value = target.getAttribute('data-value');
    switch (tasks[index].status) {
      case 0:
        tasks[index].status = 1;
        break;
      case 1:
        tasks[index].status = 2;
        break;
      case 2:
        tasks[index].status = 0;
        break;
    }
    SubTaskService.updateSubtaskStatus(tasks[index].id, tasks[index].status)
      .then((value) => {
        setFormStatus(value.status);
      })
      .catch(reject => setError(reject?.message))
  }

  if (error)
    return (<>

      <div className="container d-flex flex-column gap-4">
        <div className="card card-body bg-danger">{error}</div>
      </div>
    </>)


  return (
    <>

      <div className="container d-flex flex-column gap-4">
        <div className="list-group">

          {
            tasks.map((x, index) => (
              <div className="list-group-item p-2" aria-current="true" key={index}>
                <div className="d-flex flex-column justify-content-between align-items-start">
                  <h5 className="mb-1 text-truncate" style={{ width: '12rem' }}>{x.title}</h5>
                  <p className="mb-4 text-truncate" style={{ width: "12rem" }}>{x.description}</p>

                </div>


                <div className="d-flex flex-row w-100 justify-content-between align-items-start gap-2 mb-4">

                  <small className={`
${(dueTasks.includes(x)) ? 'text-danger' : ''} fw-bold`}>
                    {convertUnixToDate(x.dueDate).toLocaleDateString()}
                  </small>
                </div>

              </div>

            ))
          }


        </div>
      </div>
    </>
  )
}
