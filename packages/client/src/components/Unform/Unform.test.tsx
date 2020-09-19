import React from "react";
import { render } from "@testing-library/react";
import Unform, { UnformProps } from "./Unform";

const sharedProps: UnformProps<unknown> = {
  onSubmit: () => {},
  children: <>Form Fields</>,
};

describe("The <Unform /> tests", () => {
  it("Should match the snapshot", () => {
    const { container } = render(<Unform {...sharedProps} />);
    expect(container).toMatchSnapshot();
  });
});
