import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne, OneToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import UserEntity from './user.entity';

@Entity()
export default class RateEntity extends BaseEntity {

    @PrimaryColumn()
    raterID: number;

    @PrimaryColumn()
    ratedID: number;

    @Column()
    rate: number;

    @ManyToOne(type => UserEntity, user => user.rated)
    @JoinColumn({ name: 'raterID'})
    rater: UserEntity;

    @ManyToOne(type => UserEntity, user => user.wasRated)
    @JoinColumn({ name: 'ratedID'})
    rated: UserEntity;
}