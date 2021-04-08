import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import BookEntity from './book.entity';
import BlogPostEntity from './blogPost.entity';
import { Role } from '../../enums/role.enum'

@Entity()
export default class UserEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  username: string;

  @Column({ length: 500 })
  password: string;

  @Column({ length: 500 })
  email: string;

  @Column({ length: 50 })
  phoneNumber: string;

  @Column("text", { array: true })
  roles: Role[];

  // 1:n relation with bookEntity 
  @OneToMany( type => BookEntity , book => book.user, {
    onDelete: "CASCADE"
  })
  books: BookEntity[];

  @OneToMany( type => BlogPostEntity, post => post.publisher, {
    onDelete: "CASCADE"
  })
  posts: BlogPostEntity[];
}