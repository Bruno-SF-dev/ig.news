import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";

import { query as q } from "faunadb";
import { RichText } from "prismic-dom";

import { fauna } from "../../services/fauna";
import { createClient } from "../../services/prismic";

import styles from "./post.module.scss";

interface PostComponentProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
  response: unknown;
}

export default function Post({ post, response }: PostComponentProps) {
  console.log(response);
  console.log(post);

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div
            className={styles.postContent}
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>
        </article>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const session = await getSession({ req });
  const { slug } = params;

  // if(!session) {

  // }

  const client = createClient({ req });

  const response = await client.getByUID("my-ignews-posts", String(slug), {});

  const post = {
    slug,
    title: RichText.asText(response.data.Title),
    content: RichText.asHtml(response.data.Content),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      },
    ),
  };

  return {
    props: { response, post },
  };
};
