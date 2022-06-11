import { render, screen } from "@testing-library/react";
import { getSession } from "next-auth/react";
import Post, { getServerSideProps } from "../../pages/posts/[slug]";
import { createClient } from "../../services/prismic";

jest.mock("next-auth/react");
jest.mock("../../services/prismic");

const post = {
  slug: "post-test-1",
  title: "Post Test 1",
  content: "<p>Content Test 1</p>",
  updatedAt: "25 dez 2021",
};

describe("Post page", () => {
  it("renders correctly", () => {
    render(<Post post={post} />);

    expect(screen.getByText("Post Test 1"));
    expect(screen.getByText("Content Test 1"));
  });

  it("redirects user if no subscription is found", async () => {
    getSession.mockResolvedValueOnce({
      activeSubscription: null,
    });

    const response = await getServerSideProps({
      params: {
        slug: "fake-slug",
      },
    });

    expect(response).toEqual(
      expect.objectContaining({
        redirect: {
          destination: "/",
          permanent: false,
        },
      }),
    );
  });

  it("loads initial data", async () => {
    getSession.mockResolvedValueOnce({
      activeSubscription: "fake-subscription-active",
    });

    createClient.mockReturnValueOnce({
      getByUID: () => ({
        data: {
          Title: [
            {
              type: "paragraph",
              text: "Post Test 2",
            },
          ],
          Content: [
            {
              type: "paragraph",
              text: "Content Test 2",
            },
          ],
        },
        last_publication_date: "01-01-2022",
      }),
    });

    const response = await getServerSideProps({
      params: {
        slug: "fake-slug",
      },
    });

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: "fake-slug",
            title: "Post Test 2",
            content: "<p>Content Test 2</p>",
            updatedAt: "01 de janeiro de 2022",
          },
        },
      }),
    );
  });
});
