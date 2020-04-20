import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,
    Modal, Button, ModalHeader, ModalBody, Label, Col, Row  } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent'
import { baseUrl } from '../shared/baseUrl';


const minLength = (len) => (val) => !(val) || val.length >= len;
const maxLength = (len) => (val) => !(val) || val.length <= len;


class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
    }
    toggleModal = () => this.setState((prevState) => {return {isModalOpen: !prevState.isModalOpen}})
    submitHandle = (values) => {
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
        this.toggleModal();        
    }


    render () {
        return(
            <React.Fragment>
            <Button outline onClick = {this.toggleModal}><span className="fa fa-pencil fa-lg"> </span> Submit Comment</Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}> 
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.submitHandle(values)}>
                        <Row className="form-group">
                            <Label htmlFor="rating" sm={12}>Rating</Label>
                            <Col sm={12}>
                                <Control.select model=".rating" type="select" name="rating"
                                className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="author" sm={12}>Your Name</Label>
                            <Col sm={12}>
                                <Control.text model=".author" type="text" name="name"
                                className="form-control" placeholder="Your Name" validators={{
                                    minLength: minLength(3), maxLength: maxLength(15)
                                }}>
                                </Control.text>
                                <Errors className="text-danger" model=".author" show="touched"
                                messages={{
                                    minLength: 'Must be greater than 2 characters',
                                    maxLength: 'Must be less than or equal 15 characters'
                                }}>

                                </Errors>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="comment" sm={12}>Comment</Label>
                            <Col sm={12}>
                                <Control.textarea model=".comment" type="textarea" name="comment"
                                className="form-control" rows={6}>
                                </Control.textarea>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col>
                            <Button color="primary" type="submit">Submit</Button>
                            </Col>
                        </Row>
                    </LocalForm>
                </ModalBody>
            </Modal>
            </React.Fragment>
        );
    }
}



function RenderDish({dish}){
    if (dish != null){
        return (
            <div className="col-12 col-md-5 m-1">
            <Card>
                <CardImg top width="100%" src={baseUrl + dish.image} alt={dish.name}/>
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
function RenderComments({comments, addComment, dishId}){
    if (comments != null) {
      const commentList = comments.map((commentObj) => {
          return (
          <div key={commentObj.id}>
              <p>{commentObj.comment}</p>
              <p>-- {commentObj.author} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(commentObj.date)))}</p>
          </div>);
      }
      );
      return  (<div className="col-12 col-md-5 m-1">
            <h4>
                Comments
            </h4>
            <ul className="list-unstyled">
                {commentList}
                <CommentForm key={dishId} dishId={dishId} addComment={addComment}/>
            </ul>
            
        </div>
    );}
    else {
        return (
            <div></div>
        );
    }
}



function DishDetail(props){
        if (props.isLoading){
            return (
                <div className="container">
                    <div className="row">
                        <Loading/> 
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return (
                <div className="container">
                    <div className="row">
                    <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
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
                    <RenderComments comments={props.selectedComments} addComment={props.addComment}
                    dishId={props.selectedDish.id}/>
            </div>
            </div>
        );  }
        else{
        return(<div></div>);
}}



export default DishDetail;