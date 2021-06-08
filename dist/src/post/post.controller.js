"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const roles_decorator_1 = require("../roles/roles.decorator");
const post_dto_1 = require("./dto/post.dto");
const post_service_1 = require("./post.service");
let PostController = class PostController {
    constructor(postService) {
        this.postService = postService;
    }
    allFind(size, number) {
        return this.postService.findAll(size, number);
    }
    findOne(id) {
        return this.postService.findOne(id);
    }
    createPost(post) {
        const result = this.postService.createPost(post);
        return result;
    }
    changePost(post, id) {
        return this.postService.updatePost(id, post);
    }
    deletePost(id) {
        return this.postService.deletePost(id);
    }
};
__decorate([
    common_1.Get(),
    roles_decorator_1.Roles('user'),
    __param(0, common_1.Query('size', common_1.ParseIntPipe)),
    __param(1, common_1.Query('number', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "allFind", null);
__decorate([
    common_1.Get(':id'),
    roles_decorator_1.Roles('user'),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "findOne", null);
__decorate([
    common_1.Post(),
    roles_decorator_1.Roles('user'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_dto_1.PostDto]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "createPost", null);
__decorate([
    common_1.Put(':id'),
    roles_decorator_1.Roles('user'),
    __param(0, common_1.Body()), __param(1, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_dto_1.PostDto, Number]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "changePost", null);
__decorate([
    common_1.Delete(':id'),
    roles_decorator_1.Roles('user'),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "deletePost", null);
PostController = __decorate([
    common_1.Controller('post'),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostController);
exports.PostController = PostController;
//# sourceMappingURL=post.controller.js.map