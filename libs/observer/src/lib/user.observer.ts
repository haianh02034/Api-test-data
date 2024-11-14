import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '@entity';

@EventSubscriber()
export class UserObserver implements EntitySubscriberInterface<User> {
  listenTo() {
    return User;
  }

  async beforeInsert(event: InsertEvent<User>) {
    const salt = await bcrypt.genSalt();
    event.entity.password = await bcrypt.hash(event.entity.password, salt);

    const repo = event.manager.getRepository(User);
    event.entity.id = Math.max(1, (await repo.count()) + 1);
  }

  async beforeUpdate(event: UpdateEvent<User>) {
    if (event.entity.password) {
      const salt = await bcrypt.genSalt();
      event.entity.password = await bcrypt.hash(event.entity.password, salt);
    }
  }
}
