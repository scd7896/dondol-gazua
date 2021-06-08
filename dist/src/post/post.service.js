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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../lib/prisma.service");
const upload_service_1 = require("../upload/upload.service");
const constants_1 = require("./constants");
let PostService = class PostService {
    constructor(prisma, upload) {
        this.prisma = prisma;
        this.upload = upload;
    }
    async findOne(id) {
        const target = await this.prisma.post.findUnique({
            where: {
                id,
            },
            include: {
                images: true,
            },
        });
        target.images = target.images.map((image) => (Object.assign(Object.assign({}, image), { path: constants_1.basePath + image.path })));
        return target;
    }
    async findAll(size = 30, number = 1) {
        const list = await this.prisma.post.findMany({
            take: size,
            skip: (number - 1) * size,
            select: {
                title: true,
                id: true,
                meetDate: true,
                updatedAt: true,
                createdAt: true,
            },
        });
        const count = await this.prisma.post.count();
        return { payload: list, count };
    }
    async createPost(post) {
        const images = post.images ? post.images.map((path) => ({ path })) : [];
        return this.prisma.post.create({
            data: {
                title: post.title,
                contents: post.contents,
                createdAt: new Date(),
                updatedAt: new Date(),
                meetDate: post.meetDate,
                images: {
                    create: images,
                },
            },
            include: {
                images: true,
            },
        });
    }
    async updatePost(id, post) {
        var _a, _b, _c;
        const beforeDate = await this.prisma.post.findUnique({
            where: { id },
            include: {
                images: true,
            },
        });
        if (!beforeDate)
            return null;
        await this.prisma.image.deleteMany({
            where: {
                postId: beforeDate.id,
            },
        });
        const postImagesMap = {};
        (_a = post.images) === null || _a === void 0 ? void 0 : _a.map((path) => {
            const pathId = path.split(constants_1.basePath).pop();
            postImagesMap[pathId] = pathId;
        });
        const updateData = await this.prisma.post.update({
            where: { id },
            data: {
                title: post.title,
                contents: post.contents,
                meetDate: post.meetDate,
                updatedAt: new Date(),
                images: {
                    create: (_b = post.images) === null || _b === void 0 ? void 0 : _b.map((path) => ({
                        path: path.split(constants_1.basePath).pop(),
                    })),
                },
            },
            include: {
                images: true,
            },
        });
        const removeImages = [];
        (_c = beforeDate.images) === null || _c === void 0 ? void 0 : _c.map(({ path }) => {
            if (!postImagesMap[path])
                removeImages.push(path);
        });
        const promises = removeImages.map((path) => this.upload.delete(path));
        await Promise.all(promises);
        return updateData;
    }
    async deletePost(id) {
        await this.prisma.image.deleteMany({
            where: {
                postId: id,
            },
        });
        const result = await this.prisma.post.delete({
            where: { id },
            include: { images: true },
        });
        const promises = result.images.map(({ path }) => this.upload.delete(path.split(constants_1.basePath).pop()));
        await Promise.all(promises);
        return '삭제 완료';
    }
};
PostService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, upload_service_1.UploadService])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map