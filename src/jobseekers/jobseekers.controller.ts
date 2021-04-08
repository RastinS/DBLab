import { Body, Controller, Post, UseGuards, Request, Put, Param, ParseIntPipe, Delete, Get } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/enums/role.enum';
import CreateBlogPostDto from './dto/create-blogPost.dto';
import CreateProjectDto from './dto/create-Project.dto';
import EditBlogPostDto from './dto/edit-blogPost.dto';
import { JobseekersService } from './jobseekers.service';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';

@Controller('jobseekers')
export class JobseekersController {
    constructor(private readonly jobseekersService: JobseekersService) {}

    // Blog Post Operations

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('blogPost/:id')
    @ApiBearerAuth('JWT')
    @Roles(Role.Admin)
    getBlogPost(@Param('id', ParseIntPipe) postID: number) {
        return this.jobseekersService.getBlogPost(postID);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('blogPost')
    @ApiBearerAuth('JWT')
    @Roles(Role.Admin)
    addBlogPost(@Body() blogPostDetails: CreateBlogPostDto, @Request() req) {
        return this.jobseekersService.addBlogPost(blogPostDetails, req.user);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put('blogPost/:id')
    @ApiBearerAuth('JWT')
    @Roles(Role.Admin)
    editBlogPost(@Body() blogPostDetails: EditBlogPostDto, @Request() req, @Param('id', ParseIntPipe) postID: number) {
        return this.jobseekersService.editBlogPost(blogPostDetails, req.user, postID);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete('blogPost/:id')
    @ApiBearerAuth('JWT')
    @Roles(Role.Admin)
    deleteBlogPost(@Param('id', ParseIntPipe) postID: number) {
        return this.jobseekersService.deleteBlogPost(postID);
    }

    // Project Operations
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('project/:id')
    @ApiBearerAuth('JWT')
    @Roles(Role.Admin, Role.Employer)
    getProject(@Param('id', ParseIntPipe) projectID: number) {
        return this.jobseekersService.getProject(projectID);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('project')
    @ApiBearerAuth('JWT')
    @Roles(Role.Admin, Role.Employer)
    addProject(@Body() projectDetail: CreateProjectDto, @Request() req) {
        return this.jobseekersService.addProject(projectDetail, req.user);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put('project/:id')
    @ApiBearerAuth('JWT')
    @Roles(Role.Admin, Role.Employer)
    editProject(@Body() projectDetail: CreateProjectDto, @Request() req, @Param('id', ParseIntPipe) projectID: number) {
        return this.jobseekersService.editProject(projectDetail, req.user, projectID);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete('project/:id')
    @ApiBearerAuth('JWT')
    @Roles(Role.Admin, Role.Employer)
    deleteProject(@Param('id', ParseIntPipe) projectID: number) {
        return this.jobseekersService.deleteProject(projectID);
    }
}
