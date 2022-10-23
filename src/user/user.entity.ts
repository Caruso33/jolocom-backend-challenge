import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class UserMetaEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ default: false })
  hasJoinedInvitation: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  email: string

  @OneToOne(() => UserMetaEntity)
  @JoinColumn()
  metadata: UserMetaEntity
}
