import React, {Component} from "react";
import axios from "axios";

export default class PostDetails extends Component {
  constructor(props){
    super(props);

    this.state={
      post:{}
    };
  }
  //to show the deatils
  componentDidMount(){
    const id = this.props.match.params.id;

    axios.get(`/post/${id}`).then((res) =>{
      if(res.data.success){
        this.setState({
          post:res.data.post

        });
        console.log(this.state.post);
      }
    });
  }
//form
  render(){

    const {name,indexnumber,post} = this.state.post;

    return(
      <div style={{margin:'20px'}}>
        <h3>{name}</h3>
        <hr/>

        <dl className="row">
          <dt className="col-sm-3">indexnumber</dt>
          <dd className="col-sm-9">{indexnumber}</dd>
          <dt className="col-sm-3">post</dt>
          <dd className="col-sm-9">{post}</dd>

        </dl>
      </div>
    )
  }
}