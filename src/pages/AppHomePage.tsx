import React, { ReactElement, useEffect, useState } from "react";
import SubTaskService from "../services/SubTaskService";
import { SubTask } from "../types/SubTask";
import { convertUnixToDate } from "../utils/dateUtils";

export function AppHomePage(): ReactElement {
  const [countTasks, setCountTasks] = useState(0);
  const [countDue, setCountDue] = useState(0);
  const [dueTasks, setDueTasks] = useState<SubTask[]>([]);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const userId = sessionStorage.getItem('userId') as string
    SubTaskService.getSubtasks(userId)
      .then((value) => {
        setCountTasks(value.length);
      })
      .catch(reject => { setError(reject.message) });

    SubTaskService.getSubtasksBeforeDue(userId, 14)
      .then((resolve) => {
        setCountDue(resolve.length);
        setDueTasks(resolve);
      })
      .catch(reject => { setError(reject.message) });
  }, [])




  return (<>
    <div className="container d-flex flex-column gap-4">

      <div className="card card-body align-items-center justify-content-around text-center p-2 hstack">

        <div className="d-flex flex-column align-items-center text-center gap-2">
          <div className="display-1">{countTasks}</div>
          <small className="">Tasks</small>
        </div>

        <div className="vr"></div>

        {(dueTasks.length > 0) &&
          <a type="button" className={`d-flex flex-column align-items-center text-center gap-2 text-danger`}
            href="#collapseTasks" role="button" aria-expanded="false" data-bs-toggle="collapse" aria-controls="collapseTasks"
          >
            <div className="display-1">{countDue}</div>
            <small className="">Due in 2 week</small>
          </a>

        }
        {(dueTasks.length == 0) &&
          <div className={`d-flex flex-column align-items-center text-center gap-2 ${(countDue > 0) ? 'text-danger' : ''}`}>
            <div className="display-1">{countDue}</div>
            <small className="">Due in 2 week</small>
          </div>

        }

      </div>

      {(dueTasks.length > 0) &&
        <div className="collapse" id="collapseTasks">
          <div className="card card-body">
            <ul className="list-group">

              {dueTasks.map((value, index) => (
                <li key={index} className="list-group-item bg-body-secondary">{value.title} | {convertUnixToDate(value.dueDate).toDateString()}</li>
              ))}

            </ul>
          </div>
        </div>
      }


    </div >
  </>
  );
}
