import React, {Component} from "react";
import axios from "axios";

export default class Home extends Component {
constructor(props){
  super(props);

  this.state={
    posts:[]
  };
}

componentDidMount(){
  this.retrievePosts();
}

retrievePosts(){
  axios.get("http://localhost:8000/posts").then(res=>{
    if(res.data.success){
      this.setState({
        posts:res.data.existingPosts
      });
      console.log(this.state.posts)
    }
  });
}

onDelete= (id)=>{ 

  axios.delete(`/post/delete/${id}`).then((res)=>{
  alert("Deleted Successfully.......");
  this.retrievePosts();

})

}
filterData(posts,shKey){

  const result = posts.filter((post)=>
  post.name.toLowerCase().includes(shKey)||
  post.indexnumber.toLowerCase().includes(shKey)||
  post.post.toLowerCase().includes(shKey))

  this.setState({posts:result})
}

handleSearchArea =  (e)=>{
  const shKey = e.currentTarget.value;

  axios.get("/posts").then(res=>{
    if(res.data.success){
      this.filterData(res.data.existingPosts,shKey)

      }
    });


}
  render(){
    return(
      <div className="container">
        <div className="row">
          <div className="ol-lg-9 mt-2 mb-2">
            <h4>Deatils</h4>
          </div>
          <div className="col-lg-3 mt-2 mb-2">
            <input className="form-control" type="search" placeholder="Search" aria-label="Search" onChange={this.handleSearchArea}></input>
          </div>
        </div>
        <table className="table table-hover">
          <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Index-Number</th>
                <th scope="col">Post</th>
                <th scope="col">Action</th>
              </tr>
          </thead>
              <tbody>
                {this.state.posts.map((posts,index)=>(
                  <tr key={index}>
                    <th scope="row">{index+1}</th>
                    <td>
                        <a href={`/post/${posts._id}`} style={{textDecoration:'none'}}>
                        {posts.name}
                        </a>

                    </td>
                    <td>{posts.indexnumber}</td>
                    <td>{posts.post}</td>
                    <td>
                      <a className="btn btn-warning" href={`/edit/${posts._id}`}>
                        <i className="fas fa-edit"></i>&nbsp;Edit
                      </a>
                      &nbsp;
                      <a className="btn btn-danger" href="#" onClick={()=>this.onDelete(posts._id)}>
                        <i className="far fa-trash-alt"></i>&nbsp;Delete
                      </a>
                    </td>
                  </tr>

                ))}
                

              </tbody>
        </table>
        <button class="btn btn-success">
            <a href="/add" style={{textDecoration:'none', color:'white'}}> ADD NEW STUDENT</a>
        </button>
        
      </div>
      
    )
  }
}