import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "../Counter";

describe("Counter Component", () => {
  test("initial state check", () => {
    //rendering of comp in isloation
    render(<Counter />);

    //selection
    const counterText = screen.getByText("Count is 0");
    const plusText = screen.getByText("+");
    const minusText = screen.getByText("-");

    // verifying
    expect(counterText).toBeInTheDocument();
    expect(plusText).toBeInTheDocument();
    expect(minusText).toBeInTheDocument();
  });

  test("inc by 1", () => {
    //rendering of comp in isloation
    render(<Counter />);

    //selection    
    const plusText = screen.getByText("+");
    fireEvent.click(plusText);
    
    const isOnePresent = screen.getByText("Count is 1");
    // verifying
    expect(isOnePresent).toBeInTheDocument();
  });

  test("dec by 1", () => {
    //rendering of comp in isloation
    render(<Counter />);

    //selection    
    const minusText = screen.getByText("-");
    fireEvent.click(minusText);
    
    const isMinusOnePresent = screen.getByText("Count is -1");

    // verifying
    expect(isMinusOnePresent).toBeInTheDocument();

  })

});
