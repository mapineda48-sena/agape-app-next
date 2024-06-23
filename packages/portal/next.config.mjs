/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { dev, isServer }) => {
    if (!dev && isServer) {
      config.externals = [nodeExternals, ...config.externals];
    }
    // Important: return the modified config
    return config;
  },
};

export default nextConfig;

// Función para mantener las dependencias de node_modules como externas

function nodeExternals({ context, request }, callback) {
  if (request.startsWith("backend")) {
    return callback(null, "commonjs " + request);
  }

  callback();
}
