
import React, { Component } from 'react';
import PostVote from "./PostVote";

import Tooltip from '@material-ui/core/Tooltip';
import Divider from '@material-ui/core/Divider';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class PostItem extends Component {
  render() {

    //grab the vote count for the given post
    let upVoteCount = 0;
    let downVoteCount = 0;
    if(this.props.votes) {
      for(var i=0; i<this.props.votes.length; i++){
        if(this.props.votes[i]['postid'] == this.props.post.postid){
          upVoteCount = this.props.votes[i]['upvotes'] 
          downVoteCount = this.props.votes[i]['downvotes'] 
        }
      }
    }

    let Users = JSON.parse(localStorage.getItem("KnownUsers"));
    let username = "anonymous"

    try{
      for(var i=0; i<Users.length; i++){
        if(Users[i]['HexAddress'] == this.props.post.author){
          username = Users[i]['UserName'];
        }
      }
    }
    catch{
      localStorage.setItem("KnownUsers", JSON.stringify({}));
    }

    return (
      <div className="PostItem">
        <div class="container-fluid">
          <div class="row">
              <div class="col-md-2">
                <PostVote postid={this.props.post.postid} />
              </div>
              
              <div class="col-md-8">
              <p></p>
                <div className="title-area">
                    <span className="title"><Link to={"post=" + this.props.post.postid}> {this.props.post.title + " "}</Link><span class="badge badge-dark">{ this.props.post.type}</span></span>  
                </div>

                <div className="meta-area">
                <Divider variant="middle" />

                  <span className="time">
                    Submitted at {this.props.post.hms} on {this.props.post.timestamp} by
                    <Tooltip title={" " +this.props.post.author+" "+this.props.post.maticaddress} leaveDelay={400} interactive={true}><strong> {username}</strong></Tooltip>
                  </span>
                  <Divider variant="middle" />
                </div>
              </div>
              
          </div>
        </div>
        <p></p>
      </div>
    );
  }
}

export default PostItem;
