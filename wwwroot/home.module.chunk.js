webpackJsonp(["home.module"],{

/***/ "./src/app/+home/home.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/+home/home.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"content\">\n    <div class=\"row\">\n        <!--\n        <sa-big-breadcrumbs [items]=\"['Home']\" icon=\"home\" class=\"col-xs-12 col-sm-7 col-md-7 col-lg-7\"></sa-big-breadcrumbs>  class=\"col-xs-12 col-sm-7 col-md-7 col-lg-4\" -->\n       \n        <div class=\"col-xs-12 col-sm-12 col-md-12 col-lg-12\"> <!--<div class=\"col-xs-12 col-sm-5 col-md-5 col-lg-8\"> -->\n                <ul id=\"sparks\" style=\"text-align: left\" class=\"\">\n                    <li class=\"sparks-info\">\n                            <app-create-project-form *ngIf=\"auth.isAuthenticated()\"></app-create-project-form>\n                    </li>\n                    <li class=\"sparks-info\">\n                            <app-open-project-form *ngIf=\"auth.isAuthenticated()\"></app-open-project-form>\n                    </li>\n                    <li class=\"sparks-info\">\n                            <app-delete-project-form *ngIf=\"auth.isAuthenticated()\"></app-delete-project-form>\n                    </li>\n                </ul>\n        </div> \n        \n        \n    </div>\n    <div class=\"row\">\n        <div class=\"col-sm-12\">\n\n           \n\n            <div class=\"well\">\n\n                <h4>Free web application for calculation of load (power) flow in electrical systems</h4>\n                <br>\n                <p>Steps to make calculation:</p>\n                <ol type=\"1\">\n                    <li>Log in (free and quick)</li>\n                    <li>Provide data for system elements: busbars, branch elements, transformers etc.</li>\n                    <li>Click calculate load (power) flow</li>\n                    <li>Analyze/Export results</li>\n                </ol>\n            </div>\n            <!-- <button type=\"button\" class=\"btn btn-primary\"  style=\"margin-left: 14px; margin-top:8px\" data-toggle=\"modal\" data-target=\"#myModal\" (click)=\"createProject()\" *ngIf=\"auth.isAuthenticated()\" > Create New Project </button> -->\n            <!-- <button type=\"button\" class=\"btn btn-primary\"  style=\"margin-left: 14px; margin-top:8px\" *ngIf=\"auth.isAuthenticated()\" (click)=\"openProject()\" > Open Project </button> -->\n            \n          \n            <!--\n            <div class=\"well\" *ngIf=\"auth.isAuthenticated()\">\n                {{profile.sub}}\n            </div>\n              -->\n            <!--\n            <sa-tree-view></sa-tree-view>\n            -->\n\n            <!-- lista rozwijana -->\n             <!-- widget options:\n                usage: <sa-widget id=\"wid-id-0\" [editbutton]=\"false\">\n                [colorbutton]=\"false\"\n                [editbutton]=\"false\"\n                [togglebutton]=\"false\"\n                [deletebutton]=\"false\"\n                [fullscreenbutton]=\"false\"\n                [custombutton]=\"false\"\n                [collapsed]=\"true\"\n                [sortable]=\"false\"\n                -->\n            <!-- \n            <sa-widget [editbutton]=\"false\" color=\"blue\">\n               \n                <header>\n                    <span class=\"widget-icon\">\n                        <i class=\"fa fa-sitemap\"></i>\n                    </span>\n                    <h2>Projects</h2>\n                </header>\n                 widget div\n                <div>\n                     widget content \n                    <div class=\"widget-body\">\n                        <div class=\"tree smart-form\">\n                            <sa-tree-view [items]=\"demo2\" (change)=\"changeLstener($event)\"></sa-tree-view>\n                        </div>\n                    </div>\n                     end widget content \n                </div>\n                 end widget div -\n            </sa-widget>\n             end widget -->\n\n\n\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/+home/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_project_service__ = __webpack_require__("./src/app/services/project.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_auth_service__ = __webpack_require__("./src/app/services/auth/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm2015/http.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




let HomeComponent = class HomeComponent {
    constructor(http, auth, projectService) {
        this.http = http;
        this.auth = auth;
        this.projectService = projectService;
        this.profile = JSON.parse(localStorage.getItem('profile'));
        //jeśli jesteśmy zalogowani przypisz do uzytkownika projekt 3 BUS
        if (this.profile != "null") {
            //this.http.get<Array<Project>>('/api/Project/Get')
            this.projectService.getProjects().map(returnedobjects => returnedobjects.filter(res => res.name == "3 bus")).subscribe(res => {
                this.projectService.updateProject(res[0].id, this.profile.sub);
            });
        }
    }
    ngOnInit() {
    }
};
HomeComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Component"])({
        selector: 'app-home',
        template: __webpack_require__("./src/app/+home/home.component.html"),
        styles: [__webpack_require__("./src/app/+home/home.component.css")]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1__services_auth_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_0__services_project_service__["a" /* ProjectService */]])
], HomeComponent);



