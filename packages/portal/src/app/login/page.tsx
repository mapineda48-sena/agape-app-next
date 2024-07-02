import { URLPattern } from 'next/server';
import * as auth from "backend/service/auth";
import LoginForm from "./page.client";

export default async function Example() {
  console.log(URLPattern)

  return <LoginForm />;
}
