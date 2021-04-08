import { Body, Controller, Post, UseGuards, Request, Put, Param, ParseIntPipe, Delete, Get } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/enums/role.enum';
import CreateBlogPostDto from './dto/create-blogPost.dto';
import EditBlogPostDto from './dto/edit-blogPost.dto';
import { JobseekersService } from './jobseekers.service';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';

@Controller('jobseekers')
export class JobseekersController {
    constructor(private readonly jobseekersService: JobseekersService) {}

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
}
