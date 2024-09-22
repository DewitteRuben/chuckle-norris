import { render, screen } from "@testing-library/react";
import PageHeader from "./PageHeader";

describe("PageHeader Component", () => {
  it("renders the title", () => {
    render(<PageHeader title="Test Title" />);

    const titleElement = screen.getByText("Test Title");
    expect(titleElement).toBeInTheDocument();
  });

  it("renders the subtitle when provided", () => {
    render(<PageHeader title="Test Title" subtitle="Test Subtitle" />);

    const subtitleElement = screen.getByText("Test Subtitle");
    expect(subtitleElement).toBeInTheDocument();
  });

  it("does not render the subtitle if not provided", () => {
    render(<PageHeader title="Test Title" />);

    const subtitleElement = screen.queryByText("Test Subtitle");
    expect(subtitleElement).not.toBeInTheDocument();
  });
});
