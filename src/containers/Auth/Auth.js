// Libraries
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
// CSS
import classes from "./Auth.module.css";
// Actions
import * as AuthActionCreator from "../../stores/actions/auth-action";
// Utils
import { updateObject, checkValidity } from "../../shared/utils/utils";
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

  componentDidMount() {
    const {
      isBuildingBurger,
      authRedirectPath,
      onSetAuthRedirectPath
    } = this.props;
    if (!isBuildingBurger && authRedirectPath !== "/") {
      onSetAuthRedirectPath("/");
    }
  }

  inputChangedHandler = (event, inputId) => {
    const { authForm } = this.state;
    // Updating the cloned nested structure
    const { value } = event.target;
    // Set value of cloned nested form
    const updatedForm = updateObject(authForm, {
      [inputId]: updateObject(authForm[inputId], {
        value: value,
        touched: true,
        valid: checkValidity(value, authForm[inputId].validation)
      })
    });
    let formIsValid = true;
    for (let inputId in updatedForm) {
      // Checks if individual inputs are valid and if overall form is valid.
      formIsValid = updatedForm[inputId].valid && formIsValid;
    }
    // Update form state with cloned form
    this.setState({ formIsValid, authForm: updatedForm });
  };

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
    const { authForm, isSignUp, formIsValid } = this.state;
    const { loading, error, isAuthenticated, authRedirectPath } = this.props;
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
    let authRedirect = null;
    if (isAuthenticated) {
      authRedirect = <Redirect to={authRedirectPath} />;
    }
    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success" disabled={!formIsValid}>
            SUBMIT
          </Button>
        </form>
        <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
          {`SWITCH TO ${isSignUp ? "SIGN IN" : "SIGN UP"}`}
        </Button>
      </div>
    );
  }
}

Auth.propTypes = {
  onAuth: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  isBuildingBurger: PropTypes.bool,
  authRedirectPath: PropTypes.string
};

Auth.defaultProps = {
  onAuth: () => {},
  loading: false,
  error: null,
  isAuthenticated: false,
  isBuildingBurger: false,
  authRedirectPath: null
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: state.auth.idToken !== null,
  isBuildingBurger: state.burger.building,
  authRedirectPath: state.auth.authRedirectPath
});

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password, isSignUp) =>
    dispatch(AuthActionCreator.auth(email, password, isSignUp)),
  onSetAuthRedirectPath: path =>
    dispatch(AuthActionCreator.setAuthRedirectPath(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
