import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { GeneratePassword } from 'src/utils/HashPassword';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();

    const count = await this.user.count();
    if (count === 0) {
      const password = GeneratePassword('admin123');
      await this.user.create({
        data: {
          name: 'admin',
          email: 'admin@admin.com',
          password,
          role: 'ADMIN',
        },
      });
    }
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
