export enum ApiErrorCode {
  TIMEOUT = -1,     // 系统繁忙
  SUCCESS = 0,      // 成功

  /**
   * 用户ID无效
   */
  USER_ID_INVALID = 10001,

  /**
   * 用户账号无效
   */
  USER_ACCOUNT_INVALID = 10002,

  /**
   * 用户密码无效
   */
  USER_PASSWORD_INVALID = 10003,

  /**
   * 用户姓名无效
   */
  USER_NAME_INVALID = 10004,

  /**
   * 用户邮箱无效
   */
  USER_EMAIL_INVALID = 10005,

  /**
   * 用户电话无效
   */
  USER_PHONE_INVALID = 10006,

  /**
   * 用户账号获密码无效
   */
  USER_ACCOUNT_PASSWORD_INVALID = 10007
}