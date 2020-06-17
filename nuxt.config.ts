export default {
  env: {},
  head: {
    title: "banking-system",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Nuxt.js TypeScript project" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }
    ]
  },
  loading: { color: "#3B8070" },
  css: [{ src: "ant-design-vue/dist/antd.less", lang: "less" }, "~/assets/styles/index.css"],
  build: {
    postcss: {
      plugins: {
        "postcss-preset-env": {
          autoprefixer: {
            grid: true,
          },
        },
      },
    },
    loaders: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          "primary-color": "RGB(88,86,120)",
          "layout-header-background": "RGB(67,66,93)",
          "border-radius-base": "0px",
        },
      },
    },
  },
  buildModules: ["@nuxt/typescript-build"],
  modules: [
    "@nuxtjs/axios",
  ],
  plugins: [
    "~/plugins/antd",
  ],
  axios: {}
}
