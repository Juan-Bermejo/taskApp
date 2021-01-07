import React, { Component } from 'react';


class App extends Component {

    constructor(){
        super();

        this.state = {
            title: "",
            description: "",
            date: "",
            tasks: [],
            _id: "",
            btn: "Submit"
        }
        this.addTask = this.addTask.bind(this);
        this.getInput = this.getInput.bind(this);
    }

    componentDidMount(){
        this.getTask();
    }

    addTask(event){
        if(this.state._id){
            fetch('/api/task/' + this.state._id, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                M.toast({html: 'Task Updated'});
                this.setState({title: "", description: "", date: "", _id: "", btn: "Submit"});
                this.getTask();
            })
        }
        
        else{
            fetch('/api/task', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                M.toast({html: 'Task Created'});
                this.setState({title: "", description: "", date: "", btn: "Submit"});
                this.getTask();
            })
            .catch(err => console.error(err));
        }

        event.preventDefault();
    }

    getTask(){
        fetch('/api/task')
            .then(res => res.json())
            .then(data => {
                this.setState({tasks: data});
            })
            .catch(err => console.error(err));

    }

    editTask(id){
        fetch('/api/task/' + id)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    title: data.task.title, 
                    description: data.task.description, 
                    date: data.task.date, 
                    _id: data.task._id,
                    btn: "Update"
                });
            })
            .catch(err => console.error(err));
    }       

    deleteTask(id){
        if(confirm("Are you sure you want to delete the task?")){
            fetch('/api/task/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                M.toast({html: 'Task Deleted'});
                this.getTask();
            })
            .catch(err => console.error(err));
        }
    }

    getInput(event){
        const { name, value} = event.target;

        this.setState({
            [name]: value
        })
    }

    render(){
        return (
            <div className="grey darken-4">
                <nav className="deep-orange">

                    <div className="nav-wrapper row">
                        
                        <a href="#!" className="brand-logo col s3"><i className="material-icons">today</i>Task App</a>
                        
                    </div>

                </nav>

                <div className="">
                    
                    <div className="row">
                        
                        <div className="col s4">
                            <div className="card grey lighten-3">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input required="true" name="title" onChange={this.getInput} value={this.state.title} type="text" placeholder="Task title"></input>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea required="true" name="description" onChange={this.getInput} value={this.state.description} className="materialize-textarea" placeholder="Task description"></textarea>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input required="true" name="date" onChange={this.getInput} value={this.state.date} type="date" placeholder="Task title"></input>
                                            </div>
                                        </div>

                                        <button className="waves-effect waves-light btn light-blue accent-2" type="submit">
                                            {this.state.btn}
                                        </button>
                                    </form>
                                </div>                                
                            </div>
                        </div>

                        <div className="col s8">
                            <div className="card grey lighten-3">
                                <table>
                                    <thead>
                                        
                                        <tr>
                                            <th>Title</th>
                                            <th>Description</th>
                                            <th>Date</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>

                                    </thead>
                                    <tbody>
                                        {
                                            this.state.tasks.map(task => {
                                                return(
                                                    <tr key={task._id}>
                                                        <td>{task.title}</td>
                                                        <td>{task.description}</td>
                                                        <td>{task.date}</td>

                                                        <td>
                                                            <button onClick={() => this.editTask(task._id)} className="waves-effect waves-light btn purple"><i className="material-icons">edit</i></button>
                                                        </td>
                                                        <td>
                                                            <button onClick={() => this.deleteTask(task._id)} className="waves-effect waves-light btn purple"><i className="material-icons">delete</i></button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>


                </div>
            </div>
        )
    }
}

export default App;