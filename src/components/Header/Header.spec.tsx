import { render, screen } from "@testing-library/react";
import { Header } from ".";

jest.mock("next/image");

jest.mock("next/router", () => {
  return {
    useRouter() {
      return {
        pathname: "/",
      };
    },
  };
});

jest.mock("next-auth/react", () => {
  return {
    useSession() {
      return [null, false];
    },
  };
});

describe("Header component", () => {
  it("renders correctly", () => {
    render(<Header />);

    expect(screen.getByText("Início")).toBeInTheDocument();
    expect(screen.getByText("Posts")).toBeInTheDocument();
  });
});
