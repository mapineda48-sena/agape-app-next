import fs from "fs-extra";
import { dependencies as backend } from "./package.json";
import { dependencies as frontend } from "../portal/package.json";
import { name, version } from "../../package.json";

fs.outputJSONSync(
  "dist/package.json",
  {
    name,
    version,
    private: true,
    scripts: {
      start: "node -r module-alias/register bin/cluster.js",
    },
    dependencies: {
      ...frontend,
      ...backend,
      ["module-alias"]: "2.2.3"
    },
    "_moduleAliases": {
      "backend": ".", // Application's root
    }
  },
  { spaces: 2 }
);

fs.outputFileSync("dist/service/auth.js", "");

fs.copySync("../portal/.next", "dist/.next", { overwrite: true });
fs.copySync("../portal/public", "dist/public", { overwrite: true });
fs.copySync("../portal/index.js", "dist/lib/spa/index.js", { overwrite: true });

fs.copySync("dist", "../../dist", { overwrite: true });




