import React, { Component, useLayoutEffect } from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import dateFormat, { masks } from "dateformat";

class DishDetail extends Component {
  renderDish(dish) {
    return (
      <Card>
        <CardImg top src={dish.image} alt={dish.description} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    );
  }

  renderComments(commentList) {
    return (
      <div>
        <h4>Comments</h4>
        {commentList.map((comment) => (
          <ul className="list-unstyled">
            <li>{comment.comment}</li>
            <li>
              --{comment.author}, {dateFormat(comment.date, "mmm dd, yyyy")}
            </li>
          </ul>
        ))}
      </div>
    );
  }

  render() {
    return (
      <React.Fragment>
        <div className="col-12 col-md-5 m-1">
          {this.renderDish(this.props.selectedDish)}
        </div>
        <div className="col-12 col-md-5 m-1">
          {this.renderComments(this.props.selectedDish.comments)}
        </div>
      </React.Fragment>
    );
  }
}

export default DishDetail;