/***/ }),

/***/ "./src/app/+home/home.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeModule", function() { return HomeModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_create_project_form_create_project_form_component__ = __webpack_require__("./src/app/components/create-project-form/create-project-form.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_open_project_form_open_project_form_component__ = __webpack_require__("./src/app/components/open-project-form/open-project-form.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_delete_project_form_delete_project_form_component__ = __webpack_require__("./src/app/components/delete-project-form/delete-project-form.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm2015/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_routing__ = __webpack_require__("./src/app/+home/home.routing.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_smartadmin_module__ = __webpack_require__("./src/app/shared/smartadmin.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__home_component__ = __webpack_require__("./src/app/+home/home.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








let HomeModule = class HomeModule {
};
HomeModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_4__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_5__home_routing__["a" /* homeRouting */],
            __WEBPACK_IMPORTED_MODULE_6__shared_smartadmin_module__["a" /* SmartadminModule */]
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_7__home_component__["a" /* HomeComponent */], __WEBPACK_IMPORTED_MODULE_1__components_open_project_form_open_project_form_component__["a" /* OpenProjectFormComponent */], __WEBPACK_IMPORTED_MODULE_0__components_create_project_form_create_project_form_component__["a" /* CreateProjectFormComponent */], __WEBPACK_IMPORTED_MODULE_2__components_delete_project_form_delete_project_form_component__["a" /* DeleteProjectFormComponent */]]
    })
], HomeModule);



/***/ }),

/***/ "./src/app/+home/home.routing.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm2015/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home_component__ = __webpack_require__("./src/app/+home/home.component.ts");


const homeRoutes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_1__home_component__["a" /* HomeComponent */],
        data: {
            pageTitle: 'Home'
        }
    }
];
/* unused harmony export homeRoutes */

const homeRouting = __WEBPACK_IMPORTED_MODULE_0__angular_router__["c" /* RouterModule */].forChild(homeRoutes);
/* harmony export (immutable) */ __webpack_exports__["a"] = homeRouting;



/***/ }),

/***/ "./src/app/components/create-project-form/create-project-form.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/create-project-form/create-project-form.component.html":
/***/ (function(module, exports) {

module.exports = "<button type=\"button\" class=\"btn btn-success\" (click)=\"openModal(template)\">Create Project</button>\n\n<ng-template #template>\n    <div class=\"modal-header\">\n        <h4 class=\"modal-title pull-left\">Create Project</h4>\n        <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n            <span aria-hidden=\"true\">&times;</span>\n        </button>\n    </div>\n    <div class=\"modal-body\">\n        <div class=\"form-group\">\n\n            <div class=\"\">\n                <input [(ngModel)]=\"newProjectName\" (keyup.enter)=\"createProject()\" type=\"text\" class=\"form-control\" id=\"projectName\" placeholder=\"New Project Name\" />\n            </div>\n        </div>\n\n    </div>\n\n    <div class=\"modal-footer\" >\n        \n        <button type=\"button\" class=\"btn btn-default\" (click)=\"modalRef.hide()\">Close</button>\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"createProject()\">Save</button>\n    </div>\n</ng-template>\n\n\n<!--\n<button type=\"button\" class=\"btn btn-primary\"  style=\"margin-left: 14px; margin-top:8px\" data-toggle=\"modal\" data-target=\"#createProject\"  *ngIf=\"auth.isAuthenticated()\" > Create New Project </button>\n\n<div class=\"modal fade\" id=\"createProject\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"createProjectLabel\" aria-hidden=\"true\">\n    <div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\">\n                    <span aria-hidden=\"true\">&times;</span>\n                    <span class=\"sr-only\">Close</span>\n                </button>\n                <h4 class=\"modal-title\" id=\"createProjectLabel\">Create New Project</h4>\n            </div>\n            <div class=\"modal-body\">\n            \n                <div class=\"form-group\">\n                   \n                    <div class=\"\">\n                        <input [(ngModel)]=\"newProjectName\" type=\"text\" class=\"form-control\" id=\"projectName\" placeholder=\"New Project Name\"   \n                        />\n                    </div>\n                </div>\n            </div>\n\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n                <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\" (click)=\"createProject()\">Save</button>\n            </div>\n        </div>\n    </div>\n</div>\n-->"

/***/ }),

