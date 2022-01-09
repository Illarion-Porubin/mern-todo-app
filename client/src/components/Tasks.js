import { Component } from "react";


import {
    addTask,
    getTasks,
    updateTask,
    updateTasks,
    deleteTask,
    deleteAll
} from "../../src/services/taskServices";


class Tasks extends Component {
    state = { tasks: [], currentTask: "", filter: "all"};

    async componentDidMount() {
        try {
            const { data } = await getTasks();
            this.setState({ tasks: data });
        } catch (error) {
            console.log(error);
        }
    }

    statusPost = (status) => {this.setState({filter: status})}

    filterPost = () => {
        switch (this.state.filter) {
          case "compleated":
            return this.state.tasks.filter(tasks => tasks.done); 
          case "active":
            return this.state.tasks.filter(tasks => !tasks.done);
          default:
            return this.state.tasks;
        }
    }
    
    handleChange = ({ currentTarget: input }) => {
        this.setState({ currentTask: input.value.replace (/ +/g, ' ')});
    };  
    
    handleSubmit = async (e) => {
        e.preventDefault();
        const originalTasks = this.state.tasks;
        if(this.state.currentTask === ' '){
            alert('Заполните поле')
        }
        else{
            try {
                const { data } = await addTask({ task: this.state.currentTask.trim() });
                const tasks = originalTasks;
                tasks.push(data);
                this.setState({ tasks, currentTask: "" });
            } catch (error) {
                console.log(error);
            }
        }   
    };

    handleUpdateInput = async (e) => {
        e.preventDefault();
        if(!this.state.currentTask.length) {
            this.setState({ 
                currentTask: this.props.taskInput     
            })
        } 
        else{
            try {
                await updateTask(this.state.id, {task: this.state.currentTask.trim() });
                this.setState({currentTask: this.state.currentTask.trim() });
            } catch (error) {
                console.log(error);
            }
        } 
    };

    allCompleated = async (e) => {
        e.preventDefault();
        const originalTasks = this.state.tasks;
        try {
            const tasks = [...originalTasks]
            const tasksId = tasks.map(item => item._id);       
            if(tasks.every(item => item.done)){
                tasks.map(item => item.done = !item.done)  
                this.setState({ tasks: originalTasks})
                await updateTasks(tasksId, {
                    done: tasks.every(item => item.done)
                });
            }
            else{
                tasks.map(item => item.done = true)
                this.setState({ tasks: originalTasks })
                await updateTasks(tasksId, {
                    done: true
                });
            }
        } catch (error) {
            this.setState({ tasks: originalTasks });
            console.log(error);
        }
    }

    deleteCompleated = async (e) => {
        e.preventDefault();
        const originalTasks = this.state.tasks;
        try {
            const tasks = originalTasks;
            const tasksDone = tasks.filter((tasks) => tasks.done);
            const tasksId = tasksDone.map(tasks => tasks._id);
            this.setState({tasks: this.state.tasks.filter(item => !item.done)});
            await deleteAll(tasksId); 
        } catch (error) {
            this.setState({ tasks: originalTasks });
            console.log(error);
        }
    };

    handleUpdate = async (currentTask) => {
        const originalTasks = this.state.tasks;
        try {
            const tasks = [...originalTasks];
            const index = tasks.findIndex((task) => task._id === currentTask);
            tasks[index] = { ...tasks[index] };
            tasks[index].done = !tasks[index].done;
            this.setState({ tasks });
            await updateTask(currentTask, {
                done: tasks[index].done,
            });
        } catch (error) {
            this.setState({ tasks: originalTasks });
            console.log(error);
        }
    };

    handleDelete = async (currentTask) => {
        const originalTasks = this.state.tasks;
        try {
            const tasks = originalTasks.filter(
                (task) => task._id !== currentTask
            );
            this.setState({ tasks });
            await deleteTask(currentTask);
        } catch (error) {
            this.setState({ tasks: originalTasks });
            console.log(error);
        }
    };
}

export default Tasks;
