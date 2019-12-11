// Libraries
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// CSS
import classes from "./Auth.module.css";
// Actions
import * as AuthActions from "../../stores/actions/auth-action";
// Containers
// Components
import Spinner from "../../components/UI/Spinner/Spinner";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";

class Auth extends Component {
  state = {
    formIsValid: false,
    authForm: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        touched: false,
        valid: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Your Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 7
        },
        touched: false,
        valid: false
      }
    },
    isSignUp: true
  };

  inputChangedHandler = (event, inputId) => {
    const { authForm } = this.state;
    // Deep cloning for additional layers to remove direct refernce to original nested values
    const updatedForm = { ...authForm };
    const updatedFormEl = { ...updatedForm[inputId] };
    // Updating the cloned nested structure
    updatedFormEl.value = event.target.value;
    updatedFormEl.touched = true;
    // Validate cloned nested value
    updatedFormEl.valid = this.checkValidity(
      updatedFormEl.value,
      updatedFormEl.validation
    );
    // Set value of cloned nested form
    updatedForm[inputId] = updatedFormEl;
    let formIsValid = true;
    for (let inputId in updatedForm) {
      // Checks if individual inputs are valid and if overall form is valid.
      formIsValid = updatedForm[inputId].valid && formIsValid;
    }
    // Update form state with cloned form
    this.setState({ formIsValid, authForm: updatedForm });
  };

  checkValidity(value, validation) {
    let isValid = true;
    // Check if input has configured validation
    if (!validation) {
      // Returns truish since no validation
      return true;
    }
    if (validation.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }
    if (validation.maxLength) {
      isValid = value.length <= validation.minLength && isValid;
    }
    return isValid;
  }

  submitHandler = event => {
    event.preventDefault();
    const { isSignUp } = this.state;
    const { email, password } = this.state.authForm;
    const { onAuth } = this.props;
    onAuth(email.value, password.value, isSignUp);
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => ({ isSignUp: !prevState.isSignUp }));
  };

  render() {
    const { authForm, isSignUp } = this.state;
    const { loading, error } = this.props;
    const formElementsArray = [];
    for (let key in authForm) {
      formElementsArray.push({ id: key, config: authForm[key] });
    }
    let errorMessage = null;
    if (error) {
      errorMessage = <p>{error.message}</p>;
    }
    let form = formElementsArray.map(formEl => (
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
    ));
    if (loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.Auth}>
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
          {`SWITCH TO ${isSignUp ? "SIGN IN" : "SIGN UP"}`}
        </Button>
      </div>
    );
  }
}

Auth.propTypes = {
  onAuth: PropTypes.func
};

Auth.defaultProps = { onAuth: () => {} };

const mapStateToProps = state => {
  return { loading: state.auth.loading, error: state.auth.error };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(AuthActions.auth(email, password, isSignUp))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
