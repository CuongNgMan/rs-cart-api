import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CartItems } from './cart-item.entity';

@Entity()
export class Carts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'enum', enum: ['OPEN', 'ORDERED'], default: 'OPEN' })
  status: string;

  @OneToMany(
    () => CartItems,
    cartItem => cartItem.cart,
  )
  items: CartItems[];
}
