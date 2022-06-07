import { render } from "@testing-library/react";
import { Header } from ".";

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
    const { getByText } = render(<Header />);

    expect(getByText("Início")).toBeInTheDocument();
    expect(getByText("Posts")).toBeInTheDocument();
  });
});
