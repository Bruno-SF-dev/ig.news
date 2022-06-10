import { render, fireEvent, screen } from "@testing-library/react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { SubscribeButton } from ".";

jest.mock("next-auth/react");
jest.mock("next/router");

describe("SubscribeButton component", () => {
  it("renders correctly", () => {
    useSession.mockReturnValue({
      data: null,
      status: "unauthenticated",
    });

    render(<SubscribeButton />);

    expect(screen.getByText("Inscreva-se agora")).toBeInTheDocument();
  });

  it("redirects user to sign in whent not authenticated", () => {
    useSession.mockReturnValue({
      data: null,
      status: "unauthenticated",
    });

    render(<SubscribeButton />);

    fireEvent.click(screen.getByText("Inscreva-se agora"));

    expect(signIn).toHaveBeenCalledWith("github");
  });

  it("redirects user to posts whent has a subscription", () => {
    const push = jest.fn();

    useSession.mockReturnValue({
      data: {
        user: {
          name: "John Doe",
          email: "john.doe@example.com",
        },
        expires: "1d",
        activeSubscription: "active-subscription-fake",
      },
      status: "authenticated",
    });

    useRouter.mockReturnValue({
      push,
    });

    render(<SubscribeButton />);

    fireEvent.click(screen.getByText("Inscreva-se agora"));

    expect(push).toHaveBeenCalledWith("/posts");
  });
});
