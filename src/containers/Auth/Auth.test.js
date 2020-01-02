// Libraries
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Redirect } from "react-router-dom";
// Containers
import { Auth } from "./Auth";
// Components
import Spinner from "../../components/UI/Spinner/Spinner";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";

// Configures enzyme to adapt to react16 via enzyme-adapter-react-16
configure({ adapter: new Adapter() });
// Overview of test suite
describe("<Auth />", () => {
  const initialProps = { onAuth: () => {}, onSetAuthRedirectPath: () => {} };
  // Shallowly render the tested component: Shallow does not render child components
  let wrapper;
  // Executed set-up method before each individual test case.
  beforeEach(() => {
    // shallow rendering replaces child components with identified placeholders
    wrapper = shallow(<Auth {...initialProps} />);
  });
  // Executed post-call method after each individual test case.
  afterEach(() => {
    wrapper = null;
  });
  // Individual test cases
  // Individual test cases
  it("should render one <form /> element with <Input /> elements.", () => {
    // Assertion
    expect(wrapper.find("form")).toHaveLength(1);
    expect(wrapper.find(Input)).toBeTruthy();
  });

  it("should render one <Spinner /> element if 'loading' is true.", () => {
    wrapper.setProps({ loading: true });
    expect(wrapper.find(Spinner)).toHaveLength(1);
  });

  it("should render one <Redirect /> element if 'isAuthenticated' is true.", () => {
    wrapper.setProps({ isAuthenticated: true, authRedirectPath: "/" });
    expect(wrapper.find(Redirect)).toHaveLength(1);
  });

  it("should render one <p /> element with provided 'error' if 'error' is populated.", () => {
    wrapper.setProps({ error: { message: "Test" } });
    const target = wrapper.find("p");
    expect(target).toHaveLength(1);
    expect(target.text()).toEqual("Test");
  });

  it("should switch labels from 'SWITCH TO SIGN IN' to 'SWITCH TO SIGN UP' on 'switchAuthModeHandler' trigger.", () => {
    let target = wrapper.find("[btnType='Danger']");
    expect(target.get(0).props.children).toEqual("SWITCH TO SIGN IN");
    target.get(0).props.clicked();
    wrapper.update();
    target = wrapper.find("[btnType='Danger']");
    expect(target.get(0).props.children).toEqual("SWITCH TO SIGN UP");
  });

  it("should trigger func 'inputChangedHandler' and modify state for <Input />.", () => {
    wrapper
      .find(Input)
      .get(0)
      .props.changed({ target: { value: "a" } });
    expect(wrapper.state().authForm.email.value).toEqual("a");
  });

  it("should set 'formIsValid' to true when all fields are filled.", () => {
    wrapper
      .find(Input)
      .map(input =>
        input.get(0).props.changed({ target: { value: "test@test.com" } })
      );
    expect(wrapper.state().formIsValid).toBeTruthy();
  });

  it("should trigger 'orderHandler' when 'formIsValid' is true and <Button /> is clicked.", () => {
    const mockFnAuth = jest.fn();
    const mockFnDefault = jest.fn();
    wrapper.setProps({ onAuth: mockFnAuth });
    wrapper
      .find(Input)
      .map(input =>
        input.get(0).props.changed({ target: { value: "test@test.com" } })
      );
    const target = wrapper.find(Button);
    expect(target.get(0).props.disabled).toBeFalsy();
    target.get(0).props.clicked({ preventDefault: mockFnDefault });
    expect(mockFnDefault).toHaveBeenCalledTimes(1);
    expect(mockFnAuth).toHaveBeenCalledTimes(1);
  });
});
