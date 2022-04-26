import Link from "next/link";
import { SignInButton } from "../SignInButton";

import styles from "./styles.module.scss";

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="ig.news" />
        <nav>
          <Link href="/">
            <a className={styles.active}>Início</a>
          </Link>
          <Link href="/posts">
            <a>Postagens</a>
          </Link>
        </nav>
        <SignInButton />
      </div>
    </header>
  );
}
