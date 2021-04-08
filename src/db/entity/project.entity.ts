import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne } from 'typeorm';
import UserEntity from './user.entity';

@Entity()
export default class ProjectEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500 })
    title: string;

    @Column()
    deadline: Date;

    @Column({ length: 50 })
    type: string;

    @Column({ length: 50 })
    size: string;

    @Column({ length: 500 })
    description: string;

    @Column()
    skillGuarantee: boolean;

    @Column({ length: 500 })
    subject: string;

    @ManyToOne(type => UserEntity, user => user.posts)
    employer: UserEntity;
}