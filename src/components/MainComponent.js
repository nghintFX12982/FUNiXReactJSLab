import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import Menu from "./MenuComponent";
import Contact from "./ContactComponent";
import DishDetail from "./DishdetailComponent";
import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addComment } from "../redux/ActionCreators";

const mapStatetoProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};

const mapDispatchtoProps = (dispatch) => ({
  addComment: (dishId, rating, author, comment) =>
    dispatch(addComment(dishId, rating, author, comment)),
});

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // This component will be called if path matches "/home"
    // Home component is imported from HomeComponent.js
    const HomPage = () => {
      // console.log(this);
      return (
        <Home
          dish={this.props.dishes.filter((dish) => dish.featured)[0]}
          promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    };

    // This component will be called if path matches "/menu/:dishid"
    // DishDetail is imported from DishdetailComponent.js
    const DishWithId = ({ match }) => {
      // console.log(this);
      return (
        <DishDetail
          dish={
            // Filter the dish that has ID matches params :dishID
            this.props.dishes.filter(
              (dish) => dish.id === parseInt(match.params.dishId, 10)
            )[0]
          }
          comments={this.props.comments.filter(
            (comment) => comment.dishId === parseInt(match.params.dishId, 10)
          )}
          addComment={this.props.addComment}
        />
      );
    };

    return (
      <div>
        {console.log(this)}
        <Header />
        <Switch>
          <Route path="/home" component={HomPage} />
          {/* if path is "/menu", component Menu with props.dishes will be called */}
          <Route
            exact
            path="/menu"
            component={() => <Menu dishes={this.props.dishes} />}
          />
          <Route path="/menu/:dishId" component={DishWithId} />
          <Route exact path="/contactus" component={Contact} />
          {/* Any paths not match the above will redirect to "/home" */}
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchtoProps)(Main));
