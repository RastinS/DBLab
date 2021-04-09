import { Body, Controller, Post, UseGuards, Request, Put, Param, ParseIntPipe, Delete, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/enums/role.enum';
import CreateBlogPostDto from './dto/create-blogPost.dto';
import CreateProjectDto from './dto/create-Project.dto';
import CreateRateDto from './dto/create-rate.dto';
import CreateResumeDto from './dto/create-resume.dto';
import CreateResmueDto from './dto/create-resume.dto';
import EditBlogPostDto from './dto/edit-blogPost.dto';
import GetDeleteRateDto from './dto/get-delete-rate.dto';
import { JobseekersService } from './jobseekers.service';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';

@Controller('jobseekers')
export class JobseekersController {
    constructor(private readonly jobseekersService: JobseekersService) {}

    // Blog Post Operations

    @ApiResponse({ status: 404, description: 'Resource was not found' }) 
    @Get('blogPost/:id')
    getBlogPost(@Param('id', ParseIntPipe) postID: number) {
        const blogPost = this.jobseekersService.getBlogPost(postID).finally();
        return blogPost;
    }

    @Get('blogPost')
    getAll() {
        return this.jobseekersService.getAllPosts();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiResponse({ status: 401, description: 'Unauthorized' }) 
    @ApiResponse({ status: 403, description: 'Forbidden resource' }) 
    @Post('blogPost')
    @ApiBearerAuth('JWT')
    @Roles(Role.Admin)
    addBlogPost(@Body() blogPostDetails: CreateBlogPostDto, @Request() req) {
        return this.jobseekersService.addBlogPost(blogPostDetails, req.user);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiResponse({ status: 401, description: 'Unauthorized' }) 
    @ApiResponse({ status: 403, description: 'Forbidden resource' }) 
    @ApiResponse({ status: 404, description: 'Resource was not found' }) 
    @Put('blogPost/:id')
    @ApiBearerAuth('JWT')
    @Roles(Role.Admin)
    editBlogPost(@Body() blogPostDetails: EditBlogPostDto, @Request() req, @Param('id', ParseIntPipe) postID: number) {
        return this.jobseekersService.editBlogPost(blogPostDetails, req.user, postID);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiResponse({ status: 401, description: 'Unauthorized' }) 
    @ApiResponse({ status: 403, description: 'Forbidden resource' }) 
    @ApiResponse({ status: 404, description: 'Resource was not found' }) 
    @Delete('blogPost/:id')
    @ApiBearerAuth('JWT')
    @Roles(Role.Admin)
    deleteBlogPost(@Param('id', ParseIntPipe) postID: number) {
        return this.jobseekersService.deleteBlogPost(postID);
    }

    // Project Operations
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiResponse({ status: 401, description: 'Unauthorized' }) 
    @ApiResponse({ status: 403, description: 'Forbidden resource' }) 
    @ApiResponse({ status: 404, description: 'Resource was not found' }) 
    @Get('project/:id')
    @ApiBearerAuth('JWT')
    @Roles(Role.Admin, Role.Employer, Role.Freelancer)
    getProject(@Param('id', ParseIntPipe) projectID: number) {
        return this.jobseekersService.getProject(projectID);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiResponse({ status: 401, description: 'Unauthorized' }) 
    @ApiResponse({ status: 403, description: 'Forbidden resource' }) 
    @Post('project')
    @ApiBearerAuth('JWT')
    @Roles(Role.Admin, Role.Employer)
    addProject(@Body() projectDetail: CreateProjectDto, @Request() req) {
        return this.jobseekersService.addProject(projectDetail, req.user);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiResponse({ status: 401, description: 'Unauthorized' }) 
    @ApiResponse({ status: 403, description: 'Forbidden resource (Role or not being the owner)' })
    @ApiResponse({ status: 404, description: 'Resource was not found' })  
    @Put('project/:id')
    @ApiBearerAuth('JWT')
    @Roles(Role.Admin, Role.Employer)
    editProject(@Body() projectDetail: CreateProjectDto, @Request() req, @Param('id', ParseIntPipe) projectID: number) {
        return this.jobseekersService.editProject(projectDetail, req.user, projectID);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiResponse({ status: 401, description: 'Unauthorized' }) 
    @ApiResponse({ status: 403, description: 'Forbidden resource (Role or not being the owner)' })
    @ApiResponse({ status: 404, description: 'Resource was not found' }) 
    @Delete('project/:id')
    @ApiBearerAuth('JWT')
    @Roles(Role.Admin, Role.Employer)
    deleteProject(@Param('id', ParseIntPipe) projectID: number, @Request() req) {
        return this.jobseekersService.deleteProject(projectID, req.user);
    }

    // Resume Operations
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiResponse({ status: 401, description: 'Unauthorized' }) 
    @ApiResponse({ status: 403, description: 'Forbidden resource' }) 
    @ApiResponse({ status: 404, description: 'Resource was not found' }) 
    @Get('resume')
    @ApiBearerAuth('JWT')
    @Roles(Role.Admin, Role.Freelancer)
    getResume( @Request() req) {
        return this.jobseekersService.getResume(req.user);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiResponse({ status: 401, description: 'Unauthorized' }) 
    @ApiResponse({ status: 403, description: 'Forbidden resource' }) 
    @Post('resume')
    @ApiBearerAuth('JWT')
    @Roles(Role.Admin, Role.Freelancer)
    addResume(@Body() resumeDetails: CreateResumeDto, @Request() req) {
        return this.jobseekersService.addResume(resumeDetails, req.user);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiResponse({ status: 401, description: 'Unauthorized' }) 
    @ApiResponse({ status: 403, description: 'Forbidden resource' }) 
    @ApiResponse({ status: 404, description: 'Resource was not found' }) 
    @Put('resume')
    @ApiBearerAuth('JWT')
    @Roles(Role.Admin, Role.Freelancer)
    editResume(@Body() resumeDetails: CreateResumeDto, @Request() req) {
        return this.jobseekersService.editResume(resumeDetails, req.user);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiResponse({ status: 401, description: 'Unauthorized' }) 
    @ApiResponse({ status: 403, description: 'Forbidden resource' }) 
    @ApiResponse({ status: 404, description: 'Resource was not found' }) 
    @Delete('resume')
    @ApiBearerAuth('JWT')
    @Roles(Role.Admin, Role.Freelancer)
    deleteResume(@Request() req) {
        return this.jobseekersService.deleteResume(req.user);
    }

    // Rate Operations
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden resource' })  
    @ApiResponse({ status: 404, description: 'Resource was not found' }) 
    @Get('rate/:ratedID')
    @ApiBearerAuth('JWT')
    @Roles(Role.Admin, Role.Freelancer, Role.Employer)
    getRate(@Param('ratedID', ParseIntPipe) ratedID: number, @Request() req) {
        return this.jobseekersService.getRate(req.user, ratedID);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden resource' })  
    @ApiResponse({ status: 404, description: 'Resource was not found' }) 
    @Get('rate')
    @ApiBearerAuth('JWT')
    @Roles(Role.Admin, Role.Freelancer, Role.Employer)
    getAllUserRates(@Request() req) {
        return this.jobseekersService.getAllUserRates(req.user);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiResponse({ status: 401, description: 'Unauthorized' }) 
    @ApiResponse({ status: 403, description: 'Forbidden resource' }) 
    @Post('rate')
    @ApiBearerAuth('JWT')
    @Roles(Role.Admin, Role.Freelancer, Role.Employer)
    addRate(@Body() rateDetails: CreateRateDto, @Request() req) {
        return this.jobseekersService.addRate(rateDetails, req.user);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiResponse({ status: 401, description: 'Unauthorized' }) 
    @ApiResponse({ status: 403, description: 'Forbidden resource' }) 
    @ApiResponse({ status: 404, description: 'Resource was not found' }) 
    @Put('rate')
    @ApiBearerAuth('JWT')
    @Roles(Role.Admin, Role.Freelancer, Role.Employer)
    editRate(@Body() rateDetails: CreateRateDto, @Request() req) {
        return this.jobseekersService.editRate(rateDetails, req.user);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiResponse({ status: 401, description: 'Unauthorized' }) 
    @ApiResponse({ status: 403, description: 'Forbidden resource' }) 
    @ApiResponse({ status: 404, description: 'Resource was not found' }) 
    @Delete('rate/:ratedID')
    @ApiBearerAuth('JWT')
    @Roles(Role.Admin, Role.Freelancer, Role.Employer)
    deleteRate(@Param('ratedID', ParseIntPipe) ratedID: number, @Request() req) {
        return this.jobseekersService.deleteRate(req.user, ratedID);
    }
}
