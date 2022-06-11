import { render, screen } from "@testing-library/react";
import Home, { getStaticProps } from "../../pages";
import { stripe } from "../../services/stripe";

jest.mock("next/image");

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

jest.mock("../../services/stripe");

describe("Home page", () => {
  const amount = "R$10,00";

  it("renders correctly", () => {
    render(
      <Home
        product={{
          priceId: "fake-price-id",
          amount: amount,
        }}
      />,
    );

    expect(screen.getByText(`por ${amount} por mês`)).toBeInTheDocument();
  });

  it("loads initial data", async () => {
    stripe.prices.retrieve.mockResolvedValueOnce({
      id: "fake-price-id",
      unit_amount: 1000,
    });

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          product: {
            priceId: "fake-price-id",
            amount: "R$\xa010,00",
          },
        },
      }),
    );
  });
});
