import React, { Component, useLayoutEffect } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";
import dateFormat, { masks } from "dateformat";

function RenderDish({ dish }) {
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

function RenderComments({ comments }) {
  return (
    <div>
      <h4>Comments</h4>
      {comments.map((comment) => (
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

const DishDetail = (props) => {
  if (props.dish) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderComments comments={props.dish.comments} />
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default DishDetail;
