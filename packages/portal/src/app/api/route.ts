// pages/api/datos.ts

import { login } from "backend/service/auth";
import { NextResponse } from "next/server";

type Data = {
  objeto1: Record<string, unknown>;
  objeto2: Record<string, unknown>;
};

type ApiResponse = {
  status: string;
  data?: Data;
  message?: string;
};

export const dynamic = "force-dynamic"; // defaults to auto

// https://stackoverflow.com/questions/75418329/how-do-you-put-api-routes-in-the-new-app-folder-of-next-js

export const POST =
  process.env.NODE_ENV === "production"
    ? null
    : async (req: Request) => {
        try {
          await login(await req.json());
        } catch {}
        return Response.json(null);
      };

