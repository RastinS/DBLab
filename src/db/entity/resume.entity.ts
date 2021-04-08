import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import UserEntity from './user.entity';

@Entity()
export default class ResumeEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 50})
    name: string;

    @Column({ length: 5000 })
    text: string;

    @OneToOne(() => UserEntity, isFor => isFor.resume)
    @JoinColumn()
    isFor: UserEntity;
}