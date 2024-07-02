// Función para mantener las dependencias de node_modules como externas
import fs from "fs-extra";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { dev, isServer }) => {
    if (!dev && isServer) {
      config.externals = [nodeExternals, ...config.externals];
    } else {
      config.externals = [nodeExternalsDev, ...config.externals];
    }
    // Important: return the modified config
    return config;
  },
};

export default nextConfig;

function nodeExternals({ request }, callback) {
  if (request.startsWith("backend")) {
    return callback(null, "commonjs " + request);
  }

  callback();
}

function nodeExternalsDev({ request }, callback) {
  if (request.startsWith("fs-extra")) {
    return callback(null, "commonjs " + request);
  }

  callback();
}
