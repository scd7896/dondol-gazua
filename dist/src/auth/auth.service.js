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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const bcrypt = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const constant_1 = require("./constant");
let AuthService = class AuthService {
    constructor(userService) {
        this.userService = userService;
    }
    async validateUser(username, pass) {
        const user = await this.userService.findOne(username);
        if (!user)
            return {
                status: 'error',
                message: '그 이메일은 없는 이메일입니다.',
            };
        if (user && bcrypt.compareSync(pass, user.password)) {
            const { password } = user, result = __rest(user, ["password"]);
            return result;
        }
        return {
            status: 'error',
            message: '비밀번호를 잘못 입력하셨습니다.',
        };
    }
    async login(user) {
        const result = await this.validateUser(user.email, user.password);
        if (result.status === 'error')
            return result;
        const payload = { email: result.email, id: result.id };
        return {
            accessToken: jsonwebtoken_1.sign(payload, constant_1.jwtConstants.secret, { expiresIn: '48h' }),
        };
    }
    async check(token) {
        const result = jsonwebtoken_1.verify(token, constant_1.jwtConstants.secret);
        const payload = { email: result.email, id: result.id };
        return {
            accessToken: jsonwebtoken_1.sign(payload, constant_1.jwtConstants.secret, { expiresIn: '48h' }),
        };
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map