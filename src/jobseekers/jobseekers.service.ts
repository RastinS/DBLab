import { Injectable, Post } from '@nestjs/common';
import BlogPostEntity from 'src/db/entity/blogPost.entity';
import ProjectEntity from 'src/db/entity/project.entity';
import RateEntity from 'src/db/entity/rate.entity';
import rateEntity from 'src/db/entity/rate.entity';
import ResumeEntity from 'src/db/entity/resume.entity';
import UserEntity from 'src/db/entity/user.entity';
import CreateBlogPostDto from './dto/create-blogPost.dto'
import CreateProjectDto from './dto/create-Project.dto';
import CreateRateDto from './dto/create-rate.dto';
import CreateResumeDto from './dto/create-resume.dto';
import EditBlogPostDto from './dto/edit-blogPost.dto';


@Injectable()
export class JobseekersService {
    
    // Blog Post Operations
    async addBlogPost(blogPostDetails: CreateBlogPostDto, user: any) {
        const blogPost: BlogPostEntity = BlogPostEntity.create();
        const {title, date, text} = blogPostDetails;

        blogPost.title = title;
        blogPost.date = date;
        blogPost.text = text;
        blogPost.publisher = user.userID;
        await BlogPostEntity.save(blogPost);
        return blogPost;
    }

    async editBlogPost(blogPostDetails: EditBlogPostDto, user: any, postID: number) {
        const blogPost: BlogPostEntity = await BlogPostEntity.findOne({where: {id: postID}});
        blogPost.title = blogPostDetails.title;
        blogPost.text = blogPostDetails.text;
        return await BlogPostEntity.update(postID, blogPost);
    }

    async deleteBlogPost(postID: number) {
        return await BlogPostEntity.delete(postID);
    }

    async getBlogPost(postID: number) {
        return await BlogPostEntity.findOne({where: {id: postID}});
    }

    // Project Operations

    async addProject(projectDetails: CreateProjectDto, user: any) {
        const project: ProjectEntity = ProjectEntity.create();
        const {title, deadline, type, size, description, skillGuarantee, subject} = projectDetails;

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

    async editProject(projectDetails: CreateProjectDto, user: any, projectID: number) {
        const project: ProjectEntity = await ProjectEntity.findOne({where: {id: projectID}});

        const {title, deadline, type, size, description, skillGuarantee, subject} = projectDetails;

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

    // Resume Operations
    async addResume(resumeDetails: CreateResumeDto, user: any) {
        const resume: ResumeEntity = ResumeEntity.create();
        const {name, text} = resumeDetails;

        resume.name = name;
        resume.text = text;
        resume.isFor = user.userID;
        await ResumeEntity.save(resume);
        return resume;
    }

    async editResume(resumeDetails: CreateResumeDto, user: any) {
        const userEntity: UserEntity = await UserEntity.findOne({where: {id:user.userID}, relations: ['resume']})
        const {name, text} = resumeDetails;
        userEntity.resume.name = name;
        userEntity.resume.text = text;

        return await ResumeEntity.update(userEntity.resume.id, userEntity.resume)
    }

    async deleteResume(user: any) {
        const userEntity: UserEntity = await UserEntity.findOne({where: {id:user.userID}, relations: ['resume']})
        return await ResumeEntity.delete(userEntity.resume.id);
    }

    async getResume(user: any) {
        const userEntity: UserEntity = await UserEntity.findOne({where: {id:user.userID}, relations: ['resume']})
        return userEntity.resume;
    }

    // Rate Operations
    async addRate(rateDetails: CreateRateDto, user: any) {
        const rateEntity: RateEntity = RateEntity.create();
        const {rate, ratedID} = rateDetails;

        rateEntity.rate = rate;
        rateEntity.ratedID = ratedID;
        rateEntity.raterID = user.userID;
        await RateEntity.save(rateEntity);
        return rateEntity;
    }

    async editRate(rateDetails: CreateRateDto, user: any) {
        const {rate, ratedID} = rateDetails;
        const rateEntity: RateEntity = await RateEntity.findOne({where: {raterID:user.userID, ratedID:ratedID}})
        rateEntity.rate = rate;

        return await RateEntity.update({raterID:user.userID, ratedID:ratedID}, rateEntity)
    }

    async deleteRate(user: any, ratedID: number) {
        return await RateEntity.delete({raterID:user.userID, ratedID:ratedID});
    }

    async getRate(user: any, ratedID: number) {
        return await RateEntity.findOne({where: {raterID:user.userID, ratedID:ratedID}})
    }
}
