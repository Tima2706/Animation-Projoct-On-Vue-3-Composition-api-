// vite.config.ts
import vueDevTools from "file:///C:/Users/mardo/OneDrive/Desktop/DT/RKP/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
import path from "path";
import { defineConfig } from "file:///C:/Users/mardo/OneDrive/Desktop/DT/RKP/node_modules/vite/dist/node/index.js";
import svgLoader from "file:///C:/Users/mardo/OneDrive/Desktop/DT/RKP/node_modules/vite-svg-loader/index.js";
import Vue from "file:///C:/Users/mardo/OneDrive/Desktop/DT/RKP/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import Pages from "file:///C:/Users/mardo/OneDrive/Desktop/DT/RKP/node_modules/vite-plugin-pages/dist/index.mjs";
import Layouts from "file:///C:/Users/mardo/OneDrive/Desktop/DT/RKP/node_modules/vite-plugin-vue-layouts/dist/index.mjs";
import Components from "file:///C:/Users/mardo/OneDrive/Desktop/DT/RKP/node_modules/unplugin-vue-components/dist/vite.mjs";
import AutoImport from "file:///C:/Users/mardo/OneDrive/Desktop/DT/RKP/node_modules/unplugin-auto-import/dist/vite.js";
import Markdown from "file:///C:/Users/mardo/OneDrive/Desktop/DT/RKP/node_modules/vite-plugin-vue-markdown/dist/index.mjs";
import { VitePWA } from "file:///C:/Users/mardo/OneDrive/Desktop/DT/RKP/node_modules/vite-plugin-pwa/dist/index.mjs";
import VueI18n from "file:///C:/Users/mardo/OneDrive/Desktop/DT/RKP/node_modules/@intlify/unplugin-vue-i18n/lib/vite.mjs";
import VueMacros from "file:///C:/Users/mardo/OneDrive/Desktop/DT/RKP/node_modules/unplugin-vue-macros/dist/vite.mjs";
import { AntDesignVueResolver } from "file:///C:/Users/mardo/OneDrive/Desktop/DT/RKP/node_modules/unplugin-vue-components/dist/resolvers.mjs";
var __vite_injected_original_dirname = "C:\\Users\\mardo\\OneDrive\\Desktop\\DT\\RKP";
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "~/": `${path.resolve(__vite_injected_original_dirname, "src")}/`
    }
  },
  plugins: [
    vueDevTools(),
    // Preview.default(),
    VueMacros({
      plugins: {
        vue: Vue({
          include: [/\.vue$/, /\.md$/],
          reactivityTransform: true
        })
      }
    }),
    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      extensions: ["vue"],
      extendRoute(route) {
        const routeName = route.name || "";
        const middleware = [];
        const routeWithMiddleware = {
          ...route,
          meta: {
            middleware,
            ...route.meta || {}
          }
        };
        if (!routeName.includes("auth") && !routeName.includes("public") && !routeName.includes("register"))
          return routeWithMiddleware;
      }
    }),
    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        "vue",
        "vue-router",
        "vue-i18n",
        "vue/macros",
        "@vueuse/head",
        "@vueuse/core"
      ],
      dts: "src/auto-imports.d.ts",
      dirs: ["src/composables", "src/stores"],
      vueTemplate: true
    }),
    // https://github.com/antfu/unplugin-vue-components
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ["vue", "md"],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: "src/components.d.ts",
      resolvers: [AntDesignVueResolver({ importLess: true })]
    }),
    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    // https://github.com/antfu/vite-plugin-vue-markdown
    // Don't need this? Try vitesse-lite: https://github.com/antfu/vitesse-lite
    Markdown({
      wrapperClasses: "prose prose-sm m-auto text-left",
      headEnabled: true,
      markdownItSetup() {
      }
    }),
    // https://github.com/antfu/vite-plugin-pwa
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "logo.svg"],
      manifest: {
        name: "DT",
        short_name: "DT",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/logo.svg",
            sizes: "192x192",
            type: "image/svg"
          },
          {
            src: "/logo.svg",
            sizes: "512x512",
            type: "image/svg"
          },
          {
            src: "/logo.svg",
            sizes: "512x512",
            type: "image/svg",
            purpose: "any maskable"
          }
        ]
      }
    }),
    // https://www.npmjs.com/package/vite-svg-loader
    svgLoader(),
    // https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      fullInstall: true,
      include: [path.resolve(__vite_injected_original_dirname, "locales/**")]
    })
    // https://github.com/antfu/vite-plugin-inspect
    // Visit http://localhost:3333/__inspect/ to see the inspector
    // Inspect(),
    // https://github.com/webfansplz/vite-plugin-vue-inspector
    // Inspector({
    //   toggleButtonVisibility: 'never',
    // }),
  ],
  // https://github.com/vitest-dev/vitest
  // test: {
  //   include: ['test/**/*.test.ts'],
  //   environment: 'jsdom',
  //   deps: {
  //     inline: ['@vue', '@vueuse'],
  //   },
  // },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          "primary-color": "#0096B2",
          "link-color": "#0096B2"
        },
        javascriptEnabled: true
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxtYXJkb1xcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXERUXFxcXFJLUFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcbWFyZG9cXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxEVFxcXFxSS1BcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL21hcmRvL09uZURyaXZlL0Rlc2t0b3AvRFQvUktQL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHZ1ZURldlRvb2xzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1kZXZ0b29scydcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuLy8gaW1wb3J0IFByZXZpZXcgZnJvbSAndml0ZS1wbHVnaW4tdnVlLWNvbXBvbmVudC1wcmV2aWV3J1xyXG5pbXBvcnQgc3ZnTG9hZGVyIGZyb20gJ3ZpdGUtc3ZnLWxvYWRlcidcclxuaW1wb3J0IFZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCBQYWdlcyBmcm9tICd2aXRlLXBsdWdpbi1wYWdlcydcclxuaW1wb3J0IExheW91dHMgZnJvbSAndml0ZS1wbHVnaW4tdnVlLWxheW91dHMnXHJcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXHJcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXHJcbmltcG9ydCBNYXJrZG93biBmcm9tICd2aXRlLXBsdWdpbi12dWUtbWFya2Rvd24nXHJcbmltcG9ydCB7IFZpdGVQV0EgfSBmcm9tICd2aXRlLXBsdWdpbi1wd2EnXHJcbmltcG9ydCBWdWVJMThuIGZyb20gJ0BpbnRsaWZ5L3VucGx1Z2luLXZ1ZS1pMThuL3ZpdGUnXHJcbi8vIGltcG9ydCBJbnNwZWN0IGZyb20gJ3ZpdGUtcGx1Z2luLWluc3BlY3QnXHJcbi8vIGltcG9ydCBJbnNwZWN0b3IgZnJvbSAndml0ZS1wbHVnaW4tdnVlLWluc3BlY3RvcidcclxuaW1wb3J0IFZ1ZU1hY3JvcyBmcm9tICd1bnBsdWdpbi12dWUtbWFjcm9zL3ZpdGUnXHJcbmltcG9ydCB7IEFudERlc2lnblZ1ZVJlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJ1xyXG5pbXBvcnQgdHlwZSB7IFRSb3V0ZU1pZGRsZXdhcmUgfSBmcm9tICd+L3R5cGVzJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICAnfi8nOiBgJHtwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyl9L2AsXHJcbiAgICB9LFxyXG4gIH0sXHJcblxyXG4gIHBsdWdpbnM6IFtcclxuICAgIHZ1ZURldlRvb2xzKCksXHJcblxyXG4gICAgLy8gUHJldmlldy5kZWZhdWx0KCksXHJcbiAgICBWdWVNYWNyb3Moe1xyXG4gICAgICBwbHVnaW5zOiB7XHJcbiAgICAgICAgdnVlOiBWdWUoe1xyXG4gICAgICAgICAgaW5jbHVkZTogWy9cXC52dWUkLywgL1xcLm1kJC9dLFxyXG4gICAgICAgICAgcmVhY3Rpdml0eVRyYW5zZm9ybTogdHJ1ZSxcclxuICAgICAgICB9KSxcclxuICAgICAgfSxcclxuICAgIH0pLFxyXG5cclxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9oYW5ub2VydS92aXRlLXBsdWdpbi1wYWdlc1xyXG4gICAgUGFnZXMoe1xyXG4gICAgICBleHRlbnNpb25zOiBbJ3Z1ZSddLFxyXG4gICAgICBleHRlbmRSb3V0ZShyb3V0ZSkge1xyXG4gICAgICAgIGNvbnN0IHJvdXRlTmFtZTogc3RyaW5nID0gcm91dGUubmFtZSB8fCAnJ1xyXG4gICAgICAgIGNvbnN0IG1pZGRsZXdhcmU6IFRSb3V0ZU1pZGRsZXdhcmVbXSA9IFtdXHJcbiAgICAgICAgY29uc3Qgcm91dGVXaXRoTWlkZGxld2FyZTogYW55ID0ge1xyXG4gICAgICAgICAgLi4ucm91dGUsXHJcbiAgICAgICAgICBtZXRhOiB7XHJcbiAgICAgICAgICAgIG1pZGRsZXdhcmUsXHJcbiAgICAgICAgICAgIC4uLihyb3V0ZS5tZXRhIHx8IHt9KSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAhcm91dGVOYW1lLmluY2x1ZGVzKCdhdXRoJylcclxuICAgICAgICAgICYmICFyb3V0ZU5hbWUuaW5jbHVkZXMoJ3B1YmxpYycpXHJcbiAgICAgICAgICAmJiAhcm91dGVOYW1lLmluY2x1ZGVzKCdyZWdpc3RlcicpXHJcbiAgICAgICAgKVxyXG4gICAgICAgICAgLy8gbWlkZGxld2FyZS5wdXNoKCdhdXRoTWlkZGxld2FyZScpXHJcblxyXG4gICAgICAgIC8vIG1pZGRsZXdhcmUucHVzaCgnb3JnYW5pemF0aW9uTWlkZGxld2FyZScpXHJcbiAgICAgICAgLy8gbWlkZGxld2FyZS5wdXNoKCdwZXJtaXNzaW9uTWlkZGxld2FyZScpXHJcblxyXG4gICAgICAgIC8vIGNvbnN0IGlubGluZU1pZGRsZXdhcmUgPSByb3V0ZS5tZXRhPy5taWRkbGV3YXJlIGFzIFRSb3V0ZU1pZGRsZXdhcmVbXVxyXG4gICAgICAgIC8vIGlmIChpbmxpbmVNaWRkbGV3YXJlKVxyXG4gICAgICAgIC8vICAgbWlkZGxld2FyZS5wdXNoKC4uLmlubGluZU1pZGRsZXdhcmUpXHJcblxyXG4gICAgICAgIHJldHVybiByb3V0ZVdpdGhNaWRkbGV3YXJlXHJcbiAgICAgIH0sXHJcbiAgICB9KSxcclxuXHJcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vSm9obkNhbXBpb25Kci92aXRlLXBsdWdpbi12dWUtbGF5b3V0c1xyXG4gICAgTGF5b3V0cygpLFxyXG5cclxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbnRmdS91bnBsdWdpbi1hdXRvLWltcG9ydFxyXG4gICAgQXV0b0ltcG9ydCh7XHJcbiAgICAgIGltcG9ydHM6IFtcclxuICAgICAgICAndnVlJyxcclxuICAgICAgICAndnVlLXJvdXRlcicsXHJcbiAgICAgICAgJ3Z1ZS1pMThuJyxcclxuICAgICAgICAndnVlL21hY3JvcycsXHJcbiAgICAgICAgJ0B2dWV1c2UvaGVhZCcsXHJcbiAgICAgICAgJ0B2dWV1c2UvY29yZScsXHJcbiAgICAgIF0sXHJcbiAgICAgIGR0czogJ3NyYy9hdXRvLWltcG9ydHMuZC50cycsXHJcbiAgICAgIGRpcnM6IFsnc3JjL2NvbXBvc2FibGVzJywgJ3NyYy9zdG9yZXMnXSxcclxuICAgICAgdnVlVGVtcGxhdGU6IHRydWUsXHJcbiAgICB9KSxcclxuXHJcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW50ZnUvdW5wbHVnaW4tdnVlLWNvbXBvbmVudHNcclxuICAgIENvbXBvbmVudHMoe1xyXG4gICAgICAvLyBhbGxvdyBhdXRvIGxvYWQgbWFya2Rvd24gY29tcG9uZW50cyB1bmRlciBgLi9zcmMvY29tcG9uZW50cy9gXHJcbiAgICAgIGV4dGVuc2lvbnM6IFsndnVlJywgJ21kJ10sXHJcbiAgICAgIC8vIGFsbG93IGF1dG8gaW1wb3J0IGFuZCByZWdpc3RlciBjb21wb25lbnRzIHVzZWQgaW4gbWFya2Rvd25cclxuICAgICAgaW5jbHVkZTogWy9cXC52dWUkLywgL1xcLnZ1ZVxcP3Z1ZS8sIC9cXC5tZCQvXSxcclxuICAgICAgZHRzOiAnc3JjL2NvbXBvbmVudHMuZC50cycsXHJcbiAgICAgIHJlc29sdmVyczogW0FudERlc2lnblZ1ZVJlc29sdmVyKHsgaW1wb3J0TGVzczogdHJ1ZSB9KV0sXHJcbiAgICB9KSxcclxuXHJcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW50ZnUvdW5vY3NzXHJcbiAgICAvLyBzZWUgdW5vY3NzLmNvbmZpZy50cyBmb3IgY29uZmlnXHJcblxyXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FudGZ1L3ZpdGUtcGx1Z2luLXZ1ZS1tYXJrZG93blxyXG4gICAgLy8gRG9uJ3QgbmVlZCB0aGlzPyBUcnkgdml0ZXNzZS1saXRlOiBodHRwczovL2dpdGh1Yi5jb20vYW50ZnUvdml0ZXNzZS1saXRlXHJcbiAgICBNYXJrZG93bih7XHJcbiAgICAgIHdyYXBwZXJDbGFzc2VzOiAncHJvc2UgcHJvc2Utc20gbS1hdXRvIHRleHQtbGVmdCcsXHJcbiAgICAgIGhlYWRFbmFibGVkOiB0cnVlLFxyXG4gICAgICBtYXJrZG93bkl0U2V0dXAoKSB7fSxcclxuICAgIH0pLFxyXG5cclxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbnRmdS92aXRlLXBsdWdpbi1wd2FcclxuICAgIFZpdGVQV0Eoe1xyXG4gICAgICByZWdpc3RlclR5cGU6ICdhdXRvVXBkYXRlJyxcclxuICAgICAgaW5jbHVkZUFzc2V0czogWydmYXZpY29uLnN2ZycsICdsb2dvLnN2ZyddLFxyXG4gICAgICBtYW5pZmVzdDoge1xyXG4gICAgICAgIG5hbWU6ICdEVCcsXHJcbiAgICAgICAgc2hvcnRfbmFtZTogJ0RUJyxcclxuICAgICAgICB0aGVtZV9jb2xvcjogJyNmZmZmZmYnLFxyXG4gICAgICAgIGljb25zOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHNyYzogJy9sb2dvLnN2ZycsXHJcbiAgICAgICAgICAgIHNpemVzOiAnMTkyeDE5MicsXHJcbiAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9zdmcnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgc3JjOiAnL2xvZ28uc3ZnJyxcclxuICAgICAgICAgICAgc2l6ZXM6ICc1MTJ4NTEyJyxcclxuICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3N2ZycsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICcvbG9nby5zdmcnLFxyXG4gICAgICAgICAgICBzaXplczogJzUxMng1MTInLFxyXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2Uvc3ZnJyxcclxuICAgICAgICAgICAgcHVycG9zZTogJ2FueSBtYXNrYWJsZScsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgIH0sXHJcbiAgICB9KSxcclxuICAgIC8vIGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL3ZpdGUtc3ZnLWxvYWRlclxyXG4gICAgc3ZnTG9hZGVyKCksXHJcblxyXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2ludGxpZnkvYnVuZGxlLXRvb2xzL3RyZWUvbWFpbi9wYWNrYWdlcy91bnBsdWdpbi12dWUtaTE4blxyXG4gICAgVnVlSTE4bih7XHJcbiAgICAgIHJ1bnRpbWVPbmx5OiB0cnVlLFxyXG4gICAgICBjb21wb3NpdGlvbk9ubHk6IHRydWUsXHJcbiAgICAgIGZ1bGxJbnN0YWxsOiB0cnVlLFxyXG4gICAgICBpbmNsdWRlOiBbcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ2xvY2FsZXMvKionKV0sXHJcbiAgICB9KSxcclxuXHJcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW50ZnUvdml0ZS1wbHVnaW4taW5zcGVjdFxyXG4gICAgLy8gVmlzaXQgaHR0cDovL2xvY2FsaG9zdDozMzMzL19faW5zcGVjdC8gdG8gc2VlIHRoZSBpbnNwZWN0b3JcclxuICAgIC8vIEluc3BlY3QoKSxcclxuXHJcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vd2ViZmFuc3Bsei92aXRlLXBsdWdpbi12dWUtaW5zcGVjdG9yXHJcbiAgICAvLyBJbnNwZWN0b3Ioe1xyXG4gICAgLy8gICB0b2dnbGVCdXR0b25WaXNpYmlsaXR5OiAnbmV2ZXInLFxyXG4gICAgLy8gfSksXHJcbiAgXSxcclxuXHJcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3ZpdGVzdC1kZXYvdml0ZXN0XHJcbiAgLy8gdGVzdDoge1xyXG4gIC8vICAgaW5jbHVkZTogWyd0ZXN0LyoqLyoudGVzdC50cyddLFxyXG4gIC8vICAgZW52aXJvbm1lbnQ6ICdqc2RvbScsXHJcbiAgLy8gICBkZXBzOiB7XHJcbiAgLy8gICAgIGlubGluZTogWydAdnVlJywgJ0B2dWV1c2UnXSxcclxuICAvLyAgIH0sXHJcbiAgLy8gfSxcclxuXHJcbiAgY3NzOiB7XHJcbiAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XHJcbiAgICAgIGxlc3M6IHtcclxuICAgICAgICBtb2RpZnlWYXJzOiB7XHJcbiAgICAgICAgICAncHJpbWFyeS1jb2xvcic6ICcjMDA5NkIyJyxcclxuICAgICAgICAgICdsaW5rLWNvbG9yJzogJyMwMDk2QjInLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgamF2YXNjcmlwdEVuYWJsZWQ6IHRydWUsXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBa1QsT0FBTyxpQkFBaUI7QUFDMVUsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsb0JBQW9CO0FBRTdCLE9BQU8sZUFBZTtBQUN0QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sYUFBYTtBQUNwQixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGNBQWM7QUFDckIsU0FBUyxlQUFlO0FBQ3hCLE9BQU8sYUFBYTtBQUdwQixPQUFPLGVBQWU7QUFDdEIsU0FBUyw0QkFBNEI7QUFoQnJDLElBQU0sbUNBQW1DO0FBbUJ6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxNQUFNLEdBQUcsS0FBSyxRQUFRLGtDQUFXLEtBQUssQ0FBQztBQUFBLElBQ3pDO0FBQUEsRUFDRjtBQUFBLEVBRUEsU0FBUztB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
