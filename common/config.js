// name: config.js
// project: WechartFramework
// author: 区区电脑
// e-mail: 1573580882@qq.com
// date: 2020-05-13 23:31
// ...

// 生产状态
export const ProductStatus = false;
// 测试环境
const HostTest = '';
// 生产环境
const HostProduct = '';
// 域名
export const Host = ProductStatus ? HostProduct : HostTest;
// 接口地址
export const Apis = {
    login: {type: 'POST', path: '/login'}
};

// keys
// 用户id
export const KEY_USERID = 'key_user_id';
// token
export const KEY_TOKEN = 'key_token';
// 用户
export const KEY_USER = 'key_user';
// 微信登录 code
export const KEY_WXCODE = 'key_wxcode';