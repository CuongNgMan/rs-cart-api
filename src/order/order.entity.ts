import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Carts } from '../cart/cart.entity';

@Entity()
export class Orders {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  userId: string;

  @ManyToOne(() => Carts)
  @JoinColumn({ name: 'cart_id' })
  cart: Carts;

  @Column({ type: 'json', default: 'credit_card' })
  payment: any;

  @Column('json', { nullable: true })
  delivery: any;

  @Column('text', { nullable: true })
  comments: string;

  @Column('text')
  status: string;

  @Column('float')
  total: number;
}
