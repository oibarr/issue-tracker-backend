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
import { IssuesService } from './issues.service';
import { ProjectsService } from '../projects/projects.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('projects/:projectId/issues')
export class IssuesController {
  constructor(
    private readonly issuesService: IssuesService,
    private readonly projectsService: ProjectsService,
  ) {}

  @Get()
  async findAll(@Param('projectId') projectId: number, @Request() req) {
    const project = await this.projectsService.findByIdAndUser(
      projectId,
      req.user.userId,
    );

    if (!project) {
      console.warn(
        `Access denied: user ${req.user.userId} tried to access project ${projectId}`,
      );

      throw new NotFoundException('Project not found');
    }

    return this.issuesService.findAllForProject(projectId);
  }

  @Post()
  async create(
    @Param('projectId') projectId: number,
    @Body() body: { title: string },
    @Request() req,
  ) {
    const project = await this.projectsService.findByIdAndUser(
      projectId,
      req.user.userId,
    );

    if (!project) {
      console.warn(
        `Access denied: user ${req.user.userId} tried to access project ${projectId}`,
      );

      throw new NotFoundException('Project not found');
    }

    return this.issuesService.createIssue(body.title, projectId);
  }
}
