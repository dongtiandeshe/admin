/*
 * @Description: 
 * @Author: DYT
 * @Date: 2025-11-26 10:04:20
 * @LastEditTime: 2026-08-27 15:18:39
 * @LastEditors: Duanyt
 */
import { defineConfig } from 'vite'     // 获取类型定义函数
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  root: '.', // 项目根目录
  base: '/', // 公共基础路径
  // mode: 'development', // development生产模式，production生产模式
  define: {}, // 定义全局常量替换方式
  plugins: [react()], // 使用React插件，插件数组  
  // publicDir: 'public', // 静态资源服务文件夹，默认是public  
  // cacheDir: 'node_modules/.vite', // 存储缓存文件的目录，默认"node_modules/.vite"
  resolve:{
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  server: {
    host: '0.0.0.0', // 指定服务器应该监听哪个 IP 地址。 如果将此设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址。
    // allowedHosts: [],       //Vite允许响应的主机名。
    port: 5173, // 端口号 
    strictPort: false, // 如果端口已被占用，是否退出，而不是尝试启动下一个端口号  
    // https: false, // 是否启用 HTTPS，这里没看懂
    open: true, // 启动服务器时自动在浏览器中打开应用程序，或者指定要打开的路径
    proxy: {    //自定义代理规则

    },
    // cors: { origin: /^https?:\/\/(?:(?:[^:]+\.)?localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/ }, // 允许跨域 类型为boolean | CorsOptions
    headers: {}, // 自定义请求响应头，指定服务器响应的 header. 
    hmr: {    //禁用或配置 HMR 连接（用于 HMR websocket 必须使用不同的 http 服务器地址的情况）
    },
    //等等都是不太常见的，等有用到再加上来吧。
  },
  build: {
    target: 'modules', // 设置最终构建的浏览器兼容目标。数组类型或者字符串类型
    modulePreload: {  // 构建时启用或禁用模块预加载
      polyfill: true, // 是否启用模块预加载的 polyfill
    }, 
    outDir: 'dist', // 指定输出路径
    assetsDir: 'assets', // 指定生成静态资源的存放路径
    cssCodeSplit: true, // 启用/禁用 CSS 代码拆分，如果禁用，整个项目的 CSS 将被提取到一个文件中
    sourcemap: false, // 构建后是否生成 source map 文件，boolean | 'inline' | 'hidden'
    rollupOptions: { // 自定义底层的 Rollup 打包配置
    },
    minify: 'esbuild', // 指定用于压缩的工具。 'esbuild' | 'terser' | true | false，当使用terser的时候，需要安装terser依赖  
    terserOptions: { // 传递给 Terser 的更多压缩选项
    },
  },
  preview: {},
  optimizeDeps: {}
})