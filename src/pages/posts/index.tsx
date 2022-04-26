import Head from "next/head";
import Link from "next/link";

import styles from "./styles.module.scss";

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | Ignews </title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <div>
            <Link href="/">
              <a>
                <time>12 de Março de 2021</time>
                <strong>
                  Creating a Monorepo with Lerna & Yarn Workspaces
                </strong>
                <p>
                  In this guide, you will learn how to create a Monorepo to
                  manage multiple packages with a shared build, test, and
                  release process.
                </p>
              </a>
            </Link>
          </div>
          <div>
            <Link href="/">
              <a>
                <time>12 de Março de 2021</time>
                <strong>
                  Creating a Monorepo with Lerna & Yarn Workspaces
                </strong>
                <p>
                  In this guide, you will learn how to create a Monorepo to
                  manage multiple packages with a shared build, test, and
                  release process.
                </p>
              </a>
            </Link>
          </div>
          <div>
            <Link href="/">
              <a>
                <time>12 de Março de 2021</time>
                <strong>
                  Creating a Monorepo with Lerna & Yarn Workspaces
                </strong>
                <p>
                  In this guide, you will learn how to create a Monorepo to
                  manage multiple packages with a shared build, test, and
                  release process.
                </p>
              </a>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
