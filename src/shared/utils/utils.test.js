// Utils
import { updateObject, checkValidity } from "./utils";

const object1 = { attr1: "test1" };
const object2 = { attr2: "test2" };
// Overview of test suite
describe("Shared Utils - updateObject", () => {
  // Individual test cases
  it("should return a new object with combination of both objects", () => {
    // Assertion
    expect(updateObject(object1, object2)).toEqual({
      attr1: "test1",
      attr2: "test2"
    });
  });
});

const value = "test";
// Overview of test suite
describe("Shared Utils - checkValidity.", () => {
  // Individual test cases
  it("should return true if validation is empty object.", () => {
    // Assertion
    const validation = {};
    expect(checkValidity(value, validation)).toBeTruthy();
  });

  it("should return false if validation has 'required' and value is empty.", () => {
    const validation = { required: true };
    expect(checkValidity("", validation)).toBeFalsy();
  });

  it("should return false if validation has 'minLength' and value is too short.", () => {
    const validation = { minLength: 5 };
    expect(checkValidity(value, validation)).toBeFalsy();
  });

  it("should return false if validation has 'maxLength' and value is too long.", () => {
    const validation = { maxLength: 3 };
    expect(checkValidity(value, validation)).toBeFalsy();
  });

  it("should return true if validation is passed", () => {
    const validation = { required: true, maxLength: 5, minLength: 3 };
    expect(checkValidity(value, validation)).toBeTruthy();
  });
});
