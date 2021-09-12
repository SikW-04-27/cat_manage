// api接口管理
import { get, post} from './http'

const url1 = 'http://112.74.33.254:2358/';

const url2 = 'http://47.107.49.231/';

//获取所有可预约时间
export const listAppointment = p => post(`${url1}appointment/listAll`, p);

//设置可预约时间
export const saveNewAppointmentInfo = p => post(`${url1}appointment/saveNewInfo`, p);

//用户预约时间段
export const updateUserInfo = p => post(`${url1}appointment/updateUserInfo`, p);

//用户取消预约
export const cancelAppointment = p => post(`${url1}appointment/cancelAppointment`, p);

//用户报名接口
export const submit = p => post(`${url1}enroll/submit`, p)

// 通过ID删除预约时间
export const deleteAppointmentInfo = p => post(`${url1}appointment/deleteInfo`, p);

//通过ID获得某个用户的进度信息
export const getUserStatus = p => post(`${url1}status/getUserStatus`, p);

// 删除全部预约时间段
export const deleteAllAppointmentInfo = p => post(`${url1}appointment/deleteAllInfo`, p);

//获取当前总体招新阶段
export const getCurrentStatus = p => post(`${url2}status/getCurrentStatus`, p);

//切换下一阶段
export const updateStatus = p => post(`${url2}status/updateStatus`, p);

//调试接口：指定招新状态
export const updateStatusOnTest = p => post(`${url1}status/updateStatusOnTest`, p);

//获取所有学院
export const listAllCollege = p => get(`${url2}college/list`);

//获取指定学院下的专业
export const listMajor = p => post(`${url2}major/college`, p);

//获取全部专业
export const listAllMajor = () => get(`${url2}major/list`);

// 给邮箱发送验证码
export const sendCkeckNumber = p => post(`${url1}user/Verification`, p);

//回退上一阶段
export const toPreviousStatus = p => post(`${url2}status/toPreviousStatus`, p);

//查询所有用户分数
export const listAllUser = p => post(`${url2}status/listAllUser`, p);

//打分
export const addAppraise = p => post(`${url1}admin/addAppraise`, p);

// 学生或管理员注册
export const userRegister = p => post(`${url2}user/Regiest`, p);

// 查询所有用户的报名信息
export const enrolllist = p => get(`${url2}enroll/list`, p);

//用户签到加入等待队列
export const queue = p => post(`${url1}queue/signIn`, p);

//获取当前签到是否开启
export const queueStatus = () => post(`${url1}queue/checkStatus`);

//管理员开启签到状态
export const startQueue = p => post(`${url1}queue/startQueue`,p);

//管理员关闭签到状态
export const closeQueue = p => post(`${url1}queue/closeQueue`,p);

//检测管理员当前是否开启签到状态
export const checkStatus = p => post(`${url1}queue/checkStatus`,p);

// 用户登录
export const userLogin = p => post(`${url2}user/Login`, p);

//批量淘汰
export const batcheliminate = p => post(`${url2}enroll/eliminate`,p);

//获得签到参加面试的用户信息
export const listWaitingUser = p => post(`${url1}queue/listWaitingUser`,p);

// 管理员叫号
export const getUser = p =>post(`${url1}queue/getUser`, p);

//获取某个学生详细分数信息
export const getUserDetailInfo = p =>post(`${url1}status/getUserDetailInfo`, p);

//确认用户参加了面试
export const participate = p => post(`${url1}queue/participate`, p);

//确认用户未参加面试
export const notParticipate = p => post(`${url1}queue/notParticipate`, p);

//上传头像
export const avatar = p => post(`${url2}upload/avatar`, p);

// 获取头像的路径
export const getavatar = p => get(`${url2}avatar`, p);

// 修改管理员信息
export const complete = p => post(`${url2}console/complete`, p);

//开放预约
export const appointmentstart = p => post(`${url1}appointment/start`, p);

//关闭预约
export const appointmentclose = p => post(`${url1}appointment/close`, p);

//查看当前预约
export const appointmentcheck = p => post(`${url1}appointment/check`, p);

// 淘汰所有未预约，未参加笔试面试的学生
export const eliminateUser = p => post(`${url1}status/eliminateUser`, p);

//推送消息给全部用户
export const pushToAll = p => post(`${url1}message/pushToAll`, p);

// 推送消息给通过或者淘汰的用户
export const message_push = p => post(`${url1}message/push`, p);

// 批量通过
export const pass = p => post(`${url2}enroll/pass`, p);

// 获得某个预约时间段预约的用户
export const appointment_listUser = p => post(`${url2}appointment/listUser`, p);

// 退出登录
export const logout = p => get(`${url2}user/logout`, p);

// 获取管理员的全部信息
export const attain = p => get(`${url2}console/attain`, p);

// 根据用户id获取用户的头像
export const loadavatar = p => post(`${url2}load/avatar`, p);

// 推送消息给某个用户
export const pushToUser = p => post(`${url1}message/pushToUser`, p);








// export const login111 = p => post11('/user/Login', p);
// export const login222 = p => post22('/major/list', p);
// export const login111 = p => instance11('/major/list', p);
// export const login222 = p => instance22('/user/Login', p);


