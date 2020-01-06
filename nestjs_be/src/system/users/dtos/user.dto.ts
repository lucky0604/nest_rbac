import {IsNotEmpty, IsInt} from 'class-validator'
import {ApiErrorCode} from '../../../common/enums/api-error-code.enum'
import {Role} from '../../../system/roles/entities/role.entity'
import {Organization} from '../../../system/organization/entities/organization.entity'

export class UserDto {
  @IsNotEmpty({message: 'Username is required', context: {errorCode: ApiErrorCode.USER_NAME_INVALID}})
  name: string

  @IsNotEmpty({message: 'Password is required!', context: {errorCode: ApiErrorCode.USER_PASSWORD_INVALID}})
  password: string

  email: string
  phone: string
  roles: Role[]
  organizations: Organization[]
}

export class LoginDto {
  @IsNotEmpty({message: 'Account is required!', context: {errorCode: ApiErrorCode.USER_ACCOUNT_INVALID}})
  account: string
  @IsNotEmpty({message: 'Password is required!', context: {errorCode: ApiErrorCode.USER_PASSWORD_INVALID}})
  password: string
}

export class CreateUserDto extends UserDto {
  @IsNotEmpty({message: 'Account is required!', context: {errorCode: ApiErrorCode.USER_ACCOUNT_INVALID}})
  account: string
}

export class UpdateUserDto extends UserDto {
  @IsNotEmpty({message: 'ID is required!', context: {errorCode: ApiErrorCode.USER_ACCOUNT_INVALID}})
  id: number
}