// Libraries
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
// Components
import Modal from "./Modal";
import Backdrop from "../Backdrop/Backdrop";

// Configures enzyme to adapt to react16 via enzyme-adapter-react-16
configure({ adapter: new Adapter() });
// Overview of test suite
describe("<Modal />", () => {
  const initialProps = { modalClose: () => {} };
  // Shallowly render the tested component: Shallow does not render child components
  let wrapper;
  // Executed set-up method before each individual test case.
  beforeEach(() => {
    // shallow rendering replaces child components with identified placeholders
    wrapper = shallow(<Modal {...initialProps} />);
  });
  // Executed post-call method after each individual test case.
  afterEach(() => {
    wrapper = null;
  });
  // Individual test cases
  it("should render a <Backdrop /> element if 'show' is true.", () => {
    // Assertion
    wrapper.setProps({ show: true });
    expect(wrapper.find(Backdrop)).toHaveLength(1);
  });

  it("should render a <Backdrop /> element if 'children' changes.", () => {
    // Assertion
    wrapper.setProps({ children: <div>Test</div> });
    expect(wrapper.find(Backdrop)).toHaveLength(1);
  });

  it("should trigger func", () => {
    const mockFnClose = jest.fn();
    wrapper.setProps({ show: true, modalClose: mockFnClose });
    expect(mockFnClose).not.toHaveBeenCalled();
    wrapper
      .find(Backdrop)
      .get(0)
      .props.clicked();
    expect(mockFnClose).toHaveBeenCalledTimes(1);
  });
});
