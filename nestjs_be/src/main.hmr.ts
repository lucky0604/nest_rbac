import {NestFactory} from '@nestjs/core'
import {AppModule} from './app.module'
import {HttpExceptionFilter} from './common/filters/http-exceptions.filter'
import {ApiParamValidationPipe} from './common/pipes/api-params-validation.pipe'
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'

declare const module: any

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalPipes(new ApiParamValidationPipe())
  app.enableCors()

  const options = new DocumentBuilder()
    .setTitle('Nest-RBAC')
    .setDescription('Nest rbac api')
    .setVersion('1.0')
    .addTag('nest')
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)
  await app.listen(3000)

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
}

bootstrap()