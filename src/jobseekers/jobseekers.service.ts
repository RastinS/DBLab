import { Injectable, Post } from '@nestjs/common';
import BlogPostEntity from 'src/db/entity/blogPost.entity';
import UserEntity from 'src/db/entity/user.entity';
import CreateBlogPostDto from './dto/create-blogPost.dto'
import EditBlogPostDto from './dto/edit-blogPost.dto';


@Injectable()
export class JobseekersService {
    
    async addBlogPost(blogPostDetail: CreateBlogPostDto, user: any) {
        const blogPost: BlogPostEntity = BlogPostEntity.create();
        const {title, date, text} = blogPostDetail;

        blogPost.title = title;
        blogPost.date = date;
        blogPost.text = text;
        blogPost.publisher = user.userID;
        await BlogPostEntity.save(blogPost);
        return blogPost;
    }

    async editBlogPost(blogPostDetail: EditBlogPostDto, user: any, postID: number) {
        const blogPost: BlogPostEntity = await BlogPostEntity.findOne({where: {id: postID}});
        blogPost.title = blogPostDetail.title;
        blogPost.text = blogPostDetail.text;
        return await BlogPostEntity.update(postID, blogPost);
    }

    async deleteBlogPost(postID: number) {
        return await BlogPostEntity.delete(postID);
    }

    async getBlogPost(postID: number) {
        return await BlogPostEntity.findOne({where: {id: postID}});
    }
}
