import React, { useEffect, useState } from 'react';
import Typewriter from '../components/Typewriter'
import TaskService from '../services/TaskService';
import AuthService from '../services/AuthService';
import { Worker } from '../types/Worker';
import { Task } from '../types/Task';
import { SubTask } from '../types/SubTask';
import SubTaskService from '../services/SubTaskService';

export function DashboardPage(): React.ReactElement {

  const [username, setUsername] = useState("");
  const [taskCount, setTaskCount] = useState<number | null>(null);
  const [user, setUser] = useState<Worker | null>();
  const [error, setError] = useState<string | null>(null);
  const [tasks, setTasks] = useState<SubTask[]>([]);

  useEffect(() => {
    setUsername(sessionStorage.getItem("name") as string);

    setUser(JSON.parse(sessionStorage.getItem('user') as string));


    SubTaskService.getSubtasks(sessionStorage.getItem("userId"))
      .then((resolve) => {
        setTaskCount(resolve.length);
        if (resolve.length > 0)
          setTasks(resolve);
        else
          setTasks([])
      })

      .catch(reject => {
        setError(reject.message);
      })
  }, [username])


  const handleLogout = (e) => {

  }


  return (<>

    <div className="container-fluid">

      <div className="d-flex flex-column align-items-center 
        justify-content-center min-vh-100 p-2 gap-4">


        <div className="d-flex flex-column align-items-center flex-grow-1 justify-content-center">
          <div>&nbsp;<Typewriter
            texts={['Welcome', 'Bonjour', 'Selamat Datang', 'Punten', 'いらっしゃいませ', '歡迎']}
            typingSpeed={100}
            delayBetweenTexts={2000}
          /></div>
          <h1 className='text-primary fw-bold'>{username}</h1>

        </div>


        <div className="d-flex flex-column flex-grow-1 gap-4">

          <div className="list-group w-100">



            <div className="list-group-item w-100" aria-current="true">
              <div className="d-flex w-100 justify-content-between gap-4">
                <h5 className="mb-1">Assigned Tasks</h5>
                <small className="px-2 py-1 rounded-pill bg-primary">{taskCount}</small>
              </div>
              <div className="mb-1">
                <div className="">Recent Task: {(tasks.length == 0) ? "Empty" : (tasks[0]?.title)} </div>
              </div>
              <div className="mb-1 d-flex">



              </div>
            </div>

          </div>

          <div className="d-flex gap-2">
            <a href="app"
              role="button" className="btn btn-outline-primary 
                  d-flex flex-column justify-content-center 
                  align-items-center p-1 w-100" onClick={handleLogout}>

              <span className="material-symbols-outlined w-100" style={{ fontSize: '2rem' }}>
                rocket
              </span>
              <h4 className="fs-6">Launch</h4>
            </a>

            <button className="btn btn-outline-danger 
                  d-flex flex-column justify-content-center 
                  align-items-center p-1 w-100" onClick={handleLogout}>

              <span className="material-symbols-outlined w-100" style={{ fontSize: '2rem' }}>
                logout
              </span>
              <h4 className="fs-6">Log Out</h4>
            </button>

          </div>
        </div>

      </div>
    </div >


  </>)
}
