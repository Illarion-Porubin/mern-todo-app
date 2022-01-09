import React, { Component } from "react";
import TaskItem from "../taskItem/taskItem"


import './taskinput.css'

class TaskInput extends Component {
    render() {
        const {
            id, 
            tasks,
            handleChange, 
            handleSubmit, 
            allCompleated, 
            handleUpdate, 
            handleDelete,
            currentTask 
        } = this.props;
             
        let classArrow, classCheck;

        if(tasks.length){
            classArrow = "to-do__list-btn-arrow to-do__list-btn-arrow-active";
            classCheck = "to-do__list-btn to-do__list-btn-active";
        } else{
            classArrow = "to-do__list-btn-arrow";
            classCheck = "to-do__list-btn";
        }  

        if(tasks.every(item => item.done)) {classArrow += " to-do__fading"}

        return (
            <div className="App flex">
                <form 
                    className="add" 
                    onSubmit={handleSubmit}> 
                <input 
                    className={classCheck}
                    onClick={allCompleated} 
                    type="checkbox">    
                </input>
                    <img 
                    className={classArrow}
                    src="/img/arrow.svg"                 
                    alt="arrow"
                />             
                <input 
                    className="to-do__task"
                    type="text" 
                    id={id}
                    required={true}
                    value={currentTask} 
                    onChange={handleChange} 
                    placeholder="What needs to be done?">                   
                </input>        
                </form>
                    <ul >
                        {tasks.map((task) => (
                            <TaskItem 
                                task={task}
                                key={task._id}
                                id={task._id}
                                taskInput={task.task}
                                handleUpdate={() => handleUpdate(task._id)}                           
                                handleDelete={() => handleDelete(task._id)}
                            />
                        ))}
                    </ul>              
            </div> 
        );
    }
}




export default TaskInput;

