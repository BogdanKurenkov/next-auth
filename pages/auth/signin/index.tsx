import { NextPage } from "next";
import { ChangeEvent, FormEventHandler, useState } from "react";
import { signIn } from "next-auth/react";
import styles from "./style.module.css";

type InputType = "email" | "password";

const SignIn: NextPage = (): JSX.Element => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (userData.email && userData.password) {
      await signIn("credentials", {
        email: userData.email,
        password: userData.password,
        callbackUrl: "/",
      });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const type = e.target.type as InputType;
    setUserData((prev) => ({ ...prev, [type]: e.target.value }));
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.forTitle}>Login</h2>
        <input
          type="email"
          value={userData.email}
          onChange={(e) => handleChange(e)}
        />
        <input
          type="password"
          value={userData.password}
          onChange={(e) => handleChange(e)}
        />
        <input type="submit" defaultValue="login" />
      </form>
    </div>
  );
};

export default SignIn;
