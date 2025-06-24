import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseGuards,
  Request,
  NotFoundException,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  findAll(@Request() req) {
    return this.projectsService.findAllForUser(req.user.userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Request() req) {
    const project = await this.projectsService.findByIdAndUser(
      id,
      req.user.userId,
    );

    if (!project) {
      console.warn(
        `Access denied: user ${req.user.userId} tried to access project ${id}`,
      );

      throw new NotFoundException('Project not found');
    }

    return project;
  }

  @Post()
  create(@Body() body: { name: string }, @Request() req) {
    return this.projectsService.createProject(body.name, req.user.userId);
  }
}
