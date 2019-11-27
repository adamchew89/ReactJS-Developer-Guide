// Libraries
import React, { Fragment, Component } from "react";
// Components
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null
      };
      this.requestInterceptor = axios.interceptors.request.use(
        request => {
          this.setState({ error: null });
          return request;
        },
        error => error
      );
      this.responseInterceptor = axios.interceptors.response.use(
        response => response,
        error => {
          this.setState({ error });
          return Promise.reject(error);
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.response.eject(this.responseInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      const { error } = this.state;
      return (
        <Fragment>
          <Modal show={error !== null} modalClose={this.errorConfirmedHandler}>
            {error ? error.message : <div></div>}
          </Modal>
          <WrappedComponent {...this.props} />
        </Fragment>
      );
    }
  };
};

export default withErrorHandler;
