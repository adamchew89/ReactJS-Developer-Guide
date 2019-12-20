// Libraries
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
// Containers
import { ContactData } from "./ContactData";
// Components
import * as Ingredients from "../../../components/Burger/BurgerIngredient/BurgerIngredient";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

// Configures enzyme to adapt to react16 via enzyme-adapter-react-16
configure({ adapter: new Adapter() });
// Overview of test suite
describe("<ContactData />", () => {
  const initialProps = { ingredients: {}, totalPrice: 4 };
  // Shallowly render the tested component: Shallow does not render child components
  let wrapper;
  // Executed set-up method before each individual test case.
  beforeEach(() => {
    // shallow rendering replaces child components with identified placeholders
    wrapper = shallow(<ContactData {...initialProps} />);
  });
  // Executed post-call method after each individual test case.
  afterEach(() => {
    wrapper = null;
  });
  // Individual test cases
  it("should render one <form /> element with <Input /> elements.", () => {
    // Assertion
    expect(wrapper.find("form")).toHaveLength(1);
    expect(wrapper.find(Input)).toBeTruthy();
  });

  it("should render a <Button /> element with the disabled attribute.", () => {
    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find(Button).get(0).props.disabled).toBeTruthy();
  });

  it("should render one <Spinner /> element if 'loading' set to true.", () => {
    wrapper.setProps({ loading: true });
    expect(wrapper.find(Spinner)).toHaveLength(1);
    expect(wrapper.find("form")).toHaveLength(0);
    expect(wrapper.find(Input)).toHaveLength(0);
  });

  it("should trigger func 'inputChangedHandler' and modify state for <Input />.", () => {
    wrapper
      .find(Input)
      .get(0)
      .props.changed({ target: { value: "a" } });
    expect(wrapper.state().orderForm.name.value).toEqual("a");
  });

  it("should set 'formIsValid' to true when all fields are filled.", () => {
    wrapper
      .find(Input)
      .map(input =>
        input.get(0).props.elementType !== "select"
          ? input.get(0).props.changed({ target: { value: "abcdef" } })
          : null
      );
    expect(wrapper.state().formIsValid).toBeTruthy();
  });

  it("should trigger 'orderHandler' when 'formIsValid' is true and <Button /> is clicked.", () => {
    const mockFnOrder = jest.fn();
    const mockFnDefault = jest.fn();
    wrapper.setProps({ onOrderBurger: mockFnOrder });
    wrapper
      .find(Input)
      .map(input =>
        input.get(0).props.elementType !== "select"
          ? input.get(0).props.changed({ target: { value: "abcdef" } })
          : null
      );
    const target = wrapper.find(Button);
    expect(target.get(0).props.disabled).toBeFalsy();
    target.get(0).props.clicked({ preventDefault: mockFnDefault });
    expect(mockFnDefault).toHaveBeenCalledTimes(1);
    expect(mockFnOrder).toHaveBeenCalledTimes(1);
  });
});
