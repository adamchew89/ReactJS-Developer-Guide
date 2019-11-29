// Libraries
import React, { Component } from "react";
// CSS
import classes from "./ContactData.module.css";
// Actions
import axios from "../../../actions/axios-orders";
// Components
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
  state = {
    loading: false,
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: ""
      },
      address: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: ""
      },
      postal: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Postal"
        },
        value: ""
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: ""
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email"
        },
        value: ""
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: ""
      }
    }
  };

  orderHandler = event => {
    event.preventDefault();
    const { orderForm } = this.state;
    const { ingredients, totalPrice } = this.props;
    this.setState({ loading: true });
    // Create a new object of only form data
    const formData = {};
    for (let formElId in orderForm) {
      formData[formElId] = orderForm[formElId].value;
    }
    const order = {
      ingredients,
      totalPrice,
      orderData: formData
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

  inputChangedHandler = (event, inputId) => {
    const { orderForm } = this.state;
    // Deep cloning for additional layers to remove direct refernce to original nested values
    const updatedForm = { ...orderForm };
    const updatedFormEl = { ...updatedForm[inputId] };
    // Updating the cloned nested structure
    updatedFormEl.value = event.target.value;
    updatedForm[inputId] = updatedFormEl;
    // Update form state with cloned form
    this.setState({ orderForm: updatedForm });
  };

  render() {
    const { loading, orderForm } = this.state;
    const formElementsArray = [];
    for (let key in orderForm) {
      formElementsArray.push({ id: key, config: orderForm[key] });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formEl => (
          <Input
            key={formEl.id}
            elementType={formEl.config.elementType}
            elementConfig={formEl.config.elementConfig}
            value={formEl.config.value}
            changed={event => this.inputChangedHandler(event, formEl.id)}
          />
        ))}
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
