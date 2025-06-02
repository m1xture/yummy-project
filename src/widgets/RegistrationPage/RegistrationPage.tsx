"use client";
import Link from "next/link";
import css from "./RegistrationPage.module.scss";
import { FormEvent, useState } from "react";
import { z } from "zod";
import clsx from "clsx";
import {
  useSigninMutation,
  useSignupMutation,
} from "@/redux/auth/authOperations";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/authSlice";
import saveRefreshToken from "@/features/auth/saveRefreshToken";

const FormSchema = z.object({
  name: z.string().min(2, "Name too short"),
  email: z.string().email(),
  password: z
    .string()
    .min(5, "Password too short")
    .max(21, "Password too long"),
});

type FormFields = z.infer<typeof FormSchema>;

const RegistrationPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [registr] = useSignupMutation();
  const [login] = useSigninMutation();
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormFields, string>>
  >({});

  const handleSumbit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const formData = new FormData(evt.currentTarget);

    const data = {
      name: (formData.get("name") as string) || "",
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
        await registr(data).unwrap();
        // {
        //   data: {
        //     accessToken: string;
        //     refreshToken: string;
        //     user: { name: string; email: string; avatarUrl: string };
        //   };
        // }
        const response = await login({
          email: data.email,
          password: data.password,
        }).unwrap();
        router.push("/");
        // console.log(response.data);
        dispatch(
          setUser({
            user: {
              ...response.data.user,
              accessToken: response.data.accessToken,
            },
          })
        );
        saveRefreshToken(response.data.refreshToken);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className={css.loginPage}>
      <div className={css.loginBox}>
        <div className={css.loginBlock}>
          <h2 className={css.loginTitle}>Registration</h2>
          <form className={css.loginForm} onSubmit={handleSumbit}>
            <div
              className={clsx(
                css.registrationNameBefore,
                errors.name && css.rigistartionErrorBefore
              )}
            >
              <input
                type="text"
                className={clsx(css.loginInput, errors.name && css.errorInput)}
                placeholder="Name"
                name="name"
              />
            </div>
            <div
              className={clsx(
                css.loginEmailBefore,
                errors.email && css.rigistartionErrorBefore
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
                errors.password && css.rigistartionErrorBefore
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
        <Link href="/start/login" className={css.loginLink}>
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default RegistrationPage;
