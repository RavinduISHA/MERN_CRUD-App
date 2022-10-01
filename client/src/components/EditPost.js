import React, {Component} from "react";
import axios from "axios";

export default class EditPost extends Component {

  constructor(props){
    super(props);
    this.state={
      name:"",
      indexnumber:"",
      post:""
    }
  }
  //to input data
  handleInputChange = (e)=>{
    const{name,value} = e.target;

    this.setState({
      ...this.state,
      [name]:value
    })
  }

  onSubmit = (e)=>{
    
    e.preventDefault();
    const id = this.props.match.params.id;
    const {name,indexnumber,post} = this.state;

    const data={
      name:name,
      indexnumber:indexnumber,
      post:post
    }
    console.log(data)

    //to update
    axios.put(`/post/update/${id}`,data).then((res) =>{
      if(res.data.success){
        alert("Updated Successfuly........!")
        this.setState({
          name:"",
          indexnumber:"",
          post:""
        })
      }
    
    })
  }

  componentDidMount(){
    const id = this.props.match.params.id;

    axios.get(`/post/${id}`).then((res) =>{
      if(res.data.success){
        this.setState({
          name:res.data.post.name,
          indexnumber:res.data.post.indexnumber,
          post:res.data.post.post

        });
        console.log(this.state.post);
      }
    });
  }

  render(){
    return(
      <form className="needs-validation" noValidate>
      <div class="input-group mb-3">
        <span class="input-group-text" id="inputGroup-sizing-default">Name</span>
        <input type="text" className="form-control" name="name" placeholder="Enter name" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
        value={this.state.name} 
        onChange={this.handleInputChange}/>
      </div>

      <div class="input-group mb-3">
      <span class="input-group-text" id="inputGroup-sizing-default">Index Number</span>
      <input type="text" className="form-control" name="indexnumber" placeholder="Enter your index number" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
      value={this.state.indexnumber}
      onChange={this.handleInputChange}/>
      </div>

      <div class="input-group mb-3">
        <span class="input-group-text" id="inputGroup-sizing-default">Subject</span>
        <input type="text" className="form-control" name="post" placeholder="Enter your subject" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
        value={this.state.post}
        onChange={this.handleInputChange}/>
      </div>

      <div class="col-12">
        <button class="btn btn-primary" type="submit" onClick={this.onSubmit}><i className="far fa-check-square"></i>Submit</button>
      </div>

      </form>
    )
  }
}