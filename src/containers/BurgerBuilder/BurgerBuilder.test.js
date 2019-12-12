// Libraries
import React from "react";
import { configure, shallow } from "enzyme";
import configureMockStore from "redux-mock-store";
import Adapter from "enzyme-adapter-react-16";
import thunk from "redux-thunk";
// Containers
import { BurgerBuilder } from "./BurgerBuilder";
// Components
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

// Configures enzyme to adapt to react16 via enzyme-adapter-react-16
configure({ adapter: new Adapter() });
const mockStore = configureMockStore([thunk]);

describe("<BurgerBuilder />", () => {
  let wrapper;
  const initialProps = {
    initIngredients: () => {},
    purchaseBurgerInit: () => {},
    ingredients: {},
    totalPrice: 0
  };
  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder {...initialProps} />, {
      context: { store: mockStore() }
    });
  });

  afterEach(() => {
    wrapper = null;
  });

  it("should render <BuildControls /> when receiving ingredients", () => {
    wrapper.setProps({ ingredients: { SALAD: 0 } });
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});
