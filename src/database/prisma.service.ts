import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { GeneratePassword } from 'src/utils/HashPassword';

import { faker } from '@faker-js/faker';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();

    const count = await this.user.count();
    if (count === 0) {
      const password = GeneratePassword('admin123');
      const user = await this.user.create({
        data: {
          name: 'admin',
          email: 'admin@admin.com',
          password,
          role: 'ADMIN',
        },
      });

      // const movies = [];
      // for (let i = 0; i < 10; i++) {
      //   movies.push({
      //     title: faker.lorem.words(3),
      //     note: faker.number.float({ min: 0, max: 5 }),
      //     img_url: faker.image.url(),
      //     description: faker.lorem.words(10),
      //     userId: user.id,
      //   });
      // }
      // await this.movies.createMany({
      //   data: movies,
      // });
    }
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
