import { render, screen } from "@testing-library/react";
import Posts, { getStaticProps } from "../../pages/posts";
import { createClient } from "../../services/prismic";

jest.mock("next-auth/react", () => {
  return {
    useSession: jest.fn(() => {
      return {
        data: null,
        status: "unauthenticated",
      };
    }),
  };
});

jest.mock("../../services/prismic");

const posts = [
  {
    slug: "post-test-1",
    title: "Post Test 1",
    excerpt: "Excerpt Test 1",
    updatedAt: "25 dez 2021",
  },
  {
    slug: "post-test-2",
    title: "Post Test 2",
    excerpt: "Excerpt Test 2",
    updatedAt: "25 dez 2021",
  },
];

describe("Posts page", () => {
  it("renders correctly", () => {
    render(<Posts posts={posts} />);

    expect(screen.getByText("Post Test 1")).toBeInTheDocument();
    expect(screen.getByText("Post Test 2")).toBeInTheDocument();
  });

  it("loads initial data", async () => {
    createClient.mockReturnValueOnce({
      getAllByType: () => [
        {
          uid: "post-test-3",
          data: {
            Title: [
              {
                type: "heading",
                text: "Post Test 3",
              },
            ],
            Content: [
              {
                type: "paragraph",
                text: "Content Test 3",
              },
            ],
          },
          last_publication_date: "01-01-2022",
        },
      ],
    });

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: "post-test-3",
              title: "Post Test 3",
              excerpt: "Content Test 3",
              updatedAt: "01 de janeiro de 2022",
            },
          ],
        },
      }),
    );
  });
});
