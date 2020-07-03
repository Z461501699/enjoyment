// name: config.js
// project: WechartFramework
// author: 区区电脑
// e-mail: 1573580882@qq.com
// date: 2020-05-13 23:31
// ...

// 生产状态
export const ProductStatus = false;
// 测试环境
const HostTest = 'http://52.81.65.217:8083';
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
    feedBack: { type: 'POST', path: "/api/Feedback/CommitFeedback" },//提交反馈
    reFund: { type: 'GET', path: '/api/Refund/GetRefundList' },//分页退款列表
    uploadFile: { path: '/File/UploadFile' },//上传
    UploadFileMult: { path: '/File/UploadFileMult' },//多个上传

    getSignUpStatus: { type: 'GET', path: '/api/Order/GetSignUpStatus' },//获取报名状态接口 根据学生课程id，判断报名状态
    createOrder: { type: "POST", path: '/api/Order/CreatOrder' },//生成订单接口
    setMessageFlag: { type: "GET", path: '/api/Message/SetMessageFlag' },//设置消息已读状态接口
    getFinanceList: { type: "GET", path: '/api/Finance/GetFinanceList' },//获取财务流水分页列表
    getCityInfoByLocation: { type: 'GET', path: '/api/Area/GetCityInfoByLocation' },//获取定位信息
    getCityList: { type: 'GET', path: '/api/Area/GetCityList' },//获取城市列表
    getClassList: { type: 'GET', path: '/api/Class/GetClassList' },//获取课时列表
    GetSchoolListByMember: { type: 'GET', path: '/api/School/GetSchoolListByMember' },//获取投诉建议
    GetSubjectByStudentId: { type: 'GET', path: '/api/Subject/GetSubjectByStudentId' },//根据学生id获取课程列表
    appraisea: { type: 'POST', path: '/api/Class/Appraise' },//提交课程评价按钮
    GetMemberInfo: { type: 'GET', path: '/api/Member/GetMemberInfo' },// 获取用户信息接口
    UpdateMemeberInfo: { type: 'POST', path: '/api/Member/UpdateMemeberInfo' },// 修改用户信息
    // 收藏 课程详情和学校详情
    GetCollectionStatus: { type: 'GET', path: '/api/Collection/GetCollectionStatus' },// 获取收藏状态 
    AddCollection: { type: 'GET', path: '/api/Collection/AddCollection' },// 添加收藏   itemType  学校1   课程2
    DelCollection: { type: 'GET', path: '/api/Collection/DelCollection' },// 取消收藏
    GetRefundDetail: { type: 'GET', path: '/api/Refund/GetRefundDetail' },//获取退款信息
    ApplyRefund: { type: "POST", path: '/api/Refund/ApplyRefund' },//退款申请接口
    GetSchoolList: { type: 'GET', path: '/api/Collection/GetSchoolList' },// 获取收藏的学校列表
    GetSubjectList: { type: 'GET', path: '/api/Collection/GetSubjectList' },// 获取收藏的课程列表
    Payment: { type: 'GET', path: '/api/Order/Payment' },// 获取付款课程信息
    GetOrderInfo: { type: 'GET', path: '/api/Order/GetOrderInfo' },// 获取付款课程信息
    GetBPayState: { type: 'GET', path: '/api/Member/GetBPayState' },// ********
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