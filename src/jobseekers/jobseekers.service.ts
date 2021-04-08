import { Injectable, Post } from '@nestjs/common';
import BlogPostEntity from 'src/db/entity/blogPost.entity';
import ProjectEntity from 'src/db/entity/project.entity';
import UserEntity from 'src/db/entity/user.entity';
import CreateBlogPostDto from './dto/create-blogPost.dto'
import CreateProjectDto from './dto/create-Project.dto';
import EditBlogPostDto from './dto/edit-blogPost.dto';


@Injectable()
export class JobseekersService {
    
    // Blog Post Operations
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

    // Project Operations

    async addProject(projectDetail: CreateProjectDto, user: any) {
        const project: ProjectEntity = ProjectEntity.create();
        const {title, deadline, type, size, description, skillGuarantee, subject} = projectDetail;

        project.title = title;
        project.deadline = deadline;
        project.type = type;
        project.size = size;
        project.description = description;
        project.skillGuarantee = skillGuarantee;
        project.subject = subject;

        project.employer = user.userID;
        await ProjectEntity.save(project);
        return project;
    }

    async editProject(projectDetail: CreateProjectDto, user: any, projectID: number) {
        const project: ProjectEntity = await ProjectEntity.findOne({where: {id: projectID}});

        const {title, deadline, type, size, description, skillGuarantee, subject} = projectDetail;

        project.title = title;
        project.deadline = deadline;
        project.type = type;
        project.size = size;
        project.description = description;
        project.skillGuarantee = skillGuarantee;
        project.subject = subject;

        return await ProjectEntity.update(projectID, project);
    }

    async deleteProject(projectID: number) {
        return await ProjectEntity.delete(projectID);
    }

    async getProject(projectID: number) {
        return await ProjectEntity.findOne({where: {id: projectID}});
    }
}
