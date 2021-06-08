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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../auth/auth.service");
const user_dto_1 = require("./user.dto");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(userService, authService) {
        this.userService = userService;
        this.authService = authService;
    }
    async signUp({ user }, res) {
        try {
            const result = await this.userService.createUser(user);
            if (result) {
                const token = await this.authService.login(result);
                res.status(common_1.HttpStatus.CREATED).json(token);
            }
            else {
                res
                    .status(common_1.HttpStatus.CONFLICT)
                    .json({ message: '이미 가입된 유저입니다.' });
            }
        }
        catch (err) {
            res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            res.json(err);
        }
        return null;
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signUp", null);
UserController = __decorate([
    common_1.Controller('user'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        auth_service_1.AuthService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map