/***/ "./src/app/components/create-project-form/create-project-form.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateProjectFormComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_show_data_service__ = __webpack_require__("./src/app/services/show-data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_project_service__ = __webpack_require__("./src/app/services/project.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm2015/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_services_auth_auth_service__ = __webpack_require__("./src/app/services/auth/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ngx_bootstrap_modal__ = __webpack_require__("./node_modules/ngx-bootstrap/modal/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






let CreateProjectFormComponent = class CreateProjectFormComponent {
    constructor(http, auth, projectService, showData, modalService) {
        this.http = http;
        this.auth = auth;
        this.projectService = projectService;
        this.showData = showData;
        this.modalService = modalService;
        this.selectedProject = {};
        this.openedProject = {};
        //this.showHide = false;
    }
    ngOnInit() {
        this.profile = JSON.parse(localStorage.getItem('profile'));
    }
    createProject() {
        //stwórz projekt określony przez nazwe oraz id uzytkownika
        this.projectService.createProject(this.newProjectName, this.profile.sub);
        //ustaw nowy projekt jako aktualnie otwarty
        this.projectService.changeProjectName(this.newProjectName);
        //pokaż dane systemu
        this.showData.showIt();
        //schowaj ramke
        this.modalRef.hide();
    }
    openModal(template) {
        this.modalRef = this.modalService.show(template);
    }
};
CreateProjectFormComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["Component"])({
        selector: 'app-create-project-form',
        template: __webpack_require__("./src/app/components/create-project-form/create-project-form.component.html"),
        styles: [__webpack_require__("./src/app/components/create-project-form/create-project-form.component.css")]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_4_app_services_auth_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_1__services_project_service__["a" /* ProjectService */], __WEBPACK_IMPORTED_MODULE_0__services_show_data_service__["a" /* ShowDataService */], __WEBPACK_IMPORTED_MODULE_5_ngx_bootstrap_modal__["a" /* BsModalService */]])
], CreateProjectFormComponent);



/***/ }),

/***/ "./src/app/components/delete-project-form/delete-project-form.component.css":
/***/ (function(module, exports) {

module.exports = ".box{\n    border: solid 1px #000;\n    padding: 10px;\n    text-align:center;\n  }\n\n  \n"

/***/ }),

/***/ "./src/app/components/delete-project-form/delete-project-form.component.html":
/***/ (function(module, exports) {

module.exports = "<button type=\"button\" class=\"btn btn-danger\" (click)=\"openModal(template)\">Delete Project</button>\n\n<ng-template #template>\n  <div class=\"modal-header\">\n    <h4 class=\"modal-title pull-left\">Delete Project</h4>\n    <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n      <span aria-hidden=\"true\">&times;</span>\n    </button>\n  </div>\n  <div class=\"modal-body\">    \n    <select id=\"deleteProject\" class=\"form-control\" [(ngModel)]=\"deletedProject.project\" name=\"project_id\">\n      <option value=\"\"></option>\n      <option *ngFor=\"let p of projects\" value=\"{{p.id}}\">{{p.name}}</option>\n    </select>\n  </div>\n\n  <div class=\"modal-footer\">\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"modalRef.hide()\">Close</button>\n    <button type=\"button\" class=\"btn btn-danger\" (click)=\"deleteProject()\">Delete</button>\n  </div>\n</ng-template>"

/***/ }),

/***/ "./src/app/components/delete-project-form/delete-project-form.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DeleteProjectFormComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_show_data_service__ = __webpack_require__("./src/app/services/show-data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_project_service__ = __webpack_require__("./src/app/services/project.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_services_auth_auth_service__ = __webpack_require__("./src/app/services/auth/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ngx_bootstrap_modal__ = __webpack_require__("./node_modules/ngx-bootstrap/modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm2015/http.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






let DeleteProjectFormComponent = class DeleteProjectFormComponent {
    constructor(http, projectService, auth, modalService, showData) {
        this.http = http;
        this.projectService = projectService;
        this.auth = auth;
        this.modalService = modalService;
        this.showData = showData;
        this.deletedProject = {};
        this.headers = new __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["c" /* HttpHeaders */]().set('Content-Type', 'application/json; charset=utf-8');
    }
    ngOnInit() {
        this.profile = JSON.parse(localStorage.getItem('profile'));
    }
    deleteProject() {
        if (confirm('Are you sure ?')) {
            //okresl wybrany projekt
            this.projectService.getProjects().map(returnedobjects => returnedobjects.filter(p => p.id == this.deletedProject.project)).subscribe(res => {
                //this.selectedProject = res[0];          
                this.projectService.changeProjectName("Project not opened");
                //this.projectService.changeProjectId(res[0].id); 
                this.http.delete('api/Project/Delete/' + res[0].id, { headers: this.headers }).subscribe();
            });
            this.showData.hideIt();
            this.modalRef.hide();
        }
    }
    openModal(template) {
        //wybieraj tylko z projektów, które są stworzone przez uzytkownika o określonym id
        this.projectService.getProjects().map(returnedobjects => returnedobjects.filter(res => res.userId == this.profile.sub)).subscribe(res => {
            this.projects = res;
            //this.projects = this.projects.filter(p => p.userId == this.profile.sub );
        });
        this.modalRef = this.modalService.show(template);
    }
};
DeleteProjectFormComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Component"])({
        selector: 'app-delete-project-form',
        template: __webpack_require__("./src/app/components/delete-project-form/delete-project-form.component.html"),
        styles: [__webpack_require__("./src/app/components/delete-project-form/delete-project-form.component.css")]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1__services_project_service__["a" /* ProjectService */], __WEBPACK_IMPORTED_MODULE_3_app_services_auth_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_4_ngx_bootstrap_modal__["a" /* BsModalService */], __WEBPACK_IMPORTED_MODULE_0__services_show_data_service__["a" /* ShowDataService */]])
], DeleteProjectFormComponent);



