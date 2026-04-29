import {
  BrowserModule,
  HttpClientModule,
  NgForOf,
  NgIf,
  Router,
  RouterLink,
  RouterModule,
  RouterOutlet,
  platformBrowser,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-NZQ3SXBR.js";

// src/app/app-routing.module.ts
var routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full"
  },
  {
    path: "dashboard",
    loadChildren: () => import("./chunk-HWDV4RNH.js").then((m) => m.DashboardModule)
  },
  {
    path: "recambios",
    loadChildren: () => import("./chunk-HPYPFK6V.js").then((m) => m.CartModule)
  },
  {
    path: "incidencias",
    loadChildren: () => import("./chunk-QQZTGNSN.js").then((m) => m.TicketsModule)
  },
  {
    path: "scada",
    loadChildren: () => import("./chunk-JSD3KA4F.js").then((m) => m.ScadaModule)
  },
  {
    path: "**",
    redirectTo: "dashboard"
  }
];
var AppRoutingModule = class _AppRoutingModule {
  static {
    this.\u0275fac = function AppRoutingModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AppRoutingModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _AppRoutingModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forRoot(routes), RouterModule] });
  }
};

// src/app/layout/sidebar/sidebar.component.ts
function SidebarComponent_a_13__svg_svg_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 21);
    \u0275\u0275element(1, "path", 22);
    \u0275\u0275elementEnd();
  }
}
function SidebarComponent_a_13__svg_svg_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 21);
    \u0275\u0275element(1, "path", 23);
    \u0275\u0275elementEnd();
  }
}
function SidebarComponent_a_13__svg_svg_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 21);
    \u0275\u0275element(1, "path", 24);
    \u0275\u0275elementEnd();
  }
}
function SidebarComponent_a_13__svg_svg_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 21);
    \u0275\u0275element(1, "path", 25);
    \u0275\u0275elementEnd();
  }
}
function SidebarComponent_a_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 18);
    \u0275\u0275template(1, SidebarComponent_a_13__svg_svg_1_Template, 2, 0, "svg", 19)(2, SidebarComponent_a_13__svg_svg_2_Template, 2, 0, "svg", 19)(3, SidebarComponent_a_13__svg_svg_3_Template, 2, 0, "svg", 19)(4, SidebarComponent_a_13__svg_svg_4_Template, 2, 0, "svg", 19);
    \u0275\u0275elementStart(5, "span", 20);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r1.isActive(item_r1.route));
    \u0275\u0275property("routerLink", item_r1.route);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", item_r1.icon === "grid");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", item_r1.icon === "cart");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", item_r1.icon === "ticket");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", item_r1.icon === "scada");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r1.label);
  }
}
var SidebarComponent = class _SidebarComponent {
  constructor(router) {
    this.router = router;
    this.navItems = [
      { label: "Dashboard", route: "/dashboard", icon: "grid" },
      { label: "Recambios", route: "/recambios", icon: "cart" },
      { label: "Incidencias", route: "/incidencias", icon: "ticket" },
      { label: "SCADA", route: "/scada", icon: "scada", roles: ["technician", "admin"] }
    ];
  }
  isActive(route) {
    return this.router.url.startsWith(route);
  }
  static {
    this.\u0275fac = function SidebarComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _SidebarComponent)(\u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SidebarComponent, selectors: [["app-sidebar"]], decls: 23, vars: 1, consts: [[1, "sidebar"], [1, "sidebar-logo"], [1, "logo-icon"], ["width", "24", "height", "24", "viewBox", "0 0 24 24", "fill", "none"], ["d", "M12 2L2 7l10 5 10-5-10-5z", "fill", "#818CF8"], ["d", "M2 17l10 5 10-5", "stroke", "#A5B4FC", "stroke-width", "1.5", "stroke-linecap", "round"], ["d", "M2 12l10 5 10-5", "stroke", "#C7D2FE", "stroke-width", "1.5", "stroke-linecap", "round"], [1, "logo-text"], [1, "logo-title"], [1, "logo-subtitle"], [1, "sidebar-nav"], ["class", "nav-item", 3, "routerLink", "active", 4, "ngFor", "ngForOf"], [1, "sidebar-footer"], [1, "user-info"], [1, "user-avatar"], [1, "user-details"], [1, "user-name"], [1, "user-role"], [1, "nav-item", 3, "routerLink"], ["class", "nav-icon", "viewBox", "0 0 20 20", "fill", "currentColor", 4, "ngIf"], [1, "nav-label"], ["viewBox", "0 0 20 20", "fill", "currentColor", 1, "nav-icon"], ["d", "M2 4a2 2 0 012-2h3a2 2 0 012 2v3a2 2 0 01-2 2H4a2 2 0 01-2-2V4zm9 0a2 2 0 012-2h3a2 2 0 012 2v3a2 2 0 01-2 2h-3a2 2 0 01-2-2V4zM2 13a2 2 0 012-2h3a2 2 0 012 2v3a2 2 0 01-2 2H4a2 2 0 01-2-2v-3zm9 0a2 2 0 012-2h3a2 2 0 012 2v3a2 2 0 01-2 2h-3a2 2 0 01-2-2v-3z"], ["d", "M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"], ["fill-rule", "evenodd", "d", "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z", "clip-rule", "evenodd"], ["fill-rule", "evenodd", "d", "M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z", "clip-rule", "evenodd"]], template: function SidebarComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "aside", 0)(1, "div", 1)(2, "div", 2);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(3, "svg", 3);
        \u0275\u0275element(4, "path", 4)(5, "path", 5)(6, "path", 6);
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(7, "div", 7)(8, "span", 8);
        \u0275\u0275text(9, "TecnoHub");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "span", 9);
        \u0275\u0275text(11, "Industrial");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(12, "nav", 10);
        \u0275\u0275template(13, SidebarComponent_a_13_Template, 7, 8, "a", 11);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "div", 12)(15, "div", 13)(16, "div", 14);
        \u0275\u0275text(17, "U");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "div", 15)(19, "span", 16);
        \u0275\u0275text(20, "Usuario");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "span", 17);
        \u0275\u0275text(22, "Operario");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(13);
        \u0275\u0275property("ngForOf", ctx.navItems);
      }
    }, dependencies: [NgForOf, NgIf, RouterLink], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  width: 240px;\n  min-width: 240px;\n  height: 100vh;\n}\n.sidebar[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  width: 240px;\n  height: 100%;\n  background: #1E293B;\n  overflow: hidden;\n}\n.sidebar-logo[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 20px 20px 16px;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.06);\n}\n.logo-icon[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  background: rgba(99, 102, 241, 0.25);\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.logo-text[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  line-height: 1.2;\n}\n.logo-title[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 700;\n  color: #fff;\n  letter-spacing: 0.01em;\n}\n.logo-subtitle[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 400;\n  color: #CBD5E1;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n}\n.sidebar-nav[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  padding: 16px 12px;\n  overflow-y: auto;\n}\n.nav-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 9px 12px;\n  border-radius: 8px;\n  color: #CBD5E1;\n  text-decoration: none;\n  font-size: 13px;\n  font-weight: 500;\n  transition: background 150ms ease, color 150ms ease;\n  position: relative;\n  cursor: pointer;\n}\n.nav-item[_ngcontent-%COMP%]:hover {\n  background: #334155;\n  color: #FFFFFF;\n}\n.nav-item.active[_ngcontent-%COMP%] {\n  background: #4F46E5;\n  color: #FFFFFF;\n}\n.nav-item.active[_ngcontent-%COMP%]   .nav-icon[_ngcontent-%COMP%] {\n  color: #FFFFFF;\n}\n.nav-icon[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  flex-shrink: 0;\n  color: #CBD5E1;\n  transition: color 150ms ease;\n}\n.nav-label[_ngcontent-%COMP%] {\n  flex: 1;\n  font-size: 13px;\n}\n.sidebar-footer[_ngcontent-%COMP%] {\n  padding: 16px 12px;\n  border-top: 1px solid rgba(255, 255, 255, 0.06);\n}\n.user-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 8px;\n  border-radius: 8px;\n  transition: background 150ms ease;\n  cursor: pointer;\n}\n.user-info[_ngcontent-%COMP%]:hover {\n  background: #334155;\n}\n.user-avatar[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  background: #4F46E5;\n  color: #fff;\n  font-size: 13px;\n  font-weight: 600;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.user-details[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n}\n.user-name[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: #FFFFFF;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.user-role[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #CBD5E1;\n}\n/*# sourceMappingURL=sidebar.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SidebarComponent, { className: "SidebarComponent", filePath: "src\\app\\layout\\sidebar\\sidebar.component.ts", lineNumber: 16 });
})();

