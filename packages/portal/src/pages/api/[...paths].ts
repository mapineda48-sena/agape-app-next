//import type { NextApiRequest, NextApiResponse } from 'next'

// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse
// ) {
//     try {
//         const result = await someAsyncOperation()
//         res.status(200).json("Hello Worlds")
//     } catch (err) {
//         res.status(500).json({ error: 'failed to load data' })
//     }
// }

// function someAsyncOperation() {
//     return new Promise<void>((res, rej) => {
//         setTimeout(() => res(), 500)
//     })
// }


import express from "../../../lib";

export default express;

export const config = {
    api: {
        bodyParser: false
    }
}