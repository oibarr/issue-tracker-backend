import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepo: Repository<Project>,
  ) {}

  async findAllForUser(userId: number): Promise<Project[]> {
    return this.projectsRepo.find({
      where: { owner: { id: userId } },
    });
  }

  async findByIdAndUser(
    projectId: number,
    userId: number,
  ): Promise<Project | null> {
    return this.projectsRepo.findOne({
      where: { id: projectId, owner: { id: userId } },
    });
  }

  async createProject(name: string, userId: number): Promise<Project> {
    const project = this.projectsRepo.create({
      name,
      owner: { id: userId },
    });
    return this.projectsRepo.save(project);
  }
}
