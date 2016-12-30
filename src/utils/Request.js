import reqwest from 'reqwest';

const SUCCESS_CODE = 200;
const FAIL_CODE = 500;
const Request = ({url, method, data, onSuc, onFail, onErr, onOther, contentType}) => {
    var isMock = window.location.host == '127.0.0.1:3005';

    let fail = resp => resp.code = FAIL_CODE;
    let success = resp => resp.code = SUCCESS_CODE;

    var suffix = isMock ? '/mocks/' : '/tgnotice/';
    var prefix = isMock ? '.json' : '';

    return reqwest({
        url: suffix + url + prefix,
        type: 'json',
        contentType: contentType || 'application/x-www-form-urlencoded',
        method: (isMock || !method) ? 'GET' : method,
        data: data,
        error: err => {
            f(onErr, [err]);
        },
        success: resp => {
            switch (resp.code) {
                case SUCCESS_CODE:
                    f(onSuc, [resp]);
                    break;
                case FAIL_CODE:
                    f(onFail, [resp]);
                    break;
                default:
                    f(onOther, [resp]);
                    break;
            }
        }
    });
};

const f = (func, params) => {
    func && func(...params);
};

export default Request;