// Libraries
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
// Containers
import { Orders } from "./Orders";
// Components
import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as Ingredients from "../../components/Burger/BurgerIngredient/BurgerIngredient";

// Configures enzyme to adapt to react16 via enzyme-adapter-react-16
configure({ adapter: new Adapter() });
// Overview of test suite
describe("<Orders />", () => {
  const initialProps = {
    fetchOrders: () => {},
    orders: [
      { id: "test", ingredients: { [Ingredients.BACON]: 1 }, totalPrice: 4 }
    ]
  };
  // Shallowly render the tested component: Shallow does not render child components
  let wrapper;
  // Executed set-up method before each individual test case.
  beforeEach(() => {
    // shallow rendering replaces child components with identified placeholders
    wrapper = shallow(<Orders {...initialProps} />);
  });
  // Executed post-call method after each individual test case.
  afterEach(() => {
    wrapper = null;
  });
  // Individual test cases
  it("should render a <Order /> element.", () => {
    // Assertion
    expect(wrapper.find(Order)).toHaveLength(1);
  });

  it("should render a <Spinner /> element if 'loading' is true.", () => {
    wrapper.setProps({ loading: true });
    expect(wrapper.find(Spinner)).toHaveLength(1);
  });
});
