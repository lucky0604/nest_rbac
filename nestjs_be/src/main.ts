import {NestFactory} from '@nestjs/core'
import {AppModule} from './app.module'
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger'
import {HttpExceptionFilter} from './common/filters/http-exceptions.filter'
import {ApiParamValidationPipe} from './common/pipes/api-params-validation.pipe'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalPipes(new ApiParamValidationPipe())

  const options = new DocumentBuilder()
    .setTitle('Nest RBAC')
    .setDescription('nest rbac api')
    .setVersion('1.0')
    .addTag('nest-rbac')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)
  await app.listen(3000)
}

bootstrap()