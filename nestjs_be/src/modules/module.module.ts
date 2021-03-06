import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {Module as M} from './entities/module.entity'
import {ModuleService} from './services/module.service'
import {ModuleController} from './controllers/module.controller'
import {Page} from './entities/page.entity'
import {PageService} from './services/page.service'
import {PageController} from './controllers/page.controller'
import {Control} from './entities/control.entity'
import {Col} from './entities/col.entity'
import {Table} from './entities/table.entity'
import {TableService} from './services/table.service'
import {TableController} from './controllers/table.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([M, Page, Control, Table, Col])
  ],
  controllers: [
    ModuleController,
    PageController,
    TableController
  ],
  providers: [
    ModuleService,
    PageService,
    TableService
  ]
})
export class ModuleModule {}