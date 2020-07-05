import React, {Component} from 'react';
import './App.css';

class App extends Component {

    state = {

        CVs: []

    }

    constructor(props) {
        super(props);
    }

    showFile = async (e) => {
        console.log("read")
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => {
            const text = (e.target.result)
            console.log(text)
            this.addToState(text, e.target.id);
        };
        reader.readAsText(e.target.files[0])

    }

    addToState = (t, file_name) => {
        console.log("Adding ....")
        const row = {
            name: t.split("\n")[0],
            phone: t.split("\n")[1],
            spe: t.split("\n")[2],
            skills: t.split("\n")[3]
        }
        this.setState(state =>{
            const CVs = this.state.CVs.concat(row)

            return{CVs}
            console.log(CVs)

        })
    }

    render = () => {

        return (
            <div>
                <div className="container highlight centered">
                    <table className="striped">
                        <thead>
                        <tr>
                            <td>Name</td>
                            <td>Phone</td>
                            <td>Specialization</td>
                            <td>Skills</td>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.CVs && this.state.CVs.map( row => {
                                return(
                                    <tr>
                                        <td>{row.name}</td>
                                        <td>{row.phone}</td>
                                        <td>{row.spe}</td>
                                        <td>{row.skills}</td>
                                    </tr>
                                )
                            }

                        )}


                        </tbody>

                    </table>
                </div>
                    <br/><br/><br/><br/>
                    <div className="btn">
                        <span>File</span>
                        <input type="file"  onChange={(e) => this.showFile(e)} />
                    </div>


            </div>
        )
    }
}

export default App;
