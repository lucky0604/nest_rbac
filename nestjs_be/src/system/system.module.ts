import {Module} from '@nestjs/common'

import {ActionsModule} from './actions/action.module'
import {UsersModule} from './users/user.module'
import {RolesModule} from './roles/roles.module'
import {MenusModule} from './menus/menus.module'
import {OrganizationModule} from './organization/organization.module'

@Module({
  imports: [
    UsersModule,
    RolesModule,
    MenusModule,
    ActionsModule,
    OrganizationModule
  ]
})
export class SystemModule {}