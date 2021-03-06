// Libraries
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// CSS
import classes from "./ContactData.module.css";
// Actions
import axios from "../../../actions/axios-orders";
// Utils
import { updateObject, checkValidity } from "../../../shared/utils/utils";
// Components
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
// HOCs
import withErrorHandler from "../../../hocs/withErrorHandler/withErrorHandler";
// ActionCreators
import * as OrderActionCreator from "../../../stores/actions/order-action";

export class ContactData extends Component {
  state = {
    formIsValid: false,
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        validation: {
          required: true
        },
        touched: false,
        valid: false
      },
      address: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: "",
        validation: {
          required: true
        },
        touched: false,
        valid: false
      },
      postal: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Postal"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
          maxLength: 6
        },
        touched: false,
        valid: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: "",
        validation: {
          required: true
        },
        touched: false,
        valid: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email"
        },
        value: "",
        validation: {
          required: true
        },
        touched: false,
        valid: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: "fastest",
        validation: {},
        valid: true
      }
    }
  };

  orderHandler = event => {
    event.preventDefault();
    const { orderForm } = this.state;
    const {
      ingredients,
      totalPrice,
      onOrderBurger,
      idToken,
      userId
    } = this.props;
    // Create a new object of only form data
    const formData = {};
    for (let formElId in orderForm) {
      formData[formElId] = orderForm[formElId].value;
    }
    const order = {
      ingredients,
      totalPrice,
      orderData: formData,
      userId
    };
    onOrderBurger(order, idToken);
  };

  inputChangedHandler = (event, inputId) => {
    const { orderForm } = this.state;
    // Updating the cloned nested structure
    const { value } = event.target;
    // Set value of cloned nested form
    const updatedForm = updateObject(orderForm, {
      [inputId]: updateObject(orderForm[inputId], {
        value: value,
        touched: true,
        valid: checkValidity(value, orderForm[inputId].validation)
      })
    });
    let formIsValid = true;
    for (let inputId in updatedForm) {
      // Checks if individual inputs are valid and if overall form is valid.
      formIsValid = updatedForm[inputId].valid && formIsValid;
    }
    // Update form state with cloned form
    this.setState({ formIsValid, orderForm: updatedForm });
  };

  render() {
    const { formIsValid, orderForm } = this.state;
    const { loading } = this.props;
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
            invalid={!formEl.config.valid}
            shouldValidate={formEl.config.validation !== null}
            touched={formEl.config.touched}
            changed={event => this.inputChangedHandler(event, formEl.id)}
          />
        ))}
        <Button
          btnType="Success"
          clicked={this.orderHandler}
          disabled={!formIsValid}
        >
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

ContactData.propTypes = {
  ingredients: PropTypes.shape().isRequired,
  totalPrice: PropTypes.number.isRequired,
  loading: PropTypes.bool,
  idToken: PropTypes.string,
  userId: PropTypes.string
};

ContactData.defaultProps = {
  loading: false,
  idToken: null,
  userId: null
};

const mapStateToProps = state => ({
  ingredients: state.burger.ingredients,
  totalPrice: state.burger.totalPrice,
  loading: state.order.loading,
  idToken: state.auth.idToken,
  userId: state.auth.userId
});

const mapDispatchToProps = dispatch => ({
  onOrderBurger: (orderData, idToken) =>
    dispatch(OrderActionCreator.purchaseBurger(orderData, idToken))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
