// Libraries
import React, { Component } from "react";
// CSS
import classes from "./ContactData.module.css";
// Actions
import axios from "../../../actions/axios-orders";
// Components
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
  state = {
    loading: false,
    name: "",
    email: "",
    address: {
      street: "",
      postal: ""
    }
  };

  orderHandler = event => {
    event.preventDefault();
    const { ingredients, totalPrice } = this.props;
    this.setState({ loading: true });
    const order = {
      ingredients,
      totalPrice,
      customer: {
        name: "Adam Chew",
        address: {
          street: "80 Boon Keng Road",
          postal: "668080",
          country: "Singapore"
        },
        email: "AdamChew@mail.com",
        deliveryMethod: "fastest"
      }
    };
    this.setState({ loading: true });
    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(error => this.setState({ loading: false }));
  };

  render() {
    const { loading } = this.state;
    let form = (
      <form>
        <input
          className={classes.Input}
          type="text"
          name="name"
          placeholder="Your name"
        />
        <input
          className={classes.Input}
          type="email"
          name="email"
          placeholder="Your email"
        />
        <input
          className={classes.Input}
          type="text"
          name="street"
          placeholder="Street"
        />
        <input
          className={classes.Input}
          type="text"
          name="postal"
          placeholder="Postal"
        />
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
