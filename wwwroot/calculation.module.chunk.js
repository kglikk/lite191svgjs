webpackJsonp(["calculation.module"],{

/***/ "./src/app/+calculation/calculation.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CalculationModule", function() { return CalculationModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__calculation_routing__ = __webpack_require__("./src/app/+calculation/calculation.routing.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


let CalculationModule = class CalculationModule {
};
CalculationModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__calculation_routing__["a" /* routing */]
        ],
    })
], CalculationModule);



/***/ }),

/***/ "./src/app/+calculation/calculation.routing.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm2015/router.js");

const routes = [
    {
        path: 'loadflow',
        loadChildren: 'app/+calculation/loadflow/loadflow.module#LoadFlowModule',
        data: { pageTitle: 'Load Flow' }
    },
];
/* unused harmony export routes */

const routing = __WEBPACK_IMPORTED_MODULE_0__angular_router__["c" /* RouterModule */].forChild(routes);
/* harmony export (immutable) */ __webpack_exports__["a"] = routing;



/***/ })

});
//# sourceMappingURL=calculation.module.chunk.js.map