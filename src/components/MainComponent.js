import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import Menu from "./MenuComponent";
import Contact from "./ContactComponent";
import DishDetail from "./DishdetailComponent";
import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  addComment,
  fetchDishes,
  fetchComments,
  fetchPromos,
} from "../redux/ActionCreators";
import { actions } from "react-redux-form";

const mapStatetoProps = (state) => {
  console.log("mapStatetoProps");
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
  fetchDishes: () => {
    dispatch(fetchDishes());
  },
  resetFeedbackForm: () => {
    dispatch(actions.reset("feedback"));
  },
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
});

class Main extends Component {
  constructor(props) {
    console.log("MainComponent - constructor");
    super(props);
  }

  componentDidMount() {
    console.log("MainComponent - componentDidMount");
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
  }

  render() {
    // This component will be called if path matches "/home"
    // Home component is imported from HomeComponent.js
    const HomePage = () => {
      console.log("MainComponent - Route: /home - HomePageComponent");
      return (
        <Home
          dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
          promotion={
            this.props.promotions.promotions.filter(
              (promo) => promo.featured
            )[0]
          }
          promoLoading={this.props.promotions.isLoading}
          promoErrMess={this.props.promotions.errMess}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    };

    // This component will be called if path matches "/menu/:dishid"
    // DishDetail is imported from DishdetailComponent.js
    const DishWithId = ({ match }) => {
      return (
        <DishDetail
          dish={
            // Filter the dish that has ID matches params :dishID
            this.props.dishes.dishes.filter(
              (dish) => dish.id === parseInt(match.params.dishId, 10)
            )[0]
          }
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.comments.filter(
            (comment) => comment.dishId === parseInt(match.params.dishId, 10)
          )}
          commentsErrMess={this.props.comments.errMess}
          addComment={this.props.addComment}
        />
      );
    };

    return (
      <div>
        {console.log("MainComponent - render method -> return")}
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          {/* if path is "/menu", component Menu with props.dishes will be called */}
          <Route
            exact
            path="/menu"
            component={() => <Menu dishes={this.props.dishes} />}
          />
          <Route path="/menu/:dishId" component={DishWithId} />
          <Route
            exact
            path="/contactus"
            component={() => (
              <Contact resetFeedbackForm={this.props.resetFeedbackForm} />
            )}
          />
          {/* Any paths not match the above will redirect to "/home" */}
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

console.log(
  "MainComponent - withRouter(connect(mapStatetoProps, mapDispatchtoProps)(Main))"
);
export default withRouter(connect(mapStatetoProps, mapDispatchtoProps)(Main));
