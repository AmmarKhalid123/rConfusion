import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderDish({dish}){
    if (dish != null){
        return (
            <div className="col-12 col-md-5 m-1">
            <Card>
                <CardImg top width="100%" src={dish.image} alt={dish.name}/>
                <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
            </div>
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
      return  (<div className="col-12 col-md-5 m-1">
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
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link> </BreadcrumbItem>                        
                        <BreadcrumbItem active>{props.selectedDish.name}</BreadcrumbItem>

                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.selectedDish.name}</h3>
                    </div>
                </div>
                                    
            <div className="row">
                    <RenderDish dish={props.selectedDish}/>
                    <RenderComments comments={props.selectedComments}/>
            </div>
            </div>
        );  }
        else{
        return(<div></div>);
}}



export default DishDetail;