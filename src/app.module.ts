import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Song } from './songs/entities';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { User } from './users/entities';
import { Artist } from './artists/entities';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard, RolesGuard } from './common/guards';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validate } from './appconfig/validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validate,
      isGlobal: true
    }),
    SongsModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>("DATABASE_SERVER"),
        port: configService.get<number>("DATABASE_PORT"),
        username: configService.get<string>("DATABASE_USERNAME"),
        password: configService.get<string>("DATABASE_USER_PASS"),
        database: configService.get<string>("DATABASE_NAME"),
        entities: [User, Artist, Song]
      }),
    }),
    UsersModule,
    ArtistsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }

  constructor(private dataSource: DataSource) {}

}
