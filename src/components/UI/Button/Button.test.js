// Libraries
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
// Components
import Button from "./Button";

// Configures enzyme to adapt to react16 via enzyme-adapter-react-16
configure({ adapter: new Adapter() });
// Overview of test suite
describe("<Button />", () => {
  const initialProps = { clicked: () => {} };
  // Shallowly render the tested component: Shallow does not render child components
  let wrapper;
  // Executed set-up method before each individual test case.
  beforeEach(() => {
    // shallow rendering replaces child components with identified placeholders
    wrapper = shallow(<Button {...initialProps} />);
  });
  // Executed post-call method after each individual test case.
  afterEach(() => {
    wrapper = null;
  });
  // Individual test cases
  it("should render a <button /> element 'Button Danger' class with inner text of 'Submit'.", () => {
    // Assertion
    const target = wrapper.find("button");
    expect(target).toHaveLength(1);
    expect(target.get(0).props.className).toEqual(
      expect.stringMatching("Danger")
    );
    expect(target.get(0).props.className).toEqual(
      expect.stringMatching("Button")
    );
    expect(target.text()).toEqual("Submit");
  });
});