// src/app/app.component.ts
var AppComponent = class _AppComponent {
  static {
    this.\u0275fac = function AppComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AppComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppComponent, selectors: [["app-root"]], decls: 4, vars: 0, consts: [[1, "app-shell"], [1, "main-content"]], template: function AppComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275element(1, "app-sidebar");
        \u0275\u0275elementStart(2, "main", 1);
        \u0275\u0275element(3, "router-outlet");
        \u0275\u0275elementEnd()();
      }
    }, dependencies: [RouterOutlet, SidebarComponent], styles: ["\n\n.app-shell[_ngcontent-%COMP%] {\n  display: flex;\n  height: 100vh;\n  overflow: hidden;\n}\n.main-content[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  background: var(--bg);\n}\n/*# sourceMappingURL=app.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppComponent, { className: "AppComponent", filePath: "src\\app\\app.component.ts", lineNumber: 8 });
})();

// src/app/app.module.ts
var AppModule = class _AppModule {
  static {
    this.\u0275fac = function AppModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AppModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _AppModule, bootstrap: [AppComponent] });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
      BrowserModule,
      HttpClientModule,
      AppRoutingModule
    ] });
  }
};

// src/main.ts
platformBrowser().bootstrapModule(AppModule).catch((err) => console.error(err));
//# sourceMappingURL=main.js.map
