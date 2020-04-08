import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
import { func } from 'prop-types';


function RenderDish({dish}){
    if (dish != null){
        return (
            <Card>
                <CardImg top width="100%" src={dish.image} alt={dish.name}/>
                <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );}
    else{
        return(
        <div></div>
    );}
    
}
function RenderComments({comments}){
    if (comments != null) {
      const commentList = comments.map((commentObj) => {
          return (
          <div key={comments.id}>
              <p>{commentObj.comment}</p>
              <p>-- {commentObj.author} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(commentObj.date)))}</p>
          </div>);
      }
      );
      return  (<div>
            <h4>
                Comments
            </h4>
            <div className="list-unstyled">
                {commentList}
            </div>
        </div>
    );}
    else {
        return (
            <div></div>
        );
    }
}



function DishDetail(props){
        if (props.selectedDish != null){
        return (
            <div className="container">
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.selectedDish}/>
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.selectedDish.comments}/>
                </div>
            </div>
            </div>
        );  }
        else{
        return(<div></div>);
}}



export default DishDetail;