import { render, screen } from "@testing-library/react";
import Home from "../../pages";

jest.mock("next-auth/react", () => {
  return {
    useSession: () => {
      return {
        data: null,
        status: "unauthenticated",
      };
    },
  };
});

describe("Home page", () => {
  const amount = "R$10,00";

  it("renders correctly", () => {
    render(
      <Home
        product={{
          priceId: "fake-priceId",
          amount: amount,
        }}
      />,
    );

    expect(screen.getByText(`por ${amount} por mês`)).toBeInTheDocument();
  });
});
