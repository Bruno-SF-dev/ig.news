import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { createClient } from "../../services/prismic";
import { RichText } from "prismic-dom";

import styles from "./styles.module.scss";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
};

interface PostsComponentProps {
  posts: Post[];
  response: unknown;
}

export default function Posts({ response, posts }: PostsComponentProps) {
  console.log(response);

  return (
    <>
      <Head>
        <title>Posts | Ignews </title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map((post) => (
            <Link href={`posts/${post.slug}`} key={post.slug}>
              <a>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const client = createClient({ previewData });

  const response = await client.getAllByType("my-ignews-posts");

  const posts = response.map((post) => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.Title),
      excerpt:
        post.data.Content.find((content) => content.type === "paragraph")
          ?.text ?? "",
      updatedAt: new Date(post.last_publication_date).toLocaleDateString(
        "pt-BR",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        },
      ),
    };
  });

  return {
    props: { response, posts },
  };
};
