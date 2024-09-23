import { render, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button Component", () => {
  it("renders children correctly", () => {
    const { getByText } = render(<Button>Click Me</Button>);
    expect(getByText("Click Me")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button onClick={handleClick}>Click Me</Button>,
    );

    fireEvent.click(getByText("Click Me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when loading", () => {
    const { getByText } = render(<Button loading={true}>Click Me</Button>);
    const button = getByText("Click Me");

    expect(button).toBeDisabled();
    expect(button).toHaveClass("opacity-50 cursor-not-allowed");
  });

  it("is not disabled when not loading", () => {
    const { getByText } = render(<Button loading={false}>Click Me</Button>);
    const button = getByText("Click Me");

    expect(button).not.toBeDisabled();
    expect(button).not.toHaveClass("opacity-50 cursor-not-allowed");
  });

  it("does not call onClick when disabled", () => {
    const handleClick = jest.fn();

    const { getByText } = render(
      <Button loading={true} onClick={handleClick}>
        Click Me
      </Button>,
    );

    fireEvent.click(getByText("Click Me"));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
