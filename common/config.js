// name: config.js
// project: WechartFramework
// author: 区区电脑
// e-mail: 1573580882@qq.com
// date: 2020-05-13 23:31
// ...

// 生产状态
export const ProductStatus = false;
// 测试环境
const HostTest = 'http://121.36.4.133:8080';
// 生产环境
const HostProduct = '';
// 域名
export const Host = ProductStatus ? HostProduct : HostTest;
// 接口地址
export const Apis = {
    login: { type: 'POST', path: '/api/Member/Login' },//登录
    getSubjectList: { type: 'GET', path: '/api/Subject/GetSubjectList' },//分页获取课程列表
    getSchoolList: { type: 'GET', path: '/api/School/GetSchoolList' },//分页获取学校列表
    getSubjectInfo: { type: 'GET', path: '/api/Subject/GetSubjectInfo' },//获取课程详情
    getMessageList: { type: 'GET', path: '/api/Message/GetMessageList' },//获取消息列表
    getOrderList: { type: 'GET', path: '/api/Order/GetOrderList' },//获取订单列表
    getSchoolInfo: { type: 'GET', path: '/api/School/GetSchoolInfo' }, // 获取学校详情
    getTeachersBySubjectId: { type: 'GET', path: '/api/Teacher/GetTeachersBySubjectId' },//获取课程老师列表
    GetTeacherList: { type: 'GET', path: '/api/Teacher/GetTeacherList' },//获取教师列表
    getRecommendedSubjectList: { type: 'GET', path: '/api/Subject/GetRecommendedSubjectList' },//获取推荐课程列表
    getRecommendedSchoolList: { type: 'GET', path: '/api/School/GetRecommendedSchoolList' },//获取推荐学校列表
    getAdList: { type: "GET", path: '/api/Ad/GetAdList' },//首页轮播图
    getSudentListByParent: { type: 'GET', path: '/api/Student/GetSudentListByParent' },//根据会员ID获取绑定学生信息列表接口
    addStudentInfo: { type: 'POST', path: '/api/Student/AddStudentInfo' },//根据会员ID创建定学生信息接口
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