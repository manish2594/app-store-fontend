import React, {Component} from 'react'
import './App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const baseUrl="http://localhost:8080/api/";


const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'description', headerName: 'Description', width: 130 },

];


class App extends Component {
 
  constructor(props) {
    super(props);
    this.state = { name: '', description:'',filePath:null,rows:[]};
  }
  myChangeHandler = (event) => {
    // this.setState({name: event.target.value});
    console.log(event.target.files[0])
  

    let files = event.target.files[0]
    const minSize = 0.5*1024*1024 ;
    const maxSize = 40*1024*1024 ;
    
  
    if(files.size>minSize && files.size<maxSize){
      this.setState({filePath:event.target.files[0]})
    }else{
      event.target.value = null
      toast.warn("File size should be greater than 500 kb and less than 40mb", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }



  }
  setName = (event) => {
    // this.setState({name: event.target.value});
    console.log(event.target.value)
    this.setState({name:event.target.value})
  }

  
  setDescription = (event) => {
    // this.setState({name: event.target.value});
    console.log(event.target.value)
    this.setState({description:event.target.value})
  }

 
  submitForm=(event)=>{
    event.preventDefault();
    const data = new FormData();
    data.append('file',this.state.filePath);
    data.append('name',this.state.name);
    data.append('description',this.state.description);
    axios.post(`${baseUrl}app_detail`,data)
  .then(res => { // then print response status
    console.log(res)
    toast.success('Successfully Added', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }).catch(err=>{
    console.error(err)
    toast.error(err.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
    
  })
  }

  showData=(event)=>{
    // alert('Helllo');
    axios.get(`${baseUrl}api`)
  .then(res => { // then print response status
    console.log(res)
  }).catch(err=>console.error(err))
  }

  getAllData=(event)=>{
    axios.get(`${baseUrl}app_detail`)
  .then(res => { // then print response status
    console.log('res-------',res.data.data);
    // this.rows=res.data.data;
    this.setState({rows:res.data.data})
    toast.success(res.data.message?res.data.message:"Successfully Fetched", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
   
  }).catch(err=>{
    console.error(err)
    toast.error(err.error&&err.error.message?err.error.message:"Unable to fetch Data", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  })
  }



   render(){ return (
    <div  className="App">
      <form onSubmit={this.submitForm}>
      <p>Enter your Apk File:</p>
      {/* <input
        type='text'
        onChange={this.myChangeHandler}
      /> */}
     <div className="form-class">

      <div className="form-data-part">

      
      <TextField id="outlined-basic" className="name" label="Name" variant="outlined" value={this.state.name} onChange={this.setName}/>
      <TextField id="outlined-basic1" label="Description" className="description" variant="outlined" value={this.state.description} onChange={this.setDescription}/>
      {/* <input
        type='file'
        onChange={this.myChangeHandler}
        name="apk"
        accept=".apk"
        id="apk"
        className="upload"
      /> */}

<div className="fileUpload ">
    <label className="upload">
      <input name='apk' type="file"
       onChange={this.myChangeHandler}
       name="apk"
       accept=".apk"
       id="apk"
      />
    {/* Upload Apk File */}
    </label>
  </div>
     
      <input type="submit" value="Subbmit" className="submit-form"/>
      </div>

<div>

 </div>
       </div>
      
      </form>
   
           <Button variant="contained" color="secondary" onClick={this.getAllData}>
      Show Table
    </Button>

    
        <ToastContainer />
    <div style={this.state.rows.length ? {width:'100%',height:'400px'} : { display: 'none' }}>
      <DataGrid rows={this.state.rows} columns={columns} pageSize={5}  />
    </div>
      </div>
   
    );
   }
}

export default App;