/***/ }),

/***/ "./src/app/components/open-project-form/open-project-form.component.css":
/***/ (function(module, exports) {

module.exports = ".box{\n    border: solid 1px #000;\n    padding: 10px;\n    text-align:center;\n  }\n\n  \n"

/***/ }),

/***/ "./src/app/components/open-project-form/open-project-form.component.html":
/***/ (function(module, exports) {

module.exports = "<button type=\"button\" class=\"btn btn-primary\" (click)=\"openModal(template)\">Open Project</button>\n\n<ng-template #template >\n  <div class=\"modal-header\">\n    <h4 class=\"modal-title pull-left\">Open Project</h4>\n    <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n      <span aria-hidden=\"true\">&times;</span>\n    </button>\n  </div>\n  <div class=\"modal-body\" >\n    \n    <select id=\"openProject\" class=\"form-control\" [(ngModel)]=\"openedProject.project\" name=\"project_id\">\n      <option value=\"\"></option>\n      <option *ngFor=\"let p of projects\" value=\"{{p.id}}\">{{p.name}}</option>\n    </select>\n  </div>\n\n  <div class=\"modal-footer\">\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"modalRef.hide()\">Close</button>\n    <button type=\"button\" class=\"btn btn-primary\" (click)=\"openProject()\">Open</button>\n  </div>\n</ng-template>"

/***/ }),

/***/ "./src/app/components/open-project-form/open-project-form.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OpenProjectFormComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_show_data_service__ = __webpack_require__("./src/app/services/show-data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_project_service__ = __webpack_require__("./src/app/services/project.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm2015/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_services_auth_auth_service__ = __webpack_require__("./src/app/services/auth/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ngx_bootstrap_modal__ = __webpack_require__("./node_modules/ngx-bootstrap/modal/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





let OpenProjectFormComponent = class OpenProjectFormComponent {
    constructor(projectService, auth, modalService, showData) {
        this.projectService = projectService;
        this.auth = auth;
        this.modalService = modalService;
        this.showData = showData;
        this.openedProject = {};
    }
    ngOnInit() {
        this.profile = JSON.parse(localStorage.getItem('profile'));
    }
    openProject() {
        //okresl wybrany projekt
        this.projectService.getProjects().map(returnedobjects => returnedobjects.filter(p => p.id == this.openedProject.project)).subscribe(res => {
            this.projectService.changeProjectName(res[0].name);
            this.projectService.changeProjectId(res[0].id);
        });
        //pokaż dane
        this.showData.showIt();
        //showaj okienko
        this.modalRef.hide();
    }
    openModal(template) {
        //wybieraj tylko z projektów, które są stworzone przez uzytkownika o określonym id
        this.projectService.getProjects().map(returnedobjects => returnedobjects.filter(res => res.userId == this.profile.sub)).subscribe(res => {
            this.projects = res;
            //this.projects = this.projects.filter(p => p.userId == this.profile.sub );
        });
        //pokaż okienko
        this.modalRef = this.modalService.show(template);
    }
};
OpenProjectFormComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Component"])({
        selector: 'app-open-project-form',
        template: __webpack_require__("./src/app/components/open-project-form/open-project-form.component.html"),
        styles: [__webpack_require__("./src/app/components/open-project-form/open-project-form.component.css")]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_project_service__["a" /* ProjectService */], __WEBPACK_IMPORTED_MODULE_3_app_services_auth_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_4_ngx_bootstrap_modal__["a" /* BsModalService */], __WEBPACK_IMPORTED_MODULE_0__services_show_data_service__["a" /* ShowDataService */]])
], OpenProjectFormComponent);



/***/ })

});
//# sourceMappingURL=home.module.chunk.js.map