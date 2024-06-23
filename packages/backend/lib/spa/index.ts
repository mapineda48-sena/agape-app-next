import express from "express";

export default async function next() {
  return new Promise<express.Router>((res) => {
    const router = express.Router();

    res(router);
  });
}
