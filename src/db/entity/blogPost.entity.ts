import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, JoinColumn, ManyToOne } from 'typeorm';
import UserEntity from './user.entity';

@Entity()
export default class BlogPostEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ length: 500 })
    title: string;

    @Column()
    date: Date;

    @Column({ length: 5000 })
    text: string;

    @ManyToOne(type => UserEntity, user => user.posts)
    publisher: UserEntity;
    

}