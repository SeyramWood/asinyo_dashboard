import React from 'react'
import Link from "next/link";
import Image from "next/image";
import Spinner from "react-svg-spinner";

import gb from "../public/login.svg";
import { TextField } from "../components/common/input";
import useFormValidation from '../components/common/form/useFormValidation'
const AsinyoSignin = () => {
  const {
    state,
    isSubmitting,
    errors,
    updateIsSubmitting,
    handleChange,
    handleBlur,
    handleKeyDown,
    handleSubmit,
    setServerErrors
  } = useFormValidation({
    merchantType: false,
    username: "",
    password: "",
  }, {
    merchantType: "required",
    username: "required|email_phone",
    password: "required|min:8",
  }, signinMerchant);


  async function signinMerchant() {
    Axios
      .post(`/auth/signin`, state, {
        headers: {
          "Asinyo-Authorization-Type": state.merchantType
        }
      })
      .then(({ data }) => {
        if (data.asinyo_remember) {
          Cookies.set(process.env.NEXT_PUBLIC_API_TOKEN_NAME, data.asinyo_remember, { expires: 60 })
          Axios.defaults.headers.Authorization = `Bearer ${data.asinyo_remember}`
          Axios.get(`/auth/user`).then(({ data }) => {
            setUser((state) => state = { ...data.data, IsAuthourized: true })
            router.back()
            updateIsSubmitting(false);
          }).catch((err) => {
            console.log(err);
          })
        }
      })
      .catch((err) => {
        updateIsSubmitting(false);
        if (err['response']) {

          if (err.response.status === 422) {
            setServerErrors(err.response.data)
          }
          else if (err.response.status === 401) {
            toast.current.show({
              msg: err.response.data.error,
              type: 'danger',
              time: 8000,
            })
          }
          else if (err.response.status === 404) {
            toast.current.show({
              msg: err.response.data.error,
              type: 'danger',
              time: 8000,
            })
          }
          else if (err.response.status === 429) {
            toast.current.show({
              msg: "Too Many Requests! Wait for some few minutes and try again.",
              type: 'warning',
              time: 8000,
            })
          }
          else if (err.response.status === 500) {
            toast.current.show({
              msg: "Ooops! Something went wrog, please refresh and try again.",
              type: 'danger',
              time: 8000,
            })
          }
          else {
            console.trace(err);
          }
        }
        else {
          console.trace(err);
        }
      });



  }
  return (
    <main className="login__page">
      <div className="login__page__left">
        <div className="login__page__left__form__wrapper">
          <form onSubmit={handleSubmit} className="asinyo__account__wrapper__panel__form" >
            <TextField
              label="Username"
              id="username"
              placeholder="user@example.com"
              type="email"
              name="username"
              value={state.username}
              errors={errors.username}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
            />
            <TextField
              label="Password"
              placeholder="Enter password"
              name="password"
              type="password"
              value={state.password}
              errors={errors.password}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
            />
            <button type="submit" className="account__btn mt-3" disabled={isSubmitting}>
              {isSubmitting ? <Spinner color="white" thickness={3} size="32px" /> : "sign in"}
            </button>
            <div className="forgot__password">
              <Link href="/auth/merchant/forgot-password">
                <a>forgot password?</a>
              </Link>
            </div>
          </form>
        </div>
      </div>
      <div className="login__page__right">
        <div className="login__page__right__image">
          <div className="login__page__right__image__wrapper">
            <Image src={gb} alt="logo" />
          </div>
        </div>
        <article className='login__page__right__cta'>
          <h1>Asinyo</h1>
          <h3>Connect</h3>
          <h3>Trade</h3>
          <h3>Earn</h3>
        </article>
      </div>
    </main>
  )
}

export default AsinyoSignin