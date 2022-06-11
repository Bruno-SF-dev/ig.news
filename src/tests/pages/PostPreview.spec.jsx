import { render, screen } from "@testing-library/react";
import Post, { getStaticProps } from "../../pages/posts/preview/[slug]";
import { createClient } from "../../services/prismic";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

jest.mock("../../services/prismic");
jest.mock("next-auth/react");
jest.mock("next/router");

const post = {
  slug: "post-test-1",
  title: "Post Test 1",
  content: "<p>Post Content Test 1</p>",
  updatedAt: "25 dez 2021",
};

describe("Post preview page", () => {
  it("renders correctly", () => {
    useSession.mockReturnValue({
      data: {
        activeSubscription: null,
      },
    });

    render(<Post post={post} />);

    expect(screen.getByText("Post Test 1")).toBeInTheDocument();
    expect(screen.getByText("Post Content Test 1")).toBeInTheDocument();
    expect(screen.getByText("Quer continuar lendo?")).toBeInTheDocument();
  });

  it("redirects user to full post when user is subscribed", async () => {
    const push = jest.fn();

    useSession.mockReturnValue({
      data: {
        activeSubscription: "fake-active",
      },
    });
    useRouter.mockReturnValue({
      push: push,
    });

    render(<Post post={post} />);

    expect(push).toBeCalledWith(`/posts/${post.slug}`);
  });

  it("loads initial data", async () => {
    createClient.mockReturnValue({
      getByUID: () => ({
        data: {
          Title: [
            {
              type: "heading",
              text: "Post test Title",
            },
          ],
          Content: [
            {
              type: "paragraph",
              text: "Post test Content",
            },
            {
              type: "paragraph",
              text: "Post test Content 2",
            },
          ],
        },
        last_publication_date: "01-01-2022",
      }),
    });

    const response = await getStaticProps({
      params: {
        slug: "fake-slug",
      },
    });

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: "fake-slug",
            title: "Post test Title",
            content: "<p>Post test Content</p><p>Post test Content 2</p>",
            updatedAt: "01 de janeiro de 2022",
          },
        },
        revalidate: 1800,
      }),
    );
  });
});
