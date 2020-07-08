import React, {Component} from 'react';
import productService from './services/productService';
import './App.css';

class App extends Component {

    state = {
        cv_texts: [],
        CVs: []

    }

    componentDidMount() {
        this.readFromDB()
    }

    readFromDB(){
        let res = (async () => {
            return await productService.getAll();
        })()

        console.log(res)
        res.then(arr => {
            this.setState({cv_texts: arr})
            this.refreshState()
        })
    }



    refreshState() {
        console.log("CVs")
        this.state.CVs = []
        this.state.cv_texts.map(t => {
            const row = {
                name: t.cv_text.split("\n")[0],
                phone: t.cv_text.split("\n")[1],
                spe: t.cv_text.split("\n")[2],
                skills: t.cv_text.split("\n")[3]
            }
            this.setState(state => {
                const CVs = this.state.CVs.concat(row)

                console.log(CVs)
                return {CVs}

            })
        })


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
        productService.post(t)
        console.log("Adding ....")
        this.readFromDB()

    }

    render = () => {

        return (
            <div>
                <div className="container highlight centered">
                    <table className="striped">
                        <thead>
                        <tr>
                            <td>NO.</td>
                            <td>Name</td>
                            <td>Phone</td>
                            <td>Specialization</td>
                            <td>Skills</td>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.CVs && this.state.CVs.map((row, index) => {
                                return (
                                    <tr>
                                        <td>{index + 1}</td>
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
                    <input type="file" onChange={(e) => this.showFile(e)}/>
                </div>


            </div>
        )
    }
}

export default App;


// import React, { useState, useEffect } from "react";
//
// // SERVICES
// import productService from './services/productService';
//
// function App() {
//     const [products, setproducts] = useState(null);
//
//     useEffect(() => {
//         if(!products) {
//             getProducts();
//         }
//     })
//
//     const getProducts = async () => {
//         let res = await productService.getAll();
//         console.log(res);
//         setproducts(res);
//     }
//
//     const renderProduct = product => {
//         return (
//             <li key={product._id} className="list__item product">
//             <h3 className="product__name">{product.name}</h3>
//             <p className="product__description">{product.description}</p>
//             </li>
//     );
//     };
//
//     return (
//         <div className="App">
//         <ul className="list">
//     {(products && products.length > 0) ? (
//         products.map(product => renderProduct(product))
//     ) : (
//         <p>No products found</p>
// )}
// </ul>
//     </div>
// );
// }
//
// export default App;
