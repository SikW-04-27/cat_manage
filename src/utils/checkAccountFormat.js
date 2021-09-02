
// 该函数用来验证学生或者用户注册时验证用户名,邮箱，密码等的格式是否正确


export default function (name, mail, password) {

    // 返回的提示信息
    let checkTips = '';
    let checkFlag = 1;

    // 验证用户名
    const checkName = /^([a-zA-Z0-9_-]|[\u4E00-\u9FA5]){2,20}$/;
    // 验证邮箱格式
    const checkMail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    // 验证密码格式
    const checkPassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,18}$/;
   

    if (!checkName.test(name)) {
        checkTips = '用户名格式错误';
        checkFlag = 0;
    } else {
        checkTips = '';
        checkFlag = 1;
    }

    if (!checkMail.test(mail)) {
        checkTips += '邮箱格式错误';
        checkFlag = 0;
    }

    if (!checkPassword.test(password)) {
        checkTips += '密码格式错误';
        checkFlag = 0;
    }


    return [checkFlag, checkTips];
}