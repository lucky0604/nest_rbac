import {Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository, ObjectID, getManager} from 'typeorm'
import {RepositoryService} from '../../common/services/repository.service'
import {ResultList} from '../../common/interfaces/result.interface'
import {Page} from '../entities/page.entity'
import {Control} from '../entities/control.entity'
import * as _ from 'lodash'

export interface PageQuery {
  name?: string
  moduleId?: string
}

@Injectable()
export class PageService extends RepositoryService<Page> {
  constructor(
    @InjectRepository(Page)
    private readonly entityRepository: Repository<Page>,
    @InjectRepository(Control)
    private readonly controlRepository: Repository<Control>
  ) {
    super(entityRepository)
  }

  async findOne(id: string | number | Date | ObjectID): Promise<Page> {
    return await this.entityRepository.createQueryBuilder('page')
      .leftJoinAndSelect('page.controls', 'control')
      .where('page.id=:id', {id: id})
      .getOne()
  }

  async create(entity: Page): Promise<Page> {
    return await getManager().transaction<Page>(async x => {
      let result = await this.entityRepository.save(entity)
      if (entity.controls instanceof Array) {
        entity.controls.forEach(async (y, index) => {
          y.sort = index
          await this.controlRepository.save(y)
        })
        return result
      }
    })
  }

  /**
   * 
   * @param entity update logic
   */
  async update(entity: Page): Promise<Page> {
    let find = await this.entityRepository.findOne(entity.id, {relations: ['controls']})
    entity.controls.forEach((x, i) => {x.sort = i})
    if (find) {
      return await getManager().transaction(async x => {
        let removes = _.filter(find.controls, y => !_.find(entity.controls, z => y.id == z.id)) as Control[]
        let adds = _.filter(entity.controls, y => !_.find(find.controls, z => y.id == z.id)) as Control[]
        let updates = _.filter(find.controls, y => _.find(entity.controls, z => y.id == z.id)) as Control[]
        if (removes instanceof Array) await this.controlRepository.remove(removes)
        if (adds instanceof Array) adds.forEach(async y => await this.controlRepository.save(y))
        if (updates instanceof Array) updates.forEach(async y => {
          await this.controlRepository.save(Object.assign(y, _.find(entity.controls, z => z.id == y.id)))
        })
        Object.assign(find, entity)
        let result = await this.entityRepository.save(find)
        return result
      })
    }
  }

  
}