"use client";
import Link from "next/link";
import css from "./LoginPage.module.scss";
import { z } from "zod";
import clsx from "clsx";
import { useSigninMutation } from "@/redux/auth/authOperations";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/authSlice";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import saveRefreshToken from "@/features/auth/saveRefreshToken";

const FormSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(5, "Password too short")
    .max(21, "Password too long"),
});

type FormFields = z.infer<typeof FormSchema>;

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [login] = useSigninMutation();
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormFields, string>>
  >({});

  const handleSumbit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const formData = new FormData(evt.currentTarget);

    const data = {
      email: (formData.get("email") as string) || "",
      password: (formData.get("password") as string) || "",
    };

    const result = FormSchema.safeParse(data);

    if (!result.success) {
      const fieldErrors: typeof errors = {};
      result.error.errors.forEach((err) => {
        console.log("err", err);
        const field = err.path[0] as keyof FormFields;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
    } else {
      setErrors({});
      try {
        const response = await login({
          email: data.email,
          password: data.password,
        }).unwrap();
        console.log(response)
        router.push("/");
        dispatch(
          setUser({
            user: {
              ...response.user,
              accessToken: response.accessToken,
            },
          })
        );
        saveRefreshToken(response.refreshToken);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className={css.loginPage}>
      <div className={css.loginBox}>
        <div className={css.loginBlock}>
          <h2 className={css.loginTitle}>Sign In</h2>
          <form className={css.loginForm} onSubmit={handleSumbit}>
            <div
              className={clsx(
                css.loginEmailBefore,
                errors.email && css.loginErrorAfter
              )}
            >
              <input
                type="text"
                className={clsx(css.loginInput, errors.email && css.errorInput)}
                placeholder="Email"
                name="email"
              />
            </div>
            <div
              className={clsx(
                css.loginPasswordBefore,
                errors.password && css.loginErrorAfter
              )}
            >
              <input
                type="text"
                className={clsx(
                  css.loginInput,
                  errors.password && css.errorInput
                )}
                placeholder="Password"
                name="password"
              />
            </div>
            <button type="submit" className={css.loginBtn}>
              Sign In
            </button>
          </form>
        </div>
        <Link href="/start/registration" className={css.loginLink}>
          Registration
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
